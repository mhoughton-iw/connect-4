const fs = require('fs').promises;
const request = require('supertest');
const each = require('jest-each').default;
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

describe('POST /game/board/col/:c', () => {
  beforeAll(() => {
    jest.spyOn(Game.prototype, 'takeTurn').mockImplementation((col) => {
      this.state = [
        [null, null, 'hello', null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
      ];
      this.turn = 30;
    });
  });

  // each([
  //   // [0], [1], [2],
  //   0, 1, 2,
  // ])
  test.skip('should return the game state after placing counter', (col, done) => {
    // const col = 2;
    const game = {
      numRows: 6,
      numCols: 7,
      turn: 0,
      state:
      [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
      ],
    };
    game.state[0][col] = 0;
    console.log(game.state);
    console.log(`just printed expected for col ${col}`);
    request(app)
      .post(`/game/board/col/${col}`)
      // .expect((res) => {
      //   // console.log(res);
      // })
      // .send(game)
      .expect(200)
      .expect(JSON.stringify(game))
      .end(done);
  });
});

test.todo('GET /game/winner should check for a winner and return it');
test.todo('POST /game/board/col/:c should place a counter in column c');
