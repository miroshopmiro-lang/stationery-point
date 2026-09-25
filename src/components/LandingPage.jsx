import React, { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { STORE } from '../lib/utils';
import { products } from '../data/productData';
import { landingBySlug, landingPages, selectProducts, SITE_URL } from '../data/landingPages';
import ProductCard from './ProductCard';
import { PhoneIcon, WhatsAppIcon } from './icons';

// One local landing page per real search. Content lives in src/data/landingPages.js and is
// also written to a static HTML file per URL at build time (tools/prerender-landing.mjs),
// so Google reads the page without having to run the app.
export default function LandingPage({ slug }) {
  const page = landingBySlug[slug];

  // Keep the tab title and description right when moving between pages inside the app.
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

  if (!page) return <Navigate to="/catalog" replace />;

  const picks = selectProducts(products, page.products);
  const waHref = `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(page.waMessage)}`;
  const others = page.related.map((s) => landingBySlug[s]).filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
      <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-brand-primary">Home</Link>
        <span className="mx-2">/</span>
        <span>{page.navLabel}</span>
      </nav>

      <header className="max-w-3xl mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">{page.h1}</h1>
        <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">{page.lead}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={waHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-[#25D366] hover:bg-[#3DE07D] text-[#053D1E] font-bold text-sm border border-white/60"
          >
            <WhatsAppIcon className="w-5 h-5" /> Ask on WhatsApp
          </a>
          <a
            href={`tel:${STORE.phoneTel}`}
            className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-gray-300 text-sm font-semibold hover:border-brand-primary"
          >
            <PhoneIcon className="w-4 h-4" /> {STORE.phoneDisplay}
          </a>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {page.sections.map((s) => (
            <section key={s.h2}>
              <h2 className="text-xl sm:text-2xl font-bold mb-3">{s.h2}</h2>
              {s.body.map((para) => (
                <p key={para} className="text-gray-700 leading-relaxed mb-3">{para}</p>
              ))}
            </section>
          ))}
        </div>

        <aside className="rounded-2xl border border-gray-200 bg-white p-5 h-fit">
          <h2 className="text-lg font-bold mb-3">Visit the shop</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{STORE.name}</p>
          <p className="text-sm text-gray-700 leading-relaxed">{STORE.address}</p>
          <p className="text-sm font-semibold text-brand-primary mt-1">{STORE.landmark}</p>
          <p className="text-sm text-gray-700 mt-3">{STORE.hours}</p>
          <p className="text-sm text-gray-700 mt-1">{STORE.rating} stars from {STORE.reviewCount} Google reviews</p>
          <a href={STORE.mapsLink} target="_blank" rel="noreferrer" className="inline-block mt-3 text-sm underline underline-offset-4 text-brand-primary">
            Open in Google Maps
          </a>
        </aside>
      </div>

      {picks.length > 0 && (
        <section className="mt-12" aria-labelledby="lp-products">
          <h2 id="lp-products" className="text-xl sm:text-2xl font-bold mb-5">From the catalogue</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {picks.map((p) => (
              <ProductCard key={p.id ?? p.name} product={p} />
            ))}
          </div>
          <Link to={page.catalogLink.to} className="inline-block mt-6 text-sm font-semibold underline underline-offset-4 text-brand-primary">
            {page.catalogLink.label} &rarr;
          </Link>
        </section>
      )}
      {picks.length === 0 && (
        <Link to={page.catalogLink.to} className="inline-block mt-10 text-sm font-semibold underline underline-offset-4 text-brand-primary">
          {page.catalogLink.label} &rarr;
        </Link>
      )}

      <section className="mt-12 max-w-3xl" aria-labelledby="lp-faq">
        <h2 id="lp-faq" className="text-xl sm:text-2xl font-bold mb-4">Common questions</h2>
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
      </section>

      <section className="mt-12" aria-labelledby="lp-map">
        <h2 id="lp-map" className="text-xl sm:text-2xl font-bold mb-4">Find us in Vyttila</h2>
        <div className="rounded-2xl overflow-hidden border border-gray-200">
          <iframe
            title="Stationery Point on Google Maps"
            src={STORE.mapsEmbed}
            loading="lazy"
            className="w-full h-72 sm:h-96 border-0"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {others.length > 0 && (
        <section className="mt-12" aria-labelledby="lp-more">
          <h2 id="lp-more" className="text-lg font-bold mb-3">More from Stationery Point</h2>
          <ul className="flex flex-wrap gap-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link to={`/${o.slug}`} className="inline-block rounded-full border border-gray-300 px-4 py-2 text-sm hover:border-brand-primary">
                  {o.navLabel}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/catalog" className="inline-block rounded-full border border-gray-300 px-4 py-2 text-sm hover:border-brand-primary">
                Full catalogue
              </Link>
            </li>
          </ul>
        </section>
      )}
    </div>
  );
}

export const landingRoutes = landingPages.map((p) => ({ path: `/${p.slug}`, slug: p.slug }));
