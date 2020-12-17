class Game {
    constructor() {
        this.Player1 = [];
        this.Map = [];
        this.Player2 = [];

    }
    fill(json) {
        this.Player1.push(json.game.player1.name);
        this.Player2.push(json.game.player2.name);
        this.Map.push(json.game.map);
        tank_player1.x = json.game.player1.posx;
        tank_player1.y = json.game.player1.posy;
        tank_player2.x = json.game.player2.posx;
        tank_player2.y = json.game.player2.posy;
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
    Name: [],
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

function updatePosition(json) {
    tank_player1.x = json.game.player1.posx;
    tank_player1.y = json.game.player1.posy;
}

let i=1;

let img=new Image();
img.src="assets/images/tank_icon.png";


// tank movement
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

// json
function getGameJson() {
    $.ajax({
        Method: "GET",
        url: "/game/json",
        datatype: "json",

        success: function (result) {
            //pushData(result);
            game = new Game();
            game.fill(result);
        }
    });
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
    ctx = $("#canvas")[0].getContext("2d");
    setInterval(draw,10);
}


// draw map, not finished yet
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


function pushData(result) {
    let htmlplayer1 = [];
    let htmlplayer2 = [];
    htmlplayer1.push('<p>');
    htmlplayer1.push(game.Player1);
    htmlplayer1.push('</p>')

    htmlplayer2.push('<p>');
    htmlplayer2.push(game.Player2);
    htmlplayer2.push('</p>')

    console.log(tank_player1.Name);

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
            console.log(data);
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
    console.log(Request);
}

$(document).ready(function() {

    tankgame();
    //drawMapGerade();
    getGameJson();
    //getFormData();
    //getLoginJson();
    getdata();
    console.log(localStorage);
});



