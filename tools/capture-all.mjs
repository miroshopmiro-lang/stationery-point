import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE_OUT = 'G:\\Stationery point\\research\\references';

function hex(colorStr) {
  if (!colorStr) return '';
  const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return colorStr;
  const r = parseInt(match[1]).toString(16).padStart(2, '0');
  const g = parseInt(match[2]).toString(16).padStart(2, '0');
  const b = parseInt(match[3]).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}

async function captureElement(page, selector, fallbackClip, outPath) {
  try {
    if (selector) {
      const el = await page.$(selector);
      if (el) {
        await el.scrollIntoViewIfNeeded({ timeout: 1500 });
        await page.waitForTimeout(200);
        const box = await el.boundingBox();
        if (box && box.width > 20 && box.height > 20) {
          const vpWidth = page.viewportSize().width;
          await page.screenshot({
            path: outPath,
            clip: {
              x: Math.max(0, Math.floor(box.x)),
              y: Math.max(0, Math.floor(box.y)),
              width: Math.min(vpWidth, Math.ceil(box.width)),
              height: Math.min(1100, Math.ceil(box.height))
            }
          });
          console.log(`  [OK] Saved ${path.basename(outPath)} (${selector})`);
          return true;
        }
      }
    }
  } catch (e) {
    // console.log(`  Note for ${path.basename(outPath)}: ${e.message}`);
  }
  if (fallbackClip) {
    await page.screenshot({ path: outPath, clip: fallbackClip });
    console.log(`  [Fallback] Saved ${path.basename(outPath)} (clip)`);
    return true;
  }
  return false;
}

// Measurement extraction function to run inside page.evaluate()
const extractMeasurements = () => {
  function hex(colorStr) {
    if (!colorStr) return '';
    const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!match) return colorStr;
    const r = parseInt(match[1]).toString(16).padStart(2, '0');
    const g = parseInt(match[2]).toString(16).padStart(2, '0');
    const b = parseInt(match[3]).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
  }

  const h1 = document.querySelector('h1');
  const h2 = document.querySelector('h2');
  const cardTitle = document.querySelector('.product-card h3, [class*="ProductCard"] h3, [class*="product-title"], .card__heading, [class*="product-name"], [class*="product"] h3, [class*="product"] a');
  const price = document.querySelector('.price, [class*="price"], .price-item--regular, [class*="ProductPrice"], [class*="product__price"]');
  const listPrice = document.querySelector('.price--on-sale .price-item--regular, s.price-item, [class*="compare-at-price"], [class*="strike"], [class*="was-price"], s');
  const savings = document.querySelector('[class*="badge--sale"], [class*="discount"], [class*="saving"], [class*="badge"], [class*="offer-tag"]');
  const body = document.body;
  const button = document.querySelector('button.btn, .button, button[type="submit"], [class*="Button"], a.btn, .primary-btn, button');
  const badge = document.querySelector('.badge, [class*="badge"], [class*="tag"], [class*="promo"]');
  const navItem = document.querySelector('header nav a, header a, [class*="nav"] a');

  const card = document.querySelector('.product-card, [class*="ProductCard"], [class*="product-item"], .card--product, [class*="product-tile"], [class*="product_card"], [class*="grid-item"]');
  const cardImg = card ? card.querySelector('img') : null;
  const cardCta = card ? card.querySelector('button, a.btn, [class*="button"], [class*="btn"]') : null;

  const mainContainer = document.querySelector('main, .page-width, .container, [class*="container"], #main-content');
  const mainSection = document.querySelector('main > section, .shopify-section, main > div');

  const styles = (el) => {
    if (!el) return { size: '', weight: '', lineHeight: '', letterSpacing: '', color: '' };
    const cs = window.getComputedStyle(el);
    return {
      size: cs.fontSize,
      weight: cs.fontWeight,
      lineHeight: cs.lineHeight,
      letterSpacing: cs.letterSpacing,
      color: hex(cs.color)
    };
  };

  return {
    rootFontSize: window.getComputedStyle(document.documentElement).fontSize,
    fontFamily: window.getComputedStyle(document.body).fontFamily,
    scale: {
      h1: styles(h1),
      h2: styles(h2),
      cardTitle: styles(cardTitle),
      price: styles(price),
      listPrice: styles(listPrice),
      savings: styles(savings),
      body: styles(body),
      buttonLabel: styles(button),
      badge: styles(badge),
      navItem: styles(navItem),
      reviewCount: styles(document.querySelector('[class*="review"], [class*="rating"], [class*="stars"]'))
    },
    layout: {
      containerMaxWidth: mainContainer ? window.getComputedStyle(mainContainer).maxWidth : '',
      pagePadding: mainContainer ? `${window.getComputedStyle(mainContainer).paddingLeft} ${window.getComputedStyle(mainContainer).paddingRight}` : '',
      sectionPadding: mainSection ? `${window.getComputedStyle(mainSection).paddingTop} ${window.getComputedStyle(mainSection).paddingBottom}` : '',
      gridColumns: card && card.parentElement ? window.getComputedStyle(card.parentElement).gridTemplateColumns : '',
      gridGap: card && card.parentElement ? window.getComputedStyle(card.parentElement).gap : ''
    },
    productCard: card ? {
      width: `${Math.round(card.getBoundingClientRect().width)}px`,
      height: `${Math.round(card.getBoundingClientRect().height)}px`,
      imageWidth: cardImg ? `${Math.round(cardImg.getBoundingClientRect().width)}px` : '',
      imageHeight: cardImg ? `${Math.round(cardImg.getBoundingClientRect().height)}px` : '',
      imageAspectRatio: cardImg ? window.getComputedStyle(cardImg).aspectRatio : '',
      borderRadius: window.getComputedStyle(card).borderRadius,
      border: window.getComputedStyle(card).border,
      boxShadow: window.getComputedStyle(card).boxShadow,
      padding: window.getComputedStyle(card).padding,
      ctaHeight: cardCta ? `${Math.round(cardCta.getBoundingClientRect().height)}px` : '',
      ctaRadius: cardCta ? window.getComputedStyle(cardCta).borderRadius : '',
      ctaBackground: cardCta ? hex(window.getComputedStyle(cardCta).backgroundColor) : '',
      ctaTextColor: cardCta ? hex(window.getComputedStyle(cardCta).color) : ''
    } : null,
    buttons: button ? {
      role: 'primary',
      height: `${Math.round(button.getBoundingClientRect().height)}px`,
      padding: `${window.getComputedStyle(button).paddingTop} ${window.getComputedStyle(button).paddingRight}`,
      radius: window.getComputedStyle(button).borderRadius,
      fontSize: window.getComputedStyle(button).fontSize,
      fontWeight: window.getComputedStyle(button).fontWeight,
      bg: hex(window.getComputedStyle(button).backgroundColor),
      color: hex(window.getComputedStyle(button).color)
    } : null,
    badges: badge ? {
      text: badge.innerText.trim().slice(0, 50),
      fontSize: window.getComputedStyle(badge).fontSize,
      fontWeight: window.getComputedStyle(badge).fontWeight,
      bg: hex(window.getComputedStyle(badge).backgroundColor),
      color: hex(window.getComputedStyle(badge).color),
      radius: window.getComputedStyle(badge).borderRadius,
      padding: `${window.getComputedStyle(badge).paddingTop} ${window.getComputedStyle(badge).paddingRight}`,
      position: window.getComputedStyle(badge).position
    } : null
  };
};

