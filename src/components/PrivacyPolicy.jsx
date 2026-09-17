import React from 'react';
import { Link } from 'react-router-dom';
import { STORE, waLink } from '../lib/utils';

/*
 * PRIVACY POLICY — 17 Sep 2026. Audited against the actual codebase before writing a word:
 *   - Contact.jsx's form never POSTs anywhere. "Send on WhatsApp" opens a wa.me deep link
 *     with the message pre-filled; "Send via Email" opens a mailto: draft. Nothing leaves
 *     the visitor's device until they personally hit send in WhatsApp or their email app.
 *   - EnquiryListContext.jsx persists the "My List" enquiry basket to localStorage only —
 *     device-side, never transmitted to us or anyone else until the visitor taps "Send
 *     List on WhatsApp", which is the same wa.me deep-link pattern.
 *   - No analytics, ad-pixel, or tracking script anywhere in the codebase (checked index.html
 *     and every component for gtag/fbq/GA/etc — none present).
 *   - Third parties actually loaded: Google Fonts (index.html), Google Maps embed
 *     (Contact.jsx iframe), and WhatsApp/Instagram as outbound links the visitor clicks.
 *   - No file upload field anywhere on the site.
 * Every claim below is true of this exact codebase — update this comment (and the page) if
 * that ever changes, e.g. if analytics or a real backend gets added later.
 */
export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <p className="text-sm font-medium text-gray-400 mb-2">Legal</p>
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Privacy Policy</h1>
      <p className="mt-4 text-gray-500">Last updated: 17 September 2026</p>

      <div className="mt-10 flex flex-col gap-8 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">1. Who we are</h2>
          <p>
            Stationery Point is a stationery, office, school, art and craft supplies shop at{' '}
            {STORE.address}. For any privacy question, reach us on WhatsApp
            (<a href={waLink()} target="_blank" rel="noreferrer" className="text-brand-primary underline underline-offset-4">{STORE.phoneDisplay}</a>)
            or by calling <a href={`tel:${STORE.phoneTel}`} className="text-brand-primary underline underline-offset-4">{STORE.phoneDisplay}</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">2. What we collect</h2>
          <p>We only collect what you choose to give us, through two features:</p>
          <ul className="mt-2 list-disc pl-5 flex flex-col gap-1">
            <li><strong>Contact form</strong> (on the <Link to="/contact" className="text-brand-primary underline underline-offset-4">Contact page</Link>): your name, phone number, email (optional), and your message.</li>
            <li><strong>"My List" enquiry basket</strong>: the names and quantities of products you add while browsing.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">3. How these actually work</h2>
          <p>
            Nothing on this site is submitted to a server. The Contact form's "Send on WhatsApp" button opens a
            WhatsApp chat to our number with your message already typed in — it only sends once you personally tap
            send inside WhatsApp. "Send via Email" does the same with your own email app. Every "Add to list" and
            "Enquire on WhatsApp" button across the site works the same way: your list is only sent when you open
            it and tap "Send List on WhatsApp".
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">4. Why we use it</h2>
          <p>Only to respond to your enquiry — confirm stock, pricing, or help with an order. Nothing else.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">5. Who else sees it</h2>
          <ul className="list-disc pl-5 flex flex-col gap-1">
            <li><strong>WhatsApp (Meta Platforms, Inc.)</strong> — once you send a message from your own WhatsApp app to us.</li>
            <li><strong>Your email provider</strong> — only if you use "Send via Email".</li>
            <li><strong>Google Fonts</strong> (fonts.googleapis.com / fonts.gstatic.com) — loads the typeface used on this site; Google may log that request per its own policy.</li>
            <li><strong>Google Maps</strong> — the map embedded on our Contact page is loaded from Google.</li>
          </ul>
          <p className="mt-2">
            We don't run analytics or ad-tracking scripts, and we don't sell or share your details with anyone else.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">6. Cookies</h2>
          <p>
            This site doesn't set cookies. Your "My List" basket is saved using your browser's local storage, purely
            to remember it between visits on the same device — it stays on your device, is never sent to us or
            anyone else, and you can clear it anytime with the "Clear list" button or by clearing your browser's
            site data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">7. File uploads</h2>
          <p>We don't accept file uploads through the website. If you need to share a photo, PDF or supply list, send it to us directly on WhatsApp.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">8. How long we keep it</h2>
          <p>
            Messages you send us over WhatsApp or email are kept as long as needed to handle your enquiry, or
            longer where GST/billing records require it for a completed order. Your "My List" basket lives only in
            your browser's local storage and we never receive it unless you choose to send it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">9. Your rights</h2>
          <p>
            Under the Digital Personal Data Protection Act, 2023, you can ask us to access, correct, or delete any
            personal data you've sent us via WhatsApp or email — just message or call us using the details above.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">10. Changes to this policy</h2>
          <p>If this policy changes, we'll update the date at the top of this page.</p>
        </section>

        <p className="text-sm text-gray-400">
          See also our <Link to="/terms" className="text-brand-primary underline underline-offset-4">Terms of Use</Link>.
        </p>
      </div>
    </div>
  );
}
