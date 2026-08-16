# Stationery Point — generation prompt set

**Tools:** Flow (Nano Banana / Omni Flash) or ChatGPT (GPT Image 2.0). Both take plain natural
language — no Higgsfield grammar here.

**Every prompt below is a single self-contained block.** Copy the whole fenced block, paste it,
done — nothing to append from elsewhere on the page.

**Save each output to the exact path listed.** The site already references these paths and
falls back to a tinted panel until the file exists, so you can drop them in one at a time and
watch the page fill up.

**The one hard fail: if an output has any stray text, letters, or logo marks in it, regenerate
— don't ship it.** The Faber-Castell test showed generated pack text comes back corrupted
("stainless steel blades" → "stainiess stesl blades"), which reads as counterfeit stock on a
real shop's site. Every prompt below is deliberately composed so no label is ever needed, and
every prompt ends with an explicit no-text instruction.

**Aspect ratios:** desktop hero 21:9, mobile hero 4:5, category tiles 4:3, collection cards 4:3.

---

## 1. HERO SLIDES (6 files — 3 scenes × desktop + mobile)

Type sits on the **left** on desktop and the **bottom** on mobile, so keep that area
uncluttered.

### 1a. `/public/hero/hero-school.webp` — 21:9
```
A wide overhead flat-lay of school stationery arranged on a warm cream surface — stacked plain
notebooks, a row of unbranded pencils, a geometry compass and set square, a simple pencil case,
loose sheets of paper. Everything is grouped toward the right side of the frame, leaving the
entire left half as clean empty cream surface with nothing on it. Neat, organised, generous
spacing between objects.

Photographic, shot on a real table with soft natural window light from one side. Warm and
bright, gentle soft shadows, shallow depth of field. Colour palette built around deep indigo
violet and a soft yellow-green, on warm cream and light natural wood. Absolutely no text, no
letters, no numbers, no logos, no brand names, no packaging labels anywhere in the image.
Plain unbranded products only. Not a 3D render, not CGI, not illustration — a real photograph.
```

### 1b. `/public/hero/hero-school-mobile.webp` — 4:5
```
A tall overhead flat-lay of school stationery arranged on a warm cream surface — stacked plain
notebooks, a row of unbranded pencils, a geometry compass and set square, a simple pencil case,
loose sheets of paper. Everything is grouped toward the top of the frame, leaving the entire
bottom half as clean empty cream surface with nothing on it. Neat, organised, generous spacing
between objects.

Photographic, shot on a real table with soft natural window light from one side. Warm and
bright, gentle soft shadows, shallow depth of field. Colour palette built around deep indigo
violet and a soft yellow-green, on warm cream and light natural wood. Absolutely no text, no
letters, no numbers, no logos, no brand names, no packaging labels anywhere in the image.
Plain unbranded products only. Not a 3D render, not CGI, not illustration — a real photograph.
```

### 1c. `/public/hero/hero-art.webp` — 21:9
```
A wide overhead flat-lay of art supplies on a warm cream surface — an open pan of watercolour
paints in rich colours, three paintbrushes, a small stack of blank watercolour paper, a few
loose colour pencils, a clean white ceramic water dish. Arranged toward the right side of the
frame, the entire left half left as clean empty surface. Painterly and inviting, colours
saturated but natural.

Photographic, shot on a real table with soft natural window light from one side. Warm and
bright, gentle soft shadows, shallow depth of field. Colour palette built around deep indigo
violet and a soft yellow-green, on warm cream and light natural wood. Absolutely no text, no
letters, no numbers, no logos, no brand names, no packaging labels anywhere in the image.
Plain unbranded products only. Not a 3D render, not CGI, not illustration — a real photograph.
```

