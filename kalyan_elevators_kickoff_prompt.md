# Kalyan Elevators — Website Design Blueprint & GitLab AI Prompt

This document contains a comprehensive **Design Blueprint** and a ready-to-run **One-Shot Prompt** for generating a premium, responsive B2B website for **Kalyan Elevators** (Thrissur, Kerala) using a GitLab AI model.

---

# Part 1: Detailed Design Blueprint

To exceed the reference websites (Unified Elevators) and deliver a world-class vertical mobility web presence, this design blueprint outlines a luxury B2B theme, layout structures, user flows, and animation plans tailored for Kalyan Elevators.

## 1. Visual Identity & Design System

### A. Color Palette (Obsidian Luxury & Champagne Gold)
Unlike the yellow/black template of the reference websites, the new site uses a high-end, modern architectural look:
*   **Primary Background**: Deep Obsidian (`#0B0B0C`) and Dark Charcoal (`#121214`) for dark mode elegance.
*   **Secondary Background**: Light Platinum (`#F4F4F6`) for white sections or light mode toggle.
*   **Accent Color**: Champagne Gold (`#D4AF37`) and Brushed Bronze (`#C5A880`) for highlight elements, borders, buttons, and active states.
*   **Text Colors**:
    *   Pure White (`#FFFFFF`) for headers on dark sections.
    *   Brushed Silver (`#E5E5EA`) for secondary paragraphs.
    *   Obsidian Gray (`#1C1C1E`) for text on light backgrounds.
*   **Glassmorphism**: Semi-transparent panels utilizing backdrop-blur (`backdrop-blur-md`) with ultra-thin borders `border-[1px] border-white/10` and subtle inner shadows to reflect sleek steel, chrome, and glass elevator cabins.

### B. Typography
*   **Headings**: *Outfit* (Google Fonts) - A clean, geometric, high-end sans-serif that feels engineered yet sophisticated.
*   **Body**: *Plus Jakarta Sans* (Google Fonts) - Excellent readability for commercial services, catalogs, and technical details.

### C. Aesthetic Accents
*   **Metallic Gradients**: Linear gradients going from Gold to Bronze (`bg-gradient-to-r from-amber-500 via-yellow-600 to-amber-700`) to highlight luxury finishes.
*   **Subtle Glows**: Radial glows behind panels (`shadow-[0_0_50px_rgba(212,175,55,0.08)]`) to draw eyes to premium products.

---

## 2. Page & Navigation Structure

Instead of multi-page loading delays, the website is structured as a single-page app (SPA) with smooth scroll-spy navigation. The core sections are:

1.  **Home Page (Immersive Portal)**:
    *   *Hero Section*: Full-screen video/animation of a glass elevator rising in a luxury home. Text: "Elevating Kerala's Architectural Standards."
    *   *Stats Section*: 10+ Years of Engineering | 1500+ Lifts Installed | 100% Certified Safety Clearance | 24/7 AMC Support.
    *   *Interactive Lift Cabin Simulator*: A widget where users can toggle cabin styles (Glass-View, Golden PVD Steel, Wooden Finish) and see a preview render change dynamically.
    *   *Core Product Showcase*: Home Lifts, Passenger Lifts, Commercial Hydraulic Lifts, Hospital Lifts, Car Lifts, and Capsule Lifts.
    *   *USP Panel*: German Safety Standards, Jerk-Free V3F Drives, Automatic Rescue Device (ARD).
2.  **About Us**:
    *   Deep dive into Kalyan Elevators Pvt. Ltd., highlighting their Thrissur headquarters, local engineering talent, and commitment to the Kerala Lift Inspectorate guidelines.
3.  **Elevator Catalog**:
    *   Filterable grid displaying technical details, shaft size tables, speed limits, and pit requirements for each lift type.
4.  **Services & AMC (Annual Maintenance Contracts)**:
    *   Preventive maintenance details, emergency breakdown assistance, modernization of old lifts, and inspectorate safety checks.
5.  **Inquiry & Contact Page**:
    *   Interactive step-by-step quote request form (Floor count, lift type, finish, city).
    *   Office details (Thrissur location, hours, Instagram link, phone).

---

## 3. High-Conversion UX Framework

