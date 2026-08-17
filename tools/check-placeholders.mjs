#!/usr/bin/env node
/*
 * PRE-BUILD GUARD — fails a production build while placeholder products exist.
 *
 * Why this exists rather than relying on the runtime filter in productData.js:
 * import.meta.glob with { eager: true } inlines every matching JSON into the bundle at build
 * time. The runtime filter stops placeholders RENDERING, but their names, invented ratings and
 * unconfirmed prices are still shipped inside the JS and readable in devtools. For a real shop
 * with 150+ Google reviews, shipping unverified prices in any form is not acceptable.
 *
 * So the build refuses to run. Delete src/data/products/*.json (or replace them with Sam's real
 * export) and it passes.
 *
 * Deliberate override, for a demo build only:
 *   ALLOW_PLACEHOLDER_PRODUCTS=1 npm run build
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'src', 'data', 'products');

let files = [];
try {
  files = readdirSync(dir).filter((f) => f.endsWith('.json'));
} catch {
  process.exit(0); // No products folder at all is fine.
}

const placeholders = files.filter((f) => {
  try {
    return JSON.parse(readFileSync(join(dir, f), 'utf8')).placeholder === true;
  } catch {
    return false;
  }
});

if (placeholders.length === 0) process.exit(0);

if (process.env.ALLOW_PLACEHOLDER_PRODUCTS === '1') {
  console.warn(
    `\n  ⚠  Building WITH ${placeholders.length} placeholder products (override set).\n` +
      '     This build must not be deployed to the live domain.\n'
  );
  process.exit(0);
}

console.error(
  `\n  ✖  Build blocked: ${placeholders.length} placeholder products still in src/data/products/\n\n` +
    placeholders.map((f) => `       ${f}`).join('\n') +
    '\n\n' +
    '     These carry invented ratings and unconfirmed prices. They are demo data for\n' +
    "     reviewing the design, not Sam's catalogue.\n\n" +
    '     To ship: delete them, or replace them with the real item export.\n' +
    '     To build a demo anyway: ALLOW_PLACEHOLDER_PRODUCTS=1 npm run build\n'
);
process.exit(1);
