import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/productData';

// Auto-scrolling product marquee — the "real shop with real stock" signal.
// Uses .animate-marquee from src/index.css (translateX 0 -> -33.333%), so the
// item list is rendered exactly three times for a seamless loop.
//
// Deliberately NOT the full ProductCard: a moving tap target with a quantity
// stepper is hostile on touch. These tiles are presentational and link to the
// catalog; enquiry happens there, where the controls hold still.
function MarqueeTile({ product }) {
  return (
    <Link
      to={`/catalog?category=${product.category}`}
      className="shrink-0 w-40 sm:w-52 mr-4 sm:mr-6 group"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="aspect-square rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-soft">
        {product.image ? (
          <img
            src={product.image}
            alt=""
            width={1200}
            height={1200}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-brand-soft" />
        )}
      </div>
      <p className="mt-2 text-xs sm:text-sm font-semibold text-gray-700 leading-snug line-clamp-2">
        {product.name}
      </p>
    </Link>
  );
}

export default function NewArrivals() {
  const [paused, setPaused] = useState(false);
  const items = products.filter((p) => p.newArrival && p.image);
  if (items.length === 0) return null;

  const loop = [...items, ...items, ...items];

  return (
    <section id="new-arrivals" aria-label="New arrivals" className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight">New Arrivals</h2>
          <p className="text-sm text-gray-500 mt-1.5 font-medium">Fresh stock on the shelves.</p>
        </div>
        <Link
          to="/new-arrivals"
          className="text-sm font-bold text-brand-primary hover:text-brand-dark underline underline-offset-4 whitespace-nowrap transition-colors shrink-0"
        >
          View All &rarr;
        </Link>
      </div>

      {/* Full-bleed marquee. Pauses on hover (CSS) and on touch (state). */}
      <div
        className="overflow-hidden"
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <div
          className="animate-marquee"
          style={paused ? { animationPlayState: 'paused' } : undefined}
        >
          {loop.map((p, i) => (
            <MarqueeTile key={`${p.id ?? p.name}-${i}`} product={p} />
          ))}
        </div>
      </div>

      {/* Screen-reader equivalent of the decorative marquee above. */}
      <ul className="sr-only">
        {items.map((p) => (
          <li key={p.id ?? p.name}>
            <Link to={`/catalog?category=${p.category}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
