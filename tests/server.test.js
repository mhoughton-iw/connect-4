const fs = require('fs').promises;
const request = require('supertest');
const { Game } = require('../server/game');
const winner = require('../server/winner');
const { app } = require('../server/server');

// jest.mock('winner');

// test('should POST a turn', () => {
//   // jest.spyOn(winner, 'checkWinner').mockReturnValue(null);
//   // // jest.spyOn(axios, 'get').mockReturnValue(null);
//   // app.post()
// })

describe('POST /game/reset', () => {
  const game = new Game(6, 7);
  it('should return a reset game', (done) => {
    request(app)
      .post('/game/reset')
      .expect(200, JSON.stringify(game))
      .end(done);
  });
});

describe('GET /game/state', () => {
  const game = new Game(6, 7);
  it('should return the game state', (done) => {
    request(app)
      .get('/game/state')
      .expect(200, JSON.stringify(game))
      .end(done);
  });
});

test.todo('GET /game/winner should check for a winner and return it');
test.todo('POST /game/board/col/:c should place a counter in column c');
