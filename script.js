//Variables
let enterBtn = document.getElementById("enterBtn");
let mainHead = document.getElementById("mainHead");
let loader = document.getElementById("loader");
let playArea = document.getElementById("playArea");
let topNotifer = document.getElementById("topNotification");
let topNtext = document.getElementById("topNtext");
//let hourL = document.getElementById("hour");
let minL = document.getElementById("min");
let secL = document.getElementById("sec");
//let hr = 0;
let min = 0;
let sec = 0;
let isPLaying = false;

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
//timer
function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
}
//timer
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
        setInterval(() => {
            chessTimer();
        }, 1000);
    }
}


function resetPLayArea(){
    reset();
    min = 0;
    sec = 0;
}


$('#resetBtn').on('click', function () {
    resetPLayArea();
});
  
  