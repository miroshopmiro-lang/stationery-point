# Smiggle School-Bundle Merchandising — Findings
# Captured: 2026-08-17
# URL: https://www.smiggle.co.uk/shop/en/smiggleuk/gift-bundles/ready-made-bundles
# Viewport: 502px (environment minimum — see ACCESS.md)

---

## 1. Homepage Tile Block (Directly Under Hero)

**Screenshot:** `screenshots/homepage_tiles_under_hero.png`
Additional screenshots of the homepage top and tiles: `screenshots/homepage_top.png`, `screenshots/homepage_tiles_1.png`, `screenshots/homepage_tiles_2.png`, `screenshots/homepage_tiles_375px.png`

**Description:** At 502px (mobile layout), the tile grid below the hero shows 6 tiles in 2 columns. Each tile contains an image with text overlaid (label baked into image). No separate HTML text label elements — text is rendered as part of the image asset.

### Tile Labels (Exact Order, Exact Capitalisation)

| Position | Label |
|---|---|
| 1 (top-left) | `£30-£50 Bundles` |
| 2 (top-right) | `School Bags` |
| 3 (mid-left) | `School Lunch Boxes` |
| 4 (mid-right) | `School Bottles` |
| 5 (bottom-left) | `£2 Stationery` |
| 6 (bottom-right) | `30% Off Gift Packs` |

- **Tiles per row:** 2
- **Viewport:** 502px (environment minimum; resize to 375px returned 502px)
- **Tile pixel dimensions (BoundingClientRect at 502px):**
  - Tile 1: 246.2px × 253.84px
  - Tile 2: 246.2px × 256.84px
  - Tile 3: 246.2px × 253.84px
  - Tile 4: 246.2px × 256.84px
  - Tile 5: 246.2px × 261.84px
  - Tile 6: 246.2px × 261.84px
- **Corner radius (computed border-radius):** `0px` on the `.image-box`, `link`, and `img` elements. Rounded corners (if visible) are baked into the image assets, not applied via CSS.
- **Is the price-band tile genuinely first?** Yes. `£30-£50 Bundles` is the first tile (index 0, top-left). This was confirmed via JavaScript query of `.image-box` elements ordered by DOM position.

---

## 2. Ready-Made Bundles — Full Listing

**Screenshot:** `screenshots/bundles_listing_top.png` (top of grid), `screenshots/bundles_listing_grid.png` (full scrolled grid)

**Description:** Extracted via JavaScript from the listing page. The page contains ~69+ product cards visible in the DOM on the initial load (paginated or infinite scroll). Many titles repeat across colour variants. Below is the deduplicated list of unique bundle *names* with their pricing as they appear on the grid cards. Full data including per-colour-variant URLs was extracted in the first subagent pass.

### Unique Bundle Names with Grid Prices (First Listed Colour Shown)

