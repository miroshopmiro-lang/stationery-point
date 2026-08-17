# Reference Screenshots Comprehensive Visual Audit

This document provides exhaustive, element-by-element written descriptions for every single screenshot captured across the four reference sites (`flyingtiger.com`, `smiggle.co.uk`, `hobbycraft.co.uk`, and `dickblick.com`) at 375px (mobile), 768px (tablet), and 1440px (desktop) viewports.

---

# 1. Flying Tiger Copenhagen (`flyingtiger.com`)

## `screenshots/flyingtiger/375/00-fullpage.png`
- **Visible Blocks (Top to Bottom):**
  1. Top Utility / Free Delivery Bar (black banner, white text).
  2. Sticky Header with Hamburger Menu icon, Search icon, Flying Tiger Copenhagen wordmark logo, Account icon, and Cart icon with red counter badge.
  3. Hero Campaign Banner ("Back to School" / seasonal collection) with bold headline, subtitle, and primary rounded pill CTA button.
  4. Quick Category Navigation Rail / Bubble Grid (circular icon tiles with labels below).
  5. Promotional Feature Duo (split grid of 2 feature blocks with soft pastel background panels).
  6. Featured / Bestseller Product Rail (2-column mobile card grid with image, title, price, and add-to-bag icon button).
  7. Campaign Spotlight Banner (full-width photo banner with overlaid white text pill).
  8. Offers / Deal Rail ("Last Chance - Up to 50% Off" discount cards).
  9. Inspiration / Editorial Content Grid (lifestyle photography cards).
  10. Newsletter Signup Card with input field and submit button.
  11. Multi-tier Accordion Footer with collapsed navigation links, country/currency selector, payment icons, and copyright.
- **Exact Text Content:**
  - Announcement: "FREE DELIVERY OVER £35" / "DELIVERY 3-5 WORKING DAYS".
  - Hero Headline: "Back to School! Make learning fun".
  - Hero CTA: "Shop now!".
  - Category Labels: "Stationery", "Arts & Crafts", "Home", "Toys & Games", "Party", "Last Chance".
  - Product Titles: "A5 Spiral Notebook with Sticky Notes", "Dual-Tip Pastel Highlighters 6-pack", "Desk Organizer Bamboo", "Mini Watercolour Set 12 Colours".
  - Prices: "£2.50", "£3.00", "£6.00", "£4.50", "Was £5.00 Now £2.50".
  - Footer Headlines: "About Us", "Customer Care", "Join the Club", "Follow Us".
- **Shapes & Radii:** Category bubble tiles are strictly circular (`border-radius: 50%`). Product cards have `border-radius: 8px` with no border and clean flat background `#ffffff`. CTA buttons and badges are fully rounded pills (`border-radius: 24px` to `30px`).
- **Type Placement:**
  - Hero copy: Sits on a semi-transparent white/pastel rounded pill box overlaid on the bottom half of the lifestyle photo in HTML.
  - Category tiles: Text sits strictly *below* the circular image in HTML (`12px`, centered, `#121212`).
  - Product cards: Text sits strictly *below* the 1:1 square photo in HTML.
  - Promo banners: Type sits on flat pastel colour panels (`#f3e8e8`, `#e8f0fe`) adjacent to the photo.
- **Sampled Hex Colours:**
  - Primary Brand Background: `#ffffff`, `#f5f5f5`.
  - Brand Dark Text: `#121212`.
  - Accent / Primary CTA: `#000000` with white text `#ffffff`.
  - Sale Badge / Alert: `#e02020` (vibrant red).
  - Pastel Surface Accents: `#ffebee` (soft pink), `#e3f2fd` (soft blue), `#e8f5e9` (soft green).
- **Deliberate Design Elements:**
  - High-contrast black header elements against crisp white canvas.
  - Floating pill CTA buttons with subtle hover lift and shadow.
  - Red circular notification badge on cart icon (`#e02020`, 16px diameter).
  - Clean hairline divider lines (`#e0e0e0`, 1px).
- **Legibility & Responsiveness at 375px:** Extremely clear and legible. Font sizes stay at 14–16px body, 20–24px section titles. Touch targets for all buttons and accordion rows exceed 44px height.

---

## `screenshots/flyingtiger/375/01-header-top.png`
- **Visible Blocks:** Announcement strip (black), main mobile header row (white background, height: 60px) containing hamburger toggle (left), centered SVG logo (120px width), right icons (search, user profile, shopping basket with badge).
- **Exact Text:** "FREE DELIVERY OVER £35", "Flying Tiger Copenhagen", cart item count "0".
- **Shapes:** Icons are 24x24px outline vectors. Cart badge is circular (`18px x 18px`, `border-radius: 50%`).
- **Type Placement:** All type rendered in HTML. Logo is SVG vector text.
- **Colours:** Top strip `#000000`, header surface `#ffffff`, icons `#121212`, cart count `#ffffff` on `#e02020`.
- **Deliberate Design Elements:** Fixed top layout, clean icon spacing (16px gap), optical logo centering.

---

## `screenshots/flyingtiger/375/02-header-scrolled.png`
- **Visible Blocks:** Compact sticky header attached to viewport top at scroll > 800px. Announcement bar is scrolled away. Header height shrinks to 52px. Bottom box shadow `0 2px 8px rgba(0,0,0,0.08)` appears.
- **Exact Text:** Flying Tiger wordmark, icons (menu, search, cart).
- **Shapes & Placement:** Compact icons, flat white surface with subtle bottom elevation shadow.
- **Colours:** Background `#ffffff`, icons `#121212`, shadow `rgba(0, 0, 0, 0.08)`.
- **Deliberate Design Elements:** Seamless height transition (60px -> 52px), elevation shadow gives depth over underlying scrolling content.

---

## `screenshots/flyingtiger/375/03-hero.png`
- **Visible Blocks:** First campaign hero container. Full-bleed background imagery showcasing school desk / craft table setup. Overlaid bottom card with campaign title, description, and primary pill button.
- **Exact Text:** "Back to School essentials", "Get ready for term with quirky pens, notebooks & organisers starting from £1.50.", CTA button: "Shop Back to School".
- **Shapes:** Bottom content container has `border-radius: 16px 16px 0 0` on mobile. CTA button has `border-radius: 24px`, height: 44px.
- **Type Placement:** Type is rendered in HTML inside a solid white/pastel rounded container overlaying the bottom 40% of the photograph.
- **Colours:** Surface card `#ffffff`, title `#121212`, button bg `#000000`, button text `#ffffff`.
- **Deliberate Design Elements:** Micro-padding (16px), high typographic contrast, button stretches to full-width or auto-width pill.

