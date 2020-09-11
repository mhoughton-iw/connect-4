const each = require('jest-each').default;
const { getWinningRow, getWinningCol } = require('../server/winner');

describe('hasWonRows', () => {
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
  ]).it('testing row win', (board, nr, nc, expected) => {
    const game = {
      numRows: nr,
      numCols: nc,
      state: board,
    };
    expect(getWinningRow(game)).toBe(expected);
  });
});

describe('hasWonCols', () => {
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
  ]).it('testing col win', (board, nr, nc, expected) => {
    const game = {
      numRows: nr,
      numCols: nc,
      state: board,
    };
    expect(getWinningCol(game)).toBe(expected);
  });
});
