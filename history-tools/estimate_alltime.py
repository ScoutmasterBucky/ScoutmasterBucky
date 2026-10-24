"""Estimate the all-time merit badge ranking as of 2025.

National counts stop after 2020, but each badge's rank is published every year
and so is (roughly) the total number of merit badges earned. In years with full
counts, the share of all badges earned at each rank position is very steady, so
    estimated count = that year's total x the usual share for the badge's rank.
Adding 2021-2025 estimates to each badge's official lifetime total through 2020
gives the 2025 all-time order. A simulation varies the yearly totals, the
rank-share curve and each estimate to show how settled each place is.

usage: python history-tools/estimate_alltime.py history-tools/sources
Writes sources/alltime-2025.json and prints the table.
"""
import json
import os
import random
import re
import statistics
import sys

src = sys.argv[1]
wb = json.load(open(os.path.join(src, 'workbook.json'), encoding='utf-8'))
official = json.load(open(os.path.join(src, 'official.json'), encoding='utf-8'))
squash = lambda s: re.sub(r'[^a-z0-9]', '', s.lower().replace('&', 'and').replace('*', ''))
num = lambda v: isinstance(v, (int, float)) and not isinstance(v, bool)

# Merit badges earned each year (Report to the Nation / annual report). 2021 was
# not published; it sits between 2020 (1.1M) and 2022 (1.3M).
TOTALS = {2021: (1.2e6, 1.1e6, 1.3e6), 2022: (1.3e6, 1.3e6, 1.4e6), 2023: (1314421, 1314421, 1314421),
          2024: (1.3e6, 1.3e6, 1.4e6), 2025: (1.3e6, 1.25e6, 1.35e6)}

hc = wb['Historical Count']
header = hc[0]
year_col = {y: i for i, y in enumerate(header) if isinstance(y, int) and 1900 < y < 2100}
rows = []
for r in hc[1:]:
    if not r or not isinstance(r[0], str) or not r[0].strip() or squash(r[0]) == 'unclassified':
        continue
    if not num(r[-1]):
        continue
    rows.append({'name': r[0].strip().replace('*', ''), 'parts': [squash(p) for p in r[0].split('/')],
                 'thru2020': int(r[-1]), 'row': r})

# Share of the year's total at each rank, from the last full normal years
curves = []
for y in (2017, 2018, 2019):
    counts = sorted((r['row'][year_col[y]] for r in rows if num(r['row'][year_col[y]]) and r['row'][year_col[y]] > 0),
                    reverse=True)
    total = sum(counts)
    curves.append([c / total for c in counts])


def share(curve, rank, of):
    # Stretch the curve to the number of badges ranked that year
    pos = (rank - 1) / max(of - 1, 1) * (len(curve) - 1)
    lo = int(pos)
    hi = min(lo + 1, len(curve) - 1)
    return curve[lo] + (curve[hi] - curve[lo]) * (pos - lo)


# Each row's official rank in 2021-2025, matched by name (renamed badges too)
ALIASES = {'americanindiancultureindianlore': ['americanindianculture', 'indianlore'],
           'medicinehealthcareprofessions': ['healthcareprofessions', 'medicine']}
ranks = {}
for y in range(2021, 2026):
    e = official[str(y)]
    for name, rank in e['ranks'].items():
        keys = [squash(name), *ALIASES.get(squash(name), [])]
        row = next((r for r in rows if set(keys) & set(r['parts'])), None)
        if row:
            ranks.setdefault(row['name'], {})[y] = (rank, e['badges'])
        else:
            ranks.setdefault(name, {})[y] = (rank, e['badges'])
            rows.append({'name': name, 'parts': [squash(name)], 'thru2020': 0, 'row': []})


def estimate(curve_pick, total_pick, noise):
    out = {}
    for r in rows:
        extra = 0.0
        for y, (rank, of) in ranks.get(r['name'], {}).items():
            curve = curve_pick()
            extra += total_pick(y) * share(curve, rank, of) * noise()
        out[r['name']] = r['thru2020'] + extra
    return out


def order(totals):
    names = sorted(totals, key=lambda n: -totals[n])
    return {n: i + 1 for i, n in enumerate(names)}


mean_curve = [statistics.mean(c[i] for c in curves) for i in range(min(map(len, curves)))]
best = estimate(lambda: mean_curve, lambda y: TOTALS[y][0], lambda: 1.0)
best_rank = order(best)
before = order({r['name']: r['thru2020'] for r in rows})

random.seed(2025)
sims = []
for _ in range(2000):
    totals = {y: random.uniform(lo, hi) for y, (_, lo, hi) in TOTALS.items()}
    sims.append(order(estimate(lambda: random.choice(curves), lambda y: totals[y],
                               lambda: random.lognormvariate(0, 0.15))))

result = []
for name in sorted(best_rank, key=best_rank.get):
    places = sorted(s[name] for s in sims)
    lo, hi = places[int(len(places) * 0.05)], places[int(len(places) * 0.95)]
    result.append({'name': name, 'rank2025': best_rank[name], 'range': [lo, hi],
                   'rank2020': before.get(name), 'thru2020': next(r['thru2020'] for r in rows if r['name'] == name),
                   'estimated2025': round(best[name])})

json.dump(result, open(os.path.join(src, 'alltime-2025.json'), 'w', encoding='utf-8'), indent=1)
settled = sum(1 for r in result if r['range'][0] == r['range'][1])
print(f'{len(result)} badges; {settled} hold the same place in at least 90% of simulations')
for r in result[:40]:
    move = '' if r['rank2020'] == r['rank2025'] else f"(was #{r['rank2020']})"
    span = f"#{r['range'][0]}" if r['range'][0] == r['range'][1] else f"#{r['range'][0]}-{r['range'][1]}"
    print(f"#{r['rank2025']:>3} {r['name'][:42]:42} {r['estimated2025']:>10,}  likely {span:9} {move}")