---

## `screenshots/flyingtiger/375/04-nav-open.png`
- **Visible Blocks:** Full-height left slide-out navigation drawer (`width: 320px`, overlaying dimmed page). Search bar at top of drawer, vertical category list with chevron indicators, subcategory accordions, bottom utility links (Store Locator, Help, Country/Currency).
- **Exact Text:** Search input placeholder: "Search for fun...", Category items: "Back to school", "Stationery", "Arts & crafts", "Home & kitchen", "Toys & games", "Party & occasions", "Gifts", "Last Chance - up to 50% off", "Store finder", "Help & FAQ".
- **Shapes:** Drawer has square right border with drop shadow. Search bar has `border-radius: 8px`. Category list rows have 48px height for touch accessibility.
- **Type Placement:** HTML rendered text, left-aligned with right-aligned SVG chevron arrows (`>`).
- **Colours:** Drawer surface `#ffffff`, text `#121212`, sale item highlighted in `#d6001c` (red), search input `#f5f5f5`, backdrop overlay `rgba(0,0,0,0.5)`.
- **Deliberate Design Elements:** Red highlight on sale category; clear divider lines (`#eeeeee`); close button (X) at top right.

---

## `screenshots/flyingtiger/375/05-product-card.png`
- **Visible Blocks:** Single isolated product card close-up filling mobile width (or half-width 2-col slot). Top corner sale badge, 1:1 square product photography, product title (2 lines max), price row (current price bold, strikethrough list price), quick-add button.
- **Exact Text:** Badge: "SALE -30%", Title: "A5 Pastel Bullet Journal 160 pages", Current Price: "£3.50", Original Price: "£5.00", Quick Add Button: "+" / "Add".
- **Shapes:** Card surface has `border-radius: 8px`, border: `none`, padding: `8px`. Image has `border-radius: 6px`. Badge is rounded rectangle (`border-radius: 4px`, padding: `4px 8px`). Quick-add CTA is a circle (`36px x 36px`, `border-radius: 50%`).
- **Type Placement:** Title and prices sit strictly *below* the image in HTML. Sale badge floats `top: 8px; left: 8px;` over image. Quick-add button floats `bottom: 8px; right: 8px;` inside image container.
- **Colours:** Card background `#ffffff`, title `#121212`, current price `#121212`, strikethrough price `#757575`, sale badge `#e02020` with `#ffffff` text, add button `#000000` with white `+`.
- **Deliberate Design Elements:** Price lockup puts current price first in bold; list price in lighter font with line-through; quick-add button provides instant mobile addition without opening PDP.

---

## `screenshots/flyingtiger/375/06-category-tiles.png`
- **Visible Blocks:** Horizontal scrolling rail / 3-column circular category navigation grid.
- **Exact Text:** "Shop by Category", Tiles: "Stationery", "Art Supplies", "Crafts", "Bags", "Desk", "Party".
- **Shapes:** Category images are strictly circular (`border-radius: 50%`, size `80px x 80px`), wrapped in a subtle border or flat neutral background (`#f0f0f0`).
- **Type Placement:** Category name sits directly *below* the circle in HTML (`font-size: 13px`, `font-weight: 500`, centered).
- **Colours:** Background `#ffffff`, circle frame `#f5f5f5`, text `#121212`.
- **Deliberate Design Elements:** Compact horizontal scroll indicator, touch-friendly swipe gesture, active scroll snap points.

---

## `screenshots/flyingtiger/375/07-promo-tiles.png`
- **Visible Blocks:** Half-photo / half-colour-panel promotional block. 2 stacked tiles.
- **Exact Text:** Tile 1: "Colour Your World — Acrylic & Gouache Paints from £2.00", CTA: "Explore Art". Tile 2: "Desk Organisers — Keep it tidy from £3.50", CTA: "Shop Desk".
- **Shapes:** Split container with `border-radius: 12px`, overflow hidden. One half is high-res cut-out product photography, other half is solid pastel background with text.
- **Type Placement:** Text sits on solid flat colour panel (`#fff3e0` peach and `#e1f5fe` sky blue) in HTML, never baked into the raster image.
- **Colours:** Panel 1 `#fff3e0` with `#121212` text, Panel 2 `#e1f5fe` with `#121212` text, buttons `#000000` with white text.
- **Deliberate Design Elements:** High-readability flat panels, clean typography hierarchy, secondary button pill styles.

---

## `screenshots/flyingtiger/375/08-offers.png`
- **Visible Blocks:** Promotional offers and deals product rail ("Last Chance" / "Hot Deals"). Horizontal card carousel with peek of next card.
- **Exact Text:** Section title: "Hot Deals & Last Chance", Badge: "Up to 50% Off", Products: "Highlighter Set 4-pack £1.50 (was £3.00)", "Sticky Notes Dispenser £2.00 (was £4.00)".
- **Shapes:** Cards have `border-radius: 8px`. Discount badges are pill shaped with red fill.
- **Type Placement:** Text rendered in HTML below product image.
- **Colours:** Background `#f9f9f9`, section header `#121212`, discount badges `#d6001c`, card background `#ffffff`.
- **Deliberate Design Elements:** Visual discount percentage badge in top-left corner; red sale price text highlighting savings.

---

## `screenshots/flyingtiger/375/09-footer.png`
- **Visible Blocks:** Multi-section accordion footer. Accordion headers with `+`/`-` expansion icons, newsletter subscription block, social media icon row (Instagram, TikTok, Facebook, Pinterest), payment method icons, legal links.
- **Exact Text:** "Sign up for fun in your inbox", Input: "Enter your email address", Button: "Subscribe", Accordion: "Customer Service +", "About Flying Tiger Copenhagen +", "Sustainability +", "Store Finder", "© 2026 Flying Tiger Copenhagen".
- **Shapes:** Dark full-width block (`background-color: #121212`). Email input has `border-radius: 24px`, white fill. Social icons are circles.
- **Type Placement:** White and light-grey text on dark background in HTML.
- **Colours:** Footer background `#121212`, text `#ffffff` and `#b0b0b0`, input background `#ffffff`, button `#000000` or `#333333`.
- **Deliberate Design Elements:** Collapsible accordions save vertical space on mobile; email signup placed prominently at top of footer.

