import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const outDir = 'C:\\Users\\risha\\.gemini\\antigravity-ide\\brain\\dad20a5d-e9b2-4c53-9108-1599819fda72\\references';
const projectOutDir = 'G:\\Stationery point\\research\\reference-captures';

async function captureFlyingTigerClean() {
  console.log('Capturing clean Flying Tiger...');
  const browser = await chromium.launch({
    headless: true,
    channel: 'chrome',
    args: ['--disable-blink-features=AutomationControlled', '--no-sandbox']
  });

  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
  });

  const page = await ctx.newPage();
  await page.goto('https://flyingtiger.com', { waitUntil: 'networkidle', timeout: 35000 });
  await page.waitForTimeout(3000);

  // Click 'Shop now' on the country picker dialog
  try {
    const shopNowBtn = await page.$('button:has-text("Shop now")');
    if (shopNowBtn) {
      await shopNowBtn.click();
      console.log('Clicked Shop now button');
      await page.waitForTimeout(2000);
    }
  } catch (e) {
    console.log('Shop now click error:', e.message);
  }

  // Also remove any lingering backdrop / overlay if any
  await page.evaluate(() => {
    document.querySelectorAll('.fixed, [class*="modal"], [class*="backdrop"], [class*="overlay"]').forEach(el => {
      const text = el.innerText || '';
      if (text.includes("We don't ship to India") || text.includes('Cookie')) {
        el.remove();
      }
    });
  });
  await page.waitForTimeout(1000);

  const heroPath = path.join(outDir, 'flyingtiger-desktop-hero-clean.png');
  const scrollPath = path.join(outDir, 'flyingtiger-desktop-scroll-clean.png');
  await page.screenshot({ path: heroPath, clip: { x: 0, y: 0, width: 1440, height: 900 } });
  await page.screenshot({ path: scrollPath, clip: { x: 0, y: 0, width: 1440, height: 2200 } });
  fs.copyFileSync(heroPath, path.join(projectOutDir, 'flyingtiger-desktop-hero-clean.png'));
  fs.copyFileSync(scrollPath, path.join(projectOutDir, 'flyingtiger-desktop-scroll-clean.png'));

  // Mobile
  const mctx = await browser.newContext({
    viewport: { width: 375, height: 812 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
  });
  const mpage = await mctx.newPage();
  await mpage.goto('https://flyingtiger.com', { waitUntil: 'networkidle', timeout: 35000 });
  await mpage.waitForTimeout(3000);
  try {
    const btn = await mpage.$('button:has-text("Shop now")');
    if (btn) {
      await btn.click();
      await mpage.waitForTimeout(2000);
    }
  } catch (e) {}
  await mpage.evaluate(() => {
    document.querySelectorAll('.fixed, [class*="modal"], [class*="backdrop"], [class*="overlay"]').forEach(el => {
      const text = el.innerText || '';
      if (text.includes("We don't ship to India") || text.includes('Cookie')) {
        el.remove();
      }
    });
  });
  await mpage.waitForTimeout(1000);

  const mHeroPath = path.join(outDir, 'flyingtiger-mobile-hero-clean.png');
  const mScrollPath = path.join(outDir, 'flyingtiger-mobile-scroll-clean.png');
  await mpage.screenshot({ path: mHeroPath, clip: { x: 0, y: 0, width: 375, height: 812 } });
  await mpage.screenshot({ path: mScrollPath, clip: { x: 0, y: 0, width: 375, height: 1800 } });
  fs.copyFileSync(mHeroPath, path.join(projectOutDir, 'flyingtiger-mobile-hero-clean.png'));
  fs.copyFileSync(mScrollPath, path.join(projectOutDir, 'flyingtiger-mobile-scroll-clean.png'));

  await browser.close();
  console.log('Flying Tiger clean captures complete.');
}

captureFlyingTigerClean().catch(console.error);
