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
  const scores = JSON.parse(await fs.readFile('data/gameStats.json', 'utf-8'));
  scores[0].red += p1;
  scores[0].yellow += p2;
  await fs.writeFile('data/gameStats.json', JSON.stringify(scores), 'utf-8');
}

app.post('/game/reset', (_req, res) => {
  game.resetGame();
  res.send(game);
});

app.get('/game/winner', (_req, res) => {
  const winner = checkWinner(game);
  if (winner !== null) {
    const wins = [0, 0];
    wins[winner] += 1;
    writeScores(wins[0], wins[1]);
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

app.get('/users', async (req, res) => {
  // should return an array of users
  const myUsers = await fs.readFile('data/userStats.json', 'utf-8');
  const parsedUsers = JSON.parse(myUsers);
  res.json(parsedUsers);
});

app.get('/users/names', async (req, res) => {
  // should return an array of users names
  const myUsers = await fs.readFile('data/userStats.json', 'utf-8');
  const parsedUsers = JSON.parse(myUsers);

  const names = parsedUsers.map((user) => user.name);
  res.json(names);
});

app.listen(8080);
