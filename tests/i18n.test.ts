import { describe, it, expect } from 'vitest';
import { langPaths, localizePath, alternatePath, stripLang, hreflangOf, dirOf } from '@/i18n/utils';

describe('i18n utils', () => {
  it('langPaths yields root for en and /ar prefix for ar', () => {
    expect(langPaths()).toEqual([
      { params: { lang: undefined }, props: { lang: 'en' } },
      { params: { lang: 'ar' }, props: { lang: 'ar' } },
    ]);
  });
  it('localizePath adds trailing slash and ar prefix', () => {
    expect(localizePath('/', 'en')).toBe('/');
    expect(localizePath('/', 'ar')).toBe('/ar/');
    expect(localizePath('services/laser-hair-removal', 'ar')).toBe('/ar/services/laser-hair-removal/');
    expect(localizePath('/about/', 'en')).toBe('/about/');
  });
  it('stripLang removes the ar prefix only', () => {
    expect(stripLang('/ar/about/')).toBe('/about/');
    expect(stripLang('/ar/')).toBe('/');
    expect(stripLang('/about/')).toBe('/about/');
    expect(stripLang('/arabic-thing/')).toBe('/arabic-thing/');
  });
  it('alternatePath swaps language', () => {
    expect(alternatePath('/ar/services/x/', 'en')).toBe('/services/x/');
    expect(alternatePath('/services/x/', 'ar')).toBe('/ar/services/x/');
  });
  it('hreflang and dir', () => {
    expect(hreflangOf('ar')).toBe('ar-EG');
    expect(hreflangOf('en')).toBe('en');
    expect(dirOf('ar')).toBe('rtl');
    expect(dirOf('en')).toBe('ltr');
  });
});
