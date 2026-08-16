import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { waLink } from '../lib/utils';
import { useEnquiryList, productKey } from '../context/EnquiryListContext';
import { WhatsAppIcon, PlusIcon, MinusIcon } from './icons';

// Products with no photograph yet — 34 of 117. Real photos are being shot
// in-store, so this is a deliberate neutral stand-in. It replaced ~160 lines
// of hand-built <div> clip-art that tried to draw each product from coloured
// rectangles and read as clip-art on every grid.
function ProductPlaceholder() {
  return (
    <div
      className="w-full h-full rounded-xl flex items-center justify-center bg-gradient-to-br from-brand-soft to-white border border-brand-soft/80"
      aria-hidden="true"
    >
      <svg viewBox="0 0 32 32" className="w-10 h-10 opacity-20">
        <rect width="32" height="32" rx="8" fill="#332E92" />
        <path d="M9 22L20 6l4 3-11 16-5 1z" fill="#CDD661" />
      </svg>
    </div>
  );
}

export default function ProductCard({ product }) {
  const reduce = useReducedMotion();
  const { add, setQty, getQty } = useEnquiryList();
  const key = productKey(product);
  const qty = getQty(key);
  return (
    <motion.div
      layout
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-soft transition-[transform,box-shadow] duration-300 hover:scale-102 hover:-translate-y-1 flex flex-col justify-between"
    >
      <div className="aspect-[4/3] flex items-center justify-center relative overflow-hidden group-hover:bg-brand-soft/5 transition-colors p-4">
        {product.newArrival && (
          <span className="absolute top-2.5 left-2.5 z-10 rounded-full bg-brand-accent text-gray-900 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 shadow-sm">
            New
          </span>
        )}
        {product.inStock === false && (
          <span className="absolute top-2.5 right-2.5 z-10 rounded-full bg-gray-800/80 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1">
            Out of Stock
          </span>
        )}
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            width={1200}
            height={1200}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover rounded-xl shadow-inner"
          />
        ) : (
          <ProductPlaceholder />
        )}
      </div>
      <div className="p-4 sm:p-5 flex flex-col gap-2.5 min-w-0 flex-grow justify-between border-t border-gray-50/50">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-primary/75">{product.categoryLabel}</span>
          <h3 className="font-bold text-gray-800 text-sm sm:text-base leading-snug line-clamp-1 group-hover:text-brand-primary transition-colors">{product.name}</h3>
          {product.brand && (
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">{product.brand}</p>
          )}
          {product.description && (
            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed min-h-[32px]">{product.description}</p>
          )}
        </div>
        <div className="flex flex-col gap-3 mt-1">
          {product.mrp && product.ourPrice ? (
            <span className="inline-flex items-baseline gap-2">
              <span className="text-xs text-gray-400 line-through">₹{Number(product.mrp).toLocaleString('en-IN')}</span>
              <span className="text-base font-extrabold text-brand-primary">₹{Number(product.ourPrice).toLocaleString('en-IN')}</span>
            </span>
          ) : (
            <span className="inline-block w-fit text-xs font-extrabold text-brand-primary bg-brand-soft/50 rounded-full px-3 py-1">{product.price}</span>
          )}
          <div className="flex items-stretch gap-2">
            {qty === 0 ? (
              <button
                type="button"
                onClick={() => add(product)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand-primary text-white font-bold px-3 py-2.5 hover:bg-brand-dark transition-colors duration-300 text-xs sm:text-sm shadow-sm"
                aria-label={`Add ${product.name} to enquiry list`}
              >
                <PlusIcon className="w-3.5 h-3.5 shrink-0" /> <span className="truncate">Add to List</span>
              </button>
            ) : (
              <div
                className="flex-1 flex items-center justify-between rounded-xl border-2 border-brand-primary px-1.5 py-1"
                role="group"
                aria-label={`${product.name} quantity in enquiry list`}
              >
                <button
                  type="button"
                  onClick={() => setQty(key, qty - 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-brand-primary hover:bg-brand-soft transition-colors"
                  aria-label={`Decrease quantity of ${product.name}`}
                >
                  <MinusIcon className="w-3.5 h-3.5" />
                </button>
                <span className="text-sm font-extrabold tabular-nums text-brand-primary" aria-live="polite">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty(key, qty + 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-brand-primary hover:bg-brand-soft transition-colors"
                  aria-label={`Increase quantity of ${product.name}`}
                >
                  <PlusIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            <a
              href={waLink(product.name)}
              target="_blank"
              rel="noreferrer"
              aria-label={`Enquire about ${product.name} on WhatsApp`}
              className="shrink-0 inline-flex items-center justify-center rounded-xl bg-[#25D366] text-white w-11 hover:bg-[#1da851] transition-colors duration-300 shadow-sm"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
