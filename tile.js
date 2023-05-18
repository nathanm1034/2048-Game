import Cell from "./cell.js";
import { cells } from "./cell.js";

const tiles = document.getElementById("tiles");

class Tile {
    tileElement;
    matchingCell;
    value;
    x;
    y;
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.value = Math.random() < 0.9 ? 2 : 4;
        this.tileElement = document.createElement("div");
        this.tileElement.innerHTML = `${this.value}`;
        this.tileElement.style.setProperty("--x", this.x);
        this.tileElement.style.setProperty("--y", this.y);
        this.tileElement.classList.add("tile");
        tiles.append(this.tileElement);
        this.findMatchingCell();
    }

    findMatchingCell() {
        this.matchingCell = cells.find((cell) => cell.x === this.x && cell.y === this.y);
        this.matchingCell.isEmptyCell = false;
    }
}

export default Tile;