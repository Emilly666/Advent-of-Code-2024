from pathlib import Path

input = open(Path(__file__).with_name('input.txt'), "r" ).read()
disk = []
fid = 0

for i, char in enumerate(input):
    if i % 2 == 0:
        for _ in range(0, int(char)):
            disk.append(str(fid))
        fid += 1
    else:
        for _ in range(0, int(char)):
            disk.append('.')

for i in range(len(disk) - 1, 0, -1):
    if  not disk[i] == '.':
        try:
            disk[disk.index('.')] = disk[i]
        except:
            break
    disk.pop()
        
print(sum([ int(char) * i for i, char in enumerate(disk)]))