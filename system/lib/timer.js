// JavaScript
let intervalId;
let seconds = 0;
let isPaused = false;
let timerElement = document.getElementById("timer");
let timerSound = document.getElementById("timerSound");

function startPauseTimer() {
  const minutesInput = document.getElementById("minutes");
  const minutes = parseFloat(minutesInput.value); // Use parseFloat to get decimal values
  if (isNaN(minutes) || minutes <= 0) {
    alert("Please enter a valid number of minutes.");
    return;
  }

  if (!intervalId) {
    seconds = Math.floor(minutes * 60); // Convert decimal minutes to seconds
    minutesInput.disabled = true;
    timerElement.classList.add("animate-timer"); // Add animation class
    intervalId = setInterval(() => {
      if (!isPaused) {
        seconds--;
        updateTimerDisplay(seconds);
        if (seconds <= 0) {
          clearInterval(intervalId);
          runFunctionWhenTimerEnds();
          timerElement.classList.remove("animate-timer"); // Remove animation class
        }
      }
    }, 1000);
  } else {
    if (isPaused) {
      isPaused = false;
    } else {
      isPaused = true;
    }
  }
}

function stopTimer() {
  clearInterval(intervalId);
  seconds = 0;
  updateTimerDisplay(seconds);
  isPaused = false;
  document.getElementById("minutes").disabled = false;
  intervalId = null;
  timerElement.classList.remove("animate-timer"); // Remove animation class
}

function updateTimerDisplay(seconds) {
  const minutesDisplay = Math.floor(seconds / 60);
  const secondsDisplay = seconds % 60;
  document.getElementById("timer").innerText =
    padNumber(minutesDisplay) + ":" + padNumber(secondsDisplay);
}

function padNumber(number) {
  return number.toString().padStart(2, "0");
}

function runFunctionWhenTimerEnds() {
  showNotification('Timer Application', 'Beep beep beep! 🚨 Your timer is over! 🚨', 6000);
  playTimerSoundMultipleTimes(6);
}

function playTimerSoundMultipleTimes(times) {
  let count = 0;
  const playSoundWithDelay = () => {
    timerSound.play();
    count++;
    if (count < times) {
      setTimeout(playSoundWithDelay, 500); // 1-second delay between each play
    }
  };
  playSoundWithDelay();
}
