# Hero banner prompts — ready for ChatGPT image generator

Written 16 Sep 2026, revised same day after the first real test batch. Copy is baked into the
image itself (Abhinand's call — an image model integrates title typography into its own
lighting/composition better than an HTML overlay + gradient scrim can). Only the CTA buttons
stay real HTML (`HeroCarousel.jsx`) — screen readers get the same copy via a `sr-only` block, so
nothing baked into the art needs to be readable by anything but a human eye.

## Corrections from the first test batch (read before generating)

Abhinand ran the v1 prompt through ChatGPT and reported back three mistakes in it:

1. **ChatGPT can generate true wide/banner ratios directly.** The v1 prompt told it to generate
   a standard 3:2 landscape and crop afterward, assuming the tool couldn't do wide ratios. Wrong
   — it produced a near-4:1-ish banner directly on the first try. Ask for the wide ratio up
   front; don't generate-then-crop.
2. **The brand colour is deep indigo (`#332E92`), not neon/chartreuse.** v1 asked for "one vivid
   saturated chartreuse-yellow item as the colour focal point," and the model ran with that as
   the *dominant* colour — an entire neon-lime notebook, which reads as a completely different
   brand (that shade of lime-on-white is Smiggle's palette, not ours). Chartreuse (`#CDD661`) is
   a small accent in the real palette, not the lead colour. Deep indigo needs to visibly anchor
   the image — on a notebook cover, a pencil case, a mug — the way it anchors every other section
   of the site.
3. **A pure white background fights a white page.** The corrected v2 prompt asked for "deep
   indigo and white" and got a white studio background — which disappears against the site's own
   white sections instead of standing apart from them the way a hero banner needs to. Keep the
   dark warm surface (wood or a deep indigo studio backdrop) so the banner reads as its own block
   on the page, the way the current `bg-brand-dark` wrapper around `HeroCarousel` already implies.
4. **Baked "Shop Now" style buttons keep appearing uninvited.** Both v1 and v2 outputs included a
   pill-shaped CTA button baked into the art even though the prompt said not to. This needs
   saying more forcefully and repeated at the end of the prompt, not just once mid-way through.
5. **Don't bake in claims the research doesn't back.** The art hero's original headline, "The art
   supplies Kochi can't find elsewhere," was wrong — brands.md rates Camlin and Faber-Castell
   "Ubiquitous... available in virtually all Kochi stationery shops," and even Brustro as
   "available in major Kochi art stores and online." Only genuinely scarce brands (Winsor &
   Newton, Rotring) would support an exclusivity claim, and they're not what's named in that
   headline. The real, research-backed differentiator is price, not availability — Scooboo (the
   actual premium/import competitor) is "completely inaccessible... pens up to ₹47,000." Corrected
   headline: "The art supplies Kochi's students ask for — below MRP," pulled directly from the
   architect-student Google review, not a generalized brand-scarcity claim.

One thing v2 got right that's worth keeping: light, tasteful illustrated marks on a product (a
doodled smiley, a small star or lightning-bolt sticker, one short handwritten-style phrase like
"Good ideas today") — that reads as intentional brand personality, not as the garbled-text tell
that got products banned from carrying real readable copy in earlier product-card photography.
Keep this to one product, one short phrase or a couple of small icons — it's a texture detail,
not a second headline, and it must stay fully legible (no multi-word AI text garbling).

## Sizing

