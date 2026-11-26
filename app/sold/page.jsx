import SoldPage from '@/components/SoldPage';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Пошук проданих лотів за VIN — Titan Cargo',
  description: 'Перевірте, за скільки продано авто на Copart чи IAAI: ціна продажу, дата, локація та пошкодження за VIN або номером лота.',
  path: '/sold/',
});

export default function Page() { return <SoldPage />; }
