export const LANGS = ['en', 'ar'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'en';

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
  if (lang === 'en') return p;
  return p === '/' ? '/ar/' : `/ar${p}`;
}

export function stripLang(path: string): string {
  const p = normalize(path);
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
