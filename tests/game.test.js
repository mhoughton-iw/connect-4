const each = require('jest-each').default;
const { Game } = require('../server/game');

describe('hasTurnReset', () => {
  each([
    [4, 4, 4],
    [32, 100, 100],
    [71, 8, 5],
    [15, 6, 7],
  ]).it('should reset the turn count', (actualTurn, nr, nc) => {
    const game = new Game(nr, nc);
    game.turn = actualTurn;
    game.resetGame();
    expect(game.turn).toBe(0);
  });
});

describe('hasStateReset', () => {
  each([
    [[
      [null, null, null],
      [null, null, null],
      [null, 0, 0],
    ], 3, 3],
    [[
      [null, null, null],
      [1, null, null],
      [1, null, null],
      [null, null, null],
      [1, null, null],
    ], 5, 3],
    [[
      [null, null, null, null, 0, null],
      [1, null, null, null, 0, null],
      [1, null, null, null, 0, null],
      [1, null, null, null, null, null],
      [null, null, null, null, 0, null],
      [1, null, null, null, 0, null],
    ], 6, 6],
  ]).it('testing game state resets', (actual, nr, nc) => {
    const expected = new Array(nr);
    for (let r = 0; r < expected.length; r++) {
      expected[r] = new Array(nc);
      expected[r].fill(null);
    }
    const game = new Game(nr, nc);
    game.state = actual;
    game.resetGame();
    expect(game.state).toStrictEqual(expected);
  });
});

describe('haveTwoTurnsBeenTaken', () => {
  each([
    [
      3, 3, 1, 1,
      [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      [
        [null, 0, null],
        [null, 1, null],
        [null, null, null],
      ],
    ],
    [
      3, 4, 1, 2,
      [
        [null, 1, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      [
        [null, 1, 1, null],
        [null, 0, null, null],
        [null, null, null, null],
      ],
    ],
    [
      7, 6, 4, 1,
      [
        [null, 0, 1, null, null, null],
        [null, 1, null, null, null, null],
        [null, 1, null, null, null, null],
        [null, 0, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
      ],
      [
        [null, 0, 1, null, 0, null],
        [null, 1, null, null, null, null],
        [null, 1, null, null, null, null],
        [null, 0, null, null, null, null],
        [null, 1, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
      ],
    ],
  ]).it('testing two turns', (nr, nc, t1, t2, actual, expected) => {
    const game = new Game(nr, nc);
    game.state = actual;
    game.takeTurn(t1);
    game.takeTurn(t2);
    expect(game.state).toStrictEqual(expected);
  });
});
