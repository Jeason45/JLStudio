// Route /preview : aperçu du site avec le contenu BROUILLON du CRM.
// Embarqué en iframe dans l'éditeur sur-mesure (portal.jlstudio.dev).

import LenisProvider from '@/components/landing-v3/LenisProvider';
import HeaderV3 from '@/components/landing-v3/HeaderV3';
import HeroParallax from '@/components/landing-v3/HeroParallax';
import AboutJeason from '@/components/landing-v3/AboutJeason';
import ServicesScrollPin from '@/components/landing-v3/ServicesScrollPin';
import ProcessJourney from '@/components/landing-v3/ProcessJourney';
import PortfolioStack from '@/components/landing-v3/PortfolioStack';
import TestimonialsSection from '@/components/landing-v3/TestimonialsSection';
import FaqAccordion from '@/components/landing-v3/FaqAccordion';
import ContactParallax from '@/components/landing-v3/ContactParallax';
import FooterMinimal from '@/components/landing-v3/FooterMinimal';
import { getJlStudioProps } from '@/lib/jlstudio-content';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const metadata = { title: 'Aperçu — JL Studio', robots: { index: false, follow: false } };

export default async function PreviewPage() {
  const p = await getJlStudioProps('draft');

  return (
    <LenisProvider>
      <div
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
          padding: '8px 16px', background: '#0f172a', color: 'white',
          fontSize: 11, fontWeight: 500,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}
      >
        <span>🔍 Aperçu — {p.isDraft ? <strong style={{ color: '#fbbf24' }}>BROUILLON</strong> : <strong style={{ color: '#22c55e' }}>EN LIGNE</strong>}</span>
        <span style={{ opacity: 0.5 }}>·</span>
        <span style={{ opacity: 0.7 }}>{p.available ? 'Rendu réel landing-v3' : '⚠ Portail inaccessible — fallback hardcoded'}</span>
      </div>

      <HeaderV3 {...p.header} />
      <main style={{ paddingTop: 32 }}>
        <HeroParallax {...p.hero} />
        <ServicesScrollPin {...p.services} />
        <ProcessJourney {...p.process} />
        <PortfolioStack {...p.portfolio} />
        <TestimonialsSection {...p.testimonials} />
        <AboutJeason {...p.about} />
        <FaqAccordion {...p.faq} />
        <ContactParallax {...p.contact} />
      </main>
      <FooterMinimal {...p.footer} />
    </LenisProvider>
  );
}
