//Taken canvas from HTML game page
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var menu = new Audio('menu.mp3');
menu.play();

//starts the function startPage
startPage();

//makes two variables that are audio tracks
var audio = new Audio('naruto.mp3');
var boom = new Audio('boom.mp3');

//function startpage which contains the startpage of the game
function startPage(e) {

    //writes instructions for player to read if nessesary
    context.font = "40px Arial";
    context.fillStyle = 'darkred';
    context.fillText("Point-2-Point", 370, 50);

    context.font = "30px Arial";
    context.fillStyle = 'blue';
    context.fillText("<Press Spacebar to Play>", 310, 100);

    context.font = "25px Arial";
    context.fillStyle = 'black';
    context.fillText("To play the game, you must use the arrow keys to move up, down, left and right.", 30, 180);
    context.fillText("Try not to die, the smaller the death count the more points and bigger the score.", 30, 220);
    context.fillText("Try not to get hit by the moving blue objects, and try not to touch the non moving", 30, 260);
    context.fillText("objects as both will result in a death and give you a lower score. Have Fun !!!!!!", 30, 300);

    context.fillStyle = 'green';
    context.fillText("If you are registered your score will be ranked", 230, 380);
    context.fillText("if not have fun!!", 380, 415);
}

//this is a function where you need to press space bar to start the actual game
var space = 32;

document.onkeydown = function (event) {

    event = event || window.event;

    var e = event.keyCode;

    if (e == space) {
        //starts the audio track that will play through out the game
        audio.play();
        menu.pause();
        //starts level1
        level1();
        space++;
    }
}

//making two variables to use during and after game
var score = 0;

var deathCount = 0;

//making a function that makes the player object
function Player(xPos, yPos, width, height, speed) {

    //this contains the different attributes of the player
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
    this.speed = speed;

    this.playerStuff = function () {

        //Wall Collition Detection so if player touches wall he doesnt go out
        if (player.xPos <= 0) {
            player.xPos += player.speed;
        }
        if (player.yPos <= 0) {
            player.yPos += player.speed;
        }
        if (player.xPos >= canvas.width - 24) {
            player.xPos -= player.speed;
        }
        if (player.yPos >= canvas.height - 24) {
            player.yPos -= player.speed;
        }

        //this actually draws the player in the canvas
        context.fillStyle = "red";
        context.fillRect(this.xPos, this.yPos, this.width, this.height, this.speed);
        context.strokeStyle;
        context.lineWidth = 2;
        context.strokeRect(this.xPos, this.yPos, this.width, this.height);
    }
}

//making a variable that creates the player with the given attributes
var player = new Player(1, canvas.height / 2, 25, 25, 5);

//array that holds the keycodes of the arrow keys
var keys = [];
keys.UP = 38;
keys.LEFT = 37;
keys.RIGHT = 39;
keys.DOWN = 40;

//function that takes a keycode and does a process depending what keycode is pressed
document.body.onkeyup =
document.body.onkeydown = function (e) {
    if (e.preventDefult) {
        e.preventDefult();
    }
    else {

        e.returnValue = false;
    }

    var kc = e.keyCode || e.which;
    keys[kc] = e.type == 'keydown';
}

//function that moves the player along the x and y axis
var movePlayer = function (dx, dy) {

    player.xPos += (dx || 0) * player.speed;
    player.yPos += (dy || 0) * player.speed;
    player.element.style.left = player.xPos + 'px';
    player.element.style.top = player.yPos + 'px';
}

//function that takes arrow press and does the function move player depending on the key pressed
var playerMove = function () {

    if (keys[keys.LEFT]) {
        movePlayer(-1, 0);
    }
    if (keys[keys.RIGHT]) {
        movePlayer(1, 0);
    }
    if (keys[keys.UP]) {
        movePlayer(0, -1);
    }
    if (keys[keys.DOWN]) {
        movePlayer(0, 1);
    }
}

//this creates the enemy objects
function Object(xO, yO, width, height) {

    this.xO = xO;
    this.yO = yO;
    this.width = width;
    this.height = height;

    //function draw is used once a var is made for the enemy object to then draw the object
    this.draw = function () {
        context.fillStyle = "blue";
        context.fillRect(this.xO, this.yO, this.width, this.height);
        context.strokeStyle;
        context.lineWidth = 2;
        context.strokeRect(this.xO, this.yO, this.width, this.height);

        //this function detects if the player has touched the enemy
        if (player.xPos < this.xO + this.width &&
			player.xPos + player.width > this.xO &&
			player.yPos < this.yO + this.height &&
			player.height + player.yPos > this.yO) {

            //plays fun sound effect if touched
            boom.play();

            //resets postion of player and add one to deathcount
            player.xPos = 1;
            player.yPos = canvas.height / 2;
            deathCount++;

        }
    }
}

//this function clears the canvas and is used later in the code
function clear() {

    context.fillStyle = "#f1f1f1";
    context.fillRect(0, 0, canvas.width, canvas.height);
}

