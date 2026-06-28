import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { STORE, waLink } from '../lib/utils';
import { WhatsAppIcon, PhoneIcon, SearchIcon, MenuIcon } from './icons';

const nav = [
  { to: '/', label: 'Home' },
  { to: '/catalog', label: 'Shop Catalog' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact Store' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-brand-purple text-white text-center text-xs sm:text-sm py-2 px-4 tracking-wide">
        Quality Products Below MRP &nbsp;|&nbsp; Special Store Discounts Available
      </div>

      <div className="glass border-b border-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src="/logo.png" alt="Stationery Point Logo" className="w-9 h-9 rounded-lg object-cover" />
            <span className="font-extrabold tracking-tight text-lg leading-none" translate="no">STATIONERY<br className="hidden sm:block" /> POINT</span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:flex items-center gap-1 glass rounded-full px-2 py-1 border border-white/50 shadow-soft">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-brand-purple ${
                    isActive ? 'bg-brand-purple text-white' : 'text-gray-700 hover:bg-brand-lavender'
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/catalog" className="hidden sm:flex items-center gap-2 bg-white/70 border border-gray-200 rounded-full px-3 py-2 text-sm text-gray-500 hover:border-brand-purple transition-colors">
              <SearchIcon className="w-4 h-4" /> Search
            </Link>
            <a href={`tel:${STORE.phoneTel}`} className="hidden md:flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold border border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white transition-colors duration-300">
              <PhoneIcon className="w-4 h-4" /> Call
            </a>
            <a href={waLink()} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold bg-[#25D366] text-white hover:bg-[#1da851] transition-colors" aria-label="Enquire on WhatsApp">
              <WhatsAppIcon className="w-4 h-4" /> <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden p-2 rounded-lg hover:bg-brand-lavender"
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
              <div className="px-4 py-3 flex flex-col">
                {nav.map((n) => (
                  <NavLink key={n.to} to={n.to} end={n.to === '/'} onClick={() => setOpen(false)} className={({ isActive }) => `px-4 py-3 rounded-xl font-semibold ${isActive ? 'bg-brand-lavender text-brand-purple' : 'text-gray-700'}`}>
                    {n.label}
                  </NavLink>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
