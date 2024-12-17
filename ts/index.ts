import { part1, part2 } from './src/day17';
import * as cowsay from 'cowsay';

console.log(
  cowsay.say({
    text: part1().toString(),
    e: 'oo',
    T: 'U',
  }),
);
