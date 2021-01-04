class Tank_Game {
    constructor() {
        this.Player1 = [];
        this.Player2 = [];
        this.player1pos = [];
        this.player2pos = [];
        this.player1Life = [];
        this.player2Life = [];
        this.player1Angle = [];
        this.player2Angle = [];
        this.activePlayer = [];
        this.numberofmoves = [];
        this.mapfirstx = [];
        this.mapfirsty = [];
        this.maplastx = [];
        this.maplasty = [];
    }
    fill(json) {
        this.Player1.push(json.game.player1.name);
        this.Player2.push(json.game.player2.name);
        this.numberofmoves.push(json.game.map.moves);
        this.activePlayer.push(json.game.map.activePlayer_id);
        this.player1Life.push(json.game.tank.life1);
        this.player2Life.push(json.game.tank.life2);
        this.player1Angle.push(json.game.tank.angle1);
        this.player2Angle.push(json.game.tank.angle2);
        this.player1pos.push(json.game.player1.posx, json.game.player1.posy);
        this.player2pos.push(json.game.player2.posx, json.game.player2.posy);
        updatePositions(json);
    }
    map(json) {
        for (let i = 0; i < json.map.length - 1; i++) {
            this.mapfirstx.push(json.map[i][0] + 240); // get the x value out of the array of arrays, 0 -> +240 (scale)
            this.mapfirsty.push(json.map[i][1] * 35); // get the y value out of the array of arrays, 10 -> *35 = 350 (scale)
        }
        this.maplastx.push(json.map[json.map.length - 1][0] * 11); // ~100 -> 1100 (11)
        this.maplasty.push(json.map[json.map.length - 1][1] * 35); // 10 -> 350 (35)
    }
}

var isKeyDown=false;
var speed=5;
var ctx;

let game = new Tank_Game();

console.log(game.mapfirstx);
console.log(game.mapfirsty);
//console.log(game.maplastx);
//console.log(game.maplasty);

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

let img = new Image();
img.src = "assets/images/tank_icon.png";
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

function getMapCoordinates() {
    $.ajax({
        Method: "GET",
        url: "/game/mapcoordinates",
        datatype: "json",

        success: function (result) {
            console.log(result);
            game.map(result);
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

// draw tanks and update positions
function updatePositions(json) {
    tank_player1.x = json.game.player1.posx * 16; // ~15 -> 240 (16)
    tank_player1.y = json.game.player1.posy * 32; // ~11 -> 350 (32)
    tank_player2.x = json.game.player2.posx * 13; // ~88 -> 1100 (13)
    tank_player2.y = json.game.player2.posy * 39; // ~9 -> 350 (39)
}

function draw(X1, Y1, X2, Y2) {
    ctx.clearRect(0,0,1100,600);
    ctx.drawImage(img, tank_player1.x - tank_player1.dx, tank_player1.y - tank_player1.dy);
    flipHorizontally(img);
    drawMap(X1, Y1, X2, Y2);
}

function flipHorizontally(img) {
    ctx.translate(tank_player2.x-tank_player2.dx, tank_player2.y-tank_player2.dy);
    ctx.scale(-1, 1);
    ctx.drawImage(img, 0, 0);
    ctx.setTransform(1,0,0,1,0,0);
}

// draw map using only the fist and the last value of the map array
function drawMap (X1, Y1, X2, Y2) {
    ctx.beginPath();
    ctx.moveTo(X1, Y1);
    ctx.lineTo(X2, Y2);
    ctx.stroke();
}

// game setup
function tankgame() {
    // returns a html DOM object, without '[0]' its an jquery object
    getGameJson();
    ctx = $("#canvas")[0].getContext("2d");
    setInterval(function (){ draw(game.mapfirstx[0], game.mapfirsty[0], game.maplastx, game.maplasty); }, 1);
}

// websocket
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

// player data print to screen
function pushData() {
    let htmlplayer1 = [];
    let htmlplayer2 = [];
    htmlplayer1.push('<p>');
    htmlplayer1.push('Name: ');
    htmlplayer1.push(game.Player1);
    htmlplayer1.push('<br>');
    htmlplayer1.push('Life: ');
    htmlplayer1.push(game.player1Life);
    htmlplayer1.push('<br>');
    htmlplayer1.push('Angle: ');
    htmlplayer1.push(game.player1Angle);
    htmlplayer1.push('<br>');
    htmlplayer1.push('</p>')

    htmlplayer2.push('<p>');
    htmlplayer2.push('Name: ');
    htmlplayer2.push(game.Player2);
    htmlplayer2.push('<br>');
    htmlplayer2.push('Life: ');
    htmlplayer2.push(game.player2Life);
    htmlplayer2.push('<br>');
    htmlplayer2.push('Angle: ');
    htmlplayer2.push(game.player2Angle);
    htmlplayer2.push('<br>');
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

// start everything
$(document).ready(function() {
    connectWebSocket();
    tankgame();
    getMapCoordinates();
});



