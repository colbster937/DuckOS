document.addEventListener('DOMContentLoaded', function() {
    const settingsbtn = document.getElementById('settingsbtn');
    const settingsPage = document.getElementById('settingspage');
    const toggleSwitch = document.getElementById('toggleSwitch');

    function toggleSettings(e) {
        e.stopPropagation();
        if (settingsPage.classList.contains('show')) {
            settingsPage.classList.add('hide');
            setTimeout(() => {
                settingsPage.classList.remove('show');
                settingsPage.classList.remove('hide');
            }, 200);
        } else {
            settingsPage.classList.add('show');
        }
    }

    function hideSettings() {
        if (settingsPage.classList.contains('show')) {
            settingsPage.classList.add('hide');
            setTimeout(() => {
                settingsPage.classList.remove('show');
                settingsPage.classList.remove('hide');
            }, 200);
        }
    }

    function preventPropagation(e) {
        e.stopPropagation();
    }

   function toggleMode() {
    document.body.classList.toggle('light-mode');
    toggleSwitch.textContent = document.body.classList.contains('light-mode') ? 'Light Mode' : 'Dark Mode';

    if (document.body.classList.contains('light-mode')) {
        document.getElementById('settingspage').style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
        document.getElementById('taskbar').style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
        document.getElementById('statscenter').style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
        document.getElementById('time').style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
        document.getElementById('time').style.color = 'rgba(0, 0, 0, 0.7)';
        document.getElementById('settingsbtn').style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
        document.getElementById('settingsbtn').style.color = 'rgba(0, 0, 0, 0.7)';
        document.getElementById('fullscreenbtn').style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
        document.getElementById('fullscreenbtn').style.color = 'rgba(0, 0, 0, 0.7)';
        document.getElementById('settingspage').style.color = 'rgba(0, 0, 0, 0.7)';
        document.getElementById('taskbar').style.color = 'rgba(0, 0, 0, 0.7)';
        document.getElementById('statscenter').style.color = 'rgba(0, 0, 0, 0.7)';
        document.getElementById('toolbar').style.color = 'rgba(0, 0, 0, 0.7)';
        document.getElementById('toolbar').style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
        document.getElementById('statscenterbtn').style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
        document.getElementById('statscenterbtn').style.color = 'rgba(0, 0, 0, 0.7)';
        document.getElementById('buttondefualt').style.backgroundColor = 'rgba(1, 1, 1, 0.3)';
    } else {
        document.getElementById('settingspage').style.backgroundColor = '';
        document.getElementById('taskbar').style.backgroundColor = '';
        document.getElementById('statscenter').style.backgroundColor = '';
        document.getElementById('time').style.backgroundColor = '';
        document.getElementById('time').style.color = '';
        document.getElementById('settingsbtn').style.backgroundColor = '';
        document.getElementById('settingsbtn').style.color = '';
        document.getElementById('fullscreenbtn').style.backgroundColor = '';
        document.getElementById('fullscreenbtn').style.color = '';
        document.getElementById('settingspage').style.color = '';
        document.getElementById('taskbar').style.color = '';
        document.getElementById('statscenter').style.color = '';
        document.getElementById('statscenterbtn').style.backgroundColor = '';
        document.getElementById('statscenterbtn').style.color = '';
      document.getElementById('toolbar').style.color = '';
        document.getElementById('toolbar').style.backgroundColor = '';
      
    }
}




    settingsbtn.addEventListener('click', toggleSettings);
    settingsPage.addEventListener('click', preventPropagation);
    document.addEventListener('click', hideSettings);
    toggleSwitch.addEventListener('click', toggleMode);

    const savedBackground = localStorage.getItem('background');
    if (savedBackground) {
        document.body.style.backgroundImage = savedBackground;
        document.body.style.backgroundSize = 'cover';
    }
});

function uploadBackground() {
    var fileInput = document.getElementById('uploadImage');
    var file = fileInput.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        document.body.style.backgroundImage = "url('" + e.target.result + "')";
        document.body.style.backgroundSize = "cover";

        localStorage.setItem('background', "url('" + e.target.result + "')");
    }
    reader.readAsDataURL(file);
}

let selectedImage = null;

function selectedimg(img) {
    if (selectedImage !== null) {
        selectedImage.classList.remove("selected");
    }
    img.classList.add("selected");
    selectedImage = img;
}

function changeBackgroundefualt() {
    document.body.style.backgroundImage = "url('/system/media/backgrounds/background.jpg')";

    localStorage.setItem('background', "url('/system/media/backgrounds/background.jpg')");
}

function changeBackgroundsunset() {
    document.body.style.backgroundImage = "url('/system/media/backgrounds/sunset.jpg')";

    localStorage.setItem('background', "url('/system/media/backgrounds/sunset.jpg')");
}

function changeBackgroundearth() {
    document.body.style.backgroundImage = "url('/system/media/backgrounds/earth.jpg')";

    localStorage.setItem('background', "url('/system/media/backgrounds/earth.jpg')");
}

function changeBackgroundasian() {
    document.body.style.backgroundImage = "url('/system/media/backgrounds/asian.png')";

    localStorage.setItem('background', "url('/system/media/backgrounds/asian.png')");
}
function changeBackgroundanime() {
    document.body.style.backgroundImage = "url('/system/media/backgrounds/anime.jpg')";

    localStorage.setItem('background', "url('/system/media/backgrounds/anime.jpg')");
}
changeBackgroundefualt()