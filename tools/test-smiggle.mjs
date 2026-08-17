import { chromium } from 'playwright';

async function testSmiggle() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--disable-blink-features=AutomationControlled', '--no-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
  });

  const page = await context.newPage();
  console.log('Navigating to Smiggle...');
  await page.goto('https://www.smiggle.co.uk/shop/en/smiggleuk', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(3000);

  console.log('Page Title:', await page.title());
  console.log('Page URL:', page.url());

  // Check for bundle blocks, hero, banners, tiles
  const sections = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('section, [class*="bundle"], [class*="hero"], [class*="banner"], [class*="category"], [class*="tiles"], [class*="promo"], main > div')).map(el => ({
      tagName: el.tagName,
      className: el.className,
      id: el.id,
      textSample: el.innerText.slice(0, 150).replace(/\n+/g, ' ')
    }));
  });

  console.log('Detected sections on Smiggle homepage:');
  console.log(JSON.stringify(sections.slice(0, 20), null, 2));

  await browser.close();
}

testSmiggle().catch(console.error);
