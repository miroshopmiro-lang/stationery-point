// Catalog data lives as JSON files (src/data/products/*.json + categories.json)
// so it can be edited from the /admin CMS (Decap) without touching code.
// Components keep importing { categories, products } from this module.
import categoriesFile from './categories.json';

export const categories = categoriesFile.items;

const categoryOrder = new Map(categories.map((c, i) => [c.id, i]));
const categoryTitle = new Map(categories.map((c) => [c.id, c.title]));

const productModules = import.meta.glob('./products/*.json', { eager: true });

export const products = Object.values(productModules)
  .map((m) => m.default)
  // categoryLabel is derived so the CMS only has to set the category.
  .map((p) => ({ ...p, categoryLabel: categoryTitle.get(p.category) ?? p.categoryLabel ?? '' }))
  .sort(
    (a, b) =>
      (categoryOrder.get(a.category) ?? 99) - (categoryOrder.get(b.category) ?? 99) ||
      (a.id ?? 9999) - (b.id ?? 9999) ||
      a.name.localeCompare(b.name)
  );
