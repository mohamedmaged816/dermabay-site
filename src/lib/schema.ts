import { clinic } from '@/data/clinic';
import type { Lang } from '@/i18n/utils';

export function clinicSchema(site: string, lang: Lang) {
  const s: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': `${site}/#clinic`,
    name: clinic.name,
    alternateName: clinic.nameAr,
    url: lang === 'ar' ? `${site}/ar/` : `${site}/`,
    telephone: clinic.phoneE164,
    medicalSpecialty: 'Dermatology',
    image: `${site}/og/home.png`,
    priceRange: 'EGP',
    address: { '@type': 'PostalAddress', ...clinic.address.schema },
    areaServed: clinic.areasServed.en.map((name) => ({ '@type': 'Place', name })),
    sameAs: [clinic.instagram, clinic.mapsUrl],
    contactPoint: { '@type': 'ContactPoint', telephone: clinic.phoneE164, contactType: 'reservations', availableLanguage: ['ar', 'en'] },
  };
  if (clinic.geo) s.geo = { '@type': 'GeoCoordinates', latitude: clinic.geo.lat, longitude: clinic.geo.lng };
  if (clinic.hours.length) {
    s.openingHoursSpecification = clinic.hours.map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: h.opens, closes: h.closes }));
  }
  if (clinic.rating) {
    s.aggregateRating = { '@type': 'AggregateRating', ratingValue: clinic.rating.value, reviewCount: clinic.rating.count };
  }
  return s;
}

export function procedureSchema(p: { name: string; description: string; url: string }, site: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: p.name,
    description: p.description,
    url: p.url,
    procedureType: 'https://schema.org/NoninvasiveProcedure',
    provider: { '@id': `${site}/#clinic` },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
  };
}

export function articleSchema(a: { headline: string; description: string; url: string; datePublished: string; lang: Lang }, site: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.headline,
    description: a.description,
    url: a.url,
    datePublished: a.datePublished,
    inLanguage: a.lang === 'ar' ? 'ar' : 'en',
    author: { '@id': `${site}/#clinic` },
    publisher: { '@id': `${site}/#clinic` },
    mainEntityOfPage: a.url,
  };
}
