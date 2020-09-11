function getWinningRow(game) {
  for (let r = 0; r < game.numRows; r++) {
    let player = null;
    let count = 0;
    for (let c = 0; c < game.numCols; c++) {
      if (game.state[r][c] !== player) {
        player = game.state[r][c];
        count = 1;
        // TODO: linter really doesn't like these statements here
        continue;
      }
      count += 1;
      if (count >= 4 && player !== null) {
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
    for (let r = 0; r < game.numRows; r++) {
      if (game.state[r][c] !== player) {
        player = game.state[r][c];
        count = 1;
        continue;
      }
      count += 1;
      if (count >= 4 && player != null) {
        return player;
      }
    }
  }
  return null;
}

function checkWinner(game) {
  // TODO: set up diagonal wins
  // let diagWin = checkDiagonal1(game);
  // if (diagWin !== null) return diagWin;

  // diagWin = checkDiagonal2(game);
  // if (diagWin !== null) return diagWin;

  const rowWin = getWinningRow(game);
  if (rowWin !== null) return rowWin;

  const colWin = getWinningCol(game);
  if (colWin !== null) return colWin;

  // TODO: catch nobody wins
  return null;
}

if (typeof module !== 'undefined') {
  module.exports = {
    getWinningRow,
    getWinningCol,
    checkWinner,
  };
}
