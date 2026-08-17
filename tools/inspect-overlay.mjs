import { chromium } from 'playwright';

async function inspectOverlay() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto('https://www.smiggle.co.uk/shop/en/smiggleuk', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);

  const overlays = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll('*'));
    return all.filter(el => {
      const cs = window.getComputedStyle(el);
      return (cs.position === 'fixed' || cs.position === 'absolute') && parseInt(cs.zIndex) > 50;
    }).map(el => ({
      tag: el.tagName,
      className: el.className,
      id: el.id,
      zIndex: window.getComputedStyle(el).zIndex,
      text: el.innerText.slice(0, 100).replace(/\n+/g, ' ')
    }));
  });

  console.log(JSON.stringify(overlays, null, 2));
  await browser.close();
}

inspectOverlay();
