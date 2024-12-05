import * as day04 from './src/day04';
import * as cowsay from 'cowsay';

console.log(
  cowsay.say({
    text: day04.part1().toString(),
    e: 'oo',
    T: 'U',
  }),
);
