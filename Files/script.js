let startTime;
let running = false;
let interval;
let laps = [];

function startStop() {
    if (!running) {
        startTime = Date.now() - (laps.reduce((acc, lap) => acc + lap, 0) || 0);
        interval = setInterval(updateDisplay, 10);
        running = true;
    } else {
        clearInterval(interval);
        running = false;
        laps.push(Date.now() - startTime);
    }
}

function reset() {
    clearInterval(interval);
    running = false;
    laps = [];
    updateDisplay();
    updateLapTimes();
}

function lap() {
    if (running) {
        laps.push(Date.now() - startTime);
        updateLapTimes();
    }
}

function updateDisplay() {
    const elapsedTime = Date.now() - startTime;
    const formattedTime = formatTime(elapsedTime);
    document.getElementById('display').textContent = formattedTime;
}

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);

    return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(num) {
    return num.toString().padStart(2, '0');
}

function updateLapTimes() {
    const lapTimesElement = document.getElementById('lapTimes');
    lapTimesElement.innerHTML = '';
    laps.forEach((lapTime, index) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${formatTime(lapTime)}`;
        lapTimesElement.appendChild(li);
    });
}
