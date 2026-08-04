/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Outfit"', 'sans-serif'],
      },
      colors: {
        // Deep indigo-blue sampled from the shop's real signboard
        // (public/gallery_1.jpg, sun-corrected). Confirm with client on call.
        'brand-primary': '#332E92',
        'brand-dark': '#241F6B',
        'brand-soft': '#EEF0FB',
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
