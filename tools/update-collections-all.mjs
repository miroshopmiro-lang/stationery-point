import fs from 'fs';

const filePath = 'src/data/collections.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

data.hero = [
  {
    id: "school",
    hasEngravedText: true,
    eyebrow: "Back to school",
    title: "Everything on the list.",
    subtitle: "Notebooks, geometry boxes, pens & essentials — sorted in one trip",
    cta: {
      label: "Shop school supplies",
      to: "/catalog?category=stationery"
    },
    image: "/hero/hero-school.webp",
    imageMobile: "/hero/hero-school-mobile.webp"
  },
  {
    id: "art",
    hasEngravedText: true,
    eyebrow: "Fine art & craft",
    title: "Colour, paper, everything in between.",
    subtitle: "Watercolours, canvases, brushes and craft materials for every project",
    cta: {
      label: "Shop art supplies",
      to: "/catalog?category=art-supplies"
    },
    image: "/hero/hero-art.webp",
    imageMobile: "/hero/hero-art-mobile.webp"
  },
  {
    id: "office",
    hasEngravedText: true,
    eyebrow: "Office & institutional",
    title: "Bulk orders, handled.",
    subtitle: "Volume pricing, GST invoices and reliable delivery across Kochi.",
    cta: {
      label: "Get bulk quote",
      to: "/contact"
    },
    image: "/hero/hero-office.webp",
    imageMobile: "/hero/hero-office-mobile.webp"
  }
];

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated collections.json with all 3 hero slides!');
