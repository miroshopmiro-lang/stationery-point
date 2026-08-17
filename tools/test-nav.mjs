import { chromium } from 'playwright';

async function testNav() {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 375, height: 812 } });
  await p.goto('https://flyingtiger.com', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(2000);
  
  const drawerSummary = await p.$('header-drawer summary, .header__icon--menu, summary.header__icon');
  console.log('drawerSummary found:', !!drawerSummary);
  if (drawerSummary) {
    await drawerSummary.click();
    await p.waitForTimeout(1000);
    console.log('Menu opened!');
  }
  await b.close();
}

testNav();
