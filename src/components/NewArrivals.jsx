import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/productData';
import ProductCard from './ProductCard';

// Horizontal scroll-snap carousel of products flagged `newArrival` in the
// catalog data. Swipeable on touch; arrow buttons on desktop. No JS library.
export default function NewArrivals() {
  const scroller = useRef(null);
  const items = products.filter((p) => p.newArrival);
  if (items.length === 0) return null;

  const scrollByCards = (dir) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <section id="new-arrivals" aria-label="New arrivals" className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight">New Arrivals</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1.5 font-medium">Fresh stock on the shelves — swipe to browse, tap to enquire.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/new-arrivals" className="text-xs sm:text-sm font-bold text-brand-primary hover:text-brand-dark underline underline-offset-4 whitespace-nowrap transition-colors">
            View All &rarr;
          </Link>
          <div className="hidden md:flex gap-2">
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            aria-label="Scroll new arrivals backward"
            className="w-10 h-10 rounded-full border border-brand-primary text-brand-primary font-bold hover:bg-brand-primary hover:text-white transition-colors duration-300 flex items-center justify-center"
          >
            &larr;
          </button>
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            aria-label="Scroll new arrivals forward"
            className="w-10 h-10 rounded-full border border-brand-primary text-brand-primary font-bold hover:bg-brand-primary hover:text-white transition-colors duration-300 flex items-center justify-center"
          >
            &rarr;
          </button>
          </div>
        </div>
      </div>

      <div
        ref={scroller}
        className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {items.map((p) => (
          <div key={p.id ?? p.name} className="snap-start shrink-0 w-[72%] sm:w-[45%] md:w-[31%] lg:w-[23.5%]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
