import Cell from "./cell.js";
import { cells } from "./cell.js";

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
            cells.push(cell);
            this.gameBoard.append(cellElement);
        }
    }

    get emptyCells() {
        return cells.filter((cell) => cell.isEmpty);
    }

    randomEmptyCell() {
        const randomIndex = Math.floor(Math.random() * (this.emptyCells.length - 0.0001));
        return this.emptyCells[randomIndex];
    }
}

export default Grid;