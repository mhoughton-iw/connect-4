// const {
//   Game,
// } = require('./game.js');
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
    console.log('game instantiated')
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
    console.log('taking turn')
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

function getWinningRow(game) {
  for (let r = 0; r < game.numRows; r++) {
    let player = null;
    let count = 0;
    for (let c = 0; c < game.numCols - 1; c++) {
      if (game.state[r][c] !== player) {
        player = game.state[r][c];
        count = 1;
        continue;
      }
      count += 1;
      if (count >= 4 && player !== null) {
        console.log('winning row');
        return player;
      }
    }
  }
  return null;
}

function getWinningCol(game) {
  for (let c = 0; c < game.numCols; c++) {
    let player = null;
    let count = 0;
    for (let r = 0; r < game.numRows - 1; r++) {
      if (game.state[r][c] !== player) {
        player = game.state[r][c];
        count = 1;
        continue;
      }
      count += 1;
      if (count >= 4 && player != null) {
        console.log('winning col');
        return player;
      }
    }
  }
  return null;
}

function checkWinner(game) {
  // let diagWin = checkDiagonal1(game);
  // if (diagWin !== null) return diagWin;

  // diagWin = checkDiagonal2(game);
  // if (diagWin !== null) return diagWin;

  const rowWin = getWinningRow(game);
  if (rowWin !== null) return rowWin;

  const colWin = getWinningCol(game);
  if (colWin !== null) return colWin;

  // if (turnCount > game.numSlots - 1) return 'nobody';
  return null;
}

function updateBoard(game) {
  for (let r = 0; r < game.numRows; r += 1) {
    for (let c = 0; c < game.numCols; c += 1) {
      if (game.state[r][c] === 0) {
        $(`#row-${r}-column-${c}`).css('background-color', 'red');
      } else if (game.state[r][c] === 1) {
        $(`#row-${r}-column-${c}`).css('background-color', 'yellow');
      } else {
        $(`#row-${r}-column-${c}`).css('background-color', 'blue');
      }
    }
  }
}

function listenForReset(game) {
  $('#reset-game').click(() => {
    game.resetGame();
    updateBoard(game);
    $('#winner-display').hide();
  });
  $('#reset-score').click(() => {
    // asynchronous response has been fetched
    $.get("http://localhost:8080/game/state", function (data){
      // Request finished. Do processing here.
      $("#grid").append($("<li></li>").text(data));
    });
  });
}

function listenForTurn(game, c) {
  $(`#top-button-${c}`).click(() => {
    game.takeTurn(c);
    updateBoard(game);
    const winner = checkWinner(game);
    if (winner !== null) {
      if (winner === 0) {
        $('#winner-name').text('red');
        $('#winner-display').css('background-color', 'red');
      } else {
        $('#winner-name').text('yellow');
        $('#winner-display').css('background-color', 'yellow');
      }
      $('#winner-display').show();
    }
  });
}

function createTopButtons(game) {
  // set up divs for individual elements
  for (let c = 0; c < game.numCols; c++) {
    $('#top-buttons').append($(`<button>${c}</button>`).addClass('btn btn-secondary')
      .prop('id', `top-button-${c}`));
    // listen for clicks and take turn
    listenForTurn(game, c);
  }
}

function createGrid(numRows, numCols) {
  // set up divs for storing each row of elements
  for (let r = 0; r < numRows; r += 1) {
    $('#grid').prepend($('<div></div>').addClass('row')
      .prop('id', `row-${r}`)
      .css('width', `${numCols * 100}px`));

    // set up divs for individual elements
    for (let c = 0; c < numCols; c += 1) {
      $(`#row-${r}`).append($('<div></div>').addClass('column')
        .prop('id', `row-${r}-column-${c}`));
    }
  }
}

const game = new Game(6, 7);
// console.log(game.state);
// game.state[3][2] = 'hello';
// console.log(game.state);
// game.state = game.getInitialState(3,4);
// console.log(game.state);

createTopButtons(game);
createGrid(game.numRows, game.numCols);
listenForReset(game);

if (typeof module !== 'undefined') {
  module.exports = {
    listenForTurn,
  }
}