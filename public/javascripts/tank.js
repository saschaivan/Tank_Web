var LEFT=37,UP=38,RIGHT=39,DOWN=40;//KeyCodevar
var isKeyDown=false;
var speed=2;
var ctx;
var sx=[0,20,40],sy=[0,20,40,60];
var sWidth=80,sHeight=55;
var x=240,y=135;
var dx=80,dy=55;

var i=1;

var img=new Image();
img.src="assets/images/tank_icon.png";

var draw=function(){
    ctx.clearRect(0,0,800,800);
    ctx.drawImage(img, x-dx,y-dy,sWidth,sHeight);
}

document.onkeydown=function(e){
    isKeyDown=true;
    if(e.keyCode===UP){
        y-=speed;
    }
    if(e.keyCode===DOWN){
        y+=speed;
    }
    if(e.keyCode===LEFT){
        x-=speed;
    }
    if(e.keyCode===RIGHT){
        x+=speed;
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
            if(i>2)i=0;
        }
    },500);
};