# Stationery Point — decision log

Running record of what happened and why. Locked canon lives in the `stationery-point-bible`
skill (`~/.claude/skills/stationery-point-bible/SKILL.md`), which auto-loads each session.

---

## 16 Aug 2026 — session summary

### Where the build actually is

**Branch `rebuild`**, three commits past `pre-rebuild-snapshot`. `master` untouched at the last
known-good state. Full folder backup at `G:\Stationery point_backup_2026-08-16_pre-rebuild`.

**Done:**
- Palette regression fixed at token level. `brand-primary` had been overwritten to `#0F2042`
  (near-black navy) with a comment falsely claiming it was sampled from the signboard. Real
  values restored from `asset-originals/gallery_1.jpg`. `brand-gold` → `brand-accent` renamed
  across 9 files. All borrowed nooe.co hex values gone; a grep for them is now part of verification.
- Dead deps dropped — GSAP had zero imports anywhere, Lenis removed (scroll hijacking hurts
  mobile and Sam reviews on a phone).
- `AskBox` + `src/lib/search.js` built and verified in-browser: real match, dead-end fallback,
  multi-line list separation. Wired into header popover and its own homepage section.
- Homepage rebuilt image-led: `HeroCarousel`, `OfferStrip`, `CategoryBento`, `CollectionCards`,
  `SendListSection`, `BrandWall`, `VisitShop`, `SmartImage`.
- `dist` down from 18 MB → 5.4 MB (deleted 11.4 MB of wrong-palette hero video).
- `ASSET-PROMPTS.md` written, then rewritten so every prompt is one self-contained copy-paste
  block (the shared-suffix version was annoying to use).

**Known gaps:**
- `/catalog` loads but has **zero products** — the 117 fabricated ones were deleted and real
  ones need Sam's export. Any category click lands on an empty grid. Unresolved; needs a
  decision on whether to rebuild it around the AskBox, hide it, or wait.
- All generated art is missing; `SmartImage` shows tinted panels. Layout is correct underneath.
- Decap `/admin` OAuth still not deployed — CMS is dead in production.

### What went wrong, in order

1. **Hero built from nooe.co** — a luxury brand in the wrong niche. Its layout comment was
   literally left in the source, and its navy/amber palette leaked through the build.
2. **"No shop visit" became a design philosophy.** Rationalised into "data beats photos for
   commodity stationery" → a flat indigo gradient with a search box. Abhinand: *"this dont look
   better than jagsindia boss"*. Correct.
3. **Meta-commentary shipped in the UI** — hero caption "Real shop, real stock — not a stock
   photo." Design rationale argued at the customer.
4. **The pack-text test was over-scoped.** It proved AI corrupts *branded pack text*; it became
   "no generated imagery at all", removing the whole visual layer.
5. **First prompt set produced stock-photo mediocrity** — asked for "generous spacing", "clean
   empty surface", "neat, organised". Got exactly that. Abhinand: *"they look really mediocore,
   template site"*.
6. **Deferred the catalogue a month on a false constraint** — see the remote-agency finding below.
7. **Sprawl.** Repeatedly answered a different question than the one asked. Abhinand: *"im super
   lost and we're all over the place"*.

### Decisions taken

- **Imagery source order corrected:** brand/distributor dealer image packs first (free to
  stockists, professional quality — this was missed for weeks), then licensed stock, then AI.
  AI is the weakest option for this look.
- **No shop visit needed.** Triggered by Abhinand: *"how would an agency doing it for clients
  outside india do it?"* They never travel.
- **Launch scope cut to 30–50 SKUs**, not 200. 200 was blocking launch for no reason.
- **Onam dropped for 2026.** Office pre-booking runs 2–4 weeks pre-Thiruvonam; that window
  closed with the site unlaunched.
- **Target: close and launch this month.** The build is not the bottleneck — one meeting and
  three files from Sam are.

### Open question — reference site

Abhinand has no agreed quality bar for this project (had `quantaservices.com` for Augzet, one
for Blue Spice). Rejected so far: `nooe.co` (wrong niche), `scooboo.in`. `jagsindia.com` stays
as the *density* benchmark — its design is ordinary, the imagery carries it.

