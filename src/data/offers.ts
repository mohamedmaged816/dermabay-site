import type { Lang } from '@/i18n/utils';
export type Offer = { active: boolean; title: Record<Lang, string>; body: Record<Lang, string>; terms: Record<Lang, string>; service?: string };
export const offer: Offer = {
  active: true,
  title: { en: 'Consultation + personalised plan', ar: 'استشارة + خطة مخصصة' },
  body: {
    en: "Book a dermatology consultation this month and leave with a written treatment plan: what you need, how many sessions, and the exact price. Ask on WhatsApp for this month's consultation offer.",
    ar: 'احجز استشارة جلدية الشهر ده واطلع بخطة علاج مكتوبة: محتاج إيه، كام جلسة، والسعر بالظبط. اسأل على واتساب عن عرض الاستشارة بتاع الشهر ده.',
  },
  terms: { en: 'Valid for new patients at the New Giza clinic. One offer per person.', ar: 'ساري للعملاء الجدد في عيادة نيو جيزة. عرض واحد لكل شخص.' },
};
