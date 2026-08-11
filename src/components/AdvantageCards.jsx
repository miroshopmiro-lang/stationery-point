import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { waLink } from '../lib/utils';
import { WhatsAppIcon } from './icons';

// The three advantage cards, rebuilt as posters.
//
// The previous version was the same template three times over — eyebrow label,
// heading, paragraph, pill button — with the category word ghosted behind the
// copy at 5-10% opacity. At that opacity, rotated and hard-clipped by the card
// edge, it didn't read as texture; it read as a z-index bug. Benchmarked
// against scooboo.in, where each card is a single idea at full commitment:
// one is poster type, one is a marquee, one is a physical prop that moves.
//
// Palette is deliberately loud here. Chartreuse is straight off the shop's
// signboard logo and appears nowhere else on the site, so this row reads as a
// distinct band rather than more of the same indigo. The WhatsApp green that
// used to fill the third card is gone — it was another company's brand colour
// carrying a whole panel; it survives only as the glyph, where it belongs.
//
// Motion lives in index.css (.adv-*) and is transform-only.

const CHAT_LINES = [
  { from: 'them', text: '50 ruled notebooks' },
  { from: 'them', text: '20 geometry boxes' },
  { from: 'us', typing: true },
  { from: 'them', text: 'Chart paper, 2 packs' },
  { from: 'them', text: 'A4 sheets, 1 box' },
  { from: 'us', typing: true },
];

function ChatBubble({ line }) {
  const mine = line.from === 'us';
  return (
    <div className={`flex ${mine ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-3 py-2 text-[11px] font-semibold leading-snug shadow-sm ${
          mine
            ? 'rounded-bl-sm bg-white/10 text-white/70'
            : 'rounded-br-sm bg-[#CDD661] text-[#241F6B]'
        }`}
      >
        {line.typing ? (
          <span className="flex items-center gap-1 py-0.5" aria-label="Typing">
            <span className="adv-dot block h-1.5 w-1.5 rounded-full bg-white/80" />
            <span className="adv-dot block h-1.5 w-1.5 rounded-full bg-white/80" />
            <span className="adv-dot block h-1.5 w-1.5 rounded-full bg-white/80" />
          </span>
        ) : (
          line.text
        )}
      </div>
    </div>
  );
}

// Shared chrome so the three cards stay a set: same radius, same ratio, same
// lift. The card itself is the link — no pill button competing inside it.
function Card({ as: As = 'div', className = '', children, ...rest }) {
  return (
    <As
      className={`adv-card group relative flex aspect-square flex-col justify-between overflow-hidden rounded-3xl p-7 shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-gold sm:p-8 ${className}`}
      {...rest}
    >
      {children}
    </As>
  );
}

function Eyebrow({ children, className = '' }) {
  return (
    <span className={`text-[11px] font-extrabold uppercase tracking-[0.2em] ${className}`}>
      {children}
    </span>
  );
}

