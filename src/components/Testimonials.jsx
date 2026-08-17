import React, { useRef } from 'react';
import reviewsFile from '../data/reviews.json';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from './icons';

const { aggregate, items: reviews } = reviewsFile;

/*
 * REVIEWS — the one block on this page that NO reference site can show.
 *
 * Measured 16-17 Aug 2026: flyingtiger and smiggle carry ZERO social proof on their
 * homepages. hobbycraft and dickblick show per-PRODUCT star ratings only. Not one of the four
 * has a named local business with a verified rating behind it, because none of them IS one.
 * Sam's 4.8 from 150+ Google reviews beats every individual product rating measured on
 * dickblick (4.5, 4.7, 4.7, 4.7) and it is about the shop, not a SKU. So this sits high on the
 * page, not in the footer.
 *
 * There is no reference layout to copy for a reviews section, so the STRUCTURE is borrowed from
 * hobbycraft's product rail — the closest analogous pattern on any of the four: tinted band,
 * flat white cards, horizontal rail with a card cut off at the right edge to cue the swipe,
 * white circular arrows with brand chevrons at desktop, heading centred above.
 *
 * The star treatment is copied from hobbycraft exactly: BRAND-colour stars, not gold, with the
 * count ALWAYS shown. dickblick renders a bare "5 out of 5 stars" with no count, which reads
 * identically whether it came from one review or four hundred. We have 150+ real ones and no
 * reason to be vague.
 *
 * Replaces a 305-line framer-motion single-review carousel with slide transitions and
 * glassmorphism. No reference animates a review, uses glass, or shows one testimonial at a
 * time. Scroll and paint only — nothing that costs a frame on a mid-range Android.
 *
 * Review text, names, avatars and dates are REAL and live in src/data/reviews.json, extracted
 * verbatim. Text is quoted exactly as written, including the authors' own spelling, because an
 * edited review is no longer a review. Cuts within a review are marked with an ellipsis.
 * Never edit, shorten, paraphrase or invent entries.
 *
 * `avatar` is the reviewer's Google profile picture saved into public/reviewers/ rather than
 * hotlinked from googleusercontent: the site's CSP is `img-src 'self' data:`, so a remote
 * avatar loads fine in dev and renders blank on Cloudflare. Missing avatars fall back to
 * initials.
 */

function Stars({ count = 5 }) {
  return (
    <span className="flex items-center gap-px" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <StarIcon
          key={i}
          className={'w-4 h-4 ' + (i < count ? 'text-brand-primary' : 'text-hairline')}
        />
      ))}
    </span>
  );
}

function initials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');
}

function ReviewCard({ review }) {
  return (
    <article className="flex flex-col h-full bg-white rounded border border-hairline shadow-card p-4">
      <div className="flex items-center gap-2.5">
        {review.avatar ? (
          <img
            src={review.avatar}
            alt=""
            width={36}
            height={36}
            loading="lazy"
            className="w-9 h-9 rounded-full object-cover shrink-0"
          />
        ) : (
          <span className="w-9 h-9 rounded-full bg-brand-soft text-brand-primary text-[13px] font-bold flex items-center justify-center shrink-0">
            {initials(review.name)}
          </span>
        )}
        <span className="min-w-0">
          <span className="block text-[14px] font-semibold text-ink truncate">{review.name}</span>
          {review.meta && (
            <span className="block text-[12px] text-muted truncate">{review.meta}</span>
          )}
        </span>
      </div>

      <div className="flex items-center gap-2 mt-2.5">
        <Stars count={review.stars} />
        {review.when && <span className="text-[12px] text-muted">{review.when}</span>}
        <span className="sr-only">{`Rated ${review.stars} out of 5`}</span>
      </div>

      <p className="mt-2 text-[14px] leading-[1.55] text-ink">{review.text}</p>
    </article>
  );
}

export default function Testimonials() {
  const railRef = useRef(null);

  if (!reviews.length) return null;

  const scrollBy = (dir) => {
    railRef.current?.scrollBy({ left: dir * 290, behavior: 'smooth' });
  };

  return (
    <section aria-labelledby="reviews-heading" className="bg-brand-soft">
      <div className="max-w-[1280px] mx-auto py-8 lg:py-14">
        <div className="px-4 lg:px-8 text-center">
          <h2
            id="reviews-heading"
            className="font-bold tracking-tight text-brand-primary text-[22px] leading-[1.18] lg:text-[32px]"
          >
            What Kochi says about us
          </h2>

          {/* The aggregate, stated plainly and high. This is the number no reference has. */}
          <p className="mt-2.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <Stars count={5} />
            <span className="text-[15px] font-bold text-ink tabular-nums">{aggregate.rating}</span>
            <span className="text-[14px] text-muted">
              from {aggregate.count} {aggregate.source} reviews
            </span>
          </p>
        </div>

        <div className="relative mt-6">
          {/* ~1.2 cards visible at 375px so the cut-off card cues the swipe — hobbycraft's rail. */}
          <ul
            ref={railRef}
            className="flex gap-3 overflow-x-auto px-4 pb-2 lg:px-8 lg:gap-6
                       [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                       snap-x snap-mandatory"
          >
            {reviews.map((r) => (
              <li key={r.name} className="shrink-0 snap-start w-[280px] lg:w-[340px] flex">
                <ReviewCard review={r} />
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Scroll reviews left"
            className="hidden lg:flex absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full
                       bg-white shadow-card text-brand-primary items-center justify-center
                       transition-colors duration-text ease-ref hover:bg-brand-accent
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Scroll reviews right"
            className="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full
                       bg-white shadow-card text-brand-primary items-center justify-center
                       transition-colors duration-text ease-ref hover:bg-brand-accent
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
