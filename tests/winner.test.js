const each = require('jest-each').default;
const { getWinningRow, getWinningCol, checkWinner } = require('../server/winner');

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

describe('checkWinner', () => {
  each([
    [1, 1, [[]]],
    [1, 1, [[null]]],
    [2, 2, [[null, null], [null, null]]],
    [3, 3, [[null, null, null], [null, null, null], [0, 0, 0]]],
    [4, 2, [[null, null], [1, 1], [null, null], [null, null]]],
    [2, 4, [[null, null, null, null], [null, null, null, null]]],
  ]).it('should not find a winner for empty or small boards', (nr, nc, board) => {
    const game = { numRows: nr, numCols: nc, state: board };
    expect(checkWinner(game)).toBe(null);
  });
  each([
    [1, 4, 0, [[0, 0, 0, 0]]],
    [1, 4, 1, [[1, 1, 1, 1]]],
    [2, 4, 0, [[0, 0, 0, 0], [null, null, null, null]]],
    [3, 4, 1, [[null, 0, 0, null], [null, null, 0, null], [1, 1, 1, 1]]],
    [2, 5, 1, [[0, 1, 1, 1, 1], [null, null, null, null, null]]],
  ]).it('should find a winning row for (%s x %s) board', (nr, nc, p, board) => {
    const game = { numRows: nr, numCols: nc, state: board };
    expect(checkWinner(game)).toBe(p);
    // expect(getWinningRow.mock.calls.length).toBe(1);
  });
  each([
    [4, 1, 0, [[0], [0], [0], [0]]],
    [4, 1, 1, [[1], [1], [1], [1]]],
    [5, 2, 1, [[1, null], [1, null], [1, null], [1, null], [null, null]]],
  ]).it('should find a winning column for (%s x %s) board', (nr, nc, p, board) => {
    const game = { numRows: nr, numCols: nc, state: board };
    expect(checkWinner(game)).toBe(p);
  });
  it('should find a winning row or column', () => {
    const game = { numRows: 0, numCols: 0, state: [[]] };
    expect(getWinningRow(game)).toBe(null);
  });
});