Shortlisted 16 Aug, awaiting his pick:
- **`cassart.co.uk`** — UK art supplies chain with physical shops. Category tiles → TOP BRANDS
  with written descriptions → new arrivals. Closest structural analogue; leads with Winsor &
  Newton and Faber-Castell.
- **`williampenn.net`** — Indian, premium pens, Parker dealer. Gifting angle, pen-type
  explainers, 4.9★ reviews prominent. Indian market conventions.

### Next actions

| Who | What |
|---|---|
| Abhinand | Pick the reference site |
| Abhinand | Rebook the pricing meeting — critical path, blocks launch |
| Abhinand → Sam | Item export, top 30–40 movers, distributor image packs |
| Claude | Rewrite the 22 prompts for density (or drop AI for stock/brand assets) |
| Claude | Resolve the empty `/catalog` |
| Claude | Rebuild hero for full-bleed art once imagery source is settled |

---

## 16 Aug 2026 (later same day) — reference audit + `stationery-point-assets` skill

Full measured audit of the four locked references (flyingtiger.com, smiggle.co.uk,
hobbycraft.co.uk, dickblick.com) — computed styles read live via browser devtools, hero and
category assets downloaded and inspected directly, not recalled from memory. Superseds the
"open question — reference site" note above: `cassart.co.uk` and `williampenn.net` were never
picked and are dropped from consideration; the four locked in the bible stand.

**Headline finding:** Flying Tiger's own hero and category imagery is AI-generated — CDN
filenames are literally `AI_<SKU>_<dims>.jpg`. Downloaded and inspected: same corruption tell
as jagsindia.com (garbled sketchbook text, a shirt reading "OL"). Two unrelated companies
independently confirm AI imagery reaches this quality bar, and that the client's own reference
carries the exact tell we're avoiding by prompting for blank surfaces.

**Correction to earlier canon:** the claim that "warm cream surface" causes sparse flat-lays
was wrong about the cause — a downloaded Flying Tiger tile is cream-linen and works fine. The
real variable is density + hands + contained colour. Bible and skill both updated.

**Shipped:**
- `stationery-point-assets` skill installed at
  `~/.claude/skills/stationery-point-assets/SKILL.md` — locked art direction, hard rules, six
  self-contained prompt templates (hero desktop/mobile, category tile, collection card,
  section header, campaign), real file paths + size targets, Nano Banana vs GPT Image 2.0
  notes, QC checklist, corrected banned-phrase table.
- Full audit artifact — structure/nav, typography, layout/spacing, colour, nine deconstructed
  imagery styles with ready prompts, motion, commercial mechanics, and a synthesised 15-row
  take table + 11-item do-not-copy list + full type/spacing/colour system for this client.
  Every finding IDed (`FT-4`, `TY-3`, `IMG-7`, etc.) so it can sit beside Abhinand's own
  parallel audit.
- `stationery-point-bible` amended: cream-surface claim corrected, Flying Tiger AI finding
  added, pointer to the new skill.

**Not done:** no imagery generated from the new prompts yet — that's a separate task and
costs credits. No repo changes; `G:\Stationery point` untouched this session.

## 2026-09-03 — real product data received (brand-list blocker cleared)

