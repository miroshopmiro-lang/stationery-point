import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { waLink } from '../lib/utils';
import { WhatsAppIcon } from './icons';

export default function FloatingWhatsApp() {
  const reduce = useReducedMotion();
  return (
    <motion.a
      href={waLink()}
      target="_blank"
      rel="noreferrer"
      initial={reduce ? false : { scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.6, type: 'spring' }}
      whileHover={reduce ? undefined : { scale: 1.08 }}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-soft"
      style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom))', right: 'calc(1.5rem + env(safe-area-inset-right))' }}
      aria-label="Enquire on WhatsApp"
    >
      <WhatsAppIcon className="w-7 h-7" />
    </motion.a>
  );
}
