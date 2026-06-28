import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { STORE } from '../lib/utils';
import { StarIcon } from './icons';

const reviews = [
  { name: 'Anisha P.', stars: 5, text: 'This place is a hidden treasure in the city. One shop for all the stationery and craft items… customer service is appreciable. They gave much discount to the things I bought… step from Sahodaran Ayyappan road…' },
  { name: 'Vivek D.', stars: 5, text: 'Quality and variety made available at very affordable prices &amp; friendly staff.' },
  { name: 'Jelitta Johny', stars: 5, text: 'Wonderful experience and quality products at reasonable price 💗' },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const r = reviews[i];

  useEffect(() => {
    if (reduce) return; // Respect reduced motion settings
    const timer = setInterval(() => {
      setI((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [i, reduce]);

  return (
    <section className="bg-brand-lavender py-16" aria-roledescription="carousel" aria-label="Customer reviews">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <p className="text-sm font-medium text-brand-purple/60 mb-2">Verified Google Reviews</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Loved by {STORE.reviewCount} customers</h2>
        <div className="mt-2 flex items-center gap-1 text-brand-gold">
          {Array.from({ length: 5 }).map((_, k) => (<StarIcon key={k} className="w-5 h-5" />))}
          <span className="ml-2 text-gray-600 font-semibold tabular-nums">{STORE.rating} / 5</span>
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow-soft p-8 min-h-[180px]" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={reduce ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex gap-1 text-brand-gold mb-3" aria-label={`${r.stars} out of 5 stars`}>
                {Array.from({ length: r.stars }).map((_, k) => (<StarIcon key={k} className="w-4 h-4" />))}
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">“{r.text}”</p>
              <p className="mt-4 font-bold text-brand-purple">— {r.name}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex gap-2" role="tablist" aria-label="Select a review">
          {reviews.map((rev, k) => (
            <button
              key={rev.name}
              type="button"
              role="tab"
              aria-selected={k === i}
              onClick={() => setI(k)}
              className={`h-2.5 rounded-full transition-[width,background-color] ${k === i ? 'w-8 bg-brand-purple' : 'w-2.5 bg-brand-purple/30'}`}
              aria-label={`Show review ${k + 1} of ${reviews.length} by ${rev.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
