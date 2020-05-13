// 1. get required elements

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// 2. build the functions
function togglePlay() {
    if(video.paused) {
        // we chose video.paused because video element has only got pause property
        video.play();
    } else {
        video.pause();
    }
};

function updateButton() {
    const icon = this.paused ? 'Play' : 'Pause';
    toggle.textContent = icon;
};

function skip() {
    // we need to access the dataset and conver it to number
    video.currentTime += parseFloat(this.dataset.skip);
};

function handleRange() {
    // volume and playback rate = their values
    video[this.name] = this.value
};

function handleProgress() {
    // progress bar is attached to flex basis, so we need to change its percentage
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`

};

function scrub(e) {
    // at first we log e find its offsetX
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// 3. hook up the event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRange));
ranges.forEach(range => range.addEventListener('mousemove', handleRange));
progress.addEventListener('click', scrub);

// to drag the progress we need to create a flag like in the canvas lesson
let mousedown = false;
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); // this function check if the mousedown is true then moves to scrub
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
