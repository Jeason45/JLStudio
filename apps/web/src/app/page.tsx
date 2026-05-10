'use client';

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

export default function Home() {
  return (
    <LenisProvider>
      <PreloaderV3 />
      <HeaderV3 />
      <main>
        <HeroParallax />
        <ServicesScrollPin />
        <ProcessJourney />
        <PortfolioStack />
        <TestimonialsSection />
        <AboutJeason />
        <FaqAccordion />
        <ContactParallax />
      </main>
      <FooterMinimal />
    </LenisProvider>
  );
}
