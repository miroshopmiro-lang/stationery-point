import fs from 'fs';

const content = fs.readFileSync('C:\\Users\\risha\\.gemini\\antigravity-ide\\brain\\dad20a5d-e9b2-4c53-9108-1599819fda72\\.system_generated\\steps\\159\\content.md', 'utf8');

const heroStart = content.indexOf('b-hero_carousel');
if (heroStart !== -1) {
  const heroSlice = content.slice(heroStart, heroStart + 5000);
  const imgs = [...heroSlice.matchAll(/<img[^>]+src="([^">]+)"/gi)].map(m => m[1]);
  const titles = [...heroSlice.matchAll(/<h[2-4][^>]*>([\s\S]*?)<\/h[2-4]>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  const ctas = [...heroSlice.matchAll(/<a[^>]*class="[^"]*btn[^"]*"[^>]*>([\s\S]*?)<\/a>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  console.log('Hero Images:', imgs);
  console.log('Hero Titles:', titles);
  console.log('Hero CTAs:', ctas);
}
