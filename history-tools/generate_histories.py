"""Build draft merit badge history data for every badge from Bucky's sources.

usage: generate_histories.py <repo> <scratchpad>

Reads
  <scratchpad>/workbook.json        cached pamphlet workbook (cache_workbook.py)
  <scratchpad>/official.json        official counts and ranks (parse_official.py)
  <scratchpad>/web/usscouts-history.html   first/last offered years
  <scratchpad>/official/handbook-1911.txt  original requirements
  E:/Scouting/SMBWeb/*-History.htm  Bucky's old history pages
  C:/filestore/history/...          patch, cover and hard cover photos
  E:/Scouting/Archive/.../Merit Badge History   patch fronts and backs
Writes
  src/data/merit-badge-history/<slug>.yaml and printings/<slug>.yaml
  C:/filestore/history/web/<slug>/...   resized WebP photos, served by filestore.scoutmasterbucky.com
  <scratchpad>/generate-report.md   things to check, badge by badge

Hand-curated files (first line not starting with "# Generated") are never
overwritten, and neither are their photos.
"""
import datetime
import json
import os
import re
import sys
from collections import defaultdict

import yaml
from bs4 import BeautifulSoup
from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import handbook1911  # noqa: E402

repo, scratch = sys.argv[1], sys.argv[2]
DATA = os.path.join(repo, 'src/data/merit-badge-history')
# The site's history photos are served from here, not from git (web-photos.mjs)
WEB_PHOTOS = 'C:/filestore/history/web'
OLD_PAGES = 'E:/Scouting/SMBWeb'
PATCHES = 'C:/filestore/history/merit-badges'
COVERS = 'C:/filestore/history/merit-badge-pamphlets'
ARCHIVE = 'E:/Scouting/Archive/from 351 drive Scouts/Merit Badge History'
# Bucky's 2017 full-site backup: patch fronts and backs named "<Badge>-<Type>-front.jpg"
BACKUP = 'E:/Scouting/SMBWeb/xArchives - pages/2017-08-31 Full site back up/scoutmasterbucky/graphics/meritbadges/Merit Badges'
THIS_YEAR = 2025          # last full year of rankings
COUNTS_THROUGH = 2020     # last year national counts were published

squash = lambda s: re.sub(r'[^a-z0-9]', '', str(s).lower().replace('&', 'and'))
clean = lambda s: re.sub(r'\s+', ' ', s or '').strip()
report = defaultdict(list)

site = yaml.safe_load(open(os.path.join(repo, 'src/data/historical-merit-badges.yaml'), encoding='utf-8'))
current_site = yaml.safe_load(open(os.path.join(repo, 'src/data/merit-badges.yaml'), encoding='utf-8'))
workbook = json.load(open(os.path.join(scratch, 'workbook.json'), encoding='utf-8'))
official = {int(k): v for k, v in json.load(open(os.path.join(scratch, 'official.json'), encoding='utf-8')).items()}
# Estimated all-time ranking as of 2025, by workbook row name (estimate_alltime.py)
estimate_path = os.path.join(scratch, 'alltime-2025.json')
alltime_estimate = ({e['name']: e for e in json.load(open(estimate_path, encoding='utf-8'))}
                    if os.path.exists(estimate_path) else {})
patch_types = yaml.safe_load(open(os.path.join(DATA, 'patch-types.yaml'), encoding='utf-8'))
handbook = {squash(k): v for k, v in handbook1911.parse(os.path.join(scratch, 'official/handbook-1911.txt')).items()}

# Filestore folders that hold more photos of a site badge under another spelling
MERGED_FOLDERS = {'farm-arrangement': ['farm-arrangements'], 'markmanship': ['marksmanship'], 'textile': ['textiles'],
                  # The 2010 Tracking badge is Stalking renamed for one year
                  'stalking': ['tracking'],
                  # Renamed Small Grains in 1959; Bucky wants one page
                  'small-grains-and-cereal-foods': ['small-grains']}
merged = {f for fs in MERGED_FOLDERS.values() for f in fs}


def folder_files(root, slug):
    """(folder, file) for every photo of a badge, including merged folders."""
    out = []
    for name in [slug, *MERGED_FOLDERS.get(slug, [])]:
        folder = os.path.join(root, name)
        if os.path.isdir(folder):
            out += [(folder, f) for f in sorted(os.listdir(folder))]
    return out


# Badges to build: the site's history list plus discontinued badges that only
# have a filestore folder so far
badges = {slug: info['name'] for slug, info in site.items()}
for slug in sorted(os.listdir(COVERS)):
    if os.path.isdir(os.path.join(COVERS, slug)) and slug not in badges and slug not in merged and not slug.startswith('0-'):
        badges[slug] = slug.replace('-', ' ').title().replace(' And ', ' and ').replace(' Of ', ' of ')
        report[slug].append('Not on the site\'s historical list yet; built from the filestore folder only.')

# ---------------------------------------------------------------- usscouts
usscouts = {}
soup = BeautifulSoup(open(os.path.join(scratch, 'web/usscouts-history.html'), encoding='utf-8', errors='replace').read(), 'lxml')
for table in soup.find_all('table'):
    if table.find('table'):
        continue
    for tr in table.find_all('tr'):
        cells = [clean(c.get_text(' ')) for c in tr.find_all(['td', 'th'])]
        if len(cells) >= 6 and re.match(r'^\d{4}$', cells[3]):
            usscouts[squash(cells[0])] = {'first': int(cells[3]), 'last': cells[4].lower(), 'notes': cells[5]}

ALIASES = {
    # site slug -> other spellings used in the sources
    'bugling': ['Music and Bugling', 'Bugling'],
    'markmanship': ['Marksmanship'],
    'water-skiing': ['Waterskiing'],
    'wildlife-management': ['WIldlife Management', 'Wildlife Management'],
    'textile': ['Textiles'],
    'pulp-and-paper': ['Pulp & Paper'],
    'farm-arrangement': ['Farm Arrangement(s)'],
    'farm-layout-and-building-arrangement': ['Farm Layout n Building Arrgmnt'],
    'grasses-legumes-and-forage-crops': ['Grasses, Legumes, Forage Crops'],
    'conservation-of-natural-resources': ['Conservation Natural Resources'],
    'fly-fishing': ['Fly-Fishing'],
}


def keys_for(slug, name):
    return {squash(name), squash(slug), *(squash(a) for a in ALIASES.get(slug, []))}


# ---------------------------------------------------------------- old pages
old_pages = {}
for f in os.listdir(OLD_PAGES):
    m = re.match(r'Scoutmaster-Bucky-Merit-Badges-(.+)-History\.htm$', f)
    if m:
        old_pages[squash(m.group(1))] = os.path.join(OLD_PAGES, f)


