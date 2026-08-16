import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import collectionsFile from '../data/collections.json';
import SmartImage from './SmartImage';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

const slides = collectionsFile.hero;
const ROTATE_MS = 6000;

// Full-bleed hero carousel. Slides are stacked and cross-faded via opacity
// rather than translated, so there is no horizontal scroll container to fight
// on a phone and no layout shift between slides.
//
// Auto-rotation stops permanently on any manual interaction — a carousel that
// keeps moving after someone has taken control is the single most irritating
// thing about this pattern, and Jags's does exactly that.
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
    // Advance from the previous value inside the updater so the interval never
    // needs to be torn down and rebuilt on every tick.
    const id = setInterval(() => setIndex((prev) => (prev + 1) % slides.length), ROTATE_MS);
    return () => clearInterval(id);
  }, [userTook, reduce]);

  return (
    <section aria-roledescription="carousel" aria-label="Featured" className="relative w-full bg-brand-dark">
      <div className="relative w-full aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9] max-h-[560px]">
        {slides.map((s, i) => (
          <div
            key={s.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <SmartImage
              src={s.image}
              srcMobile={s.imageMobile}
              alt=""
              tint="#241F6B"
              className="absolute inset-0"
              eager={i === 0}
            />
            {/* Readability scrim — stronger at the bottom on mobile where type
                sits over the image, lighter and left-weighted on desktop. */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-transparent sm:bg-gradient-to-r sm:from-brand-dark/90 sm:via-brand-dark/50 sm:to-transparent" />

            <div className="relative h-full max-w-7xl mx-auto px-5 sm:px-8 flex flex-col justify-end sm:justify-center pb-10 sm:pb-0">
              <div className="max-w-xl">
                <span className="inline-block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-brand-accent mb-3">
                  {s.eyebrow}
                </span>
                <h2 className="text-white font-extrabold tracking-tight text-[28px] leading-[1.1] sm:text-4xl lg:text-5xl xl:text-[56px] text-balance">
                  {s.title}
                </h2>
                <p className="mt-3 text-white/80 text-sm sm:text-base max-w-md">{s.subtitle}</p>
                <Link
                  to={s.cta.to}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-accent text-brand-dark font-bold px-6 py-3 text-sm hover:bg-white transition-colors shadow-lg"
                >
                  {s.cta.label}
                </Link>
              </div>
            </div>
          </div>
        ))}

        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => take(index - 1)}
              aria-label="Previous slide"
              className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur text-white items-center justify-center transition-colors"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => take(index + 1)}
              aria-label="Next slide"
              className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur text-white items-center justify-center transition-colors"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => take(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-all ${i === index ? 'w-7 bg-brand-accent' : 'w-3 bg-white/40 hover:bg-white/70'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
