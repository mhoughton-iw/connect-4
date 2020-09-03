let player = 0;
let turnCount = 0;

function getWinningRow(grid) {
  for (let i = 0; i < grid.numRows; i++) {
    let rowWin = true;
    for (let j = 0; j < grid.numCols - 1; j++) {
      if (grid.state[i][j] !== grid.state[i][j + 1]) rowWin = false;
    }
    if (rowWin === true) {
      return i;
    }
  }
  return null;
}

function getWinningCol(grid) {
  // for loop for columns
  for (let j = 0; j < grid.numCols; j++) {
    let colWin = true;
    for (let i = 0; i < grid.numRows - 1; i++) {
      if (grid.state[i][j] !== grid.state[i + 1][j]) colWin = false;
    }
    if (colWin === true) {
      return j;
    }
  }

  return null;
}

function checkWinner(grid) {
  console.log('checkWinner was called');

  // let diagWin = checkDiagonal1(grid);
  // if (diagWin !== null) return diagWin;

  // diagWin = checkDiagonal2(grid);
  // if (diagWin !== null) return diagWin;

  const rowWin = getWinningRow(grid);
  if (rowWin !== null) return grid.state[rowWin][0];

  const colWin = getWinningCol(grid);
  if (colWin !== null) return grid.state[0][colWin];

  if (turnCount > grid.numSlots - 1) return 'nobody';
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

function listenForTurn(i) {
  $(`#top-button-${i}`).click(() => {
    $(`#row-0-column-${i}`).css('background-color', (player % 2 === 0 ? 'red' : 'yellow'));
    player += 1;
    // setTimeout(function(){
    //    $("#row-0-column-"+i).css("background-color", "yellow");
    // }, 1000)
    // setTimeout(function(){
    //    $("#row-0-column-"+i).css("background-color", "green");
    // }, 2000)
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
    $('#grid').append($('<div></div>').addClass('row')
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

createTopButtons(7);
createGrid(6, 7);
listenForReset();

module = module || {};
module.exports = {
  listenForTurn,
};