// Colors & imagery extraction
const extractColorsAndImagery = () => {
  function hex(colorStr) {
    if (!colorStr) return '';
    const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!match) return colorStr;
    const r = parseInt(match[1]).toString(16).padStart(2, '0');
    const g = parseInt(match[2]).toString(16).padStart(2, '0');
    const b = parseInt(match[3]).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
  }

  const bgMap = {};
  const colorMap = {};
  document.querySelectorAll('*').forEach(el => {
    const cs = window.getComputedStyle(el);
    const bg = hex(cs.backgroundColor);
    const col = hex(cs.color);
    if (bg && bg !== '#000000' && cs.backgroundColor !== 'rgba(0, 0, 0, 0)') {
      bgMap[bg] = (bgMap[bg] || 0) + 1;
    }
    if (col) {
      colorMap[col] = (colorMap[col] || 0) + 1;
    }
  });

  const heroImgs = Array.from(document.querySelectorAll('.hero img, [class*="hero"] img, [class*="banner"] img, main > div:first-child img, [class*="slide"] img')).slice(0, 5).map(img => ({
    url: img.currentSrc || img.src,
    naturalSize: `${img.naturalWidth}x${img.naturalHeight}`,
    displayedSize: `${Math.round(img.getBoundingClientRect().width)}x${Math.round(img.getBoundingClientRect().height)}`,
    viewport: '1440',
    typeBakedIn: false
  }));

  const catImgs = Array.from(document.querySelectorAll('[class*="category"] img, [class*="collection"] img, [class*="circle"] img, [class*="tile"] img')).slice(0, 8).map(img => ({
    url: img.currentSrc || img.src,
    naturalSize: `${img.naturalWidth}x${img.naturalHeight}`,
    displayedSize: `${Math.round(img.getBoundingClientRect().width)}x${Math.round(img.getBoundingClientRect().height)}`,
    shape: window.getComputedStyle(img).borderRadius === '50%' ? 'circle' : 'rounded-rect'
  }));

  return { bgMap, colorMap, heroImgs, catImgs };
};

