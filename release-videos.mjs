#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';

// Activates merit badge lyric videos once they are public on YouTube.
//
// Scheduled videos are kept in merit-badges.yaml as "# videoCode: <id>". When
// YouTube reports one as public, the line is uncommented and the homepage
// featured video is set to the newest release. Videos release in alphabetical
// order, so the last one activated in file order is the newest.

const badgesFile = 'src/data/merit-badges.yaml';
const homepageFile = 'src/pages/index.astro';

async function isPublic(code) {
    // oEmbed returns 200 for public videos and 401/403 for private or
    // scheduled ones.
    const url = `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(
        `https://www.youtube.com/watch?v=${code}`
    )}`;

    try {
        const response = await fetch(url);

        return response.ok;
    } catch (err) {
        console.error(`Could not check ${code}: ${err.message}`);

        return false;
    }
}

const lines = readFileSync(badgesFile, 'utf8').split('\n');
let badge = null;
let newest = null;

for (let i = 0; i < lines.length; i += 1) {
    const badgeMatch = lines[i].match(/^([a-z0-9-]+):\s*$/);

    if (badgeMatch) {
        badge = badgeMatch[1];
        continue;
    }

    const videoMatch = lines[i].match(/^(\s*)#\s*videoCode:\s*(\S+)\s*$/);

    if (videoMatch && (await isPublic(videoMatch[2]))) {
        lines[i] = `${videoMatch[1]}videoCode: ${videoMatch[2]}`;
        newest = videoMatch[2];
        console.log(`Activated ${badge}: ${videoMatch[2]}`);
    }
}

if (!newest) {
    console.log('No newly released videos.');
    process.exit(0);
}

writeFileSync(badgesFile, lines.join('\n'));

const homepage = readFileSync(homepageFile, 'utf8');
const updated = homepage.replace(
    /^const featuredVideoCode = '[^']*';$/m,
    `const featuredVideoCode = '${newest}';`
);

if (updated === homepage) {
    console.error(`Could not find featuredVideoCode in ${homepageFile}.`);
    process.exit(1);
}

writeFileSync(homepageFile, updated);
console.log(`Featured video set to ${newest}.`);
