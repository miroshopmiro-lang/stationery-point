import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const outDir = 'C:\\Users\\risha\\.gemini\\antigravity-ide\\brain\\dad20a5d-e9b2-4c53-9108-1599819fda72\\references';
const projectOutDir = 'G:\\Stationery point\\research\\reference-captures';

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(projectOutDir)) fs.mkdirSync(projectOutDir, { recursive: true });

async function saveBoth(page, filename, clip) {
  const p1 = path.join(outDir, filename);
  const p2 = path.join(projectOutDir, filename);
  const opts = clip ? { clip } : { fullPage: true };
  await page.screenshot({ path: p1, ...opts });
  fs.copyFileSync(p1, p2);
  console.log(`Saved: ${filename}`);
}

async function run() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--disable-blink-features=AutomationControlled', '--no-sandbox']
  });

  const sites = [
    { name: 'flyingtiger', url: 'https://flyingtiger.com' },
    { name: 'smiggle', url: 'https://www.smiggle.co.uk' }
  ];

  for (const site of sites) {
    console.log(`=== Capturing ${site.name} ===`);
    // 1440 Desktop
    const ctx1440 = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    });
    const p1440 = await ctx1440.newPage();
    try {
      await p1440.goto(site.url, { waitUntil: 'networkidle', timeout: 30000 });
    } catch {
      await p1440.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    }
    await p1440.waitForTimeout(3500);

    // Dismiss common cookie popups
    const cookieButtons = [
      '#onetrust-accept-btn-handler',
      '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll',
      'button:has-text("Accept all")',
      'button:has-text("Accept All Cookies")',
      'button:has-text("Accept")',
      'button:has-text("Agree")'
    ];
    for (const sel of cookieButtons) {
      try {
        const btn = await p1440.$(sel);
        if (btn && await btn.isVisible()) {
          await btn.click();
          await p1440.waitForTimeout(1000);
        }
      } catch (e) {}
    }

    await saveBoth(p1440, `${site.name}-desktop-hero.png`, { x: 0, y: 0, width: 1440, height: 850 });
    await saveBoth(p1440, `${site.name}-desktop-scroll.png`, { x: 0, y: 0, width: 1440, height: 2200 });
    await ctx1440.close();

    // 375 Mobile
    const ctx375 = await browser.newContext({
      viewport: { width: 375, height: 812 },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
    });
    const p375 = await ctx375.newPage();
    try {
      await p375.goto(site.url, { waitUntil: 'networkidle', timeout: 30000 });
    } catch {
      await p375.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    }
    await p375.waitForTimeout(3500);

    for (const sel of cookieButtons) {
      try {
        const btn = await p375.$(sel);
        if (btn && await btn.isVisible()) {
          await btn.click();
          await p375.waitForTimeout(1000);
        }
      } catch (e) {}
    }

    await saveBoth(p375, `${site.name}-mobile-hero.png`, { x: 0, y: 0, width: 375, height: 812 });
    await saveBoth(p375, `${site.name}-mobile-scroll.png`, { x: 0, y: 0, width: 375, height: 1800 });
    await ctx375.close();
  }

  await browser.close();
  console.log('Finished capturing Flying Tiger and Smiggle.');
}

run().catch(console.error);
