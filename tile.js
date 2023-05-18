// import Cell from "./cell.js";
import { CELLS } from "./cell.js";

export let TILES = []

const tilesElement = document.getElementById("tiles");

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
        tilesElement.append(this.tileElement);
        this.findMatchingCell();
    }

    findMatchingCell() {
        this.matchingCell = CELLS.find((cell) => cell.x === this.x && cell.y === this.y);
        this.matchingCell.isEmptyCell = false;
    }

    set xValue(value) {
        this.matchingCell.isEmptyCell = true;
        this.x = value;
        this.tileElement.style.setProperty("--x", this.x);
        this.findMatchingCell();
    }

    set yValue(value) {
        this.matchingCell.isEmptyCell = true;
        this.y = value;
        this.tileElement.style.setProperty("--y", this.y);
        this.findMatchingCell();
    }
}

export default Tile;