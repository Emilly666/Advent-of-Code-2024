import { readFile } from '../utils.js';

export function part1() {
  const input = readFile('day04.txt');
  const horizontal = input.split('\r\n');

  const vertical = [];
  const rowLength = horizontal[0].length;

  //vertical
  for (let i = 0; i < rowLength; i++) {
    let str = '';
    for (let j = 0; j < horizontal.length; j++) {
      str += horizontal[j][i];
    }
    vertical.push(str);
  }

  const diagonallyUp = getAllDiagonals(horizontal);
  const diagonallyDown = getOtherDiagonals(horizontal);

  const count =
    countXMAS(horizontal) +
    countXMAS(vertical) +
    countXMAS(diagonallyUp) +
    countXMAS(diagonallyDown);

  return count;
}

export function part2() {
  const input = readFile('day04.txt').split('\r\n');
  let count = 0;
  for (let i = 1; i < input[0].length - 1; i++) {
    for (let j = 1; j < input.length - 1; j++) {
      if (input[i][j] !== 'A') {
        continue;
      }
      if (
        (input[i - 1][j + 1] === 'M' && input[i + 1][j - 1] === 'S') ||
        (input[i - 1][j + 1] === 'S' && input[i + 1][j - 1] === 'M')
      ) {
        if (
          (input[i + 1][j + 1] === 'M' && input[i - 1][j - 1] === 'S') ||
          (input[i + 1][j + 1] === 'S' && input[i - 1][j - 1] === 'M')
        ) {
          count++;
        }
      }
    }
  }

  return count;
}

function getAllDiagonals(horizontal: string[]) {
  const rows = horizontal.length;
  const cols = horizontal[0].length;
  const diagonals = [];

  // Upper diagonals (including main diagonal)
  for (let startCol = 0; startCol < cols; startCol++) {
    let str = '';
    for (let k = 0; k < rows && startCol + k < cols; k++) {
      const x = k;
      const y = startCol + k;
      str += horizontal[x][y];
    }
    if (str.length >= 4) diagonals.push(str);
  }

  // Lower diagonals
  for (let startRow = 1; startRow < rows; startRow++) {
    let str = '';
    for (let k = 0; k < cols && startRow + k < rows; k++) {
      const x = startRow + k;
      const y = k;
      str += horizontal[x][y];
    }
    if (str.length >= 4) diagonals.push(str);
  }

  return diagonals;
}

function getOtherDiagonals(horizontal: string[]) {
  const rows = horizontal.length;
  const cols = horizontal[0].length;
  const diagonals = [];

  // Upper diagonals (including main diagonal)
  for (let startCol = cols - 1; startCol >= 0; startCol--) {
    let str = '';
    for (let k = 0; k < rows && startCol - k >= 0; k++) {
      const x = k;
      const y = startCol - k;
      str += horizontal[x][y];
    }
    if (str.length >= 4) diagonals.push(str);
  }

  // Lower diagonals
  for (let startRow = 1; startRow < rows; startRow++) {
    let str = '';
    for (let k = 0; k < cols && startRow + k < rows; k++) {
      const x = startRow + k;
      const y = cols - 1 - k;
      str += horizontal[x][y];
    }
    if (str.length >= 4) diagonals.push(str);
  }

  return diagonals;
}

function countXMAS(strArray: string[]) {
  const re1 = /XMAS/g;
  const re2 = /SAMX/g;
  let sum = 0;

  for (const str of strArray) {
    sum += (str.match(re1) || []).length;
    sum += (str.match(re2) || []).length;
  }
  return sum;
}
