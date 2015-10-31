// Globals
var count = 0,
    startX = 200,
    startY = 400;

// Enemies our player must avoid

var Enemy = function(x,y, speed) {
    'use strict';
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    'use strict';
    var canvasWidth = 505,
        offCanvas = -50;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if ( this.x > canvasWidth){
        this.x = offCanvas;
        this.speed = Math.ceil(Math.random() * 6) * 150;
    }
    // looks for collision with player
    this.checkCollision(player);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    'use strict';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Sees if there has been a collision with the player and resets player if it occurs
Enemy.prototype.checkCollision = function(player) {
    'use strict';
    var enemyObj = 50;
    if (player.x < this.x + enemyObj &&
        player.x + enemyObj > this.x &&
        player.y < this.y + enemyObj &&
        enemyObj + player.y > this.y) {
        player.reset();
        player.negScore();
    }
};

// Enemy objects
var jack = new Enemy(0,60,300),
    jill = new Enemy(100,140,200),
    stacy = new Enemy(200,220,300),
    brian = new Enemy(60,300,900);

// Place all enemy objects in an array called allEnemies
var allEnemies = [jack, jill, stacy, brian];

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    'use strict';
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

// This provides a reset point for collision and restart
Player.prototype.reset = function(){
    'use strict';
    this.x = startX;
    this.y = startY;
};

// Adds score if player reaches the water
Player.prototype.score = function(){
    'use strict';
    count = count + 1;
    document.getElementById('score').innerHTML = count;
    if (count === 10){
        window.alert('You are doing great!');
    } else if (count === 20){
        window.alert('Wow! You are a pro!');
    } else if (count === 30){
        window.alert('Umm... You\'re addicted!');
    }
};

// Subtracts score if checkCollision() is triggered
Player.prototype.negScore = function(){
    'use strict';
    count = count - 1;
    document.getElementById('score').innerHTML = count;
    if (count === -10){
        window.alert('You aren\'t doing so great!');
    } else if (count === -20){
        window.alert('I feel a comeback!');
    } else if (count === -30){
        window.alert('Are you even trying?');
    }
};

// This contains player within canvas and reset once player hits water
Player.prototype.update = function(){
    'use strict';
    var endPoint = -39,
        max = 400,
        min = 0;
    if (this.y < endPoint){
        this.reset();
        this.score();
    } else if (this.y > (max + 1)){
        this.y = max;
    } else if(this.x < min){
        this.x = min;
    } else if(this.x > max + 1){
        this.x = max;
    }
};

Player.prototype.render = function(){
    'use strict';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Updates player when key press is made and assigns pixel value to key movements
Player.prototype.handleInput = function(keyCode) {
    'use strict';
     var horizontal = 101,
         vertical = 88;
    if (keyCode === 'left'){
        this.x = this.x - horizontal;
    } else if ( keyCode === 'right'){
        this.x = this.x + horizontal;
    } else if (keyCode === 'up'){
        this.y = this.y - vertical;
    } else if (keyCode === 'down'){
        this.y = this.y + vertical;
    }
};

// Place the player object in a variable called player
var player = new Player(startX, startY);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    'use strict';
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

