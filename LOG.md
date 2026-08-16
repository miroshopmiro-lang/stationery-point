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
