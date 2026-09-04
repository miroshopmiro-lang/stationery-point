#!/usr/bin/env node
// Pack-shot pipeline: client pack photos -> square catalogue images.
//
// Use this, NOT shoot.mjs, when the photo is already a close-up of the product
// pack. shoot.mjs runs AI background removal, which on printed packaging eats
// the artwork itself (verified 2026-09-04: a Faber-Castell box lost its green
// ground, red frame and brand name; a Parker blister lost its whole black card).
//
// What this does instead:
//   - crops away the dark counter surround, keeping the pack
//   - contains the pack on a neutral square bed with an even margin
//   - exports 1200x1200 WebP named after the file
//
// The bed is #E0DED9 (warm neutral grey), per the reference audit: a blue bed
// fights blue school products. Brand indigo stays a section colour, not a bed.
//
// Usage:
//   node pack-shots.mjs <photo-or-folder> [output-folder]

import sharp from 'sharp';
import { readdirSync, statSync, mkdirSync } from 'node:fs';
import { basename, extname, join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const CANVAS = 1200;
const MARGIN = 0.06; // fraction of canvas left clear on each side
const BED = { r: 224, g: 222, b: 217 }; // #E0DED9
const DARK = 62; // luminance at or below this counts as counter, not pack

const [, , inputArg, outArg] = process.argv;
if (!inputArg) {
  console.error('Usage: node pack-shots.mjs <photo-or-folder> [output-folder]');
  process.exit(1);
}
const outDir = resolve(outArg || join(HERE, '..', '..', 'public', 'shop-catalogue-images'));
mkdirSync(outDir, { recursive: true });

const slugify = (s) =>
  s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');

// Bounding box of everything brighter than the dark counter. Scans a downscaled
// copy for speed, then scales the box back up. Falls back to the full frame if
// the pack itself is dark enough to swallow the whole image.
async function packBox(file) {
  const SCAN = 240;
  const { data, info } = await sharp(file)
    .resize(SCAN, SCAN, { fit: 'inside' })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const rowHit = new Array(info.height).fill(0);
  const colHit = new Array(info.width).fill(0);
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      if (data[y * info.width + x] > DARK) {
        rowHit[y]++;
        colHit[x]++;
      }
    }
  }
  // A row/column belongs to the pack once a tenth of it is bright. That ignores
  // glare specks on the counter without trimming into a dark pack edge.
  const minRow = Math.max(2, Math.round(info.width * 0.1));
  const minCol = Math.max(2, Math.round(info.height * 0.1));
  const span = (hits, min) => {
    let a = hits.findIndex((h) => h >= min);
    let b = hits.length - 1 - [...hits].reverse().findIndex((h) => h >= min);
    return a < 0 || b < a ? null : [a, b];
  };
  const ys = span(rowHit, minRow);
  const xs = span(colHit, minCol);
  const meta = await sharp(file).metadata();
  if (!ys || !xs) return { left: 0, top: 0, width: meta.width, height: meta.height };

  const sx = meta.width / info.width;
  const sy = meta.height / info.height;
  const left = Math.max(0, Math.floor(xs[0] * sx));
  const top = Math.max(0, Math.floor(ys[0] * sy));
  const width = Math.min(meta.width - left, Math.ceil((xs[1] - xs[0] + 1) * sx));
  const height = Math.min(meta.height - top, Math.ceil((ys[1] - ys[0] + 1) * sy));

  // Refuse a crop that threw away more than half the frame — that means the
  // detection misfired, and a wrong crop is worse than an untrimmed photo.
  if (width * height < meta.width * meta.height * 0.5) {
    return { left: 0, top: 0, width: meta.width, height: meta.height };
  }
  return { left, top, width, height };
}

async function processOne(file) {
  const name = slugify(basename(file, extname(file)));
  const outPath = join(outDir, `${name}.webp`);
  process.stdout.write(`→ ${basename(file)} … `);

  const box = await packBox(file);
  const inner = Math.round(CANVAS * (1 - MARGIN * 2));
  const pack = await sharp(file)
    .extract(box)
    .resize(inner, inner, { fit: 'inside', withoutEnlargement: false })
    .toBuffer();
  const meta = await sharp(pack).metadata();

  await sharp({
    create: { width: CANVAS, height: CANVAS, channels: 3, background: BED },
  })
    .composite([
      {
        input: pack,
        top: Math.round((CANVAS - meta.height) / 2),
        left: Math.round((CANVAS - meta.width) / 2),
      },
    ])
    .webp({ quality: 86 })
    .toFile(outPath);

  console.log(`done (${box.width}x${box.height} crop) → ${basename(outPath)}`);
}

const target = resolve(inputArg);
const files = statSync(target).isDirectory()
  ? readdirSync(target)
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .map((f) => join(target, f))
  : [target];

console.log(`Processing ${files.length} pack photo(s) → ${outDir}\n`);
for (const f of files) await processOne(f);
console.log('\nAll done.');
