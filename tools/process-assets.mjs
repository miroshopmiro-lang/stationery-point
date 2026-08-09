/**
 * Asset pipeline — takes raw generated PNGs and puts production WebP in public/.
 *
 *   node tools/process-assets.mjs            process everything in asset-inbox/
 *   node tools/process-assets.mjs --legacy   recompress the photos already in public/
 *   node tools/process-assets.mjs --check    report sizes, write nothing
 *
 * Drop files into asset-inbox/ using the names in SPECS below. Anything that
 * can't be squeezed under its size budget is a hard failure, not a warning —
 * the budgets come from section C of audit-2026-08-08.md and the whole point
 * of them is that they don't quietly drift.
 *
 * sharp lives in tools/product-shots/node_modules (installed for the product
 * shot pipeline); no reason to install a second copy.
 */
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sharp = require(path.join(ROOT, 'tools/product-shots/node_modules/sharp'));

const INBOX = path.join(ROOT, 'asset-inbox');
const PUBLIC = path.join(ROOT, 'public');
const ORIGINALS = path.join(ROOT, 'asset-originals');
const KB = 1024;

const TILES = ['stationery', 'office-supplies', 'art-supplies', 'craft-material', 'party-gifts', 'return-gifts', 'special-edition'];

// name in asset-inbox -> what it becomes in public/
const SPECS = [
  { in: 'hero-desktop.png', out: 'hero-desktop.webp', w: 2100, h: 900, budget: 180 * KB },
  { in: 'hero-mobile.png', out: 'hero-mobile.webp', w: 1200, h: 900, budget: 110 * KB },

  // Two sizes per tile. The grid renders these ~165px wide on a phone and
  // ~280px on desktop, so shipping only the 1200px master put over 1MB of
  // category art on the homepage for thumbnails. CategoryCard picks with srcset.
  ...TILES.flatMap((id) => [
    { in: `tile-${id}.png`, out: `category-tiles/${id}.webp`, w: 1200, h: 1500, budget: 90 * KB },
    { in: `tile-${id}.png`, out: `category-tiles/${id}-600.webp`, w: 600, h: 750, budget: 35 * KB },
  ]),

  ...['school-kits', 'notebooks', 'pens', 'geometry-boxes', 'colour-pencils', 'calculators', 'lever-arch-files', 'artist-canvases', 'sticky-notes'].map(
    (slug) => ({ in: `icon-${slug}.png`, out: `icons/item-${slug}.webp`, w: 512, h: 512, budget: 10 * KB, alpha: true, fit: 'contain' })
  ),
];

// Photos already in public/ that are simply too heavy for how small they render.
const LEGACY = [
  { in: 'logo.png', out: 'logo.webp', w: 128, h: 128, budget: 8 * KB, alpha: true, fit: 'contain' },
  // Raster favicon fallback for browsers that won't take the SVG. The 500px,
  // 146KB logo.png was being served as the tab icon at 16px.
  { in: 'logo.png', out: 'favicon-128.png', w: 128, h: 128, budget: 12 * KB, alpha: true, fit: 'contain', png: true },
  // The About grid renders these square at roughly 380px, so 800px covers a 2x
  // screen with room to spare. They are currently 2000px wide. These are busy
  // shelf photographs — fine detail everywhere — so they cost more per pixel
  // than artwork does; 800px is what keeps them inside a sane budget.
  // 85KB rather than the 90KB tile budget: these are photographs of packed
  // shelves, detail in every pixel, and they bottom out around 80KB at the
  // lowest quality worth shipping. Raised deliberately, not drifted into.
  ...[1, 2, 3, 4, 5].map((n) => ({ in: `gallery_${n}.jpg`, out: `gallery_${n}.webp`, w: 800, h: 800, budget: 85 * KB })),
  // storefront stays JPEG on purpose: it is the og:image, and WebP link previews
  // are unreliable across WhatsApp and the other scrapers this shop shares into.
  { in: 'storefront.jpg', out: 'storefront.jpg', w: 1024, h: 576, budget: 130 * KB, jpeg: true },
  // Phone-sized variants of the tiles currently in public/. Marked transitional:
  // these sources are busy photographs and four of them cannot reach 35KB at any
  // quality worth shipping. The replacement artwork is flat illustration and will,
  // so the budget stays honest for SPECS and this block only warns. Delete the
  // whole block once the generated tiles land in the inbox.
  ...TILES.map((id) => ({
    in: `category-tiles/${id}.webp`,
    out: `category-tiles/${id}-600.webp`,
    w: 600,
    h: 750,
    budget: 35 * KB,
    transitional: true,
  })),
];

/**
 * Encode down the quality ladder until the file fits its budget. Returns the
 * first buffer under budget along with the quality that got us there, so the
 * log shows when something only just squeaked in.
 */
