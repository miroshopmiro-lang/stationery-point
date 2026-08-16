import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { waLink, waListLink } from '../lib/utils';
import { useEnquiryList } from '../context/EnquiryListContext';
import SendListModal from './SendListModal';
import { WhatsAppIcon } from './icons';

function TagIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

function BoxesIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function SparkAccent({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <path d="M12 3v3M6 6l2.5 2.5M18 6l-2.5 2.5" />
    </svg>
  );
}

export default function AdvantageCards() {
  const { items, count } = useEnquiryList();
  const [listModalOpen, setListModalOpen] = useState(false);

  const handleSendListClick = (e) => {
    if (count === 0) {
      e.preventDefault();
      setListModalOpen(true);
    }
  };

  return (
    <section className="w-full bg-[#F4F2FC] py-10 sm:py-18 md:py-24">
      <SendListModal open={listModalOpen} onClose={() => setListModalOpen(false)} />

      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        {/* Section Header — Centered on Mobile, Left-aligned on Desktop */}
        <div className="mb-8 sm:mb-12 max-w-2xl text-center md:text-left mx-auto md:mx-0">
          <span className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#332E92] block mb-2 sm:mb-3">
            WHY SHOP WITH US
          </span>
          <div className="relative inline-block text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-bold text-[#1C1230] leading-[1.15] tracking-tight">
              More value. Less hassle.
            </h2>
            <SparkAccent className="absolute left-full ml-1 sm:ml-1.5 top-0 sm:top-1 w-5 h-5 sm:w-6 sm:h-6 text-[#CDD661] shrink-0" />
          </div>
          <p className="text-base sm:text-lg text-gray-600 font-normal leading-[1.45] sm:leading-relaxed mt-2.5 sm:mt-3">
            Whether you&apos;re grabbing a pen or stocking up for a classroom, we make it easy.
          </p>
        </div>

        {/* 3 Benefit Columns — Centered Flow on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 md:divide-x md:divide-[#E2DCF7] md:-mx-6">
          {/* Column 1: Save more */}
          <div className="flex flex-col justify-between items-center md:items-start text-center md:text-left md:h-full md:px-6 border-b border-[#E2DCF7]/70 pb-8 md:pb-0 md:border-b-0">
            <div className="flex flex-col items-center md:items-start">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#E5E0FA] text-[#332E92] flex items-center justify-center mb-3 sm:mb-4 shrink-0 mx-auto md:mx-0">
                <TagIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#332E92]" />
              </div>

              <h3 className="text-[23px] sm:text-2xl font-bold text-[#332E92] tracking-tight mb-1.5 sm:mb-2.5">
                Save more
              </h3>
              <p className="text-[16.5px] sm:text-lg font-bold text-[#1C1230] leading-[1.35] mb-1 sm:mb-2 max-w-[320px] mx-auto md:mx-0">
                Wholesale prices, even for single items.
              </p>
              <p className="text-[15px] sm:text-base text-gray-600 leading-[1.45] mb-4 sm:mb-7 max-w-[320px] mx-auto md:mx-0">
                Top brands at prices below MRP. No minimum order.
              </p>
            </div>

            <Link
              to="/catalog"
              className="inline-flex items-center gap-1.5 text-[15px] sm:text-base font-bold text-[#332E92] hover:text-[#241F6B] underline underline-offset-4 decoration-2 decoration-[#332E92]/30 transition-colors group"
            >
              Browse the catalog <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>

          {/* Column 2: Buy in bulk */}
          <div className="flex flex-col justify-between items-center md:items-start text-center md:text-left md:h-full md:px-6 border-b border-[#E2DCF7]/70 pb-8 md:pb-0 md:border-b-0">
            <div className="flex flex-col items-center md:items-start">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#E5E0FA] text-[#332E92] flex items-center justify-center mb-3 sm:mb-4 shrink-0 mx-auto md:mx-0">
                <BoxesIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#332E92]" />
              </div>

              <h3 className="text-[23px] sm:text-2xl font-bold text-[#332E92] tracking-tight mb-1.5 sm:mb-2.5">
                Buy in bulk
              </h3>
              <p className="text-[16.5px] sm:text-lg font-bold text-[#1C1230] leading-[1.35] mb-1 sm:mb-2 max-w-[320px] mx-auto md:mx-0">
                Easy institutional &amp; wholesale orders.
              </p>
              <p className="text-[15px] sm:text-base text-gray-600 leading-[1.45] mb-4 sm:mb-7 max-w-[320px] mx-auto md:mx-0">
                Volume discounts, GST invoices and supplies for schools, offices and events.
              </p>
            </div>

            <a
              href={waLink('Bulk Inquiry')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[15px] sm:text-base font-bold text-[#332E92] hover:text-[#241F6B] underline underline-offset-4 decoration-2 decoration-[#332E92]/30 transition-colors group"
            >
              Get a bulk quote <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </a>
          </div>

          {/* Column 3: Order on WhatsApp */}
          <div className="flex flex-col justify-between items-center md:items-start text-center md:text-left md:h-full md:px-6">
            <div className="flex flex-col items-center md:items-start">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#DCF8C6] text-[#25D366] flex items-center justify-center mb-3 sm:mb-4 shrink-0 mx-auto md:mx-0">
                <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 text-[#25D366]" />
              </div>

              <h3 className="text-[23px] sm:text-2xl font-bold text-[#332E92] tracking-tight mb-1.5 sm:mb-2.5">
                Order on WhatsApp
              </h3>
              <p className="text-[16.5px] sm:text-lg font-bold text-[#1C1230] leading-[1.35] mb-1 sm:mb-2 max-w-[320px] mx-auto md:mx-0">
                Send us your list. We’ll handle the rest.
              </p>
              <p className="text-[15px] sm:text-base text-gray-600 leading-[1.45] mb-4 sm:mb-7 max-w-[320px] mx-auto md:mx-0">
                Select items from our catalog or message us directly. Fast price quotes &amp; store pickup.
              </p>
            </div>

            <a
              href={count > 0 ? waListLink(items) : '#'}
              onClick={handleSendListClick}
              target={count > 0 ? '_blank' : '_self'}
              rel={count > 0 ? 'noreferrer' : undefined}
              className="inline-flex items-center gap-1.5 text-[15px] sm:text-base font-bold text-[#332E92] hover:text-[#25D366] underline underline-offset-4 decoration-2 decoration-[#332E92]/30 transition-colors group"
            >
              Send your list <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
