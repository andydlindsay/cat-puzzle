const Piece = require('./piece');
const data = require('./data');
const { getNextCell, isAMatch } = require('./helpers');

const pieces = data.map((sides) => new Piece(sides));
const board = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

let available = data.map((sides, index) => index);
let lastPiecePlaced;
const chosenIndex = 5;

board[0][0] = pieces[chosenIndex].rotateClockwise().rotateClockwise().rotateClockwise();
lastPiecePlaced = board[0][0];
available = available.filter(index => index !== chosenIndex);

// check if board is solved
let j = 0;
while (j < 3000) {
  j++;
  let skip = false;
  // identify slot to fill
  const [x, y] = getNextCell(board);

  // determine orientation needed for match check
  let orientation = 'LTR';

  for (let index of available) {
    for (let options = 0; options < 4; options ++) {
      const piece = pieces[index];
      piece.rotateClockwise();
      if (y === 0) {
        // top row
        if (isAMatch(lastPiecePlaced, piece, orientation)) {
          board[y][x] = piece;
          lastPiecePlaced = piece;
          console.log('placed');
          available = available.filter(i => i !== index);
          skip = true;
        }
      } else {
        // middle or bottom row
        const pieceAbove = board[y - 1][x];
        if (x === 0) {
          // first piece
          if (isAMatch(pieceAbove, piece, 'TTB')) {
            board[y][x] = piece;
            lastPiecePlaced = piece;
            console.log('placed');
            available = available.filter(i => i !== index);
            skip = true;
          }
        } else {
          // second or last piece
          if (isAMatch(lastPiecePlaced, piece, 'LTR') && isAMatch(pieceAbove, piece, 'TTB')) {
            board[y][x] = piece;
            lastPiecePlaced = piece;
            console.log('placed');
            available = available.filter(i => i !== index);
            skip = true;
          }
        }
      }
      if (skip) break;
    }
    if (skip) break;
  }

  if (!skip) {
    // console.log('no match found');
  }
}

console.log(board);
