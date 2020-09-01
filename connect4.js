let player = 0;

function resetGrid() {
    const numRows = 6;
    const numColumns = 7;
    if (numRows !== 6 || numColumns !== 7) {
        return;
    }
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numColumns; j++) {
            $("#row-"+i+"-column-"+j).css("background-color", "blue");
        }
    }
    player = 0;
}

function listenForTurn(boardLocationDiv) {
    $(boardLocationDiv).click( function() {
        $(boardLocationDiv).css("background-color", (player % 2 == 0 ? "red" : "yellow"));
        player++;
    })
}

function createGrid(numRows, numColumns) {
    // set up divs for storing each row of elements
    for (let i = 0; i < numRows; i++) {
        $("#grid").append($("<div></div>").addClass("row")
                                .prop("id", "row-"+i)
                                .css("width", "" + (numColumns * 100) + "px"))

        // set up divs for individual elements
        for (let j = 0; j < numColumns; j++) {
            $("#row-"+i).append($("<div></div>").addClass("column")
                                                .prop("id", "row-"+i+"-column-"+j))
            // listen for clicks and take turn
            listenForTurn("#row-"+i+"-column-"+j);
        }
    }
}

createGrid(6, 7);

module = module || {};
module.exports = {
    listenForTurn: listenForTurn,
}