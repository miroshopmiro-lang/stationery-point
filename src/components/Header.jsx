import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { STORE, waLink } from '../lib/utils';
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
        <div className="relative bg-brand-dark text-white">
          <p
            className="h-[34px] flex items-center justify-center px-10 text-center text-[12px] leading-none font-medium"
            aria-live="polite"
          >
            {announcements[claim]}
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

      {/* 2 — Icon row, labels underneath, logo centred. hobbycraft's structure. */}
      <div className="border-b border-hairline">
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
              className="w-8 h-8 rounded-lg object-cover"
            />
            <span
              className="font-bold tracking-tight text-brand-primary text-[15px] sm:text-lg leading-[1.05]"
              translate="no"
            >
              STATIONERY<br />POINT
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

      {/* 3 — Full-width search pill, own row. Unanimous across FT / hobbycraft / blick.
             Placeholder carries the item count: copied from blick's "Search 110,000+ art supplies". */}
      <div className="border-b border-hairline bg-white">
        <div className="max-w-[1280px] mx-auto px-4 py-2.5">
          <AskBox variant="header" />
        </div>
      </div>

      {/* 4 — Trust strip. hobbycraft: light band, centred, two claims split by a divider, ~38px. */}
      <div className="bg-brand-soft">
        <div className="max-w-[1280px] mx-auto px-4 min-h-[38px] flex items-center justify-center">
          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 py-2 text-center text-[11px] leading-tight font-medium text-brand-dark">
            <span>Free delivery across Kochi</span>
            <span className="text-brand-primary/30" aria-hidden="true">│</span>
            <span>Or pick up from the shop</span>
          </p>
        </div>
      </div>

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
