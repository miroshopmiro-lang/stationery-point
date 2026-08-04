import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { STORE, waLink } from '../lib/utils';
import { WhatsAppIcon, PhoneIcon, SearchIcon, MenuIcon } from './icons';

const nav = [
  { to: '/', label: 'Home' },
  { to: '/new-arrivals', label: 'New Arrivals' },
  { to: '/catalog', label: 'Shop Catalog' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact Store' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="relative overflow-hidden bg-gradient-to-r from-brand-dark via-brand-primary to-brand-dark text-white text-center text-xs sm:text-sm py-2 px-4 tracking-wide font-semibold">
        <div className="absolute inset-0 halftone-light opacity-25 pointer-events-none" aria-hidden="true" />
        <span className="relative">✏️ Quality Products Below MRP &nbsp;·&nbsp; Special Store Discounts Available</span>
      </div>

      <div className="glass border-b border-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="group flex items-center gap-2.5 shrink-0">
            <img src="/logo.png" alt="Stationery Point Logo" className="w-9 h-9 rounded-xl object-cover ring-2 ring-brand-primary/15 group-hover:ring-brand-primary/40 group-hover:-rotate-3 transition-all duration-300" />
            <span className="font-extrabold tracking-tight text-lg leading-none group-hover:text-brand-primary transition-colors duration-300" translate="no">STATIONERY<br className="hidden sm:block" /> POINT</span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:flex items-center gap-0.5 glass rounded-full px-1.5 py-1.5 border border-white/60 shadow-soft">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === '/'}
                className="relative px-4 py-2 rounded-full text-sm font-semibold focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        transition={{ type: 'spring', damping: 27, stiffness: 350 }}
                        className="absolute inset-0 rounded-full bg-brand-primary shadow-[0_4px_14px_rgba(51,46,146,0.35)]"
                        aria-hidden="true"
                      />
                    )}
                    <span className={`relative z-10 transition-colors duration-200 ${isActive ? 'text-white' : 'text-gray-700 hover:text-brand-primary'}`}>
                      {n.label}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/catalog" className="hidden sm:flex items-center gap-2 bg-white/70 border border-gray-200 rounded-full px-3 py-2 text-sm text-gray-500 hover:border-brand-primary transition-colors">
              <SearchIcon className="w-4 h-4" /> Search
            </Link>
            <a href={`tel:${STORE.phoneTel}`} className="hidden md:flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white transition-colors duration-300">
              <PhoneIcon className="w-4 h-4" /> Call
            </a>
            <a href={waLink()} target="_blank" rel="noreferrer" className="relative flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold bg-[#25D366] text-white hover:bg-[#1da851] hover:shadow-lg hover:-translate-y-px transition-all duration-200" aria-label="Enquire on WhatsApp">
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-200 border border-white" />
              </span>
              <WhatsAppIcon className="w-4 h-4" /> <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden p-2 rounded-lg hover:bg-brand-soft"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              <MenuIcon />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-nav"
              aria-label="Mobile"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden bg-white border-t border-gray-100"
            >
              <motion.div
                initial="closed"
                animate="open"
                variants={{ open: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
                className="px-4 py-3 flex flex-col gap-1"
              >
                {nav.map((n) => (
                  <motion.div key={n.to} variants={{ closed: { opacity: 0, x: -14 }, open: { opacity: 1, x: 0 } }}>
                    <NavLink
                      to={n.to}
                      end={n.to === '/'}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-colors ${
                          isActive ? 'bg-brand-soft text-brand-primary' : 'text-gray-700 hover:bg-gray-50'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span>{n.label}</span>
                          {isActive && <span className="w-2 h-2 rounded-full bg-brand-primary" aria-hidden="true" />}
                        </>
                      )}
                    </NavLink>
                  </motion.div>
                ))}
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
