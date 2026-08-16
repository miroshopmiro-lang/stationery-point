import React from 'react';
import { STORE } from '../lib/utils';
import { PhoneIcon, WhatsAppIcon } from './icons';
import { waLink } from '../lib/utils';

// The real shop. Jags is a distributor with no storefront, so this section is
// structurally unavailable to them — it's one of the clearest places we win.
// Uses the genuine photograph of the shop, not generated art.
export default function VisitShop() {
  return (
    <section className="py-12 sm:py-16 bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <img
            src="/storefront.jpg"
            alt={`${STORE.name} shopfront on Jr Janatha Road, Vyttila`}
            width={1600}
            height={1200}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover aspect-[4/3]"
          />
        </div>

        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-accent block mb-1.5">
            Visit us
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
            Ground floor, Katti Tower
          </h2>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-md">
            {STORE.address}
          </p>
          <p className="text-brand-accent font-semibold text-sm mt-2">{STORE.landmark}</p>

          <dl className="mt-6 space-y-2 text-sm">
            <div className="flex gap-3">
              <dt className="text-white/50 w-20 shrink-0">Open</dt>
              <dd className="text-white/90">Mon – Sat, 9:30 AM – 8:00 PM</dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-white/50 w-20 shrink-0">Sunday</dt>
              <dd className="text-white/90">Closed</dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-3 mt-7">
            <a
              href={STORE.mapsLink}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-brand-accent text-brand-dark font-bold px-6 py-3 text-sm hover:bg-white transition-colors"
            >
              Get directions
            </a>
            <a
              href={`tel:${STORE.phoneTel}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-bold hover:bg-white/10 transition-colors"
            >
              <PhoneIcon className="w-4 h-4" /> {STORE.phoneDisplay}
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-5 py-3 text-sm font-bold hover:bg-[#1da851] transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
