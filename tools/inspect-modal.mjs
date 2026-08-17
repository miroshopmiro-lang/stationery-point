import { chromium } from 'playwright';

async function inspectModal() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto('https://www.smiggle.co.uk/shop/en/smiggleuk', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const modalInfo = await page.evaluate(() => {
    const modals = Array.from(document.querySelectorAll('.modal, [class*="modal"], [id*="modal"], [class*="country"], [id*="country"]')).map(el => ({
      tag: el.tagName,
      className: el.className,
      id: el.id,
      outerHTML: el.outerHTML.slice(0, 300)
    }));
    return modals;
  });

  console.log(JSON.stringify(modalInfo, null, 2));
  await browser.close();
}

inspectModal();
