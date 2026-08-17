import { chromium } from 'playwright';
import path from 'path';

const BASE_OUT = 'G:\\Stationery point\\research\\references';

async function captureNavsAndFooter() {
  const browser = await chromium.launch({ headless: true });

  // 1. Flying Tiger nav open
  try {
    const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
    const p = await ctx.newPage();
    await p.goto('https://flyingtiger.com', { waitUntil: 'domcontentloaded' });
    await p.waitForTimeout(2000);
    await p.evaluate(() => {
      // Force open header drawer
      const summary = document.querySelector('header-drawer summary, .header__icon--menu');
      if (summary) summary.click();
      const details = document.querySelector('header-drawer details');
      if (details) details.setAttribute('open', '');
    });
    await p.waitForTimeout(600);
    await p.screenshot({ path: path.join(BASE_OUT, 'screenshots', 'flyingtiger', '375', '04-nav-open.png') });
    console.log('Saved Flying Tiger 04-nav-open.png');
    await ctx.close();
  } catch (e) {
    console.log('FT nav error:', e.message);
  }

  // 2. Smiggle nav open
  try {
    const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
    const p = await ctx.newPage();
    await p.goto('https://www.smiggle.co.uk/shop/en/smiggleuk', { waitUntil: 'domcontentloaded' });
    await p.waitForTimeout(2000);
    await p.evaluate(() => {
      // Remove any country modal or backdrop
      document.querySelectorAll('.modal, .modal--country, .modal-backdrop, #onetrust-banner-sdk').forEach(el => el.remove());
      const burger = document.querySelector('.header__hamburger, .menu-toggle, button.hamburger, [aria-label*="menu" i], .nav-toggle, #menu-toggle');
      if (burger) burger.click();
      const menu = document.querySelector('.menu, .nav, .header__nav, .nav-menu');
      if (menu) menu.style.display = 'block';
    });
    await p.waitForTimeout(600);
    await p.screenshot({ path: path.join(BASE_OUT, 'screenshots', 'smiggle', '375', '04-nav-open.png') });
    console.log('Saved Smiggle 04-nav-open.png');
    await ctx.close();
  } catch (e) {
    console.log('Smiggle nav error:', e.message);
  }

  // 3. Blick nav open & footer
  try {
    const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
    const p = await ctx.newPage();
    await p.goto('https://www.dickblick.com/', { waitUntil: 'domcontentloaded' });
    await p.waitForTimeout(2000);
    await p.evaluate(() => {
      document.querySelectorAll('.modal, #onetrust-banner-sdk').forEach(el => el.remove());
    });
    // Footer
    await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await p.waitForTimeout(500);
    await p.screenshot({ path: path.join(BASE_OUT, 'screenshots', 'blick', '375', '09-footer.png') });
    console.log('Saved Blick 09-footer.png');

    // Nav
    await p.evaluate(() => {
      window.scrollTo(0, 0);
      const burger = document.querySelector('button[aria-label*="menu" i], .hamburger, .mobile-menu-btn, header button');
      if (burger) burger.click();
    });
    await p.waitForTimeout(600);
    await p.screenshot({ path: path.join(BASE_OUT, 'screenshots', 'blick', '375', '04-nav-open.png') });
    console.log('Saved Blick 04-nav-open.png');

    await ctx.close();
  } catch (e) {
    console.log('Blick nav error:', e.message);
  }

  await browser.close();
}

captureNavsAndFooter();