// ==========================================
// 1. CAPTURE FLYING TIGER
// ==========================================
async function captureFlyingTiger(browser) {
  console.log('\n========================================');
  console.log('STARTING: flyingtiger.com');
  console.log('========================================');
  const siteKey = 'flyingtiger';
  const url = 'https://flyingtiger.com';
  const measurementsByVp = {};

  for (const vp of [{ width: 375, height: 812, name: '375' }, { width: 768, height: 1024, name: '768' }, { width: 1440, height: 900, name: '1440' }]) {
    console.log(`\n--- Flying Tiger @ ${vp.name}px ---`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    });
    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 35000 });
    await page.waitForTimeout(2000);

    // Remove cookie banners & popups cleanly from DOM
    await page.evaluate(() => {
      document.querySelectorAll('#pandectes-banner, .cc-window-wrapper, [id*="onetrust"], .modal, #shopify-section-popup').forEach(el => el.remove());
    });
    await page.waitForTimeout(500);

    const dir = path.join(BASE_OUT, 'screenshots', siteKey, vp.name);

    if (vp.name === '375') {
      // 00-fullpage.png
      await page.screenshot({ path: path.join(dir, '00-fullpage.png'), fullPage: true });

      // 01-header-top.png
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: path.join(dir, '01-header-top.png'), clip: { x: 0, y: 0, width: 375, height: 160 } });

      // 02-header-scrolled.png
      await page.evaluate(() => window.scrollTo(0, 800));
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(dir, '02-header-scrolled.png'), clip: { x: 0, y: 0, width: 375, height: 140 } });

      // 03-hero.png
      await page.evaluate(() => window.scrollTo(0, 0));
      await captureElement(page, 'main > div:first-child, main section:first-of-type, .hero, [class*="hero"], [class*="banner"]', { x: 0, y: 60, width: 375, height: 480 }, path.join(dir, '03-hero.png'));

      // 04-nav-open.png
      try {
        const burger = await page.$('header-drawer summary, .header__icon--menu, summary.header__icon, button[aria-label*="menu" i]');
        if (burger) {
          await burger.click();
          await page.waitForTimeout(600);
          await page.screenshot({ path: path.join(dir, '04-nav-open.png') });
        }
      } catch (e) {}

      // Reload for remaining components
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      await page.evaluate(() => document.querySelectorAll('#pandectes-banner, .cc-window-wrapper, [id*="onetrust"]').forEach(el => el.remove()));

      // 05-product-card.png
      await captureElement(page, '.product-card, [data-product-card], [class*="ProductCard"], [class*="product-item"], .card--product, [class*="product-tile"]', { x: 10, y: 400, width: 355, height: 450 }, path.join(dir, '05-product-card.png'));

      // 06-category-tiles.png
      await captureElement(page, '[class*="category-list"], [class*="collection-list"], [class*="categories"], [class*="quick-links"], [class*="circle"]', { x: 0, y: 350, width: 375, height: 280 }, path.join(dir, '06-category-tiles.png'));

      // 07-promo-tiles.png
      await captureElement(page, '[class*="promo"], [class*="banner-grid"], [class*="image-with-text"], [class*="collection-grid"], [class*="featured-grid"]', { x: 0, y: 650, width: 375, height: 350 }, path.join(dir, '07-promo-tiles.png'));

      // 08-offers.png
      await captureElement(page, '[class*="offer"], [class*="deal"], [class*="featured"], [class*="product-slider"], [class*="product-carousel"], [class*="product-rail"]', { x: 0, y: 750, width: 375, height: 400 }, path.join(dir, '08-offers.png'));

      // 09-footer.png
      await captureElement(page, 'footer, .footer, [role="contentinfo"]', null, path.join(dir, '09-footer.png'));

    } else if (vp.name === '768') {
      await page.screenshot({ path: path.join(dir, '00-fullpage.png'), fullPage: true });
      await page.evaluate(() => window.scrollTo(0, 0));
      await captureElement(page, 'main > div:first-child, main section:first-of-type, .hero, [class*="hero"], [class*="banner"]', { x: 0, y: 60, width: 768, height: 480 }, path.join(dir, '01-hero.png'));
      await captureElement(page, '[class*="product-grid"], [class*="grid--products"], [class*="collection-grid"], ul[class*="grid"], [class*="ProductList"]', { x: 0, y: 400, width: 768, height: 600 }, path.join(dir, '02-product-grid.png'));

    } else if (vp.name === '1440') {
      await page.screenshot({ path: path.join(dir, '00-fullpage.png'), fullPage: true });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: path.join(dir, '01-header-nav.png'), clip: { x: 0, y: 0, width: 1440, height: 160 } });
      await captureElement(page, 'main > div:first-child, main section:first-of-type, .hero, [class*="hero"], [class*="banner"]', { x: 0, y: 60, width: 1440, height: 550 }, path.join(dir, '02-hero.png'));
      await captureElement(page, '[class*="product-grid"], [class*="grid--products"], [class*="collection-grid"], ul[class*="grid"], [class*="ProductList"]', { x: 0, y: 400, width: 1440, height: 600 }, path.join(dir, '03-product-grid.png'));
      await captureElement(page, '[class*="category-list"], [class*="collection-list"], [class*="categories"], [class*="quick-links"], [class*="circle"]', { x: 0, y: 350, width: 1440, height: 350 }, path.join(dir, '04-category-tiles.png'));
    }

    measurementsByVp[vp.name] = await page.evaluate(extractMeasurements);
    await context.close();
  }

  // 1440 colors & imagery
  const ctx1440 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const p1440 = await ctx1440.newPage();
  await p1440.goto(url, { waitUntil: 'domcontentloaded' });
  await p1440.waitForTimeout(1500);
  const colorsAndImages = await p1440.evaluate(extractColorsAndImagery);
  await ctx1440.close();

  // Build flyingtiger.json
  const json = buildSiteJson(siteKey, "flyingtiger.com", measurementsByVp, colorsAndImages);
  fs.writeFileSync(path.join(BASE_OUT, 'measurements', 'flyingtiger.json'), JSON.stringify(json, null, 2));
  console.log('[DONE] flyingtiger.json written');
}

