export const clinic = {
  name: 'DermaBay Aesthetic Clinic',
  shortName: 'DermaBay',
  nameAr: 'ديرما باي',
  tagline: { en: 'The first skin & hair clinic in New Giza', ar: 'أول عيادة جلدية وشعر في نيو جيزة' },
  phoneDisplay: '01288909990',
  phoneE164: '+201288909990',
  whatsapp: '+201288909990',
  email: '',
  instagram: 'https://www.instagram.com/dermabay.eg/',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=DermaBay+Aesthetic+Clinic+Meditown+New+Giza',
  reviewUrl: 'https://www.google.com/maps/search/?api=1&query=DermaBay+Aesthetic+Clinic+Meditown+New+Giza',
  geo: null as null | { lat: number; lng: number },
  rating: null as null | { value: number; count: number },
  address: {
    en: { line1: 'Meditown, NewGiza Health Park', line2: 'Building 2, Clinic 203', city: 'New Giza, 6th of October', region: 'Giza', country: 'Egypt' },
    ar: { line1: 'ميديتاون، نيو جيزة هيلث بارك', line2: 'مبنى 2، عيادة 203', city: 'نيو جيزة، 6 أكتوبر', region: 'الجيزة', country: 'مصر' },
    schema: { streetAddress: 'Meditown, NewGiza Health Park, Building 2, Clinic 203', addressLocality: 'New Giza, 6th of October City', addressRegion: 'Giza', addressCountry: 'EG' },
  },
  // Schema.org openingHoursSpecification; empty until confirmed from the Google listing.
  hours: [] as { days: string[]; opens: string; closes: string }[],
  hoursText: { en: "By appointment. Message us on WhatsApp for today's availability.", ar: 'بالحجز المسبق. ابعتلنا على واتساب تعرف المواعيد المتاحة النهارده.' },
  areasServed: {
    en: ['New Giza', 'Sheikh Zayed', '6th of October', 'Palm Hills', 'Pyramids Heights', 'West Cairo'],
    ar: ['نيو جيزة', 'الشيخ زايد', '6 أكتوبر', 'بالم هيلز', 'بيراميدز هايتس', 'غرب القاهرة'],
  },
};
