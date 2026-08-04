# Product Shots — phone photo → professional catalog image

Turns any ordinary phone photo into a clean white-background product shot with
a soft shadow, sized and named for the site (1200×1200 WebP). Runs fully
locally — no API keys, no per-image cost.

## Usage

```powershell
cd "G:\Stationery point\tools\product-shots"

# one photo
node shoot.mjs "C:\path\to\photo.jpg"

# a whole folder of client photos
node shoot.mjs "C:\path\to\photos-folder"
```

Output lands in `public/shop-catalogue-images/` (the site + CMS media folder),
named after the file (e.g. `parker pens.jpg` → `parker_pens.webp`). Then attach
it to the product in `/admin`.

First run downloads the background-removal model (~80 MB) — after that it's
seconds per photo, offline.

## Tips for the client's photos

- Any background works, but even lighting matters — near a window, no harsh shadows.
- One product (or one set) per photo, filling most of the frame.
- Name the file after the product before running — the output name follows it.
