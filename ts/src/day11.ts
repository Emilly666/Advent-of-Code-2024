import { readFile } from '../utils.js';

export function part1() {
  const input = readFile('input.txt').trim().split(' ');
  for (let i = 0; i < 25; i++) {
    for (let p = 0; p < input.length; p++) {
      const length = String(input[p]).length;
      const value = input[p];
      if (input[p] === '0') input[p] = '1';
      else if (length % 2 == 0) {
        input[p] = String(Number(value.slice(0, length / 2)));
        p++;
        input.splice(p, 0, String(Number(value.slice(length / 2))));
      } else input[p] = String(Number(value) * 2024);
    }
  }

  return input.length;
}

export function part2() {
  const input = readFile('input.txt').trim().split(' ');
  let sum = 0;
  input.forEach((stone) => {
    sum += count(Number(stone), 75);
  });

  return sum;
}

function count(
  stone: number,
  steps: number,
  cache: Map<string, number> = new Map(),
): number {
  if (cache.has(String([stone, steps]))) {
    return cache.get(String([stone, steps])) ?? 0;
  }
  const s = String(stone);
  const len = s.length;
  if (steps === 0) {
    cache.set(String([stone, steps]), 1);
    return 1;
  } else if (stone === 0) {
    const ret = count(1, steps - 1, cache);
    cache.set(String([stone, steps]), ret);
    return ret;
  } else if (len % 2 === 0) {
    const ret =
      count(Number(s.slice(0, len / 2)), steps - 1, cache) +
      count(Number(s.slice(len / 2)), steps - 1, cache);
    cache.set(String([stone, steps]), ret);
    return ret;
  } else {
    const ret = count(stone * 2024, steps - 1, cache);
    cache.set(String([stone, steps]), ret);
    return ret;
  }
}
