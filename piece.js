const UP = 'up';
const RIGHT = 'right';
const LEFT = 'left';
const DOWN = 'down';

const nextOrientation = {
  up: RIGHT,
  right: DOWN,
  down: LEFT,
  left: UP
};

const Piece = class {
  constructor(sides) {
    this.sides = sides;
    const [top, right, bottom, left] = sides;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.left = left;
    this.orientation = UP;
  }

  showSides() {
    console.log(this.top, this.right, this.bottom, this.left, this.orientation);
    return this;
  }

  reset() {
    const [top, right, bottom, left] = this.sides;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.left = left;
    this.orientation = UP;
    return this;
  }

  rotateClockwise() {
    const temp = this.left;
    this.left = this.bottom;
    this.bottom = this.right;
    this.right = this.top;
    this.top = temp;
    this.orientation = nextOrientation[this.orientation];
    return this;
  }
};

module.exports = Piece;