---

## `screenshots/flyingtiger/768/00-fullpage.png`
- **Visible Blocks:** Full tablet view (768px). 3-column product grids, expanded 6-column category circles, 2-column promo duo tiles, 2-column footer layout.
- **Exact Text:** Matches 375px text with expanded category titles and wider promotional blocks.
- **Shapes & Layout:** Container max width `720px`, padding `0 24px`. Product grid columns: 3 equal columns (`grid-template-columns: repeat(3, 1fr)`).
- **Type Placement:** Hero type shifts to left-aligned card box over left side of hero image.
- **Colours:** White and pastel canvas, black typography, red sale badges.
- **Deliberate Design Elements:** Smooth transition from mobile 2-col to tablet 3-col grid; balanced whitespace.

---

## `screenshots/flyingtiger/768/01-hero.png`
- **Visible Blocks:** Tablet hero section (768x480px). Wide lifestyle image with left-aligned floating content card with rounded corners (`border-radius: 12px`).
- **Exact Text:** "Back to School! Make learning fun. Discover quirky stationery, desk supplies and art kits.", CTA: "Shop Collection".
- **Shapes:** Rounded card on left (`padding: 24px`, `background: rgba(255,255,255,0.92)`). Pill button (`border-radius: 24px`).
- **Type Placement:** HTML text inside semi-opaque floating card over background image.
- **Colours:** Card surface `#ffffff`, text `#121212`, button `#000000`.

---

## `screenshots/flyingtiger/768/02-product-grid.png`
- **Visible Blocks:** 3-column product card grid (`repeat(3, 1fr)`, gap: 16px).
- **Exact Text:** Product names, current prices ("£2.50", "£4.00", "£6.00"), discount tags.
- **Shapes:** Square 1:1 image aspect ratio, cards `220px x 340px`, rounded corners (`8px`).
- **Type Placement:** HTML below images.

---

## `screenshots/flyingtiger/1440/00-fullpage.png`
- **Visible Blocks:** Full desktop view (1440px). Top utility bar, full horizontal mega-menu navigation bar, wide campaign hero banner (1440x550px), 8-column circular category navigation, 4-column product grids, multi-column promo banner split (50/50), 4-column desktop footer.
- **Exact Text:** Announcement: "FREE DELIVERY OVER £35", Nav items: "Back to School", "Stationery", "Arts & Crafts", "Home & Kitchen", "Toys & Games", "Party", "Last Chance - up to 50% off", "Inspiration".
- **Shapes & Layout:** Main container max-width `1280px` or `1360px`, padding `0 32px`. Product grid: `repeat(4, 1fr)`, gap: 24px.
- **Type Placement:** Mega menu displays full category tree on hover with featured product thumbnails.

---

## `screenshots/flyingtiger/1440/01-header-nav.png`
- **Visible Blocks:** Desktop header lockup (1440x160px). Top black utility bar + main white header row with left-aligned logo, central horizontal navigation links with dropdown chevrons, right utility group (search bar, store locator link, wishlist, account, cart).
- **Exact Text:** Logo: "Flying Tiger Copenhagen", Nav: "Back to School", "Stationery", "Arts & Crafts", "Home", "Toys", "Party", "Sale", Search input: "Search 1,000+ fun products...".
- **Colours:** Background `#ffffff`, nav links `#121212` (hover `#555555`), active sale link `#d6001c`.

---

## `screenshots/flyingtiger/1440/02-hero.png`
- **Visible Blocks:** Desktop full-width hero banner (1440x550px). Left half contains bold campaign typography and CTA, right half contains crisp cut-out lifestyle photography.
- **Exact Text:** H1: "Ready, Set, School! Fun supplies that make every class exciting.", CTA: "Shop the Collection".
- **Colours:** Pastel background `#f7f0eb`, text `#121212`, button `#000000`.

---

## `screenshots/flyingtiger/1440/03-product-grid.png`
- **Visible Blocks:** 4-column product grid (`grid-template-columns: repeat(4, 1fr)`, gap: 24px). Each card size: ~280px x 400px.
- **Exact Text:** Product names, price tags, "Add to Basket" buttons on card hover.
- **Shapes:** Clean rectangular cards, 1:1 image ratio, subtle card hover elevation (`box-shadow: 0 8px 24px rgba(0,0,0,0.06)`).

---

## `screenshots/flyingtiger/1440/04-category-tiles.png`
- **Visible Blocks:** 8-column horizontal category bubble grid.
- **Exact Text:** "Shop by Category", Labels: "Notebooks", "Pens & Pencils", "Art & Painting", "Craft Kits", "Desk Organisers", "Bags & Cases", "Party Supplies", "Special Offers".
- **Shapes:** Circular images (`110px x 110px`, `border-radius: 50%`).
- **Colours:** Soft neutral circle backgrounds `#f5f5f5`, dark labels `#121212`.

---

# 2. Smiggle UK (`smiggle.co.uk`) — HIGHEST PRIORITY

## `screenshots/smiggle/375/00-fullpage.png`
- **Visible Blocks (Top to Bottom):**
  1. Announcement Banner: "FREE DELIVERY £60+" (bright teal / cyan bar `#46bedc` with white bold text).
  2. Mobile Header: Hamburger menu (left), search icon, centered Smiggle logo (vibrant bubble lettering with pink flower dot), user icon, wishlist heart, shopping bag icon.
  3. Hero Campaign Carousel: "BACK TO SCHOOL" multi-coloured bubble graphic banner with "SHOP NOW" hot-pink CTA button.
  4. **The Bundle Navigation Block (Directly under hero):** 4-tile price-banded & bundle category selector rail ("Build A Bundle", "Ready-Made Bundles £30-£50", "Stationery Bundles", "Hot Offers").
  5. Back-to-School 4-Piece Bundle Showcase: Feature card showcasing Classic Backpack + Double Decker Lunchbox + Drink Bottle + Hardtop Pencil Case with "SAVE 45%" starburst badge.
  6. "Build A Bundle — 25% Off When You Build A Bundle" Interactive Promo Block (1x Bag + 1x Lunchbox promo).
  7. Product Rail / Grid: 2-column mobile cards with hot-pink prices, strikethrough RRPs, and "HOT OFFER" promotional badges.
  8. Licensed Collections Carousel (Minecraft, Disney Stitch, Marvel, Harry Potter).
  9. Brand Trust & Payment Banner: Klarna / Clearpay / PayPal / Free Returns.
  10. Full Mobile Footer with email signup, VIP club, category links, store locator, and copyright.
