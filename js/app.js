// global constants
const stepX = 101;
const stepY = 83;
const canvasWidth = 505;
const canvasHeight = 606;

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
        // DONE: randomize rows (y) from 1*83 to 4*stepY
        // DONE: randomize when bug is appearing on stage
        // DONE: randomize speed
        this.x = getRandomInt(-6, -1)*stepX;
        this.y = getRandomInt(1, 4)*stepY;
        this.speed = getRandomInt(100, 500);
    }

    // properties and methods defined outside constructor are inherited by each instance

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.

        this.x += this.speed * dt;

        // TODO: bug comes back on the stage after leaving it with different paramters
        if (this.x > canvasWidth) {
            this.x = getRandomInt(-5, 0)*stepX;
            this.y = getRandomInt(1, 4)*stepY;
            this.speed = getRandomInt(100, 500);
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
        this.x = 2*stepX; // start in middle column
        this.y = 5*stepY;  // and in first row from bottom
        this.moveX = 0;
        this.moveY = 0;
    }

    update() {
        // console.log(`Player update()`);
        // TODO: find out what to do here
        this.x += this.moveX;
        this.y += this.moveY;
        this.moveX = 0;
        this.moveY = 0;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // DONE: handle input - keybord arrow buttons press
    handleInput(moveDirection) {
        console.log(`Handling Players input`);
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
for(i=1; i<=4;i++) {
    allEnemies.push(new Enemy());
}
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