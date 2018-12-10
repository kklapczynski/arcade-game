import * as globals from './globals.js';

export default class Player {
    constructor(allEnemies, ctx, resources) {
        this.sprite = globals.img_boy_url;
        this.height = 77;       // measured with page ruler on running game
        this.width = 68;        // measured with page ruler on running game
        this.x = 2*globals.stepX;       // start in middle column
        this.y = 5*globals.stepY;       // and in first row from bottom
        this.moveX = 0;         // horizontal move triggered by pressing arrow buttons
        this.moveY = 0;         // vertical move triggered by pressing arrow buttons
        this.jumpHeight = 0;    // prop used for jumping after win
        this.jumped = false;    // prop used for jumping after win
        this.numberOfJumps = 0; // prop used for jumping after win
        this.isWinner = false;  // flag to mark when game won
        this.allEnemies = allEnemies;
        this.ctx = ctx;
        this.resources = resources;
    }

    // this function gets called repeatidely in Engine in updateEntities in update in main, that is recalled all the time by win.requestAnimationFrame(main);
    update() {
        if(this.isWinner) {
            if(this.winJumping()) {
                this.resetGame();
            }
            return;
        }
        // DONE: handle collision with enemy - see project description links
        if(this.isCollidedWithEnemy(this, this.allEnemies)) {
            this.resetPosition();
        }

        // update only when move made
        if( this.moveX || this.moveY) {
            // DONE: check if not outside canvas == in the rows and columns shown
            // x position within canvas so in range <0,504> (including 0, excluding 505)
            // y position within canvas so in range <0,6*stepY-1> (rows shown don't cover whole canvas -
            // see engine.render())
            if(this.isMoveInCanvas(this.x + this.moveX, this.y + this.moveY, 0, 5*globals.stepX - 1, 0, 6*globals.stepY -1 )) {

                // change position according to arrow used
                this.x += this.moveX;
                this.y += this.moveY;
                this.clearLastMove();
                // DONE: check if water reached
                if(this.isRowReached(this.y, 0)) {
                    this.isWinner = true;
                }
            } else {
                // if move was outside canvas clear it
                this.clearLastMove();
            }
        }
    }

    resetGame() {
        this.isWinner = false;
        // reset enemies
        for(let enemy of this.allEnemies) {
            enemy.resetEnemy();
        }
        // DONE: and if so reset player position to starting position
        this.resetPosition();
    }

    winJumping() {
        if(this.numberOfJumps === 3) {
            this.numberOfJumps = 0;
            return true;
        }

        if(!this.jumped) {
            this.y -= 5;
            this.jumpHeight += 5;
            if (this.jumpHeight === 50) {
                this.jumped = true;
            }
        } else {
            this.y += 5;
            this.jumpHeight -= 5;
            if (this.jumpHeight === 0) {
                this.jumped = false;
                this.numberOfJumps += 1;
            }
        }
        return false;
    }

    isCollidedWithEnemy(playerObject, enemiesObjectsArray) {
        // with small amount of objects to check collisions the simplest approach is sufficient
        for(let enemy of enemiesObjectsArray) {
            // credits to: https://stackoverflow.com/questions/13916966/adding-collision-detection-to-images-drawn-on-canvas
            if (enemy.x < playerObject.x + playerObject.width && enemy.x + enemy.width > playerObject.x
                && enemy.y < playerObject.y + playerObject.height && enemy.y + enemy.height > playerObject.y) {
                return true;
            }
        }
    }

    resetPosition() {
        this.x = 2*(globals.stepX);
        this.y = 5*globals.stepY;
    }

    isRowReached(currentY, yToReach) {
        return currentY === yToReach;
    }

    isMoveInCanvas(x, y, canvasMinX, canvasMaxX, canvasMinY, canvasMaxY) {
        return x >= canvasMinX && x <= canvasMaxX && y >= canvasMinY && y <= canvasMaxY;
    }

    clearLastMove() {
        // clear moves after update
        this.moveX = 0;
        this.moveY = 0;
    }

    render() {
        this.ctx.drawImage(this.resources.getResourceCached(this.sprite), this.x, this.y);
    }

    // DONE: handle input - keybord arrow buttons press
    handleInput(moveDirection) {
        switch (moveDirection) {
            case 'left':
                this.moveX = -globals.stepX;
                break;
            case 'up':
                this.moveY = -globals.stepY;
                break;
            case 'right':
                this.moveX = globals.stepX;
                break;
            case 'down':
                this.moveY = globals.stepY;
                break;
            default:
                console.log(`Use keyboard arrows!`);
        }
    }
};