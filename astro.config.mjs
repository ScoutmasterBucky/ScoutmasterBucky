// @ts-check
import { defineConfig } from 'astro/config';
import yaml from '@rollup/plugin-yaml';
import { literalsHtmlCssMinifier } from '@literals/rollup-plugin-html-css-minifier';
import fs from 'node:fs';
import path from 'node:path';

// The merit badge history photos are served by filestore.scoutmasterbucky.com on
// the live site. The dev server serves them from Bucky's local copy instead, at
// /filestore-history/ (see historyPhoto() in src/utils/merit-badge-history.ts).
const HISTORY_PHOTOS = 'C:/filestore/history/web';

/** @type {import('vite').Plugin} */
const localHistoryPhotos = {
    name: 'local-history-photos',
    configureServer(server) {
        server.middlewares.use('/filestore-history', (req, res, next) => {
            const file = path.join(HISTORY_PHOTOS, decodeURIComponent((req.url ?? '').split('?')[0]));
            if (!file.startsWith(path.normalize(HISTORY_PHOTOS)) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
                return next();
            }
            res.setHeader('Content-Type', file.endsWith('.webp') ? 'image/webp' : 'application/octet-stream');
            fs.createReadStream(file).pipe(res);
        });
    },
};

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [literalsHtmlCssMinifier(), yaml(), localHistoryPhotos],
    },
});