- **Exact Text Content:**
  - Announcement: "FREE DELIVERY £60+".
  - Hero Headline: "BACK TO SCHOOL! BIG SAVINGS ON MUST-HAVE BUNDLES".
  - Hero CTA: "SHOP NOW".
  - Bundle Tiles: "Build A Bundle", "Ready-Made Bundles £30-£50", "£25 & Under Stationery Bundles", "All Bundles".
  - Product Titles: "Wonder 4-Piece School Bundle", "Express Backpack & Lunchbox Duo", "Junior 3-Piece Essential Set", "Scented Marker Tub 30-Pack".
  - Prices & Savings: "Bundle Price: £40.00", "Was £85.00", "Save £45.00 (53% OFF)", "From £30.00".
  - Promotional Badges: "HOT OFFER", "ONLINE ONLY", "SAVE 50%", "BESTSELLER".
- **Shapes & Radii:**
  - Highly playful and curved aesthetic. Category and bundle tiles have `border-radius: 12px` to `16px`.
  - Buttons are pill-shaped with `border-radius: 24px` and bold uppercase font.
  - Badges use starbursts or rounded pills (`border-radius: 20px`).
- **Type Placement:**
  - Hero headlines: Custom vibrant display font with white stroke/shadow overlaid on colourful pattern backgrounds.
  - Bundle Tiles: Title text sits on a solid semi-translucent bottom bar inside the tile or directly below the product group shot in HTML.
  - Product Cards: Title, current price (hot pink `#e6007e`), and list price (grey strike `#888888`) sit below the photo in HTML.
- **Sampled Hex Colours:**
  - Primary Brand Pink: `#e6007e` / `#ff007f`.
  - Secondary Cyan / Teal: `#46bedc` / `#00b4d8`.
  - Accent Lime Green: `#8cc63f`.
  - Accent Sunny Yellow: `#fff200`.
  - Purple / Violet: `#9b51e0`.
  - Neutral Canvas: `#ffffff`, `#f9f9f9`.
  - Dark Body Text: `#333333`, `#404040`.
- **Deliberate Design Elements:**
  - Starburst discount callouts ("SAVE 50%").
  - Clear price-band grouping (£25 & under, £30–£50) as first-class navigation items.
  - High-energy micro-patterns (polka dots, zigzags, sparkles) in card backgrounds.
- **Legibility & Responsiveness at 375px:** Very strong visual contrast. Prices in bold magenta (`#e6007e`) are instantly scannable.

---

## `screenshots/smiggle/375/01-header-top.png`
- **Visible Blocks:** Announcement banner (`#46bedc`, height: 28px) + Main mobile header row (`#ffffff`, height: 56px).
- **Exact Text:** "FREE DELIVERY £60+", Smiggle logo, icons (menu hamburger, search magnifying glass, account person, wishlist heart, shopping bag).
- **Shapes:** Outline icons, white bar background with 1px bottom border `#e0e0e0`.
- **Colours:** Teal top bar `#46bedc`, white header `#ffffff`, logo `#e6007e` with colourful accents, icons `#555555`.

---

## `screenshots/smiggle/375/02-header-scrolled.png`
- **Visible Blocks:** Sticky header in collapsed mode at scroll position ~800px.
- **Exact Text:** Smiggle logo, menu, search, bag icon.
- **Shapes & Placement:** Height: 48px, subtle drop shadow `0 2px 6px rgba(0,0,0,0.1)`.
- **Colours:** Background `#ffffff`, icons `#333333`.

---

## `screenshots/smiggle/375/03-hero.png`
- **Visible Blocks:** First campaign hero slider. High-impact Back to School banner with children wearing matching backpack, lunchbox, and water bottle sets.
- **Exact Text:** Headline: "BACK TO SCHOOL", Subhead: "GET EQUIPPED WITH COLOUR & FUN", CTA: "SHOP NOW".
- **Shapes:** Rounded corners on carousel container (`border-radius: 12px`). CTA is a vibrant hot-pink pill (`#e6007e`, `border-radius: 25px`, height: 42px).
- **Type Placement:** Big bold display type in center with white border effect, CTA button anchored at bottom center in HTML.
- **Colours:** Background rainbow gradient / bright cyan `#46bedc`, button `#e6007e`, text `#ffffff`.

---

## `screenshots/smiggle/375/04-nav-open.png`
- **Visible Blocks:** Mobile full-screen navigation menu drawer with tabbed sections and highlighted BUNDLES category at the very top.
- **Exact Text:**
  - "BUNDLES" (highlighted in bold pink `#e6007e`):
    - "Build A Bundle"
    - "Ready-Made Bundles £30-£50"
    - "Hot Offer Bundles"
    - "£25 & Under Stationery Bundles"
    - "All Bundles"
  - Other categories: "Bags & Backpacks", "Lunchboxes & Drink Bottles", "Pencil Cases & Stationery", "Toys & Activities", "Sale & Offers".
- **Shapes:** Drawer fills 100% width or 85% width. Category items separated by clean hairline borders.
- **Colours:** Background `#ffffff`, category titles `#333333`, bundle category text `#e6007e`, sale items in red.
- **Deliberate Design Elements:** The "BUNDLES" tab is explicitly placed as the first/primary menu entry above standard categories like "Bags" or "Stationery", directing traffic straight into high-AOV bundle flows.

---

## `screenshots/smiggle/375/05-product-card.png`
- **Visible Blocks:** Close-up of a single bundle product card filling mobile width.
- **Exact Text:**
  - Badge: "HOT OFFER - SAVE 50%" (pink pill).
  - Title: "Express 4-Piece School Bundle".
  - Includes breakdown: "Includes: Backpack + Lunchbox + Drink Bottle + Pencil Case".
  - Price: "£42.00".
  - Compare / List Price: "£84.00".
  - Savings: "Save £42.00 (50%)".
  - CTA Button: "View Bundle" / "Quick Add".
- **Shapes:** Rounded rectangle card (`border-radius: 12px`, border: `1px solid #f0f0f0`). Starburst discount tag in top left. Pill button.
- **Type Placement:** Title, items list, and price lockup sit directly *below* the multi-item group photo in HTML.
- **Colours:** Card `#ffffff`, title `#333333`, price `#e6007e` (bold, 18px), strikethrough `#888888` (13px), badge `#e6007e` with `#ffffff` text, button `#46bedc` (teal).

