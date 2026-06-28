import React from 'react';
import { Link } from 'react-router-dom';
import { waLink } from '../lib/utils';
import { WhatsAppIcon } from './icons';

export default function CategoryCard({ name, image, categoryId }) {
  const to = categoryId ? `/catalog?category=${categoryId}` : '/catalog';
  return (
    <div
      className="group relative aspect-[4/5] rounded-2xl p-5 flex flex-col justify-between overflow-hidden border border-gray-200/50 shadow-soft transition-[transform,box-shadow] duration-300 hover:scale-102 hover:-translate-y-1 bg-gray-50"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/35 group-hover:from-black/95 group-hover:via-black/45 transition-colors" />
      </div>

      <div className="relative z-10 min-w-0">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-gold">Category</span>
        <h3 className="mt-1 text-lg font-bold leading-tight text-white break-words">{name}</h3>
      </div>
      <div className="relative z-10 flex items-center gap-2">
        <Link to={to} className="text-xs font-semibold text-white/90 underline underline-offset-4 hover:text-brand-gold transition-colors">
          View items
        </Link>
        <a
          href={waLink(name)}
          target="_blank"
          rel="noreferrer"
          aria-label={`Enquire about ${name} on WhatsApp`}
          className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-[#25D366] text-white text-xs font-semibold px-3 py-2 hover:bg-[#1da851] transition-colors"
        >
          <WhatsAppIcon className="w-3.5 h-3.5" /> Enquire
        </a>
      </div>
    </div>
  );
}
