const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// songs titles
const songs = ["hey", "summer", "ukulele"];

// keep track of song
let songIndex = 1;

// initially load song details into DOM
loadSong(songs[songIndex]);

//Update songs details
function loadSong(song) {
  // change the title and the cover to whatever the song is
  title.innerHTML = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

//PLay Song
function playSong() {
  musicContainer.classList.add("play"); // add the class to music-container
  //change the button
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  // play the song
  audio.play();
}
//Pause Song
function pauseSong() {
  musicContainer.classList.remove("play");
  //change the button
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  // pause the song
  audio.pause();
}

//Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    // if the first song we want to go to the last song
    // to go to the last song we do song.length we have 0,1,2 so 3 (-1) is for the last song os it comes back to 2
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}
//Previous song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0; //so we go back to the first song
  }
  loadSong(songs[songIndex]);
  playSong();
}

//EVENT LISTENER
playBtn.addEventListener("click", () => {
  const isPLaying = musicContainer.classList.contains("play"); // if our music-container contain play (audio playing)
  if (isPLaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// change song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// time/song update
audio.addEventListener("timeupdate", updateProgress);

// click on progress bar
progressContainer.addEventListener("click", setProgress);

//song end this is in the api we dont even have to create a function is just gonna go to the next song
audio.addEventListener("ended", nextSong);

// Update progress bar
function updateProgress(e) {
  // we can get the duration and current time
  const { duration, currentTime } = e.srcElement;

  const progressPercent = (currentTime / duration) * 100;

  progress.style.width = `
  ${progressPercent}%
  `;
}

// Set progress bar manually

function setProgress(e) {
  const width = this.clientWidth; // we gonna get the width
  //we gonna get were we clicked like the postion
  const clickX = e.offsetX;
  // get the duration of the audio. we get that fro our audio api
  const duration = audio.duration;
  //set the current audio time to the right position
  audio.currentTime = (clickX / width) * duration;
}
