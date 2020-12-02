window.addEventListener('load', function() {
    tankgame();
    drawMapGerade();
});

var isKeyDown=false;
var speed=2;
var ctx;

var map = {
    x:0,
    y:0
}

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
var keyLeft = false;
var keyRight = false;
var keyDown = false;
var keyUP = false;

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
        case 37: // Left
            keyLeft = true;
            break;
        case 39: // Right
            keyRight = true;
            break;
        case 38: // Up
            keyUP = true;
            break;
        case 40: // Down
            keyDown = true;
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
        case 37: // Left
            keyLeft = false;
            break;
        case 39: // Right
            keyRight = false;
            break;
        case 38: // Up
            keyUP = false;
            break;
        case 40: // Down
            keyDown = false;
            break;
    }
}

var draw=function(){
    ctx.clearRect(0,0,1100,600);
    ctx.drawImage(img, tank_player1.x-tank_player1.dx, tank_player1.y-tank_player1.dy);
    flipHorizontally(img);
}

function flipHorizontally(img) {
    ctx.translate(tank_player2.x-tank_player2.dx, tank_player2.y-tank_player2.dy);
    ctx.scale(-1, 1);
    ctx.drawImage(img, 0, 0);
    ctx.setTransform(1,0,0,1,0,0);
}

document.onkeydown=function(e){
    isKeyDown=true;
    if(keyUP === true){
        tank_player2.y -= speed;
    }
    if(keyDown === true){
        tank_player2.y += speed;
    }
    if(keyLeft === true){
        tank_player2.x -= speed;
    }
    if(keyRight === true){
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
};

function tankgame() {
    ctx = document.getElementById("canvas").getContext("2d");
    setInterval(draw,10);
}

function drawMapGerade() {
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.moveTo(map.x,map.y + 350)
    ctx.lineTo(map.x + ctx.width, map.y + 350);
    ctx.lineTo(map.x + ctx.width, map.y);
    ctx.lineTo(map.x, map.y + ctx.height);
    ctx.stroke();
    ctx.closePath();
    ctx.fill();
}





