function startApp(package, params = {}) {
    if (taskbar) { openTaskMenu(perform = 'close'); }
    fetch(package + '/app.cfg', { method: 'GET' })
    .then(res => res.json())
    .then(res => {
        fetch(package + '/index.html', { method: 'GET' })
        .then(data => data.text())
        .then(data => {
            cont = new DOMParser().parseFromString(data, 'text/html');
            if (cont.querySelector('contents')) { res['content'] = cont.querySelector('contents').innerHTML; }
            if (cont.querySelector('onclose')) { res['onclose'] = cont.querySelector('onclose').innerHTML; }
            if (!res['onlyjs']) {
                let windowid = `window${vfs.vmem.windows.length + 1}`;
                let windowcount = vfs.vmem.windows.length + 1;
                var spawnY = 0, spawnX = 0;
                var winmaxim = '', winminim = '', winclose = '', windbclick = '', styles = '', headermax = '', constyles = '';
                var spawnY = '85px', spawnX = '50px';
                if (res['access']['canclose']) { winclose = 'show'; }
                if (res['access']['canminim']) { winminim = 'show'; }
                if (res['access']['canmaxim']) { winmaxim = 'show'; }
                let div = document.createElement('div');
                div.setAttribute('id', vfs.vmem.windowcounts);
                div.setAttribute('class', 'window');
                div.setAttribute('appname', res['name']);
                div.setAttribute('onmousedown', `doWithWindow('${String(vfs.vmem.windowcounts)}', 'active')`);
                if (res['access']['canmaxim']) {
                    headermax = ` ondblclick="doWithWindow('${String(vfs.vmem.windowcounts)}', 'maximize')"`;
                }
                if (res['style']) { styles = ` style="${res['style']}"` }
                if (res['contentstyle']) { constyles = ` style="${res['contentstyle']}"` }
                div.style.width = res['width'] + 'px';
                div.style.height = res['height'] + 'px';
                div.style.left = '50px';
                div.style.top = '85px';
                content = `
                    <div class="header"${headermax} id="header${vfs.vmem.windowcounts}"${styles}>
                        <div class="title" id="title${vfs.vmem.windowcounts}">${res['title']}</div>
                        <div class="buttons" id="buttons${vfs.vmem.windowcounts}">
                            <div minim onclick="doWithWindow('${String(vfs.vmem.windowcounts)}', 'minimize')" ${winminim}></div>
                            <div maxim onclick="doWithWindow('${String(vfs.vmem.windowcounts)}', 'maximize')" ${winmaxim}></div>
                            <div close onclick="doWithWindow('${String(vfs.vmem.windowcounts)}', 'close')" ${winclose}></div>
                        </div>
                    </div>
                    <div class="content" id="content${vfs.vmem.windowcounts}"${constyles}>
                        ${res['content']}
                    </div>
                `;
                if (!res['width'] == 'auto') { res['width'] = res['width'] + 'px' }
                if (!res['height'] == 'auto') { res['height'] = res['height'] + 'px' }
                div.innerHTML = content;
                document.getElementById('windows').append(div);
                if (res['id'] && !vfs.vmem.windows.includes(res['id'] )) { windowid = res['id']; }
                wininfo = {
                    "id": windowid,
                    "title": res['title'],
                    "name": res['name'],
                    "desc": res['desc'],
                    "author": res['author'],
                    "package": res['package'],
                    "started": res['started'],
                    "icon": res['icon'],
                    "realid": vfs.vmem.windowcounts,
                    "maximized": false,
                    "minimized": false,
                    "fullscreen": false,
                    "posY": spawnY,
                    "posX": spawnX,
                    "width": res['width'] + 'px',
                    "height": res['height'] + 'px',
                    "index": windowindexes,
                    "active": true,
                    "canclose": res['access']['canclose'],
                    "canminim": res['access']['canminim'],
                    "canmaxim": res['access']['canmaxim'],
                    "canfocus": res['access']['canfocus'],
                    "onclose": res['onclose'],
                    "hash": (Math.random() + 1).toString(36).substring(2),
                    "intouch": false
                };
                vfs.vmem.windows.push(wininfo);
                draggableWindow(String(vfs.vmem.windowcounts));
                if (res['resizeble']) {
                    let thiswindow = document.getElementById(String(vfs.vmem.windowcounts));
                    if (res['width']=='auto') { res['width'] = thiswindow.getBoundingClientRect().width }
                    if (res['height']=='auto') { res['height'] = thiswindow.getBoundingClientRect().height }
                    makeResizable(String(vfs.vmem.windowcounts), parseInt(res['width']), parseInt(res['height']));
                }
                doWithWindow(String(vfs.vmem.windowcounts), 'active');
                addToTaskbar(String(vfs.vmem.windowcounts));
                if (cont.querySelector('onstart')) {
                    toeval = decodeHTMLEntities(cont.querySelector('onstart').innerHTML);
                    window.eval(toeval);
                }
                vfs.vmem.windowcounts++;
            }
            if (res['onlyjs']) { window.eval(res['js']); }
        });
    });
}
function draggableWindow(windowid) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    let elmnt = document.getElementById(windowid);
    var startX=0, startY=0;

    try {
        let header = document.getElementById('header' + elmnt.id);
        if (header) { header.onmousedown = mouseHeaderDown; }
    }
    catch {}

    elmnt.addEventListener('touchstart',function(e) {
        startX = e.changedTouches[0].pageX;
        startY = e.changedTouches[0].pageY;
    });

    elmnt.addEventListener('touchmove',function(e) {
        e.preventDefault();
        var deltaX = e.changedTouches[0].pageX - startX;
        var deltaY = e.changedTouches[0].pageY - startY;
        elmnt.style.left = elmnt.offsetLeft + deltaX + 'px';
        elmnt.style.top = elmnt.offsetTop + deltaY + 'px';

        startX = e.changedTouches[0].pageX;
        startY = e.changedTouches[0].pageY;
    });

    let doubleClick = function () {
        console.log('double click')
    }
    
    wconf = getWindowById(parseInt(elmnt.id))

    let doubleTouch = function (e) {
        if (e.touches.length === 1) {
            if (!wconf.intouch) {
                wconf.intouch = e.timeStamp + 400
            }
            else if (e.timeStamp <= wconf.intouch) {
                e.preventDefault()
                doWithWindow(elmnt.id, 'maximize')
                wconf.intouch = null
            }
            else {
                wconf.intouch = e.timeStamp + 400
            }
        }
    }
    elmnt.addEventListener('touchstart', doubleTouch)
    function mouseHeaderDown(e) {
        if (!getWindowById(parseInt(windowid))['maximized']) {
            e = e || window.event;
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragWindow;
            document.onmousemove = windowDrag;
        }
    }
    function windowDrag(e) {
        e = e || window.event;
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.getElementById('content' + elmnt.id).setAttribute('uns', '');
        posY = (elmnt.offsetTop - pos2) + "px"
        posX = (elmnt.offsetLeft - pos1) + "px";
        elmnt.style.top = posY;
        elmnt.style.left = posX;
        let windowinfo = getWindowById(parseInt(elmnt.id))
        windowinfo['posY'] = posY;
        windowinfo['posX'] = posX;
    }
    function closeDragWindow() {
        document.getElementById('content' + elmnt.id).removeAttribute('uns');
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
function makeResizable(windowid, minW = 100, minH = 100, size = 20)
{
    const element = document.getElementById(windowid);
    const top = document.createElement('div');
    top.style.width = '100%';
    top.style.height = size + 'px';
    top.style.backgroundColor = 'transparent';
    top.style.position = 'absolute';
    top.style.top = - (size/2) + 'px';
    top.style.left = '0px';
    top.style.cursor = 'n-resize';

    top.addEventListener('mousedown', resizeYNegative());

    element.appendChild(top);

    const bottom = document.createElement('div');
    bottom.style.width = '100%';
    bottom.style.height = size + 'px';
    bottom.style.backgroundColor = 'transparent';
    bottom.style.position = 'absolute';
    bottom.style.bottom = - (size/2) + 'px';
    bottom.style.left = '0px';
    bottom.style.cursor = 'n-resize';

    bottom.addEventListener('mousedown',resizeYPositive());

    element.appendChild(bottom);

    const left = document.createElement('div');
    left.style.width = size + 'px';
    left.style.height = '100%';
    left.style.backgroundColor = 'transparent';
    left.style.position = 'absolute';
    left.style.top = '0px';
    left.style.left = - (size/2) + 'px';
    left.style.cursor = 'e-resize';

    left.addEventListener('mousedown',resizeXNegative());

    element.appendChild(left);

    const right = document.createElement('div');
    right.style.width = size + 'px';
    right.style.height = '100%';
    right.style.backgroundColor = 'transparent';
    right.style.position = 'absolute';
    right.style.top = '0px';
    right.style.right = - (size/2) + 'px';
    right.style.cursor = 'e-resize';

    right.addEventListener('mousedown',resizeXPositive());

    element.appendChild(right);


    const corner1 = document.createElement('div');
    corner1.style.width = size + 'px';
    corner1.style.height = size + 'px';
    corner1.style.backgroundColor = 'transparent';
    corner1.style.position = 'absolute';
    corner1.style.top = - (size/2) + 'px';
    corner1.style.left = - (size/2) + 'px';
    corner1.style.cursor = 'nw-resize';

    corner1.addEventListener('mousedown',resizeXNegative());
    corner1.addEventListener('mousedown',resizeYNegative());
    
    element.appendChild(corner1);

    const corner2 = document.createElement('div');
    corner2.style.width = size + 'px';
    corner2.style.height = size + 'px';
    corner2.style.backgroundColor = 'transparent';
    corner2.style.position = 'absolute';
    corner2.style.top = - (size/2) + 'px';
    corner2.style.right = - (size/2) + 'px';
    corner2.style.cursor = 'ne-resize';

    corner2.addEventListener('mousedown',resizeXPositive());
    corner2.addEventListener('mousedown',resizeYNegative());

    element.appendChild(corner2);

    const corner3 = document.createElement('div');
    corner3.style.width = size + 'px';
    corner3.style.height = size + 'px';
    corner3.style.backgroundColor = 'transparent';
    corner3.style.position = 'absolute';
    corner3.style.bottom = - (size/2) + 'px';
    corner3.style.left = - (size/2) + 'px';
    corner3.style.cursor = 'sw-resize';

    corner3.addEventListener('mousedown',resizeXNegative());
    corner3.addEventListener('mousedown',resizeYPositive());

    element.appendChild(corner3);

    const corner4 = document.createElement('div');
    corner4.style.width = size + 'px';
    corner4.style.height = size + 'px';
    corner4.style.backgroundColor = 'transparent';
    corner4.style.position = 'absolute';
    corner4.style.bottom = - (size/2) + 'px';
    corner4.style.right = - (size/2) + 'px';
    corner4.style.cursor = 'se-resize';

    corner4.addEventListener('mousedown',resizeXPositive());
    corner4.addEventListener('mousedown',resizeYPositive());

    element.appendChild(corner4);
    
    function get_int_style(key)
    {
        return parseInt(window.getComputedStyle(element).getPropertyValue(key));
    }

    function resizeXPositive()
    {
        let offsetX
        function dragMouseDown(e) {
            if(e.button !== 0) return
            e = e || window.event;
            e.preventDefault();
            const {clientX} = e;
            offsetX = clientX - element.offsetLeft - get_int_style('width');
            document.addEventListener('mouseup', closeDragElement)
            document.addEventListener('mousemove', elementDrag)
          }
        
          function elementDrag(e) {
                const {clientX} = e;
                let x = clientX - element.offsetLeft - offsetX
                if(x < minW) x = minW;
                element.style.width =  x + 'px';
                getWindowById(parseInt(element.id))['width'] = x + 'px';
          }
        
          function closeDragElement() {
            document.removeEventListener("mouseup", closeDragElement);  
            document.removeEventListener("mousemove", elementDrag);
          }
        return dragMouseDown
    }

    function resizeYPositive()
    {
        let offsetY
        function dragMouseDown(e) {
            if(e.button !== 0) return
            e = e || window.event;
            e.preventDefault();
            const {clientY} = e;
            offsetY = clientY - element.offsetTop - get_int_style('height');
    
            document.addEventListener('mouseup',closeDragElement)
            document.addEventListener('mousemove',elementDrag)
          }
        
          function elementDrag(e) {
                const {clientY} = e;
                let y =  clientY - element.offsetTop - offsetY;
                if(y < minH) y = minH;
                element.style.height = y + 'px';
                getWindowById(parseInt(element.id))['height'] = y + 'px';
          }
        
          function closeDragElement() {
            document.removeEventListener("mouseup", closeDragElement);  
            document.removeEventListener("mousemove", elementDrag);
          }
        return dragMouseDown
    }

    function resizeXNegative()
    {
        let offsetX
        let startX
        let startW
        let maxX
        function dragMouseDown(e) {
            if(e.button !== 0) return
            e = e || window.event;
            e.preventDefault();
            const {clientX} = e;
            startX = get_int_style('left')
            startW = get_int_style('width')
            offsetX = clientX - startX;
            maxX = startX + startW - minW
    
            document.addEventListener('mouseup',closeDragElement)
            document.addEventListener('mousemove',elementDrag)
          }
        
          function elementDrag(e) {
                const {clientX} = e;
                let x = clientX - offsetX
                let w = startW + startX - x
                if(w < minW) w = minW;
                if(x > maxX) x = maxX;
                element.style.left = x + 'px';
                element.style.width = w + 'px';
                getWindowById(parseInt(element.id))['width'] = w + 'px';
          }
        
          function closeDragElement() {
            document.removeEventListener("mouseup", closeDragElement);  
            document.removeEventListener("mousemove", elementDrag);
          }
        return dragMouseDown
    }

    function resizeYNegative()
    {
        let offsetY
        let startY
        let startH
        let maxY
        function dragMouseDown(e) {
            if(e.button !== 0) return
            e = e || window.event;
            e.preventDefault();
            const {clientY} = e;
            startY = get_int_style('top')
            startH = get_int_style('height')
            offsetY = clientY - startY;
            maxY = startY + startH - minH 
    
            document.addEventListener('mouseup',closeDragElement,false)
            document.addEventListener('mousemove',elementDrag,false)
          }
        
          function elementDrag(e) {
                const {clientY} = e;
                let y =  clientY - offsetY
                let h = startH + startY - y
                if(h < minH) h = minH;
                if(y > maxY) y = maxY;
                element.style.top = y + 'px';
                element.style.height = h + 'px';
                getWindowById(parseInt(element.id))['height'] = h + 'px';
          }
        
          function closeDragElement() {
            document.removeEventListener("mouseup", closeDragElement);  
            document.removeEventListener("mousemove", elementDrag);
          }
        return dragMouseDown
    }
}
function doWithWindow(windowid, action) {
    let thiswindow = document.getElementById(windowid);
    let thisheader = document.getElementById('header' + windowid);
    let thiscontent = document.getElementById('content' + windowid);
    let thisbuttons = document.getElementById('buttons' + windowid);
    let taskbar = document.getElementById('taskbar');
    let realid = parseInt(windowid);
    let windowconf = getWindowById(realid);
    if (action == 'close') {
        wncfg = windowconf
        if (windowconf['onclose']) {
            window.eval(windowconf['onclose']);
        }
        thiswindow.remove();
        newwindows = vfs.vmem.windows.filter(function(f) { return f['realid'] !== parseInt(windowid) });
        vfs.vmem.windows.length = 0;
        vfs.vmem.windows.push.apply(vfs.vmem.windows, newwindows);
        document.getElementById('task' + windowid).remove();
    }
    if (action == 'maximize') {
        if (!windowconf['maximized']) {
            thiswindow.style.top = '0px';
            thiswindow.style.left = '0px';
            thiswindow.style.transition = '0.2s';
            thiswindow.style.width = '100%';
            if (taskbar.hasAttribute('bottom')) { thiswindow.style.top = '35px'; thiswindow.style.height = 'calc(100% - 35px)'; }
            else { thiswindow.style.height = '100%'; }
            thiswindow.addEventListener('transitionend', () => thiswindow.style.transition = 'none');
            thisheader.style.borderRadius = '0px';
            thiscontent.style.borderRadius = '0px';
            thiswindow.style.border = 'none';
            windowconf['maximized'] = true;
        }
        else {
            thiswindow.style.top = windowconf['posY'];
            thiswindow.style.left = windowconf['posX'];
            thiswindow.style.transition = '0.2s';
            thiswindow.style.width = windowconf['width'];
            thiswindow.style.height = windowconf['height'];
            thiswindow.addEventListener('transitionend', () => thiswindow.style.transition = 'none');
            thisheader.style.borderRadius = 'var(--var-window-header-radius)';
            thiscontent.style.borderRadius = 'var(--var-window-content-radius)';
            thiswindow.style.border = 'var(--var-window-border)';
            windowconf['maximized'] = false;
        }
        hasdyn = thiswindow.querySelector('iframe');
        if (hasdyn) { hasdyn.focus(); }
    }
    if (action == 'minimize') {
        if (!windowconf['minimized']) {
            if (windowconf['active'] && windowconf['canminim']) {
                thiswindow.style.display = 'none';
                windowconf['minimized'] = true;
                document.getElementById('task' + windowid).removeAttribute('active');
            }
            else {
                doWithWindow(windowid, 'active');
            }
        }
        else {
            thiswindow.style.zIndex = windowindexes;
            thiswindow.style.display = 'block';
            windowconf['minimized'] = false;
            document.getElementById('task' + windowid).setAttribute('active', '');
            doWithWindow(windowid, 'active');
            hasdyn = thiswindow.querySelector('iframe');
            if (hasdyn) { hasdyn.focus(); }
        }
    }
    if (action == 'active') {
        vfs.vmem.activewindow = windowid;
        hasdyn = thiswindow.querySelector('iframe');
        if (hasdyn) { hasdyn.focus(); }
        openTaskMenu(perform = 'close');
        for (let i = 0; i < vfs.vmem.windows.length; i += 1) {
            try {
                thislitsk = document.getElementById('task' + String(vfs.vmem.windows[i]['realid']));
                thisliwin = document.getElementById('content' + String(vfs.vmem.windows[i]['realid']));
                thislihed = document.getElementById('header' + String(vfs.vmem.windows[i]['realid']));
                thislibtn = document.getElementById('buttons' + String(vfs.vmem.windows[i]['realid']));
                thiswin = document.getElementById(String(vfs.vmem.windows[i]['realid']));
                thisliwin.setAttribute('uns', '');
                thislihed.setAttribute('uns', '');
                thislibtn.setAttribute('uns', '');
                if (!vfs.vmem.windows[i]['maximized'] && !vfs.vmem.windows[i]['fullscreen']) { thiswin.style.border = 'var(--var-window-border-uns)'; }
                if (thislitsk.hasAttribute('active')) {
                    thislitsk.removeAttribute('active');
                }
                getWindowById(vfs.vmem.windows[i]['realid'])['active'] = false;
            }
            catch(e) {}
        }
        if (thisheader.hasAttribute('uns') && thisbuttons.hasAttribute('uns') && thiscontent.hasAttribute('uns')) {
            thiscontent.removeAttribute('uns');
            thisheader.removeAttribute('uns');
            thisbuttons.removeAttribute('uns');
        }
        windowindexes++;
        hasdyn = thiswindow.querySelector('iframe');
        thiswindow.style.zIndex = windowindexes;
        if (!windowconf['maximized'] && !windowconf['fullscreen']) { thiswindow.style.border = 'var(--var-window-border)'; }
        taskbar.style.zIndex = windowindexes + 1;
        document.getElementById('nots').style.zIndex = windowindexes + 1;
        try {
            document.getElementById('task' + windowid).setAttribute('active', '');
            document.getElementById('taskmenu').style.zIndex = windowindexes + 1;
        }
        catch {}
        getWindowById(realid)['active'] = true;
        if (hasdyn && windowconf['canfocus']) {
            try { setTimeout(() => { hasdyn.focus(); }, 500);}
            catch {}
        }
    }
    if (action == 'desktopclick') {
        for (let i = 0; i < vfs.vmem.windows.length; i += 1) {
            try {
                thisliwin = document.getElementById('content' + String(vfs.vmem.windows[i]['realid']));
                thislihed = document.getElementById('header' + String(vfs.vmem.windows[i]['realid']));
                thislibtn = document.getElementById('buttons' + String(vfs.vmem.windows[i]['realid']));
                thisliwin.setAttribute('uns', '');
                thislihed.setAttribute('uns', '');
                thislibtn.setAttribute('uns', '');
            }
            catch(e) {}
        }
    }
    if (action == 'fullscreen') {
        if (windowconf['fullscreen']) {
            taskbar.style.display = 'flex';
            if (!windowconf['maximized']) { thiswindow.style.border = 'var(--var-window-border)'; }
            thiswindow.style.top = windowconf['posY'];
            thiswindow.style.left = windowconf['posX'];
            thiswindow.style.width = windowconf['width'];
            thiswindow.style.height = windowconf['height'];
            thisheader.style.display = 'block';
            windowconf['fullscreen'] = false;
        }
        else {
            taskbar.style.display = 'none';
            thiswindow.style.top = '0px';
            thiswindow.style.left = '0px';
            thiswindow.style.width = '100%';
            thiswindow.style.height = 'calc(100% + 35px)';
            thiswindow.style.border = 'none';
            thisheader.style.display = 'none';
            windowconf['fullscreen'] = true;
        }
        hasdyn = thiswindow.querySelector('iframe');
        if (hasdyn) { hasdyn.focus(); }
    }
    if (action == 'focus') {
        hasdyn = thiswindow.querySelector('iframe');
        if (hasdyn) { hasdyn.focus(); }
    }
}
function doWithAllWindows(action) {
    if (action == 'unactive') {
        for (let i = 0; i < vfs.vmem.windows.length; i += 1) {
            try {
                thislitsk = document.getElementById('task' + String(vfs.vmem.windows[i]['realid']));
                thisliwin = document.getElementById('content' + String(vfs.vmem.windows[i]['realid']));
                thislihed = document.getElementById('header' + String(vfs.vmem.windows[i]['realid']));
                thislibtn = document.getElementById('buttons' + String(vfs.vmem.windows[i]['realid']));
                thiswin = document.getElementById(String(vfs.vmem.windows[i]['realid']));
                thisliwin.setAttribute('uns', '');
                thislihed.setAttribute('uns', '');
                thislibtn.setAttribute('uns', '');
                if (!vfs.vmem.windows[i]['maximized'] && !vfs.vmem.windows[i]['fullscreen']) { thiswin.style.border = 'var(--var-window-border-uns)'; }
                if (thislitsk.hasAttribute('active')) {
                    thislitsk.removeAttribute('active');
                }
                getWindowById(vfs.vmem.windows[i]['realid'])['active'] = false;
            }
            catch(e) {}
        }
    }
}
function getWindowById(windowid) {
    return vfs.vmem.windows.find(o => o.realid === windowid);
}
function getWindowByHash(hash) {
    return vfs.vmem.windows.find(o => o.hash === hash);
}
function changeWindowTitle(windowid, value) {
    if (value) {
        if (value == ' ') { value = 'Application'; }
        document.getElementById('title' + windowid).innerHTML = value;
        getWindowById(parseInt(windowid))['title'] = value;
        if (vfs.vmem.taskbar) {
            document.getElementById('tasktitle' + windowid).innerHTML = value;
        }
    }
}
function changeWindowContent(windowid, value) {
    if (value) {
        document.getElementById('content' + windowid).innerHTML = value;
    }
}
function addToTaskbar(windowid) {
    let opened = document.getElementById('openedapps');
    let thiswindow = getWindowById(parseInt(windowid));
    let div = document.createElement('div');

    if (!thiswindow['icon']) { icon = '/static/img/icon.png'; }
    else { icon = thiswindow['icon']; }

    div.setAttribute('class', 'openedapp');
    div.setAttribute('id', 'task' + windowid);
    div.setAttribute('active', '');
    div.setAttribute('onclick', `doWithWindow('${windowid}', 'minimize')`);
    div.innerHTML = `
        <img src="${icon}">
        <p id="tasktitle${windowid}">${thiswindow['title']}</p>
    `;
    opened.append(div);
}
function openTaskMenu(perform = 'default') {
    vfs.vmem.activewindow = false;
    let taskmenu = document.getElementById('taskmenu');
    if (perform == 'close') {
        if (taskmenu.hasAttribute('opened')) {
            taskmenu.style.top = '-100%';
            taskmenu.removeAttribute('opened');
            document.querySelector('.startic').removeAttribute('active');
        }
    }
    else {
        if (taskmenu.hasAttribute('opened')) {
            taskmenu.style.top = '-100%';
            taskmenu.removeAttribute('opened');
            document.querySelector('.startic').removeAttribute('active');
        }
        else {
            doWithAllWindows('unactive');
            taskmenu.style.top = '35px';
            taskmenu.setAttribute('opened', '');
            document.querySelector('.startic').setAttribute('active', '');
        }
    }
}
function decodeHTMLEntities(text) {
    let textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}
function showScreen() {
    setTimeout(() => { document.body.style.opacity = '1'; }, 1000);
}