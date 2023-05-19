import Grid from "./grid.js";
import Tile from "./tile.js";

import { TILES } from "./tile.js";

let GRID_SIZE = 4;
let CELL_SIZE = 20;
let CELL_GAP = 2;

let EMPTY_CELL;
let ACTION = false;

let previousX;
let previousY;

function setupInput() {
    window.addEventListener("keydown", handleInput, { once: true })
}

function handleInput(e) {
    ACTION = false;

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
        default:
            setupInput();
            return;
    }

    if (ACTION) generateTile();

    if (game.emptyCells.length !== 0) {
        setupInput();
    } else {
        console.log("cells full")
        if (movesAvailable()) {
            setupInput();
        }
        else {
            console.log("Game Over");
        }
    }
}

function moveUp() {
    const columns = game.findTilesByColumn();
    Object.entries(columns).forEach(([column, tiles]) => {
        tiles.sort((a, b) => a.y - b.y);
        for (let i = 0; i < tiles.length; i++) {
            let currentTile = tiles[i];
            let nextTile = tiles[i + 1];
            if (currentTile.value === nextTile?.value) {
                ACTION = true;
                currentTile.updateValue();
                tiles.splice(i + 1, 1);

                const nextTileIndex = TILES.indexOf(nextTile);
                TILES.splice(nextTileIndex, 1);
                nextTile.destructor();
                nextTile = null;
            }
            previousY = currentTile.y;
            currentTile.yValue = i;
            if (previousY !== currentTile.y) {
                ACTION = true;
            }
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
                ACTION = true;
                currentTile.updateValue();
                tiles.splice(i + 1, 1);

                const nextTileIndex = TILES.indexOf(nextTile);
                TILES.splice(nextTileIndex, 1);
                nextTile.destructor();
                nextTile = null;
            }
            previousY = currentTile.y;
            currentTile.yValue = GRID_SIZE - i - 1;
            if (previousY !== currentTile.y) {
                ACTION = true;
            }
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
                ACTION = true;
                currentTile.updateValue();
                tiles.splice(i + 1, 1);

                const nextTileIndex = TILES.indexOf(nextTile);
                TILES.splice(nextTileIndex, 1);
                nextTile.destructor();
                nextTile = null;
            }
            previousX = currentTile.x
            currentTile.xValue = i;
            if (previousX !== currentTile.x) {
                ACTION = true;
            }
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
                ACTION = true;
                currentTile.updateValue();
                tiles.splice(i + 1, 1);

                const nextTileIndex = TILES.indexOf(nextTile);
                TILES.splice(nextTileIndex, 1);
                nextTile.destructor();
                nextTile = null;
            }
            previousX = currentTile.x
            currentTile.xValue = GRID_SIZE - i - 1;
            if (previousX !== currentTile.x) {
                ACTION = true;
            }
        }
    });
}

function generateTile() {
    EMPTY_CELL = game.randomEmptyCell();
    const newTile = new Tile(EMPTY_CELL.x, EMPTY_CELL.y);
    TILES.push(newTile);
}

function movesAvailable() {
    for (let i = 0; i < TILES.length; i++) {
        const tile = TILES[i];
        if (tile.x > 0 && TILES.some(t => t.x === tile.x - 1 && t.y === tile.y && t.value === tile.value)) {
            return true;
        }
        if (tile.x < GRID_SIZE - 1 && TILES.some(t => t.x === tile.x + 1 && t.y === tile.y && t.value === tile.value)) {
            return true;
        }

        if (tile.y > 0 && TILES.some(t => t.x === tile.x && t.y === tile.y - 1 && t.value === tile.value)) {
            return true;
        }
        if (tile.y < GRID_SIZE - 1 && TILES.some(t => t.x === tile.x && t.y === tile.y + 1 && t.value === tile.value)) {
            return true;
        }
    }

    return false;
}

const game = new Grid(GRID_SIZE, CELL_SIZE, CELL_GAP);

EMPTY_CELL = game.randomEmptyCell();
const firstTile = new Tile(EMPTY_CELL.x, EMPTY_CELL.y);
TILES.push(firstTile);
EMPTY_CELL = game.randomEmptyCell();
const secondTile = new Tile(EMPTY_CELL.x, EMPTY_CELL.y);
TILES.push(secondTile);

setupInput();