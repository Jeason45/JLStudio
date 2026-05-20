// Route /preview : aperçu du site jlstudio.dev avec le contenu BROUILLON
// du CRM portal.jlstudio.dev. Server-side fetch vers l'endpoint interne.
//
// Embarqué en iframe dans l'éditeur sur-mesure du CRM
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
import type { ProcessContent } from '@/components/landing-v3/ProcessJourney';
import type { PortfolioContent, Project } from '@/components/landing-v3/PortfolioStack';
import type { TestimonialsContent } from '@/components/landing-v3/TestimonialsSection';
import type { AboutContent } from '@/components/landing-v3/AboutJeason';
import type { FaqContent } from '@/components/landing-v3/FaqAccordion';
import type { ContactContent } from '@/components/landing-v3/ContactParallax';
import type { HeaderContent } from '@/components/landing-v3/HeaderV3';
import type { FooterContent } from '@/components/landing-v3/FooterMinimal';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const metadata = { title: 'Aperçu — JL Studio', robots: { index: false, follow: false } };

// ─── Types du payload portail ─────────────────────────────────────────
interface PortalServiceItem {
  number?: string; title?: string; subtitle?: string; description?: string;
  features?: string[]; image?: string;
  pricingAmount?: string; pricingDelivery?: string; pricingFallback?: string;
}
interface PortalPortfolioFeature { icon?: string; label?: string }
interface PortalProject {
  title?: string; category?: string; tags?: string[]; image?: string; description?: string;
  featuresTitle?: string; features?: PortalPortfolioFeature[]; href?: string;
}
interface PortalNavLink { label?: string; href?: string }
interface PortalSocialLink { label?: string; href?: string }

interface PortalJlContent {
  hero?: Partial<HeroContent>;
  services?: { eyebrow?: string; title?: string; items?: PortalServiceItem[] };
  process?: Partial<ProcessContent>;
  portfolio?: { eyebrow?: string; title?: string; hint?: string; projects?: PortalProject[] };
  testimonials?: Partial<TestimonialsContent>;
  about?: Partial<AboutContent>;
  faq?: Partial<FaqContent>;
  contact?: Partial<ContactContent>;
  global?: {
    brand?: { logoUrl?: string; tagline?: string };
    navigation?: PortalNavLink[];
    headerCta?: { label?: string; href?: string };
    contact?: { email?: string; phone?: string; city?: string };
    social?: PortalSocialLink[];
    legal?: PortalNavLink[];
    copyrightName?: string;
  };
}

interface PreviewApiResponse {
  siteId: string; slug: string; isDraft: boolean;
  publishedAt: string | null; content: PortalJlContent;
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

// ─── Mappers portail → props composants ───────────────────────────────
function mapServices(items?: PortalServiceItem[]): ServicesContent | undefined {
  if (!items || items.length === 0) return undefined;
  const mapped: ServiceItem[] = items.map((it) => ({
    number: it.number || '', title: it.title || '', subtitle: it.subtitle || '',
    description: it.description || '', features: it.features || [], image: it.image || '',
    pricing: {
      amount: it.pricingAmount || undefined,
      delivery: it.pricingDelivery || undefined,
      fallbackLabel: it.pricingFallback || undefined,
    },
  }));
  return { items: mapped };
}

function mapPortfolio(p?: PortalJlContent['portfolio']): PortfolioContent | undefined {
  if (!p) return undefined;
  const projects: Project[] = (p.projects || []).map((pr) => ({
    title: pr.title || '', category: pr.category || '', tags: pr.tags || [],
    image: pr.image || '', description: pr.description || '',
    href: pr.href,
    features: (pr.features && pr.features.length > 0)
      ? { title: pr.featuresTitle || '', items: pr.features.map((f) => ({ icon: f.icon || '', label: f.label || '' })) }
      : undefined,
  }));
  return { eyebrow: p.eyebrow || 'Portfolio', title: p.title || 'Nos réalisations', hint: p.hint || '', projects };
}

function mapHeader(g?: PortalJlContent['global']): HeaderContent | undefined {
  if (!g) return undefined;
  return {
    logoUrl: g.brand?.logoUrl || '/images/logo-jlstudio.png',
    navigation: (g.navigation || []).map((n) => ({ label: n.label || '', href: n.href || '#' })),
    headerCta: { label: g.headerCta?.label || 'Parlons projet', href: g.headerCta?.href || '#contact' },
  };
}

function findSocial(social: PortalSocialLink[] | undefined, key: string): string {
  const found = (social || []).find((s) => (s.label || '').toLowerCase().includes(key));
  return found?.href || '';
}

function mapFooter(g?: PortalJlContent['global']): FooterContent | undefined {
  if (!g) return undefined;
  return {
    logoUrl: g.brand?.logoUrl || '/images/logo-jlstudio.png',
    tagline: g.brand?.tagline || '',
    email: g.contact?.email || '',
    phone: g.contact?.phone || '',
    instagramUrl: findSocial(g.social, 'instagram') || 'https://www.instagram.com/jlstudio.dev/',
    linkedinUrl: findSocial(g.social, 'linkedin') || 'https://www.linkedin.com/in/jl-studio-64b287396',
    legal: (g.legal || []).map((l) => ({ label: l.label || '', href: l.href || '#' })),
    copyrightName: g.copyrightName || 'JL Studio',
  };
}

export default async function PreviewPage() {
  const data = await fetchPreviewContent();
  const c = data?.content || {};

  // Props (undefined → le composant garde son défaut hardcodé)
  const heroProps = c.hero ? { content: c.hero as HeroContent } : {};
  const servicesProps = { content: mapServices(c.services?.items) };
  const processProps = c.process ? { content: c.process as ProcessContent } : {};
  const portfolioProps = { content: mapPortfolio(c.portfolio) };
  const testimonialsProps = c.testimonials ? { content: c.testimonials as TestimonialsContent } : {};
  const aboutProps = c.about ? { content: c.about as AboutContent } : {};
  const faqProps = c.faq ? { content: c.faq as FaqContent } : {};
  const contactProps = c.contact ? { content: c.contact as ContactContent } : {};
  const headerProps = { content: mapHeader(c.global) };
  const footerProps = { content: mapFooter(c.global) };

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
        <span>🔍 Aperçu — {data?.isDraft ? <strong style={{ color: '#fbbf24' }}>BROUILLON</strong> : <strong style={{ color: '#22c55e' }}>EN LIGNE</strong>}</span>
        <span style={{ opacity: 0.5 }}>·</span>
        <span style={{ opacity: 0.7 }}>{data ? 'Rendu réel landing-v3' : '⚠ Portail inaccessible — fallback hardcoded'}</span>
      </div>

      <HeaderV3 {...headerProps} />
      <main style={{ paddingTop: 32 }}>
        <HeroParallax {...heroProps} />
        <ServicesScrollPin {...servicesProps} />
        <ProcessJourney {...processProps} />
        <PortfolioStack {...portfolioProps} />
        <TestimonialsSection {...testimonialsProps} />
        <AboutJeason {...aboutProps} />
        <FaqAccordion {...faqProps} />
        <ContactParallax {...contactProps} />
      </main>
      <FooterMinimal {...footerProps} />
    </LenisProvider>
  );
}
