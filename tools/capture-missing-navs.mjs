import { chromium } from 'playwright';
import path from 'path';

const BASE_OUT = 'G:\\Stationery point\\research\\references';

async function fixNavs() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--disable-blink-features=AutomationControlled', '--no-sandbox']
  });

  // 1. Flying Tiger 04-nav-open.png
  console.log('Fixing Flying Tiger nav-open...');
  try {
    const ctx = await browser.newContext({
      viewport: { width: 375, height: 812 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    });
    const p = await ctx.newPage();
    await p.goto('https://flyingtiger.com', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await p.waitForTimeout(2000);
    // Remove all possible blocking overlays
    await p.evaluate(() => {
      document.querySelectorAll('#gdpr-blocking-page-overlay, #pandectes-banner, .cc-window-wrapper, .modal, [id*="overlay"]').forEach(el => el.remove());
    });
    await p.waitForTimeout(300);
    const burger = await p.$('header-drawer summary, .header__icon--menu, summary.header__icon, [aria-label*="menu" i]');
    if (burger) {
      await burger.click();
      await p.waitForTimeout(800);
      await p.screenshot({ path: path.join(BASE_OUT, 'screenshots', 'flyingtiger', '375', '04-nav-open.png') });
      console.log('  [OK] Saved Flying Tiger 04-nav-open.png');
    }
    await ctx.close();
  } catch (e) {
    console.error('Flying Tiger nav error:', e.message);
  }

  // 2. Smiggle 04-nav-open.png
  console.log('Fixing Smiggle nav-open...');
  try {
    const ctx = await browser.newContext({
      viewport: { width: 375, height: 812 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    });
    const p = await ctx.newPage();
    await p.goto('https://www.smiggle.co.uk/shop/en/smiggleuk', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await p.waitForTimeout(2000);
    // Remove all modals/overlays
    await p.evaluate(() => {
      document.querySelectorAll('.modal, .modal--country, .modal-backdrop, #onetrust-banner-sdk, .ui-dialog, [class*="overlay"]').forEach(el => el.remove());
    });
    await p.waitForTimeout(300);
    // Find burger
    const burger = await p.$('.header__hamburger, .menu-toggle, button[class*="hamburger"], [aria-label*="menu" i], .nav-toggle, #menu-toggle, header .menu-icon');
    if (burger) {
      await burger.click();
      await p.waitForTimeout(800);
      await p.screenshot({ path: path.join(BASE_OUT, 'screenshots', 'smiggle', '375', '04-nav-open.png') });
      console.log('  [OK] Saved Smiggle 04-nav-open.png');
    } else {
      // Force open mobile menu drawer via JS if needed
      await p.evaluate(() => {
        const menu = document.querySelector('.menu, .nav, .header__nav, .nav-menu');
        if (menu) menu.classList.add('is-open', 'active');
      });
      await p.screenshot({ path: path.join(BASE_OUT, 'screenshots', 'smiggle', '375', '04-nav-open.png') });
      console.log('  [OK] Saved Smiggle 04-nav-open.png (forced display)');
    }
    await ctx.close();
  } catch (e) {
    console.error('Smiggle nav error:', e.message);
  }

  // 3. Blick 04-nav-open.png & 09-footer.png
  console.log('Fixing Blick nav-open & footer...');
  try {
    const ctx = await browser.newContext({
      viewport: { width: 375, height: 812 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    });
    const p = await ctx.newPage();
    await p.goto('https://www.dickblick.com/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await p.waitForTimeout(2000);
    await p.evaluate(() => {
      document.querySelectorAll('.modal, #onetrust-banner-sdk, [class*="popup"], [id*="overlay"]').forEach(el => el.remove());
    });

    // 09-footer.png
    const footer = await p.$('footer, .footer, [role="contentinfo"], #footer');
    if (footer) {
      await footer.scrollIntoViewIfNeeded();
      await p.waitForTimeout(300);
      await p.screenshot({ path: path.join(BASE_OUT, 'screenshots', 'blick', '375', '09-footer.png') });
      console.log('  [OK] Saved Blick 09-footer.png');
    }

    // 04-nav-open.png
    await p.evaluate(() => window.scrollTo(0, 0));
    await p.waitForTimeout(300);
    const burger = await p.$('button[aria-label*="menu" i], .hamburger, .mobile-menu-btn, [class*="nav-toggle"], [class*="hamburger"], header button');
    if (burger) {
      await burger.click();
      await p.waitForTimeout(800);
      await p.screenshot({ path: path.join(BASE_OUT, 'screenshots', 'blick', '375', '04-nav-open.png') });
      console.log('  [OK] Saved Blick 04-nav-open.png');
    }
    await ctx.close();
  } catch (e) {
    console.error('Blick nav error:', e.message);
  }

  await browser.close();
}

fixNavs();
