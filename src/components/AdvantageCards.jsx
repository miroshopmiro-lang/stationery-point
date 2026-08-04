import React from 'react';
import { Link } from 'react-router-dom';
import { waLink } from '../lib/utils';

// The three Stationery Point advantage boxes.
// Design restored to the committed (pre-comic-book) look: rounded-3xl square
// panels, soft shadow, black-uppercase headings, pill CTAs, and the kinetic
// background typography that scrolls behind each card (.animate-scroll-left,
// defined in src/index.css). Purple swapped for the current brand-primary
// token so the panels match the rest of the rebranded site.

export default function AdvantageCards() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Retail below MRP */}
        <div className="bg-brand-primary text-white p-8 rounded-3xl flex flex-col justify-between aspect-square relative overflow-hidden shadow-soft group hover:shadow-md transition-shadow">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#FFB000]">Our Guarantee</span>
              <h3 className="text-3xl font-black uppercase tracking-tight mt-2 leading-none">
                Retail<br />Below MRP
              </h3>
              <p className="text-sm text-white/80 mt-4 leading-relaxed max-w-[220px]">
                Single items at wholesale prices. No minimum order quantity required.
              </p>
            </div>
            <Link to="/catalog" className="w-fit rounded-full bg-[#FFB000] text-gray-900 font-bold px-6 py-2.5 text-xs hover:bg-white transition-colors shadow-sm">
              Explore Catalog &rarr;
            </Link>
          </div>
          {/* Background Kinetic Typography */}
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
            <div className="absolute top-1/2 left-0 w-[300%] -translate-y-1/2 -rotate-[8deg] origin-left">
              <div className="flex animate-scroll-left w-max text-white" style={{ opacity: 0.1 }}>
                <span className="pr-[500px]">MRP</span>
                <span className="pr-[500px]">MRP</span>
                <span className="pr-[500px]">MRP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Bulk Wholesale */}
        <div className="bg-white border border-gray-200 text-gray-800 p-8 rounded-3xl flex flex-col justify-between aspect-square relative overflow-hidden shadow-soft group hover:shadow-md transition-shadow">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-primary/70">Institutional</span>
              <h3 className="text-3xl font-black uppercase tracking-tight text-brand-primary mt-2 leading-none">
                Wholesale<br />Supply
              </h3>
              <p className="text-sm text-gray-500 mt-4 leading-relaxed max-w-[220px]">
                Custom pricing for schools, tuition centers, offices, and bulk buyers in Kochi.
              </p>
            </div>
            <a href={waLink('Bulk Inquiry')} target="_blank" rel="noreferrer" className="w-fit rounded-full bg-brand-primary text-white font-bold px-6 py-2.5 text-xs hover:bg-opacity-90 transition-colors shadow-sm">
              Request Quote &rarr;
            </a>
          </div>
          {/* Background Kinetic Typography */}
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
            <div className="absolute top-1/2 left-0 w-[300%] -translate-y-1/2 -rotate-[8deg] origin-left">
              <div className="flex animate-scroll-left w-max text-brand-primary" style={{ opacity: 0.05 }}>
                <span className="pr-[500px]">BULK</span>
                <span className="pr-[500px]">BULK</span>
                <span className="pr-[500px]">BULK</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: WhatsApp Enquiry */}
        <div className="bg-[#25D366] text-white p-8 rounded-3xl flex flex-col justify-between aspect-square relative overflow-hidden shadow-soft group hover:shadow-md transition-shadow">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-green-100">Quick Contact</span>
              <h3 className="text-3xl font-black uppercase tracking-tight mt-2 leading-none">
                WhatsApp<br />Enquiry
              </h3>
              <p className="text-sm text-white/90 mt-4 leading-relaxed max-w-[220px]">
                Send us a list or picture of the items you need. We'll reply with a below-MRP quote!
              </p>
            </div>
            <a href={waLink('Send Stationery List')} target="_blank" rel="noreferrer" className="w-fit rounded-full bg-white text-green-600 font-bold px-6 py-2.5 text-xs hover:bg-green-50 transition-colors shadow-sm">
              Send List Now &rarr;
            </a>
          </div>
          {/* Background Kinetic Typography */}
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
            <div className="absolute top-1/2 left-0 w-[300%] -translate-y-1/2 -rotate-[8deg] origin-left">
              <div className="flex animate-scroll-left w-max text-white" style={{ opacity: 0.1 }}>
                <span className="pr-[500px]">CHAT</span>
                <span className="pr-[500px]">CHAT</span>
                <span className="pr-[500px]">CHAT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
