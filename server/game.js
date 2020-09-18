class Game {
  numRows = 0;
  numCols = 0;
  turn = 0;
  state = [];

  constructor (numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;
    this.turn = 0;
    this.state = this.getInitialState();
  }

  getInitialState() {
    const array = new Array(this.numRows);
    for (let r = 0; r < array.length; r++) {
      array[r] = new Array(this.numCols);
      array[r].fill(null);
    }
    return array;
  }

  resetGame() {
    this.turn = 0;
    this.state = this.getInitialState();
  }

  takeTurn(c) {
    for (let r = 0; r < this.numRows; r++) {
      if (this.state[r][c] === null) {
        this.state[r][c] = this.turn;
        this.turn = (this.turn + 1) % 2;
        return true;
      }
    }
    return false;
  }
}

if (typeof module !== 'undefined') {
  module.exports = {
    Game, 
  };
}
