var level = 0,
    levels = ['images/char-girl.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-princess-girl.png'],
    collections = [],
    stars = 0,
    key = false;

var Item = function( newType, xLoc, yLoc ) {
    this.type = newType;
    switch( type ){
    case "star":
        this.sprite = "images/Star.png";
    case "key":
        this.sprite = "images/Key.png";
    case "heart":
        this.sprite = "images/Heart.png";
    }
    this.x = xLoc;
    this.y = yLoc;
}

Item.prototype.render = function() {
    ctx.drawImage( Resources.get(this.sprite), this.x * 101, this.y * 83 );
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.set();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = (((this.x + 100) + (this.speed * dt)) % 600) - 100;
    if( this.x > 499 ) {
        this.set();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.randomizeSpeed = function() {
    this.speed = Math.random() * (200 - 75) + 75;
}

Enemy.prototype.selectRow = function() {
    this.startingY = [60, 145, 230];
    this.y = this.startingY[Math.floor(Math.random() * 10) % 3];
}

Enemy.prototype.set = function() {
    this.x = -100;
    this.selectRow();
    this.randomizeSpeed();
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = levels[level];
    this.x = 202;
    this.y = 404;
    this.speed = 1;
}

Player.prototype.reset = function() {
    this.x = 202;
    this.y = 385;
}

Player.prototype.update = function(dt) { }

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(input) {
    switch(input) {
    case 'left':
        this.x -= 100;
        if( this.x < 4 ) {
            this.x = 4;
        }
        break;
    case 'up':
        this.y -= 85;
        if( this.y < 0 ) {
            this.y = 0;
        }
        break;
    case 'right':
        this.x += 100;
        if( this.x > 400 ){
            this.x = 400;
        }
        break;
    case 'down':
        this.y += 85;
        if( this.y > 400 ) {
            this.y = 400;
        }
        break;
    default:
        console.log("Something went wrong! Can't move character!");
    }
}

// Returns the grid square occupied by the provided x and y locations
function grid( xLoc, yLoc ) {
    var gridX = Math.ceil( xLoc / 100 );
    var gridY = Math.ceil( yLoc / 85 );

    return {x: gridX, y: gridY};
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for( var i = 0; i < 4; i ++){
    var enemy = new Enemy();
    allEnemies.push(enemy);
}
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