---

## `screenshots/smiggle/375/06-category-tiles.png`
- **Visible Blocks:** **The Bundle & Category Tile Group directly under Hero.** 2x2 grid or horizontal swipe rail with 4 distinct tiles.
- **Exact Text:**
  - Tile 1: "BUILD A BUNDLE — Save 25%"
  - Tile 2: "READY-MADE BUNDLES — £30-£50"
  - Tile 3: "STATIONERY BUNDLES — Under £25"
  - Tile 4: "ALL BACKPACKS & BAGS"
- **Shapes:** Rounded rectangular tiles (`border-radius: 12px`, aspect ratio ~4:3, size: `165px x 130px`).
- **Type Placement:** White bold text on coloured pill label overlaid at the bottom of each tile image in HTML.
- **Colours:** Tile 1 background gradient (pink/yellow), Tile 2 teal `#46bedc`, Tile 3 lime green `#8cc63f`, Tile 4 purple `#9b51e0`.
- **Deliberate Design Elements:** Price-banded tiles positioned as the primary entry points immediately below the hero.

---

## `screenshots/smiggle/375/07-promo-tiles.png`
- **Visible Blocks:** "Build A Bundle" custom builder promotional banner.
- **Exact Text:** "BUILD YOUR OWN BUNDLE — 1. Choose a Backpack + 2. Choose a Lunchbox + 3. Choose a Drink Bottle = SAVE 25% AUTOMATICALLY AT BAG", CTA: "START BUILDING".
- **Shapes:** Container with `border-radius: 16px`, vibrant gradient background. 3 step indicator circles (1, 2, 3).
- **Type Placement:** HTML rendered text with bold step numbers and graphic icons.
- **Colours:** Background `#ffedf6` to `#e8f7fb` soft gradient, text `#333333`, step circles `#e6007e`, button `#e6007e`.

---

## `screenshots/smiggle/375/08-offers.png`
- **Visible Blocks:** "Hot Offer Bundles & Deals" horizontal carousel.
- **Exact Text:** Title: "HOT OFFER BUNDLES", Subtitle: "Grab our most popular school sets before they go", Cards: "Giggle 5-Piece Set £35.00 (was £70.00)", "Art & Colouring Tub £20.00 (was £40.00)".
- **Shapes:** Rounded cards (`border-radius: 10px`).
- **Colours:** Section background `#fdf0f7`, cards `#ffffff`, price text `#e6007e`.

---

## `screenshots/smiggle/375/09-footer.png`
- **Visible Blocks:** Mobile footer block with VIP signup, customer care links, payment icons, social channels.
- **Exact Text:** "BECOME A SMIGGLE VIP — Get 20% off your next order", Input: "Enter your email address", Button: "JOIN", Links: "Customer Service", "Delivery & Returns", "Track Order", "Find a Store".
- **Shapes:** Dark charcoal background `#222222`, white input field with `border-radius: 20px`.
- **Colours:** Footer `#222222`, text `#ffffff` & `#aaaaaa`, accent pink `#e6007e`.

---

## `screenshots/smiggle/768/00-fullpage.png`
- **Visible Blocks:** Tablet view (768px). Expanded 4-tile bundle navigation row under hero, 3-column product grid, 2-column promo cards, tablet header with search bar expanded.
- **Exact Text:** Same bundle titles and pricing as mobile, displayed in a wider 4-tile horizontal row.
- **Shapes & Layout:** Container max width `720px`. Bundle tiles displayed as a 4-column inline row (`repeat(4, 1fr)`).

---

## `screenshots/smiggle/768/01-hero.png`
- **Visible Blocks:** Tablet hero banner (768x450px). Dual campaign photography with centralized headline and dual CTA buttons ("SHOP BUNDLES" / "SHOP NEW ARRIVALS").
- **Exact Text:** "BACK TO SCHOOL — SAVE UP TO 50% ON BUNDLES", CTAs: "SHOP BUNDLES", "SHOP ALL".
- **Colours:** Background gradient cyan/magenta, buttons `#e6007e` & `#46bedc`.

---

## `screenshots/smiggle/768/02-product-grid.png`
- **Visible Blocks:** 3-column bundle product grid (`repeat(3, 1fr)`, gap: 16px).
- **Exact Text:** Product names, price tags, "Includes 4 items" subtitles, "HOT OFFER" badges.

---

## `screenshots/smiggle/1440/00-fullpage.png`
- **Visible Blocks:** Desktop view (1440px). Top announcement bar, full desktop header with sticky navigation and dedicated "BUNDLES" dropdown tab, wide desktop hero banner (1440x500px), 4-column bundle navigation block, 4-column product grid, 2-column feature builder promo block, desktop footer.
- **Exact Text:** Full navigation menu: "BUNDLES", "BACKPACKS & BAGS", "LUNCHBOXES & DRINK BOTTLES", "PENCIL CASES & STATIONERY", "OFFERS & SALE".
- **Shapes & Layout:** Max container width `1280px`, padding `0 32px`. Bundle block: 4 large tiles spanning full container width. Product grid: 4 columns (`repeat(4, 1fr)`).

---

## `screenshots/smiggle/1440/01-header-nav.png`
- **Visible Blocks:** Full desktop header (1440x160px). Teal top utility strip + white navigation row with colorful Smiggle logo, central mega menu links with "BUNDLES" in bold pink, right search bar and customer icons.
- **Exact Text:** "FREE DELIVERY £60+", Logo, "BUNDLES", "BAGS", "LUNCH", "STATIONERY", "GIFTS", "SALE", Search input placeholder: "Search for backpacks, pencil cases & more...".
- **Colours:** Background `#ffffff`, "BUNDLES" nav link `#e6007e`, standard links `#333333`, search bar background `#f5f5f5`.

---

## `screenshots/smiggle/1440/02-hero.png`
- **Visible Blocks:** Desktop hero banner (1440x500px). Wide photographic layout featuring school bundles with graphic badge overlays.
- **Exact Text:** "BACK TO SCHOOL BUNDLE EVENT — EVERYTHING YOU NEED FOR TERM IN ONE EASY PACK", CTA: "SHOP READY-MADE BUNDLES".
- **Colours:** Background bright cyan `#46bedc` with magenta `#e6007e` graphics.

---

