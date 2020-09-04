let player = 0;
let turnCount = 0;

class Game {
    numRows = 6;
    numCols = 7;
    state = [];

    constructor (numRows, numCols) {
      this.numRows = numRows;
      this.numCols = numCols;
      this.state = this.getInitialState(numRows, numCols);
    }

    getInitialState (numRows, numCols) {
      const array = new Array(numRows);
      for (let i = 0; i < array.length; i++) {
        array[i] = new Array(numCols);
        array[i].fill(null);
      }
      return array;
    }
}

const glbGame = {
  numRows: 6,
  numCols: 7,
  state: [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ]
};

function takeTurn(colId) {
  for (let rowId = 0; rowId < glbGame.numRows; rowId++) {
    if (glbGame.state[rowId][colId] === null) {
      glbGame.state[rowId][colId] = (player % 2);
      player += 1;
      return true;
    }
  }
  return false;
}

function getWinningRow(game) {
  for (let i = 0; i < game.numRows; i++) {
    let rowWin = true;
    for (let j = 0; j < game.numCols - 1; j++) {
      if (game.state[i][j] !== game.state[i][j + 1]) rowWin = false;
    }
    if (rowWin === true) {
      return i;
    }
  }
  return null;
}

function getWinningCol(game) {
  // for loop for columns
  for (let j = 0; j < game.numCols; j++) {
    let colWin = true;
    for (let i = 0; i < game.numRows - 1; i++) {
      if (game.state[i][j] !== game.state[i + 1][j]) colWin = false;
    }
    if (colWin === true) {
      return j;
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
  if (rowWin !== null) return game.state[rowWin][0];

  const colWin = getWinningCol(game);
  if (colWin !== null) return game.state[0][colWin];

  // if (turnCount > game.numSlots - 1) return 'nobody';
  return null;
}

function resetGrid() {
  const numRows = 6;
  const numCols = 7;
  if (numRows !== 6 || numCols !== 7) {
    return;
  }
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      $(`#row-${i}-column-${j}`).css('background-color', 'blue');
    }
  }
  player = 0;
}

function listenForReset() {
  $('#reset-game').click(() => {
    resetGrid();
  });
}

function updateBoard() {
  for (let i = 0; i < glbGame.numRows; i += 1) {
    for (let j = 0; j < glbGame.numCols; j += 1) {
      if (glbGame.state[i][j] === 0) {
        $(`#row-${i}-column-${j}`).css('background-color', 'red');
      } else if (glbGame.state[i][j] === 1) {
        $(`#row-${i}-column-${j}`).css('background-color', 'yellow');
      } else {
        $(`#row-${i}-column-${j}`).css('background-color', 'blue');
      }
    }
  }
}

function listenForTurn(i) {
  $(`#top-button-${i}`).click(() => {
    takeTurn(i);
    updateBoard();
    const winner = checkWinner(glbGame);
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
  for (let i = 0; i < game.numCols; i++) {
    $('#top-buttons').append($(`<button>${i}</button>`).addClass('btn btn-secondary')
      .prop('id', `top-button-${i}`));
    // listen for clicks and take turn
    listenForTurn(i);
  }
}

function createGrid(numRows, numCols) {
  // set up divs for storing each row of elements
  for (let i = 0; i < numRows; i += 1) {
    $('#grid').prepend($('<div></div>').addClass('row')
      .prop('id', `row-${i}`)
      .css('width', `${numCols * 100}px`));

    // set up divs for individual elements
    for (let j = 0; j < numCols; j += 1) {
      $(`#row-${i}`).append($('<div></div>').addClass('column')
        .prop('id', `row-${i}-column-${j}`));
    }
  }
}

game = new Game(6,7);
// console.log(game.state);
// game.state[3][2] = 'hello';
// console.log(game.state);
// game.state = game.getInitialState(3,4);
// console.log(game.state);


createTopButtons(game);
createGrid(game.numRows, game.numCols);
listenForReset();

module = module || {};
module.exports = {
  listenForTurn,
};
