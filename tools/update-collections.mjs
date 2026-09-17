import fs from 'fs';

const filePath = 'src/data/collections.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Mark school as hasEngravedText: true
data.hero[0].hasEngravedText = true;

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
console.log('Updated collections.json with hasEngravedText: true for school');
