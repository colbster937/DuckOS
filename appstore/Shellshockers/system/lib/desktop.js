function setApps() {
    for (let app of vfs.applications) {
        let div = document.createElement('div');
        div.innerHTML = `
        <div class="package" onclick="startApp('${app.path}')">
            <img src="${app.icon}">
            <p>${app.name}</p>
        </div>`;
        document.getElementById(vfs.vmem.glts).append(div);
    }
}
function setWallpaper(path) {
    document.getElementById(vfs.vmem.glct).style.backgroundImage = `url('${path}')`;
}
function initScript(path) {
    fetch(path, { method: 'GET' })
    .then(script => script.text())
    .then(script => {
        eval(script);
        vfs.vmem.daemons.push({"name": cfg.name, "desc": "Daemon: " + path, "runat": new Date(), "icon": cfg.icon});
    });
}
function autoStartInit() {
    if (localStorage.autostart) {
        autostart = JSON.parse(localStorage.autostart);
        for (let script of autostart) {
            initScript(script);
        }
    }
}
function screenInit() {
    vfs.vmem.taskbar = true;
    vfs.vmem.screen = getScreen();
    window.onresize = function() { vfs.vmem.screen = getScreen(); }
    setInterval(function () {
        date = getDate();
        document.getElementById('dateplace').innerHTML = `${date['hours']}:${date['minutes']}:${date['seconds']}`;
    }, 1000);
    autoStartInit();
    if (localStorage.wallpaper) { setWallpaper(localStorage.wallpaper); }
    else { setWallpaper(vfs.vmem.wallpaper); }
    setApps();
    showScreen();
}

window.onload = function () {
    fetch('system/vfs.json', {
        method: 'GET',
    })
    .then(res => res.json())
    .then(res => {
        vfs = res;
        screenInit();
    });
}
