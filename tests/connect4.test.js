// const { listenForTurn } = require('./connect4');
// const each = require("jest-each").default;
// const {
//   getWinningRow,
// } = require('./connect4.js');

// describe("isTurnTaken", () => {
//     const testDiv = document.createElement("div");
//     testDiv.id = "row-0-column-0";
//     testDiv.style.backgroundColor = "blue";
//     document.body.appendChild(testDiv);

//     each([
//         [document.getElementById("row-0-column-0"), "red"],
//     ]).it("take turn with element", (square, expected) => {

//         listenForTurn(square);

//         expect(square.style.backgroundColor).toBe(expected);
//     })
// })
// describe('getWinningRow', () => {
//   it('should return a row from a grid', () => {
//     const grid = [
//       [1, 2, 3],
//       [4, 5, 6],
//       [7, 8, 9],
//     ];
//     expect(getWinningRow(grid, 1)).toEqual([2, 5, 8]);
//   });
// });