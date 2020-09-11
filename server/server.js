const express = require('express');
const {
  Game,
} = require('./game.js');
const {
  checkWinner,
} = require('./winner.js');

const app = express();
app.use(express.static('./client'));

// needed for reading json
// app.use(express.json());

// instantiate game object as a global
const game = new Game(6, 7);

app.get('/game/reset', (_req, res) => {
  game.resetGame();
  res.send(game);
});

app.get('/game/winner', (_req, res) => {
  // const p1 = 0;
  // game.state[0][0] = p1;
  // game.state[0][1] = p1;
  // game.state[0][2] = p1;
  // game.state[0][3] = p1;
  const winner = checkWinner(game);
  res.json(winner);
});

app.get('/game/state', (_req, res) => {
  res.send(game);
});

app.get('/game/state/col/:c', (req, res) => {
  res.send(`Current state of column ${req.params.c} is:`);
});

app.post('/game/board/col/:c', (req, res) => {
  game.takeTurn(req.params.c);
  res.send(game);
});

app.listen(8080);
