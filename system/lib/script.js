let is24HourFormat = false;

function toggleTimeFormat() {
    is24HourFormat = !is24HourFormat;
    updateTime();
}

function updateTime() {
    var now = new Date();
    var timeElement = document.getElementById("time");
    var hours = now.getHours();
    var minutes = now.getMinutes().toString().padStart(2, "0");

    if (is24HourFormat) {
        var timeString = hours.toString().padStart(2, "0") + ":" + minutes;
    } else {
        var suffix = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        var timeString = hours.toString().padStart(2, "0") + ":" + minutes + " " + suffix;
    }

    timeElement.innerHTML = timeString;
}

function initTimeDisplay() {
    var timeElement = document.getElementById("time");
    timeElement.addEventListener("click", toggleTimeFormat);
}

window.addEventListener("load", function() {
    var loadingElement = document.getElementById("loading");
    if (loadingElement) {
        loadingElement.style.display = "none";
    }
    
    var duckOSElement = document.getElementById("DuckOS");
    if (duckOSElement) {
        duckOSElement.style.display = "block";
    }
    
    initTimeDisplay();
});


setInterval(updateTime, 1000);


var elem = document.documentElement;

var isFullscreen = false;

function toggleFullscreen() {
    var elem = document.documentElement;

    if (isFullscreen) {
        // Exit full screen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    } else {
        // Open full screen
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    }

    isFullscreen = !isFullscreen;
}