const playPauseButton = document.querySelector("#center-button");
const forwardButton = document.querySelector("#forward-button")
const backwardButton = document.querySelector("#backward-button")
const thumbnail = document.querySelector('.spinner > img.thumbnail');
const toast = document.querySelector('.toast');
const musicEl = document.querySelector('audio');
const title = document.querySelector('.toast-info > p');
const progressBar = document.querySelector('.toast-info > input[type="range"]');

const musicList = [
  "hey",
  "summer",
  "ukulele",
]

function getNextMusic(curr) {
  const idx = musicList.findIndex(music => music === curr);
  return musicList[idx + 1] || musicList[0];
}

function getPrevMusic(curr) {
  const idx = musicList.findIndex(music => music === curr);
  return musicList[idx - 1] || musicList[musicList.length - 1];
}

const isPlaying = () => {
  const [play] = Array.from(playPauseButton.children);
  return play.classList.contains('hidden');
}

const loadMusic = (getMusic) => {
  const currMusicName = musicEl.getAttribute('src')?.split("/")[1]?.split(".")[0];
  const newMusicName = getMusic(currMusicName);
  const musicFile = `music/${newMusicName}.mp3`;
  const musicThumbnail = `images/${newMusicName}.jpg`;

  musicEl.setAttribute('src', musicFile);
  thumbnail.setAttribute('src', musicThumbnail);
  title.textContent = newMusicName;
  progressBar.value = 0;
  if (isPlaying()) {
    musicEl.play();
  }
}

playPauseButton.addEventListener('click', () => {
  const [play, pause] = Array.from(playPauseButton.children);
  if (play.classList.contains('hidden')) {
    play.classList.remove('hidden')
    pause.classList.add('hidden')
    toast.classList.remove('show')
    thumbnail.classList.add('pause')
    musicEl.pause();
  } else {
    play.classList.add('hidden')
    pause.classList.remove('hidden')
    toast.classList.add('show')
    thumbnail.classList.remove('pause')
    musicEl.play();
  }
})

progressBar.addEventListener('input', () => {
  musicEl.currentTime = (progressBar.value / progressBar.max) * musicEl.duration;
});

musicEl.addEventListener('timeupdate', () => {
  const { currentTime, duration } = musicEl;
  progressBar.value = (currentTime / duration) * progressBar.max;
});

window.addEventListener('load', () => loadMusic(getNextMusic));
forwardButton.addEventListener('click', () => loadMusic(getNextMusic));
backwardButton.addEventListener('click', () => loadMusic(getPrevMusic));
musicEl.addEventListener('ended', () => loadMusic(getNextMusic));
