import React from 'react';
import { STORE } from '../lib/utils';
import { StarIcon } from './icons';

// Verbatim Google reviews. Text is quoted exactly as written — including the
// authors' own spelling — because an edited review is no longer a review.
// Cuts within a review are marked with an ellipsis.
//
// `photo` is optional and deliberately so: a review without one renders as a
// text card, not as a card with a hole in it. Fill it only once we hold the
// rights to the image (see notes in the review-section brief).
const reviews = [
  {
    name: 'Vivek D',
    meta: 'Local Guide · 74 reviews',
    when: '5 months ago',
    stars: 5,
    text: 'This place is hidden treasure in city. One shop for all the stationary and craft items. Their customer service and aquaintance is appreciable. They gave much discount to the things I brought… I saw greeting card here which is not common in shops now a days. I really had a wonderful experience from there.',
  },
  {
    name: 'Athul Ts',
    meta: '4 reviews',
    when: 'a year ago',
    stars: 5,
    text: 'Whether it’s notebooks, pens, art supplies, or office materials, they have everything we need. The staff is friendly, knowledgeable, and always ready to help. Prices are reasonable, and the store is well-organized and clean. Highly recommend it for students, professionals, or anyone who loves good stationery.',
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
    text: 'I regularly purchase office stationary items for my office from Stationery Point. There is a wide range of masking tapes, cello tapes and brown tapes of various sizes here. Registers and Envelopes also available. A4 papers of various brands are sold at very good price.',
  },
  {
    name: 'Feba Biju',
    meta: 'Local Guide · 5 reviews',
    when: '2 years ago',
    stars: 5,
    text: 'The store is a hidden gem. It had all the journaling supplies I was looking for. I found plenty of planners, diaries, washi tapes, etc., that too at prices below MRP. Overall, the shopping experience was great.',
  },
  {
    name: 'Kripa sreedhar',
    meta: '3 reviews',
    when: '3 years ago',
    stars: 5,
    text: 'Perfect place to buy stationary items. As an architect student i need lots of stationary items, they helped to find high quality architecture stationary in an affordable price range. Nice experience, will definitely suggest this shop.',
  },
  {
    name: 'Abila Abraham',
    meta: '2 reviews',
    when: '3 years ago',
    stars: 5,
    text: 'My kids love Stationery Point! Variety of art items and colouring books, stickers, board games, charts and maps available. I also bought some glass paints and liners for me. All products sold below MRP and great customer service. Highly recommended.',
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

// Two brand tones only. A per-reviewer rainbow is exactly the mistake the
// category strip was making.
const avatarTones = ['bg-brand-primary', 'bg-brand-dark'];

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

function ReviewCard({ review, index }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-soft border border-gray-100">
      <div className="flex gap-0.5 text-brand-gold" aria-label={`${review.stars} out of 5 stars`}>
        {Array.from({ length: review.stars }).map((_, k) => (
          <StarIcon key={k} className="w-4 h-4" />
        ))}
      </div>

      <blockquote className="mt-3 flex-grow text-sm sm:text-[15px] leading-relaxed text-gray-700">
        {review.text}
      </blockquote>

      {review.photo && (
        <img
          src={review.photo}
          alt=""
          width={800}
          height={600}
          loading="lazy"
          decoding="async"
          className="mt-4 w-full rounded-xl object-cover aspect-[4/3]"
        />
      )}

      <figcaption className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-4">
        <span
          aria-hidden="true"
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${
            avatarTones[index % avatarTones.length]
          }`}
        >
          {initials(review.name)}
        </span>
        <span className="min-w-0">
          <span className="block truncate font-bold text-gray-800">{review.name}</span>
          <span className="block truncate text-xs text-gray-500">
            {review.meta} · {review.when}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-brand-soft py-16" aria-label="Customer reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-semibold text-brand-primary/60 mb-2">Verified Google Reviews</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-800">
              What Kochi says about us
            </h2>
            <div className="mt-3 flex items-center gap-2">
              <span className="flex gap-0.5 text-brand-gold" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, k) => (
                  <StarIcon key={k} className="w-5 h-5" />
                ))}
              </span>
              <span className="font-bold text-gray-800 tabular-nums">{STORE.rating} / 5</span>
              <span className="text-gray-500 text-sm">from {STORE.reviewCount} reviews</span>
            </div>
          </div>

          <a
            href={STORE.mapsLink}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-bold text-brand-primary hover:text-brand-dark underline underline-offset-4 whitespace-nowrap transition-colors"
          >
            Read them all on Google &rarr;
          </a>
        </div>

        {/* Mobile: a swipeable row. Nine cards stacked vertically ran 2,998px
            — 38% of the whole page — for a section nobody scrolls through
            twice. Desktop has the width to show them as a grid. */}
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0 md:grid md:gap-6 md:overflow-visible md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <div key={r.name} className="w-[85%] shrink-0 snap-start md:w-auto md:shrink">
              <ReviewCard review={r} index={i} />
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs font-medium text-gray-500 md:hidden">Swipe to read more &rarr;</p>
      </div>
    </section>
  );
}
