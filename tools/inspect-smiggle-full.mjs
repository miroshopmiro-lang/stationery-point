import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE_OUT = 'G:\\Stationery point\\research\\references';

async function inspectSmiggle() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--disable-blink-features=AutomationControlled', '--no-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
  });

  const page = await context.newPage();
  console.log('Navigating to Smiggle...');
  await page.goto('https://www.smiggle.co.uk/shop/en/smiggleuk', { waitUntil: 'domcontentloaded', timeout: 35000 });
  await page.waitForTimeout(3000);

  const pageHtml = await page.content();
  fs.writeFileSync(path.join(BASE_OUT, 'smiggle_live_page.html'), pageHtml);
  console.log(`Saved smiggle_live_page.html (${pageHtml.length} bytes)`);

  // Extract all text and navigation items
  const extracted = await page.evaluate(() => {
    const navItems = Array.from(document.querySelectorAll('nav li, .menu__item, header a, .menu a')).map(el => ({
      tag: el.tagName,
      className: el.className,
      text: el.innerText.trim(),
      href: el.getAttribute('href') || (el.querySelector('a') ? el.querySelector('a').getAttribute('href') : '')
    }));

    // Tiles under hero
    const tiles = Array.from(document.querySelectorAll('.carousel_tile .splide__slide, .carousel_collections .splide__slide, .carousel_sale_tile .splide__slide, .splide__slide, [class*="tile"], [class*="banner"]')).map(el => ({
      className: el.className,
      text: el.innerText.trim().replace(/\s+/g, ' '),
      img: el.querySelector('img') ? (el.querySelector('img').currentSrc || el.querySelector('img').src) : '',
      href: el.querySelector('a') ? el.querySelector('a').getAttribute('href') : (el.getAttribute('href') || '')
    }));

    // Product cards visible on homepage
    const products = Array.from(document.querySelectorAll('.product-tile, .product_card, [class*="product-card"], .product, .grid-item')).map(el => ({
      name: el.querySelector('.name, h3, h4, a.product-name, [class*="title"]')?.innerText.trim() || '',
      price: el.querySelector('.price, .now-price, [class*="price"]')?.innerText.trim() || '',
      was: el.querySelector('.was-price, s, .strike')?.innerText.trim() || '',
      promo: el.querySelector('.product__message, .badge')?.innerText.trim() || '',
      img: el.querySelector('img')?.src || '',
      href: el.querySelector('a')?.href || ''
    }));

    return {
      title: document.title,
      navItems,
      tiles,
      products
    };
  });

  fs.writeFileSync(path.join(BASE_OUT, 'smiggle_extracted_details.json'), JSON.stringify(extracted, null, 2));
  console.log(`Saved smiggle_extracted_details.json`);
  console.log('Title:', extracted.title);
  console.log('Nav items count:', extracted.navItems.length);
  console.log('Tiles count:', extracted.tiles.length);
  console.log('Products count:', extracted.products.length);

  await browser.close();
}

inspectSmiggle().catch(console.error);
