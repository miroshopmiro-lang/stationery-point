import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const outDir = 'C:\\Users\\risha\\.gemini\\antigravity-ide\\brain\\dad20a5d-e9b2-4c53-9108-1599819fda72\\references';
const projectOutDir = 'G:\\Stationery point\\research\\reference-captures';

async function saveBoth(page, filename, clip) {
  const p1 = path.join(outDir, filename);
  const p2 = path.join(projectOutDir, filename);
  const opts = clip ? { clip } : { fullPage: true };
  await page.screenshot({ path: p1, ...opts });
  fs.copyFileSync(p1, p2);
  console.log(`Saved: ${filename}`);
}

async function captureBlick() {
  console.log('=== Capturing Dick Blick ===');
  const browser = await chromium.launch({
    headless: true,
    channel: 'chrome',
    args: ['--disable-blink-features=AutomationControlled', '--no-sandbox']
  });

  // Desktop
  const ctx1440 = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
  });
  const p1440 = await ctx1440.newPage();
  await p1440.goto('https://www.dickblick.com', { waitUntil: 'domcontentloaded', timeout: 35000 });
  await p1440.waitForTimeout(4000);

  // Close any modal if present
  try {
    const closeBtn = await p1440.$('button[aria-label="Close"], .modal-close, #close-button, .close');
    if (closeBtn && await closeBtn.isVisible()) {
      await closeBtn.click();
      await p1440.waitForTimeout(1000);
    }
  } catch (e) {}

  await saveBoth(p1440, 'dickblick-desktop-hero.png', { x: 0, y: 0, width: 1440, height: 850 });
  await saveBoth(p1440, 'dickblick-desktop-scroll.png', { x: 0, y: 0, width: 1440, height: 2200 });
  await ctx1440.close();

  // Mobile
  const ctx375 = await browser.newContext({
    viewport: { width: 375, height: 812 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
  });
  const p375 = await ctx375.newPage();
  await p375.goto('https://www.dickblick.com', { waitUntil: 'domcontentloaded', timeout: 35000 });
  await p375.waitForTimeout(4000);

  try {
    const closeBtn = await p375.$('button[aria-label="Close"], .modal-close, #close-button, .close');
    if (closeBtn && await closeBtn.isVisible()) {
      await closeBtn.click();
      await p375.waitForTimeout(1000);
    }
  } catch (e) {}

  await saveBoth(p375, 'dickblick-mobile-hero.png', { x: 0, y: 0, width: 375, height: 812 });
  await saveBoth(p375, 'dickblick-mobile-scroll.png', { x: 0, y: 0, width: 375, height: 1800 });
  await ctx375.close();

  await browser.close();
}

async function captureHobbycraft() {
  console.log('=== Capturing Hobbycraft ===');
  const browser = await chromium.launch({
    headless: false,
    channel: 'chrome',
    args: ['--no-sandbox', '--disable-infobars']
  });

  // Desktop
  const ctx1440 = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
  });
  const p1440 = await ctx1440.newPage();
  await p1440.goto('https://www.hobbycraft.co.uk', { waitUntil: 'domcontentloaded', timeout: 45000 });
  
  // Wait up to 15s for Cloudflare if needed
  for (let i = 0; i < 15; i++) {
    const title = await p1440.title();
    if (!title.includes('Just a moment')) break;
    await p1440.waitForTimeout(1000);
  }
  await p1440.waitForTimeout(4000);

  // Cookie accept
  try {
    const cookieBtn = await p1440.$('#onetrust-accept-btn-handler, button:has-text("Accept All Cookies"), button:has-text("Accept")');
    if (cookieBtn && await cookieBtn.isVisible()) {
      await cookieBtn.click();
      await p1440.waitForTimeout(1000);
    }
  } catch (e) {}

  await saveBoth(p1440, 'hobbycraft-desktop-hero.png', { x: 0, y: 0, width: 1440, height: 850 });
  await saveBoth(p1440, 'hobbycraft-desktop-scroll.png', { x: 0, y: 0, width: 1440, height: 2200 });
  await ctx1440.close();

  // Mobile
  const ctx375 = await browser.newContext({
    viewport: { width: 375, height: 812 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
  });
  const p375 = await ctx375.newPage();
  await p375.goto('https://www.hobbycraft.co.uk', { waitUntil: 'domcontentloaded', timeout: 45000 });
  for (let i = 0; i < 15; i++) {
    const title = await p375.title();
    if (!title.includes('Just a moment')) break;
    await p375.waitForTimeout(1000);
  }
  await p375.waitForTimeout(4000);

  try {
    const cookieBtn = await p375.$('#onetrust-accept-btn-handler, button:has-text("Accept All Cookies"), button:has-text("Accept")');
    if (cookieBtn && await cookieBtn.isVisible()) {
      await cookieBtn.click();
      await p375.waitForTimeout(1000);
    }
  } catch (e) {}

  await saveBoth(p375, 'hobbycraft-mobile-hero.png', { x: 0, y: 0, width: 375, height: 812 });
  await saveBoth(p375, 'hobbycraft-mobile-scroll.png', { x: 0, y: 0, width: 375, height: 1800 });
  await ctx375.close();

  await browser.close();
}

async function main() {
  await captureBlick();
  await captureHobbycraft();
  console.log('Done capturing Blick & Hobbycraft.');
}

main().catch(console.error);