Target: **1920×480px, 4:1** — matches flyingtiger's own live desktop hero (measured 1400×350px
on their DOM, 16 Sep 2026), scaled up so it stays sharp on wide screens. Ask for this ratio
directly in the prompt. If the tool refuses an exact 4:1, ask for its widest available banner/
letterbox ratio (it's landed close to this already without being asked twice) rather than
generating a square or 3:2 image and cropping after.

**Mobile: reuse the same wide image, don't generate a separate portrait crop** (confirmed against
flyingtiger.com directly, 16 Sep 2026 — Abhinand's call). flyingtiger actually does export two
different crops per hero (a `...1440x350` wide file and a separate `...2378x1173` file for
smaller screens), but their own mobile hero still displays fairly tall/square (~0.91:1) — not the
look wanted here. `HeroCarousel.jsx` instead uses ONE wide image for every breakpoint: `16:9`
(mobile + tablet) stepping up to `4:1` (desktop, `lg:`), with `imgClassName="object-left"` on the
`<img>` (not `className`, which lands on `SmartImage`'s wrapper `<div>` and does nothing —
mistake made and fixed 16 Sep 2026). Verified by direct pixel-crop simulation of the real
hero-school art: at 16:9, `object-left` always shows the leftmost ~59% of the source width at any
phone size, which comfortably includes the full baked text block with margin, since the text sits
in the left third by design. No separate mobile generation needed as long as future prompts keep
following the "left third for text, right two-thirds for products" layout.

## The recipe

Dense, overlapping, edge-to-edge product arrangement + deep indigo as the dominant colour +
warm directional light + natural props. This is the project's proven look, reverse-engineered
from why flyingtiger/Jags' own AI-generated hero art reads as premium instead of cheap: see
`stationery-point-bible` skill §3 for the full background if this ever needs re-deriving.

Reference images for lighting/mood (not colour or composition — none of the four reference
sites use our indigo) are in this folder and in `~/Downloads/hero-reference-*.{jpg,png}`.

---

## 1. School hero

> Ultra-wide banner product photograph, 1920x480px, 4:1 aspect ratio — generate this wide
> banner shape directly, not a standard landscape to be cropped later. Overhead flat-lay on a
> dark warm walnut wood surface. Fill the right two-thirds of the frame densely: notebooks, a
> geometry box, colour pencils, a pencil pouch, a sharpener and a small stack of exercise books,
> scattered abundantly and overlapping. The dominant colour running through the products —
> at least one notebook cover, the pencil pouch — is a deep indigo/royal-blue-violet, hex
> #332E92. A small amount of chartreuse-yellow (hex #CDD661) appears only as a minor accent (one
> or two pencils, a small sticker) — it must not be the main or most prominent colour in the
> frame. Warm dramatic directional light from the upper right, deep soft shadows. One or two
> natural props (a small potted leaf, a pine cone).
>
> One product may carry a small, fully legible handwritten-style doodle or short phrase (for
> example a smiley face and the words "Good ideas today" on a notebook cover) as a brand
> personality touch — keep it to one product and a few words, not a second headline, and it must
> render as crisp, correctly spelled text, not garbled. All other product surfaces stay blank or
> unlabelled — no logos, no barcodes, no other readable text.
>
> Bake this copy into the image as real integrated typography, bold sans-serif, white or cream,
> sitting in the left third of the frame over a softly out-of-focus, mostly empty section of the
> same wood surface (reserve that whole left third for the type — keep products out of it):
> - Small eyebrow line, all caps: "BACK TO SCHOOL"
> - Large headline: "The whole list, below MRP."
> - Smaller line beneath: "Notebooks to backpacks, sorted in one trip."
>
> Photorealistic, shot on a full-frame camera, shallow depth of field, no people, no watermark.
> Do NOT draw any button, pill shape, rounded rectangle, arrow icon or other UI/CTA chrome
> anywhere in the image — no "Shop Now" graphic of any kind. Only the three lines of typography
> sit on the surface. This is a strict requirement, not a suggestion: real clickable buttons are
> added separately in code on top of this image, and a baked-in button will visually collide
> with them. Do not use a plain white or studio-white background — the wood surface (or an
> equally dark, rich backdrop) must fill the entire frame.

## 2. Art & craft hero