| Product Name | Was Price | Now Price | Promo Tag | Items | Included Items |
|---|---|---|---|---|---|
| Unreal Silicone Bottle Bundle | £87.00 | £30.00 | Hot Offer | 4 | Unreal Access Backpack; Unreal Double Decker Lunchbox; Unreal Silicone Drink Bottle 630ml; Unreal Essentials Pencil Case |
| Unreal Essentials Bundle | £84.00 | £30.00 | Hot Offer | 4 | Unreal Access Backpack; Unreal Double Decker Lunchbox; Unreal Spout Plastic Drink Bottle 650Ml; Unreal Essentials Pencil Case |
| Harry Potter 4 Piece Lunchbox Bundle | £98.00 | £50.00 | Hot Offer. Online Only | 4 | Harry Potter Classic Backpack; Harry Potter Double Compartment Lunchbox With Strap; Harry Potter Pop Out Pencil Case; Harry Potter Plastic Drink Bottle 750M |
| Wildflower Classic Bundle | £99.00 | £74.25 | 25% Off. Online Only | 4 | Wildflower Daydream Backpack; Wildflower Large Dual Strap Lunchbox; Wildflower Spritz Plastic Drink Bottle 560mL; Wildflower Cowboy Boot Pencil Case |
| Wildflower Ultimate Bundle | £130.00 | £97.50 | 25% Off. Online Only | 5 | Wildflower Daydream Backpack; Wildflower Large Dual Strap Lunchbox; Wildflower Medium Bento Lunchbox; Wildflower Squiggle Insulated Stainless Steel Drink Bottle 550mL; Wildflower Cowboy Boot Pencil Case |
| Giggle By Smiggle 4 Piece Bundle | £50.00 | £30.00 | Hot Offer | 4 | Giggle by Smiggle Backpack; Giggle by Smiggle Lunchbox; Giggle by Smiggle Plastic Drink Bottle 450ml; Giggle by Smiggle Handy Pencil case |
| Giggle By Smiggle 4 Piece Bundle (variant) | £50.00 | £20.00 | Hot Offer. Online Only | 4 | Giggle by Smiggle Backpack; Giggle by Smiggle Lunchbox; Giggle by Smiggle Plastic Drink Bottle 450ml; Giggle by Smiggle Handy Pencil case |
| Minecraft Classic Bundle | £107.50 | £80.62 | 25% Off. Online Only | 4 | Minecraft Classic Backpack; Minecraft Large Dual Strap Lunchbox; Minecraft Squiggle Insulated Stainless Steel Drink Bottle 550Ml; Minecraft Pop Out Pencil Case |
| Minecraft Essentials Bundle | £101.50 | £76.12 | 25% Off. Online Only | 4 | Minecraft Classic Backpack; Minecraft Large Dual Strap Lunchbox; Minecraft Spritz Plastic Drink Bottle 560Ml; Minecraft Utility Pencil Case |
| Minecraft Supreme Bundle | £144.00 | £108.00 | 25% Off. Online Only | 5 | Minecraft Classic Backpack; Minecraft Large Dual Strap Lunchbox; Minecraft Medium Bento Lunchbox; Minecraft Squiggle Insulated Stainless Steel Drink Bottle 550Ml; Minecraft Hardtop Zip It Stationery Gift Pack |
| Minecraft Junior Essential Bundle | £96.50 | £72.37 | 25% Off. Online Only | 4 | Minecraft Junior Character Backpack; Minecraft Large Dual Strap Lunchbox; Minecraft Squiggle Insulated Stainless Steel Drink Bottle 550Ml; Minecraft Pop Out Pencil Case |
| Minecraft Ultimate Bundle | £90.50 | £67.87 | 25% Off. Online Only | 4 | Minecraft Junior Character Backpack; Minecraft Large Dual Strap Lunchbox; Minecraft Spritz Plastic Drink Bottle 560Ml; Minecraft Utility Pencil Case |
| Minecraft Lunch Bundle | £78.00 | £58.50 | 25% Off. Online Only | 4 | Minecraft Large Dual Strap Lunchbox; Minecraft Medium Bento Lunchbox; Minecraft Snack n Stack Containers X4; Minecraft Spritz Plastic Drink Bottle 560Ml |
| Minecraft 4 Piece Core Bundle | £96.00 | £72.00 | 25% Off. Online Only | 4 | Minecraft Junior Character Backpack; Minecraft Double Decker Lunchbox With Strap; Minecraft Pop Out Pencil Case; Minecraft Insulated Stainless Steel Flip Drink Bottle 520ml |
| I Heart Smiggle Bundle | £72.00 | £35.00 | Hot Offer. Online Only | 3 | I Heart Smiggle Classic Backpack; I Heart Smiggle Double Decker Lunchbox; I Heart Smiggle Oblong Pencil Case |
| Spider-Man 4 Piece Classic Bundle | £107.50 | £50.00 | Hot Offer. Online Only | 4 | Spider-Man Classic Backpack; Spider-Man Double Pocket Lunchbox With Strap; Spider-Man Squiggle Insulated Stainless Steel Drink Bottle 550Ml; Spider-Man Pop Out Pencil Case |
| Spider-Man Essential Bundle | £103.50 | £50.00 | Hot Offer. Online Only | 4 | Spider-Man Classic Backpack; Spider-Man Dual Compartment Lunchbag with Strap; Spider-Man Spritz Plastic Drink Bottle 560mL; Spider-Man Pop Out Pencil Case |
| Spider-Man Basic Bundle | £92.50 | £50.00 | Hot Offer. Online Only | 4 | Spider-Man Junior Character Hoodie Backpack; Spider-Man Dual Compartment Lunchbag with Strap; Spider-Man Spritz Plastic Drink Bottle 560mL; Spider-Man Pop Out Pencil Case |
| Spider-Man School Bundle | £110.00 | £82.50 | 25% Off. Online Only | 4 | Spider-Man Classic Backpack; Spider-Man Dual Compartment Lunchbag with Strap; Spider-Man Spritz Plastic Drink Bottle 560mL; Spider-Man Zip It Stationery Gift Pack |
| Spider-Man 4 Piece Character Bundle | £96.50 | £50.00 | Hot Offer. Online Only | 4 | Spider-Man Classic Backpack; Spider-Man Junior Character Hoodie Backpack; Spider-Man Double Pocket Lunchbox With Strap; Spider-Man Squiggle Insulated Stainless Steel Drink Bottle 550Ml; Spider-Man Pop Out Pencil Case |
| Spider-Man Stationery Gift Pack Bundle | £114.00 | £85.50 | 25% Off. Online Only | 4 | Spider-Man Classic Backpack; Spider-Man Double Pocket Lunchbox With Strap; Spider-Man Squiggle Insulated Stainless Steel Drink Bottle 550Ml; Spider-Man Zip It Stationery Gift Pack |
| Hello Kitty And Friends Classic Bundle | £96.50 | £72.37 | 25% Off. Online Only | 4 | Hello Kitty And Friends Junior Character Backpack; Hello Kitty And Friends Large Dual Strap Lunchbox; Hello Kitty And Friends Squiggle Insulated Stainless Steel Drink Bottle 550Ml; Hello Kitty And Friends Pop Out Pencil Case |
| Hello Kitty And Friends Essentials Bundle | £107.50 | £80.62 | 25% Off. Online Only | 4 | Hello Kitty And Friends Classic Backpack; Hello Kitty And Friends Large Dual Strap Lunchbox; Hello Kitty And Friends Squiggle Insulated Stainless Steel Drink Bottle 550Ml; Hello Kitty And Friends Pop Out Pencil Case |
| Hello Kitty And Friends Basic Bundle | £113.50 | £85.12 | 25% Off. Online Only | 4 | Hello Kitty And Friends Classic Backpack; Hello Kitty And Friends Medium See Mee Bento Lunchbox; Hello Kitty And Friends Squiggle Insulated Stainless Steel Drink Bottle 550Ml; Hello Kitty And Friends Utility Pencil Case |
| Hello Kitty And Friends Lunch Bundle | £82.00 | £61.50 | 25% Off. Online Only | 4 | Hello Kitty And Friends Large Dual Strap Lunchbox; Hello Kitty And Friends Medium See Mee Bento Lunchbox; Hello Kitty And Friends Snack & Stack Containers X4; Hello Kitty And Friends Squiggle Insulated Stainless Steel Drink Bottle 550Ml |
| Hello Kitty And Friends Ultimate Bundle | £137.50 | £103.12 | 25% Off. Online Only | 5 | Hello Kitty And Friends Classic Backpack; Hello Kitty And Friends Large Dual Strap Lunchbox; Hello Kitty And Friends Medium See Mee Bento Lunchbox; Hello Kitty And Friends Squiggle Insulated Stainless Steel Drink Bottle 550Ml; Hello Kitty And Friends Pop Out Pencil Case |
| Hello Kitty And Friends Fashion Bundle | £47.00 | £35.25 | 25% Off. Online Only | 4 | Hello Kitty And Friends Coin Pouch Lanyard; Hello Kitty And Friends Hair Gift Pack; Hello Kitty And Friends Bracelet; Hello Kitty And Friends Lip Gloss Keyring |
| Hello Kitty And Friends Junior Bundle | £102.50 | £76.87 | 25% Off. Online Only | 4 | Hello Kitty And Friends Junior Character Backpack; Hello Kitty And Friends Medium See Mee Bento Lunchbox; Hello Kitty And Friends Squiggle Insulated Stainless Steel Drink Bottle 550Ml; Hello Kitty And Friends Utility Pencil Case |
| Hello Kitty And Friends Bundle | £105.50 | £79.12 | 25% Off. Online Only | 4 | Hello Kitty And Friends Classic Backpack; Hello Kitty And Friends Large Dual Strap Lunchbox; Hello Kitty And Friends Squiggle Insulated Stainless Steel Drink Bottle 550Ml; Hello Kitty And Friends Pop Out Pencil Case |
| Hello Kitty And Friends Junior Bundle (variant) | £92.50 | £69.37 | 25% Off. Online Only | 4 | Hello Kitty And Friends Junior Character Backpack; Hello Kitty And Friends Large Dual Strap Lunchbox; Hello Kitty And Friends Spritz Plastic Drink Bottle 560Ml; Hello Kitty And Friends Pop Out Pencil Case |
| Smiggler 4 Piece Basic Bundle | £84.00 | £40.00 | Hot Offer | 4 | Smiggler Classic Backpack; Smiggler Plastic Drink Bottle 650Ml; Smiggler Double Decker Lunchbox; Smiggler Oblong Pencil Case |
| Smiggler 3 Piece Bundle | £74.00 | £35.00 | Hot Offer. Online Only | 3 | Smiggler Classic Backpack; Smiggler Plastic Drink Bottle 650Ml; Smiggler Double Decker Lunchbox |
| Unreal Ultimate Bundle | £95.00 | £34.00 | Hot Offer. Online Only | 5 | Unreal Access Backpack; Unreal Double Decker Lunchbox; Unreal Spout Plastic Drink Bottle 650Ml; Unreal Essentials Pencil Case; Unreal Wallet |
| Unreal Supreme Bundle | £98.00 | £34.00 | Hot Offer. Online Only | 5 | Unreal Access Backpack; Unreal Double Decker Lunchbox; Unreal Silicone Drink Bottle 630ml; Unreal Essentials Pencil Case; Unreal Wallet |
| Aspire Supreme Bundle | £116.50 | £87.37 | 25% Off. Online Only | 5 | Aspire Classic Attach Backpack; Aspire Insulated Stainless Steel Flip Drink Bottle 520Ml; Aspire Oblong Attach ID Lunchbox; Aspire Medium See Me Bento Lunchbox; Aspire Stationery Gift Pack |
| Aspire Explorer Bundle | £84.00 | £63.00 | 25% Off. Online Only | 4 | Aspire Classic Attach Backpack; Aspire Hydrate Plastic Drink Bottle 650ml; Aspire Stationery Gift Pack; Aspire Character Pocket Pencil Case |
| Aspire Essentials Bundle | £90.50 | £67.87 | 25% Off. Online Only | 4 | Aspire Foldover Attach Backpack; Aspire Insulated Stainless Steel Flip Drink Bottle 520Ml; Aspire Oblong Attach ID Lunchbox; Aspire Character Pocket Pencil Case |
| Aspire Ultimate Bundle | £103.00 | £77.25 | 25% Off. Online Only | 5 | Aspire Foldover Attach Backpack; Aspire Hydrate Plastic Drink Bottle 650ml; Aspire Oblong Attach ID Lunchbox; Aspire Pop Out Pencil Case; Aspire Stationery Gift Pack |
| Aspire School Ready Bundle | £88.00 | £66.00 | 25% Off. Online Only | 4 | Aspire Classic Attach Backpack; Aspire Hydrate Plastic Drink Bottle 650ml; Aspire Double Decker Lunchbox; Aspire Character Pocket Pencil Case |
| Aspire Everyday School Essentials Bundle | £94.00 | £70.50 | 25% Off. Online Only | 4 | Aspire Foldover Attach Backpack; Aspire Oblong Attach ID Lunchbox; Aspire insulated Stainless Steel Spritz Drink Bottle 500Ml; Aspire Character Pocket Pencil Case |
| Aspire Lunch Bundle | £65.50 | £49.12 | 25% Off. Online Only | 4 | Aspire Double Decker Lunchbox; Aspire Medium See Me Bento Lunchbox; Aspire Snack n Stack Containers X4; Aspire Hydrate Plastic Drink Bottle 650ml |
| Aspire Trolley Bundle | £98.50 | £73.87 | 25% Off. Online Only | 4 | Aspire Trolley Backpack With Light Up Wheels; Aspire Insulated Stainless Steel Flip Drink Bottle 520Ml; Aspire Stationery Gift Pack; Aspire Character Wallet |
| Wildflower Squiggle Bottle Bundle | £108.00 | £81.00 | 25% Off. Online Only | 4 | Wildflower Daydream Backpack; Wildflower Medium Bento Lunchbox; Wildflower Squiggle Insulated Stainless Steel Drink Bottle 550mL; Wildflower Cowboy Boot Pencil Case |
| Wildflower Lunch Bundle | £110.00 | £82.50 | 25% Off. Online Only | 4 | Wildflower Daydream Backpack; Wildflower Large Dual Strap Lunchbox; Wildflower Medium Bento Lunchbox; Wildflower Spritz Plastic Drink Bottle 560mL |
| Wildflower Trolley Bundle | £124.00 | £93.00 | 25% Off. Online Only | 4 | Wildflower Trolley Backpack With Light Up Wheels; Wildflower Large Dual Strap Lunchbox; Wildflower Medium Bento Lunchbox; Wildflower Squiggle Insulated Stainless Steel Drink Bottle 550mL |
| Pit Stop Essentials Bundle | £98.50 | £73.87 | 25% Off. Online Only | 4 | Pit Stop Zone Backpack; Pit Stop Large Dual Strap Lunchbox; Pit Stop Plastic Drink Bottle 560Ml; Pit Stop Hardtop Race Car Pencil Case |
| Pit Stop Classic Bundle | £108.00 | £81.00 | 25% Off. Online Only | 4 | Pit Stop Zone Backpack; Pit Stop Medium Bento Lunchbox; Pit Stop Squiggle Stainless Steel Insulated Drink Bottle 550Ml; Pit Stop Hardtop Race Car Pencil Case |
| Pit Stop Ultimate Bundle | £130.00 | £97.50 | 25% Off. Online Only | 5 | Pit Stop Zone Backpack; Pit Stop Large Dual Strap Lunchbox; Pit Stop Medium Bento Lunchbox; Pit Stop Squiggle Stainless Steel Insulated Drink Bottle 550Ml; Pit Stop Hardtop Race Car Pencil Case |
| Pit Stop Trolley Bundle | £108.50 | £81.37 | 25% Off. Online Only | 4 | Pit Stop Trolley Backpack With Light-Up Wheels; Pit Stop Large Dual Strap Lunchbox; Pit Stop Plastic Drink Bottle 560Ml; Pit Stop Hardtop Race Car Pencil Case |
| Pit Stop Lunch Bundle | £109.50 | £82.12 | 25% Off. Online Only | 4 | Pit Stop Zone Backpack; Pit Stop Large Dual Strap Lunchbox; Pit Stop Medium Bento Lunchbox; Pit Stop Plastic Drink Bottle 560Ml |
| Power Play Classic Bundle | £99.00 | £74.25 | 25% Off. Online Only | 4 | Power Play Classic Backpack; Power Play Large Dual Strap Lunchbox; Power Play Spritz Plastic Drink Bottle 560Ml; Power Play Football Boot Pencil Case |
| Power Play Ultimate Bundle | £130.00 | £97.50 | 25% Off. Online Only | 5 | Power Play Classic Backpack; Power Play Large Dual Strap Lunchbox; Power Play Medium Bento Lunchbox; Power Play Squiggle Stainless Steel Insulated Drink Bottle 550Ml; Power Play Football Boot Pencil Case |
| Power Play Squiggle Bottle Bundle | £108.00 | £81.00 | 25% Off. Online Only | 4 | Power Play Classic Backpack; Power Play Medium Bento Lunchbox; Power Play Squiggle Stainless Steel Insulated Drink Bottle 550Ml; Power Play Football Boot Pencil Case |
| Power Play Lunch Bundle | £110.00 | £82.50 | 25% Off. Online Only | 4 | Power Play Classic Backpack; Power Play Large Dual Strap Lunchbox; Power Play Medium Bento Lunchbox; Power Play Spritz Plastic Drink Bottle 560Ml |
| Marvel 4 Piece Essential Junior Bundle | £85.00 | £35.00 | Hot Offer | 4 | Marvel Iron Man Junior Hoodie Backpack; Marvel Flip Top Plastic Drink Bottle 650Ml; Marvel Large Double Compartment Lunchbox With Strap; Marvel Utility Pencil Case |
| Marvel 4 Piece Junior Bundle | £90.50 | £35.00 | Hot Offer | 4 | Marvel Iron Man Junior Hoodie Backpack; Marvel Insulated Stainless Steel Flip Drink Bottle 520Ml; Marvel Large Double Compartment Lunchbox With Strap; Marvel Utility Pencil Case |
| Stitch 4 Piece Classic Bundle | £98.00 | £73.50 | 25% Off. Online Only | 4 | Stitch Classic Backpack; Stitch Plastic Flip Drink Bottle 650Ml; Stitch Double Decker Lunchbox; Stitch Pop Out Pencil Case |
| Stitch 4 Piece Character Bundle | £90.50 | £67.87 | 25% Off. Online Only | 4 | Stitch Junior Hoodie Backpack; Stitch Insulated Stainless Steel Flip Drink Bottle 520Ml; Stitch Double Decker Lunchbox; Stitch Utility Pencil Case |
| Stitch 4 Piece Stationery Bundle | £59.00 | £44.25 | 25% Off. Online Only | 4 | Stitch Zip It Stationery Gift Pack; Stitch A5 Fluffy Notebook; Stitch Utility Pencil Case; Stitch Fluffy Pen |
| Stitch 4 Piece Classic Bundle (Teeny Tiny variant) | £78.00 | £58.50 | 25% Off. Online Only | 4 | Stitch Teeny Tiny Backpack With Detachable Plush; Stitch Plastic Flip Drink Bottle 650Ml; Stitch Double Decker Lunchbox; Stitch Utility Pencil Case |
| Moana Stationery Bundle | £102.00 | £50.00 | Hot Offer. Online Only | 4 | Moana Classic Backpack; Moana Zip It Stationery Gift Pack; Moana Squiggle Insulated Stainless Steel Drink Bottle 550mL; Moana A5 Lockable Notebook |
| I Spy Character Bundle | £82.50 | £61.87 | 25% Off. Online Only | 4 | I Spy Junior Character Backpack; I Spy Teeny Tiny Square Lunchbox; I Spy Medium Bento Lunchbox; I Spy Teeny Tiny Drink Bottle With Strap 400Ml |
| I Spy Teeny Bundle | £75.50 | £35.00 | Hot Offer. Online Only | 4 | I Spy Teeny Tiny Backpack; I Spy Teeny Tiny Square Lunchbox; I Spy Medium Bento Lunchbox; I Spy Teeny Tiny Drink Bottle With Strap 400Ml |
| I Spy Teeny Bundle (variant) | £75.50 | £56.62 | 25% Off. Online Only | 4 | I Spy Teeny Tiny Backpack; I Spy Teeny Tiny Square Lunchbox; I Spy Medium Bento Lunchbox; I Spy Teeny Tiny Drink Bottle With Strap 400Ml |
| Realm 4 Piece Classic Bundle | £88.50 | £35.00 | Hot Offer. Online Only | 4 | Realm Classic Attach Backpack; Realm Insulated Stainless Steel Flip Drink Bottle 480Ml; Realm Oblong Attach Lunchbox; Realm Pop Out Pencil Case |
| Realm 4 Piece Standard Bundle | £88.00 | £35.00 | Hot Offer. Online Only | 4 | Realm Classic Attach Backpack; Realm Plastic Drink Bottle 650Ml; Realm Double Decker Lunchbox; Realm Character Pocket Pencil Case |
| Realm 4 Piece All Grey Bundle | £88.00 | £35.00 | Hot Offer. Online Only | 4 | Realm Classic Backpack; Realm Plastic Drink Bottle 650Ml; Realm Double Decker Lunchbox; Realm Character Pocket Pencil Case |
| Realm 4 Piece Everyday Bundle | £93.00 | £69.75 | 25% Off. Online Only | 4 | Realm Classic Attach Backpack; Realm Plastic Drink Bottle 650Ml; Realm Medium Bento Lunchbox; Realm Wallet With Lanyard |
| Realm 4 Piece Journey Bundle | £106.00 | £79.50 | 25% Off. Online Only | 4 | Realm Trolley Backpack With Light-up Wheels; Realm Plastic Drink Bottle 650Ml; Realm Medium Bento Lunchbox; Realm Wallet With Lanyard |
| Realm Travel Essentials Bundle | £142.00 | £106.50 | 25% Off. Online Only | 6 | Realm Trolley Backpack With Light-up Wheels; Realm Plastic Drink Bottle 650Ml; Realm Medium Bento Lunchbox; Realm Wallet With Lanyard; Realm Tunes Headphones; Realm Stationery Gift Pack |
| Weekend Classic Bundle | £79.00 | £59.25 | 25% Off. Online Only | 4 | Weekend Junior ID Backpack; Weekend Junior ID Lunchbox With Strap; Weekend Junior Stainless Steel Drink Bottle 400Ml; Weekend Flip Zipped Pencil Case |
| Weekend Stationery Bundle | £70.00 | £52.50 | 25% Off. Online Only | 4 | Weekend Junior ID Backpack; Weekend Flip Zipped Pencil Case; Weekend A4 Essentials Stationery Gift Pack; Weekend Lanyard Wallet |
| Weekend Lunch Bundle | £70.50 | £52.87 | 25% Off. Online Only | 4 | Weekend Junior ID Lunchbox With Strap; Weekend Medium Bento Lunchbox; Weekend Snack & Stack Containers X4; Weekend Junior Stainless Steel Drink Bottle 400Ml |
| Weekend Lunch Container Bundle | £52.00 | £39.00 | 25% Off. Online Only | 4 | Weekend Junior ID Lunchbox With Strap; Weekend 4 in 1 Containers; Weekend Snack & Stack Containers X4; Weekend Junior Stainless Steel Drink Bottle 400Ml |
| Weekend Teeny Tiny Bundle | £107.50 | £80.62 | 25% Off. Online Only | 4 | Weekend Teeny Tiny Backpack; Weekend Teeny Tiny Square Lunchbox; Weekend Medium Bento Lunchbox; Weekend Junior Stainless Steel Drink Bottle 400Ml |
| Weekend Character Bundle | £82.00 | £61.50 | 25% Off. Online Only | 4 | Weekend Junior Character Backpack; Weekend Junior ID Lunchbox With Strap; Weekend Junior Stainless Steel Drink Bottle 400Ml; Weekend Flip Zipped Pencil Case |
| Bright Eyes 4 Piece Essential Bundle | £88.00 | £66.00 | 25% Off. Online Only | 4 | Bright Eyes Classic Attach Backpack; Bright Eyes Plastic Drink Bottle 650Ml; Bright Eyes Double Decker Lunchbox; Bright Eyes Character Pocket Pencil Case |
| Hey There Classic Bundle | £88.00 | £66.00 | 25% Off. Online Only | 4 | Hey There Classic Backpack; Hey There Double Decker Lunchbox; Hey There Plastic Drink Bottle 650Ml; Hey There Character Pencil case |
| Playtime 4 Piece Basic Bundle | £77.00 | £57.75 | 25% Off. Online Only | 4 | Playtime Junior ID Backpack; Playtime Junior ID Lunchbox With Strap; Playtime Junior Flip Plastic Drink Bottle 430Ml; Playtime Wallet With Lanyard |
| Playtime 3 Piece Character Bag Bundle | £72.00 | £54.00 | 25% Off. Online Only | 3 | Playtime Junior Character Backpack; Playtime Junior ID Lunchbox With Strap; Playtime Junior Stainless Steel Flip Drink Bottle 400Ml |

