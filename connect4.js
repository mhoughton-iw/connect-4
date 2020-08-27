let player = 0;

function resetGrid() {
    const numRows = 6;
    const numColumns = 7;
    if (numRows !== 6 || numColumns !== 7) {
        return;
    } 
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numColumns; j++) {
            document.getElementById("row-"+i+"-column-"+j).style.backgroundColor = "blue";
        }
    }
    player = 0;
}

function createGrid(numRows, numColumns) {
    // const gridDiv = document.createElement("div");
    // gridDiv.id = "grid";
    // document.body.appendChild(gridDiv);
    for (let i = 0; i < numRows; i++) {
        const rowDiv = document.createElement("div");
        rowDiv.className = "row";
        rowDiv.id = "row-"+i;
        rowDiv.style.width = "" + (numColumns*100) + "px"
        document.getElementById("grid").appendChild(rowDiv);
        for (let j = 0; j < numColumns; j++) {
            const colDiv = document.createElement("div");
            colDiv.className = "column";
            colDiv.id = "row-"+i+"-column-"+j;
            document.getElementById("row-"+i).appendChild(colDiv);
            colDiv.addEventListener("click", function () {
                colDiv.style.backgroundColor = (player % 2 == 0 ? "red" : "yellow");
                player++;
            })
        }
    }
}

createGrid(6,7);
