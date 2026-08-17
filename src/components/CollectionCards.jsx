import React from 'react';
import { Link } from 'react-router-dom';
import collectionsFile from '../data/collections.json';
import SmartImage from './SmartImage';

const collections = collectionsFile.collections;

// This is the section that stands in for Jags's "Best Sellers" / "New
// Arrivals" product carousels. We have no per-SKU photography and no item
// data yet, so rather than fake individual products we merchandise at the
// collection level — which also avoids Jags's actual failure here, where the
// same five colour variants of one product repeat down the whole page.
//
/*
 * Presentation copied from hobbycraft.co.uk's category tile row, verified from a rendered
 * screenshot at 375px on 17 Aug 2026: image with rounded top corners, an overlaid badge at
 * top-left where one applies, and the label BELOW the image in a white card area, left-aligned.
 * Their tiles measure 165x106 at 375px and 336x218 at 768px — a ~3:2 landscape ratio held at
 * both widths, two across at both. So 3:2 here, not 4:3.
 *
 * Heading is centred, following hobbycraft and dickblick (both centre this level of heading;
 * flyingtiger left-aligns, but we take the two that match our register). "View all" sits
 * centred beneath as an underlined link — dickblick's treatment.
 *
 * Removed: hover:-translate-y-1, group-hover:scale-105 and the 700ms image zoom. Those are
 * TRANSFORM transitions, and hobbycraft — the only reference whose motion was measured —
 * transitions ZERO transforms, paint properties only (0.2s text / 0.4s surface on
 * cubic-bezier(.3,.46,.45,.94)). Transforms on a scrolling image rail are exactly what drops
 * frames on a mid-range Android, which is most of this shop's traffic.
 * Also: rounded-2xl (16px) -> 4px, shadow-soft's 40px indigo glow -> hobbycraft's
 * 0 0 8px rgba(0,0,0,.1), and gray-100/gray-900/gray-500 -> brand-biased tokens.
 */
export default function CollectionCards() {
  return (
    <section aria-labelledby="collections-heading" className="bg-white">
      <div className="max-w-[1280px] mx-auto py-8 lg:py-14">
        <div className="px-4 lg:px-8 text-center">
          <h2
            id="collections-heading"
            className="font-bold tracking-tight text-brand-primary text-[22px] leading-[1.18] lg:text-[32px]"
          >
            What people come in for
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

        {/* Two across at 375px — hobbycraft's tile row. Four across at desktop. */}
        <ul className="mt-6 grid grid-cols-2 gap-3 px-4 lg:grid-cols-4 lg:gap-6 lg:px-8">
          {collections.map((c) => (
            <li key={c.id}>
              <Link
                to={c.to}
                className="group flex flex-col h-full bg-white rounded border border-hairline shadow-card
                           overflow-hidden transition-colors duration-surface ease-ref
                           hover:border-brand-primary/40
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                {/* 3:2 landscape — hobbycraft's measured tile ratio at both breakpoints. */}
                <SmartImage src={c.image} alt="" tint={c.tint} className="aspect-[3/2]" />
                <div className="p-3">
                  <h3
                    className="text-[14px] font-semibold leading-snug text-ink
                               transition-colors duration-text ease-ref group-hover:text-brand-primary"
                  >
                    {c.title}
                  </h3>
                  {c.blurb && (
                    <p className="mt-1 text-[12px] leading-relaxed text-muted">{c.blurb}</p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
