import fs from 'fs';

const content = fs.readFileSync('C:\\Users\\risha\\.gemini\\antigravity-ide\\brain\\dad20a5d-e9b2-4c53-9108-1599819fda72\\.system_generated\\steps\\159\\content.md', 'utf8');

const mainIdx = content.indexOf('<main id="pd-homepage">');
if (mainIdx !== -1) {
  const hpSlice = content.slice(mainIdx, mainIdx + 12000);
  const srcMatches = [...hpSlice.matchAll(/src="([^"]+)"/gi)].map(m => m[1]);
  console.log('srcMatches in HP top:', srcMatches.slice(0, 10));
  const headings = [...hpSlice.matchAll(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/gi)].map(m => m[1].trim());
  console.log('headings:', headings);
}
