const Piece = require('./piece');
const data = require('./data');
const { getNextCell, isAMatch, getIndexByPiece, getLastPiecePlayed, showBoard } = require('./helpers');

const pieces = data.map((sides) => new Piece(sides));
const board = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

let available = data.map((sides, index) => index);
let lastPiecePlayed;
let chosenIndex = 5;
let tried = [];
let lastCoords;

board[0][0] = pieces[chosenIndex];
lastPiecePlayed = board[0][0];
lastCoords = [0, 0];
available = available.filter(index => index !== chosenIndex);

// check if board is solved
let iterations = 0;
const startTime = new Date().getTime();

while (getNextCell(board)) {
  iterations++;
  let skip = false;

  // identify slot to fill
  const [x, y] = getNextCell(board);

  const filtered = available.filter(i => !tried.includes(i));
  console.log(available);
  console.log(tried);
  console.log(filtered);
  if (tried.length > 10) {
    break;
  }

  for (let index of filtered) {
    for (let options = 0; options < 4; options ++) {
      const piece = pieces[index];
      if (y === 0) {
        // top row
        if (isAMatch(lastPiecePlayed, piece)) {
          board[y][x] = piece;
          lastPiecePlayed = piece;
          lastCoords = [y, x];
          // tried = [];
          available = available.filter(i => i !== index);
          skip = true;
          showBoard(board);
        }
      } else {
        // middle or bottom row
        const pieceAbove = board[y - 1][x];
        if (x === 0) {
          // first piece
          if (isAMatch(pieceAbove, piece, 'TTB')) {
            board[y][x] = piece;
            lastPiecePlayed = piece;
            lastCoords = [y, x];
            // tried = [];
            available = available.filter(i => i !== index);
            skip = true;
            showBoard(board);
          }
        } else {
          // second or last piece
          if (isAMatch(lastPiecePlayed, piece, 'LTR') && isAMatch(pieceAbove, piece, 'TTB')) {
            board[y][x] = piece;
            lastPiecePlayed = piece;
            lastCoords = [y, x];
            // tried = [];
            available = available.filter(i => i !== index);
            skip = true;
            showBoard(board);
          }
        }
      }
      if (skip) {
        break;
      } else {
        piece.rotateClockwise();
      }
    }
    if (skip) break;
  }

  if (!skip) {
    // no match found; backtrack

    // get index of lastPiecePlayed
    const index = getIndexByPiece(pieces, lastPiecePlayed);
    if (index) {
      available = [...available, Number(index)];
      tried.push(Number(index));
    }

    // remove lastPiecePlayed from board
    const [prevY, prevX] = lastCoords;
    // console.log('lastCoords', lastCoords);
    board[prevY][prevX] = null;
    // showBoard(board);

    // update value of lastPiecePlayed
    lastPiecePlayed = getLastPiecePlayed(board);

    if(!lastPiecePlayed) {
      // back at the start
      chosenIndex++;
      board[0][0] = pieces[chosenIndex % pieces.length].rotateClockwise();
      lastPiecePlayed = board[0][0];
    }
  }
}

// console.log(board);
const endTime = new Date().getTime();
console.log(`that took ${iterations} iterations and ${endTime - startTime}ms to run`);
