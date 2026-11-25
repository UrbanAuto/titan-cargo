import './globals.css';
import { Unbounded, Manrope } from 'next/font/google';

const display = Unbounded({ subsets: ['latin', 'cyrillic'], variable: '--f-display', weight: ['500', '600', '700', '800'], display: 'swap' });
const body = Manrope({ subsets: ['latin', 'cyrillic'], variable: '--f-body', display: 'swap' });

export const metadata = {
  title: 'Titan Cargo — пригін авто зі США, Канади та Європи',
  description: 'Підбір, викуп на аукціонах Copart та IAAI, доставка і розмитнення авто під ключ. Калькулятор вартості та особистий кабінет.',
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/img/logo-stacked.png` },
};

export const viewport = { themeColor: '#0a0a0c' };

export default function RootLayout({ children }) {
  return (
    <html lang="uk" suppressHydrationWarning className={`${display.variable} ${body.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {children}
      </body>
    </html>
  );
}
