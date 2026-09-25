// Read-only Sanity client for products Sam adds from /admin. Keep in step with studio/project.js.
// No SDK: one GET to the live API (not apicdn: its cache kept deleted products showing for
// up to a minute, 25 Sep). A local shop's traffic is far inside the free API quota. Drafts never come back from an unauthenticated
// read, so only products Sam has pressed Publish on reach the site.
export const SANITY_PROJECT_ID = 'j95yhvco';
export const SANITY_DATASET = 'production';

export const sanityConfigured = !/^REPLACE/.test(SANITY_PROJECT_ID);

const QUERY = `*[_type == "product" && defined(name) && defined(category)] | order(_createdAt desc){
  _id, _createdAt, name, brand, category, unit, mrp, ourPrice, newArrival,
  "image": image.asset->url
}`;

// Card is a square at up to ~320 CSS px; 800 covers a 2x phone and auto=format serves WebP/AVIF.
const imageUrl = (url) => (url ? `${url}?w=800&h=800&fit=max&auto=format` : '');

export async function fetchSanityProducts({ signal } = {}) {
  if (!sanityConfigured) return [];
  const url =
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v2025-02-19/data/query/${SANITY_DATASET}` +
    `?query=${encodeURIComponent(QUERY)}`;
  const res = await fetch(url, { signal, cache: 'no-store' });
  if (!res.ok) throw new Error(`Sanity ${res.status}`);
  const { result } = await res.json();
  return (result || []).map((d) => ({
    id: `sanity-${d._id}`,
    name: d.name.trim(),
    brand: d.brand || '',
    category: d.category,
    unit: d.unit || '',
    image: imageUrl(d.image),
    newArrival: d.newArrival !== false,
    ...(d.mrp && d.ourPrice && d.ourPrice < d.mrp ? { mrp: d.mrp, ourPrice: d.ourPrice } : {}),
    source: 'sanity',
    createdAt: d._createdAt,
  }));
}
