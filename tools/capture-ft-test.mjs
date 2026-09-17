import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://flyingtiger.com', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(4000);
  await page.evaluate(() => {
    const ids = ['gdpr-blocking-page-overlay', 'onetrust-banner-sdk', 'onetrust-consent-sdk', 'CybotCookiebotDialog'];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.remove();
    });
    document.querySelectorAll('[role="dialog"], .modal, [class*="modal"], [class*="backdrop"], [class*="overlay"]').forEach(el => {
      const txt = el.innerText || '';
      if (txt.includes('ship') || txt.includes('Cookie') || txt.includes('India')) {
        el.remove();
      }
    });
    document.body.style.overflow = 'auto';
  });
  await page.waitForTimeout(1000);
  const out = 'C:\\Users\\risha\\.gemini\\antigravity-ide\\brain\\dad20a5d-e9b2-4c53-9108-1599819fda72\\references\\flyingtiger-clean-hero.png';
  await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1440, height: 850 } });
  console.log('Saved clean hero successfully!');
  await browser.close();
}
run().catch(console.error);
