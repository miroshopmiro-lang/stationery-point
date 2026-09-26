import React from 'react';
import brandsFile from '../data/brands.json';

// Brands stocked. Jags has no equivalent section, and per the Reddit research
// Kerala shoppers check brand availability before deciding to travel to a shop
//, so this is both a trust signal and a search play.
//
// Only the photo-confirmed list renders. `unconfirmed` entries in brands.json
// stay out until Sam signs the list off; naming a brand a shop doesn't carry
// is a promise broken at the counter.
const brands = brandsFile.confirmed.map((b) => b.name);

export default function BrandWall() {
  return (
    <section className="band-doodle py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-6 band-title">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-primary/70 block mb-1.5">
            On our shelves
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
            Brands <span className="hl-slant">we stock</span>
          </h2>
        </div>

        <ul className="flex flex-wrap gap-2 sm:gap-2.5">
          {brands.map((name) => (
            <li
              key={name}
              className="rounded-full border border-brand-primary/15 bg-white px-4 py-2 text-sm font-semibold text-gray-700"
            >
              {name}
            </li>
          ))}
        </ul>

        <p className="mt-5 inline-block rounded-full bg-white px-4 py-2 text-sm text-gray-700 shadow-sm">
          Looking for something else? Ask us. We carry more than we can list here.
        </p>
      </div>
    </section>
  );
}