def read_old_page(path):
    """History fields, Bucky's summary text and the patch table of an old page."""
    s = BeautifulSoup(open(path, encoding='utf-8', errors='replace').read(), 'lxml')
    out = {}
    table = s.find('table', class_='MBHistoryTable')
    if table:
        # Only this table's own rows and cells: a cell can hold a small table of
        # its own (two "Preceded by" badges), whose cells must not count as columns
        rows = [r for r in table.find_all('tr') if r.find_parent('table') is table]
        cells = lambda r: [clean(c.get_text(' ')) for c in r.find_all('td') if c.find_parent('tr') is r]
        head = cells(rows[0])
        values = cells(rows[1]) if len(rows) > 1 else []
        # A long "replaced with" can wrap onto a second row
        extra = cells(rows[2]) if len(rows) > 2 and len(cells(rows[2])) == len(head) else []
        fields = {}
        for i, h in enumerate(head):
            v = ' '.join(x for x in (values[i] if i < len(values) else '', extra[i] if i < len(extra) else '') if x)
            fields[h.rstrip(':').lower()] = v
        out['fields'] = fields
        text = [clean(r.get_text(' ')) for r in rows[3 if extra else 2:] if len(cells(r)) == 1]
        text = [t for t in text if len(t) > 40]
        if text:
            out['summary'] = text
    # Patch table: the first MBandMBPTable after the "MERIT BADGES" heading
    patch_cards = []
    for t in s.find_all('table', class_='MBandMBPTable'):
        imgs = [i.get('src', '') for i in t.find_all('img')]
        if not any('Merit%20Badges/' in i or 'Merit Badges/' in i or 'not-made' in i.lower() or 'coming' in i.lower() for i in imgs) \
                and 'Type A' not in t.get_text():
            continue
        # A few pages show patches and pamphlets in one table; read_patch_group
        # keeps only the "Type A"-"Type M" cells, so the pamphlet cells drop out
        if any('Pamphlet' in i for i in imgs) and not any('Merit%20Badges/' in i or 'Merit Badges/' in i for i in imgs):
            continue
        rows = t.find_all('tr')
        # Rows come in groups: images, type, years, note, spacer
        group = []
        for r in rows:
            group.append(r)
            if len(group) == 5 or not clean(r.get_text(' ')) and not r.find('img') and len(group) > 1:
                patch_cards += read_patch_group(group)
                group = []
        if group:
            patch_cards += read_patch_group(group)
    if patch_cards:
        out['patches'] = patch_cards
    return out


def read_patch_group(rows):
    tds = [r.find_all('td') for r in rows]
    if not tds or not tds[0]:
        return []
    cards = []
    for i, cell in enumerate(tds[0]):
        col = lambda n: clean(tds[n][i].get_text(' ')) if n < len(tds) and i < len(tds[n]) else ''
        img = cell.find('img')
        label = col(1)
        m = re.match(r'Types?\s+([A-M])', label)
        if not m:
            continue
        card = {'type': m.group(1), 'years': col(2), 'note': col(3).strip('()'), 'cellText': clean(cell.get_text(' '))}
        if img:
            card['src'] = img.get('src', '')
        cards.append(card)
    return cards


# ---------------------------------------------------------------- workbook
hc_rows = workbook['Historical Count']
hc_header = hc_rows[0]
year_cols = {i: h for i, h in enumerate(hc_header) if isinstance(h, int) and 1900 < h < 2100}
thru2020_col = len(hc_header) - 1
count_rows = []
for row in hc_rows[1:]:
    # "Unclassified" holds badges the reports could not assign; it is not a
    # badge, so it must not take a place in any ranking
    if row and isinstance(row[0], str) and row[0].strip() and squash(row[0]) != 'unclassified':
        parts = [squash(p.replace('*', '')) for p in row[0].split('/')]
        count_rows.append({'name': row[0].strip(), 'parts': parts, 'row': row})


def count_row_for(keys):
    for r in count_rows:
        if keys & set(r['parts']):
            return r
    return None


def numeric(v):
    return isinstance(v, (int, float)) and not isinstance(v, bool)


# Counts per year for ranking: one entry per lineage row
counts_by_year = defaultdict(dict)
for r in count_rows:
    for i, y in year_cols.items():
        v = r['row'][i] if i < len(r['row']) else None
        if numeric(v):
            counts_by_year[y][r['name']] = v


def rank_in(counts, mine):
    if mine is None or mine <= 0 or len(counts) < 20:
        return None
    earned = [v for v in counts.values() if v > 0]
    return [1 + sum(1 for v in earned if v > mine), len(earned)]


official_names = {}
for y, e in official.items():
    for n in list(e.get('counts', {})) + list(e.get('ranks', {})):
        official_names.setdefault(squash(n.replace('*', '')), n)

sheet_names = {squash(n): n for n in workbook}
# Workbook sheets filed under a later name of the badge
SHEETS = {'small-grains-and-cereal-foods': 'Small Grains'}

# Stray keystrokes in the workbook that Bucky confirmed are junk
JUNK = {'dsakjldasf'}

MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
          'August', 'September', 'October', 'November', 'December']


def read_printings(sheet):
    rows = workbook[sheet]
    header = [str(h).strip().lower() if h is not None else '' for h in rows[0]]
    col = {h: i for i, h in enumerate(header) if h}

    def get(row, name):
        i = col.get(name.lower())
        if i is None or i >= len(row) or row[i] is None:
            return None
        v = row[i]
        if isinstance(v, dict):
            return datetime.datetime.fromisoformat(v['date'])
        v = str(v).strip()
        return v or None

    printings, not_made_years = [], set()
    for row in rows[1:]:
        year = get(row, 'Year')
        if year is None or not re.match(r'^\d{4}', str(year)):
            continue
        year = int(str(year)[:4])
        have = (get(row, 'Have') or '').lower()
        if have == 'not made':
            not_made_years.add(year)
            continue
        p = {'year': year}
        month = get(row, 'Month')
        if isinstance(month, datetime.datetime):
            month = None if (month.month, month.day) == (1, 1) else MONTHS[month.month - 1]
        elif month and month.lower() in ('yes', 'n/a'):
            month = None
        if month:
            p['month'] = month
        for key, name in (('cover', 'Covers'), ('back', 'Back'), ('printRun', 'Amount'),
                          ('copyright', 'Copyright'), ('upc', 'UPC #'), ('bsaNumber', 'BSA #'),
                          ('sku', 'SKU #'), ('saNumber', 'SA #'), ('notes', 'Notes'), ('hardcover', 'HC')):
            v = get(row, name)
            if v is None or isinstance(v, datetime.datetime) or v in ('N/A', 'not made') or v.lower() in JUNK:
                continue
            if key == 'cover':
                v = v.upper().replace(' OVER ', ' over ')
            if key in ('printRun', 'hardcover'):
                v = v.upper().replace('\n', ', ')
            if key in ('sku', 'saNumber') and v == get(row, 'BSA #'):
                continue
            p[key] = v
        p['status'] = {'x': 'have', 'c': 'confirmed'}.get(have, 'listed')
        printings.append(p)
    return printings, not_made_years


