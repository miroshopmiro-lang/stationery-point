import { chromium } from 'playwright';

async function testTurnstile() {
  const browser = await chromium.launch({
    headless: false,
    channel: 'chrome',
    args: ['--no-sandbox', '--disable-infobars', '--window-size=1440,900']
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.hobbycraft.co.uk', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(4000);

  console.log('Frames count:', page.frames().length);
  for (const f of page.frames()) {
    console.log('Frame url:', f.url());
    try {
      const box = await f.$('input[type="checkbox"], .ctp-checkbox-label, #challenge-stage');
      if (box) {
        console.log('Found checkbox in frame, clicking...');
        await box.click();
        await page.waitForTimeout(6000);
      }
    } catch (e) {
      console.log('Frame error:', e.message);
    }
  }
  console.log('Page title after:', await page.title());
  await browser.close();
}

testTurnstile().catch(console.error);