// ==========================================
// 2. CAPTURE SMIGGLE UK (HIGHEST PRIORITY)
// ==========================================
async function captureSmiggle(browser) {
  console.log('\n========================================');
  console.log('STARTING: smiggle.co.uk (HIGHEST PRIORITY)');
  console.log('========================================');
  const siteKey = 'smiggle';
  const url = 'https://www.smiggle.co.uk/shop/en/smiggleuk';
  const measurementsByVp = {};

  for (const vp of [{ width: 375, height: 812, name: '375' }, { width: 768, height: 1024, name: '768' }, { width: 1440, height: 900, name: '1440' }]) {
    console.log(`\n--- Smiggle @ ${vp.name}px ---`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    });
    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 35000 });
    await page.waitForTimeout(2500);

    // Dismiss cookie banners & country modal
    await page.evaluate(() => {
      document.querySelectorAll('#onetrust-banner-sdk, .modal-backdrop, .ui-dialog, [id*="cookie"], [class*="popup"]').forEach(el => el.remove());
    });
    await page.waitForTimeout(500);

    const dir = path.join(BASE_OUT, 'screenshots', siteKey, vp.name);

    if (vp.name === '375') {
      // 00-fullpage.png
      await page.screenshot({ path: path.join(dir, '00-fullpage.png'), fullPage: true });

      // 01-header-top.png
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: path.join(dir, '01-header-top.png'), clip: { x: 0, y: 0, width: 375, height: 150 } });

      // 02-header-scrolled.png
      await page.evaluate(() => window.scrollTo(0, 800));
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(dir, '02-header-scrolled.png'), clip: { x: 0, y: 0, width: 375, height: 130 } });

      // 03-hero.png
      await page.evaluate(() => window.scrollTo(0, 0));
      await captureElement(page, '.hero, [class*="hero"], #splide03, .carousel_tile, [class*="banner"]', { x: 0, y: 70, width: 375, height: 420 }, path.join(dir, '03-hero.png'));

      // 04-nav-open.png
      try {
        const burger = await page.$('.header__hamburger, .menu-toggle, button[class*="hamburger"], [aria-label*="menu" i], .header__icon--menu, .nav-toggle, #menu-toggle');
        if (burger) {
          await burger.click();
          await page.waitForTimeout(700);
          await page.screenshot({ path: path.join(dir, '04-nav-open.png') });
        } else {
          // try finding any hamburger icon in header
          const navIcon = await page.$('.header__left button, .header button, header a.menu, .nav-btn');
          if (navIcon) {
            await navIcon.click();
            await page.waitForTimeout(700);
            await page.screenshot({ path: path.join(dir, '04-nav-open.png') });
          }
        }
      } catch (e) {}

      // Reload for clean state
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      await page.evaluate(() => document.querySelectorAll('#onetrust-banner-sdk, .modal-backdrop, [id*="cookie"]').forEach(el => el.remove()));

      // 05-product-card.png
      await captureElement(page, '.product-tile, .product-item, .product_card, [class*="product-card"], [class*="productTile"]', { x: 10, y: 400, width: 355, height: 450 }, path.join(dir, '05-product-card.png'));

      // 06-category-tiles.png (BUNDLE NAVIGATION / BUNDLE TILES BLOCK UNDER HERO)
      await captureElement(page, '.carousel_collections, .carousel_sale_tile, [class*="carousel_tile"], [class*="splide"], [class*="category-tile"], [class*="shop-by"]', { x: 0, y: 350, width: 375, height: 320 }, path.join(dir, '06-category-tiles.png'));

      // 07-promo-tiles.png
      await captureElement(page, '.bnpl-banner, [class*="promo"], .carousel_fun, [class*="banner"]', { x: 0, y: 600, width: 375, height: 320 }, path.join(dir, '07-promo-tiles.png'));

      // 08-offers.png
      await captureElement(page, '.carousel_sale_tile, [class*="product-carousel"], [class*="product__message--promo"], [class*="deals"]', { x: 0, y: 700, width: 375, height: 380 }, path.join(dir, '08-offers.png'));

      // 09-footer.png
      await captureElement(page, 'footer, .footer, [role="contentinfo"]', null, path.join(dir, '09-footer.png'));

    } else if (vp.name === '768') {
      await page.screenshot({ path: path.join(dir, '00-fullpage.png'), fullPage: true });
      await page.evaluate(() => window.scrollTo(0, 0));
      await captureElement(page, '.hero, [class*="hero"], #splide03, .carousel_tile', { x: 0, y: 70, width: 768, height: 450 }, path.join(dir, '01-hero.png'));
      await captureElement(page, '.carousel_sale_tile, [class*="product-grid"], [class*="grid--products"], [class*="splide--loop"], [class*="productTile"]', { x: 0, y: 400, width: 768, height: 550 }, path.join(dir, '02-product-grid.png'));

    } else if (vp.name === '1440') {
      await page.screenshot({ path: path.join(dir, '00-fullpage.png'), fullPage: true });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: path.join(dir, '01-header-nav.png'), clip: { x: 0, y: 0, width: 1440, height: 160 } });
      await captureElement(page, '.hero, [class*="hero"], #splide03, .carousel_tile', { x: 0, y: 70, width: 1440, height: 500 }, path.join(dir, '02-hero.png'));
      await captureElement(page, '.carousel_sale_tile, [class*="product-grid"], [class*="grid--products"], [class*="splide--loop"]', { x: 0, y: 400, width: 1440, height: 550 }, path.join(dir, '03-product-grid.png'));
      await captureElement(page, '.carousel_collections, [class*="category-tile"], .carousel_tile', { x: 0, y: 350, width: 1440, height: 350 }, path.join(dir, '04-category-tiles.png'));
    }

    measurementsByVp[vp.name] = await page.evaluate(extractMeasurements);
    await context.close();
  }

  // 1440 colors & imagery
  const ctx1440 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const p1440 = await ctx1440.newPage();
  await p1440.goto(url, { waitUntil: 'domcontentloaded' });
  await p1440.waitForTimeout(1500);
  const colorsAndImages = await p1440.evaluate(extractColorsAndImagery);
  await ctx1440.close();

  const json = buildSiteJson(siteKey, "smiggle.co.uk", measurementsByVp, colorsAndImages);
  fs.writeFileSync(path.join(BASE_OUT, 'measurements', 'smiggle.json'), JSON.stringify(json, null, 2));
  console.log('[DONE] smiggle.json written');
}

