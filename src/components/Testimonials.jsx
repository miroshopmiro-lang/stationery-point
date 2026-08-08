import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { STORE } from '../lib/utils';
import { StarIcon } from './icons';

// Verbatim Google reviews. Text is quoted exactly as written — including the
// authors' own spelling — because an edited review is no longer a review.
// Cuts within a review are marked with an ellipsis.
//
// `avatar` is the reviewer's Google profile picture, saved into
// public/reviewers/ rather than hotlinked from googleusercontent. The site's
// CSP is `img-src 'self' data:`, so a remote avatar loads fine in dev and
// renders blank on Cloudflare. A missing avatar falls back to initials.
const reviews = [
  {
    name: 'Vivek D',
    meta: 'Local Guide · 74 reviews',
    when: '5 months ago',
    stars: 5,
    text: 'This place is hidden treasure in city. One shop for all the stationary and craft items. Their customer service and aquaintance is appreciable. They gave much discount to the things I brought… I saw greeting card here which is not common in shops now a days.',
  },
  {
    name: 'Athul Ts',
    meta: '4 reviews',
    when: 'a year ago',
    stars: 5,
    text: 'Whether it’s notebooks, pens, art supplies, or office materials, they have everything we need. The staff is friendly, knowledgeable, and always ready to help. Prices are reasonable, and the store is well-organized and clean.',
  },
  {
    name: 'Adhinath umesh Kumar',
    meta: '2 reviews',
    when: '2 months ago',
    stars: 5,
    text: 'Great shop! they have a lot of art supplies and other stationery items. Products are priced below MRP and had a great experience overall. Availability of parking is a plus.',
  },
  {
    name: 'Toshin U.T',
    meta: 'Local Guide · 46 reviews',
    when: '3 years ago',
    stars: 5,
    text: 'I regularly purchase office stationary items for my office from Stationery Point. There is a wide range of masking tapes, cello tapes and brown tapes of various sizes here. A4 papers of various brands are sold at very good price.',
  },
  {
    name: 'Feba Biju',
    meta: 'Local Guide · 5 reviews',
    when: '2 years ago',
    stars: 5,
    text: 'The store is a hidden gem. It had all the journaling supplies I was looking for. I found plenty of planners, diaries, washi tapes, etc., that too at prices below MRP.',
  },
  {
    name: 'Kripa sreedhar',
    meta: '3 reviews',
    when: '3 years ago',
    stars: 5,
    text: 'Perfect place to buy stationary items. As an architect student i need lots of stationary items, they helped to find high quality architecture stationary in an affordable price range.',
  },
  {
    name: 'Abila Abraham',
    meta: '2 reviews',
    when: '3 years ago',
    stars: 5,
    text: 'My kids love Stationery Point! Variety of art items and colouring books, stickers, board games, charts and maps available. I also bought some glass paints and liners for me. All products sold below MRP.',
  },
  {
    name: 'Kumar Aryan',
    meta: '6 reviews',
    when: '11 months ago',
    stars: 5,
    text: 'Very good stationary place, everything is available and even if something is not then they get it in 1-2 days for you.',
  },
  {
    name: 'Bijuna K Vinod',
    meta: '12 reviews',
    when: '2 months ago',
    stars: 5,
    text: 'I come here almost every week for all my emergency supplies and they have it all. Affordable prices and at a very convenient location too.',
  },
];

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

export default function Testimonials() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const r = reviews[i];

  useEffect(() => {
    if (reduce) return; // Respect reduced motion settings
    const timer = setInterval(() => {
      setI((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [i, reduce]);

  return (
    <section className="bg-brand-soft py-16" aria-roledescription="carousel" aria-label="Customer reviews">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <p className="text-sm font-medium text-brand-primary/60 mb-2">Verified Google Reviews</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Loved by Kochi</h2>
        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="flex items-center gap-1 text-brand-gold" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, k) => (<StarIcon key={k} className="w-5 h-5" />))}
          </span>
          <span className="text-gray-700 font-bold tabular-nums">{STORE.rating} / 5</span>
          <span className="text-gray-500 text-sm">from {STORE.reviewCount} Google reviews</span>
        </div>

        {/* min-h is sized to the longest review so the card doesn't resize
            under the reader as it rotates. */}
        <div className="mt-8 bg-white rounded-2xl shadow-soft p-8 min-h-[430px] sm:min-h-[300px] md:min-h-[260px] flex flex-col" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={reduce ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col h-full"
            >
              <div className="flex gap-1 text-brand-gold mb-3" aria-label={`${r.stars} out of 5 stars`}>
                {Array.from({ length: r.stars }).map((_, k) => (<StarIcon key={k} className="w-4 h-4" />))}
              </div>
              <p className="text-lg text-gray-700 leading-relaxed flex-grow">“{r.text}”</p>

              <div className="mt-6 flex items-center gap-3">
                {r.avatar ? (
                  <img
                    src={r.avatar}
                    alt=""
                    width={80}
                    height={80}
                    loading="lazy"
                    decoding="async"
                    className="h-11 w-11 shrink-0 rounded-full object-cover bg-brand-soft"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white"
                  >
                    {initials(r.name)}
                  </span>
                )}
                <span className="min-w-0">
                  <span className="block truncate font-bold text-brand-primary">{r.name}</span>
                  <span className="block truncate text-xs text-gray-500">{r.meta} · {r.when}</span>
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2" role="tablist" aria-label="Select a review">
          {reviews.map((rev, k) => (
            <button
              key={rev.name}
              type="button"
              role="tab"
              aria-selected={k === i}
              onClick={() => setI(k)}
              className={`h-2.5 rounded-full transition-[width,background-color] ${k === i ? 'w-8 bg-brand-primary' : 'w-2.5 bg-brand-primary/30'}`}
              aria-label={`Show review ${k + 1} of ${reviews.length} by ${rev.name}`}
            />
          ))}
          <a
            href={STORE.mapsLink}
            target="_blank"
            rel="noreferrer"
            className="ml-auto text-sm font-bold text-brand-primary hover:text-brand-dark underline underline-offset-4 whitespace-nowrap transition-colors"
          >
            Read them all on Google &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
