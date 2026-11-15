/*
 * AREA PAGES, one per part of Kochi the shop wants to be found from (added 4 Nov 2026).
 *
 * These are built from the homepage's own sections (real shop photos, product rails, the
 * send-your-list block, reviews), not from the text-only landing template, so a visitor who
 * lands here first sees the shop, not an article.
 *
 * TRUTH RULE (same as landingPages.js): every claim is one the site already publishes.
 * Address, hours, below MRP, GST invoice and volume pricing for bulk, no fixed minimum to ask,
 * "Delivery for corporate orders only, T&C apply" (SendListSection), photos and PDFs of lists
 * accepted, free parking (footer), 2027 diaries with the company name, min 100, about 10 days. No travel times or
 * distances: none are verified. Directions go to Google Maps with the area as the start.
 *
 * Plain JS, no imports, so tools/prerender-landing.mjs can read it too.
 */

const DEST = 'Stationery Point, Katti Tower, Janatha Junction, Vyttila, Kochi';
export const directionsUrl = (origin) =>
  `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(DEST)}`;

export const areaPages = [
  {
    slug: 'stationery-kakkanad-infopark',
    area: 'Kakkanad and Infopark',
    navLabel: 'Kakkanad & Infopark',
    title: 'Stationery for Kakkanad & Infopark | Stationery Point',
    description:
      'Office stationery for Kakkanad & Infopark: copier paper, files, pens and 2027 custom diaries below MRP with GST invoices. Send your supply list on WhatsApp.',
    eyebrow: 'For Kakkanad & Infopark offices',
    h1: 'Office stationery for Kakkanad and Infopark',
    lead:
      'Send your office supply list on WhatsApp and we reply with prices. Below MRP, GST invoice, and delivery for corporate orders (T&C apply). Or collect it from our shop at Janatha Junction, Vyttila.',
    waMessage: 'Hi Stationery Point, we are an office in Kakkanad / Infopark. Our supply list: ',
    directionsFrom: 'Infopark, Kakkanad, Kochi',
    tilesHeading: 'What offices order from us',
    collections: ['copier-paper', 'pens', 'whiteboards', 'tapes', 'notebooks', 'diaries'],
    rail: 'diaries',
    faqs: [
      {
        q: 'Do you deliver to Infopark and Kakkanad?',
        a: 'Yes, for corporate orders (T&C apply). Send your list on WhatsApp and we confirm price and delivery together.',
      },
      {
        q: 'Do you give a GST invoice?',
        a: 'Yes. Bulk and office orders get a GST invoice and volume pricing below MRP.',
      },
      {
        q: 'Is there a minimum order?',
        a: 'Not for asking. Send your list with quantities and we quote for it. The 2027 diaries with your company name start at 100 pieces and are ready in about 10 days.',
      },
      {
        q: 'Can we send a list as a photo or PDF?',
        a: 'Yes. A photo of a handwritten list, a PDF or a typed list all work on WhatsApp.',
      },
    ],
    related: ['stationery-shop-panampilly-nagar', 'stationery-shop-vyttila-nh-bypass'],
    landingLinks: ['corporate-diaries-kochi', 'office-stationery-kochi'],
  },
  {
    slug: 'stationery-shop-panampilly-nagar',
    area: 'Panampilly Nagar',
    navLabel: 'Panampilly Nagar',
    title: 'Stationery near Panampilly Nagar | Stationery Point',
    description:
      'School stationery, art supplies and return gifts near Panampilly Nagar, below MRP. Send your school list on WhatsApp and collect in Vyttila.',
    eyebrow: 'Near Panampilly Nagar',
    h1: 'Stationery and art supplies near Panampilly Nagar',
    lead:
      'School lists, art materials and return gifts, all below MRP. Send the list on WhatsApp and we pack it before you arrive at Janatha Junction, Vyttila.',
    waMessage: 'Hi Stationery Point, I am near Panampilly Nagar. My list: ',
    directionsFrom: 'Panampilly Nagar, Kochi',
    tilesHeading: 'What families nearby come in for',
    collections: ['notebooks', 'school-bags', 'colour-pencils', 'sketch', 'crayons', 'brushes', 'craft-material', 'return-gifts'],
    rail: 'new',
    faqs: [
      {
        q: 'Can I send my child’s school list?',
        a: 'Yes. Send a photo or PDF of the list on WhatsApp. We reply with prices and pack it so you can collect it quickly.',
      },
      {
        q: 'Which art brands do you carry?',
        a: 'Brustro, Camlin, Faber-Castell, Doms and more. If you need something specific, ask on WhatsApp first.',
      },
      {
        q: 'Do you deliver to Panampilly Nagar?',
        a: 'Delivery is for corporate orders (T&C apply). For home orders, send your list and collect it ready-packed at the shop.',
      },
      {
        q: 'When are you open?',
        a: 'Monday to Saturday, 9:30 AM to 8:00 PM. Closed on Sunday.',
      },
    ],
    related: ['stationery-kakkanad-infopark', 'stationery-shop-vyttila-nh-bypass'],
    landingLinks: ['school-stationery-kochi', 'art-and-craft-supplies-kochi', 'return-gifts-kochi'],
  },
  {
    slug: 'stationery-shop-vyttila-nh-bypass',
    area: 'the NH Bypass, Vyttila',
    navLabel: 'Vyttila NH Bypass',
    title: 'Stationery Shop near Vyttila NH Bypass | Stationery Point',
    description:
      'Stationery shop near NH 66 bypass, Vyttila: office supplies, copier paper and 2027 corporate diaries below MRP with GST invoice. Stop by or order on WhatsApp.',
    eyebrow: 'Near the NH Bypass, Vyttila',
    h1: 'Stationery shop near the NH Bypass, Vyttila',
    lead:
      'For showrooms, offices and clinics along the NH 66 bypass, and anyone passing through Vyttila. Copier paper, pens, files and 2027 diaries with your company name, below MRP with a GST invoice. Send your list on WhatsApp or stop in. Free parking.',
    waMessage: 'Hi Stationery Point, we are near the NH Bypass, Vyttila. Our list: ',
    directionsFrom: 'Vyttila Junction, Kochi',
    tilesHeading: 'What businesses on the bypass order',
    collections: ['copier-paper', 'pens', 'whiteboards', 'tapes', 'notebooks', 'diaries'],
    rail: 'diaries',
    faqs: [
      {
        q: 'Where exactly is the shop?',
        a: 'Ground Floor, Katti Tower, Jr Janatha Rd, Janatha Junction, Vyttila, opposite Metro Pillar No. 837. Free parking is available.',
      },
      {
        q: 'Do you deliver to offices and showrooms on the bypass?',
        a: 'Yes, for corporate orders (T&C apply). Send your list on WhatsApp and we confirm price and delivery together.',
      },
      {
        q: 'Do you give a GST invoice?',
        a: 'Yes. Bulk and office orders get a GST invoice and volume pricing below MRP.',
      },
      {
        q: 'When are you open?',
        a: 'Monday to Saturday, 9:30 AM to 8:00 PM. Closed on Sunday.',
      },
    ],
    related: ['stationery-kakkanad-infopark', 'stationery-shop-panampilly-nagar'],
    landingLinks: ['office-stationery-kochi', 'wholesale-stationery-kochi', 'corporate-diaries-kochi'],
  },
];

export const areaBySlug = Object.fromEntries(areaPages.map((p) => [p.slug, p]));
