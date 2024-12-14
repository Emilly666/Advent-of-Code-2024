from pathlib import Path
import re

input = open(Path(__file__).with_name('input.txt'), "r" ).read().split('\n')

width = 101
height = 103

q1 = q2 = q3 =  q4 = 0

for robot in input:
    px, py, vx, vy = map(int, re.search(r"p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)", robot).groups())

    fx = (px + 100 * vx) % width
    fy = (py + 100 * vy) % height

    if fx < width // 2 and fy < height // 2: q1 += 1
    if fx > width // 2 and fy < height // 2: q2 += 1
    if fx > width // 2 and fy > height // 2: q3 += 1
    if fx < width // 2 and fy > height // 2: q4 += 1

print(q1 * q2 * q3 * q4)
