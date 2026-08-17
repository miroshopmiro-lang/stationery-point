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
