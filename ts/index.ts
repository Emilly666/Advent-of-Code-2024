import { part1, part2 } from './src/day10';
import * as cowsay from 'cowsay';

console.log(
  cowsay.say({
    text: part2().toString(),
    e: 'oo',
    T: 'U',
  }),
);
