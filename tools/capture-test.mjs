import { chromium } from 'playwright';

async function testSites() {
  const browser = await chromium.launch({ headless: true });
  const urls = [
    { name: 'flyingtiger', url: 'https://flyingtiger.com' },
    { name: 'smiggle', url: 'https://www.smiggle.co.uk' },
    { name: 'hobbycraft', url: 'https://www.hobbycraft.co.uk' },
    { name: 'blick', url: 'https://www.dickblick.com' },
  ];

  for (const item of urls) {
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      viewport: { width: 375, height: 812 }
    });
    const page = await context.newPage();
    try {
      console.log(`Navigating to ${item.name} (${item.url})...`);
      const res = await page.goto(item.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      console.log(`Status for ${item.name}: ${res ? res.status() : 'no response'}, Title: ${await page.title()}`);
      console.log(`Current URL: ${page.url()}`);
    } catch (err) {
      console.error(`Error loading ${item.name}: ${err.message}`);
    } finally {
      await context.close();
    }
  }
  await browser.close();
}

testSites();
