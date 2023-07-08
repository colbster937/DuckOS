const config = {
    buttons: [{
            id: 'rammerhead-browser',
            iframeSrc: window.location.protocol + '//study.' + window.location.hostname + '/',
            defaultWidth: 50,
            defaultHeight: 80,
            buttonText: 'Rammerhead',
            windowTitle: 'Rammerhead Browser',
            imgSrc: '/system/media/appicons/rammerhead_icon.png'
        },
        {
            id: 'a1r',
            iframeSrc: window.location.protocol + '//game.' + window.location.hostname + '/',
            defaultWidth: 70,
            defaultHeight: 80,
            buttonText: 'A1R',
            windowTitle: 'A1R Games - Made by BlazerHM',
            imgSrc: '/system/media/appicons/air_icon.png',
            onStart: false
        },
        {
            id: 'terminal',
            iframeSrc: '/apps/terminal/index.html',
            defaultWidth: 30,
            defaultHeight: 45,
            buttonText: 'Terminal',
            windowTitle: 'DuckOS Terminal Emulator',
            imgSrc: '/system/media/appicons/terminal.png'
        },
        {
            id: 'Calculator',
            iframeSrc: '/apps/calculator/index.html',
            defaultWidth: 15,
            defaultHeight: 50,
            buttonText: 'Calculator',
            windowTitle: 'Calculator App',
            imgSrc: '/system/media/appicons/calculator_icon.png'
        },
        {
            id: 'about',
            iframeSrc: '/apps/about/index.html',
            defaultWidth: 50,
            defaultHeight: 80,
            buttonText: 'About Page',
            windowTitle: 'Learn about DuckOS!',
            imgSrc: '/system/media/appicons/about_icon.png'
        }
    ]
};
config.buttons.forEach(buttonConfig => {
    const $button = createButton(buttonConfig);
    $('#apps').append($button);
});