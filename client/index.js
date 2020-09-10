// const {
//   Game,
// } = require('./game.js');

const rootDir = 'http://localhost:8080';

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
    $.get(`${rootDir}/game/state`, (data) => {
      // Request finished. Do processing here.
      $('#grid').append($('<li></li>').text(data));
    });
  });
}

function listenForTurn(game, c) {
  $(`#top-button-${c}`).click(() => {
    game.takeTurn(c);
    updateBoard(game);
    $.get(`${rootDir}/game/winner`, (winner) => {
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
  });
}

function createTopButtons(game) {
  // set up divs for individual elements
  for (let c = 0; c < game.numCols; c++) {
    $('#top-buttons').append($(`<button>${c}</button>`).addClass('btn btn-secondary')
      .prop('id', `top-button-${c}`));
    // listen for clicks and take turn
    // listenForTurn(game, c);
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

function setUpGame() {
  // asynchronous response has been fetched
  $.get(`${rootDir}/game/reset`, (data) => {
    createTopButtons(data);
    createGrid(data.numRows, data.numCols);
  });
}

// const game = new Game(6, 7);
// const game = getGame();
// const game = $.get("http://localhost:8080/game/state");
// let game = 0;

// $.get(`${rootDir}/game/state`, (data) => {
//   game = data;
// });
// const game = $.get(`${rootDir}/game/state`, (data) => createTopButtons(data));
// game.state[3][2] = 'hello';
// console.log(game.state);
// game.state = game.getInitialState(3,4);
// console.log(game.state);

setUpGame();
// createTopButtons(game);
// createGrid(game.numRows, game.numCols);
listenForReset(game);

if (typeof module !== 'undefined') {
  module.exports = {
    listenForTurn,
  };
}
