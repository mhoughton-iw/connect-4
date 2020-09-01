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

function listenForRandomClick(boardLocationDiv) {
    $(boardLocationDiv).click( function() {
        $(boardLocationDiv).css("background-color", (player % 2 == 0 ? "red" : "yellow"));
        player++;
    })
}

function listenForTurn(i) {
    $("#top-button-"+i).click( function() {
        $("#row-0-column-"+i).css("background-color", (player % 2 == 0 ? "red" : "yellow"));
        player++;
        //setTimeout(function(){           
        //    $("#row-0-column-"+i).css("background-color", "yellow");
        // }, 1000)
        //setTimeout(function(){           
        //    $("#row-0-column-"+i).css("background-color", "green");
        // }, 2000)
    })
}

function createTopButtons(numColumns) {
    // set up divs for individual elements
    for (let i = 0; i < numColumns; i++) {
        $("#top-buttons").append($("<button>"+i+"</button>").addClass("btn btn-secondary")
                                            .prop("id", "top-button-"+i))
        // listen for clicks and take turn
        listenForTurn(i);
    }
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
            listenForRandomClick("#row-"+i+"-column-"+j);
        }
    }
}

createTopButtons(7);
createGrid(6, 7);

module = module || {};
module.exports = {
    listenForTurn: listenForTurn,
}