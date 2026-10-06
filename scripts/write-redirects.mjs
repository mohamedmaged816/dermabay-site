import { writeFile, readFile } from 'node:fs/promises';
// Read reviewUrl and mapsUrl straight from the TS source without a TS loader.
const src = await readFile(new URL('../src/data/clinic.ts', import.meta.url), 'utf8');
const pick = (key) => src.match(new RegExp(`${key}:\\s*'([^']+)'`))?.[1];
const reviewUrl = pick('reviewUrl');
const mapsUrl = pick('mapsUrl');
if (!reviewUrl || !mapsUrl) throw new Error('clinic.ts must define reviewUrl and mapsUrl as single-quoted strings');
const lines = [
  `/review-us  ${reviewUrl}  302`,
  `/review-us/  ${reviewUrl}  302`,
  `/ar/review-us  ${reviewUrl}  302`,
  `/ar/review-us/  ${reviewUrl}  302`,
  `/map  ${mapsUrl}  302`,
  `/ig  https://www.instagram.com/dermabay.eg/  302`,
];
await writeFile(new URL('../public/_redirects', import.meta.url), lines.join('\n') + '\n');
console.log(`redirects: wrote ${lines.length} rules`);
