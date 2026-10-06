import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const errors = [];

async function walk(dir, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) await walk(p, out);
    else if (e.name === 'index.html') out.push(p);
  }
  return out;
}

const files = await walk(DIST);
const routes = new Set(files.map((f) => '/' + relative(DIST, f).replace(/index\.html$/, '')));
const skip = new Set(['/404/']);

for (const f of files) {
  const route = '/' + relative(DIST, f).replace(/index\.html$/, '');
  if (skip.has(route)) continue;
  const html = await readFile(f, 'utf8');
  const isAr = route.startsWith('/ar/');
  const pair = isAr ? route.slice(3) : '/ar' + route;
  if (!routes.has(pair)) errors.push(`${route}: missing language pair ${pair}`);
  if (!/<html[^>]*\slang="(en|ar)"/.test(html)) errors.push(`${route}: missing html lang`);
  if (isAr && !/<html[^>]*\sdir="rtl"/.test(html)) errors.push(`${route}: Arabic page without dir=rtl`);
  if (!/<title>[^<]{10,}<\/title>/.test(html)) errors.push(`${route}: missing/short <title>`);
  if (!/<meta name="description" content="[^"]{50,}"/.test(html)) errors.push(`${route}: missing/short meta description`);
  if (!/<link rel="canonical"/.test(html)) errors.push(`${route}: missing canonical`);
  for (const hl of ['en', 'ar-EG', 'x-default']) {
    if (!html.includes(`hreflang="${hl}"`)) errors.push(`${route}: missing hreflang ${hl}`);
  }
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (ld.length === 0) errors.push(`${route}: no JSON-LD`);
  for (const m of ld) {
    try { const obj = JSON.parse(m[1]); if (!obj['@type']) errors.push(`${route}: JSON-LD without @type`); }
    catch { errors.push(`${route}: invalid JSON-LD`); }
  }
  if (!html.includes('data-wa=')) errors.push(`${route}: no WhatsApp CTA`);
  if (!/<meta property="og:image" content="[^"]+\/og\/[^"]+\.png"/.test(html)) errors.push(`${route}: missing og:image`);
}

const must = ['/', '/ar/', '/services/', '/ar/services/', '/new-giza-dermatologist/', '/ar/new-giza-dermatologist/', '/guide/', '/ar/guide/', '/offers/', '/ar/offers/', '/about/', '/ar/about/', '/contact/', '/ar/contact/', '/results/', '/ar/results/', '/reviews/', '/ar/reviews/'];
for (const r of must) if (!routes.has(r)) errors.push(`required route missing: ${r}`);

if (errors.length) {
  console.error(`check-build: ${errors.length} problem(s)\n` + errors.map((e) => ' - ' + e).join('\n'));
  process.exit(1);
}
console.log(`check-build: ${files.length} pages OK (parity, lang/dir, title, description, canonical, hreflang, JSON-LD, WhatsApp CTA, og:image)`);
