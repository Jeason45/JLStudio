// Helper partagé : fetch du contenu JL Studio depuis le CRM (portal) +
// mapping vers les props des composants landing-v3.
// Utilisé par la home `/` (mode=live) et l'aperçu `/preview` (mode=draft).

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

export interface PortalJlContent {
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

// Props prêtes à spreader sur chaque composant ({} = garde le hardcodé)
export interface JlStudioProps {
  available: boolean;
  isDraft: boolean;
  header: { content?: HeaderContent };
  hero: { content?: HeroContent };
  services: { content?: ServicesContent };
  process: { content?: ProcessContent };
  portfolio: { content?: PortfolioContent };
  testimonials: { content?: TestimonialsContent };
  about: { content?: AboutContent };
  faq: { content?: FaqContent };
  contact: { content?: ContactContent };
  footer: { content?: FooterContent };
}

// ─── Mappers ──────────────────────────────────────────────────────────
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
    image: pr.image || '', description: pr.description || '', href: pr.href,
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

const EMPTY_PROPS: JlStudioProps = {
  available: false, isDraft: false,
  header: {}, hero: {}, services: {}, process: {}, portfolio: {},
  testimonials: {}, about: {}, faq: {}, contact: {}, footer: {},
};

/**
 * Récupère le contenu JL Studio et le mappe vers les props des composants.
 * @param mode 'live' (contenu publié) ou 'draft' (brouillon en cours)
 * En cas d'erreur ou de secret manquant → props vides (les composants gardent leur hardcodé).
 */
export async function getJlStudioProps(mode: 'live' | 'draft'): Promise<JlStudioProps> {
  const secret = process.env.INTERNAL_API_SECRET;
  const portalUrl = process.env.PORTAL_INTERNAL_URL || 'https://portal.jlstudio.dev';
  if (!secret) return EMPTY_PROPS;

  let data: PreviewApiResponse | null = null;
  try {
    const res = await fetch(`${portalUrl}/api/internal/jlstudio-preview?mode=${mode}`, {
      headers: { Authorization: `Bearer ${secret}` },
      cache: 'no-store',
    });
    if (res.ok) data = (await res.json()) as PreviewApiResponse;
  } catch {
    data = null;
  }

  if (!data || !data.content) return EMPTY_PROPS;
  const c = data.content;

  return {
    available: true,
    isDraft: data.isDraft,
    header: { content: mapHeader(c.global) },
    hero: c.hero ? { content: c.hero as HeroContent } : {},
    services: { content: mapServices(c.services?.items) },
    process: c.process ? { content: c.process as ProcessContent } : {},
    portfolio: { content: mapPortfolio(c.portfolio) },
    testimonials: c.testimonials ? { content: c.testimonials as TestimonialsContent } : {},
    about: c.about ? { content: c.about as AboutContent } : {},
    faq: c.faq ? { content: c.faq as FaqContent } : {},
    contact: c.contact ? { content: c.contact as ContactContent } : {},
    footer: { content: mapFooter(c.global) },
  };
}
