import Grid from "./grid.js";
import Tile from "./tile.js";

import { TILES } from "./tile.js";
import { CELLS } from "./cell.js";

let GRID_SIZE = 4;
let CELL_SIZE = 12.5;
let CELL_GAP = 1.5;

let SCORE = 0;
let HIGH_SCORE = localStorage.getItem('HIGH_SCORE'); 
if (!HIGH_SCORE) HIGH_SCORE = 0;

let EMPTY_CELL;
let ACTION = false;

let game;

let previousX;
let previousY;

let scoreLabel = document.getElementById("current-score");
let highScoreLabel = document.getElementById("high-score");

document.getElementById('play-again-button').addEventListener('click', resetGame);

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
        case "t": //test key
            showGameOverPopup();
            return;
        default:
            setupInput();
            return;
    }

    if (ACTION) {
        generateTile();
        scoreLabel.innerHTML = `${SCORE}`;
        if (SCORE > HIGH_SCORE) {
            HIGH_SCORE = SCORE;
            highScoreLabel.innerHTML = `${HIGH_SCORE}`;
            localStorage.setItem('HIGH_SCORE', HIGH_SCORE);
        }
    }

    if (game.emptyCells.length !== 0) {
        setupInput();
    } else {
        if (movesAvailable()) {
            setupInput();
        }
        else {
            showGameOverPopup()
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
                mergePieces(tiles, currentTile, nextTile, i, 1);
                continue;
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
                mergePieces(tiles, currentTile, nextTile, i, 2);
                continue;
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
                mergePieces(tiles, currentTile, nextTile, i, 3);
                continue;
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
                mergePieces(tiles, currentTile, nextTile, i, 4);
                continue;
            }
            previousX = currentTile.x
            currentTile.xValue = GRID_SIZE - i - 1;
            if (previousX !== currentTile.x) {
                ACTION = true;
            }
        }
    });
}

function mergePieces(tiles, currentTile, nextTile, i, state) {
    ACTION = true;
    tiles.splice(i + 1, 1);
    const nextTileIndex = TILES.indexOf(nextTile);
    TILES.splice(nextTileIndex, 1);

    if (state === 1) {
        currentTile.yValue = i;
        nextTile.yValue = i;
    } else if (state === 2) {
        currentTile.yValue = GRID_SIZE - i - 1;
        nextTile.yValue = GRID_SIZE - i - 1;
    } else if (state === 3) {
        currentTile.xValue = i;
        nextTile.xValue = i;
    } else if (state === 4) {
        currentTile.xValue = GRID_SIZE - i - 1;
        nextTile.xValue = GRID_SIZE - i - 1;
    }

    currentTile.updateValue();
    SCORE += currentTile.tileValue;
    setTimeout(() => {
        nextTile.destructor();
    }, 100);
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
        } else if (tile.x < GRID_SIZE - 1 && TILES.some(t => t.x === tile.x + 1 && t.y === tile.y && t.value === tile.value)) {
            return true;
        } else if (tile.y > 0 && TILES.some(t => t.x === tile.x && t.y === tile.y - 1 && t.value === tile.value)) {
            return true;
        } else if (tile.y < GRID_SIZE - 1 && TILES.some(t => t.x === tile.x && t.y === tile.y + 1 && t.value === tile.value)) {
            return true;
        }
    }
    return false;
}

function showGameOverPopup() {
    const popup = document.getElementById('game-over-popup');
    popup.classList.add('show');
    console.log("Game Over");
}

function resetGame() {
    SCORE = 0;
    scoreLabel.innerHTML = `${SCORE}`

    clearBoard();
    initializeGame();

    const popup = document.getElementById('game-over-popup');
    popup.classList.remove('show');
}

function clearBoard() {
    for (let i = 0; i < TILES.length; i++) {
        const tile = TILES[i];
        tile.destructor();
    }
    TILES.length = 0;
}

function initializeGame() {
    if (!game) {
        game = new Grid(GRID_SIZE, CELL_SIZE, CELL_GAP);
    }

    EMPTY_CELL = game.randomEmptyCell();
    const firstTile = new Tile(EMPTY_CELL.x, EMPTY_CELL.y);
    TILES.push(firstTile);
    EMPTY_CELL = game.randomEmptyCell();
    const secondTile = new Tile(EMPTY_CELL.x, EMPTY_CELL.y);
    TILES.push(secondTile);

    setupInput();
}

initializeGame();
