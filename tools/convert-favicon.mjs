import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sharp = require(path.join(ROOT, 'tools/product-shots/node_modules/sharp'));

const LOGO_SRC = path.join(ROOT, 'asset-originals', 'logo.png');
const PUBLIC_DIR = path.join(ROOT, 'public');

// Generate 128x128 PNG
const buf128 = await sharp(LOGO_SRC)
  .rotate()
  .resize(128, 128, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toBuffer();
fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon-128.png'), buf128);

// Generate 32x32 PNG
const buf32 = await sharp(LOGO_SRC)
  .rotate()
  .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toBuffer();
fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon-32x32.png'), buf32);

// Save favicon.ico
fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.ico'), buf32);

console.log('Generated favicons from brand logo: favicon-128.png, favicon-32x32.png, favicon.ico');
