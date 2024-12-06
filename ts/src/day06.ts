import { readFile } from '../utils.js';

const directions = [
  [-1, 0], //up
  [0, 1], //right
  [1, 0], //down
  [0, -1], //left
];

export function part1() {
  const input = readFile('day06.txt').split('\r\n');
  const start = findStart(input);
  const visited = [start];
  const visitedUnique: number[][] = [start.pos];

  let finished = false;
  while (!finished) {
    const next = findNext(input, visited[visited.length - 1]);
    if (next !== undefined) {
      visited.push(next);
      if (!isArrayInArray(visitedUnique, next.pos)) {
        visitedUnique.push(next.pos);
      }
    } else {
      finished = true;
    }
  }

  return visitedUnique.length;
}

export function part2() {
  const input = readFile('day06.txt').split('\r\n');
  const start = findStart(input);
  const visited = [start];
  const visitedUnique: number[][] = [];

  let finished = false;
  while (!finished) {
    const next = findNext(input, visited[visited.length - 1]);
    if (next !== undefined) {
      visited.push(next);
      if (!isArrayInArray(visitedUnique, next.pos)) {
        visitedUnique.push(next.pos);
      }
    } else {
      finished = true;
    }
  }

  let sum = 0;
  for (let i = 0; i < visitedUnique.length; i++) {
    const newInput = input.map((line) => line.slice());
    const lineToChange = newInput[visitedUnique[i][0]].split('');
    lineToChange[visitedUnique[i][1]] = 'X';
    newInput[visitedUnique[i][0]] = lineToChange.join('');
    if (isLoop(newInput, start)) {
      sum++;
    }
    console.log(`sum: ${sum}, i: ${i}`);
  }

  return sum;
}

function findStart(input: string[]) {
  for (let i = 0; i < input.length; i++) {
    const j = input[i].indexOf('^');
    if (j !== -1) {
      return { pos: [i, j], d: 0 };
    }
  }
  return { pos: [0, 0], d: 0 };
}

function findNext(input: string[], { pos, d }: { pos: number[]; d: number }) {
  if (
    !(
      addArray(pos, directions[d])[0] >= 0 &&
      addArray(pos, directions[d])[0] < input[0].length &&
      addArray(pos, directions[d])[1] >= 0 &&
      addArray(pos, directions[d])[1] < input.length
    )
  ) {
    return undefined;
  }
  if (
    ['.', '^'].includes(
      input[pos[0] + directions[d][0]][pos[1] + directions[d][1]],
    )
  ) {
    return { pos: addArray(pos, directions[d]), d };
  } else {
    return { pos, d: (d + 1) % 4 };
  }
}

function addArray(a: number[], b: number[]) {
  return [a[0] + b[0], a[1] + b[1]];
}

function isArrayInArray(arr: number[][], item: number[]) {
  const item_as_string = JSON.stringify(item);

  const contains = arr.some(function (ele) {
    return JSON.stringify(ele) === item_as_string;
  });
  return contains;
}

function isLoop(input: string[], start: { pos: number[]; d: number }) {
  const visited = [start];

  while (true) {
    const next = findNext(input, visited[visited.length - 1]);
    if (next === undefined) {
      return false;
    } else if (visited.some( (v) => v.pos[0] === next.pos[0] && v.pos[1] === next.pos[1] && v.d === next.d,)) {
      return true;
    }
    visited.push(next);
  }
}

