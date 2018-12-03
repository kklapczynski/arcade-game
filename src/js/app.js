// TODO: rebuild to use modules with babel and webpack
// global constants
const stepX = 101;  // equals col width in engine.render()
const stepY = 83;   // equals row heigth in engine.render()
const canvasWidth = 505;
const canvasHeight = 606;
console.log('app.js');
// from https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Enemies our player must avoid
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    // constructor function holds properties and methods owned by each instance
    constructor() {
        this.sprite = 'images/enemy-bug.png';
        this.height = 67;   // measured with page ruler on running game
        this.width = 75;    // measured with page ruler on running game (99px), but reduced for better collision timing
        // DONE: randomize rows (y) from 1*83 to 4*stepY
        // DONE: randomize when bug is appearing on stage
        // DONE: randomize speed
        // DONE: optimize: create inherited method to set own properties
        this.x = this.setPropertyX(6, 1, stepX);        // starting horizontal position of enemy
        this.y = this.setPropertyY(1, 4, stepY);        // starting vertical position of enemy
        this.speed = this.setPropertySpeed(100, 500);   // move distance in pixels per update (engine cycle)
    }

    // properties and methods defined outside constructor are inherited by each instance
    setPropertyX(maxColsBeforeCanvas, minColsBeforeCanvas, colWidth) {
        return getRandomInt(-maxColsBeforeCanvas, -minColsBeforeCanvas)*colWidth;
    }

    setPropertyY(minRowNo, maxRowNo, rowHeight) {
        // y coordinate goes from top down: min -> top, max -> bottom, 1st row is number 0
        return getRandomInt(minRowNo, maxRowNo)*rowHeight;
    }

    setPropertySpeed(min, max) {
        return getRandomInt(min, max);
    }

    // resets enemy that leaves the stage
    resetEnemy() {
        this.x = this.setPropertyX(6, 1, stepX);
        this.y = this.setPropertyY(1, 4, stepY);
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
        if (this.x > canvasWidth) {
            this.resetEnemy();
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}
// canvas size: canvas.width = 505; canvas.height = 606;
// col and row sizes: col * 101, row * 83
// number of cols and rows: numRows = 6, numCols = 5,

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.height = 77;       // measured with page ruler on running game
        this.width = 68;        // measured with page ruler on running game
        this.x = 2*stepX;       // start in middle column
        this.y = 5*stepY;       // and in first row from bottom
        this.moveX = 0;         // horizontal move triggered by pressing arrow buttons
        this.moveY = 0;         // vertical move triggered by pressing arrow buttons
        this.jumpHeight = 0;    // prop used for jumping after win
        this.jumped = false;    // prop used for jumping after win
        this.numberOfJumps = 0; // prop used for jumping after win
        this.isWinner = false;  // flag to mark when game won
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
        if(this.isCollidedWithEnemy(this, allEnemies)) {
            console.log('Enemy got You! Restart the game.');
            this.resetPosition();
        }

        // update only when move made
        if( this.moveX || this.moveY) {
            // DONE: check if not outside canvas == in the rows and columns shown
            // x position within canvas so in range <0,504> (including 0, excluding 505)
            // y position within canvas so in range <0,6*stepY-1> (rows shown don't cover whole canvas -
            // see engine.render())
            if(this.isMoveInCanvas(this.x + this.moveX, this.y + this.moveY, 0, 5*stepX - 1, 0, 6*stepY -1 )) {

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
        for(let enemy of allEnemies) {
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
        this.x = 2*stepX;
        this.y = 5*stepY;
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
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // DONE: handle input - keybord arrow buttons press
    handleInput(moveDirection) {
        switch (moveDirection) {
            case 'left':
                this.moveX = -stepX;
                break;
            case 'up':
                this.moveY = -stepY;
                break;
            case 'right':
                this.moveX = stepX;
                break;
            case 'down':
                this.moveY = stepY;
                break;
            default:
                console.log(`Use keyboard arrows horsebox!`);
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [];
for(let i=1; i<=4;i++) {
    allEnemies.push(new Enemy());
};
// allEnemies.push(enemy1);

// Place the player object in a variable called player
const player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// DONE: change to keydown from keyup (works better)
// DONE: remove a problem of holding down the key
{ let keyIsDown;    // code block instead of closure to avoid global variables

    keyIsDown = false;
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    document.addEventListener('keydown', (e) => {
        if(!keyIsDown) {
            player.handleInput(allowedKeys[e.keyCode]);
            keyIsDown = true;
        }
    });

    document.addEventListener('keyup', (e) => {
        keyIsDown = false;
    });
}

// version with closure instead of ES6 code block (tested and works as well)

/* (function(){
    let keyIsDown = false;
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    document.addEventListener('keydown', function(e) {
        if(!keyIsDown) {
            player.handleInput(allowedKeys[e.keyCode]);
            keyIsDown = true;
        }
    });

    document.addEventListener('keyup', function(e) {
        keyIsDown = false;
    });
})();
*/