import { readFile, isArrayInArray } from '../utils.js';

export function part1() {
  const input = readFile('input.txt').split('\r\n');
  const sizeR = input[0].length;
  const sizeC = input.length;
  const grid: number[][] = [];
  const heads: number[][] = [];
  let sum = 0;
  input.forEach((line, i) => {
    const temp = line.split('').map(Number);
    temp.forEach((value, j) => {
      if (value === 0) {
        heads.push([i, j, 0]);
      }
    });
    grid.push(temp);
  });

  heads.forEach((head) => {
    const check = [head];
    const peaks: number[][] = [];
    while (check.length > 0) {
      const checking = check.pop() ?? [];
      const positions = possiblePOsitions(checking, sizeR, sizeC);
      if (
        checking[2] === 9 &&
        !isArrayInArray(peaks, [checking[0], checking[1]])
      ) {
        peaks.push([checking[0], checking[1]]);
      }
      positions.forEach((position) => {
        if (checking[2] === grid[position[0]][position[1]] - 1) {
          check.push([position[0], position[1], checking[2] + 1]);
        }
      });
    }
    sum += peaks.length;
  });
  return sum;
}

export function part2() {
  const input = readFile('input.txt').split('\r\n');
  const sizeR = input[0].length;
  const sizeC = input.length;
  const grid: number[][] = [];
  const heads: number[][] = [];
  let sum = 0;
  input.forEach((line, i) => {
    const temp = line.split('').map(Number);
    temp.forEach((value, j) => {
      if (value === 0) {
        heads.push([i, j, 0]);
      }
    });
    grid.push(temp);
  });

  heads.forEach((head) => {
    const check = [head];
    while (check.length > 0) {
      const checking = check.pop() ?? [];
      const positions = possiblePOsitions(checking, sizeR, sizeC);
      if (checking[2] === 9) {
        sum++;
      } else {
        positions.forEach((position) => {
          if (checking[2] === grid[position[0]][position[1]] - 1) {
            check.push([position[0], position[1], checking[2] + 1]);
          }
        });
      }
    }
  });
  return sum;
}

function possiblePOsitions(pos: number[], sizeR: number, sizeC: number): number[][] {
  const ret = [];
  if (pos[0] + 1 < sizeR) {
    ret.push([pos[0] + 1, pos[1]]);
  }
  if (pos[0] > 0) {
    ret.push([pos[0] - 1, pos[1]]);
  }
  if (pos[1] + 1 < sizeC) {
    ret.push([pos[0], pos[1] + 1]);
  }
  if (pos[1] > 0) {
    ret.push([pos[0], pos[1] - 1]);
  }
  return ret;
}
