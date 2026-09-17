import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/productData';
import ProductCard from './ProductCard';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

/*
 * OFFERS RAIL — copied from hobbycraft.co.uk's "Our best offers" block, verified from a
 * rendered screenshot at 375px on 17 Aug 2026.
 *
 * What hobbycraft actually does:
 *   - Section sits on a WARM TINTED band, not white, so the white cards lift off it
 *   - Heading centred above the rail
 *   - Horizontal rail of product cards, roughly 2.2 visible at 375px so the cut-off third
 *     card signals "swipe" without needing an affordance
 *   - Big WHITE CIRCULAR arrow buttons with brand-colour chevrons, overlaid ON the cards at
 *     the left and right edges, vertically centred
 *   - A single "Shop All Offers" PILL button, centred, beneath the rail
 *
 * Ours uses the brand tint (#EEF0FB) in place of hobbycraft's cream — our locked palette has
 * no cream, and CO-3 in the audit noted every reference separates sections with a pure grey
 * band while ours carries the brand hue instead.
 *
 * Renders NOTHING when there are no discounted products. An offers rail with nothing in it
 * advertises neglect, and dickblick's four-carousel homepage only works because a
 * merchandising team fills it daily.
 */

// Only genuine below-MRP items belong in an offers rail.
const offers = products.filter((p) => p.mrp && p.ourPrice && Number(p.mrp) > Number(p.ourPrice));

export default function OffersRail() {
  const railRef = useRef(null);

  if (offers.length === 0) return null;

  const scrollBy = (dir) => {
    const rail = railRef.current;
    if (!rail) return;
    // Advance by roughly one card plus its gap.
    rail.scrollBy({ left: dir * 180, behavior: 'smooth' });
  };

  return (
    <section aria-labelledby="offers-heading" className="bg-bed">
      <div className="max-w-[1280px] mx-auto py-8 lg:py-14">
        <div className="px-4 lg:px-8 text-center">
          <h2
            id="offers-heading"
            className="font-bold tracking-tight text-ink text-[22px] leading-[1.18] lg:text-[32px]"
          >
            Below MRP right now
          </h2>
          <p className="mt-2 text-[14px] leading-relaxed text-muted max-w-md mx-auto lg:text-[15px]">
            Everyday prices, not a sale. Add what you need to a list and send it in one message.
          </p>
        </div>

        <div className="relative mt-6">
          {/* Rail. ~2.2 cards visible at 375px — hobbycraft's cut-off-card swipe cue. */}
          <ul
            ref={railRef}
            className="flex gap-4 overflow-x-auto px-5 pb-2 lg:px-8 lg:gap-6
                       [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                       snap-x snap-mandatory"
          >
            {offers.map((p) => (
              <li
                key={p.id ?? p.name}
                className="shrink-0 snap-start flex w-[158px] sm:w-[190px] lg:w-[232px]"
              >
                <ProductCard product={p} />
              </li>
            ))}
          </ul>

          {/* White circular arrows overlaid on the card edges — hobbycraft's controls.
              Desktop only: at 375px the cut-off card already communicates swipe, and
              hobbycraft's own arrows sit outside the thumb path on a phone. */}
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Scroll offers left"
            className="hidden lg:flex absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full
                       bg-white shadow-card text-brand-primary items-center justify-center
                       transition-colors duration-text ease-ref hover:bg-brand-accent
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Scroll offers right"
            className="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full
                       bg-white shadow-card text-brand-primary items-center justify-center
                       transition-colors duration-text ease-ref hover:bg-brand-accent
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Centred pill beneath the rail — hobbycraft's "Shop All Offers". */}
        <div className="mt-6 flex justify-center px-4">
          <Link
            to="/catalog"
            className="inline-flex items-center justify-center min-h-[48px] rounded-full
                       bg-brand-primary text-white font-semibold px-7 text-[15px]
                       transition-colors duration-text ease-ref hover:bg-brand-dark
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            See the full catalogue
          </Link>
        </div>
      </div>
    </section>
  );
}
