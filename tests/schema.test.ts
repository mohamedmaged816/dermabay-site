import { describe, it, expect } from 'vitest';
import { clinicSchema, procedureSchema, faqSchema, breadcrumbSchema, articleSchema } from '@/lib/schema';

const SITE = 'https://dermabay.netlify.app';

describe('schema builders', () => {
  it('clinicSchema has the entity basics', () => {
    const s = clinicSchema(SITE, 'en');
    expect(s['@type']).toBe('MedicalClinic');
    expect(s['@id']).toBe(`${SITE}/#clinic`);
    expect(s.name).toBe('DermaBay Aesthetic Clinic');
    expect(s.telephone).toBe('+201288909990');
    expect(s.medicalSpecialty).toBe('Dermatology');
    expect(s.address.addressCountry).toBe('EG');
    expect(s.sameAs).toContain('https://www.instagram.com/dermabay.eg/');
  });
  it('procedureSchema links back to the clinic', () => {
    const s = procedureSchema({ name: 'Laser hair removal', description: 'd', url: `${SITE}/services/laser-hair-removal/` }, SITE);
    expect(s['@type']).toBe('MedicalProcedure');
    expect(s.provider['@id']).toBe(`${SITE}/#clinic`);
  });
  it('faqSchema maps q/a', () => {
    const s = faqSchema([{ q: 'Q1', a: 'A1' }]);
    expect(s['@type']).toBe('FAQPage');
    expect(s.mainEntity[0].acceptedAnswer.text).toBe('A1');
  });
  it('breadcrumbSchema numbers positions from 1', () => {
    const s = breadcrumbSchema([{ name: 'Home', url: `${SITE}/` }, { name: 'Services', url: `${SITE}/services/` }]);
    expect(s.itemListElement[1].position).toBe(2);
  });
  it('articleSchema has publisher as the clinic', () => {
    const s = articleSchema({ headline: 'H', description: 'D', url: `${SITE}/guide/x/`, datePublished: '2026-10-07', lang: 'en' }, SITE);
    expect(s['@type']).toBe('Article');
    expect(s.publisher['@id']).toBe(`${SITE}/#clinic`);
    expect(s.inLanguage).toBe('en');
  });
});
