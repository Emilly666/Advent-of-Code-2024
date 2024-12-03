from pathlib import Path
import re

file = open(Path(__file__).with_name('input.txt'), "r" )
line = file.read().replace('\n','')
result = 0

matches = re.findall(r"mul\(\d{1,3},\d{1,3}\)", line)

for match in matches:
    mul = re.search(r"mul\((\d{1,3}),(\d{1,3})\)", match)
    result += int(mul.group(1)) * int(mul.group(2))

print(result)
