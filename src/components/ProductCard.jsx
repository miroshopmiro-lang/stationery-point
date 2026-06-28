import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { waLink } from '../lib/utils';
import { WhatsAppIcon } from './icons';

const squareColors = ['bg-[#FFF3B3]', 'bg-[#D2ECF9]', 'bg-[#E1EFE1]'];

function renderProductIcon(name) {
  const lowercase = name.toLowerCase();
  
  if (lowercase.includes('kit')) {
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
  }
  if (lowercase.includes('notebook') || lowercase.includes('diary') || lowercase.includes('register') || lowercase.includes('ledger') || lowercase.includes('book') || lowercase.includes('pad')) {
    return (
      <div className="w-10 h-13 bg-white rounded-md shadow-md border border-gray-200 flex flex-col overflow-hidden">
        <div className="w-full h-3.5 bg-[#5D2D8F] flex items-center justify-center text-[5px] text-white font-bold leading-none">
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
  }
  if (lowercase.includes('pen') || lowercase.includes('marker') || lowercase.includes('liner') || lowercase.includes('highlighter')) {
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
  }
  if (lowercase.includes('pencil')) {
    return (
      <div className="flex gap-1.5 items-end justify-center w-full h-full pb-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="w-1.5 h-11 bg-amber-400 relative flex flex-col justify-between items-center rounded-t-sm shadow-sm" style={{ transform: `rotate(${(i - 1) * 8}deg)`, backgroundColor: ['#EF4444', '#3B82F6', '#10B981'][i] }}>
            <div className="w-full h-1.5 bg-pink-300 rounded-t-sm" />
            <div className="w-full h-0.5 bg-gray-300" />
            <div className="w-full h-0 flex-grow" />
            <div className="w-0 h-0 border-l-[3px] border-r-[3px] border-b-[6px] border-l-transparent border-r-transparent border-b-[#E5C158] relative">
              <div className="absolute bottom-[-6px] left-[-1px] right-[-1px] h-1 bg-gray-900 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (lowercase.includes('eraser') || lowercase.includes('sharpener')) {
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
  }
  if (lowercase.includes('calculator')) {
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
  }
  if (lowercase.includes('file') || lowercase.includes('folder') || lowercase.includes('binder') || lowercase.includes('organizer')) {
    return (
      <div className="w-9 h-11 bg-gray-700 rounded shadow-md border border-gray-800 relative flex flex-col justify-end p-1">
        <div className="w-full h-1 bg-white/20 rounded-sm" />
        <div className="w-full h-1 bg-white/20 rounded-sm mt-0.5" />
        <div className="absolute top-3 left-3 w-2.5 h-2.5 rounded-full bg-white border border-gray-400 shadow-inner flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-gray-800" />
        </div>
      </div>
    );
  }
  if (lowercase.includes('tape') || lowercase.includes('glue') || lowercase.includes('adhesive')) {
    return (
      <div className="relative w-full h-full flex items-center justify-center gap-1">
        <div className="w-6 h-6 rounded-full border-2 border-dashed border-pink-400 flex items-center justify-center" />
        <div className="w-4 h-9 bg-yellow-400 rounded shadow-sm" />
      </div>
    );
  }
  if (lowercase.includes('scissors') || lowercase.includes('cutter')) {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-11 h-2 bg-gray-300 rounded-sm shadow-sm flex justify-end items-center relative overflow-hidden rotate-[30deg]">
          <div className="absolute top-0 bottom-0 left-0 w-2/3 bg-blue-500" />
        </div>
      </div>
    );
  }
  if (lowercase.includes('brush') || lowercase.includes('knife')) {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-1 h-13 bg-amber-600 rounded-sm rotate-[45deg] relative">
          <div className="absolute top-0 left-[-1.5px] w-2 h-3 bg-gray-300 rounded-full" />
        </div>
      </div>
    );
  }
  if (lowercase.includes('canvas') || lowercase.includes('gesso')) {
    return (
      <div className="w-11 h-11 bg-white border border-gray-300 shadow-md flex items-center justify-center p-1 rounded-sm relative">
        <div className="absolute bottom-0 left-1 right-1 h-1 bg-amber-800 rounded-sm" />
        <div className="w-full h-4/5 border border-dashed border-gray-400 rounded-sm bg-gray-50 flex items-center justify-center text-[5px] text-gray-400 font-bold">CANVAS</div>
      </div>
    );
  }
  if (lowercase.includes('ink')) {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-8 h-9 bg-gray-900 border border-gray-800 rounded-md shadow-md flex flex-col justify-between p-0.5">
          <div className="w-full h-2 bg-yellow-600 rounded-t-sm" />
        </div>
      </div>
    );
  }
  if (lowercase.includes('clay')) {
    return (
      <div className="flex flex-col gap-0.5 items-center justify-center w-full h-full">
        <div className="w-8 h-2.5 bg-red-400 rounded shadow-sm" />
        <div className="w-8 h-2.5 bg-blue-400 rounded shadow-sm" />
        <div className="w-8 h-2.5 bg-yellow-400 rounded shadow-sm" />
      </div>
    );
  }
  if (lowercase.includes('watercolor') || lowercase.includes('palette') || lowercase.includes('paint') || lowercase.includes('color') || lowercase.includes('gouache')) {
    return (
      <div className="w-12 h-6 bg-white rounded-md shadow-md border border-gray-200 p-0.5 flex justify-around items-center">
        <div className="w-2 h-2 rounded-full bg-red-500 shadow-inner" />
        <div className="w-2 h-2 rounded-full bg-blue-500 shadow-inner" />
        <div className="w-2 h-2 rounded-full bg-yellow-500 shadow-inner" />
      </div>
    );
  }
  return (
    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 text-[6px] font-bold text-gray-400">
      SP
    </div>
  );
}

export default function ProductCard({ product }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      layout
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-soft transition-[transform,box-shadow] duration-300 hover:scale-102 hover:-translate-y-1 flex flex-col justify-between"
    >
      <div className="aspect-[4/3] flex items-center justify-center relative overflow-hidden group-hover:bg-brand-lavender/5 transition-colors p-4">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-xl shadow-inner"
          />
        ) : (
          <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center relative shadow-sm overflow-hidden ${squareColors[product.id % 3]}`}>
            {renderProductIcon(product.name)}
          </div>
        )}
      </div>
      <div className="p-4 sm:p-5 flex flex-col gap-2.5 min-w-0 flex-grow justify-between border-t border-gray-50/50">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-purple/75">{product.categoryLabel}</span>
          <h3 className="font-bold text-gray-800 text-sm sm:text-base leading-snug line-clamp-1 group-hover:text-brand-purple transition-colors">{product.name}</h3>
          {product.description && (
            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed min-h-[32px]">{product.description}</p>
          )}
        </div>
        <div className="flex flex-col gap-3 mt-1">
          <span className="inline-block w-fit text-xs font-extrabold text-brand-purple bg-brand-lavender/50 rounded-full px-3 py-1">{product.price}</span>
          <a
            href={waLink(product.name)}
            target="_blank"
            rel="noreferrer"
            aria-label={`Enquire about ${product.name} on WhatsApp`}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-brand-purple/35 text-brand-purple font-bold px-3 py-2.5 hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all duration-300 text-xs sm:text-sm shadow-sm w-full"
          >
            <WhatsAppIcon className="w-4 h-4 shrink-0" /> <span className="truncate">Enquire on WhatsApp</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
