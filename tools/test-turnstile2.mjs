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

  const turnstileFrame = page.frames().find(f => f.url().includes('challenge-platform'));
  if (turnstileFrame) {
    console.log('Found turnstile frame');
    const html = await turnstileFrame.content();
    console.log('Frame HTML length:', html.length);
    const cb = await turnstileFrame.$('#cf-stage, .ctp-checkbox-container, input[type="checkbox"], body');
    console.log('Target found:', !!cb);
    if (cb) {
      await cb.click();
      console.log('Clicked in frame!');
      await page.waitForTimeout(8000);
      console.log('Title after click:', await page.title());
    }
  }
  await browser.close();
}

testTurnstile().catch(console.error);
