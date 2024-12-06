from pathlib import Path
import functools

file = open(Path(__file__).with_name('input.txt'), "r" )
rules, prints = file.read().split('\n\n')

rules = [list(map(int, x.split('|'))) for x in rules.split('\n')]
prints = [list(map(int, x.split(',')))  for x in prints.split('\n')]

cache = {}

for x, y in rules:
  cache[(x, y)] = -1
  cache[(y, x)] = 1

def cmp(x, y):
   return cache.get((x, y), 0)

def is_ordered(update):
  for i in range(len(update)):
      for j in range(i + 1, len(update)):
        key = (update[i], update[j])
        if key in cache and cache[key] == 1:
            return False
  return True

sum = 0
for update in prints:
  if is_ordered(update): continue
  update.sort(key = functools.cmp_to_key(cmp))
  sum += update[len(update) // 2]

print(sum)