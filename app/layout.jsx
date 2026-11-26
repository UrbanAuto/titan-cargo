import './globals.css';
import '@fontsource-variable/unbounded';
import '@fontsource-variable/manrope';
import { ORIGIN, BASE, INDEXABLE, TITLE, DESCRIPTION, KEYWORDS, orgJsonLd, pageMeta } from '@/lib/seo';
import FloatingContact from '@/components/FloatingContact';


export const metadata = {
  metadataBase: new URL(ORIGIN),
  applicationName: 'Titan Cargo',
  keywords: KEYWORDS,
  authors: [{ name: 'Titan Cargo' }],
  ...pageMeta({ title: TITLE, description: DESCRIPTION, path: '/' }),
  title: { default: TITLE, template: '%s' },
  robots: INDEXABLE ? { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } } : { index: false, follow: false },
  icons: { icon: [{ url: `${BASE}/icon.png`, type: 'image/png' }], apple: `${BASE}/apple-icon.png` },
  formatDetection: { telephone: true },
};

export const viewport = { themeColor: '#0a0a0c', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd()) }} />
        {children}
        <FloatingContact />
      </body>
    </html>
  );
}
