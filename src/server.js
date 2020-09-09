const express = require('express');

const app = express();

app.use(express.static('./src'));

app.get('/game/state', (req, res) => {
  res.send('Current state is:');
});

app.get('/game/state/col/:j', (req, res) => {
  res.send(`Current state of column ${req.params.j} is:`);
});

app.put('/game/board/col/:j', (req, res) => {
  res.send(`Adding counter to column ${req.params.j} is:`);
});

app.listen(8080);
