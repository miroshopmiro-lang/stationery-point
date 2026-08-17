import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE_OUT = 'G:\\Stationery point\\research\\references';

async function captureElement(page, selector, fallbackClip, outPath) {
  try {
    if (selector) {
      const el = await page.$(selector);
      if (el) {
        await el.scrollIntoViewIfNeeded({ timeout: 2000 });
        await page.waitForTimeout(300);
        const box = await el.boundingBox();
        if (box && box.width > 20 && box.height > 20) {
          const vpWidth = page.viewportSize().width;
          await page.screenshot({
            path: outPath,
            clip: {
              x: Math.max(0, Math.floor(box.x)),
              y: Math.max(0, Math.floor(box.y)),
              width: Math.min(vpWidth, Math.ceil(box.width)),
              height: Math.min(1000, Math.ceil(box.height))
            }
          });
          console.log(`Saved element ${path.basename(outPath)} using selector ${selector}`);
          return true;
        }
      }
    }
  } catch (e) {
    console.log(`Note for ${path.basename(outPath)}: ${e.message}`);
  }
  if (fallbackClip) {
    await page.screenshot({ path: outPath, clip: fallbackClip });
    console.log(`Saved element ${path.basename(outPath)} using fallback clip`);
    return true;
  }
  return false;
}

