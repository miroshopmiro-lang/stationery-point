import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEnquiryList } from '../context/EnquiryListContext';
import { waLink, waListLink } from '../lib/utils';
import { CloseIcon, ListIcon, WhatsAppIcon } from './icons';

// The hero's "Send a list" used to fire a bare WhatsApp intent, which put the
// work back on the customer: they had to type the whole list themselves into a
// chat. This intercepts that tap and asks them to BUILD the list first, so the
// message that eventually goes out is itemised.
//
// Two routes in: browse the catalogue and tap "Add to list", or let the AI
// assistant assemble it. The assistant does not exist yet — its card is shown
// disabled so the path is visible and we can measure intent to tap it. Wire it
// up by replacing the button with the real launcher; nothing else changes.

const AI_ASSISTANT_READY = false;

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

  // Escape closes; focus moves into the panel so the keyboard lands somewhere.
  useEffect(() => {
    if (!open) return;
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
                <h2 id="send-list-title" className="text-xl sm:text-2xl font-extrabold text-gray-800 tracking-tight">
                  Make your list first
                </h2>
                <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
                  Add what you need, then it reaches us as one WhatsApp message with every item on
                  it — and we quote the whole thing back.
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
              {/* Already has a list — skip the pitch, let them send it. */}
              {count > 0 && (
                <a
                  href={waListLink(items)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-2xl bg-[#25D366] text-white px-4 py-4 font-bold hover:bg-[#1da851] transition-colors"
                >
                  <WhatsAppIcon className="w-5 h-5 shrink-0" />
                  <span className="text-sm text-left">
                    Send my list now
                    <span className="block text-xs font-semibold text-white/80 mt-0.5">
                      {count} item{count !== 1 ? 's' : ''} ready
                    </span>
                  </span>
                </a>
              )}

              <Link
                to="/catalog"
                onClick={onClose}
                className="flex items-center gap-4 rounded-2xl border-2 border-brand-primary bg-brand-soft/40 px-4 py-4 text-left hover:bg-brand-soft transition-colors group"
              >
                <span className="w-11 h-11 rounded-xl bg-brand-primary text-white flex items-center justify-center shrink-0">
                  <ListIcon className="w-5 h-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-extrabold text-gray-800 text-sm">
                    {count > 0 ? 'Add more from the catalogue' : 'Build it from the catalogue'}
                  </span>
                  <span className="block text-xs text-gray-500 font-medium mt-0.5 leading-relaxed">
                    Tap “Add to list” on anything you need. Set quantities as you go.
                  </span>
                </span>
              </Link>

              <button
                type="button"
                disabled={!AI_ASSISTANT_READY}
                className="flex items-center gap-4 rounded-2xl border-2 border-gray-200 px-4 py-4 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-70 enabled:hover:border-brand-primary enabled:hover:bg-brand-soft/40"
              >
                <span className="w-11 h-11 rounded-xl bg-brand-gold text-gray-900 flex items-center justify-center shrink-0">
                  <SparkleIcon className="w-5 h-5" />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-2 font-extrabold text-gray-800 text-sm">
                    Let the assistant build it
                    {!AI_ASSISTANT_READY && (
                      <span className="text-[10px] font-bold uppercase tracking-wide bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                        Coming soon
                      </span>
                    )}
                  </span>
                  <span className="block text-xs text-gray-500 font-medium mt-0.5 leading-relaxed">
                    Describe what you need — a school list, an office refill — and it finds the
                    items for you.
                  </span>
                </span>
              </button>
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