### 1d. `/public/hero/hero-art-mobile.webp` — 4:5
```
A tall overhead flat-lay of art supplies on a warm cream surface — an open pan of watercolour
paints in rich colours, three paintbrushes, a small stack of blank watercolour paper, a few
loose colour pencils, a clean white ceramic water dish. Arranged toward the top of the frame,
the entire bottom half left as clean empty surface. Painterly and inviting, colours saturated
but natural.

Photographic, shot on a real table with soft natural window light from one side. Warm and
bright, gentle soft shadows, shallow depth of field. Colour palette built around deep indigo
violet and a soft yellow-green, on warm cream and light natural wood. Absolutely no text, no
letters, no numbers, no logos, no brand names, no packaging labels anywhere in the image.
Plain unbranded products only. Not a 3D render, not CGI, not illustration — a real photograph.
```

### 1e. `/public/hero/hero-office.webp` — 21:9
```
A wide overhead flat-lay of office supplies on a warm cream surface — neat stacks of plain
lever-arch files, a stapler, a tape dispenser, a bundle of pens held with a band, a ream of
blank paper. Arranged toward the right of the frame, entire left half clean and empty. Orderly,
professional, bulk-quantity feel — several of each item rather than single pieces.

Photographic, shot on a real table with soft natural window light from one side. Warm and
bright, gentle soft shadows, shallow depth of field. Colour palette built around deep indigo
violet and a soft yellow-green, on warm cream and light natural wood. Absolutely no text, no
letters, no numbers, no logos, no brand names, no packaging labels anywhere in the image.
Plain unbranded products only. Not a 3D render, not CGI, not illustration — a real photograph.
```

### 1f. `/public/hero/hero-office-mobile.webp` — 4:5
```
A tall overhead flat-lay of office supplies on a warm cream surface — neat stacks of plain
lever-arch files, a stapler, a tape dispenser, a bundle of pens held with a band, a ream of
blank paper. Arranged toward the top of the frame, entire bottom half clean and empty. Orderly,
professional, bulk-quantity feel — several of each item rather than single pieces.

Photographic, shot on a real table with soft natural window light from one side. Warm and
bright, gentle soft shadows, shallow depth of field. Colour palette built around deep indigo
violet and a soft yellow-green, on warm cream and light natural wood. Absolutely no text, no
letters, no numbers, no logos, no brand names, no packaging labels anywhere in the image.
Plain unbranded products only. Not a 3D render, not CGI, not illustration — a real photograph.
```

---

## 2. CATEGORY TILES (7 files — 4:3)

These replace the current deep-navy set, which is off-brand. Save to
`/public/category-tiles/<name>.webp`, overwriting the existing files. Each is a **45°
three-quarter view**, not flat overhead — that separates them visually from the hero flat-lays.

**Also generate a 600px-wide version of each** as `<name>-600.webp` for phones. If your tool
won't do two sizes in one pass, generate large and I'll add a resize step to
`tools/process-assets.mjs`.

### 2a. `/public/category-tiles/stationery.webp`
```
A close three-quarter 45-degree view of plain notebooks, pens, pencils and erasers grouped
together on a light natural wood surface. Soft natural window light from the left, shallow
depth of field with the front items sharp and the back gently soft. Rich and inviting, the
arrangement filling most of the frame.

Photographic, shot on a real table with soft natural window light from one side. Warm and
bright, gentle soft shadows, shallow depth of field. Colour palette built around deep indigo
violet and a soft yellow-green, on warm cream and light natural wood. Absolutely no text, no
letters, no numbers, no logos, no brand names, no packaging labels anywhere in the image.
Plain unbranded products only. Not a 3D render, not CGI, not illustration — a real photograph.
```

### 2b. `/public/category-tiles/office-supplies.webp`
```
A close three-quarter 45-degree view of plain office files, a stapler, paper clips and a tape
dispenser grouped together on a light natural wood surface. Soft natural window light from the
left, shallow depth of field with the front items sharp and the back gently soft. Rich and
inviting, the arrangement filling most of the frame.

Photographic, shot on a real table with soft natural window light from one side. Warm and
bright, gentle soft shadows, shallow depth of field. Colour palette built around deep indigo
violet and a soft yellow-green, on warm cream and light natural wood. Absolutely no text, no
letters, no numbers, no logos, no brand names, no packaging labels anywhere in the image.
Plain unbranded products only. Not a 3D render, not CGI, not illustration — a real photograph.
```

