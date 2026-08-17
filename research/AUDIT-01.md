# AUDIT-01 — Stationery Point vs. the four references
Date: 2026-08-17 · Method: real screenshots (Playwright/Chromium), viewed as images.

---

## 1. BLOCKERS

**Screenshots DID work — but not through the normal tooling.** Read this before trusting anything below.

- `mcp__Claude_Browser__computer{action:"screenshot"}` **failed twice** ("Browser pane is not displayed, page is not compositing frames"). The preview pane is not rendering.
- `claude-in-chrome` is **not connected** (extension unreachable).
- **Workaround used:** the project has Playwright 1.62.1 + Chromium installed at `G:\Stationery point\node_modules`. I drove headless Chromium directly, wrote PNGs to disk, and opened every PNG as an image. **Every finding below comes from pixels I actually looked at.** No finding in this document comes from a DOM query or from training data.

**Reference sites I could NOT capture:**

- **hobbycraft.co.uk — HARD BLOCKED.** Cloudflare "Performing security verification / Verify you are human" checkbox. That is a CAPTCHA; I did not attempt to defeat it. **This is the most damaging gap in this audit, because hobbycraft is the stated source for THREE of the eight blocks — Header (#2), Offers rail (#6), and Product card (#7).** Those three sections below are judged against smiggle/flyingtiger and against the written spec only. **Do not treat my hobbycraft comparisons as measured.** If you want those three properly audited, capture hobbycraft yourself from a normal browser session (mobile 375px) and hand me the PNGs.
- **dickblick.com — HARD BLOCKED.** "Restricted Access — we have detected some unusual traffic from this computer." Blocked at both 375px and 1440px, so it is IP-level, not a captcha. Category circles (#5) are therefore judged against flyingtiger only.
- **The `UNVERIFIED-agent-output-2026-08-17` screenshots are worthless, confirming DO-NOT-TRUST.** I opened two: `flyingtiger/375/07-promo-tiles.png` is a 375×~40px sliver of header (not promo tiles at all), and `hobbycraft/1440/03-product-grid.png` is an **unstyled page — CSS never loaded**, just blue underlined links on white. Do not mine that folder for anything.
- **flyingtiger's lower page would not render headless.** Viewport-scroll passes came back white below ~y1400 (reveal-on-scroll / Shopify section hydration). I solved this by enumerating `.shopify-section` nodes and screenshotting each **element** individually, which worked. Those element shots carry a faint red cast (residual overlay tint) — **judge structure and layout from them, not exact hue.**
- flyingtiger's country modal + cookie banner + 4 drawer components + quick-add modal were removed before capture (logged and verified: the first attempt accidentally removed `<body>`, which I caught and fixed).

**Values I could not read:** smiggle's absolute CSS pixel values. The saved smiggle PNGs are 628px wide for what is described as a 375px viewport, so their DPR is unknown. **Every smiggle number below is a ratio or a scaled estimate and is labelled as such.** flyingtiger and our-build numbers are true CSS px at a real 375/768/1440 viewport.

---

## 2. VERDICT

**It does not belong beside them yet. 4.5 / 10 against the reference bar.**

The bones of blocks 4–7 are genuinely close to spec — the product card in particular is the best thing on the page. But the page reads *cheaper and thinner* than all four references for one overwhelming reason: **it is mostly empty.** Our page is **7,946px tall at 375px against flyingtiger's 4,609px — 1.72× taller** — and it is carrying *less* content than flyingtiger does. Worse, it gets **taller as the screen gets wider**: 7,946px @375 → **8,640px @768** → **8,546px @1440**. A desktop layout that is longer than its own mobile layout is a structural failure; the references collapse content sideways as width grows, ours just inflates.

**The single biggest gap: the promo tiles (block 8) are roughly half pure white nothing, and the hero (block 3) is the same bug.** flyingtiger's two-up promo tiles are **full-bleed, edge-to-edge, exactly 50/50 photo-to-flat-panel, ~180px tall each at 375px, with a ~5px gap between them** — zero wasted pixels. Ours renders the flat panel at ~166px wide, inset from the viewport edge, with **the entire other half as blank white** — not a tinted placeholder, an actual hole — and ~40px of white between tiles. At 1440px this becomes **720px of pure white beside each panel**, and the panels themselves are ~590px tall carrying only ~190px of type, so ~400px of empty indigo. That one block is ~1,180px of desktop page for two sentences and two buttons. Nothing on flyingtiger, smiggle, hobbycraft or blick would ever ship like that.

---

## 3. SIDE-BY-SIDE, BLOCK BY BLOCK

### 1. Announcement bar ← flyingtiger

**flyingtiger (measured, 375px):** full-bleed near-black/dark-navy band, **y0→33 = 33px**. Centred white bold ~12px text, two lines when long ("Don't miss the drop for our Nordic spice houses! Sign up **here**") with an **inline underlined link inside the sentence**. **Left and right chevron arrows** at the band's extreme edges — it is a manually steppable carousel. No close button.

**Ours (measured, 375px):** full-bleed `#241F6B` band, **y0→33 = 33px**, centred white text. Height and bleed are correct.

**Differences:**
- Ours has an **× close button** at the right; flyingtiger has **‹ › chevrons**. Ours rotates content (375 showed "Bulk rates for schools & offices", 1440 showed "4.8★ from 150+ Google reviews") but gives the user **no way to step it** — the rotation is invisible and unaddressable. flyingtiger's arrows advertise that there is more than one message.
- Ours dismisses permanently; flyingtiger never lets you remove the merchandising slot.
- flyingtiger puts a **link inside the sentence**; ours is inert text. Every message on ours is a dead end.

### 2. Header ← hobbycraft ⚠️ REFERENCE UNAVAILABLE

**Cannot compare to hobbycraft — Cloudflare-blocked.** Judged against spec + the two headers I could see.

**smiggle (measured from saved PNG, scaled):** hamburger + magnifier at **left**, centred wordmark, account/heart/bag at **right**. **No text labels under any icon. No search row — search is an icon only.** Header band ≈ **39 CSS px** (66 image px ÷ 1.675). Brutally compact.

**flyingtiger (measured, 375px):** hamburger at left **with the text label "Menu" underneath it** — and *only* that icon is labelled; the three right-hand icons (account, heart w/ red "0" badge, bag w/ dark "0" badge) are **unlabelled**. Wordmark centre-left. Search on **its own row**: a **squared-corner input (~4px radius) with a dark filled magnifier button block at the right end**. Chrome total **y0→~145px**, hero starts ~145.

**Ours (measured, 375px):** announcement 0–33 · icon row 33–98 (Menu, Shop with labels under; centred logo; WhatsApp with label) · search row to ~146 · trust strip 150–190. **Chrome total = 192px before any content.**

**Differences:**
- **Ours burns 192px of the 812px viewport (24%) before the hero — flyingtiger burns 145px (18%).** 47px worse, and that is 47px of the most valuable real estate on the page.
- **Only 3 icons.** Menu, Shop, WhatsApp. flyingtiger carries 4 icons + hamburger and each right icon has a **count badge**. Ours has no cart/list count, no wishlist, no account — so at **1440px the header is a wasteland**: two icons hugging the far left, one at the far right, and ~900px of empty white across the middle. There is **no desktop navigation row at all**. At desktop ours reads like an unfinished template.
- **The logo lockup wraps to two lines — "STATIONERY / POINT" — at every breakpoint including 1440px**, where there are ~900px of free space beside it. A wordmark that wraps is a broken wordmark. flyingtiger's and smiggle's sit on one line always.
- **Our search pill is fully rounded (~999px radius) with a grey magnifier at the LEFT and no submit button.** flyingtiger's is **squared (~4px) with a dark filled button at the RIGHT**. Ours reads soft/decorative — like a filter field; flyingtiger's reads like a tool. Ours gives no affordance that pressing anything searches.
- Ours labels 3 of 3 icons; flyingtiger labels 1 of 4. Labelling everything is per the hobbycraft spec, but combined with our tiny icon count it makes the row feel padded rather than dense.
- **Trust strip:** ours is correct to spec — two claims split by a divider, on `#EEF0FB`, ~44px ("Free delivery across Kochi | Or pick up from the shop"). Good. But its type is ~11px and pale, so it costs 44px and reads as a whisper.

### 3. Hero ← flyingtiger promo tiles + smiggle teal panel

**smiggle (measured from saved PNG, scaled):** full-bleed teal chalkboard photo. **All type sits inside a thin white ruled frame** over it. The type is **dense and enormous**: "BACK TO SCHOOL" in two lines of very heavy outlined display caps, then "**25% OFF** BUNDLES" as a full-width line, then a **two-column split divided by a vertical rule** — "BUILD A BUNDLE" / "READY-MADE BUNDLES" — each with its **own outlined pill CTA ("SHOP NOW" ×2)**, plus fine print "*T&Cs Apply." Below the frame the photo continues with two children and product. **Two CTAs, five distinct type sizes, a rule, and legal copy in one hero.**

**flyingtiger (measured, 375px):** hero **y143→360 = 217px**. Full-bleed photo, type **directly on the photo**, centred: white heavy ~26px headline "A great school start", ~13px subcopy over two lines, one solid rounded-pill CTA. No scrim, no split panel.

**Ours (measured, 375px):** **y192→757 = 565px.** Photo half **y192→467 = 275px of PURE WHITE.** Panel `#332E92` **y467→745 = 278px** carrying: chartreuse ~10px eyebrow "ART & CRAFT", white ~28px/2-line headline, ~13px subcopy ×2 lines, one white pill CTA. Then a dot row to 757.

**Differences — this is the second-worst block on the page:**
- **Our hero is 2.6× flyingtiger's height (565 vs 217px) and delivers less.** flyingtiger fits headline + subcopy + CTA into 217px by putting type *on* the photo. We stack photo *above* type, so we pay for both.
- **The "photo half" is not a tinted placeholder panel — it is `#FFFFFF` nothing.** 375×275px of blank white. This is the wrong-placeholder / leaves-a-hole case: it does not read as "image pending", it reads as a rendering failure. Every other placeholder on the page is `#EEF0FB`; the hero's is white.
- **At 768px it is catastrophic.** The split does not stay side-by-side — it **stacks**, so the hero opens with **~560px of unbroken white** and the panel only appears at y~790. A tablet user's entire first screen is blank white below the trust strip.
- **At 1440px the white half is 720×450px.** Half the hero is void.
- **Our type is far weaker than smiggle's.** smiggle stacks 5 type sizes, a dividing rule, 2 CTAs and legal fine print. We ship eyebrow + 2-line headline + 2-line subcopy + 1 CTA, and the panel still has slack — at 1440 the panel is 590px tall with type occupying only the middle ~250px, i.e. **~170px of dead indigo above and below.**
- **The carousel is under-signalled at mobile.** Three tiny dots (~5px) at y757 and nothing else. flyingtiger's announcement bar gets visible chevrons; our *hero* carousel gets dots smaller than the announcement bar's text.
- At 1440 the prev/next arrows are **floating white circles half-hanging off the viewport** (left arrow centred at x≈33) sitting **over the white void**, which makes them look like stray UI rather than hero controls.
- No gradient scrim: **correct**, per spec.

### 4. School kit tiles ← smiggle "READY. SET. BACK TO SCHOOL."

**smiggle (measured from `homepage_tiles_375px.png`, 628px wide — ratios reliable, CSS px estimated ÷1.675):**
- Heading "READY. SET. BACK TO SCHOOL." — **black**, very heavy, ALL CAPS, tightly tracked, sitting **~28 image px (~17 CSS px) above the first tile**. **There is NO description paragraph. Heading → tiles, immediately.**
- 6 tiles, 2 per row, media **1:1**, tile media is a **neutral warm grey (~#E0DED9)** — *not* a brand colour — with the product photo cut out on it.
- Label **inside the tile, below the image, centred, underlined**, regular (not bold) weight, and **large relative to the tile**. Label-to-tile-bottom ≈ **22 image px ≈ 13 CSS px**.
- **Row gap ≈ 11 image px ≈ 6–7 CSS px. Column gap ≈ 14 image px ≈ 8 CSS px.** Extremely tight.
- Tile radius ≈ 8 image px ≈ **5 CSS px** — nearly square.
- Roundel badge on the **first tile only**: **saturated blue circle, WHITE bold caps, two lines ("HOT OFFER")**, top-right, ≈ **26% of tile width**.
- All six labels fit on **one line**, so all six tiles are exactly equal height.

**Ours (measured, 375px):** heading "SCHOOL KITS, SORTED." indigo bold caps at page y~840. **Then a centred 2-line paragraph** ("Pick a kit, send it on WhatsApp. We pack it before you reach the shop.") y~865–900. First tile row y931–1138. Tile = 165px wide, media 165×166 (1:1 ✓), label at y~1117, tile bottom 1138.

**Differences:**
- **We inserted a description paragraph smiggle does not have.** It costs ~50px and, worse, it *breaks the punch* — smiggle goes heading→tiles like a poster; we cushion it with a sentence.
- **Our tile is loose where smiggle is tight.** Label-to-tile-bottom ours ≈ **21px** vs smiggle ≈ **13px** — ours is ~1.6× looser, and the label consequently floats in the tile instead of anchoring it. Image-bottom-to-label ours ≈ **13px**.
- **Our row gap is 14px; smiggle's is ~6–7px.** Ours is ~2× looser, so our grid reads as six separate cards, smiggle's reads as one dense block.
- **Our tile radius ~12px vs smiggle ~5px.** Ours is visibly softer/rounder — a consumer-app look, not a retail-poster look.
- **Our media background is `#EEF0FB` (the brand tint); smiggle's is neutral warm grey.** This is not a palette change — it is a *role* mistake. A tinted brand-blue bed will fight every product photo you drop on it (especially blue/indigo school goods). smiggle deliberately uses a dead neutral so product colour pops. Recommend a neutral grey specifically for **product/tile media beds**, keeping `#EEF0FB` for section bands.
- **"Bottles & Lunch Boxes" wraps to two lines**, making tile 6 taller than tile 5 and **breaking the row's bottom baseline**. All six of smiggle's labels are single-line. Ours already fails on our own copy.
- **Our badge is oversized and lower-contrast.** ~58px on a 165px tile = **35% of tile width** vs smiggle's ~26%. And ours is **chartreuse `#CDD661` with dark indigo text** — smiggle's is saturated blue with **white** text. Ours has markedly less punch at a larger size, which is the worst of both.
- Correct to spec: 6 tiles, 2-up, 1:1 media, label inside/below/centred/underlined, roundel on tile 1 only. The skeleton is right; the **rhythm** is wrong.
- At 1440 the grid goes **3-up** and each tile's media becomes wide (tile ~390px) — verify it is still 1:1; in the capture the media reads landscape, which contradicts the 1:1 spec.

### 5. Category circles ← flyingtiger + dickblick ⚠️ dickblick unavailable

**flyingtiger (measured, 375px):** heading "Shop by category" **left-aligned**, bold ~19px, no paragraph. Circular photo tiles ~**128px diameter**, **~2.7 visible**, horizontal scroll rail. **The rail has a left inset (~20–32px) — the first circle is fully visible and never clipped.** Label **centred beneath** the circle, **bold dark ~14px**, ~14px below the circle. Photos **completely fill** each circle.

**Ours (measured, 375px and 1440px):** "Shop by category" **centred**, plus a **"View all" underlined link beneath the heading**. Circles ~100px at 375, real beige flat-lay photography, labels centred beneath in bold indigo.

**Differences:**
- **BUG: our circle images do not fill the circle.** At both 375px and 1440px every circle shows a **white crescent across the bottom** — the photo occupies the upper ~80% and the container's lower arc is empty white. Unmistakable at 1440. This is a genuine `object-fit`/aspect bug, not missing imagery, and it makes seven circles look like seven clipped mistakes. flyingtiger's fill edge-to-edge.
- **BUG: the rail has no left inset at 375px — the first circle ("Stationery") is clipped by the viewport's left edge.** It reads as broken, not as a scroll affordance. flyingtiger insets the rail so item 1 is whole and item 3 is the one bleeding off the right.
- **Ours are ~100px; flyingtiger's are ~128px.** Ours are ~22% smaller, so they carry less imagery and feel more like icons than category doors.
- **Ours centres the heading and adds a "View all" link; flyingtiger left-aligns and adds nothing.** The centred heading + centred sublink stack costs ~50px and, combined with the same treatment on the two neighbouring blocks, makes three consecutive centred heading/paragraph stacks — a monotonous rhythm none of the references have.
- **All seven of our category photos are the same beige/tan flat-lay.** At 1440 you see seven near-identical warm-beige circles in a row: they do not read as seven different departments, they read as one texture repeated. And **beige/tan is off-palette warmth** sitting directly on `#EEF0FB` cool indigo tint — the two clash.
- Correct to spec: circular tiles, bold centred label beneath, horizontal rail.

### 6. Offers rail ← hobbycraft "Our best offers" ⚠️ REFERENCE UNAVAILABLE

**Cannot compare to hobbycraft — Cloudflare-blocked.** Judged against spec, plus flyingtiger's equivalent rails ("Shop our favourites", "Trending now") which I did measure.

**Ours (measured):** tinted `#EEF0FB` band ✓ · centred heading "Below MRP right now" ✓ · **~2.2 cards visible at 375px** ✓ · **white circular arrows on the card edges at 1440** ✓ · **centred pill "See the full catalogue" beneath** ✓. **The spec'd skeleton is genuinely met — this is our best-executed block.**

**Defects:**
- **A centred 2-line paragraph under the heading** ("Everyday prices, not a sale. Add what you need to a list and send it in one message."), ~50px. Both flyingtiger rails I measured go **heading → cards with a ~14–20px gap and no paragraph**, and their headings are **left-aligned**.
- **The desktop arrows are badly placed.** At 1440 they sit at y≈330, which is **exactly the seam between the card's image and its text block**, so each arrow straddles the image edge and clips the card's hairline border. Reference rails place the arrow at the **vertical centre of the media**, clear of the text.
- **The left arrow is visible at scroll position 0**, pointing left when there is nothing to the left. It must be hidden/disabled at the start of the rail.
- **Card CTAs do not align across the rail.** At 1440, "Camlin Geometry Box" has a **one-line** title while its four neighbours have **two-line** titles, so its whole lower stack rides up and its CTA sits **~22px higher** than the others. A rail whose buttons form a ragged line looks unfinished. The card's price/badge/stars/CTA block needs to be pinned to the card base (flex column + `margin-top:auto`) with the title reserving a fixed 2-line box.
- flyingtiger fits **2.4** cards at 375; ours 2.2 — comparable, fine.

### 7. Product card ← hobbycraft ⚠️ REFERENCE UNAVAILABLE

**Cannot compare to hobbycraft — Cloudflare-blocked.** Judged against spec, flyingtiger (measured), and smiggle's grid (measured from `bundles_listing_grid.png`).

**flyingtiger (measured, 375px):** 1:1 media on near-white. **"New in" badge = white pill with a visible hairline border**, top-left. **Wishlist heart, top-right.** Title **one line, truncated with "…"**. Price bold on its own line. **Full-width dark "Add to bag" button, square corners, flush to the card base.** Card ≈ 285px tall; rail gap ≈14px. **No stars, no save badge.**

**smiggle grid (measured from saved PNG):** 2-up grid, **grey 1:1 media**, small white "Most Popular" badge over the image, title (up to 2 lines, small), then **struck list price and bold net price on the SAME line**, then a **single line of coloured promo TEXT** ("25% Off. Online Only" / "Hot Offer"), then "+ 3 colours". Wishlist heart and add-to-bag are **small icons to the right of the text — there is no large CTA button at all.** Vertical rhythm is ~4px between every line. Extremely compact.

**Ours (measured, 375px + 1440px):** 1:1 media ✓ · ~4px radius ✓ · 1px hairline border ✓ · soft shadow ✓ · ~15px/400 title at lh~1.5 ✓ · **net price bold + list price struck alongside** ✓ · **indigo half-stars with bracketed count "(84)"** ✓ · **CTA flush to card base with bottom-only corners** ✓. **Closest-to-spec block on the page — this one is good.**

**Defects:**
- **The title truncates mid-word and destroys the product identity.** At 375px: "Faber-Castell Mathematical…" and "Apsara Platinum Extra Dark Pencil…". The clamp fires at 2 lines *and* ellipsises, so the shopper cannot tell what the item is. smiggle wraps to two full lines and keeps the name. flyingtiger truncates to one line but its SKU names are 3 words long — ours are 6–8, so the same rule cannot be borrowed. Give the title a 2-line box and shorten the display names, or allow 3 lines.
- **The CTA is split into an indigo "+ Add to list" plus a green WhatsApp square, and the corners are asymmetric** — the indigo half gets a bottom-left radius, the green square stays fully square, so the card's bottom-right corner is a hard 90° against a rounded bottom-left. Visibly lopsided at both widths.
- **The chartreuse "Save ₹25 · 21% off MRP" block is heavy and ragged.** It is a solid filled band whose **width varies per card** (₹8/13%, ₹35/17%, ₹13/14%…), so a rail of five cards shows five different-length chartreuse bars — a jagged stripe across the row. smiggle's equivalent is **one line of coloured text**, which stays visually calm at any length. Consider text, not a filled block.
- **Card carries 6 stacked elements** (title, brand, price row, save block, star row, CTA) where flyingtiger carries 3 and smiggle 4. That is why our card is ~330px+ against flyingtiger's ~285px. The **brand line** ("Faber-Castell" under a title that already says "Faber-Castell") is pure duplication — delete it and you save a row on every card.
- **No wishlist/save affordance and no badge on the media.** flyingtiger puts a bordered white "New in" pill top-left *and* a heart top-right on every card; smiggle puts "Most Popular" over the image. Our media is a bare square, so it looks emptier than either reference — and it will still look emptier once photography lands.
- The media placeholder shows a **small rounded "broken image" chip** dead centre. Once imagery lands this is moot, but at 1440 five cards each showing a broken-image glyph reads as five errors.

### 8. Promo tiles ← flyingtiger two-up

**flyingtiger (measured from element screenshot `sec_13.png`, 375px — structure reliable, hue tinted):**
- **Two tiles stacked, each FULL-BLEED x0→375. No horizontal margin whatsoever.**
- **Tile 1: y0→180. Left half = photo (x0→180). Right half = flat colour panel (x180→375).** Exact 50/50.
- **Tile 2: y185→365. ALTERNATES — left half = flat colour panel, right half = photo (Copenhagen houses).**
- **Vertical gap between the two tiles ≈ 5px.**
- Each half is therefore ≈ **187×180px, near-square.**
- Panel content: **centred** ~15px bold heading over 2–3 tight lines, then a **white fully-rounded pill CTA (~100px wide), centred beneath.** No eyebrow label.
- **Square corners. The photo fills its half completely, edge to edge.** Zero wasted pixels anywhere in the block. Total block ≈ **365px** for two full promos.
- (Separately, `sec_15.png` shows a *different* flyingtiger pattern: full-bleed photo banner with left-aligned type + white pill overlaid directly on the image.)

**Ours (measured, 375px and 1440px):**
- **Tile 1: indigo panel at x192→358 (166px wide), ~185px tall. x0→192 is PURE WHITE. Right margin of 17px.**
- **Tile 2: deep-indigo panel at x16→190. Right side blank white. Left margin of 16px.**
- **Vertical gap between tiles ≈ 40px+ of white.**
- Panel content: chartreuse ~10px **eyebrow** ("SCHOOLS & OFFICES" / "PARTIES & EVENTS"), **left-aligned** white bold 2-line heading, white pill CTA lower-left.
- **At 1440: panel occupies x720→1328 with 720px of pure white beside it and a 112px gap to the right edge. Panel is ~590px tall carrying ~190px of type — ~400px of empty indigo. Rounded outer corners (~8px). Block total ≈ 1,180px.**

**Differences — this is the worst block on the page:**
- **The photo half does not exist. It is `#FFFFFF`.** Not a tinted placeholder — a hole. At 1440 that is a **720×590px white void** per tile. This is the single most damaging thing in the build.
- **Not full-bleed.** flyingtiger's tiles run edge to edge; ours are inset, and **inconsistently** — tile 1 sits 17px off the right edge, tile 2 sits 16px off the left. They do not share a margin, so the two tiles look staggered and ragged rather than stacked.
- **The 50/50 split is broken.** flyingtiger: panel = 187 of 375 (**50%**). Ours: panel = 166 of 375 (**44%**), with the remaining 56% empty. At 1440 the panel is 608 of 1440 (**42%**).
- **Vertical gap 40px+ vs flyingtiger's ~5px** — 8× looser.
- **Panel type is left-aligned with an eyebrow; flyingtiger's is centred with no eyebrow.** Ours also parks the type in the panel's upper-middle, leaving the panel's lower third empty — flyingtiger's centred lockup fills its panel.
- **Total block height: ours ≈ 550px at 375 (and ~1,180px at 1440) vs flyingtiger's 365px at 375** — and flyingtiger's 365px is fully covered in photo and colour while more than half of ours is white.
- **Rounded corners (~8px) vs flyingtiger's square.** Combined with the insets, ours read as two floating cards; flyingtiger's read as an architectural band across the page.
- Correct to spec: alternating panel side, white pill CTA on the panel. Everything else about the block is wrong.

---

## 4. DENSITY GAP

**Yes. Our page is dramatically emptier, and the numbers are unambiguous.**

| | 375px | 768px | 1440px |
|---|---|---|---|
| **Ours** | **7,946px** | **8,640px** | **8,546px** |
| flyingtiger | **4,609px** | not captured | not captured |

- **1.72× taller than flyingtiger at mobile** while carrying comparable or less content.
- **The page gets TALLER as it gets wider** (7,946 → 8,640 → 8,546). This is backwards and is the clearest single proof of the density failure: our blocks do not use horizontal space, so extra width buys nothing and the stacked-hero/promo bugs actually *add* height.

**Where exactly the space goes (all measured):**

1. **Promo tiles — the worst offender.** ~50% of the block's area is blank white at 375; at 1440 it is ~720px × 2 tiles of white plus ~400px of empty indigo *inside* each panel. **~1,180px at desktop for two sentences.** flyingtiger does two complete promos in **365px**.
2. **Hero — second worst.** 565px at 375 of which **275px is white**; at 768 it stacks into **~560px of unbroken white** as the first thing under the header; at 1440 a **720×450px** void. flyingtiger's hero: **217px, fully covered.**
3. **Testimonials — ~430px of page for ONE review.** A single giant white card (large radius, ~17px body at lh~1.6) plus an arrow pair and **nine** dots. smiggle fits **two full product rows** in comparable space.
4. **AdvantageCards at mobile — a single centred column, ~250px per item × 4 items ≈ 1,000px** for four short value props, each item being icon-chip + indigo heading + black bold subtitle + grey body + underlined link (four type styles per item), separated by hairlines. No reference uses a one-per-row centred icon list on mobile.
5. **Header chrome: 192px before content** vs flyingtiger's 145px.
6. **Description paragraphs under three consecutive headings** (school kits, offers rail, and the centred "Shop by category" + "View all" stack) — ~50px each, ~150px total, none of which flyingtiger or smiggle spend. smiggle goes heading→tiles with **~17px**.
7. **Naked white gaps between blocks at desktop:** ~120px between the bulk-list panel and Brands; ~70px below Brands; ~110px between the category circles and the next heading; ~60px between school tiles and the category band. These are pure padding, not breathing room.
8. **School tile looseness:** row gap 14px vs smiggle ~6–7px; label-to-bottom 21px vs ~13px. Small per tile, but it is the difference between "one poster" and "six loose cards."
9. **Footer runs from y~6,700 to 7,946 at mobile — ~1,250px, ~16% of the entire page** — single-column stacked link lists with ~28px line spacing, plus a giant ghost wordmark.
10. **BrandWall at 1440:** 16 pills in 2 ragged rows; the second row (Systemark/Foli/Jags) leaves **~1,100px of empty white to its right.**

---

## 5. THE OLD BLOCKS

Everything below the promo tiles. All of it would be spotted instantly as not-of-a-piece with the four references.

**CollectionCards**
- **Off-palette pastels.** The eight card media beds are pale indigo, **pale pink, pale cream, and pale green**. Pink, cream and green are **not in the locked palette** (`#332E92` / `#241F6B` / `#EEF0FB` / `#CDD661`). At 1440 you see a pastel patchwork. smiggle uses one neutral grey for every tile; flyingtiger uses photography.
- **Soft drop shadows under every card** — visible blur at 1440. No reference card I measured has an elevation shadow (flyingtiger uses a hairline; smiggle uses a flat grey bed).
- **Large corner radius (~14px)** vs smiggle ~5px / flyingtiger square.
- **The section sits on a vertical gradient** (≈`#F7F8FD` fading to white). None of the references gradient a section ground.
- **Structure is wrong for the bar:** tinted media block, then a **separate white text panel** carrying title + subtitle. smiggle's proven pattern puts the label **inside the tile on the media bed**, underlined, with no white panel — which is exactly what our own block 4 already does correctly. This block contradicts block 4 twenty percent down the same page.
- At 375 the rail is cut mid-card on the right with no visible affordance.

**"Send your whole list at once" panel**
- A **giant inset rounded card (~16px radius)**, ~270px tall at desktop, with a **nested darker rounded panel** holding a second search box — a box inside a box inside a box.
- **Chartreuse "→" glyph bullets** on the three list items. Decorative arrow bullets appear on none of the references.
- A **second search field**, duplicating the header's. Two search boxes on one page.
- Followed by **~120px of naked white**.

**BrandWall**
- **16 white outlined fully-rounded pills** in ragged rows — a **tag cloud**. This is the "floating pills" failure exactly. No reference shows brands as pills; retail sites show brand **logos** in a tidy grid, or omit them.
- Ragged right edge on both rows; at 1440 the second row leaves ~1,100px empty.
- Left-aligned eyebrow + heading here, but **centred** headings three blocks above — the page has no consistent heading alignment rule.
- Trailing caption in **chartreuse body text** ("Looking for something else? Ask us…") — chartreuse is a badge/accent colour; as running body copy on white it is close to illegible.

**Testimonials**
- **~430px for one review.** Enormous white card, large radius, ~17px body at lh~1.6.
- **Chartreuse stars.** Not gold — but chartreuse-green stars are just as wrong; ratings read as yellow/orange or as the brand primary. Our own product cards use **indigo** half-stars, so **the same page rates products in indigo and reviews in chartreuse.**
- **Nine pagination dots** plus a **circular arrow pair bottom-left** — two competing navigation systems for one carousel, and nine dots signals "you have eight more of these to read."
- Circular avatar photo + name + "4 reviews · a year ago" — a social-proof widget look, not a retail look.
- Sits in an `#EEF0FB` band identical to the offers band, so two very different sections read as the same section.

**VisitShop**
- **Three CTAs in a row in three different styles**: chartreuse filled pill, white outlined pill, **green filled pill**. Three button languages side by side. At 375 they stack into a ragged three-line pile of mismatched widths.
- Shop photo has a **large corner radius** floating on the deep indigo with ~130px of empty indigo beneath it at desktop.
- Genuine credit: this is real photography and the address/hours/metro-pillar block is useful, locally specific content.

**AdvantageCards**
- **Single centred column at mobile, ~250px per item × 4 ≈ 1,000px.** Reference sites use a tight multi-column strip or a text row.
- **Four type styles per item** (indigo heading, black bold subtitle, grey body, underlined link) — more hierarchy than the content justifies.
- **Circular pale icon chips**, and the WhatsApp one is a **pale green** chip while the others are pale indigo — inconsistent, and green again.
- **A stray chartreuse sparkle glyph floats after "More value. Less hassle."** Decorative sparkles appear on none of the four references.
- Hairline dividers between items (vertical at desktop, horizontal at mobile) — a spec-sheet device, not a merchandising one.

**Footer**
- **~1,250px at mobile, ~16% of the whole page.** Single-column stacked lists with ~28px line spacing — a tap target budget, not a design.
- **A giant ghost "STATIONERY POINT" watermark wordmark** bleeding off the bottom edge, clipped mid-word. A decorative oversized watermark appears on none of the references, and it is the last thing the user sees.
- **Chartreuse "Opposite Metro Pillar No. 837"** as body copy — low contrast on indigo.
- Social icons (WhatsApp, Instagram) sit inline with an underlined "View Map" link, so icons and text links share a row with no visual separation.

**Global (affects all blocks)**
- **The green WhatsApp FAB overlaps content in nearly every single capture** — it sits over the 6th school-kit tile, over product card content, over the testimonial arrows, over the footer. It has no safe-area offset and no scroll-aware hiding.
- **Green is an unmanaged fifth colour.** It appears in the FAB, in every product card CTA, as a VisitShop pill, and as an AdvantageCards icon chip. WhatsApp green is defensible as a *brand affordance* on the primary action, but it is currently leaking into decoration. Confine it to one role.
- **No consistent heading rule:** centred + paragraph (school kits, offers, categories), left-aligned + eyebrow (collections, brands, advantages), centred no-paragraph elsewhere. flyingtiger left-aligns every section heading with no paragraph, full stop.

---

## 6. RANKED DEFECT LIST

**1 · Promo tiles — the photo half renders as pure white, and the tiles aren't full-bleed.**
Ours: panel = 44% of width (166/375), remainder `#FFFFFF`; inset 17px right on tile 1 and 16px left on tile 2; 40px+ gap between tiles; ~1,180px tall at 1440 with ~400px of empty indigo inside each panel.
Reference: **flyingtiger** (`sec_13.png`) — full-bleed x0→375, exact 50/50, ~180px per tile, **~5px** gap, square corners, photo fills its half completely, total block **365px**.
Fix: make each tile `width:100vw`, zero horizontal margin, square corners. Two children at exactly `50%` each. Give the media half a `#EEF0FB` (or neutral grey) placeholder so it is never white. Set each tile's height to ~180px at 375 (`aspect-ratio` on the halves ≈ 1:1). Reduce inter-tile gap to 4–6px. Centre the panel type, drop the eyebrow, and cap panel padding so type fills the panel instead of floating. At 1440 keep the 50/50 full-bleed band rather than growing height.

**2 · Hero — the photo half is a white hole, and it stacks into a 560px void at 768px.**
Ours: 565px at 375 with 275px white; **~560px of unbroken white as the first content at 768**; 720×450 white at 1440.
Reference: **flyingtiger** — 217px, type on photo, no void. **smiggle** — dense multi-size type lockup, 2 CTAs, rule, fine print.
Fix: (a) give `SmartImage`'s hero variant the `#EEF0FB` placeholder every other block already uses — no white, ever. (b) **Keep the split side-by-side at 768** (this is a breakpoint bug, not a design choice) or, if it must stack, put the panel FIRST. (c) Cut hero height at 375 toward ~300–380px total. (d) Cap the panel's max height at desktop so the type lockup isn't swimming in ~170px of dead indigo above and below. (e) Add a second CTA and a fine-print/price line to earn the space, per smiggle.

**3 · The page is 1.72× flyingtiger's height and grows taller with width.**
Ours: 7,946 @375 · **8,640 @768** · 8,546 @1440. flyingtiger: 4,609 @375.
Fix: treat 8,640 @768 as a bug, not a layout. Targets, in order of payoff: promo tiles (−600px+), hero (−250px, −500px at 768), Testimonials (−250px), AdvantageCards mobile (−500px), the three description paragraphs (−150px), footer (−400px), inter-block white gaps at desktop (−350px). Those alone bring 375px under ~5,800px.

**4 · Category circle images don't fill the circle — white crescent on every one.**
Ours: photo occupies the upper ~80%, lower arc is white. Visible at 375 and unmistakable at 1440, on all seven.
Reference: **flyingtiger** — photos fill each circle edge to edge.
Fix: `aspect-ratio:1; object-fit:cover; object-position:center; border-radius:50%; overflow:hidden` on the media wrapper, and ensure the `<img>` is `width:100%;height:100%;display:block`. This is a real CSS bug — fix it before anything cosmetic.

**5 · Category rail clips the first circle at the viewport edge.**
Ours: "Stationery" is cut by x=0 at 375 — reads broken.
Reference: **flyingtiger** — rail has a ~20–32px left inset; item 1 is whole, the right-hand item bleeds off.
Fix: `scroll-padding-inline-start` / a left inset on the rail (or first-child margin) of 16–20px, and let overflow show on the **right** only.

**6 · Offers rail: card CTAs don't align, and the arrows are misplaced.**
Ours: a one-line title ("Camlin Geometry Box") lifts that card's whole lower stack, putting its CTA ~22px above its neighbours'; desktop arrows sit at the image/text seam and clip the hairline; the left arrow shows at scroll 0.
Reference: spec'd from **hobbycraft** (unverified — blocked); flyingtiger's rails keep buttons on one line.
Fix: card as `display:flex; flex-direction:column`, with the price/badge/stars/CTA group `margin-top:auto`; give the title a fixed 2-line min-height. Move arrows to the vertical centre of the **media** box, and hide/disable the left arrow at `scrollLeft===0`.

**7 · School kit tiles are ~2× looser than smiggle, and a label wrap breaks the grid.**
Ours: row gap 14px, label-to-bottom 21px, radius ~12px, badge 35% of tile width, and **"Bottles & Lunch Boxes" wraps to two lines** making tile 6 taller than tile 5. Plus a 2-line description paragraph smiggle doesn't have.
Reference: **smiggle** `homepage_tiles_375px.png` — row gap ~6–7px, label-to-bottom ~13px, radius ~5px, badge ~26%, all labels single-line, **no paragraph**.
Fix: row gap → 6px, column gap → 8px, label-to-bottom → 13px, radius → 4–5px, badge → ~26% of tile width. Delete the description paragraph; heading sits ~17px above the tiles. Shorten the label to "Bottles & Lunch" (or set `min-height` for a 2-line label box on all six so heights stay equal). Change the badge to **white text on a saturated fill** for contrast.

**8 · Product-card media bed uses the brand tint where the references use neutral grey.**
Ours: `#EEF0FB` cool indigo tint behind products, in both block 4 tiles and product cards.
Reference: **smiggle** — a dead neutral warm grey (~#E0DED9) behind every product; **flyingtiger** — near-white.
Fix: introduce one neutral grey token for **product media beds only**. This is not a palette change — `#EEF0FB` stays as the section-band colour. A blue-tinted bed will fight blue school products the moment photography lands.

**9 · Product card: mid-word truncation, asymmetric CTA corners, ragged save bars, duplicate brand line.**
Ours: "Faber-Castell Mathematical…"; indigo CTA has a bottom-left radius while the green WhatsApp square is 90°; the chartreuse save block's width varies per card; the brand line repeats a word already in the title.
Reference: **smiggle** — 2 full title lines, struck+net price on one line, promo as a single line of coloured **text**, no big CTA. **flyingtiger** — bordered white badge + heart on the media, one-line title, square full-width CTA.
Fix: give the title a 2-line box without ellipsis (or shorten display names). Apply the bottom-right radius to the green segment. Convert the save block to a single line of coloured text. Delete the brand line. Add a badge and/or save affordance on the media so it isn't a bare square.

**10 · Header: 192px of chrome, a wordmark that wraps, only 3 icons, and no desktop nav.**
Ours: 192px before content; "STATIONERY / POINT" wraps on two lines even at 1440; ~900px of dead space across the desktop header; fully-rounded search pill with a left icon and no submit button.
Reference: **flyingtiger** — 145px chrome, one-line wordmark, 4 icons + hamburger with **count badges**, search as a **squared input with a dark filled button at the right**. **smiggle** — ~39px header band.
Fix: stop the wordmark wrapping (single line, `white-space:nowrap`, size to fit). Trim the icon row and search row to reclaim ~40px. Square the search field to ~4px and add a filled submit button on the right. At ≥1024px add a horizontal category nav row so the header isn't 900px of white. **Re-audit against hobbycraft once you can capture it.**

**11 · Old blocks: off-palette pastels, drop shadows, gradients, oversized radii.**
Ours: CollectionCards uses pale **pink/cream/green** media beds, soft drop shadows, ~14px radii, on a **vertical gradient** ground. Testimonials/bulk panel use large-radius floating cards.
Reference: none of the four uses pastel pinks/creams, card elevation shadows, or section gradients.
Fix: strip the gradient ground; one neutral (or `#EEF0FB`) bed for all eight cards; shadow → 1px hairline; radius → 4–5px. Move the label **inside** the tile on the media bed, underlined, and delete the white text panel — i.e. make CollectionCards match the block-4 pattern the page already gets right.

**12 · Testimonials: ~430px per review, chartreuse stars, two nav systems.**
Ours: one giant white card, ~17px/lh1.6 body, chartreuse stars, 9 dots **and** a circular arrow pair.
Reference: none of the four gives a single review 430px; our own product cards use **indigo** stars.
Fix: 2-up at ≥768 and a tighter single card at 375; body → ~14–15px at lh~1.45; **stars → indigo, matching the product cards**; keep one nav affordance (arrows **or** dots, not both) and cap dots at ~5.

**13 · BrandWall is a pill tag-cloud.**
Ours: 16 outlined rounded pills, ragged rows, ~1,100px of empty space beside row 2 at 1440, chartreuse body-copy caption.
Reference: no reference presents brands as pills.
Fix: a tidy fixed-column grid of brand **logos** (greyscale, uniform box), or delete the block. If names must stay, use a tight even grid, not pills, and set the caption in the normal body colour.

**14 · AdvantageCards: ~1,000px single centred column at mobile, plus a stray sparkle.**
Ours: 4 items × ~250px, four type styles each, pale-green icon chip for WhatsApp among pale-indigo ones, and a chartreuse sparkle glyph after the heading.
Fix: 2-up at 375 and 4-up at desktop with icon-left/text-right rows; cut to two type levels (bold label + body); delete the sparkle; make all icon chips one colour.

**15 · The WhatsApp FAB overlaps content everywhere; green is an unmanaged 5th colour.**
Ours: the FAB covers the 6th school tile, product-card content, the testimonial arrows, and the footer. Green also appears in every card CTA, a VisitShop pill, and an icon chip. VisitShop shows **three different button styles in one row**.
Fix: give the FAB a bottom-safe-area offset and hide it while scrolling / near the footer, or replace it with a sticky bottom bar that content can pad against. Confine green to the single WhatsApp primary action; make VisitShop's three CTAs one primary + two secondaries in one style.

**16 · Footer is ~16% of the page and ends on a clipped watermark.**
Ours: ~1,250px at mobile, ~28px link spacing, giant ghost "STATIONERY POINT" bleeding off the bottom clipped mid-word, chartreuse address line.
Fix: 2-column link lists at 375, line spacing → ~20px, delete the watermark, set the metro-pillar line in normal footer text colour.

**17 · Description paragraphs under three consecutive headings; no heading-alignment rule.**
Ours: centred heading + centred paragraph on school kits, offers, and categories (+ a "View all" sublink), then left-aligned eyebrow+heading further down.
Reference: **smiggle** goes heading→tiles with ~17px and no paragraph; **flyingtiger** left-aligns every section heading with no paragraph.
Fix: pick one rule and hold it. Delete the school-kits and offers paragraphs. Keep centred only where the hobbycraft offers spec demands it, and left-align the rest.

---

## 7. WHAT WE GOT RIGHT

- **The product card is genuinely close to spec.** 1:1 media, ~4px radius, 1px hairline, soft shadow, 15px/400 title at lh~1.5, bold net price with the list price struck alongside, brand-colour half-stars with a bracketed count, CTA flush to the card base with bottom-only corners. Every one of those verified in pixels.
- **The offers rail skeleton is right:** tinted band, centred heading, **2.2 cards visible at 375**, white circular arrows on card edges at desktop, centred pill beneath. The bones match; only placement and alignment are off.
- **The announcement bar's dimensions are correct** — full-bleed dark, 33px at 375, centred white text, matching flyingtiger's 33px exactly.
- **School-kit tile structure is right:** 6 tiles, 2-up, 1:1 media, label inside the tile below the image, centred and underlined, roundel on the **first tile only**. The skeleton is correct; the rhythm is loose.
- **The hero correctly has no gradient scrim**, per spec.
- **The trust strip matches the brief** — two claims split by a divider on `#EEF0FB`.
- **VisitShop uses real photography and real local specifics** (address, hours, metro pillar no. 837). That block has genuine content value even though its CTA styling is wrong.

---

## 8. METHOD LOG

**Tooling:** `mcp__Claude_Browser__computer{screenshot}` failed twice (pane not compositing). `claude-in-chrome` not connected. **All captures done with the project's own Playwright 1.62.1 + Chromium** (`G:\Stationery point\node_modules`), headless, `deviceScaleFactor:1`, mobile UA + `isMobile`/`hasTouch` at 375. Scripts in the session scratchpad: `shoot.mjs`, `shoot2.mjs` (generic fixed-overlay removal), `shoot3.mjs` (fullPage clip slicing), `shoot4.mjs` (downward viewport pass), `sections.mjs` (per-`.shopify-section` element shots).

**Our build — http://localhost:5193 (preview server `stationery-point`, already running).** Captured and opened as images:
- 375px: `ours375/ours375_00_y0` … `_11_y7700` — **all 12 frames opened.** Page height **7,946px**.
- 768px: `ours768/o768_00_y0`, `_01_y750` opened. Page height **8,640px**.
- 1440px: `ours1440/` 12 frames; **opened `_00_y0`, `_02_y1500`, `_03_y2250`, `_04_y3000`, `_06_y4500`, `_07_y5250`, `_09_y6750`.** Page height **8,546px**.

**flyingtiger.com — LOADED.** Country modal, cookie banner, 4 `drawer-component`s, a `quick-add-modal` and a bottom announcement bar removed and logged. Page height **4,609px @375**.
- Opened: `ft375/ft375_00_y0` (dimmed by a residual scrim), `_01_y700` (black — scrim).
- Opened: `ft375b/ftb_00_y0` (**clean, full colour** — announcement bar, header, hero, first product rail), `ftb_01_y750`.
- Opened: `ftC/ftc_01_y750` (**category circles, clean**), `ftc_02_y1500` (blank — lazy-render).
- Opened: `ftD/ftd_02_y1360`, `_03_y2040` — **both blank**; the viewport-scroll approach could not render FT's lower sections.
- **Solved via element screenshots:** enumerated 22 `.shopify-section` nodes (list saved to `ftSec/sections.json`) and opened **`sec_13.png` (the two-up promo tiles — the key capture), `sec_14.png` ("Trending now" product cards), `sec_15.png` (overlaid photo banner), `sec_17.png` ("Shop by category" circles).** These four carry a **faint red cast** from a residual overlay tint — I judged **structure, geometry and layout** from them and did **not** report hue.

**smiggle.co.uk — NOT LOADED** (Radware captcha; not attempted). Used the saved real screenshots. **Opened 4 of 13 files:** `homepage_tiles_375px.png` (the bundle tile block — primary source for block 4), `homepage_top.png` (header + hero), `homepage_tiles_under_hero.png` (tile detail), `bundles_listing_grid.png` (product-grid density). Did not open the 9 PDP/listing-top files — not relevant to the 8 blocks.
- **Stated gap:** these PNGs are **628px wide** for a described 375px viewport, so their DPR is unknown. **All smiggle pixel figures above are image-px measurements, or CSS-px estimates divided by 1.675, and are labelled as estimates.** All smiggle ratio claims (row gap ≈ half ours, badge 26% vs 35% of tile width) are DPR-independent and safe.

**hobbycraft.co.uk — BLOCKED.** Opened `hc375/hc375_00_y0.png`: a Cloudflare "Performing security verification — Verify you are human" checkbox page. **A CAPTCHA; I did not attempt to solve it.** No hobbycraft pixels were obtained. **Blocks 2, 6 and 7 are therefore judged against spec + flyingtiger/smiggle only, and I have flagged that inline in each.**

**dickblick.com — BLOCKED.** Opened `db375/db375_00_y0.png` and `db1440/db1440_00_y0.png`: both "Restricted Access — we have detected some unusual traffic from this computer." IP-level block at both widths. **No blick pixels obtained; block 5 judged against flyingtiger only.**

**`UNVERIFIED-agent-output-2026-08-17` — confirmed untrustworthy.** Opened 2 files: `flyingtiger/375/07-promo-tiles.png` is a **375×~40px header sliver**, not promo tiles. `hobbycraft/1440/03-product-grid.png` is an **unstyled page — CSS never loaded** (raw blue underlined links on white). Nothing from that folder was used in any finding.

**Values I could not read:** hobbycraft's real geometry (any of it); dickblick's real geometry (any of it); smiggle's absolute CSS px; flyingtiger's true panel/badge **hues** in the element shots (red-tinted); flyingtiger's page height at 768/1440; whether our school-kit tile media stays 1:1 at 1440 (the capture reads landscape but the frame boundary cut the tile top, so I flagged it as "verify" rather than asserting it).