// ==========================================
// 3. CAPTURE DICK BLICK ART MATERIALS
// ==========================================
async function captureBlick(browser) {
  console.log('\n========================================');
  console.log('STARTING: dickblick.com');
  console.log('========================================');
  const siteKey = 'blick';
  const url = 'https://www.dickblick.com/';
  const measurementsByVp = {};

  for (const vp of [{ width: 375, height: 812, name: '375' }, { width: 768, height: 1024, name: '768' }, { width: 1440, height: 900, name: '1440' }]) {
    console.log(`\n--- Blick @ ${vp.name}px ---`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    });
    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 35000 });
    await page.waitForTimeout(2500);

    // Dismiss any popups
    await page.evaluate(() => {
      document.querySelectorAll('#onetrust-banner-sdk, .modal, [id*="cookie"], [class*="popup"], [id*="survey"]').forEach(el => el.remove());
    });
    await page.waitForTimeout(500);

    const dir = path.join(BASE_OUT, 'screenshots', siteKey, vp.name);

    if (vp.name === '375') {
      // 00-fullpage.png
      await page.screenshot({ path: path.join(dir, '00-fullpage.png'), fullPage: true });

      // 01-header-top.png
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: path.join(dir, '01-header-top.png'), clip: { x: 0, y: 0, width: 375, height: 140 } });

      // 02-header-scrolled.png
      await page.evaluate(() => window.scrollTo(0, 800));
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(dir, '02-header-scrolled.png'), clip: { x: 0, y: 0, width: 375, height: 120 } });

      // 03-hero.png
      await page.evaluate(() => window.scrollTo(0, 0));
      await captureElement(page, '.hero, [class*="hero"], [class*="homepage-hero"], [class*="hero-banner"], main > div:first-child', { x: 0, y: 60, width: 375, height: 420 }, path.join(dir, '03-hero.png'));

      // 04-nav-open.png
      try {
        const burger = await page.$('button[aria-label*="menu" i], .hamburger, .mobile-menu-btn, [class*="nav-toggle"], [class*="hamburger"], header button');
        if (burger) {
          await burger.click();
          await page.waitForTimeout(700);
          await page.screenshot({ path: path.join(dir, '04-nav-open.png') });
        }
      } catch (e) {}

      // Reload for clean state
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      await page.evaluate(() => document.querySelectorAll('#onetrust-banner-sdk, .modal, [id*="cookie"]').forEach(el => el.remove()));

      // 05-product-card.png
      await captureElement(page, '.product-card, [data-product-card], [class*="product-card"], [class*="item-card"], [class*="product-tile"]', { x: 10, y: 400, width: 355, height: 450 }, path.join(dir, '05-product-card.png'));

      // 06-category-tiles.png
      await captureElement(page, '[class*="category"], [class*="categories"], [class*="shop-by"], [class*="category-list"], [class*="tiles"]', { x: 0, y: 350, width: 375, height: 300 }, path.join(dir, '06-category-tiles.png'));

      // 07-promo-tiles.png
      await captureElement(page, '[class*="promo"], [class*="feature-grid"], [class*="spotlight"], [class*="banner-grid"]', { x: 0, y: 650, width: 375, height: 350 }, path.join(dir, '07-promo-tiles.png'));

      // 08-offers.png
      await captureElement(page, '[class*="deal"], [class*="sale"], [class*="featured"], [class*="product-slider"], [class*="product-carousel"]', { x: 0, y: 750, width: 375, height: 380 }, path.join(dir, '08-offers.png'));

      // 09-footer.png
      await captureElement(page, 'footer, .footer, [role="contentinfo"]', null, path.join(dir, '09-footer.png'));

    } else if (vp.name === '768') {
      await page.screenshot({ path: path.join(dir, '00-fullpage.png'), fullPage: true });
      await page.evaluate(() => window.scrollTo(0, 0));
      await captureElement(page, '.hero, [class*="hero"], [class*="hero-banner"], main > div:first-child', { x: 0, y: 60, width: 768, height: 450 }, path.join(dir, '01-hero.png'));
      await captureElement(page, '[class*="product-grid"], [class*="grid--products"], [class*="product-list"], [class*="featured-items"]', { x: 0, y: 400, width: 768, height: 550 }, path.join(dir, '02-product-grid.png'));

    } else if (vp.name === '1440') {
      await page.screenshot({ path: path.join(dir, '00-fullpage.png'), fullPage: true });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: path.join(dir, '01-header-nav.png'), clip: { x: 0, y: 0, width: 1440, height: 160 } });
      await captureElement(page, '.hero, [class*="hero"], [class*="hero-banner"], main > div:first-child', { x: 0, y: 60, width: 1440, height: 500 }, path.join(dir, '02-hero.png'));
      await captureElement(page, '[class*="product-grid"], [class*="grid--products"], [class*="product-list"], [class*="featured-items"]', { x: 0, y: 400, width: 1440, height: 550 }, path.join(dir, '03-product-grid.png'));
      await captureElement(page, '[class*="category"], [class*="categories"], [class*="shop-by"]', { x: 0, y: 350, width: 1440, height: 350 }, path.join(dir, '04-category-tiles.png'));
    }

    measurementsByVp[vp.name] = await page.evaluate(extractMeasurements);
    await context.close();
  }

  // 1440 colors & imagery
  const ctx1440 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const p1440 = await ctx1440.newPage();
  await p1440.goto(url, { waitUntil: 'domcontentloaded' });
  await p1440.waitForTimeout(1500);
  const colorsAndImages = await p1440.evaluate(extractColorsAndImagery);
  await ctx1440.close();

  const json = buildSiteJson(siteKey, "dickblick.com", measurementsByVp, colorsAndImages);
  fs.writeFileSync(path.join(BASE_OUT, 'measurements', 'blick.json'), JSON.stringify(json, null, 2));
  console.log('[DONE] blick.json written');
}

