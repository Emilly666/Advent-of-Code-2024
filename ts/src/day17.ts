import { exit } from 'node:process';
import { readFile } from '../utils.js';

const registers = {
  A: 0,
  B: 0,
  C: 0,
};

export function part1() {
  const input = readFile('input.txt').split('\r\n\r\n');
  const top = input[0].split('\r\n');
  registers.A = Number(top[0].split(': ')[1]);
  registers.B = Number(top[1].split(': ')[1]);
  registers.C = Number(top[2].split(': ')[1]);
  const program = input[1]
    .split(': ')[1]
    .split(',')
    .map((item) => Number(item));
  const out: number[] = [];
  let pointer = 0;
  while (pointer < program.length) {
    let inc = true;
    const comboOperand = getCombo(program[pointer + 1]);
    const literalOperand = program[pointer + 1];
    switch (program[pointer]) {
      case 0: {
        //adv
        registers.A = Math.trunc(registers.A / Math.pow(2, comboOperand));
        break;
      }
      case 1: {
        //bxl
        registers.B = registers.B ^ literalOperand;
        break;
      }
      case 2: {
        //bst
        registers.B = comboOperand % 8;
        break;
      }
      case 3: {
        //jnz
        if (registers.A != 0) {
          pointer = literalOperand;
          inc = false;
        }
        break;
      }
      case 4: {
        //bxc
        registers.B = registers.B ^ registers.C;
        break;
      }
      case 5: {
        //out
        out.push(comboOperand % 8);
        break;
      }
      case 6: {
        //bdv
        registers.B = Math.trunc(registers.A / Math.pow(2, comboOperand));
        break;
      }
      case 7: {
        //cdv
        registers.C = Math.trunc(registers.A / Math.pow(2, comboOperand));
        break;
      }
    }
    if (inc) {
      pointer += 2;
    }
  }

  return out.toString();
}

export function part2() {
  return 'moo';
}

function getCombo(n: number) {
  if (n >= 0 && n <= 3) {
    return n;
  } else if (n == 4) {
    return registers.A;
  } else if (n == 5) {
    return registers.B;
  } else if (n == 6) {
    return registers.C;
  } else {
    exit(1);
  }
}
