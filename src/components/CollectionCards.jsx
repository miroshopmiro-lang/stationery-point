import React from 'react';
import { Link } from 'react-router-dom';
import collectionsFile from '../data/collections.json';
import SmartImage from './SmartImage';

const collections = collectionsFile.collections;

/*
 * AI PRODUCT SHOTS (16 Sep 2026): same homepage-only override as NewInRail.jsx / ProductRail.jsx
 * — see NewInRail.jsx for the full reasoning. Keyed by collection id since collections.json has
 * no product id, but most of these tile images are the same real photos already replaced for
 * the other two rails, so this reuses those generated assets directly.
 */
const HOME_SHOT_OVERRIDES = {
  'copier-paper': '/ai-product-shots/01-reflection-paper-a4-80-gsm.webp',
  'craft-material': '/ai-product-shots/20-jags-air-dry-clay-250g.webp',
  sketch: '/ai-product-shots/14-camel-sketch-pen-24pcs.webp',
  'colour-pencils': '/ai-product-shots/16-camel-colour-pencil-24-shades.webp',
  crayons: '/ai-product-shots/19-fc-jumbo-washable-crayons-24-shades.webp',
  brushes: '/ai-product-shots/07-doms-brush-pen-12-shade.webp',
  tapes: '/ai-product-shots/09-alpha-clear-tape-2-inch.webp',
  notebooks: '/ai-product-shots/33-factor-note-notebook.webp',
};

/*
 * COLLECTION TILES — hobbycraft's category tile row (3:2 media, two across at 375, four at
 * desktop, centred heading with an underlined "View all" beneath), carrying smiggle's tile
 * anatomy: the label sits INSIDE the tile on the media bed, centred and underlined.
 *
 * Why the label moved inside (AUDIT-01, "THE OLD BLOCKS"): the previous version put the label
 * and a blurb in a separate white panel below the media, which meant this block and the school
 * kit block twenty percent up the same page used two different tile languages. One page, one
 * tile language — and block 4 is the one copied 1:1 from a reference, so this one moves.
 *
 * Also closed from the same audit entry:
 *   - the eight media beds were pale indigo, PINK, CREAM and GREEN. Pink, cream and green are
 *     not in the locked palette. Every bed is now the one neutral, as smiggle does it.
 *   - elevation shadow removed. No measured reference card has one (flyingtiger: hairline,
 *     smiggle: flat bed).
 *   - the per-tile blurb removed. It cost ~30px a tile for copy that restated the title.
 *
 * The collection set itself is data, and every entry is validated against the real item list
 * before it ships — see the note in collections.json. A tile that lands on an empty grid is a
 * dead end, and this site does not dead-end.
 */
export default function CollectionCards() {
  return (
    <section aria-labelledby="collections-heading" className="bg-white">
      <div className="max-w-[1280px] mx-auto py-8 lg:py-14">
        <div className="px-4 lg:px-8 text-center">
          <h2
            id="collections-heading"
            className="font-bold tracking-tight text-ink text-[22px] leading-[1.18] lg:text-[32px]"
          >
            What people <span className="hl-slant">come in for</span>
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

        {/* Gap tightened towards smiggle's tile rhythm (~6-7px) from the 12px this block
            carried; the audit measured our tile blocks as roughly twice as loose as theirs. */}
        <ul className="mt-5 grid grid-cols-2 gap-2 px-4 lg:grid-cols-4 lg:gap-4 lg:px-8">
          {collections.map((c) => (
            <li key={c.id}>
              <Link
                to={c.to}
                className="group flex flex-col h-full rounded-lg bg-bed overflow-hidden
                           transition-colors duration-surface ease-ref hover:bg-hairline
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                {/* 3:2 — hobbycraft's measured tile ratio, held at both breakpoints. */}
                <div className="relative aspect-[3/2]">
                  <SmartImage
                    src={HOME_SHOT_OVERRIDES[c.id] || c.image}
                    alt=""
                    tint="var(--bed)"
                    className="absolute inset-0"
                  />
                </div>

                {/* Label inside the tile, centred, underlined — block 4's anatomy exactly.
                    min-h reserves two lines so a wrapping title ("Brushes & Brush Pens") does
                    not drop its row's baseline against the tile beside it. */}
                <span className="px-1.5 pb-2 pt-1.5 text-center">
                  <span
                    className="block min-h-[34px] text-[14px] font-semibold leading-[1.2] text-ink
                               underline decoration-1 underline-offset-2
                               transition-colors duration-text ease-ref group-hover:text-brand-primary"
                  >
                    {c.title}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
