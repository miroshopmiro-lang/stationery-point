# AUDIT-02 — Stationery Point vs. the four locked references

Date: 2026-09-04
Build: branch `rebuild`, dev server `http://localhost:5173` (already running, not restarted)
Method: real screenshots via the project's own Playwright 1.62.1 + Chromium, written to disk and
**opened as images**. Every finding in sections B–E was seen in a rendered picture first.
Pixel values are sampled **out of those PNGs** (canvas `getImageData`), never out of the DOM.
No computed-style or DOM query originated any finding in this document.

Shots: `G:\Stationery point\research\audit-02-shots\`
Prior audit: `AUDIT-01.md` (17 Aug, 4.5/10). Today's claims: `LOG.md`, entry `2026-09-04`.

---

## A. METHOD

### Our build — LOADED, all 6 pages × 3 widths (18 page-loads, 83 frames)

Captured headless Chromium, `deviceScaleFactor: 1`, mobile UA + `isMobile`/`hasTouch` at 375.
Each page was scrolled top-to-bottom in 400px steps to force lazy loading, then held **1.8s**
before the first frame — the mid-paint trap in the brief. Full-page clips, not viewport grabs.
**Zero HTTP 4xx/5xx responses and zero console errors on any of the 18 loads**
(`audit-02-shots/build-report.json`). So no blank region reported below is a missing asset:
they are all designed placeholders or genuine empty layout.

Measured page heights (CSS px):

| Page | 375 | 768 | 1440 |
|---|---|---|---|
| `/` | **6,260** | **7,663** | **6,572** |
| `/catalog` | 1,983 | 1,604 | 1,891 |
| `/catalog?category=art-supplies` | 5,860 | 4,842 | 5,705 |
| `/catalog?q=camel` | 2,960 | 2,487 | 2,830 |
| `/about` | 2,857 | 2,266 | 1,906 |
| `/contact` | 2,728 | 2,222 | 1,830 |

Frames opened as images (not merely written): `375/home_00…07` (all 8), `375/catalog_00`,
`375/catalog-art_01`, `375/about_00`, `375/contact_00`, `768/home_00`, `768/home_02`,
`1440/home_00`, `1440/home_02`, `1440/home_03`, plus 5 crops in `build/crops/` and 3
dead-end captures in `build/dead-ends/`.

### flyingtiger.com — LOADED at 375, 768 and 1440 (HTTP 200)

Viewport-scroll frames below y≈812 came back **white** — Shopify section hydration, the same
failure AUDIT-01 hit. Per the trap rule I did **not** report that as a flyingtiger defect. Solved
the same way AUDIT-01 did: accepted the cookie banner, removed the country modal, its backdrop,
3 `drawer-component`s and the `quick-add-modal` (all logged in the run output), disabled
scroll-reveal, then screenshotted each `.shopify-section` as an **element**.

Opened as images: `flyingtiger/375/00_y0.png` (announcement bar, header, hero, first product
rail — clean, mild residual scrim over the hero photo only), `375-sections2/sec_06.png`
(product rail), `sec_07.png` (circle rail), `sec_12.png` (two-up promo tiles),
`sec_15.png` (Shop by category), and `1440-sections2/sec_12.png` (two-up promo tiles at
desktop — the cleanest reference capture of this audit). Section heights in
`flyingtiger/*-sections2/manifest.json`.

flyingtiger page height today: **3,711px @375** pre-consent / **3,903px** post-consent;
4,059 @768; 3,975–4,119 @1440. Its footer alone is **1,626–1,710px of the 375 page**.

> Note: flyingtiger's homepage is seasonal and is **not** the 4,609px page AUDIT-01 measured on
> 17 Aug. Any ratio quoted against 4,609 today is stale. See B5.

### smiggle.co.uk — used the TRUSTED on-disk pack, not the live site

Read `research/smiggle-bundles/FINDINGS.md` in full. Opened as an image:
`screenshots/homepage_tiles_375px.png` (the 6-tile bundle block — the merchandising bar).
Did not attempt to load smiggle.co.uk live (Radware).
Same DPR caveat as AUDIT-01: the PNG is 628px wide for a described 375px viewport, so smiggle
absolute pixels below are image-px or ÷1.675 estimates and are labelled. Ratios are DPR-safe.

### dickblick.com — HARD BLOCKED

`https://www.dickblick.com/` returns HTTP 200 with `<title>Restricted Access 2023</title>` at
all three widths. Opened `dickblick/375/00_y0.png`: "Restricted Access — we have detected some
unusual traffic". IP-level, not a captcha. The page offers a report form asking for name and
phone number; **I did not fill it.** No dickblick pixels obtained.
**Every dickblick comparison in this document is UNVERIFIED.**

### hobbycraft.co.uk — HARD BLOCKED (CAPTCHA)

HTTP **403**, `<title>Just a moment...</title>`, body: "Performing security verification …
verifies you are not a bot", Cloudflare Ray ID. Blocked at 375, 768 and 1440.
**This is a bot check. I did not attempt to defeat, bypass or solve it.**
No hobbycraft pixels obtained. **Every hobbycraft comparison in this document is UNVERIFIED** —
which matters, because hobbycraft is the stated source for the header, the offers rail and the
product card.

### Quarantine

Read `UNVERIFIED-agent-output-2026-08-17/DO-NOT-TRUST.md` once. Opened nothing else in that
folder. Nothing from it informs any line of this audit.

---

## B. VERIFICATION OF TODAY'S CLAIMS

### B1. "CollectionCards rebuilt … pale pink/cream/green beds gone, elevation shadow gone, per-tile blurb gone, label moved from a separate white panel to **inside the tile on the media bed**"

**MOSTLY CONFIRMED — but the last clause is FALSE.**

Proof: `build/375/home_03_y2436.png`, `build/1440/home_03_y2700.png`.

- Off-palette pastels: **CONFIRMED gone.** Every bed sampled reads `#E0DED9`/`#E0DFD8`
  (the placeholder tile is the exact token; photo tiles drift one bit in WebP). No pink,
  no cream, no green anywhere in the block.
- Elevation shadow: **CONFIRMED gone.** Flat at both widths.
- Per-tile blurb: **CONFIRMED gone.**
- **"Label … inside the tile on the media bed" — FALSE.** The label sits *below* the media,
  on the page ground. Sampled directly behind three labels in `home_03_y2436.png`:
  (20,190) `#FFFFFF`, (20,355) `#FFFFFF`, (20,520) `#FFFFFF`, (170,520) `#FFFFFF`.
  Pure white, not `#E0DED9`. What actually changed is that the white panel lost its card
  chrome; the label is still outside the tile.
  This matters because the claim's whole point was "one page, one tile language" — and the
  page still has **two**: SchoolKitTiles enclose the label in a bordered tile on a tint
  (`home_01_y812.png`), CollectionCards do not. smiggle's proven pattern
  (`homepage_tiles_375px.png`, seen) puts the underlined label **on the grey bed inside the
  tile**, which is what SchoolKitTiles does and CollectionCards still does not.
- Height 967→801px: not independently checkable from a screenshot; not disputed.

### B2. "PromoTiles … a tile with no photograph now spans its panel full width instead"

**CONFIRMED on the specific defect. The block is still the worst on the page.**

Proof: `build/375/home_02_y1624.png`, `build/768/home_02_y2048.png`,
`build/1440/home_02_y1800.png` + `home_03_y2700.png`.

- The `#FFFFFF` void is **gone at all three widths.** AUDIT-01 Defect 1 is genuinely closed.
- What replaced it, measured against `flyingtiger/1440-sections2/sec_12.png` (opened):
  - flyingtiger at 1440 runs **both** promo tiles **side by side in 332px total**. Each is an
    exact 50/50 photo|panel, mirrored, square corners, centred type, no eyebrow, one white pill.
  - Ours at 1440 **stacks** them: tile 1 ≈ 610px + gap + tile 2 ≈ 230px ≈ **830px** —
    **2.5× flyingtiger's height for the same two promos.**
  - Tile 1's panel is ~610px tall carrying ~200px of type: **~400px of dead indigo persists.**
    AUDIT-01's "empty indigo inside the panel" was not addressed.
  - Tile 2 has no photo, so at 1440 it is a 1,215×230 indigo band with the copy crammed left
    and **~900px of empty indigo to its right.** The white void became a coloured void.
  - Still inset (113px each side at 1440, 16px at 375) and still rounded — flyingtiger is
    square and near-full-bleed.
  - Tile 1's "photo" is the JK Copier **pack shot** upscaled to ~607×600 and **cropped by the
    tile edge**, sitting on its own `#E0DED9` bed. flyingtiger's halves are lifestyle
    photography filling the half edge to edge. A contained pack shot cannot do this job.

### B3. "ProductCard … media bed tint moved `#EEF0FB` → `#E0DED9`, closing AUDIT-01 Defect 8"

**OVERSTATED. Half of Defect 8 is closed.**

Proof: `build/375/catalog-art_01_y812.png` (opened), `build/375/home_01_y812.png` (opened).

- ProductCard beds sampled `#E0DFD8`/`#E0DED9` ✓ — matches smiggle's neutral warm grey.
  Genuinely correct, and correct for the right reason.
- **But AUDIT-01 Defect 8 named "both block 4 tiles and product cards."** SchoolKitTiles beds
  sampled (40,60) `#EEF0FB`, (40,290) `#EEF0FB`, (40,510) `#EEF0FB`, (300,510) `#EEF0FB`
  — **still the blue tint**, on the one block on the site that is a direct copy of smiggle's
  grey-bed tile. CollectionCards did migrate. SchoolKitTiles did not.

### B4. "Dead-end links removed … every tile and nav link"

**FALSE, and this is the most damaging finding in the audit.**

Proof: `build/dead-ends/deadend_notebooks_375.png` (opened),
`build/dead-ends/_catalog_collection_school_kits.png` (opened), plus a full internal-link crawl.

The fix covered `categories.json` categories (Return Gifts, Special Edition — those are
genuinely gone from the circles, filters, footer and header ✓). But **SchoolKitTiles links use a
different slug set that `activeCategories` never touched.** Crawled every internal href on `/`:

| Homepage school-kit tile | href | Products |
|---|---|---|
| **Ready-Made Kits** (the BEST VALUE hero tile) | `/catalog?collection=school-kits` | **param silently ignored → generic catalog landing** |
| Notebooks | `/catalog?category=notebooks` | **0 — "No products match your search"** |
| Art & Colouring | `/catalog?category=art-supplies` | 25 ✓ |
| Geometry Boxes | `/catalog?category=geometry` | **0 — dead end** |
| Pencil Pouches | `/catalog?category=pouches` | **0 — dead end** |
| Bottles & Lunch Boxes | `/catalog?category=bottles` | **0 — dead end** |

**Five of the six tiles in the homepage's lead merchandising block do not deliver a product.**
One reads *"No products match your search. Try a different term or clear filters."* — and the
filter dropdown on that page still says "All Products", so the shopper cannot even tell what
they clicked. The `School kits` item in the new 1440 desktop nav points at the same
`?collection=school-kits` and lands on the same generic page.

This is a straight violation of the project's own governing rule, on the block a phone user
reaches first. It also means the claim closed a narrower problem than it announced.

### B5. "Page height at 375px: 7,946 → 6,474 → **6,260**. Flying Tiger is 4,609, so we are at **1.36×**"

**Height number CONFIRMED. The ratio is OVERSTATED because the reference figure is stale.**

- 6,260px @375 measured today, to the pixel. ✓ Real, earned reduction of 1,686px.
- **flyingtiger is not 4,609px today.** Measured live at 375 in this session: **3,711px**
  (3,903 after accepting cookies). 4,609 was its 17 Aug seasonal homepage.
  Against today's reference we are at **1.60–1.69×**, not 1.36×.
- The harsher number: flyingtiger's **footer is 1,626–1,710px** of that page, ours is ~958px.
  Strip both footers and compare content: **flyingtiger ≈ 2,100px, ours ≈ 5,300px — 2.5×.**
  The density gap is worse than the whole-page ratio suggests, not better.
- **The "gets taller as it gets wider" structural failure is NOT fixed.**
  6,260 @375 → **7,663 @768** → 6,572 @1440. 768 is still the tallest layout, by 1,400px.
  Cause visible in `build/768/home_02_y2048.png`: SchoolKitTiles stays 2-up at 768, so six
  tiles become 356×370px panels each holding a 48px placeholder chip. flyingtiger collapses
  sideways as width grows; we still inflate.

---

## C. FRESH FINDINGS, RANKED BY MEASURED SEVERITY

**1 · Five of six school-kit tiles dead-end. (375, 768, 1440)**
See B4. `deadend_notebooks_375.png`. Fix: point `notebooks`, `geometry`, `pouches`, `bottles`
at the `?q=` searches that already work (`?q=notebook` returns 4, verified) or drop the four
tiles until Sam files stock under them; make `?collection=` a real filter or retire the param.
Whatever the route, the empty state must never be reachable from a homepage tile.

**2 · The homepage sells no product. (375, 768, 1440)**
All 8 frames of `375/home_*` opened: there is **not one product card on the homepage.** The
offers rail and AdvantageCards are gone. flyingtiger (`flyingtiger/375/00_y0.png`, seen) has a
full "Shop our favourites" rail with price and "Add to bag" **within the first 812px**, and a
second rail (`sec_14`) further down. smiggle's tile block is half price-led ("£30-£50 Bundles",
"£2 Stationery", "30% Off Gift Packs" — seen in `homepage_tiles_375px.png`).
We now have 78 real products and 19 real photos and put none of them on the homepage.
Fix: a rail of 8–10 real products above the promo tiles, "Price on WhatsApp" and all. It is the
single highest-value change available and it needs nothing from Sam.

**3 · SchoolKitTiles: six empty placeholder chips, wrong bed, wrong radius. (375, 768, 1440)**
`375/home_01_y812.png`, `768/home_02_y2048.png`. All six media are the tinted placeholder
(bed `#EEF0FB`, sampled), radius ~12px, and at 768 each is a 356×370 empty panel.
smiggle's identical block (seen): grey `#E0DED9` bed, CSS radius **0px**, real colourful
product photography in every tile, tight gaps, underlined label low on the bed, and a saturated
**blue** roundel with **white** caps at ~26% of tile width — ours is chartreuse with dark text
at ~29%, which is lower contrast at a larger size.
Fix: bed → the `bed` token; radius → 4px; badge → white on a saturated fill; and put the 19
real pack shots we already have into these six tiles.

**4 · The hero still stacks into ~518px of empty tint at 768. (768)**
`768/home_00_y0.png`. A tablet's first screen below the header is a 768×518 field of `#EEF0FB`
with one 48px chip. AUDIT-01 Defect 2b, unfixed. It is the reason 768 is the tallest layout.
Not white any more — that part improved at all three widths — but at 768 it is 518px of nothing.
Fix: keep the split side-by-side at ≥768, or stack panel-first.

**5 · Two inks on the site. Catalog/About/Contact headings are off-palette near-black. (all widths)**
Seen first, then sampled. Homepage headings: `home_00_y0.png` (75,714) and (92,491) = **`#332E92`** ✓.
Catalog "Shop Catalog": `catalog_00_y0.png` (21,280),(21,295),(40,283),(22,285) = **`#16142B`**.
"Find by Category": (20,520),(25,520) = **`#111827`** — Tailwind `gray-900`, a framework default.
Category-circle labels on the *homepage*: `home_02_y1624.png` (21,99) = **`#16142B`**.
None of these are the six banned hexes, but none are in the locked palette either, and the
difference is plainly visible: the homepage reads violet, the catalog reads black.
Fix: one heading token, `#332E92`.

**6 · "Kochi" in the About H1 is chartreuse on white — ~1.7:1 contrast. (all widths)**
`about_00_y0.png`, sampled (230,360) `#A6AB6D`, (260,365) `#BAC167` — antialiased `#CDD661`.
The location word, the most important word in that headline, is the one you cannot read.
`#CDD661` is on-palette; using it as display type on white is not.
Fix: chartreuse stays a badge/accent fill. Set "Kochi" in `#332E92`.

**7 · Category rail: first circle still clipped, rail left-packed under a centred heading. (375 / 768 / 1440)**
`build/crops/375_categories_bottom.png` (2× crop, opened): the "Stationery" circle is cut by
x=0. AUDIT-01 Defect 5, unfixed. flyingtiger (`sec_15.png`, seen) insets the rail ~16px so item 1
is whole and the item on the right is the one bleeding off.
At 768 and 1440 (`768/home_02`, `1440/home_02`) the five circles are packed left with ~150px /
~500px of empty white to their right, under a **centred** heading — the block reads misaligned
with itself. flyingtiger left-aligns the heading and has no "View all" sublink.
Good news: the white-crescent `object-fit` bug (AUDIT-01 Defect 4) **is fixed** — photos fill
the circles edge to edge at every width.
Fix: 16–20px `scroll-padding-inline-start`; left-align the heading; centre or justify the rail
at ≥768.

**8 · All five category photos are still the same beige flat-lay. (all widths)**
`1440/home_02_y1800.png`: five near-identical warm-beige circles in a row. flyingtiger's
equivalent (`sec_15.png`, seen) gives each category a different colour world — pastel yellow
stationery, wood-and-blue kitchen, white-and-paint. Ours read as one texture repeated, and the
warm beige sits directly on the cool `#EEF0FB` band. Known and logged as a separate job; still
the loudest cheapness signal at desktop.

**9 · Product card: CTA corners still asymmetric, brand line still duplicates the title. (375, 1440)**
`catalog-art_01_y812.png`. The indigo "+ Add to list" carries a bottom-left radius; the green
WhatsApp square is 90° — the card's bottom-right is a hard corner against a rounded bottom-left,
on every card. AUDIT-01 Defect 9, unfixed. "Camel Colour Pencil 24 Shades" still carries a
separate brand line reading "Camel".
Credit where due: **"Price on WhatsApp" is one line and never clipped** ✓, and there is **no
invented price, rating, review count, stock badge or offer anywhere on the site** ✓.
Fix: bottom-right radius on the green segment; delete the brand line when it is already the
first word of the title.

**10 · The WhatsApp FAB still covers copy. (375 especially)**
`375/home_00_y0.png` — it sits on top of "We pack **it before you reach**" in the school-kits
paragraph. `deadend_notebooks_375.png` — it sits on top of the empty-state message.
`catalog_00_y0.png` — it covers a category tile. AUDIT-01 Defect 15, unfixed.
Fix: bottom-safe-area offset, or hide it while scrolling.

**11 · Unfixed old blocks, unchanged since AUDIT-01, all confirmed in today's frames.**
- `SendListSection` (`375/home_04_y3248.png`): still a rounded card containing a darker rounded
  panel containing a **second search box**; still chartreuse `→` bullets.
- `BrandWall` (same frame): still 15 outlined pills as a ragged tag cloud; caption still very
  low contrast on white.
- `VisitShop` (`375/home_06_y4872.png`): still **three CTAs in three different button
  languages** in one row — chartreuse fill, white outline, green fill.
- `Footer` (`375/home_07_y5684.png`): still ends on the giant ghost "STATIONERY POINT"
  watermark clipped mid-word at the page edge; "Opposite Metro Pillar No. 837" still chartreuse
  on indigo (and rendered **indigo** on `/contact` — same line, two colours).
- Heading rule still inconsistent: centred + paragraph (school kits, categories, collections),
  left-aligned + eyebrow (send-list, brands). flyingtiger left-aligns every one, with no
  paragraph.

**12 · "Below MRP every day" is claimed and never shown. (all widths)**
The announcement bar, the catalog intro and the About copy all assert a price advantage; no
price appears anywhere on the site. Honest given the data, but the claim currently writes a
cheque the page cannot cash. Either get prices from Sam or soften the claim to something the
page demonstrates.

**Genuinely clean:** the banned-hex scan. I read every pixel of all **83** build screenshots and
counted exact matches for `#0F2042`, `#071228`, `#EDF2F9`, `#040911`, `#0A1730`, `#FFB000`:
**zero hits across every page and width.** No meta-commentary in any rendered copy either — I
dumped the full text of `/`, `/about` and `/contact` and found nothing referring to the website,
its imagery or our design reasoning.

---

## D. BLOCK-BY-BLOCK, AGAINST WHAT I COULD ACTUALLY SEE

### vs flyingtiger.com (SEEN — 375 frame + 5 element shots at 375 and 1440)

| Block | flyingtiger, measured today | Ours, measured today | Verdict |
|---|---|---|---|
| Announcement bar | 31px, dark, centred white, **› chevron**, inline link in the sentence, no close | 33px `#241F6B`, centred white, **× close**, inert text | Dimensions right; still no way to step the rotation, still a dead-end sentence |
| Header chrome | **~145px** to hero. Hamburger+"Menu", one-line wordmark, 3 right icons **with count badges**, **squared** search with a **dark filled button at the right** | **~190px** at 375, **~196px** at 1440 (nav row added). 3 icons, no badges, fully-rounded pill search, grey icon at left, no submit | 45px worse and unchanged. Wordmark **one line at 768/1440 ✓** but still wraps "STATIONERY / POINT" at 375. Desktop nav row **added ✓** |
| Hero | **223px @375 / 380px @1440.** Full-bleed photo, type on the photo, one pill | **465px @375 / 455px @1440 / stacks to ~1,030px @768.** Half is an empty `#EEF0FB` field | 2.1× the height delivering less. No longer white ✓ |
| Product rail | 368px @375, ~2.4 cards, **left-aligned heading, no paragraph**, badge + heart on media, bold price, full-width **black square** CTA flush to base | **Does not exist on the homepage** | Total miss |
| Two-up promo | **332px for BOTH tiles at 1440**, side by side, exact 50/50 mirrored, square, centred type, no eyebrow | **~830px at 1440**, stacked, inset, rounded, left-aligned type + eyebrow, ~400px dead indigo in tile 1, tile 2 photoless | White void closed ✓; everything else still wrong |
| Shop by category | 237px @375. **Left-aligned heading, no sublink**, ~16px left inset, colour-differentiated photography, 2.7 visible | ~282px. Centred heading + "View all", **first circle clipped at x=0**, five identical beige circles | Crop bug fixed ✓; inset, alignment and imagery unfixed |
| Page height @375 | **3,711** (footer 1,626 → content ≈ 2,085) | **6,260** (footer ~958 → content ≈ 5,300) | **1.69× overall, 2.5× on content** |

### vs smiggle.co.uk (SEEN — `homepage_tiles_375px.png`, trusted on-disk)

| | smiggle | Ours (SchoolKitTiles) | Verdict |
|---|---|---|---|
| Media bed | Warm neutral grey | **`#EEF0FB` blue tint** (sampled) | Wrong — and CollectionCards/ProductCard already got this right |
| Corner radius | **0px** (FINDINGS.md; reads square) | ~12px | Consumer-app soft, not retail-poster |
| Label | Inside the tile, on the bed, underlined, centred, low | Inside the tile ✓, underlined ✓, centred ✓ | **Correct** — the one block that matches |
| Media content | Real, colourful product photography in all 6 | **Placeholder chip in all 6** | Total miss |
| Badge | Saturated blue circle, **white** caps, ~26% of tile | Chartreuse, dark text, ~29% | Larger and lower contrast |
| Merchandising | 3 of 6 labels are **price-led** ("£30-£50 Bundles", "£2 Stationery", "30% Off Gift Packs") | 6 of 6 are department names | Blocked on Sam's prices |
| Label wrap | All 6 single-line, equal tiles | "Bottles & Lunch Boxes" still wraps; "Office Supplies" wraps in the circle rail | Ragged baselines, unfixed |

smiggle's whole grid mechanic is was-price / now-price / promo tag on **every** bundle
(FINDINGS.md, read in full — ~70 bundles, every one carries all three). We carry none of it.
That is a data gap, not a build defect, but it is why this site cannot reach the merchandising
bar until Sam supplies prices.

### vs hobbycraft.co.uk — **UNVERIFIED. CLOUDFLARE BOT CHECK, HTTP 403.**

No pixels obtained. Header, offers rail, product card, review counts and offer badges are
therefore judged against the written spec and against flyingtiger/smiggle only — exactly as in
AUDIT-01, and it remains the biggest hole in both audits. If you want these three blocks judged
properly, open hobbycraft on your own phone at 375px and hand over the screenshots.

### vs dickblick.com — **UNVERIFIED. IP-LEVEL BLOCK, "Restricted Access 2023".**

No pixels obtained. The savings / "SAVE up to X% off List!" mechanic and the star ratings are
unjudged. Note that we ship neither, correctly, because Sam supplied no prices or ratings.

---

## E. SCORE

# 5.5 / 10 (AUDIT-01: 4.5)

**One point of real, earned progress. Not two, because a new dead-end regression landed on the
homepage's lead block.**

What genuinely moved, all verified in pixels today:
78 real products with 19 real pack shots replacing fabricated data; the product-card bed
corrected to the reference grey; **not one invented price, rating, review count, stock badge or
offer anywhere on the site**; the PromoTiles white void closed; CollectionCards' off-palette
pastels, shadow and blurbs gone; the category-circle `object-fit` crop bug fixed; Testimonials
rebuilt from a 430px single card into a two-up rail with indigo stars; a desktop nav row at
1440; the wordmark on one line at 768 and 1440; 1,686px of real height removed at 375; and a
clean sweep on the banned-hex scan across all 83 frames.

What holds the score down:
- **Five of six school-kit tiles dead-end** — a project-rule violation shipped on the block a
  phone user meets first, in the same session that claimed dead-ends were removed.
- **The homepage sells nothing.** We finally have real products and real photography and put
  neither on the homepage. flyingtiger has priced product with an Add-to-bag button 350px into
  the page. This is the gap that makes the site read as a brochure rather than a shop.
- **The density claim was measured against a stale reference.** 1.36× is really 1.60–1.69×
  overall and **2.5× on content**. And 768 is still the tallest layout of the three, which was
  AUDIT-01's clearest single proof of structural failure and is still true.
- The blocks below the fold — SendList, BrandWall, VisitShop, Footer — are untouched since
  17 Aug and would still be spotted instantly as not-of-a-piece with any of the four references.

The trajectory is right and the discipline on data honesty is genuinely good. But the build has
not yet crossed from "correct" to "sells". Fix C1 and C2 and this is a 7.

---

## F. COULD NOT VERIFY

1. **hobbycraft.co.uk — nothing at all.** Cloudflare bot check, HTTP 403 at 375/768/1440.
   Not attempted to bypass. Header (block 2), offers rail (block 6) and product card (block 7)
   comparisons are **UNVERIFIED** in this audit, as they were in AUDIT-01.
2. **dickblick.com — nothing at all.** "Restricted Access 2023" at all three widths, IP-level.
   The savings-badge merchandising mechanic and the star-rating treatment are **UNVERIFIED**.
3. **smiggle absolute CSS pixels.** The trusted PNGs are 628px wide for a described 375px
   viewport; DPR unknown. All smiggle absolute figures are image-px or ÷1.675 estimates.
   Ratio claims (badge 26% vs 29% of tile width, tightness of gaps) are DPR-independent.
4. **smiggle live.** Not loaded; not attempted (Radware).
5. **flyingtiger's true hero hue at 375.** A residual scrim dimmed `375/00_y0.png` over the hero
   only. Structure and geometry judged from it; hue not reported. The 1440 element shots are
   clean and carry no tint — unlike AUDIT-01's red-cast captures.
6. **CollectionCards 967→801px** and **SchoolKitTiles 820 / VisitShop 732 / SendList 580 /
   Testimonials 502** from today's log. These are per-block heights; I measured whole pages and
   read block boundaries off frames, so I neither confirm nor dispute them. Whole-page numbers
   in section A are exact.
7. **Whether the four dead-end slugs (`notebooks`, `geometry`, `pouches`, `bottles`) are
   intended departments or typos.** I only established that they return zero products and render
   the empty state. Which fix is right is Sam's call, not mine.
8. **How the site behaves on a real phone.** Everything here is headless Chromium at 375px with
   a mobile UA and touch emulation. Sam reviews on an actual handset; touch targets, the FAB's
   real safe-area behaviour and iOS Safari's viewport chrome are untested.
