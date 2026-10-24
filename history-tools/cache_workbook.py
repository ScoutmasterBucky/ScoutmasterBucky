"""Cache the parts of the 263 MB pamphlet workbook the generator needs as JSON:
the Historical Count rows and every badge sheet's rows (values only)."""
import datetime
import json
import sys
import warnings

import openpyxl

warnings.filterwarnings('ignore')
wb = openpyxl.load_workbook(sys.argv[1], read_only=True, data_only=True)


def plain(v):
    if isinstance(v, datetime.datetime):
        return {'date': v.isoformat()}
    if isinstance(v, float) and v.is_integer():
        return int(v)
    return v


out = {}
for ws in wb.worksheets:
    rows = []
    for row in ws.iter_rows(values_only=True):
        row = [plain(v) for v in row]
        while row and row[-1] is None:
            row.pop()
        rows.append(row)
    while rows and not rows[-1]:
        rows.pop()
    out[ws.title] = rows
    print(ws.title, len(rows))

json.dump(out, open(sys.argv[2], 'w', encoding='utf-8'))
