let size = 100;
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
  const tileWidth = imageWidth / Math.sqrt(size);
  const tileHeight = imageHeight / Math.sqrt(size);

  document.getElementById('puzzle-container').style.gridTemplateColumns = `repeat(${Math.sqrt(size)}, ${tileWidth}px)`;
  document.getElementById('puzzle-container').style.gridTemplateRows = `repeat(${Math.sqrt(size)}, ${tileHeight}px)`;

  for (let i = 0; i < size; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    
    if (i !== size - 1) {
      const row = Math.floor(i / Math.sqrt(size));
      const col = i % Math.sqrt(size);
      tile.style.backgroundImage = `url(${imageSrc})`;
      tile.style.backgroundSize = `${imageWidth}px ${imageHeight}px`;
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
  let order = Array.from(Array(size).keys());
  order = shuffle(order);

  tiles.forEach((tile, index) => {
    tile.setAttribute('data-index', order[index]);
    const rowIndex = Math.floor(order[index] / Math.sqrt(size));
    const colIndex = order[index] % Math.sqrt(size);
    tile.style.backgroundPosition = `-${colIndex * (imageWidth / Math.sqrt(size))}px -${rowIndex * (imageHeight / Math.sqrt(size))}px`;
    tile.style.gridRow = rowIndex + 1;
    tile.style.gridColumn = colIndex + 1;
    if (index === size - 1) tile.classList.add('empty');
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
  const validMoves = [-1, 1, -Math.sqrt(size), Math.sqrt(size)];

  validMoves.forEach(offset => {
    const targetIndex = index + offset;

    if (targetIndex >= 0 && targetIndex < size) {
      const row = Math.floor(targetIndex / Math.sqrt(size));
      const col = targetIndex % Math.sqrt(size);

      if ((offset === -1 || offset === 1) && Math.floor(index / Math.sqrt(size)) === row) {
        if (targetIndex === emptyIndex) {
          swapTiles(index, emptyIndex);
        }
      }

      if ((offset === -Math.sqrt(size) || offset === Math.sqrt(size)) && Math.floor(index / Math.sqrt(size)) !== row) {
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
