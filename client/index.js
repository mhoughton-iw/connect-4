// using shorthand global
const rootDir = 'http://localhost:3012';
// const rootDir = 'http://ec2-18-133-196-251.eu-west-2.compute.amazonaws.com:3012'

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

function renderWinner(winner) {
  if (winner === 0) {
    $('#winner-name').text('red');
    $('#winner-display')
      .addClass('bg-danger text-white')
      .removeClass('bg-warning text-dark');
  } else {
    $('#winner-name').text('yellow');
    $('#winner-display')
      .addClass('bg-warning text-dark')
      .removeClass('bg-danger text-white');
  }
  $('#winner-display').show();
}

// translate single cell of game state to a board counter colour
function getCellColourClass(cellState) {
  let colourClass = 'bg-white';
  if (cellState === 0) {
    colourClass = 'bg-danger';
  } else if (cellState === 1) {
    colourClass = 'bg-warning';
  }
  return colourClass;
}

// use current game state to render client side board
function renderBoard(game) {
  $('#grid').empty();
  // set up divs for storing each row of elements
  for (let r = 0; r < game.numRows; r += 1) {
    $('#grid').prepend($('<div></div>').addClass('row bg-primary')
      .prop('id', `row-${r}`)
      .css('width', `${game.numCols * 100}px`));

    // set up divs for individual elements
    for (let c = 0; c < game.numCols; c += 1) {
      const colourClass = getCellColourClass(game.state[r][c]);
      $(`#row-${r}`).append($('<div></div>').addClass(`column ${colourClass}`)
        .prop('id', `row-${r}-column-${c}`));
    }
  }
}

function refreshScores() {
  $.get(`${rootDir}/game/scores`, (scores) => {
    // TODO: change this to something meaningful
    $('#red-player-score').text(scores.red);
    $('#yellow-player-score').text(scores.yellow);
  });
}

function onResetGameClick() {
  $.post(`${rootDir}/game/reset`, (game) => renderBoard(game));
  $('#winner-display').hide();
}

function onResetMenuClick() {
  onResetGameClick();
  renderWelcomeArea();
}

function onResetScoreClick() {
  $.post(`${rootDir}/game/scores/reset`, (score) => {
    $('#red-player-score').text(score.red);
    $('#yellow-player-score').text(score.yellow);
  });
}

// make POST request to place counter
function handleTurn(c) {
  $.ajax({
    type: 'POST',
    url: `/game/board/col/${c}`,
    success: (game) => {
      renderBoard(game);
    },
  });
}

// make GET request for game winner and update winner/score UI as needed
function handleWinner() {
  $.get(`${rootDir}/game/winner`, (winner) => {
    if (winner !== null) {
      refreshScores();
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

function onNewUserClick() {
  renderUserArea();
  renderUserForm('#new-user-form');

  $('#new-user-form').submit((event) => {
    // TODO: generate uuid and add new user
    // TODO: update score board name
    renderGameArea();
    event.preventDefault();
  });
}

function onExistingUserClick() {
  renderUserArea();
  renderUserForm('#existing-user-form');

  $('#existing-user-form').submit((event) => {
    // TODO: update score board name
    renderGameArea();
    event.preventDefault();
  });
}

function updateExistingUserForm() {
  $.get(`${rootDir}/users/names`, (nameArray) => {
    for (let n = 0; n < nameArray.length; n++) {
      $('#existing-user-form-name').append($(`<option>${nameArray[n]}</option>`));
    }
  });
}

function setUpUsers() {
  refreshScores();
  updateExistingUserForm();
}

function setUpWelcomeArea() {
  // this should be changed for multiplayer compatibility
  $('#new-user').click(() => onNewUserClick());
  $('#existing-user').click(() => onExistingUserClick());
}

// set up functionality for all reset buttons
function setUpResetButtons() {
  $('#reset-game').click(() => onResetGameClick());
  $('#reset-menu').click(() => onResetMenuClick());
  $('#reset-score').click(() => onResetScoreClick());
}

function setUpBoard() {
  // this should be changed if game should persist after refresh
  $.post(`${rootDir}/game/reset`, (game) => {
    renderTopButtons(game);
    renderBoard(game);
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
