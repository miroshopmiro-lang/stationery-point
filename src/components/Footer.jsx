import React from 'react';
import { Link } from 'react-router-dom';
import { STORE, waLink } from '../lib/utils';
import { useActiveCategories } from '../data/catalog';
import { PhoneIcon, WhatsAppIcon, InstagramIcon } from './icons';

export default function Footer() {
  const activeCategories = useActiveCategories();
  return (
    <footer className="bg-brand-primary text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <h2 className="font-bold text-lg mb-4 border-b border-white/15 pb-2">Catalog</h2>
            <ul className="space-y-2 text-white/75 text-sm">
              {/* activeCategories: a footer link to an empty category is still a dead end. */}
              {activeCategories.map((c) => (
                <li key={c.id}><Link to={`/catalog?category=${c.id}`} className="hover:text-brand-accent transition-colors">{c.title}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-lg mb-4 border-b border-white/15 pb-2">Store Details</h2>
            <ul className="space-y-2 text-white/75 text-sm">
              <li><Link to="/about" className="hover:text-brand-accent transition-colors">About Us</Link></li>
              <li>{STORE.hours}</li>
              <li>Enquiry-only · No online checkout</li>
              <li>Quality products below MRP</li>
              <li>Free parking available</li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-lg mb-4 border-b border-white/15 pb-2">Get in Touch</h2>
            <ul className="space-y-3 text-white/75 text-sm">
              <li>{STORE.address}</li>
              <li className="text-brand-accent">{STORE.landmark}</li>
              <li><a href={`tel:${STORE.phoneTel}`} className="inline-flex items-center gap-2 hover:text-brand-accent transition-colors"><PhoneIcon className="w-4 h-4" /> {STORE.phoneDisplay}</a></li>
              <li className="flex items-center gap-4 pt-1">
                <a href={waLink()} target="_blank" rel="noreferrer" className="hover:text-brand-accent transition-colors" aria-label="Enquire on WhatsApp"><WhatsAppIcon className="w-5 h-5" /></a>
                <a href={STORE.instagram} target="_blank" rel="noreferrer" className="hover:text-brand-accent transition-colors" aria-label="Visit our Instagram"><InstagramIcon className="w-5 h-5" /></a>
                <a href={STORE.mapsLink} target="_blank" rel="noreferrer" className="hover:text-brand-accent transition-colors text-sm underline underline-offset-4">View Map</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/60">
          <Link to="/privacy" className="hover:text-brand-accent transition-colors underline underline-offset-4">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-brand-accent transition-colors underline underline-offset-4">Terms of Use</Link>
        </div>
        <p className="mt-4 text-center text-xs text-white/50">© {new Date().getFullYear()} Stationery Point, Kochi. All rights reserved.</p>
      </div>
      <div className="overflow-hidden" aria-hidden="true">
        <span className="block text-center uppercase font-extrabold leading-none text-white/10 text-[14vw] tracking-tight select-none -mb-[2vw]" translate="no">
          Stationery Point
        </span>
      </div>
    </footer>
  );
}
