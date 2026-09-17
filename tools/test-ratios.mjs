import fs from 'fs';
import { chromium } from 'playwright';

async function testLayout() {
  const browser = await chromium.launch({ headless: true });

  const schoolB64 = `data:image/webp;base64,${fs.readFileSync('public/hero/hero-school.webp').toString('base64')}`;
  const artB64 = `data:image/webp;base64,${fs.readFileSync('public/hero/hero-art.webp').toString('base64')}`;
  const officeB64 = `data:image/webp;base64,${fs.readFileSync('public/hero/hero-office.webp').toString('base64')}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        .banner-aspect {
          aspect-ratio: 1024 / 384;
        }
      </style>
    </head>
    <body class="bg-[#F3F2EE] m-0 p-0">
      <div class="max-w-[1360px] mx-auto sm:px-4 lg:px-6 pt-2 sm:pt-4">
        <!-- Desktop test container -->
        <div class="relative w-full banner-aspect rounded-none sm:rounded-2xl overflow-hidden shadow-sm bg-[#241F6B]">
          <img src="${schoolB64}" class="w-full h-full object-contain sm:object-cover" />
          
          <div class="absolute inset-0 px-4 sm:px-8 lg:px-10 flex flex-col justify-end pb-4 sm:pb-6 lg:pb-8 pointer-events-none">
            <div class="flex items-center gap-3 pointer-events-auto">
              <a href="#" class="inline-flex items-center justify-center h-8 sm:h-10 lg:h-11 rounded-full bg-white text-[#241F6B] font-bold px-4 sm:px-6 text-xs sm:text-sm shadow-md hover:bg-[#CDD661]">
                Shop school supplies
              </a>
              <a href="#" class="inline-flex items-center gap-1.5 h-8 sm:h-10 lg:h-11 rounded-full bg-[#18134F]/85 border border-white/20 text-white font-medium px-3 sm:px-5 text-xs sm:text-sm shadow-md">
                <span>WhatsApp Enquiry</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  // Test 1: Desktop 1440
  const p1440 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await p1440.setContent(html);
  await p1440.screenshot({ path: 'C:/Users/risha/.gemini/antigravity-ide/brain/dad20a5d-e9b2-4c53-9108-1599819fda72/test-desktop-compact.png' });
  await p1440.close();

  // Test 2: Mobile 375
  const p375 = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await p375.setContent(html);
  await p375.screenshot({ path: 'C:/Users/risha/.gemini/antigravity-ide/brain/dad20a5d-e9b2-4c53-9108-1599819fda72/test-mobile-wide.png' });
  await p375.close();

  await browser.close();
  console.log('Layout tests saved!');
}

testLayout().catch(console.error);
