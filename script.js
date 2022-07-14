const timer = document.getElementById('timer');
const timeDisplay = document.getElementById('time');
var time = 0.00;
var isTimerRunning = false;
var timerStartTime = 0;
var justStopped = false;
var isTimerReady = 0;

function timerDown() {
    if (isTimerRunning) {
        isTimerRunning = false;
        justStopped = true;
    } else {
        timerStartTime = Date.now();
        isTimerReady = 1;
    }
}

function timerUp() {
    if (isTimerReady == 1) {
        isTimerReady = 0;
    } else if (isTimerReady == 2) {
        isTimerReady == 0;
        isTimerRunning = true;
        timerStartTime = Date.now();
    }
}

function formatTime(sec) {
    var formatted = new Date(sec * 1000).toISOString().substring(11, 22);
    if (sec < 60) {
        formatted = formatted.substring(6, 11);
    } else if (sec < 3600) {
        formatted = formatted.substring(3, 11);
    }
    formatted = formatted.replace(/^.{2}/g, String(parseInt(formatted.substring(0, 2)).toFixed(0)));
    return formatted;
}

function updateTime() {
    if (isTimerRunning) {
        time = formatTime(((Date.now() - timerStartTime) / 1000).toFixed(2));
        timeDisplay.innerHTML = time;
        isTimerReady = 0;
    }
    if (isTimerReady == 0) {
        timeDisplay.style.color = '';
    } else if (isTimerReady == 1) {
        timeDisplay.style.color = '#dc2626';
        if ((Date.now() - timerStartTime) >= 500) {
            isTimerReady = 2;
            timeDisplay.style.color = '#16a34a';
        }
    }
    requestAnimationFrame(updateTime);
}

window.addEventListener('keydown', e => {
    if (isTimerReady == 0 && e.key == ' ') {
        timerDown();
    }
});
window.addEventListener('keyup', e => {
    console.log(e.key);
    if (e.key == ' ') {
        timerUp();
    }
});
timer.addEventListener('mousedown', timerDown);
timer.addEventListener('mouseup', timerUp);

updateTime();
