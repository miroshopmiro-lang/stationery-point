import fs from 'fs';

const content = fs.readFileSync('C:\\Users\\risha\\.gemini\\antigravity-ide\\brain\\dad20a5d-e9b2-4c53-9108-1599819fda72\\.system_generated\\steps\\159\\content.md', 'utf8');

const mainIdx = content.indexOf('<main id="pd-homepage">');
if (mainIdx !== -1) {
  const hpSlice = content.slice(mainIdx, mainIdx + 8000);
  const images = [...hpSlice.matchAll(/<picture[\s\S]*?<\/picture>/gi)].map(m => m[0]);
  console.log('Pictures in HP:', images.length);
  images.slice(0, 5).forEach((pic, i) => console.log(`--- Pic ${i} ---:\n`, pic));
}
