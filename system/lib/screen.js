const windows = []
const maximized = []
const minimized = []

function showTaskBar() {
    target = document.getElementById('taskbar');
    if (target.style.top == '0px') { target.style.top = '-35px'; }
    else { target.style.top = '0px'; }
}