# ---------------------------------------------------------------- photos
def save_image(src, dest, height):
    """Save a WebP copy of a photo in the filestore's web folder, shrunk to `height` pixels tall at most."""
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    if os.path.exists(dest) and os.path.getmtime(dest) >= os.path.getmtime(src):
        return
    im = Image.open(src)
    # Cut-out patch photos keep their see-through background
    im = im.convert('RGBA' if src.lower().endswith('.png') else 'RGB')
    if im.height > height:
        im = im.resize((round(im.width * height / im.height), height), Image.LANCZOS)
    im.save(dest, 'WEBP', quality=80, method=6)


def web_path(slug, file):
    return f'/history/{slug}/{file}'


natural = lambda t: [int(x) if x.isdigit() else x for x in re.split(r'(\d+)', t.upper())]

COVER_TOKEN = re.compile(r'^(?P<prefix>.+?)-(?P<tok>\d+(?:bl|[a-z])?(?:-\d+[a-z]?)?(?:-?\d*es)?(?:-over-\d+[a-z]?(?:-\d+)?)?)(?P<back>-back)?\.(jpg|jpeg|png)$')
HC_TOKEN = re.compile(r'^(?P<prefix>.+?)-(?P<tok>hc-misc-[a-z]+|hc[a-z]+)(?P<num>\d*)(?P<v>v\d)?\.(jpg|jpeg|png)$')

# Patch archive: files like "AmeBus-H2-1front.jpg"; badge codes are 6 letters
archive = defaultdict(list)
for f in os.listdir(ARCHIVE):
    m = re.match(r'^([A-Za-z]{6})-(.+?)-?(front|reverse)\.jpg$', f)
    if m:
        archive[m.group(1).lower()].append((m.group(2), m.group(3), f))
archive_used = set()

# The 2017 backup's fronts and backs, by squashed badge name
backup = defaultdict(list)
if os.path.isdir(BACKUP):
    for f in os.listdir(BACKUP):
        m = re.match(r'^(.+?)-([A-M][A-Za-z0-9]*)-(front|reverse)\.jpg$', f)
        if m:
            backup[squash(m.group(1))].append((m.group(2), m.group(3), f))


ARCHIVE_CODES = {
    'archaeology': 'archeo', 'backpacking': 'bacpac', 'bookbinding': 'bookin',
    'conservation-of-natural-resources': 'conres', 'electronics': 'eleron', 'farm-arrangement': 'farars',
    'first-aid-to-animals': 'firani', 'fish-and-wildlife-management': 'fisman',
    'fruit-and-nut-growing': 'frugro', 'game-design': 'gaming', 'model-design-and-building': 'modbui',
    'small-boat-sailing': 'smasai', 'soil-and-water-conservation': 'soicon', 'space-exploration': 'spacee',
    'truck-transportation': 'truckt', 'whitewater': 'whiwat', 'archery': 'archer', 'woodwork': 'woowor',
    'leatherwork': 'leathe', 'safety': 'safety',
    # Filed under the badge's earlier name
    'insect-study': 'inslif', 'veterinary-medicine': 'vetsci', 'beekeeping': 'beekee',
    # The 2010 Tracking badges belong on the Stalking page
    'stalking': 'tracki',
    # Early badges whose names would otherwise grab a later badge's photos
    'leather-work': None, 'leatherworking': None, 'safety-first': None,
}


def archive_codes(name, slug):
    """Every archive code that belongs to a badge (some badges have two)."""
    if slug in ARCHIVE_CODES and ARCHIVE_CODES[slug] is None:
        return []
    codes = [ARCHIVE_CODES[slug]] if slug in ARCHIVE_CODES else []
    auto = archive_code(name)
    if auto in ARCHIVE_CODES.values() and auto not in codes:
        auto = None  # claimed by another badge
    return codes + [auto] if auto and auto not in codes else codes


def archive_code(name):
    words = [w for w in re.split(r'[^A-Za-z]+', name) if w and w.lower() not in ('and', 'of', 'the', 'in')]
    candidates = []
    if len(words) == 1:
        candidates.append(words[0][:6])
    else:
        candidates.append(words[0][:3] + words[1][:3])
        candidates.append(''.join(w[:2] for w in words[:3]))
        candidates.append((''.join(words))[:6])
    for c in candidates:
        if c.lower() in archive:
            return c.lower()
    return None


def offered(slug):
    """(first, last) years a badge was offered, from usscouts."""
    us = next((usscouts[k] for k in keys_for(slug, badges[slug]) if k in usscouts), None)
    if not us:
        return None
    return us['first'], THIS_YEAR + 1 if us['last'] == 'current' else int(us['last']) if us['last'].isdigit() else us['first']


def archive_owner(code, letter):
    """The badge sharing an archive code that was offered longest in a patch type's years."""
    candidates = [s for s in badges if code in archive_codes(badges[s], s)]
    if len(candidates) == 1:
        return candidates[0]
    lo, hi = patch_types[letter]['years'].split('-')
    lo, hi = int(lo), THIS_YEAR + 1 if hi == 'current' else int(hi)

    def overlap(s):
        span = offered(s)
        return max(0, min(hi, span[1]) - max(lo, span[0]) + 1) if span else -1
    return max(candidates, key=overlap)


EAGLE_2009 = {'camping', 'citizenship-in-the-community', 'citizenship-in-the-nation', 'citizenship-in-the-world',
              'communication', 'cycling', 'emergency-preparedness', 'environmental-science', 'family-life',
              'first-aid', 'hiking', 'lifesaving', 'personal-fitness', 'personal-management', 'swimming'}
FIRST_TYPE_M_2026 = {'wildland-fire-management', 'competitive-gaming'}
# Badges too new for the usscouts table: the year they start (Bucky)
NEW_BADGES = {'wildland-fire-management': 2026, 'competitive-gaming': 2026}

