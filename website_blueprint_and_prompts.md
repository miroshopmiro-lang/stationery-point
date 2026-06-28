# Stationery Point Kochi — Website Ultimate One-Shot Prompt Spec

This file contains the complete, battle-tested, **Ultimate One-Shot Prompt** for the GitLab AI model. 

Copy the entire content of the block in **Section 2** and paste it directly into your GitLab model. 

*Note: This prompt has been redesigned to achieve the **same premium quality and standard** as Scooboo without copying it 1:1. It uses custom category groupings, a distinct visual theme (purple/lavender brand accents), and unique layout patterns to ensure the website is completely original.*

---

## 1. How to Use This Prompt
1.  **Open** the GitLab AI coding terminal or interface.
2.  **Copy** everything inside the dashed line box in **Section 2**.
3.  **Paste** it into the model input box and press run.
4.  The model will scaffold, style, and code a premium React + Tailwind + GSAP website tailored for Stationery Point, Kochi.

---

## 2. Copy-Pasteable One-Shot Prompt

```text
Build a complete, production-ready, high-performance, and visually stunning website for "Stationery Point, Kochi". The site must feel expensive, smooth, and premium, benchmarking the professional design standard of scooboo.in but featuring a unique layout, customized category terms, and a distinct brand identity.

Core Premise: This is an enquiry-only website. There is NO shopping cart checkout or payment gateway. Every product and category card will offer a direct "Enquire on WhatsApp" action that redirects to prefilled WhatsApp messages.

==================================================
1. BUSINESS DATA & CONTENT (SOURCE OF TRUTH)
==================================================
Use this exact information to hydrate the website content:
* Store Name: Stationery Point
* Address: Ground Floor, Katti Tower, Jr Janatha Rd, Janatha Junction, Vyttila, Kochi, Ernakulam, Kerala 682019 (Landmark: Opposite Metro Pillar No. 837)
* Contact Phone: +91 88488 38132
* WhatsApp Number: 918848838132 (Use link: https://wa.me/918848838132)
* Instagram Profile: https://www.instagram.com/stationerypoint._
* Hours: Monday – Saturday: 9:30 AM – 8:00 PM | Sunday: Closed
* Google Rating: 4.8 / 5 Stars based on 147+ verified reviews.
* About Us Copy: "Welcome to Stationery Point, your ultimate one-stop shop in Kochi for all your writing supplies, craft items, school and office stationery, party products, and corporate gifts. We are proud to offer a massive variety of premium quality products at prices below MRP! Whether you are a student, an artist, or sourcing supplies for your office, our friendly staff is here to help you find exactly what you need."
* Customer Testimonials:
  1. Anisha P. (5 Stars): "This place is a hidden treasure in the city. One shop for all the stationery and craft items... customer service is appreciable. They gave much discount to the things I bought... step from Sahodaran Ayyappan road..."
  2. Vivek D. (5 Stars): "Premium and variety made available at very affordable prices & friendly staff."
  3. Jelitta Johny (5 Stars): "Wonderful experience and quality products at reasonable price 💗"

==================================================
2. TECH STACK REQUIREMENTS
==================================================
- Framework: Vite + React (SWC)
- Styling: Tailwind CSS (v3 or v4) + Custom CSS Variables for gradients and fonts.
- Animation: GSAP (ScrollTrigger for section triggers) + Framer Motion (page transitions/interactive micro-animations).
- Smooth Scroll: React Lenis (Lenis smooth scrolling root).
- Routing: React Router DOM (v6) for valid SPA routes.

==================================================
3. DESIGN SYSTEM & VISUAL GUIDELINES (DISTINCT & PREMIUM)
==================================================
Ensure the website is structurally original but hits a world-class luxury standard:
- Typography: Set primary sans-serif font to "Plus Jakarta Sans" or "Outfit" from Google Fonts for a clean, modern geometric feel.
- Color Palette: Set body background to a clean off-white (#FAFAFC). Use a deep, rich royal purple (#5D2D8F) as the primary brand color, light lavender (#F5EEFC) for secondary containers, and a warm amber gold (#FFB000) for CTA hover states and key accents.
- Card Design System: The category grid cards should feel like a premium catalog. Instead of plain grids, use slightly asymmetric card frames (e.g., aspect-[4/5] vertical grids) with soft, alternating backgrounds matched to Stationery Point's purple and pastel accents:
  1. Lavender Mist: bg-[#F3E8FF] (rgb(243, 232, 255))
  2. Mint Cream: bg-[#E8F5E9] (rgb(232, 245, 233))
  3. Soft Peach: bg-[#FFF3E0] (rgb(255, 243, 224))
- Card Proportions & Styles: Rounded-2xl (16px) borders, subtle glassmorphic backdrop filters, and soft drop shadows. Product mockups should hover inside.
- Hover Effects: Hovering on any card should make it scale slightly (scale-102) and lift up (translate-y-[-4px]) with a smooth transition (transition-all duration-300).
- Section Header Layouts:
  - Top line: small description in low-contrast text (e.g., "Explore rich pigments and smooth-flow paints...")
  - Main header: Large, bold, left-aligned (rather than centered) headline for a modern editorial feel.
  - Subtitle: Subtle small grey description.
- Hero Banner Layout: A gorgeous split-screen hero layout. Left side: Big, bold, creative typography stating "Kochi's Premium Stationery Hub". Right side: A floating grid of 3 overlapping cards displaying premium brushes, pens, and sketchbook covers with smooth parallax motions.

==================================================
4. UNIQUE PRODUCT CATEGORIES (DISTINCT HIERARCHY)
==================================================
Structure the product sections with these customized, creative categories:

1. SECTION: "Pigment & Palette" (Sub-header: "Rich mediums and smooth-flow colors for artists.", Title: "Pigment & Palette", Sub-desc: "Colors that inspire")
   - Professional Watercolors (bg-[#F3E8FF])
   - Premium Acrylics (bg-[#E8F5E9])
   - Studio Poster Paints (bg-[#FFF3E0])
   - Fine Art Spray Paints (bg-[#F3E8FF])

2. SECTION: "Drafting & Precision" (Sub-header: "Fine-point drawing and technical writing instruments.", Title: "Drafting & Precision", Sub-desc: "Engineered for details")
   - Brush Pens & Fine Liners (bg-[#E8F5E9])
   - Varnishes & Finishing Gels (bg-[#FFF3E0])
   - Professional Mechanical Pencils (bg-[#F3E8FF])
   - High-Grade Erasers (bg-[#FFF3E0])
   - Technical Graphite Pencils (bg-[#F3E8FF])
   - Desktop Sharpeners (bg-[#FFF3E0])
   - Paper Blenders (bg-[#E8F5E9])
   - Desktop Easels (bg-[#FFF3E0])
   - Canvas Gesso (bg-[#F3E8FF])

3. SECTION: "Graphite & Sketch" (Sub-header: "Tools for sketching, shading, and architectural illustrations.", Title: "Graphite & Sketch", Sub-desc: "Sketches without limits")
   - Sketching Pencils (bg-[#F3E8FF])
   - Charcoal Sticks (bg-[#FFF3E0])
   - Premium Coloured Pencils (bg-[#E8F5E9])
   - Watercolor Pencils (bg-[#FFF3E0])
   - Soft Pastels & Crayons (bg-[#F3E8FF])
   - Oil Pastels (bg-[#FFF3E0])

4. SECTION: "Creative Mediums" (Sub-header: "Specialized paints and marker sets for diverse surfaces.", Title: "Creative Mediums", Sub-desc: "Create on any canvas")
   - Fabric Paints & Markers (bg-[#FFF3E0])
   - Glass & Ceramic Liners (bg-[#E8F5E9])
   - Designer Gouache (bg-[#F3E8FF])
   - Chalk Paints & Markers (bg-[#FFF3E0])

==================================================
5. FILE STRUCTURE & IMPLEMENTATION CODE
==================================================

--------------------------------------------------
A. CONFIGURATION
--------------------------------------------------

### File: tailwind.config.js
Extend fonts and colors:
```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Outfit"', 'sans-serif'],
      },
      colors: {
        'brand-purple': '#5D2D8F',
        'brand-lavender': '#F5EEFC',
        'brand-gold': '#FFB000',
        'pastel-lavender': '#F3E8FF',
        'pastel-mint': '#E8F5E9',
        'pastel-peach': '#FFF3E0',
      },
    },
  },
  plugins: [],
}
```

### File: src/index.css
Setup global base rules and scroll-behavior:
```css
@import "tailwindcss";

