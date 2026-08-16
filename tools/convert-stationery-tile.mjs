import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sharp = require(path.join(ROOT, 'tools/product-shots/node_modules/sharp'));

const SRC_IMAGE = "C:\\Users\\risha\\.gemini\\antigravity-ide\\brain\\a5fd220e-0cc9-49c7-acd9-0ffa76bff41c\\media__1786589156392.jpg";
const DEST_DIR = path.join(ROOT, 'public', 'category-tiles');
const ORIGINALS_DIR = path.join(ROOT, 'asset-originals', 'category-tiles');

fs.mkdirSync(DEST_DIR, { recursive: true });
fs.mkdirSync(ORIGINALS_DIR, { recursive: true });

// Copy original image
fs.copyFileSync(SRC_IMAGE, path.join(ORIGINALS_DIR, 'stationery.jpg'));

// Process 1200x1500 (stationery.webp)
const buf1200 = await sharp(SRC_IMAGE)
  .rotate()
  .resize(1200, 1500, { fit: 'cover', position: 'centre' })
  .webp({ quality: 84, effort: 6 })
  .toBuffer();

fs.writeFileSync(path.join(DEST_DIR, 'stationery.webp'), buf1200);
console.log(`Converted -> stationery.webp (1200x1500): ${buf1200.length} bytes`);

// Process 600x750 (stationery-600.webp)
const buf600 = await sharp(SRC_IMAGE)
  .rotate()
  .resize(600, 750, { fit: 'cover', position: 'centre' })
  .webp({ quality: 82, effort: 6 })
  .toBuffer();

fs.writeFileSync(path.join(DEST_DIR, 'stationery-600.webp'), buf600);
console.log(`Converted -> stationery-600.webp (600x750): ${buf600.length} bytes`);
