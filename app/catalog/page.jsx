import CatalogPage from '@/components/CatalogPage';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Каталог авто з аукціонів Copart та IAAI — Titan Cargo',
  description: 'Усі лоти Copart та IAAI: пошук за маркою, моделлю, VIN чи номером лота, фільтри, фото та поточні ставки. Пригін авто під ключ.',
  path: '/catalog/',
});

export default function Page() { return <CatalogPage />; }
