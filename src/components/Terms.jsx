import React from 'react';
import { Link } from 'react-router-dom';
import { STORE, waLink } from '../lib/utils';

export default function Terms() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <p className="text-sm font-medium text-gray-400 mb-2">Legal</p>
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Terms of Use</h1>
      <p className="mt-4 text-gray-500">Last updated: 17 September 2026</p>

      <div className="mt-10 flex flex-col gap-8 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">1. What this site is</h2>
          <p>
            This website is a catalogue of what Stationery Point stocks, for browsing only. It isn't an online
            store — there's no checkout, and nothing on it is a binding offer to sell at a stated price.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">2. Enquiries, not orders</h2>
          <p>
            The Contact form, "Add to list", and every "Enquire on WhatsApp" button send an enquiry or quote
            request — they don't place a confirmed order. An order is confirmed only once Sam replies on WhatsApp
            with stock, pricing and pickup details (or delivery details, for corporate customers) and you agree to them.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">3. Prices and stock</h2>
          <p>
            Prices shown as "Below MRP" or "Price on WhatsApp", and any stock status, are indicative. The real
            price and availability are whatever Sam confirms to you directly over WhatsApp, phone, or in-store.
          </p>
        </section>

        <section id="delivery">
          <h2 className="text-xl font-bold text-gray-900 mb-2">4. Delivery</h2>
          <p>
            Delivery is available to corporate customers only, and terms and conditions apply. They are
            confirmed with you on WhatsApp for each order. All other orders are collected from the shop at
            Katti Tower, Vyttila.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">5. Your information</h2>
          <p>
            How we handle anything you send us is covered in our{' '}
            <Link to="/privacy" className="text-brand-primary underline underline-offset-4">Privacy Policy</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">6. Contact us</h2>
          <p>
            Questions about these terms — reach us on WhatsApp
            (<a href={waLink()} target="_blank" rel="noreferrer" className="text-brand-primary underline underline-offset-4">{STORE.phoneDisplay}</a>)
            or call <a href={`tel:${STORE.phoneTel}`} className="text-brand-primary underline underline-offset-4">{STORE.phoneDisplay}</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