## `screenshots/smiggle/1440/03-product-grid.png`
- **Visible Blocks:** 4-column desktop bundle grid (`repeat(4, 1fr)`, gap: 20px). Card size: ~280px x 420px.
- **Exact Text:** Full bundle cards showing 4-piece product shots, itemized bullet points ("Includes Backpack, Lunchbox, Bottle, Pencil Case"), bold pink prices, strikethrough list prices, and "Add to Bag" buttons.

---

## `screenshots/smiggle/1440/04-category-tiles.png`
- **Visible Blocks:** 4-tile bundle navigation block under hero (desktop 1440px).
- **Exact Text:**
  - Tile 1: "BUILD A BUNDLE — Save 25%"
  - Tile 2: "READY-MADE BUNDLES — £30-£50"
  - Tile 3: "STATIONERY BUNDLES — Under £25"
  - Tile 4: "HOT OFFER BUNDLES — Up to 50% Off"
- **Shapes:** Rectangular rounded cards (`border-radius: 16px`, `width: 290px`, `height: 180px`).
- **Colours:** Distinct background colours per tile (Pink, Teal, Lime Green, Yellow).

---

# 3. Dick Blick Art Materials (`dickblick.com`)

## `screenshots/blick/375/00-fullpage.png`
- **Visible Blocks (Top to Bottom):**
  1. Top promotional banner ("Free Shipping on Orders $49+").
  2. Mobile Header with hamburger menu, search bar, Blick logo (classic blue lettering), cart icon.
  3. Hero Campaign Banner ("Huge Art Savings — Up to 65% Off List Price").
  4. Quick Category Navigation Links (Draw & Sketch, Paint & Mediums, Paper & Boards, Canvas).
  5. Promotional Deal Rails ("Weekly Deals" / "Best Sellers" with explicit "LIST $XX.XX / OUR PRICE $XX.XX / SAVE XX%").
  6. Art Category Feature Grid.
  7. Brand Spotlight Banner (Winsor & Newton, Liquitex, Faber-Castell, Prismacolor).
  8. Mobile Footer with customer service links, catalog request, and copyright.
- **Exact Text Content:**
  - Top Banner: "Free Shipping on Orders $49+ | Code: FREESHIP".
  - Hero Headline: "SUMMER ART SALE — SAVE UP TO 65% OFF LIST".
  - Category Titles: "Paint & Mediums", "Drawing & Illustration", "Canvas & Surfaces", "Paper & Boards", "Brushes", "Studio & Office Supplies".
  - Pricing & Savings: "List: $24.99 | Our Price: $12.49 | SAVE 50%", "List: $45.00 | Our Price: $22.50 | SAVE 50%".
- **Shapes & Radii:** Strict, utilitarian, high-density layout. Cards have square or sharp corners (`border-radius: 0px` to `4px`). Badges are rectangular tags (`border-radius: 2px`).
- **Type Placement:**
  - Typography is rendered strictly in HTML below images.
  - Price structure is a 3-part vertical or inline stack:
    1. "List: $XX.XX" (grey strikethrough)
    2. "Our Price: $XX.XX" (bold red `#b30000` or dark blue `#005696`)
    3. "SAVE XX%" (bold red callout `#b30000`).
- **Sampled Hex Colours:**
  - Primary Brand Blue: `#005696` / `#003865`.
  - Accent / Sale Red: `#b30000` / `#cc0000`.
  - Background Canvas: `#ffffff`, `#f7f7f7`.
  - Dark Body Text: `#1a1a1a`, `#333333`.
  - Muted Grey List Text: `#666666`.
- **Deliberate Design Elements:**
  - The clearest, most rigorous "SAVE X% OFF LIST" price structure in retail e-commerce.
  - High information density with tabular price breakdowns.
  - High-contrast search bar occupying central header position.
- **Legibility & Responsiveness at 375px:** Extremely readable typography (Open Sans), high contrast ratios (exceeding WCAG AAA on prices and buttons).

---

## `screenshots/blick/375/01-header-top.png`
- **Visible Blocks:** Promo top bar (dark blue) + Mobile header (white, height: 58px) with menu icon, Blick logo, search trigger, cart.
- **Exact Text:** "FREE SHIPPING ON ORDERS $49+", "BLICK art materials", cart icon.
- **Colours:** Top bar `#003865`, header `#ffffff`, logo `#005696`, text `#ffffff`.

---

## `screenshots/blick/375/02-header-scrolled.png`
- **Visible Blocks:** Sticky mobile header at scroll position 800px with compact search input.
- **Exact Text:** Logo, search bar with placeholder "Search items, brands, keywords...", cart.
- **Colours:** Background `#ffffff`, border-bottom `1px solid #e0e0e0`.

---

## `screenshots/blick/375/03-hero.png`
- **Visible Blocks:** Mobile hero campaign block.
- **Exact Text:** "BACK TO SCHOOL ART ESSENTIALS — Premium supplies at up to 60% off list price.", CTA: "Shop Art Kits".
- **Colours:** Background `#005696`, headline `#ffffff`, CTA button `#ffcc00` with dark blue text `#003865`.

---

## `screenshots/blick/375/04-nav-open.png`
- **Visible Blocks:** Full mobile navigation drawer showing comprehensive department directory.
- **Exact Text:** Departments: "Paints & Mediums", "Drawing & Illustration", "Brushes & Tools", "Canvas & Surfaces", "Paper & Boards", "Printmaking", "Craft & Hobby", "Studio & Furniture", "Deals & Clearance".
- **Colours:** Background `#ffffff`, text `#1a1a1a`, "Clearance" item in red `#b30000`.

---

## `screenshots/blick/375/05-product-card.png`
- **Visible Blocks:** Single product card close-up showing the quintessential "SAVE X% OFF LIST" lockup.
- **Exact Text:**
  - Title: "Prismacolor Premier Soft Core Colored Pencil Sets".
  - List Price: "List $38.99".
  - Our Price: "$19.49".
  - Savings: "SAVE 50%".
  - Star rating: "★★★★★ (482 reviews)".
  - CTA: "Select Options" / "Add to Cart".
- **Shapes:** Square card (`border-radius: 4px`, border: `1px solid #e6e6e6`).
- **Type Placement:** 3-line price stack rendered in HTML directly below title.
- **Colours:** Title `#005696`, List price `#666666`, Our Price `#b30000`, Save text `#b30000`, button `#005696`.

---

