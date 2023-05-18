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
}

export default Cell;