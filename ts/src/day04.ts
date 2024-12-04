import { readFile } from '../utils.js';

export function part1(){
    const input = readFile('day04.txt');
    let inputs = {
        horizontal: 'd',
        vertical: 'd',
        diagonallyUp: 'd',
        diagonallyDown: 'd',  
    };

    console.log(inputs);
}
