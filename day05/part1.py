from pathlib import Path

file = open(Path(__file__).with_name('input.txt'), "r" )
rules, prints = file.read().split('\n\n')

rules = [x.split('|') for x in rules.split('\n')]
prints = [x.split(',') for x in prints.split('\n')]

rulesX = {}
for i in range(0, len(rules)):
  if rules[i][0] in rulesX.keys():
    rulesX[rules[i][0]] += [rules[i][1]]
  else:
    rulesX[rules[i][0]] = [rules[i][1]]

good = []
for num, order in enumerate(prints):
  printGood = True
  for i in range(0, len(order)):
    if order[i] in rulesX.keys():
      for j in range(0, i):
        if order[j] in rulesX[order[i]]:
          printGood = False
  if printGood:
    good.append(num)

sum = 0
for i in good:
  sum += int(prints[i][(len(prints[i]) - 1)//2])

print(sum)