//this is the deathcount which is presented to the player while playing
function gameScore() {

    context.font = "20px Arial";
    context.fillStyle = 'black';
    context.fillText("Deaths:", canvas.width - 75, 20);
    context.fillText(deathCount, canvas.width - 45, 50);
}

function levelInd() {

    context.font = "20px Arial";
    context.fillStyle = 'black';
    context.fillText("Level", 5, 20);
    context.fillText(levelOn + "/3", 5, 50);
}

var levelOn = 1;

//safezones which is located on both sides of map
function safeZone() {

    context.fillStyle = 'lightgreen';
    context.fillRect(0, 0, 80, canvas.height);

    context.fillStyle = 'lightgreen';
    context.fillRect(canvas.width - 80, 0, 80, canvas.height);
}

//update function clears and redraws the player and deathcount and safezones
function update() {

    clear();
    safeZone();
    player.playerStuff();
    gameScore();
    levelInd();

}

//level 1 starts here 
//bellow is a interval function main loop of the game
//does the function player move and object move 60 times in one second
function level1() {

    var lvl1 = setInterval(function () {

        objectMove();
        playerMove();

    }, 1000 / 60);

    //this draws the enemy objects in the first level
    function drawObject() {

        object.draw();
        object2.draw();
        object3.draw();
        object4.draw();
        object5.draw();
        object6.draw();
        object7.draw();
        object8.draw();
        object9.draw();
        object10.draw();
    }

    //giving the variables attributes to make the enemy objects
    var object = new Object(150, 200, 25, 25);
    var object2 = new Object(250, 200, 25, 25);
    var object3 = new Object(350, 200, 25, 25);
    var object4 = new Object(450, 200, 25, 25);
    var object5 = new Object(550, 200, 25, 25);
    var object6 = new Object(650, 200, 25, 25);
    var object7 = new Object(750, 200, 25, 25);
    var object8 = new Object(750, canvas.height / 2, 25, 25);
    var object9 = new Object(750, 10, 25, 25);
    var object10 = new Object(750, canvas.height - 35, 25, 25);

    //direction is used as a flag variable for the direction of the objects
    var direction = 7;
    var direction2 = 7;

    //this moves the objects in the respected ways
    function objectMove() {

        object.yO -= direction;
        object2.yO += direction;
        object3.yO -= direction;
        object4.yO += direction;
        object5.yO -= direction;
        object6.yO += direction;
        object7.yO -= direction;

        object8.xO -= direction2;
        object9.xO -= direction2;
        object10.xO -= direction2;

        if (object.yO <= canvas.height - canvas.height) {
            direction = -7;
            object.yO -= direction;
        }

        if (object.yO >= canvas.height - 10) {
            direction = 7;
            object.yO -= direction;
        }
        if (object8.xO <= 100) {
            direction2 = -7;
            object8.xO -= direction2;
        }
        if (object8.xO >= canvas.width - 150) {
            direction2 = 7;
            object8.xO -= direction2;

        }

        //does function update and drawobject so that player as well all other objects are drawn
        update();
        drawObject();

        //if player reaches end of level moves to next level
        if (player.xPos >= canvas.width - 100) {

            player.xPos = 1;
            player.yPos = canvas.height / 2;
            score += 1500;
            clearInterval(lvl1);
            clear();

            nextLvl();
            levelOn++;

        }
    }

}

//screen that shows that next level is about to start
//as well as some comments and stuff
function nextLvl() {

    context.font = "40px Arial";
    context.fillStyle = 'red';
    context.fillText("!!! Level 2 !!!", 375, 50);
    context.fillStyle = 'black';
    context.fillText("You Have Completed The First Level", 160, 150);
    context.fillStyle = 'black';
    context.fillText("Level 2 will start in a few seconds", 180, 250);
    context.fillStyle = 'green';
    context.fillText("It only gets harder after this", 230, 350);

    //level 2 will start in 4 seconds
    setTimeout(level2, 4000);

}

