// Makes 480px and 800px WebP copies of every product photo, next to the original
// (name.webp -> name-480.webp, name-800.webp). Product cards load these via srcset;
// the full-size file stays as the fallback. Runs before every build, so photos Sam
// uploads through /admin get small copies automatically. Copies are gitignored.
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const DIRS = ['public/shop-catalogue-images', 'public/shop-catalogue-images-raw', 'public/ai-product-shots'];
const SIZES = [480, 800];
let made = 0;

async function newer(src, dest) {
  try { return (await stat(dest)).mtimeMs >= (await stat(src)).mtimeMs; } catch { return false; }
}

for (const dir of DIRS) {
  let files = [];
  try { files = await readdir(dir); } catch { continue; }
  for (const f of files) {
    if (!/\.(webp|png|jpe?g)$/i.test(f) || /-(480|800)\.webp$/.test(f)) continue;
    const src = path.join(dir, f);
    const base = f.replace(/\.[^.]+$/, '');
    for (const w of SIZES) {
      const dest = path.join(dir, `${base}-${w}.webp`);
      if (await newer(src, dest)) continue;
      await sharp(src).resize({ width: w, withoutEnlargement: true }).webp({ quality: 80 }).toFile(dest);
      made++;
    }
  }
}
console.log(`thumbs: ${made} created`);
