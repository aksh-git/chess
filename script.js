//Variables
let enterBtn = document.getElementById("enterBtn");
let mainHead = document.getElementById("mainHead");
let loader = document.getElementById("loader");
let playArea = document.getElementById("playArea");
let topNotifer = document.getElementById("topNotification");
let topNtext = document.getElementById("topNtext");
let messageBar = document.getElementById("message");
let msgBigText = document.getElementById("bigText");
let msgSmallText = document.getElementById("smallText");
let takeBreakBtn = document.getElementById("takeBrake");
//let hourL = document.getElementById("hour");
let minL = document.getElementById("min");
let secL = document.getElementById("sec");
//let hr = 0;
let min = 0;
let sec = 0;
let isPLaying = false;
let chessTime;

window.onload = ()=>{
   loader.style.display="none";
   topNotify("Welcome!!",true);
} 
//topnotifier
function topNotify(msg,autoRemove){
    topNtext.innerHTML=msg;
    topNotifer.style.display="block";
    if(autoRemove){
        setInterval(()=>{
            topNotifer.style.display="none";
        },2000);
    }
}
//message
function showMessage(topic,msg){
    msgBigText.innerHTML = topic;
    msgSmallText.innerHTML = msg; 
    messageBar.style.display="block";
}
function removeMessage(){
    messageBar.style.display="none";
}

//timer
function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
}
function chessTimer(){
    sec = sec + 1;
    sec = parseInt(sec);
    min = parseInt(min);
    //hr = parseInt(hr);
    if(sec==60) {
        min = min + 1;
        sec = 0;
    }
    if(min==60) {
     // hr = hr + 1;
      min = 0;
      sec = 0;
    }
    //hourL.innerHTML=addZero(hr%12)+" :";
    minL.innerHTML=addZero(min)+" :";
    secL.innerHTML=addZero(sec);
}

//Handle click
document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      enterBtn.click();
    }
}); 

//onpress enter
function enterPressed(){
    if(!isPLaying){
        topNotify("Ready to play!!",false);
        isPLaying=true;
        mainHead.style.display="none";
        playArea.style.display="block";
        chessTime = setInterval(() => {
            chessTimer();
        }, 1000);
    }
}

function resetPLayArea(){
    min = 0;
    sec = 0;
    reset();
    removeMessage();
}

$('#resetBtn').on('click', function () {
    resetPLayArea();
});
  
$('#takeBrake').on('click',function(){
    if(takeBreakBtn.innerHTML==="Resume"){
        chessTime = setInterval(()=>{
            chessTimer();
        },1000);
        takeBreakBtn.innerHTML="Take a Break";
        removeMessage();    
    }else{
        clearInterval(chessTime);
        takeBreakBtn.innerHTML="Resume";
        showMessage("Paused!!","Press Enter to Resume...");
    }
});

