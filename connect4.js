let player = 0;
let turnCount = 0;

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

  //if (turnCount > game.numSlots - 1) return 'nobody';
  return null;
}

function resetGrid() {
  const numRows = 6;
  const numColumns = 7;
  if (numRows !== 6 || numColumns !== 7) {
    return;
  }
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numColumns; j++) {
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

function listenForRandomClick(boardLocationDiv) {
  $(boardLocationDiv).click(() => {
    $(boardLocationDiv).css('background-color', (player % 2 === 0 ? 'red' : 'yellow'));
    player += 1;
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
      console.log('winneerrrrr');
      $('h1').append('Winner!');
    }
  });
}

function createTopButtons(numColumns) {
  // set up divs for individual elements
  for (let i = 0; i < numColumns; i++) {
    $('#top-buttons').append($(`<button>${i}</button>`).addClass('btn btn-secondary')
      .prop('id', `top-button-${i}`));
    // listen for clicks and take turn
    listenForTurn(i);
  }
}

function createGrid(numRows, numColumns) {
  // set up divs for storing each row of elements
  for (let i = 0; i < numRows; i += 1) {
    $('#grid').prepend($('<div></div>').addClass('row')
      .prop('id', `row-${i}`)
      .css('width', `${numColumns * 100}px`));

    // set up divs for individual elements
    for (let j = 0; j < numColumns; j += 1) {
      $(`#row-${i}`).append($('<div></div>').addClass('column')
        .prop('id', `row-${i}-column-${j}`));
      // listen for clicks and take turn
      listenForRandomClick(`#row-${i}-column-${j}`);
    }
  }
}

createTopButtons(glbGame.numCols);
createGrid(glbGame.numRows, glbGame.numCols);
listenForReset();

module = module || {};
module.exports = {
  listenForTurn,
};
