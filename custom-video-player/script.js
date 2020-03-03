const video = document.getElementById('video');
const controls = document.querySelector('.controls');
const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById ('timestamp');

// play and pause video
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// update play/pause icon
function updatePlayIcon() {
  if (video.paused) {
    playBtn.innerHTML = '<i class="fa fa-play fa-2x"></i>'
  } else playBtn.innerHTML = '<i class="fa fa-pause fa-2x"></i>'
}

// update progress and timestamp
function updateProgress() {
  return true;
}

//stop video
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

//set video time to progress
function setVideoProgress() {
  return true;
}

// Event listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

playBtn.addEventListener('click', toggleVideoStatus);
stopBtn.addEventListener('click', stopVideo);
progress.addEventListener('change', setVideoProgress);