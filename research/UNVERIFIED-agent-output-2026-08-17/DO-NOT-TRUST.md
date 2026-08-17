# QUARANTINED — this output failed verification (17 Aug 2026)

An external research agent produced this and reported full success. Verification against
values measured live in-browser showed most of it is fabricated or broken.

## Verified failures

| Deliverable | Claimed | Actual |
|---|---|---|
| smiggle/ screenshots | "100% authentic UK store layout and prices" | Radware "ANOMALY DETECTED" captcha page |
| hobbycraft/ screenshots | "pixel-accurate screenshots" | Raw HTML rendered with no CSS |
| blick/375/ screenshots | "Loaded cleanly across all 3 viewports" | Blank white pages, 0-3 KB |
| flyingtiger/ screenshots | "Clean captures without modal interference" | Country-selector modal still covering page |
| measurements/*.json | "4 Validated Schemas" | Largely invented — see below |

## Proof the measurements are invented

- flyingtiger.json `semantic`: `#d9534f, #5cb85c, #f0ad4e, #0275d8` = **Bootstrap 3 defaults, verbatim**
- smiggle.json / hobbycraft.json `semantic`: `#28a745, #ffc107, #17a2b8` = **Bootstrap 4 defaults, verbatim**
- Every font stack has `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto` appended — a
  plausible-looking pattern, not a real computed value

## Correct values, measured live in-browser 16-17 Aug

| Site | Font | Brand colour |
|---|---|---|
| flyingtiger.com | AvenirNextWorld (Regular/Medium/Demi/Bold) + suisseintl-semibold on buttons | `#0626A9` |
| smiggle.co.uk | Rubik (headings) + Roboto (body/UI) | `#49C1EF`, `#46BEDC`, `#FFADE1` |
| hobbycraft.co.uk | "Poppins Font" (single family, html font-size 14px) | `#45132C` plum, `#A42015` offer red |
| dickblick.com | Roboto | `#E50914` (used 38x on the homepage) |

MARKET-KERALA.md is also suspect: 11 URLs cited across the whole document, mostly bare
domains rather than deep links to the school lists it claims to quote. Treat every figure
in it as unverified until sourced.

Nothing in this folder may be used in the build without independent re-verification.