To achieve high conversions without online transactions:
*   **Global Sticky Navigation Dock (Mobile-First)**: A persistent bar at the bottom of the screen on mobile devices with three instant actions:
    1.  *WhatsApp Inquiry* (Custom pre-filled message: "Hello Kalyan Elevators, I would like to get a quote for a home/commercial lift...")
    2.  *Direct Call* (Fast-trigger phone link)
    3.  *Inquire Now* (Slides up the quote form modal)
*   **Step-by-Step Quote Builder Wizard**: A user-friendly 4-step card form that captures the exact specifications of the building before requesting contact details. This qualifies B2B and luxury home leads effectively.

---

# Part 2: One-Shot Prompt for the GitLab Model

Copy and paste the prompt below directly into the GitLab AI model interface to generate the complete website code.

````markdown
You are a Senior Frontend Engineer. Your task is to build a complete, single-page-app styled, premium website for "Kalyan Elevators Private Limited" using Vite, React, Tailwind CSS, Lucide icons, and GSAP animations. 

The website must be visually outstanding, responsive, and follow B2B luxury design standards. 

Here are the strict specifications and guidelines:

---

### 1. BRAND & COMPANY IDENTITY (USE IN ALL TEXT AND SEO METADATA)
*   **Company Name**: Kalyan Elevators Private Limited
*   **Core Slogan**: "Elevating Kerala's Architectural Standards" or "Kerala's Trusted Partner in Vertical Mobility"
*   **Location/HQ**: TMC 36/2551, Third Floor, Jomsons Tower, Chettiynagdi Junction, Post Office Rd, opposite Lavish Electronics, Thrissur, Kerala 680001
*   **Phone Number**: 079949 99926
*   **Hours of Operation**: Monday to Saturday: 9:30 AM – 6:00 PM | Sunday: Closed
*   **Instagram URL**: https://www.instagram.com/kalyanelevators/
*   **Brand Bio**: "Kalyan Elevators Private Limited is the leading and Best Elevator manufacturing company in Thrissur and Escalators Manufacturers In Kerala. We specialize in customized home elevators, high-speed passenger lifts, residential hydraulic elevators, commercial cargo lifts, architectural capsule lifts, car elevators, and automatic rescue device (ARD) systems. We are trusted across Thrissur, Kozhikode, and all of Kerala for our superior engineering and safety-first philosophy."

---

### 2. CORE CONVERSION MECHANISMS (CRITICAL)
*   **No e-commerce or checkout.** All CTA buttons must open a beautiful step-by-step "Interactive Quote Request Modal" or redirect to WhatsApp / Direct Call.
*   **WhatsApp API Link**: `https://wa.me/917994999926?text=Hi%20Kalyan%20Elevators%2C%20I%20am%20interested%20in%20a%20quote%20for%20an%20elevator%20installation.%20Please%20contact%20me.`
*   **Phone Link**: `tel:+917994999926`
*   **Sticky Floating Bar (Mobile & Desktop)**: Create a sticky bottom action bar (or floating glassmorphic dock) that offers:
    *   "Call Now" (tel link, Lucide Phone icon)
    *   "WhatsApp Chat" (whatsapp link, Lucide MessageSquare icon, green theme indicator)
    *   "Request Free Quote" (opens custom modal form)

---

### 3. DESIGN AESTHETICS (LUXURY B2B METALLIC & OBSIDIAN THEME)
Translate these design instructions into Tailwind utility classes:
*   **Color Scheme**: Dark mode by default for that ultra-premium look.
    *   Primary Background: Obsidian black (`bg-[#0B0B0C]`) and dark charcoal (`bg-[#121214]`).
    *   Cards & Panels: Glassmorphism style (`bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-2xl`).
    *   Highlights & Highlights: Warm Champagne Gold (`text-[#D4AF37]` or `bg-[#D4AF37]`) and Brushed Bronze (`text-[#C5A880]`).
    *   Text: Pure white for headings, muted silver (`text-zinc-400`) for body.
*   **Typography**: Clean sans-serif. Headings should have wide letter spacing and light font-weights (e.g. `font-light tracking-wide uppercase font-sans`).
*   **Micro-Animations**: All hover cards must scale smoothly (`transition-all duration-300 hover:-translate-y-2 hover:border-[#D4AF37]/40`). Highlight active states with a subtle gold glow box-shadow.

