import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/productData';
import ProductCard from './ProductCard';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

/*
 * HOMEPAGE 2027 DIARIES RAIL, added 24 Oct 2026 for the corporate-diary season.
 * Same layout as ProductRail (plain heading, prev/next beside the rail). One row of the
 * range, then the two ways in: the company-order page (name on the cover, 100 or more, Sam's
 * terms live there) and the catalogue. Prices are Sam's own, shown by ProductCard as given.
 * Mix of leatherette and printed covers, B5 and A5.
 */
const DIARY_CODES = ['S2809', 'S2811', 'S3057', 'S2817', 'S3051', 'S2824', 'S3050', 'S3055', 'S3058', 'S2820'];
const diaries = DIARY_CODES
  .map((code) => products.find((p) => p.name.includes(`(${code})`)))
  .filter(Boolean);

export default function DiariesRail() {
  const railRef = useRef(null);
  if (diaries.length === 0) return null;

  const scrollBy = (dir) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector('li');
    const step = card ? card.getBoundingClientRect().width + 12 : 200;
    rail.scrollBy({ left: dir * step * 2, behavior: 'smooth' });
  };

  return (
    <section aria-labelledby="diaries-heading" className="bg-white">
      <div className="max-w-[1280px] mx-auto py-8 lg:py-14">
        <div className="px-5 lg:px-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 id="diaries-heading" className="font-bold tracking-tight text-ink text-[20px] leading-[1.2] lg:text-[28px]">
              2027 diaries, <span className="hl-slant">from ₹114</span>
            </h2>
            <p className="mt-1.5 text-[14px] lg:text-[15px] text-muted">
              Buying for your company? Order 100 or more with your company name on the cover.
            </p>
          </div>
          <Link
            to="/corporate-diaries-kochi"
            className="inline-flex items-center justify-center w-fit min-h-[44px] bg-brand-primary text-white font-semibold px-5 text-[14px] transition-colors duration-text ease-ref hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            Company orders &rarr;
          </Link>
        </div>

        <div className="relative mt-5">
          <ul
            ref={railRef}
            className="flex gap-4 overflow-x-auto px-5 pb-2 lg:px-8 lg:gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
          >
            {diaries.map((p) => (
              <li key={p.id ?? p.name} className="shrink-0 snap-start flex w-[158px] sm:w-[190px] lg:w-[232px]">
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Scroll diaries left"
            className="hidden lg:flex absolute left-2 top-[30%] -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-card border border-ink/10 text-ink items-center justify-center transition-colors duration-text ease-ref hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Scroll diaries right"
            className="hidden lg:flex absolute right-2 top-[30%] -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-card border border-ink/10 text-ink items-center justify-center transition-colors duration-text ease-ref hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 flex justify-center px-4">
          <Link
            to="/catalog?category=office-supplies"
            className="inline-flex items-center justify-center min-h-[48px] rounded-full border border-brand-primary text-brand-primary font-semibold px-7 text-[15px] transition-colors duration-text ease-ref hover:bg-brand-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            See all diaries
          </Link>
        </div>
      </div>
    </section>
  );
}
