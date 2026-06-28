import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STORE, waLink, prefersReducedMotion } from '../lib/utils';
import Testimonials from './Testimonials';
import { WhatsAppIcon } from './icons';

gsap.registerPlugin(ScrollTrigger);

const section1 = [
  { name: 'School Kits', to: '/catalog?q=kit' },
  { name: 'Notebooks', to: '/catalog?category=stationery' },
  { name: 'Gel & Ball Pens', to: '/catalog?category=stationery' },
  { name: 'Geometry Boxes', to: '/catalog?q=geometry' },
  { name: 'Erasers & Sharpeners', to: '/catalog?q=eraser' },
  { name: 'Calculators', to: '/catalog?category=office-supplies' },
  { name: 'Color Pencils', to: '/catalog?category=art-supplies' },
  { name: 'Drawing Books', to: '/catalog?category=art-supplies' },
  { name: 'Highlighters', to: '/catalog?category=stationery' },
];

const section2 = [
  { name: 'Lever Arch Files', to: '/catalog?q=file' },
  { name: 'Desk Organizers', to: '/catalog?category=office-supplies' },
  { name: 'Staplers & Punches', to: '/catalog?q=stapler' },
  { name: 'Whiteboard Markers', to: '/catalog?category=office-supplies' },
  { name: 'Paper Cutters', to: '/catalog?q=cutter' },
  { name: 'Tapes & Adhesives', to: '/catalog?category=craft-material' },
  { name: 'Registers & Ledgers', to: '/catalog?q=register' },
  { name: 'Business Diaries', to: '/catalog?category=office-supplies' },
  { name: 'Sticky Notes', to: '/catalog?category=stationery' },
];

const section3 = [
  { name: 'Fine Art Brushes', to: '/catalog?q=brush' },
  { name: 'Watercolor Pans', to: '/catalog?q=watercolor' },
  { name: 'Artist Canvases', to: '/catalog?category=art-supplies' },
  { name: 'Acrylic Paints', to: '/catalog?category=art-supplies' },
  { name: 'Sketchbooks', to: '/catalog?category=art-supplies' },
  { name: 'Drafting Tools', to: '/catalog?category=art-supplies' },
  { name: 'Calligraphy Ink', to: '/catalog?q=ink' },
  { name: 'Modeling Clay', to: '/catalog?category=craft-material' },
  { name: 'Fabric Paints', to: '/catalog?category=art-supplies' },
];