> Ultra-wide banner product photograph, 1920x480px, 4:1 aspect ratio — generate this wide
> banner shape directly, not a standard landscape to be cropped later. Overhead flat-lay on a
> dark warm walnut wood surface. Fill the right two-thirds of the frame densely: watercolour
> paint tubes, a jar of brushes, an open sketchbook with a colourful abstract wash, fanned-out
> colour pencils and a small palette with saturated paint smears, scattered abundantly and
> overlapping. The dominant colour running through the scene, on the sketchbook cover and a paint
> tube label, is a deep indigo/royal-blue-violet, hex #332E92, alongside the naturally varied
> paint-swatch colours. A small amount of chartreuse-yellow (hex #CDD661) appears only as a
> minor accent, not the main colour. Warm dramatic directional light from the upper right, deep
> soft shadows. Natural props (a folded cloth, a water jar with a tinted rinse).
>
> One product may carry a small, fully legible handwritten-style doodle or short phrase as a
> brand personality touch. Keep it to one product and a few words, crisp and correctly spelled,
> not garbled. All other surfaces stay blank or unlabelled: no logos, no barcodes, no other
> readable text.
>
> Bake this copy into the image as real integrated typography, bold sans-serif, white or cream,
> sitting in the left third of the frame over a softly out-of-focus, mostly empty section of the
> same wood surface (reserve that whole left third for the type, keep products out of it):
> - Small eyebrow line, all caps: "FINE ART & CRAFT"
> - Large headline: "The art supplies Kochi's students ask for, below MRP."
> - Smaller line beneath: "Brustro, Camlin, Faber-Castell and more, always in stock."
>
> Photorealistic, shot on a full-frame camera, shallow depth of field, no people, no watermark.
> Do NOT draw any button, pill shape, rounded rectangle, arrow icon or other UI/CTA chrome
> anywhere in the image, no "Shop Now" graphic of any kind. Only the three lines of typography
> sit on the surface. This is a strict requirement, not a suggestion: real clickable buttons are
> added separately in code on top of this image, and a baked-in button will visually collide
> with them. Do not use a plain white or studio-white background: the wood surface (or an
> equally dark, rich backdrop) must fill the entire frame.

## 3. Office & institutional / bulk hero

> Ultra-wide banner product photograph, 1920x480px, 4:1 aspect ratio. Generate this wide
> banner shape directly, not a standard landscape to be cropped later. Overhead flat-lay on a
> dark warm walnut wood surface, slightly more muted and corporate than a typical craft flat-lay
> but still warmly lit. Fill the right two-thirds of the frame densely: stacked reams of copier
> paper, a few box files, a jar of pens, a stapler and a stack of sticky-note pads, scattered and
> overlapping. The dominant colour running through the scene, on a box file and the stapler, is a
> deep indigo/royal-blue-violet, hex #332E92. A small cluster of bright highlighters provides a
> secondary colour pop; chartreuse-yellow (hex #CDD661) may appear as a minor accent only, not
> the main colour. Warm dramatic directional light from the upper right, deep soft shadows.
>
> One product may carry a small, fully legible handwritten-style phrase as a brand personality
> touch, the same kind of warm, human touch as the other two banners in this set (one reads
> "Good ideas today" on a notebook, the other "Good Art Brighter Days" on a sketchbook). This one
> should sit on a sticky note in the pile and read: "Better days, one desk at a time." Keep it to
> that one note, crisp and correctly spelled, not garbled. All other product surfaces stay blank
> or unlabelled: no logos, no barcodes, no other readable text.
>
> Bake this copy into the image as real integrated typography, bold sans-serif, white or cream,
> sitting in the left third of the frame over a softly out-of-focus, mostly empty section of the
> same wood surface (reserve that whole left third for the type, keep products out of it):
> - Small eyebrow line, all caps: "OFFICE & INSTITUTIONAL"
> - Large headline: "Bulk orders. GST invoice. No minimum."
> - Smaller line beneath: "Volume pricing below MRP, delivered across Kochi."
>
> Photorealistic, shot on a full-frame camera, shallow depth of field, no people, no watermark.
> Do NOT draw any button, pill shape, rounded rectangle, arrow icon or other UI/CTA chrome
> anywhere in the image, no "Shop Now" graphic of any kind. Only the three lines of typography
> sit on the surface. This is a strict requirement, not a suggestion: real clickable buttons are
> added separately in code on top of this image, and a baked-in button will visually collide
> with them. Do not use a plain white or studio-white background: the wood surface (or an
> equally dark, rich backdrop) must fill the entire frame.
