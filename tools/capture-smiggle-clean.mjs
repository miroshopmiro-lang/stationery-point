import { chromium } from 'playwright';
import path from 'path';

const BASE_OUT = 'G:\\Stationery point\\research\\references';

async function captureSmiggleClean() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--disable-blink-features=AutomationControlled', '--no-sandbox']
  });

  for (const vp of [{ width: 375, height: 812, name: '375' }, { width: 768, height: 1024, name: '768' }, { width: 1440, height: 900, name: '1440' }]) {
    console.log(`Capturing Clean Smiggle @ ${vp.name}...`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    });
    const page = await context.newPage();
    await page.goto('https://www.smiggle.co.uk/shop/en/smiggleuk', { waitUntil: 'domcontentloaded', timeout: 35000 });
    await page.waitForTimeout(2000);

    // Dismiss or select UK in the country modal
    await page.evaluate(() => {
      // Look for UK link or dismiss button
      const ukLink = Array.from(document.querySelectorAll('a, button')).find(el => el.innerText.includes('United Kingdom') || el.innerText.includes('UK') || el.innerText.includes('Stay on'));
      if (ukLink) ukLink.click();
      // Also forcibly remove any remaining modal/overlay/backdrop
      document.querySelectorAll('.modal, .modal--country, .modal-backdrop, .ui-dialog, [class*="overlay"], [id*="cookie"]').forEach(el => el.remove());
    });
    await page.waitForTimeout(1000);

    const dir = path.join(BASE_OUT, 'screenshots', 'smiggle', vp.name);

    if (vp.name === '375') {
      await page.screenshot({ path: path.join(dir, '00-fullpage.png'), fullPage: true });

      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: path.join(dir, '01-header-top.png'), clip: { x: 0, y: 0, width: 375, height: 140 } });

      await page.evaluate(() => window.scrollTo(0, 800));
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(dir, '02-header-scrolled.png'), clip: { x: 0, y: 0, width: 375, height: 130 } });

      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(200);
      // 03-hero.png
      const hero = await page.$('.hero, [class*="hero"], #splide03, .carousel_tile, main > div:first-of-type');
      if (hero) {
        const box = await hero.boundingBox();
        if (box) {
          await page.screenshot({
            path: path.join(dir, '03-hero.png'),
            clip: { x: 0, y: Math.max(0, Math.floor(box.y)), width: 375, height: Math.min(500, Math.ceil(box.height)) }
          });
        }
      }

      // 05-product-card.png
      const card = await page.$('.product-tile, .product_card, [class*="product-card"], .product, .splide__slide [class*="product"]');
      if (card) {
        await card.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
        const box = await card.boundingBox();
        if (box) {
          await page.screenshot({
            path: path.join(dir, '05-product-card.png'),
            clip: { x: Math.max(0, Math.floor(box.x)), y: Math.max(0, Math.floor(box.y)), width: Math.min(375, Math.ceil(box.width)), height: Math.min(600, Math.ceil(box.height)) }
          });
        }
      }

      // 06-category-tiles.png
      const tiles = await page.$('.carousel_collections, .carousel_tile, [class*="collection"], [class*="carousel"]');
      if (tiles) {
        await tiles.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
        const box = await tiles.boundingBox();
        if (box) {
          await page.screenshot({
            path: path.join(dir, '06-category-tiles.png'),
            clip: { x: 0, y: Math.max(0, Math.floor(box.y)), width: 375, height: Math.min(450, Math.ceil(box.height)) }
          });
        }
      }

      // 07-promo-tiles.png
      const promo = await page.$('.bnpl-banner, .carousel_fun, [class*="promo"], [class*="banner"]');
      if (promo) {
        await promo.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
        const box = await promo.boundingBox();
        if (box) {
          await page.screenshot({
            path: path.join(dir, '07-promo-tiles.png'),
            clip: { x: 0, y: Math.max(0, Math.floor(box.y)), width: 375, height: Math.min(400, Math.ceil(box.height)) }
          });
        }
      }

      // 08-offers.png
      const offers = await page.$('.carousel_sale_tile, [class*="sale"], [class*="offer"]');
      if (offers) {
        await offers.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
        const box = await offers.boundingBox();
        if (box) {
          await page.screenshot({
            path: path.join(dir, '08-offers.png'),
            clip: { x: 0, y: Math.max(0, Math.floor(box.y)), width: 375, height: Math.min(450, Math.ceil(box.height)) }
          });
        }
      }

      // 09-footer.png
      const footer = await page.$('footer, .footer, [role="contentinfo"]');
      if (footer) {
        await footer.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
        const box = await footer.boundingBox();
        if (box) {
          await page.screenshot({
            path: path.join(dir, '09-footer.png'),
            clip: { x: 0, y: Math.max(0, Math.floor(box.y)), width: 375, height: Math.min(900, Math.ceil(box.height)) }
          });
        }
      }

      // 04-nav-open.png
      await page.evaluate(() => {
        window.scrollTo(0, 0);
        const burger = document.querySelector('.header__hamburger, .menu-toggle, button.hamburger, [aria-label*="menu" i], .nav-toggle, #menu-toggle');
        if (burger) burger.click();
        const menu = document.querySelector('.menu, .nav, .header__nav, .nav-menu');
        if (menu) menu.style.display = 'block';
      });
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(dir, '04-nav-open.png') });

    } else if (vp.name === '768') {
      await page.screenshot({ path: path.join(dir, '00-fullpage.png'), fullPage: true });
      await page.evaluate(() => window.scrollTo(0, 0));
      const hero = await page.$('.hero, [class*="hero"], #splide03, .carousel_tile');
      if (hero) {
        const box = await hero.boundingBox();
        if (box) await page.screenshot({ path: path.join(dir, '01-hero.png'), clip: { x: 0, y: Math.max(0, Math.floor(box.y)), width: 768, height: Math.min(550, Math.ceil(box.height)) } });
      }
      const grid = await page.$('.carousel_sale_tile, [class*="product-grid"], [class*="splide--loop"]');
      if (grid) {
        await grid.scrollIntoViewIfNeeded();
        const box = await grid.boundingBox();
        if (box) await page.screenshot({ path: path.join(dir, '02-product-grid.png'), clip: { x: 0, y: Math.max(0, Math.floor(box.y)), width: 768, height: Math.min(600, Math.ceil(box.height)) } });
      }

    } else if (vp.name === '1440') {
      await page.screenshot({ path: path.join(dir, '00-fullpage.png'), fullPage: true });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: path.join(dir, '01-header-nav.png'), clip: { x: 0, y: 0, width: 1440, height: 160 } });
      const hero = await page.$('.hero, [class*="hero"], #splide03, .carousel_tile');
      if (hero) {
        const box = await hero.boundingBox();
        if (box) await page.screenshot({ path: path.join(dir, '02-hero.png'), clip: { x: 0, y: Math.max(0, Math.floor(box.y)), width: 1440, height: Math.min(600, Math.ceil(box.height)) } });
      }
      const grid = await page.$('.carousel_sale_tile, [class*="product-grid"], [class*="splide--loop"]');
      if (grid) {
        await grid.scrollIntoViewIfNeeded();
        const box = await grid.boundingBox();
        if (box) await page.screenshot({ path: path.join(dir, '03-product-grid.png'), clip: { x: 0, y: Math.max(0, Math.floor(box.y)), width: 1440, height: Math.min(600, Math.ceil(box.height)) } });
      }
      const cat = await page.$('.carousel_collections, [class*="category-tile"], .carousel_tile');
      if (cat) {
        await cat.scrollIntoViewIfNeeded();
        const box = await cat.boundingBox();
        if (box) await page.screenshot({ path: path.join(dir, '04-category-tiles.png'), clip: { x: 0, y: Math.max(0, Math.floor(box.y)), width: 1440, height: Math.min(450, Math.ceil(box.height)) } });
      }
    }

    await context.close();
  }

  await browser.close();
  console.log('Clean Smiggle screenshots captured!');
}

captureSmiggleClean();
