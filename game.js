import Grid from "./grid.js";
import Tile from "./tile.js";

let GRID_SIZE = 4;
let CELL_SIZE = 20;
let CELL_GAP = 2;

const game = new Grid(GRID_SIZE, CELL_SIZE, CELL_GAP);

let emptyCell = game.randomEmptyCell();
const initialTile = new Tile(emptyCell.x, emptyCell.y);
emptyCell = game.randomEmptyCell();
const secondTile = new Tile(emptyCell.x, emptyCell.y);