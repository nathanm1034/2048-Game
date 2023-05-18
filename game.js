import Grid from "./grid.js";

let GRID_SIZE = 2;
let CELL_SIZE = 20;
let CELL_GAP = 2

const game = new Grid(GRID_SIZE, CELL_SIZE, CELL_GAP);
console.log(game.randomEmptyCell());