---

### 4. PAGES & SECTIONS (REACT SPA COMPONENTS)

#### A. Interactive Navigation Bar (Navbar)
*   Glassmorphic bar fixed at the top with a polished text logo: `KALYAN` + gold subscript `ELEVATORS`.
*   Links: Home, About Us, Elevator Range, Services, AMC, Contact.
*   "Get a Quote" CTA button with a brushed-metal gold gradient hover effect.

#### B. Hero Section (Immersive Landing)
*   Background: Dark overlay with a high-end structural video or a sophisticated CSS animated background representing vertical elevator shafts.
*   Main H1 Title: "SAFETY. PRECISION. LUXURY."
*   Sub-slogan: "Leading Elevator and Escalator manufacturers in Kerala. We design and install high-performance vertical mobility systems tailored to your architecture."
*   Dual CTAs: "Explore Lifts" (smooth scroll to catalog) and "Get Free Consultation" (opens Quote builder).
*   Scroll Indicator: An animated mouse icon pointing downwards.

#### C. Live Stats Bar
*   A clean horizontal bar featuring key business achievements:
    *   **10+** Years Industry Leadership
    *   **1500+** Lifts Installed across Kerala
    *   **100%** Certified Safety Inspectorate Clearance
    *   **24/7** Active AMC Support Team

#### D. Interactive Lift Cabin Simulator Widget
*   Create an interactive, client-side visual widget on the homepage that simulates an elevator interior.
*   Let users choose:
    *   *Cabin Style*: "Executive Gold PVD Stainless Steel", "Panoramic Glass Capsule", "Classic Wooden Panel", "Brushed Silver Stainless Steel".
    *   *Lighting Scheme*: "Warm Ambience", "Futuristic Blue Neo", "Bright Daylight LED".
    *   *Floor Indicator*: Clickable buttons for floors 0, 1, 2, 3, 4. Clicking a floor triggers a smooth GSAP vertical motion of an elevator indicator arrow and changes the active floor number with a ding sound effect (using Web Audio API synthesized sound).
*   Show a beautiful CSS mock cabin preview that changes color, border patterns, and textures based on selections. Add a text display under the preview explaining the chosen finish's ideal use case.

#### E. Elevator Range (Catalog Grid)
Showcase the following 6 premium elevator categories. Each card should have detailed dimensions, target segment, and custom options:
1.  **Elite Home Lifts (Residential Hydraulic)**: Glass capsule or enclosed cabs. No deep pit or headroom needed. Operates on single-phase power. Perfect for Kerala villas and multi-generation homes.
2.  **Traction Passenger Elevators (Residential/Commercial)**: High-speed, gearless motor systems, smooth deceleration, up to 20-passenger capacity.
3.  **Capsule & Panoramic Glass Lifts**: High-end architectural statements. Glass backing, custom gold framing, curved structures. Ideal for luxury showrooms, hotels, and premium villas.
4.  **Commercial & Industrial Cargo Elevators**: Robust, heavy-payload cage designs. Reinforced steel floors, double-sided controls, built for heavy warehousing.
5.  **Hospital Stretcher Lifts**: Jerk-free V3F drive system, extra-long interior to accommodate hospital beds, priority override switch for emergency situations.
6.  **Heavy-Duty Automobile Elevators**: Built for multi-level car showrooms and modern car park residential structures in Kerala cities. Features dual operating panels and entry-exit safety grids.

#### F. Technical USPs & Safety Features (Grid)
*   **Automatic Rescue Device (ARD)**: Embedded standard in all Kalyan models. Safe floor landing and door opening in power failures.
*   **German-Engineered Drive & V3F System**: Jerk-free starts, silent cabin operation, and up to 40% energy savings.
*   **Advanced Door Sensors**: Full-height light curtain infrared beams to prevent door-contact accidental entrapment.
*   **Department of Electrical Inspectorate (Kerala) Approval**: Guaranteed support for licensing, drawing clearance, and fitness inspections.

