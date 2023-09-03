// Time logic
function updateTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const is24HourFormat = !twelveHourFormat;
    let formattedHours = hours;
    let amPm = '';
    if (twelveHourFormat) {
        formattedHours = hours % 12 || 12;
        amPm = hours >= 12 ? 'PM' : 'AM';
    }
    const timeString = `${formattedHours}:${padZero(minutes)}:${padZero(seconds)} ${amPm}`;
    document.getElementById('time').textContent = timeString;
}

function padZero(number) {
    return (number < 10 ? '0' : '') + number;
}
let twelveHourFormat = localStorage.getItem('twelveHourFormat') === 'true';

function toggleTimeFormat() {
    twelveHourFormat = !twelveHourFormat;
    localStorage.setItem('twelveHourFormat', twelveHourFormat.toString());
    updateTime();
}
updateTime();
setInterval(updateTime, 1000);

// Fullscreen shit

const fullscreenElement = document.getElementById('fullscreen');
fullscreenElement.addEventListener('click', toggleFullscreen);

function toggleFullscreen() {
    if (document.fullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    } else {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        }
    }
}

// settinglist basic functionalitie

document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById("togglesettinglist");
    const settingslist = document.getElementById("settingslist");
    settingslist.style.zIndex = "9999";

    toggleButton.addEventListener("click", function() {
        if (!settingslist.classList.contains("visible")) {
            settingslist.style.animation = "fadeIn 0.5s";
        }
        settingslist.classList.toggle("visible");
    });

    document.addEventListener("click", function(event) {
        if (!settingslist.contains(event.target) && !toggleButton.contains(event.target)) {
            if (settingslist.classList.contains("visible")) {
                settingslist.style.animation = "fadeOut 0.5s";
                setTimeout(() => {
                    settingslist.classList.remove("visible");
                    settingslist.style.animation = "";
                }, 500);
            }
        }
    });
});


window.addEventListener('load', function() {
    var loader = document.getElementById('loader');
    var content = document.getElementById('content');

    setTimeout(function() {
        loader.style.transition = 'opacity 1s';
        loader.style.opacity = '0';
        content.style.display = 'block';
        document.body.style.overflow = 'auto';
    }, 3500);

    setTimeout(function() {
        loader.style.display = 'none';
    }, 4500);
});

// Code for notifications

const notification = document.getElementById('notification');
let notificationClickFunction = null;
let hideTimeout;

function showNotification(title, message, clickFunction) {
    const notificationTitle = notification.querySelector('.notification-title');
    const notificationMessage = notification.querySelector('.notification-message');
    notificationTitle.textContent = title;
    notificationMessage.textContent = message;
    notification.style.display = 'block';
    notification.style.animation = 'slideIn 0.5s ease-in-out';

    notificationClickFunction = clickFunction;

    // Clear any previous timeout and set a new one
    clearHideTimeout();
    setHideTimeout();
}

function hideNotification(event) {
    if (event) {
        event.stopPropagation();
    }
    notification.style.animation = 'slideOut 0.5s ease-in-out';
    setTimeout(() => {
        notification.style.display = 'none';
        notification.style.animation = '';
    }, 500);
}

function executeNotificationFunction() {
    if (notificationClickFunction) {
        notificationClickFunction();
    }
}

function clearHideTimeout() {
    clearTimeout(hideTimeout);
}

function setHideTimeout() {
    hideTimeout = setTimeout(() => {
        hideNotification();
    }, 3000);
}

// showNotification("Notification Title", "Custom message!", customClickFunction);

setTimeout(function() {
    showNotification("Welcome to DuckOS v6", "Feel free to explore the latest UI and all the exciting new features!");
}, 4500);

// Panic

let currentLink = localStorage.getItem("configuredLink") || "https://classroom.google.com";

function handleKeyPress(event) {
    if (event.key === "`") {
        const linkInput = document.getElementById("linkInput");
        const newLink = linkInput.value.trim();
        if (newLink !== "") {
            currentLink = newLink;
            localStorage.setItem("configuredLink", currentLink);
        }
        window.location.href = currentLink;
    }
}

const linkInput = document.getElementById("linkInput");
linkInput.addEventListener("input", function() {
    currentLink = linkInput.value.trim();
    localStorage.setItem("configuredLink", currentLink);
});

linkInput.value = currentLink;

document.addEventListener("keydown", handleKeyPress);
