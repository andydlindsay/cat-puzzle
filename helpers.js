const isAMatch = (pieceOne, pieceTwo, orientation = 'LTR') => {
  if (orientation === 'LTR') {
    const [numOne, sideOne] = pieceOne.split('');
    const [numTwo, sideTwo] = pieceTwo.split('');
    if (numOne !== numTwo) {
      return false;
    }
    const [a, b] = [sideOne, sideTwo].sort();
    return a === 'A' && b === 'B';
  }
};

module.exports = isAMatch;
