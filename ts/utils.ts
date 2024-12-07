import { readFileSync } from 'fs';

export function readFile(file = 'input.txt'): string {
  return readFileSync('./ts/res/' + file, 'utf-8');
}
