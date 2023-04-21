document.addEventListener('contextmenu', event => event.preventDefault());
window.addEventListener("load", function() {
    document.getElementById("loading").style.display = "none";
    document.getElementById("DuckOS").style.display = "block";
});

function updateTime() {
    var now = new Date();
    var timeElement = document.getElementById("time");
    var hours = now.getHours().toString().padStart(2, "0");
    var minutes = now.getMinutes().toString().padStart(2, "0");
    var seconds = now.getSeconds().toString().padStart(2, "0");
    var timeString = hours + ":" + minutes + ":" + seconds;
    timeElement.innerHTML = timeString;
}
setInterval(updateTime, 1000);

var elem = document.documentElement;
