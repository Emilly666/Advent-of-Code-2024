import { readFile, isArrayInArray } from '../utils.js';

export function part1() {
  const input = readFile('input.txt').split('\r\n');
  const sizeR = input[0].length;
  const sizeC = input.length;
  const antennas = new Map<string, number[][]>();
  const antinodes: number[][] = [];

  input.forEach((element, i) => {
    element.split('').forEach((letter, j) => {
      if (letter !== '.') {
        const t = antennas.get(letter);
        const positions = antennas.get(letter) ?? [];
        positions.push([i, j]);
        antennas.set(letter, positions);
      }
    });
  });

  antennas.forEach((value: number[][], key: string) => {
    value.flatMap((positionB, i) =>
      value.slice(i + 1).map((positionA) => {
        if (
          !isArrayInArray(antinodes, [
            positionB[0] + (positionB[0] - positionA[0]),
            positionB[1] + (positionB[1] - positionA[1]),
          ]) &&
          positionB[0] + (positionB[0] - positionA[0]) >= 0 &&
          positionB[0] + (positionB[0] - positionA[0]) < sizeR &&
          positionB[1] + (positionB[1] - positionA[1]) >= 0 &&
          positionB[1] + (positionB[1] - positionA[1]) < sizeC
        ) {
          console.log(
            `${positionB[0] + (positionB[0] - positionA[0])}, ${positionB[1] + (positionB[1] - positionA[1])}`,
          );
          antinodes.push([
            positionB[0] + (positionB[0] - positionA[0]),
            positionB[1] + (positionB[1] - positionA[1]),
          ]);
        }

        if (
          !isArrayInArray(antinodes, [
            positionA[0] - (positionB[0] - positionA[0]),
            positionA[1] - (positionB[1] - positionA[1]),
          ]) &&
          positionA[0] - (positionB[0] - positionA[0]) >= 0 &&
          positionA[0] - (positionB[0] - positionA[0]) < sizeR &&
          positionA[1] - (positionB[1] - positionA[1]) >= 0 &&
          positionA[1] - (positionB[1] - positionA[1]) < sizeC
        ) {
          console.log(
            `${positionA[0] - (positionB[0] - positionA[0])}, ${positionA[1] - (positionB[1] - positionA[1])}`,
          );
          antinodes.push([
            positionA[0] - (positionB[0] - positionA[0]),
            positionA[1] - (positionB[1] - positionA[1]),
          ]);
        }
      }),
    );
  });

  return antinodes.length;
}

export function part2() {
  const input = readFile('input.txt').split('\r\n');
  const sizeR = input[0].length;
  const sizeC = input.length;
  const antennas = new Map<string, number[][]>();
  const antinodes: number[][] = [];

  input.forEach((element, i) => {
    element.split('').forEach((letter, j) => {
      if (letter !== '.') {
        const t = antennas.get(letter);
        const positions = antennas.get(letter) ?? [];
        positions.push([i, j]);
        antennas.set(letter, positions);
      }
    });
  });

  antennas.forEach((value: number[][], key: string) => {
    value.flatMap((positionB, i) =>
      value.slice(i + 1).map((positionA) => {
        const t = findAntinodes(positionB, positionA, sizeC, sizeR);
        t.forEach((element) => {
          if (!isArrayInArray(antinodes, element)) {
            antinodes.push(element);
          }
        });
      }),
    );
  });

  return antinodes.length;
}

function findAntinodes(
  positionA: number[],
  positionB: number[],
  sizeC: number,
  sizeR: number,
): number[][] {
  const ret: number[][] = [positionA];
  while (true) {
    const t = [
      ret[ret.length - 1][0] + (positionB[0] - positionA[0]),
      ret[ret.length - 1][1] + (positionB[1] - positionA[1]),
    ];
    if (
      !isArrayInArray(ret, t) &&
      t[0] >= 0 &&
      t[0] < sizeR &&
      t[1] >= 0 &&
      t[1] < sizeC
    ) {
      ret.push(t);
    } else {
      break;
    }
  }
  ret.reverse();
  while (true) {
    const t = [
      ret[ret.length - 1][0] - (positionB[0] - positionA[0]),
      ret[ret.length - 1][1] - (positionB[1] - positionA[1]),
    ];
    if (
      !isArrayInArray(ret, t) &&
      t[0] >= 0 &&
      t[0] < sizeR &&
      t[1] >= 0 &&
      t[1] < sizeC
    ) {
      ret.push(t);
    } else {
      break;
    }
  }
  return ret;
}