### 2c. `/public/category-tiles/art-supplies.webp`
```
A close three-quarter 45-degree view of watercolour paint pans, brushes standing in a jar, and
a few sheets of blank paper grouped together on a light natural wood surface. Soft natural
window light from the left, shallow depth of field with the front items sharp and the back
gently soft. Rich and inviting, the arrangement filling most of the frame.

Photographic, shot on a real table with soft natural window light from one side. Warm and
bright, gentle soft shadows, shallow depth of field. Colour palette built around deep indigo
violet and a soft yellow-green, on warm cream and light natural wood. Absolutely no text, no
letters, no numbers, no logos, no brand names, no packaging labels anywhere in the image.
Plain unbranded products only. Not a 3D render, not CGI, not illustration — a real photograph.
```

### 2d. `/public/category-tiles/craft-material.webp`
```
A close three-quarter 45-degree view of coloured felt sheets, spools of ribbon, ric-rac trim
and small craft pieces grouped together on a light natural wood surface. Soft natural window
light from the left, shallow depth of field with the front items sharp and the back gently
soft. Rich and inviting, the arrangement filling most of the frame.

Photographic, shot on a real table with soft natural window light from one side. Warm and
bright, gentle soft shadows, shallow depth of field. Colour palette built around deep indigo
violet and a soft yellow-green, on warm cream and light natural wood. Absolutely no text, no
letters, no numbers, no logos, no brand names, no packaging labels anywhere in the image.
Plain unbranded products only. Not a 3D render, not CGI, not illustration — a real photograph.
```

### 2e. `/public/category-tiles/party-gifts.webp`
```
A close three-quarter 45-degree view of plain balloons, ribbon and a few simple wrapped gift
boxes in soft colours, grouped together on a light natural wood surface. Soft natural window
light from the left, shallow depth of field with the front items sharp and the back gently
soft. Rich and inviting, the arrangement filling most of the frame.

Photographic, shot on a real table with soft natural window light from one side. Warm and
bright, gentle soft shadows, shallow depth of field. Colour palette built around deep indigo
violet and a soft yellow-green, on warm cream and light natural wood. Absolutely no text, no
letters, no numbers, no logos, no brand names, no packaging labels anywhere in the image.
Plain unbranded products only. Not a 3D render, not CGI, not illustration — a real photograph.
```

### 2f. `/public/category-tiles/return-gifts.webp`
```
A close three-quarter 45-degree view of a small cluster of plain wrapped gift boxes with
ribbon, in soft pastel tones, grouped together on a light natural wood surface. Soft natural
window light from the left, shallow depth of field with the front items sharp and the back
gently soft. Rich and inviting, the arrangement filling most of the frame.

Photographic, shot on a real table with soft natural window light from one side. Warm and
bright, gentle soft shadows, shallow depth of field. Colour palette built around deep indigo
violet and a soft yellow-green, on warm cream and light natural wood. Absolutely no text, no
letters, no numbers, no logos, no brand names, no packaging labels anywhere in the image.
Plain unbranded products only. Not a 3D render, not CGI, not illustration — a real photograph.
```

### 2g. `/public/category-tiles/special-edition.webp`
```
A close three-quarter 45-degree view of two elegant unbranded fountain pens resting on a dark
leather desk pad, warm side light catching the metal details. Shallow depth of field with the
nearer pen sharp and the other gently soft. Rich and inviting, the arrangement filling most of
the frame.

Photographic, shot on a real table with soft natural window light from one side. Warm and
bright, gentle soft shadows, shallow depth of field. Colour palette built around deep indigo
violet and a soft yellow-green, on warm cream and light natural wood. Absolutely no text, no
letters, no numbers, no logos, no brand names, no packaging labels anywhere in the image.
Plain unbranded products only. Not a 3D render, not CGI, not illustration — a real photograph.
```

---

## 3. COLLECTION CARDS (8 files — 4:3)

