let mPlayer = document.getElementById("mPlayer");
let playerBtn = document.getElementById("playerBtn");
//let slider = document.getElementById("slider");
let playerMid = document.getElementById("playerMid");
let arrowBtn = document.getElementById("arrowBtn");
let track_art = document.getElementById("album-image");
let playerHead = document.getElementById("playerHead");
let musicSwitch = document.getElementById("musicSwitch");
let musicPlaySwitch = document.getElementById("musicPlaySwitch");

let isPlaying = false;
let mPlayed = new Set();
let currPlayListIndex;
let currPlayList;
let currSongsIndex = new Set();
// Create the audio element for the player
let curr_track = document.createElement('audio');
let updateTimer;
let track_index = 0;
let track_list = [];

const mlist = {
    "1":{
        "path":"./assets/music/bass-guitar-single-note.wav",
        "name":"Base Guitar"
    },
    "2":{
        "path":"./assets/music/big-volcano-lava-bubble-burst.wav",
        "name":"Big Valcano"
    },
    "3":{
        "path":"./assets/music/calm-thunderstorm-in-the-jungle.wav",
        "name":"Calm Thunderstrome"
    },
    "4":{
        "path":"./assets/music/crickets-and-insects-in-the-wild-ambience.wav",
        "name":"Crickets in wild"
    },
    "5":{
        "path":"./assets/music/crickets-at-night-in-nature.wav",
        "name":"Crickets at night"
    },
    "6":{
        "path":"./assets/music/crickets-near-the-river.wav",
        "name":"Crickets near river"
    },
    "7":{
        "path":"./assets/music/guitar-slide-noise.wav",
        "name":"Guitar slide"
    },
    "8":
    {
        "path":"./assets/music/guitar-stroke-down-slow.wav",
        "name":"Guitar stroke down"
    },
    "9":{
        "path":"./assets/music/guitar-stroke-up-slow.wav",
        "name":"Guitar stroke up"
    },
    "10":{
        "path":"./assets/music/light-rain-loop.wav",
        "name":"Light rain"
    },
    "11":{
        "path":"./assets/music/night-crickets-near-the-swamp.wav",
        "name":"Nigth creckets"
    },
    "12":{
        "path":"./assets/music/night-forest-with-insects.wav",
        "name":"Night forest"
    },
    "13":{
        "path":"./assets/music/nylon-guitar-single-note.wav",
        "name":"Nylon guitar"
    },
    "14":{
        "path":"./assets/music/owl-in-a-forest.wav",
        "name":"Owl in forest"
    },
    "15":{
        "path":"./assets/music/RainFallMedium.mp3",
        "name":"Rain-fall"
    },
    "16":{
        "path":"./assets/music/sea-waves-loop.wav",
        "name":"Sea waves"
    },
    "17":{
        "path":"./assets/music/WindHeavyGustySpin.mp3",
        "name":"Wind gusty spin"
    },
    "18":{
        "path":"./assets/music/sliding-on-guitar-bass-string.wav",
        "name":"Sliding guitar"
    },
    "19":{
        "path":"./assets/music/small-waves-harbor-rocks.wav",
        "name":"Small waves"
    },
    "20":{
        "path":"./assets/music/summer-night-in-the-forest.wav",
        "name":"Summer forest night"
    },
    "21":{
        "path":"./assets/music/wind-cold-interior.wav",
        "name":"Wind cold interior"
    }
}
const category = {
    "wind":{
        "ids":[17,21,16,19]
    },
    "rain":{
        "ids":[3,10,15]
    },
    "jungle":{
        "ids":[3,12,14,20]
    },
    "sea":{
        "ids":[16,19]
    }
    ,"animals":{
        "ids":[4,5,6,11,14]
    }
    ,"night":{
        "ids":[5,11,12,20]
    }
    ,"volcano":{
        "ids":[2]
    }
}

let combinations = [
    ['rain','jungle'],
    ['wind','rain'],
    ['jungle','wind'],
    ['jungle','wind','rain'],
    ['animals','night','jungle'],
    ['jungle','night'],
    ['valcano','night'],
    ['sea','wind'],
    ['sea','wind','night'],
    ['animals','jungle']
    ['animals','rain'],
    ['rain','night']
]

