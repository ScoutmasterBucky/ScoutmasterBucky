"""Pull the merit badge requirements out of the 1911 Official Handbook for Boys
(Project Gutenberg text). Returns {badge name: [requirement, ...]}."""
import re


def parse(path):
    text = open(path, encoding='utf-8').read().replace('\r\n', '\n')
    # Page markers like {25} sit in the middle of sentences
    # A marker on its own line between paragraphs keeps the paragraph break
    text = re.sub(r'\n\s*\n\{\d+\}\s*\n\s*\n', '\n\n', text)
    text = re.sub(r'\s*\{\d+\}\s*', ' ', text)
    badges = {}
    header = (r'To obtain a merit badge for ([A-Z][A-Za-z ]+?)'
              r'(?:,?\s+a\.?\s+scout\s+must(?:\s+be\s+able\s+to\s+pass\s+the\s+following\s+test:)?)?\s*\n')
    for m in re.finditer(header, text):
        name = re.sub(r'\s+', ' ', m.group(1)).strip()
        rest = text[m.end():]
        # The block ends at the next badge's illustration or heading
        end = re.search(r'\n\s*\[Illustration|\n\n[A-Z][A-Za-z ]+\n\n|To obtain a merit badge', rest)
        block = rest[: end.start() if end else 3000]
        items, current = [], None
        for para in re.split(r'\n\s*\n', block):
            para = re.sub(r'\s+', ' ', para).strip()
            if not para:
                continue
            num = re.match(r'^(\d+)\.\s*(.*)', para)
            if num:
                current = num.group(2)
                items.append(current)
            elif items:
                # A continuation such as a list of alternatives under one requirement
                items[-1] = f'{items[-1]} {para}'
            else:
                items.append(para)
        badges[name] = [re.sub(r'\s+', ' ', i).strip() for i in items if i.strip()]
    return badges


if __name__ == '__main__':
    import sys
    found = parse(sys.argv[1])
    print(len(found))
    for name, reqs in found.items():
        print(f'{name}: {len(reqs)} | {reqs[0][:70] if reqs else ""} || {reqs[-1][-60:] if reqs else ""}')
