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
        // Deep indigo-blue sampled from the shop's real signboard
        // (public/gallery_1.jpg, sun-corrected). Confirm with client on call.
        'brand-primary': '#0F2042',
        'brand-dark': '#071228',
        'brand-soft': '#EDF2F9',
        'brand-gold': '#FFB000',
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
