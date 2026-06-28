# Stationery Point, Kochi

A premium, enquiry-only website for **Stationery Point**, Vyttila, Kochi. No cart or checkout — every product and category offers a direct **Enquire on WhatsApp** action with a prefilled message.

## Tech Stack
- **Vite + React (SWC)**
- **Tailwind CSS v3** + custom CSS variables
- **GSAP** (ScrollTrigger section reveals + hero parallax)
- **Framer Motion** (page/interaction micro-animations)
- **React Lenis** (smooth scrolling root)
- **React Router DOM v6** (SPA routes)

## Getting Started
```bash
cd app
npm install
npm run dev      # start dev server
npm run build    # production build
npm run preview  # preview the build
```

## Routes
- `/` Home — split hero, bento category sections, reviews, wholesale CTA
- `/catalog` Catalog — searchable, filterable products with WhatsApp enquiry
- `/about` About — story, gallery, hours
- `/contact` Contact — map, tap-to-call, WhatsApp/email enquiry form

## Editing Content
All business info lives in `src/lib/utils.js` (`STORE`) and product/category data in `src/data/productData.js`.
