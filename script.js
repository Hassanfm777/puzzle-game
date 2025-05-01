let size = 4;
let tiles = [];
const imageSrc = 'assets/image.jpg';
const imageWidth = 400;
const imageHeight = 400;

function startGame(puzzleSize) {
  size = puzzleSize;
  tiles = [];
  document.getElementById('puzzle-container').innerHTML = '';
  createPuzzle();
}

function createPuzzle() {
  const tileWidth = imageWidth / size;
  const tileHeight = imageHeight / size;

  document.getElementById('puzzle-container').style.gridTemplateColumns = `repeat(${size}, ${tileWidth}px)`;

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
    document.getElementById('puzzle-container').appendChild(tile);
  }

  shufflePuzzle();
}

function shufflePuzzle() {
  let order = Array.from(Array(size * size).keys());
  order = shuffle(order);

  tiles.forEach((tile, index) => {
    tile.setAttribute('data-index', order[index]);
    const rowIndex = Math.floor(order[index] / size);
    const colIndex = order[index] % size;
    tile.style.backgroundPosition = `-${colIndex * (imageWidth / size)}px -${rowIndex * (imageHeight / size)}px`;
    tile.style.gridRow = rowIndex + 1;
    tile.style.gridColumn = colIndex + 1;
    if (index === size * size - 1) tile.classList.add('empty');
  });
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function moveTile(index) {
  const emptyIndex = tiles.findIndex(tile => tile.classList.contains('empty'));
  const validMoves = [-1, 1, -size, size];

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
  const tempBg = tiles[index1].style.backgroundImage;
  const tempPos = tiles[index1].style.backgroundPosition;

  tiles[index1].style.backgroundImage = tiles[index2].style.backgroundImage;
  tiles[index1].style.backgroundPosition = tiles[index2].style.backgroundPosition;

  tiles[index2].style.backgroundImage = tempBg;
  tiles[index2].style.backgroundPosition = tempPos;

  tiles[index1].classList.toggle('empty');
  tiles[index2].classList.toggle('empty');

  const tempIndex = tiles[index1].getAttribute('data-index');
  tiles[index1].setAttribute('data-index', tiles[index2].getAttribute('data-index'));
  tiles[index2].setAttribute('data-index', tempIndex);
}