# Lineage facts the sources get wrong or leave out. Stalking (1911-1952) came
# back for Scouting's 100th anniversary in 2010 only, renamed Tracking because
# of the word's modern meaning (Bucky; Blue Ridge Discovery Center, 2010).
# Bucky wants one Stalking page: the workbook's "Stalking / Tracking" row is all
# Stalking's, and the 2010 Tracking patches sit on it as its Type K.
LINEAGE = {
    # Bucky (2026-10-23): Agriculture merged into these two, which matches
    # Terry 2013 ("requirements merged into Animal Science and Plant Science")
    'agriculture': {'replacedWith': 'Animal Science and Plant Science'},
    # Bucky's old page has a typo: "1947-1942"
    'airplane-structure': {'patches': {'E': {'years': '1947-1952'}}},
    # Bucky (2026-10-23): no Type F American Business is known; standard K/L years
    'american-business': {'patches': {
        'F': {'status': 'unknown'},
        'I': {'note': '38mm and 42mm'},
        'K': {'years': '2010-2014'},
        'L': {'years': '2015-2025'},
    }},
    'stalking': {
        'wholeRow': True,
        'replacedWith': 'None',
        'addTimeline': [{'year': 2010, 'text': "Stalking returns for one year for Scouting's 100th anniversary, renamed "
                                               'Tracking because of the modern meaning of the word "stalking."'}],
        'patches': {'K': {'years': '2010', 'note': 'Tracking, 2010 only'}},
    },
    # Bucky (2026-10-25): one page; the workbook's count row already runs 1943-1981
    'small-grains-and-cereal-foods': {
        'discontinued': 1975,
        'replacedWith': 'Plant Science',
        'addTimeline': [{'year': 1959, 'text': 'Renamed Small Grains.'}],
    },
    # Bucky (2026-10-25): the craft badges cross-reference the badges before and after them
    'leatherworking': {'replacedWith': 'Leathercraft'},
    'leathercraft': {'precededBy': 'Craftsmanship, Leatherworking', 'replacedWith': 'Leatherwork'},
    'leatherwork': {'precededBy': 'Leathercraft'},
    'wood-turning': {'replacedWith': 'Woodwork'},
    'carpentry': {'precededBy': 'Original badge'},
}


