const images = [
  '/media/backgrounds/background.png',
  '/media/backgrounds/background-1.png',
  '/media/backgrounds/background-2.png',
  '/media/backgrounds/background-3.png',
  '/media/backgrounds/background-4.png',
  '/media/backgrounds/background-5.png',
  '/media/backgrounds/background-6.png',
  '/media/backgrounds/background-7.png',
  '/media/backgrounds/background-8.png',
];

const backgroundImgDiv = document.querySelector('.background-img');
const body = document.body;
const customInput = document.getElementById('custom-input');

function setBackgroundImage(imageURL) {
  body.style.backgroundImage = `url("${imageURL}")`;
  localStorage.setItem('selectedBackground', imageURL);
  showNotification("Settings", "Your new wallpaper has been applied successfully!");
}

const storedBackground = localStorage.getItem('selectedBackground');
if (storedBackground) {
  setBackgroundImage(storedBackground);
}

images.forEach(imageURL => {
  const img = document.createElement('img');
  img.src = imageURL;
  img.addEventListener('click', () => {
      setBackgroundImage(imageURL);
  });
  backgroundImgDiv.appendChild(img);
});

customInput.addEventListener('change', event => {
  const file = event.target.files[0];
  if (file) {
      const imageURL = URL.createObjectURL(file);
      setBackgroundImage(imageURL);
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const lightmodeSwitch = document.getElementById("lightmodeSwitch");
  const originalStyles = {};

  // Function to get the default background color
  function getDefaultBackgroundColor(element) {
      return getComputedStyle(element).backgroundColor;
  }

  lightmodeSwitch.addEventListener("change", function() {
      const elementsToModify = document.querySelectorAll('div:not(.background-img):not(#rows):not(.row):not(.info):not(#appsContainer):not(.topbar):not(.settings-container):not(.notification-title):not(.notification-message):not(#taskbar):not(.notification-container), #time');

      if (this.checked) {
          showNotification("Settings", "Light mode theme has been turned on!");
          originalStyles.bodyBackground = getComputedStyle(document.body).backgroundImage;
          document.body.style.backgroundImage = "url('/media/backgrounds/background-7.png')";

          elementsToModify.forEach(element => {
              originalStyles[element.id] = {
                  color: getComputedStyle(element).color,
                  backgroundColor: getDefaultBackgroundColor(element)
              };
              element.style.color = "black";
              element.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
          });

          const buttonsToModify = document.querySelectorAll('button');
          buttonsToModify.forEach(button => {
              button.style.color = "black";
              button.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
          });
      } else {

          document.body.style.backgroundImage = originalStyles.bodyBackground;
          showNotification("Settings", "Successfully switched back to dark mode!");

          elementsToModify.forEach(element => {
              element.style.color = originalStyles[element.id].color;
              element.style.backgroundColor = originalStyles[element.id].backgroundColor;
          });

          const buttonsToModify = document.querySelectorAll('button');
          buttonsToModify.forEach(button => {
              button.style.color = originalStyles[button.id].color;
              button.style.backgroundColor = originalStyles[button.id].backgroundColor;
          });
      }
  });
});