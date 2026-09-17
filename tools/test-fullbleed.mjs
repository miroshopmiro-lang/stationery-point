import fs from 'fs';
import { chromium } from 'playwright';

async function testFullBleed() {
  const browser = await chromium.launch({ headless: true });

  const schoolB64 = `data:image/webp;base64,${fs.readFileSync('public/hero/hero-school.webp').toString('base64')}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-white m-0 p-0">
      <!-- Full Bleed Section -->
      <section class="relative w-full bg-[#241F6B] overflow-hidden">
        <div class="relative w-full aspect-[1024/384] overflow-hidden">
          <img src="${schoolB64}" class="w-full h-full object-cover object-center" />
          
          <!-- CTA Overlay aligned in negative space -->
          <div class="absolute inset-0 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 flex flex-col justify-end pb-4 sm:pb-8 lg:pb-10 pointer-events-none">
            <div class="flex items-center gap-2 sm:gap-3.5 pointer-events-auto">
              <a href="#" class="inline-flex items-center justify-center h-7 sm:h-10 lg:h-11 rounded-full bg-white text-[#241F6B] font-bold px-3 sm:px-6 lg:px-7 text-xs sm:text-sm lg:text-[15px] shadow-lg hover:bg-[#CDD661] transition-all">
                Shop school supplies
              </a>
              <a href="#" class="inline-flex items-center gap-1.5 h-7 sm:h-10 lg:h-11 rounded-full bg-[#18134F]/85 hover:bg-[#18134F] border border-white/20 text-white font-medium px-3 sm:px-5 lg:px-6 text-xs sm:text-sm transition-all shadow-md">
                <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#CDD661]" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.769.782 2.796.782 3.182 0 5.768-2.587 5.768-5.766.001-3.182-2.585-5.768-5.768-5.768zm0-1.725c4.137 0 7.493 3.356 7.493 7.491 0 4.137-3.356 7.493-7.493 7.493-1.285 0-2.49-.327-3.551-.902l-4.48.975 1.054-4.364c-.672-1.121-1.066-2.433-1.066-3.802 0-4.135 3.356-7.491 7.493-7.491z"/></svg>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </body>
    </html>
  `;

  // Desktop 1440
  const p1440 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await p1440.setContent(html);
  await p1440.screenshot({ path: 'C:/Users/risha/.gemini/antigravity-ide/brain/dad20a5d-e9b2-4c53-9108-1599819fda72/test-fullbleed-desktop.png' });
  await p1440.close();

  // Mobile 375
  const p375 = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await p375.setContent(html);
  await p375.screenshot({ path: 'C:/Users/risha/.gemini/antigravity-ide/brain/dad20a5d-e9b2-4c53-9108-1599819fda72/test-fullbleed-mobile.png' });
  await p375.close();

  await browser.close();
  console.log('Full bleed tests saved!');
}

testFullBleed().catch(console.error);
