class Game {
    constructor() {
        this.Player1 = [];
        this.Map = [];
        this.Player2 = [];

    }
    fill(json) {
        this.Player1 = json(tank_player1);
        this.Player2 = json(tank_player2);
        this.Map = json(map);
    }
}


var isKeyDown=false;
var speed=2;
var ctx;

var map = {
    x:0,
    y:0
}

let game = new Game();

let tank_player1 = {
    Name:[],
    x:240,
    y:350,
    dx:150,
    dy:-50
}

let tank_player2 = {
    Name:[],
    x:1100,
    y:350,
    dx:150,
    dy:-50
}

let i=1;

let img=new Image();
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
    let keyCode = event.keyCode;

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

let storage = localStorage;

function safeValues() {
    let firstName = $("#player1_name").value;
    storage.setItem('name', firstName);
}

function getGameJson() {
    $.ajax({
        Method: "GET",
        url: "/game/json",
        datatype: "json",

        success: function (result) {
            fillPlayerInformation(result);
        }
    });
}

function onKeyUp(event) {
    let keyCode = event.keyCode;

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

let draw=function(){
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

$(document).keydown(function(e){
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
});

$(document).keyup(function(e){
    isKeyDown=false;
    i=1;
});

function tankgame() {
    // returns a html DOM object, without '[0]' its an jquery object
    ctx = $("#canvas")[0].getContext("2d");
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


function fillPlayerInformation(result) {
    alert(result.game.player2.name);
    /**
    let Name = Object.keys(storage);
    Name.forEach(function(key) {
        alert(storage.getItem(key));
    });


    let html = [];
    let player1 = "Sascha"
    let test = $("#test")
    test.innerText = player1
    $("#player1").html(html.join('')); */
}

$(document).ready(function() {
    safeValues();
    tankgame();
    drawMapGerade();
    getGameJson();
});


