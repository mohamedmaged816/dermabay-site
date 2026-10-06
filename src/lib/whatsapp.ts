import type { Lang } from '@/i18n/utils';

export function buildWhatsAppUrl(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function waMessage(lang: Lang, service?: string): string {
  if (lang === 'ar') {
    return service
      ? `أهلاً ديرما باي، عايز/ة أحجز استشارة لـ ${service}. شفتكم على الموقع.`
      : 'أهلاً ديرما باي، عايز/ة أحجز استشارة. شفتكم على الموقع.';
  }
  return service
    ? `Hi DermaBay, I'd like to book a consultation for ${service}. I found you on your website.`
    : "Hi DermaBay, I'd like to book a consultation. I found you on your website.";
}
