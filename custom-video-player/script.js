const video = document.querySelector(".video");
const playButton = document.querySelector(".play-button");
const pauseButton = document.querySelector(".pause-button");
const stopButton = document.querySelector(".stop-button");
const progressBar = document.querySelector(".progress-bar");
const timestamp = document.querySelector(".timestamp");

const handleClickPlayButton = () => {
  playButton.classList.add("hidden");
  pauseButton.classList.remove("hidden");
  video.play();
}

const handleClickPauseButton = () => {
  pauseButton.classList.add("hidden");
  playButton.classList.remove("hidden");
  video.pause();
}

const handleClickStopButton = () => {
  handleClickPauseButton();
  video.currentTime = 0;
}

const formatSeconds = (value) => {
  const totalSeconds = parseInt(value.toFixed(0), 10);
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = Math.floor(totalSeconds - (minutes * 60));

  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }
  return minutes+':'+seconds;
}

const handleTimeUpdate = () => {
  timestamp.textContent = formatSeconds(video.currentTime);

  progressBar.value = video.currentTime / video.duration * progressBar.max;
}

const handleChangeProgressBar = () => {
  video.currentTime = progressBar.value / progressBar.max * video.duration;
}

const handleEndVideo = () => {
  handleClickPauseButton();
}

const handleClickVideo = () => {
  if (video.paused) {
    handleClickPlayButton();
  } else {
    handleClickPauseButton();
  }
}


playButton.addEventListener("click", handleClickPlayButton);
pauseButton.addEventListener("click", handleClickPauseButton);
stopButton.addEventListener("click", handleClickStopButton);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("ended", handleEndVideo);
video.addEventListener("click", handleClickVideo);
progressBar.addEventListener("input", handleChangeProgressBar);