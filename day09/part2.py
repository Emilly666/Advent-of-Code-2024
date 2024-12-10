from pathlib import Path

input = open(Path(__file__).with_name('input.txt'), "r" ).read()
files = {}
blanks = []
fid = 0
pos = 0

for i, char in enumerate(input):
    if i % 2 == 0:
        files[fid] = (pos, int(char))
        fid += 1
    else:
        if char != '0':
            blanks.append((pos, int(char)))
    pos += int(char)

while fid > 0:
    fid -= 1
    pos, size = files[fid]
    for i, (start, length) in enumerate(blanks):
        if start >= pos:
            blanks = blanks[:i]
            break
        if size <= length:
            files[fid] = (start, size)
            if size == length:
                blanks.pop(i)
            else:
                blanks[i] = (start + size, length - size)
            break

print(sum([ sum([ fid * x for x in range(files[fid][0], files[fid][0] + files[fid][1]) ])  for fid in files]))
        