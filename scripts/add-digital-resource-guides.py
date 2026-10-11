"""Add Scouting America's Digital Resource Guide link to each badge's Resources list, right under
the badge's workbook and class preparation page links (Bucky, 2026-10-11).
    python scripts/add-digital-resource-guides.py
Re-running is safe: a badge that already lists its guide gets its link updated, not duplicated."""
import os, re

SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = 'https://www.scouting.org/skills/merit-badges/digital-resource-guides/'
# site badge slug -> Scouting America guide slug (checked 2026-10-11; all load)
GUIDES = {
    'aviation': 'aviation', 'camping': 'camping', 'citizenship-in-the-community': 'citizenship-community',
    'citizenship-in-the-nation': 'citizenship-nation', 'citizenship-in-the-world': 'citizenship-in-the-world',
    'communication': 'communication', 'competitive-gaming': 'competitive-gaming', 'cooking': 'cooking',
    'cycling': 'cycling', 'environmental-science': 'environmental-science', 'family-life': 'family-life',
    'fingerprinting': 'fingerprinting', 'hiking': 'hiking', 'law': 'law', 'personal-fitness': 'personal-fitness',
    'personal-management': 'personal-management', 'photography': 'photography', 'scholarship': 'scholarship',
    'space-exploration': 'space-exploration', 'sustainability': 'sustainability', 'swimming': 'swimming',
    'wildland-fire-management': 'wildland-fire-management',
}


def title(slug):
    small = {'in', 'the', 'and', 'of'}
    return ' '.join(w if (i and w in small) else w.capitalize() for i, w in enumerate(slug.split('-')))


for slug, guide in GUIDES.items():
    path = os.path.join(SITE, 'src', 'data', 'merit-badges', slug, 'resources.yaml')
    text = open(path, encoding='utf-8').read()
    url = BASE + guide + '/'
    entry = (f'- name: {title(slug)} Merit Badge Digital Resource Guide (Scouting America)\n'
             f'  shortName: Digital Resource Guide\n'
             f'  url: {url}\n')
    items = re.split(r'(?m)^(?=- )', text)
    head, items = (items[0], items[1:]) if not items[0].startswith('- ') else ('', items)
    existing = [k for k, it in enumerate(items) if 'Digital Resource Guide' in it]
    if existing:
        items[existing[0]] = entry
        status = 'updated'
    else:
        anchors = [k for k, it in enumerate(items) if re.search(r'(?m)^- name:.*(Workbook|Class Preparation Page)', it)]
        at = (anchors[-1] + 1) if anchors else len(items)
        if at > 0 and not items[at - 1].endswith('\n'):
            items[at - 1] += '\n'
        items.insert(at, entry)
        status = f'added after item {at}'
    open(path, 'w', encoding='utf-8', newline='\n').write(head + ''.join(items))
    print(f'{slug:30} {status}')
