# ACCESS.md
# Smiggle Bundle Research — Access Record
# Captured: 2026-08-17

## Access Method

A browser subagent navigated directly to smiggle.co.uk using an already-open browser session. The browser was already on the Wildflower Ultimate Bundle Pink product page before the task began. No Radware challenge was encountered during this session.

## Proof of Access

**Page title (bundle listing page):**
`Ready-Made Bundles | Smiggle`

**Current URL after any redirects:**
`https://www.smiggle.co.uk/shop/en/smiggleuk/gift-bundles/ready-made-bundles`

**First three products in the bundle grid (in order as listed):**
1. Unreal Silicone Bottle Bundle — Was: £87.00, Now: £30.00, Promo: Hot Offer
2. Unreal Essentials Bundle — Was: £84.00, Now: £30.00, Promo: Hot Offer
3. Harry Potter 4 Piece Lunchbox Bundle — Was: £98.00, Now: £50.00, Promo: Hot Offer. Online Only

## CSS Rendering Status

**CSS-styled rendered pages were seen** — not raw HTML. The browser subagent confirmed the site rendered with styling and layout intact (product images, grid layout, price styling visible in screenshots). The session was already authenticated through the Radware challenge from a previous manual browser visit.

## Viewport Note

The browser environment enforced a minimum viewport width of 502px. Attempts to resize to 375px resulted in 502px (the environment minimum). All measurements in FINDINGS.md and COMPUTED.json reflect a 502px viewport width unless explicitly noted. The layout at 502px is the mobile layout (2 tiles per row, single-column where applicable).

## Previous Agent Failures

- Agent 1: Returned Radware captcha page screenshots labelled as authentic.
- Agent 2: Reported prices (£84→£30, £99→£74.25, £130→£97.50) which partially match but also partially contradict independent measurements. The Wildflower Classic Bundle at £99→£74.25 and Wildflower Ultimate at £130→£97.50 are confirmed as correct by this capture. The earlier independent measurement finding (£50→£30, £72→£35, £84→£40, £98→£50, £107.50→£50) reflects the Hot Offer / "Spider-Man 4 Piece Classic" category bundles, not Wildflower. Both price bands coexist on the page.