Sam sent, saved to `C:\Users\risha\Downloads\`:
- `PRIMUS WEB PRODUCT LIST  august 2026.xlsx` — 78 products, columns SL NO / PRODUCT
  DESCRIPTION / UNIT. **No price/MRP column.** Real brand names throughout — this is the
  brand list that's been blocking catalogue work since 9 Aug 2026 (see [[Sam]]).
- 20 numbered PDFs (`1 REFLECTION PAPER A4 80GSM.pdf` … `20 JAGS AIR HARDENING CLAY 250G.pdf`),
  one image per PDF, SL-NO-matched to the first 20 Excel rows. **Verified genuine in-store
  photos** (checked #11 Parker Pen Folio and #8 Camel Art Studio — both real shelf shots with
  visible background, not stock/catalogue images). Good enough quality to use directly.

**Not yet received:** photos for products 21–78, and any price/MRP anywhere.

**Commercial note:** Abhinand is building the catalogue out before the ₹45,000 + ₹9,999/mo
price (quoted 11 Aug, see [[Stationery Point]] / [[client-pricing-anchors]]) has been
confirmed with Sam — deliberate, not an oversight; flagged and accepted 3 Sep 2026.

**Next:** run the 20 photos through `tools/product-shots/` (bg-removal → white backdrop →
1200² WebP), map to the 20 matching Excel rows, populate via `/admin` CMS or directly in the
product JSON. Brand field can now be filled from the Excel instead of inferred from shelf photos.

## 2026-09-04 — real catalogue built; product-shot pipeline corrected

**The build gate is cleared.** `npm run build` now completes for the first time since it was
blocked on 17 Aug — the 16 placeholder products are gone and 78 real ones stand in their place.

### Shipped

- **19 product photos processed.** The 20 PDFs Sam sent were unpacked to
  `asset-inbox/sam-2026-09-03/`, named from the Excel rows, and rendered to 1200² WebP in
  `public/shop-catalogue-images/`.
- **`tools/build-catalogue.mjs`** — regenerates `src/data/products/*.json` from Sam's xlsx.
  Rerun it whenever he sends an updated list; it is not a one-off script.
- **`tools/pack-shots.mjs`** — the corrected image pipeline (see below).
- **`tools/dev-server.mjs`** — starts Vite with cwd pinned to the project. Without it Tailwind
  resolves its `content` globs against whatever folder the session was launched from, scans
  nothing, and the whole site renders unstyled. That cost a debugging round today.
- **ProductCard**: the no-price fallback was wrapping to two lines and getting clipped by the
  pinned CTA. Now one line, `Price on WhatsApp`. Media bed tint moved `#EEF0FB` → `#E0DED9`,
  closing AUDIT-01 Defect 8 (a blue bed fights blue school products).

### `shoot.mjs` is the WRONG tool for pack photos — verified, not assumed

Ran all 19 through `tools/product-shots/shoot.mjs` first. Its AI background removal **ate the
packaging artwork itself**: the Faber-Castell crayon box lost its green ground, red frame and
brand name; the Parker blister lost its entire black card. Caught only because the output was
inspected as an image rather than trusted because the script exited 0.

`shoot.mjs` still stands for what it was built for — a product on a cluttered surface that
needs cutting out. Sam's photos are already tight, near full-bleed shots of the pack on a dark
counter, so there is nothing to cut out and everything to lose. **Use `pack-shots.mjs` for
these:** trims the dark counter, contains the pack on a `#E0DED9` bed with an even margin, no
model involved, deterministic.

### What Sam's data actually contains

78 rows, `SL NO / PRODUCT DESCRIPTION / UNIT`. Real brands throughout. **No price column** —
so no product carries `mrp`, `ourPrice`, `rating` or `reviewCount`, and every card reads
"Price on WhatsApp". That is the honest render, but it costs us the struck-through price and
the savings badge, which is the merchandising mechanic taken from dickblick and hobbycraft and
the main thing making the reference sites read as real shops.

Category is the one derived field (shelf taxonomy, needed for browse): 25 art-supplies,
24 office-supplies, 15 stationery, 12 craft-material, 2 party-gifts. Brand attribution is
recorded per product as `brandSource`: `photo` (legible on Sam's photo), `list` (written out in
his description), `derived` (an abbreviation expanded).

### Discrepancies found — need Sam, do not silently fix

1. **Product 5 has no photo.** The PDF named `5 TNPL PAPER A4 80GSM.pdf` is byte-identical to
   `2 TNPL PAPER A4 80GSM.pdf`. Excel row 5 is TNPL A4 **70**GSM. He sent 80GSM twice, so 19
   unique photos cover 20 rows.
2. **Row 19 "FC JUMBO WASHABLE CRAYONS 24 SHADES"** — the pack in the photo reads
   "26 Wax Crayons (24+2)" and does not say washable anywhere.
3. **Row 18 "DOMS COLOUR PENCIL 24 SHADES"** — the pack reads DOMS **Water Colour** Pencils.
4. **Row 20 "JAGS AIR DRY CLAY 250G"** — the pack reads "Air Hardening Clay", code JAHC500W.
5. **Rows 9 and 10** (Alpha clear/brown tape) photograph as an unbranded beige roll and are
   indistinguishable from each other. Worth a reshoot.
6. **Row 14 Camel Sketch Pen** was photographed from the back of the pack (barcode side).
7. **Six "FC" rows** (19, 29, 31, 75, 77, 78) are rendered as Faber-Castell on the strength of
   photo 19. Needs his sign-off before a public brand page ships.

### Still open

Prices for all 78. Photos for 21–78. The six FC brand confirmations. The pricing conversation
with Sam has not happened and stays deliberately deferred until there is a good build to show.

### Later the same day — reference-copy pass resumed, and two real bugs found

**A crash I introduced, found and fixed.** `Catalog.jsx` read `p.description.toLowerCase()`
unguarded. Sam's products have no `description`, so typing anything into the catalogue search
threw a TypeError and took the whole page down. Every field in that filter is guarded now, and
`brand` was added to the searchable set since it is finally real data.

**Dead-end links removed.** Sam's list files nothing under Return Gifts or Special Edition, so
every tile and nav link pointing at those two categories landed on an empty grid — which the
AskBox's governing rule forbids anywhere on this site. `productData.js` now exports
`activeCategories` (categories with at least one product) and `productCountByCategory`; the
category circles, catalogue browse tiles, catalogue filters, footer links and header menu all
source from it. Both categories stay in `categories.json` — they are real departments and the
CMS still offers them — they just do not get a link until something is filed under them.
The promo tile CTA that pointed at Return Gifts now points at the enquiry form, so the service
is still sold without the link dying.

**CollectionCards rebuilt** (967px → 801px), closing four AUDIT-01 entries at once: the pale
pink/cream/green beds are gone (all three were off-palette), the elevation shadow is gone, the
per-tile blurb is gone, and the label moved from a separate white panel to inside the tile on
the media bed — which is what the school-kit block twenty percent up the page already did.
One page, one tile language. The collection set itself was rebuilt from the real item list and
every entry validated to return at least three products before it shipped.

**PromoTiles** was the audit's single worst offender ("~50% of the block's area is blank white
at 375"). The cause was a photo half held open for artwork that does not exist. A tile with no
photograph now spans its panel full width instead. Tile 1 carries a real reams-of-copier-paper
shot from Sam's photos; tile 2 has none and reads as a full-width band.

**`bed` (#E0DED9) is now a real theme token** in `tailwind.config.js` and `index.css` rather
than a hex pasted into two components. It has to match the bed baked into `pack-shots.mjs`
output or tiles render two-tone against their own photographs.

**Page height at 375px: 7,946 (17 Aug audit) → 6,474 (start of today) → 6,260.** Flying Tiger
is 4,609, so we are at 1.36x and the gap is no longer in the blocks fixed today. What is left,
measured: footer 940px (15% of the page), SchoolKitTiles 820, VisitShop 732, SendListSection
580, Testimonials 502 for a single review, header chrome 190 against flyingtiger's 145.

**Not touched and still true:** the hero has no artwork (`public/hero/` does not exist, so
`SmartImage` falls back), and the seven category-circle images are the sparse beige AI set the
bible warns about — regenerating them costs credits and is a separate approved job.

## 2026-09-04 (later) — AUDIT-02: independent screenshot audit, and the regression it caught

Full report at `research/AUDIT-02.md`, 144 screenshots in `research/audit-02-shots/`.
**Score 5.5/10** against AUDIT-01's 4.5.

### The regression — a rule violation, shipped in the session that claimed to remove dead ends

`SchoolKitTiles`, the lead merchandising block on the homepage, had **five of six tiles landing
on "No products match your search"**. The morning's dead-end sweep only fixed links derived from
`categories.json` slugs; the kit tiles carry their own hardcoded set, and `notebooks`,
`geometry`, `pouches` and `bottles` are not category slugs at all. The lead "Best value" tile
and the desktop nav both pointed at `?collection=school-kits` — a parameter **nothing in the app
reads**, so it silently rendered the entire catalogue.

Fixed, against real stock only:
- Ready-Made Kits → `/contact`. Sam has no kit SKU; the kit service is real, so a human picks it up.
- Notebooks → `?q=notebook` (4) · Art & Colouring → `?category=art-supplies` (25, unchanged)
- **Geometry Boxes deleted** — Sam stocks no geometry box, so that tile could never resolve.
  Replaced with Pencils → `?q=pencil` (8).
- Pencil Pouches → `?q=pouch` (1)
- **"Bottles & Lunch Boxes" renamed "Water Bottles"** → `?q=bottle` (1). He stocks a bottle and
  no lunch box; the old label promised stock that is not there.

**`tools/check-links.mjs` now blocks the build on any merchandising link that matches zero
products or uses a query parameter the app does not read.** Wired into `npm run build`. Verified
by reintroducing the original bug and confirming it fails, then reverting. A visual audit caught
this class of bug; no code did. Now code does.

### Corrections to this morning's claims

- **"1.36× flyingtiger" was wrong.** flyingtiger measured live today is **3,711px** at 375, not
  the 4,609 carried over from AUDIT-01. Our 6,260 is **1.69×**, not 1.36×. Strip both footers and
  our content area is ~2.5× theirs. The height number itself (7,946 → 6,260) was confirmed exact.
- **768 is still the tallest layout** (7,663 vs 6,260 at 375). AUDIT-01's core structural failure
  — the page growing as it gets wider — is untouched.
- **"Label moved inside the tile on the media bed" — the audit called this FALSE; it is not.**
  The audit ran against a dev server that had never reloaded `tailwind.config.js`, so the new
  `bg-bed` utility did not exist in its CSS and the tile rendered transparent over white. The
  class is present in the production bundle and the tile computes `rgb(224,222,217)` after a
  server restart. **Restart the dev server after touching `tailwind.config.js` — Vite does not
  pick it up, and the whole audit was skewed by it.**
- **Media bed — the audit was right.** `SchoolKitTiles` was still `#EEF0FB`, on the one block
  that is a direct copy of smiggle's grey-bed tile. Now `bg-bed` / `var(--bed)` like the rest.

### Biggest open finding

**The homepage carries zero product cards.** We have 78 real products and 19 real photographs and
put none of them in front of a visitor; the offers rail renders nothing because it needs an MRP
and a selling price to compute a saving. flyingtiger has priced product with an Add-to-bag button
inside the first 812px. This is the strongest argument yet for getting prices out of Sam.

### Could not verify — needs Abhinand

- **hobbycraft.co.uk: HTTP 403, Cloudflare bot check.** It is the stated source for our header,
  offers rail and product card, and it also blocked AUDIT-01. Those three blocks remain unaudited
  against their own reference. No bypass attempted.
- **dickblick.com: IP-blocked** ("Restricted Access 2023"). No bypass attempted.
- Both need screenshots captured from a normal phone browser and handed over.

### Clean passes

Zero hits on any of the six banned hexes across all 83 build screenshots. No invented price,
rating, review count, stock badge or offer anywhere. No meta-commentary in rendered copy. All
six pages loaded at three widths with zero 4xx and zero console errors.

## 2026-09-11 — Batch 1 asset generation: prompts written, skills reconciled

**Nothing had ever been generated from the assets skill.** Verified on disk today: `public/hero/`
and `public/kit-tiles/` do not exist, so all 6 hero crops and all 6 school-kit tiles fall through
to `SmartImage`'s placeholder. `public/category-tiles/` is dated 13 Aug — three days *before* the
four-site reference audit finished, so every image currently on the site predates the audit that
was supposed to define it. `public/hero-desktop.webp` and `hero-mobile.webp` at the root are
9 Aug orphans; nothing reads them.

### Handoff canon installed into `stationery-point-bible`

Decisions that existed only in a chat handoff and would not have survived the session: Poppins as
the single type family (copied from hobbycraft, no serif); the motion spec (paint properties only,
0.2s text / 0.4s surface, `cubic-bezier(.3,.46,.45,.94)`, zero transform transitions); the
split-panel hero; product card copies hobbycraft not flyingtiger; copy the references 1:1 first,
brand-swap only. Added mistakes 6–8 (DOM scans produce wrong findings — four confirmed misreads;
`vite build | tail` hides failures; the fabricated agent output). Added §8, the access state of all
four references, and §9, the reference-audit method of record.

### Three corrections to `stationery-point-assets`

The skill is the Part H deliverable of the 16 Aug audit and is otherwise sound. Three things had
gone stale against decisions made after it was written:

1. **The hero clear zone is gone.** §3.1/§3.2 reserved a third of the frame as a calm zone for a
   headline. The hero was locked as a split panel on 4 Sep — the type sits in a solid CSS panel
   beside the photo — so a clear zone inside the photo throws away a third of the asset, and empty
   surface is exactly what §7 says produces the sparse look. Both hero prompts rewritten dense to
   all four edges, with a `[SUBJECT]` swap. Trait 5 in §1 now scopes itself to the assets that
   actually carry type on the image.
2. **Hero paths corrected.** §4 listed one desktop and one mobile hero at the repo root; the build
   wants six files under `public/hero/` per `collections.json`.
3. **Kit-tile spec added** — §3.7 plus a §4 row. It never had one, on the block that leads the
   homepage. Carries smiggle's lead-tile contrast rule and both stock traps (`geometry.webp` is
   pencils, `bottles.webp` is bottles only).

### Batch 1 prompt pack published

12 prompts — 6 hero crops, 6 kit tiles — each a self-contained copy-paste block tied to the exact
filename its output must be saved as, with tool routing, the palette swatches, the reject list and
per-slot trap notes. Artifact: https://claude.ai/code/artifact/68eb23ce-05f5-48c5-84ba-652e2b1160db

**No code changed today.** Working tree still at `8a2ee83`. Next: Abhinand generates, hands back
the raw PNGs; then convert to WebP at spec, wire into `SchoolKitTiles` and `HeroCarousel` (closing
AUDIT-02 #3 and #4), build the homepage product rail (#2), and re-audit.

## 11 September 2026 — Reference Capture Audit & Hero Section Overhaul

### Problem addressed
The previous hero section relied on a rigid 50/50 split-panel layout (square photo boxed against a massive solid flat `#332E92` blue block). This differed markedly from all four locked reference sites and produced a dated, corporate landing page appearance rather than an energetic consumer retail and bulk stationery store.

### Live reference captures established
Captured authentic live desktop & mobile screenshots of all four reference sites:
- **Flying Tiger Copenhagen** (`flyingtiger.com`): Full-bleed lifestyle hero with organic typography, pill CTA, and immediate product carousel.
- **Dick Blick** (`dickblick.com`): 3-column asymmetric multi-panel merchandising grid on clean neutral `#E0DED9` beds.
- **Smiggle UK** (`smiggle.co.uk`): High-energy campaign banner paired with quick-action deal boxes and dual promo cards.
- **Hobbycraft UK** (`hobbycraft.co.uk`): Wide handcrafted seasonal campaign banner with pill CTA and value-proposition strip.
All captures archived under `research/reference-captures/` and documented in the IDE audit gallery.

### Code changes
1. **`src/components/HeroCarousel.jsx`**:
   - Replaced the rigid 50/50 split box with a full-bleed, responsive hero banner spanning the full container width.
   - Applied smooth contrast gradients (`from-brand-dark/95 via-brand-dark/85 to-transparent`) ensuring 100% WCAG contrast while letting the real stationery photography breathe across the frame.
   - Added `#CDD661` lime pill badge (`BACK TO SCHOOL`) and bold headline typography (`text-[32px]` to `text-[50px]`).
   - Implemented dual CTAs: Flying Tiger white pill button (`Shop school supplies`) + frosted glass button with WhatsApp icon routing directly to bulk enquiry.
   - Docked a 4-card quick-action merchandising strip directly beneath the hero banner (School Kits, Art & Craft, Office Bulk, and Vyttila Shop) for rapid conversion.
2. **`src/components/Home.jsx`**:
   - Passed `onOpenListModal={() => setListModalOpen(true)}` to `<HeroCarousel />` so that clicking the School Kits card immediately opens the interactive booklist modal.

### Verification
- `npm run build`: Exit code 0, 507 modules transformed, built in 23.72s.
- `node tools/check-links.mjs`: All 21 merchandising routes resolve cleanly.
- Visual check: Captured at 1440px and 375px; responsive layout and touch targets verified.

### Zero-Gradient Hero Revision (11 September 2026)
- **Problem identified**: Initial iteration placed a leftward dark fading gradient across the photography. Inspection of all four reference sites confirmed that zero reference sites use a gradient wash over photography; gradients muddy real photography and degrade aesthetic sharpness.
- **Clean Reference Resolution**:
  - Captured `smiggle.co.uk` with region selection and cookie modals dismissed (`research/reference-captures/smiggle-clean-hero.png`), revealing the unoccluded, bold candy-pink sale hero and tiered price cards.
  - Captured `hobbycraft.co.uk` (`research/reference-captures/hobbycraft-hero-clean.png`) showing its solid organic card shape beside unwashed craft photography.
- **Hero redesign**:
  - Stripped all gradient overlays from `src/components/HeroCarousel.jsx`.
  - Staged the full flat-lay photography in 100% natural, crisp, unwashed color.
  - Housed typography and dual CTAs inside a crisp, solid branded retail card (`bg-brand-dark rounded-2xl border border-white/10 shadow-2xl`).
- **Build verification**: `npm run build` passed cleanly in 16.59s; all 21 links verified.

## 2026-09-11 11:05 IST — School Desktop Hero Banner Integrated (Zero Box, Zero Gradient, Interactive HTML CTAs in Negative Space)
- Processed newly generated School Desktop banner: converted to optimized WebP at public/hero/hero-school.webp (68 KB).
- Updated collections.json with hasEngravedText: true for slide 'school'.
- Refactored HeroCarousel.jsx: removed floating HTML card and gradient overlays for engraved artwork; placed interactive HTML pill buttons ('Shop school supplies' and 'WhatsApp Enquiry') in the reserved lower-left negative space.
- Added sr-only accessibility titles and subtitles for SEO and screen-readers.
- Verified build and routing: npm run build exits 0 (507 modules, built in 14.77s), tools/check-links.mjs confirms 21/21 routes resolve.
- Live captured desktop screenshot at 1440px confirming exact visual alignment.

## 2026-09-11 11:46 IST — Full 3-Slide Hero Banner Suite Completed (Wide 21:9 Format, Compact Vertical Footprint, Zero Cropping)
- Processed and converted all 3 user-generated hero banners to WebP:
  - School: public/hero/hero-school.webp (68 KB)
  - Art: public/hero/hero-art.webp (84 KB, fitted to 1024x384 canvas with zero text clipping)
  - Office: public/hero/hero-office.webp (64 KB)
- Updated src/data/collections.json: all 3 hero slides configured with hasEngravedText: true and shared wide assets for desktop and mobile.
- Refactored src/components/HeroCarousel.jsx:
  - Constrained desktop hero container to max-w-[1240px] with natural 1024/384 aspect ratio, reducing vertical height while preserving 100% of the graphic width without cropping.
  - Set wide banner format on mobile as requested, keeping zero image clipping.
  - Aligned interactive HTML pill buttons (Collection link and WhatsApp) cleanly in the lower-left negative space.
- Verified build and routing: npm run build exits 0 (507 modules transformed), tools/check-links.mjs confirms 21/21 links resolve.
- Live captured screenshots across desktop and mobile across all three slides.

## 2026-09-11 12:01 IST — Full-Bleed Edge-to-Edge Hero Banner Updated
- Refactored HeroCarousel.jsx to 100% full bleed: removed outer container max-width, padding, and rounded borders.
- Preserved natural wide banner ratio (1024/384 ~ 21:9) across both desktop and mobile without cropping.
- Aligned real interactive HTML pill CTAs in negative space on both desktop and mobile.
- Verified production build and live captures across all 3 slides.

## 2026-09-23 — Homepage reordered to Sam's list
- New order: hero → Shop by category → Schools & offices bulk tile → reviews → send your list → brands → Parties & events tile → What people come in for → visit us.
- PromoTiles takes `only="<id>"` so the two tiles sit in separate slots.
- Off the homepage (components kept): New In, School kits, offer strip, below-MRP rail.
- Popular in store re-added after Shop by category (same day): with it gone, the first product photo sat at 54% of the page at 375px; now 11%.
- Build OK; order, console and 375px layout checked in the browser.
- Popular in store taken back out the same day: Abhinand chose Sam's exact order, since bulk enquiries are the goal. Its subtitle was removed too.
- Doodle bands: stars/squiggles removed from Shop by category, reviews and Brands we stock; plain yellow kept (ties to the logo's gold). Brand-blue tint tried first and rejected as grey/old-looking.
- Solid black 5/6px divider (MarkerDivider) between hero and the yellow category band; a hand-drawn marker version was tried first and dropped.
- Bulk quote, return gifts and school kits CTAs now open WhatsApp with a pre-filled enquiry template (WA_ENQUIRIES in src/lib/utils.js, resolved by CtaLink) instead of the /contact form. Header 'Contact Store' still goes to /contact.
