import { readFileSync } from 'fs';

export function readFile(file: string): string {
  return readFileSync('./ts/inputs/' + file, 'utf-8');
}
