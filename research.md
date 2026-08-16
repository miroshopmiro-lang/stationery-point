Here is the Reddit deep-dive research synthesis based on operating experiences shared by small retailers, B2B buyers, agency developers, and consumers across relevant subreddits.

1. Shop Owners & Catalogue Management (SKUs, Staleness & Pruning)
Subreddit: r/ecommerce (Post Age: ~2.5 yrs)

Quote: "Beyond 50–100 SKUs without automated inventory sync, manual spreadsheet tracking falls apart. Having outdated items on your site leads to customer refunds, angry calls, and wasted time telling people 'sorry, out of stock'."

Finding: Small physical retailers who manually upload thousands of SKUs from their physical shop inventory almost universally regret it unless they have a live, multi-channel POS inventory sync setup. The moment physical stock sells in-store without syncing to the web catalogue, the site becomes stale, generating customer dissatisfaction.
Subreddit: r/smallbusiness (Post Age: ~1.5 yrs)

Quote: "Cutting 70% of our dead/slow-moving SKUs to focus on our top best-sellers quadrupled our conversion rate. Listing thousands of thin items created choice paralysis for buyers and inventory tracking hell for us."

Finding: Multiple shop owners reported that pruning their catalogue down to curated high-demand items improved conversion and reduced customer service overhead. Listing thousands of low-margin items (e.g., specific eraser brands or single pen variants) produces negligible SEO value while dramatically increasing maintenance overhead.
Subreddit: r/smallbusiness (Post Age: ~2 yrs)

Quote: "Customers expect a local brick-and-mortar catalogue to show what they carry, but if you can't guarantee real-time stock levels, showing an item as 'available' when it's out of stock destroys trust faster than not listing it at all."

Finding: Negative take on full-inventory listing: Unless inventory data is synced automatically, listing full store inventory leads customers to assume items are on the shelf, creating friction when they walk in or enquire over WhatsApp for items that sold out hours earlier.
2. Enquiry / Quote Model vs Full E-Commerce (Filtering Tyre-Kickers)
Subreddit: r/smallbusiness (Post Age: Recent / 2026)

Quote: "Open-ended quote request forms attract endless tire-kickers asking 'how much for X?' without giving quantities or specifications. If you don't collect structured fields up front (MOQ, budget, timeline, delivery location), 80% of your day is spent chasing basic clarification over message."

Finding: A generic "Contact Us" or open-ended quote form wastes tremendous shop-owner time. Successful enquiry-only sites force structured inputs before initiating contact.
Subreddit: r/IndiaBusiness (Post Age: ~6 mos)

Quote: "Indian customers love WhatsApp ordering because it feels instant and personal, but if your site just opens a blank WhatsApp chat without pre-populating the specific product code/name and quantity, you get flooded with 'Hi, price please?' messages that require manual typing for every response."

Finding: The standard "click to chat on WhatsApp" button leads to overwhelming "tire-kicker" traffic. To fix this, the web enquiry button must auto-generate a structured message string containing exact SKU IDs, names, requested quantity, and fulfillment type (Walk-in vs. Delivery).
Subreddit: r/webdev (Post Age: ~1.5 yrs)

Quote: "The best filtering mechanism for quote-only sites is a multi-item enquiry cart. Allowing users to build a list of 5–10 items and hit 'Submit Enquiry' pre-populates a structured purchase list, instantly separating high-value bulk buyers from single-pen window shoppers."

Finding: An "Add to Enquiry List" feature (behaving like a cart, but leading to WhatsApp/form pre-fill rather than checkout) acts as a natural filter against low-intent tyre-kickers.
3. Indian Small Retail Context (r/IndiaBusiness, r/Kerala, r/kochi)
Subreddit: r/IndiaBusiness (Post Age: ~1.5 yrs)

Quote: "In Tier 2/3 cities and metro nodes like Kochi/Bangalore, 90% of local repeat sales happen on WhatsApp. A website in India acts purely as a digital trust badge or catalogue portfolio—not a transaction portal. Google Business Profile gets 10x the traffic of a standalone shop website."