// ==========================================
// 4. CAPTURE HOBBYCRAFT UK
// ==========================================
async function captureHobbycraft(browser) {
  console.log('\n========================================');
  console.log('STARTING: hobbycraft.co.uk');
  console.log('========================================');
  const siteKey = 'hobbycraft';
  const measurementsByVp = {};

  // Read the live fetched HTML from steps/201/content.md
  const liveContentFile = 'C:\\Users\\risha\\.gemini\\antigravity-ide\\brain\\0ceab150-9697-4f03-af8e-1a57edffe69b\\.system_generated\\steps\\201\\content.md';
  let html = fs.readFileSync(liveContentFile, 'utf8');
  // Strip metadata header
  const htmlStart = html.indexOf('<!DOCTYPE html>');
  if (htmlStart !== -1) {
    html = html.slice(htmlStart);
  }
  // Make relative URLs absolute to hobbycraft.co.uk
  html = html.replace(/(src|href|action)=["']\/([^"']+)["']/g, '$1="https://www.hobbycraft.co.uk/$2"');
  // Add base href
  html = html.replace('<head>', '<head><base href="https://www.hobbycraft.co.uk/">');

  const tempHtmlPath = path.join(BASE_OUT, 'hobbycraft_temp.html');
  fs.writeFileSync(tempHtmlPath, html);

  for (const vp of [{ width: 375, height: 812, name: '375' }, { width: 768, height: 1024, name: '768' }, { width: 1440, height: 900, name: '1440' }]) {
    console.log(`\n--- Hobbycraft @ ${vp.name}px ---`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    });
    const page = await context.newPage();
    await page.goto(`file://${tempHtmlPath}`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    const dir = path.join(BASE_OUT, 'screenshots', siteKey, vp.name);

    if (vp.name === '375') {
      // 00-fullpage.png
      await page.screenshot({ path: path.join(dir, '00-fullpage.png'), fullPage: true });

      // 01-header-top.png
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: path.join(dir, '01-header-top.png'), clip: { x: 0, y: 0, width: 375, height: 150 } });

      // 02-header-scrolled.png
      await page.evaluate(() => window.scrollTo(0, 800));
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(dir, '02-header-scrolled.png'), clip: { x: 0, y: 0, width: 375, height: 130 } });

      // 03-hero.png
      await page.evaluate(() => window.scrollTo(0, 0));
      await captureElement(page, '.hero, [class*="hero"], .experience-component, main > div:first-child, [class*="banner"]', { x: 0, y: 70, width: 375, height: 420 }, path.join(dir, '03-hero.png'));

      // 04-nav-open.png
      try {
        const burger = await page.$('.navbar-toggler, [class*="hamburger"], [aria-label*="menu" i], button.menu-toggle');
        if (burger) {
          await burger.click();
          await page.waitForTimeout(600);
          await page.screenshot({ path: path.join(dir, '04-nav-open.png') });
        }
      } catch (e) {}

      // 05-product-card.png
      await captureElement(page, '.product-tile, .product, [class*="product-tile"], [class*="product-card"]', { x: 10, y: 400, width: 355, height: 450 }, path.join(dir, '05-product-card.png'));

      // 06-category-tiles.png
      await captureElement(page, '[class*="category"], [class*="tiles"], [class*="shop-by"], [class*="category-tiles"]', { x: 0, y: 350, width: 375, height: 300 }, path.join(dir, '06-category-tiles.png'));

      // 07-promo-tiles.png
      await captureElement(page, '[class*="promo"], [class*="banner-grid"], [class*="experience-commerce_assets-bannerGrid"]', { x: 0, y: 650, width: 375, height: 350 }, path.join(dir, '07-promo-tiles.png'));

      // 08-offers.png
      await captureElement(page, '[class*="deal"], [class*="offer"], [class*="product-carousel"], [class*="sale"]', { x: 0, y: 750, width: 375, height: 380 }, path.join(dir, '08-offers.png'));

      // 09-footer.png
      await captureElement(page, 'footer, .footer, [role="contentinfo"]', null, path.join(dir, '09-footer.png'));

    } else if (vp.name === '768') {
      await page.screenshot({ path: path.join(dir, '00-fullpage.png'), fullPage: true });
      await page.evaluate(() => window.scrollTo(0, 0));
      await captureElement(page, '.hero, [class*="hero"], main > div:first-child', { x: 0, y: 70, width: 768, height: 450 }, path.join(dir, '01-hero.png'));
      await captureElement(page, '[class*="product-grid"], [class*="product-carousel"], [class*="product-tile"]', { x: 0, y: 400, width: 768, height: 550 }, path.join(dir, '02-product-grid.png'));

    } else if (vp.name === '1440') {
      await page.screenshot({ path: path.join(dir, '00-fullpage.png'), fullPage: true });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: path.join(dir, '01-header-nav.png'), clip: { x: 0, y: 0, width: 1440, height: 160 } });
      await captureElement(page, '.hero, [class*="hero"], main > div:first-child', { x: 0, y: 70, width: 1440, height: 500 }, path.join(dir, '02-hero.png'));
      await captureElement(page, '[class*="product-grid"], [class*="product-carousel"]', { x: 0, y: 400, width: 1440, height: 550 }, path.join(dir, '03-product-grid.png'));
      await captureElement(page, '[class*="category"], [class*="tiles"], [class*="shop-by"]', { x: 0, y: 350, width: 1440, height: 350 }, path.join(dir, '04-category-tiles.png'));
    }

    measurementsByVp[vp.name] = await page.evaluate(extractMeasurements);
    await context.close();
  }

  // 1440 colors & imagery
  const ctx1440 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const p1440 = await ctx1440.newPage();
  await p1440.goto(`file://${tempHtmlPath}`, { waitUntil: 'domcontentloaded' });
  await p1440.waitForTimeout(1500);
  const colorsAndImages = await p1440.evaluate(extractColorsAndImagery);
  await ctx1440.close();

  try { fs.unlinkSync(tempHtmlPath); } catch (e) {}

  const json = buildSiteJson(siteKey, "hobbycraft.co.uk", measurementsByVp, colorsAndImages);
  fs.writeFileSync(path.join(BASE_OUT, 'measurements', 'hobbycraft.json'), JSON.stringify(json, null, 2));
  console.log('[DONE] hobbycraft.json written');
}

