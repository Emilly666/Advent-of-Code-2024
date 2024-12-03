from pathlib import Path
from pprint import pprint
import re

reports = []
notSafe = []
safeCount = 0

file = open(Path(__file__).with_name('input.txt'), "r" )
lines = file.read().split('\n')

for line in lines:
    match = re.findall(r"(\d+)", line)
    if match:
        reports.append([int(level) for level in match])

def checkSafety(report):
    asc, desc, less = True, True, True
    for i in range(1, len(report)):
        if abs(report[i] - report[i - 1]) == 0 or abs(report[i] - report[i - 1]) > 3:
            less = False
            continue
        if desc and report[i] < report[i - 1]:
            desc = False
        if asc and report[i] > report[i - 1]:
            asc = False
    return not ((not asc and not desc) or not less)

for report in reports:
    if not checkSafety(report):
        notSafe.append(report)
    else:
        safeCount += 1

for report in notSafe:
    safe = False
    for i in range(0, len(report)):
        if checkSafety(report[: i] + report[i + 1 :]):
            safe = True
            continue
    if safe:
        safeCount += 1

pprint(safeCount)