import React from 'react';
import { Link } from 'react-router-dom';
import { waLink } from '../lib/utils';
import { WhatsAppIcon } from './icons';

// Comic-framed category tile. The WHOLE card is the link; the small WhatsApp
// button is a sibling layered above it (never nested inside the link).
export default function CategoryCard({ name, image, categoryId, count, color = '#332E92' }) {
  const to = categoryId ? `/catalog?category=${categoryId}` : '/catalog';
  return (
    <div className="group relative aspect-[4/5] rounded-2xl overflow-hidden border-[3px] border-ink bg-ink shadow-comic transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1.5 hover:shadow-comic-lg">
      {/* Artwork */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/25 to-ink/10 group-hover:via-ink/35 transition-colors duration-300" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 halftone-light opacity-60" />
      </div>

      {/* Whole-card link */}
      <Link to={to} className="absolute inset-0 z-10 flex flex-col justify-between p-4 focus-visible:ring-4 focus-visible:ring-brand-gold" aria-label={`Browse ${name} (${count ?? 0} items)`}>
        <span
          className="self-start rounded-lg border-2 border-ink text-white text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 shadow-comic-sm"
          style={{ backgroundColor: color }}
        >
          Category
        </span>
        <span className="block">
          <span className="font-comic text-2xl sm:text-3xl leading-none text-white tracking-wide drop-shadow-[2px_2px_0_rgba(30,27,75,0.9)]">
            {name}
          </span>
          <span className="mt-1.5 flex items-center gap-2">
            {count != null && (
              <span className="rounded-full bg-white/15 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-0.5">
                {count} item{count !== 1 ? 's' : ''}
              </span>
            )}
            <span className="text-brand-gold text-xs font-extrabold opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              Browse &rarr;
            </span>
          </span>
        </span>
      </Link>

      {/* WhatsApp quick-enquire (sibling, above the link) */}
      <a
        href={waLink(name)}
        target="_blank"
        rel="noreferrer"
        aria-label={`Enquire about ${name} on WhatsApp`}
        className="absolute z-20 bottom-3 right-3 inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#25D366] text-white border-2 border-ink shadow-comic-sm hover:bg-[#1da851] hover:scale-110 transition-all duration-200"
      >
        <WhatsAppIcon className="w-4 h-4" />
      </a>
    </div>
  );
}
