from pathlib import Path
from pprint import pprint
from collections import deque

input = [list(x) for x in open(Path(__file__).with_name('test.txt'), "r" ).read().split('\n')]

r, c = [[(r, c) for c in range(len(row)) if input[r][c] == 'S'] for r, row in enumerate(input) if 'S' in input[r]][0][0]

q = deque({'r': r, 'c': c, 'direction': (0, 1), 'steps': 0, 'turns': 0})

while True:
    q.popleft

pprint(q)