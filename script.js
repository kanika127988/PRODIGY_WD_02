let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('lapsList');

// Format time into HH:MM:SS (or MM:SS:ms)
function formatTime(time) {
    let milliseconds = Math.floor((time % 1000) / 10);
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let hours = Math.floor(time / (1000 * 60 * 60));

    let formattedHours = hours.toString().padStart(2, '0');
    let formattedMinutes = minutes.toString().padStart(2, '0');
    let formattedSeconds = seconds.toString().padStart(2, '0');
    let formattedMilSec = milliseconds.toString().padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}.${formattedMilSec}`;
}

// Start / Stop functionality
function startStop() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            display.textContent = formatTime(elapsedTime);
        }, 10);

        startStopBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
        startStopBtn.classList.add('running');
        lapBtn.disabled = false;
        isRunning = true;
    } else {
        clearInterval(timerInterval);
        startStopBtn.innerHTML = '<i class="fa-solid fa-play"></i> Start';
        startStopBtn.classList.remove('running');
        isRunning = false;
    }
}

// Reset functionality
function resetTimer() {
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    display.textContent = "00:00.00";
    
    startStopBtn.innerHTML = '<i class="fa-solid fa-play"></i> Start';
    startStopBtn.classList.remove('running');
    lapBtn.disabled = true;
    lapsList.innerHTML = '<li class="no-laps">No laps recorded yet</li>';
}

// Lap functionality
let lapCount = 1;
function recordLap() {
    if (isRunning) {
        if (lapsList.querySelector('.no-laps')) {
            lapsList.innerHTML = '';
        }
        const lapItem = document.createElement('li');
        lapItem.innerHTML = `Lap ${lapCount} <span>${formatTime(elapsedTime)}</span>`;
        lapsList.prepend(lapItem);
        lapCount++;
    }
}

// Event Listeners
startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);