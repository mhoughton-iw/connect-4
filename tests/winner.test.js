const each = require('jest-each').default;
const { getWinningRow, getWinningCol } = require('../server/winner');

describe('getWinningRow', () => {
  each([
    [[[null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null]], 4, 4, null],
    [[[null, null, null, null],
      [0, 0, 0, 0],
      [null, null, null, null],
      [null, null, null, null]], 4, 4, 0],
    [[[0, 0, 0, 0, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null]], 4, 5, 0],
    [[[null, null, null, null, null],
      [null, null, null, null, null],
      [null, 1, 1, 1, 1],
      [null, null, null, null, null]], 4, 5, 1],
  ]).it('should return a winning row', (board, nr, nc, expected) => {
    const game = {
      numRows: nr,
      numCols: nc,
      state: board,
    };
    expect(getWinningRow(game)).toBe(expected);
  });
});

describe('getWinningCol', () => {
  each([
    [[[null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null]], 4, 4, null],
    [[[null, null, null, null],
      [0, null, null, null],
      [0, null, null, null],
      [0, null, null, null],
      [0, null, null, null]], 5, 4, 0],
    [[[null, null, 1, null, null, null],
      [null, null, 1, null, null, null],
      [null, null, 1, null, null, null],
      [null, null, null, null, null, null],
      [null, null, 1, null, null, null],
      [null, null, 1, null, null, null],
      [null, null, 1, null, null, null]], 7, 6, null],
    [[[null, null, 1, null, null, null],
      [null, null, 1, null, null, null],
      [null, null, 1, null, null, null],
      [null, null, 1, null, null, null]], 4, 6, 1],
  ]).it('should return a winning column', (board, nr, nc, expected) => {
    const game = {
      numRows: nr,
      numCols: nc,
      state: board,
    };
    expect(getWinningCol(game)).toBe(expected);
  });
});
