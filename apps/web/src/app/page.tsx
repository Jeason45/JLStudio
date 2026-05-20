import LenisProvider from '@/components/landing-v3/LenisProvider';
import PreloaderV3 from '@/components/landing-v3/PreloaderV3';
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

// ISR : régénère au max toutes les 60s. Une revalidation on-demand est
// aussi déclenchée par le CRM au moment du "Publier" (cf. /api/revalidate).
export const revalidate = 60;

export default async function Home() {
  // Contenu publié (live). Si indisponible → les composants gardent leur hardcodé.
  const p = await getJlStudioProps('live');

  return (
    <LenisProvider>
      <PreloaderV3 />
      <HeaderV3 {...p.header} />
      <main>
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
