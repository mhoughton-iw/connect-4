const each = require('jest-each').default;
const { Game } = require('../server/game');

describe('getInitialState', () => {
  each([
    [2, 3, [[null, null, null], [null, null, null]]],
    [3, 1, [[null], [null], [null]]],
    [3, 3, [[null, null, null], [null, null, null], [null, null, null]]],
  ]).it('should return an empty (%s x %s) array', (nr, nc, actual) => {
    const game = new Game(nr, nc);
    expect(game.getInitialState()).toStrictEqual(actual);
  });
});

describe('resetGame', () => {
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
  ]).it('should reset the game state', (actual, nr, nc) => {
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

describe('takeTurn', () => {
  each([
    [
      3, 3, 1,
      [
        [null, 0, null],
        [null, 1, null],
        [null, 0, null],
      ],
    ],
    [
      3, 4, 2,
      [
        [null, 1, 1, null],
        [null, null, 0, null],
        [null, null, 0, null],
      ],
    ],
  ]).it('should not take a turn when column is full', (nr, nc, col, actual) => {
    const game = new Game(nr, nc);
    game.state = actual;
    expect(game.takeTurn(col)).toBe(false);
    expect(game.state).toStrictEqual(actual);
  });
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
  ]).it('should take two turns when called twice', (nr, nc, t1, t2, actual, expected) => {
    const game = new Game(nr, nc);
    game.state = actual;
    expect(game.takeTurn(t1)).toBe(true);
    expect(game.takeTurn(t2)).toBe(true);
    expect(game.state).toStrictEqual(expected);
  });
});
