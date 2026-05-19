// Schéma de contenu spécifique au site JL Studio (jlstudio.dev)
// Stocké dans Site.config.jlstudio (et Site.draftConfig.jlstudio pour le brouillon).

export interface CtaLink { label: string; href: string }

export interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  ctaPrimary: CtaLink;
  ctaSecondary: CtaLink;
  backgroundImage: string;
  scrollLabel: string;
}

export interface ServiceItem {
  number: string;            // "01", "02"…
  title: string;
  subtitle: string;
  description: string;
  features: string[];        // 4 features
  image: string;
  pricingAmount: string;     // "1 500 €" ou ""
  pricingDelivery: string;   // "2 semaines" ou ""
  pricingFallback: string;   // "Tarif et délais selon prestation" si pas de pricing
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  detail: string;
}

export interface PortfolioFeature { icon: string; label: string }

export interface PortfolioProject {
  title: string;
  category: string;
  tags: string[];
  image: string;
  description: string;
  featuresTitle: string;
  features: PortfolioFeature[];
  href: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;       // 1-5
  date: string;
  verified: boolean;
}

export interface AboutStat { value: string; label: string }

export interface AboutContent {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  lead: string;
  paragraphs: string[];
  stats: AboutStat[];
  profileImage: string;
}

export interface FaqItem {
  question: string;
  answer: string; // HTML autorisé (paragraphes, listes)
}

export interface ContactProjectType { value: string; label: string }

export interface ContactContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  projectTypes: ContactProjectType[];
  formLabels: {
    projectType: string;
    fullName: string;
    email: string;
    phone: string;
    message: string;
    callback: string;
    submit: string;
  };
  successMessage: string;
  callbackPhoneRequired: string;
}

export interface NavLink { label: string; href: string }

export interface SocialLink { label: string; href: string }

export interface GlobalContent {
  brand: {
    logoUrl: string;
    tagline: string;
  };
  navigation: NavLink[];
  headerCta: CtaLink;
  contact: {
    email: string;
    phone: string;
    city: string;
  };
  social: SocialLink[];
  legal: NavLink[];
  copyrightName: string;
}

export interface JlStudioContent {
  hero: HeroContent;
  services: { eyebrow: string; title: string; items: ServiceItem[] };
  process: { eyebrow: string; title: string; steps: ProcessStep[] };
  portfolio: { eyebrow: string; title: string; hint: string; projects: PortfolioProject[] };
  testimonials: {
    eyebrow: string;
    title: string;
    trustScore: number;
    trustReviewCount: number;
    trustpilotUrl: string;
    items: Testimonial[];
  };
  about: AboutContent;
  faq: { eyebrow: string; title: string; items: FaqItem[] };
  contact: ContactContent;
  global: GlobalContent;
}

// ─── Valeurs par défaut (seed depuis le hardcoded actuel) ─────────────

