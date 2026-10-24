"""Turn the downloaded fact sheets and ranking articles into one JSON file:
{year: {"counts": {badge: n}, "ranks": {badge: rank}, "badges": total ranked}}"""
import json
import os
import re
import sys

import pypdf
from bs4 import BeautifulSoup

folder = sys.argv[1]
num = lambda s: int(re.sub(r'[^\d]', '', s)) if re.search(r'\d', s) else None
clean = lambda s: re.sub(r'\s+', ' ', s.replace('*', '')).strip()
out = {}


def table_rows(path):
    soup = BeautifulSoup(open(path, encoding='utf-8', errors='replace').read(), 'lxml')
    for table in soup.find_all('table'):
        rows = [[clean(c.get_text(' ')) for c in tr.find_all(['td', 'th'])] for tr in table.find_all('tr')]
        yield rows


# BSA fact sheets: "Merit badge | year count | lifetime"
for year in (1996, 2000, 2001, 2003, 2004, 2005, 2006, 2007):
    counts = {}
    for rows in table_rows(os.path.join(folder, f'factsheet-{year}.html')):
        for r in rows:
            if len(r) >= 3 and r[0] and num(r[1]) is not None and not re.match(r'(?i)total|unclassified|merit badge', r[0]):
                counts[r[0]] = num(r[1])
    out[year] = {'counts': counts}

# Fact sheet PDFs (2012, 2013 and 2014 editions): "Merit Badge 2011 2012 2013 Overall"
for pdf in ('factsheet-pdf-20121114030059.pdf', 'factsheet-pdf-20131006075435.pdf', 'factsheet-2011-2013.pdf'):
    text = '\n'.join(p.extract_text() or '' for p in pypdf.PdfReader(os.path.join(folder, pdf)).pages)
    head = re.search(r'Merit Badge (\d{4}) (\d{4}) (\d{4}) Overall', text)
    pdf_years = [int(y) for y in head.groups()]
    for line in text.splitlines():
        m = re.match(r'^([A-Za-z][A-Za-z ,&\-/\.\']+?)\*{0,2}\s+([\d,]+)\s+([\d,]+)\s+([\d,]+)\s+([\d ,]+)$', line.strip())
        if m and not re.match(r'(?i)total', m.group(1)):
            for i, year in enumerate(pdf_years):
                out.setdefault(year, {'counts': {}})['counts'][clean(m.group(1))] = num(m.group(i + 2))

# Scouting Magazine: 2019/2020 have counts, 2021-2025 ranks only
for year in (2019, 2020, 2021, 2022, 2023, 2024, 2025):
    # The full ranking table: has a rank column for this year and the most rows
    best, cols = [], None
    for rows in table_rows(os.path.join(folder, f'rank-{year}.html')):
        if not rows:
            continue
        header = [h.lower() for h in rows[0]]
        if any('lifetime' in h for h in header):
            continue
        name_col = next((i for i, h in enumerate(header) if 'merit badge' in h), None)
        rank_col = next((i for i, h in enumerate(header) if h in ('rank', f'{year} rank')), None)
        if rank_col is None:
            # Some tables head the rank column with just the year
            rank_col = next((i for i, h in enumerate(header) if h == str(year)), None)
        if name_col is None or rank_col is None:
            continue
        count_col = next((i for i, h in enumerate(header) if 'earned' in h or (h == str(year) and i != rank_col)), None)
        # A year-headed column of counts is not a rank column
        values = [num(r[rank_col]) for r in rows[1:] if len(r) > rank_col and num(r[rank_col]) is not None]
        if not values or max(values) > 300:
            continue
        if len(rows) > len(best):
            best, cols = rows, (name_col, rank_col, count_col)
    entry = {'ranks': {}, 'counts': {}}
    for r in best[1:]:
        name_col, rank_col, count_col = cols
        if len(r) <= max(name_col, rank_col):
            continue
        rank = num(r[rank_col])
        name = r[name_col]
        if rank is None or not name:
            continue
        entry['ranks'][name] = rank
        if count_col is not None and len(r) > count_col and num(r[count_col]) is not None:
            entry['counts'][name] = num(r[count_col])
    entry['badges'] = max(entry['ranks'].values()) if entry['ranks'] else 0
    out.setdefault(year, {}).update(entry)

json.dump(out, open(sys.argv[2], 'w', encoding='utf-8'), indent=1, sort_keys=True)
for year in sorted(out):
    e = out[year]
    print(year, 'counts', len(e.get('counts', {})), 'ranks', len(e.get('ranks', {})), 'badges', e.get('badges'),
          'archery', e.get('counts', {}).get('Archery'), e.get('ranks', {}).get('Archery'))
