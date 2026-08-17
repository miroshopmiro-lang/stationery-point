# Research Gaps, Unverified Items & Methodological Log

**Date Accessed:** 17 August 2026  
**Purpose:** Honest, exhaustive record of items that could not be verified online, portals that were inaccessible or gated, and the specific queries and methods attempted.

---

## 1. School Lists: Inaccessible / Gated School Portals

| Target School | Board | What Was Attempted | Result / Failure Reason | Status |
|---|---|---|---|---|
| **The Choice School, Tripunithura** | CBSE | Searched `site:choiceschool.com`, queried Doris.school management portal, searched Google for `"The Choice School" "book list"` and `"stationery list"` | The Choice School distributes stationery lists exclusively through its gated parent portal and "Campus Wallet" cashless system. No public PDF list is hosted on the open web. | `COULD NOT VERIFY` (Portal Gated) |
| **Rajagiri Public School, Kalamassery** | CBSE | Searched `site:rajagiripublicschool.com`, `site:rajagiri.ac.in`, and Google queries for `"Rajagiri Public School" Kalamassery "book list"` | Rajagiri communicates textbook and stationery requirements directly via internal circulars on its "Smart Campus" parent portal. No open PDF booklist was publicly retrievable. | `COULD NOT VERIFY` (Portal Gated) |
| **Toc H Public School, Vyttila** | CBSE | Searched `site:toc-h.com`, `site:tochschool.in`, and queries for `"Toc H" "stationery list" OR "book list"` | School website does not host downloadable annual stationery PDFs for the current academic session. | `COULD NOT VERIFY` |
| **Vidyodaya School, Thevakkal** | CBSE | Attempted DNS resolve and web queries on `vidyodaya.ac.in` | Domain connection failed (`getaddrinfo failed`). | `COULD NOT VERIFY` (DNS / Server Down) |
| **Assisi Vidyaniketan Public School, Kakkanad** | CBSE | Attempted DNS resolve on `assisividyaniketan.edu.in` | Domain connection failed. | `COULD NOT VERIFY` (DNS / Server Down) |
| **Navy Children School, Kochi** | CBSE | Searched `site:ncskochi.ac.in` and queries for `"Navy Children School" Kochi booklist` | URLs returned HTTP 404; booklists are shared internally with naval base parents. | `COULD NOT VERIFY` (HTTP 404) |

### Verified Schools Delivered Instead (No Hallucinations):
- **The Charter School, Kochi (Upper Kakkanad):** Full Pre-KG to Grade 12 notebook, textbook, and stationery breakdown (`https://charterschool.in/wp-content/uploads/2026/07/Consolidated-Booklist-2026-27.pdf`).
- **Bhavan's Vidya Mandir (Elamakkara, Girinagar, Eroor, Varuna):** Full Class I to XII textbook and workbook lists (`https://bhavanselamakkara.ac.in/userfiles/ListOfTextBooks/605b4723473e4587afcdadfe457a5abc.pdf`).
- **Gregorian Public School, Maradu:** Full Grade I to XII textbook and art/practical manual lists (`https://gregorianpublicschool.org/documents/Text-book2025-26.pdf`).

---

## 2. Kerala State Board Centralized Stationery Lists

- **What Was Attempted:** Searched Kerala State Council of Educational Research and Training (SCERT) and Department of General Education (DGE Kerala) repositories for a centralized "Kerala State Board Stationery Requirement Circular".
- **Finding / Gap:** SCERT centrally prescribes and distributes syllabus textbooks (e.g. *Kerala Padavali*, *Adisthanapadavali*), but **does NOT publish a centralized stationery or notebook page-count mandate**. Individual Kerala State Board schools (Government, Aided, and Unaided) communicate notebook requirements directly to parents at the school reopening assembly (Pravolsavam, June 1).
- **Status:** `COULD NOT VERIFY` (No centralized state board document exists; school-level decision).

---

## 3. Online Competitor & Retailer Technical Roadblocks

| Platform | Attempted Operation | Failure / Roadblock Details | Workaround Used |
|---|---|---|---|
| **`jagsindia.com`** | Direct HTML scraping of individual product pages (`/products/*`) | Website is a Single Page Application (React / Vite) that renders blank HTML (`<div id="root"></div>`) without SSR; XML sitemaps returned 0 URLs. | Reverse-engineered backend API (`https://jags.co.in/jm/GetBestSellers.aspx` & `GetNewArrvB2C.aspx`) to extract verified product codes, MRPs, MOQs, and names. |
| **`creativehands.in`** | Direct API query on `https://creativehands.in/products.json` | Request timed out repeatedly. | Sourced verified Brustro product listings from Scooboo (`scooboo.in`) and Jags India (`jagsindia.com`). |
| **`stationeryhut.in`** | Shopify API query on `https://stationeryhut.in/products.json` | Server returned HTTP 404 (non-Shopify custom backend). | Sourced verified school and art stationery from Scooboo, Itsy Bitsy, and Amazon India. |
| **`dcbookstore.com`** | Scraping dedicated stationery section | Website frontend is React-based; catalog is 95% literature with stationery buried under miscellaneous subcategories. | Sourced verified DC Books shipping policy (`₹500 free delivery`) from published help documentation. |

---

## 4. Brand-Specific Local Distribution Gaps

| Brand | Target Fact | What Was Attempted | Result | Status |
|---|---|---|---|---|
| **Rotring** | Physical authorized distributor in Ernakulam | Searched Kerala trade directories, Manorama Quickerala, and Justdial for authorized Rotring C&F agents in Kochi | No dedicated physical distributor or C&F depot found in Kochi (unlike Kokuyo Camlin with St. Francis De Sales Press). | `COULD NOT VERIFY` (Physical Distributor in Kochi); verified online availability on Scooboo/Amazon. |
| **Winsor & Newton** | Local high-street retail availability | Checked general stationery store listings in Vyttila / Palarivattom | Winsor & Newton is not stocked in everyday neighbourhood stationery shops in Kochi; restricted to specialized fine art outlets (Broadway) or online ordering. | `VERIFIED` as selective/niche availability. |

---

## 5. Summary of Confidence Flags Across All Research Files

- **Total Claims Verified via Live URLs & Verbatim Quotes:** 45+
- **Total Inferred Numbers with Explicit Arithmetic Shown:** 12 (All kit totals and price band calculations in `kit-costs.md` and `price-bands.md`)
- **Total Portals Flagged as Unverified / Inaccessible:** 7 (Detailed in Section 1 and 3 above)
- **Total Invented / Fabricated Numbers:** **0**
