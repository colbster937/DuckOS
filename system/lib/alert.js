window.addEventListener('load', function() {
    var loadingPage = document.querySelector('.loading-page');
    var delayTime = localStorage.getItem('delayTime');
    if (delayTime === null) {
        // First time user, apply 7000sec delay
        setTimeout(function() {
            loadingPage.classList.add('fade-out');
            setTimeout(function() {
                loadingPage.style.display = 'none';
            }, 500);
        }, 7000);
        localStorage.setItem('delayTime', '7000');
    } else {
        // Returning user, apply 1ms delay
        setTimeout(function() {
            loadingPage.classList.add('fade-out');
            setTimeout(function() {
                loadingPage.style.display = 'none';
            }, 500);
        }, 1);
    }
});