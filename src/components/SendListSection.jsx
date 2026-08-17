import React from 'react';
import AskBox from './AskBox';
import { ListIcon } from './icons';

// The supply-list flow, given its own designed section rather than sitting
// naked in the hero. Per the Reddit research this is the highest-value
// interaction on the site: schools and offices keep their requirements as a
// list and send it to two or three vendors — they do not click through a
// catalogue item by item.
export default function SendListSection() {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded bg-brand-primary overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 p-6 sm:p-10 lg:p-12 items-center">
            <div className="text-white">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-accent mb-3">
                <ListIcon className="w-4 h-4" /> For schools & offices
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-balance">
                Send your whole list at once
              </h2>
              <p className="mt-3 text-white/75 text-sm sm:text-base leading-relaxed max-w-md">
                Paste your supply list and we'll come back with prices and availability on
                WhatsApp. Volume pricing and GST invoices for bulk orders.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-white/70">
                <li className="flex gap-2.5">
                  <span className="text-brand-accent font-bold" aria-hidden="true">&rarr;</span>
                  One message instead of twenty
                </li>
                <li className="flex gap-2.5">
                  <span className="text-brand-accent font-bold" aria-hidden="true">&rarr;</span>
                  Photos and PDFs work too — send them straight on WhatsApp
                </li>
                <li className="flex gap-2.5">
                  <span className="text-brand-accent font-bold" aria-hidden="true">&rarr;</span>
                  Delivery across Kochi, or collect from the shop
                </li>
              </ul>
            </div>

            <div className="rounded bg-brand-dark/40 p-4 sm:p-5">
              <AskBox variant="header" defaultMode="list" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
