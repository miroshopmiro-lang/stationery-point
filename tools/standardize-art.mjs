import fs from 'fs';
import { chromium } from 'playwright';

async function standardizeArt() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const artBuf = fs.readFileSync('public/hero/hero-art.webp');
  const b64 = `data:image/webp;base64,${artBuf.toString('base64')}`;

  const res = await page.evaluate(async (imgSrc) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const cvs = document.createElement('canvas');
        cvs.width = 1024;
        cvs.height = 384;
        const ctx = cvs.getContext('2d');

        // Sample background color from x=20, y=20
        const tempCvs = document.createElement('canvas');
        tempCvs.width = img.width;
        tempCvs.height = img.height;
        const tCtx = tempCvs.getContext('2d');
        tCtx.drawImage(img, 0, 0);
        const p = tCtx.getImageData(20, 20, 1, 1).data;
        const hex = '#' + [p[0], p[1], p[2]].map(x => x.toString(16).padStart(2, '0')).join('');

        // Fill background
        ctx.fillStyle = hex;
        ctx.fillRect(0, 0, 1024, 384);

        // Center vertically (img is 1024 x 342, so 21px margin top/bottom)
        const dy = Math.floor((384 - img.height) / 2);
        ctx.drawImage(img, 0, dy);

        resolve({
          dataUrl: cvs.toDataURL('image/webp', 0.88),
          color: hex
        });
      };
      img.src = imgSrc;
    });
  }, b64);

  const outBuf = Buffer.from(res.dataUrl.split(',')[1], 'base64');
  fs.writeFileSync('public/hero/hero-art.webp', outBuf);
  fs.writeFileSync('public/hero/hero-art-mobile.webp', outBuf);
  console.log(`Standardized Art to 1024x384 (bg ${res.color}), size: ${outBuf.length} bytes`);

  await browser.close();
}

standardizeArt().catch(console.error);
