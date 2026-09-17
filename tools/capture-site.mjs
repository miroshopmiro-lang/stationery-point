import { chromium } from 'playwright';
import path from 'path';

async function capture() {
  const browser = await chromium.launch({ headless: true });

  // Desktop
  const ctx1440 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const p1440 = await ctx1440.newPage();
  await p1440.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await p1440.waitForTimeout(1000);

  const dHero = 'C:/Users/risha/.gemini/antigravity-ide/brain/dad20a5d-e9b2-4c53-9108-1599819fda72/new-hero-engraved-desktop.png';
  const dFull = 'C:/Users/risha/.gemini/antigravity-ide/brain/dad20a5d-e9b2-4c53-9108-1599819fda72/new-site-engraved-scroll.png';
  await p1440.screenshot({ path: dHero, clip: { x: 0, y: 0, width: 1440, height: 800 } });
  await p1440.screenshot({ path: dFull, clip: { x: 0, y: 0, width: 1440, height: 1800 } });
  await ctx1440.close();

  // Mobile
  const ctx375 = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const p375 = await ctx375.newPage();
  await p375.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await p375.waitForTimeout(1000);

  const mHero = 'C:/Users/risha/.gemini/antigravity-ide/brain/dad20a5d-e9b2-4c53-9108-1599819fda72/new-hero-engraved-mobile.png';
  await p375.screenshot({ path: mHero, clip: { x: 0, y: 0, width: 375, height: 812 } });
  await ctx375.close();

  await browser.close();
  console.log('Captures complete!');
}

capture().catch(console.error);