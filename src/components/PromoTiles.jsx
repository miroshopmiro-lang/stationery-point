import React from 'react';
import { Link } from 'react-router-dom';
import CtaLink from './CtaLink';
import SmartImage from './SmartImage';

/*
 * PROMO TILES — copied from flyingtiger.com's two-up promo block, verified from a rendered
 * screenshot at 375px on 17 Aug 2026.
 *
 * What flyingtiger actually does, and the single most useful thing found in the whole audit:
 *   Each tile is HALF PHOTOGRAPH / HALF FLAT COLOUR PANEL, and consecutive tiles ALTERNATE
 *   which side the photo sits on. Tile 1 = photo left, cream panel right. Tile 2 = pink panel
 *   left, photo right. The headline and a WHITE PILL BUTTON sit on the flat panel — never over
 *   the photograph, and never behind a scrim.
 *   dickblick.com does the same split inside white cards, so it is confirmed on two references.
 *
 * WHY IT MATTERS HERE: it means our generated artwork needs no clear zone, no dark region to
 * carry white text, and not one character of text inside the frame. The panel does all the
 * typographic work in HTML, so copy changes cost nothing and never require regenerating art.
 *
 * Note flyingtiger uses per-campaign colours here (cream+dark red, pink+green) rather than
 * its brand blue. We use the locked brand palette instead — a deliberate departure, because
 * we have four locked colours and no seasonal palette to draw on.
 */

const tiles = [
  {
    id: 'bulk',
    eyebrow: 'Schools & offices',
    title: 'Buying for a whole class?',
    body: 'Send us the list. We quote with GST and you pay on invoice.',
    // Shown at every width (body is hidden on phones beside a photo). Sam, 23 Sep 2026.
    note: 'Delivery for corporate orders only. T&C apply.',
    cta: { label: 'Get a bulk quote', to: 'wa:bulk' },
    // AI studio shot (17 Sep 2026) of Sam's real JK Copier A4 ream, same treatment as the
    // rest of the site — replaces the real phone-camera photo that read as "cheap" here.
    image: '/ai-product-shots/03-jk-copy-paper-a4-80gsm.webp',
    panel: 'bg-brand-primary',
  },
  {
    id: 'return-gifts',
    eyebrow: 'Parties & events',
    title: 'Return gifts, sorted in one trip.',
    body: 'Pick a budget per head and a quantity. We pack them ready to hand out.',
    // Was /catalog?category=return-gifts. Sam's item list files nothing under Return Gifts,
    // so that link landed on an empty grid — a dead end. Return gifts ARE a real part of the
    // shop, so the service stays and the CTA goes to a WhatsApp enquiry instead of being cut.
    cta: { label: 'Plan return gifts', to: 'wa:return-gifts' },
    // No photograph exists for this one and none of Sam's product shots honestly represents
    // a per-head return gift. Empty string, so the tile renders as a full-width panel rather
    // than reserving half its area for a placeholder. See PromoTile below.
    image: '',
    panel: 'bg-brand-dark',
    _imageBrief: 'Dense overhead of small plain gift boxes, coloured tissue, ribbon spools, plain pouches. Colour-blocked. No text, no logos.',
  },
];

function PromoTile({ tile, index }) {
  // flyingtiger alternates the photo side between consecutive tiles.
  const photoRight = index % 2 === 1;
  const hasPhoto = Boolean(tile.image);

  /*
   * A tile with no artwork spans the panel across the whole width instead of holding half
   * the tile open for a placeholder. AUDIT-01 ranked this block the single worst offender on
   * the page — "~50% of the block's area is blank white at 375" — and the cause was a photo
   * half reserved for art that does not exist. flyingtiger's split is still the pattern; a
   * tile just does not get one until it has a photograph to put in it.
   */
  return (
    <article className={(hasPhoto ? 'grid grid-cols-2 ' : '') + 'overflow-hidden rounded-lg'}>
      {/* PHOTO HALF — nothing overlaid on it, ever. */}
      {hasPhoto && (
        <div className={'relative aspect-square ' + (photoRight ? 'order-2' : 'order-1')}>
          <SmartImage src={tile.image} alt="" tint="var(--bed)" className="absolute inset-0" />
        </div>
      )}

      {/* PANEL HALF — flat colour, carries all the type and the pill button. */}
      <div
        className={
          tile.panel +
          ' flex flex-col justify-center px-4 py-5 lg:px-8 lg:py-10 ' +
          (hasPhoto ? (photoRight ? 'order-1' : 'order-2') : '')
        }
      >
        <span className="text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.12em] text-brand-accent mb-1.5">
          {tile.eyebrow}
        </span>
        <h3 className="text-white font-bold tracking-tight text-[15px] leading-[1.15] lg:text-[26px] lg:leading-[1.1] text-balance">
          {tile.title}
        </h3>
        <p className={(hasPhoto ? 'hidden sm:block ' : '') + 'mt-2 text-white/85 text-[13px] leading-relaxed lg:text-[15px]'}>
          {tile.body}
        </p>
        {tile.note && (
          <p className="mt-1.5 text-white/75 text-[11px] leading-snug lg:text-[13px]">
            {tile.note}{' '}
            <Link to="/terms#delivery" className="underline underline-offset-2">Details</Link>
          </p>
        )}
        {/* White pill on the flat panel — flyingtiger's exact CTA treatment. */}
        <CtaLink
          to={tile.cta.to}
          className="mt-3 lg:mt-5 inline-flex items-center justify-center self-start min-h-[40px] lg:min-h-[48px]
                     rounded-full bg-white text-brand-primary font-semibold px-4 lg:px-7 text-[13px] lg:text-[15px]
                     transition-colors duration-text ease-ref hover:bg-brand-accent hover:text-brand-dark
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {tile.cta.label}
        </CtaLink>
      </div>
    </article>
  );
}

// `only` renders a single tile by id, so the homepage can place the bulk and return-gift
// tiles in separate slots (Sam's section order, 23 Sep 2026). Omit it to render both.
export default function PromoTiles({ only }) {
  const shown = only ? tiles.filter((t) => t.id === only) : tiles;
  return (
    <section aria-label="Services" className="bg-white">
      <div className="max-w-[1280px] mx-auto px-4 py-8 lg:px-8 lg:py-14 grid gap-4 lg:gap-6">
        {shown.map((t, i) => (
          <PromoTile key={t.id} tile={t} index={i} />
        ))}
      </div>
    </section>
  );
}
