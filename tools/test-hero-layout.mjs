import fs from 'fs';
import { chromium } from 'playwright';

async function test() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  const imgBuffer = fs.readFileSync('public/hero/hero-school.webp');
  const imgBase64 = `data:image/webp;base64,${imgBuffer.toString('base64')}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gray-100 p-0 m-0">
      <div class="relative w-full max-w-[1440px] mx-auto overflow-hidden shadow-lg" style="aspect-ratio: 1024 / 384;">
        <img src="${imgBase64}" class="w-full h-full object-cover block" />
        
        <!-- Button overlay container aligned to the reserved negative space -->
        <div class="absolute inset-0 max-w-7xl mx-auto px-6 sm:px-12 lg:px-14 flex flex-col justify-end pb-8 sm:pb-9 lg:pb-11">
          <div class="flex flex-wrap items-center gap-3.5">
            <a href="#" class="inline-flex items-center justify-center min-h-[44px] rounded-full bg-white text-[#241F6B] font-bold px-7 text-[15px] shadow-lg hover:bg-[#CDD661] hover:text-[#241F6B] transition-all">
              Shop school supplies
            </a>
            <a href="#" class="inline-flex items-center gap-2 min-h-[44px] rounded-full bg-[#18134F]/80 hover:bg-[#18134F] border border-white/25 text-white font-medium px-5 text-[14px] transition-all shadow">
              <svg class="w-4 h-4 text-[#CDD661]" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.769.782 2.796.782 3.182 0 5.768-2.587 5.768-5.766.001-3.182-2.585-5.768-5.768-5.768zm0-1.725c4.137 0 7.493 3.356 7.493 7.491 0 4.137-3.356 7.493-7.493 7.493-1.285 0-2.49-.327-3.551-.902l-4.48.975 1.054-4.364c-.672-1.121-1.066-2.433-1.066-3.802 0-4.135 3.356-7.491 7.493-7.491z"/></svg>
              <span>WhatsApp Enquiry</span>
            </a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
  
  await page.setContent(html);
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'G:/Stationery point/test-hero-overlay.png' });
  console.log('Saved G:/Stationery point/test-hero-overlay.png');
  await browser.close();
}

test().catch(console.error);
