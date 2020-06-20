const isAMatch = (pieceOne, pieceTwo, orientation = 'LTR') => {
  let numOne;
  let numTwo;
  let sideOne;
  let sideTwo;

  if (orientation === 'LTR') {
    [numOne, sideOne] = pieceOne.right.split('');
    [numTwo, sideTwo] = pieceTwo.left.split('');
  } else {
    [numOne, sideOne] = pieceOne.bottom.split('');
    [numTwo, sideTwo] = pieceTwo.top.split('');
  }

  if (numOne !== numTwo) {
    return false;
  }
  const [a, b] = [sideOne, sideTwo].sort();
  return a === 'A' && b === 'B';
};

const getNextCell = (board) => {
  if (!board) {
    return null;
  }
  for (let y = 0; y < 3; y++) {
    for (let x =0; x < 3; x++) {
      if (!board[y][x]) {
        return [x, y];
      }
    }
  }
  return null;
};

const getIndexByPiece = (pieces, testPiece) => {
  if(!pieces || !testPiece) {
    return null;
  }
  for (const index in pieces) {
    if (pieces[index] === testPiece) {
      return index;
    }
  }
  return null;
};

const getLastPiecePlayed = (board) => {
  if (!board) {
    return null;
  }

  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      if (!board[y][x]) {
        if (x === 0 && y > 0) {
          return board[y - 1][2];
        }
        return board[y][x - 1];
      }
    }
  }
};

const showBoard = (board) => {
  for (let y = 0; y < 3; y++) {
    let strOne = '';
    let strTwo = '';
    let strThree = '';
    for (let x = 0; x < 3; x++) {
      const cell = board[y][x];
      if (cell) {
        strOne += `   ${cell.top}  `;
        strTwo += ` ${cell.left}  ${cell.right}`;
        strThree += `   ${cell.bottom}  `;
      } else {
        strOne += `       `;
        strTwo += `       `;
        strThree += `       `;
      }
    }
    console.log(strOne);
    console.log(strTwo);
    console.log(strThree);
  }
};

module.exports = { 
  isAMatch,
  getNextCell,
  getIndexByPiece,
  getLastPiecePlayed,
  showBoard
};
