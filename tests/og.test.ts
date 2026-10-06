import { describe, it, expect } from 'vitest';
import { ogImageName } from '@/lib/og';

describe('ogImageName', () => {
  it('maps routes to stable file names', () => {
    expect(ogImageName('/')).toBe('home.png');
    expect(ogImageName('/ar/')).toBe('ar.png');
    expect(ogImageName('/services/laser-hair-removal/')).toBe('services-laser-hair-removal.png');
    expect(ogImageName('/ar/guide/melasma/')).toBe('ar-guide-melasma.png');
  });
});