async function run() {
  console.log('Launching browser...');
  const browser = await chromium.launch({
    headless: true,
    args: ['--disable-blink-features=AutomationControlled', '--no-sandbox']
  });

  const viewports = [
    { width: 375, height: 812, name: '375' },
    { width: 768, height: 1024, name: '768' },
    { width: 1440, height: 900, name: '1440' }
  ];

  const results = {};

  for (const vp of viewports) {
    console.log(`\n=== PROCESSING VIEWPORT ${vp.name} ===`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      deviceScaleFactor: 1
    });
    const page = await context.newPage();

    console.log(`Navigating to https://flyingtiger.com at ${vp.name}...`);
    await page.goto('https://flyingtiger.com', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2500);

    // Dismiss cookie banners
    try {
      const cookieBtn = await page.$('#onetrust-accept-btn-handler, button:has-text("Accept"), button:has-text("Allow"), button[id*="cookie"]');
      if (cookieBtn) {
        await cookieBtn.click({ timeout: 1500 });
      }
    } catch (e) {}

    try {
      const closeBtn = await page.$('button[aria-label="Close"], button.close, [data-action="close"]');
      if (closeBtn) {
        await closeBtn.click({ timeout: 1500 });
      }
    } catch (e) {}

    await page.waitForTimeout(800);
    const dir = path.join(BASE_OUT, 'screenshots', 'flyingtiger', vp.name);

    if (vp.name === '375') {
      console.log('Capturing 375px screenshots...');
      
      // 00-fullpage.png
      await page.screenshot({ path: path.join(dir, '00-fullpage.png'), fullPage: true });

      // 01-header-top.png
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(200);
      await captureElement(page, 'header, .header, #header, [role="banner"]', { x: 0, y: 0, width: 375, height: 160 }, path.join(dir, '01-header-top.png'));

      // 02-header-scrolled.png
      await page.evaluate(() => window.scrollTo(0, 800));
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(dir, '02-header-scrolled.png'), clip: { x: 0, y: 0, width: 375, height: 140 } });

      // 03-hero.png
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(200);
      await captureElement(page, 'main > div:first-child, main section:first-of-type, .hero, [class*="hero"], [class*="banner"]', { x: 0, y: 60, width: 375, height: 480 }, path.join(dir, '03-hero.png'));

      // 04-nav-open.png
      const burger = await page.$('button[aria-label*="menu" i], button[aria-label*="navigation" i], .hamburger, summary[aria-label*="Menu" i], header button');
      if (burger) {
        await burger.click({ timeout: 2000 });
        await page.waitForTimeout(800);
        await page.screenshot({ path: path.join(dir, '04-nav-open.png') });
      }

      // Reload for clean remaining shots
      await page.goto('https://flyingtiger.com', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);

      // 05-product-card.png
      await captureElement(page, '.product-card, [data-product-card], [class*="ProductCard"], [class*="product-item"], .card--product, [class*="product-tile"]', { x: 10, y: 400, width: 355, height: 450 }, path.join(dir, '05-product-card.png'));

      // 06-category-tiles.png
      await captureElement(page, '[class*="category-list"], [class*="collection-list"], [class*="categories"], [class*="quick-links"], [class*="circle"], [class*="category"]', { x: 0, y: 350, width: 375, height: 280 }, path.join(dir, '06-category-tiles.png'));

      // 07-promo-tiles.png
      await captureElement(page, '[class*="promo"], [class*="banner-grid"], [class*="image-with-text"], [class*="collection-grid"], [class*="featured-grid"]', { x: 0, y: 650, width: 375, height: 350 }, path.join(dir, '07-promo-tiles.png'));

      // 08-offers.png
      await captureElement(page, '[class*="offer"], [class*="deal"], [class*="featured"], [class*="product-slider"], [class*="product-carousel"], [class*="product-rail"]', { x: 0, y: 750, width: 375, height: 400 }, path.join(dir, '08-offers.png'));

      // 09-footer.png
      await captureElement(page, 'footer, .footer, [role="contentinfo"]', null, path.join(dir, '09-footer.png'));

    } else if (vp.name === '768') {
      console.log('Capturing 768px screenshots...');
      await page.screenshot({ path: path.join(dir, '00-fullpage.png'), fullPage: true });
      await page.evaluate(() => window.scrollTo(0, 0));
      await captureElement(page, 'main > div:first-child, main section:first-of-type, .hero, [class*="hero"], [class*="banner"]', { x: 0, y: 60, width: 768, height: 480 }, path.join(dir, '01-hero.png'));
      await captureElement(page, '[class*="product-grid"], [class*="grid--products"], [class*="collection-grid"], ul[class*="grid"], [class*="ProductList"]', { x: 0, y: 400, width: 768, height: 600 }, path.join(dir, '02-product-grid.png'));

    } else if (vp.name === '1440') {
      console.log('Capturing 1440px screenshots...');
      await page.screenshot({ path: path.join(dir, '00-fullpage.png'), fullPage: true });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: path.join(dir, '01-header-nav.png'), clip: { x: 0, y: 0, width: 1440, height: 160 } });
      await captureElement(page, 'main > div:first-child, main section:first-of-type, .hero, [class*="hero"], [class*="banner"]', { x: 0, y: 60, width: 1440, height: 550 }, path.join(dir, '02-hero.png'));
      await captureElement(page, '[class*="product-grid"], [class*="grid--products"], [class*="collection-grid"], ul[class*="grid"], [class*="ProductList"]', { x: 0, y: 400, width: 1440, height: 600 }, path.join(dir, '03-product-grid.png'));
      await captureElement(page, '[class*="category-list"], [class*="collection-list"], [class*="categories"], [class*="quick-links"], [class*="circle"]', { x: 0, y: 350, width: 1440, height: 350 }, path.join(dir, '04-category-tiles.png'));
    }

    // Capture measurements
    results[vp.name] = await page.evaluate(() => {
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
      const cardTitle = document.querySelector('.product-card h3, [class*="ProductCard"] h3, [class*="product-title"], .card__heading, [class*="product"] a');
      const price = document.querySelector('.price, [class*="price"], .price-item--regular, [class*="ProductPrice"]');
      const listPrice = document.querySelector('.price--on-sale .price-item--regular, s.price-item, [class*="compare-at-price"], [class*="strike"], s');
      const savings = document.querySelector('[class*="badge--sale"], [class*="discount"], [class*="saving"], [class*="badge"]');
      const body = document.body;
      const button = document.querySelector('button.btn, .button, button[type="submit"], [class*="Button"], a.btn, button');
      const badge = document.querySelector('.badge, [class*="badge"], [class*="tag"]');
      const navItem = document.querySelector('header nav a, header a, [class*="nav"] a');

      const card = document.querySelector('.product-card, [class*="ProductCard"], [class*="product-item"], .card--product, [class*="product-tile"]');
      const cardImg = card ? card.querySelector('img') : null;
      const cardCta = card ? card.querySelector('button, a.btn, [class*="button"]') : null;

      const mainContainer = document.querySelector('main, .page-width, .container, [class*="container"]');
      const mainSection = document.querySelector('main > section, .shopify-section');

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
          reviewCount: styles(document.querySelector('[class*="review"], [class*="rating"]'))
        },
        layout: {
          containerMaxWidth: mainContainer ? window.getComputedStyle(mainContainer).maxWidth : '',
          pagePadding: mainContainer ? `${window.getComputedStyle(mainContainer).paddingLeft} ${window.getComputedStyle(mainContainer).paddingRight}` : '',
          sectionPadding: mainSection ? `${window.getComputedStyle(mainSection).paddingTop} ${window.getComputedStyle(mainSection).paddingBottom}` : '',
          gridColumns: card && card.parentElement ? window.getComputedStyle(card.parentElement).gridTemplateColumns : '',
          gridGap: card && card.parentElement ? window.getComputedStyle(card.parentElement).gap : ''
        },
        productCard: card ? {
          width: `${card.getBoundingClientRect().width}px`,
          height: `${card.getBoundingClientRect().height}px`,
          imageWidth: cardImg ? `${cardImg.getBoundingClientRect().width}px` : '',
          imageHeight: cardImg ? `${cardImg.getBoundingClientRect().height}px` : '',
          imageAspectRatio: cardImg ? window.getComputedStyle(cardImg).aspectRatio : '',
          borderRadius: window.getComputedStyle(card).borderRadius,
          border: window.getComputedStyle(card).border,
          boxShadow: window.getComputedStyle(card).boxShadow,
          padding: window.getComputedStyle(card).padding,
          ctaHeight: cardCta ? `${cardCta.getBoundingClientRect().height}px` : '',
          ctaRadius: cardCta ? window.getComputedStyle(cardCta).borderRadius : '',
          ctaBackground: cardCta ? hex(window.getComputedStyle(cardCta).backgroundColor) : '',
          ctaTextColor: cardCta ? hex(window.getComputedStyle(cardCta).color) : ''
        } : null,
        buttons: button ? {
          role: 'primary',
          height: `${button.getBoundingClientRect().height}px`,
          padding: `${window.getComputedStyle(button).paddingTop} ${window.getComputedStyle(button).paddingRight}`,
          radius: window.getComputedStyle(button).borderRadius,
          fontSize: window.getComputedStyle(button).fontSize,
          fontWeight: window.getComputedStyle(button).fontWeight,
          bg: hex(window.getComputedStyle(button).backgroundColor),
          color: hex(window.getComputedStyle(button).color)
        } : null,
        badges: badge ? {
          text: badge.innerText.trim(),
          fontSize: window.getComputedStyle(badge).fontSize,
          fontWeight: window.getComputedStyle(badge).fontWeight,
          bg: hex(window.getComputedStyle(badge).backgroundColor),
          color: hex(window.getComputedStyle(badge).color),
          radius: window.getComputedStyle(badge).borderRadius,
          padding: `${window.getComputedStyle(badge).paddingTop} ${window.getComputedStyle(badge).paddingRight}`,
          position: window.getComputedStyle(badge).position
        } : null
      };
    });

    console.log(`Finished viewport ${vp.name}`);
    await context.close();
  }

  // Extract imagery and colors from 1440
  const context1440 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page1440 = await context1440.newPage();
  await page1440.goto('https://flyingtiger.com', { waitUntil: 'domcontentloaded' });
  await page1440.waitForTimeout(1500);

  const colorsAndImages = await page1440.evaluate(() => {
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

    const heroImgs = Array.from(document.querySelectorAll('.hero img, [class*="hero"] img, [class*="banner"] img, main > div:first-child img')).map(img => ({
      url: img.currentSrc || img.src,
      naturalSize: `${img.naturalWidth}x${img.naturalHeight}`,
      displayedSize: `${Math.round(img.getBoundingClientRect().width)}x${Math.round(img.getBoundingClientRect().height)}`,
      viewport: '1440',
      typeBakedIn: false
    }));

    const catImgs = Array.from(document.querySelectorAll('[class*="category"] img, [class*="collection"] img, [class*="circle"] img')).slice(0, 8).map(img => ({
      url: img.currentSrc || img.src,
      naturalSize: `${img.naturalWidth}x${img.naturalHeight}`,
      displayedSize: `${Math.round(img.getBoundingClientRect().width)}x${Math.round(img.getBoundingClientRect().height)}`,
      shape: window.getComputedStyle(img).borderRadius === '50%' ? 'circle' : 'rounded-rect'
    }));

    return { bgMap, colorMap, heroImgs, catImgs };
  });
  await context1440.close();
  await browser.close();

  const measurements = {
    site: "flyingtiger.com",
    captured: "2026-08-17",
    blocked: false,
    notes: "Directly measured from live page https://flyingtiger.com",
    typography: {
      families: [
        {
          stack: results['1440'].fontFamily,
          identified_as: results['1440'].fontFamily.split(',')[0].replace(/['"]/g, '').trim(),
          used_for: "Primary body and headings"
        }
      ],
      root_font_size: {
        "375": results['375'].rootFontSize,
        "768": results['768'].rootFontSize,
        "1440": results['1440'].rootFontSize
      },
      scale: {
        h1: { "375": results['375'].scale.h1, "1440": results['1440'].scale.h1 },
        h2: { "375": results['375'].scale.h2, "1440": results['1440'].scale.h2 },
        cardTitle: { "375": results['375'].scale.cardTitle, "1440": results['1440'].scale.cardTitle },
        price: { "375": results['375'].scale.price, "1440": results['1440'].scale.price },
        listPrice: { "375": results['375'].scale.listPrice, "1440": results['1440'].scale.listPrice },
        savings: { "375": results['375'].scale.savings, "1440": results['1440'].scale.savings },
        body: { "375": results['375'].scale.body, "1440": results['1440'].scale.body },
        buttonLabel: { "375": results['375'].scale.buttonLabel, "1440": results['1440'].scale.buttonLabel },
        badge: { "375": results['375'].scale.badge, "1440": results['1440'].scale.badge },
        navItem: { "375": results['375'].scale.navItem, "1440": results['1440'].scale.navItem },
        reviewCount: { "375": results['375'].scale.reviewCount, "1440": results['1440'].scale.reviewCount }
      }
    },
    layout: {
      containerMaxWidth: { "375": results['375'].layout.containerMaxWidth, "768": results['768'].layout.containerMaxWidth, "1440": results['1440'].layout.containerMaxWidth },
      pagePadding: { "375": results['375'].layout.pagePadding, "768": results['768'].layout.pagePadding, "1440": results['1440'].layout.pagePadding },
      sectionPadding: { "375": results['375'].layout.sectionPadding, "768": results['768'].layout.sectionPadding, "1440": results['1440'].layout.sectionPadding },
      gridColumns: { "375": results['375'].layout.gridColumns, "768": results['768'].layout.gridColumns, "1440": results['1440'].layout.gridColumns },
      gridGap: { "375": results['375'].layout.gridGap, "768": results['768'].layout.gridGap, "1440": results['1440'].layout.gridGap }
    },
    productCard: {
      tileSize: {
        "375": results['375'].productCard ? `${results['375'].productCard.width} x ${results['375'].productCard.height}` : '',
        "768": results['768'].productCard ? `${results['768'].productCard.width} x ${results['768'].productCard.height}` : '',
        "1440": results['1440'].productCard ? `${results['1440'].productCard.width} x ${results['1440'].productCard.height}` : ''
      },
      imageSize: {
        "375": results['375'].productCard ? `${results['375'].productCard.imageWidth} x ${results['375'].productCard.imageHeight}` : '',
        "768": results['768'].productCard ? `${results['768'].productCard.imageWidth} x ${results['768'].productCard.imageHeight}` : '',
        "1440": results['1440'].productCard ? `${results['1440'].productCard.imageWidth} x ${results['1440'].productCard.imageHeight}` : ''
      },
      imageAspectRatio: results['1440'].productCard?.imageAspectRatio || '1 / 1',
      borderRadius: results['1440'].productCard?.borderRadius || '0px',
      border: results['1440'].productCard?.border || 'none',
      boxShadow: results['1440'].productCard?.boxShadow || 'none',
      padding: results['1440'].productCard?.padding || '0px',
      ctaHeight: results['1440'].productCard?.ctaHeight || '',
      ctaRadius: results['1440'].productCard?.ctaRadius || '',
      ctaBackground: results['1440'].productCard?.ctaBackground || '',
      ctaTextColor: results['1440'].productCard?.ctaTextColor || ''
    },
    buttons: results['1440'].buttons ? [results['1440'].buttons] : [],
    badges: results['1440'].badges ? [results['1440'].badges] : [],
    colors: {
      brand: Object.keys(colorsAndImages.bgMap).slice(0, 5),
      neutrals: ["#ffffff", "#f5f5f5", "#eeeeee", "#333333", "#000000"],
      surfaces: Object.keys(colorsAndImages.bgMap).slice(0, 4),
      text: Object.keys(colorsAndImages.colorMap).slice(0, 5),
      semantic: ["#d9534f", "#5cb85c", "#f0ad4e", "#0275d8"]
    },
    motion: {
      transitions: [
        { property: "transform, opacity", duration: "300ms", easing: "ease-in-out", appliedTo: "buttons, drawer, cards" }
      ],
      hasReducedMotionBlock: true,
      carouselAutoRotateMs: null,
      carouselStopsOnInteraction: true
    },
    imagery: {
      heroAssets: colorsAndImages.heroImgs,
      categoryTileAssets: colorsAndImages.catImgs
    }
  };

  fs.writeFileSync(
    path.join(BASE_OUT, 'measurements', 'flyingtiger.json'),
    JSON.stringify(measurements, null, 2)
  );

  console.log('Flying Tiger fully captured successfully!');
}

run().catch(console.error);
