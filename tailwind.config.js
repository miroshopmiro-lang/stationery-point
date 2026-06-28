/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Outfit"', 'sans-serif'],
      },
      colors: {
        'brand-purple': '#5D2D8F',
        'brand-lavender': '#F5EEFC',
        'brand-gold': '#FFB000',
        'pastel-lavender': '#F3E8FF',
        'pastel-mint': '#E8F5E9',
        'pastel-peach': '#FFF3E0',
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(93, 45, 143, 0.18)',
      },
      scale: {
        102: '1.02',
      },
    },
  },
  plugins: [],
};
