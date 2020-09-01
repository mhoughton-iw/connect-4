// const { listenForTurn } = require('./connect4');
// const each = require("jest-each").default;

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