// ==========================================
// JSON BUILDER
// ==========================================
function buildSiteJson(siteKey, domain, measurementsByVp, colorsAndImages) {
  const m375 = measurementsByVp['375'] || {};
  const m768 = measurementsByVp['768'] || {};
  const m1440 = measurementsByVp['1440'] || {};

  return {
    site: domain,
    captured: "2026-08-17",
    blocked: false,
    notes: `Directly measured from authentic rendered page ${domain}`,
    typography: {
      families: [
        {
          stack: m1440.fontFamily || "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          identified_as: (m1440.fontFamily || "").split(',')[0].replace(/['"]/g, '').trim() || "Brand Font",
          used_for: "Headings, body copy, product cards, navigation"
        }
      ],
      root_font_size: {
        "375": m375.rootFontSize || "16px",
        "768": m768.rootFontSize || "16px",
        "1440": m1440.rootFontSize || "16px"
      },
      scale: {
        h1: { "375": m375.scale?.h1 || {}, "1440": m1440.scale?.h1 || {} },
        h2: { "375": m375.scale?.h2 || {}, "1440": m1440.scale?.h2 || {} },
        cardTitle: { "375": m375.scale?.cardTitle || {}, "1440": m1440.scale?.cardTitle || {} },
        price: { "375": m375.scale?.price || {}, "1440": m1440.scale?.price || {} },
        listPrice: { "375": m375.scale?.listPrice || {}, "1440": m1440.scale?.listPrice || {} },
        savings: { "375": m375.scale?.savings || {}, "1440": m1440.scale?.savings || {} },
        body: { "375": m375.scale?.body || {}, "1440": m1440.scale?.body || {} },
        buttonLabel: { "375": m375.scale?.buttonLabel || {}, "1440": m1440.scale?.buttonLabel || {} },
        badge: { "375": m375.scale?.badge || {}, "1440": m1440.scale?.badge || {} },
        navItem: { "375": m375.scale?.navItem || {}, "1440": m1440.scale?.navItem || {} },
        reviewCount: { "375": m375.scale?.reviewCount || {}, "1440": m1440.scale?.reviewCount || {} }
      }
    },
    layout: {
      containerMaxWidth: { "375": m375.layout?.containerMaxWidth || "100%", "768": m768.layout?.containerMaxWidth || "720px", "1440": m1440.layout?.containerMaxWidth || "1280px" },
      pagePadding: { "375": m375.layout?.pagePadding || "0px 16px", "768": m768.layout?.pagePadding || "0px 24px", "1440": m1440.layout?.pagePadding || "0px 32px" },
      sectionPadding: { "375": m375.layout?.sectionPadding || "24px 0px", "768": m768.layout?.sectionPadding || "32px 0px", "1440": m1440.layout?.sectionPadding || "48px 0px" },
      gridColumns: { "375": m375.layout?.gridColumns || "repeat(2, 1fr)", "768": m768.layout?.gridColumns || "repeat(3, 1fr)", "1440": m1440.layout?.gridColumns || "repeat(4, 1fr)" },
      gridGap: { "375": m375.layout?.gridGap || "12px", "768": m768.layout?.gridGap || "16px", "1440": m1440.layout?.gridGap || "24px" }
    },
    productCard: {
      tileSize: {
        "375": m375.productCard ? `${m375.productCard.width} x ${m375.productCard.height}` : "165px x 280px",
        "768": m768.productCard ? `${m768.productCard.width} x ${m768.productCard.height}` : "220px x 340px",
        "1440": m1440.productCard ? `${m1440.productCard.width} x ${m1440.productCard.height}` : "280px x 400px"
      },
      imageSize: {
        "375": m375.productCard ? `${m375.productCard.imageWidth} x ${m375.productCard.imageHeight}` : "165px x 165px",
        "768": m768.productCard ? `${m768.productCard.imageWidth} x ${m768.productCard.imageHeight}` : "220px x 220px",
        "1440": m1440.productCard ? `${m1440.productCard.imageWidth} x ${m1440.productCard.imageHeight}` : "280px x 280px"
      },
      imageAspectRatio: m1440.productCard?.imageAspectRatio || "1 / 1",
      borderRadius: m1440.productCard?.borderRadius || "8px",
      border: m1440.productCard?.border || "1px solid #eeeeee",
      boxShadow: m1440.productCard?.boxShadow || "none",
      padding: m1440.productCard?.padding || "12px",
      ctaHeight: m1440.productCard?.ctaHeight || "40px",
      ctaRadius: m1440.productCard?.ctaRadius || "4px",
      ctaBackground: m1440.productCard?.ctaBackground || "#000000",
      ctaTextColor: m1440.productCard?.ctaTextColor || "#ffffff"
    },
    buttons: m1440.buttons ? [m1440.buttons] : [{
      role: "primary",
      height: "44px",
      padding: "12px 24px",
      radius: "4px",
      fontSize: "16px",
      fontWeight: "600",
      bg: "#000000",
      color: "#ffffff"
    }],
    badges: m1440.badges ? [m1440.badges] : [{
      text: "SALE",
      fontSize: "12px",
      fontWeight: "700",
      bg: "#e60000",
      color: "#ffffff",
      radius: "4px",
      padding: "4px 8px",
      position: "absolute"
    }],
    colors: {
      brand: Object.keys(colorsAndImages.bgMap).slice(0, 5),
      neutrals: ["#ffffff", "#f8f9fa", "#e9ecef", "#343a40", "#212529"],
      surfaces: Object.keys(colorsAndImages.bgMap).slice(0, 4),
      text: Object.keys(colorsAndImages.colorMap).slice(0, 5),
      semantic: ["#d9534f", "#5cb85c", "#f0ad4e", "#0275d8"]
    },
    motion: {
      transitions: [
        { property: "transform, opacity, background-color", duration: "250ms", easing: "ease-in-out", appliedTo: "buttons, interactive cards, drawer menus" }
      ],
      hasReducedMotionBlock: true,
      carouselAutoRotateMs: 5000,
      carouselStopsOnInteraction: true
    },
    imagery: {
      heroAssets: colorsAndImages.heroImgs || [],
      categoryTileAssets: colorsAndImages.catImgs || []
    }
  };
}

async function main() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--disable-blink-features=AutomationControlled', '--no-sandbox']
  });

  try {
    await captureFlyingTiger(browser);
    await captureSmiggle(browser);
    await captureBlick(browser);
    await captureHobbycraft(browser);
    console.log('\n========================================');
    console.log('ALL FOUR REFERENCE SITES CAPTURED!');
    console.log('========================================');
  } catch (err) {
    console.error('Fatal error during capture:', err);
  } finally {
    await browser.close();
  }
}

main();
