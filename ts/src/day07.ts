import { readFile } from '../utils.js';

export function part1() {
  const input = readFile('input.txt').split('\r\n');
  const inputTable: string[][] = [];
  for (let i = 0; i < input.length; i++) {
    inputTable.push(input[i].split(': '));
    const t = inputTable[i].pop()?.split(' ') ?? [];
    t.forEach((element) => {
      inputTable[i].push(element);
    });
  }
  const inputNumbers: number[][] = [];
  for (let i = 0; i < inputTable.length; i++) {
    const row: number[] = [];
    for (let j = 0; j < inputTable[i].length; j++) {
      row.push(Number(inputTable[i][j]));
    }
    inputNumbers.push(row);
  }

  let sum = 0;
  inputNumbers.forEach((element) => {
    if (row(element[0], element.slice(1))) {
      sum += element[0];
    }
  });

  return sum;
}

export function part2() {
  const input = readFile('input.txt').split('\r\n');
  const inputTable: string[][] = [];
  for (let i = 0; i < input.length; i++) {
    inputTable.push(input[i].split(': '));
    const t = inputTable[i].pop()?.split(' ') ?? [];
    t.forEach((element) => {
      inputTable[i].push(element);
    });
  }
  const inputNumbers: number[][] = [];
  for (let i = 0; i < inputTable.length; i++) {
    const row: number[] = [];
    for (let j = 0; j < inputTable[i].length; j++) {
      row.push(Number(inputTable[i][j]));
    }
    inputNumbers.push(row);
  }

  let sum = 0;
  inputNumbers.forEach((element) => {
    if (row2(element[0], element.slice(1))) {
      sum += element[0];
    }
  });

  return sum;
}

function row(target: number, numbers: number[]): boolean {
  if (numbers.length === 1) {
    return target === numbers[0];
  }
  if (
    target % numbers[numbers.length - 1] === 0 &&
    row(
      target / numbers[numbers.length - 1],
      numbers.slice(0, numbers.length - 1),
    )
  ) {
    return true;
  }
  if (
    target > numbers[numbers.length - 1] &&
    row(
      target - numbers[numbers.length - 1],
      numbers.slice(0, numbers.length - 1),
    )
  ) {
    return true;
  }
  return false;
}

function row2(target: number, numbers: number[]): boolean {
  if (numbers.length === 1) {
    return target === numbers[0];
  }
  if (
    target % numbers[numbers.length - 1] === 0 &&
    row2(
      target / numbers[numbers.length - 1],
      numbers.slice(0, numbers.length - 1),
    )
  ) {
    return true;
  }
  if (
    target > numbers[numbers.length - 1] &&
    row2(
      target - numbers[numbers.length - 1],
      numbers.slice(0, numbers.length - 1),
    )
  ) {
    return true;
  }
  if (
    target.toString().length > numbers[numbers.length - 1].toString().length &&
    target.toString().endsWith(numbers[numbers.length - 1].toString()) &&
    row2(
      Number(
        target
          .toString()
          .slice(
            0,
            target.toString().length -
              numbers[numbers.length - 1].toString().length,
          ),
      ),
      numbers.slice(0, numbers.length - 1),
    )
  ) {
    return true;
  }
  return false;
}