:root {
  --brand-purple: #5D2D8F;
  --bg-color: #FAFAFC;
}

body {
  background-color: var(--bg-color);
  font-family: 'Plus Jakarta Sans', 'Outfit', sans-serif;
  overflow-x: hidden;
}

.text-gradient {
  background: linear-gradient(to right, #5D2D8F, #FFB000);
  -webkit-background-clip: text;
  color: transparent;
}
```

--------------------------------------------------
B. CORE COMPONENTS
--------------------------------------------------

### File: src/App.jsx
Setup App routes and wrapping elements:
```javascript
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ReactLenis } from '@studio-freight/react-lenis';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Catalog from './components/Catalog';
import About from './components/About';
import Contact from './components/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ReactLenis root>
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-[#FAFAFC]">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ReactLenis>
  );
}
```

### File: src/components/Header.jsx
Sticky Navbar design details:
- Top Announcement: Sleek dark purple banner highlighting "Premium Quality Products Below MRP | Special Store Discounts Available".
- Logo Area: Minimal modern logo icon with clean bold font "STATIONERY POINT".
- Centered Navigation: Glassmorphic navigation menu pill with link items: Home, Shop Catalog, About Us, Contact Store.
- Right Area: Rounded search icon input + Call direct button + WhatsApp quick icon.

### File: src/components/Home.jsx
Main landing page containing:
- Split-screen Hero (Left: elegant typography, Right: overlap card gallery layout with GSAP parallax triggers).
- Bento Grid Categories: 4 visual categories showing "Pigment & Palette", "Drafting & Precision", "Graphite & Sketch", "Creative Mediums" with custom hover animations.
- Verified Google Reviews testimonial slider.
- Large Wholesale inquiries contact section.

### File: src/components/Catalog.jsx
Comprehensive filterable page:
- Category filters sidebar.
- Search input bar to look up products.
- Products grid: displays title, category, description, and price (labeled "Below MRP").
- Each product card MUST contain a prominent green "Enquire on WhatsApp" button.
- Clicking the button triggers a WhatsApp text message containing the name of the product:
  `https://wa.me/918848838132?text=Hi%20Stationery%20Point%2C%20I%20am%20interested%20in%20inquiring%20about%20the%20[PRODUCT_NAME]%20from%20your%20website.` (with [PRODUCT_NAME] URL-encoded).

