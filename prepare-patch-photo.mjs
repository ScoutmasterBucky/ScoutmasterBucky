#!/usr/bin/env node
// Clean up a merit badge (patch) photo for the history pages: optionally crop
// and rotate it, find the round badge, cut away the background, and save a
// transparent PNG.
//
//   node prepare-patch-photo.mjs <input> <output.png> [--rotate=-90] [--crop=x,y,w,h] [--size=500] [--threshold=45]
//
// --rotate   degrees clockwise (negative is counterclockwise), applied after --crop
// --crop     region of the input to use, e.g. one badge from a front-and-back photo
// --size     longest side of the output in pixels
// --threshold how different from the background a pixel must be to count as badge
import sharp from 'sharp';

const [input, output, ...flags] = process.argv.slice(2);
if (!input || !output) {
    console.error('usage: node prepare-patch-photo.mjs <input> <output.png> [--rotate=deg] [--crop=x,y,w,h] [--size=px] [--threshold=n]');
    process.exit(1);
}

const option = name => flags.find(f => f.startsWith(`--${name}=`))?.split('=')[1];
const rotate = Number(option('rotate') ?? 0);
const size = Number(option('size') ?? 500);
const threshold = Number(option('threshold') ?? 45);
const crop = option('crop')?.split(',').map(Number);

let image = sharp(input);
if (crop) {
    const [left, top, width, height] = crop;
    image = image.extract({ left, top, width, height });
}
const prepared = await image.rotate(rotate, { background: '#ffffff' }).flatten({ background: '#ffffff' }).toBuffer();

const { data, info } = await sharp(prepared).raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
const pixel = (x, y) => {
    const i = (y * width + x) * channels;
    return [data[i], data[i + 1], data[i + 2]];
};

// Background colour: the average of the four corners
const corners = [];
for (const [cx, cy] of [[0, 0], [width - 10, 0], [0, height - 10], [width - 10, height - 10]]) {
    for (let y = cy; y < cy + 10; y++) {
        for (let x = cx; x < cx + 10; x++) {
            corners.push(pixel(x, y));
        }
    }
}
const background = [0, 1, 2].map(c => corners.reduce((sum, p) => sum + p[c], 0) / corners.length);
const isBadge = (x, y) => {
    const p = pixel(x, y);
    return Math.hypot(p[0] - background[0], p[1] - background[1], p[2] - background[2]) > threshold;
};

// The badge's extent: rows and columns where a real share of pixels differ from
// the background (ignores stray specks and scanner noise)
const rows = [];
const cols = new Array(width).fill(0);
for (let y = 0; y < height; y++) {
    let count = 0;
    for (let x = 0; x < width; x++) {
        if (isBadge(x, y)) {
            count++;
            cols[x]++;
        }
    }
    rows.push(count);
}
const minRow = width * 0.05;
const minCol = height * 0.05;
const top = rows.findIndex(n => n > minRow);
const bottom = rows.findLastIndex(n => n > minRow);
const left = cols.findIndex(n => n > minCol);
const right = cols.findLastIndex(n => n > minCol);
if (top < 0 || left < 0) {
    console.error('Could not find the badge; try a different --threshold or --crop.');
    process.exit(1);
}

// Merit badges are round: fit a circle to the badge's outline (the first and
// last badge pixel on each row and column inside the extent), which is not
// thrown off by a soft shadow on one side the way the plain extent is
const edge = [];
for (let y = top; y <= bottom; y++) {
    if (rows[y] <= minRow) continue;
    let x0 = left;
    while (x0 < right && !isBadge(x0, y)) x0++;
    let x1 = right;
    while (x1 > left && !isBadge(x1, y)) x1--;
    edge.push([x0, y], [x1, y]);
}
for (let x = left; x <= right; x++) {
    if (cols[x] <= minCol) continue;
    let y0 = top;
    while (y0 < bottom && !isBadge(x, y0)) y0++;
    let y1 = bottom;
    while (y1 > top && !isBadge(x, y1)) y1--;
    edge.push([x, y0], [x, y1]);
}

// Least-squares circle fit (Kasa): solve for x² + y² + Dx + Ey + F = 0
const sums = { x: 0, y: 0, xx: 0, yy: 0, xy: 0, xz: 0, yz: 0, z: 0, n: edge.length };
for (const [x, y] of edge) {
    const z = x * x + y * y;
    sums.x += x; sums.y += y; sums.xx += x * x; sums.yy += y * y; sums.xy += x * y;
    sums.xz += x * z; sums.yz += y * z; sums.z += z;
}
const solve3 = (m, v) => {
    const det = a =>
        a[0][0] * (a[1][1] * a[2][2] - a[1][2] * a[2][1]) -
        a[0][1] * (a[1][0] * a[2][2] - a[1][2] * a[2][0]) +
        a[0][2] * (a[1][0] * a[2][1] - a[1][1] * a[2][0]);
    const d = det(m);
    return [0, 1, 2].map(i => det(m.map((row, r) => row.map((cell, c) => (c === i ? v[r] : cell)))) / d);
};
const [D, E, F] = solve3(
    [
        [sums.xx, sums.xy, sums.x],
        [sums.xy, sums.yy, sums.y],
        [sums.x, sums.y, sums.n],
    ],
    [-sums.xz, -sums.yz, -sums.z]
);
const cx = -D / 2;
const cy = -E / 2;
// Pull the edge in slightly so no background halo is left around the border
const radius = Math.sqrt(cx * cx + cy * cy - F) * 0.985;
const side = Math.ceil(radius * 2);
const square = {
    left: Math.max(0, Math.round(cx - side / 2)),
    top: Math.max(0, Math.round(cy - side / 2)),
};
square.width = Math.min(side, width - square.left);
square.height = Math.min(side, height - square.top);

const mask = Buffer.from(
    `<svg width="${square.width}" height="${square.height}"><circle cx="${cx - square.left}" cy="${cy - square.top}" r="${radius}" fill="#fff"/></svg>`
);

await sharp(prepared)
    .extract(square)
    .ensureAlpha()
    .composite([{ input: mask, blend: 'dest-in' }])
    .resize({ width: size, height: size, fit: 'inside', withoutEnlargement: true })
    .png()
    .toFile(output);

console.log(`${output}: badge ${square.width}x${square.height}px at ${square.left},${square.top}, rotated ${rotate}°`);
