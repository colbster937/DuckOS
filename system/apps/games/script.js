const config = {
  images: [
    {
      title: "Minecraft",
      url: "gamefiles/minecraft/icon.png",
      link: "gamefiles/minecraft/index.html"
    },
    {
      title: "Legend of Zelda",
      url: "icons/zelda.png",
      link: "https://duckos-games.pages.dev/zelda/"
    },
    {
      title: "2048",
      url: "icons/2048.png",
      link: "https://duckos-games.pages.dev/2048/"
    },
    {
      title: "paper.io",
      url: "icons/paperio.jpg",
      link: "https://duckos-games.pages.dev/paperio2/"
    },
    {
      title: "Tetris",
      url: "icons/tetris.png",
      link: "https://duckos-games.pages.dev/tetris/"
    },
    {
      title: "Pokemon Emerald (GBA)",
      url: "icons/emerald.jpg",
      link: "https://duckos-games.pages.dev/pokemon/emerald/"
    },
    {
      title: "Pokemon Fire Red (GBA)",
      url: "icons/fire.jpg",
      link: "https://duckos-games.pages.dev/pokemon/fire-red/"
    },
    {
      title: "Pokemon Black (NDS)",
      url: "icons/black.png",
      link: "https://duckos-games.pages.dev/pokemon/black/"
    },
  ]
};

const gallery = document.getElementById('gallery');
const searchInput = document.getElementById('searchInput');

function renderGallery(images) {
  gallery.innerHTML = '';
  images.forEach(image => {
    const imageContainer = document.createElement('a');
    imageContainer.className = 'image-container';
    imageContainer.href = image.link;

    const img = document.createElement('img');
    img.className = 'image';
    img.src = image.url;
    img.alt = image.title;

    const content = document.createElement('div');
    content.className = 'content';

    const title = document.createElement('div');
    title.className = 'image-title';
    title.textContent = image.title;

    content.appendChild(title);
    imageContainer.appendChild(img);
    imageContainer.appendChild(content);
    gallery.appendChild(imageContainer);
  });
}

function filterImages(searchTerm) {
  const filteredImages = config.images.filter(image =>
    image.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  renderGallery(filteredImages);
}
renderGallery(config.images);
searchInput.addEventListener('input', () => {
  filterImages(searchInput.value);
});