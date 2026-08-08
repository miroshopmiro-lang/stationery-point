import React from 'react';
import { Link } from 'react-router-dom';
import { STORE, waLink } from '../lib/utils';
import { categories, products } from '../data/productData';
import CategoryCard from './CategoryCard';
import AdvantageCards from './AdvantageCards';
import Testimonials from './Testimonials';
import NewArrivals from './NewArrivals';
import { WhatsAppIcon, StarIcon } from './icons';

// One merged "popular" grid. Previously three near-identical 9-item grids
// (Academic / Office / Art) ran back to back — 2,084px of the page repeating
// the same idea and ending in three identical "View More Products" buttons.
const popular = [
  { name: 'School Kits', to: '/catalog?q=kit' },
  { name: 'Notebooks', to: '/catalog?category=stationery' },
  { name: 'Gel & Ball Pens', to: '/catalog?category=stationery' },
  { name: 'Geometry Boxes', to: '/catalog?q=geometry' },
  { name: 'Color Pencils', to: '/catalog?category=art-supplies' },
  { name: 'Calculators', to: '/catalog?category=office-supplies' },
  { name: 'Lever Arch Files', to: '/catalog?q=file' },
  { name: 'Artist Canvases', to: '/catalog?category=art-supplies' },
  { name: 'Sticky Notes', to: '/catalog?category=stationery' },
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight">{title}</h2>
        <p className="text-sm text-gray-500 mt-1.5 font-medium">{subtitle}</p>
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
              {renderIcon(item.name)}
            </div>
            <span className="mt-3 text-xs sm:text-sm font-semibold text-gray-700 leading-tight text-center flex items-center justify-center min-h-[32px] w-full px-2">
              <span className="line-clamp-2 break-words">{item.name}</span>
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Link
          to="/catalog"
          className="rounded-full border-2 border-brand-primary text-brand-primary font-bold px-8 py-2.5 text-sm hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow"
        >
          Browse All {products.length} Products &rarr;
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div>
      {/* TRUST STRIP — one line of verified facts. Replaces the seven-colour
          category tab strip (6 of 7 failed WCAG AA on white text) and the
          emoji badge row that stacked to three lines on mobile. */}
      <div className="w-full bg-white border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs sm:text-sm font-semibold text-gray-600">
          <span className="inline-flex items-center gap-1 text-brand-primary">
            <StarIcon className="w-4 h-4 text-brand-gold" />
            {STORE.rating} / 5
          </span>
          <span className="text-gray-300" aria-hidden="true">·</span>
          <span>{STORE.reviewCount} Google reviews</span>
          <span className="text-gray-300" aria-hidden="true">·</span>
          <span>Below MRP</span>
          <span className="text-gray-300 hidden sm:inline" aria-hidden="true">·</span>
          <span className="hidden sm:inline">Vyttila, Kochi</span>
        </div>
      </div>

      {/* HERO */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="relative rounded-3xl overflow-hidden min-h-[420px] sm:min-h-[380px] md:min-h-[440px] flex items-center bg-gray-900 shadow-soft">
          <img
            src="/hero_banner.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-55"
            fetchpriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/25" />

          <div className="relative z-10 text-left px-6 sm:px-12 md:max-w-2xl flex flex-col items-start gap-4 mr-auto py-10">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-gold bg-brand-primary/85 px-4 py-1.5 rounded-full backdrop-blur-sm shadow-sm border border-brand-primary/20 whitespace-nowrap">
              Stationery Point Kochi
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.05] tracking-tight">
              Everything for
              <br />
              school, office
              <br />
              and art.
            </h1>
            <p className="text-sm sm:text-base text-white/85 max-w-md text-balance leading-relaxed">
              {products.length} products across {categories.length} aisles — all below MRP. Send us your
              list on WhatsApp and we&rsquo;ll quote it.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                to="/catalog"
                className="rounded-full bg-brand-gold text-gray-900 font-bold px-7 py-3 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-block text-sm"
              >
                Browse the catalog
              </Link>
              <a
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 text-white font-bold px-6 py-3 text-sm hover:bg-white/10 transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" /> Send a list
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FIND BY CATEGORIES — promoted directly under the hero. This is the
          primary navigation of the site; it used to sit below the fold. */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight">Find by Category</h2>
          <p className="text-sm text-gray-500 mt-1.5 font-medium">
            Browse the aisles — tap any category to see what&rsquo;s in stock.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((c) => (
            <CategoryCard
              key={c.id}
              name={c.title}
              image={c.image}
              categoryId={c.id}
              count={products.filter((p) => p.category === c.id).length}
            />
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS — auto-scrolling marquee */}
      <NewArrivals />

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
