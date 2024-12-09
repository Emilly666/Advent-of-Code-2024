import { readFileSync } from 'fs';

export function readFile(file = 'input.txt'): string {
  return readFileSync('./ts/res/' + file, 'utf-8');
}

export function addArray(a: number[], b: number[]) {
  return [a[0] + b[0], a[1] + b[1]];
}

export function isArrayInArray(arr: any[], item: any) {
  const item_as_string = JSON.stringify(item);

  const contains = arr.some(function (ele) {
    return JSON.stringify(ele) === item_as_string;
  });
  return contains;
}