//console.log(Math.floor(Math.random()*combinations.length));
//helpers
function newSong(title,songId) {
    var li = document.createElement("li");
    var t = document.createTextNode(title);
    li.appendChild(t);
    li.setAttribute("id",songId);
    li.setAttribute("onClick","playClicked(this)");
    document.getElementById("songListUl").appendChild(li);
}
//loadMusic
function loadNewSet(){
    currPlayListIndex = getPlayListIndex();
    currPlayList = combinations[currPlayListIndex];

currPlayList.forEach(cate => {
    category[cate]["ids"].forEach(id =>{
        if(!currSongsIndex.has(id)){
            currSongsIndex.add(id);
            track_list.push(id);
            newSong(mlist[id]["name"],id);
        }
    });
});
}

function playTrack() {
    // Play the loaded track
    curr_track.play();
    isPlaying = true;
}

function pauseTrack() {
    // Pause the loaded track
    curr_track.pause();
    isPlaying = false;
}  

playerBtn.addEventListener('click',()=>{
    if(isPlaying){
        playerBtn.classList.remove("fa-pause");
        playerBtn.classList.add("fa-play");
        pauseTrack();
    }else{
        playerBtn.classList.remove("fa-play");
        playerBtn.classList.add("fa-pause");
        playTrack();
    }
});
musicSwitch.addEventListener('mouseover',()=>{
    musicPlaySwitch.style.display="block";
    musicSwitch.style.display="none";
});
musicSwitch.addEventListener('mouseout',()=>{
    musicPlaySwitch.style.display="none";
    musicSwitch.style.display="block";
})

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

function getPlayListIndex(){
    let index = Math.floor(Math.random()*combinations.length);
    if(mPlayed.size<combinations.length){
        if(mPlayed.has(index)){
            getPlayListIndex();
        }else{
            mPlayed.add(index);
            return index;
        }
    }else{
        mPlayed.clear();
        getPlayListIndex();
    }
}

function nextTrack() {
    // Go back to the first track if the
    // current one is the last in the track list
    if (track_index < track_list.length - 1)
      track_index += 1;
    else track_index = 0;
    // Load and play the new track
    loadTrack(track_index);
    playTrack();
}

function loadTrack(track_index) {
// Clear the previous seek timer
//clearInterval(updateTimer);
resetValues();
// Load a new track
curr_track.src = mlist[track_list[track_index]]["path"]
curr_track.load();
/* Update details of the track
track_art.style.backgroundImage =
    "url(" + track_list[track_index].image + ")";
track_name.textContent = track_list[track_index].name;
track_artist.textContent = track_list[track_index].artist;
now_playing.textContent =
    "PLAYING " + (track_index + 1) + " OF " + track_list.length;
*/
playerHead.textContent = mlist[track_list[track_index]]["name"];
//updateTimer = setInterval(seekUpdate, 1000);
curr_track.addEventListener("ended", nextTrack);
random_bg_color();
}

function random_bg_color() {
// Get a random number between 64 to 256
// (for getting lighter colors)
let red = Math.floor(Math.random() * 256) + 64;
let green = Math.floor(Math.random() * 256) + 64;
let blue = Math.floor(Math.random() * 256) + 64;
// Construct a color withe the given values
let bgColor = "rgb(" + red + ", " + green + ", " + blue + ",0.35)";
// Set the background to the new color
mPlayer.style.background = bgColor;
}

function resetValues() {
slider.value = 0;
}

function seekUpdate() {
    let seekPosition = 0;
    if (!isNaN(curr_track.duration)) {
      seekPosition = curr_track.currentTime * (100 / curr_track.duration);
      slider.value = seekPosition;
      let currentMinutes = Math.floor(curr_track.currentTime / 60);
      let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(curr_track.duration / 60);
      let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
    }
}

loadNewSet();
loadTrack(track_index);

function playClicked(e){
    //clearInterval(updateTimer);
    resetValues();
    curr_track.src = mlist[e.id]["path"];
    playerHead.textContent = mlist[e.id]["name"];
    curr_track.load();
    //updateTimer = setInterval(seekUpdate, 1000);
    curr_track.addEventListener("ended", nextTrack);
    random_bg_color();
    playTrack();
    playerBtn.classList.remove("fa-play");
    playerBtn.classList.add("fa-pause");
}

function newSet(){
    mPlayed.clear();
    currSongsIndex.clear();
    track_index=0;
    track_list = [];
    currPlayListIndex = 0;
    currPlayList = null;
    [...document.getElementsByTagName("li")].map(n => n && n.remove());
    loadNewSet();
    loadTrack(track_index);
}
