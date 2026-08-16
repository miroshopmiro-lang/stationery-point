import React from 'react';
import { motion } from 'framer-motion';
import { STORE } from '../lib/utils';
import { StarIcon } from './icons';

// Alt text describes what is actually in each photograph — four of these
// previously described a different image entirely (gallery_5 is the Parker
// counter, not "school supplies and geometry gear").
const gallery = [
  { src: '/storefront.jpg', alt: 'The Stationery Point shopfront on Junior Janatha Road, Vyttila' },
  { src: '/gallery_1.webp', alt: 'The Stationery Point signboard above the open shopfront' },
  { src: '/gallery_2.webp', alt: 'Shelves of files, binder clips, staplers and paper inside the shop' },
  { src: '/gallery_3.webp', alt: 'A wall display of batteries, scissors, craft thread and embroidery hoops' },
  { src: '/gallery_4.webp', alt: 'Pens, calculators, geometry sets and childrens art kits on a display board' },
  { src: '/gallery_5.webp', alt: 'The premium pen counter, with fountain pens and rollerballs laid out' },
];

const hours = [
  { day: 'Monday – Saturday', time: '9:30 AM – 8:00 PM', open: true },
  { day: 'Sunday', time: 'Closed', open: false },
];

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <p className="text-sm font-medium text-gray-400 mb-2">About Stationery Point</p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Your one-stop stationery shop in <span className="text-gradient">Vyttila, Kochi</span></h1>
          <p className="mt-6 text-gray-600 leading-relaxed">
            Welcome to Stationery Point, your ultimate one-stop shop in Kochi for all your writing supplies, craft items, school and office stationery, party products, and corporate gifts. We are proud to offer a massive variety of high-quality products at prices below MRP! Whether you are a student, an artist, or sourcing supplies for your office, Sam and the team are here to help you find exactly what you need — and if we don't have it on the shelf, we can usually source it within a day or two.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-soft text-brand-primary font-semibold px-4 py-2">
            <StarIcon className="w-4 h-4 text-brand-accent" /> {STORE.rating} / 5 · {STORE.reviewCount} verified reviews
          </div>
        </motion.div>

        <div className="grid grid-cols-3 gap-3">
          {gallery.map((g, i) => (
            <motion.img key={g.src} src={g.src} alt={g.alt} width={800} height={800} loading="lazy" decoding="async" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.07 }} className="rounded-2xl aspect-square object-cover shadow-soft" />
          ))}
        </div>
      </div>

      <div className="mt-16 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white border border-gray-100 shadow-soft p-8">
          <h2 className="text-2xl font-bold mb-4">Store Hours</h2>
          <ul className="space-y-3">
            {hours.map((h) => (
              <li key={h.day} className="flex items-center justify-between border-b border-gray-50 pb-3 last:border-0">
                <span className="font-semibold text-gray-700">{h.day}</span>
                <span className={h.open ? 'text-green-600 font-semibold tabular-nums' : 'text-red-500 font-semibold'}>{h.time}</span>
              </li>
            ))}
          </ul>
          {/* Both confirmed by repeat customers in Google reviews — parking
              by name six times over, the rewards scheme by the owner's own
              reply thanking a customer for redeeming points. Kept deliberately
              generic: no points-per-rupee ratio or redemption threshold is
              confirmed, so none is claimed here. */}
          <ul className="mt-5 space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <span className="text-brand-primary" aria-hidden="true">✓</span> Parking available outside the store
            </li>
            <li className="flex items-center gap-2">
              <span className="text-brand-primary" aria-hidden="true">✓</span> Ask in-store about our rewards points
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-brand-primary text-white shadow-soft p-8">
          <h2 className="text-2xl font-bold mb-4">Below-MRP Wholesale</h2>
          <p className="text-white/80 leading-relaxed">
            From bulk school kits to office and studio supplies, we offer quality products at the best wholesale rates in Kochi. Visit us at Katti Tower, Vyttila, or message us for a custom quote.
          </p>
          <p className="mt-5 text-white/90 text-sm">{STORE.address}</p>
          <p className="text-brand-accent text-sm font-semibold mt-1">{STORE.landmark}</p>
        </div>
      </div>
    </div>
  );
}
