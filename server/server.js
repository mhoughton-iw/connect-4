const express = require('express');
const {
  Game,
  checkWinner,
} = require('./gameLogic.js');

const app = express();

const game = new Game(6, 7);

app.use(express.static('./client'));

// needed for reading json
// app.use(express.json());

app.get('/game/reset', (_req, res) => {
  game.resetGame();
  res.send(game);
});

app.get('/game/winner', (_req, res) => {
  const winner = checkWinner(game);
  res.send(winner);
});

app.get('/game/state', (_req, res) => {
  res.send(game);
  // res.json({
  //   numRows: game.numRows,
  //   numCols: game.numCols,
  //   turn: game.turn,
  //   state: game.state,
  // })
});

app.get('/game/state/col/:j', (req, res) => {
  res.send(`Current state of column ${req.params.j} is:`);
});

app.post('/game/board/col/:j', (req, res) => {
  game.takeTurn(req.params.j);
  res.send(game);
});

app.listen(8080);
