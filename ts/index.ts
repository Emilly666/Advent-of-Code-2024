import { part1, part2 } from './src/day11';
import * as cowsay from 'cowsay';

console.log(
  cowsay.say({
    text: part2().toString(),
    e: 'oo',
    T: 'U',
  }),
);
