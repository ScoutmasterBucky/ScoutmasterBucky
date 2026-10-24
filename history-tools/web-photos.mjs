#!/usr/bin/env node
// The history photos the site shows live on the filestore, not in git:
// C:/filestore/history/web is served as https://filestore.scoutmasterbucky.com/history/web.
// The site's data keeps paths like /history/<slug>/<file>.webp, and
// historyPhoto() in src/utils/merit-badge-history.ts points them at the filestore.
//
//   node history-tools/web-photos.mjs convert <folder>   copy every .jpg/.png under <folder> into
//                                                       the web folder as WebP, same relative paths
//   node history-tools/web-photos.mjs list               only rewrite the list of shared photos
//
// Both finish by writing src/data/merit-badge-history/shared-photos.json, the photos in
// 0-type and 0-back-covers, which the pages check before showing one (the site is built
// on GitHub, where the filestore can't be looked at).
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

const sharp = createRequire(import.meta.url)('sharp');
export const WEB = 'C:/filestore/history/web';
const SHARED = ['0-type', '0-back-covers'];

const [command, folder] = process.argv.slice(2);

if (command === 'convert') {
    if (!folder) throw new Error('usage: web-photos.mjs convert <folder>');
    let before = 0, after = 0, count = 0;
    for (const file of fs.readdirSync(folder, { recursive: true })) {
        const source = path.join(folder, file);
        if (!/\.(jpe?g|png)$/i.test(file) || !fs.statSync(source).isFile()) continue;
        const target = path.join(WEB, file).replace(/\.(jpe?g|png)$/i, '.webp');
        fs.mkdirSync(path.dirname(target), { recursive: true });
        // The longest side is capped at 1000 pixels, more than the pages ever show
        await sharp(source)
            .resize({ width: 1000, height: 1000, fit: 'inside', withoutEnlargement: true })
            .webp({ quality: 80, alphaQuality: 90, effort: 6 })
            .toFile(target);
        before += fs.statSync(source).size;
        after += fs.statSync(target).size;
        count++;
    }
    console.log(`${count} photos: ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(1)} MB`);
} else if (command !== 'list') {
    throw new Error('usage: web-photos.mjs convert <folder> | list');
}

const shared = SHARED.flatMap(dir =>
    fs.existsSync(path.join(WEB, dir))
        ? fs.readdirSync(path.join(WEB, dir)).filter(f => f.endsWith('.webp')).map(f => `/history/${dir}/${f}`)
        : []
).sort();
fs.writeFileSync(
    'src/data/merit-badge-history/shared-photos.json',
    JSON.stringify(shared, null, 4) + '\n'
);
console.log(`${shared.length} shared photos listed`);
