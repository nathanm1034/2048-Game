import Grid from "./grid.js";
import Tile from "./tile.js";

import { CELLS } from "./cell.js";
import { TILES } from "./tile.js";

let GRID_SIZE = 4;
let CELL_SIZE = 20;
let CELL_GAP = 2;

let EMPTY_CELL;

function setupInput() {
    window.addEventListener("keydown", handleInput, { once: true })
}

function handleInput(e) {
    switch (e.key) {
        case "ArrowUp":
            moveUp();
            break;
        case "ArrowDown":
            moveDown();
            break;
        case "ArrowLeft":
            moveLeft();
            break;
        case "ArrowRight":
            moveRight();
            break;
        case "Enter":
            generateTile();
            break;
        default:
            setupInput();
            return;
    }

    setupInput();
}

function moveUp() {
    const columns = game.findTilesByColumn();
    Object.entries(columns).forEach(([column, tiles]) => {
        tiles.sort((a, b) => a.y - b.y);
        tiles.forEach((tile, index) => {
            tile.yValue = index;
        });
    });
}

function moveDown() {
    const columns = game.findTilesByColumn();
    Object.entries(columns).forEach(([column, tiles]) => {
        tiles.sort((a, b) => b.y - a.y);
        tiles.forEach((tile, index) => {
            tile.yValue = GRID_SIZE - index - 1;
        });
    });
}

function moveLeft() {
    const rows = game.findTilesByRow();
    Object.entries(rows).forEach(([row, tiles]) => {
        tiles.sort((a, b) => a.x - b.x);
        tiles.forEach((tile, index) => {
            tile.xValue = index;
        });
    });
}

function moveRight() {
    const rows = game.findTilesByRow();
    Object.entries(rows).forEach(([row, tiles]) => {
        tiles.sort((a, b) => b.x - a.x);
        tiles.forEach((tile, index) => {
            tile.xValue = GRID_SIZE - index - 1;
        });
    });
}

function generateTile() {
    EMPTY_CELL = game.randomEmptyCell();
    const newTile = new Tile(EMPTY_CELL.x, EMPTY_CELL.y);
    TILES.push(newTile);
}

const game = new Grid(GRID_SIZE, CELL_SIZE, CELL_GAP);

EMPTY_CELL = game.randomEmptyCell();
const initialTile = new Tile(EMPTY_CELL.x, EMPTY_CELL.y);
TILES.push(initialTile);
// EMPTY_CELL = game.randomEmptyCell();
// const secondTile = new Tile(EMPTY_CELL.x, EMPTY_CELL.y);

setupInput();