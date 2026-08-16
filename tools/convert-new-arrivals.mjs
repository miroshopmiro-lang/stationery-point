import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sharp = require(path.join(ROOT, 'tools/product-shots/node_modules/sharp'));

const PUBLIC_CATALOGUE = path.join(ROOT, 'public', 'shop-catalogue-images');
const ORIGINALS = path.join(ROOT, 'asset-originals');

const files = ['gel_pens', 'highlighters'];

fs.mkdirSync(ORIGINALS, { recursive: true });

for (const name of files) {
  const jpgPath = path.join(PUBLIC_CATALOGUE, `${name}.jpg`);
  const webpPath = path.join(PUBLIC_CATALOGUE, `${name}.webp`);

  if (!fs.existsSync(jpgPath)) {
    console.error(`Missing: ${jpgPath}`);
    continue;
  }

  // Save original jpg to asset-originals
  const originalCopy = path.join(ORIGINALS, `${name}.jpg`);
  fs.copyFileSync(jpgPath, originalCopy);

  const metadata = await sharp(jpgPath).metadata();
  console.log(`Original ${name}.jpg: ${metadata.width}x${metadata.height}, ${fs.statSync(jpgPath).size} bytes`);

  const width = Math.min(metadata.width || 800, 800);
  const height = Math.min(metadata.height || 800, 800);

  const buf = await sharp(jpgPath)
    .rotate()
    .resize(width, height, { fit: 'cover', position: 'centre' })
    .webp({ quality: 82, effort: 6 })
    .toBuffer();

  fs.writeFileSync(webpPath, buf);
  console.log(`Converted -> ${name}.webp: ${width}x${height}, ${buf.length} bytes`);
}
