import { chromium } from 'playwright';

async function inspect() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto('https://flyingtiger.com', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  const elements = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('header *, [class*="header"] *')).filter(el => {
      return el.tagName === 'BUTTON' || el.tagName === 'A' || el.tagName === 'SUMMARY' || el.getAttribute('role') === 'button';
    }).map(el => ({
      tag: el.tagName,
      className: el.className,
      id: el.id,
      ariaLabel: el.getAttribute('aria-label'),
      text: el.innerText.trim()
    }));
  });
  console.log(JSON.stringify(elements, null, 2));
  await browser.close();
}

inspect();