# ---------------------------------------------------------------- build one badge
def build(slug, name):
    notes = report[slug]
    keys = keys_for(slug, name)
    page = read_old_page(old_pages[next(k for k in keys if k in old_pages)]) if keys & set(old_pages) else {}
    if not page:
        notes.append('No old history page (or an empty one): fields come from usscouts and the workbook.')
    us = next((usscouts[k] for k in keys if k in usscouts), None)
    crow = count_row_for(keys)
    sheet = SHEETS.get(slug) or next((sheet_names[k] for k in keys if k in sheet_names), None)

    fields = page.get('fields', {})
    intro_old = re.search(r'\d{4}', fields.get('introduced', ''))
    intro = int(intro_old.group()) if intro_old else (us['first'] if us else NEW_BADGES.get(slug))
    if intro_old and us and us['first'] != int(intro_old.group()):
        notes.append(f"Introduced: old page says {intro_old.group()}, usscouts says {us['first']}. Using the old page.")
    disc_old = fields.get('discontinued', '')
    if disc_old:
        active = disc_old.lower().startswith('current')
        last = None if active else int(re.search(r'\d{4}', disc_old).group()) if re.search(r'\d{4}', disc_old) else None
    elif us:
        active = us['last'] == 'current'
        last = None if active else int(us['last']) if us['last'].isdigit() else None
    else:
        active = slug in current_site
        last = None
    if us and disc_old and not active and us['last'].isdigit() and last and int(us['last']) != last:
        notes.append(f"Discontinued: old page says {last}, usscouts says {us['last']}.")
    if slug == 'citizenship-in-society':
        active = True  # Bucky wants its Type M slot
    lineage = LINEAGE.get(slug, {})
    if 'discontinued' in lineage:
        active, last = False, lineage['discontinued']

    preceded = fields.get('preceded by') or ''
    replaced = fields.get('replaced with') or ''
    us_notes = us['notes'] if us else ''
    if not preceded:
        m = re.search(r'(?:Formerly|Replacing|Replaced)\s+(?:part of\s+)?([A-Z][A-Za-z &,\-]+)', us_notes)
        preceded = m.group(1).strip() if m else ('Original badge' if intro == 1911 else 'None')
    if preceded.lower() == 'original':
        preceded = 'Original badge'
    # Bucky's old pages write "new" for a badge with no predecessor
    if preceded.lower() == 'new':
        preceded = 'None'
    if not replaced:
        m = re.search(r'(?:Replaced with|Became|Renamed|Replaced by)\s+([A-Z][A-Za-z &,\-]+)', us_notes)
        replaced = 'Current' if active else (m.group(1).strip() if m else 'None')
    replaced = {'current': 'Current', 'none': 'None'}.get(replaced.lower(), replaced)
    replaced = lineage.get('replacedWith', replaced)
    preceded = lineage.get('precededBy', preceded)

    data = {'name': name, 'precededBy': preceded}
    link = titleslug(preceded)
    if link in badges and link != slug:
        data['precededByLink'] = link
    data['introduced'] = intro if intro else 'Unknown'
    data['discontinued'] = 'Current' if active else (str(last) if last else 'Unknown')
    data['replacedWith'] = replaced

    if page.get('summary'):
        # Bucky's own words from his earlier page, with the typos he approved fixing
        data['story'] = [fix_typos(p) for p in page['summary']]

    req = next((handbook[k] for k in keys if k in handbook), None)
    if req and intro == 1911:
        data['thenAndNow'] = {'year': 1911, 'source': 'The Official Handbook for Boys (1911)', 'requirements': req}

    # ---- earned and ranks
    earned, ranks, data_estimate = None, {}, None
    if crow:
        row = crow['row']
        # A row shared by renamed badges counts as one badge when they are one page
        combined = len(crow['parts']) > 1 and not lineage.get('wholeRow')
        values = {y: (row[i] if i < len(row) else None) for i, y in year_cols.items()}
        known = [y for y, v in values.items() if numeric(v)]
        if combined:
            lo = intro or min(known)
            hi = THIS_YEAR if active else (last or max(known))
            span_years = [y for y in sorted(values) if lo <= y <= hi]
        elif known:
            # Start at the badge's first year even when its first counts are unknown
            lo = min(min(known), intro) if isinstance(intro, int) else min(known)
            hi = THIS_YEAR if active else max(known)
            span_years = list(range(lo, hi + 1))
        else:
            span_years = []
        by_year = {}
        for y in span_years:
            v = values.get(y)
            by_year[y] = int(v) if numeric(v) else None
            off = official.get(y, {}).get('counts', {})
            on = next((off[n] for n in off if squash(n.replace('*', '')) in keys), None)
            if on is not None:
                if by_year[y] is None:
                    by_year[y] = on
                    notes.append(f'{y}: count filled from the official fact sheet ({on:,}).')
                elif by_year[y] != on:
                    notes.append(f'{y}: workbook {by_year[y]:,} vs official fact sheet {on:,}.')
        if by_year:
            total_known = sum(v for v in by_year.values() if v)
            if not combined and numeric(row[thru2020_col]):
                total = int(row[thru2020_col])
                through = min(COUNTS_THROUGH, max(y for y, v in by_year.items() if v is not None))
                earned = {'totalThrough': through, 'total': total, 'byYear': by_year}
            else:
                through = max(y for y, v in by_year.items() if v is not None) if total_known else hi
                earned = {'totalThrough': through, 'total': total_known, 'totalKnownOnly': True, 'byYear': by_year}
                notes.append(f"Counts come from the combined workbook row \"{crow['name']}\"; total is the sum of known years.")
        for y in span_years:
            v = by_year.get(y)
            off = official.get(y, {})
            if off.get('ranks'):
                r = next((off['ranks'][n] for n in off['ranks'] if squash(n.replace('*', '')) in keys), None)
                if r:
                    ranks[y] = [r, off['badges']]
                continue
            if off.get('counts') and len(off['counts']) > 120 and v:
                ranks[y] = rank_in(off['counts'], v)
            elif v:
                ranks[y] = rank_in(counts_by_year[y], v)
        ranks = {y: r for y, r in ranks.items() if r}
        if not combined and numeric(row[thru2020_col]):
            totals = [r['row'][thru2020_col] for r in count_rows if numeric(r['row'][thru2020_col])]
            data_life = 1 + sum(1 for t in totals if t > row[thru2020_col])
            life = {'rank': data_life, 'asOf': COUNTS_THROUGH}
            # Estimated 2025 all-time place (estimate_alltime.py), shown beside the official one
            est = alltime_estimate.get(crow['name'].replace('*', '').strip())
            if est:
                data_estimate = {'rank': est['rank2025'], 'range': est['range'], 'asOf': 2025}
        else:
            life = None
    else:
        notes.append('No row in the Historical Count sheet.')
        life = None

    # ---- printings
    printings, not_made_years = ([], set())
    if sheet:
        printings, not_made_years = read_printings(sheet)
    else:
        notes.append('No sheet in the pamphlet workbook.')

    # ---- timeline (facts from the data only)
    timeline = []
    if intro:
        timeline.append({'year': intro, 'text': f'The {name} merit badge is introduced.'
                         + (' It is one of the original 57 merit badges.' if intro == 1911 else '')})
    if earned:
        firsts = [y for y, v in earned['byYear'].items() if v]
        if firsts:
            n = earned['byYear'][firsts[0]]
            # Unknown years before it mean this is only the first count on record
            if any(v is None for y, v in earned['byYear'].items() if y < firsts[0]):
                timeline.append({'year': firsts[0], 'text': f'First known count: {fmt(n)} {name} merit badges earned.'})
            else:
                timeline.append({'year': firsts[0], 'text': f'The first {name} merit badge is earned.' if n == 1
                                 else f'The first {name} merit badges are earned: {fmt(n)} that year.'})
            peak = max(firsts, key=lambda y: earned['byYear'][y])
            timeline.append({'year': peak, 'text': f"All-time high: {fmt(earned['byYear'][peak])} {name} merit badges earned."})
    if printings:
        p0 = min(printings, key=lambda p: p['year'])
        timeline.append({'year': p0['year'], 'text': f"The earliest known {name} pamphlet printing" + (f" (Type {p0['cover']})" if p0.get('cover') else '') + '.'})
    best = min(ranks.items(), key=lambda kv: (kv[1][0], kv[0])) if ranks else None
    if best:
        timeline.append({'year': best[0], 'text': f'Best ranking: {ordinal(best[1][0])} of {best[1][1]} merit badges.'})
    if not active and last:
        timeline.append({'year': last, 'text': f'Last year the {name} merit badge is offered'
                         + (f'; it is replaced by {replaced}.' if replaced not in ('None', 'Current', '') else '.')})
    timeline += lineage.get('addTimeline', [])
    # One stop per year: events in the same year share it
    merged_years = {}
    for t in sorted(timeline, key=lambda t: t['year']):
        if t['text'] not in merged_years.get(t['year'], ''):
            merged_years[t['year']] = f"{merged_years[t['year']]} {t['text']}" if t['year'] in merged_years else t['text']
    data['timeline'] = [{'year': y, 'text': text} for y, text in merged_years.items()]

    if ranks:
        data['ranks'] = ranks
    if life:
        data['lifetimeRank'] = life
    if life and data_estimate:
        data['lifetimeRankEstimate'] = data_estimate
    if earned:
        data['earned'] = earned

    # ---- patches
    data['patches'] = build_patches(slug, name, page, intro, active, last, notes)

    # ---- pamphlets and hard covers
    data['pamphlets'], data['hardcovers'] = build_covers(slug, printings, not_made_years, active, intro, last, notes)
    if not data['hardcovers']:
        del data['hardcovers']

    trivia = data_trivia(data, printings)
    if trivia:
        data['trivia'] = trivia
    # Researched trivia, requirements and corrections (history-tools/research/<slug>.yaml)
    # take the place of the generated ones
    research_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'research', f'{slug}.yaml')
    if os.path.exists(research_path):
        data.update(yaml.safe_load(open(research_path, encoding='utf-8')) or {})

    return data, printings, sheet, not_made_years


def badge_list(text):
    """"Food Systems Plant Science" -> "Food Systems and Plant Science", using the
    known badge names; other text is returned as it is."""
    names = sorted({n for n in badges.values()}, key=len, reverse=True)
    found, rest = [], text
    while rest.strip():
        hit = next((n for n in names if rest.strip().startswith(n)), None)
        if not hit:
            return text
        found.append(hit)
        rest = rest.strip()[len(hit):]
    return found[0] if len(found) == 1 else ', '.join(found[:-1]) + ' and ' + found[-1]


