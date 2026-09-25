/*
 * LOCAL LANDING PAGES — one per real search the shop should be found for.
 *
 * Why these five: they come from a Google Suggest harvest run on 19 Sep 2026
 * (G:\Agency\research\keyword-data, stationery-kochi.csv): "wholesale stationery shop in
 * kochi", "office stationery wholesale", "art and craft shop kochi / vyttila", "school
 * stationery shop", plus return gifts. Shape of demand only, not volume.
 *
 * Plain JS, no imports, so both the React app and tools/prerender-landing.mjs (which writes
 * a real HTML file per URL at build time) read the same content.
 *
 * TRUTH RULE: every claim here is one the site already publishes elsewhere (address, hours,
 * 4.8 from 150+ Google reviews, below MRP, volume pricing and GST invoices for bulk orders,
 * kits packed before you arrive). No delivery claim: Sam has not confirmed it. No stock claim
 * for anything not in the catalogue; product lists are read from the real catalogue.
 */

export const SITE_URL = 'https://stationery-point.pages.dev';

export const NAP = {
  name: 'Stationery Point',
  address: 'Ground Floor, Katti Tower, Jr Janatha Rd, Janatha Junction, Vyttila, Kochi, Kerala 682019',
  landmark: 'Opposite Metro Pillar No. 837',
  phoneDisplay: '+91 88488 38132',
  phoneTel: '+918848838132',
  hours: 'Monday to Saturday, 9:30 AM to 8:00 PM. Closed on Sunday.',
};

// Shared by both renderers so the product list on the page matches the catalogue.
export function selectProducts(products, spec) {
  if (!spec) return [];
  const needles = (spec.nameIncludes || []).map((s) => s.toLowerCase());
  const out = products.filter((p) => {
    if (spec.categories && spec.categories.includes(p.category)) return true;
    const name = (p.name || '').toLowerCase();
    return needles.some((n) => name.includes(n));
  });
  return out.slice(0, spec.limit || 8);
}

