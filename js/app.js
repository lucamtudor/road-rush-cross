var CELL_W = 101;
var CELL_H = 83;

var SCENE_W = CELL_W * 4;
var SCENE_H = CELL_H * 5;

var PLAYER_INIT_X = CELL_W * 2;
var PLAYER_INIT_Y = CELL_H * 4.5;

var score = 0;

var randomIntegerFromRange = function (lowerBound, upperBound) {
    return Math.round(Math.random() * (upperBound - lowerBound) + lowerBound);
};

var Entity = function (sprite) {
    this.sprite = sprite;
    this.x = 0;
    this.y = 0;
};

Entity.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function () {
    Entity.call(this, 'images/enemy-bug.png');

    this.reset();
};

Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.reset = function () {
    this.x = -CELL_W;
    this.y = (randomIntegerFromRange(1, 3) - 0.5) * CELL_H;
    this.vx = randomIntegerFromRange(200, 400);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    this.x = this.x + this.vx * dt;
    if (this.x >= SCENE_W) {
        this.reset();
    }
};

var Player = function () {
    Entity.call(this, 'images/char-horn-girl.png');

    this.reset();
};

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

Player.prototype.reset = function () {
    this.x = PLAYER_INIT_X;
    this.y = PLAYER_INIT_Y;
};

Player.prototype.update = function () {
};

Player.prototype.hasReachedDestination = function () {
    return this.y <= 0;
};

Player.prototype.moveLeft = function () {
    if (this.x > 0) {
        this.x = this.x - CELL_W;
    }
};

Player.prototype.moveUp = function () {
    if (this.y > 0) {
        this.y = this.y - CELL_H;
    }
};

Player.prototype.moveRight = function () {
    if (this.x < SCENE_W) {
        this.x = this.x + CELL_W;
    }
};

Player.prototype.moveDown = function () {
    if (this.y < (SCENE_H - CELL_H)) {
        this.y = this.y + CELL_H;
    }
};

Player.prototype.handleInput = function (key) {
    if ('left' === key) {
        this.moveLeft();
    } else if ('up' === key) {
        this.moveUp();
    } else if ('right' === key) {
        this.moveRight();
    } else if ('down' === key) {
        this.moveDown();
    }

    if (this.hasReachedDestination()) {
        score++;
        this.reset();
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
