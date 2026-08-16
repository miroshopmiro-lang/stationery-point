import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { STORE } from '../lib/utils';
import { categories, products } from '../data/productData';
import CategoryCard from './CategoryCard';
import AdvantageCards from './AdvantageCards';
import Testimonials from './Testimonials';
import SendListModal from './SendListModal';
import AskBox from './AskBox';
import { StarIcon } from './icons';

// One merged "popular" grid. Previously three near-identical 9-item grids
// (Academic / Office / Art) ran back to back — 2,084px of the page repeating
// the same idea and ending in three identical "View More Products" buttons.
const popular = [
  { name: 'School Kits', to: '/catalog?q=kit', image: '/icons/item-school-kits.webp' },
  { name: 'Notebooks', to: '/catalog?category=stationery', image: '/icons/item-notebooks.webp' },
  { name: 'Gel & Ball Pens', to: '/catalog?category=stationery', image: '/icons/item-pens.webp' },
  { name: 'Geometry Boxes', to: '/catalog?q=geometry', image: '/icons/item-geometry-boxes.webp' },
  { name: 'Color Pencils', to: '/catalog?category=art-supplies', image: '/icons/item-colour-pencils.webp' },
  { name: 'Calculators', to: '/catalog?category=office-supplies', image: '/icons/item-calculators.webp' },
  { name: 'Lever Arch Files', to: '/catalog?q=file', image: '/icons/item-lever-arch-files.webp' },
  { name: 'Artist Canvases', to: '/catalog?category=art-supplies', image: '/icons/item-artist-canvases.webp' },
  { name: 'Sticky Notes', to: '/catalog?category=stationery', image: '/icons/item-sticky-notes.webp' },
];

const squareColors = ['bg-[#FFF3B3]', 'bg-[#D2ECF9]', 'bg-[#E1EFE1]'];

