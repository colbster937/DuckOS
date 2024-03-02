let zIndexCounter = 1;
let isResizing = false;
let originalPosition;
const openedWindows = {};

function createWindow(title, content, width = '30%', height = '50%') {
  if (openedWindows[title]) {
    if (openedWindows[title].classList.contains('minimized')) {
      openedWindows[title].classList.remove('minimized');
      openedWindows[title].style.display = 'block'; 
    } else {
      openedWindows[title].style.zIndex = zIndexCounter++;
      openedWindows[title].classList.add('active');
    }
    return;
  }
  
  const window = document.createElement('div');
  window.className = 'window';
  window.style.zIndex = zIndexCounter++;
  window.style.width = width;
  window.style.height = height;
  window.style.top = 50%;
  window.style.left = 50%;
  window.style.transform = translate(-50%, -50%);
  openedWindows[title] = window;

  const maxWidth = parseFloat(width);
  const maxHeight = parseFloat(height);

  const remainingWidth = 100 - maxWidth;
  const remainingHeight = 100 - maxHeight;

  const calculatedLeft = remainingWidth / 2;
  const calculatedTop = remainingHeight / 2;

  window.style.left = calculatedLeft + '%';
  window.style.top = calculatedTop + '%';

  let originalLeft = calculatedLeft;
  let originalTop = calculatedTop;
  let originalWidth = width;
  let originalHeight = height;
  let originalzIndex;

  const header = document.createElement('div');
  header.className = 'window-header';
  header.textContent = title;

  const closeButton = document.createElement('button');
  closeButton.className = 'window-close-button';
  closeButton.innerHTML = '<abbr title="Close Window"></abbr>';
  closeButton.addEventListener('click', () => {
    window.classList.remove('active');
    setTimeout(() => {
      window.remove();
      delete openedWindows[title];
    }, 300);
  });

  const minimizeButton = document.createElement('button');
  minimizeButton.className = 'window-minimize-button';
  minimizeButton.textContent = '';
  minimizeButton.addEventListener('click', () => {
    if (!window.classList.contains('minimized')) {
      window.classList.add('minimized');
      window.style.display = 'none';
    } else {
      window.classList.remove('minimized');
      window.style.display = 'block';
      window.style.zIndex = zIndexCounter++;
      window.style.transform = 'scale(1)';
    }
  });

  const maximizeButton = document.createElement('button');
  maximizeButton.className = 'window-maximize-button';
  maximizeButton.textContent = '';
  maximizeButton.addEventListener('click', () => {
    if (!window.classList.contains('maximized')) {
      window.classList.add('maximized');
      originalLeft = window.style.left;
      originalTop = window.style.top;
      originalWidth = window.style.width;
      originalHeight = window.style.height;
      originalzIndex = window.style.zIndex;

      window.style.left = '0';
      window.style.top = '0';
      window.style.width = '100%';
      window.style.height = '100%';
      window.style.transform = 'none';
      window.style.zIndex = '101';
    } else {
      window.classList.remove('maximized');
      window.style.left = originalLeft;
      window.style.top = originalTop;
      window.style.width = originalWidth;
      window.style.height = originalHeight;
      window.style.zIndex = originalzIndex;
      window.style.transform = 'scale(1)';
    }
  });

  header.appendChild(closeButton);
  header.appendChild(minimizeButton);
  header.appendChild(maximizeButton);
  window.appendChild(header);

  const body = document.createElement('div');
  body.className = 'window-body';
  body.innerHTML = content;
  window.appendChild(body);

  let isDragging = false;
  let startPosX, startPosY, startMouseX, startMouseY;

  const bringToFront = () => {
    zIndexCounter += 1;
    window.style.zIndex = zIndexCounter;
  };

  const handleMouseDown = (e) => {
    if (!window.classList.contains('maximized')) {
      isDragging = true;
      startPosX = window.offsetLeft;
      startPosY = window.offsetTop;
      startMouseX = e.clientX;
      startMouseY = e.clientY;

      const iframes = window.querySelectorAll('iframe');
      iframes.forEach(iframe => {
        iframe.style.pointerEvents = 'none';
      });

      bringToFront();

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mouseleave', handleMouseUp);
    }
  };

  const handleContentClick = () => {
    bringToFront();
  };

  body.addEventListener('mousedown', handleContentClick);

  const handleMouseMove = (e) => {
    if (isDragging) {
      const offsetX = e.clientX - startMouseX;
      const offsetY = e.clientY - startMouseY;
      window.style.left = startPosX + offsetX + 'px';
      window.style.top = startPosY + offsetY + 'px';
    }
  };

  const handleMouseUp = () => {
    isDragging = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mouseleave', handleMouseUp);

    const iframes = window.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      iframe.style.pointerEvents = 'auto';
    });
  };

  let isResizing = false;
  let startWidth, startHeight;

  const handleResizeMouseDown = (e) => {
    isResizing = true;
    startWidth = parseFloat(window.style.width);
    startHeight = parseFloat(window.style.height);
    startMouseX = e.clientX;
    startMouseY = e.clientY;

    const iframes = window.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      iframe.style.pointerEvents = 'none';
    });

    bringToFront();

    document.addEventListener('mousemove', handleResizeMouseMove);
    document.addEventListener('mouseup', handleResizeMouseUp);
    document.addEventListener('mouseleave', handleResizeMouseUp);
  };

  const handleResizeMouseMove = (e) => {
    if (isResizing) {
      const offsetX = e.clientX - startMouseX;
      const offsetY = e.clientY - startMouseY;
      const newWidth = Math.max(30, startWidth + offsetX);
      const newHeight = Math.max(30, startHeight + offsetY);

      window.style.width = newWidth + 'px';
      window.style.height = newHeight + 'px';
      bringToFront();
    }
  };

  const handleResizeMouseUp = () => {
    isResizing = false;
    document.removeEventListener('mousemove', handleResizeMouseMove);
    document.removeEventListener('mouseup', handleResizeMouseUp);
    document.removeEventListener('mouseleave', handleResizeMouseUp);

    const iframes = window.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      iframe.style.pointerEvents = 'auto';
    });
  };

  const resizeHandle = document.createElement('div');
  resizeHandle.className = 'resize-handle';
  resizeHandle.addEventListener('mousedown', handleResizeMouseDown);
  resizeHandle.addEventListener('mousemove', () => {
    if (isResizing) {
      bringToFront();
    }
  });
  window.appendChild(resizeHandle);

  header.addEventListener('mousedown', handleMouseDown);

  document.body.appendChild(window);

  setTimeout(() => {
    window.classList.add('active');
  }, 10);
}



