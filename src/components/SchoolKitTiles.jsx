import React from 'react';
import { Link } from 'react-router-dom';
import kitData from '../data/kitTiles.json';
import SmartImage from './SmartImage';

/*
 * SCHOOL KIT TILE BLOCK — copied 1:1 from smiggle.co.uk's "READY. SET. BACK TO SCHOOL."
 * block, verified from a rendered screenshot at 375px on 17 Aug 2026.
 *
 * The structure being copied, exactly:
 *   - Section heading: uppercase, CENTRED, bold  (smiggle centres; flyingtiger left-aligns —
 *     we follow smiggle here because this is smiggle's block)
 *   - SIX tiles, TWO per row, three rows at phone width
 *   - Tile = light neutral square panel, product photo centred on it
 *   - Label sits INSIDE the tile, BELOW the image, centred, and UNDERLINED
 *   - The PRICE-BAND tile is FIRST and is the ONLY tile carrying a badge
 *     (smiggle: "HOT OFFER", blue roundel, top-right corner)
 *   - The price-band tile's image shows a COMPLETE KIT while every other tile shows a
 *     SINGLE item. That contrast is the merchandising: the bundle visibly has more in it.
 *
 * WHY THIS BLOCK SITS DIRECTLY UNDER THE HERO: smiggle puts it above every product, every
 * collection and every category. In the school-buying season a parent's first question is
 * "how much for the whole list", not "show me bags". Moving it lower would be our judgement
 * overriding their proven placement, so it stays where they put it.
 *
 * Brand swap only. Tile set is data-driven because smiggle rotates tiles 5-6 by campaign.
 */

function KitTile({ tile }) {
  return (
    <Link
      to={tile.to}
      className="group relative flex flex-col rounded-lg bg-brand-soft overflow-hidden
                 transition-colors duration-surface ease-ref hover:bg-hairline
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
    >
      {/* Square media panel, product centred. smiggle's tiles are near-square (821x858 native). */}
      <div className="relative aspect-square">
        <SmartImage
          src={tile.image}
          alt=""
          tint="#EEF0FB"
          className="absolute inset-0"
        />

        {/* Roundel badge — smiggle puts one on the lead tile only, top-right.
            Chartreuse with deep indigo text measures 7.9:1, a comfortable AA pass. */}
        {/* Roundel sized to ~26% of tile width, matching smiggle's proportion. Was 52px on a
            166px tile (35%), which the audit flagged as oversized against their badge. */}
        {tile.badge && (
          <span
            className="absolute top-1.5 right-1.5 w-[43px] h-[43px] rounded-full bg-brand-accent
                       text-brand-dark text-[9px] font-bold uppercase leading-[1.1]
                       flex items-center justify-center text-center px-0.5"
          >
            {tile.badge}
          </span>
        )}
      </div>

      {/* Label inside the tile, below the image, centred, underlined.
          Tightened to smiggle's spacing: the audit measured our label sitting ~21px off the
          tile bottom against their ~13px, and our row gap at 14px against their ~6-7px, which
          made the whole block read roughly twice as loose as theirs.
          min-h reserves two lines so a wrapping label ("Bottles & Lunch Boxes") does not break
          the row baseline against its neighbours. */}
      <span className="px-1.5 pb-2 pt-1.5 text-center">
        <span className="block min-h-[34px] text-[14px] font-semibold leading-[1.2] text-ink underline
                         decoration-1 underline-offset-2
                         transition-colors duration-text ease-ref group-hover:text-brand-primary">
          {tile.label}
        </span>
      </span>
    </Link>
  );
}

export default function SchoolKitTiles() {
  const { heading, subheading, tiles } = kitData;

  return (
    <section aria-labelledby="kit-tiles-heading" className="bg-white">
      <div className="max-w-[1280px] mx-auto px-4 py-8 lg:px-8 lg:py-14">
        {/* Uppercase, centred heading — smiggle's treatment for this block. */}
        <h2
          id="kit-tiles-heading"
          className="text-center font-bold uppercase tracking-tight text-brand-primary
                     text-[22px] leading-[1.18] lg:text-[32px]"
        >
          {heading}
        </h2>
        {subheading && (
          <p className="mt-2 text-center text-[14px] leading-relaxed text-muted max-w-md mx-auto lg:text-[15px]">
            {subheading}
          </p>
        )}

        {/* Two per row at phone width — smiggle's grid. Three across from tablet up. */}
        {/* Row gap tightened to smiggle's ~6-7px. Ours was 14px. */}
        <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-2 sm:gap-4 lg:grid-cols-3 lg:gap-6">
          {tiles.map((tile) => (
            <KitTile key={tile.id} tile={tile} />
          ))}
        </div>
      </div>
    </section>
  );
}
