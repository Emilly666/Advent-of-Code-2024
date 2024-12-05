import * as day04 from './src/day04';
import * as cowsay from 'cowsay';

console.log(
  cowsay.say({
    text: `Part 1: ${day04.part1().toString()}!\nPart 2: ${day04.part2().toString()}!`,
    e: 'oo',
    T: 'U',
  }),
);
