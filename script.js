const puzzleContainer = document.getElementById('puzzle-container');
const size = 4;
let tiles = [];

function createPuzzle() {
  for (let i = 0; i < size * size; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.textContent = i === size * size - 1 ? '' : i + 1;
    tile.addEventListener('click', () => moveTile(i));
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
      tiles[index].classList.toggle('empty');
      tiles[emptyIndex].classList.toggle('empty');
    }
  });
}

createPuzzle();
