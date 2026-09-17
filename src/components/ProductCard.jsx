import React from 'react';
import { waLink } from '../lib/utils';
import { useEnquiryList, productKey } from '../context/EnquiryListContext';
import { WhatsAppIcon, PlusIcon, MinusIcon } from './icons';
import SmartImage from './SmartImage';

/*
 * PRODUCT CARD — rebuilt 16 Sep 2026 to flyingtiger.com's tile anatomy on explicit direction
 * ("get it 1:1 like the flying tiger one"). This replaces the hobbycraft-bordered-card
 * decision locked 4 Sep — superseded by this instruction.
 *
 * flyingtiger's measured tile:
 *   - NO card border, NO shadow, NO radius. The image sits directly on the page; tiles are
 *     separated only by grid/rail gutter.
 *   - Media: plain neutral-grey square (#F2F2F2), image itself letting the product be the only
 *     colour in the tile.
 *   - Badge: WHITE pill, black text, small, top-left over the image — not a brand-coloured tag.
 *   - No brand line, no star rating on the tile. Name, then price, then one flat CTA bar.
 *   - CTA is a single flat rectangular bar, no radius, no pill.
 *
 * Kept, deliberately not copied from flyingtiger (business-critical, not a style choice):
 *   - The WhatsApp enquiry action — Sam's whole sales flow runs through WhatsApp.
 *   - "Price on WhatsApp" in place of a real price, honestly, until Sam's price list lands.
 */

function CardImagePlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-bed" aria-hidden="true">
      <svg viewBox="0 0 32 32" className="w-9 h-9 opacity-25">
        <rect width="32" height="32" rx="8" fill="#332E92" />
        <path d="M9 22L20 6l4 3-11 16-5 1z" fill="#CDD661" />
      </svg>
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
    <article className="relative flex flex-col w-full h-full bg-white" style={{ paddingBottom: 44 }}>
      {/* Plain neutral-grey square media, no border, no radius — flyingtiger's tile. */}
      <div className="relative aspect-square bg-bed">
        {product.image ? (
          <SmartImage src={product.image} alt={product.name} tint="var(--bed)" className="absolute inset-0" />
        ) : (
          <CardImagePlaceholder />
        )}

        {product.newArrival && (
          <span className="absolute top-2 left-2 rounded-sm bg-white text-ink
                           text-[11px] font-semibold uppercase tracking-[0.02em] px-2 py-1">
            New in
          </span>
        )}
      </div>

      {/* Text/price sat flush against the card's edge — same edge as the full-bleed image
          above it — reading as clipped (flagged 17 Sep 2026, flyingtiger insets this content
          slightly from the media instead of running it edge-to-edge). px-1 gives it breathing
          room without touching the image, which stays full-bleed. */}
      <div className="flex flex-col gap-1 pt-2.5 px-1">
        <h3 className="text-[14px] font-normal leading-[1.4] text-ink line-clamp-2 min-h-[40px]">
          {product.name}
        </h3>

        {hasBothPrices ? (
          <div className="mt-0.5">
            <span className="flex items-baseline gap-2">
              <span className="text-[16px] font-bold text-ink tabular-nums">
                ₹{Number(product.ourPrice).toLocaleString('en-IN')}
              </span>
              <span className="text-[13px] text-muted line-through tabular-nums">
                ₹{Number(product.mrp).toLocaleString('en-IN')}
              </span>
            </span>
            {saving > 0 && (
              <span className="mt-1 inline-block bg-brand-accent text-brand-dark
                               text-[11px] font-bold px-1.5 py-0.5 tabular-nums">
                Save ₹{saving.toLocaleString('en-IN')} · {savingPct}% off MRP
              </span>
            )}
          </div>
        ) : (
          <span className="mt-0.5 block text-[13px] leading-[1.3] font-medium text-muted">
            Get your below MRP price on WhatsApp
          </span>
        )}
      </div>

      {/* Flat rectangular CTA bar, no radius — flyingtiger's "Add to bag" anatomy, with the
          WhatsApp action kept alongside since that is Sam's real sales channel.
          The WhatsApp segment used to sit as a solid #25D366 green block flush against the
          indigo bar — two saturated, unrelated brand colours colliding with no transition read
          as a slapped-on icon rather than a designed control (flagged 16 Sep 2026). It now stays
          in the card's own indigo family at rest, with a thin divider for separation, and only
          turns WhatsApp green on hover/focus — the colour becomes a confirmation of the action
          instead of a static clash. */}
      <div className="absolute bottom-0 left-0 right-0 flex items-stretch">
        {qty === 0 ? (
          <button
            type="button"
            onClick={() => add(product)}
            aria-label={`Add ${product.name} to enquiry list`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 h-11
                       bg-brand-primary text-white text-[13px] font-semibold
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
            className="flex-1 flex items-center justify-between h-11 bg-brand-soft px-1"
          >
            <button
              type="button"
              onClick={() => setQty(key, qty - 1)}
              aria-label={`Decrease quantity of ${product.name}`}
              className="w-10 h-10 flex items-center justify-center text-brand-primary
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
              className="w-10 h-10 flex items-center justify-center text-brand-primary
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
          className="shrink-0 w-12 h-11 inline-flex items-center justify-center
                     bg-brand-dark text-white border-l border-white/15
                     transition-colors duration-text ease-ref hover:bg-[#25D366]
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
        >
          <WhatsAppIcon className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
}
