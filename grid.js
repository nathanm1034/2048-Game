import Cell from "./cell.js";

import { CELLS } from "./cell.js";
import { TILES } from "./tile.js";

class Grid {
    gameContainer = document.getElementById("game-container");
    gameBoard = document.getElementById("game-board");
    GRID_SIZE;
    CELL_SIZE;
    CELL_GAP;

    constructor(GRID_SIZE, CELL_SIZE, CELL_GAP) {
        this.GRID_SIZE = GRID_SIZE;
        this.CELL_SIZE = CELL_SIZE;
        this.CELL_GAP = CELL_GAP;
        this.gameContainer.style.setProperty("--grid-size", this.GRID_SIZE);
        this.gameContainer.style.setProperty("--cell-size", `${this.CELL_SIZE}vmin`);
        this.gameContainer.style.setProperty("--cell-gap", `${this.CELL_GAP}vmin`);
        this.createGridCells();
    }

    createGridCells() {
        for (let i = 0; i < this.GRID_SIZE**2; i++) {
            const cellElement = document.createElement("div");
            cellElement.classList.add("cell");

            const cell = new Cell(cellElement, i % this.GRID_SIZE, Math.floor(i / this.GRID_SIZE));
            CELLS.push(cell);
            this.gameBoard.append(cellElement);
        }
    }

    get emptyCells() {
        return CELLS.filter((cell) => cell.isEmpty);
    }

    randomEmptyCell() {
        const randomIndex = Math.floor(Math.random() * (this.emptyCells.length - 0.0001));
        return this.emptyCells[randomIndex];
    }

    findTilesByColumn() {
        let columns = {};
        for (let i = 0; i <this.GRID_SIZE; i++) {
            const column = TILES.filter((tile) => tile.x === i);
            if (column.length !== 0) {
                columns[i] = column;
            }
        }
        return columns;
    }

    findTilesByRow() {
        let rows = {};
        for (let i = 0; i <this.GRID_SIZE; i++) {
            const row = TILES.filter((tile) => tile.y === i);
            if (row.length !== 0) {
                rows[i] = row;
            }
        }
        return rows;
    }
}

export default Grid;