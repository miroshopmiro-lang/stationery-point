import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { STORE } from '../lib/utils';
import { categories, products } from '../data/productData';
import CategoryCard from './CategoryCard';
import AdvantageCards from './AdvantageCards';
import Testimonials from './Testimonials';
import SendListModal from './SendListModal';
import { WhatsAppIcon } from './icons';

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
      {/* HERO — NOOE.co Layout (Mobile: Full-bleed edge-to-edge thinner/wider banner top, dark text block bottom; Desktop: dark bg flows top & bottom of 16:9 right image, text left) */}
      <section className="w-full bg-gradient-to-r from-[#040911] via-[#0A1730] to-[#040911] text-white overflow-hidden py-0 md:py-10 lg:py-14">
        <div className="w-full flex flex-col md:flex-row items-center">
          
          {/* MOBILE: Full-Bleed Thinner Banner Top / DESKTOP: Right Side Image (16:9, flush right with dark bg flowing top & bottom) */}
          <div className="order-first md:order-last w-full md:w-[56%] lg:w-[62%] shrink-0 flex items-center justify-end md:pl-4">
            <div className="relative w-full aspect-[21/9] sm:aspect-[16/9] md:aspect-video max-h-[200px] sm:max-h-[280px] md:max-h-[420px] shadow-2xl overflow-hidden bg-[#EFE7DB]">
              {/* One 16:9 file for every breakpoint, cropped by object-cover — the same
                  approach nooe.co uses. The container is 21:9 on mobile and 16:9 above 640px. */}
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster="/hero-poster.webp"
                aria-label="Stationery Point — where ideas begin"
              >
                <source src="/hero-video.mp4" type="video/mp4" />
                <img
                  src="/hero-poster.webp"
                  alt="Stationery Point Store & Products"
                  className="w-full h-full object-cover"
                />
              </video>
            </div>
          </div>

          {/* TEXT CONTENT — Below banner on mobile (full-bleed dark background), Left side on desktop */}
          <div className="order-last md:order-first w-full md:w-[44%] lg:w-[38%] shrink-0 flex flex-col justify-center items-center text-center md:items-start md:text-left px-6 sm:px-10 lg:pl-16 lg:pr-6 py-8 md:py-6 lg:py-8">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#FFB000] bg-white/10 px-3.5 py-1 rounded-full border border-white/20 self-center md:self-start mb-3.5">
              Stationery Point Kochi
            </span>
            <h1 className="text-balance text-3xl sm:text-4xl lg:text-[42px] xl:text-5xl font-bold tracking-tight text-white leading-[1.2] md:leading-[1.15]">
              Everything for <span className="text-[#FFB000]">school, office</span> <br className="hidden md:inline" />and art.
            </h1>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-5 w-full sm:w-auto">
              <Link
                to="/catalog"
                className="rounded-full bg-[#FFB000] text-gray-900 font-bold px-7 py-3 hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg text-xs sm:text-sm text-center flex-1 sm:flex-none"
              >
                Browse Catalog
              </Link>
              <button
                type="button"
                onClick={() => setListModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 text-white font-bold px-6 py-3 text-xs sm:text-sm hover:bg-white/10 transition-colors flex-1 sm:flex-none"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" /> Send a list
              </button>
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