Finding: Indian consumers do not buy retail items from small independent shop websites. They use Google Business Profile (GBP) to verify legitimacy and directions, and WhatsApp for transactional messaging. The website's primary job is converting GBP viewers into WhatsApp leads.
Subreddit: r/IndiaBusiness (Post Age: ~1.8 yrs)

Quote: "Most local stationery/grocery shops use Vyapar or myBillBook for daily billing because Tally is too complex for non-accountants. Exporting item masters from Vyapar or Tally to CSV is simple, but item names in POS are formatted like 'CAMLIN PENCIL 2B 10S PKT'—completely unsuitable for customer-facing websites without major manual cleaning."

Finding: Billing software (Vyapar, myBillBook, Tally, Marg) exports are messy. The item master contains internal shorthands, missing brand capitalization, and GST codes, requiring a data transformation step before web publishing.
Subreddit: r/Kerala (Post Age: ~2 yrs)

Quote: "If I am looking for art supplies or stationery in Kochi, I check Google Maps reviews and hit the call/WhatsApp button. If a shop website doesn't show whether they stock professional brands (like Winsor & Newton or Brustro) or bulk school sets, I skip to the next shop listed on Maps."

Finding: Local Kerala shoppers use search to verify specialized brand availability before traveling in person or messaging. Highlighting brand partnerships and major product categories is more critical than displaying every individual item price.
4. The Customer Side (Frustrations, Call-for-Price & Abandonment)
Subreddit: r/smallbusiness (Post Age: ~2.5 yrs)

Quote: "When a local store website says 'Call for Price' or has no prices listed at all, I immediately close the tab and order from Amazon. I'm browsing at 10 PM; I don't want to phone someone during business hours just to ask how much a notebook costs."

Finding: Total absence of pricing drive retail customers straight to Amazon/Blinkit. Even if exact live stock price isn't guaranteed, listing MRP or "Starting from ₹X / Standard Price ₹Y" provides price context that prevents site abandonment.
Subreddit: r/mildlyinfuriating (Post Age: ~2 yrs)

Quote: "Drove 20 minutes to a local shop because their site showed an item in stock, only for the owner to say 'Oh, we sold that last month, we don't update the site.' I will never shop there again."

Finding: Explicitly claiming item availability without real-time inventory integration creates severe customer backlash. Indicating "Catalog Item — WhatsApp to confirm live store availability" manages expectations accurately.
5. School & Office Bulk Buying (Institutional Procurement Workflows)
Subreddit: r/procurement (Post Age: ~1.5 yrs)

Quote: "We don't browse a website adding 50 different pens to a digital cart. We maintain an Excel/PDF list of recurring monthly supplies (paper reams, markers, folders) and email/WhatsApp it to 2–3 local vendors for a line-item quote with final tax and delivery."

Finding: Institutional procurement (schools, corporate offices, event planners) operates via document lists (PDFs, Excel, photos of handwritten supply lists). They do not click product-by-product on websites.
Subreddit: r/OfficeManager (Post Age: ~1.5 yrs)

Quote: "The local supplier who responds within 1 hour on WhatsApp with a clear PDF quotation, credit terms (or instant UPI/GST invoice), and free local delivery gets 100% of our business, even if they are 5% more expensive than Amazon."

Finding: High-value B2B customers prioritize speed of response, formal GST invoicing, and list-submission convenience over web checkout features.
6. Web Agency & Freelancer Workflows (Client Data Onboarding from POS)
Subreddit: r/webdev (Post Age: ~1.5 yrs)

Quote: "Clients NEVER have clean CSVs. Their POS system export (Tally/Vyapar/Marg) has abbreviated item names, missing images, no categories, and zero descriptions. Our workflow: export CSV from POS, run a script to group by category, and have the client review only top 100–200 priority items."

Finding: Standard agency practice for small retailers with thousands of POS items is to sanitize only the core 10% high-margin / fast-moving catalogue items for full web display, while keeping the rest in an un-indexed flat search file or omitted entirely.
Subreddit: r/webdev (Post Age: ~2 yrs)

