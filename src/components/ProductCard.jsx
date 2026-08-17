import React from 'react';
import { waLink } from '../lib/utils';
import { useEnquiryList, productKey } from '../context/EnquiryListContext';
import { WhatsAppIcon, PlusIcon, MinusIcon, StarIcon } from './icons';
import SmartImage from './SmartImage';

/*
 * PRODUCT CARD — copied from hobbycraft.co.uk, measured live and verified from a rendered
 * screenshot at 375px on 17 Aug 2026.
 *
 * Chosen over flyingtiger's card deliberately: FT's product image bleeds edge to edge with no
 * border, no radius and no shadow, which only survives because every one of their photos shares
 * a single background treatment. Our photos come from mixed sources (distributor packs, licensed
 * stock, phone shots through the background-removal tool), so an untreated bleed would look
 * broken across inconsistent backgrounds. Hobbycraft's frame absorbs that.
 *
 * Hobbycraft's measured card, which this reproduces:
 *   tile        151x301 @375, 212x362 @768
 *   image       1:1, 149px @375  (NOT 4:3 — the old version of this file used 4:3)
 *   card        white, 1px #F2F2F2 border, radius 4px, shadow 0 0 8px rgba(0,0,0,.1)
 *   base pad    padding-bottom 40px, reserving space so the CTA sits flush at the bottom of
 *               EVERY card regardless of how many lines the title runs to. That is how their
 *               rail gets a perfectly aligned row of CTAs. Ours is 44px for the tap target.
 *   title       15px / 400 / line-height 1.5
 *   price       bold near-black, with the list price struck alongside in grey
 *   stars       BRAND colour with half-star rendering, plus a bracketed count at 13px
 *   CTA         full width, flush to card base, radius 0 0 4px 4px, icon + label, 14px/600
 *
 * Two departures, both deliberate:
 *   - Paint-only transitions, no transform. Hobbycraft transitions zero transforms; the old
 *     version of this file used hover:scale-102 and hover:-translate-y-1, which are exactly
 *     what hurts on a mid-range Android.
 *   - No stock badge. Without live POS sync a stock claim is a lie, so it is omitted entirely
 *     rather than guessed.
 */

// Rendered when a product has no photograph yet, so the grid keeps its rhythm.
function CardImagePlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-brand-soft" aria-hidden="true">
      <svg viewBox="0 0 32 32" className="w-9 h-9 opacity-25">
        <rect width="32" height="32" rx="8" fill="#332E92" />
        <path d="M9 22L20 6l4 3-11 16-5 1z" fill="#CDD661" />
      </svg>
    </div>
  );
}

/* Star row — hobbycraft renders these in its BRAND colour, not gold, with a half-star and a
   bracketed count. We only ever render this when there is a real count: a bare "5 out of 5"
   with no count (which dickblick does) reads identically whether it came from 1 review or 400. */
function StarRating({ rating, count }) {
  if (!rating || !count) return null;
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;

  return (
    <div className="flex items-center gap-1">
      <span className="flex items-center gap-px" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <StarIcon
            key={i}
            className={
              'w-3.5 h-3.5 ' +
              (i < full
                ? 'text-brand-primary'
                : i === full && half
                  ? 'text-brand-primary opacity-50'
                  : 'text-hairline')
            }
          />
        ))}
      </span>
      <span className="text-[13px] text-muted tabular-nums">({count})</span>
      <span className="sr-only">{`Rated ${rating} out of 5 from ${count} reviews`}</span>
    </div>
  );
}

