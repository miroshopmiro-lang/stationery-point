import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/productData';
import ProductCard from './ProductCard';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

/*
 * HOMEPAGE PRODUCT RAIL (AUDIT-02 #2), header/nav rebuilt 16 Sep 2026 to match NewInRail's
 * flyingtiger-style layout: left-aligned plain heading, prev/next controls docked beside it
 * (visible at every breakpoint) instead of floating over the product images.
 *
 * AI PRODUCT SHOTS (16 Sep 2026): same homepage-only override as NewInRail.jsx — see that file
 * for the full reasoning. Product 8 (Camel Art Studio) deliberately has no override: its real
 * photo is an 80+ piece art case with dozens of tiny illegible pen/pencil labels, too much fine
 * print for an AI generation to reproduce reliably without risking a misleading label, so it
 * keeps Sam's real photo per the "next best product" fallback rule. Product 18 reuses product
 * 62's shot since both are the same DOMS Water Colour Pencils 24-shade box (id 18's name field
 * says "Colour Pencil" rather than "Water Colour Pencil", but the source photo is identical).
 */
const FEATURED_IDS = [1, 7, 8, 9, 11, 14, 16, 18, 19, 20];
const HOME_SHOT_OVERRIDES = {
  1: '/ai-product-shots/01-reflection-paper-a4-80-gsm.webp',
  7: '/ai-product-shots/07-doms-brush-pen-12-shade.webp',
  9: '/ai-product-shots/09-alpha-clear-tape-2-inch.webp',
  11: '/ai-product-shots/11-parker-pen-folio.webp',
  14: '/ai-product-shots/14-camel-sketch-pen-24pcs.webp',
  16: '/ai-product-shots/16-camel-colour-pencil-24-shades.webp',
  18: '/ai-product-shots/62-doms-water-colour-pencil-24shade.webp',
  19: '/ai-product-shots/19-fc-jumbo-washable-crayons-24-shades.webp',
  20: '/ai-product-shots/20-jags-air-dry-clay-250g.webp',
};
const featuredProducts = FEATURED_IDS
  .map((id) => products.find((p) => p.id === id))
  .filter(Boolean)
  .map((p) => (HOME_SHOT_OVERRIDES[p.id] ? { ...p, image: HOME_SHOT_OVERRIDES[p.id] } : p));

export default function ProductRail() {
  const railRef = useRef(null);

  if (featuredProducts.length === 0) return null;

  const scrollBy = (dir) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector('li');
    const step = card ? card.getBoundingClientRect().width + 12 : 200;
    rail.scrollBy({ left: dir * step * 2, behavior: 'smooth' });
  };

  return (
    <section aria-labelledby="featured-products-heading" className="bg-bed">
      <div className="max-w-[1280px] mx-auto py-8 lg:py-14">
        <div className="px-5 lg:px-8 flex items-end justify-between gap-4">
          <div>
            <h2
              id="featured-products-heading"
              className="font-bold tracking-tight text-ink text-[20px] leading-[1.2] lg:text-[28px]"
            >
              Popular in store <span className="hl-slant">right now</span>
            </h2>
            <p className="mt-1 text-[13px] text-muted lg:text-[14px]">
              Real stock on the shelves in Vyttila
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Scroll products left"
              className="flex w-9 h-9 lg:w-10 lg:h-10 rounded-full border border-ink/15 bg-white text-ink items-center justify-center shadow-card transition-colors duration-text ease-ref hover:bg-ink hover:text-white hover:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              <ChevronLeftIcon className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Scroll products right"
              className="flex w-9 h-9 lg:w-10 lg:h-10 rounded-full border border-ink/15 bg-white text-ink items-center justify-center shadow-card transition-colors duration-text ease-ref hover:bg-ink hover:text-white hover:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              <ChevronRightIcon className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
          </div>
        </div>

        <ul
          ref={railRef}
          className="mt-5 flex gap-4 overflow-x-auto px-5 pb-2 lg:px-8 lg:gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
        >
          {featuredProducts.map((p) => (
            <li
              key={p.id ?? p.name}
              className="shrink-0 snap-start flex w-[158px] sm:w-[190px] lg:w-[232px]"
            >
              <ProductCard product={p} />
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-center px-4">
          <Link
            to="/catalog"
            className="inline-flex items-center justify-center min-h-[48px] rounded-full bg-brand-primary text-white font-semibold px-7 text-[15px] transition-colors duration-text ease-ref hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            See the full catalogue
          </Link>
        </div>
      </div>
    </section>
  );
}
