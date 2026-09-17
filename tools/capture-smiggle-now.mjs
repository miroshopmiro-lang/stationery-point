import { chromium } from 'playwright';

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
    console.log('Navigating to Smiggle UK...');
    await page.goto('https://www.smiggle.co.uk/shop/en/smiggleuk', { waitUntil: 'domcontentloaded', timeout: 35000 });
    await page.waitForTimeout(5000);

    // Remove any modal or overlay completely from DOM
    await page.evaluate(() => {
      document.querySelectorAll('[role="dialog"], .modal, [class*="modal"], [class*="overlay"], [class*="popup"], #countryModal, #overlay').forEach(el => el.remove());
      if (document.body) {
        document.body.style.overflow = 'auto';
        document.body.style.position = 'static';
      }
    });
    await page.waitForTimeout(1500);

    const out = 'C:\\Users\\risha\\.gemini\\antigravity-ide\\brain\\dad20a5d-e9b2-4c53-9108-1599819fda72\\references\\smiggle-clean-hero.png';
    await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1440, height: 850 } });
    console.log('SUCCESS: Saved smiggle-clean-hero.png!');
  } catch (err) {
    console.error('Smiggle capture error:', err.message);
  } finally {
    await browser.close();
  }
}

run();