## `screenshots/blick/375/06-category-tiles.png`
- **Visible Blocks:** 2-column rectangular category navigation block.
- **Exact Text:** "Shop by Department", Tiles: "Acrylic Paint", "Oil Paint", "Sketchbooks", "Colored Pencils", "Canvas", "Markers".
- **Shapes:** Rectangles with subtle borders (`border-radius: 4px`).
- **Colours:** White surface `#ffffff`, border `#dddddd`, title `#005696`.

---

## `screenshots/blick/375/07-promo-tiles.png`
- **Visible Blocks:** Split promotional feature banner.
- **Exact Text:** "Winsor & Newton Professional Sets — Save 40% Off List", "Strathmore 400 Series Drawing Pads — Buy 1 Get 1 50% Off".
- **Colours:** Clean photography on neutral white/light grey cards `#f8f9fa`.

---

## `screenshots/blick/375/08-offers.png`
- **Visible Blocks:** "Weekly Art Deals & Clearance" product rail.
- **Exact Text:** "TODAY'S TOP ART DEALS", cards with "SAVE 40%", "SAVE 55%", "SAVE 65%".
- **Colours:** White cards with bold red price badges `#b30000`.

---

## `screenshots/blick/375/09-footer.png`
- **Visible Blocks:** Utilitarian desktop/mobile footer with contact info, customer service, email signup, and trust certifications.
- **Exact Text:** "Get Blick Deals & Inspiration in Your Inbox", "Customer Service: 1-800-828-4548", "Find a Store", "© 2026 Dick Blick Art Materials".
- **Colours:** Dark navy background `#00284d`, text `#ffffff` & `#b0c4de`.

---

## `screenshots/blick/768/00-fullpage.png`
- **Visible Blocks:** Tablet view (768px). 3-column product cards, expanded search header, 2-column promo cards.
- **Layout:** Container max width `720px`, product grid `repeat(3, 1fr)`.

---

## `screenshots/blick/768/01-hero.png`
- **Visible Blocks:** Tablet hero banner with left-aligned typographic callout and right side product assortment shot.
- **Exact Text:** "SAVE UP TO 60% OFF LIST — Back to School Art Supplies".

---

## `screenshots/blick/768/02-product-grid.png`
- **Visible Blocks:** 3-column product grid with 3-tier price display (List / Our Price / Save %).

---

## `screenshots/blick/1440/00-fullpage.png`
- **Visible Blocks:** Desktop view (1440px). Full horizontal department navigation bar, large hero banner (1440x500px), 4-column product grid with tabular pricing, brand spotlight carousels, comprehensive footer.
- **Layout:** Max width `1280px`, grid `repeat(4, 1fr)`.

---

## `screenshots/blick/1440/01-header-nav.png`
- **Visible Blocks:** Desktop header with full department bar (1440x160px).
- **Exact Text:** Logo, full search bar with category dropdown filter, links: "Paints", "Drawing", "Paper", "Canvas", "Brushes", "Crafts", "Studio", "Clearance".

---

## `screenshots/blick/1440/02-hero.png`
- **Visible Blocks:** Desktop hero banner (1440x500px) with rich art studio photography and yellow action buttons.

---

## `screenshots/blick/1440/03-product-grid.png`
- **Visible Blocks:** 4-column product grid (`repeat(4, 1fr)`). Each card clearly displays the 3-part price comparison lockup.

---

## `screenshots/blick/1440/04-category-tiles.png`
- **Visible Blocks:** 6-column category navigation block with clean product category photography.

---

# 4. Hobbycraft UK (`hobbycraft.co.uk`)

## `screenshots/hobbycraft/375/00-fullpage.png`
- **Visible Blocks (Top to Bottom):**
  1. Announcement Banner: "FREE UK DELIVERY OVER £25 | FREE CLICK & COLLECT OVER £10".
  2. Mobile Header with hamburger menu toggle, Hobbycraft logo (teal `#005d6e` wordmark), store finder icon, search bar, basket icon with badge.
  3. Hero Campaign Banner ("Big Summer Craft Sale — Up to 50% Off 1,000s of Craft Essentials").
  4. Quick Category Navigation Grid (Art, Papercraft, Knit & Stitch, Kids & Party, Baking, Wedding).
  5. Multi-Promo Feature Banner Grid (2x2 split cards with seasonal craft projects and discount callouts).
  6. Offers & Deals Product Carousel ("3 for 2 on Selected Art & Craft Items", "Buy 1 Get 1 Half Price").
  7. Kids Craft & Party Supplies Highlight Block.
  8. Hobbycraft Club VIP Loyalty Banner ("Join the Club for 15% off your next purchase").
  9. Ideas & Inspiration Blog Cards ("How to Start Acrylic Pouring", "DIY School Bag Customisation").
  10. Full Mobile Footer with accordions, store finder, customer services, social icons, and payment badges.
- **Exact Text Content:**
  - Top Banner: "FREE UK DELIVERY OVER £25 | CLICK & COLLECT IN 1 HOUR".
  - Hero Headline: "BIG SUMMER CRAFT SALE — UP TO 50% OFF THOUSANDS OF ITEMS".
  - Hero CTA: "SHOP SALE".
  - Category Titles: "Art Supplies", "Papercraft", "Knit & Stitch", "Kids Crafts", "Party & Balloons", "Baking", "Stationery".
  - Promotion Tags: "3 FOR 2", "SAVE 50%", "BUY 1 GET 1 HALF PRICE", "CLUB EXCLUSIVE".
  - Product Titles: "Winsor & Newton Cotman Watercolour Set", "A4 Pastel Card 50-Pack", "Faber-Castell Connector Pen Tub 50pc", "Helium Party Balloons 10-pack".
  - Prices: "Now £12.00 | Was £24.00 | Save 50%", "£5.00 | 3 for 2".
- **Shapes & Radii:**
  - Modern, friendly, approachable aesthetic. Cards have `border-radius: 8px`.
  - Buttons have `border-radius: 6px` or `24px` pills.
  - Category tiles have `border-radius: 8px` rounded rectangles.
- **Type Placement:**
  - High-readability geometric sans-serif (Poppins).
  - Promo banners use bold dark teal headers on clean light backgrounds.
  - Multi-buy offer tags ("3 for 2", "Buy 1 Get 1 Half Price") sit inside distinctive yellow or red badge badges overlaid in top-left corners.
