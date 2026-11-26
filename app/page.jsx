import Site from '@/components/Site';
import { faqJsonLd } from '@/lib/seo';

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }} />
      <Site />
    </>
  );
}
