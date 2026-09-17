import { chromium } from 'playwright';

async function captureAll() {
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop
  const ctx1440 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const p1440 = await ctx1440.newPage();
  await p1440.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await p1440.waitForTimeout(1000);

  // Slide 0: School
  await p1440.screenshot({ path: 'C:/Users/risha/.gemini/antigravity-ide/brain/dad20a5d-e9b2-4c53-9108-1599819fda72/desktop-slide-0-school.png', clip: { x: 0, y: 0, width: 1440, height: 750 } });

  // Click chevron to go to Slide 1: Art
  await p1440.click('button[aria-label="Next slide"]');
  await p1440.waitForTimeout(600);
  await p1440.screenshot({ path: 'C:/Users/risha/.gemini/antigravity-ide/brain/dad20a5d-e9b2-4c53-9108-1599819fda72/desktop-slide-1-art.png', clip: { x: 0, y: 0, width: 1440, height: 750 } });

  // Click chevron to go to Slide 2: Office
  await p1440.click('button[aria-label="Next slide"]');
  await p1440.waitForTimeout(600);
  await p1440.screenshot({ path: 'C:/Users/risha/.gemini/antigravity-ide/brain/dad20a5d-e9b2-4c53-9108-1599819fda72/desktop-slide-2-office.png', clip: { x: 0, y: 0, width: 1440, height: 750 } });

  // Full viewport view showing fold
  await p1440.screenshot({ path: 'C:/Users/risha/.gemini/antigravity-ide/brain/dad20a5d-e9b2-4c53-9108-1599819fda72/desktop-fold-view.png', clip: { x: 0, y: 0, width: 1440, height: 900 } });
  await ctx1440.close();

  // 2. Mobile 375
  const ctx375 = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const p375 = await ctx375.newPage();
  await p375.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await p375.waitForTimeout(1000);

  // Mobile Slide 0: School
  await p375.screenshot({ path: 'C:/Users/risha/.gemini/antigravity-ide/brain/dad20a5d-e9b2-4c53-9108-1599819fda72/mobile-slide-0-school.png', clip: { x: 0, y: 0, width: 375, height: 600 } });

  // Click dot for Slide 1: Art
  await p375.click('button[aria-label="Go to slide 2"]');
  await p375.waitForTimeout(600);
  await p375.screenshot({ path: 'C:/Users/risha/.gemini/antigravity-ide/brain/dad20a5d-e9b2-4c53-9108-1599819fda72/mobile-slide-1-art.png', clip: { x: 0, y: 0, width: 375, height: 600 } });

  // Click dot for Slide 2: Office
  await p375.click('button[aria-label="Go to slide 3"]');
  await p375.waitForTimeout(600);
  await p375.screenshot({ path: 'C:/Users/risha/.gemini/antigravity-ide/brain/dad20a5d-e9b2-4c53-9108-1599819fda72/mobile-slide-2-office.png', clip: { x: 0, y: 0, width: 375, height: 600 } });

  await ctx375.close();
  await browser.close();
  console.log('All slide captures complete!');
}

captureAll().catch(console.error);