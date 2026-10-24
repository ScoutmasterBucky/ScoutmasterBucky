# Merit badge history tools

Scripts that build the draft merit badge history pages
(`src/data/merit-badge-history/<slug>.yaml`, `printings/<slug>.yaml` and the
photos). Run them from the repo root with Python 3
(needs `openpyxl`, `pyyaml`, `beautifulsoup4`, `lxml`, `pypdf`, `pillow`).

## Photos

The history photos are not kept in git. The site shows WebP copies from
`C:/filestore/history/web`, which filestore.scoutmasterbucky.com serves as
`https://filestore.scoutmasterbucky.com/history/web/`, the same way the workbook PDFs
are served. The data keeps paths like `/history/archery/archery-patch-a.webp`, and
`historyPhoto()` in `src/utils/merit-badge-history.ts` points them at the filestore.

- The generator and `prepare-hardcover-thumbs.mjs` write their WebP copies there.
- Any other photo (a type sample in `0-type`, a back cover in `0-back-covers`):
  `node history-tools/web-photos.mjs convert <folder>` copies every .jpg/.png in the
  folder into the web folder as WebP, keeping the same relative paths.
- After adding or removing a `0-type` or `0-back-covers` photo, run
  `node history-tools/web-photos.mjs list` (convert does this too). The site is built
  on GitHub, which can't see the filestore, so `shared-photos.json` tells the pages
  which of those photos exist.

## Rerun the drafts

1. Save a copy of the Merit Badge Pamphlets List workbook as
   `history-tools/sources/mbp-list.xlsx`, then cache it (this takes a few minutes):

   ```
   python history-tools/cache_workbook.py history-tools/sources/mbp-list.xlsx history-tools/sources/workbook.json
   ```

2. Build the drafts:

   ```
   python history-tools/generate_histories.py . history-tools/sources
   ```

3. Read `history-tools/sources/generate-report.md` for what needs checking, badge by badge.

4. If any `0-type` or `0-back-covers` photo changed: `node history-tools/web-photos.mjs list`.

Stop the dev server while the generator runs; it writes thousands of photos and
the server runs out of file handles.

## Safe for hand edits

A data file is only overwritten while its first line starts with `# Generated`.
Delete that line once a page has been edited by hand (as with `archery.yaml`
and `woodwork.yaml`) and the generator leaves it, and its photos, alone.

## What else it reads

- `C:/filestore/history/merit-badges` and `merit-badge-pamphlets`: patch, cover and hard cover photos
- `E:/Scouting/SMBWeb/*-History.htm`: the old history pages (fields, story text, patch table)
- `E:/Scouting/Archive/from 351 drive Scouts/Merit Badge History`: patch fronts and backs
- `sources/official.json`: official counts and ranks, rebuilt from `sources/official/` with
  `python history-tools/parse_official.py history-tools/sources/official history-tools/sources/official.json`
- `sources/web/usscouts-history.html`: first and last year each badge was offered
- `sources/official/handbook-1911.txt`: the 1911 requirements (Project Gutenberg)

The workbook and its cache stay out of git because they include collection values.
