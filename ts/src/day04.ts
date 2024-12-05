import { readFile } from '../utils.js';
export function part1() {
  const input = readFile('test.txt');

  const horizontal = input.split('\r\n');

  const vertical = [];
  for (let i = 0; i < horizontal.length; i++) {
    let str = '';
    for (let j = 0; j < horizontal[0].length; j++) {
      str += horizontal[j][i];
    }
    vertical.push(str);
  }

  const diagonallyUp = getAllDiagonals(horizontal);
  const diagonallyDown = getOtherDiagonals(horizontal);

  return diagonallyDown;
}

function getAllDiagonals(horizontal: string[]): string[] {
  const rows = horizontal.length;
  const cols = horizontal[0].length;
  const diagonals: string[] = [];

  // Upper diagonals (including the main diagonal)
  for (let startCol = 3; startCol < cols; startCol++) {
    let str = '';
    for (let k = 0; k <= Math.min(rows - 1, startCol); k++) {
      const x = k;
      const y = startCol - k;
      str += horizontal[x][y];
    }
    diagonals.push(str);
  }

  // Lower diagonals (excluding the main diagonal to avoid repetition)
  for (let startRow = 1; startRow < rows - 3; startRow++) {
    let str = '';
    for (let k = 0; k <= Math.min(rows - startRow - 1, cols - 1); k++) {
      const x = startRow + k;
      const y = cols - 1 - k;
      str += horizontal[x][y];
    }
    diagonals.push(str);
  }

  return diagonals;
}

function getOtherDiagonals(horizontal: string[]): string[] {
  const rows = horizontal.length;
  const cols = horizontal[0].length;
  const diagonals: string[] = [];

  // Start with diagonals beginning from the last column of each row (top half)
  for (let startCol = cols - 1; startCol >= 3; startCol--) {
    let str = '';
    for (let k = 0; k < rows && startCol - k >= 0; k++) {
      const x = k;
      const y = startCol - k;
      str += horizontal[x][y];
    }
    diagonals.push(str);
  }

  // Add diagonals starting from the second row to the bottom-left corner (bottom half)
  for (let startRow = 1; startRow < rows - 3; startRow++) {
    let str = '';
    for (let k = 0; k < cols && startRow + k < rows; k++) {
      const x = startRow + k;
      const y = cols - 1 - k;
      str += horizontal[x][y];
    }
    diagonals.push(str);
  }

  return diagonals;
}
