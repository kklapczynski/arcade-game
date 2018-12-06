import * as globals from './globals.js';

export default class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    // constructor function holds properties and methods owned by each instance
    constructor(resources, ctx) {
        this.sprite = 'images/enemy-bug.png';
        this.height = 67;   // measured with page ruler on running game
        this.width = 75;    // measured with page ruler on running game (99px), but reduced for better collision timing
        // DONE: randomize rows (y) from 1*83 to 4*stepY
        // DONE: randomize when bug is appearing on stage
        // DONE: randomize speed
        // DONE: optimize: create inherited method to set own properties
        this.x = this.setPropertyX(6, 1, globals.stepX);        // starting horizontal position of enemy
        this.y = this.setPropertyY(1, 4, globals.stepY);        // starting vertical position of enemy
        this.speed = this.setPropertySpeed(100, 500);   // move distance in pixels per update (engine cycle)
        this.resources = resources;
        this.ctx = ctx;
    }

    // properties and methods defined outside constructor are inherited by each instance
    setPropertyX(maxColsBeforeCanvas, minColsBeforeCanvas, colWidth) {
        return globals.getRandomInt(-maxColsBeforeCanvas, -minColsBeforeCanvas)*colWidth;
    }

    setPropertyY(minRowNo, maxRowNo, rowHeight) {
        // y coordinate goes from top down: min -> top, max -> bottom, 1st row is number 0
        return globals.getRandomInt(minRowNo, maxRowNo)*rowHeight;
    }

    setPropertySpeed(min, max) {
        return globals.getRandomInt(min, max);
    }

    // resets enemy that leaves the stage
    resetEnemy() {
        this.x = this.setPropertyX(6, 1, globals.stepX);
        this.y = this.setPropertyY(1, 4, globals.stepY);
        this.speed = this.setPropertySpeed(100, 500);
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.

        this.x += this.speed * dt;

        // DONE: enemy comes back on the stage after leaving it with different paramters
        if (this.x > globals.canvasWidth) {
            this.resetEnemy();
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        this.ctx.drawImage(this.resources.getResourceCached(this.sprite), this.x, this.y);
    }
}