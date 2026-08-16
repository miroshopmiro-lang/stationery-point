import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    path.join(__dirname, 'index.html'),
    path.join(__dirname, 'src/**/*.{js,ts,jsx,tsx}'),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', '"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      colors: {
        // Sampled directly from the real signboard (asset-originals/gallery_1.jpg) —
        // deep indigo board, chartreuse wordmark/icon. Do not adjust without re-sampling.
        'brand-primary': '#332E92',
        'brand-dark': '#241F6B',
        'brand-soft': '#EEF0FB',
        'brand-accent': '#CDD661',
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(51, 46, 146, 0.18)',
      },
      scale: {
        102: '1.02',
      },
    },
  },
  plugins: [],
};
