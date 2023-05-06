// NEW UPDATE: Now uses % instead of width ;) good luck lmao
const config = {
  buttons: [
    {
      id: 'rammerhead-browser',
      iframeSrc: 'https://cac.101cc.org/',
      defaultWidth: 50,
      defaultHeight: 80,
      buttonText: 'Rammerhead',
      windowTitle: 'Rammerhead Browser',
      imgSrc: '/system/media/rammerhead_icon.png'
    },
    {
      id: 'meowzies-adventure',
      iframeSrc: '/apps/meowiegames/meowziesadventurethree/index.html',
      defaultWidth: 30,
      defaultHeight: 45,
      buttonText: 'Meowzies Adventure 3',
      windowTitle: 'Meowzies Adventure 3',
      imgSrc: '/apps/meowiegames/meowziesadventurethree/icon.png',
      onStart: false
    },
    {
      id: 'minecraft',
      iframeSrc: '/apps/minecraft/index.html',
      defaultWidth: 70,
      defaultHeight: 80,
      buttonText: 'Minecraft',
      windowTitle: 'EaglerCraft 1.8.8 Beta',
      imgSrc: '/system/media/bloxd_icon.png'
    },
    {
      id: 'about',
      iframeSrc: '/apps/about/index.html',
      defaultWidth: 50,
      defaultHeight: 80,
      buttonText: 'About Page',
      windowTitle: 'Learn about DuckOS!',
      imgSrc: '/system/media/about_icon.png'
    },
    {
      id: 'kasmserver',
      iframeSrc: '/apps/kasm/index.html',
      defaultWidth: 50,
      defaultHeight: 80,
      buttonText: 'Kasm Server',
      windowTitle: 'Kasm. The best thing to ever exist!',
      imgSrc: '/system/media/kasm_icon.png'
    }
  ]
};
config.buttons.forEach(buttonConfig => {
  const $button = createButton(buttonConfig);
  $('#apps').append($button);
});
