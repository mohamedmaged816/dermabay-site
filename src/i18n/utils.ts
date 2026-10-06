export const LANGS = ['en', 'ar'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'en';
/** Site base path without trailing slash ('' for root). Set by Astro from `base`; '' under tests. */
export const BASE: string = ((import.meta as any).env?.BASE_URL ?? '/').replace(/\/+$/, '');
export function withBase(path: string): string {
  return BASE + (path.startsWith('/') ? path : `/${path}`);
}
export function stripBase(path: string): string {
  return BASE && path.startsWith(BASE + '/') ? path.slice(BASE.length) : path;
}

export function langPaths() {
  return [
    { params: { lang: undefined }, props: { lang: 'en' as Lang } },
    { params: { lang: 'ar' }, props: { lang: 'ar' as Lang } },
  ];
}

function normalize(path: string): string {
  let p = path.startsWith('/') ? path : `/${path}`;
  if (!p.endsWith('/')) p += '/';
  return p;
}

export function localizePath(path: string, lang: Lang): string {
  const p = normalize(path);
  const local = lang === 'en' ? p : p === '/' ? '/ar/' : `/ar${p}`;
  return withBase(local);
}

export function stripLang(path: string): string {
  const p = normalize(stripBase(path));
  if (p === '/ar/') return '/';
  if (p.startsWith('/ar/')) return p.slice(3);
  return p;
}

export function alternatePath(currentPath: string, target: Lang): string {
  return localizePath(stripLang(currentPath), target);
}

export function hreflangOf(lang: Lang): string {
  return lang === 'ar' ? 'ar-EG' : 'en';
}

export function dirOf(lang: Lang): 'rtl' | 'ltr' {
  return lang === 'ar' ? 'rtl' : 'ltr';
}

export function otherLang(lang: Lang): Lang {
  return lang === 'ar' ? 'en' : 'ar';
}
