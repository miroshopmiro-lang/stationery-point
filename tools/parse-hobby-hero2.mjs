import fs from 'fs';

const content = fs.readFileSync('C:\\Users\\risha\\.gemini\\antigravity-ide\\brain\\dad20a5d-e9b2-4c53-9108-1599819fda72\\.system_generated\\steps\\159\\content.md', 'utf8');

const heroStart = content.indexOf('b-hero_carousel');
if (heroStart !== -1) {
  console.log(content.slice(heroStart + 500, heroStart + 2500));
}
