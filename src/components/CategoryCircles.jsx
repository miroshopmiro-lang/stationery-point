import React from 'react';
import { Link } from 'react-router-dom';
import { useActiveCategories } from '../data/catalog';
import SmartImage from './SmartImage';


/*
 * AI PRODUCT SHOTS (17 Sep 2026): category-tiles/*.webp were a generic cream/beige flatlay
 * stock set that didn't match the site's locked palette or the flyingtiger-style studio shots
 * used everywhere else on the site. Fixed at the source, categories.json's `image` field now
 * points at the AI shots directly, so this renders correctly here AND on the /catalog landing
 * page's category cards, which used the same stock set. office-supplies, art-supplies,
 * craft-material and party-gifts reuse assets already generated for other rails; stationery is
 * a dedicated studio shot (pen + pencil + notebook grouping), since no single real product
 * represents the whole "Stationery" department.
 */

/*
 * CATEGORY CIRCLES, copied from flyingtiger.com and dickblick.com.
 *
 * Both use CIRCULAR category tiles, verified from rendered screenshots at 375px on
 * 17 Aug 2026, a detail no DOM query surfaced:
 *   flyingtiger.com  "Shop by category", circular photo tiles, bold label CENTRED
 *                    BENEATH the circle, horizontal scroll at phone width.
 *   dickblick.com    "Browse Featured Categories", circles filled with solid brand
 *                    colours (blue, blue, red), heading centred with a "View All"
 *                    underlined link beneath it.
 * Two of four references use circles for this block, so circles it is. hobbycraft is the
 * odd one out with rounded-rect tiles, and we already copy its product card instead.
 *
 * Horizontal scroll rail at 375px is flyingtiger's behaviour, categories run off the
 * right edge and you swipe. It keeps the block to a single row instead of a tall grid,
 * which matters because the kit tiles above it already occupy two rows.
 */

export default function CategoryCircles() {
  // Active categories, not the raw file: a circle for an empty category is a dead end.
  const items = useActiveCategories();
  if (!items.length) return null;

  return (
    <section aria-labelledby="cat-circles-heading" className="band-doodle">
      <div className="max-w-[1280px] mx-auto py-8 lg:py-14">
        {/* Heading centred with an underlined "view all" beneath, blick's treatment. */}
        <div className="px-4 lg:px-8 text-center"><div className="band-title">
          <h2
            id="cat-circles-heading"
            className="font-bold tracking-tight text-ink text-[22px] leading-[1.18] lg:text-[32px]"
          >
            Shop by <span className="hl-slant">category</span>
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
        </div></div>

        {/* Horizontal scroll rail, flyingtiger's phone behaviour. Scrolls inside itself so
            the page body never scrolls sideways. */}
        <ul
          className="mt-6 flex gap-4 overflow-x-auto px-4 pb-2 lg:px-8 lg:gap-7
                     [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                     snap-x snap-mandatory
                     lg:flex-wrap lg:justify-center lg:overflow-visible"
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
                {/* Bold label centred BENEATH the circle, flyingtiger's treatment. */}
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
