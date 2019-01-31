/*
Christine Chen
Section E
cyc1@andrew.cmu.edu
Final Project
*/

var heartArray = [];
var heartCount = 0;

var carrotArray = [];
var carrotCount = 0;

var bombArray = [];

//location where the things that are collected disappear
var collect = 340;
    
//-------------------------------------

function setup() {
    createCanvas(600, 400);
}

//-------------------------------------

function draw() {    
    background(255, 178, 220); //light pink background
    backgroundHeart();
    bunny();
    renderHeart();
    renderCarrot();
    renderBomb();
    pointDisplay();
    gameOver();
}

//-------------------------------------

//***** HEART *****
function makeHeart(x, y) {
    return {
        x: x,
        y: y,
        draw: drawHeart,
    }
} 

function drawHeart() { //draw shape of heart 
    strokeWeight(0.3);
    noStroke();

    //color of heart changes to give glittering effect
    fill(255 - random(0, width), 116, 208); 
    ellipse(this.x - 5, this.y, 11, 11);
    ellipse(this.x + 5, this.y, 11, 11);
    triangle(this.x - 10.5, this.y + 2, 
        this.x + 10.5, this.y + 2, 
        this.x, this.y + 13);
}

function renderHeart() {
    //creates new heart every 30 frames
    if (frameCount % 30 == 0) {
        var newHeart = makeHeart(random(10, width - 10), 0);
        heartArray.push(newHeart);
    }

    //updates heart's y location(make them fall)
    for (var i = 0; i < heartArray.length; i ++) {
        var heart = heartArray[i];
        heart.y += 1.5;

        //remove hearts that are gone (off of canvas)
        //saves space to prevent codes from running slow
        if(heart.y > height) {
            heartArray.splice(i, 1);
        }

        //remove hearts that are collected
        if(dist(mouseX, collect, heart.x, heart.y) < 20) {
            heartArray.splice(i, 1);
            heartCount++; //keeps track of heart points
        }

        heart.draw();
    }
}

//***** CARROT *****
function makeCarrot(x, y) {
    return {
        x: x,
        y: y,
        draw: drawCarrot
    }
} 

//draws shapes of carrot
function drawCarrot() {
    //carrot stem
    fill(17, 147, 8); //green
    ellipse(this.x, this.y - 5, 5, 15);
    ellipse(this.x - 3, this.y - 5, 5, 15);
    ellipse(this.x - 7, this.y - 5, 5, 15);
    ellipse(this.x + 3, this.y - 5, 5, 15);
    ellipse(this.x + 7, this.y - 5, 5, 15);

    //carrot body 
    fill(255, 117, 25); //orange
    triangle(this.x - 10, this.y, 
        this.x + 10, this.y, 
        this.x, this.y + 30);
}

function renderCarrot() {
    //creates new carrot every 600 frames
    if (frameCount % 600 == 0) {
        var newCarrot = makeCarrot(random(10, width - 10), 0);
        carrotArray.push(newCarrot);
    }

    //updates carrot location
    for (var i = 0; i < carrotArray.length; i ++) {
        var carrot = carrotArray[i];
        carrot.y += 5; //carrot falls quite fast

        //removes carrots that are gone(off of canvas)
        if(carrot.y > height) {
            carrotArray.splice(i, 1);
        }

        //removes carrots that are eaten
        if(dist(mouseX, collect, carrot.x, carrot.y) < 20) {
            carrotArray.splice(i, 1);
            carrotCount++; //keeps track of number of carrots collected
        }

        carrot.draw();
    }
}

//***** BOMB *****
function makeBomb(x, y) {
    return {
        x: x,
        y: y,
        draw: drawBomb,
    }
} 

//draws shape of bomb
function drawBomb() {
    //spark
    fill(255, 0, 0); //red
    ellipse(this.x + 20, this.y - 23, 10, 10);

    //bomb line
    stroke(0); //black 
    strokeWeight(2);
    line(this.x, this.y, this.x + 18, this.y - 20);

    //bomb body
    noStroke();
    fill(48, 47, 47); //dark gray
    ellipse(this.x, this.y, 30, 30);
}