// TEMPORARY: hand-built CSS art, standing in until the real icon set lands.
// Trimmed from 27 cases to the 9 the merged grid actually uses. Replace the
// whole function with <img src="/icons/item-{slug}.webp" /> once the assets
// exist — see the asset list in the homepage audit.
function renderIcon(name) {
  switch (name) {
    case 'School Kits':
      return (
        <div className="w-11 h-11 bg-red-400 rounded-lg shadow-md border border-red-500 p-1 flex flex-col justify-between relative">
          <div className="w-full h-1 bg-white/40 rounded-sm" />
          <div className="w-4 h-6 bg-white/70 border border-gray-300 rounded-sm p-0.5 flex flex-col gap-0.5">
            <div className="w-full h-0.5 bg-gray-400" />
            <div className="w-2/3 h-0.5 bg-gray-400" />
          </div>
          <div className="absolute right-2 bottom-1 w-1.5 h-7 bg-amber-400 rounded-sm rotate-[12deg]" />
        </div>
      );
    case 'Notebooks':
      return (
        <div className="w-10 h-13 bg-white rounded-md shadow-md border border-gray-200 flex flex-col overflow-hidden">
          <div className="w-full h-3.5 bg-brand-primary flex items-center justify-center text-[5px] text-white font-bold leading-none">
            NOTEBOOK
          </div>
          <div className="flex-grow flex flex-col gap-1 p-1">
            <div className="w-full h-[1px] bg-red-200" />
            <div className="w-full h-[1px] bg-gray-100" />
            <div className="w-full h-[1px] bg-gray-100" />
            <div className="w-full h-[1px] bg-gray-100" />
          </div>
        </div>
      );
    case 'Gel & Ball Pens':
      return (
        <div className="flex gap-1.5 items-end justify-center w-full h-full pb-2">
          <div className="w-2 h-11 bg-blue-500 rounded-full shadow-sm relative">
            <div className="absolute top-1.5 left-0.5 right-0.5 h-4 bg-blue-600 rounded-full" />
            <div className="absolute top-1 right-[-1px] w-0.5 h-6 bg-blue-700 rounded-sm" />
          </div>
          <div className="w-2 h-13 bg-gray-800 rounded-full shadow-md relative">
            <div className="absolute top-1.5 left-0.5 right-0.5 h-4 bg-gray-700 rounded-full" />
            <div className="absolute top-1 right-[-1px] w-0.5 h-6 bg-gray-900 rounded-sm" />
          </div>
        </div>
      );
    case 'Geometry Boxes':
      return (
        <div className="w-11 h-11 bg-slate-100 rounded-lg shadow-md border border-slate-300 p-1 flex flex-col justify-between">
          <div className="w-full h-1 bg-slate-300 rounded-sm" />
          <div className="flex justify-around items-end">
            <div className="w-0.5 h-6 bg-gray-600 rounded-sm" />
            <div className="w-3 h-3 border-l border-b border-gray-500 rotate-[45deg]" />
          </div>
        </div>
      );
    case 'Color Pencils':
      return (
        <div className="flex gap-1 items-end justify-center w-full h-full pb-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-11 relative flex flex-col justify-between items-center rounded-t-sm shadow-sm"
              style={{ transform: `rotate(${(i - 1) * 8}deg)`, backgroundColor: ['#EF4444', '#3B82F6', '#10B981'][i] }}
            >
              <div className="w-full h-1 bg-white/30 rounded-t-sm" />
            </div>
          ))}
        </div>
      );
    case 'Calculators':
      return (
        <div className="w-9 h-11 bg-white rounded-md shadow-md border border-gray-200 flex flex-col p-0.5 gap-0.5">
          <div className="w-full h-2.5 bg-gray-800 rounded-sm border border-gray-900" />
          <div className="grid grid-cols-3 gap-0.5 flex-grow">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-1 bg-gray-100 rounded-sm border border-gray-200" />
            ))}
          </div>
        </div>
      );
    case 'Lever Arch Files':
      return (
        <div className="w-9 h-11 bg-gray-700 rounded shadow-md border border-gray-800 relative flex flex-col justify-end p-1">
          <div className="w-full h-1 bg-white/20 rounded-sm" />
          <div className="w-full h-1 bg-white/20 rounded-sm mt-0.5" />
          <div className="absolute top-3 left-3 w-2.5 h-2.5 rounded-full bg-white border border-gray-400 shadow-inner flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-gray-800" />
          </div>
        </div>
      );
    case 'Artist Canvases':
      return (
        <div className="w-11 h-11 bg-white border border-gray-300 shadow-md flex items-center justify-center p-1 rounded-sm relative">
          <div className="absolute bottom-0 left-1 right-1 h-1 bg-amber-800 rounded-sm" />
          <div className="w-full h-4/5 border border-dashed border-gray-400 rounded-sm bg-gray-50 flex items-center justify-center text-[5px] text-gray-400 font-bold">
            CANVAS
          </div>
        </div>
      );
    case 'Sticky Notes':
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute w-8 h-8 bg-pink-400 rounded-sm shadow-sm rotate-[-8deg]" />
          <div className="absolute w-8 h-8 bg-yellow-300 rounded-sm shadow-md rotate-[5deg]" />
        </div>
      );
    default:
      return (
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 text-[6px] font-bold text-gray-400">
          SP
        </div>
      );
  }
}