def data_trivia(data, printings):
    """Questions built only from facts already on the page (counts, ranks,
    lineage, printings, patch types), so they are as reliable as the page."""
    name = data['name']
    possessive = f"{name}'" if name.endswith('s') else f"{name}'s"
    out = []
    # The most surprising facts first: styles that were never made
    never = [p['type'] for p in data['patches'] if p.get('status') in ('none', 'unknown', 'notMade')]
    if never:
        kinds = ', '.join(never[:-1]) + (' or ' if len(never) > 1 else '') + never[-1]
        out.append({'q': f'Was the {name} badge made in every patch style of its time?',
                    'a': f'No. No Type {kinds} {name} badge is known to exist.'})
    if data.get('introduced') == 1911:
        out.append({'q': f'Was {name} one of the original 57 merit badges?',
                    'a': 'Yes. It was in the first Official Handbook for Boys in 1911.'})
    req = data.get('thenAndNow', {}).get('requirements')
    if req:
        out.append({'q': f'What was the first thing a Scout had to do for {name} in 1911?',
                    'a': req[0].rstrip('.;') + '.'})
    earned = data.get('earned')
    if earned:
        counted = {y: v for y, v in earned['byYear'].items() if v}
        gaps = any(v is None for y, v in earned['byYear'].items() if y <= COUNTS_THROUGH)
        if counted:
            peak = max(counted, key=counted.get)
            # With unknown years, the best year can only be the best year on record
            out.append({'q': (f'Of the years with a known count, when did Scouts earn the most {name} merit badges?'
                              if gaps else f'In what year did Scouts earn the most {name} merit badges?'),
                        'a': f'{peak}, when {fmt(counted[peak])} were earned.'})
        if not earned.get('totalKnownOnly'):
            out.append({'q': f'How many {name} merit badges had been earned by {earned["totalThrough"]}?',
                        'a': f'{fmt(earned["total"])}.'})
    if data.get('ranks'):
        year, (rank, of) = min(data['ranks'].items(), key=lambda kv: (kv[1][0], kv[0]))
        out.append({'q': f"What was {possessive} best year in the rankings on record?",
                    'a': f'{year}, when it was {ordinal(rank)} of the {of} merit badges earned that year.'})
    preceded = data.get('precededBy', '')
    if preceded and preceded not in ('Original badge', 'None', 'New'):
        out.append({'q': f'What came before the {name} merit badge?', 'a': f'{badge_list(preceded)}.'})
    replaced = data.get('replacedWith', '')
    if data.get('discontinued') not in ('Current', 'Unknown') and replaced not in ('None', 'Current', ''):
        out.append({'q': f'What replaced {name} after {data["discontinued"]}?', 'a': f'{badge_list(replaced)}.'})
    if printings:
        first = min(printings, key=lambda p: (p['year'], MONTHS.index(p['month']) if p.get('month') in MONTHS else 0))
        when = f"{first['month']} {first['year']}" if first.get('month') else str(first['year'])
        out.append({'q': f'When was the earliest known {name} pamphlet printed?', 'a': f'{when}.'})
    return out[:6]


# Typos in Bucky's old page text that he has OK'd fixing
TYPOS = {'meirt': 'merit', "despite it's": 'despite its', "for it's": 'for its',
         'Citizneship': 'Citizenship', "had it's own": 'had its own', 'was broke into': 'was broken into'}


def fix_typos(text):
    for wrong, right in TYPOS.items():
        text = re.sub(rf'\b{wrong}\b', right, text)
    return text


def titleslug(t):
    return re.sub(r'^-|-$', '', re.sub(r'[^a-z0-9]+', '-', t.lower().replace('&', 'and')))


def fmt(n):
    return f'{n:,}'


def ordinal(n):
    return f"{n}{'th' if 10 <= n % 100 <= 20 else {1: 'st', 2: 'nd', 3: 'rd'}.get(n % 10, 'th')}"


def type_years(letter, intro, active, last):
    """A patch type's years, clipped to the years the badge was offered."""
    if slug_m_2026 and letter == 'M':
        return '2026-current'
    lo, hi = patch_types[letter]['years'].split('-')
    lo = int(lo)
    hi = THIS_YEAR + 1 if hi == 'current' else int(hi)
    end = THIS_YEAR + 1 if active else (last or hi)
    lo2, hi2 = max(lo, intro or lo), min(hi, end)
    if lo2 > hi2:
        return None
    if hi == THIS_YEAR + 1 and active:
        return f'{lo2}-current'
    return f'{lo2}-{hi2}' if lo2 != hi2 else str(lo2)


slug_m_2026 = False


