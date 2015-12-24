// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (Math.floor((Math.random() * (200 -75)) + 75) * dt);
    if(this.x >= 505) {
        allEnemies.splice();
        this.x = enemyXLocation();
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function(x,y) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function(dt) {

};

Player.prototype.reset = function() {
    player = new Player();
};

Player.prototype.render = function(x,y) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keys) {
    switch(keys){

        case 'left':
        if(this.x>100){
            this.x = this.x - 100;
            break;
        }else{
            break;
        };

        case 'right':
        if(this.x<405){
            this.x = this.x + 100;
            break;
        } else{
            break;
        };

        case 'up':
        if(this.y>70){
            this.y = this.y - 101;
            break;
        }else{
            break;
        };

        case 'down':
        if(this.y< 350){
            this.y = this.y + 101;
            break;
        }else{
            break;
        };

    }

};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

//Create randomized y start location for enemy
var enemyXLocation = function() {
    return ((Math.random() * (-400 - (-5))) + -5);
};

//Create the bugs
var enemyRow = [60, 145, 230];

function bugGenerator() {
    for(var i = 0; allEnemies.length <=2; i++) {
        var bug = new Enemy(enemyXLocation(), enemyRow[i]);
        allEnemies.push(bug);
    }
};
bugGenerator();

var player = new Player(205,380);

Player.prototype.checkCollisions = function() {
    for(var i = 0; i <= allEnemies.length; i++) {
        if (allEnemies[i].x === (player.x + 30) && allEnemies[i].y === (player.y = 30)){
            player.reset();
        };
    };
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
