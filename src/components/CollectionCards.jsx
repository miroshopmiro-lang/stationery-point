import React from 'react';
import { Link } from 'react-router-dom';
import collectionsFile from '../data/collections.json';
import SmartImage from './SmartImage';

const collections = collectionsFile.collections;

// This is the section that stands in for Jags's "Best Sellers" / "New
// Arrivals" product carousels. We have no per-SKU photography and no item
// data yet, so rather than fake individual products we merchandise at the
// collection level — which also avoids Jags's actual failure here, where the
// same five colour variants of one product repeat down the whole page.
//
// Horizontal scroll-snap on mobile (thumb-friendly, no pagination to build),
// grid on desktop.
export default function CollectionCards() {
  return (
    <section className="py-12 sm:py-16 bg-brand-soft/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-primary/70 block mb-1.5">
              Popular collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
              What people come in for
            </h2>
          </div>
          <Link to="/catalog" className="hidden sm:inline text-sm font-bold text-brand-primary hover:text-brand-dark underline underline-offset-4 shrink-0">
            View all
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <ul className="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none px-4 sm:px-6 lg:grid lg:grid-cols-4 lg:overflow-visible">
          {collections.map((c) => (
            <li key={c.id} className="snap-start shrink-0 w-[64%] sm:w-[38%] lg:w-auto">
              <Link
                to={c.to}
                className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-soft hover:-translate-y-1 hover:shadow-lg transition-[transform,box-shadow] duration-300 h-full"
              >
                <SmartImage
                  src={c.image}
                  alt=""
                  tint={c.tint}
                  className="aspect-[4/3]"
                  imgClassName="transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-snug group-hover:text-brand-primary transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{c.blurb}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
