import { chromium } from 'playwright';

async function testHobbycraftAndBlick() {
  const browser = await chromium.launch({
    headless: false, // test if headed mode or standard browser context bypasses Cloudflare / Blick
    channel: 'chrome',
    args: ['--disable-blink-features=AutomationControlled', '--no-sandbox']
  });

  console.log('Testing Hobbycraft...');
  const ctx1 = await browser.newContext({
    viewport: { width: 375, height: 812 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
  });
  const p1 = await ctx1.newPage();
  try {
    const res = await p1.goto('https://www.hobbycraft.co.uk', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await p1.waitForTimeout(5000);
    console.log('Hobbycraft Title:', await p1.title());
    console.log('Hobbycraft URL:', p1.url());
  } catch (e) {
    console.log('Hobbycraft error:', e.message);
  }
  await ctx1.close();

  console.log('Testing Blick...');
  const ctx2 = await browser.newContext({
    viewport: { width: 375, height: 812 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
  });
  const p2 = await ctx2.newPage();
  try {
    const res = await p2.goto('https://www.dickblick.com', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await p2.waitForTimeout(5000);
    console.log('Blick Title:', await p2.title());
    console.log('Blick URL:', p2.url());
  } catch (e) {
    console.log('Blick error:', e.message);
  }
  await ctx2.close();

  await browser.close();
}

testHobbycraftAndBlick().catch(console.error);
