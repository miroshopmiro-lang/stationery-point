import { chromium } from 'playwright';

async function getSmiggleLinks() {
  const b = await chromium.launch({
    headless: true,
    args: ['--disable-blink-features=AutomationControlled', '--no-sandbox']
  });
  const ctx = await b.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
  });
  const p = await ctx.newPage();
  await p.goto('https://www.smiggle.co.uk/shop/en/smiggleuk', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(3000);

  const data = await p.evaluate(() => {
    const allLinks = Array.from(document.querySelectorAll('a')).map(a => ({
      text: a.innerText.trim(),
      href: a.href,
      classes: a.className
    })).filter(x => x.text.length > 0 || x.href.includes('smiggle'));
    return {
      title: document.title,
      totalLinks: allLinks.length,
      sampleLinks: allLinks.slice(0, 50)
    };
  });

  console.log(JSON.stringify(data, null, 2));
  await b.close();
}

getSmiggleLinks().catch(console.error);
