#!/usr/bin/env node
import { glob, writeFile } from 'node:fs/promises';

const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
];

for await (const file of glob('dist/**/*.html')) {
    const linkUrl = file
        .replace(/^dist\//, '')
        .replace(/(^|\/)index\.html$/, '$1');

    if (linkUrl.match(/^(360|admin)\//)) {
        continue;
    }

    if (linkUrl === '404.html' || linkUrl === 'counselors/about-us/') {
        continue;
    }

    sitemap.push(
        `<url><loc>https://scoutmasterbucky.com/${linkUrl}</loc></url>`
    );
}

sitemap.push('</urlset>');
const content = sitemap.join('\n');
await writeFile('dist/sitemap.xml', content);
