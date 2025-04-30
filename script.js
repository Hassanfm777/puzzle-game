const puzzleContainer = document.getElementById('puzzle-container');
const size = 4;
let tiles = [];
const imageSrc = 'assets/image.jpg';

function createPuzzle() {
  const imageWidth = 400;
  const imageHeight = 400;
  const tileWidth = imageWidth / size;
  const tileHeight = imageHeight / size;

  for (let i = 0; i < size * size; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');

    if (i !== size * size - 1) {
      const row = Math.floor(i / size);
      const col = i % size;
      tile.style.backgroundImage = `url(${imageSrc})`;
      tile.style.backgroundPosition = `-${col * tileWidth}px -${row * tileHeight}px`;
      tile.setAttribute('data-index', i);
      tile.addEventListener('click', () => moveTile(i));
    }

    tiles.push(tile);
    puzzleContainer.appendChild(tile);
  }
}

function moveTile(index) {
  const emptyIndex = tiles.findIndex(tile => tile.textContent === '');
  const validMoves = [
    -1, 1, -size, size
  ];

  validMoves.forEach(offset => {
    const targetIndex = index + offset;
    if (targetIndex === emptyIndex) {
      [tiles[index].textContent, tiles[emptyIndex].textContent] = [tiles[emptyIndex].textContent, tiles[index].textContent];
      [tiles[index].style.backgroundImage, tiles[emptyIndex].style.backgroundImage] = 
      [tiles[emptyIndex].style.backgroundImage, tiles[index].style.backgroundImage];

      tiles[index].classList.toggle('empty');
      tiles[emptyIndex].classList.toggle('empty');
    }
  });
}

createPuzzle();
