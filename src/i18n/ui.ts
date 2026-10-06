import type { Lang } from './utils';

const en = {
  nav_services: 'Services', nav_results: 'Results', nav_reviews: 'Reviews', nav_offers: 'Offers', nav_guide: 'Skin Guide', nav_about: 'About', nav_contact: 'Contact', nav_location: 'New Giza clinic',
  book_whatsapp: 'Book on WhatsApp', chat_whatsapp: 'Chat on WhatsApp', call: 'Call', directions: 'Get directions', see_all_services: 'See all services', read_more: 'Read more',
  home_eyebrow: 'Skin · Hair · Laser · New Giza',
  home_h1: 'Dermatology and aesthetic care in New Giza, done properly.',
  home_sub: 'Medical dermatology, laser and skin treatments in Meditown, NewGiza Health Park. Real doctors, real results, no hard sell.',
  home_services_title: 'What we treat', home_services_sub: "Every treatment starts with a consultation. We tell you what will work, and what won't.",
  home_why_title: 'Why DermaBay',
  home_why: [
    ['Medical first', 'A dermatology clinic, not a beauty salon. Diagnosis before any device.'],
    ['Inside Meditown', 'Minutes from Sheikh Zayed and 6th of October, with easy parking at NewGiza Health Park.'],
    ['Honest plans', 'You get a written plan with sessions and price before you start.'],
  ],
  home_guide_title: 'From the Skin Guide',
  summary_label: 'In short',
  svc_for: 'Who it suits', svc_notfor: 'Who it does not suit', svc_session: 'What happens in the session', svc_downtime: 'Downtime and aftercare', svc_results: 'Results timeline', svc_sessions: 'Number of sessions', svc_price: 'Price', svc_price_ask: 'Ask for the current price on WhatsApp.', svc_faq: 'Common questions', svc_related: 'Related reading',
  faq_title: 'Frequently asked questions',
  reviews_title: 'What patients say', reviews_sub: 'Reviews are from our Google listing.', reviews_cta: 'Read all reviews on Google', reviews_empty: 'Read our patient reviews on Google.', review_us: 'Been to DermaBay? Leave a review',
  results_title: 'Before and after', results_sub: 'Real DermaBay patients, shared with written consent. Results vary from person to person.', results_empty: 'We share new results every week on Instagram.', results_ig: 'See results on Instagram',
  offers_title: 'Current offer', offers_sub: "One honest offer at a time. Ask about it on WhatsApp and we'll confirm the price before you book.",
  guide_title: 'Skin Guide', guide_sub: 'Short, straight answers from a dermatology clinic in New Giza.',
  about_title: 'About DermaBay',
  contact_title: 'Contact and location', contact_address: 'Address', contact_hours: 'Hours', contact_phone: 'Phone',
  location_eyebrow: 'Dermatologist in New Giza',
  cta_title: 'Ready when you are.', cta_sub: 'Message us on WhatsApp. A real person replies, usually within the hour during clinic time.',
  footer_rights: 'All rights reserved.', footer_privacy: 'Privacy', footer_areas: 'Serving',
  breadcrumb_home: 'Home',
  notfound_title: 'Page not found', notfound_sub: 'The page may have moved. Try the homepage.', notfound_home: 'Go to homepage',
  privacy_title: 'Privacy notice',
  lang_switch: 'العربية',
};

