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
    } else {
      tile.classList.add('empty');
    }

    tiles.push(tile);
    puzzleContainer.appendChild(tile);
  }
}

function moveTile(index) {
  const emptyIndex = tiles.findIndex(tile => tile.classList.contains('empty'));
  
  const validMoves = [
    -1, 1, -size, size
  ];

  validMoves.forEach(offset => {
    const targetIndex = index + offset;

    if (targetIndex >= 0 && targetIndex < size * size) {
      const row = Math.floor(targetIndex / size);
      const col = targetIndex % size;
      
      if ((offset === -1 || offset === 1) && Math.floor(index / size) === row) {
        if (targetIndex === emptyIndex) {
          swapTiles(index, emptyIndex);
        }
      }

      if ((offset === -size || offset === size) && Math.floor(index / size) !== row) {
        if (targetIndex === emptyIndex) {
          swapTiles(index, emptyIndex);
        }
      }
    }
  });
}

function swapTiles(index1, index2) {
  [tiles[index1].style.backgroundImage, tiles[index2].style.backgroundImage] = 
  [tiles[index2].style.backgroundImage, tiles[index1].style.backgroundImage];
  
  tiles[index1].classList.toggle('empty');
  tiles[index2].classList.toggle('empty');
}

createPuzzle();
