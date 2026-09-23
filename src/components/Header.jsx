import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { STORE, waLink } from '../lib/utils';
import CtaLink from './CtaLink';
import { WhatsAppIcon, SearchIcon, MenuIcon, CloseIcon } from './icons';
import AskBox from './AskBox';

/*
 * HEADER — copied from hobbycraft.co.uk, measured live at 375px on 17 Aug 2026.
 *
 * Structure being copied, in order:
 *   1. Notice / announcement bar          (flyingtiger.com: full-bleed dark, 34px, centred,
 *                                          rotates claims; hobbycraft adds the X to dismiss)
 *   2. Icon row with TEXT LABEL UNDER EACH ICON, centred logo   (hobbycraft — its distinguishing
 *                                          header trait: Menu / Stores / [logo] / Sign in / Basket)
 *   3. Full-width rounded search pill on its own row            (unanimous across all three
 *                                          sites I could render: FT, hobbycraft, blick)
 *   4. Trust strip: two claims split by a vertical divider      (hobbycraft: "FREE Delivery
 *                                          over £25 │ FREE Click & Collect over £10", ~38px)
 *
 * Brand swap only. No glassmorphism, no floating nav pill, no spring animations — none of the
 * four references has any of that, and the previous version of this file did.
 */

const nav = [
  { to: '/', label: 'Home' },
  { to: '/catalog', label: 'Shop Catalog' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact Store' },
];

/* Desktop category nav, mirroring flyingtiger.com's horizontal bar. Sourced from the real
   category list so we are not padding the count to look bigger than the shop is. */
const categoryNav = [
  // Was ?collection=school-kits — nothing reads that param, so it silently rendered the
  // whole catalogue. No kit SKU exists yet, so it goes to the enquiry flow.
  { label: 'School kits', to: 'wa:school-kits' },
  { label: 'Stationery', to: '/catalog?category=stationery' },
  { label: 'Art supplies', to: '/catalog?category=art-supplies' },
  { label: 'Craft', to: '/catalog?category=craft-material' },
  { label: 'Office', to: '/catalog?category=office-supplies' },
  { label: 'Party & gifts', to: '/catalog?category=party-gifts' },
  // 'Return gifts' removed 4 Sep 2026: Sam's item list files nothing under it, so the link
  // landed on an empty grid. Restore the moment a return-gift product exists.

  { label: 'Bulk orders', to: 'wa:bulk' },
];

// flyingtiger.com rotates three claims in its announcement bar. Same count, our claims.
const announcements = [
  'Below MRP every day',
  `${STORE.rating}★ from ${STORE.reviewCount} Google reviews`,
  'Bulk rates for schools & offices',
];

function ShopPinIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

/* Icon + label stacked, label underneath — hobbycraft's pattern. Their labels measure ~11px. */
function HeaderAction({ as = 'button', to, href, icon, label, onClick, ...rest }) {
  const inner = (
    <>
      {icon}
      <span className="text-[11px] leading-none font-medium">{label}</span>
    </>
  );
  const cls =
    'flex flex-col items-center justify-center gap-1 min-w-[52px] min-h-[52px] px-1 text-brand-dark ' +
    'transition-colors duration-text ease-ref hover:text-brand-primary ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-md';

  if (as === 'link') return <Link to={to} className={cls} {...rest}>{inner}</Link>;
  if (as === 'a') return <a href={href} className={cls} {...rest}>{inner}</a>;
  return <button type="button" onClick={onClick} className={cls} {...rest}>{inner}</button>;
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(true);
  const [claim, setClaim] = useState(0);
  const panelRef = useRef(null);

  // Rotate the announcement claims. flyingtiger.com rotates; interval not measurable
  // from a static inspection, so 5s is our choice and is flagged as such.
  useEffect(() => {
    if (!noticeOpen) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setClaim((c) => (c + 1) % announcements.length), 5000);
    return () => clearInterval(id);
  }, [noticeOpen]);

  // Close the menu panel on Escape or outside click.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    const onClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onClick);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* 1 — Announcement bar. flyingtiger.com: full-bleed dark, 34px @375, centred white text. */}
      {noticeOpen && (
        <div className="relative text-white border-b-[3px] border-[#FFC107]" style={{ background: 'linear-gradient(90deg,#241F6B 0%,#3A34A8 50%,#241F6B 100%)' }}>
          <p
            className="h-[34px] flex items-center justify-center px-10 text-center text-[12px] leading-none font-medium"
            aria-live="polite"
          >
            <span className="text-[#FFC107] mr-2" aria-hidden="true">✦</span>
            {announcements[claim]}
            <span className="text-[#FFC107] ml-2" aria-hidden="true">✦</span>
          </p>
          <button
            type="button"
            onClick={() => setNoticeOpen(false)}
            aria-label="Dismiss announcement"
            className="absolute right-1 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors duration-text ease-ref"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 2 — MOBILE/TABLET (below lg): icon row, labels underneath, logo centred, hobbycraft's
             structure, THEN a separate full-width search row beneath it — matching how
             flyingtiger.com and dickblick.com both still split these two rows at phone width
             (measured live, both sites). Only DESKTOP merges them (block 2b below): at 1280px+
             there is enough horizontal room to hold logo, search and actions on one line the way
             every reference site does it there, and the audit flagged our three stacked rows
             (announcement, icon row, search row) as one row too many once that room exists. */}
      <div className="lg:hidden border-b border-hairline">
        <div className="max-w-[1280px] mx-auto px-2 sm:px-4 flex items-center justify-between gap-1">
          <div className="flex items-center">
            <HeaderAction
              onClick={() => setMenuOpen((v) => !v)}
              icon={<MenuIcon className="w-6 h-6" />}
              label="Menu"
              aria-expanded={menuOpen}
              aria-controls="main-menu"
            />
            <HeaderAction
              as="a"
              href={STORE.mapsLink}
              target="_blank"
              rel="noreferrer"
              icon={<ShopPinIcon />}
              label="Shop"
            />
          </div>

          <Link
            to="/"
            className="flex items-center gap-2 py-2.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-md"
          >
            <img
              src="/logo.webp"
              alt=""
              width={128}
              height={128}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg object-cover"
            />
            {/* Wraps to two lines at phone width where horizontal room is scarce, but stays on
                ONE line from sm up. The audit found it wrapping at every breakpoint including
                1440px, which made the wordmark read as cramped on a header with 900px spare. */}
            <span
              className="font-bold tracking-tight text-brand-primary text-base sm:text-xl leading-[1.05]"
              translate="no"
            >
              STATIONERY<br className="sm:hidden" />
              <span className="hidden sm:inline"> </span>POINT
            </span>
          </Link>

          <div className="flex items-center">
            <HeaderAction
              as="a"
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              icon={<WhatsAppIcon className="w-6 h-6" />}
              label="WhatsApp"
            />
          </div>
        </div>
      </div>

      {/* Full-width search pill, own row — mobile/tablet only, see note above. Placeholder
          carries the item count: copied from blick's "Search 110,000+ art supplies". */}
      <div className="lg:hidden border-b border-hairline bg-white">
        <div className="max-w-[1280px] mx-auto px-4 py-2.5">
          <AskBox variant="header" />
        </div>
      </div>

      {/* 2b — DESKTOP (lg+): logo, search and actions on ONE row, matching flyingtiger.com and
          dickblick.com (both measured live, 16 Sep 2026) rather than stacking search on its own
          row underneath — there is no reason to spend a whole extra row on it once the header is
          1280px wide. Logo runs noticeably larger here too, closer to blick's bold wordmark
          weight, since a 36px mark that was sized for a 375px phone read as small next to 900px+
          of spare header width. */}
      <div className="hidden lg:block border-b border-hairline">
        <div className="max-w-[1280px] mx-auto px-8 py-3 flex items-center gap-6">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="main-menu"
            aria-label="Menu"
            className="flex items-center gap-1.5 text-brand-dark shrink-0
                       transition-colors duration-text ease-ref hover:text-brand-primary
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-md px-1 py-1"
          >
            <MenuIcon className="w-6 h-6" />
            <span className="text-sm font-medium">Menu</span>
          </button>

          <Link
            to="/"
            className="flex items-center gap-2.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-md"
          >
            <img
              src="/logo.webp"
              alt=""
              width={128}
              height={128}
              className="w-12 h-12 xl:w-14 xl:h-14 rounded-lg object-cover"
            />
            <span
              className="font-bold tracking-tight text-brand-primary text-2xl xl:text-[28px] leading-none whitespace-nowrap"
              translate="no"
            >
              STATIONERY POINT
            </span>
          </Link>

          <div className="flex-1 max-w-xl">
            <AskBox variant="header" />
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <a
              href={STORE.mapsLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-brand-dark
                         transition-colors duration-text ease-ref hover:text-brand-primary
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-md px-1 py-1"
            >
              <ShopPinIcon className="w-6 h-6" />
              <span className="text-sm font-medium">Shop</span>
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-brand-dark
                         transition-colors duration-text ease-ref hover:text-brand-primary
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-md px-1 py-1"
            >
              <WhatsAppIcon className="w-6 h-6" />
              <span className="text-sm font-medium">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3b — DESKTOP CATEGORY NAV. Added 17 Aug 2026 after the visual audit found the 1440px
             header was ~900px of dead white carrying three icons and nothing else.
             This is the finding I got wrong first time round: a DOM query returned only "Menu"
             and I concluded flyingtiger.com was hamburger-only even at desktop. The screenshot
             showed a full horizontal nav of FOURTEEN items — New in, Back To School,
             Bestsellers, School & office, Home, Gifts, Food, Toys & games, Arts & crafts,
             Party & occasions, Accessories, Last Chance, Shop all, Inspiration.
             So: horizontal category nav at desktop, hamburger at phone width. Ours lists the
             real categories rather than padding the count to match theirs. */}
      <nav aria-label="Categories" className="hidden lg:block border-b border-hairline bg-white">
        <ul className="max-w-[1280px] mx-auto px-8 flex items-center justify-center gap-1 xl:gap-2">
          {categoryNav.map((c) => (
            <li key={c.label}>
              <CtaLink
                nav
                to={c.to}
                className={({ isActive }) =>
                  'inline-flex items-center h-11 px-3 text-[14px] font-medium whitespace-nowrap ' +
                  'transition-colors duration-text ease-ref ' +
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded ' +
                  (isActive ? 'text-brand-primary' : 'text-ink hover:text-brand-primary')
                }
              >
                {c.label}
              </CtaLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Menu panel. hobbycraft opens a full nav drawer from the Menu action. */}
      {menuOpen && (
        <nav
          id="main-menu"
          ref={panelRef}
          aria-label="Main"
          className="absolute inset-x-0 top-full bg-white border-b border-hairline shadow-card"
        >
          <ul className="max-w-[1280px] mx-auto px-4 py-2">
            {nav.map((n) => (
              <li key={n.to}>
                <NavLink
                  to={n.to}
                  end={n.to === '/'}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    'flex items-center min-h-[48px] px-2 text-[15px] font-medium border-b border-hairline last:border-b-0 ' +
                    'transition-colors duration-text ease-ref ' +
                    (isActive ? 'text-brand-primary' : 'text-ink hover:text-brand-primary')
                  }
                >
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