**Total unique bundle names found:** ~69 (many titles appear across 2–4 colour variants; total cards including all colour variants was ~141–150+ entries)

---

## 3. Individual Bundle Product Pages

### 3a. Unreal Silicone Bottle Bundle (Unreal Pink)
**URL:** `https://www.smiggle.co.uk/shop/en/smiggleuk/gift-bundles/ready-made-bundles/unreal-silicone-bottle-bundle-unreal-pink`
**Screenshots:** `screenshots/pdp_unreal_silicone_top.png`, `screenshots/pdp_unreal_silicone_description_1.png`, `screenshots/pdp_unreal_silicone_description_2.png`, `screenshots/pdp_unreal_silicone_pink_details_list.png`

- **Was Price:** £87.00
- **Now Price:** £30.00
- **Promo Tag (as shown on grid card):** `Hot Offer`
- **Items (4):** Unreal Access Backpack; Unreal Double Decker Lunchbox; Unreal Silicone Drink Bottle 630ml; Unreal Essentials Pencil Case
- **How saving is communicated on PDP:** Could not read exact PDP promo text — the JavaScript step querying the promo tag element ran but the result was not captured before quota exhaustion. The grid card shows `Hot Offer` only. No £ amount saved or % saved text was confirmed as present on PDP (COULD NOT READ).
- **How included items are shown:** Could not confirm exact presentation format from screenshots alone. Description screenshots suggest items listed in text.
- **CTA button text:** COULD NOT READ (JavaScript query for button ran; result not captured before quota exhaustion).

