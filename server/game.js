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
    this.gameOver = false
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
    this.gameOver = false;
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

  checkStateFull() {
    for (let r = 0; r < this.numRows; r++) {
      for (let c = 0; c < this.numCols; c++) {
        if (this.state[r][c] === null) {
          return false;
        }
      }
    }
    this.gameOver = true;
    return true;
  }
}

// doesn't need testing
/* istanbul ignore next */
if (typeof module !== 'undefined') {
  module.exports = {
    Game, 
  };
}
