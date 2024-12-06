import { part1, part2 } from './src/day06';
import * as cowsay from 'cowsay';

console.log(
  cowsay.say({
    text: `Part 1: ${part1().toString()}!\nPart 2: ${part2().toString()}!`,
    e: 'oo',
    T: 'U',
  }),
);
