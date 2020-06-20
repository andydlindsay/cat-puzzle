const assert = require('chai').assert;
const { isAMatch, getNextCell } = require('../helpers');
const Piece = require('../piece');
const { expect } = require('chai');

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
      assert.equal(result, null);
    });

    it('returns [] given a partially full board', () => {
      board[0][0] = true;
      board[0][1] = true;
      const [x, y] = getNextCell(board);
      assert.equal(x, 2);
      assert.equal(y, 0);
    });

    it('returns null if given no board', () => {
      const result = getNextCell();
      assert.equal(result, null);
    });

  });

});