### 3b. Wildflower Classic Bundle (Pink)
**URL:** `https://www.smiggle.co.uk/shop/en/smiggleuk/gift-bundles/ready-made-bundles/wildflower-classic-bundle-pink`
**Screenshot:** `screenshots/pdp_wildflower_classic.png`

- **Was Price:** £99.00
- **Now Price:** £74.25
- **Promo Tag:** `25% Off. Online Only`
- **Items (4):** Wildflower Daydream Backpack; Wildflower Large Dual Strap Lunchbox; Wildflower Spritz Plastic Drink Bottle 560mL; Wildflower Cowboy Boot Pencil Case

### 3c. Giggle By Smiggle 4 Piece Bundle
**URL:** `https://www.smiggle.co.uk/shop/en/smiggleuk/gift-bundles/ready-made-bundles/giggle-by-smiggle-4-piece-bundle-44277505`
**Screenshot:** `screenshots/pdp_giggle_smiggle.png`

- **Was Price:** £50.00
- **Now Price:** £30.00
- **Promo Tag:** `Hot Offer`
- **Items (4):** Giggle by Smiggle Backpack; Giggle by Smiggle Lunchbox; Giggle by Smiggle Plastic Drink Bottle 450ml; Giggle by Smiggle Handy Pencil case

---

