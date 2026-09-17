import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch({
    headless: false,
    channel: 'chrome',
    args: ['--disable-blink-features=AutomationControlled', '--no-sandbox']
  });
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
    locale: 'en-GB'
  });
  const page = await ctx.newPage();
  try {
    await page.goto('https://www.smiggle.co.uk/shop/en/smiggleuk', { waitUntil: 'domcontentloaded', timeout: 35000 });
    await page.waitForTimeout(5000);

    // Find links or buttons with text 'UK or Europe'
    const ukBtn = await page.$('text="UK or Europe"');
    console.log('ukBtn found:', !!ukBtn);
    if (ukBtn) {
      await ukBtn.click();
      console.log('Clicked UK or Europe');
      await page.waitForTimeout(3000);
    } else {
      // Find modal container by searching for 'Looks like you'
      const modalEl = await page.evaluate(() => {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
          if (node.textContent.includes('visiting us from')) {
            let p = node.parentElement;
            while (p && p !== document.body && !p.classList.contains('modal') && p.tagName !== 'DIV') {
              p = p.parentElement;
            }
            if (p) {
              const id = p.id || p.className;
              p.style.display = 'none';
              return id;
            }
          }
        }
        return 'not found';
      });
      console.log('Handled modalEl:', modalEl);
      await page.waitForTimeout(2000);
    }

    const out = 'C:\\Users\\risha\\.gemini\\antigravity-ide\\brain\\dad20a5d-e9b2-4c53-9108-1599819fda72\\references\\smiggle-clean-hero.png';
    await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1440, height: 900 } });
    console.log('Screenshot taken!');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await browser.close();
  }
}

run();
