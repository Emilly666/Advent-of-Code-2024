from pathlib import Path
from itertools import chain
from collections import deque
from pprint import pprint

directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]
diagonalDirections = [(1, 1), (1, -1), (1, -1), (-1, -1)]

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
    regions.append(region)

def sides(region):
    edges = {}
    for p in region['positions']:
        for dir in directions:
            d = tuple(map(lambda i, j: i + j, p, dir))
            if d in region['positions']: continue
            e = ((p[0] + d[0]) / 2, (p[1] + d[1]) / 2)
            edges[e] = (e[0] - p[0], e[1] - p[1])
    seen = set()
    side_count = 0
    for edge, direction in edges.items():
        if edge in seen: continue
        seen.add(edge)
        side_count += 1
        er, ec = edge
        if er % 1 == 0:
            for dr in [-1, 1]:
                cr = er + dr
                while edges.get((cr, ec)) == direction:
                    seen.add((cr, ec))
                    cr += dr
        else:
            for dc in [-1, 1]:
                cc = ec + dc
                while edges.get((er, cc)) == direction:
                    seen.add((er, cc))
                    cc += dc
    return side_count

for region in regions:
    
    region['perimeter'] = sides(region)

sum = sum(region['perimeter'] * len(region['positions'])  for region in regions)

pprint(sum)