function GoArrow({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 text-xs font-extrabold ${className}`}>
      {children}
      <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
    </span>
  );
}

export default function AdvantageCards() {
  const sectionRef = useRef(null);
  const [offscreen, setOffscreen] = useState(false);
  // Strike stays drawn until we know the card is on screen, then it replays the
  // draw once. Never the other way round — see the .adv-strike note in index.css.
  const [drawStrike, setDrawStrike] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setOffscreen(!entry.isIntersecting);
        if (entry.isIntersecting) setDrawStrike(true);
      },
      { rootMargin: '200px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`max-w-7xl mx-auto px-4 sm:px-6 py-8 ${offscreen ? 'adv-offscreen' : ''}`}
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 sm:gap-6">
        {/* 1 — Below MRP. Poster type: the strike-through IS the proposition. */}
        <Card as={Link} to="/catalog" aria-label="Browse the catalog" className="bg-[#CDD661]">
          <Eyebrow className="relative z-10 text-[#241F6B]/70">Retail</Eyebrow>

          <div className="relative z-10 -mt-2">
            <span className="block text-2xl font-black uppercase leading-none tracking-tight text-[#241F6B] sm:text-3xl">
              Below
            </span>
            {/* Sized off the card, not the viewport, so it stays clipped by the
                same amount at every width instead of reflowing. */}
            <span className="relative mt-1 block w-fit text-[24cqw] font-black uppercase leading-[0.78] tracking-tighter text-[#241F6B]">
              MRP
              <span
                aria-hidden="true"
                className={`adv-strike absolute left-[-6%] right-[-6%] top-1/2 block h-[0.09em] -translate-y-1/2 rounded-full bg-[#FFB000] ${
                  drawStrike ? 'is-drawing' : ''
                }`}
              />
            </span>
          </div>

          <div className="relative z-10 flex flex-col gap-2">
            <p className="text-[11px] font-bold leading-snug text-[#241F6B]/70">
              Single items at wholesale prices. No minimum order.
            </p>
            <GoArrow className="text-[#241F6B]">Explore catalog</GoArrow>
          </div>
        </Card>

        {/* 2 — Wholesale. Three marquee rows, middle one running back the
            other way so the card never reads as one sliding block. */}
        <Card
          as="a"
          href={waLink('Bulk Inquiry')}
          target="_blank"
          rel="noreferrer"
          aria-label="Request a wholesale quote on WhatsApp"
          className="bg-[#241F6B]"
        >
          <div className="relative z-10 flex shrink-0 items-start justify-between gap-3">
            <Eyebrow className="text-[#CDD661]">Institutional</Eyebrow>
          </div>

          {/* flex-1 + min-h-0: this band gets exactly whatever vertical space
              is left between the eyebrow and the heading below, at any card
              size — not a guessed rem offset. overflow-hidden clips whichever
              rows don't fit, which reads as the band continuing past the
              frame rather than as a bug. See the AdvantageCards.jsx header
              comment: an earlier top-1/2 + -translate-y-1/2 version centered
              on the card ignoring the heading's footprint, and collided with
              it once the card dropped below ~230px on tablet widths. */}
          <div
            aria-hidden="true"
            className="pointer-events-none relative z-0 min-h-0 flex-1 select-none overflow-hidden border-y-[6px] border-[#CDD661] py-3"
          >
            {[
              { cls: 'adv-marquee--fast', text: 'BULK' },
              { cls: 'adv-marquee--reverse', text: 'BULK' },
              { cls: 'adv-marquee--slow', text: 'BULK' },
            ].map((row, i) => (
              <div key={i} className={`adv-marquee ${row.cls}`}>
                {Array.from({ length: 12 }).map((_, j) => (
                  <span
                    key={j}
                    className="px-3 text-[15cqw] font-black uppercase leading-[0.95] tracking-tighter text-[#FFB000]"
                  >
                    {row.text}
                  </span>
                ))}
              </div>
            ))}
          </div>

          <div className="relative z-10 flex shrink-0 flex-col gap-2">
            <h3 className="text-xl font-black uppercase leading-none tracking-tight text-white sm:text-2xl">
              Wholesale supply
            </h3>
            <GoArrow className="text-[#CDD661]">Request a quote</GoArrow>
          </div>
        </Card>

        {/* 3 — WhatsApp. The prop card: a thread that keeps moving, which is
            the actual product experience rather than a picture of it. */}
        <Card
          as="a"
          href={waLink('Send Stationery List')}
          target="_blank"
          rel="noreferrer"
          aria-label="Send your list on WhatsApp"
          className="bg-[#14113D]"
        >
          <div className="relative z-10 flex shrink-0 items-center justify-between gap-3">
            <Eyebrow className="text-white/50">Send a list</Eyebrow>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#25D366]">
              <WhatsAppIcon className="h-4 w-4 text-white" />
            </span>
          </div>

          {/* flex-1 + min-h-0, same reasoning as card 2's band — fills exactly
              the gap between the icon row and the heading, at any card size.
              Masked at both ends so bubbles dissolve instead of being sliced. */}
          <div
            aria-hidden="true"
            className="pointer-events-none relative z-0 min-h-0 flex-1 select-none overflow-hidden px-1 [mask-image:linear-gradient(to_bottom,transparent,#000_16%,#000_84%,transparent)]"
          >
            <div className="adv-chat-track flex flex-col gap-2">
              {[...CHAT_LINES, ...CHAT_LINES].map((line, i) => (
                <ChatBubble key={i} line={line} />
              ))}
            </div>
          </div>

          <div className="relative z-10 flex shrink-0 flex-col gap-2">
            <h3 className="text-xl font-black uppercase leading-none tracking-tight text-white sm:text-2xl">
              WhatsApp enquiry
            </h3>
            <GoArrow className="text-[#CDD661]">Send your list</GoArrow>
          </div>
        </Card>
      </div>
    </section>
  );
}
