import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE_OUT = 'G:\\Stationery point\\research\\references';

async function deepDiveSmiggle() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--disable-blink-features=AutomationControlled', '--no-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
  });

  const page = await context.newPage();

  console.log('Fetching Smiggle Homepage Bundle Block...');
  await page.goto('https://www.smiggle.co.uk/shop/en/smiggleuk', { waitUntil: 'domcontentloaded', timeout: 40000 });
  await page.waitForTimeout(2000);

  // Extract homepage bundle tile details
  const homepageBundleTiles = await page.evaluate(() => {
    const tiles = Array.from(document.querySelectorAll('.carousel_collections .splide__slide, .carousel_tile .splide__slide, [class*="collection"] a, [class*="tiles"] a')).map(t => {
      const img = t.querySelector('img');
      const textEl = t.querySelector('p, span, h2, h3, h4, .tile-name');
      return {
        text: (textEl ? textEl.innerText.trim() : t.innerText.trim()),
        href: t.getAttribute('href') || (t.querySelector('a') ? t.querySelector('a').getAttribute('href') : ''),
        imgSrc: img ? (img.currentSrc || img.src) : '',
        dimensions: {
          width: Math.round(t.getBoundingClientRect().width),
          height: Math.round(t.getBoundingClientRect().height)
        }
      };
    }).filter(t => t.text.length > 0 || t.imgSrc.length > 0);

    // Check nav bundles dropdown
    const bundleNavMenu = document.querySelector('.menu__item--bundles, [class*="bundles"]');
    const navSubLinks = bundleNavMenu ? Array.from(bundleNavMenu.querySelectorAll('a')).map(a => ({
      text: a.innerText.trim(),
      href: a.getAttribute('href')
    })) : [];

    return { tiles: tiles.slice(0, 15), navSubLinks };
  });

  console.log('Homepage bundle tiles:', JSON.stringify(homepageBundleTiles, null, 2));

  // Now let's explore the bundles listing page
  console.log('\nNavigating to Smiggle Bundles category...');
  await page.goto('https://www.smiggle.co.uk/shop/en/smiggleuk/bundles', { waitUntil: 'domcontentloaded', timeout: 40000 });
  await page.waitForTimeout(3000);

  const bundleCategoryData = await page.evaluate(() => {
    const products = Array.from(document.querySelectorAll('.product-tile, .product_card, [class*="product-card"], .grid__item, [data-product-card]')).map(card => {
      const nameEl = card.querySelector('.name, .product-title, [class*="title"], [class*="name"], h3, h4, a.product-name');
      const priceEl = card.querySelector('.price, .now-price, [class*="price--now"], [class*="offer-price"], .product-price');
      const wasEl = card.querySelector('.was-price, .strike, s, [class*="was"], [class*="compare"]');
      const promoEl = card.querySelector('.product__message, .badge, .promo-tag, [class*="badge"]');
      const img = card.querySelector('img');
      const link = card.querySelector('a');

      return {
        name: nameEl ? nameEl.innerText.trim() : '',
        price: priceEl ? priceEl.innerText.trim() : '',
        wasPrice: wasEl ? wasEl.innerText.trim() : '',
        badge: promoEl ? promoEl.innerText.trim() : '',
        href: link ? link.getAttribute('href') : '',
        imgSrc: img ? (img.currentSrc || img.src) : ''
      };
    }).filter(p => p.name.length > 0);

    return {
      title: document.title,
      heading: document.querySelector('h1') ? document.querySelector('h1').innerText.trim() : '',
      products
    };
  });

  console.log(`Extracted ${bundleCategoryData.products.length} bundle products from /bundles`);
  console.log(JSON.stringify(bundleCategoryData.products.slice(0, 8), null, 2));

  // Also check ready-made bundles or school bundles
  console.log('\nChecking /bundles/ready-made-bundles or search for bundle items...');
  const bundleUrls = [
    'https://www.smiggle.co.uk/shop/en/smiggleuk/bundles/ready-made-bundles',
    'https://www.smiggle.co.uk/shop/en/smiggleuk/bundles/build-a-bundle',
    'https://www.smiggle.co.uk/shop/en/smiggleuk/bundles/stationery-bundles',
    'https://www.smiggle.co.uk/shop/en/smiggleuk/bundles/hot-offer-bundles'
  ];

  const subCategoryData = {};

  for (const bUrl of bundleUrls) {
    try {
      console.log(`Checking ${bUrl}...`);
      await page.goto(bUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(2000);
      const data = await page.evaluate(() => {
        const prods = Array.from(document.querySelectorAll('.product-tile, .product_card, [class*="product-card"], .grid__item')).map(card => {
          const nameEl = card.querySelector('.name, .product-title, [class*="title"], [class*="name"], h3, h4');
          const priceEl = card.querySelector('.price, .now-price, [class*="price--now"], [class*="offer-price"], .product-price');
          const wasEl = card.querySelector('.was-price, .strike, s, [class*="was"]');
          const promoEl = card.querySelector('.product__message, .badge, .promo-tag');
          return {
            name: nameEl ? nameEl.innerText.trim() : '',
            price: priceEl ? priceEl.innerText.trim() : '',
            wasPrice: wasEl ? wasEl.innerText.trim() : '',
            badge: promoEl ? promoEl.innerText.trim() : ''
          };
        }).filter(p => p.name.length > 0);
        return {
          title: document.title,
          h1: document.querySelector('h1') ? document.querySelector('h1').innerText.trim() : '',
          prods
        };
      });
      subCategoryData[path.basename(bUrl)] = data;
    } catch (e) {
      console.log(`Note for ${bUrl}: ${e.message}`);
    }
  }

  // Inspect a sample Bundle Product Detail Page (PDP)
  let samplePdpData = null;
  if (bundleCategoryData.products.length > 0 && bundleCategoryData.products[0].href) {
    const pdpHref = bundleCategoryData.products[0].href;
    const fullPdpUrl = pdpHref.startsWith('http') ? pdpHref : `https://www.smiggle.co.uk${pdpHref}`;
    console.log(`\nInspecting sample bundle PDP: ${fullPdpUrl}...`);
    try {
      await page.goto(fullPdpUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(3000);

      samplePdpData = await page.evaluate(() => {
        const title = document.querySelector('h1, .product-name, [class*="product-detail"] h1')?.innerText.trim();
        const price = document.querySelector('.price, .product-price, .now-price')?.innerText.trim();
        const wasPrice = document.querySelector('.was-price, s, .strike')?.innerText.trim();
        const saveBadge = document.querySelector('.badge, .discount, .save-price, .offer-tag')?.innerText.trim();
        const desc = document.querySelector('.product-description, .pdp-description, #product-details')?.innerText.trim();
        const cta = document.querySelector('button[id*="add-to-cart"], button.primary-btn, button[class*="add-to-bag"]')?.innerText.trim();
        
        // Included items list in bundle
        const items = Array.from(document.querySelectorAll('.bundle-item, [class*="bundle-product"], [class*="included-item"], ul.bundle-items li, .product-details ul li')).map(li => li.innerText.trim());

        return {
          title,
          price,
          wasPrice,
          saveBadge,
          cta,
          descSnippet: desc ? desc.slice(0, 400) : '',
          items
        };
      });

      console.log('Bundle PDP details:', JSON.stringify(samplePdpData, null, 2));

      // Take a screenshot of the bundle PDP for reference
      await page.screenshot({ path: path.join(BASE_OUT, 'screenshots', 'smiggle', '375', 'bundle-pdp.png'), clip: { x: 0, y: 0, width: 375, height: 800 } });
      await page.screenshot({ path: path.join(BASE_OUT, 'screenshots', 'smiggle', '1440', 'bundle-pdp.png'), fullPage: false });
    } catch (e) {
      console.log('PDP inspection error:', e.message);
    }
  }

  // Save the complete raw extracted bundle data
  fs.writeFileSync(
    path.join(BASE_OUT, 'smiggle_raw_bundle_data.json'),
    JSON.stringify({
      homepageBundleTiles,
      bundleCategoryData,
      subCategoryData,
      samplePdpData
    }, null, 2)
  );

  console.log('\n[DONE] Smiggle bundle deep dive raw data collected and saved!');
  await browser.close();
}

deepDiveSmiggle().catch(console.error);
