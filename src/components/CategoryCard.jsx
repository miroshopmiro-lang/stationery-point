import React from 'react';
import { Link } from 'react-router-dom';

// Category tile. The whole card is one link — no nested interactive elements,
// so nothing can overlap or steal the tap target. The per-category `color` that
// drove the old chips is now gone from categories.json and from the CMS too:
// they were stock Tailwind 500s, failed WCAG AA on white text, and fought the
// brand palette.
export default function CategoryCard({ name, image, categoryId }) {
  const to = categoryId ? `/catalog?category=${categoryId}` : '/catalog';
  // The grid renders a tile at roughly 165px on a phone and 280px on desktop,
  // so the 1200px master is only ever needed on a large high-density screen.
  // tools/process-assets.mjs emits the -600 alongside every tile it writes.
  const small = image?.endsWith('.webp') ? image.replace(/\.webp$/, '-600.webp') : null;
  return (
    <Link
      to={to}
      aria-label={`Browse ${name}`}
      className="group relative block aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200/60 bg-gray-50 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:ring-4 focus-visible:ring-brand-gold"
    >
      {/* Artwork */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={image}
          {...(small && {
            srcSet: `${small} 600w, ${image} 1200w`,
            sizes: '(max-width: 767px) 45vw, (max-width: 1023px) 30vw, 23vw',
          })}
          alt=""
          width={1200}
          height={900}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
      </div>

      {/* Label block */}
      <span className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between p-4 sm:p-5">
        <span className="block font-bold text-base sm:text-lg leading-snug text-white tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
          {name}
        </span>
        <span className="flex items-center text-brand-gold text-xs font-bold opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0 ml-2">
          Browse &rarr;
        </span>
      </span>
    </Link>
  );
}