def build_patches(slug, name, page, intro, active, last, notes):
    global slug_m_2026
    slug_m_2026 = slug in FIRST_TYPE_M_2026
    photos = {}
    for folder, f in folder_files(PATCHES, slug):
        m = re.match(r'^.+?-patch-([a-z0-9-]+)\.(jpg|jpeg|png)$', f.lower())
        if m and 'ebay' not in m.group(1):
            photos[m.group(1)] = (folder, f)
    cards = []
    used = set()

    def photo_card(token, **extra):
        folder, f = photos[token]
        out = f'{slug}-patch-{token}.webp'
        save_image(os.path.join(folder, f), os.path.join(WEB_PHOTOS, slug, out), 500)
        used.add(token)
        return {**extra, 'image': web_path(slug, out)}

    if page.get('patches'):
        for c in page['patches']:
            card = {'type': c['type']}
            if c['years']:
                card['years'] = c['years'].replace('current', 'current')
            if c['note']:
                card['note'] = c['note']
            src = (c.get('src') or '').replace('%20', ' ')
            token = None
            m = re.search(r'Merit-Badge-([A-Za-z0-9-]+)\.(jpg|png)$', src, re.I)
            if m:
                token = m.group(1).lower()
            text = c['cellText'].upper()
            if token and token in photos:
                card.update(photo_card(token))
            elif 'DOES NOT EXIST' in text:
                card['status'] = 'none'
            elif 'NOT KNOWN' in text:
                card['status'] = 'unknown'
            elif 'not-made' in src.lower() or 'NOT MADE' in text:
                card['status'] = 'notMade'
            else:
                card['status'] = 'missing'
                if token:
                    notes.append(f'Old page shows patch photo {token.upper()} but the filestore has no {slug}-patch-{token}.jpg.')
            cards.append(card)
    # Photos the old page did not show, or every photo when there is no old page
    for token in sorted(photos, key=natural):
        if token in used or re.search(r'(front|reverse|back)$', token):
            continue
        letter = token[0].upper()
        if letter not in patch_types:
            notes.append(f'Patch photo {photos[token][1]} has no type letter.')
            continue
        card = {'type': letter}
        years = type_years(letter, intro, active, last)
        if years:
            card['years'] = years
        if token != letter.lower():
            card['note'] = f'variation {token.upper()}'
        card.update(photo_card(token))
        cards.append(card)
    # Every type the badge was offered in gets a slot
    have = {c['type'] for c in cards}
    for letter in patch_types:
        if letter in have:
            continue
        years = type_years(letter, intro, active, last)
        if not years:
            continue
        if letter == 'M' and not active:
            continue
        card = {'type': letter, 'years': years, 'status': 'unknown' if letter == 'I' else 'missing'}
        if letter in ('L', 'M'):
            card['note'] = {'L': 'Since 1910 back', 'M': 'Scouting America back'}[letter]
        cards.append(card)
    # Type J starts in 2002, as most references say (Bucky chose this over his
    # old pages' 2003)
    for c in cards:
        if c['type'] == 'J' and str(c.get('years', '')).startswith('2003'):
            c['years'] = '2002' + str(c['years'])[4:]
    # Type L ends in 2025 and Type M starts then
    for c in cards:
        if c['type'] == 'L' and active and str(c.get('years', '')).endswith('current'):
            c['years'] = c['years'].replace('current', '2025')
        if c['type'] == 'M':
            c['years'] = '2026-current' if slug_m_2026 else '2025-current'
            c.setdefault('note', 'Scouting America back')
    if slug_m_2026:
        cards = [c for c in cards if c['type'] != 'L']
    # Processed front/back pairs in the filestore (e.g. the Type M eBay photos, cut
    # out with prepare-patch-photo.mjs): the front fills an empty card
    for c in cards:
        t = c['type'].lower()
        for side in ('front', 'reverse'):
            hit = photos.get(f'{t}-{side}')
            if not hit:
                continue
            folder, f = hit
            out = f'{slug}-patch-{t}-{side}.webp'
            save_image(os.path.join(folder, f), os.path.join(WEB_PHOTOS, slug, out), 500)
            if side == 'front' and not c.get('image'):
                c['image'] = web_path(slug, out)
                c.pop('status', None)
            elif not any(m['image'].endswith(out) for m in c.get('more', [])):
                c.setdefault('more', []).append({'image': web_path(slug, out),
                                                 'label': f"{c['type']} {'front' if side == 'front' else 'back'}"})
    # Lineage notes for a patch type, such as Stalking's 2010 Tracking badges
    for c in cards:
        c.update(LINEAGE.get(slug, {}).get('patches', {}).get(c['type'], {}))
    # Fronts and backs from the archive go with the first card of their type
    codes = archive_codes(name, slug)
    archive_used.update(codes)
    # A code can be shared by related badges (Insect Life, Insect Study): each
    # photo goes to the badge that was offered during that patch type's years
    files = sorted((x for c in codes for x in archive[c] if archive_owner(c, x[0][0].upper()) == slug),
                   key=lambda x: natural(x[0]))
    for variant, side, f in files:
        letter = variant[0].upper()
        target = next((c for c in cards if c['type'] == letter), None)
        if not target:
            notes.append(f'Archive photo {f} has no Type {letter} card.')
            continue
        out = f"{slug}-patch-{variant.lower().strip('-')}-{side}.webp"
        save_image(os.path.join(ARCHIVE, f), os.path.join(WEB_PHOTOS, slug, out), 500)
        label = f"{letter} variation {variant.upper().strip('-')}, {'front' if side == 'front' else 'back'}" \
            if letter == 'H' else f"{variant.upper().strip('-')} {'front' if side == 'front' else 'back'}"
        target.setdefault('more', []).append({'image': web_path(slug, out), 'label': label})
    # Fronts and backs from the 2017 site backup, unless the archive already had that one
    from_backup = [x for k in keys_for(slug, name) for x in backup.get(k, [])]
    for variant, side, f in sorted(from_backup, key=lambda x: natural(x[0])):
        letter = variant[0].upper()
        target = next((c for c in cards if c['type'] == letter), None)
        out = f"{slug}-patch-{variant.lower()}-{side}.webp"
        if not target or any(m['image'].endswith(out) for m in target.get('more', [])):
            continue
        save_image(os.path.join(BACKUP, f), os.path.join(WEB_PHOTOS, slug, out), 500)
        label = f"{variant.upper()} {'front' if side == 'front' else 'back'}"
        target.setdefault('more', []).append({'image': web_path(slug, out), 'label': label})
    if not files and not from_backup:
        notes.append('No patch fronts/backs found in the E: archive or the 2017 backup for this badge.')
    order = list(patch_types)
    return sorted(cards, key=lambda c: order.index(c['type']))


def build_covers(slug, printings, not_made_years, active, intro, last, notes):
    own_names = {slug, *MERGED_FOLDERS.get(slug, [])}
    cards, extras, hardcovers, badge_backs = {}, [], [], []
    for folder, f in folder_files(COVERS, slug):
        low = f.lower().replace(' ', '')
        if re.search(r'dup\d*\.', low):
            continue
        # A back cover photo kept with the badge, e.g. back-agribusiness-9b-2.jpg
        # for the workbook's back "back-9b-2"
        b = re.match(r'^back-(?:.+?-)?(\d+[a-z]?(?:-\d+)?)\.(jpg|jpeg|png)$', low)
        if b:
            out = low.rsplit('.', 1)[0] + '.webp'
            save_image(os.path.join(folder, f), os.path.join(WEB_PHOTOS, slug, out), 1000)
            badge_backs.append((f'back-{b.group(1)}', web_path(slug, out)))
            continue
        h = HC_TOKEN.match(low)
        if h:
            tok = h.group('tok')
            hc_type = f"Misc {tok.split('-')[-1].upper()}" if tok.startswith('hc-misc') else tok.upper()
            out = f"{slug}-{tok}{h.group('num')}{h.group('v') or ''}.webp"
            save_image(os.path.join(folder, f), os.path.join(WEB_PHOTOS, slug, out), 500)
            item = {'type': hc_type, 'image': web_path(slug, out)}
            if h.group('num') or h.group('v'):
                item['label'] = f"Type {hc_type} ({h.group('num')}{h.group('v') or ''})"
            hardcovers.append(item)
            continue
        m = COVER_TOKEN.match(low)
        if not m:
            extras.append(f)
            continue
        tok = m.group('tok')
        prefix = m.group('prefix')
        card_type = tok.upper().replace('-OVER-', ' over ').replace('-ES', '-ES')
        out = f'{prefix}-{tok}{m.group("back") or ""}.webp'
        save_image(os.path.join(folder, f), os.path.join(WEB_PHOTOS, slug, out), 1000)
        if m.group('back'):
            extras.append((card_type, web_path(slug, out), f'{card_type} back'))
            continue
        card = cards.setdefault(card_type, {'type': card_type})
        card['image'] = web_path(slug, out)
        if prefix not in own_names and squash(prefix) not in keys_for(slug, badges[slug]):
            card['note'] = cover_title(prefix)
    # Covers in the printings without a photo
    for p in printings:
        cover = p.get('cover')
        if not cover or cover in cards:
            continue
        if any(cover.startswith(f'{c}-') for c in cards) or any(c.startswith(f'{cover}-') for c in cards):
            continue
        cards[cover] = {'type': cover, 'status': 'missing'}
    # 2009: the Type 10B covers were never printed for many badges
    if 2009 in not_made_years and not any(t.startswith('10B') for t in cards):
        cards['10B'] = {'type': '10B', 'years': '2009', 'status': 'notMade',
                        'placeholder': f"/history/0-type/not-made-10b{'-e' if slug in EAGLE_2009 else ''}.webp"}
    for item in extras:
        if isinstance(item, tuple):
            card_type, path, label = item
            target = cards.get(card_type) or next((c for t, c in cards.items() if t.startswith(card_type)), None)
            if target:
                target.setdefault('more', []).append({'image': path, 'label': label})
                continue
            notes.append(f'Back photo for {card_type} has no matching cover card.')
        else:
            notes.append(f'Cover file not used (name not understood): {item}')
    # A badge's own back cover photos go with the covers printed with that back
    for back, path in badge_backs:
        used = {p.get('cover') for p in printings if p.get('back', '').lower() == back}
        targets = [c for t, c in cards.items() if t in used or any(u and u.startswith(f'{t}-') for u in used)]
        for target in targets:
            target.setdefault('more', []).append({'image': path, 'label': back.replace('back-', 'back ').upper().replace('BACK', 'back')})
        if not targets:
            notes.append(f'Back photo {path} matches no printing\'s back.')
    # Printings whose cover matches no card
    types = list(cards)
    for p in printings:
        c = p.get('cover')
        if c and c not in types and not any(c.startswith(f'{t}-') for t in types) and not any(t.startswith(f'{c}-') for t in types):
            notes.append(f"Printing {p['year']} cover {c} has no card.")
    # Natural order, with a cover printed over an older type ("3A over 2") first in its type
    family = lambda t: int(re.match(r'\d+', t).group()) if re.match(r'\d+', t) else 999
    ordered = [cards[t] for t in sorted(cards, key=lambda t: (family(t), ' over ' not in t, natural(t)))]
    return ordered, sorted(hardcovers, key=lambda h: natural(h['type']))


