const assert = require('chai').assert;
const { isAMatch, getNextCell, getIndexByPiece, getLastPiecePlayed } = require('../helpers');
const Piece = require('../piece');
const data = require('../data');

describe('Helper Tests', () => {

  describe('isAMatch function', () => {

    let pieceOne;
    let pieceTwo;

    beforeEach(() => {
      pieceOne = new Piece(['1A', '2A', '3A', '4A']);
      pieceTwo = new Piece(['5A', '6B', '7A', '2B']);
    });

    it('returns true when a match is found', () => {
      const result = isAMatch(pieceOne, pieceTwo);
      assert.equal(result, true);
    });

    it('returns false when no match is found', () => {
      pieceTwo.rotateClockwise();
      const result = isAMatch(pieceOne, pieceTwo);
      assert.equal(result, false);
    });

    it('returns true when match is found top to bottom', () => {
      pieceOne.rotateClockwise();
      pieceTwo.rotateClockwise();
      const result = isAMatch(pieceOne, pieceTwo, 'TTB');
      assert.equal(result, true);
    });

    it('returns false when no match is found top to bottom', () => {
      const result = isAMatch(pieceOne, pieceTwo, 'TTB');
      assert.equal(result, false);
    });

  });

  describe('getNextCell function', () => {

    let board;

    beforeEach(() => {
      board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ];
    });

    it('returns [0,0] given an empty board', () => {
      const [x, y] = getNextCell(board);
      assert.equal(x, 0);
      assert.equal(y, 0);
    });

    it('returns null given a full board', () => {
      for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
          board[y][x] = true;
        }
      }
      const result = getNextCell(board);
      assert.strictEqual(result, null);
    });

    it('returns appropriate cell given a partially full board', () => {
      board[0][0] = true;
      board[0][1] = true;
      const [x, y] = getNextCell(board);
      assert.equal(x, 2);
      assert.equal(y, 0);
    });

    it('returns null if given no board', () => {
      const result = getNextCell();
      assert.strictEqual(result, null);
    });

  });

  describe('getIndexByPiece function', () => {

    let pieces;

    beforeEach(() => {
      pieces = data.map(sides => new Piece(sides));
    });

    it('returns null if missing any arguments', () => {
      const result = getIndexByPiece();
      assert.strictEqual(result, null);
    });

    it('returns the index of the given piece', () => {
      const piece = pieces[5];
      const result = getIndexByPiece(pieces, piece);
      assert.equal(result, 5);
    });

    it('returns null if no piece found', () => {
      const piece = new Piece(['1A', '2A', '3A', '4A']);
      const result = getIndexByPiece(pieces, piece);
      assert.strictEqual(result, null);
    });

  });

  describe('getLastPiecePlayed function', () => {

    let board;

    beforeEach(() => {
      board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ];
    });

    it('returns null if given no argument', () => {
      const result = getLastPiecePlayed();
      assert.strictEqual(result, null);
    });

    it('retuns the piece from the last occupied spot', () => {
      const pieceOne = new Piece(['1A', '2A', '3A', '4A']);
      const pieceTwo = new Piece(['1B', '2B', '3B', '4B']);
      board[0][0] = pieceOne;
      board[0][1] = pieceTwo;
      const result = getLastPiecePlayed(board);
      assert.equal(result, pieceTwo);
    });

    it('retuns the piece from the last occupied spot', () => {
      const pieceOne = new Piece(['1A', '2A', '3A', '4A']);
      const pieceTwo = new Piece(['1B', '2B', '3B', '4B']);
      const pieceThree = new Piece(['5A', '6A', '7A', '8A']);
      const pieceFour = new Piece(['5B', '6B', '7B', '8B']);
      board[0][0] = pieceOne;
      board[0][1] = pieceTwo;
      board[0][2] = pieceThree;
      board[1][0] = pieceFour;
      const result = getLastPiecePlayed(board);
      assert.equal(result, pieceFour);
    });

  });

});
