const express = require('express');
const {
  Game,
  checkWinner,
} = require('./gameLogic.js');

const app = express();

app.use(express.static('./client'));

// needed for reading json
// app.use(express.json());

app.get('/game/reset', (req, res) => {
  const game = new Game(6, 7);
  res.send(game);
});

app.get('/game/winner', (res) => {
  const game = new Game(6, 7);
  const winner = checkWinner(game);
  res.send(winner);
});

app.get('/game/state', (req, res) => {
  const game = new Game(6, 7);
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

app.put('/game/board/col/:j', (req, res) => {
  res.send(`Adding counter to column ${req.params.j} is:`);
});

app.listen(8080);