const ar: Record<keyof typeof en, any> = {
  nav_services: 'الخدمات', nav_results: 'النتائج', nav_reviews: 'آراء العملاء', nav_offers: 'العروض', nav_guide: 'دليل البشرة', nav_about: 'عن العيادة', nav_contact: 'تواصل معنا', nav_location: 'عيادة نيو جيزة',
  book_whatsapp: 'احجز على واتساب', chat_whatsapp: 'كلمنا على واتساب', call: 'اتصل', directions: 'الاتجاهات', see_all_services: 'كل الخدمات', read_more: 'اقرأ المزيد',
  home_eyebrow: 'بشرة · شعر · ليزر · نيو جيزة',
  home_h1: 'جلدية وتجميل في نيو جيزة، بالطريقة الصح.',
  home_sub: 'جلدية طبية وليزر وعلاجات بشرة في ميديتاون، نيو جيزة هيلث بارك. دكاترة حقيقيين، نتايج حقيقية، ومن غير إلحاح.',
  home_services_title: 'بنعالج إيه', home_services_sub: 'كل علاج بيبدأ باستشارة. بنقولك إيه اللي هينفع، وإيه اللي مش هينفع.',
  home_why_title: 'ليه ديرما باي',
  home_why: [
    ['الطب الأول', 'عيادة جلدية مش بيوتي سنتر. تشخيص قبل أي جهاز.'],
    ['جوه ميديتاون', 'دقايق من الشيخ زايد و6 أكتوبر، وركنة سهلة في نيو جيزة هيلث بارك.'],
    ['خطة واضحة', 'بتاخد خطة مكتوبة بعدد الجلسات والسعر قبل ما تبدأ.'],
  ],
  home_guide_title: 'من دليل البشرة',
  summary_label: 'باختصار',
  svc_for: 'مناسب لمين', svc_notfor: 'مش مناسب لمين', svc_session: 'بيحصل إيه في الجلسة', svc_downtime: 'فترة الراحة والعناية بعدها', svc_results: 'النتيجة تبان إمتى', svc_sessions: 'عدد الجلسات', svc_price: 'السعر', svc_price_ask: 'اسأل عن السعر الحالي على واتساب.', svc_faq: 'أسئلة شائعة', svc_related: 'اقرأ كمان',
  faq_title: 'الأسئلة الشائعة',
  reviews_title: 'رأي عملائنا', reviews_sub: 'الآراء من صفحتنا على جوجل.', reviews_cta: 'اقرأ كل الآراء على جوجل', reviews_empty: 'اقرأ آراء عملائنا على جوجل.', review_us: 'زرت ديرما باي؟ سيبلنا رأيك',
  results_title: 'قبل وبعد', results_sub: 'عملاء ديرما باي الحقيقيين، بموافقة مكتوبة. النتايج بتختلف من شخص لشخص.', results_empty: 'بننزل نتايج جديدة كل أسبوع على إنستجرام.', results_ig: 'شوف النتايج على إنستجرام',
  offers_title: 'العرض الحالي', offers_sub: 'عرض واحد واضح في كل مرة. اسأل عنه على واتساب وهنأكدلك السعر قبل الحجز.',
  guide_title: 'دليل البشرة', guide_sub: 'إجابات قصيرة ومباشرة من عيادة جلدية في نيو جيزة.',
  about_title: 'عن ديرما باي',
  contact_title: 'التواصل والعنوان', contact_address: 'العنوان', contact_hours: 'المواعيد', contact_phone: 'التليفون',
  location_eyebrow: 'دكتور جلدية في نيو جيزة',
  cta_title: 'جاهزين لما تكون جاهز.', cta_sub: 'ابعتلنا على واتساب. بيرد عليك حد حقيقي، غالباً في خلال ساعة وقت العيادة.',
  footer_rights: 'جميع الحقوق محفوظة.', footer_privacy: 'الخصوصية', footer_areas: 'بنخدم',
  breadcrumb_home: 'الرئيسية',
  notfound_title: 'الصفحة مش موجودة', notfound_sub: 'يمكن الصفحة اتنقلت. جرب الصفحة الرئيسية.', notfound_home: 'الصفحة الرئيسية',
  privacy_title: 'سياسة الخصوصية',
  lang_switch: 'English',
};

export const ui = { en, ar } as const;
export type UiKey = keyof typeof en;
export function t(lang: Lang) {
  return (key: UiKey): any => ui[lang][key];
}
