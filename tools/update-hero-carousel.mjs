import fs from 'fs';

const componentCode = `import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import collectionsFile from '../data/collections.json';
import SmartImage from './SmartImage';
import { ChevronLeftIcon, ChevronRightIcon, WhatsAppIcon, ListIcon } from './icons';

const slides = collectionsFile.hero;
const ROTATE_MS = 6500;

export default function HeroCarousel({ onOpenListModal }) {
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
    <section aria-roledescription="carousel" aria-label="Featured Collections" className="relative w-full bg-[#E0DED9]">
      {/* HERO BANNER — Precision retail banner matching Smiggle & Hobbycraft visual bar */}
      <div className="relative w-full min-h-[360px] sm:min-h-[440px] lg:min-h-[500px] xl:min-h-[520px] overflow-hidden flex items-center">
        {slides.map((s, i) => {
          const isActive = i === index;
          return (
            <div
              key={s.id}
              role="group"
              aria-roledescription="slide"
              aria-label={\`\${i + 1} of \${slides.length}\`}
              aria-hidden={!isActive}
              className={\`absolute inset-0 transition-opacity duration-surface ease-ref \${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }\`}
            >
              {/* Natural, crisp photography banner */}
              <div className="absolute inset-0 w-full h-full">
                <SmartImage
                  src={s.image}
                  srcMobile={s.imageMobile}
                  alt={s.hasEngravedText ? \`\${s.title} - \${s.subtitle}\` : ''}
                  tint="#241F6B"
                  className="w-full h-full object-cover object-center"
                  eager={i === 0}
                />
              </div>

              {s.hasEngravedText ? (
                /* ENGRAVED BANNER LAYOUT: Text is integrated in the artwork; HTML pill CTAs in reserved negative space */
                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col justify-end pb-8 sm:pb-10 lg:pb-12 z-20 pointer-events-none">
                  {/* Accessible titles for screen-readers & SEO */}
                  <div className="sr-only">
                    <span>{s.eyebrow}</span>
                    <h2>{s.title}</h2>
                    <p>{s.subtitle}</p>
                  </div>

                  {/* Real, interactive HTML pill buttons sitting in negative space */}
                  <div className="flex flex-wrap items-center gap-3.5 pointer-events-auto">
                    <Link
                      to={s.cta.to}
                      className="inline-flex items-center justify-center min-h-[44px] sm:min-h-[48px] rounded-full
                                 bg-white text-brand-primary font-bold px-6 sm:px-8 text-[14px] sm:text-[15px]
                                 shadow-lg transition-all duration-text ease-ref
                                 hover:bg-brand-accent hover:text-brand-dark hover:scale-[1.02]
                                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                    >
                      {s.cta.label}
                    </Link>

                    <a
                      href="https://wa.me/919447144005?text=Hi%20Stationery%20Point%2C%20I%20would%20like%20to%20enquire%20about%20supplies"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 min-h-[44px] sm:min-h-[48px] rounded-full
                                 bg-brand-dark/75 hover:bg-brand-dark/95 backdrop-blur-sm border border-white/25
                                 text-white font-medium px-5 sm:px-6 text-[14px]
                                 transition-all duration-text ease-ref hover:scale-[1.02]
                                 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-brand-accent" />
                      <span>WhatsApp Enquiry</span>
                    </a>
                  </div>
                </div>
              ) : (
                /* FALLBACK CARD LAYOUT for slides awaiting new banner artwork */
                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center py-8 z-20">
                  <div className="bg-brand-dark/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-10 max-w-lg shadow-2xl border border-white/10">
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.14em] bg-brand-accent text-brand-dark mb-3">
                      {s.eyebrow}
                    </span>
                    <h2 className="text-white font-extrabold tracking-tight text-[28px] sm:text-[38px] lg:text-[44px] leading-[1.08] text-balance">
                      {s.title}
                    </h2>
                    <p className="mt-2.5 text-[#EEF0FB]/90 text-[14px] sm:text-base leading-relaxed">
                      {s.subtitle}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <Link
                        to={s.cta.to}
                        className="inline-flex items-center justify-center min-h-[48px] rounded-full
                                   bg-white text-brand-primary font-bold px-7 text-[15px]
                                   shadow-md transition-all duration-text ease-ref
                                   hover:bg-brand-accent hover:text-brand-dark
                                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      >
                        {s.cta.label}
                      </Link>

                      <a
                        href="https://wa.me/919447144005?text=Hi%20Stationery%20Point%2C%20I%20would%20like%20to%20enquire%20about%20supplies"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 min-h-[48px] rounded-full
                                   bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium px-5 text-[14px]
                                   transition-all duration-text ease-ref
                                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      >
                        <WhatsAppIcon className="w-4 h-4 text-brand-accent" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Carousel Prev/Next Chevrons */}
        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => take(index - 1)}
              aria-label="Previous slide"
              className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full
                         bg-white shadow-card text-brand-primary items-center justify-center z-30
                         transition-all duration-text ease-ref hover:bg-brand-soft hover:scale-105
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => take(index + 1)}
              aria-label="Next slide"
              className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full
                         bg-white shadow-card text-brand-primary items-center justify-center z-30
                         transition-all duration-text ease-ref hover:bg-brand-soft hover:scale-105
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>

            {/* Slide indicators */}
            <div className="absolute bottom-3 left-0 right-0 z-30 flex justify-center gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => take(i)}
                  aria-label={\`Go to slide \${i + 1}\`}
                  aria-current={i === index}
                  className={\`h-2.5 rounded-full transition-all duration-text ease-ref \${
                    i === index ? 'w-8 bg-brand-primary' : 'w-2.5 bg-white/80 hover:bg-white shadow-sm'
                  }\`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* DOCKED QUICK-ACTION MERCHANDISING STRIP (Smiggle / Blick merchandising bar) */}
      <div className="bg-white border-b border-hairline shadow-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-hairline">
            {/* Quick Action 1: School Kits */}
            <button
              type="button"
              onClick={onOpenListModal}
              className="p-4 sm:p-5 text-left flex items-start gap-3.5 group hover:bg-brand-soft/40 transition-colors duration-text ease-ref focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-soft text-brand-primary flex items-center justify-center shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-text">
                <ListIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[14px] font-bold text-ink group-hover:text-brand-primary transition-colors">
                  School Kits, Packed
                </span>
                <span className="block text-[12px] text-muted leading-tight mt-0.5">
                  Send booklist on WhatsApp; ready before you arrive
                </span>
              </div>
            </button>

            {/* Quick Action 2: Art Supplies */}
            <Link
              to="/catalog?category=art-supplies"
              className="p-4 sm:p-5 text-left flex items-start gap-3.5 group hover:bg-brand-soft/40 transition-colors duration-text ease-ref focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-soft text-brand-primary flex items-center justify-center shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-text">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.41 3.59 8 8 8 1.1 0 2-.9 2-2 0-.46-.17-.89-.47-1.22-.3-.33-.47-.76-.47-1.22 0-1.1.9-2 2-2h2.34c4.22 0 7.66-3.44 7.66-7.66C21.53 4.67 17.26 2 12 2z" />
                  <circle cx="6.5" cy="8.5" r="1.5" fill="currentColor" />
                  <circle cx="9.5" cy="5.5" r="1.5" fill="currentColor" />
                  <circle cx="14.5" cy="5.5" r="1.5" fill="currentColor" />
                  <circle cx="17.5" cy="8.5" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <div>
                <span className="block text-[14px] font-bold text-ink group-hover:text-brand-primary transition-colors">
                  Fine Art & Craft
                </span>
                <span className="block text-[12px] text-muted leading-tight mt-0.5">
                  Watercolours, acrylics, brushes, canvas & clay
                </span>
              </div>
            </Link>

            {/* Quick Action 3: Office Bulk */}
            <Link
              to="/contact"
              className="p-4 sm:p-5 text-left flex items-start gap-3.5 group hover:bg-brand-soft/40 transition-colors duration-text ease-ref focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-soft text-brand-primary flex items-center justify-center shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-text">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
                </svg>
              </div>
              <div>
                <span className="block text-[14px] font-bold text-ink group-hover:text-brand-primary transition-colors">
                  Office Bulk Orders
                </span>
                <span className="block text-[12px] text-muted leading-tight mt-0.5">
                  Copier paper, files & desk essentials with GST invoice
                </span>
              </div>
            </Link>

            {/* Quick Action 4: Vyttila Shop */}
            <Link
              to="/contact"
              className="p-4 sm:p-5 text-left flex items-start gap-3.5 group hover:bg-brand-soft/40 transition-colors duration-text ease-ref focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-soft text-brand-primary flex items-center justify-center shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-text">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <span className="block text-[14px] font-bold text-ink group-hover:text-brand-primary transition-colors">
                  Shop in Vyttila
                </span>
                <span className="block text-[12px] text-muted leading-tight mt-0.5">
                  Ground Floor, Katti Tower, open 9am–8pm
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
\`;

fs.writeFileSync('src/components/HeroCarousel.jsx', componentCode, 'utf8');
console.log('Updated src/components/HeroCarousel.jsx');
