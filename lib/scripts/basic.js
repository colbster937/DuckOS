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
  let altKeyPressed = false;

  function toggleSettingsList() {
    if (!settingslist.classList.contains("visible")) {
      settingslist.style.animation = "fadeIn 0.5s";
    }
    settingslist.classList.toggle("visible");
  }

  toggleButton.addEventListener("click", toggleSettingsList);

  document.addEventListener("keydown", function(event) {
    if (event.altKey && event.key === "s") {
      altKeyPressed = true;
      toggleSettingsList();
    }
  });

  document.addEventListener("keyup", function(event) {
    if (event.key === "Alt") {
      altKeyPressed = false;
    }
  });

  document.addEventListener("keyup", function(event) {
    if (!altKeyPressed && event.key === "s" && settingslist.classList.contains("visible")) {
      settingslist.style.animation = "fadeOut 0.5s";
      setTimeout(() => {
        settingslist.classList.remove("visible");
        settingslist.style.animation = "";
      }, 500);
    }
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

window.addEventListener("load", function() {
  var loader = document.getElementById("loader");
  var content = document.getElementById("content");

  setTimeout(function() {
    loader.style.transition = "opacity 1s";
    loader.style.opacity = "0";
    content.style.display = "block";
    document.body.style.overflow = "auto";
  }, 3500);

  setTimeout(function() {
    loader.style.display = "none";
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

// DuckOS Loading screen tips

const splashTexts = [
  "You can press the backtick key (`) to quickly hide the page!",
  "The keybind \"Alt + S\" opens the settings menu :)",
  "The only way to do great work is to love what you do. - Steve Jobs",
  "In three words I can sum up everything I've learned about life: it goes on. - Robert Frost",
  "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
  "The only thing necessary for the triumph of evil is for good men to do nothing. - Edmund Burke",
  "Life is what happens when you're busy making other plans. - John Lennon",
  "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
  "The best way to predict the future is to create it. - Peter Drucker",
  "In the middle of every difficulty lies opportunity. - Albert Einstein",
  "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela",
  "You miss 100% of the shots you don't take. - Wayne Gretzky",
  "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment. - Ralph Waldo Emerson",
  "The journey of a thousand miles begins with a single step. - Lao Tzu",
  "Success is stumbling from failure to failure with no loss of enthusiasm. - Winston Churchill",
  "Life is really simple, but we insist on making it complicated. - Confucius",
  "Don't count the days, make the days count. - Muhammad Ali",
  "The only person you are destined to become is the person you decide to be. - Ralph Waldo Emerson",
  "The harder I work, the luckier I get. - Samuel Goldwyn",
  "The secret of getting ahead is getting started. - Mark Twain",
  "The best revenge is massive success. - Frank Sinatra",
  "I can't change the direction of the wind, but I can adjust my sails to always reach my destination. - Jimmy Dean",
  "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment. - Buddha",
  "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
  "The only thing standing between you and your goal is the story you keep telling yourself as to why you can't achieve it. - Jordan Belfort",
  "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
  "I attribute my success to this: I never gave or took any excuse. - Florence Nightingale",
  "Life is 10% what happens to us and 90% how we react to it. - Charles R. Swindoll",
  "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
  "The only true wisdom is in knowing you know nothing. - Socrates",
  "Success usually comes to those who are too busy to be looking for it. - Henry David Thoreau",
  "The best time to plant a tree was 20 years ago. The second best time is now. - Chinese Proverb",
  "Don't let yesterday take up too much of today. - Will Rogers",
  "The road to success and the road to failure are almost exactly the same. - Colin R. Davis",
  "Life is short, and it is up to you to make it sweet. - Sarah Louise Delany",
];


function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

const splashTextElement = document.getElementById("splashText");
const randomIndex = getRandomIndex(splashTexts.length);
splashTextElement.textContent = splashTexts[randomIndex];



const buttons = [
  { text: "Google Classroom", title: "Google Classroom", favicon: "/media/favicons/cloak/google.png" },
  { text: "Canvas", title: "Canvas  ||  Dashboard", favicon: "/media/favicons/cloak/canvas.png" },
  { text: "Defualt Title & Favicon", title: "DuckOS v6", favicon: "/media/favicons/skyhax.png" }
];

function changeTabTitleAndFavicon(title, favicon) {
  document.title = title;
  const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = favicon;
  document.getElementsByTagName('head')[0].appendChild(link);

  localStorage.setItem('tabTitle', title);
  localStorage.setItem('tabFavicon', favicon);
}

const buttonContainer = document.getElementById("buttonContainer");
buttons.forEach((buttonInfo) => {
  const button = document.createElement("button");
  button.textContent = buttonInfo.text;
  button.className = "disguisebtn";
  button.addEventListener("click", () => {
    changeTabTitleAndFavicon(buttonInfo.title, buttonInfo.favicon);
  });
  buttonContainer.appendChild(button);
});

const storedTabTitle = localStorage.getItem('tabTitle');
const storedTabFavicon = localStorage.getItem('tabFavicon');
if (storedTabTitle && storedTabFavicon) {
  changeTabTitleAndFavicon(storedTabTitle, storedTabFavicon);
}

const tabTitleInput = document.getElementById("tabTitleInput");
const faviconInput = document.getElementById("faviconInput");
const uploadFavicon = document.getElementById("uploadFavicon");
const setCustomFaviconButton = document.getElementById("setCustomFavicon");

setCustomFaviconButton.addEventListener("click", () => {
  const newTitle = tabTitleInput.value.trim();
  const newFavicon = faviconInput.value.trim();

  if (newTitle && newFavicon) {
    changeTabTitleAndFavicon(newTitle, newFavicon);
  }
});

// Invalidate non-verified domains 

if (
  document.referrer !== "https://google.com/" &&
  document.referrer !== "https://beta-33e42.skyhax.xyz/" &&
  document.referrer !== "https://github.com/" &&
  document.referrer !== "https://discord.com/" &&
  document.referrer !== "https://skyhax.xyz/" &&
  document.referrer !== "https://duckos.site/" &&
  document.referrer !== "https://mesmerizing.skin/" &&
  document.referrer !== "https://skyhax.store/" &&
  document.referrer !== "https://studyclub.biz/" &&
  document.referrer !== "https://skyhax.online" &&
  document.referrer !== "https://chainedtears.dev/" &&
  document.referrer !== "https://arthur-can.design/" &&
  document.referrer !== "https://duckos.acompletenewb.repl.co/" &&
  document.referrer !== "https://skyhax.lol/"
) {
  window.location.href = "invalid.html";
}

// Future secret page will be here

/*
let typedKeys = "";

document.addEventListener("keydown", function(event) {
  typedKeys += event.key;

  if (typedKeys === "842571") {
    window.location.href = "/directories/secret.html";
  } else if (typedKeys.length > 6) {
    typedKeys = "";
  }
});
*/
