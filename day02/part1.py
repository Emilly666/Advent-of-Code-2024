from pathlib import Path
from pprint import pprint
import re

reports = []
safeCount = 0

file = open(Path(__file__).with_name('input.txt'), "r" )
lines = file.read().split('\n')

for line in lines:
    match = re.findall(r"(\d+)", line)
    if match:
        reports.append([int(level) for level in match])

for report in reports:
    asc, desc, less = True, True, True
    for i in range(1, len(report)):
        if abs(report[i] - report[i - 1]) == 0 or abs(report[i] - report[i - 1]) > 3:
            less = False
            continue
        if desc and report[i] < report[i - 1]:
            desc = False
        if asc and report[i] > report[i - 1]:
            asc = False
    if (not asc and not desc) or not less:
        continue
    else:
        safeCount += 1

pprint(safeCount)