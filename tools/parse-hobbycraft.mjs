import fs from 'fs';

const content = fs.readFileSync('C:\\Users\\risha\\.gemini\\antigravity-ide\\brain\\dad20a5d-e9b2-4c53-9108-1599819fda72\\.system_generated\\steps\\159\\content.md', 'utf8');

const mainStart = content.indexOf('<main');
if (mainStart !== -1) {
  const mainSlice = content.slice(mainStart, mainStart + 4000);
  console.log('--- MAIN TOP ---');
  // strip excess tags or log text
  console.log(mainSlice.replace(/<svg[\s\S]*?<\/svg>/gi, '[SVG]').slice(0, 2000));
}