Save to `/public/collections/<id>.webp`. Softer and more "styled shelf" than the category
tiles — these sit on white cards so they need light, airy backgrounds.

### 3a. `/public/collections/school-kits.webp`
```
A complete set of school supplies laid out together — notebooks, pencils, an eraser, a
sharpener, a ruler and a small bag — photographed from slightly above on a clean warm white
surface with plenty of soft empty space around the arrangement. Bright, airy, soft natural
light, subtle shadows.

Photographic, shot on a real table with soft natural window light from one side. Warm and
bright, gentle soft shadows, shallow depth of field. Colour palette built around deep indigo
violet and a soft yellow-green, on warm cream and light natural wood. Absolutely no text, no
letters, no numbers, no logos, no brand names, no packaging labels anywhere in the image.
Plain unbranded products only. Not a 3D render, not CGI, not illustration — a real photograph.
```

### 3b. `/public/collections/pens-writing.webp`
```
A fan of plain pens in several colours laid out beside a spiral notepad, photographed from
slightly above on a clean warm white surface with plenty of soft empty space around the
arrangement. Bright, airy, soft natural light, subtle shadows.

Photographic, shot on a real table with soft natural window light from one side. Warm and
bright, gentle soft shadows, shallow depth of field. Colour palette built around deep indigo
violet and a soft yellow-green, on warm cream and light natural wood. Absolutely no text, no
letters, no numbers, no logos, no brand names, no packaging labels anywhere in the image.
Plain unbranded products only. Not a 3D render, not CGI, not illustration — a real photograph.
```

### 3c. `/public/collections/notebooks.webp`
```
A neat stack of plain notebooks in different sizes, one lying open showing blank ruled pages,
photographed from slightly above on a clean warm white surface with plenty of soft empty space
around the arrangement. Bright, airy, soft natural light, subtle shadows.

Photographic, shot on a real table with soft natural window light from one side. Warm and
bright, gentle soft shadows, shallow depth of field. Colour palette built around deep indigo
violet and a soft yellow-green, on warm cream and light natural wood. Absolutely no text, no
letters, no numbers, no logos, no brand names, no packaging labels anywhere in the image.
Plain unbranded products only. Not a 3D render, not CGI, not illustration — a real photograph.
```

### 3d. `/public/collections/art-colour.webp`
```
An open watercolour palette with visible colour wells, brushes resting beside it, photographed
from slightly above on a clean warm white surface with plenty of soft empty space around the
arrangement. Bright, airy, soft natural light, subtle shadows.

Photographic, shot on a real table with soft natural window light from one side. Warm and
bright, gentle soft shadows, shallow depth of field. Colour palette built around deep indigo
violet and a soft yellow-green, on warm cream and light natural wood. Absolutely no text, no
letters, no numbers, no logos, no brand names, no packaging labels anywhere in the image.
Plain unbranded products only. Not a 3D render, not CGI, not illustration — a real photograph.
```

### 3e. `/public/collections/office-essentials.webp`
```
A ream of blank paper, a few plain files, a stapler and some pens arranged neatly together,
photographed from slightly above on a clean warm white surface with plenty of soft empty space
around the arrangement. Bright, airy, soft natural light, subtle shadows.

Photographic, shot on a real table with soft natural window light from one side. Warm and
bright, gentle soft shadows, shallow depth of field. Colour palette built around deep indigo
violet and a soft yellow-green, on warm cream and light natural wood. Absolutely no text, no
letters, no numbers, no logos, no brand names, no packaging labels anywhere in the image.
Plain unbranded products only. Not a 3D render, not CGI, not illustration — a real photograph.
```

### 3f. `/public/collections/craft.webp`
```
Craft materials spread out together — coloured felt sheets, pom-poms, ribbon, googly eyes and
a glue stick — photographed from slightly above on a clean warm white surface with plenty of
soft empty space around the arrangement. Bright, airy, soft natural light, subtle shadows.

Photographic, shot on a real table with soft natural window light from one side. Warm and
bright, gentle soft shadows, shallow depth of field. Colour palette built around deep indigo
violet and a soft yellow-green, on warm cream and light natural wood. Absolutely no text, no
letters, no numbers, no logos, no brand names, no packaging labels anywhere in the image.
Plain unbranded products only. Not a 3D render, not CGI, not illustration — a real photograph.
```

