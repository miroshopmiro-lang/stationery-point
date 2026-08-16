import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/productData';
import SmartImage from './SmartImage';

// Bento grid of the 7 categories. Jags runs 1 large + 2 small + 1 tall across
// four categories; we have seven, so the layout gives the first two cells the
// most weight and lets the rest sit in an even run beneath.
//
// On mobile everything collapses to a single column of 16:9 cards — a bento
// squeezed into 375px just produces unreadable slivers.
const spans = [
  'sm:col-span-2 sm:row-span-2', // large
  'sm:col-span-2',
  'sm:col-span-1',
  'sm:col-span-1',
  'sm:col-span-2',
  'sm:col-span-1',
  'sm:col-span-1',
];

const tints = ['#EEF0FB', '#F3F1FA', '#FAF6EC', '#F0F4EC', '#FAF0F2', '#EEF0FB', '#F3F1FA'];

export default function CategoryBento() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-primary/70 block mb-1.5">
            Shop by category
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
            Find what you came for
          </h2>
        </div>
        <Link to="/catalog" className="hidden sm:inline text-sm font-bold text-brand-primary hover:text-brand-dark underline underline-offset-4 shrink-0">
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 sm:auto-rows-[168px] gap-3 sm:gap-4">
        {categories.map((c, i) => {
          const small = c.image?.endsWith('.webp') ? c.image.replace(/\.webp$/, '-600.webp') : null;
          return (
            <Link
              key={c.id}
              to={`/catalog?category=${c.id}`}
              aria-label={`Browse ${c.title}`}
              className={`group relative block rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-auto ${spans[i] ?? 'sm:col-span-1'}`}
            >
              <SmartImage
                src={c.image}
                srcMobile={small || undefined}
                alt=""
                tint={tints[i % tints.length]}
                className="absolute inset-0"
                imgClassName="transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-end justify-between gap-2">
                <span className="font-bold text-white text-base sm:text-lg leading-snug tracking-tight drop-shadow">
                  {c.title}
                </span>
                <span className="shrink-0 w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  &rarr;
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
