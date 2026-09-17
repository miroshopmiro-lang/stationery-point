import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

const brainDir = 'C:\\Users\\risha\\.gemini\\antigravity-ide\\brain\\dad20a5d-e9b2-4c53-9108-1599819fda72';
const outDir = path.join(brainDir, 'references');
const projectOutDir = 'G:\\Stationery point\\research\\reference-captures';

async function processHtml(srcPath, baseHref, disableScripts = []) {
  const raw = fs.readFileSync(srcPath, 'utf8');
  // strip markdown frontmatter
  const htmlStart = raw.indexOf('<!');
  let html = htmlStart !== -1 ? raw.slice(htmlStart) : raw;
  
  // Inject base href right after <head>
  html = html.replace(/<head[^>]*>/i, `$&<base href="${baseHref}">`);

  // Disable scripts that trigger client-side challenge/redirects
  for (const s of disableScripts) {
    html = html.replaceAll(s, '/* disabled */');
  }

  const tmpPath = path.join(brainDir, 'scratch', path.basename(srcPath, '.md') + '.html');
  fs.mkdirSync(path.dirname(tmpPath), { recursive: true });
  fs.writeFileSync(tmpPath, html, 'utf8');
  return tmpPath;
}

async function captureLocal(htmlPath, prefix) {
  const browser = await chromium.launch({
    headless: true,
    channel: 'chrome',
    args: ['--disable-web-security', '--no-sandbox']
  });

  // Desktop
  const ctx1440 = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const p1440 = await ctx1440.newPage();
  await p1440.goto(`file://${htmlPath}`, { waitUntil: 'load', timeout: 30000 }).catch(() => {});
  await p1440.waitForTimeout(3000);
  
  // Remove overlays / cookie dialogs if rendered
  await p1440.evaluate(() => {
    document.querySelectorAll('[role="dialog"], [class*="modal"], [class*="cookie"], [class*="overlay"], #onetrust-banner-sdk').forEach(el => el.remove());
    document.body.style.overflow = 'auto';
  });

  const dHero = path.join(outDir, `${prefix}-desktop-hero.png`);
  const dScroll = path.join(outDir, `${prefix}-desktop-scroll.png`);
  await p1440.screenshot({ path: dHero, clip: { x: 0, y: 0, width: 1440, height: 850 } });
  await p1440.screenshot({ path: dScroll, clip: { x: 0, y: 0, width: 1440, height: 2200 } });
  fs.copyFileSync(dHero, path.join(projectOutDir, `${prefix}-desktop-hero.png`));
  fs.copyFileSync(dScroll, path.join(projectOutDir, `${prefix}-desktop-scroll.png`));
  await ctx1440.close();

  // Mobile
  const ctx375 = await browser.newContext({
    viewport: { width: 375, height: 812 }
  });
  const p375 = await ctx375.newPage();
  await p375.goto(`file://${htmlPath}`, { waitUntil: 'load', timeout: 30000 }).catch(() => {});
  await p375.waitForTimeout(3000);
  await p375.evaluate(() => {
    document.querySelectorAll('[role="dialog"], [class*="modal"], [class*="cookie"], [class*="overlay"], #onetrust-banner-sdk').forEach(el => el.remove());
    document.body.style.overflow = 'auto';
  });
  const mHero = path.join(outDir, `${prefix}-mobile-hero.png`);
  const mScroll = path.join(outDir, `${prefix}-mobile-scroll.png`);
  await p375.screenshot({ path: mHero, clip: { x: 0, y: 0, width: 375, height: 812 } });
  await p375.screenshot({ path: mScroll, clip: { x: 0, y: 0, width: 375, height: 1800 } });
  fs.copyFileSync(mHero, path.join(projectOutDir, `${prefix}-mobile-hero.png`));
  fs.copyFileSync(mScroll, path.join(projectOutDir, `${prefix}-mobile-scroll.png`));
  await ctx375.close();

  await browser.close();
  console.log(`Successfully captured local render of ${prefix}`);
}

async function run() {
  const smiggleSrc = path.join(brainDir, '.system_generated', 'steps', '154', 'content.md');
  const hobbySrc = path.join(brainDir, '.system_generated', 'steps', '159', 'content.md');

  console.log('Processing Smiggle...');
  const smiggleHtml = await processHtml(smiggleSrc, 'https://www.smiggle.co.uk/', ['stormcaster.js', 'cas.avalon.perfdrive.com']);
  await captureLocal(smiggleHtml, 'smiggle');

  console.log('Processing Hobbycraft...');
  const hobbyHtml = await processHtml(hobbySrc, 'https://www.hobbycraft.co.uk/', []);
  await captureLocal(hobbyHtml, 'hobbycraft');
}

run().catch(console.error);
