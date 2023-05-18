export let CELLS = []

class Cell {
    cell;
    x;
    y;
    isEmpty = true;

    constructor(cell, x, y) {
        this.cell = cell;
        this.x = x;
        this.y = y;
    }

    set isEmptyCell(value) {
        this.isEmpty = value;
    }
}

export default Cell;