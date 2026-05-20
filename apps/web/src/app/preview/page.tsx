// Route /preview : aperçu du site jlstudio.dev avec le contenu BROUILLON
// du CRM portal.jlstudio.dev. Server-side fetch vers l'endpoint interne.
//
// Cette page est embarquée en iframe dans l'éditeur sur-mesure du CRM
// (portal.jlstudio.dev/admin/sites/[id]/edit-jlstudio).

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

import type { HeroContent } from '@/components/landing-v3/HeroParallax';
import type { ServiceItem, ServicesContent } from '@/components/landing-v3/ServicesScrollPin';

// Forcer dynamic rendering (pas de cache statique) pour toujours avoir le dernier draft
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

// Pas de cache, pas d'index SEO
export const metadata = {
  title: 'Aperçu — JL Studio',
  robots: { index: false, follow: false },
};

interface PortalServiceItem {
  number?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  image?: string;
  pricingAmount?: string;
  pricingDelivery?: string;
  pricingFallback?: string;
}

interface PortalJlContent {
  hero?: Partial<HeroContent>;
  services?: { eyebrow?: string; title?: string; items?: PortalServiceItem[] };
  // les autres sections restent hardcoded dans les composants pour V1
  // — on les branche progressivement
}

interface PreviewApiResponse {
  siteId: string;
  slug: string;
  isDraft: boolean;
  publishedAt: string | null;
  content: PortalJlContent;
}

async function fetchPreviewContent(): Promise<PreviewApiResponse | null> {
  const secret = process.env.INTERNAL_API_SECRET;
  const portalUrl = process.env.PORTAL_INTERNAL_URL || 'https://portal.jlstudio.dev';
  if (!secret) return null;

  try {
    const res = await fetch(`${portalUrl}/api/internal/jlstudio-preview?mode=draft`, {
      headers: { Authorization: `Bearer ${secret}` },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return (await res.json()) as PreviewApiResponse;
  } catch {
    return null;
  }
}

// Mappe le payload portail vers les props des composants web
function mapServices(items?: PortalServiceItem[]): ServicesContent | undefined {
  if (!items || items.length === 0) return undefined;
  const mapped: ServiceItem[] = items.map((it) => ({
    number: it.number || '',
    title: it.title || '',
    subtitle: it.subtitle || '',
    description: it.description || '',
    features: it.features || [],
    image: it.image || '',
    pricing: {
      amount: it.pricingAmount || undefined,
      delivery: it.pricingDelivery || undefined,
      fallbackLabel: it.pricingFallback || undefined,
    },
  }));
  return { items: mapped };
}

export default async function PreviewPage() {
  const data = await fetchPreviewContent();
  const content = data?.content || {};

  const heroProps  = content.hero  ? { content: { ...content.hero } as HeroContent } : {};
  const servicesProps = { content: mapServices(content.services?.items) };

  return (
    <LenisProvider>
      {/* Bandeau aperçu */}
      <div
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
          padding: '8px 16px', background: '#0f172a', color: 'white',
          fontSize: 11, fontWeight: 500,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}
      >
        <span>🔍 Aperçu — {data?.isDraft ? <strong style={{ color: '#fbbf24' }}>BROUILLON</strong> : <strong style={{ color: '#22c55e' }}>EN LIGNE</strong>}</span>
        <span style={{ opacity: 0.5 }}>·</span>
        <span style={{ opacity: 0.7 }}>{data ? 'Rendu avec les vrais composants landing-v3' : '⚠ Contenu portail inaccessible — fallback hardcoded'}</span>
      </div>

      <HeaderV3 />
      <main style={{ paddingTop: 32 }}>
        <HeroParallax {...heroProps} />
        <ServicesScrollPin {...servicesProps} />
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
