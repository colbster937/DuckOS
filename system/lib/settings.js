document.addEventListener('DOMContentLoaded', function() {
    const settingsbtn = document.getElementById('settingsbtn');
    const settingsPage = document.getElementById('settingspage');

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

    settingsbtn.addEventListener('click', toggleSettings);
    settingsPage.addEventListener('click', preventPropagation);
    document.addEventListener('click', hideSettings);
});

function uploadBackground() {
    var fileInput = document.getElementById('uploadImage');
    var file = fileInput.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        document.body.style.backgroundImage = "url('" + e.target.result + "')";
        document.body.style.backgroundSize = "cover";
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
}

function changeBackgroundmeow() {
    document.body.style.backgroundImage = "url('https://cdn.discordapp.com/attachments/1095511008698704033/1095511342527557762/838-transformed.jpeg')";
}

function changeBackgroundmeow1() {
    document.body.style.backgroundImage = "url('https://cdn.discordapp.com/attachments/1095511008698704033/1095511342972162180/CbV7Rn7-earth-desktop-wallpaper.jpg')";
}

function changeBackgroundbeefy() {
    document.body.style.backgroundImage = "url('https://cdn.discordapp.com/attachments/1095511008698704033/1095737363503796264/Screenshot_2023-04-11_6.png')"
}