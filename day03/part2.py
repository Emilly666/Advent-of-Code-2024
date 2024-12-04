from pathlib import Path
import re

file = open(Path(__file__).with_name('input.txt'), "r" )
line = file.read().replace('\n','')
result = 0

instructions = re.findall(r"(?:mul\(\d{1,3},\d{1,3}\))|(?:do\(\))|(?:don't\(\))", line)

do = True
for instruction in instructions:
    if do and instruction[:3] == 'mul':
        mul = re.search(r"mul\((\d{1,3}),(\d{1,3})\)", instruction)
        result += int(mul.group(1)) * int(mul.group(2))
    elif do and instruction[:3] == 'don': 
        do = False
    elif not do and instruction[:3] == 'do(':
        do = True
    else:
        print(instruction[:3])

print(result)
