/**window.onload = function () {
    refresh();
}

function refresh() {
    draw();
}

function draw() {
    //let html = []
    //html.push('<img id="tankimage" src="@routes.Assets.versioned("images/tank_player.png")" />');
    //document.getElementById("map").innerHTML = html.join();
    //moveTank();
    let img = new Image();
    img.src = '@routes.Assets.versioned("images/tank_player.png")';
    img.id = 'tankimage';

}

function moveTank() {
    var image = document.getElementById("tankimage");
    image.style.right = "100px";
}*/

/**
window.load = function () {
    var image = new Image(100,100);
    image.addEventListener('load', function () {
        document.body.getElementsByClassName("map").appendChild(image);
    }, false);
    image.src = "http://localhost:9000/assets/images/tank_player.png";
    $("#ButtonRight").onclick = function () {
        moveRight(image);
    };
}

function moveRight(image) {
    image.x = image.x + 100;
}


var canvas = document.getElementById("testcanvas");
var ctx = canvas.getContext("2d");
var image = new Image();
var tank = {};

var setTank = function() {
    tank.x = 100;
    tank.y = 100;
}

var draw = function() {
    image.onload = function () {
        ctx.drawImage(image, tank.x, tank.y);
    }
    image.src = "http://localhost:9000/assets/images/tank_player.png";
}

$("#ButtonRight").onclick = function() {
    moveRight();
}

function moveRight() {
    tank.x += 100;
}

var main = function () {
    setTank();
    draw();
};

main();
*/


var LEFT=37,UP=38,RIGHT=39,DOWN=40;//KeyCodevar
var W=87,A=65,S=83,D=68;
var isKeyDown=false;
var speed=2;
var ctx;
var sx=[0,20,40],sy=[0,20,40,60];
var sWidth=80,sHeight=55;

var tank_player1 = {
    x:240,
    y:350,
    dx:150,
    dy:-50
}

var tank_player2 = {
    x:1100,
    y:350,
    dx:150,
    dy:-50
}

var i=1;

var img=new Image();
img.src="assets/images/tank_icon.png";

// add eventlistener
window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);

var keyW = false;
var keyA = false;
var keyS = false;
var keyD = false;

function onKeyDown(event) {
    var keyCode = event.keyCode;

    switch (keyCode) {
        case 68: // D
            keyD = true;
            break;
        case 83: // S
            keyS = true;
            break;
        case 65: // A
            keyA = true;
            break;
        case 87: // W
            keyW = true;
            break;
    }
}

function onKeyUp(event) {
    var keyCode = event.keyCode;

    switch (keyCode) {
        case 68: //d
            keyD = false;
            break;
        case 83: //s
            keyS = false;
            break;
        case 65: //a
            keyA = false;
            break;
        case 87: //w
            keyW = false;
            break;
    }
}

var draw=function(){
    ctx.clearRect(0,0,800,800);
    ctx.drawImage(img, tank_player1.x-tank_player1.dx, tank_player1.y-tank_player1.dy, sWidth, sHeight);
    //ctx.drawImage(img, tank_player2.x-tank_player2.dx, tank_player2.y-tank_player2.dy, sWidth, sHeight);
    flipHorizontally(img);
}

function flipHorizontally(img) {
    ctx.translate(tank_player2.x-tank_player2.dx, tank_player2.y-tank_player2.dy);
    ctx.scale(-1, 1);
    ctx.drawImage(img, 0, 0, sWidth, sHeight);
    ctx.setTransform(1,0,0,1,0,0);
}

document.onkeydown=function(e){
    isKeyDown=true;
    if(e.keyCode===UP){
        tank_player2.y -= speed;
    }
    if(e.keyCode===DOWN){
        tank_player2.y += speed;
    }
    if(e.keyCode===LEFT){
        tank_player2.x -= speed;
    }
    if(e.keyCode===RIGHT){
        tank_player2.x += speed;
    }
    if (keyW === true) { // tank move up
        tank_player1.y -= speed;
    }
    if (keyA === true) { // tank move left
        tank_player1.x -= speed;
    }
    if (keyS === true) { // tank move down
        tank_player1.y += speed;
    }
    if (keyD === true) { // tank move right
        tank_player1.x += speed;
    }
};

document.onkeyup=function(e){
    isKeyDown=false;
    i=1;
    draw();
};

window.onload=function(){
    ctx=document.getElementById("canvas").getContext("2d");
    setInterval(draw,1000/30);
    setInterval(function(){
        if(isKeyDown){
            i+=50;
            if(i>2)
                i=0;
        }
    },500);
};





