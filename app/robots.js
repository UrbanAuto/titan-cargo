import { INDEXABLE, url } from '@/lib/seo';

export const dynamic = 'force-static';

export default function robots() {
  if (!INDEXABLE) return { rules: [{ userAgent: '*', disallow: '/' }] };
  return { rules: [{ userAgent: '*', allow: '/' }], sitemap: url('/sitemap.xml') };
}
