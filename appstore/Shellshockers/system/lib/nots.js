function showNotification(icon, title, text, timeout=7, sound='/system/snd/Submarine.mp3', playsound=true) {
    taskbar = document.getElementById('taskbar');
    audio = new Audio(sound);
    template = `
    <img icon src="${icon}">
    <div textareaq>
        <p title>${title}</p>
        <p textall>${text}</p>
    </div>
    `;
    target = document.getElementById('nots');
    thistarget = document.getElementById('innots');
    thistarget.innerHTML = template;
    if (!taskbar || taskbar.style.display == 'none') { target.style.top = '0px'; }
    target.style.right = '0px';
    if (playsound) { audio.play(); }
    setTimeout(() => {
        target.style.right = '-100%';
        if (!taskbar || taskbar.style.display == 'none') {target.style.top = '0px'; }
        else {target.style.top = '35px'; }
    }, timeout * 1000)
}