const welcome = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to DuckOS v6!</title>
    <style>
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
        }
        h2 {
            font-size: 35px;
            margin-bottom: 10px;
        }
        h3 {
            font-size: 20px;
            margin: 0 0 20px;
        }
        p {
            font-size: 15px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 style="color: red;">This window will only show up once.</h1>
        <h2>Welcome to DuckOS v6!</h2>
        <p>Embark on a New Digital Journey with Unrivaled Features<br><small>(Continuously Evolving)</small><br>Just Launched – Embrace the Excitement!<br><small>Ongoing Development to Enhance Your Experience</small></p>
        <p style="color: red;">Remember to enter Fullscreen so DuckOS formats correctly!</p>
        <p>Get Ready for a Polished Landing Page Coming Your Way</p>
        <hr>
        <p>Discover DuckOS v6: A Glimpse into the Future</p>
        <p>Welcome to DuckOS v6, where innovation meets accessibility. As you step into the world of DuckOS, you're entering an unparalleled web-based operating system, meticulously designed to redefine your digital experience. Although this version is still in its beta phase, the journey ahead promises a new era of computing freedom.</p>
        <p>Unleash Your Creativity with Customizable Settings</p>
        <p>DuckOS understands that each user is unique. That's why we've made customization a cornerstone of this OS. Tailor your environment to your preferences – adjust themes, layouts, and even workflows. Personalize your workspace like never before, reflecting your individuality.</p>
        <p>Game On: Entertainment at Your Fingertips</p>
        <p>Get ready to game like never before. DuckOS v6 comes equipped with a vast array of captivating games suitable for all ages. Whether you're a casual gamer or a hardcore enthusiast, our game library has something to offer. With intuitive controls and seamless integration, your gaming adventures are just a click away.</p>
        <p>Unrestricted Access with Built-In Proxies</p>
        <p>Say goodbye to online barriers. DuckOS v6 comes with the best flagship proxies such as Cobalt, Rammerhead and Immortal.</p>
    </div>
</body>
</html>

`

if (!localStorage.getItem('visitedBefore')) {
  createWindow('Welcome to DuckOS!', welcome, '50%', '50%');
  localStorage.setItem('visitedBefore', 'true');
}

// App's code

const proxy = `
<iframe src="../system/apps/proxies/index.html" frameborder="0" style="width: 100%; height: 100%; border: none;"></iframe>
`

const calculatorApp = `
<iframe id="ifr" src="../system/apps/calculator/index.html" style="width:100%; height:100%;" frameborder="none"></iframe>
`;

const games = `
<iframe id="ifr" src="https://tortillagames.org/games.html?from=duckos&hidenavbar=true" style="width:100%; height:100%; border:none;" frameborder="none"></iframe>
`
const terminal = `
<iframe id="ifr" src="../system/apps/terminal/index.html" style="width:100%; height:100%;" frameborder="none"></iframe>
`

// List of apps 
const appsContainer = document.getElementById('appsContainer');
const data = [{
  id: 1,
  imageSrc: '../media/icons/proxy.png',
  text: 'Proxies',
  clickFunction: function() {
    createWindow('Proxies', proxy, '60%', '70%');
  }
},
{
  id: 2,
  imageSrc: '../media/icons/games.png',
  text: 'Games',
  clickFunction: function() {
    createWindow('TortillaGames', games, '40%', '60%');
  }
},
{
  id: 3,
  imageSrc: '../media/icons/calculator.png',
  text: 'Calculator',
  clickFunction: function() {
    createWindow('Calculator App', calculatorApp, '15%', '50%');
  }
},
{
  id: 4,
  imageSrc: '../media/icons/terminal.png',
  text: 'Terminal',
  clickFunction: function() {
    createWindow('Terminal Emulator', terminal, '40%', '45%');
  }
},
];

function createApp(appData) {
  const miniDiv = document.createElement('div');
  miniDiv.classList.add('appsbox');

  miniDiv.setAttribute('data-app-id', appData.id);

  const image = document.createElement('img');
  image.src = appData.imageSrc;
  miniDiv.appendChild(image);

  miniDiv.addEventListener('click', appData.clickFunction);

  appsContainer.appendChild(miniDiv);
}

function removeAppById(appId) {
  const appDivToRemove = appsContainer.querySelector(`[data-app-id="${appId}"]`);
  if (appDivToRemove) {
    appsContainer.removeChild(appDivToRemove);
  }
}

// Add apps using the createApp function
data.forEach(item => {
  createApp(item);
});

// Example usage for devs: Remove the app with ID 2
// removeAppById(2);
// Example usage for devs: Remove latest added app
// removeApp(1);

/*
    const newAppData = {
        id: 39384,
        imageSrc: '/image/path',
        text: 'Name of App',
        clickFunction: function() {
            createWindow('App window name', 'innerHTML Content');
        }
    };
   
    createApp(newAppData);
*/

// IT IS RECOMMENDED TO USE STYLES INSIDE THE HTML TAGS, LIKE I DID ABOVE.
