import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEnquiryList } from '../context/EnquiryListContext';
import { waListLink } from '../lib/utils';
import { CloseIcon, ListIcon, MinusIcon, PlusIcon, TrashIcon, WhatsAppIcon } from './icons';

// Floating enquiry basket: collects "Add to list" items and sends them all in
// one WhatsApp message. Bottom sheet on mobile, anchored card on desktop.
export default function EnquiryBasket() {
  const { items, count, setQty, remove, clear } = useEnquiryList();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const panelRef = useRef(null);

  // Close when the list empties (e.g. last item removed inside the panel).
  useEffect(() => {
    if (count === 0) setOpen(false);
  }, [count]);

  // Escape closes the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (count === 0) return null;

  return (
    <>
      {/* Floating trigger — bottom-left, opposite the WhatsApp bubble */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        initial={reduce ? false : { scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={reduce ? undefined : { scale: 1.05 }}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full bg-brand-primary text-white font-bold pl-4 pr-5 py-3.5 shadow-soft hover:bg-brand-dark transition-colors"
        style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom))', left: 'calc(1.5rem + env(safe-area-inset-left))' }}
        aria-expanded={open}
        aria-controls="enquiry-basket-panel"
        aria-label={`Open enquiry list, ${count} item${count !== 1 ? 's' : ''}`}
      >
        <span className="relative">
          <ListIcon className="w-5 h-5" />
          <span className="absolute -top-2.5 -right-2.5 min-w-[20px] h-5 px-1 rounded-full bg-brand-gold text-gray-900 text-[11px] font-extrabold flex items-center justify-center tabular-nums" aria-hidden="true">
            {count}
          </span>
        </span>
        <span className="text-sm">My List</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {/* Scrim (mobile emphasis, harmless on desktop) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/30 sm:bg-transparent sm:pointer-events-none"
              aria-hidden="true"
            />
            <motion.div
              id="enquiry-basket-panel"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Your enquiry list"
              initial={reduce ? false : { y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { y: 40, opacity: 0 }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
              className="fixed z-50 inset-x-0 bottom-0 sm:inset-x-auto sm:left-6 sm:bottom-24 sm:w-[400px] bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl border border-gray-100 flex flex-col max-h-[75vh] sm:max-h-[70vh]"
              style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
            >
              <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-100">
                <div>
                  <h2 className="font-extrabold text-lg text-gray-800">My Enquiry List</h2>
                  <p className="text-xs text-gray-400 font-medium">
                    {count} item{count !== 1 ? 's' : ''} — sent as one WhatsApp message
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                  aria-label="Close enquiry list"
                >
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>

              <ul className="flex-1 overflow-y-auto px-5 py-2 divide-y divide-gray-50">
                {items.map((item) => (
                  <li key={item.key} className="py-3 flex items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-sm text-gray-800 truncate">{item.name}</p>
                      {item.categoryLabel && (
                        <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">{item.categoryLabel}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 rounded-full border border-gray-200 px-1 py-0.5" role="group" aria-label={`Quantity for ${item.name}`}>
                      <button
                        type="button"
                        onClick={() => setQty(item.key, item.qty - 1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-brand-primary hover:bg-brand-soft transition-colors"
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <MinusIcon className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-extrabold tabular-nums text-gray-800" aria-live="polite">{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => setQty(item.key, item.qty + 1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-brand-primary hover:bg-brand-soft transition-colors"
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <PlusIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(item.key)}
                      className="p-2 rounded-full text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                      aria-label={`Remove ${item.name} from list`}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="px-5 py-4 border-t border-gray-100 flex flex-col gap-2">
                <a
                  href={waListLink(items)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-white font-bold py-3.5 hover:bg-[#1da851] transition-colors"
                >
                  <WhatsAppIcon className="w-5 h-5" /> Send List on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={clear}
                  className="w-full text-center text-xs font-semibold text-gray-400 hover:text-red-500 py-1.5 transition-colors"
                >
                  Clear list
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
