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

module.exports = { 
  isAMatch,
  getNextCell
};
