var Enemy = function() {
    // Variables applied to each of our instances go here,

    this.sprite = 'images/enemy-bug.png';
	this.x = -200;
	var yPos = function() {
		var y = [65, 145, 225];
		return y[Math.floor(Math.random() * y.length)];
    };
	this.y = yPos();
	this.speed = Math.floor(Math.random()*200)+150;
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

    var hopx = this.x + this.moveX * this.speedX;
    if ((hopx <= 400 && this.moveX === 1) ||
        (hopx >= 0 && this.moveX === -1)) {
        this.x += this.moveX * this.speedX;
		console.log(this.x,this.y);
    }

    var hopy = this.y + this.moveY * this.speedY;
    if ((hopy < 450 && this.moveY === 1) ||
        (hopy >= 0 && this.moveY === -1)) {
		this.y += this.moveY * this.speedY;
		console.log(this.x,this.y);
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
            };
        });
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
