import fs from 'fs';
import { chromium } from 'playwright';

async function testMobileVariations() {
  const browser = await chromium.launch({ headless: true });
  const schoolB64 = `data:image/webp;base64,${fs.readFileSync('public/hero/hero-school.webp').toString('base64')}`;

  // Variation 1: Ultra-compact touch pills directly in lower-left (font 11px, h-7)
  const v1 = `
    <!DOCTYPE html>
    <html><head><meta charset="utf-8"><script src="https://cdn.tailwindcss.com"></script></head>
    <body class="bg-[#F3F2EE] p-0 m-0">
      <div class="w-full relative" style="aspect-ratio: 1024 / 384;">
        <img src="${schoolB64}" class="w-full h-full object-contain" />
        <div class="absolute inset-0 px-3 flex flex-col justify-end pb-2">
          <div class="flex items-center gap-1.5">
            <a href="#" class="inline-flex items-center justify-center h-6 rounded-full bg-white text-[#241F6B] font-bold px-2.5 text-[10px] shadow">
              Shop supplies
            </a>
            <a href="#" class="inline-flex items-center justify-center h-6 rounded-full bg-[#18134F]/90 text-white font-medium px-2.5 text-[10px] shadow border border-white/20">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </body></html>
  `;

  // Variation 2: 16:9 aspect on mobile, giving room for 36px buttons
  const v2 = `
    <!DOCTYPE html>
    <html><head><meta charset="utf-8"><script src="https://cdn.tailwindcss.com"></script></head>
    <body class="bg-[#F3F2EE] p-0 m-0">
      <div class="w-full relative bg-[#241F6B] aspect-[16/9] overflow-hidden">
        <img src="${schoolB64}" class="w-full h-full object-cover object-left" />
        <div class="absolute inset-0 px-4 flex flex-col justify-end pb-3">
          <div class="flex items-center gap-2">
            <a href="#" class="inline-flex items-center justify-center h-8 rounded-full bg-white text-[#241F6B] font-bold px-3.5 text-xs shadow-md">
              Shop supplies
            </a>
            <a href="#" class="inline-flex items-center justify-center h-8 rounded-full bg-[#18134F]/90 text-white font-medium px-3 text-xs shadow-md border border-white/20">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </body></html>
  `;

  // Variation 3: Wide banner + sleek CTA bar right under it on mobile
  const v3 = `
    <!DOCTYPE html>
    <html><head><meta charset="utf-8"><script src="https://cdn.tailwindcss.com"></script></head>
    <body class="bg-[#F3F2EE] p-0 m-0">
      <div class="w-full bg-[#241F6B]">
        <div class="w-full aspect-[1024/384]">
          <img src="${schoolB64}" class="w-full h-full object-contain" />
        </div>
        <div class="bg-[#241F6B] px-4 py-2 flex items-center justify-between border-t border-white/10">
          <a href="#" class="flex-1 text-center inline-flex items-center justify-center h-9 rounded-full bg-white text-[#241F6B] font-bold text-xs shadow mr-2">
            Shop school supplies
          </a>
          <a href="#" class="flex-1 text-center inline-flex items-center justify-center h-9 rounded-full bg-[#CDD661] text-[#241F6B] font-bold text-xs shadow">
            WhatsApp Enquiry
          </a>
        </div>
      </div>
    </body></html>
  `;

  const p1 = await browser.newPage({ viewport: { width: 375, height: 600 } });
  await p1.setContent(v1);
  await p1.screenshot({ path: 'C:/Users/risha/.gemini/antigravity-ide/brain/dad20a5d-e9b2-4c53-9108-1599819fda72/test-mobile-v1.png' });

  await p1.setContent(v2);
  await p1.screenshot({ path: 'C:/Users/risha/.gemini/antigravity-ide/brain/dad20a5d-e9b2-4c53-9108-1599819fda72/test-mobile-v2.png' });

  await p1.setContent(v3);
  await p1.screenshot({ path: 'C:/Users/risha/.gemini/antigravity-ide/brain/dad20a5d-e9b2-4c53-9108-1599819fda72/test-mobile-v3.png' });

  await p1.close();
  await browser.close();
  console.log('Mobile tests done!');
}

testMobileVariations().catch(console.error);
