#!/usr/bin/env node
/*
 * PRE-BUILD GUARD — every merchandising link must land on at least one product.
 *
 * Why this exists: on 4 Sep 2026 a session removed dead-end category links, and in the same
 * session shipped five NEW dead ends. The school-kit tiles — the lead merchandising block on
 * the homepage — pointed at `?category=notebooks|geometry|pouches|bottles`, none of which are
 * real category slugs, plus `?collection=school-kits`, a parameter nothing in the app reads.
 * Five of six tiles rendered "No products match your search". A visual audit caught it; no
 * code did. So now code does.
 *
 * The rule being enforced is the AskBox's governing rule, applied site-wide: nothing on this
 * site dead-ends. A link is acceptable if it resolves to at least one product, or if it goes
 * to a real non-catalogue page (/contact, /about) where a human picks it up.
 *
 * This mirrors Catalog.jsx's filter. If that filter changes, change this with it.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = join(root, 'src', 'data');

const readJson = (...p) => JSON.parse(readFileSync(join(dataDir, ...p), 'utf8'));

const categories = readJson('categories.json').items;
const categoryTitle = new Map(categories.map((c) => [c.id, c.title]));

const products = readdirSync(join(dataDir, 'products'))
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(readFileSync(join(dataDir, 'products', f), 'utf8')))
  .filter((p) => !p.placeholder)
  .map((p) => ({ ...p, categoryLabel: categoryTitle.get(p.category) ?? '' }));

// Same matching as Catalog.jsx, same guards.
function matches(p, { category, q }) {
  if (category && category !== 'all' && p.category !== category) return false;
  if (q) {
    const needle = q.toLowerCase();
    const hit =
      (p.name || '').toLowerCase().includes(needle) ||
      (p.brand || '').toLowerCase().includes(needle) ||
      (p.description || '').toLowerCase().includes(needle) ||
      (p.categoryLabel || '').toLowerCase().includes(needle) ||
      (p.tags || []).some((t) => t.toLowerCase().includes(needle));
    if (!hit) return false;
  }
  return true;
}

// Pages that are legitimate destinations without being a product query.
const HUMAN_PAGES = new Set(['/contact', '/about', '/catalog', '/']);

const KNOWN_PARAMS = new Set(['category', 'q']);

const targets = [
  ...readJson('kitTiles.json').tiles.map((t) => ({ where: `kitTiles: ${t.label}`, to: t.to })),
  ...readJson('collections.json').collections.map((c) => ({
    where: `collections: ${c.title}`,
    to: c.to,
  })),
  ...categories.map((c) => ({
    where: `categories: ${c.title}`,
    to: `/catalog?category=${c.id}`,
    optional: true, // categories.json is the CMS's full list; the UI filters it itself
  })),
];

const failures = [];

// "wa:<key>" targets open a pre-filled WhatsApp enquiry (src/lib/utils.js WA_ENQUIRIES).
const WA_KEYS = new Set(['bulk', 'return-gifts', 'school-kits']);

for (const t of targets) {
  if (t.to.startsWith('wa:')) {
    if (!WA_KEYS.has(t.to.slice(3))) failures.push(`${t.where}
       ${t.to}
       -> unknown WhatsApp enquiry key.`);
    continue;
  }
  const [path, search = ''] = t.to.split('?');
  const params = new URLSearchParams(search);

  for (const key of params.keys()) {
    if (!KNOWN_PARAMS.has(key)) {
      failures.push(`${t.where}\n       ${t.to}\n       -> "${key}" is not a parameter the app reads; the filter is silently ignored.`);
    }
  }

  if (path !== '/catalog') {
    if (!HUMAN_PAGES.has(path)) {
      failures.push(`${t.where}\n       ${t.to}\n       -> not a known page.`);
    }
    continue;
  }
  if (!search) continue; // bare /catalog is the browse landing, always fine

  const criteria = { category: params.get('category'), q: params.get('q') };
  const n = products.filter((p) => matches(p, criteria)).length;
  if (n === 0 && !t.optional) {
    failures.push(`${t.where}\n       ${t.to}\n       -> matches 0 products. This renders "No products match your search".`);
  }
}

if (failures.length === 0) {
  console.log(`  ✓ links: ${targets.length} merchandising destinations all resolve`);
  process.exit(0);
}

console.error(
  `\n  ✖  Build blocked: ${failures.length} merchandising link(s) dead-end\n\n` +
    failures.map((f) => `     ${f}`).join('\n\n') +
    '\n\n     Point them at something that exists, or at /contact so a human picks it up.\n'
);
process.exit(1);
