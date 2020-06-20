const Piece = class {
  constructor(sides) {
    this.sides = sides;
    const [top, right, bottom, left] = sides;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.left = left;
  }

  showSides() {
    console.log(this.top, this.right, this.bottom, this.left);
  }

  rotateClockwise() {
    const temp = this.left;
    this.left = this.bottom;
    this.bottom = this.right;
    this.right = this.top;
    this.top = temp;
  }
};

module.exports = Piece;
