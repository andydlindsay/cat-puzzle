const Piece = require('./piece');
const data = require('./data');

const piece = new Piece(data[0]);
piece
  .showSides()
  .rotateClockwise()
  .showSides()
  .rotateClockwise()
  .showSides()
  .reset()
  .showSides()
  .rotateClockwise()
  .showSides()
