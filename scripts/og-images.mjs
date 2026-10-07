import { readdir, readFile, mkdir, writeFile, rm, copyFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);
const CHROME = process.env.CHROME_BIN ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ROOT = new URL('../', import.meta.url).pathname;
const DIST = join(ROOT, 'dist');
const OUT = join(ROOT, 'public', 'og');
const DIST_OUT = join(DIST, 'og');
const TMP = join(ROOT, '.astro', 'og-tmp');
await mkdir(OUT, { recursive: true });
await mkdir(DIST_OUT, { recursive: true });
await mkdir(TMP, { recursive: true });

const fontsCss = (await readFile(join(ROOT, 'src/styles/fonts.css'), 'utf8')).replaceAll('/fonts/', `file://${join(ROOT, 'public/fonts')}/`);

function ogName(route) {
  const t = route.replace(/^\/+|\/+$/g, '');
  return t === '' ? 'home.png' : `${t.replace(/\//g, '-')}.png`;
}
function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
function decode(s) { return s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&'); }

async function walk(dir, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory() && e.name !== 'og') await walk(p, out);
    else if (e.name === 'index.html') out.push(p);
  }
  return out;
}

const files = await walk(DIST);
let n = 0;
for (const f of files) {
  const route = '/' + relative(DIST, f).replace(/index\.html$/, '');
  const html = await readFile(f, 'utf8');
  const lang = /<html[^>]*lang="ar"/.test(html) ? 'ar' : 'en';
  const rawTitle = decode(html.match(/<meta property="og:title" content="([^"]+)"/)?.[1] ?? 'DermaBay');
  const title = rawTitle.replace(/\s*\|\s*DermaBay$/, '').replace(/\s*\|\s*ديرما باي$/, '');
  const eyebrow = lang === 'ar' ? 'عيادة جلدية وليزر · نيو جيزة' : 'Dermatology & Laser · New Giza';
  const page = `<!doctype html><html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}"><head><meta charset="utf-8"><style>
${fontsCss}
html,body{margin:0;width:1200px;height:630px;overflow:hidden}
body{background:#2E3A2F;color:#EFE7D6;font-family:${lang === 'ar' ? "'Cairo'" : "'Jost'"},system-ui,sans-serif;position:relative}
.leaf{position:absolute;right:-140px;top:-120px;width:720px;height:720px;opacity:.55;filter:blur(1.5px)}
[dir=rtl] .leaf{right:auto;left:-140px;transform:scaleX(-1)}
.wrap{position:absolute;inset:0;padding:64px 80px;display:flex;flex-direction:column;justify-content:space-between}
.eyebrow{font-size:18px;letter-spacing:${lang === 'ar' ? '0' : '.28em'};text-transform:uppercase;color:#C4A96B;font-weight:500}
h1{font-family:${lang === 'ar' ? "'Amiri'" : "'Bodoni Moda'"},serif;font-weight:400;font-size:${title.length > 50 ? 60 : 76}px;line-height:1.02;margin:0;max-width:760px;color:#EFE7D6}
.mark{position:absolute;${lang === 'ar' ? 'left' : 'right'}:80px;bottom:56px;font-family:'Bodoni Moda',serif;font-size:88px;line-height:.86;letter-spacing:.08em;text-transform:uppercase;color:#EFE7D6;text-align:left;direction:ltr}
.foot{display:flex;gap:28px;font-size:18px;color:rgba(239,231,214,.6);letter-spacing:.04em}
</style></head><body>
<svg class="leaf" viewBox="0 0 400 600" fill="#212B23"><path d="M300 40c-70 10-120 70-130 150 20-10 40-30 55-55-5 45-25 80-55 105 30 0 60-15 85-40-10 45-35 80-70 100 40 5 75-10 100-40 0 45-20 85-55 110 45-5 80-30 100-70 10 40 0 80-25 110 55-25 90-80 95-150 20 30 30 60 30 95 25-60 20-130-15-185-20-30-50-55-85-70 10-25 25-45 45-60-30-10-50-10-75 0z"/><path d="M40 600c20-120 70-220 150-300-60 20-110 60-150 110 30-70 80-130 150-170-70 10-130 40-180 90 40-60 100-110 170-140-80 0-150 30-200 80 50-60 120-100 200-110-20 10-30 30-30 50-60 60-100 140-110 240z" opacity=".8"/></svg>
<div class="wrap"><div><div class="eyebrow">${esc(eyebrow)}</div><h1 style="margin-top:28px">${esc(title)}</h1></div>
<div class="foot"><span>Meditown · NewGiza Health Park</span><span dir="ltr">WhatsApp 01288909990</span></div></div>
<div class="mark">Der<br>Ma<br>Bay</div>
</body></html>`;
  const tmpHtml = join(TMP, ogName(route).replace(/\.png$/, '.html'));
  await writeFile(tmpHtml, page);
  const outPng = join(OUT, ogName(route));
  await run(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', '--no-first-run', '--no-default-browser-check', `--screenshot=${outPng}`, '--window-size=1200,630', `file://${tmpHtml}`], { timeout: 30000 });
  await copyFile(outPng, join(DIST_OUT, ogName(route)));
  n++;
}
await rm(TMP, { recursive: true, force: true });
console.log(`og: rendered ${n} images to public/og/ (committed) and copied to dist/og/`);
