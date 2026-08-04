import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Respect the user's reduced-motion preference for JS-driven animations (GSAP).
export function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export const STORE = {
  name: 'Stationery Point',
  phoneDisplay: '+91 88488 38132',
  phoneTel: '+918848838132',
  whatsapp: '918848838132',
  instagram: 'https://www.instagram.com/stationerypoint._',
  address:
    'Ground Floor, Katti Tower, Jr Janatha Rd, Janatha Junction, Vyttila, Kochi, Ernakulam, Kerala 682019',
  landmark: 'Opposite Metro Pillar No. 837',
  hours: 'Monday – Saturday: 9:30 AM – 8:00 PM | Sunday: Closed',
  rating: '4.8',
  reviewCount: '147+',
  // Query the business by name so the embed shows the Stationery Point
  // listing (name, rating, photos) instead of pinning the Katti Tower building.
  mapsEmbed:
    'https://www.google.com/maps?q=Stationery+Point+Katti+Tower+Vyttila+Kochi&output=embed',
  mapsLink: 'https://maps.google.com/?q=Stationery+Point+Katti+Tower+Vyttila+Kochi',
};

// One WhatsApp message for a whole enquiry list: [{ name, qty }, ...]
export function waListLink(items) {
  const lines = items.map((i, idx) => `${idx + 1}. ${i.name} — Qty: ${i.qty}`);
  const msg = `Hi Stationery Point, I would like to enquire about these items:\n\n${lines.join('\n')}\n\nPlease share prices and availability.`;
  return `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(msg)}`;
}

export function waLink(productName) {
  const base = `https://wa.me/${STORE.whatsapp}?text=`;
  if (!productName) {
    return `${base}${encodeURIComponent('Hi Stationery Point, I would like to make an enquiry from your website.')}`;
  }
  const msg = `Hi Stationery Point, I am interested in inquiring about the ${productName} from your website.`;
  return `${base}${encodeURIComponent(msg)}`;
}
