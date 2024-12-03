from pathlib import Path
import re

locations1 = []
locations2 = []
distance = 0

file = open(Path(__file__).with_name('input.txt'), "r" )
lines = file.read().split('\n')

for line in lines:
    match = re.search(r"(\d+)\s+(\d+)", line)
    if match:
        locations1.append(match.group(1))
        locations2.append(match.group(2))

locations1.sort()
locations2.sort()

for i in range( 0, len(locations1)):
    distance += abs(int(locations1[i]) - int(locations2[i]))
    print(locations1[i],' ' ,locations2[i],' ', abs(int(locations1[i]) - int(locations2[i])))

print(distance)