function renderBomb() {
    //creates bomb every 100 frames
    if (frameCount % 100 == 0) {
        var newBomb = makeBomb(random(10, width - 10), 0);
        bombArray.push(newBomb);
    }

    //updates bomb location
    for (var i = 0; i < bombArray.length; i ++) {
        var bomb = bombArray[i];
        bomb.y += 6;

        //removes bomb that is gone (off of canvas)
        if(bomb.y > height) {
            bombArray.splice(i, 1);
        }

        //removes bomb that is collected
        if(dist(mouseX, collect, bomb.x, bomb.y) < 30) {
            bombArray.splice(i, 1);
            //heart point deducted by 10 points if bomb collected
            heartCount -= 10; 
            //carrot point deducted by 1 if bomb collected 
            carrotCount -= 1;
        }

        bomb.draw();
    }
}

//***** BUNNY *****
function bunny() {
    //constrain bunny location to inside canvas
    var control = constrain (mouseX, 15, width - 15);

    noStroke();
    fill(255); //white

    //body
    fill(255); //white
    ellipse(control, 370, 55, 50);

    //feet
    ellipse(control - 15, height - 5, 20, 10); //left 
    ellipse(control + 15, height - 5, 20, 10); //right 

    //hands
    ellipse(control - 27, height - 45, 20, 10); //left 
    ellipse(control + 27, height - 45, 20, 10); //right 

    //ears
    ellipse(control - 8, 300, 10, 30); //left 
    ellipse(control + 8, 300, 10, 30); //right 

    //face
    ellipse(control, 330, 70, 50);

    //eyes
    fill(0);
    ellipse(control - 5, 325, 5, 5); //left 
    ellipse(control + 5, 325, 5, 5); //right 

    //mouth
    fill(255, 122, 169); //pink
    ellipse(control, 338, 12, 10);

    //nose
    fill(0);
    ellipse(control, 331, 5, 4);

    //blush
    fill(252, 204, 204); //light red
    ellipse(control - 10, 331, 10, 7); //left
    ellipse(control + 10, 331, 10, 7); //red
}

//***** GAMEOVER *****
function gameOver() {
    //if carrot point is less than 0,
    //or if heart point is or less than -100,
    //game ends
    if (carrotCount < 0 || heartCount <= -100) {
        noLoop();
    
    //gameover sign background
    fill(167, 0, 47); //red
    rectMode(CENTER);
    rect(width/2 - 10, height/2 - 10, 260, 70);

    //gameover sign text
    fill(255);
    textSize(22);
    textAlign(CENTER);
    text("   G A M E O V E R", width/2 , height/2);

    //skull
    fill(255); //white
    ellipse(width/2 - 100 , height/2 - 10, 30, 22);
    rect(width/2 - 100 , height/2, 16, 10);

    //skull eyes
    fill(50);//gray
    ellipse(width/2 - 105 , height/2 - 10, 7, 7);
    ellipse(width/2 - 95 , height/2 - 10, 7, 7);
    }
}

//***** POINT DISPLAY *****
function pointDisplay() {
    stroke(0); //black
    strokeWeight(0.2); //light outline
    fill(250, 214, 226); //pink
    rect(10, 10, 180, 60);

    //heart
    noStroke();
    fill(108, 136, 255);
    ellipse(35, 35, 11, 11);
    ellipse(45, 35, 11, 11);
    triangle(29.5, 37, 
        50.5 , 37, 
        40, 48);

    //heart count text
    fill(30);
    textSize(20);
    text("= " + heartCount, 55, 45);

    //carrot
    fill(17, 147, 8); //green
    ellipse(120, 25 , 5, 15);
    ellipse(117, 25, 5, 15);
    ellipse(113, 25, 5, 15);
    ellipse(123, 25, 5, 15);
    ellipse(127, 25, 5, 15);

    fill(255, 117, 25); //orange
    triangle(110, 30, 
        130, 30, 
        120, 60);
    
    //carrot count text
    fill(30);
    textSize(20);
    text("= " + carrotCount, 140, 45);
}

//***** BACKGROUND HEART *****
function backgroundHeart() {
    noStroke();
    fill(253, 158, 209); //pink
    ellipse(180, 140, 260, 270);
    ellipse(420, 140, 260, 270);
    triangle(73, 220, 
        width - 73 , 220, 
        width/2, height - 5);
    ellipse(width/2, 220, 80, 80);
}
