class Tank_Game {
    constructor() {
        this.Player1 = [];
        this.Map = [];
        this.Player2 = [];

    }
    fill(json) {
        this.Player1.push(json.game.player1.name);
        this.Player2.push(json.game.player2.name);
        this.Map.push(json.game.map);
        updatePositions(json);
    }
}

var isKeyDown=false;
var speed=5;
var ctx;

var map = {
    x:0,
    y:0
}

let game = new Tank_Game();

let tank_player1 = {
    Name: [],
    x:0,
    y:0,
    dx:150,
    dy:-50
}

let tank_player2 = {
    Name:[],
    x:0,
    y:0,
    dx:150,
    dy:-50
}

let i=1;

let img=new Image();
img.src="assets/images/tank_icon.png";
img.id = "tank";

window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);

var keyA = false;
var keyD = false;
var keyLeft = false;
var keyRight = false;

// tank movement
function onKeyDown(event) {
    let keyCode = event.keyCode;

    switch (keyCode) {
        case 68: // D
            keyD = true;
            break;
        case 65: // A
            keyA = true;
            break;
        case 37: // Left
            keyLeft = true;
            break;
        case 39: // Right
            keyRight = true;
            break;
    }
}

function onKeyUp(event) {
    let keyCode = event.keyCode;

    switch (keyCode) {
        case 68: //d
            keyD = false;
            break;
        case 65: //a
            keyA = false;
            break;
        case 37: // Left
            keyLeft = false;
            break;
        case 39: // Right
            keyRight = false;
            break;
    }
}

$(document).keydown(function(e){
    isKeyDown=true;
    if(keyLeft === true){
        moveLeft();
    }
    if(keyRight === true){
        moveRight();
    }
    if (keyA === true) { // tank move left
        moveLeft();
    }
    if (keyD === true) { // tank move right
        moveRight();
    }
});

$(document).keyup(function(e){
    isKeyDown=false;
    i=1;
});


function moveRight() {
    updateGame('D'); // moveRight
}

function moveLeft() {
    updateGame('A'); // moveLeft
}

// update game based on key press with json file
function updateGame(direction) {
    $.ajax({
        Method: "GET",
        url: "/game/" + direction.toString(),
        datatype: "json",

        success: function (update) {
            console.log(update);
            game.fill(update);
        }
    });
}


// json to start the game
function getGameJson() {
    $.ajax({
        Method: "GET",
        url: "/game/json",
        datatype: "json",

        success: function (update) {
            console.log(update)
            game.fill(update);
            pushData();
        }
    });
}

function updatePositions(json) {
    tank_player1.x = json.game.player1.posx * 16; // ~15 -> 240 (16)
    tank_player1.y = json.game.player1.posy * 32; // ~11 -> 350 (32)
    tank_player2.x = json.game.player2.posx * 13; // ~88 -> 1100 (13)
    tank_player2.y = json.game.player2.posy * 39; // ~9 -> 350 (39)
}

// draw tanks and update positions
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

function tankgame() {
    // returns a html DOM object, without '[0]' its an jquery object
    getGameJson();
    ctx = $("#canvas")[0].getContext("2d");
    setInterval(draw,1);
}

/**
// draw map, not finished yet
let drawMapGerade = function () {
    /**
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.moveTo(map.x,map.y + 350)
    ctx.lineTo(map.x + ctx.width, map.y + 350);
    ctx.lineTo(map.x + ctx.width, map.y);
    ctx.lineTo(map.x, map.y + ctx.height);
    ctx.stroke();
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "#b47d49"
    ctx.fillRect(0,465,1050,200);
    ctx.stroke();
}
*/
var interval;
function connectWebSocket() {
    var webSocket = new WebSocket("ws://localhost:9000/game/websocket");

    //webSocket.setTimeout

    webSocket.onopen = function(event) {
        console.log("Connected to Websocket");
        interval = setInterval(function() {
            webSocket.send(JSON.stringify("ping"));
        }, 5000);
    }

    webSocket.onclose = function () {
        console.log('Connection with Websocket Closed!');
    };

    webSocket.onerror = function (error) {
        console.log('Error in Websocket Occured: ' + error);
    };

    webSocket.onmessage = function (e) {
        console.log(e);
    }
}


function pushData() {
    let htmlplayer1 = [];
    let htmlplayer2 = [];
    htmlplayer1.push('<p>');
    htmlplayer1.push(game.Player1);
    htmlplayer1.push('</p>')

    htmlplayer2.push('<p>');
    htmlplayer2.push(game.Player2);
    htmlplayer2.push('</p>')

    console.log(game.Player1);

    $("#player1").html(htmlplayer1.join(''));
    $("#player2").html(htmlplayer2.join(''));
}

// load pages
function gamePage() {
    window.location.href = "http://localhost:9000/game"
}

function aboutPage() {
    window.location.href = "http://localhost:9000/about"
}

/**
//hier get the login map data.
var localStorage = window.localStorage;

function getLogin() {
    gamePage();
    var player1 = $("#player1_name").val();
    var player2 = $("#player2_name").val();
    var map = $("#map").val();
    localStorage.setItem("mapvalue", map);
    localStorage.setItem("player1", player1);
    localStorage.setItem("player2", player2);
}

function getLoginJson(){
    $.ajax({
        Method: "GET",
        url: "http://localhost:9000",
        datatype: "html",

        success: function (data) {
            console.log("set the value successful");
        }
    });
}

function getdata(){
    var url= "http://localhost:9000";
    var Request = new Object();
    if(url.indexOf("?")!=-1){
        var str = url.substr(1);
        strs = str.split("&");
        for(var i=0;i<strs.length;i++){
            Request[strs[i ].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
}
*/

$(document).ready(function() {
    connectWebSocket();
    tankgame();
});



