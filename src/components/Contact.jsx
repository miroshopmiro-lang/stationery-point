import React, { useEffect, useRef, useState } from 'react';
import { STORE } from '../lib/utils';
import { PhoneIcon, WhatsAppIcon, InstagramIcon } from './icons';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [dirty, setDirty] = useState(false);
  const refs = { name: useRef(null), phone: useRef(null), email: useRef(null), message: useRef(null) };

  const update = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setDirty(true);
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

  const sendWhatsApp = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) {
      setStatus('Please fix the highlighted fields.');
      focusFirstError(errs);
      return;
    }
    const msg = `Hi Stationery Point, my name is ${form.name}.\nPhone: ${form.phone}\nEmail: ${form.email || 'N/A'}\n\n${form.message}`;
    setStatus('Opening WhatsApp…');
    setDirty(false);
    window.open(`https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  };

  const sendEmail = () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) {
      setStatus('Please fix the highlighted fields.');
      focusFirstError(errs);
      return;
    }
    const subject = encodeURIComponent('Enquiry from website');
    const body = encodeURIComponent(`Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\n\n${form.message}`);
    setStatus('Opening your email app…');
    setDirty(false);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const fieldClass = (k) =>
    `rounded-xl border px-4 py-3 transition-colors focus:border-brand-purple ${errors[k] ? 'border-red-400' : 'border-gray-200'}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <p className="text-sm font-medium text-gray-400 mb-2">We would love to hear from you</p>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Contact Store</h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* LEFT - location */}
        <div className="rounded-2xl bg-white border border-gray-100 shadow-soft overflow-hidden">
          <iframe title="Stationery Point location on Google Maps" src={STORE.mapsEmbed} width="600" height="256" className="w-full h-64 border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <div className="p-8">
            <h2 className="text-2xl font-bold">Visit Us</h2>
            <p className="mt-3 text-gray-600">{STORE.address}</p>
            <p className="text-brand-purple font-semibold mt-1">{STORE.landmark}</p>
            <p className="mt-4 text-gray-500 text-sm">{STORE.hours}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`tel:${STORE.phoneTel}`} className="inline-flex items-center gap-2 rounded-full border border-brand-purple text-brand-purple font-semibold px-5 py-2.5 hover:bg-brand-purple hover:text-white transition-colors duration-300">
                <PhoneIcon className="w-4 h-4" /> {STORE.phoneDisplay}
              </a>
              <a href={STORE.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-gray-200 font-semibold px-5 py-2.5 hover:border-brand-purple transition-colors">
                <InstagramIcon className="w-4 h-4" /> Instagram
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT - form */}
        <form onSubmit={sendWhatsApp} noValidate className="rounded-2xl bg-white border border-gray-100 shadow-soft p-8 flex flex-col gap-4">
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

          <p className="sr-only" role="status" aria-live="polite">{status}</p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button type="submit" className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-white font-semibold py-3 hover:bg-[#1da851] transition-colors">
              <WhatsAppIcon className="w-5 h-5" /> Send on WhatsApp
            </button>
            <button type="button" onClick={sendEmail} className="flex-1 rounded-xl border border-brand-purple text-brand-purple font-semibold py-3 hover:bg-brand-purple hover:text-white transition-colors duration-300">
              Send via Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
