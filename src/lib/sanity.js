// Read-only Sanity client for products Sam adds from /admin. Keep in step with studio/project.js.
// No SDK: one GET to the live API (not apicdn: its cache kept deleted products showing for
// up to a minute, 25 Sep). A local shop's traffic is far inside the free API quota. Drafts never come back from an unauthenticated
// read, so only products Sam has pressed Publish on reach the site.
export const SANITY_PROJECT_ID = 'j95yhvco';
export const SANITY_DATASET = 'production';

export const sanityConfigured = !/^REPLACE/.test(SANITY_PROJECT_ID);

// One request for both: Sam's products, and the homepage "New In" list (null until he has
// published it once; the site then keeps its built-in New In set).
const QUERY = `{
  "products": *[_type == "product" && defined(name) && defined(category)] | order(_createdAt desc){
    _id, _createdAt, name, brand, category, unit, mrp, ourPrice, newArrival,
    "image": image.asset->url
  },
  "newIn": *[_id == "newIn"][0].items[]{ _type, product, _ref }
}`;

// Card is a square at up to ~320 CSS px; 800 covers a 2x phone and auto=format serves WebP/AVIF.
const imageUrl = (url) => (url ? `${url}?w=800&h=800&fit=max&auto=format` : '');

// Returns { products, newIn }. newIn is an ordered list of product ids ("code-<id>" for
// products in src/data/products, "sanity-<_id>" for Sam's), or null if never published.
export async function fetchSanityProducts({ signal } = {}) {
  if (!sanityConfigured) return { products: [], newIn: null };
  const url =
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v2025-02-19/data/query/${SANITY_DATASET}` +
    `?query=${encodeURIComponent(QUERY)}`;
  const res = await fetch(url, { signal, cache: 'no-store' });
  if (!res.ok) throw new Error(`Sanity ${res.status}`);
  const { result } = await res.json();
  const newIn = Array.isArray(result?.newIn)
    ? result.newIn
        .map((i) => (i._type === 'shopItem' ? i.product : i._ref ? `sanity-${i._ref}` : null))
        .filter(Boolean)
    : null;
  const products = (result?.products || []).map((d) => ({
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
  return { products, newIn };
}
