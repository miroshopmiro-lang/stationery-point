import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { matchQuery, matchList } from '../lib/search';
import { STORE } from '../lib/utils';
import { SearchIcon, WhatsAppIcon, ListIcon } from './icons';

// The site's spine: one box that answers "do you have it / how much" for a
// single item, or takes a whole pasted supply list and turns it into one
// pre-filled WhatsApp message. It never dead-ends — an unmatched query still
// produces a usable WhatsApp link, because the real item master hasn't
// landed yet and pretending otherwise would just be a fancier version of
// Jags's unclickable product cards.
//
// variant="hero"   — large, used once on the homepage.
// variant="header" — compact trigger that opens the same panel in a popover.

const EXAMPLES = ['Camlin geometry box', 'A4 chart paper', 'Class 5 supply list', 'Parker pen'];

function SingleMatch({ query }) {
  const match = useMemo(() => matchQuery(query), [query]);
  if (!query.trim()) return null;

  const hit = match.category || match.brand;
  return (
    <div className="mt-3 flex flex-col gap-2">
      {hit ? (
        <Link
          to={match.category ? `/catalog?category=${match.category.id}` : `/catalog?q=${encodeURIComponent(match.brand)}`}
          className="flex items-center justify-between gap-3 rounded-xl bg-white border border-brand-primary/20 px-4 py-3 hover:border-brand-primary transition-colors group"
        >
          <span className="text-sm text-gray-700">
            Likely under <span className="font-bold text-brand-primary">{match.category ? match.category.title : match.brand}</span>
          </span>
          <span className="text-xs font-bold text-brand-primary shrink-0">Browse &rarr;</span>
        </Link>
      ) : (
        <p className="text-xs text-gray-500 px-1">
          Not sure from here — send it across and we'll check the shelf.
        </p>
      )}
      <a
        href={match.waFallback}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-white font-bold px-4 py-3 text-sm hover:bg-[#1da851] transition-colors shadow-sm"
      >
        <WhatsAppIcon className="w-4 h-4" /> Ask on WhatsApp — "{query.trim().slice(0, 40)}{query.trim().length > 40 ? '…' : ''}"
      </a>
    </div>
  );
}

function ListMatch({ text }) {
  const { results, matchedCount, total, waLink } = useMemo(() => matchList(text), [text]);
  if (!text.trim()) return null;
  return (
    <div className="mt-3 flex flex-col gap-2">
      <div className="rounded-xl bg-white border border-gray-100 divide-y divide-gray-50 max-h-48 overflow-y-auto">
        {results.map((r, i) => (
          <div key={i} className="flex items-center justify-between gap-3 px-4 py-2 text-sm">
            <span className="text-gray-700 truncate">{r.text}</span>
            <span className={`text-[10px] font-bold uppercase tracking-wide shrink-0 ${r.category || r.brand ? 'text-brand-primary' : 'text-gray-300'}`}>
              {r.category ? r.category.title : r.brand ? r.brand : 'check'}
            </span>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-gray-400 px-1">
        {matchedCount} of {total} matched to a category — every line still goes across, matched or not.
      </p>
      <a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-white font-bold px-4 py-3 text-sm hover:bg-[#1da851] transition-colors shadow-sm"
      >
        <WhatsAppIcon className="w-4 h-4" /> Send full list on WhatsApp
      </a>
    </div>
  );
}

export default function AskBox({ variant = 'hero', defaultMode = 'single' }) {
  const [mode, setMode] = useState(defaultMode); // 'single' | 'list'
  const [value, setValue] = useState('');
  const isHero = variant === 'hero';
  const isHeader = variant === 'header';
  const navigate = useNavigate();

  /*
   * HEADER VARIANT — full-width rounded search pill on its own row.
   * Copied from the one pattern all three renderable references agree on:
   *   flyingtiger.com  — full-width row, own line, black submit button
   *   hobbycraft.co.uk — full-width pill, magnifier LEFT, "What are you looking for today?"
   *   dickblick.com    — full-width pill, and the ITEM COUNT is in the placeholder:
   *                      "Search 110,000+ art supplies" — a free range/trust signal.
   * We copy hobbycraft's shape and blick's count-in-placeholder idea.
   * No mode-toggle chips here; those belong to the hero/section variant.
   *
   * Submitting used to just preventDefault with nothing else — the box captured typing
   * but never went anywhere, header search was a dead end everywhere except the homepage
   * hero. It now hands off to the catalog's own ?q= filter (Catalog.jsx already reads it).
   */
  if (isHeader) {
    return (
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          if (value.trim()) navigate(`/catalog?q=${encodeURIComponent(value.trim())}`);
        }}
        className="relative w-full"
      >
        <SearchIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
        <input
          type="search"
          inputMode="search"
          autoComplete="off"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label="Search items or paste your supply list"
          placeholder="Search items or paste your list"
          className="w-full h-11 rounded-full border border-hairline bg-white pl-11 pr-4 text-[14px] text-ink
                     placeholder:text-ink/70 outline-none
                     transition-colors duration-text ease-ref
                     focus:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary/30"
        />
      </form>
    );
  }

  return (
    <div className={isHero ? 'w-full max-w-xl' : 'w-full max-w-md'}>
      <div className="flex items-center gap-1.5 mb-2.5">
        <button
          type="button"
          onClick={() => setMode('single')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${mode === 'single' ? 'bg-brand-primary text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
        >
          Ask about one item
        </button>
        <button
          type="button"
          onClick={() => setMode('list')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 ${mode === 'list' ? 'bg-brand-primary text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
        >
          <ListIcon className="w-3.5 h-3.5" /> Paste a supply list
        </button>
      </div>

      <div className="relative">
        {mode === 'single' ? (
          <>
            <SearchIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              inputMode="search"
              autoComplete="off"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="What are you looking for?"
              className="w-full rounded-2xl border-0 bg-white pl-12 pr-4 py-4 text-sm sm:text-base shadow-lg focus:ring-4 focus:ring-brand-accent/40 outline-none"
            />
          </>
        ) : (
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={'Paste or type your list, one item per line —\nCamlin geometry box x2\nA4 chart paper x10\nSketch pens'}
            rows={4}
            className="w-full rounded-2xl border-0 bg-white px-4 py-4 text-sm shadow-lg focus:ring-4 focus:ring-brand-accent/40 outline-none resize-none"
          />
        )}
      </div>

      {!value.trim() && (
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => setValue(ex)}
              className="text-[11px] font-medium text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full px-2.5 py-1 transition-colors"
            >
              {ex}
            </button>
          ))}
        </div>
      )}

      {mode === 'single' ? <SingleMatch query={value} /> : <ListMatch text={value} />}

      {mode === 'list' && value.trim() && (
        <p className="mt-2 text-[11px] text-white/60 px-1">
          Have a photo or PDF instead? Skip the typing — attach it straight in{' '}
          <a href={`https://wa.me/${STORE.whatsapp}`} target="_blank" rel="noreferrer" className="underline">WhatsApp</a>.
        </p>
      )}
    </div>
  );
}
