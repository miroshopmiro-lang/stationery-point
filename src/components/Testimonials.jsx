import React, { useEffect, useRef } from 'react';
import reviewsFile from '../data/reviews.json';
import { StarIcon } from './icons';

const { aggregate, items: allReviews } = reviewsFile;

// Rail shows only reviews short enough to sit in equal-height cards. Long ones stay in
// reviews.json untouched; nothing is cut or paraphrased, so every card is a full review.
const MAX_CHARS = 265;
const reviews = allReviews.filter((r) => r.text.length <= MAX_CHARS);

/*
 * REVIEWS, the one block on this page that NO reference site can show.
 *
 * Measured 16-17 Aug 2026: flyingtiger and smiggle carry ZERO social proof on their
 * homepages. hobbycraft and dickblick show per-PRODUCT star ratings only. Not one of the four
 * has a named local business with a verified rating behind it, because none of them IS one.
 * Sam's 4.8 from 150+ Google reviews beats every individual product rating measured on
 * dickblick (4.5, 4.7, 4.7, 4.7) and it is about the shop, not a SKU. So this sits high on the
 * page, not in the footer.
 *
 * There is no reference layout to copy for a reviews section, so the STRUCTURE is borrowed from
 * hobbycraft's product rail, the closest analogous pattern on any of the four: tinted band,
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
 * time. Scroll and paint only, nothing that costs a frame on a mid-range Android.
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
    <article className="flex flex-col w-full h-full bg-white rounded border border-hairline shadow-card p-4">
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
  const trackRef = useRef(null);

  // Same mechanism as augzet v2's review rail: rAF auto-scroll, pointer drag with inertia.
  // Nothing pauses on hover; the rail only stops while it is pressed/dragged, and resumes on release.
  useEffect(() => {
    const rail = railRef.current;
    const track = trackRef.current;
    if (!rail || !track) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let half = track.scrollWidth / 2;
    const onResize = () => { half = track.scrollWidth / 2; };
    window.addEventListener('resize', onResize);

    let x = 0, velocity = 0, dragging = false, startX = 0, dragStart = 0, lastX = 0, lastT = 0, raf = 0;
    const AUTO = -0.7;
    const wrap = (v) => {
      if (half <= 0) return v;
      while (v < -half) v += half;
      while (v > 0) v -= half;
      return v;
    };
    const render = () => { x = wrap(x); track.style.transform = `translate3d(${x}px,0,0)`; };
    const tick = () => {
      if (!dragging) {
        if (Math.abs(velocity) > 0.05) { x += velocity; velocity *= 0.94; } else { x += AUTO; }
        render();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const down = (e) => {
      dragging = true; startX = e.clientX; dragStart = x; velocity = 0; lastX = e.clientX; lastT = performance.now();
      rail.style.cursor = 'grabbing';
      try { rail.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    };
    const move = (e) => {
      if (!dragging) return;
      x = wrap(dragStart + (e.clientX - startX));
      render();
      const now = performance.now();
      const dt = now - lastT;
      if (dt > 0) { velocity = ((e.clientX - lastX) / dt) * 16; lastX = e.clientX; lastT = now; }
    };
    const up = (e) => {
      if (!dragging) return;
      dragging = false;
      rail.style.cursor = 'grab';
      try { rail.releasePointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    };
    rail.addEventListener('pointerdown', down);
    rail.addEventListener('pointermove', move);
    rail.addEventListener('pointerup', up);
    rail.addEventListener('pointercancel', up);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      rail.removeEventListener('pointerdown', down);
      rail.removeEventListener('pointermove', move);
      rail.removeEventListener('pointerup', up);
      rail.removeEventListener('pointercancel', up);
    };
  }, []);

  if (!reviews.length) return null;

  return (
    <section aria-labelledby="reviews-heading" className="band-doodle">
      <div className="max-w-[1280px] mx-auto py-8 lg:py-14">
        <div className="px-4 lg:px-8 text-center">
         <div className="band-title">
          <h2
            id="reviews-heading"
            className="font-bold tracking-tight text-ink text-[22px] leading-[1.18] lg:text-[32px]"
          >
            What Kochi says <span className="hl-slant">about us</span>
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
        </div>

        {/* Auto-scrolling marquee. The list is rendered twice and the track slides -50%, so the
            loop is seamless. Driven by rAF, draggable, pauses only while pressed; with reduced motion it becomes a normal
            swipeable rail and the duplicate set is hidden. */}
        <div ref={railRef} className="reviews-marquee relative mt-6">
          <ul ref={trackRef} className="reviews-track flex gap-3 lg:gap-6 w-max px-4 lg:px-8 pb-2">
            {[...reviews, ...reviews].map((r, i) => (
              <li
                key={r.name + i}
                aria-hidden={i >= reviews.length ? 'true' : undefined}
                className={'shrink-0 w-[280px] lg:w-[340px] flex' + (i >= reviews.length ? ' reviews-dup' : '')}
              >
                <ReviewCard review={r} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
