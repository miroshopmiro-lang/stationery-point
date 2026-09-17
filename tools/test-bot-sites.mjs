import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const outDir = 'C:\\Users\\risha\\.gemini\\antigravity-ide\\brain\\dad20a5d-e9b2-4c53-9108-1599819fda72\\references';
const projectOutDir = 'G:\\Stationery point\\research\\reference-captures';

async function testSite(name, url) {
  try {
    const browser = await chromium.launch({
      headless: true,
      channel: 'chrome',
      args: [
        '--disable-blink-features=AutomationControlled',
        '--no-sandbox',
        '--disable-infobars',
        '--window-size=1440,900'
      ]
    });

    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
      locale: 'en-GB'
    });

    const page = await ctx.newPage();
    console.log(`Navigating to ${name}...`);
    const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(5000);

    const title = await page.title();
    console.log(`${name} Title: ${title}, Status: ${resp ? resp.status() : 'null'}`);
    
    // Check if Cloudflare or bot challenge is present
    const content = await page.content();
    const isChallenged = content.includes('cf-turnstile') || title.includes('Just a moment') || title.includes('Restricted Access');
    console.log(`${name} isChallenged: ${isChallenged}`);

    const p1 = path.join(outDir, `${name}-test.png`);
    await page.screenshot({ path: p1, clip: { x: 0, y: 0, width: 1440, height: 900 } });
    fs.copyFileSync(p1, path.join(projectOutDir, `${name}-test.png`));
    console.log(`Saved ${name}-test.png`);

    await browser.close();
  } catch (err) {
    console.error(`Error on ${name}:`, err.message);
  }
}

async function run() {
  await testSite('hobbycraft', 'https://www.hobbycraft.co.uk');
  await testSite('dickblick', 'https://www.dickblick.com');
}

run();
