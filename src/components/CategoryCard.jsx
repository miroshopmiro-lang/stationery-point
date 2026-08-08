import React from 'react';
import { Link } from 'react-router-dom';

// Category tile. The whole card is one link — no nested interactive elements,
// so nothing can overlap or steal the tap target. The per-category `color`
// prop is accepted for backwards compatibility but no longer rendered: the
// stock-palette chips it drove failed WCAG AA contrast and fought the brand.
export default function CategoryCard({ name, image, categoryId, count }) {
  const to = categoryId ? `/catalog?category=${categoryId}` : '/catalog';
  return (
    <Link
      to={to}
      aria-label={`Browse ${name} (${count ?? 0} items)`}
      className="group relative block aspect-[4/5] rounded-2xl overflow-hidden border border-gray-200/50 bg-gray-50 shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:ring-4 focus-visible:ring-brand-gold"
    >
      {/* Artwork */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={image}
          alt=""
          width={1200}
          height={1500}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-colors duration-300 group-hover:from-black/95" />
      </div>

      {/* Label block, bottom-left, nothing overlapping it */}
      <span className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-1.5 p-4">
        <span className="block font-extrabold text-xl sm:text-2xl leading-tight text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
          {name}
        </span>
        <span className="flex items-center gap-2">
          {count != null && (
            <span className="text-[11px] font-bold uppercase tracking-wide text-white/75">
              {count} item{count !== 1 ? 's' : ''}
            </span>
          )}
          <span className="text-brand-gold text-xs font-extrabold opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            Browse &rarr;
          </span>
        </span>
      </span>
    </Link>
  );
}