export default function ProductCard({ product }) {
  const { add, setQty, getQty } = useEnquiryList();
  const key = productKey(product);
  const qty = getQty(key);

  const hasBothPrices = product.mrp && product.ourPrice;
  const saving = hasBothPrices ? Number(product.mrp) - Number(product.ourPrice) : 0;
  const savingPct = hasBothPrices ? Math.round((saving / Number(product.mrp)) * 100) : 0;

  return (
    {/* h-full so every card in a rail or grid is the same height. Without it the cards size to
        their own content, their bottoms land at different points, and the bottom-pinned CTAs
        stop aligning — the audit measured a one-line title lifting a card's CTA ~22px above its
        neighbours. hobbycraft's row aligns because the cards are equal height AND the CTA is
        pinned; both halves are needed. */}
    <article
      className="relative flex flex-col h-full bg-white rounded border border-hairline shadow-card overflow-hidden
                 transition-colors duration-surface ease-ref hover:border-brand-primary/40"
      style={{ paddingBottom: 44 }}
    >
      {/* 1:1 media panel — hobbycraft's ratio. */}
      <div className="relative aspect-square">
        {product.image ? (
          <SmartImage src={product.image} alt={product.name} tint="#EEF0FB" className="absolute inset-0" />
        ) : (
          <CardImagePlaceholder />
        )}

        {/* Badge top-left over the image. hobbycraft places its offer badge here.
            Chartreuse on deep indigo measures 7.9:1, a comfortable AA pass. */}
        {product.newArrival && (
          <span className="absolute top-2 left-2 rounded bg-brand-accent text-brand-dark
                           text-[12px] font-bold uppercase tracking-[0.04em] px-2 py-1">
            New
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1 px-3 pt-2.5">
        {/* Title 15px/400, line-height 1.5 — hobbycraft exactly. Two lines then clamp;
            Indian SKU names run long and a 1.0 line-height would collide. */}
        {/* Two lines reserved always (15px x 1.5 x 2 = 45px) so a one-line name does not pull
            the price and stars up and ragged the row. */}
        <h3 className="text-[15px] font-normal leading-[1.5] text-ink line-clamp-2 min-h-[45px]">
          {product.name}
        </h3>

        {product.brand && (
          <p className="text-[12px] font-medium text-muted">{product.brand}</p>
        )}

        {/* PRICE — hobbycraft shows net price bold with the list price struck alongside.
            The savings line beneath is dickblick's mechanic: net price dominates at a larger
            size, the saving supports it smaller. Their measured relationship is price 16px/600
            with the saving at 11px/500, i.e. the saving never competes with the price. */}
        {hasBothPrices ? (
          <div className="mt-0.5">
            <span className="flex items-baseline gap-2">
              <span className="text-[17px] font-bold text-ink tabular-nums">
                ₹{Number(product.ourPrice).toLocaleString('en-IN')}
              </span>
              <span className="text-[14px] text-muted line-through tabular-nums">
                ₹{Number(product.mrp).toLocaleString('en-IN')}
              </span>
            </span>
            {saving > 0 && (
              <span className="mt-1 inline-block rounded bg-brand-accent text-brand-dark
                               text-[12px] font-bold px-1.5 py-0.5 tabular-nums">
                Save ₹{saving.toLocaleString('en-IN')} · {savingPct}% off MRP
              </span>
            )}
          </div>
        ) : product.price ? (
          <span className="mt-0.5 text-[17px] font-bold text-ink">{product.price}</span>
        ) : (
          // No price is worse than any price — the research is explicit that a customer with
          // no number on screen leaves for Amazon. Never render an empty price slot.
          <span className="mt-0.5 text-[13px] font-medium text-muted">
            WhatsApp for today&rsquo;s price
          </span>
        )}

        <StarRating rating={product.rating} count={product.reviewCount} />
      </div>

      {/* CTA flush to the card base, full width, bottom corners only — hobbycraft's pattern.
          The reserved paddingBottom above is what keeps every CTA in a rail aligned. */}
      <div className="absolute bottom-0 left-0 right-0 flex items-stretch">
        {qty === 0 ? (
          <button
            type="button"
            onClick={() => add(product)}
            aria-label={`Add ${product.name} to enquiry list`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 h-11 rounded-b
                       bg-brand-primary text-white text-[14px] font-semibold
                       transition-colors duration-text ease-ref hover:bg-brand-dark
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            <PlusIcon className="w-4 h-4 shrink-0" />
            Add to list
          </button>
        ) : (
          <div
            role="group"
            aria-label={`${product.name} quantity in enquiry list`}
            className="flex-1 flex items-center justify-between h-11 rounded-bl bg-brand-soft px-1"
          >
            <button
              type="button"
              onClick={() => setQty(key, qty - 1)}
              aria-label={`Decrease quantity of ${product.name}`}
              className="w-10 h-10 flex items-center justify-center text-brand-primary rounded
                         transition-colors duration-text ease-ref hover:bg-white"
            >
              <MinusIcon className="w-4 h-4" />
            </button>
            <span className="text-[15px] font-bold tabular-nums text-brand-primary" aria-live="polite">
              {qty}
            </span>
            <button
              type="button"
              onClick={() => setQty(key, qty + 1)}
              aria-label={`Increase quantity of ${product.name}`}
              className="w-10 h-10 flex items-center justify-center text-brand-primary rounded
                         transition-colors duration-text ease-ref hover:bg-white"
            >
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>
        )}
        <a
          href={waLink(product.name)}
          target="_blank"
          rel="noreferrer"
          aria-label={`Enquire about ${product.name} on WhatsApp`}
          className="shrink-0 w-12 h-11 inline-flex items-center justify-center rounded-br
                     bg-[#25D366] text-white
                     transition-colors duration-text ease-ref hover:bg-[#1da851]
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
        >
          <WhatsAppIcon className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
}
