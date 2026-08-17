import React from 'react';
import { Link } from 'react-router-dom';
import categoriesFile from '../data/categories.json';
import SmartImage from './SmartImage';

const items = categoriesFile.items || [];

/*
 * CATEGORY CIRCLES — copied from flyingtiger.com and dickblick.com.
 *
 * Both use CIRCULAR category tiles, verified from rendered screenshots at 375px on
 * 17 Aug 2026 — a detail no DOM query surfaced:
 *   flyingtiger.com  "Shop by category" — circular photo tiles, bold label CENTRED
 *                    BENEATH the circle, horizontal scroll at phone width.
 *   dickblick.com    "Browse Featured Categories" — circles filled with solid brand
 *                    colours (blue, blue, red), heading centred with a "View All"
 *                    underlined link beneath it.
 * Two of four references use circles for this block, so circles it is. hobbycraft is the
 * odd one out with rounded-rect tiles, and we already copy its product card instead.
 *
 * Horizontal scroll rail at 375px is flyingtiger's behaviour — categories run off the
 * right edge and you swipe. It keeps the block to a single row instead of a tall grid,
 * which matters because the kit tiles above it already occupy two rows.
 */

export default function CategoryCircles() {
  if (!items.length) return null;

  return (
    <section aria-labelledby="cat-circles-heading" className="bg-brand-soft">
      <div className="max-w-[1280px] mx-auto py-8 lg:py-14">
        {/* Heading centred with an underlined "view all" beneath — blick's treatment. */}
        <div className="px-4 lg:px-8 text-center">
          <h2
            id="cat-circles-heading"
            className="font-bold tracking-tight text-brand-primary text-[22px] leading-[1.18] lg:text-[32px]"
          >
            Shop by category
          </h2>
          <Link
            to="/catalog"
            className="inline-block mt-1.5 text-[14px] font-medium text-brand-primary underline
                       decoration-1 underline-offset-4
                       transition-colors duration-text ease-ref hover:text-brand-dark
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
          >
            View all
          </Link>
        </div>

        {/* Horizontal scroll rail — flyingtiger's phone behaviour. Scrolls inside itself so
            the page body never scrolls sideways. */}
        <ul
          className="mt-6 flex gap-4 overflow-x-auto px-4 pb-2 lg:px-8 lg:gap-7
                     [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                     snap-x snap-mandatory"
        >
          {items.map((c) => (
            <li key={c.id} className="shrink-0 snap-start">
              <Link
                to={`/catalog?category=${c.id}`}
                className="group flex flex-col items-center gap-2.5 w-[104px] lg:w-[140px]
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-xl"
              >
                {/* The circle. Overflow-hidden + rounded-full so the art is masked to a disc. */}
                <div
                  className="relative w-[104px] h-[104px] lg:w-[140px] lg:h-[140px] rounded-full
                             overflow-hidden bg-white
                             transition-colors duration-surface ease-ref group-hover:bg-brand-accent"
                >
                  <SmartImage
                    src={c.image}
                    alt=""
                    tint="#332E92"
                    className="absolute inset-0"
                  />
                </div>
                {/* Bold label centred BENEATH the circle — flyingtiger's treatment. */}
                <span
                  className="text-center text-[14px] font-semibold leading-tight text-ink
                             transition-colors duration-text ease-ref group-hover:text-brand-primary"
                >
                  {c.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
