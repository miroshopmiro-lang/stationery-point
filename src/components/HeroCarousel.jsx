import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import collectionsFile from '../data/collections.json';
import SmartImage from './SmartImage';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

const slides = collectionsFile.hero;
const ROTATE_MS = 6000;

/*
 * HERO — SPLIT PANEL. Photo on one side, solid colour panel carrying the type on the other.
 *
 * WHY THIS SHAPE (measured 17 Aug 2026, looking at the rendered pages):
 *   NONE of the four references puts type on a gradient scrim over a photo. Zero. What they
 *   actually do:
 *     flyingtiger.com  — its two-up promo tiles are literally HALF PHOTO / HALF FLAT COLOUR
 *                        PANEL, and they ALTERNATE which side the photo sits on. Type and a
 *                        pill button sit on the flat panel.
 *     smiggle.co.uk    — hero artwork contains a solid desaturated teal rectangle over the
 *                        left ~45%, and the whole headline stack sits inside that panel.
 *     dickblick.com    — same split inside white cards: type block one side, product photo
 *                        bleeding off the other. Its wide hero reserves a clean left third.
 *     hobbycraft.co.uk — bakes the entire poster, which we can't do (every price change
 *                        would cost a regeneration in two crops).
 *   Three of four = solid panel or planned clear zone. So we copy that and drop the scrim.
 *
 * WHAT THIS BUYS US: the generated image never needs a clear zone, never needs to be dark
 * enough to carry white text, and never needs a single character of text in it.
 *
 * Mobile (375px) stacks: photo above, panel below. Near-square overall, following
 * hobbycraft's dedicated mobile hero crop (measured 375x360 native, 1.04:1) rather than
 * squeezing a wide desktop banner down — which is smiggle's mistake, where the baked
 * headline lands about 13px tall on a phone.
 */

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [userTook, setUserTook] = useState(false);
  const reduce = useReducedMotion();

  const go = useCallback((next) => {
    setIndex(() => (next + slides.length) % slides.length);
  }, []);

  const take = useCallback((next) => {
    setUserTook(true);
    go(next);
  }, [go]);

  useEffect(() => {
    if (userTook || reduce || slides.length < 2) return undefined;
    const id = setInterval(() => setIndex((prev) => (prev + 1) % slides.length), ROTATE_MS);
    return () => clearInterval(id);
  }, [userTook, reduce]);

  return (
    <section aria-roledescription="carousel" aria-label="Featured" className="relative w-full">
      <div className="relative">
        {slides.map((s, i) => {
          // flyingtiger.com alternates which side the photo sits on across consecutive
          // promo tiles. Same alternation here, driven off the slide index.
          const photoRight = i % 2 === 1;

          return (
            <div
              key={s.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
              aria-hidden={i !== index}
              className={
                (i === index ? 'grid' : 'hidden') +
                ' grid-cols-1 lg:grid-cols-2 items-stretch'
              }
            >
              {/* PHOTO HALF. No scrim, no overlay, nothing on top of it. */}
              {/* 16:10 at phone width, not 4:3. Measured 17 Aug: at 4:3 the whole hero came to
                  575px tall at 375px, against flyingtiger's 223px and hobbycraft's dedicated
                  360px mobile hero. Being 2.6x taller than the visual reference is a density
                  failure, and it pushes the kit tiles — the highest-converting block — below
                  the fold. 16:10 + a tighter panel brings the hero to roughly 400px. */}
              <div
                className={
                  'relative aspect-[16/10] lg:aspect-auto lg:min-h-[440px] ' +
                  (photoRight ? 'lg:order-2' : 'lg:order-1')
                }
              >
                <SmartImage
                  src={s.image}
                  srcMobile={s.imageMobile}
                  alt=""
                  tint="#EEF0FB"
                  className="absolute inset-0"
                  eager={i === 0}
                />
              </div>

              {/* PANEL HALF — solid brand colour, carries all the type.
                  Copied from smiggle's teal headline panel and FT's promo-tile panel. */}
              <div
                className={
                  'bg-brand-primary flex flex-col justify-center px-5 py-5 sm:px-8 lg:px-12 lg:py-14 ' +
                  (photoRight ? 'lg:order-1' : 'lg:order-2')
                }
              >
                <div className="max-w-md">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-[0.12em] text-brand-accent mb-2.5">
                    {s.eyebrow}
                  </span>
                  <h2 className="text-white font-bold tracking-tight text-[30px] leading-[1.08] lg:text-[52px] lg:leading-[1.05] text-balance">
                    {s.title}
                  </h2>
                  <p className="mt-2 text-white/85 text-[14px] leading-snug lg:text-base lg:leading-relaxed max-w-sm">
                    {s.subtitle}
                  </p>
                  {/* On-panel CTA is a white pill — flyingtiger.com's promo tiles use exactly
                      this: white pill, dark label, sitting on the flat colour panel. */}
                  <Link
                    to={s.cta.to}
                    className="mt-4 lg:mt-6 inline-flex items-center justify-center min-h-[48px] rounded-full
                               bg-white text-brand-primary font-semibold px-7 text-[15px]
                               transition-colors duration-text ease-ref hover:bg-brand-accent hover:text-brand-dark
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {s.cta.label}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {slides.length > 1 && (
          <>
            {/* Arrow controls: big white circles with brand chevrons, overlaid on the media
                edge, vertically centred. Copied from hobbycraft.co.uk's rail arrows. */}
            <button
              type="button"
              onClick={() => take(index - 1)}
              aria-label="Previous slide"
              className="hidden lg:flex absolute left-3 top-[40%] -translate-y-1/2 w-11 h-11 rounded-full
                         bg-white shadow-card text-brand-primary items-center justify-center
                         transition-colors duration-text ease-ref hover:bg-brand-soft
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => take(index + 1)}
              aria-label="Next slide"
              className="hidden lg:flex absolute right-3 top-[40%] -translate-y-1/2 w-11 h-11 rounded-full
                         bg-white shadow-card text-brand-primary items-center justify-center
                         transition-colors duration-text ease-ref hover:bg-brand-soft
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>

            {/* Dots sit BELOW the panel, on the page — not floated over the artwork.
                hobbycraft puts its card-image dots inside the card on a light ground for
                the same reason: dots over photography are unreliable at 375px. */}
            <div className="flex justify-center gap-2 py-3 bg-white">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => take(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index}
                  className={
                    'h-2 rounded-full transition-all duration-text ease-ref ' +
                    (i === index ? 'w-7 bg-brand-primary' : 'w-2 bg-hairline hover:bg-muted')
                  }
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
