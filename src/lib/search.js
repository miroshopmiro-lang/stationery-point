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
// Swap this for a real Fuse.js/FlexSearch index over the layer-3 export
// once tools/import-catalog.mjs exists — the matchQuery/matchList call
// shape below is designed to stay stable across that swap.

const brands = [...brandsFile.confirmed, ...brandsFile.unconfirmed].map((b) => b.name);
const categoryTitleById = new Map(categories.map((c) => [c.id, c.title]));

function normalize(s) {
  return (s || '').toLowerCase().trim().replace(/\s+/g, ' ');
}

// Score a normalized query against a normalized term. Exact word match beats
// substring match beats nothing. Cheap and predictable — no library needed
// for a vocabulary this small.
function scoreTerm(q, term) {
  const t = normalize(term);
  if (!q || !t) return 0;
  if (q === t) return 100;
  const words = q.split(' ');
  if (words.includes(t)) return 80;
  if (t.includes(q) || q.includes(t)) return 50;
  return 0;
}

/** Match a single free-text query. Returns the best category/brand hit (or null) plus a WhatsApp fallback link that always works. */
export function matchQuery(raw) {
  const q = normalize(raw);
  if (!q) return { query: raw, category: null, brand: null, waFallback: waFallbackLink(raw) };

  let bestCategory = null;
  let bestCategoryScore = 0;
  for (const cat of taxonomy.categories) {
    const title = categoryTitleById.get(cat.id) || cat.id;
    const titleScore = scoreTerm(q, title);
    if (titleScore > bestCategoryScore) {
      bestCategoryScore = titleScore;
      bestCategory = { id: cat.id, title, matchedTerm: title };
    }
    for (const term of cat.terms) {
      const s = scoreTerm(q, term);
      if (s > bestCategoryScore) {
        bestCategoryScore = s;
        bestCategory = { id: cat.id, title, matchedTerm: term };
      }
    }
  }

  let bestBrand = null;
  let bestBrandScore = 0;
  for (const brand of brands) {
    const s = scoreTerm(q, brand);
    if (s > bestBrandScore) {
      bestBrandScore = s;
      bestBrand = brand;
    }
  }

  const faqHit = taxonomy.faq.find((f) => q.includes(normalize(f.q)));

  return {
    query: raw,
    category: bestCategoryScore >= 50 ? bestCategory : null,
    brand: bestBrandScore >= 50 ? bestBrand : null,
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
  const msg = `Hi Stationery Point, here's my list — could you confirm availability and price for each?\n\n${lines.join('\n')}`;
  return `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(msg)}`;
}