function GridSection({ title, subtitle, items }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="mb-5 sm:mb-6">
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-primary/80 block mb-1">
          Top Picks
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">{title}</h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 font-normal">{subtitle}</p>
      </div>
      <div className="border-t border-l border-gray-200 rounded-2xl overflow-hidden grid grid-cols-3 lg:grid-cols-9 bg-white shadow-soft">
        {items.map((item, idx) => (
          <Link
            key={item.name}
            to={item.to}
            className="group flex flex-col items-center justify-between p-4 border-r border-b border-gray-200 hover:bg-brand-soft/10 hover:z-10 hover:-translate-y-0.5 transform transition-all duration-300"
          >
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center relative shadow-sm overflow-hidden ${squareColors[idx % 3]}`}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt=""
                  width={160}
                  height={160}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                renderIcon(item.name)
              )}
            </div>
            <span className="mt-3 text-xs sm:text-sm font-semibold text-gray-700 leading-tight text-center flex items-center justify-center min-h-[32px] w-full px-2">
              <span className="line-clamp-2 break-words">{item.name}</span>
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <Link
          to="/catalog"
          className="rounded-full border-2 border-brand-primary text-brand-primary font-bold px-7 py-2 text-xs sm:text-sm hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow"
        >
          Browse the full catalog &rarr;
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  const [listModalOpen, setListModalOpen] = useState(false);

  return (
    <div>
      <SendListModal open={listModalOpen} onClose={() => setListModalOpen(false)} />
      {/* HERO — real storefront + the ask-box as the primary interaction, not
          decoration. On brand indigo/dark (#332E92/#241F6B), not the borrowed
          nooe.co navy. The ask-box answers "do you have it / how much" right
          here, because that's the job this page actually has to do. */}
      <section className="w-full bg-gradient-to-br from-brand-dark via-brand-primary to-brand-dark text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 lg:py-20 flex flex-col lg:flex-row items-center gap-8 lg:gap-14">
          <div className="w-full lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left">
            <span className="text-[11px] font-bold uppercase tracking-widest text-brand-accent bg-white/10 px-3.5 py-1 rounded-full border border-white/20 mb-3.5">
              Katti Tower, Vyttila · Kochi
            </span>
            <h1 className="text-balance text-3xl sm:text-4xl lg:text-[42px] xl:text-5xl font-bold tracking-tight text-white leading-[1.15]">
              Everything for <span className="text-brand-accent">school, office</span> and art.
            </h1>
            <p className="mt-4 text-sm sm:text-base text-white/70 max-w-md">
              Ask us for anything on the shelf, or paste your whole list — we'll confirm price and stock over WhatsApp.
            </p>

            <div className="mt-6 w-full flex flex-col items-center lg:items-start gap-2">
              <AskBox variant="hero" />
              <button
                type="button"
                onClick={() => setListModalOpen(true)}
                className="text-xs font-semibold text-white/60 hover:text-white underline underline-offset-4 transition-colors"
              >
                Already have a saved list or items in your basket? Send it from here →
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-1.5 mt-6 text-[11px] text-white/60">
              <span className="inline-flex items-center gap-1">
                <StarIcon className="w-3 h-3 text-brand-accent" /> {STORE.rating}/5 · {STORE.reviewCount} reviews
              </span>
              <span>Opposite Metro Pillar 837</span>
              <span>Mon–Sat 9:30 AM – 8 PM</span>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src="/storefront.jpg"
                alt="Stationery Point storefront, Katti Tower, Vyttila"
                width={1600}
                height={1200}
                loading="eager"
                fetchpriority="high"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-white text-xs sm:text-sm font-semibold">Real shop, real stock — not a stock photo.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FIND BY CATEGORIES — promoted directly under the hero. NOOE 4-column grid + kicker tag */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="mb-5 sm:mb-6">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-primary/80 block mb-1">
            Explore Collections
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Find by Category</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 font-normal">
            Browse the aisles — tap any category to see what&rsquo;s in stock.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((c) => (
            <CategoryCard
              key={c.id}
              name={c.title}
              image={c.image}
              categoryId={c.id}
            />
          ))}
        </div>
      </section>

      {/* SOCIAL PROOF — moved up from ~5,900px (screen 8) to screen 3 */}
      <Testimonials />

      <AdvantageCards />

      <GridSection
        title="Popular Right Now"
        subtitle="The things people walk in and ask for most."
        items={popular}
      />

      {/* KOCHI DELIVERY BANNER — removed pending client sign-off.
          The copy claimed "our warehouse in Vyttila" and dispatch to Edappally,
          Kakkanad and Kadavanthra. Stationery Point is a ground-floor shop in
          Katti Tower, not a warehouse, and the delivery network is unconfirmed.
          Restore this block once the client confirms what is actually true. */}
    </div>
  );
}
