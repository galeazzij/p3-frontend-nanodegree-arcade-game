// Enemies our player must avoid
var Enemy = function(x,y,width,height) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
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

var Player = function(x,y,width,height) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
};

Player.prototype.update = function(dt) {

};

Player.prototype.reset = function() {
    player = new Player(200,380);
};

Player.prototype.render = function(x,y) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keys) {
    switch(keys){

        case 'left':
        if(this.x>90){
            this.x = this.x - 101;
            break;
        }else{
            break;
        };

        case 'right':
        if(this.x<400){
            this.x = this.x + 101;
            break;
        } else{
            break;
        };

        case 'up':
        if(this.y>0){
            this.y = this.y - 83;
            if(this.y<35){
                player.reset();
            }
            break;
        }else{
            break;
        };

        case 'down':
        if(this.y< 350){
            this.y = this.y + 83;
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
console.log(allEnemies[0]);

var player = new Player(200,380);

function checkCollisions(allEnemies, player) {
    for(var i = 0; i < 3; i++) {
        if (allEnemies[i].x < player.x + player.width &&
            allEnemies[i].x + allEnemies[i].width > player.x &&
            allEnemies[i].y < player.y +  player.height &&
            allEnemies[i].height + allEnemies[i].y > player.y){
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
