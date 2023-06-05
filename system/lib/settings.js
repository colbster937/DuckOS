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
        document.getElementById('settingspage').style.backgroundColor = 'white';
        document.getElementById('taskbar').style.backgroundColor = 'white';
        document.getElementById('statscenter').style.backgroundColor = 'white';
        document.getElementById('time').style.backgroundColor = 'white';
        document.getElementById('time').style.color = 'black';
        document.getElementById('settingsbtn').style.backgroundColor = 'white';
        document.getElementById('settingsbtn').style.color = 'black';
        document.getElementById('fullscreenbtn').style.backgroundColor = 'white';
        document.getElementById('fullscreenbtn').style.color = 'black';
        document.getElementById('settingspage').style.color = 'black';
        document.getElementById('taskbar').style.color = 'black';
        document.getElementById('statscenter').style.color = 'black';
        document.getElementById('statscenterbtn').style.backgroundColor = 'white';
        document.getElementById('statscenterbtn').style.color = 'black';
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
    document.body.style.backgroundImage = "url('/system/media/background.jpg')";

    localStorage.setItem('background', "url('/system/media/background.jpg')");
}

function changeBackgroundmeow() {
    document.body.style.backgroundImage = "url('https://cdn.discordapp.com/attachments/1095511008698704033/1095511342527557762/838-transformed.jpeg')";

    localStorage.setItem('background', "url('https://cdn.discordapp.com/attachments/1095511008698704033/1095511342527557762/838-transformed.jpeg')");
}

function changeBackgroundmeow1() {
    document.body.style.backgroundImage = "url('https://cdn.discordapp.com/attachments/1095511008698704033/1095511342972162180/CbV7Rn7-earth-desktop-wallpaper.jpg')";

    localStorage.setItem('background', "url('https://cdn.discordapp.com/attachments/1095511008698704033/1095511342972162180/CbV7Rn7-earth-desktop-wallpaper.jpg')");
}

function changeBackgroundbeefy() {
    document.body.style.backgroundImage = "url('https://cdn.discordapp.com/attachments/1095511008698704033/1095737363503796264/Screenshot_2023-04-11_6.png')";

    localStorage.setItem('background', "url('https://cdn.discordapp.com/attachments/1095511008698704033/1095737363503796264/Screenshot_2023-04-11_6.png')");
}