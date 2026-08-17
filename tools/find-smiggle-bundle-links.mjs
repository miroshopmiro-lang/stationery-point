import { chromium } from 'playwright';

async function getLinks() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.smiggle.co.uk/shop/en/smiggleuk', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  const links = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a')).map(a => ({
      text: a.innerText.trim(),
      href: a.getAttribute('href'),
      fullHref: a.href,
      classes: a.className
    })).filter(l => l.text.toLowerCase().includes('bundle') || (l.href && l.href.includes('bundle')) || l.text.toLowerCase().includes('offer') || l.text.includes('£'));
  });

  console.log('Detected Smiggle Bundle / Offer Links:');
  console.log(JSON.stringify(links, null, 2));

  await browser.close();
}

getLinks();
