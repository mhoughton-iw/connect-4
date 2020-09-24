// using shorthand global
const rootDir = 'http://localhost:8080';

function renderWelcomeArea() {
  $('#welcome-area').show();
  $('#user-area').hide();
  $('#game-area').hide();
}

function renderUserArea() {
  $('#user-area').show();
  $('#welcome-area').hide();
  $('#game-area').hide();
}

function renderUserForm(form) {
  if (form === '#existing-user-form') {
    $('#existing-user-form').show();
    $('#new-user-form').hide();
  } else {
    $('#new-user-form').show();
    $('#existing-user-form').hide();
  }
}

function renderGameArea() {
  $('#game-area').show();
  $('#user-area').hide();
  $('#welcome-area').hide();
}

// updates board UI using current game state
function updateBoard(game) {
  for (let r = 0; r < game.numRows; r += 1) {
    for (let c = 0; c < game.numCols; c += 1) {
      if (game.state[r][c] === 0) {
        $(`#row-${r}-column-${c}`).addClass('bg-danger').removeClass('bg-white');
      } else if (game.state[r][c] === 1) {
        $(`#row-${r}-column-${c}`).addClass('bg-warning').removeClass('bg-white');
      } else {
        $(`#row-${r}-column-${c}`).addClass('bg-white')
          .removeClass('bg-danger bg-warning');
      }
    }
  }
}

function updateScores() {
  $.get(`${rootDir}/game/scores`, (scores) => {
    // TODO: change this to something meaningful
    $('#red-player-score').text(scores.red);
    $('#yellow-player-score').text(scores.yellow);
  });
}

function onResetGameClick() {
  $.post(`${rootDir}/game/reset`, (game) => updateBoard(game));
  $('#winner-display').hide();
}

function onResetMenuClick() {
  onResetGameClick();
  renderWelcomeArea();
}

function onResetScoreClick() {
  $.post(`${rootDir}/game/scores/reset`, (data) => {
    // TODO: change this to something meaningful
    $('#red-player-score').text(data.red);
    $('#yellow-player-score').text(data.yellow);
  });
}

// handle both reset game and reset score buttons
function setUpResetButtons() {
  $('#reset-game').click(() => onResetGameClick());
  $('#reset-menu').click(() => onResetMenuClick());
  $('#reset-score').click(() => onResetScoreClick());
}

function renderWinner(winner) {
  if (winner === 0) {
    $('#winner-name').text('red');
    $('#winner-display').addClass('bg-danger').addClass('text-white')
      .removeClass('bg-warning')
      .removeClass('text-dark');
  } else {
    $('#winner-name').text('yellow');
    $('#winner-display').addClass('bg-warning').addClass('text-dark')
      .removeClass('bg-danger')
      .removeClass('text-white');
  }
  $('#winner-display').show();
}

function handleTurn(c) {
  // send request to place counter
  $.ajax({
    type: 'POST',
    url: `/game/board/col/${c}`,
    success: (game) => {
      updateBoard(game);
    },
  });
}

function handleWinner() {
  // handle result of win check
  $.get(`${rootDir}/game/winner`, (winner) => {
    if (winner !== null) {
      updateScores();
      renderWinner(winner);
    }
  });
}

// handle interactive column placement buttons
function onTopButtonClick(c) {
  handleTurn(c);
  handleWinner();
}

// set up divs for counter placement events
function renderTopButtons(game) {
  $('#top-buttons').empty();
  for (let c = 0; c < game.numCols; c++) {
    $('#top-buttons').append($(`<button>${c}</button>`).addClass('btn btn-secondary')
      .prop('id', `top-button-${c}`));
    $(`#top-button-${c}`).click(() => onTopButtonClick(c));
  }
}

// grid is defined using total number of rows and columns
function renderGrid(numRows, numCols) {
  $('#grid').empty();
  // set up divs for storing each row of elements
  for (let r = 0; r < numRows; r += 1) {
    $('#grid').prepend($('<div></div>').addClass('row bg-primary')
      .prop('id', `row-${r}`)
      .css('width', `${numCols * 100}px`));

    // set up divs for individual elements
    for (let c = 0; c < numCols; c += 1) {
      $(`#row-${r}`).append($('<div></div>').addClass('column bg-white')
        .prop('id', `row-${r}-column-${c}`));
    }
  }
}

function onNewUserClick() {
  renderUserArea();
  renderUserForm('#new-user-form');

  $('#new-user-form').submit((event) => {
    renderGameArea();
    event.preventDefault();
  });
}

function onExistingUserClick() {
  renderUserArea();
  renderUserForm('#existing-user-form');

  $('#existing-user-form').submit((event) => {
    renderGameArea();
    event.preventDefault();
  });
}

function getExistingUsers() {
  $.get(`${rootDir}/users/names`, (nameArray) => {
    for (let n = 0; n < nameArray.length; n++) {
      $('#existing-user-form-name').append($(`<option>${nameArray[n]}</option>`));
    }
  });
}

function setUpUsers() {
  updateScores();
  getExistingUsers();
}

function setUpWelcomeArea() {
  // this should be changed for multiplayer compatibility
  $('#new-user').click(() => onNewUserClick());
  $('#existing-user').click(() => onExistingUserClick());
}

function setUpBoard() {
  // this should be changed if game should persist after refresh
  $.post(`${rootDir}/game/reset`, (game) => {
    renderTopButtons(game);
    renderGrid(game.numRows, game.numCols);
  });
}

function setUpGameArea() {
  setUpResetButtons();
  setUpBoard();
}

// handle game set up (both UI and calls to server)
function setUpGame() {
  setUpUsers();
  setUpWelcomeArea();
  setUpGameArea();
}

setUpGame();
