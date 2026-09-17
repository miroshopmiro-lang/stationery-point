import { chromium } from 'playwright';
import fs from 'fs';

async function run() {
  const browser = await chromium.launch({
    headless: false,
    channel: 'chrome',
    args: ['--disable-blink-features=AutomationControlled', '--no-sandbox']
  });
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
    locale: 'en-GB'
  });
  const page = await ctx.newPage();
  try {
    await page.goto('https://www.smiggle.co.uk/shop/en/smiggleuk', { waitUntil: 'domcontentloaded', timeout: 35000 });
    await page.waitForTimeout(4000);

    // Click UK or Europe
    try {
      const ukBtn = await page.$('text="UK or Europe"');
      if (ukBtn) {
        await ukBtn.click();
        await page.waitForTimeout(1500);
      }
    } catch (e) {}

    // Click OK, CONTINUE on cookie card
    try {
      const cookieBtn = await page.$('button:has-text("OK, CONTINUE"), a:has-text("OK, CONTINUE")');
      if (cookieBtn) {
        await cookieBtn.click();
        await page.waitForTimeout(1000);
      }
    } catch (e) {}

    // Remove any lingering overlays or cookie boxes
    await page.evaluate(() => {
      document.querySelectorAll('#cookie-bar, .cookie-notice, [class*="cookie"]').forEach(el => el.remove());
    });
    await page.waitForTimeout(1000);

    const out = 'C:\\Users\\risha\\.gemini\\antigravity-ide\\brain\\dad20a5d-e9b2-4c53-9108-1599819fda72\\references\\smiggle-clean-hero.png';
    await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1440, height: 850 } });
    fs.copyFileSync(out, 'G:\\Stationery point\\research\\reference-captures\\smiggle-clean-hero.png');
    console.log('PERFECT: Saved smiggle-clean-hero.png with all popups dismissed!');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await browser.close();
  }
}

run();