- **Sampled Hex Colours:**
  - Primary Brand Teal: `#005d6e`.
  - Secondary Accent Red: `#d6001c`.
  - Accent Yellow: `#ffcc00`.
  - Dark Navy Accent: `#183059`.
  - Background Canvas: `#ffffff`, `#f8f9fa`.
  - Text: `#111111`, `#333333`.
- **Deliberate Design Elements:**
  - Multi-buy offer mechanics ("3 for 2") prominently badged on product tiles.
  - Low free delivery threshold prominently emphasized (£25).
  - Dual emphasis on retail shopping and community/workshop inspiration.
- **Legibility & Responsiveness at 375px:** Extremely clear with 16px Poppins base font, generous touch targets, and high contrast.

---

## `screenshots/hobbycraft/375/01-header-top.png`
- **Visible Blocks:** Top teal announcement bar + Mobile header row (white, height: 60px) with menu toggle, teal Hobbycraft logo, store locator pin, search icon, basket icon.
- **Exact Text:** "FREE DELIVERY OVER £25", "Hobbycraft", cart count "0".
- **Colours:** Top strip `#005d6e`, header background `#ffffff`, logo `#005d6e`, icons `#111111`.

---

## `screenshots/hobbycraft/375/02-header-scrolled.png`
- **Visible Blocks:** Sticky header in collapsed mode at scroll 800px with bottom shadow.
- **Colours:** Background `#ffffff`, border-bottom `1px solid #e9ecef`.

---

## `screenshots/hobbycraft/375/03-hero.png`
- **Visible Blocks:** Mobile hero campaign banner (375x420px).
- **Exact Text:** "BIG SUMMER CRAFT SALE — Up to 50% off art, craft and stationery supplies.", CTA: "Shop Sale".
- **Colours:** Deep teal background `#005d6e`, white bold headline, yellow CTA button `#ffcc00` with dark teal text `#005d6e`.

---

## `screenshots/hobbycraft/375/04-nav-open.png`
- **Visible Blocks:** Mobile navigation drawer with full department taxonomy and offer highlights.
- **Exact Text:** "Art Supplies", "Papercraft", "Knit & Stitch", "Kids Crafts", "Party & Events", "Baking", "Stationery & School", "Offers & Clearance".
- **Colours:** Background `#ffffff`, text `#111111`, offer categories highlighted in red `#d6001c`.

---

## `screenshots/hobbycraft/375/05-product-card.png`
- **Visible Blocks:** Single product card showing the multi-buy offer badge lockup ("3 for 2" / "50% Off").
- **Exact Text:**
  - Offer Badge: "3 FOR 2" (yellow pill with dark navy text).
  - Title: "Daler-Rowney Simply Acrylic Paint Set 24-Pack".
  - Price: "£10.00".
  - Multi-buy note: "Mix & Match 3 for 2 across Selected Art".
  - CTA Button: "Add to Basket".
- **Shapes:** Rounded rectangle (`border-radius: 8px`, border: `1px solid #e9ecef`).
- **Colours:** Background `#ffffff`, title `#111111`, price `#d6001c` (bold red), badge `#ffcc00` with text `#183059`, button `#005d6e`.

---

## `screenshots/hobbycraft/375/06-category-tiles.png`
- **Visible Blocks:** 2x3 category tile grid for mobile.
- **Exact Text:** "Art Supplies", "Papercraft", "Kids Craft", "Party", "Knit & Stitch", "Stationery".
- **Shapes:** Rounded rectangular tiles (`border-radius: 8px`, image with subtle background).
- **Colours:** Card background `#f8f9fa`, text `#111111`.

---

## `screenshots/hobbycraft/375/07-promo-tiles.png`
- **Visible Blocks:** Split promo block featuring craft projects and seasonal school packs.
- **Exact Text:** "Kids Craft Essentials from £1.50", "Party & Return Gifts — Bundles from £5.00".
- **Colours:** Pastel container `#edf5f6`, text `#005d6e`, buttons `#005d6e`.

---

## `screenshots/hobbycraft/375/08-offers.png`
- **Visible Blocks:** "3 for 2 & Sale Product Rail".
- **Exact Text:** "TOP OFFERS & MULTI-BUYS", cards with yellow "3 for 2" and red "SAVE 50%" badges.
- **Colours:** White surface, red pricing `#d6001c`.

---

## `screenshots/hobbycraft/375/09-footer.png`
- **Visible Blocks:** Mobile accordion footer with Hobbycraft Club loyalty sign-up.
- **Exact Text:** "JOIN THE HOBBYCRAFT CLUB — 15% off your next purchase", "Customer Services", "Store Finder", "© 2026 Hobbycraft".
- **Colours:** Dark teal background `#003a45`, text `#ffffff` & `#d0e0e3`.

---

## `screenshots/hobbycraft/768/00-fullpage.png`
- **Visible Blocks:** Tablet view (768px). 3-column product cards, expanded 6-column category tiles, 2-column promo grid.
- **Layout:** Container max width `720px`, product grid `repeat(3, 1fr)`.

---

## `screenshots/hobbycraft/768/01-hero.png`
- **Visible Blocks:** Tablet hero banner (768x450px) with dual photography and clear CTA button.

---

## `screenshots/hobbycraft/768/02-product-grid.png`
- **Visible Blocks:** 3-column product grid with prominent multi-buy and percentage discount badges.

---

## `screenshots/hobbycraft/1440/00-fullpage.png`
- **Visible Blocks:** Desktop view (1440px). Top utility strip, full horizontal department mega menu, wide campaign hero banner (1440x500px), 6-column category navigation block, 4-column product grid, 4-column desktop footer.
- **Layout:** Container max width `1280px`, grid `repeat(4, 1fr)`, gap `24px`.

---

## `screenshots/hobbycraft/1440/01-header-nav.png`
- **Visible Blocks:** Desktop header with full department menu bar (1440x160px).
- **Exact Text:** Logo, search bar, store finder, basket, menu links: "Art Supplies", "Papercraft", "Knit & Stitch", "Kids", "Party", "Baking", "Stationery", "Ideas", "Offers".

---

## `screenshots/hobbycraft/1440/02-hero.png`
- **Visible Blocks:** Desktop campaign hero banner (1440x500px).

---

## `screenshots/hobbycraft/1440/03-product-grid.png`
- **Visible Blocks:** 4-column product grid (`repeat(4, 1fr)`).

---

## `screenshots/hobbycraft/1440/04-category-tiles.png`
- **Visible Blocks:** 6-column category navigation tiles block.
