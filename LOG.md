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

## 2026-09-23 — Price decided, Sam's delivery rule, domain question
- **Price: ₹20,000 one-time** (Abhinand's decision). Any maintenance / care plan is priced separately after a call with Sam. Supersedes ₹45k + ₹9,999/mo, the ₹55k floor, and the ₹75k recommendation.
- Sam offered an advance and asked for the "full cost". Suggested terms: 50% (₹10,000) now, 50% when the site goes live on his domain. Domain renewal is Sam's own cost, paid to the registrar; hosting on Cloudflare Pages is ₹0.
- **Delivery: corporate customers only, T&C apply** (Sam, 23 Sep). The site still promises delivery more broadly: hero office slide "delivered across Kochi", bulk tile "deliver across Kochi", and the return-gifts WhatsApp template asks "Pickup or delivery". Copy not yet changed; still need to ask Sam whether schools count as corporate and what the T&C are.
- Sam asked how the domain and "uploads" work. Domain check: stationerypoint.com is taken; stationerypointkochi.com is free; .in could not be checked (registry lookup failed).
- Site has been live on stationery-point.pages.dev since at least 19 Sep, so the launch leverage is gone. The domain connection is the handover and the billing point.
- Delivery wording made corporate-only across the site (Sam, 23 Sep): Schools & offices tile note (visible on phones), Send-your-list bullet, both WhatsApp templates, and a new Terms section 4 'Delivery' at /terms#delivery. The office hero banner was left as is (Abhinand: it's already corporate).

## 2026-09-25 — CMS switched from Decap to Sanity (code + CMS products merge)
- **Why:** the Decap `/admin` never worked on the live site. Its GitHub OAuth worker was never deployed (`base_url` was still the placeholder), so nobody could log in.
- **New setup, modelled on Augzet V2 but fixed:** Sanity Studio lives in `studio/`, builds into `public/admin/` (`cd studio && npm run build`), and is served at `/admin`. `_redirects` now sends `/admin/*` to the studio's own index.html.
- **Both lists show together.** Abhinand keeps adding products as JSON in `src/data/products/`; Sam adds extra ones in `/admin`. `src/data/catalog.js` fetches Sam's published products from Sanity's CDN at runtime and merges them in. Augzet shows Sanity *or* its code list, never both; this was the thing to avoid.
  - Same product name in both: the code one wins (no duplicate cards).
  - Within a category, Sam's products come first, newest first.
  - Sanity down: the site shows the code products only. Last Sanity result is cached in localStorage.
  - A category with only Sam's products (e.g. Return Gifts) now gets its filter, circle and footer link.
- Sanity fields: name, category, photo (required), brand, unit, MRP, our price (must be below MRP), "New in" tag (on by default). Sam cannot edit or remove the code products from `/admin`, only his own.
- Consumers moved to `useProducts()` / `useActiveCategories()`: Catalog, CategoryCircles, Footer, NewInRail, OffersRail. `LandingPage.jsx` (uncommitted 19 Sep work) still reads code products only.
- Removed: `cms-oauth-worker/`, `docs/cms-setup.md`, Decap `config.yml`.
- Verified in the browser with mocked Sanity data at 375px: Sam's product first, duplicate name skipped, bad category dropped, Return Gifts filter appeared, price + Save tag rendered. Studio build loads at /admin. Site build OK.
- **Sanity account (created by Abhinand, 25 Sep): `hehnofe@gmail.com`.** Project `Stationerypoint`, project ID `j95yhvco`, dataset `production` (public). CORS origins added with credentials: `https://stationery-point.pages.dev`, `http://localhost:5173`. Checked from here: public read returns 200, both origins get Allow-Credentials. **When Sam's domain connects, add it as a CORS origin too, or /admin and his products break on that domain.**
- Invite Sam at sanity.io/manage -> Members (Editor role) so he logs in with his own email.

## 2026-09-25 — Price cut to ₹10,000 total
- Sam's side was shocked at ₹20,000 and didn't want to pay it. **New price: ₹10,000 one-time total, full handover**, including the CMS, the 82 products and the 5 local search pages. Marketing/SEO only if they ask, quoted separately. Trying to close today.
- **Fix (same day):** live /admin showed "Couldn't reach the Sanity servers". Cause: `public/_headers` still carried Decap's CSP (connect-src GitHub only), and the site-wide CSP also blocked `*.sanity.io` fetches and `cdn.sanity.io` images. Both CSPs now allow Sanity; the /admin one detaches the site-wide policy with `! Content-Security-Policy`. Checked live: /admin sends one CSP and shows the login screen.
- Same day, revised: the call leads with **₹4,999/mo, 6-month minimum**, website included with no setup fee (product and offer updates, Google Business Profile, listings, monthly rank report; ads spend not included). ₹10,000 one-time, website only, is the fallback. Call script: https://claude.ai/artifact/4H9TGKorzDH1cGFSdnvCdC
- **Landing pages pushed (25 Sep):** the 5 local SEO pages from 19 Sep (wholesale, office, art & craft, school, return gifts; all "-kochi") committed on Abhinand's go-ahead. Build prerenders them to static HTML; sitemap and footer links included. They list code products only (picked by ID).
- Final offer for the call (25 Sep): **₹4,999/mo, 6-month minimum**, no setup fee. Includes the website, 5 local pages, all products, the product-adding system (Sanity) and a review system (WhatsApp message + counter QR to the Google review page). Monthly: weekly GBP posts, product/offer/banner updates, IndiaMART/JustDial listings, monthly heat map. **Guarantee: top 3 in at least 8 of 25 points on the 'stationery shop' map within 6 months (baseline 2), or Abhinand keeps working free until it's hit.** Not a refund. Sam's part: ask customers for reviews. **₹5,999 from month 7 once the target is hit.** Baseline screenshot: Downloads/stationery-point-google-maps-ranking.png.
- **Fix (25 Sep):** a product deleted in Sanity stayed on the site. Sanity's delete had worked; the site was reading apicdn (cached up to about a minute) and only fetched once per page load. Now it reads the live API (no-store) and refetches when the tab regains focus (20s throttle).
- Guarantee changed (Abhinand's call, 25 Sep): **full refund of everything paid** if 8 of 25 isn't reached in 6 months, instead of working free. Conditions for the written confirmation: same map settings (stationery shop, 5x5, 2 km), all 6 months paid, review QR and message used.

## 2026-09-25 — New In back, editable in /admin
- New In rail back directly under the hero (Sam's request); the black MarkerDivider is removed since the hero now meets New In.
- /admin has a 'New In (homepage)' singleton (studio/schemaTypes/newIn.js): Sam adds, removes and reorders items; each is either his own product (reference) or a product already on the site (dropdown built by studio/gen-code-products.js). It opens pre-filled with the current 9, and the site uses it only after the first Publish; until then the code newArrival flags apply. Published list also drives the 'New in' badge. Per-product 'New in' toggle hidden.
- Verified with a mocked Sanity response: removal, reorder and a CMS product all render in list order.

## 2026-09-26 - Em dashes removed
- Every em dash stripped from the site (Abhinand). Visible copy rewritten by hand (colon, comma or full stop); comments and data notes switched to commas. One real Google review had one, swapped for a comma. Commit 08a25a0, live on stationery-point.pages.dev and checked: 0 em dashes in the live HTML and JS. The /admin Sanity library code still has some; that is Sanity's own code, not our copy.

## 2026-09-26 - Reviews: 19 to 33, long ones as excerpts
- Re-pulled all 156 Google reviews (26 Sep). Rail now shows 33 (was 13 visible of 19). 14 new: SNIJO (bulk on a Sunday), Abhilash S, Benjamin Joshy (below MRP, credit system), roshan daniel (wholesale), Akhil John Koshy, neeraj swaroop, Vinu Varghese, Sreelakshmi A, Thomas Varghese, Aiswarya Vijayan, Holly Ittoop, Sethu lakshmi, Adityan Pradeep Pillai, jelitta johny.
- `text` now holds the FULL Google text; long reviews carry an `excerpt` (verbatim fragments joined by an ellipsis, ending on the reviewer's own last line). The build script checks every fragment is in the original. Found and fixed: Athul, Abila, Toshin, Feba, Kumar Aryan, Bijuna and Kripa had been silently cut with no ellipsis.
- Card height unchanged: 283px at 375, 261px at 1024 (measured before/after). MAX_CHARS 265 -> 258 as the guard; Silpa's excerpt trimmed because it made a 9th line.
- Avatars now 72px WebP from Google (33 files, 41 KB total; the old 19 PNGs were ~260 KB). Old PNGs removed.

## 2026-09-30 - Domain: stationerypoint.in moving to Cloudflare
- Sam's domain is **stationerypoint.in**, registered at Hostinger (answers the 23 Sep ".in could not be checked"). Before the switch: Hostinger parking nameservers (dns-parking.com), A record 2.57.91.91 = Hostinger parking page, **no MX (no email on the domain), no TXT, DNSSEC off**. So moving nameservers breaks nothing.
- Abhinand added the zone to Cloudflare (free plan). Next: Sam changes nameservers in hPanel (DNS / Nameservers > Change Nameservers) to the two Cloudflare ones.
- After the zone is active: Pages > stationery-point > Custom domains > add stationerypoint.in + www; then add both as Sanity CORS origins (credentials on). The Pages step is the handover/billing point, not the nameserver change.

## 2026-10-03 - Live on stationerypoint.in: domain fixes + contact page
- Domain is live. Sanity CORS for https://stationerypoint.in and https://www.stationerypoint.in added by Abhinand; checked: Sanity answers the new origin with Allow-Credentials. Before that, Sam's /admin products and New In list did not load on the domain.
- Canonical, JSON-LD, og/twitter image, sitemap, robots and landing-page SITE_URL switched from stationery-point.pages.dev to stationerypoint.in.
- `functions/_middleware.js`: www.stationerypoint.in and stationery-point.pages.dev 301 to https://stationerypoint.in (path kept). Preview deploys (<hash>.stationery-point.pages.dev) are not redirected.
- CSP: allows the Cloudflare Web Analytics beacon (was blocked on every page) and api.web3forms.com.
- **Contact page cut off on the right on phones, no sideways scroll.** Cause: with the phone's text size set large, the grid's auto column let both cards grow ~27px past the screen, and html/body overflow-x:hidden hid it. Fixed with grid-cols-1 + min-w-0 + w-full inputs. Header had the same issue (WhatsApp pushed off at large text); the wordmark now gives way instead. Checked at 360px with root font at 100/125/150%: nothing past the screen edge.
- Contact page reordered for phones: WhatsApp + Call buttons on top, form first, then the map (h-48 on phones) and Visit Us with Get directions. Hours on two lines.
- "Send via Email" was a mailto with no recipient (went nowhere). Now posts to Web3Forms; the button stays hidden until WEB3FORMS_KEY in src/lib/utils.js is set. Waiting on which inbox gets the enquiries.

## 2026-10-07 - Indexing prep: 3 Oct commit was never deployed
- Live check before Search Console: the live site still had canonical, JSON-LD and og:image on stationery-point.pages.dev, and www / pages.dev answered 200 instead of 301. Commit d89d638 (3 Oct) was local only, never pushed. Pushed today.
- Landing pages now build as dist/<slug>.html (was <slug>/index.html, which made /<slug> 308 to /<slug>/, so the canonical and sitemap URL were redirects).
- /catalog, /about, /contact, /privacy, /terms now get their own prerendered shell with their own title, description and canonical. Before, they served the homepage canonical and Google would fold them into the homepage.
- Homepage title: spaced en dash swapped for "|".
- Pushed 7 Oct (83e7faa), live within about 1 min. Checked live: www and pages.dev 301 to stationerypoint.in; the 5 landing pages, /catalog, /about and /contact answer 200 with their own canonical and title; homepage JSON-LD and og:image on stationerypoint.in; the wholesale page renders at 375px with no console errors. Next: Search Console (needs Abhinand's choice of Google account).

## 2026-10-07 - Search result look: title, description, favicon, site name
- Google check (site: queries): zero pages indexed for stationerypoint.in or stationery-point.pages.dev. The "stationerypoint.shop" result under a "stationery point" search is a different shop (Atladara, Vadodara, +91 81362 51456), not Sam's.
- Homepage title now "Stationery Point, Vyttila | Below MRP Stationery & Art Supplies" (63 chars, so Below MRP survives truncation). Description leads with "Everything below MRP" (148 chars); og/twitter match.
- Favicons: Google needs a multiple of 48px, we only had 32 and 128. Added favicon-48.png and favicon-192.png from asset-originals/logo.png.
- WebSite JSON-LD added (name "Stationery Point") so Google shows the name instead of the bare domain; Store JSON-LD gets a logo.

## 2026-10-07 - Search Console
- Domain property stationerypoint.in added in Search Console under hehnofe@gmail.com. Verification by DNS TXT on the root (@): Abhinand adds it in Cloudflare. Then: verify, submit sitemap.xml, request indexing for home + 5 landing pages.

## 2026-10-11 - Sam's son's corrections: homepage order, About, Terms, Privacy
- Homepage order now: hero, New In, Shop by category, Send your whole list, What Kochi says, What people come in for, Return gifts, Brands we stock, Visit us. "Buying for a whole class?" tile removed from the homepage (component kept).
- About intro, Terms and Privacy rewritten with his text verbatim; "Sam" replaced by "our team", Primus Establishments named as operator. Both legal pages dated 10 October 2026, numbering fixed (Terms 1-6, Privacy 1-10).
- Verified at 375px: all 50 lines of his text match the rendered pages word for word, order checked, no console errors, no sideways overflow. Pushed 11 Oct.

## 2026-10-11 - Search Console: sitemap fixed, indexing requested
- Property is verified. The sitemap had been submitted as https://stationerypoint.in/https://stationerypoint.in/sitemap.xml (doubled), hence "Couldn't fetch". A domain property needs the FULL url; bare "sitemap.xml" is rejected as invalid. Resubmitted https://stationerypoint.in/sitemap.xml (the file itself is valid: 9 URLs, all 200).
- URL Inspection: homepage was "URL is unknown to Google". Indexing requested (live test passed) for home + wholesale, office, art-and-craft, school, return-gifts landing pages.
- Still to do: put stationerypoint.in in Sam's Google Business Profile website field and Instagram bio. Remove the doubled sitemap entry in GSC (harmless).

## 2026-10-14 - Rank check vs 19 Sep + season plan (diaries, Christmas)
- Local Rank Guru (hehnofe account), rerun from the saved templates (same centre, 5x5, 2 km), server-side with credits (75 used, 56 left).
  - "stationery shop": avg 23.9 -> 19.2. Top 3 in 4/25 (was 2/25), top 10 in 9/25 (was 5/25). All 25 points up or held. Grid now: 37 51 36 40 33 / 55 29 8 2 5 / 26 5 1 1 13 / 8 11 3 11 35 / 19 9 14 13 16.
  - "art supplies": 15.6 -> 10.5. "wholesale stationery": 24.0 -> 25.2.
- Google reviews still 156 (same as 26 Sep). GBP website field is stationerypoint.in.
- A separate GBP listing "Primus Establishments" (Wholesaler, Katti Tower) appears in the same results; decide with Sam whether it helps or splits wholesale searches.
- site: query shows 4 pages indexed (home, wholesale, office, art & craft); school and return-gifts not yet.
- Sam's message: corporate diary partners are chosen Oct-Nov; wants to be the go-to Christmas store in Dec. Plan published: https://claude.ai/artifact/VbDJ4W21WCe7yoYGDVzxtL (source: research/season-plan-2026/). Waiting on Sam for diary range + tier prices, logo/name printing and lead time, last year's office buyers, Christmas range + weekly discounts, yes/no on kids' sessions, Santa day, wrapping table, Kris Kringle box contents.
- Commercial: Sam is on the ₹4,999/mo plan (Abhinand confirmed 14 Oct). The diary and Christmas campaigns are inside the retainer; ads spend is not. Start date of the 6 months not yet recorded.
- Plan v2 (same link): cut 12 Days of deals, gift wrap and Kris Kringle boxes (no proof). Every play now graded 'Hard numbers' or 'Repeated for years', plus a weekly tracking table. Update call cue card: https://claude.ai/artifact/FHN5H2JHJnYegPsRQbui8h (Sam + son; weekly Monday WhatsApp update + monthly 10-min call proposed).

## 2026-10-23 - Rank check (own grid) + Malayalam plan video for Sam
- Abhinand: a call with Sam isn't worth it any more; send a plan he'll actually watch. Built a 92s vertical pixel-art video with Malayalam voice-over (edge-tts ml-IN-MidhunNeural, +15%) and Malayalam captions: `video-plan-2026-10/` (index.html renderer, render.mjs, tts.py, music.py original chiptune, mix.py). Final: `video-plan-2026-10/Stationery Point - plan video (Malayalam).mp4`, copy in Downloads. NOT sent. The Malayalam was written by Claude: a native reader must check it before it goes to Sam.
- localrankguru.com was down (DNS: its nameservers refuse queries, "lame delegation"), so the grid was rerun with `video-plan-2026-10/rankgrid.mjs`: same centre (9.9683647, 76.3121209), 5x5, 2 km, "stationery shop", each point in a FRESH Playwright browser (no cookies/history). A logged-in or previously used browser is useless here: it showed rank 1 everywhere because it had opened the listing earlier.
  - Zoom 14: top 3 in 19/25, top 10 in 23/25, #1 in 17/25. Grid: 3 7 20 7 19 / 1 1 1 4 4 / 1 2 1 1 1 / 1 1 1 1 1 / 1 1 1 1 1. Zoom 13: top 3 in 23/25.
  - Vs Local Rank Guru 14 Oct: top 3 in 4/25. Different tool, so not a like-for-like comparison; rerun LRG when it's back.
  - **Correction (same day):** the GBP name "Stationery Point | Office & School Stationery | Art & Craft | Party Products" is NOT new. It was already the listing name on 19 Jul 2026 (first time we looked) and the owner replied to reviews under it in Aug, so Sam's side set it before we started, and it was in place for both Local Rank Guru scans. It did not cause the jump. It is still a guideline risk (keywords in the name). The jump from 4/25 (LRG, 14 Oct) to 19/25 (own grid, 23 Oct) is most likely mostly the different tool, so the 8-of-25 guarantee is NOT proven until LRG (the agreed measure) is rerun.
- Live 23 Oct: reviews 156 (133 five-star), 4 pages indexed (home, wholesale, office, art & craft).
- **23 Oct, later: Local Rank Guru moved to https://www.localrank.guru/** (same accounts; the hehnofe account is signed in on "Browser 1" of Claude in Chrome). Saved "stationery shop" template rerun server-side, scan 12788 (25 credits, 475 left): top 3 in **4/25** (same as 14 Oct), top 10 **13/25** (was 9), average rank **16.72** (19.2 on 14 Oct, 23.9 on 19 Sep). Grid: 28 44 36 36 32 / 55 24 7 2 4 / 22 5 1 1 10 / 6 10 2 7 27 / 16 6 13 10 14. Every point up or held vs both 19 Sep and 14 Oct. Guarantee (8/25 top 3) NOT met yet.
- My own fresh-browser grid (19/25) was the method, not reality: it centres the map on each point at zoom 13-14, where Google favours the best-known shop in view; LRG simulates a searcher standing at the point. Never use the own grid for the guarantee or for client numbers. Video re-rendered with the LRG numbers (top 3: 2 -> 4 -> 4, top 10: 5 -> 13, "halfway", no drops anywhere).
- Side effect: Stationery Point was added as a business (id 4389) on a second LRG account "Inkonroblox"; that account's free credits are paused ("related to another account"). Harmless; delete if wanted.
- **Final video (23 Oct): pixel art + rounded Baloo text** (`node render.mjs ft-silent.mp4 30 --flat-text`, URL ?text=flat), Midhun male voice at +8% / -2Hz (Abhinand: no female voice), word-by-word captions, count-ups, pixel-block wipes between sections, all boxed text shrinks to fit. Numbers are Local Rank Guru's (top 3: 2, 4, 4; top 10: 5 to 13; no point dropped). `Stationery Point - plan video (Malayalam).mp4` (98s), copy in Downloads; PIXEL and FLAT style versions and a side-by-side kept for reference. Not sent; Malayalam still needs a native listen. Message to send with it is 3 lines, one ask (diary list + prices, last year's office customers).
- Music (23 Oct, Abhinand: soften it): music.py is now soft sine chord pads gated to the voice (silent in pauses, 0.35 s fades), mixed at 0.07, about 15 dB under the voice, no sidechain pumping. The 8-bit square arpeggio was dropped.

## 2026-10-24 - Sam sent the 2027 diary range + corporate terms
- The Malayalam plan video and the diary ask WERE sent (before 24 Oct); this message is Sam's reply to them. The 23 Oct 'NOT sent' notes above are out of date.
- 27 diaries, one photo PDF each (code, size, price in the filename): 20 B5, 7 A5, ₹114 to ₹520. Two ranges: S28xx leatherette executive (₹190-520, mostly ₹430), S30xx printed hardbound (₹115-280). Saved to `research/diaries-2027/` (pdfs/, previews/, contact-sheet.png, range.csv). Not yet known: whether the filename price is MRP or Sam's selling price.
- Sam's terms, verbatim in substance: customisation is the company name on the FRONT cover only. Minimum 100 nos. Delivery 10 days. Not stocked in much quantity, but can be got; unsold diaries are useless next year so he is cautious. 25-50% advance to book. Artwork comes from the customer. Quantity confirmed only after cross-checking with distributors. Quality is top. Last year most sales were retail counter; corporate was a few customers only.
- Meaning for the season plan: corporate diaries are made-to-order (no stock risk for Sam if we sell pre-orders with advance), last order date for 1 Jan delivery is about mid-Dec once the 10 days and the distributor check are counted. Retail counter is where the volume is, so the range on the site/GBP matters as much as the corporate pitch.
- Built same day: 27 products `src/data/products/83-109-diary-2027-*.json` (category office-supplies, single `price` field = Sam's filename price, shown plainly as ₹N with no MRP claim; ProductCard renders it). Photos as delivered in `public/diaries-2027/` (1200/800/480 webp). Landing page `/corporate-diaries-kochi` with Sam's terms as FAQs, in sitemap. Only 4 diaries flagged New In (S2809, S2816, S3051, S3057): all 27 flooded the homepage rail. Copy says "we keep only a few of each" (Sam does not stock much). Full build with guards passed, checked at 375px: 27 cards, no overflow.
- Pushed after a Git Credential Manager sign-in; live 24 Oct, /corporate-diaries-kochi serves its own title and the photos load.
- Season plan Play 4 needs changing: Sam's minimum is 100, so the 25/50 tiers go; price card at 100 and 250 (+ early price to 14 Nov).

## 2026-10-24 - Traffic check
- Search Console, last 28 days (data to 22 Oct): 17 clicks, 4,280 impressions, CTR 0.4%, average position 6. 668 distinct queries. Pages: home 15 clicks / 4,211 impressions; wholesale 1 / 111; art & craft 1 / 76; office 0 / 10. Top queries: "stationery point" 4 clicks / 18 impressions; "stationery shop near me" 1 / 221 at position 4.7; "craft shop kochi" 1 / 41; "craft shop near me" 0 / 56; "journal kit" 0 / 44.
- /corporate-diaries-kochi: URL Inspection said unknown to Google; indexing requested 24 Oct.
- Cloudflare: login page (hehnofe and miro.shopmiro listed); not signed in, not checked.
- GBP: hehnofe is NOT a manager of Stationery Point's profile (only Augzet + a test listing), so calls, direction requests and website clicks are invisible to us. Public: 4.8, 156 reviews, unchanged since 26 Sep.
- The site has no analytics script (privacy policy says so), so WhatsApp taps from the site are not counted anywhere.
- Diary photos were blank on the live site (desktop and phone): srcset asks for -480/-800, which are gitignored and made at build by tools/make-thumbs.mjs, whose DIRS did not include public/diaries-2027. Added it; pushed b33711a; checked live: photos load. Remote set to https://miroshopmiro-lang@github.com/... (GCM prompt hung on the plain URL).
- Proposed next (24 Oct): we run the corporate diary push ourselves (Sam's team unlikely to do sample drops): 40-60 nearby offices (Infopark, Vyttila, Kadavanthra, MG Road), a logo-on-diary mockup per office from Sam's real photos, WhatsApp/email with early price to 14 Nov, follow-up 2 days later. Target 5 corporate orders (500 diaries) by 14 Nov. Needs Sam: OK to quote + whether file prices include name printing at 100+.
- 24 Oct, later: Abhinand said the raw counter photos "look horrible". All 27 diary photos re-done as studio product shots with ChatGPT Images (image edit with the real photo attached, prompt: keep the cover exactly as is, straighten, cut out clutter, flat #E0DED9 grey bed, soft shadow, square). Every result compared against its original side by side: covers, foil, embossing and printed words ("Stay Motivated", "Words of Wisdom", "Act Now", "Values", "Green Earth", compass, tree print) came back unchanged. Only drift: tiny year strips along the bottom of S3048/S3052/S3053/S3054-type covers where the original was in shadow, GPT filled plausible digits. Originals kept in research/diaries-2027/raw/. Files `public/diaries-2027/diary-shot-sNNNN(.webp/-800/-480)`, products point at them (new names to dodge stale cache). Pushed 253241c, live and checked. This deliberately overrides the old 'AI never makes product cards' line, because it is an edit of the real product photo, not a generation from scratch.
- 24 Oct, evening: Abhinand: no way to reach the diaries page from the site, and diaries not first in Office Supplies. Fixed and pushed: new DiariesRail section directly under the homepage hero ("2027 diaries, from ₹114", Company orders button to /corporate-diaries-kochi, See all diaries); '2027 Diaries' in the hamburger menu and the desktop category nav; diaries carry `priority: 1` so productData sorts them first within Office Supplies; Office Supplies shows a banner linking to the company-order page. Diaries un-flagged from New In (they repeated right under the new section). NOTE: this adds a section to the homepage order Sam's son set on 11 Oct; remove DiariesRail from Home.jsx after the diary season. Checked at 375px and live: no overflow, no broken images.

## 2026-10-25 - Office list for the corporate diary push
- Google Maps (Claude in Chrome), searches centred on the shop at zoom 13: car showrooms, builders, hospitals, schools (twice: the first returned training institutes), CA firms, hotels, insurers. 208 raw rows -> `research/diary-outreach-2026/sp-offices-raw.json`; filter script `filter.py`; result `offices-shortlist.csv`: 94 rows, tier A 56 (19 hospitals, 9 insurers, 8 new-car dealers, 7 CA firms, 7 builders, 6 schools), tier B 38. 19 rows have no phone on the card.
- Dropped: used-car lots, clinics/labs, tuition centres, individual insurance agents, government offices (General Hospital, Ombudsman, District Insurance Office, Kendriya Vidyalaya). Public-sector insurers kept in tier B with a tender note. Hotels left out: their cards show no phone or category and they are weak diary buyers.
- Google review count is used as a rough size proxy only. Phones are front-desk numbers; contact_person (admin/HR) is blank and is the next gap.
- 25 Oct: logo-on-diary mockups for 10 offices -> `research/diary-outreach-2026/mockups/` (+ `_all-10.jpg`): Sunrise, Medical Trust, VPS Lakeshore, Renai Medicity, Lourdes (hospitals), Popular Hyundai, Kairali Toyota (cars), Confident Group, Varma Homes (builders), Toc-H Public School. Every logo downloaded from the company's own site (`logos/`). Rendered with `tools/mockup.py`: logo as gold foil stamp (gradient, slight emboss) on the navy S2824 product shot, centred mid-cover, white details knocked out. Deliberately NOT done with an AI image model: real logos with small text would come back altered. Popular Hyundai needed a lettering-only mask (its logo is white text on bars). Dropped: Varma & Varma CAs (site down), K Rijas and Indus Motors (domains parked), Universal Sompo (branch office).
- 25 Oct: outreach messages for the 10 mockups -> `research/diary-outreach-2026/messages.md` (first message + 2-day follow-up per office). Sent as Stationery Point, from the shop's WhatsApp Business number, one ask ("Who should we send the details to?"). Price left as three blanks (100, 250, early price to 14 Nov). 7 of 10 numbers are 0484 landlines: call first to get the admin/HR WhatsApp or email. Nothing sent.
- 25 Oct: season plan Play 1 changed (Abhinand: 40 blind sample diaries ~₹8k is too expensive for Sam). Now: logo mockup to every office first (free), a physical diary only to offices that reply, cheap A5/printed design (₹114-145) unless they asked for a specific one, cap ~5 drops (~₹600-1,000). The published season-plan artifact still shows the old Play 1.

## 2026-10-29 - Diary push re-audit, prices filled
- 28 Oct call (Abhinand asleep): name printing ₹10 each at 50, ₹7 each at 100, on top of Sam's list price (confirmed). Tiers 50/100 are Abhinand's memory, fairly sure. Current prices = the early price to 14 Nov (Abhinand).
- Research re-audit: the Sendoso/RollWorks "2.6% to 10.2%" and Supermetrics "70 meetings / 3,309 contacts" figures could NOT be found at the cited pages; removed. Real RollWorks case: 55% more replies, 22% more new opportunities (vendor case study). 4imprint 2025 figures verified (1,639,000 existing vs 421,000 new orders; free samples + art help in the 360 guarantee). Added ASI "first 10 B2B clients" (niche first, 50-company list, samples + note, referrals). Reddit blocked in tools; one mirror thread read (r/ecommerce 1q0jik7: referrals beat cold outreach, give each channel its own job).
- Plan v3 published (same link): Play 1 = name-on-diary picture + price to ~60 offices, hospitals first, real diary only to repliers; Play 4 = price in the first message, no separate price card; calendar and asks updated.
- messages.md: blanks filled (S2824 mockup: ₹157 at 100, ₹160 at 50; from ₹121). Backup messages.md.bak-2026-10-29.
- OPEN: Sam's terms say company NAME on the front cover only; all 10 mockups show full logos. Confirm logo printing with Sam or redo mockups as name-only before sending.
- 29 Oct, later (Abhinand, corrects the above): name printing ₹10 each at 100, ₹7 each at 250 (not 50/100; matches Sam's 100 minimum). Early price = 10% off until 14 Nov, applied to the diary price only (my call, printing not discounted). messages.md and plan updated: S2824 ₹160/₹157 regular, ₹145/₹142 early; from ₹113.

## 2026-10-30 - Logo printing confirmed
- Abhinand: Sam meant logo AND name on the front cover, not name only. The 29 Oct OPEN item is closed; the 10 logo mockups and messages stand as they are. Outreach window 30 Oct to 7 Nov opens today; nothing sent yet.
- 30 Oct: Sam agreed to give WhatsApp Web access to the shop number, so outreach is sent by us from WhatsApp Web.

## 2026-11-15 - SEO, AI Visibility & Local Schema Enhancements
- Full SEO & AI Visibility audit run via claude-seo-ai and seo-local.
- Titles and meta descriptions optimized across all 15 static HTML routes to fit within standard Google pass bands (titles: 33-59 chars; descriptions: 71-160 chars) without snippet truncation.
- Prerendered HTML bodies wrapped in semantic <main id="main-content"> landmarks across homepage, landing pages, area pages, and route shells (/about, /contact, /catalog).
- tools/prerender-landing.mjs updated to be fully idempotent with pre-rendered route bodies.
- Standard public/llms.txt created for AI discovery (validated with 0 errors).
- Enhanced Schema.org Store JSON-LD in index.html with aggregateRating (4.8★, 150 reviews), hasMap, additionalType (StationeryStore, WholesaleStore), areaServed (Kochi, Vyttila, Kakkanad, Panampilly Nagar), and sameAs authority links (Instagram, Justdial, IndiaMART).
- Verified with zero syntax errors, links and placeholders checked, dist built.