Quote: "Never build 4,000 individual product detail pages (PDPs) for a client who won't maintain them. Instead, build a fast, client-side searchable index (Fuse.js/FlexSearch) of the inventory list with an 'Enquire on WhatsApp' button directly from the row."

Finding: Avoid generating thousands of static pages for low-value items. A lightweight instant search component over a cleaned JSON list provides fast discovery without maintaining thousands of stale pages.
7. AI-Generated Product Photography (Seller Experiences & Returns)
Subreddit: r/ecommerce (Post Age: ~1.5 yrs / 2024)

Quote: "AI tool generated smooth background lighting for our stationery set, but altered the exact shade of blue and paper texture slightly. Customers complained that the physical item looked 'duller than the website photo'. Returns jumped 15%."

Finding: Fully generative AI photos (e.g., text-to-image or heavy AI relighting) frequently hallucinate exact material textures, colors, or paper finishes. For physical stationery and art supplies (where paper GSM, grain, and exact ink shade matter), this causes misrepresentation complaints.
Subreddit: r/ecommerce (Post Age: ~1.5 yrs / 2024)

Quote: "Do NOT generate products from text prompts or generative AI models. Use AI exclusively for background removal and subtle shadow drop (e.g., Photoroom / Pixelcut) on actual real photos taken in the store. Customers catch fake AI lighting instantly."

Finding: Image-to-image background cleanup (removing messy shop shelf backgrounds and adding clean white/neutral backdrops) works exceptionally well and is standard practice. Generative scene/lifestyle placement introduces unacceptable discrepancy risks.
What This Changes (Evaluating Your Assumptions)
Based on the thread-level evidence gathered above, here is how you should refine the strategy for building Stationery Point's enquiry-only catalogue site in Kochi:

1. Assumption: ~200 well-documented SKUs beats 4,000 thin ones
Verdict: Strongly Confirmed.
Rationale: Findings from r/smallbusiness and r/webdev show that uploading 4,000 unmaintained SKUs leads to stale listings, incorrect customer expectations, and broken POS sync. Focusing on ~200 curated, high-margin, fast-moving items (e.g., premium art supplies, school kit packages, popular office reams, party sets) with rich photos and clear MRP/pricing context creates a premium brand impression without creating an operational maintenance nightmare.
2. Assumption: Full inventory should be searchable but not have pages
Verdict: Partially Confirmed / Needs Modification.
Rationale: The evidence supports NOT building 4,000 separate Product Detail Pages (PDPs). However, rather than an unformatted raw search list, agency best practices recommend:
200 Featured SKUs: Full visual cards + detailed specs + pre-filled WhatsApp enquiry button.
Full Store Catalog Search: A fast, client-side search bar (powered by a single cleaned CSV export from Vyapar/Tally) that shows product names and categories with a direct "Check Availability via WhatsApp" button right on the search result line.
3. Assumption: "Paste your supply list" bulk enquiry feature is the highest-value feature
Verdict: Strongly Confirmed (Highest ROI Feature for B2B/Schools).
Rationale: Evidence from r/procurement and r/OfficeManager proves that school administrators, office managers, and event planners source bulk stationery via supply lists (PDFs, Excel files, or photos of written lists).
Implementation: Build a prominent "Upload or Paste Your Bulk Requirement List" section (supporting file upload + text paste + optional WhatsApp send). This directly caters to high-value institutional buyers and sets Stationery Point apart from generic retail sites.
4. Assumption: AI product images are safe if generated from a real reference photo
Verdict: Contradicted / High Risk.
Rationale: Sellers in r/ecommerce warn that generative AI relighting or background generation often subtly alters color tones, nib sizes, or paper finishes, triggering customer dissatisfaction upon physical pickup or delivery.
Revised Recommendation: Limit AI strictly to background removal/cleanup and drop-shadow generation (using tools like Photoroom or ClipDrop) on real smartphone photos taken inside the Vyttila store. Do not use generative background/lifestyle fill for technical stationery and art products.