const nodes = {
    playButton: document.getElementById("music-toggle"),
    previousButton: document.getElementById("music-prev"),
    nextButton: document.getElementById("music-next"),
    logoImg: document.getElementById("music-logo"),
    /*logoDisplay: document.getElementById("music-display"),*/
    titleText: document.getElementById("song-name"),
    authorText: document.getElementById("song-uploader"),
    volumeArea: document.getElementById("volume-area"),
    volumeIcon: document.getElementById("volume-icon"),
    volumeBar: document.getElementById("volume-bar"),
    volumeFill: document.getElementById("volume-fill"),
};


const imgUrlPlay = {
  play: "https://lilithdev.neocities.org/shrine/vg/nso/sprites/music_play.png",
  pause: "https://lilithdev.neocities.org/shrine/vg/nso/sprites/music_pause.png",
  loading: "https://lilithdev.neocities.org/shrine/vg/nso/sprites/music_load.gif"
};

const imgUrlVolume = {
  normal: "https://lilithdev.neocities.org/shrine/vg/nso/sprites/music_volume_100.png",
  low: "https://lilithdev.neocities.org/shrine/vg/nso/sprites/music_volume_50.png",
  lowest: "https://lilithdev.neocities.org/shrine/vg/nso/sprites/music_volume_20.png",
  mute: "https://lilithdev.neocities.org/shrine/vg/nso/sprites/music_volume_mute.png"
};

let hamdance = new Audio('hamdance1.mp3')
let thickofit = new Audio('thickofit.mp3')
let gangnamstyle = new Audio('gangnamstyle.mp3');
let allstar = new Audio('allstar.mp3');
let firework = new Audio('firework.mp3');
const songs = [
  ["The Hamster Dance Song", "hamdance.mp3", "https://img.youtube.com/vi/1qN72LEQnaU/0.jpg", hamdance],
  ["KSI - Thick Of It", "thickofit.mp3", "https://img.youtube.com/vi/tXEPbotEjZE/0.jpg", thickofit],
  ["PSY - Gangnam Style", "gangnamstyle.mp3", "https://img.youtube.com/vi/9bZkp7q19f0/0.jpg", gangnamstyle],
  ["Smash Mouth - All Star", "allstar.mp3", "https://img.youtube.com/vi/L_jWHffIx5E/0.jpg", allstar],
  ["Katy Perry - Firework", "firework.mp3", "https://img.youtube.com/vi/QGJuMBdaqIw/0.jpg", firework]
]



var currentIndex = 0
var audio = songs[currentIndex][3]
function updateInfo(){
  nodes.titleText.textContent = songs[currentIndex][0]
  nodes.logoImg.src = songs[currentIndex][2]
}

updateInfo();


var playing = false;

function togglePlay(){
  if(!playing){
    nodes.playButton.src = imgUrlPlay.pause
    audio.play()
    playing = true
  } else{
    nodes.playButton.src = imgUrlPlay.play
    audio.pause()
    playing = false;
  }
}

function setVolumeFromMouse(bar, fill, pointerX) {
  var rect = bar.getBoundingClientRect();
  let newVolume = (pointerX - rect.left) / rect.width * 100;
  newVolume = Math.min(Math.max(newVolume, 0), 100);

  let actualVolume = newVolume / 100;
  audio.volume = actualVolume

  fill.style.width = newVolume + "%";

  if(newVolume >= 50) {
    nodes.volumeIcon.src = imgUrlVolume.normal;
  } else if(newVolume < 50 && newVolume >= 20) {
    nodes.volumeIcon.src = imgUrlVolume.low;
  } else if(newVolume < 20 && newVolume > 0) {
    nodes.volumeIcon.src = imgUrlVolume.lowest;
  } else {
    nodes.volumeIcon.src = imgUrlVolume.mute;
  }
  //volumeIcon
}

function nextSong(){
  if(currentIndex == 4){
    currentIndex = 0;
    if(playing){
      nodes.playButton.src = imgUrlPlay.play
      playing = false
    }
    audio.pause();
    audio = songs[currentIndex][3]
    updateInfo()
    audio.currentTime = 0
  } else{
    if(playing){
      nodes.playButton.src = imgUrlPlay.play
      playing = false
    }
    audio.pause();
    currentIndex = currentIndex + 1;
    audio = songs[currentIndex][3]
    updateInfo()
    audio.currentTime = 0
  }
}

function prevSong(){
  if(currentIndex == 0){
    currentIndex = 4
  if(playing){
    nodes.playButton.src = imgUrlPlay.play
    playing = false
  }
  audio.pause();
  audio = songs[currentIndex][3]
  updateInfo()
  audio.currentTime = 0
}else{
  if(playing){
    nodes.playButton.src = imgUrlPlay.play
    playing = false
  }
  audio.pause();
  currentIndex = currentIndex - 1;
  audio = songs[currentIndex][3]
  updateInfo()
  audio.currentTime = 0
}
}



setVolumeFromMouse(nodes.volumeBar, nodes.volumeFill, nodes.volumeBar.getBoundingClientRect().right)

nodes.volumeBar.addEventListener("mousedown", (e) => {
  setVolumeFromMouse(nodes.volumeBar, nodes.volumeFill, e.clientX);

  const move = (e) => {
    setVolumeFromMouse(nodes.volumeBar, nodes.volumeFill, e.clientX);
  };
  const endMove = (e) => {
    document.documentElement.removeEventListener('mousemove', move, false);
    document.documentElement.removeEventListener('mouseup', endMove, false);
  };

  document.documentElement.addEventListener('mousemove', move, false);
  document.documentElement.addEventListener('mouseup', endMove, false);
});

nodes.playButton.addEventListener("click", togglePlay);

nodes.previousButton.addEventListener("click", prevSong);

nodes.nextButton.addEventListener("click", nextSong)