#### G. Annual Maintenance Contracts (AMC) & Services Section
*   **Preventive Care**: Regularly scheduled lubrication, wear checks, and safety tests.
*   **24/7 Emergency Response**: Quick-response engineering team stationed in Thrissur for immediate troubleshooting.
*   **Modernization Services**: Upgrade outdated elevator cabins with modern gold stainless steel panels, silent V3F gearless motors, and upgraded ARD units without replacing the entire shaft infrastructure.

#### H. Testimonial Section
*   A premium slider featuring customer experiences:
    *   *Dr. George, Thrissur (Home Owner)*: "The glass hydraulic home lift Kalyan Elevators installed has become the highlights of our villa. The ride is completely noiseless and smooth."
    *   *Mr. Baiju, Calicut (Apartment Developer)*: "We partnered with Kalyan for a 6-story passenger lift. The installation was completed ahead of schedule, and the safety inspection went through without a single issue."
    *   *Mrs. Lenin, Kochi (Showroom Owner)*: "Their 24/7 service plan is exceptionally reliable. We had one query late at night during a rainstorm, and their local Thrissur service desk resolved it immediately."

#### I. Full-Featured Quote Builder Wizard (Step-by-Step Modal)
Create an interactive form with steps:
*   *Step 1: Installation Type*: Checkboxes for Home Lift, Passenger Elevator, Glass Capsule, Cargo/Car Lift, Hospital Lift.
*   *Step 2: Building Specs*: Input/Dropdowns for Number of Floors (2 to 8+), Load Capacity/Number of Passengers.
*   *Step 3: Styling Preference*: Select Cabin Finish (Gold PVD, Glass Panoramic, Brushed Steel, Wood Inlays).
*   *Step 4: Contact Details*: Full Name, Mobile Number, Email, Installation City (Thrissur, Kochi, Kozhikode, Trivandrum, etc.), and Message.
*   On submission, log the data structure cleanly, display a gorgeous glassmorphic "Thank You" check animation, and auto-generate a copyable summary that opens a pre-composed WhatsApp chat containing all their selections for instant messaging.

#### J. Interactive Contact & Map Footer Section
*   Visual cards containing Address (HQ in Thrissur), Phone (079949 99926), Working Hours, and Instagram.
*   Integrated contact form allowing general inquiries.
*   Embedded Map: Create an elegant custom-themed dark Google Maps iframe wrapper pointing to Thrissur Kerala, or a stylized visual vector representation of their service footprint across Kerala.

---

### 5. TECHNICAL IMPLEMENTATION DETAILS & BOILERPLATE

*   **Vite + React Setup**: Build using modern functional components, standard React Hooks (`useState`, `useEffect`, `useRef`).
*   **Tailwind Styling**: Configure your color system directly inside the inline styles or extend them. Do not use plain styling.
*   **GSAP Animations**: Use GSAP `scrollTrigger` to fade components up, cascade grid card entries, and animate the lift simulator cabin transition.
*   **Responsive layouts**: Use grid layouts (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`) and absolute sizing for mobile screens. Ensure the floating CTA bar sits correctly on bottom-notch mobile browsers.

Please output the complete codebase structure and individual component code files (`App.jsx`, `tailwind.config.js`, `Navbar.jsx`, `QuoteModal.jsx`, `CabinSimulator.jsx`, `Catalog.jsx`, etc.) in standard code blocks. Build the copy to be natural, highly professional, sales-driven, and completely descriptive. Make sure no visual features are left half-done. Do not write placeholders. Write complete, copy-pasteable files.
````

---

# Verification & Copy Guide

When the GitLab model generates the React files, double-check that the following details are exactly integrated:
1.  **WhatsApp Phone Prefix**: Must use `917994999926` (no extra zeroes or spaces in the API link).
2.  **Thrissur Address**: Make sure Jomsons Tower, Post Office Road, Thrissur, Kerala 680001 is set as the main anchor point for SEO title/description tags on index.html.
3.  **No Shopping Carts**: Check that no "Add to Cart" or "Buy Now" components are present, replacing them with "Inquire on WhatsApp" or "Get Quote".
4.  **Automatic Rescue Device (ARD)**: This is the highest-priority safety USP in regional Kerala directories and must be heavily highlighted in product catalogs.
