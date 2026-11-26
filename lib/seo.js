import { SITE, FAQ } from './data';

// Адреса сайту для SEO. Для збірки під домен: NEXT_PUBLIC_SITE_URL=https://ваш-домен
// Без неї (тестова збірка на GitHub Pages) сайт закритий від індексації.
const GH = 'https://urbanauto.github.io';
export const INDEXABLE = !!process.env.NEXT_PUBLIC_SITE_URL;
export const ORIGIN = process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL).origin : GH;
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const url = (path = '/') => `${ORIGIN}${BASE}${path}`;

export const TITLE = 'Titan Cargo — пригін авто зі США, Канади та Європи під ключ | Київ';
export const DESCRIPTION = 'Пригін авто під ключ: підбір, викуп на аукціонах Copart та IAAI, доставка, розмитнення. Каталог лотів, калькулятор вартості, особистий кабінет. Київ, Кловський узвіз 7а.';
export const KEYWORDS = ['пригін авто зі США', 'авто з Канади', 'авто з Європи', 'авто під ключ', 'Copart', 'IAAI', 'аукціон авто', 'розмитнення авто', 'калькулятор пригону авто', 'Titan Cargo', 'Київ'];

export const orgJsonLd = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['AutoDealer', 'LocalBusiness'],
      '@id': `${url('/')}#org`,
      name: 'Titan Cargo',
      url: url('/'),
      logo: url('/img/logo-stacked.png'),
      image: url('/img/og.png'),
      description: DESCRIPTION,
      telephone: SITE.phone,
      email: SITE.email,
      address: { '@type': 'PostalAddress', streetAddress: 'Кловський узвіз, 7а', addressLocality: 'Київ', addressCountry: 'UA' },
      areaServed: ['UA'],
      knowsAbout: ['Пригін авто зі США', 'Пригін авто з Канади', 'Пригін авто з Європи', 'Аукціони Copart та IAAI', 'Розмитнення авто'],
      sameAs: [SITE.instagram, SITE.facebook, SITE.tiktok],
      contactPoint: [{ '@type': 'ContactPoint', telephone: SITE.phone, contactType: 'sales', availableLanguage: ['uk', 'ru', 'en'] }],
    },
    { '@type': 'WebSite', '@id': `${url('/')}#site`, url: url('/'), name: 'Titan Cargo', inLanguage: 'uk', publisher: { '@id': `${url('/')}#org` } },
  ],
});

export const faqJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

export const pageMeta = ({ title, description, path }) => ({
  title, description,
  alternates: { canonical: url(path) },
  openGraph: { type: 'website', locale: 'uk_UA', siteName: 'Titan Cargo', title, description, url: url(path), images: [{ url: url('/img/og.png'), width: 1200, height: 630, alt: 'Titan Cargo — пригін авто' }] },
  twitter: { card: 'summary_large_image', title, description, images: [url('/img/og.png')] },
});
