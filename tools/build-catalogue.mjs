#!/usr/bin/env node
/*
 * CATALOGUE GENERATOR — Sam's item list -> src/data/products/*.json
 *
 * Source of truth: "PRIMUS WEB PRODUCT LIST <month> <year>.xlsx" as sent by Sam.
 * Columns: SL NO | PRODUCT DESCRIPTION | UNIT.  There is NO price column, so no
 * product gets an mrp or ourPrice. ProductCard already falls back to "WhatsApp
 * for today's price" — that is the honest render until Sam sends prices.
 *
 * Nothing here invents a fact about a product:
 *   name    verbatim from Sam's description, title-cased only
 *   unit    verbatim
 *   brand   see BRANDS below; every product records brandSource so the guesswork
 *           is auditable rather than buried
 *   image   only where a real photo exists in public/shop-catalogue-images
 *   rating / reviewCount / mrp / ourPrice — never written
 *
 * Category IS ours, not Sam's. It is shelf taxonomy for browsing, not a claim
 * about the product, and it is the one derived field the site cannot work without.
 *
 * Usage:  node tools/build-catalogue.mjs [path-to-xlsx]
 */
import { readFileSync, readdirSync, writeFileSync, rmSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'src', 'data', 'products');
const SHOTS = join(ROOT, 'public', 'shop-catalogue-images');
const XLSX =
  process.argv[2] ||
  'C:\\Users\\risha\\Downloads\\PRIMUS WEB PRODUCT LIST  august 2026.xlsx';

/*
 * Brand attribution.
 *   photo   — the brand is legible on a photo Sam sent. Confirmed.
 *   list    — the brand name is written out in Sam's own description.
 *   derived — an abbreviation in Sam's list expanded to the full brand. "FC" is
 *             expanded to Faber-Castell because photo 19 (FC JUMBO ... CRAYONS)
 *             shows a Faber-Castell box. Every derived row still needs Sam's
 *             sign-off before it goes near a public brand page.
 */
const BRANDS = [
  [/\bFC\b/i, 'Faber-Castell', 'derived'],
  [/FABER/i, 'Faber-Castell', 'list'],
  [/REFLECTION/i, 'Reflection', 'list'],
  [/TNPL/i, 'TNPL', 'list'],
  [/\bJK\b/i, 'JK Paper', 'list'],
  [/DOMS/i, 'DOMS', 'list'],
  [/CAMLIN/i, 'Camlin', 'list'],
  [/CAMEL/i, 'Camel', 'list'],
  [/ALPHA/i, 'Alpha', 'list'],
  [/PARKER/i, 'Parker', 'list'],
  [/ULTRON/i, 'Unomax', 'photo'],
  [/FLAIR/i, 'Flair', 'list'],
  [/JAGS/i, 'Jags', 'list'],
  [/PAPERGRID/i, 'Papergrid', 'list'],
  [/KORES/i, 'Kores', 'list'],
  [/KANGARO/i, 'Kangaro', 'list'],
  [/APSARA/i, 'Apsara', 'list'],
  [/UNIBALL/i, 'Uni-ball', 'list'],
  [/POSCA/i, 'Posca', 'list'],
  [/FEVICRYL/i, 'Fevicryl', 'list'],
  [/FEVICOL/i, 'Fevicol', 'list'],
  [/ADDGEL/i, 'Addgel', 'list'],
  [/PENTONIC/i, 'Pentonic', 'list'],
  [/EPSON/i, 'Epson', 'list'],
  [/\bHP\b/i, 'HP', 'list'],
  [/POPULAR/i, 'Popular', 'list'],
  [/FACTOR/i, 'Factor', 'list'],
];

// First match wins, so order matters: clay before paint, marker before pen.
const CATEGORIES = [
  [/CLAY|CUTTING MATT|WASHI|WOOD PLATE|YARN|PIPE CLEANER|DRY FLOWER|MOULDIT|PRECISION KNIFE|PLAY DOUGH|GLUE|FEVICOL/i, 'craft-material'],
  [/CANDLE/i, 'party-gifts'],
  [/PAPER|TAPE|PUNCH|STAPLER|STAPLER PIN|WHITE BOARD|INK|CARTRIDGE|EXAM PAD/i, 'office-supplies'],
  [/COLOUR PENCIL|SKETCH PEN|SKETCH BOOK|BRUSH|ACRYLIC|FABRIC PAINT|CANVAS|CRAYON|WATER COLOUR|ART STUDIO|POSCA|BRUSH PEN/i, 'art-supplies'],
  [/MARKER/i, 'office-supplies'],
  [/.*/, 'stationery'],
];

const titleCase = (s) =>
  s
    .toLowerCase()
    .replace(/\b[a-z]/g, (c) => c.toUpperCase())
    // Units, sizes and brand shorthand stay upper: A4, 80GSM, 12PCS, JK, TNPL, FC, HP.
    .replace(/\b(a[3-5]|\d+\s?gsm|\d+\s?pcs|\d+\s?mm|jk|tnpl|fc|hp|doms|mrp)\b/gi, (m) => m.toUpperCase());

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const pick = (table, desc, fallback = null) => {
  for (const [re, ...rest] of table) if (re.test(desc)) return rest;
  return fallback;
};

// Read the sheet through python — openpyxl is already installed and there is no
// xlsx reader in this project's node dependencies.
const raw = execFileSync(
  'python',
  [
    '-c',
    `import openpyxl,json,sys
ws=openpyxl.load_workbook(sys.argv[1]).worksheets[0]
out=[]
for r in ws.iter_rows(values_only=True):
    if r[0] is None: continue
    try: n=int(r[0])
    except (TypeError,ValueError): continue
    out.append({"sl":n,"desc":str(r[1]).strip(),"unit":str(r[2]).strip()})
print(json.dumps(out))`,
    XLSX,
  ],
  { encoding: 'utf8' }
);
const rows = JSON.parse(raw);

const shots = readdirSync(SHOTS).filter((f) => /^\d{2}_.+\.webp$/.test(f));
const shotBySl = new Map(shots.map((f) => [Number(f.slice(0, 2)), f]));

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

let withPhoto = 0;
const derived = [];

for (const { sl, desc, unit } of rows) {
  const [brand, brandSource] = pick(BRANDS, desc, [null, null]);
  const [category] = pick(CATEGORIES, desc);
  const image = shotBySl.has(sl) ? `/shop-catalogue-images/${shotBySl.get(sl)}` : '';
  if (image) withPhoto++;
  if (brandSource === 'derived') derived.push(`${sl} ${desc}`);

  const product = {
    id: sl,
    name: titleCase(desc),
    sourceDescription: desc, // Sam's exact words, kept for reconciliation
    brand,
    brandSource,
    category,
    unit,
    image,
    newArrival: false,
  };

  writeFileSync(
    join(OUT, `${String(sl).padStart(2, '0')}-${slug(desc)}.json`),
    JSON.stringify(product, null, 2) + '\n'
  );
}

console.log(`Wrote ${rows.length} products → src/data/products/`);
console.log(`  with a photo: ${withPhoto}`);
console.log(`  no photo:     ${rows.length - withPhoto}`);
console.log(`  no price:     ${rows.length} (Sam's list has no price column)`);
if (derived.length) {
  console.log(`\n  Brand DERIVED, needs Sam's sign-off (${derived.length}):`);
  for (const d of derived) console.log(`    ${d}`);
}
