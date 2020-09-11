const each = require('jest-each').default;
const { getWinningRow, getWinningCol } = require('../server/winner');

describe('hasWonRows', () => {
  each([
    [[[null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null]], null],
    [[[0, 0, 0, 0],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null]], 0],
  ]).it('testing row win', (board, expected) => {
    const game = {
      numRows: 4,
      numCols: 4,
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
      [null, null, null, null]], null],
    [[[0, null, null, null],
      [0, null, null, null],
      [0, null, null, null],
      [0, null, null, null]], 0],
  ]).it('testing col win', (board, expected) => {
    const game = {
      numRows: 4,
      numCols: 4,
      state: board,
    };
    expect(getWinningCol(game)).toBe(expected);
  });
});
