import React, { useEffect, useRef, useState } from 'react';
import { STORE, WEB3FORMS_KEY } from '../lib/utils';
import { PhoneIcon, WhatsAppIcon, InstagramIcon } from './icons';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '', botcheck: false });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  // Visible result of the email send: '', 'sending', 'sent', 'failed'.
  const [mail, setMail] = useState('');
  const [dirty, setDirty] = useState(false);
  const refs = { name: useRef(null), phone: useRef(null), email: useRef(null), message: useRef(null) };

  const update = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setDirty(true);
    if (mail === 'sent' || mail === 'failed') setMail('');
  };

  // Warn before leaving with unsaved changes.
  useEffect(() => {
    const handler = (e) => {
      if (!dirty) return;
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [dirty]);

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Enter your name so we know who to reply to.';
    if (!form.phone.trim()) next.phone = 'Enter a phone number we can reach you on.';
    if (form.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) next.email = 'Enter a valid email address, e.g. name@example.com.';
    if (!form.message.trim()) next.message = 'Tell us what you need so we can help.';
    return next;
  };

  const focusFirstError = (errs) => {
    const first = ['name', 'phone', 'email', 'message'].find((k) => errs[k]);
    if (first && refs[first].current) refs[first].current.focus();
  };

  const checkForm = () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) {
      setStatus('Please fix the highlighted fields.');
      focusFirstError(errs);
      return false;
    }
    return true;
  };

  const sendWhatsApp = (e) => {
    e.preventDefault();
    if (!checkForm()) return;
    const msg = `Hi Stationery Point, my name is ${form.name}.\nPhone: ${form.phone}\nEmail: ${form.email || 'N/A'}\n\n${form.message}`;
    setStatus('Opening WhatsApp…');
    setDirty(false);
    window.open(`https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  };

  // Sends the enquiry straight to the shop's inbox (Web3Forms), no email app needed.
  const sendEmail = async () => {
    if (!checkForm() || mail === 'sending') return;
    setMail('sending');
    setStatus('Sending your enquiry…');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Website enquiry from ${form.name}`,
          from_name: 'Stationery Point website',
          name: form.name,
          phone: form.phone,
          email: form.email || undefined,
          message: form.message,
          botcheck: form.botcheck,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setMail('sent');
      setStatus('Enquiry sent. We will get back to you soon.');
      setDirty(false);
      setForm({ name: '', phone: '', email: '', message: '', botcheck: false });
    } catch {
      setMail('failed');
      setStatus('Could not send the email. Please try WhatsApp or call us.');
    }
  };

  const fieldClass = (k) =>
    `w-full min-w-0 rounded-xl border px-4 py-3 transition-colors focus:border-brand-primary ${errors[k] ? 'border-red-400' : 'border-gray-200'}`;

  const [weekdays, sunday] = STORE.hours.split(' | ');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-12 sm:py-12">
      <div className="mb-6 sm:mb-8">
        <p className="text-sm font-medium text-gray-400 mb-2">We would love to hear from you</p>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Contact Store</h1>
      </div>

      {/* Quick actions: most customers just want to message or call. */}
      <div className="grid grid-cols-2 gap-3 mb-6 sm:mb-8 lg:max-w-md">
        <a href={`https://wa.me/${STORE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-white font-semibold py-3 hover:bg-[#1da851] transition-colors">
          <WhatsAppIcon className="w-5 h-5" /> WhatsApp
        </a>
        <a href={`tel:${STORE.phoneTel}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-primary text-brand-primary font-semibold py-3 hover:bg-brand-primary hover:text-white transition-colors duration-300">
          <PhoneIcon className="w-4 h-4" /> Call
        </a>
      </div>

      {/* grid-cols-1 (minmax(0,1fr)) + min-w-0 keep the cards inside the screen when
          the phone's text size is set large; auto columns let them grow past it. */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Form first on phones, right column on desktop */}
        <form onSubmit={sendWhatsApp} noValidate className="min-w-0 lg:order-2 rounded-2xl bg-white border border-gray-100 shadow-soft p-5 sm:p-8 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Send an Enquiry</h2>

          <div className="flex flex-col gap-1">
            <label htmlFor="c-name" className="text-sm font-semibold text-gray-700">Name</label>
            <input id="c-name" ref={refs.name} name="name" type="text" autoComplete="name" required value={form.name} onChange={update('name')} placeholder="Your full name…" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'err-name' : undefined} className={fieldClass('name')} />
            {errors.name && <p id="err-name" className="text-xs text-red-500">{errors.name}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="c-phone" className="text-sm font-semibold text-gray-700">Phone Number</label>
            <input id="c-phone" ref={refs.phone} name="tel" type="tel" inputMode="tel" autoComplete="tel" spellCheck={false} required value={form.phone} onChange={update('phone')} placeholder="Your phone number…" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'err-phone' : undefined} className={fieldClass('phone')} />
            {errors.phone && <p id="err-phone" className="text-xs text-red-500">{errors.phone}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="c-email" className="text-sm font-semibold text-gray-700">Email <span className="font-normal text-gray-400">(optional)</span></label>
            <input id="c-email" ref={refs.email} name="email" type="email" inputMode="email" autoComplete="email" spellCheck={false} value={form.email} onChange={update('email')} placeholder="e.g. name@example.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'err-email' : undefined} className={fieldClass('email')} />
            {errors.email && <p id="err-email" className="text-xs text-red-500">{errors.email}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="c-message" className="text-sm font-semibold text-gray-700">Message</label>
            <textarea id="c-message" ref={refs.message} name="message" required value={form.message} onChange={update('message')} placeholder="Let us know what you are looking for…" rows={4} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'err-message' : undefined} className={`${fieldClass('message')} resize-none`} />
            {errors.message && <p id="err-message" className="text-xs text-red-500">{errors.message}</p>}
          </div>

          {/* Spam trap: hidden from people, bots tick it. */}
          <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" checked={form.botcheck} onChange={(e) => setForm((f) => ({ ...f, botcheck: e.target.checked }))} />

          <p className="sr-only" role="status" aria-live="polite">{status}</p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button type="submit" className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-white font-semibold py-3 hover:bg-[#1da851] transition-colors">
              <WhatsAppIcon className="w-5 h-5" /> Send on WhatsApp
            </button>
            {WEB3FORMS_KEY && (
              <button type="button" onClick={sendEmail} disabled={mail === 'sending'} className="flex-1 rounded-xl border border-brand-primary text-brand-primary font-semibold py-3 hover:bg-brand-primary hover:text-white transition-colors duration-300 disabled:opacity-60">
                {mail === 'sending' ? 'Sending…' : 'Send by Email'}
              </button>
            )}
          </div>

          {mail === 'sent' && <p className="text-sm font-medium text-green-700">Thanks, your enquiry has been sent. We will get back to you soon.</p>}
          {mail === 'failed' && <p className="text-sm font-medium text-red-600">Could not send the email. Please try WhatsApp or call us.</p>}
        </form>

        {/* Visit us */}
        <div className="min-w-0 lg:order-1 rounded-2xl bg-white border border-gray-100 shadow-soft overflow-hidden">
          <iframe title="Stationery Point location on Google Maps" src={STORE.mapsEmbed} className="block w-full h-48 sm:h-64 border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <div className="p-5 sm:p-8">
            <h2 className="text-2xl font-bold">Visit Us</h2>
            <p className="mt-3 text-gray-600">{STORE.address}</p>
            <p className="text-brand-primary font-semibold mt-1">{STORE.landmark}</p>
            <p className="mt-4 text-gray-500 text-sm">{weekdays}</p>
            {sunday && <p className="text-gray-500 text-sm">{sunday}</p>}
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={STORE.mapsLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-brand-primary text-brand-primary font-semibold px-5 py-2.5 hover:bg-brand-primary hover:text-white transition-colors duration-300">
                Get directions
              </a>
              <a href={STORE.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-gray-200 font-semibold px-5 py-2.5 hover:border-brand-primary transition-colors">
                <InstagramIcon className="w-4 h-4" /> Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
