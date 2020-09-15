const express = require('express');
const fs = require('fs').promises;
const { Game } = require('./game.js');
const { checkWinner } = require('./winner.js');

const app = express();
app.use(express.static('./client'));

// needed for reading json
app.use(express.json());

// set up game object as a global
const game = new Game(6, 7);

async function writeScores(p1, p2) {
  const scores = { red: p1, yellow: p2 };
  await fs.writeFile('data/gameStats.json', JSON.stringify(scores), 'utf-8');
}

app.get('/game/reset', (_req, res) => {
  game.resetGame();
  res.send(game);
});

app.get('/game/winner', (_req, res) => {
  const winner = checkWinner(game);
  if (winner !== null) {
    writeScores(1, 0);
  }
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
