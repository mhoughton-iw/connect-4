const express = require('express');
const { Game } = require('./game.js');
const { checkWinner } = require('./winner.js');

const app = express();
app.use(express.static('./client'));

// needed for reading json
// app.use(express.json());

// set up game object as a global
const game = new Game(6, 7);

app.post('/game/reset', (_req, res) => {
  game.resetGame();
  res.send(game);
});

app.get('/game/winner', (_req, res) => {
  const winner = checkWinner(game);
  res.json(winner);
});

app.get('/game/state', (_req, res) => {
  res.send(game);
});

app.post('/game/board/col/:c', (req, res) => {
  game.takeTurn(req.params.c);
  res.send(game);
});

app.listen(8080);
