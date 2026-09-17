import fs from 'fs';

async function run() {
  const target = encodeURIComponent('https://www.smiggle.co.uk');
  const hide = encodeURIComponent('.modal-dialog, div[class*="modal"], div[class*="overlay"], .ReactModal__Overlay, [role="dialog"], #countrySelectorModal, .country-modal');
  const apiUrl = `https://api.microlink.io/?url=${target}&screenshot=true&meta=false&waitForTimeout=3000&hide=${hide}`;
  console.log('Calling:', apiUrl);
  const res = await fetch(apiUrl);
  const data = await res.json();
  console.log('Result status:', data.status, 'url:', data.data?.screenshot?.url);
  if (data.data?.screenshot?.url) {
    const imgRes = await fetch(data.data.screenshot.url);
    const buf = Buffer.from(await imgRes.arrayBuffer());
    const out = 'C:\\Users\\risha\\.gemini\\antigravity-ide\\brain\\dad20a5d-e9b2-4c53-9108-1599819fda72\\references\\smiggle-clean.png';
    fs.writeFileSync(out, buf);
    fs.writeFileSync('G:\\Stationery point\\research\\reference-captures\\smiggle-clean.png', buf);
    console.log('Saved smiggle-clean.png successfully!');
  }
}
run().catch(console.error);
