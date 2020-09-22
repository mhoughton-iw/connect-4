// using shorthand global
const rootDir = 'http://localhost:8080';

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

function getScores() {
  $.get(`${rootDir}/game/scores`, (scores) => {
    // TODO: change this to something meaningful
    $('#red-player-score').text(scores.red);
    $('#yellow-player-score').text(scores.yellow);
  });
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
    $.post(`${rootDir}/game/scores/reset`, (data) => {
      // TODO: change this to something meaningful
      $('#red-player-score').text(data.red);
      $('#yellow-player-score').text(data.yellow);
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
      getScores();
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

// handle game set up (both UI and calls to server)
function setUpGame() {
  // this should be changed for multiplayer compatibility
  getScores();
  // this should be changed if game should persist after refresh
  $.post(`${rootDir}/game/reset`, (data) => {
    createTopButtons(data);
    createGrid(data.numRows, data.numCols);
  });
  $('.reset').show();
}

function onNewUserClick() {
  $('#new-user-form').show();
  $('#existing-user-form').hide();
  $('#user-area').hide();
}

function onExistingUserClick(name) {
  $('#existing-user-form').show();
  $('#new-user-form').hide();
  $('#user-area').hide();
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
    // $('#user-area').hide();
    onNewUserClick();
    // $('#game-area').show();
  });
}

loadUserPage();
setUpGame();
listenForReset();
