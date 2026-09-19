import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import collectionsFile from '../data/collections.json';
import SmartImage from './SmartImage';
import { WhatsAppIcon } from './icons';
import { STORE } from '../lib/utils';

const slides = collectionsFile.hero;
const ROTATE_MS = 2500;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  const go = useCallback((next) => {
    setIndex(() => (next + slides.length) % slides.length);
  }, []);

  // Always auto-rotates on every breakpoint — no arrow controls, and jumping to a
  // slide via the dots below no longer stops the interval (17 Sep 2026, on request).
  useEffect(() => {
    if (reduce || slides.length < 2) return undefined;
    const id = setInterval(() => setIndex((prev) => (prev + 1) % slides.length), ROTATE_MS);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <section aria-roledescription="carousel" aria-label="Featured Collections" className="relative w-full bg-[#241F6B]">
      {/* FULL-BLEED HERO BANNER. Re-measured live off flyingtiger.com on 16 Sep 2026, twice, at
          two different viewport widths, and it is NOT aspect-ratio-driven below desktop: their
          .banner_container holds a FIXED PIXEL HEIGHT (208px) from phone widths up through
          tablet, then jumps to a second fixed height (350px, which is also exactly their
          measured 1400x350 desktop ratio, 4:1, once their page-width max-width caps the
          container at 1400px). The ratio only looks wide because the WIDTH changes under a
          constant height, not because they picked a wide aspect-ratio directly. An earlier
          version of this comment tried a fixed aspect-[2.75/1] on mobile to avoid over-cropping
          the source photo, but that made the banner too short/thin on an actual phone (the
          previous 2.75:1 guess did not match either of flyingtiger's two real measured heights).
          Matching their real mechanism instead: fixed height on phone/tablet, switching to the
          4:1 ratio only at the lg breakpoint. */}
      <div
        className="relative w-full overflow-hidden bg-brand-dark h-[208px] sm:h-[280px] lg:h-auto lg:aspect-[3.2/1]"
      >
        {slides.map((s, i) => {
          const isActive = i === index;
          return (
            <div
              key={s.id}
              role="group"
              aria-roledescription="slide"
              aria-label={s.title}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-opacity duration-surface ease-ref ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Edge-to-edge natural photography banner — uncropped. Copy (eyebrow, title,
                  subtitle) is baked into the generated art itself, not rendered as HTML — on
                  explicit direction (16 Sep 2026): an image model integrates title typography
                  into the composition (matching its own lighting/colour/layout) in a way a
                  generic HTML overlay + gradient scrim can't match. Only the buttons stay real
                  HTML, since they need to be clickable. Accessible text below stands in for the
                  baked copy for screen readers/SEO. See research/hero-references/PROMPTS.md for
                  the exact prompts (incl. the copy to bake in) used to generate each image. */}
              <div className="absolute inset-0 w-full h-full">
                <SmartImage
                  src={s.image}
                  srcMobile={s.imageMobile}
                  alt={`${s.title} — ${s.subtitle}`}
                  tint="#241F6B"
                  className="absolute inset-0 w-full h-full"
                  imgClassName="object-left"
                  eager={i === 0}
                />
              </div>

              <div className="sr-only">
                <span>{s.eyebrow}</span>
                <h2>{s.title}</h2>
                <p>{s.subtitle}</p>
              </div>

              <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col justify-end pb-3 sm:pb-5 lg:pb-6 pointer-events-none z-20">
                <div className="flex items-center gap-1.5 sm:gap-3 pointer-events-auto">
                  <Link
                    to={s.cta.to}
                    className="inline-flex items-center justify-center h-9 sm:h-10 lg:h-11 rounded-full
                               bg-white text-brand-primary font-bold px-4 sm:px-6 lg:px-7 text-xs sm:text-sm
                               shadow-lg transition-all duration-text ease-ref
                               hover:bg-brand-accent hover:text-brand-dark hover:scale-[1.02]
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent shrink-0"
                  >
                    {s.cta.label}
                  </Link>

                  <a
                    href={`https://wa.me/${STORE.whatsapp}?text=Hi%20Stationery%20Point%2C%20I%20would%20like%20to%20enquire%20about%20supplies`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 h-9 sm:h-10 lg:h-11 rounded-full
                               bg-[#25D366] hover:bg-[#3DE07D] border border-white/60
                               text-[#053D1E] font-bold px-3 sm:px-5 text-xs sm:text-sm
                               transition-all duration-text ease-ref hover:scale-[1.02]
                               shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent shrink-0"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-[#053D1E]" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}

        {/* Slide indicators only — no prev/next arrows (17 Sep 2026, on request). Dots still
            let a visitor jump to a slide, but no longer stop the auto-rotate. */}
        {slides.length > 1 && (
          <div className="absolute bottom-1.5 sm:bottom-3 left-0 right-0 z-30 flex justify-center gap-1.5 sm:gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-text ease-ref ${
                  i === index ? 'w-5 sm:w-7 bg-brand-accent' : 'w-1.5 sm:w-2 bg-white/70 hover:bg-white shadow-sm'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}