export const landingPages = [
  {
    slug: 'wholesale-stationery-kochi',
    navLabel: 'Wholesale stationery',
    title: 'Wholesale Stationery in Kochi | Stationery Point, Vyttila',
    description:
      'Buying stationery in bulk in Kochi? Stationery Point in Vyttila offers volume pricing below MRP and GST invoices for schools, offices and shops. Ask for a quote on WhatsApp.',
    h1: 'Wholesale stationery in Kochi',
    lead:
      'Stationery Point is a stationery and art supplies store at Janatha Junction, Vyttila. If you buy in volume for a school, an office, an institution or your own shop, we give volume pricing below MRP and a GST invoice.',
    sections: [
      {
        h2: 'Who buys from us in bulk',
        body: [
          'Schools and tuition centres stocking notebooks, pens and pencils. Offices that need copier paper, files, tape, staplers and markers on a regular basis. Event organisers and parents buying for a class or a party.',
          'There is no fixed minimum to ask. Send us what you need and the quantity, and we reply with a price.',
        ],
      },
      {
        h2: 'What you can order',
        body: [
          'Copier paper in A4 (Reflection, TNPL, JK Paper), notebooks (Papergrid), pens and pencils, markers, tapes, staplers and pins, printer ink, art supplies and craft material. The list below is a sample from our catalogue. If you do not see an item, ask. We carry more than we can list online.',
        ],
      },
      {
        h2: 'How to get a bulk quote',
        body: [
          'Tap the WhatsApp button, list the items and quantities, and we confirm availability and price. You can also build a list on the catalogue page and send the whole list in one message. Or visit the shop and see the stock in person.',
        ],
      },
    ],
    products: { categories: ['office-supplies'], limit: 8 },
    catalogLink: { to: '/catalog?category=office-supplies', label: 'See office supplies in the catalogue' },
    waMessage: 'Hi Stationery Point, I would like a bulk quote for wholesale stationery. Items and quantities: ',
    faqs: [
      {
        q: 'Is there a minimum order for wholesale rates?',
        a: 'Send us your list and quantities and we quote for it. We do not put a fixed minimum on asking.',
      },
      {
        q: 'Do you give a GST invoice?',
        a: 'Yes, we provide GST invoices for bulk orders.',
      },
      {
        q: 'Where exactly is the shop?',
        a: 'Ground Floor, Katti Tower, Jr Janatha Road, Janatha Junction, Vyttila, opposite Metro Pillar No. 837.',
      },
    ],
    related: ['office-stationery-kochi', 'school-stationery-kochi'],
  },

  {
    slug: 'office-stationery-kochi',
    navLabel: 'Office stationery',
    title: 'Office Stationery Supplier in Kochi | Stationery Point, Vyttila',
    description:
      'Office stationery in Kochi: copier paper, files, staplers, tape, markers, whiteboards and printer ink at Stationery Point, Vyttila. Volume pricing and GST invoices.',
    h1: 'Office stationery in Kochi',
    lead:
      'Everything an office runs through in a month, from one shop in Vyttila: copier paper, tape, staplers, markers, whiteboards and printer ink, priced below MRP with a GST invoice for bulk orders.',
    sections: [
      {
        h2: 'Paper, ink and the everyday items',
        body: [
          'We stock A4 copier paper in 70, 75 and 80 GSM from Reflection, TNPL and JK Paper, clear and brown packing tape, Kangaro staplers and pins, Camlin permanent and whiteboard markers, magnetic whiteboards, and Epson and HP ink cartridges. Diaries and exam pads are here too.',
        ],
      },
      {
        h2: 'Regular orders for your office',
        body: [
          'If your office reorders the same things every month, message us the list once. We confirm price and availability each time, so you do not have to visit for every refill.',
        ],
      },
      {
        h2: 'Easy to reach',
        body: [
          'The shop is at Janatha Junction in Vyttila, opposite Metro Pillar No. 837, on the Kochi Metro line. Free parking is available.',
        ],
      },
    ],
    products: { categories: ['office-supplies'], limit: 12 },
    catalogLink: { to: '/catalog?category=office-supplies', label: 'Browse all office supplies' },
    waMessage: 'Hi Stationery Point, I would like a quote for office stationery. Items and quantities: ',
    faqs: [
      { q: 'Do you stock printer ink?', a: 'We list Epson and HP ink cartridges in the catalogue. Message us the model number to confirm.' },
      { q: 'Can I get a GST invoice for my office?', a: 'Yes, we provide GST invoices for bulk orders.' },
      { q: 'What are your opening hours?', a: 'Monday to Saturday, 9:30 AM to 8:00 PM. Closed on Sunday.' },
    ],
    related: ['wholesale-stationery-kochi', 'school-stationery-kochi'],
  },

  {
    slug: 'art-and-craft-supplies-kochi',
    navLabel: 'Art & craft supplies',
    title: 'Art & Craft Supplies in Kochi | Stationery Point, Vyttila',
    description:
      'Art and craft supplies in Vyttila, Kochi: colour pencils, acrylic paint, sketch books, canvas, brushes, markers and craft material from Camel, DOMS, Faber-Castell and more.',
    h1: 'Art and craft supplies in Kochi',
    lead:
      'A shop for students, hobby artists and craft projects at Janatha Junction, Vyttila. Colours, sketch books, canvas, brushes and craft material from the brands art students ask for, priced below MRP.',
    sections: [
      {
        h2: 'Colours and drawing',
        body: [
          'Colour pencils and water colour pencils from Camel and DOMS, Faber-Castell crayons, Camel acrylic paint, fabric paint, Posca markers, Uni Pin fineliners and sketch pens in many shades.',
        ],
      },
      {
        h2: 'Paper, canvas and brushes',
        body: [
          'Sketch books in A3, A4, A5 and B5, canvas boards and stretched canvas, and brush sets from Camel, Faber-Castell and Fevicryl.',
        ],
      },
      {
        h2: 'Craft material',
        body: [
          'Air dry clay, Mouldit, play dough, cutting mats and precision knives, washi tape, yarn, pipe cleaners, dry flowers, glue and wood plates for school projects and hobby crafts.',
        ],
      },
    ],
    products: { categories: ['art-supplies'], limit: 12 },
    catalogLink: { to: '/catalog?category=art-supplies', label: 'Browse all art supplies' },
    waMessage: 'Hi Stationery Point, I would like to check art and craft supplies. Items: ',
    faqs: [
      { q: 'Which art brands do you stock?', a: 'Camel, DOMS, Faber-Castell, Posca, Uni, Fevicryl and Addgel are in our catalogue. Ask if you want a specific product.' },
      { q: 'Do you have canvas boards?', a: 'Yes, we list canvas boards and stretched canvas. Message us the size you need.' },
      { q: 'Can I come and see the range?', a: 'Yes. We are at Janatha Junction, Vyttila, open Monday to Saturday, 9:30 AM to 8:00 PM.' },
    ],
    related: ['school-stationery-kochi', 'return-gifts-kochi'],
  },

  {
    slug: 'school-stationery-kochi',
    navLabel: 'School stationery',
    title: 'School Stationery Shop in Kochi | Stationery Point, Vyttila',
    description:
      'School stationery in Vyttila, Kochi: notebooks, pens, pencils, pouches, school bags and water bottles below MRP. Send your list on WhatsApp and we pack it before you arrive.',
    h1: 'School stationery in Kochi',
    lead:
      'The whole school list in one trip. Notebooks, pens, pencils, pouches, school bags and water bottles, priced below MRP at Stationery Point in Vyttila.',
    sections: [
      {
        h2: 'Send the list, we pack it',
        body: [
          'Send your child\'s school list on WhatsApp. We pack it before you reach the shop, so you collect it instead of searching shelves. Ask about kits for different classes.',
        ],
      },
      {
        h2: 'What is on the shelf',
        body: [
          'Papergrid notebooks, Apsara pencils, Flair, Pentonic and Uni-ball pens, Alpha pencil boxes and pouches, school bags, water bottles, sketch books and colours for art class.',
        ],
      },
      {
        h2: 'Schools and tuition centres',
        body: [
          'Buying for a whole class or a school? We give volume pricing below MRP and a GST invoice. Send the quantities and we quote.',
        ],
      },
    ],
    products: {
      nameIncludes: ['notebook', 'pencil', 'ball pen', 'gel pen', 'school bag', 'pouch', 'pencil box', 'waterbottle', 'sketch book'],
      limit: 12,
    },
    catalogLink: { to: '/catalog?category=stationery', label: 'Browse stationery' },
    waMessage: 'Hi Stationery Point, here is our school list. Could you confirm availability and price? ',
    faqs: [
      { q: 'Can you pack a school list in advance?', a: 'Yes. Send the list on WhatsApp and we pack it before you reach the shop.' },
      { q: 'Are prices below MRP?', a: 'Yes, our products are priced below MRP.' },
      { q: 'Do you stock school bags?', a: 'Yes, school bags and water bottles are in our catalogue.' },
    ],
    related: ['art-and-craft-supplies-kochi', 'wholesale-stationery-kochi'],
  },

  {
    slug: 'return-gifts-kochi',
    navLabel: 'Return gifts',
    title: 'Return Gifts in Kochi | Stationery Point, Vyttila',
    description:
      'Planning return gifts for a birthday or school event in Kochi? Tell Stationery Point in Vyttila your guest count and budget on WhatsApp and we will suggest options.',
    h1: 'Return gifts in Kochi',
    lead:
      'For birthdays, school events and small functions. Tell us how many guests and your budget per head, and we suggest options from what the shop carries.',
    sections: [
      {
        h2: 'How it works',
        body: [
          'Message us the number of return gifts, your budget per gift and the age group. We reply with options and prices, and you can visit the shop to see them before you decide.',
        ],
      },
      {
        h2: 'Why stationery works as a return gift',
        body: [
          'Colours, sketch pens, clay and craft sets are useful, easy to hand out to a group of children and easy to keep within a budget.',
        ],
      },
      {
        h2: 'Larger quantities',
        body: [
          'For bigger numbers, we give volume pricing below MRP. Send the quantity and we quote.',
        ],
      },
    ],
    products: null,
    catalogLink: { to: '/catalog?category=craft-material', label: 'See craft material' },
    waMessage: 'Hi Stationery Point, I am planning return gifts. Number of gifts, budget per gift and age group: ',
    faqs: [
      { q: 'Do you have ready return gift packs?', a: 'Message us your budget and guest count and we tell you what we can put together.' },
      { q: 'Can I see the items before I decide?', a: 'Yes. Visit us at Janatha Junction, Vyttila, Monday to Saturday, 9:30 AM to 8:00 PM.' },
    ],
    related: ['art-and-craft-supplies-kochi', 'school-stationery-kochi'],
  },
];

export const landingBySlug = Object.fromEntries(landingPages.map((p) => [p.slug, p]));
