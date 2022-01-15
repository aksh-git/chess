//Variables
let enterBtn = document.getElementById("enterBtn");
let mainHead = document.getElementById("mainHead");
let loader = document.getElementById("loader");
let playArea = document.getElementById("playArea");

window.onload = ()=>{
   loader.style.display="none";
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
    mainHead.style.display="none";
    playArea.style.display="block";
}