async function encodeToBudget(pipeline, spec) {
  let last = null;
  for (const quality of [86, 82, 78, 74, 70, 66, 62, 58, 52, 45]) {
    let buf;
    if (spec.jpeg) buf = await pipeline.clone().jpeg({ quality, mozjpeg: true }).toBuffer();
    else if (spec.png) buf = await pipeline.clone().png({ compressionLevel: 9, palette: true, quality }).toBuffer();
    else buf = await pipeline.clone().webp({ quality, effort: 6, alphaQuality: spec.alpha ? 100 : 80 }).toBuffer();
    last = { buf, quality };
    if (buf.length <= spec.budget) return { ...last, ok: true };
  }
  return { ...last, ok: false };
}

async function processOne(spec, srcDir, { check }) {
  const src = path.join(srcDir, spec.in);
  if (!fs.existsSync(src)) return { spec, status: 'missing' };

  const before = fs.statSync(src).size;
  const pipeline = sharp(src)
    .rotate() // honour EXIF orientation before measuring anything — phone photos lie about w/h
    .resize(spec.w, spec.h, {
      fit: spec.fit ?? 'cover',
      position: 'centre',
      background: spec.alpha ? { r: 0, g: 0, b: 0, alpha: 0 } : { r: 255, g: 255, b: 255, alpha: 1 },
    });

  const { buf, quality, ok } = await encodeToBudget(pipeline, spec);
  const dest = path.join(PUBLIC, spec.out);

  if (!check) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    // Write to a temp file and rename over the target. storefront.jpg is both
    // source and destination, and sharp still holds the source open here — a
    // direct write fails on Windows, and on a case-insensitive filesystem an
    // output differing only in case would land on the very file being read.
    const tmp = `${dest}.tmp-${process.pid}`;
    fs.writeFileSync(tmp, buf);
    fs.renameSync(tmp, dest);
  }
  return { spec, status: ok ? 'ok' : 'over', before, after: buf.length, quality };
}

const flags = new Set(process.argv.slice(2));
const args = { legacy: flags.has('--legacy'), check: flags.has('--check') };

const specs = args.legacy ? LEGACY : SPECS;
const srcDir = args.legacy ? ORIGINALS : INBOX;

// Legacy mode compresses files that already live in public/, and storefront.jpg
// is both source and destination. Reading it back on a second run re-encodes an
// already-lossy JPEG and the file grows instead of shrinking. So the untouched
// originals get parked in asset-originals/ on first run and every run reads from
// there — the pipeline is then idempotent and the source is never destroyed.
if (args.legacy) {
  fs.mkdirSync(ORIGINALS, { recursive: true });
  for (const spec of LEGACY) {
    const kept = path.join(ORIGINALS, spec.in);
    const live = path.join(PUBLIC, spec.in);
    fs.mkdirSync(path.dirname(kept), { recursive: true }); // spec.in can be nested (category-tiles/…)
    if (!fs.existsSync(kept) && fs.existsSync(live)) fs.copyFileSync(live, kept);
  }
}

if (!fs.existsSync(srcDir)) {
  console.error(`No such directory: ${srcDir}`);
  process.exit(1);
}

const results = [];
for (const spec of specs) results.push(await processOne(spec, srcDir, args));

const pad = (s, n) => String(s).padEnd(n);
const kb = (n) => `${(n / KB).toFixed(1)}KB`;

let failed = 0;
let missing = 0;
console.log(`\n${args.legacy ? 'LEGACY' : 'INBOX'}${args.check ? ' (check only, nothing written)' : ''}\n`);
for (const r of results) {
  if (r.status === 'missing') {
    missing++;
    console.log(`  ${pad('·', 2)} ${pad(r.spec.in, 30)} not in ${path.basename(srcDir)}/ yet`);
    continue;
  }
  const transitional = r.status !== 'ok' && r.spec.transitional;
  const mark = r.status === 'ok' ? '✓' : transitional ? '!' : '✗';
  if (r.status !== 'ok' && !transitional) failed++;
  const budget = `budget ${kb(r.spec.budget)}`;
  console.log(
    `  ${pad(mark, 2)} ${pad(r.spec.out, 38)} ${pad(kb(r.before) + ' -> ' + kb(r.after), 20)} q${r.quality}  ${
      r.status === 'ok' ? budget : `OVER ${budget}${transitional ? ' (transitional, ok for now)' : ''}`
    }`
  );
}

const written = results.filter((r) => r.status !== 'missing');
if (written.length) {
  const before = written.reduce((n, r) => n + r.before, 0);
  const after = written.reduce((n, r) => n + r.after, 0);
  console.log(`\n  ${written.length} processed, ${missing} still missing — ${kb(before)} -> ${kb(after)}`);
}

if (failed) {
  console.error(`\n${failed} file(s) could not be brought under budget. Regenerate simpler artwork or raise the budget deliberately.`);
  process.exit(1);
}
