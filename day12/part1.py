from pathlib import Path
from itertools import chain
from collections import deque
from pprint import pprint

directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]

input = [list(x) for x in open(Path(__file__).with_name('input.txt'), "r" ).read().split('\n')]
list = list(chain.from_iterable([[(r, c) for c in range(len(row))] for r, row in enumerate(input)]))
plots = { x:input[x[0]][x[1]] for x in list}
regions = []

while len(list) > 0:
    check = list.pop(0)
    char = plots[check]
    q = deque([check])
    region = { 'positions': [check], 'perimeter': 0 }
    while len(q) > 0:
        p = q.popleft()
        for dir in directions:
            d = tuple(map(lambda i, j: i + j, p, dir))
            if d in plots.keys() and plots[d] == char:
                if d not in region['positions']:
                    region['positions'].append(d)
                    q.append(d)
                    list.remove(d)
            else:
                region['perimeter'] += 1
    regions.append(region)

sum = sum(region['perimeter'] * len(region['positions'])  for region in regions)

pprint(sum)
