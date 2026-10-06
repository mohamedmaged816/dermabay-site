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

// Host-agnostic fallback: static meta-refresh pages for the same shortcuts (GitHub Pages has no _redirects).
import { mkdir } from 'node:fs/promises';
const pages = { 'review-us': reviewUrl, 'ar/review-us': reviewUrl, map: mapsUrl, ig: 'https://www.instagram.com/dermabay.eg/' };
for (const [dir, target] of Object.entries(pages)) {
  const d = new URL(`../public/${dir}/`, import.meta.url);
  await mkdir(d, { recursive: true });
  await writeFile(new URL('index.html', d), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0;url=${target}"><link rel="canonical" href="${target}"><title>Redirecting…</title></head><body><p>Redirecting to <a href="${target}">${target}</a></p></body></html>\n`);
}

// robots.txt with the correct sitemap URL for this deployment target.
const site = (process.env.SITE_URL ?? 'https://dermabay.netlify.app').replace(/\/$/, '');
const base = (process.env.BASE_PATH ?? '/').replace(/\/+$/, '');
const bots = ['GPTBot', 'ChatGPT-User', 'OAI-SearchBot', 'ClaudeBot', 'anthropic-ai', 'PerplexityBot', 'Google-Extended', 'Bingbot'];
const robots = ['User-agent: *', 'Allow: /', '', ...bots.flatMap((b) => [`User-agent: ${b}`, 'Allow: /']), '', `Sitemap: ${site}${base}/sitemap-index.xml`, ''].join('\n');
await writeFile(new URL('../public/robots.txt', import.meta.url), robots);
console.log(`redirects: wrote ${lines.length} rules, ${Object.keys(pages).length} redirect pages, robots.txt → ${site}${base}`);
