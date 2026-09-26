import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

// Shared "enquiry list" (WhatsApp batch-enquiry basket). Customers add products
// with quantities, then send the whole list as one WhatsApp message.
// Persisted to localStorage so the list survives reloads and return visits.

const STORAGE_KEY = 'sp-enquiry-list';
const EnquiryListContext = createContext(null);

export const productKey = (p) => String(p.id ?? p.name);

function loadStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((i) => i && i.name && i.qty > 0) : [];
  } catch {
    return [];
  }
}

export function EnquiryListProvider({ children }) {
  const [items, setItems] = useState(loadStored);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Private mode / storage full, the list still works for this visit.
    }
  }, [items]);

  const value = useMemo(() => {
    const add = (product) => {
      const key = productKey(product);
      setItems((prev) => {
        const found = prev.find((i) => i.key === key);
        if (found) return prev.map((i) => (i.key === key ? { ...i, qty: Math.min(i.qty + 1, 99) } : i));
        return [...prev, { key, name: product.name, categoryLabel: product.categoryLabel || '', qty: 1 }];
      });
    };
    const setQty = (key, qty) => {
      setItems((prev) =>
        qty < 1 ? prev.filter((i) => i.key !== key) : prev.map((i) => (i.key === key ? { ...i, qty: Math.min(qty, 99) } : i))
      );
    };
    const remove = (key) => setItems((prev) => prev.filter((i) => i.key !== key));
    const clear = () => setItems([]);
    const getQty = (key) => items.find((i) => i.key === key)?.qty ?? 0;
    const count = items.reduce((n, i) => n + i.qty, 0);
    return { items, add, setQty, remove, clear, getQty, count };
  }, [items]);

  return <EnquiryListContext.Provider value={value}>{children}</EnquiryListContext.Provider>;
}

export function useEnquiryList() {
  const ctx = useContext(EnquiryListContext);
  if (!ctx) throw new Error('useEnquiryList must be used inside EnquiryListProvider');
  return ctx;
}
