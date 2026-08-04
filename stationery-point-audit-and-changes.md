# Stationery Point — Website Audit & Change Specification

**Site:** https://stationery-point.pages.dev/
**Client reference site:** jagsindia.com
**Benchmarks studied:** Jags India (client's pick), William Penn (williampenn.net — India's biggest premium stationery retailer), plus standard local-retail patterns.
**Prepared for:** Abhinand
**Date:** 13 July 2026

---

## 1. Decoding the client's feedback

The client wrote five things. Here's what each one actually means and how to close it:

| # | Client's words | What they actually want | Effort |
|---|---|---|---|
| 1 | "add one more head new arrivals — it can be scroll" | A **New Arrivals** section in the nav + a horizontally scrolling product carousel on the homepage | Low |
| 2 | "change our colour pattern, our pattern is as same as hdfc blue... seen in our round board" | Rebrand the site from the current **purple (#5D2D8F)** to the **deep blue of their physical round signboard** (HDFC-style navy blue). The site must match the shop's real-world branding | Low–Med |
| 3 | "In map please pin stationery point, now coming as kattitower" | The embedded Google Map resolves to the **building (Katti Tower)**, not the business. Fix the pin + probably fix/claim their Google Business Profile | Low (embed) / Med (GBP) |
| 4 | "add more products on same category, then only the customer can choose" | Deeper catalog — multiple products **per category**, not one hero item per category. They want customers to browse and compare like on jagsindia.com | Medium |
| 5 | "Hope we can edit and update this site" | **Self-service editing.** They don't want to call you for every price/product change. Needs a lightweight CMS or data-file-driven catalog | Medium |

---

## 2. What Jags India does that the client is pointing at

Jags India is a Mumbai art/craft & stationery wholesaler-retailer supplying 7,000+ craft stores. Its site is a full catalog experience. The parts that matter for Stationery Point:

- **"New Arrival" is a first-class nav item**, not buried inside categories. This is exactly what the client asked for in point 1.
- **Category → product-grid structure**: Art & Craft, Corporate & Office Stationery, Return Gift & More, Special Edition. Each category holds many SKUs, which is what "customer can choose" means.
- **WhatsApp Channel** link in the nav — Stationery Point already runs on WhatsApp enquiries, so this maps perfectly. Consider a "Join our WhatsApp channel" CTA alongside the existing enquiry button.
- **Nearby Dealers / store locator** — for a single shop this becomes a strong "Visit Us" block with a correct map pin (point 3).
- **Blogs** — optional, but even 3–4 posts ("Best school-supply checklist Kochi 2026") is cheap local SEO.

**Don't copy from Jags:** full e-commerce with accounts, checkout, shipping/refund policy pages. Stationery Point is a walk-in + WhatsApp business. Building cart/checkout would add cost and maintenance with no payoff. The right model is **catalog + WhatsApp enquiry per product** ("Ask price on WhatsApp" button that pre-fills the product name in the message).

**From William Penn (worth borrowing at small scale):**
- Product cards with clean photography on plain backgrounds, brand names visible (Classmate, Camlin, Faber-Castell, Doms etc.) — brand logos build instant trust for a supplies shop.
- A "corporate/bulk orders" or "school bulk orders" section — schools and offices are the highest-value stationery customers, and one extra section can capture them.
- Offers/loyalty messaging — Stationery Point's "below MRP" promise is its strongest hook; it should be visually loud, e.g. a strike-through MRP vs. our-price on every product card.

---

## 3. Change specification (hand this to yourself as the build list)

### 3.1 New Arrivals section (client point 1)
- Add **"New Arrivals"** to the main nav, anchoring to a homepage section placed directly under the hero.
- Layout: horizontal scroll-snap carousel (`display:flex; overflow-x:auto; scroll-snap-type:x mandatory`), swipeable on mobile, arrow buttons on desktop. No JS library needed.
- Card contents: photo, product name, brand, MRP struck through, Stationery Point price, "NEW" badge, WhatsApp enquiry button with pre-filled text:
  `https://wa.me/91XXXXXXXXXX?text=Hi, I'm interested in {Product Name}`
- Data-driven: cards render from the same products data file as the catalog (see 3.4), filtered by `"newArrival": true` — so the client can add arrivals without touching layout code.

### 3.2 Color rebrand to signboard blue (client point 2)
- Ask the client for a **photo of the round signboard** and pick the exact blue from it (don't guess). It will land near HDFC navy — roughly `#004C8F`.
- Suggested token set (tune to the board photo):
  - `--brand-primary: #004C8F` (deep signboard blue — headers, nav, buttons)
  - `--brand-dark: #003263` (footer, hover states)
  - `--brand-accent: #ED232A` or a warm yellow `#FFC20E` (only if the board has a second color; HDFC-style boards often pair navy with red)
  - `--surface: #F5F8FC` (cool off-white sections)
  - Keep WhatsApp green **only** on WhatsApp buttons so it stays recognizable.
- Sweep every purple usage: `theme-color` meta (currently `#5D2D8F`), OG assets, favicons, gradients, link colors, button states. A find-replace on the old hex values plus a visual pass.
- Update the OG image / storefront card if it carries purple branding.

### 3.3 Map pin fix (client point 3)
Two layers to this:
1. **Quick fix (site):** the current iframe is geocoding the address and snapping to "Katti Tower." Replace it with a place-specific embed: search **"Stationery Point"** in Google Maps → Share → Embed a map. If the business appears in Maps, the embed will carry its name, photo, rating and "Directions" — far more convincing than a bare pin.
2. **Root fix (Google Business Profile):** if searching "Stationery Point" in that location shows nothing or shows Katti Tower's photo, the client's GBP is unclaimed or badly filled. Walk them through: claim/create the profile at business.google.com → set name "Stationery Point" → correct category ("Stationery store") → upload storefront photos (replacing the Katti Tower building image that currently appears) → verify. This also directly feeds point-of-sale local SEO ("stationery shop near me").
3. Add **LocalBusiness JSON-LD** (name, address, geo, opening hours, phone, priceRange) to the homepage so Google associates the site with the profile.

### 3.4 Deeper catalog per category (client point 4)
- Restructure from "category with a face product" to **category → grid of 6–12 products each**, Jags-style. Suggested categories for a Kochi shop: Notebooks & Paper, Pens & Writing, Art & Craft Materials, Office Supplies, School Supplies, Gifts & Misc.
- Keep it a **single data file** (`products.json` or a folder of markdown files) with fields: `name, brand, category, mrp, ourPrice, image, newArrival, inStock`. Layout code renders whatever is in the file.
- Every product card gets the strike-through MRP treatment — this is the shop's differentiator and should repeat on every card, not just in the hero copy.
- Photography rule: shoot products on one consistent plain background (a sheet of white chart paper works) so the grid looks like a store, not a collage. Phone camera is fine; consistency matters more than quality.
- Category pages can be anchors/tabs on one page for now; split into separate pages only when the catalog passes ~50 items (better for SEO at that point).

### 3.5 Client editability (client point 5)
Options in order of practicality on Cloudflare Pages:
1. **Decap CMS (free, static, GitHub-backed)** — gives the client a simple admin panel at `/admin` where they edit products/prices/photos as forms; each save commits to the repo and Cloudflare auto-deploys. Best fit: no server, no cost, you keep code control.
2. **Google Sheet as catalog** — client edits a sheet; a small build script (or client-side fetch of the published-CSV) renders products. Lowest friction for the client, but fragile formatting and no image management.
3. **Move to a hosted builder** (Wix/Shopify) — only if they later want real e-commerce. Overkill today.

Recommendation: **Decap CMS + products.json**. Solves points 1, 4 and 5 with one architecture.

### 3.6 Additions the client didn't ask for but will notice (authenticity/trust)
- **Google reviews strip** — pull 3–4 real reviews (once GBP is fixed) with names. Local shops live on this.
- **Storefront + interior photos** in an About/Visit section — proves it's a real shop; pairs with the map fix.
- **Opening hours + phone number** visible in header/footer, `tel:` and `wa.me` links tap-to-act on mobile.
- **Offers banner** ("Everything below MRP", school-season sale) — thin ribbon above the nav; editable via CMS.
- **Bulk/school orders section** — one short block + WhatsApp CTA targeting schools, offices, tuition centres.
- SEO hygiene: one `h1`, per-section headings, `alt` text on every product image, sitemap.xml, and the LocalBusiness schema from 3.3.

### 3.7 Suggested priority order
1. Map pin + GBP fix (fastest win, client's most emotional complaint)
2. Color rebrand to signboard blue
3. New Arrivals carousel
4. Catalog restructure to products.json + expanded grids
5. Decap CMS on top of the same data
6. Trust extras (reviews, photos, bulk-order section, schema)

---

## 4. Reply you can send the client (optional draft)

> Thank you for the feedback! Here's the plan: (1) I'll fix the map so it pins "Stationery Point" with your shop photo — I'll also help you claim your Google Business listing so customers searching nearby find you. (2) The site colours will be matched to your round board's blue — please send me a clear photo of the board. (3) A scrolling "New Arrivals" section is being added at the top. (4) Each category will now show many products with MRP vs. your price, like jagsindia.com. (5) I'm adding an admin panel so your team can add products and change prices yourselves. To do #4 well, please send product photos on a plain background with name, brand, MRP and your price for each item.