const squareColors = ['bg-[#FFF3B3]', 'bg-[#D2ECF9]', 'bg-[#E1EFE1]'];

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
    case 'Registers & Ledgers':
      return (
        <div className="w-10 h-13 bg-white rounded-md shadow-md border border-gray-200 flex flex-col overflow-hidden">
          <div className="w-full h-3.5 bg-brand-purple flex items-center justify-center text-[5px] text-white font-bold leading-none">
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
    case 'Whiteboard Markers':
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
    case 'Drafting Tools':
      return (
        <div className="w-11 h-11 bg-slate-100 rounded-lg shadow-md border border-slate-300 p-1 flex flex-col justify-between">
          <div className="w-full h-1 bg-slate-300 rounded-sm" />
          <div className="flex justify-around items-end">
            <div className="w-0.5 h-6 bg-gray-600 rounded-sm" />
            <div className="w-3 h-3 border-l border-b border-gray-500 rotate-[45deg]" />
          </div>
        </div>
      );
    case 'Erasers & Sharpeners':
      return (
        <div className="relative w-full h-full flex items-center justify-center gap-1">
          <div className="w-9 h-5 bg-white border border-gray-200 rounded shadow-sm flex items-center relative overflow-hidden rotate-[-15deg]">
            <div className="w-2/3 h-full bg-blue-600" />
            <div className="w-1/3 h-full bg-white" />
          </div>
          <div className="w-6 h-6 bg-lime-500 rounded shadow-sm border border-lime-600 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-lime-700/50" />
          </div>
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
    case 'Color Pencils':
    case 'Acrylic Paints':
      return (
        <div className="flex gap-1 items-end justify-center w-full h-full pb-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-1.5 h-11 bg-amber-400 relative flex flex-col justify-between items-center rounded-t-sm shadow-sm" style={{ transform: `rotate(${(i - 1) * 8}deg)`, backgroundColor: ['#EF4444', '#3B82F6', '#10B981'][i] }}>
              <div className="w-full h-1 bg-white/30 rounded-t-sm" />
            </div>
          ))}
        </div>
      );
    case 'Drawing Books':
    case 'Sketchbooks':
      return (
        <div className="w-12 h-10 bg-[#2B2B2B] rounded shadow-md border border-gray-700 flex flex-col justify-between p-1">
          <div className="w-full h-1 bg-[#FFB000]/80 rounded-sm" />
          <div className="w-full h-2 border-t border-dashed border-white/20 flex flex-col gap-0.5">
            <div className="w-6 h-[1px] bg-white/10" />
          </div>
        </div>
      );
    case 'Highlighters':
      return (
        <div className="flex gap-1.5 items-end justify-center w-full h-full pb-2">
          <div className="w-3 h-9 bg-pink-400 rounded shadow-sm border border-pink-500 flex flex-col justify-between p-0.5">
            <div className="w-full h-2 bg-pink-600 rounded-sm" />
          </div>
          <div className="w-3 h-10 bg-yellow-300 rounded shadow-md border border-yellow-400 flex flex-col justify-between p-0.5 rotate-[10deg]">
            <div className="w-full h-2 bg-yellow-500 rounded-sm" />
          </div>
        </div>
      );
    case 'Lever Arch Files':
    case 'Business Diaries':
      return (
        <div className="w-9 h-11 bg-gray-700 rounded shadow-md border border-gray-800 relative flex flex-col justify-end p-1">
          <div className="w-full h-1 bg-white/20 rounded-sm" />
          <div className="w-full h-1 bg-white/20 rounded-sm mt-0.5" />
          <div className="absolute top-3 left-3 w-2.5 h-2.5 rounded-full bg-white border border-gray-400 shadow-inner flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-gray-800" />
          </div>
        </div>
      );
    case 'Desk Organizers':
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="w-9 h-11 bg-blue-400 border border-blue-500 rounded shadow-md flex items-start justify-around p-0.5">
            <div className="w-1 h-8 bg-gray-700 rounded-t-sm" />
            <div className="w-1 h-6 bg-gray-500 rounded-t-sm" />
          </div>
        </div>
      );
    case 'Staplers & Punches':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-gray-800">
          <path d="M5 22h14"/>
          <path d="M5 2v8l-2 2v2h18v-2l-2-2V2H5z"/>
          <path d="M9 14h6"/>
        </svg>
      );
    case 'Paper Cutters':
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="w-11 h-2 bg-gray-300 rounded-sm shadow-sm flex justify-end items-center relative overflow-hidden rotate-[30deg]">
            <div className="absolute top-0 bottom-0 left-0 w-2/3 bg-blue-500" />
          </div>
        </div>
      );
    case 'Tapes & Adhesives':
      return (
        <div className="relative w-full h-full flex items-center justify-center gap-1">
          <div className="w-6 h-6 rounded-full border-2 border-dashed border-pink-400 flex items-center justify-center" />
          <div className="w-4 h-9 bg-yellow-400 rounded shadow-sm" />
        </div>
      );
    case 'Sticky Notes':
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute w-8 h-8 bg-pink-400 rounded-sm shadow-sm rotate-[-8deg]" />
          <div className="absolute w-8 h-8 bg-yellow-300 rounded-sm shadow-md rotate-[5deg]" />
        </div>
      );
    case 'Fine Art Brushes':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-gray-800">
          <path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/>
          <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-1.17 2.01-2 2.01.93 1.23 2.5 2.03 4.02 2.03 2.23 0 4.05-1.8 4.05-4.04 0-1.66-1.35-3-3.02-3.02Z"/>
        </svg>
      );
    case 'Watercolor Pans':
      return (
        <div className="w-12 h-6 bg-white rounded-md shadow-md border border-gray-200 p-0.5 flex justify-around items-center">
          <div className="w-2 h-2 rounded-full bg-red-500 shadow-inner" />
          <div className="w-2 h-2 rounded-full bg-blue-500 shadow-inner" />
          <div className="w-2 h-2 rounded-full bg-yellow-500 shadow-inner" />
        </div>
      );
    case 'Artist Canvases':
      return (
        <div className="w-11 h-11 bg-white border border-gray-300 shadow-md flex items-center justify-center p-1 rounded-sm relative">
          <div className="absolute bottom-0 left-1 right-1 h-1 bg-amber-800 rounded-sm" />
          <div className="w-full h-4/5 border border-dashed border-gray-400 rounded-sm bg-gray-50 flex items-center justify-center text-[5px] text-gray-400 font-bold">CANVAS</div>
        </div>
      );
    case 'Calligraphy Ink':
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="w-8 h-9 bg-gray-900 border border-gray-800 rounded-md shadow-md flex flex-col justify-between p-0.5">
            <div className="w-full h-2 bg-yellow-600 rounded-t-sm" />
          </div>
        </div>
      );
    case 'Modeling Clay':
      return (
        <div className="flex flex-col gap-0.5 items-center justify-center w-full h-full">
          <div className="w-8 h-2.5 bg-red-400 rounded shadow-sm" />
          <div className="w-8 h-2.5 bg-blue-400 rounded shadow-sm" />
          <div className="w-8 h-2.5 bg-yellow-400 rounded shadow-sm" />
        </div>
      );
    case 'Fabric Paints':
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-md">
            <div className="w-5 h-5 rounded-full bg-pink-500" />
          </div>
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
        <p className="text-xs sm:text-sm text-gray-500 mt-1.5 font-medium">{subtitle}</p>
      </div>
      <div className="border-t border-l border-gray-200 rounded-2xl overflow-hidden grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-9 bg-white shadow-soft">
        {items.map((item, idx) => (
          <Link
            key={item.name}
            to={item.to}
            className="group flex flex-col items-center justify-between p-4 border-r border-b border-gray-200 hover:bg-brand-lavender/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:z-10 hover:-translate-y-0.5 transform transition-all duration-300"
          >
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center relative shadow-sm overflow-hidden ${squareColors[idx % 3]}`}>
              {renderIcon(item.name)}
            </div>
            <span className="mt-3 text-xs sm:text-sm font-semibold text-gray-700 leading-tight text-center flex items-center justify-center min-h-[32px] w-full px-2">
              <span className="line-clamp-2 break-words">{item.name}</span>
              <span className="hidden md:inline-block opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 ml-1 font-bold shrink-0">&gt;</span>
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Link to="/catalog" className="rounded-full border-2 border-brand-purple text-brand-purple font-bold px-8 py-2.5 text-xs sm:text-sm hover:bg-brand-purple hover:text-white transition-all duration-300 shadow-sm hover:shadow">
          View More Products &rarr;
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  const sectionsRef = useRef([]);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      sectionsRef.current.forEach((el) => {
        if (!el) return;
        gsap.from(el.querySelectorAll('.reveal'), {
          y: 40,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 80%' },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div>
      {/* CATEGORY TABS & TRUST BADGES (Scooboo-style) */}
      <div className="w-full bg-white border-b border-gray-200/60 shadow-sm">
        {/* Color Strip Tabs */}
        <div className="flex overflow-x-auto sm:grid sm:grid-cols-4 text-white text-xs font-bold text-center select-none scrollbar-none">
          <Link to="/catalog?category=stationery" className="bg-[#EF4444] py-3.5 px-4 whitespace-nowrap hover:opacity-90 transition-opacity flex-1 text-center">Stationery</Link>
          <Link to="/catalog?category=office-supplies" className="bg-[#10B981] py-3.5 px-4 whitespace-nowrap hover:opacity-90 transition-opacity flex-1 text-center">Office Supplies</Link>
          <Link to="/catalog?category=art-supplies" className="bg-[#3B82F6] py-3.5 px-4 whitespace-nowrap hover:opacity-90 transition-opacity flex-1 text-center">Art Supplies</Link>
          <Link to="/catalog?category=craft-material" className="bg-[#6366F1] py-3.5 px-4 whitespace-nowrap hover:opacity-90 transition-opacity flex-1 text-center">Craft Material</Link>
        </div>

        {/* Trust Badges Bar */}
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex flex-wrap justify-around items-center gap-y-2 gap-x-4 text-xs sm:text-sm font-semibold text-gray-500">
          <span className="flex items-center gap-2">
            🏷️ Global Brands below MRP
          </span>
          <span className="flex items-center gap-2">
            💬 Quick WhatsApp Enquiries
          </span>
          <span className="flex items-center gap-2">
            🏢 Bulk &amp; Wholesale Discounts
          </span>
        </div>
      </div>

      {/* HERO BANNER */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="relative rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[21/9] flex items-center justify-center bg-gray-900 shadow-soft">
          {/* Background image */}
          <img
            src="/hero_banner.png"
            alt="Quality stationery collection flat-lay"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            fetchpriority="high"
          />
          {/* Subtle gradient overlay to make text pop */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
          
          {/* Content */}
          <div className="relative z-10 text-left px-6 sm:px-12 md:max-w-xl flex flex-col items-start gap-4 mr-auto py-8">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-gold bg-brand-purple/85 px-4 py-1.5 rounded-full backdrop-blur-sm shadow-sm border border-brand-purple/20">
              Stationery Point Kochi
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight uppercase">
              Stationery <br />
              on Sale
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-white/85 max-w-sm text-balance">
              Find quality writing, drafting, school, and art supplies below MRP.
            </p>
            <div className="mt-2">
              <Link to="/catalog" className="rounded-full bg-[#FF2D73] text-white font-bold px-8 py-3.5 hover:bg-[#e02060] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-block">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1 */}
      <GridSection 
        title="Academic &amp; School Supplies" 
        subtitle="Complete bundles, notebooks, writing tools, and geometry gear for school kids and students."
        items={section1} 
      />

      {/* BREAKER 1: STATIONERY POINT ADVANTAGE CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Retail below MRP */}
          <div className="bg-[#5D2D8F] text-white p-8 rounded-3xl flex flex-col justify-between aspect-square relative overflow-hidden shadow-soft group hover:shadow-md transition-shadow">
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#FFB000]">Our Guarantee</span>
                <h3 className="text-3xl font-black uppercase tracking-tight mt-2 leading-none">
                  Retail<br />Below MRP
                </h3>
                <p className="text-sm text-white/80 mt-4 leading-relaxed max-w-[220px]">
                  Single items at wholesale prices. No minimum order quantity required.
                </p>
              </div>
              <Link to="/catalog" className="w-fit rounded-full bg-[#FFB000] text-gray-900 font-bold px-6 py-2.5 text-xs hover:bg-white transition-colors shadow-sm">
                Explore Catalog &rarr;
              </Link>
            </div>
            {/* Background Kinetic Typography */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
              <div className="absolute top-1/2 left-0 w-[200%] -translate-y-1/2 -rotate-[8deg] origin-left">
                <div className="flex animate-scroll-left w-max text-white" style={{ opacity: 0.1 }}>
                  <span className="pr-[500px]">MRP</span>
                  <span className="pr-[500px]">MRP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Bulk Wholesale */}
          <div className="bg-white border border-gray-200 text-gray-800 p-8 rounded-3xl flex flex-col justify-between aspect-square relative overflow-hidden shadow-soft group hover:shadow-md transition-shadow">
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-purple/70">Institutional</span>
                <h3 className="text-3xl font-black uppercase tracking-tight text-brand-purple mt-2 leading-none">
                  Wholesale<br />Supply
                </h3>
                <p className="text-sm text-gray-500 mt-4 leading-relaxed max-w-[220px]">
                  Custom pricing for schools, tuition centers, offices, and bulk buyers in Kochi.
                </p>
              </div>
              <a href={waLink('Bulk Inquiry')} target="_blank" rel="noreferrer" className="w-fit rounded-full bg-brand-purple text-white font-bold px-6 py-2.5 text-xs hover:bg-opacity-90 transition-colors shadow-sm">
                Request Quote &rarr;
              </a>
            </div>
            {/* Background Kinetic Typography */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
              <div className="absolute top-1/2 left-0 w-[200%] -translate-y-1/2 -rotate-[8deg] origin-left">
                <div className="flex animate-scroll-left w-max text-brand-purple" style={{ opacity: 0.05 }}>
                  <span className="pr-[500px]">BULK</span>
                  <span className="pr-[500px]">BULK</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: WhatsApp Enquiry */}
          <div className="bg-[#25D366] text-white p-8 rounded-3xl flex flex-col justify-between aspect-square relative overflow-hidden shadow-soft group hover:shadow-md transition-shadow">
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-green-100">Quick Contact</span>
                <h3 className="text-3xl font-black uppercase tracking-tight mt-2 leading-none">
                  WhatsApp<br />Enquiry
                </h3>
                <p className="text-sm text-white/90 mt-4 leading-relaxed max-w-[220px]">
                  Send us a list or picture of the items you need. We'll reply with a below-MRP quote!
                </p>
              </div>
              <a href={waLink('Send Stationery List')} target="_blank" rel="noreferrer" className="w-fit rounded-full bg-white text-green-600 font-bold px-6 py-2.5 text-xs hover:bg-green-50 transition-colors shadow-sm">
                Send List Now &rarr;
              </a>
            </div>
            {/* Background Kinetic Typography */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
              <div className="absolute top-1/2 left-0 w-[200%] -translate-y-1/2 -rotate-[8deg] origin-left">
                <div className="flex animate-scroll-left w-max text-white" style={{ opacity: 0.1 }}>
                  <span className="pr-[500px]">CHAT</span>
                  <span className="pr-[500px]">CHAT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 */}
      <GridSection 
        title="Office &amp; Corporate Essentials" 
        subtitle="Desktop supplies, organizers, filing solutions, and diaries for professional workspaces."
        items={section2} 
      />

      {/* BREAKER 2: KOCHI LOCAL DELIVERY BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-gradient-to-r from-gray-900 via-brand-purple/90 to-brand-purple text-white rounded-3xl p-8 md:p-12 relative overflow-hidden border border-brand-purple/10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="relative z-10 max-w-lg">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Kochi Fulfillment</span>
            <h3 className="text-3xl font-extrabold mt-2 leading-tight">Serving Kochi's Schools &amp; Offices</h3>
            <p className="text-xs text-white/80 mt-4 leading-relaxed max-w-sm">
              From our warehouse in Vyttila, we package and deliver bulk kits, art supplies, and corporate orders across Ernakulam. Quick dispatch to Edappally, Kakkanad, and Kadavanthra.
            </p>
            <a href={waLink('Kochi Delivery enquiry')} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-gold/40 text-brand-gold hover:bg-[#FFB000] hover:text-gray-950 font-bold px-6 py-2.5 text-xs transition-colors duration-300">
              Inquire About Delivery
            </a>
          </div>
          {/* Delivery Box Mockup in CSS */}
          <div className="relative z-10 flex gap-4 items-end h-28 shrink-0 pr-4">
            <div className="w-24 h-20 bg-amber-600 rounded-lg shadow-md border-b-4 border-amber-800 flex flex-col justify-between p-2 relative">
              <div className="w-full h-2 bg-amber-500 rounded-sm" />
              {/* Shipping Label */}
              <div className="w-10 h-6 bg-white border border-gray-300 rounded-sm p-0.5 flex flex-col gap-0.5 shadow-inner">
                <div className="w-full h-[1px] bg-gray-400" />
                <div className="w-3/4 h-[1px] bg-gray-400" />
              </div>
              {/* SP Branding tape */}
              <div className="absolute top-8 left-0 right-0 h-3 bg-brand-purple/20 border-y border-brand-purple/10" />
            </div>
            <div className="w-14 h-14 bg-amber-700 rounded-lg shadow-sm border-b-4 border-amber-900 flex items-center justify-center text-[10px] text-white/30 font-bold">
              BOX
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 */}
      <GridSection 
        title="Professional Art &amp; Craft Mediums" 
        subtitle="Canvases, paint sets, markers, and drafting instruments for artists and creators."
        items={section3} 
      />

      <Testimonials />

      {/* WHOLESALE CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="rounded-3xl bg-brand-purple text-white px-6 sm:px-12 py-12 md:py-16 relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-brand-gold/20 blur-2xl" aria-hidden="true" />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold">Wholesale &amp; Bulk Enquiries</h2>
            <p className="mt-4 text-white/80">
              Sourcing supplies for your school, office, or studio? Get quality products at the best below-MRP rates. Message us directly for a custom quote.
            </p>
            <a href={waLink('Wholesale / Bulk Order')} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-gold text-gray-900 font-bold px-7 py-3 hover:bg-white transition-colors">
              <WhatsAppIcon className="w-5 h-5" /> Request a Quote
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