## 4. "Build a Bundle" Flow

No "Build a bundle", "Build your own bundle", "Mix & Match", or "Custom bundle" interactive tool was found during navigation. The site offers only pre-made bundle pages. This was confirmed by the browser subagent reviewing navigation menus, header links, and the bundle category page structure.

---

## 5. Computed Styles

All computed style fields are in `COMPUTED.json`. Summary:

| Element | Status |
|---|---|
| Homepage promo/price-band tile | Tile labels and dimensions read via JS. Border-radius: 0px (CSS), corners are image assets. Font/colour styles: COULD NOT READ |
| Bundle card (grid) | COULD NOT READ — second subagent hit quota before extraction |
| List price element (struck) | COULD NOT READ |
| Sale price element | COULD NOT READ |
| Savings badge | COULD NOT READ |
| CTA button (PDP) | COULD NOT READ |

**Reason:** The model API quota was exhausted (HTTP 429) before the computed style extraction subagent could complete its JavaScript measurements. The JS code to query `window.getComputedStyle()` was written and submitted, but the session terminated before results were returned.

---

## Data Gaps

1. **Computed CSS styles** for all elements — not obtained (quota exhaustion). Cannot be estimated.
2. **CTA button exact text** — not captured. Cannot be stated.
3. **PDP saving communication** (£ amount, %, both, or neither on PDP page) — not confirmed for individual bundle pages.
4. **PDP item presentation format** (list, thumbnails, selector) — not confirmed from screenshots alone.
5. **Viewport** was 502px, not 375px. The layout *appears* identical to mobile but pixel measurements are at 502px.
