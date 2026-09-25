import { useMemo, useSyncExternalStore } from 'react';
import { products as codeProducts, categories } from './productData';
import { fetchSanityProducts, sanityConfigured } from '../lib/sanity';

/*
 * THE LIVE CATALOGUE = code products + products Sam adds in /admin (Sanity).
 *
 * Both lists always show together. Adding one product in Sanity must never hide the code
 * list; that is the Augzet studio's behaviour ("Sanity or fallback") and the reason this
 * file exists instead of copying it.
 *
 *   - Code products (src/data/products/*.json) render on the first paint, as before.
 *   - Sanity products are fetched on load and again when the tab regains focus. The last
 *     result is cached in localStorage so a returning visitor sees them immediately.
 *   - If Sanity is down or slow, the site simply shows the code products.
 *   - Same product name in both lists: the code one wins, so a duplicate entry in the
 *     CMS cannot double a card.
 *   - Within a category, Sam's products come first, newest first, so a product he just
 *     added is easy to find. Code products follow in their existing order.
 *   - NEW IN: once Sam has published the "New In" list in /admin, it alone decides which
 *     products are new (rail order and the "New in" badge). Before that, the built-in
 *     newArrival flags apply, exactly as before.
 */

const CACHE_KEY = 'sp-sanity-v2';
const categoryOrder = new Map(categories.map((c, i) => [c.id, i]));
const categoryTitle = new Map(categories.map((c) => [c.id, c.title]));
const nameKey = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

const EMPTY = { products: [], newIn: null };

function readCache() {
  if (!sanityConfigured) return EMPTY;
  try {
    const parsed = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
    return parsed && Array.isArray(parsed.products) ? parsed : EMPTY;
  } catch {
    return EMPTY;
  }
}

function writeCache(list) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(list));
  } catch {
    /* private mode or storage full: the fetch result still renders */
  }
}

const listKey = (p) => (p.source === 'sanity' ? p.id : `code-${p.id}`);

function mergeProducts(sanityList) {
  const taken = new Set(codeProducts.map((p) => nameKey(p.name)));
  const extra = sanityList
    // A category that does not exist in categories.json would land in no filter.
    .filter((p) => categoryOrder.has(p.category) && !taken.has(nameKey(p.name)))
    .map((p) => ({ ...p, categoryLabel: categoryTitle.get(p.category) }));
  if (extra.length === 0) return codeProducts;

  // Stable sort by category only: Sanity items (already newest first) stay ahead of the code
  // items, which keep the order productData.js gave them.
  return [...extra, ...codeProducts].sort(
    (a, b) => (categoryOrder.get(a.category) ?? 99) - (categoryOrder.get(b.category) ?? 99)
  );
}

// Returns { products, newIn } where newIn is the ordered list of product objects for the rail.
function merge({ products: sanityList, newIn: newInKeys }) {
  let products = mergeProducts(sanityList);
  if (!Array.isArray(newInKeys)) {
    return { products, newIn: products.filter((p) => p.newArrival) };
  }
  const chosen = new Set(newInKeys);
  products = products.map((p) => {
    const isNew = chosen.has(listKey(p));
    return p.newArrival === isNew ? p : { ...p, newArrival: isNew };
  });
  const byKey = new Map(products.map((p) => [listKey(p), p]));
  // A key whose product was deleted (or is a hidden placeholder) is simply skipped.
  const newIn = [...new Set(newInKeys)].map((k) => byKey.get(k)).filter(Boolean);
  return { products, newIn };
}

let current = merge(readCache());
const listeners = new Set();
let started = false;
let lastFetch = 0;

// Fetch on first use, then again whenever the tab comes back into view (at most every 20s),
// so a product Sam adds or deletes shows up without anyone having to reload.
function load() {
  if (!sanityConfigured) return;
  if (!started) {
    started = true;
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && Date.now() - lastFetch > 20000) refresh();
    });
  }
  if (Date.now() - lastFetch > 20000) refresh();
}

function refresh() {
  lastFetch = Date.now();
  fetchSanityProducts()
    .then((data) => {
      writeCache(data);
      current = merge(data);
      listeners.forEach((l) => l());
    })
    .catch((err) => console.warn('[catalog] Sanity products not loaded, showing code products only.', err));
}

function subscribe(listener) {
  listeners.add(listener);
  load();
  return () => listeners.delete(listener);
}

const snapshot = () => current;

function useCatalog() {
  return useSyncExternalStore(subscribe, snapshot, snapshot);
}

export function useProducts() {
  return useCatalog().products;
}

// The homepage "New In" rail, in the order Sam set in /admin.
export function useNewIn() {
  return useCatalog().newIn;
}

// Categories that have at least one product, code or Sanity. A browse link to an empty
// category is a dead end (see productData.js), so every browse UI uses this.
export function useActiveCategories() {
  const products = useProducts();
  return useMemo(() => {
    const has = new Set(products.map((p) => p.category));
    return categories.filter((c) => has.has(c.id));
  }, [products]);
}
