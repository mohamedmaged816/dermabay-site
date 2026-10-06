import { describe, it, expect } from 'vitest';
import { buildWhatsAppUrl, waMessage } from '@/lib/whatsapp';

describe('whatsapp', () => {
  it('builds a wa.me url with digits only and encoded text', () => {
    expect(buildWhatsAppUrl('+20 128 890 9990', 'Hi there')).toBe('https://wa.me/201288909990?text=Hi%20there');
  });
  it('waMessage names the service and the site in each language', () => {
    expect(waMessage('en', 'Laser hair removal')).toBe("Hi DermaBay, I'd like to book a consultation for Laser hair removal. I found you on your website.");
    expect(waMessage('ar', 'إزالة الشعر بالليزر')).toBe('أهلاً ديرما باي، عايز/ة أحجز استشارة لـ إزالة الشعر بالليزر. شفتكم على الموقع.');
    expect(waMessage('en')).toBe("Hi DermaBay, I'd like to book a consultation. I found you on your website.");
    expect(waMessage('ar')).toBe('أهلاً ديرما باي، عايز/ة أحجز استشارة. شفتكم على الموقع.');
  });
});