### File: src/components/Contact.jsx
Layout: Split screen.
- Left: Store Location card with Google Map embed (Katti Tower, Vyttila, Kochi). Direct tap-to-call link (+91 88488 38132).
- Right: Contact Form containing fields (Name, Phone Number, Email, and message box). Includes a button to submit direct to email or export as a prefilled WhatsApp message.

### File: src/components/About.jsx
Displays:
- About us copy detailing Vyttila shop location and "Below MRP" wholesale services.
- Photo gallery containing store items.
- Hours checklist: "Mon-Sat: 9:30 AM to 8:00 PM | Sun: Closed".

### File: src/components/Footer.jsx
Aesthetic: Deep purple background with thin light borders.
Columns:
- Catalog Links
- Store Policy & Details
- Get in Touch (address details, phone link, map link).
Large text spanning the bottom: "STATIONERY POINT" (uppercase serif text at 90% opacity, centered).

--------------------------------------------------
C. DATA FILES
--------------------------------------------------

### File: src/data/productData.js
Define a structured database list containing items belonging to different categories so that the filter search works flawlessly. For example, include:
- Watercolor Sets
- Acrylic Tubes
- Artist Brushes
- Charcoal sticks
- Spiral Notebooks
- Office Files & Folders
- Greeting Cards
*(Include tags, categories, descriptions, image URL details).*

==================================================
6. EXECUTION & SCAFFOLDING INSTRUCTIONS
==================================================
Scaffold: npm create vite@latest app -- --template react
Install: npm install gsap framer-motion react-router-dom @studio-freight/react-lenis clsx tailwind-merge
Build: npm run build
```
