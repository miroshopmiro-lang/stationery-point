#!/usr/bin/env node
/*
 * POST-BUILD: write a real HTML file for each local landing page.
 *
 * Why: the site is a single-page app with a catch-all redirect, so every new URL would
 * otherwise serve the same empty index.html. Google can run JavaScript, but a per-URL file
 * with its own title, description, canonical, structured data and readable content is the
 * dependable way to get a page indexed for its own search. Cloudflare Pages serves a real
 * file before it applies the redirect, so dist/<slug>.html wins.
 *
 * The content comes from src/data/landingPages.js (same source the React page uses) and the
 * product names from the real catalogue JSON. React replaces the static markup when it mounts.
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const { landingPages, selectProducts, NAP, SITE_URL } = await import(
  pathToFileURL(join(root, 'src', 'data', 'landingPages.js')).href
);

if (!existsSync(join(dist, 'index.html'))) {
  console.error('prerender-landing: dist/index.html not found. Run vite build first.');
  process.exit(1);
}
const shell = readFileSync(join(dist, 'index.html'), 'utf8');

const categories = JSON.parse(readFileSync(join(root, 'src', 'data', 'categories.json'), 'utf8')).items;
const catTitle = new Map(categories.map((c) => [c.id, c.title]));
const dataDir = join(root, 'src', 'data', 'products');
const products = readdirSync(dataDir)
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(readFileSync(join(dataDir, f), 'utf8')))
  .filter((p) => !p.placeholder)
  .map((p) => ({ ...p, categoryLabel: catTitle.get(p.category) ?? '' }))
  .sort((a, b) => (a.id ?? 9999) - (b.id ?? 9999));

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function bodyHtml(page) {
  const picks = selectProducts(products, page.products);
  const others = page.related.map((s) => landingPages.find((p) => p.slug === s)).filter(Boolean);
  return `
<div style="max-width:960px;margin:0 auto;padding:24px 16px;font-family:Poppins,system-ui,sans-serif;color:#1c1a3a">
  <p><a href="/">Home</a> / ${esc(page.navLabel)}</p>
  <h1>${esc(page.h1)}</h1>
  <p>${esc(page.lead)}</p>
  ${page.sections
    .map((s) => `<section><h2>${esc(s.h2)}</h2>${s.body.map((b) => `<p>${esc(b)}</p>`).join('')}</section>`)
    .join('\n  ')}
  ${picks.length ? `<section><h2>From the catalogue</h2><ul>${picks.map((p) => `<li>${esc(p.name)}</li>`).join('')}</ul><p><a href="${esc(page.catalogLink.to)}">${esc(page.catalogLink.label)}</a></p></section>` : `<p><a href="${esc(page.catalogLink.to)}">${esc(page.catalogLink.label)}</a></p>`}
  <section><h2>Common questions</h2>${page.faqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}</section>
  <section><h2>Visit the shop</h2>
    <p>${esc(NAP.name)}<br>${esc(NAP.address)}<br>${esc(NAP.landmark)}</p>
    <p>${esc(NAP.hours)}</p>
    <p>Phone: <a href="tel:${esc(NAP.phoneTel)}">${esc(NAP.phoneDisplay)}</a></p>
  </section>
  <p>${others.map((o) => `<a href="/${o.slug}">${esc(o.navLabel)}</a>`).join(' · ')} · <a href="/catalog">Full catalogue</a></p>
</div>`;
}

function jsonLd(page) {
  const url = `${SITE_URL}/${page.slug}`;
  return JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${url}#page`,
          url,
          name: page.title,
          description: page.description,
          isPartOf: { '@type': 'WebSite', url: `${SITE_URL}/`, name: NAP.name },
          about: { '@id': `${SITE_URL}/#store` },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: page.navLabel, item: url },
          ],
        },
      ],
    },
    null,
    2
  );
}

let written = 0;
for (const page of landingPages) {
  const url = `${SITE_URL}/${page.slug}`;
  let html = shell;
  const swap = (re, to) => {
    if (!re.test(html)) throw new Error(`prerender-landing: pattern not found for ${page.slug}: ${re}`);
    html = html.replace(re, () => to);
  };
  swap(/<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`);
  swap(/<meta name="description"[^>]*>/, `<meta name="description" content="${esc(page.description)}" />`);
  swap(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`);
  swap(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(page.title)}" />`);
  swap(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(page.description)}" />`);
  swap(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${esc(page.title)}" />`);
  swap(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${esc(page.description)}" />`);
  swap(/<div id="root"><\/div>/, `<div id="root">${bodyHtml(page)}</div>`);
  // Page-specific structured data goes next to the shop's own Store block.
  swap(/<\/head>/, `<script type="application/ld+json">\n${jsonLd(page)}\n</script>\n</head>`);

  // <slug>.html, not <slug>/index.html: Pages serves /<slug> from it with a 200. A folder
  // index makes /<slug> 308 to /<slug>/, so the canonical and sitemap URL would be a redirect.
  writeFileSync(join(dist, `${page.slug}.html`), html);
  written += 1;
}
console.log(`prerender-landing: wrote ${written} landing pages to dist/`);

// The app's other routes get their own shell too. Without one, /catalog, /about and /contact
// serve index.html with the homepage canonical, and Google folds them into the homepage.
const routes = [
  {
    path: 'catalog',
    title: 'Stationery Catalogue | Stationery Point, Vyttila, Kochi',
    description: 'Browse notebooks, pens, art and craft supplies, office and school stationery at Stationery Point, Vyttila, Kochi. Priced below MRP. Enquire on WhatsApp.',
  },
  {
    path: 'about',
    title: 'About Stationery Point | Stationery Shop in Vyttila, Kochi',
    description: 'Stationery Point is a stationery, art and craft shop at Katti Tower, Janatha Junction, Vyttila, Kochi, selling below MRP to shoppers, schools and offices.',
  },
  {
    path: 'contact',
    title: 'Contact and Directions | Stationery Point, Vyttila, Kochi',
    description: 'Visit Stationery Point at Ground Floor, Katti Tower, Jr Janatha Rd, Vyttila, Kochi, or message us on WhatsApp for prices and bulk orders.',
  },
  { path: 'privacy', title: 'Privacy Policy | Stationery Point', description: 'How Stationery Point handles the details you send through this website.' },
  { path: 'terms', title: 'Terms | Stationery Point', description: 'Terms of use for the Stationery Point website: enquiries, prices and stock, and delivery.' },
];
for (const r of routes) {
  const url = `${SITE_URL}/${r.path}`;
  let html = shell;
  const swap = (re, to) => {
    if (!re.test(html)) throw new Error(`prerender-landing: pattern not found for ${r.path}: ${re}`);
    html = html.replace(re, () => to);
  };
  swap(/<title>[\s\S]*?<\/title>/, `<title>${esc(r.title)}</title>`);
  swap(/<meta name="description"[^>]*>/, `<meta name="description" content="${esc(r.description)}" />`);
  swap(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`);
  swap(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(r.title)}" />`);
  swap(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(r.description)}" />`);
  swap(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${esc(r.title)}" />`);
  swap(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${esc(r.description)}" />`);
  writeFileSync(join(dist, `${r.path}.html`), html);
}
console.log(`prerender-landing: wrote ${routes.length} route shells to dist/`);