//level 2 starts and has interval function again since it was stopped
//so that you could move to the next level
function level2() {

    update();

    var lvl2 = setInterval(function () {
        moveObj();

        playerMove();

    }, 1000 / 60);

    //creates the objects for level 2
    var obj = new Object(180, 200, 25, 25);
    var obj2 = new Object(680, 200, 25, 25);
    var obj10 = new Object(730, 200, 25, 25);
    var obj11 = new Object(780, 200, 25, 25);
    var obj12 = new Object(820, 200, 25, 25);

    var obj13 = new Object(580, 200, 25, 25);

    var obj3 = new Object(150, 70, 400, 10);
    var obj4 = new Object(150, canvas.height - 70, 400, 10);
    var obj5 = new Object(150, 70, 10, canvas.height - 140);
    var obj6 = new Object(630, 0, 10, 170);
    var obj7 = new Object(630, canvas.height - 170, 10, 170);
    var obj8 = new Object(630 - 400, 170, 410, 10);
    var obj9 = new Object(630 - 400, canvas.height - 170, 400, 10);

    //draws the objects for level 2
    function drawObj() {

        obj.draw();
        obj2.draw();
        obj10.draw();
        obj11.draw();
        obj12.draw();
        obj13.draw();

        obj3.draw();
        obj4.draw();
        obj5.draw();
        obj6.draw();
        obj7.draw();

        obj8.draw();
        obj9.draw();
    }

    //flag variable for level 2 objects
    var dir = 8;

    function moveObj() {

        obj.yO -= dir;
        obj2.yO += dir;
        obj10.yO -= dir;
        obj11.yO += dir;
        obj12.yO -= dir;
        obj13.yO -= dir;

        if (obj.yO <= canvas.height - canvas.height) {
            dir = -8;
            obj.yO -= dir;
        }

        if (obj.yO >= canvas.height - 10) {
            dir = 8;
            obj.yO -= dir;
        }

        update();
        drawObj();

        //if function so that when level is complete score is given and moves to the next level
        if (player.xPos >= canvas.width - 100) {
            player.xPos = 1;
            player.yPos = canvas.height / 2;

            score += 1500;

            clearInterval(lvl2);
            clear();
            nextLvl2();

            levelOn++;


        }
    }

}

//another page that tell the player where they are at
//and some comments
function nextLvl2() {

    context.font = "40px Arial";
    context.fillStyle = 'red';
    context.fillText("!!! Level 3 !!!", 375, 50);
    context.fillStyle = 'black';
    context.fillText("You Have Completed The second Level", 160, 150);
    context.fillStyle = 'black';
    context.fillText("Level 3 will start in a few seconds", 180, 250);
    context.fillStyle = 'green';
    context.fillText("Prepare for death", 330, 350);

    setTimeout(level3, 4000);

}

//starts level 3 same as level 2
function level3() {

    update();

    var lvl3 = setInterval(function () {

        moveFinal();
        playerMove();

    }, 1000 / 60);

    //creating objects for level 3
    var final = new Object(170, 200, 25, 25);
    var final8 = new Object(215, 200, 25, 25);

    var final9 = new Object(420, 200, 25, 25);
    var final10 = new Object(465, 200, 25, 25);

    var final11 = new Object(670, 200, 25, 25);
    var final12 = new Object(715, 200, 25, 25);

    var final13 = new Object(canvas.width / 2, canvas.height / 2, 25, 25);



    var final2 = new Object(200, 0, 10, 185);
    var final3 = new Object(200, canvas.height - 170, 10, 170);

    var final4 = new Object(450, 0, 10, 185);
    var final5 = new Object(450, canvas.height - 170, 10, 170);

    var final6 = new Object(700, 0, 10, 185);
    var final7 = new Object(700, canvas.height - 170, 10, 170);

    //draws objects for level 3
    function drawFinal() {
        final.draw();
        final8.draw();
        final9.draw();
        final10.draw();
        final11.draw();
        final12.draw();
        final13.draw();


        final2.draw();
        final3.draw();
        final4.draw();
        final5.draw();
        final6.draw();
        final7.draw();

    }

    //flag varibale for the objects of level 3
    var dir2 = 8;
    var dir3 = 8;

    //moves the objects in level 3
    function moveFinal() {

        final.yO -= dir2;
        final8.yO += dir2;

        final9.yO -= dir2;
        final10.yO += dir2;

        final11.yO -= dir2;
        final12.yO += dir2;

        final13.xO -= dir3;

        if (final.yO <= canvas.height - canvas.height) {
            dir2 = -8;
            final.yO -= dir2;
        }
        if (final.yO >= canvas.height - 25) {
            dir2 = 8;
            final.yO -= dir2;
        }

        if (final13.xO <= 100) {
            dir3 = -8;
            final13.xO -= dir3;
        }
        if (final13.xO >= canvas.width - 150) {
            dir3 = 8;
            final13.xO -= dir3;
        }

        update();
        drawFinal();
        //ends the level once reached the end
        if (player.xPos >= canvas.width - 100) {

            score += 1500;
            deathCount++;

            clearInterval(lvl3);
            clear();
            gameFinish();
        }

    }

}

//page that is displayed once the game ends
function gameFinish() {

    //variable that calculates the score
    //score is caluculated 
    //each level gives 1500 points and is
    //divided by the amount of deaths and gives the final score
    var finalScore = Math.ceil(score / deathCount);

    //displays the final score
    //and also tells the player that the game is over
    context.font = "40px Arial";
    context.fillStyle = 'red';
    context.fillText("!!!! Game Over !!!!", 310, 50);

    context.fillStyle = 'black';
    context.fillText("Your Score is :", 355, 200);

    context.fillText("'" + finalScore + "'", 440, 250);

    context.fillStyle = 'green';
    context.fillText("To Play Again", 350, 360);

    context.font = "30px Arial";
    context.fillStyle = 'blue';
    context.fillText("Refresh Page", 390, 400);
    scoreRank();

}



