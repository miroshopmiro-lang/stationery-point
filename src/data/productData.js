// Code catalogue: src/data/products/*.json + categories.json, edited by hand.
// Products Sam adds in /admin (Sanity) are merged on top at runtime in ./catalog.js;
// UI that lists products should use useProducts()/useActiveCategories() from there.
import categoriesFile from './categories.json';

export const categories = categoriesFile.items;

const categoryOrder = new Map(categories.map((c, i) => [c.id, i]));
const categoryTitle = new Map(categories.map((c) => [c.id, c.title]));

const productModules = import.meta.glob('./products/*.json', { eager: true });

/*
 * PLACEHOLDER GUARD.
 *
 * src/data/products/ currently holds DEMO products (placeholder: true) so the card and grid
 * design can be judged before Sam's real item export arrives. Their names are real,
 * commonly-stocked Indian SKUs, but their ratings and review counts are invented and most
 * prices are indicative rather than confirmed.
 *
 * They must never reach a production build, because the site would then be showing a real
 * shop's customers prices and review counts that nobody has verified.
 *
 * Dev  -> placeholders render, so the design is reviewable.
 * Prod -> placeholders are stripped. If that empties the catalogue, that is the correct and
 *         honest outcome: the catalogue genuinely is empty until the export lands.
 *
 * To preview placeholders in a production build deliberately, run:
 *   VITE_ALLOW_PLACEHOLDER_PRODUCTS=1 npm run build
 */
const allowPlaceholders =
  !import.meta.env.PROD || import.meta.env.VITE_ALLOW_PLACEHOLDER_PRODUCTS === '1';

const allProducts = Object.values(productModules).map((m) => m.default);

export const placeholderCount = allProducts.filter((p) => p.placeholder).length;

if (placeholderCount > 0 && allowPlaceholders && typeof console !== 'undefined') {
  console.warn(
    `[Stationery Point] ${placeholderCount} PLACEHOLDER products are live. ` +
      'Names are real SKUs; ratings and review counts are invented and prices are mostly ' +
      'indicative. Purge src/data/products/ when the real item export lands.'
  );
}

export const products = allProducts
  .filter((p) => allowPlaceholders || !p.placeholder)
  // categoryLabel is derived so the CMS only has to set the category.
  .map((p) => ({ ...p, categoryLabel: categoryTitle.get(p.category) ?? p.categoryLabel ?? '' }))
  .sort(
    (a, b) =>
      (categoryOrder.get(a.category) ?? 99) - (categoryOrder.get(b.category) ?? 99) ||
      (a.id ?? 9999) - (b.id ?? 9999) ||
      a.name.localeCompare(b.name)
  );

/*
 * Categories that actually have products behind them.
 *
 * The browse UIs must use this, not `categories`. Sam's real item list has nothing in
 * Return Gifts or Special Edition, so those two tiles rendered a link straight to an empty
 * grid — a dead end, which the AskBox rule forbids anywhere on this site. They stay in
 * categories.json (they are real departments in the shop and the CMS still offers them);
 * they simply do not get a browse tile until something is filed under them.
 */
export const productCountByCategory = products.reduce((acc, p) => {
  acc[p.category] = (acc[p.category] ?? 0) + 1;
  return acc;
}, {});

export const activeCategories = categories.filter((c) => productCountByCategory[c.id] > 0);
