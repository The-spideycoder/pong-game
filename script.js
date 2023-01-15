var bar1=document.getElementById("bar-1");
var bar2=document.getElementById("bar-2");
var ball=document.getElementById("ball");
var movement=20;

const thisBar1="Bar-1";
const thisBar2="Bar-2";
const storeName="abc";
const storeScore=123;

let whichBar;
let moveX=2;
let moveY=2;
let ballMoving;
let border=12;
let score;
let highScore;
let gameStart=false;

localStorage.setItem(storeScore,"null");
localStorage.setItem(storeScore,"null");
(function(){
    highScore=localStorage.getItem(storeScore);
    whichBar=localStorage.getItem(storeName);
    if(whichBar==="null" || highScore==="null"){
        alert("Hello.. This is your first game");
        highScore=0;
        whichBar=thisBar1;
    }
    else{
        alert(whichBar + " has maximum score of " + highScore*100);
    }
    gameReset(whichBar);
})();



function gameReset(barName){

    bar1.style.left=((window.innerWidth-bar1.offsetWidth)/2)+"px";
    bar2.style.left=((window.innerWidth-bar2.offsetWidth)/2)+"px";
    ball.style.left=((window.innerWidth-ball.offsetWidth)/2)+"px";

    if(barName === thisBar1){
        ball.style.top=bar2.getBoundingClientRect().y-bar2.getBoundingClientRect().height+"px";
        moveY=-2;
    }

    else if(barName === thisBar2){
        ball.style.top=bar1.getBoundingClientRect().height+"px";
        moveY=2;       
    }

    score=0;
    gameStart=false;

}



document.addEventListener('keydown',function(event){

    if(event.keyCode==68 || event.keyCode==39){
        if(bar1.getBoundingClientRect().x+bar1.offsetWidth<window.innerWidth)
            bar1.style.left=bar1.getBoundingClientRect().x+movement+"px";
    }
    else if(event.keyCode==65 || event.keyCode==37){
        if(bar1.getBoundingClientRect().x>0)
            bar1.style.left=bar1.getBoundingClientRect().x-movement+"px";
    }
    if(event.keyCode==75){
        if(bar2.getBoundingClientRect().x>0)
            bar2.style.left=bar2.getBoundingClientRect().x-movement+"px";
    }
    if(event.keyCode==75){
        if(bar2.getBoundingClientRect().x>0)
            bar2.style.left=bar2.getBoundingClientRect().x-movement+"px";
    }
    else if(event.keyCode==76){
        if(bar2.getBoundingClientRect().x+bar2.offsetWidth<window.innerWidth)
            bar2.style.left=bar2.getBoundingClientRect().x+movement+"px";
    }

});

document.addEventListener("keyup",function(event){
    if(event.keyCode==83){
        if(gameStart==false){
            gameStart=true;
            ballMoving=setInterval(moveBall,10);
        }
    }
});

function moveBall(){
    if(ball.getBoundingClientRect().y<=0 || ball.getBoundingClientRect().y+ball.offsetHeight>=window.innerHeight){
        moveY=-moveY;
    }

    if(ball.getBoundingClientRect().x<=0 || ball.getBoundingClientRect().x+ball.offsetWidth>=window.innerWidth){
        moveX=-moveX;
    }

    if(ball.getBoundingClientRect().y+ball.offsetHeight>=bar1.getBoundingClientRect().y && ball.getBoundingClientRect().y<=bar1.getBoundingClientRect().y+bar1.offsetHeight && ball.getBoundingClientRect().x+ball.offsetWidth>=bar1.getBoundingClientRect().x && ball.getBoundingClientRect().x<=bar1.getBoundingClientRect().x+bar1.offsetWidth){
        moveY=-moveY;
        score++;
    }

    if(ball.getBoundingClientRect().y+ball.offsetHeight>=bar2.getBoundingClientRect().y && ball.getBoundingClientRect().y<=bar2.getBoundingClientRect().y+bar2.offsetHeight && ball.getBoundingClientRect().x+ball.offsetWidth>=bar2.getBoundingClientRect().x && ball.getBoundingClientRect().x<=bar2.getBoundingClientRect().x+bar2.offsetWidth){
        moveY=-moveY;
        score++;
    }

    ball.style.top=ball.getBoundingClientRect().y+moveY+"px";
    ball.style.left=ball.getBoundingClientRect().x+moveX+"px";

    if(score>highScore){
        highScore=score;
        localStorage.setItem(storeScore,score);
        if(whichBar==thisBar1)
            localStorage.setItem(storeName,thisBar1);
        else
            localStorage.setItem(storeName,thisBar2);
    }

    if(ball.getBoundingClientRect().y+ball.offsetHeight>=window.innerHeight){
        clearInterval(ballMoving);
        alert("Game Over!! Score: " + score*100);
        gameReset(thisBar2);
    }
    bar2.style.left=bar2.getBoundingClientRect().x-movement+"px";

}