### 3g. `/public/collections/return-gifts.webp`
```
A row of small identical wrapped party favour boxes with ribbon, in soft colours, photographed
from slightly above on a clean warm white surface with plenty of soft empty space around the
arrangement. Bright, airy, soft natural light, subtle shadows.

Photographic, shot on a real table with soft natural window light from one side. Warm and
bright, gentle soft shadows, shallow depth of field. Colour palette built around deep indigo
violet and a soft yellow-green, on warm cream and light natural wood. Absolutely no text, no
letters, no numbers, no logos, no brand names, no packaging labels anywhere in the image.
Plain unbranded products only. Not a 3D render, not CGI, not illustration — a real photograph.
```

### 3h. `/public/collections/premium-pens.webp`
```
A single elegant unbranded fountain pen resting on a folded dark cloth, warm light catching its
metal details, photographed from slightly above on a clean warm white surface with plenty of
soft empty space around the arrangement. Bright, airy, soft natural light, subtle shadows.

Photographic, shot on a real table with soft natural window light from one side. Warm and
bright, gentle soft shadows, shallow depth of field. Colour palette built around deep indigo
violet and a soft yellow-green, on warm cream and light natural wood. Absolutely no text, no
letters, no numbers, no logos, no brand names, no packaging labels anywhere in the image.
Plain unbranded products only. Not a 3D render, not CGI, not illustration — a real photograph.
```

---

## 4. ONAM / SEASONAL (2 files — hold until Sam confirms the offer)

Only generate once he gives a real offer with a real number — this pair goes behind the offer
strip, which itself renders nothing until then.

### 4a. `/public/hero/hero-onam.webp` — 21:9
```
A wide overhead flat-lay of small wrapped gift boxes and party favours in warm festive colours
— marigold yellow, deep green, soft gold — with ribbon and a few fresh marigold flowers
scattered between them, on a warm cream surface. Arranged toward the right of the frame with
the entire left half clean and empty. Festive, warm, celebratory, South Indian festival feel.

Photographic, shot on a real table with soft natural window light from one side. Warm and
bright, gentle soft shadows, shallow depth of field. Colour palette built around deep indigo
violet and a soft yellow-green, on warm cream and light natural wood. Absolutely no text, no
letters, no numbers, no logos, no brand names, no packaging labels anywhere in the image.
Plain unbranded products only. Not a 3D render, not CGI, not illustration — a real photograph.
```

### 4b. `/public/hero/hero-onam-mobile.webp` — 4:5
```
A tall overhead flat-lay of small wrapped gift boxes and party favours in warm festive colours
— marigold yellow, deep green, soft gold — with ribbon and a few fresh marigold flowers
scattered between them, on a warm cream surface. Arranged toward the top of the frame with the
entire bottom half clean and empty. Festive, warm, celebratory, South Indian festival feel.

Photographic, shot on a real table with soft natural window light from one side. Warm and
bright, gentle soft shadows, shallow depth of field. Colour palette built around deep indigo
violet and a soft yellow-green, on warm cream and light natural wood. Absolutely no text, no
letters, no numbers, no logos, no brand names, no packaging labels anywhere in the image.
Plain unbranded products only. Not a 3D render, not CGI, not illustration — a real photograph.
```

---

## Order to generate in

1. **The 3 desktop hero slides** (1a, 1c, 1e) — biggest visual impact, top of the page.
2. **The 7 category tiles** (2a–2g) — replaces the off-brand navy set.
3. **The 3 mobile hero crops** (1b, 1d, 1f) — Sam reviews on a phone.
4. **The 8 collection cards** (3a–3h).
5. **Onam pair** (4a, 4b), if and when the offer is confirmed.

Send them over as you go and I'll wire each batch in — no need to wait for the full set.
