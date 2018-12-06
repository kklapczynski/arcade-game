import Player from './Player';
import Enemy from './Enemy';
import Engine from './Engine';
import Resources from './Resources';
import * as globals from './globals.js';
// DONE: rebuild to use modules with babel and webpack

// DONE: add canvas to document and save its context to pass where needed
const doc = window.document;
const canvas = doc.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = globals.canvasWidth;
canvas.height = globals.canvasHeight;
doc.body.appendChild(canvas);

const resources = new Resources();
console.log(resources._load);
/* Go ahead and load all of the images we know we're going to need to
    * draw our game level. Then set init as the callback method, so that when
    * all of these images are properly loaded our game will start.
    */

resources.load([
'images/stone-block.png',
'images/water-block.png',
'images/grass-block.png',
'images/enemy-bug.png',
'images/char-boy.png'
]);

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [];
for(let i=1; i<=4;i++) {
    allEnemies.push(new Enemy(resources, ctx));
};

// Place the player object in a variable called player
const player = new Player(allEnemies, ctx, resources);

// instantiate Engine object
const engine = new Engine(window, allEnemies, player, resources, ctx, canvas);

resources.onReady(engine.init);

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