from pathlib import Path
import re
from pprint import pprint

input = open(Path(__file__).with_name('input.txt'), "r" ).read().split('\n\n')
machines = []

for game in input:
    match = re.search(r"Button A: X\+(\d+), Y\+(\d+)\nButton B: X\+(\d+), Y\+(\d+)\nPrize: X=(\d+), Y=(\d+)", game)
    if match:
        machines.append([(int(match.group(1)), int(match.group(2))), (int(match.group(3)), int(match.group(4))), (int(match.group(5)) + 10000000000000, int(match.group(6)) + 10000000000000)])


cost = 0
for (ax, ay), (bx, by), (px, py) in machines:
    m = (px * by - py * bx) / (ax * by - ay * bx)
    n = (px - ax * m) / bx
    if m % 1 == n % 1 == 0:
        cost += m * 3 + n

pprint(cost)