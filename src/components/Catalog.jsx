import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products, categories } from '../data/productData';
import { SearchIcon } from './icons';
import ProductCard from './ProductCard';

const filters = [{ id: 'all', label: 'All Products' }, ...categories.map((c) => ({ id: c.id, label: c.title }))];

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
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchCat = active === 'all' || p.category === active;
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [active, query]);

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
          className="w-full rounded-full border border-gray-200 bg-white pl-12 pr-4 py-3 transition-colors focus:border-brand-purple"
        />
      </div>

      <div className="grid lg:grid-cols-[220px_1fr] gap-8">
        <aside className="lg:sticky lg:top-32 h-fit min-w-0">
          <h2 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3 hidden lg:block">Categories</h2>
          
          {/* Mobile Category Dropdown Selector */}
          <div className="relative lg:hidden mb-6">
            <select
              value={active}
              onChange={(e) => setActive(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white pl-4 pr-10 py-3.5 text-sm font-bold text-gray-700 focus:border-brand-purple focus:outline-none appearance-none shadow-sm cursor-pointer"
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
                  active === f.id ? 'bg-brand-purple text-white' : 'bg-white border border-gray-100 text-gray-700 hover:bg-brand-lavender'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </aside>

        <div className="min-w-0">
          <p className="text-sm text-gray-400 mb-4" aria-live="polite">{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400 flex flex-col items-center justify-center">
              <p>No products match your search. Try a different term or clear filters.</p>
              <button
                type="button"
                onClick={() => setSearchParams({})}
                className="mt-4 px-6 py-2.5 bg-brand-purple text-white font-semibold rounded-full hover:bg-brand-purple/90 transition-all duration-300 shadow-md hover:shadow-lg text-xs"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
