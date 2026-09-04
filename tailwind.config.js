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
      // Single family, copied from hobbycraft.co.uk (measured live: "Poppins Font"
      // across the entire site). No serif key — none of the four references uses a
      // serif; the old Playfair Display pair came from nooe.co, a rejected reference.
      fontFamily: {
        sans: ['Poppins', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        // Sampled directly from the real signboard (asset-originals/gallery_1.jpg) —
        // deep indigo board, chartreuse wordmark/icon. Do not adjust without re-sampling.
        'brand-primary': '#332E92',
        'brand-dark': '#241F6B',
        'brand-soft': '#EEF0FB',
        'brand-accent': '#CDD661',
        // Derived indigo-biased neutrals. Replaces the pure greys the references use
        // (hobbycraft #F2F2F2, blick #EAEAEA) so section bands carry the brand hue.
        // Product/tile media bed. Measured off smiggle.co.uk and required by AUDIT-01
        // Defect 8: an #EEF0FB (blue) bed fights blue school products, and every reference
        // beds product photography on ONE neutral grey. It is baked into the pack-shot
        // pipeline output too (tools/product-shots/pack-shots.mjs), so tiles must use this
        // token or they render two-tone against their own photos.
        'bed': '#E0DED9',
        'ink': '#16142B',
        'muted': '#5B5878',
        'hairline': '#DEDFF0',
      },
      // Copied from hobbycraft.co.uk product tile: 0 0 8px rgba(0,0,0,.1)
      boxShadow: {
        card: '0 0 8px rgba(0, 0, 0, 0.1)',
        soft: '0 10px 40px -12px rgba(51, 46, 146, 0.18)',
      },
      // Motion tokens copied wholesale from hobbycraft.co.uk (the only reference whose
      // transitions I measured): 0.2s for text-level, 0.4s for surface-level, one curve.
      // Paint properties only — they transition zero transforms, deliberately.
      transitionTimingFunction: {
        ref: 'cubic-bezier(0.3, 0.46, 0.45, 0.94)',
      },
      transitionDuration: {
        text: '200ms',
        surface: '400ms',
      },
      scale: {
        102: '1.02',
      },
    },
  },
  plugins: [],
};
