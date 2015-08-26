var maxSpeed = 200;
var minSpeed = 250;
var Enemy = function() {
    // Variables applied to each of our instances go here,
    var direction = Math.round(Math.random()) * 2 - 1;
    this.sprite = 'images/enemy-bug.png';
    if (direction === -1) {
        this.x = 600;
    } else {
        this.x = -200;
    }
    var yPos = function() {
        var y = [65, 145, 225];
        return y[Math.floor(Math.random() * y.length)];
    };
    this.y = yPos();
    this.speed = (Math.floor(Math.random() * maxSpeed) + minSpeed) * direction;
};


Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var finishedpos = [];

var FinishedPlayer = function(pos) {
    this.sprite = 'images/char-boy.png';
    this.y = 0;
    this.x = pos * 100;
    this.position = pos;
};

FinishedPlayer.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var safePlayers = [];

var Player = function() {

    this.x = 200;
    this.y = 400;

    this.movex = 0;
    this.movey = 0;

    this.speedX = 100;
    this.speedY = 80;

    this.numLives = 3;

    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {

    var hopX = this.x + this.moveX * this.speedX;
    if ((hopX <= 400 && this.moveX === 1) ||
        (hopX >= 0 && this.moveX === -1)) {
        this.x += this.moveX * this.speedX;
    }

    var hopY = this.y + this.moveY * this.speedY;
    if (hopY === 0) {
        finishedpos.length = 0;
        if (safePlayers.length > 0) {
            safePlayers.forEach(function(safePlayer) {
                finishedpos.push(safePlayer.position);
            });
        }
        if (finishedpos.indexOf(this.x / 100) === -1) {
            safePlayers.push(new FinishedPlayer(this.x / 100));

            this.reset();
        }
        this.moveY = 0;
    }
    if ((hopY < 450 && this.moveY === 1) ||
        (hopY > 0 && this.moveY === -1)) {
        this.y += this.moveY * this.speedY;
    }

    this.moveX = 0;
    this.moveY = 0;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(hd) {

    if (hd === 'right') {
        this.moveX = 1;
        this.moveY = 0;
    } else if (hd === 'left') {
        this.moveX = -1;
        this.moveY = 0;
    } else if (hd === 'up') {
        this.moveX = 0;
        this.moveY = -1;
    } else if (hd === 'down') {
        this.moveX = 0;
        this.moveY = 1;
    }
};

Player.prototype.checkCollisions = function() {

    var playerPosX = this.x;
    var playerPosY = this.y;
    var p = this;
    allEnemies.forEach(function(enemy) {
        var enemyPosX = enemy.x;
        var enemyPosY = enemy.y;
        if (Math.abs(enemyPosX - playerPosX) < 50 &&
            Math.abs(enemyPosY - playerPosY) < 50) {
            p.x = 200;
            p.y = 400;
        }
    });
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};


var allEnemies = [];
setInterval(function() {
        allEnemies.push(new Enemy());
    },
    3000);

var player = new Player();

var reset = function() {

    player.reset();
};


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