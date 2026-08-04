#!/usr/bin/env node
// Product-shot pipeline: turns ordinary phone photos into clean catalog shots.
//   - removes the background (local AI model, no API cost)
//   - trims, centres the product on a white square canvas
//   - adds a soft floor shadow
//   - exports 1200x1200 WebP named after the file, ready for the CMS
//
// Usage:
//   node shoot.mjs <photo.jpg | folder> [output-folder]
//
// Default output: ../../public/shop-catalogue-images (the site's media folder).

import { removeBackground } from '@imgly/background-removal-node';
import sharp from 'sharp';
import { readdirSync, statSync, mkdirSync } from 'node:fs';
import { basename, extname, join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const CANVAS = 1200;
const PRODUCT_MAX = Math.round(CANVAS * 0.8);

const [, , inputArg, outArg] = process.argv;
if (!inputArg) {
  console.error('Usage: node shoot.mjs <photo-or-folder> [output-folder]');
  process.exit(1);
}
const outDir = resolve(outArg || join(HERE, '..', '..', 'public', 'shop-catalogue-images'));
mkdirSync(outDir, { recursive: true });

const slugify = (s) =>
  s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');

async function processOne(file) {
  const name = slugify(basename(file, extname(file)));
  const outPath = join(outDir, `${name}.webp`);
  process.stdout.write(`→ ${basename(file)} … `);

  // 1. Background removal (returns a PNG blob with alpha).
  const blob = await removeBackground(pathToFileURL(file).href);
  const cutout = Buffer.from(await blob.arrayBuffer());

  // 2. Trim empty space, fit inside the product box.
  const trimmed = await sharp(cutout).trim().toBuffer();
  const product = await sharp(trimmed)
    .resize(PRODUCT_MAX, PRODUCT_MAX, { fit: 'inside', withoutEnlargement: false })
    .toBuffer();
  const meta = await sharp(product).metadata();

  // 3. Soft floor shadow: blurred grey ellipse under the product.
  const shadowW = Math.round(meta.width * 0.85);
  const shadowH = Math.round(Math.max(30, meta.height * 0.07));
  const shadow = Buffer.from(
    `<svg width="${CANVAS}" height="${CANVAS}">
       <ellipse cx="${CANVAS / 2}" cy="0" rx="${shadowW / 2}" ry="${shadowH}"
                fill="rgb(30,30,45)" fill-opacity="0.16" filter="url(#b)"/>
       <filter id="b"><feGaussianBlur stdDeviation="14"/></filter>
     </svg>`
  );

  const productTop = Math.round((CANVAS - meta.height) / 2) - 20;
  const shadowY = productTop + meta.height + 8;

  // 4. Compose on white and export.
  await sharp({ create: { width: CANVAS, height: CANVAS, channels: 3, background: '#ffffff' } })
    .composite([
      { input: shadow, top: shadowY, left: 0 },
      { input: product, top: productTop, left: Math.round((CANVAS - meta.width) / 2) },
    ])
    .webp({ quality: 84 })
    .toFile(outPath);

  console.log(`done → ${outPath}`);
}

const target = resolve(inputArg);
const files = statSync(target).isDirectory()
  ? readdirSync(target)
      .filter((f) => /\.(jpe?g|png|webp|heic)$/i.test(f))
      .map((f) => join(target, f))
  : [target];

console.log(`Processing ${files.length} photo(s) → ${outDir}\n(first run downloads the AI model, ~80 MB — be patient)\n`);
for (const f of files) {
  try {
    await processOne(f);
  } catch (e) {
    console.error(`FAILED ${basename(f)}: ${e.message}`);
  }
}
console.log('\nAll done. Photos are ready to attach to products in /admin.');
