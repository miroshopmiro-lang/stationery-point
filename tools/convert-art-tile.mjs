import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sharp = require(path.join(ROOT, 'tools/product-shots/node_modules/sharp'));

const SRC_IMAGE = "C:\\Users\\risha\\.gemini\\antigravity-ide\\brain\\a5fd220e-0cc9-49c7-acd9-0ffa76bff41c\\media__1786590915870.jpg";
const DEST_DIR = path.join(ROOT, 'public', 'category-tiles');
const ORIGINALS_DIR = path.join(ROOT, 'asset-originals', 'category-tiles');

fs.mkdirSync(DEST_DIR, { recursive: true });
fs.mkdirSync(ORIGINALS_DIR, { recursive: true });

// Backup original
fs.copyFileSync(SRC_IMAGE, path.join(ORIGINALS_DIR, 'art-supplies.jpg'));

// 1200x900 (4:3 aspect ratio matching CategoryCard aspect-[4/3])
const buf1200 = await sharp(SRC_IMAGE)
  .rotate()
  .resize(1200, 900, { fit: 'cover', position: 'center' })
  .webp({ quality: 82, effort: 4 })
  .toBuffer();

fs.writeFileSync(path.join(DEST_DIR, 'art-supplies.webp'), buf1200);

// 600x450 (4:3 aspect ratio)
const buf600 = await sharp(SRC_IMAGE)
  .rotate()
  .resize(600, 450, { fit: 'cover', position: 'center' })
  .webp({ quality: 80, effort: 4 })
  .toBuffer();

fs.writeFileSync(path.join(DEST_DIR, 'art-supplies-600.webp'), buf600);
console.log(`Converted art-supplies -> 1200x900 (${buf1200.length} B) & 600x450 (${buf600.length} B)`);