export const DEFAULT_JLSTUDIO_CONTENT: JlStudioContent = {
  hero: {
    title: 'Votre Vision',
    subtitle: 'Notre Expertise',
    description: 'Sites web, e-commerce et applications sur mesure pour propulser votre activité',
    ctaPrimary: { label: 'Démarrer un projet', href: '#contact' },
    ctaSecondary: { label: 'Voir nos réalisations', href: '#projets' },
    backgroundImage: '/images/hero-bg.jpg',
    scrollLabel: 'Scroll',
  },
  services: {
    eyebrow: 'Services',
    title: 'Ce que nous faisons',
    items: [
      {
        number: '01',
        title: 'Site Vitrine',
        subtitle: 'Votre identité en ligne',
        description: 'Un site moderne, rapide et SEO-friendly qui inspire confiance dès la première seconde.',
        features: ['Design responsive', 'Animations premium', 'SEO optimisé', 'CMS intégré'],
        image: '/images/services-vitrine.jpg',
        pricingAmount: '1 500 €',
        pricingDelivery: '2 semaines',
        pricingFallback: '',
      },
      {
        number: '02',
        title: 'E-Commerce',
        subtitle: 'Vendez en ligne',
        description: 'Boutique en ligne complète avec paiement sécurisé, gestion de stock et tableau de bord.',
        features: ['Paiement Stripe', 'Gestion stock', 'Multi-devises', 'Analytics'],
        image: '/images/services-ecommerce.jpg',
        pricingAmount: '2 000 €',
        pricingDelivery: '4 semaines',
        pricingFallback: '',
      },
      {
        number: '03',
        title: 'Application Web',
        subtitle: 'Outil sur mesure',
        description: 'Application web métier (CRM, espace client, dashboard) pensée pour votre process.',
        features: ['Auth utilisateurs', 'Tableaux de bord', 'API REST', 'Mobile-first'],
        image: '/images/services-webapp.jpg',
        pricingAmount: '',
        pricingDelivery: '',
        pricingFallback: 'Tarif et délais selon prestation',
      },
      {
        number: '04',
        title: 'Autres Services',
        subtitle: 'Refonte, audit, formation',
        description: 'Refonte de site, audit SEO/performance, accompagnement à la prise en main.',
        features: ['Audit complet', 'Refonte', 'Formation', 'Support'],
        image: '/images/services-autres.jpg',
        pricingAmount: '',
        pricingDelivery: '',
        pricingFallback: 'Tarif et délais selon prestation',
      },
    ],
  },
  process: {
    eyebrow: 'Méthode',
    title: 'Notre processus',
    steps: [
      { number: '01', title: 'Découverte', description: 'Comprendre ton activité et tes objectifs.', detail: 'Brief complet, analyse concurrentielle, définition des KPI' },
      { number: '02', title: 'Conception', description: 'Designer une expérience qui convertit.', detail: 'UX research, prototypage Figma, itérations de design' },
      { number: '03', title: 'Développement', description: 'Code propre, performance, maintenance facile.', detail: 'React / Next.js, CI/CD, revues de code hebdomadaires' },
      { number: '04', title: 'Tests & QA', description: 'Vérifier chaque écran, chaque interaction.', detail: 'Tests automatisés, audit Lighthouse, compatibilité mobile' },
      { number: '05', title: 'Lancement', description: 'Mise en ligne sans accroc + suivi.', detail: 'Mise en ligne, monitoring, support 30 jours inclus' },
    ],
  },
  portfolio: {
    eyebrow: 'Portfolio',
    title: 'Nos réalisations',
    hint: 'Cliquer sur une carte pour en savoir plus',
    projects: [
      {
        title: 'Flamme by Caubet',
        category: 'Site Vitrine & CRM',
        tags: ['Next.js', 'CRM', 'Stripe'],
        image: '/images/portfolio-flamme.jpg',
        description: 'Site vitrine + portail client avec gestion devis/factures.',
        featuresTitle: 'Réalisations',
        features: [],
        href: '',
      },
      {
        title: 'Florent Food',
        category: 'Plateforme Créateur',
        tags: ['Next.js', 'Vidéo', 'CMS'],
        image: '/images/portfolio-florentfood.jpg',
        description: 'Plateforme de contenu pour créateur culinaire.',
        featuresTitle: '',
        features: [],
        href: '',
      },
      {
        title: 'PropDesk',
        category: 'Plateforme Fintech & IA',
        tags: ['Next.js', 'IA', 'Fintech'],
        image: '/images/portfolio-propdesk.jpg',
        description: 'Plateforme d\'analyse immobilière par IA.',
        featuresTitle: '',
        features: [],
        href: '',
      },
      {
        title: 'Run As One',
        category: 'Site Événementiel',
        tags: ['Next.js', 'Billetterie'],
        image: '/images/portfolio-runasone.jpg',
        description: 'Site événementiel avec billetterie intégrée.',
        featuresTitle: '',
        features: [],
        href: '',
      },
      {
        title: 'Al-Ilm',
        category: 'Plateforme Éducative',
        tags: ['Next.js', 'PWA'],
        image: '/images/portfolio-al-ilm.jpg',
        description: 'PWA d\'apprentissage spirituel (Coran, Hadiths).',
        featuresTitle: '',
        features: [],
        href: '',
      },
    ],
  },
  testimonials: {
    eyebrow: 'Avis clients',
    title: 'Ils nous font confiance',
    trustScore: 4.1,
    trustReviewCount: 5,
    trustpilotUrl: 'https://fr.trustpilot.com/review/jlstudio.dev',
    items: [
      { name: 'Client 1', role: 'Site vitrine', quote: 'Travail impeccable, livré dans les temps.', rating: 5, date: '2025-09-12', verified: true },
      { name: 'Client 2', role: 'E-commerce', quote: 'Très professionnel, à l\'écoute, réactif.', rating: 5, date: '2025-08-22', verified: true },
      { name: 'Client 3', role: 'Refonte', quote: 'Une refonte qui a transformé notre image.', rating: 4, date: '2025-07-10', verified: true },
      { name: 'Client 4', role: 'CRM', quote: 'Le CRM nous fait gagner 10h par semaine.', rating: 5, date: '2025-06-05', verified: true },
      { name: 'Client 5', role: 'Application', quote: 'Très satisfait du suivi post-livraison.', rating: 4, date: '2025-05-15', verified: true },
    ],
  },
  about: {
    eyebrow: 'À propos',
    titleLine1: 'Un studio,',
    titleLine2: 'une seule personne',
    lead: 'Quand vous m\'écrivez, c\'est moi qui vous lis. Quand vous appelez, c\'est moi qui réponds. Pas de chef de projet intermédiaire, pas de service après-vente saturé.',
    paragraphs: [
      'Je suis Jeason Lemoine. Depuis cinq ans, je conçois et développe des sites web et applications sur mesure pour des entrepreneurs et PME qui veulent un partenaire technique, pas une agence anonyme.',
      'Mon engagement : à la livraison, vous repartez avec le code, votre site qui tourne, et de quoi le piloter en autonomie. Pas de dépendance à vie.',
    ],
    stats: [
      { value: '+10', label: 'Projets livrés' },
      { value: '4 ans', label: 'D\'expérience' },
      { value: '100%', label: 'Code maison' },
    ],
    profileImage: '/images/jeason-profil.jpg',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Les questions qu\'on me pose souvent',
    items: [
      { question: 'Combien de temps prend un projet ?', answer: 'Un site vitrine prend en moyenne 2 semaines, un e-commerce 4 semaines, une application sur mesure entre 6 et 12 semaines selon la complexité.' },
      { question: 'Qui possède le code source ?', answer: 'Vous. À la livraison, vous repartez avec l\'intégralité du code source et la propriété complète du projet.' },
      { question: 'Comment se passe le paiement ?', answer: '30% à la signature, 40% à la validation de la maquette, 30% à la livraison. Aucun frais caché.' },
      { question: 'Est-ce que vous gérez l\'hébergement ?', answer: 'Oui, je peux gérer l\'hébergement pour vous (Coolify, Vercel, OVH selon les besoins) ou vous laisser autonome — comme vous préférez.' },
      { question: 'Et après la livraison, vous me délaissez ?', answer: '30 jours de support inclus après la livraison. Au-delà, je propose une maintenance mensuelle ou ponctuelle selon vos besoins.' },
      { question: 'Pourquoi un freelance plutôt qu\'une agence ?', answer: 'Vous parlez directement à celui qui code. Pas d\'intermédiaire, pas de turnover, pas de marge agence. Et vous payez le bon prix.' },
      { question: 'Faites-vous du SEO / référencement ?', answer: 'Tous mes sites sont optimisés SEO de base (structure, performance, méta). Pour une stratégie SEO avancée, je travaille avec un partenaire spécialisé.' },
      { question: 'Et si je ne suis pas satisfait ?', answer: 'On itère ensemble jusqu\'à satisfaction sur la phase de design (forfait illimité). Et si vraiment ça ne le fait pas, vous payez uniquement le travail effectué.' },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Votre Projet',
    subtitle: 'Discutons de votre prochaine réalisation',
    image: '/images/contact-bg.jpg',
    projectTypes: [
      { value: 'vitrine', label: 'Site Vitrine' },
      { value: 'ecommerce', label: 'E-Commerce' },
      { value: 'webapp', label: 'Application Web' },
      { value: 'landing', label: 'Landing Page' },
      { value: 'refonte', label: 'Refonte' },
      { value: 'autre', label: 'Autre' },
    ],
    formLabels: {
      projectType: 'Type de projet',
      fullName: 'Nom complet *',
      email: 'Email *',
      phone: 'Téléphone',
      message: 'Message *',
      callback: 'Je souhaite être rappelé pour discuter de mon projet',
      submit: 'Envoyer ma demande',
    },
    successMessage: 'Message envoyé ! Nous vous recontacterons rapidement.',
    callbackPhoneRequired: 'Le numéro de téléphone est obligatoire pour être rappelé.',
  },
  global: {
    brand: {
      logoUrl: '/images/logo-jlstudio.png',
      tagline: 'Sites web, e-commerce & applications sur mesure',
    },
    navigation: [
      { label: 'Services', href: '#services' },
      { label: 'Méthode', href: '#methode' },
      { label: 'Projets', href: '#projets' },
      { label: 'Témoignages', href: '#temoignages' },
      { label: 'À propos', href: '#a-propos' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: '#contact' },
    ],
    headerCta: { label: 'Parlons projet', href: '#contact' },
    contact: {
      email: 'contact@jlstudio.dev',
      phone: '07 67 58 10 61',
      city: 'Bordeaux, France',
    },
    social: [
      { label: 'Instagram', href: 'https://www.instagram.com/jlstudio.dev/' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jl-studio-64b287396' },
    ],
    legal: [
      { label: 'Mentions légales', href: '/mentions-legales' },
      { label: 'Politique de confidentialité', href: '/politique-confidentialite' },
      { label: 'CGV', href: '/conditions-generales-de-vente' },
    ],
    copyrightName: 'JL Studio',
  },
};

// Calcule l'indicateur de complétude (●○◐) pour une section donnée
export type Completeness = 'empty' | 'partial' | 'complete';

function isFilled(v: unknown): boolean {
  if (v === null || v === undefined) return false;
  if (typeof v === 'string') return v.trim().length > 0;
  if (Array.isArray(v)) return v.length > 0;
  return true;
}

export function getSectionCompleteness(
  section: keyof JlStudioContent,
  content: Partial<JlStudioContent>,
): Completeness {
  const data = content[section] as unknown;
  if (!data) return 'empty';

  let total = 0;
  let filled = 0;

  switch (section) {
    case 'hero': {
      const h = data as HeroContent;
      total = 4;
      filled = [h.title, h.subtitle, h.description, h.backgroundImage].filter(isFilled).length;
      break;
    }
    case 'services': {
      const s = data as JlStudioContent['services'];
      total = (s.items || []).length || 1;
      filled = (s.items || []).filter((it) => isFilled(it.title) && isFilled(it.description)).length;
      break;
    }
    case 'process': {
      const p = data as JlStudioContent['process'];
      total = (p.steps || []).length || 1;
      filled = (p.steps || []).filter((st) => isFilled(st.title) && isFilled(st.description)).length;
      break;
    }
    case 'portfolio': {
      const p = data as JlStudioContent['portfolio'];
      total = (p.projects || []).length || 1;
      filled = (p.projects || []).filter((pr) => isFilled(pr.title) && isFilled(pr.image)).length;
      break;
    }
    case 'testimonials': {
      const t = data as JlStudioContent['testimonials'];
      total = (t.items || []).length || 1;
      filled = (t.items || []).filter((it) => isFilled(it.quote) && isFilled(it.name)).length;
      break;
    }
    case 'about': {
      const a = data as AboutContent;
      total = 4;
      filled = [a.titleLine1, a.lead, a.paragraphs?.[0], a.profileImage].filter(isFilled).length;
      break;
    }
    case 'faq': {
      const f = data as JlStudioContent['faq'];
      total = (f.items || []).length || 1;
      filled = (f.items || []).filter((it) => isFilled(it.question) && isFilled(it.answer)).length;
      break;
    }
    case 'contact': {
      const c = data as ContactContent;
      total = 3;
      filled = [c.title, c.subtitle, c.image].filter(isFilled).length;
      break;
    }
    case 'global': {
      const g = data as GlobalContent;
      total = 3;
      filled = [g.brand?.logoUrl, g.contact?.email, g.contact?.phone].filter(isFilled).length;
      break;
    }
  }

  if (filled === 0) return 'empty';
  if (filled < total) return 'partial';
  return 'complete';
}

export type JlStudioSection = keyof JlStudioContent;

export const JL_SECTIONS: Array<{ key: JlStudioSection; label: string; emoji: string; description: string }> = [
  { key: 'hero',         label: 'Hero',         emoji: '🎬', description: 'Bannière d\'accueil' },
  { key: 'services',     label: 'Services',     emoji: '🛠️', description: '4 prestations' },
  { key: 'process',      label: 'Méthode',      emoji: '📋', description: '5 étapes du process' },
  { key: 'portfolio',    label: 'Portfolio',    emoji: '🎨', description: 'Projets clients' },
  { key: 'testimonials', label: 'Témoignages',  emoji: '💬', description: 'Avis clients' },
  { key: 'about',        label: 'À propos',     emoji: '👤', description: 'Présentation Jeason' },
  { key: 'faq',          label: 'FAQ',          emoji: '❓', description: 'Questions fréquentes' },
  { key: 'contact',      label: 'Contact',      emoji: '✉️', description: 'Formulaire & coordonnées' },
  { key: 'global',       label: 'Global',       emoji: '⚙️', description: 'Header, footer, social' },
];
