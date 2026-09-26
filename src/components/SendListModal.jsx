import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEnquiryList } from '../context/EnquiryListContext';
import { waLink, waListLink } from '../lib/utils';
import { CloseIcon, ListIcon, WhatsAppIcon } from './icons';
import AskBox from './AskBox';

// The hero's "Send a list" used to fire a bare WhatsApp intent, which put the
// work back on the customer: they had to type the whole list themselves into a
// chat. This intercepts that tap and asks them to BUILD the list first, so the
// message that eventually goes out is itemised.
//
// Three routes in: browse the catalogue and tap "Add to list", paste/type a
// list directly (AskBox in list mode, matches each line against known
// categories and always produces a working WhatsApp message, matched or
// not), or attach a photo/PDF straight in WhatsApp.

function SparkleIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l1.9 5.6L19.5 9.5 13.9 11.4 12 17l-1.9-5.6L4.5 9.5l5.6-1.9L12 2z" />
      <path d="M18.5 14l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9.9-2.6z" opacity="0.6" />
    </svg>
  );
}

export default function SendListModal({ open, onClose }) {
  const { items, count } = useEnquiryList();
  const reduce = useReducedMotion();
  const panelRef = useRef(null);
  const [listBuilderOpen, setListBuilderOpen] = useState(false);

  // Escape closes; focus moves into the panel so the keyboard lands somewhere.
  useEffect(() => {
    if (!open) return;
    setListBuilderOpen(false);
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    panelRef.current?.focus();
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="send-list-title"
            tabIndex={-1}
            ref={panelRef}
            initial={reduce ? false : { y: 32, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { y: 24, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="fixed z-[60] inset-x-0 bottom-0 sm:inset-0 sm:m-auto sm:h-fit sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-gray-100 outline-none max-h-[90vh] overflow-y-auto"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-1">
              <div>
                <h2 id="send-list-title" className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                  {count > 0 ? 'Your Enquiry List' : 'Create Your Supply List First'}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1.5 leading-relaxed">
                  {count > 0
                    ? 'Review your items and send them to us on WhatsApp for an instant price quote.'
                    : 'Your enquiry list is currently empty! Add items from our catalog or message us directly on WhatsApp.'}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 -mr-2 -mt-1 rounded-full hover:bg-gray-100 text-gray-400 transition-colors shrink-0"
                aria-label="Close"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-5 flex flex-col gap-3">
              {/* Already has a list, skip the pitch, let them send it. */}
              {count > 0 && (
                <a
                  href={waListLink(items)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-xl bg-[#25D366] text-white px-4 py-3.5 font-bold hover:bg-[#1da851] transition-colors shadow-xs"
                >
                  <WhatsAppIcon className="w-5 h-5 shrink-0" />
                  <span className="text-sm text-left">
                    Send My List on WhatsApp Now
                    <span className="block text-xs font-semibold text-white/85 mt-0.5">
                      {count} item{count !== 1 ? 's' : ''} ready for quote
                    </span>
                  </span>
                </a>
              )}

              <Link
                to="/catalog"
                onClick={onClose}
                className="flex items-center gap-4 rounded-xl border-2 border-brand-primary bg-brand-soft/40 px-4 py-3.5 text-left hover:bg-brand-soft transition-colors group"
              >
                <span className="w-10 h-10 rounded-lg bg-brand-primary text-white flex items-center justify-center shrink-0">
                  <ListIcon className="w-5 h-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-bold text-gray-900 text-xs sm:text-sm">
                    {count > 0 ? 'Add more from the Shop Catalog' : 'Browse Catalog & Select Products'}
                  </span>
                  <span className="block text-xs text-gray-500 font-normal mt-0.5 leading-relaxed">
                    Select products &amp; quantities directly from our catalog to build your list.
                  </span>
                </span>
              </Link>

              {!listBuilderOpen ? (
                <button
                  type="button"
                  onClick={() => setListBuilderOpen(true)}
                  className="flex items-center gap-4 rounded-xl border border-gray-200 px-4 py-3.5 text-left transition-colors hover:border-brand-primary hover:bg-brand-soft/40"
                >
                  <span className="w-10 h-10 rounded-lg bg-brand-accent text-gray-900 flex items-center justify-center shrink-0">
                    <SparkleIcon className="w-5 h-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-2 font-bold text-gray-900 text-xs sm:text-sm">
                      Paste or type your list
                    </span>
                    <span className="block text-xs text-gray-500 font-normal mt-0.5 leading-relaxed">
                      School supply list, office refills, art kit: paste it in and we'll match it against what we stock.
                    </span>
                  </span>
                </button>
              ) : (
                <div className="rounded-xl border border-brand-primary/30 bg-brand-dark px-4 py-4">
                  {/* Same fix as SendListSection.jsx: variant="header" silently skips list
                      mode entirely, so this never showed the paste-list textarea. */}
                  <AskBox defaultMode="list" />
                </div>
              )}
            </div>

            <div className="px-6 pb-6 -mt-1">
              <a
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                onClick={onClose}
                className="block text-center text-xs font-semibold text-gray-400 hover:text-brand-primary py-1.5 transition-colors"
              >
                Or just message us on WhatsApp →
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