def cover_title(prefix):
    """"craftsmanship-wood" -> "Craftsmanship – Wood"; "wood-work" -> "Wood Work"."""
    for other in sorted(badges, key=len, reverse=True):
        if prefix.startswith(other + '-'):
            return f"{badges[other]} – {prefix[len(other) + 1:].replace('-', ' ').title()}"
    return prefix.replace('-', ' ').title()


# ---------------------------------------------------------------- write
class Dumper(yaml.SafeDumper):
    pass


def flow_list(dumper, data):
    # Short lists of plain values (ranks) on one line
    flow = all(not isinstance(x, (dict, list)) for x in data) and len(data) <= 4
    return dumper.represent_sequence('tag:yaml.org,2002:seq', data, flow_style=flow)


def flow_dict(dumper, data):
    flow = all(not isinstance(v, (dict, list)) for v in data.values()) and 'requirements' not in data \
        and len(str(data)) < 110 and set(data) != {'totalThrough', 'total', 'byYear'}
    return dumper.represent_mapping('tag:yaml.org,2002:map', data.items(), flow_style=flow)


Dumper.add_representer(list, flow_list)
Dumper.add_representer(dict, flow_dict)


def is_generated(path):
    if not os.path.exists(path):
        return True
    with open(path, encoding='utf-8') as f:
        return f.readline().startswith('# Generated')


def write_printings(slug, printings, sheet, not_made_years):
    ppath = os.path.join(DATA, 'printings', f'{slug}.yaml')
    if not (printings or not_made_years) or not is_generated(ppath):
        return
    body = {'printings': printings}
    if not_made_years:
        # Years the workbook marks "not made" (no printing that year)
        body['notMadeYears'] = sorted(not_made_years)
    with open(ppath, 'w', encoding='utf-8') as f:
        f.write(f"# Generated from the 2026 Merit Badge Pamphlets List, sheet {sheet!r}.\n")
        f.write("# status: have = in Bucky's collection, confirmed = known to exist but not in the\n")
        f.write("# collection, listed = on the list without a have/confirmed mark.\n")
        f.write(yaml.dump(body, Dumper=Dumper, sort_keys=False, allow_unicode=True, width=200, indent=4))


# --trivia-for slug,slug: print data-based trivia for hand-curated pages (which a
# normal run never rewrites), to paste into their files, then stop
if '--trivia-for' in sys.argv:
    for slug in sys.argv[sys.argv.index('--trivia-for') + 1].split(','):
        page_data = yaml.safe_load(open(os.path.join(DATA, f'{slug}.yaml'), encoding='utf-8'))
        ppath = os.path.join(DATA, 'printings', f'{slug}.yaml')
        page_printings = yaml.safe_load(open(ppath, encoding='utf-8'))['printings'] if os.path.exists(ppath) else []
        print(f'# {slug}')
        print(yaml.dump({'trivia': data_trivia(page_data, page_printings)}, Dumper=Dumper, sort_keys=False,
                        allow_unicode=True, width=200, indent=4))
    sys.exit()

built, skipped = 0, []
for slug, name in sorted(badges.items()):
    path = os.path.join(DATA, f'{slug}.yaml')
    if not is_generated(path):
        # Hand-curated pages keep their data file, but their printings still
        # come straight from the workbook
        sheet = SHEETS.get(slug) or next((sheet_names[k] for k in keys_for(slug, name) if k in sheet_names), None)
        if sheet:
            curated_printings, curated_not_made = read_printings(sheet)
            write_printings(slug, curated_printings, sheet, curated_not_made)
        skipped.append(slug)
        continue
    data, printings, sheet, not_made_years = build(slug, name)
    body = yaml.dump(data, Dumper=Dumper, sort_keys=False, allow_unicode=True, width=200, indent=4)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(f'# Generated draft by generate_histories.py on {datetime.date.today()} for Bucky\'s review.\n'
                '# Delete this first line once the page is hand-edited, so it is never overwritten.\n'
                '# Story text is Bucky\'s own from his earlier page; timeline facts come from the data.\n\n')
        f.write(body)
    write_printings(slug, printings, sheet, not_made_years)
    built += 1

unused_codes = sorted(set(archive) - archive_used)
with open(os.path.join(scratch, 'generate-report.md'), 'w', encoding='utf-8') as f:
    f.write(f'# History draft generator report\n\nBuilt {built} badges; kept hand-curated: {", ".join(skipped)}.\n\n')
    f.write(f'Archive codes not matched to a badge: {", ".join(unused_codes) or "none"}\n\n')
    for slug in sorted(report):
        if report[slug]:
            f.write(f'## {badges.get(slug, slug)} ({slug})\n\n' + ''.join(f'- {n}\n' for n in report[slug]) + '\n')
print(f'built {built}, kept {skipped}, unmatched archive codes {len(unused_codes)}')
