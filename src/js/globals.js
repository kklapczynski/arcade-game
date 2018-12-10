import * as img_stone from '../images/stone-block.png';
import * as img_water from '../images/water-block.png';
import * as img_grass from '../images/grass-block.png';
import * as img_enemy from '../images/enemy-bug.png';
import * as img_boy from '../images/char-boy.png';
// global constants
// to store url of imported image
// https://stackoverflow.com/questions/39458511/how-to-use-es6-import-for-images
export const img_stone_url = img_stone.default;
export const img_water_url = img_water.default;
export const img_grass_url = img_grass.default;
export const img_enemy_url = img_enemy.default;
export const img_boy_url = img_boy.default;
export const stepX = 101;  // equals col width in engine.render()
export const stepY = 83;   // equals row heigth in engine.render()
export const canvasWidth = 505;
export const canvasHeight = 606;

// canvas size: canvas.width = 505; canvas.height = 606;
// col and row sizes: col * 101, row * 83
// number of cols and rows: numRows = 6, numCols = 5,

// from https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}