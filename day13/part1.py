from pathlib import Path
import re
from pprint import pprint

input = [x.split('\n') for x in open(Path(__file__).with_name('test.txt'), "r" ).read().split('\n\n')]
machines = []

for game in input:
    machine = []
    match = re.search(r"Button A: X\+(\d+), Y\+(\d+)", game[0])
    if match:
        machine.append((int(match.group(1)), int(match.group(2))))
    match = re.search(r"Button B: X\+(\d+), Y\+(\d+)", game[1])
    if match:
        machine.append((int(match.group(1)), int(match.group(2))))
    match = re.search(r"Prize: X=(\d+), Y=(\d+)", game[2])
    if match:
        machine.append((int(match.group(1)), int(match.group(2))))
    machines.append(machine)

cost = 0
for machine in machines:
    possible = []
    for i in range(101):
        for j in range(101):
            if i * machine[0][0] + j * machine[1][0] == machine[2][0] and i * machine[0][1] + j * machine[1][1] == machine[2][1]:
                possible.append(i * 3 + j)
    if len(possible) > 0:
        cost += min(possible)

pprint(cost)