from pathlib import Path
from pprint import pprint

input = open(Path(__file__).with_name('test.txt'), "r" ).read()
disk = []
fid = 0

for i, char in enumerate(input):
    if i % 2 == 0:
        disk.append((fid, char))
        fid += 1
    else:
        disk.append(('.', char))

pprint(disk)

for i in range(len(disk) - 1, 0, -1):
    if  not disk[i][0] == '.':
        