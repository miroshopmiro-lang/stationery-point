import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/productData';
import ProductCard from './ProductCard';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

/*
 * "NEW IN" RAIL — flyingtiger.com pattern, rebuilt 16 Sep 2026 on explicit direction to match
 * flyingtiger 1:1: left-aligned plain heading (no centred subtitle line — flyingtiger's "Shop
 * our favourites" carries no supporting sentence), prev/next controls docked in the HEADER row
 * rather than floating over the product images (the old floating-arrow-over-the-image approach
 * visually collided with the product photo and, being lg-only, left mobile with no visible way
 * to see more — arrows now render at every breakpoint).
 *
 * Sourced from `newArrival: true` on the product data (src/data/products/*.json), not a
 * hardcoded id list, so this stays correct as Sam's stock rotates.
 *
 * Selection basis (16 Sep 2026): from the 54 newly-photographed products, picked the ones with
 * (a) a verified real photo — checked against Sam's own item-list description, not just the
 * distributor filename, after two mismatches were caught this way (a 14-shade paint pack
 * photographed as 12-shade; a 1mm Posca marker photographed as 0.7mm) — and (b) visual/seasonal
 * pull: art and craft novelties and Diwali-adjacent home-decor items, the next seasonal pull
 * after Onam. Google Suggest was checked for demand signal but returned nothing Kochi-specific;
 * that granularity needs a paid keyword tool this project doesn't have.
 *
 * Images are Sam's own photos, resized only — no cropping or background compositing (see
 * tools/product-shots — the bed-composite pipeline was tried and rejected 16 Sep 2026 for
 * producing mismatched fill ratios across a grid; ProductCard's fixed aspect-square + object-
 * cover is what makes a grid of inconsistent source photos look uniform).
 *
 * AI PRODUCT SHOTS (16 Sep 2026): the homepage's own product photography read as "cheap" next
 * to a redesigned site — real phone-camera shots on a cluttered background. Direction was to
 * replace a FEW homepage-featured shots with proper studio-style AI-generated photography,
 * scoped to the homepage only (non-negotiable: this stays a homepage polish, not a catalogue
 * change — the full catalogue at Catalog.jsx keeps Sam's real photos, since a shopper who has
 * to describe an item over WhatsApp needs to recognise the real object, not a generated one).
 * HOME_SHOT_OVERRIDES below swaps in the AI shot only for this rail's rendering; each product's
 * own JSON `image` field is untouched. If a generated shot garbles its own packaging text,
 * drop its entry here rather than ship a misleading label.
 */
const HOME_SHOT_OVERRIDES = {
  34: '/ai-product-shots/34-apsara-pencil-pkt.webp',
  45: '/ai-product-shots/45-washi-tape.webp',
  55: '/ai-product-shots/55-fevicryl-mouldit.webp',
  60: '/ai-product-shots/60-camlin-play-dough-6shade.webp',
  62: '/ai-product-shots/62-doms-water-colour-pencil-24shade.webp',
  68: '/ai-product-shots/68-jags-dry-flower.webp',
  74: '/ai-product-shots/74-popular-jar-candle-perfumed.webp',
  77: '/ai-product-shots/77-fc-erasable-crayon-15shade.webp',
  79: '/ai-product-shots/79-uni-pin-fineliner-pen.webp',
};

const newArrivals = products
  .filter((p) => p.newArrival)
  .map((p) => (HOME_SHOT_OVERRIDES[p.id] ? { ...p, image: HOME_SHOT_OVERRIDES[p.id] } : p));

export default function NewInRail() {
  const railRef = useRef(null);

  if (newArrivals.length === 0) return null;

  const scrollBy = (dir) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector('li');
    const step = card ? card.getBoundingClientRect().width + 12 : 200;
    rail.scrollBy({ left: dir * step * 2, behavior: 'smooth' });
  };

  // Section background switched from bg-bed (the light indigo tint every other rail
  // sits on) to plain white on request 17 Sep 2026, to match the white the product
  // name/price sits on inside each card — the tint was reading as an off-white seam
  // between the card and the section instead of one continuous white surface.
  return (
    <section aria-labelledby="new-in-heading" className="bg-white">
      <div className="max-w-[1280px] mx-auto py-8 lg:py-14">
        <div className="px-5 lg:px-8 flex items-end justify-between gap-4">
          <div>
            <h2
              id="new-in-heading"
              className="font-bold tracking-tight text-ink text-[20px] leading-[1.2] lg:text-[28px]"
            >
              New In
            </h2>
            <p className="mt-1 text-[13px] text-muted lg:text-[14px]">
              Just landed at the shop
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Scroll new arrivals left"
              className="flex w-9 h-9 lg:w-10 lg:h-10 rounded-full border border-ink/15 bg-white text-ink items-center justify-center shadow-card transition-colors duration-text ease-ref hover:bg-ink hover:text-white hover:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              <ChevronLeftIcon className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Scroll new arrivals right"
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
          {newArrivals.map((p) => (
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
