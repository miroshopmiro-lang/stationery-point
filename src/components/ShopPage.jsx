import React, { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { STORE } from '../lib/utils';
import { areaBySlug, directionsUrl } from '../data/areaPages';
import { landingBySlug, selectProducts, SITE_URL } from '../data/landingPages';
import { products } from '../data/productData';
import CollectionCards from './CollectionCards';
import ProductCard from './ProductCard';
import DiariesRail from './DiariesRail';
import NewInRail from './NewInRail';
import SendListSection from './SendListSection';
import Testimonials from './Testimonials';
import VisitShop from './VisitShop';
import { WhatsAppIcon } from './icons';

// One layout for every page people land on from Google (4 Nov 2026): the area pages
// (src/data/areaPages.js) and the guide pages (src/data/landingPages.js). Built from the
// homepage's own sections so a visitor sees the shop first: real shop photos up top, product
// tiles and rails, the send-your-list block, reviews and the shopfront. The old text-only
// template made the wholesale page read like an article; do not go back to it.
export default function ShopPage({ page }) {
  useEffect(() => {
    if (!page) return undefined;
    const prevTitle = document.title;
    const desc = document.querySelector('meta[name="description"]');
    const prevDesc = desc ? desc.getAttribute('content') : null;
    const canon = document.querySelector('link[rel="canonical"]');
    const prevCanon = canon ? canon.getAttribute('href') : null;
    document.title = page.title;
    if (desc) desc.setAttribute('content', page.description);
    if (canon) canon.setAttribute('href', `${SITE_URL}/${page.slug}`);
    return () => {
      document.title = prevTitle;
      if (desc && prevDesc !== null) desc.setAttribute('content', prevDesc);
      if (canon && prevCanon !== null) canon.setAttribute('href', prevCanon);
    };
  }, [page]);

  if (!page) return <Navigate to="/" replace />;

  const waHref = `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(page.waMessage)}`;
  const isArea = Boolean(page.area);
  const linkFor = (s) => areaBySlug[s] || landingBySlug[s];
  const nearby = [...(page.related || []), ...(page.landingLinks || [])]
    .map(linkFor)
    .filter(Boolean)
    .map((p) => ({ slug: p.slug, label: p.navLabel }));
  const picks = isArea ? [] : selectProducts(products, page.products);

  return (
    <div>
      {/* Hero: the real shop, not generated art. */}
      <section className="bg-brand-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-14 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="min-w-0">
            <nav aria-label="Breadcrumb" className="text-xs text-white/50 mb-4">
              <Link to="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <span>{page.navLabel}</span>
            </nav>
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-accent block mb-2">
              {page.eyebrow}
            </span>
            <h1 className="text-[28px] sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] text-balance">
              {page.h1}
            </h1>
            <p className="mt-4 text-white/75 text-[15px] sm:text-lg leading-relaxed max-w-xl">{page.lead}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-[#25D366] hover:bg-[#3DE07D] text-[#053D1E] font-bold text-sm border border-white/60"
              >
                <WhatsAppIcon className="w-5 h-5" /> Send your list
              </a>
              {isArea ? (
                <a
                  href={directionsUrl(page.directionsFrom)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center h-11 px-5 rounded-full border border-white/40 text-white font-semibold text-sm hover:bg-white hover:text-brand-dark"
                >
                  Directions from {page.area}
                </a>
              ) : (
                <Link
                  to={page.catalogLink.to}
                  className="inline-flex items-center h-11 px-5 rounded-full border border-white/40 text-white font-semibold text-sm hover:bg-white hover:text-brand-dark"
                >
                  {page.catalogLink.label}
                </Link>
              )}
            </div>
            <p className="mt-5 text-sm text-white/60">
              <span className="text-brand-accent font-bold">★ {STORE.rating}</span> from {STORE.reviewCount} Google reviews
              <span className="mx-2">·</span>{STORE.landmark}
            </p>
          </div>

          <div className="grid grid-cols-3 grid-rows-2 gap-2 sm:gap-3 aspect-[4/3] min-w-0">
            <img src="/gallery_1.webp" alt="Stationery Point signboard and shop window, Janatha Junction, Vyttila" width={800} height={800} className="col-span-2 row-span-2 w-full h-full object-cover rounded" />
            <img src="/gallery_2.webp" alt="Shelves of notebooks, files and paper inside the shop" width={800} height={800} loading="lazy" className="w-full h-full object-cover rounded" />
            <img src="/gallery_5.webp" alt="Parker and premium pen counter" width={800} height={800} loading="lazy" className="w-full h-full object-cover rounded" />
          </div>
        </div>
      </section>

      <CollectionCards ids={page.collections} heading={page.tilesHeading || 'What people come in for'} />

      {isArea && (page.rail === 'diaries' ? <DiariesRail /> : <NewInRail />)}

      {picks.length > 0 && (
        <section className="py-8 lg:py-14 bg-white" aria-labelledby="sp-products">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 id="sp-products" className="font-bold tracking-tight text-ink text-[20px] leading-[1.2] lg:text-[28px] mb-5">
              From the shop
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
              {picks.map((p) => (
                <ProductCard key={p.id ?? p.name} product={p} />
              ))}
            </div>
            <Link to={page.catalogLink.to} className="inline-block mt-6 text-sm font-semibold underline underline-offset-4 text-brand-primary">
              {page.catalogLink.label} &rarr;
            </Link>
          </div>
        </section>
      )}

      {!isArea && page.sections?.length > 0 && (
        <section className="py-10 sm:py-14 bg-brand-soft">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid gap-3 sm:gap-5 md:grid-cols-3">
            {page.sections.map((sec) => (
              <div key={sec.h2} className="rounded-lg bg-white p-5 sm:p-6 min-w-0">
                <h2 className="font-bold text-ink text-lg leading-snug mb-2">{sec.h2}</h2>
                {sec.body.map((para) => (
                  <p key={para} className="text-[15px] text-gray-700 leading-relaxed mt-2 first:mt-0">{para}</p>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}

      <SendListSection />
      <Testimonials />

      <section className="py-10 sm:py-14 bg-white" aria-labelledby="area-faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 id="area-faq" className="font-bold tracking-tight text-ink text-[20px] lg:text-[28px] mb-4">
            {isArea ? `Questions from ${page.area}` : 'Common questions'}
          </h2>
          <div className="divide-y divide-gray-200 border-y border-gray-200">
            {page.faqs.map((f) => (
              <details key={f.q} className="py-3 group">
                <summary className="cursor-pointer font-semibold list-none flex justify-between gap-4">
                  {f.q}
                  <span aria-hidden="true" className="text-gray-400 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-2 text-gray-700 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
          {nearby.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-2">
              {nearby.map((n) => (
                <li key={n.slug}>
                  <Link to={`/${n.slug}`} className="inline-block rounded-full border border-gray-300 px-4 py-2 text-sm hover:border-brand-primary">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <VisitShop />
    </div>
  );
}

