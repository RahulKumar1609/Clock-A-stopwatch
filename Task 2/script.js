let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

function startPause() {
  if (isRunning) {
    clearInterval(timer);
    document.getElementById("startPause").textContent = "Resume";
    isRunning = false;
  } else {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateTime, 10);
    document.getElementById("startPause").textContent = "Pause";
    isRunning = true;
  }
}

function reset() {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  laps = [];
  updateDisplay();
  document.getElementById("startPause").textContent = "Start";
}

function lap() {
  if (isRunning) {
    laps.push(elapsedTime);
    updateDisplay();
  }
}

function updateTime() {
  elapsedTime = Date.now() - startTime;
  updateDisplay();
}

function updateDisplay() {
  let milliseconds = elapsedTime % 1000;
  let seconds = Math.floor(elapsedTime / 1000) % 60;
  let minutes = Math.floor(elapsedTime / (1000 * 60)) % 60;
  let hours = Math.floor(elapsedTime / (1000 * 60 * 60));

  document.getElementById("time").textContent = 
    formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds) + "." + formatMilliseconds(milliseconds);

  displayLaps();
}

function formatTime(time) {
  return (time < 10 ? '0' : '') + time;
}

function formatMilliseconds(milliseconds) {
  return (milliseconds < 100 ? '0' : '') + (milliseconds < 10 ? '0' : '') + milliseconds;
}

function displayLaps() {
  let lapsList = document.getElementById("laps");
  lapsList.innerHTML = "";
  for (let i = 0; i < laps.length; i++) {
    let lapTime = laps[i];
    let lapItem = document.createElement("li");
    lapItem.textContent = "Lap " + (i + 1) + ": " + formatTime(Math.floor(lapTime / (1000 * 60 * 60))) + ":" + formatTime(Math.floor((lapTime / (1000 * 60)) % 60)) + ":" + formatTime(Math.floor((lapTime / 1000) % 60)) + "." + formatMilliseconds(lapTime % 1000);
    lapsList.appendChild(lapItem);
  }
}
