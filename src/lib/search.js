import Fuse from 'fuse.js';
import taxonomy from '../data/taxonomy.json';
import brandsFile from '../data/brands.json';
import { categories } from '../data/productData';
import { STORE } from './utils';

// The ask-box matching engine. Works entirely against known vocabulary
// (category terms confirmed by shelf photos + generic stationery-shop terms)
// and never claims stock on its own — every result still routes to a
// WhatsApp message for Sam to actually confirm. This is deliberate: the
// real item master hasn't landed yet, so the site can't say "yes we have
// it", only "here's where that likely lives, let's check."
//
// TYPO TOLERANCE (17 Sep 2026): matching used to be exact/substring only, so
// "pensil" or "noteboks" matched nothing. Fixed by using Fuse.js — a small,
// widely-used, well-documented fuzzy-search library — instead of writing our
// own distance/scoring function. If this ever needs debugging, the fix is
// "read the Fuse.js docs and adjust `threshold` below," not "reverse-engineer
// a bespoke algorithm." Swap this whole file for a real Fuse.js/FlexSearch
// index over the layer-3 export once tools/import-catalog.mjs exists — the
// matchQuery/matchList call shape below is designed to stay stable across
// that swap.

const brands = [...brandsFile.confirmed, ...brandsFile.unconfirmed].map((b) => b.name);
const categoryTitleById = new Map(categories.map((c) => [c.id, c.title]));

function normalize(s) {
  return (s || '').toLowerCase().trim().replace(/\s+/g, ' ');
}

// One flat list of every searchable category term, each tagged with which
// category it belongs to — lets one Fuse index cover titles AND terms.
const categoryEntries = taxonomy.categories.flatMap((cat) => {
  const title = categoryTitleById.get(cat.id) || cat.id;
  const terms = [{ id: cat.id, title, term: title }, ...cat.terms.map((term) => ({ id: cat.id, title, term }))];
  return terms;
});

// threshold: 0 = exact match only, 1 = matches anything. 0.35 is Fuse's own
// "fairly permissive" ballpark — forgives a typo or two ("pensil" -> "pencil")
// without matching unrelated words. Tune this single number if results ever
// feel too loose or too strict; nothing else in this file should need to change.
const FUZZY_THRESHOLD = 0.35;

// ignoreLocation: Fuse's default scoring penalizes a match the further it sits from the
// start of the string, which is wrong for us — a term or product name is a short label,
// not a paragraph the query should be near the top of. Without this, a correctly-spelled
// query against a multi-word field (e.g. "notebook" inside "Papergrid A4 Notebook 172
// Page") can score worse than it should. Also a single documented option, not custom logic.
const categoryFuse = new Fuse(categoryEntries, { keys: ['term'], includeScore: true, threshold: FUZZY_THRESHOLD, ignoreLocation: true });
const brandFuse = new Fuse(brands, { includeScore: true, threshold: FUZZY_THRESHOLD, ignoreLocation: true });

// A real query is rarely just the term itself — "camlin pencils x2" carries a brand and
// a quantity around the one word ("pencils") that actually names a category. Fuse matches
// a query AGAINST a field, so throwing the whole line at a short field like "pencil" can
// never score well (the pattern is longer than the text it's searched in). Fixed by trying
// each word, and each adjacent word-pair (for two-word terms like "chart paper"), as its
// own candidate and keeping whichever scores best — same shape as the old word-by-word
// scoreTerm, just fuzzy per candidate instead of exact.
function candidates(q) {
  const words = q.split(' ').filter(Boolean);
  const out = new Set(words);
  for (let i = 0; i < words.length - 1; i++) out.add(`${words[i]} ${words[i + 1]}`);
  return [...out];
}

function bestFuseHit(fuse, q) {
  let best = null;
  for (const candidate of candidates(q)) {
    const hit = fuse.search(candidate)[0];
    if (hit && (!best || hit.score < best.score)) best = hit;
  }
  return best;
}

/** Match a single free-text query. Returns the best category/brand hit (or null) plus a WhatsApp fallback link that always works. */
export function matchQuery(raw) {
  const q = normalize(raw);
  if (!q) return { query: raw, category: null, brand: null, waFallback: waFallbackLink(raw) };

  const categoryHit = bestFuseHit(categoryFuse, q);
  const bestCategory = categoryHit
    ? { id: categoryHit.item.id, title: categoryHit.item.title, matchedTerm: categoryHit.item.term }
    : null;

  const brandHit = bestFuseHit(brandFuse, q);
  const bestBrand = brandHit ? brandHit.item : null;

  const faqHit = taxonomy.faq.find((f) => q.includes(normalize(f.q)));

  return {
    query: raw,
    category: bestCategory,
    brand: bestBrand,
    faqRoute: faqHit?.a ?? null,
    waFallback: waFallbackLink(raw),
  };
}

/** Match every line of a pasted/typed multi-item list. Nothing is dropped — unmatched lines still ride along in the WhatsApp message so Sam sees the exact request. */
export function matchList(rawText) {
  const lines = (rawText || '')
    .split(/\r?\n|,(?=\s*[A-Za-z])/) // newlines, or commas followed by a new word (handles "pens, files, tape")
    .map((l) => l.trim())
    .filter(Boolean);

  const results = lines.map((line) => {
    const m = matchQuery(line);
    return { text: line, category: m.category, brand: m.brand };
  });

  const matchedCount = results.filter((r) => r.category || r.brand).length;
  return { results, matchedCount, total: results.length, waLink: buildListWaLink(results) };
}

function waFallbackLink(rawQuery) {
  const q = (rawQuery || '').trim();
  const msg = q
    ? `Hi Stationery Point, I'm looking for: ${q}. Could you confirm if you have this in stock and the price?`
    : `Hi Stationery Point, I'd like to ask about something from your website.`;
  return `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(msg)}`;
}

function buildListWaLink(results) {
  if (!results.length) return waFallbackLink('');
  const lines = results.map((r, i) => {
    const tag = r.category ? ` (${r.category.title})` : '';
    return `${i + 1}. ${r.text}${tag}`;
  });
  const msg = `Hi Stationery Point, here's my list. Could you confirm availability and price for each?\n\n${lines.join('\n')}`;
  return `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(msg)}`;
}
