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
  const eyebrow = lang === 'ar' ? 'ديرما باي · عيادة جلدية وليزر · نيو جيزة' : 'DermaBay · Dermatology & Laser · New Giza';
  const page = `<!doctype html><html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}"><head><meta charset="utf-8"><style>
${fontsCss}
html,body{margin:0;width:1200px;height:630px;overflow:hidden}
body{background:#F6F1E6;color:#3E4939;font-family:'Cairo',system-ui,sans-serif;position:relative}
.arc{position:absolute;right:-120px;top:-160px;width:760px;height:760px}
[dir=rtl] .arc{right:auto;left:-120px;transform:scaleX(-1)}
.wrap{position:absolute;inset:0;padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between}
.eyebrow{font-size:22px;letter-spacing:${lang === 'ar' ? '0' : '.18em'};text-transform:uppercase;color:#A98B4D;font-weight:600}
h1{font-family:${lang === 'ar' ? "'Amiri'" : "'Cormorant Garamond'"},serif;font-weight:600;font-size:${title.length > 50 ? 64 : 80}px;line-height:1.1;margin:0;max-width:900px}
.bar{height:6px;width:160px;background:#C2A566;border-radius:3px}
.foot{display:flex;justify-content:space-between;font-size:24px;color:#5C6A55}
</style></head><body>
<svg class="arc" viewBox="0 0 400 400"><path d="M20 320a180 180 0 0 1 360 0" fill="none" stroke="#C2A566" stroke-width="1.5"/><path d="M70 320a130 130 0 0 1 260 0" fill="none" stroke="#C2A566" stroke-width="1.5"/><path d="M120 320a80 80 0 0 1 160 0" fill="none" stroke="#3E4939" stroke-width="1.5"/></svg>
<div class="wrap"><div><div class="eyebrow">${esc(eyebrow)}</div><div class="bar" style="margin:28px 0"></div><h1>${esc(title)}</h1></div>
<div class="foot"><span>Meditown · NewGiza Health Park</span><span dir="ltr">WhatsApp 01288909990</span></div></div>
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
