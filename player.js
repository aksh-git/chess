let playerBtn = document.getElementById("playerBtn");
let slider = document.getElementById("slider");
let playerMid = document.getElementById("playerMid");
let arrowBtn = document.getElementById("arrowBtn");
let isPlaying = false;

function arrowClicked(){
    if(playerMid.style.display==="none"){
        playerMid.style.display="flex";
        arrowBtn.classList.remove("fa-chevron-circle-up");
        arrowBtn.classList.add("fa-chevron-circle-down");
    }else{
        playerMid.style.display="none";
        arrowBtn.classList.remove("fa-chevron-circle-down");
        arrowBtn.classList.add("fa-chevron-circle-up");
    }
}

function playClicked(){
    if(isPlaying){
        isPlaying = false;
        playerBtn.classList.remove("fa-pause");
        playerBtn.classList.add("fa-play");
    }else{
        isPlaying = true;
        playerBtn.classList.remove("fa-play");
        playerBtn.classList.add("fa-pause");
    }
}