// TODO: import image files here to use across application
// global constants
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