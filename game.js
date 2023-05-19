import Grid from "./grid.js";
import Tile from "./tile.js";

// import { CELLS } from "./cell.js";
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

    // generateTile();
    setupInput();
}

function moveUp() {
    const columns = game.findTilesByColumn();
    Object.entries(columns).forEach(([column, tiles]) => {
        tiles.sort((a, b) => a.y - b.y);
        for (let i = 0; i < tiles.length; i++) {
            let currentTile = tiles[i];
            let nextTile = tiles[i + 1];
            if (currentTile.value === nextTile?.value) {
                currentTile.updateValue();
                tiles.splice(i + 1, 1);

                const nextTileIndex = TILES.indexOf(nextTile);
                TILES.splice(nextTileIndex, 1);
                nextTile.destructor();
                nextTile = null;
            }
            currentTile.yValue = i;
        }
    });
}

function moveDown() {
    const columns = game.findTilesByColumn();
    Object.entries(columns).forEach(([column, tiles]) => {
        tiles.sort((a, b) => b.y - a.y);
        for (let i = 0; i < tiles.length; i++) {
            let currentTile = tiles[i];
            let nextTile = tiles[i + 1];
            if (currentTile.value === nextTile?.value) {
                currentTile.updateValue();
                tiles.splice(i + 1, 1);

                const nextTileIndex = TILES.indexOf(nextTile);
                TILES.splice(nextTileIndex, 1);
                nextTile.destructor();
                nextTile = null;
            }
            currentTile.yValue = GRID_SIZE - i - 1;
        }
    });
}

function moveLeft() {
    const rows = game.findTilesByRow();
    Object.entries(rows).forEach(([row, tiles]) => {
        tiles.sort((a, b) => a.x - b.x);
        for (let i = 0; i < tiles.length; i++) {
            let currentTile = tiles[i];
            let nextTile = tiles[i + 1];
            if (currentTile.value === nextTile?.value) {
                currentTile.updateValue();
                tiles.splice(i + 1, 1);

                const nextTileIndex = TILES.indexOf(nextTile);
                TILES.splice(nextTileIndex, 1);
                nextTile.destructor();
                nextTile = null;
            }
            currentTile.xValue = i;
        }
    });
}

function moveRight() {
    const rows = game.findTilesByRow();
    Object.entries(rows).forEach(([row, tiles]) => {
        tiles.sort((a, b) => b.x - a.x);
        for (let i = 0; i < tiles.length; i++) {
            let currentTile = tiles[i];
            let nextTile = tiles[i + 1];
            if (currentTile.value === nextTile?.value) {
                currentTile.updateValue();
                tiles.splice(i + 1, 1);

                const nextTileIndex = TILES.indexOf(nextTile);
                TILES.splice(nextTileIndex, 1);
                nextTile.destructor();
                nextTile = null;
            }
            currentTile.xValue = GRID_SIZE - i - 1;
        }
    });
}

function generateTile() {
    EMPTY_CELL = game.randomEmptyCell();
    const newTile = new Tile(EMPTY_CELL.x, EMPTY_CELL.y);
    TILES.push(newTile);
}

const game = new Grid(GRID_SIZE, CELL_SIZE, CELL_GAP);

EMPTY_CELL = game.randomEmptyCell();
const firstTile = new Tile(EMPTY_CELL.x, EMPTY_CELL.y);
TILES.push(firstTile);
EMPTY_CELL = game.randomEmptyCell();
const secondTile = new Tile(EMPTY_CELL.x, EMPTY_CELL.y);
TILES.push(secondTile);

setupInput();