// using shorthand global
const rootDir = 'http://localhost:8080';

// updates board UI using current game state
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

function onResetGameButtonClick() {
  $.post(`${rootDir}/game/reset`, (game) => {
    updateBoard(game);
  });
  $('#winner-display').hide();
}

// handle both reset game and reset score buttons
function listenForReset() {
  $('#reset-game').click(() => onResetGameButtonClick());
  $('#reset-menu').click(() => {
    onResetGameButtonClick();
    $('#game-area').hide();
    $('#user-area').show();
  });
  $('#reset-score').click(() => {
    $.get(`${rootDir}/game/state`, (data) => {
      // TODO: change this to something meaningful
      $('#grid').append($('<li></li>').text(data));
    });
  });
}

// handle interactive column placement buttons
function onTopButtonClick(c) {
  // send request to place counter
  $.ajax({
    type: 'POST',
    url: `/game/board/col/${c}`,
    // should remove the following but want to understand when I need them
    // data: JSON.stringify(c),
    // contentType: 'application/json',
    success: (game) => {
      updateBoard(game);
    },
  });

  // handle result of win check
  $.get(`${rootDir}/game/winner`, (winner) => {
    if (winner !== null) {
      console.log('winner is...');
      console.log(winner);
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

// set up divs for counter placement events
function createTopButtons(game) {
  $('#top-buttons').empty();
  for (let c = 0; c < game.numCols; c++) {
    $('#top-buttons').append($(`<button>${c}</button>`).addClass('btn btn-secondary')
      .prop('id', `top-button-${c}`));
    $(`#top-button-${c}`).click(() => onTopButtonClick(c));
  }
}

// grid is defined using total number of rows and columns
function createGrid(numRows, numCols) {
  $('#grid').empty();
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

// handle game set up (both UI and calls to server)
function setUpGame() {
  // this should be changed if game should persist after refresh
  $.post(`${rootDir}/game/reset`, (data) => {
    createTopButtons(data);
    createGrid(data.numRows, data.numCols);
  });
  $('.reset').show();
}

function setUpUserPage() {
  $.get(`${rootDir}/users/names`, (nameArray) => {
    for (let n = 0; n < nameArray.length; n++) {
      $('#userDrop').append($(`<a>${nameArray[n]}</a>`).addClass('dropdown-item'));
    }
  });
}

function loadUserPage() {
  setUpUserPage();
  $('#game-area').hide();
  $('#new-user').click(() => {
    $('#user-area').hide();
    $('#game-area').show();
  });
}

loadUserPage();
setUpGame();
listenForReset();
