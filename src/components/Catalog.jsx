import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Fuse from 'fuse.js';
import { products, categories, activeCategories } from '../data/productData';
import { SearchIcon } from './icons';
import ProductCard from './ProductCard';
import CategoryCard from './CategoryCard';

// Filters and browse tiles list only categories that have products; `categories`
// stays the lookup table so a direct ?category= link to an empty one still resolves
// its title instead of rendering an untitled page.
const filters = [{ id: 'all', label: 'All Products' }, ...activeCategories.map((c) => ({ id: c.id, label: c.title }))];

// Same Fuse.js typo-tolerant matching as lib/search.js's AskBox engine (see that file's
// comment for why Fuse over a hand-rolled fuzzy function) — a shopper typing "pensil" or
// "noteboks" here should still find products, not hit "no results" over a spelling slip.
const productFuse = new Fuse(products, {
  keys: ['name', 'brand', 'categoryLabel'],
  threshold: 0.35,
  ignoreLocation: true,
});

export default function Catalog() {
  // Deep-link filter + search via URL query params (back button, sharing).
  const [searchParams, setSearchParams] = useSearchParams();
  const active = searchParams.get('category') || 'all';
  const query = searchParams.get('q') || '';

  const setActive = (id) => {
    const next = new URLSearchParams(searchParams);
    if (id === 'all') next.delete('category');
    else next.set('category', id);
    setSearchParams(next, { replace: true });
  };

  const setQuery = (value) => {
    const next = new URLSearchParams(searchParams);
    if (!value) next.delete('q');
    else next.set('q', value);
    setSearchParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    const q = query.trim();
    // Fuzzy-matched product pool for a non-empty query (typo-tolerant, see productFuse
    // above); the full catalogue otherwise. Exact substring hits still rank first because
    // Fuse scores an exact match at 0 — the best possible score — so nothing regresses for
    // someone who spells the product correctly.
    const pool = q ? productFuse.search(q).map((r) => r.item) : products;
    return pool.filter((p) => active === 'all' || active === 'everything' || p.category === active);
  }, [active, query]);

  // Jags-style browsing: the catalog landing shows category cards; a chosen
  // category (or a search) shows the product grid.
  const showLanding = active === 'all' && !query.trim();
  const activeCategory = categories.find((c) => c.id === active);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <p className="text-sm font-medium text-gray-400 mb-2">Browse our full range</p>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Shop Catalog</h1>
        <p className="mt-3 text-gray-500 max-w-xl">Every item is enquiry-only and priced below MRP. Tap “Enquire on WhatsApp” on any product to message us instantly.</p>
      </div>

      <div className="relative mb-8 max-w-xl">
        <label htmlFor="catalog-search" className="sr-only">Search products</label>
        <SearchIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          id="catalog-search"
          name="search"
          type="search"
          inputMode="search"
          autoComplete="off"
          spellCheck={false}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products, e.g. watercolor, pencils, files…"
          className="w-full rounded-full border border-gray-200 bg-white pl-12 pr-4 py-3 transition-colors focus:border-brand-primary"
        />
      </div>

      {showLanding ? (
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 mb-5">Find by Category</h2>
          {/* "All Categories" tile — added 17 Sep 2026 on request: with a catalogue this
              small, and plenty of products genuinely belonging under more than one category
              (stationery/office-supplies overlap constantly), forcing a category pick first
              costs a shopper clicks for no real payoff. This tile skips straight to every
              product, unfiltered. */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            <CategoryCard
              name="All Categories"
              image="/ai-product-shots/kit-bundle.webp"
              categoryId="everything"
            />
            {activeCategories.map((c) => (
              <CategoryCard
                key={c.id}
                name={c.title}
                image={c.image}
                categoryId={c.id}
              />
            ))}
          </div>
        </div>
      ) : (
      <div className="grid lg:grid-cols-[220px_1fr] gap-8">
        <aside className="lg:sticky lg:top-32 h-fit min-w-0">
          <h2 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3 hidden lg:block">Categories</h2>
          
          {/* Mobile Category Dropdown Selector */}
          <div className="relative lg:hidden mb-6">
            <select
              value={active}
              onChange={(e) => setActive(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white pl-4 pr-10 py-3.5 text-sm font-bold text-gray-700 focus:border-brand-primary focus:outline-none appearance-none shadow-sm cursor-pointer"
            >
              {filters.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Desktop Category Sidebar buttons */}
          <div className="hidden lg:flex lg:flex-col gap-2" role="group" aria-label="Filter by category">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActive(f.id)}
                aria-pressed={active === f.id}
                className={`whitespace-nowrap text-left rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                  active === f.id ? 'bg-brand-primary text-white' : 'bg-white border border-gray-100 text-gray-700 hover:bg-brand-soft'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </aside>

        <div className="min-w-0">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              {active === 'everything' && <h2 className="text-xl font-extrabold text-gray-800">All Categories</h2>}
              {activeCategory && <h2 className="text-xl font-extrabold text-gray-800">{activeCategory.title}</h2>}
              {/* Result counts deliberately not shown — a category reading
                  "7 products" reads as a small shop, not a curated one. */}
              <p className="sr-only" aria-live="polite">
                {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSearchParams({})}
              className="text-xs font-bold text-brand-primary hover:text-brand-dark underline underline-offset-4 whitespace-nowrap pb-0.5"
            >
              &larr; All Categories
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id ?? p.name} product={p} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400 flex flex-col items-center justify-center">
              <p>No products match your search. Try a different term or clear filters.</p>
              <button
                type="button"
                onClick={() => setSearchParams({})}
                className="mt-4 px-6 py-2.5 bg-brand-primary text-white font-semibold rounded-full hover:bg-brand-primary/90 transition-all duration-300 shadow-md hover:shadow-lg text-xs"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
      )}
    </div>
  );
}
