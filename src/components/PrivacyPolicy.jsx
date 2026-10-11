import React from 'react';
import { Link } from 'react-router-dom';
import { STORE, waLink } from '../lib/utils';

/*
 * PRIVACY POLICY, 17 Sep 2026. Audited against the actual codebase before writing a word:
 *   - Contact.jsx's form never POSTs anywhere. "Send on WhatsApp" opens a wa.me deep link
 *     with the message pre-filled; "Send via Email" opens a mailto: draft. Nothing leaves
 *     the visitor's device until they personally hit send in WhatsApp or their email app.
 *   - EnquiryListContext.jsx persists the "My List" enquiry basket to localStorage only -
 *     device-side, never transmitted to us or anyone else until the visitor taps "Send
 *     List on WhatsApp", which is the same wa.me deep-link pattern.
 *   - No analytics, ad-pixel, or tracking script anywhere in the codebase (checked index.html
 *     and every component for gtag/fbq/GA/etc, none present).
 *   - Third parties actually loaded: Google Fonts (index.html), Google Maps embed
 *     (Contact.jsx iframe), and WhatsApp/Instagram as outbound links the visitor clicks.
 *   - No file upload field anywhere on the site.
 * Every claim below is true of this exact codebase, update this comment (and the page) if
 * that ever changes, e.g. if analytics or a real backend gets added later.
 */
export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <p className="text-sm font-medium text-gray-400 mb-2">Legal</p>
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Privacy Policy</h1>
      <p className="mt-4 text-gray-500">Last updated: 10 October 2026</p>

      <div className="mt-10 flex flex-col gap-8 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">1. Who we are</h2>
          <p>
            Stationery Point is a stationery, office, school, art, and craft supplies shop located at the{' '}
            {STORE.address}, operated under Primus Establishments. For any privacy-related questions, reach us on WhatsApp
            (<a href={waLink()} target="_blank" rel="noreferrer" className="text-brand-primary underline underline-offset-4">{STORE.phoneDisplay}</a>)
            or by calling <a href={`tel:${STORE.phoneTel}`} className="text-brand-primary underline underline-offset-4">{STORE.phoneDisplay}</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">2. What we collect</h2>
          <p>We only collect the details you choose to provide through two features:</p>
          <ul className="mt-2 list-disc pl-5 flex flex-col gap-1">
            <li><strong>Contact form</strong>: Your name, phone number, email (optional), and your message.</li>
            <li><strong>"My List" enquiry basket</strong>: The names and quantities of products you add while browsing.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">3. How these features work</h2>
          <p>Nothing on this site is automatically submitted to a server.</p>
          <p className="mt-2">
            The Contact form's "Send on WhatsApp" button opens a WhatsApp chat to our business number with your
            message pre-filled. It is only sent when you personally tap send inside WhatsApp.
          </p>
          <p className="mt-2">"Send via Email" operates similarly using your preferred email app.</p>
          <p className="mt-2">
            Every "Add to list" and "Enquire on WhatsApp" button works the same way: your list is only transmitted
            when you open it and tap "Send List on WhatsApp".
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">4. Why we use your information</h2>
          <p>We use your details solely to respond to your enquiries, confirm stock and pricing, or assist you with an order. Nothing else.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">5. Who else sees your data</h2>
          <ul className="list-disc pl-5 flex flex-col gap-1">
            <li><strong>WhatsApp (Meta Platforms, Inc.)</strong>: Once you send a message from your personal WhatsApp app to us.</li>
            <li><strong>Your email provider</strong>: Only if you choose to use the "Send via Email" option.</li>
            <li><strong>Google Fonts</strong>: Loads the typeface used on this site; Google may log that request per its own privacy policies.</li>
            <li><strong>Google Maps</strong>: The map embedded on our Contact page is loaded from Google.</li>
          </ul>
          <p className="mt-2">
            We do not run analytics or ad-tracking scripts, and we never sell or share your details with third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">6. Cookies</h2>
          <p>
            This site does not set cookies. Your "My List" basket is saved using your browser's local storage simply
            to remember your items between visits on the same device. It stays on your device, is never sent to us
            or anyone else, and you can clear it at any time using the "Clear list" button or by clearing your
            browser's site data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">7. File uploads</h2>
          <p>We do not accept file uploads through the website. If you need to share a photo, PDF, or supply list, please send it to us directly on WhatsApp.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">8. How long we keep your information</h2>
          <p>
            Messages sent to us over WhatsApp or email are retained as long as necessary to handle your enquiry, or
            longer where GST and billing records require it for completed orders. Your "My List" basket lives
            exclusively in your browser's local storage and is never received by us unless you choose to send it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">9. Your rights</h2>
          <p>
            Under the Digital Personal Data Protection Act, 2023, you have the right to ask us to access, correct, or
            delete any personal data you have shared with us via WhatsApp or email. Simply message or call us using
            the contact details provided above.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">10. Changes to this policy</h2>
          <p>If this policy is updated, the revision date at the top of this page will be refreshed.</p>
        </section>

        <p className="text-sm text-gray-400">
          See also our <Link to="/terms" className="text-brand-primary underline underline-offset-4">Terms of Use</Link>.
        </p>
      </div>
    </div>
  );
}
