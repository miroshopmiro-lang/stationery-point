import React from 'react';
import { Link } from 'react-router-dom';

// The offer strip directly under the hero. Jags runs the same device and it
// works, a real number with a real threshold converts far better than a
// generic "shop now".
//
// Renders NOTHING until Sam supplies an actual offer. An invented discount on
// a client's live site is not a placeholder, it's a commitment they never made
// and would have to honour at the counter.
export default function OfferStrip({ offer }) {
  if (!offer || !offer.headline) return null;

  return (
    <section className="w-full bg-brand-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-5 text-center">
        <p className="text-brand-dark font-bold text-sm sm:text-base">{offer.headline}</p>
        {offer.detail && <p className="text-brand-dark/70 text-xs sm:text-sm">{offer.detail}</p>}
        {offer.cta && (
          <Link
            to={offer.cta.to}
            className="shrink-0 rounded-full bg-brand-dark text-white font-bold text-xs px-5 py-2 hover:bg-brand-primary transition-colors"
          >
            {offer.cta.label}
          </Link>
        )}
      </div>
    </section>
  );
}
