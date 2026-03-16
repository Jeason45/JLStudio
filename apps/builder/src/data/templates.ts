import type { SectionConfig, Brand } from '@/types/site'

export type TemplateUniverse = 'startup' | 'corporate' | 'luxe' | 'creative' | 'ecommerce' | 'glass'

export interface TemplatePageDef {
  slug: string
  title: string
  sections: Omit<SectionConfig, 'id'>[]
}

export interface PageTemplate {
  id: string
  name: string
  description: string
  category: 'saas' | 'agency' | 'ecommerce' | 'portfolio' | 'real-estate' | 'photographe' | 'coiffeur' | 'beaute' | 'agency-models' | 'restaurant' | 'coach'
  universe: TemplateUniverse
  emoji: string
  preview: string
  sections: Omit<SectionConfig, 'id'>[]
  /** Additional pages beyond home */
  pages?: TemplatePageDef[]
  /** Override default brand (colors, fonts, etc.) */
  brand?: Partial<Brand>
}

export const UNIVERSE_COLORS: Record<TemplateUniverse, { bg: string; text: string; label: string }> = {
  startup: { bg: 'bg-indigo-500/15', text: 'text-indigo-400', label: 'Startup' },
  corporate: { bg: 'bg-slate-500/15', text: 'text-slate-400', label: 'Corporate' },
  luxe: { bg: 'bg-amber-500/15', text: 'text-amber-400', label: 'Luxe' },
  creative: { bg: 'bg-rose-500/15', text: 'text-rose-400', label: 'Créatif' },
  ecommerce: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', label: 'E-commerce' },
  glass: { bg: 'bg-cyan-500/15', text: 'text-cyan-400', label: 'Glass' },
}

const year = new Date().getFullYear()

export const PAGE_TEMPLATES: PageTemplate[] = [
  // ─── 1. SaaS Landing ───
  {
    id: 'saas-landing',
    name: 'SaaS Landing',
    description: 'Landing page complète pour un logiciel SaaS avec pricing et FAQ',
    category: 'saas',
    universe: 'startup',
    emoji: '🚀',
    preview: 'from-indigo-600 to-purple-600',
    sections: [
      { type: 'site-header', variant: 'startup', content: { logo: 'FlowMetrics', links: [{ id: '1', label: 'Fonctionnalités', href: '#features' }, { id: '2', label: 'Tarifs', href: '#pricing' }, { id: '3', label: 'FAQ', href: '#faq' }], ctaLabel: 'Essai gratuit', ctaHref: '#' }, style: { background: 'white', paddingY: 'none' }, visible: true },
      { type: 'hero', variant: 'startup', content: { eyebrow: 'Nouveau — Version 3.0 disponible', title: 'Analysez vos données en temps réel, sans complexité', subtitle: 'FlowMetrics centralise vos analytics, automatise vos rapports et vous donne les insights pour prendre les bonnes décisions.', primaryButton: { label: 'Commencer gratuitement', href: '#', variant: 'primary' }, secondaryButton: { label: 'Voir la démo', href: '#', variant: 'outline' } }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'logos', variant: 'startup-strip', content: { title: 'Utilisé par 5 000+ entreprises', items: [{ id: '1', name: 'Vercel' }, { id: '2', name: 'Stripe' }, { id: '3', name: 'Notion' }, { id: '4', name: 'Linear' }, { id: '5', name: 'Figma' }] }, style: { background: 'light', paddingY: 'md' }, visible: true },
      { type: 'features', variant: 'startup-bento', content: { eyebrow: 'Fonctionnalités', title: 'Tout ce dont vous avez besoin pour piloter votre activité', subtitle: 'Des outils puissants dans une interface que votre équipe adoptera en 5 minutes.', items: [{ id: '1', icon: '⚡', title: 'Temps réel', description: 'Tableaux de bord mis à jour en continu avec latence < 100ms.' }, { id: '2', icon: '🔒', title: 'Sécurisé', description: 'Chiffrement de bout en bout et conformité RGPD native.' }, { id: '3', icon: '🤝', title: 'Collaboratif', description: 'Commentaires, partage et alertes pour toute votre équipe.' }, { id: '4', icon: '📊', title: 'Rapports auto', description: 'Générez des rapports PDF et Slack automatiquement chaque semaine.' }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'stats', variant: 'startup-cards', content: { eyebrow: 'En chiffres', title: 'Des résultats concrets', items: [{ id: '1', value: '10K+', label: 'Clients actifs', description: 'Dans 40 pays' }, { id: '2', value: '99.9%', label: 'Disponibilité', description: 'SLA garanti' }, { id: '3', value: '4.9★', label: 'Note moyenne', description: 'Sur 2 000 avis' }] }, style: { background: 'light', paddingY: 'xl' }, visible: true },
      { type: 'testimonials', variant: 'startup-marquee', content: { eyebrow: 'Témoignages', title: 'Ils nous font confiance', items: [{ id: '1', quote: 'FlowMetrics a réduit notre temps de reporting de 80%. On ne pourrait plus s\'en passer.', author: 'Marie Dupont', role: 'CEO', company: 'TechCorp', rating: 5 }, { id: '2', quote: 'L\'interface est tellement claire que même notre équipe commerciale l\'utilise au quotidien.', author: 'Jean Martin', role: 'CTO', company: 'DataFlow', rating: 5 }, { id: '3', quote: 'Le support est exceptionnel. Réponse en moins d\'une heure à chaque fois.', author: 'Sophie Bernard', role: 'VP Product', company: 'ScaleUp', rating: 5 }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'pricing', variant: 'startup-columns', content: { eyebrow: 'Tarifs', title: 'Simple, transparent, sans surprise', subtitle: 'Changez de plan ou annulez à tout moment.', plans: [{ id: 'free', name: 'Starter', price: '0€', period: '/mois', description: 'Pour découvrir', highlighted: false, cta: 'Commencer', ctaHref: '#', features: [{ text: '3 dashboards', included: true }, { text: '1 000 events/jour', included: true }, { text: 'Export CSV', included: true }, { text: 'Rapports auto', included: false }] }, { id: 'pro', name: 'Pro', price: '29€', period: '/mois', description: 'Pour les équipes', highlighted: true, badge: 'Populaire', cta: 'Essai 14 jours', ctaHref: '#', features: [{ text: 'Dashboards illimités', included: true }, { text: '100K events/jour', included: true }, { text: 'Export PDF + Slack', included: true }, { text: 'Rapports auto', included: true }] }, { id: 'enterprise', name: 'Enterprise', price: '99€', period: '/mois', description: 'Pour les grandes équipes', highlighted: false, cta: 'Nous contacter', ctaHref: '#', features: [{ text: 'Tout Pro', included: true }, { text: 'SSO + SCIM', included: true }, { text: 'SLA 99.99%', included: true }, { text: 'Support dédié', included: true }] }] }, style: { background: 'light', paddingY: 'xl' }, visible: true },
      { type: 'faq', variant: 'startup-accordion', content: { eyebrow: 'FAQ', title: 'Questions fréquentes', items: [{ id: '1', question: 'Puis-je annuler à tout moment ?', answer: 'Oui, sans frais ni engagement. Votre compte reste actif jusqu\'à la fin de la période payée.' }, { id: '2', question: 'Y a-t-il une période d\'essai ?', answer: 'Oui, 14 jours gratuits sur le plan Pro, sans carte bancaire requise.' }, { id: '3', question: 'Mes données sont-elles sécurisées ?', answer: 'Absolument. Chiffrement AES-256, hébergement en Europe, conformité RGPD complète.' }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'cta', variant: 'startup-card', content: { badge: 'Essai gratuit 14 jours', title: 'Prêt à transformer vos données en décisions ?', subtitle: 'Rejoignez 10 000+ équipes qui pilotent leur croissance avec FlowMetrics.', primaryButton: { label: 'Commencer gratuitement', href: '#', variant: 'primary' }, secondaryButton: { label: 'Parler à l\'équipe', href: '#', variant: 'outline' } }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'site-footer', variant: 'startup', content: { logo: 'FlowMetrics', tagline: 'L\'analytics qui accélère votre croissance.', copyright: `© ${year} FlowMetrics. Tous droits réservés.`, columns: [{ id: '1', title: 'Produit', links: [{ id: '1', label: 'Fonctionnalités', href: '#' }, { id: '2', label: 'Tarifs', href: '#' }, { id: '3', label: 'Changelog', href: '#' }] }, { id: '2', title: 'Ressources', links: [{ id: '1', label: 'Documentation', href: '#' }, { id: '2', label: 'Blog', href: '#' }, { id: '3', label: 'API', href: '#' }] }], socials: { twitter: '#', linkedin: '#' } }, style: { background: 'dark', paddingY: 'none' }, visible: true },
    ],
  },

  // ─── 3. Agence Créative ───
  {
    id: 'agency-creative',
    name: 'Agence Créative',
    description: 'Portfolio et présentation pour agence design avec galerie et témoignages',
    category: 'agency',
    universe: 'creative',
    emoji: '🎨',
    preview: 'from-rose-500 to-orange-500',
    sections: [
      { type: 'site-header', variant: 'creative', content: { logo: 'Atelier Pixel', links: [{ id: '1', label: 'Projets', href: '#' }, { id: '2', label: 'Services', href: '#' }, { id: '3', label: 'Studio', href: '#' }], ctaLabel: 'Nous contacter', ctaHref: '#' }, style: { background: 'white', paddingY: 'none' }, visible: true },
      { type: 'hero', variant: 'creative', content: { eyebrow: 'STUDIO CRÉATIF', title: 'On transforme vos idées en expériences digitales', subtitle: 'Design, développement et direction artistique pour les marques qui veulent marquer les esprits.', primaryButton: { label: 'Voir nos projets', href: '#', variant: 'primary' }, secondaryButton: { label: 'Notre approche', href: '#', variant: 'outline' } }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'logos', variant: 'creative-strip', content: { title: 'Ils nous ont fait confiance', items: [{ id: '1', name: 'Nike' }, { id: '2', name: 'Spotify' }, { id: '3', name: 'Airbnb' }, { id: '4', name: 'Dribbble' }] }, style: { background: 'light', paddingY: 'md' }, visible: true },
      { type: 'features', variant: 'creative-grid', content: { eyebrow: 'Services', title: 'Ce que nous faisons de mieux', items: [{ id: '1', icon: '🎨', title: 'Direction artistique', description: 'Identité visuelle, branding et design system sur mesure.' }, { id: '2', icon: '💻', title: 'Développement web', description: 'Sites et applications sur mesure, performants et accessibles.' }, { id: '3', icon: '📱', title: 'Design mobile', description: 'Interfaces iOS et Android avec une attention obsessionnelle au détail.' }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'stats', variant: 'creative-simple', content: { title: 'Notre impact', items: [{ id: '1', value: '150+', label: 'Projets livrés' }, { id: '2', value: '12 ans', label: 'D\'expérience' }, { id: '3', value: '98%', label: 'Clients satisfaits' }, { id: '4', value: '24', label: 'Awards' }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'gallery-grid', variant: 'creative-masonry', content: { eyebrow: 'Portfolio', title: 'Nos dernières réalisations', items: [{ id: '1', title: 'Refonte e-commerce Luxe', category: 'Web Design' }, { id: '2', title: 'App mobile HealthTech', category: 'UI/UX' }, { id: '3', title: 'Branding Startup FinTech', category: 'Identité' }, { id: '4', title: 'Dashboard Analytics', category: 'Product Design' }, { id: '5', title: 'Campagne digitale Mode', category: 'Direction artistique' }, { id: '6', title: 'Site vitrine Architecture', category: 'Web Design' }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'testimonials', variant: 'creative-featured', content: { eyebrow: 'Témoignages', title: 'Ce que disent nos clients', items: [{ id: '1', quote: 'Atelier Pixel a parfaitement capturé l\'essence de notre marque. Le résultat dépasse nos attentes.', author: 'Claire Dubois', role: 'Directrice Marketing', company: 'MaisonLuxe', rating: 5 }, { id: '2', quote: 'Créativité, rigueur et respect des délais. L\'agence idéale pour les projets ambitieux.', author: 'Thomas Laurent', role: 'CEO', company: 'TechVenture', rating: 5 }] }, style: { background: 'light', paddingY: 'xl' }, visible: true },
      { type: 'cta', variant: 'creative-centered', content: { badge: 'Parlons de votre projet', title: 'Une idée ? On la concrétise.', subtitle: 'Premier échange gratuit et sans engagement. On adore les projets ambitieux.', primaryButton: { label: 'Prendre rendez-vous', href: '#', variant: 'primary' } }, style: { background: 'primary', paddingY: 'xl' }, visible: true },
      { type: 'site-footer', variant: 'creative', content: { logo: 'Atelier Pixel', tagline: 'Design & développement depuis 2014.', copyright: `© ${year} Atelier Pixel. Tous droits réservés.`, columns: [{ id: '1', title: 'Studio', links: [{ id: '1', label: 'Projets', href: '#' }, { id: '2', label: 'Services', href: '#' }] }, { id: '2', title: 'Contact', links: [{ id: '1', label: 'hello@atelierpixel.fr', href: 'mailto:hello@atelierpixel.fr' }] }], socials: { instagram: '#', dribbble: '#', twitter: '#' } }, style: { background: 'dark', paddingY: 'none' }, visible: true },
    ],
  },

  // ─── 4. Agence Corporate ───
  {
    id: 'agency-corporate',
    name: 'Agence Corporate',
    description: 'Présentation professionnelle avec équipe, services et formulaire de contact',
    category: 'agency',
    universe: 'corporate',
    emoji: '🏛️',
    preview: 'from-slate-600 to-blue-700',
    sections: [
      { type: 'site-header', variant: 'corporate', content: { logo: 'Pragma Conseil', links: [{ id: '1', label: 'Expertises', href: '#' }, { id: '2', label: 'Équipe', href: '#' }, { id: '3', label: 'Références', href: '#' }], ctaLabel: 'Contact', ctaHref: '#' }, style: { background: 'white', paddingY: 'none' }, visible: true },
      { type: 'hero', variant: 'corporate', content: { eyebrow: 'CONSEIL & STRATÉGIE', title: 'Accélérez votre transformation digitale', subtitle: 'Pragma accompagne les ETI et grands groupes dans leur stratégie numérique depuis 15 ans.', primaryButton: { label: 'Découvrir nos expertises', href: '#', variant: 'primary' }, secondaryButton: { label: 'Nos références', href: '#', variant: 'outline' } }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'logos', variant: 'corporate-strip', content: { title: 'Nos clients', items: [{ id: '1', name: 'Bouygues' }, { id: '2', name: 'SNCF' }, { id: '3', name: 'Orange' }, { id: '4', name: 'Carrefour' }, { id: '5', name: 'EDF' }] }, style: { background: 'light', paddingY: 'md' }, visible: true },
      { type: 'features', variant: 'corporate-list', content: { eyebrow: 'Expertises', title: 'Nos domaines d\'intervention', items: [{ id: '1', icon: '📐', title: 'Stratégie digitale', description: 'Audit, roadmap et accompagnement de la direction dans sa vision numérique.' }, { id: '2', icon: '⚙️', title: 'Transformation SI', description: 'Modernisation des infrastructures, migration cloud et cybersécurité.' }, { id: '3', icon: '👥', title: 'Conduite du changement', description: 'Formation, communication interne et adoption des nouveaux outils.' }, { id: '4', icon: '📊', title: 'Data & Analytics', description: 'Gouvernance des données, BI et valorisation du patrimoine data.' }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'team', variant: 'corporate-grid', content: { eyebrow: 'L\'équipe', title: 'Des experts à votre service', subtitle: '25 consultants seniors, 15 ans d\'expérience moyenne.', items: [{ id: '1', name: 'François Martin', role: 'Associé fondateur', bio: 'Ex-McKinsey, 20 ans de conseil en transformation.' }, { id: '2', name: 'Isabelle Chen', role: 'Directrice Technique', bio: 'Ex-Google, spécialiste cloud et architecture.' }, { id: '3', name: 'David Rousseau', role: 'Directeur Data', bio: 'Ex-Dataiku, expert IA et gouvernance data.' }, { id: '4', name: 'Nathalie Petit', role: 'Directrice Change', bio: 'Psychologue du travail, certifiée Prosci.' }] }, style: { background: 'light', paddingY: 'xl' }, visible: true },
      { type: 'testimonials', variant: 'corporate-grid', content: { eyebrow: 'Références', title: 'Ils témoignent', items: [{ id: '1', quote: 'Pragma nous a accompagnés dans la refonte complète de notre SI. Un partenaire de confiance.', author: 'Laurent Garnier', role: 'DSI', company: 'Groupe Industriel', rating: 5 }, { id: '2', quote: 'Leur approche pragmatique et leur expertise technique ont fait la différence.', author: 'Sylvie Morel', role: 'DG', company: 'Retail Corp', rating: 5 }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'contact', variant: 'corporate-with-info', content: { eyebrow: 'Contact', title: 'Échangeons sur vos enjeux', subtitle: 'Premier rendez-vous stratégique offert.', fields: [{ id: '1', label: 'Nom', type: 'text', required: true }, { id: '2', label: 'Email', type: 'email', required: true }, { id: '3', label: 'Entreprise', type: 'text', required: true }, { id: '4', label: 'Message', type: 'textarea', required: false }], submitLabel: 'Envoyer', info: { email: 'contact@pragma-conseil.fr', phone: '+33 1 42 00 00 00', address: '75 avenue des Champs-Élysées, 75008 Paris' } }, style: { background: 'light', paddingY: 'xl' }, visible: true },
      { type: 'site-footer', variant: 'corporate', content: { logo: 'Pragma Conseil', tagline: 'Conseil en transformation digitale.', copyright: `© ${year} Pragma Conseil. Tous droits réservés.`, columns: [{ id: '1', title: 'Cabinet', links: [{ id: '1', label: 'Expertises', href: '#' }, { id: '2', label: 'Équipe', href: '#' }] }, { id: '2', title: 'Ressources', links: [{ id: '1', label: 'Blog', href: '#' }, { id: '2', label: 'Études de cas', href: '#' }] }], socials: { linkedin: '#' } }, style: { background: 'dark', paddingY: 'none' }, visible: true },
    ],
  },

  // ─── 5. Portfolio Artiste ───
  {
    id: 'portfolio-artist',
    name: 'Portfolio Artiste',
    description: 'Portfolio visuel élégant pour photographes, artistes et créatifs',
    category: 'portfolio',
    universe: 'luxe',
    emoji: '📸',
    preview: 'from-amber-600 to-yellow-500',
    sections: [
      { type: 'site-header', variant: 'luxe', content: { logo: 'Éloïse Moreau', links: [{ id: '1', label: 'Portfolio', href: '#' }, { id: '2', label: 'À propos', href: '#' }, { id: '3', label: 'Contact', href: '#' }], ctaLabel: 'Me contacter', ctaHref: '#' }, style: { background: 'white', paddingY: 'none' }, visible: true },
      { type: 'hero', variant: 'luxe', content: { eyebrow: 'PHOTOGRAPHE · PARIS', title: 'Capturer l\'émotion, sublimer l\'instant', subtitle: 'Photographe spécialisée en portrait, mode et événementiel. Chaque image raconte une histoire.', primaryButton: { label: 'Voir le portfolio', href: '#', variant: 'primary' } }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'gallery-grid', variant: 'luxe-masonry', content: { eyebrow: 'Portfolio', title: 'Sélection de travaux', items: [{ id: '1', title: 'Éditorial Vogue', category: 'Mode' }, { id: '2', title: 'Portrait Corporate', category: 'Portrait' }, { id: '3', title: 'Mariage Château de Versailles', category: 'Événementiel' }, { id: '4', title: 'Campagne Parfum', category: 'Publicité' }, { id: '5', title: 'Série Architecturale', category: 'Art' }, { id: '6', title: 'Festival Jazz', category: 'Événementiel' }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'image-text', variant: 'luxe-image-left', content: { eyebrow: 'À propos', title: 'Une approche artistique et humaine', description: 'Depuis 10 ans, je capture des moments authentiques avec une esthétique soignée. Mon travail a été publié dans Vogue, Elle et Le Monde. Chaque séance est une collaboration unique.', primaryButton: { label: 'En savoir plus', href: '#', variant: 'outline' } }, style: { background: 'light', paddingY: 'xl' }, visible: true },
      { type: 'testimonials', variant: 'luxe-featured', content: { eyebrow: 'Avis', title: 'Ce qu\'ils disent', items: [{ id: '1', quote: 'Éloïse a su capturer l\'essence de notre marque avec une sensibilité rare. Les photos sont magistrales.', author: 'Camille Roux', role: 'Directrice artistique', company: 'Maison de Couture', rating: 5 }, { id: '2', quote: 'Un œil extraordinaire et une patience infinie. Les portraits sont d\'une justesse incroyable.', author: 'Alexandre Blanc', role: 'CEO', company: 'Startup Tech', rating: 5 }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'cta', variant: 'luxe-centered', content: { badge: 'Disponible pour vos projets', title: 'Créons ensemble', subtitle: 'Contactez-moi pour discuter de votre projet photo. Devis gratuit sous 24h.', primaryButton: { label: 'Prendre contact', href: '#', variant: 'primary' } }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'site-footer', variant: 'luxe', content: { logo: 'Éloïse Moreau', tagline: 'Photographe · Paris & International', copyright: `© ${year} Éloïse Moreau. Tous droits réservés.`, columns: [{ id: '1', title: 'Navigation', links: [{ id: '1', label: 'Portfolio', href: '#' }, { id: '2', label: 'Tarifs', href: '#' }] }], socials: { instagram: '#', twitter: '#' } }, style: { background: 'dark', paddingY: 'none' }, visible: true },
    ],
  },

  // ─── 6. Portfolio Dev ───
  {
    id: 'portfolio-dev',
    name: 'Portfolio Dev',
    description: 'Portfolio développeur avec projets, blog technique et statistiques',
    category: 'portfolio',
    universe: 'glass',
    emoji: '👨‍💻',
    preview: 'from-cyan-500 to-blue-600',
    sections: [
      { type: 'site-header', variant: 'glass', content: { logo: 'Lucas.dev', links: [{ id: '1', label: 'Projets', href: '#' }, { id: '2', label: 'Blog', href: '#' }, { id: '3', label: 'Contact', href: '#' }], ctaLabel: 'CV', ctaHref: '#' }, style: { background: 'white', paddingY: 'none' }, visible: true },
      { type: 'hero', variant: 'glass', content: { eyebrow: 'DÉVELOPPEUR FULL-STACK', title: 'Je construis des apps web performantes et élégantes', subtitle: 'Spécialisé React, Next.js et Node.js. 7 ans d\'expérience. Disponible en freelance.', primaryButton: { label: 'Voir mes projets', href: '#', variant: 'primary' }, secondaryButton: { label: 'Me contacter', href: '#', variant: 'outline' } }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'features', variant: 'glass-bento', content: { eyebrow: 'Stack', title: 'Technologies maîtrisées', items: [{ id: '1', icon: '⚛️', title: 'React & Next.js', description: 'Apps SSR/SSG performantes, Server Components, App Router.' }, { id: '2', icon: '🟢', title: 'Node.js & APIs', description: 'APIs REST et GraphQL, microservices, WebSockets.' }, { id: '3', icon: '🗄️', title: 'Bases de données', description: 'PostgreSQL, Redis, Prisma ORM, architecture data.' }, { id: '4', icon: '☁️', title: 'Cloud & DevOps', description: 'AWS, Vercel, Docker, CI/CD, monitoring.' }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'blog-grid', variant: 'glass-featured', content: { eyebrow: 'Blog', title: 'Articles récents', items: [{ id: '1', title: 'Server Components : le guide complet', excerpt: 'Tout comprendre sur les RSC en 10 minutes.', date: '2026-02-15', category: 'React' }, { id: '2', title: 'Optimiser les requêtes Prisma', excerpt: 'Techniques avancées pour des queries ultra-rapides.', date: '2026-01-20', category: 'Backend' }, { id: '3', title: 'Architecture micro-frontends', excerpt: 'Quand et comment découper son frontend.', date: '2025-12-10', category: 'Architecture' }] }, style: { background: 'light', paddingY: 'xl' }, visible: true },
      { type: 'stats', variant: 'glass-cards', content: { eyebrow: 'En chiffres', title: 'Mon parcours', items: [{ id: '1', value: '50+', label: 'Projets livrés', description: 'Web apps & sites' }, { id: '2', value: '7 ans', label: 'D\'expérience', description: 'Full-stack' }, { id: '3', value: '15K', label: 'Stars GitHub', description: 'Open source' }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'cta', variant: 'glass-card', content: { badge: 'Disponible en freelance', title: 'Un projet en tête ?', subtitle: 'Discutons de votre idée. Premier appel gratuit, devis sous 48h.', primaryButton: { label: 'Me contacter', href: '#', variant: 'primary' }, secondaryButton: { label: 'Voir mon CV', href: '#', variant: 'outline' } }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'site-footer', variant: 'glass', content: { logo: 'Lucas.dev', tagline: 'Développeur full-stack freelance.', copyright: `© ${year} Lucas. Tous droits réservés.`, columns: [{ id: '1', title: 'Liens', links: [{ id: '1', label: 'GitHub', href: '#' }, { id: '2', label: 'LinkedIn', href: '#' }] }], socials: { twitter: '#', github: '#' } }, style: { background: 'dark', paddingY: 'none' }, visible: true },
    ],
  },

  // ─── 9. Boutique en ligne ───
  {
    id: 'ecommerce-boutique',
    name: 'Boutique en ligne',
    description: 'E-commerce avec grille produits, avis clients et FAQ',
    category: 'ecommerce',
    universe: 'ecommerce',
    emoji: '🛒',
    preview: 'from-emerald-500 to-teal-600',
    sections: [
      { type: 'site-header', variant: 'ecommerce', content: { logo: 'NaturShop', links: [{ id: '1', label: 'Produits', href: '#' }, { id: '2', label: 'Nouveautés', href: '#' }, { id: '3', label: 'Avis', href: '#' }], ctaLabel: 'Panier', ctaHref: '#' }, style: { background: 'white', paddingY: 'none' }, visible: true },
      { type: 'hero', variant: 'ecommerce', content: { eyebrow: 'Nouvelle collection printemps 2026', title: 'Des produits naturels pour votre bien-être', subtitle: 'Cosmétiques bio, soins naturels et compléments — fabriqués en France avec des ingrédients d\'exception.', primaryButton: { label: 'Voir la collection', href: '#', variant: 'primary' }, secondaryButton: { label: 'Nos best-sellers', href: '#', variant: 'outline' } }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'features', variant: 'ecommerce-grid', content: { eyebrow: 'Nos engagements', title: 'Pourquoi choisir NaturShop', items: [{ id: '1', icon: '🌿', title: '100% naturel', description: 'Ingrédients bio certifiés, sans produits chimiques ni additifs.' }, { id: '2', icon: '🇫🇷', title: 'Fabriqué en France', description: 'Tous nos produits sont conçus et fabriqués dans nos ateliers à Lyon.' }, { id: '3', icon: '🚚', title: 'Livraison offerte', description: 'Dès 40€ d\'achat en France métropolitaine, expédié en 24h.' }, { id: '4', icon: '🔄', title: 'Satisfait ou remboursé', description: '30 jours pour changer d\'avis. Retours gratuits et sans conditions.' }] }, style: { background: 'light', paddingY: 'xl' }, visible: true },
      { type: 'product-grid', variant: 'ecommerce-grid', content: { eyebrow: 'Best-sellers', title: 'Nos produits les plus populaires', items: [{ id: '1', name: 'Huile de Jojoba Bio', price: '24,90€', badge: 'Best seller' }, { id: '2', name: 'Crème Hydratante Aloe', price: '29,90€', badge: 'Nouveau' }, { id: '3', name: 'Sérum Vitamine C', price: '34,90€' }, { id: '4', name: 'Baume à Lèvres Karité', price: '9,90€' }, { id: '5', name: 'Shampoing Solide', price: '12,90€', badge: 'Éco' }, { id: '6', name: 'Coffret Découverte', price: '49,90€', badge: '-20%' }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'stats', variant: 'ecommerce-cards', content: { title: 'La confiance de nos clients', items: [{ id: '1', value: '25K+', label: 'Clients satisfaits' }, { id: '2', value: '4.8★', label: 'Note Trustpilot' }, { id: '3', value: '150+', label: 'Produits naturels' }] }, style: { background: 'light', paddingY: 'xl' }, visible: true },
      { type: 'testimonials', variant: 'ecommerce-grid', content: { eyebrow: 'Avis clients', title: 'Ils adorent nos produits', items: [{ id: '1', quote: 'L\'huile de jojoba est incroyable. Ma peau n\'a jamais été aussi douce. Je recommande à 100%.', author: 'Léa Martin', role: 'Cliente vérifiée', company: '', rating: 5 }, { id: '2', quote: 'Livraison ultra rapide et produits de qualité. Mon nouveau rituel beauté !', author: 'Camille Dupuis', role: 'Cliente vérifiée', company: '', rating: 5 }, { id: '3', quote: 'Le coffret découverte est parfait pour tester. J\'ai ensuite commandé tout en taille normale !', author: 'Marine Leroy', role: 'Cliente vérifiée', company: '', rating: 5 }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'faq', variant: 'ecommerce-accordion', content: { eyebrow: 'FAQ', title: 'Questions fréquentes', items: [{ id: '1', question: 'Quels sont les délais de livraison ?', answer: '24-48h en France métropolitaine. 3-5 jours pour l\'international.' }, { id: '2', question: 'Les produits sont-ils testés sur les animaux ?', answer: 'Jamais. Nous sommes certifiés cruelty-free et vegan.' }, { id: '3', question: 'Comment retourner un produit ?', answer: 'Envoyez-nous un email et nous vous fournissons une étiquette de retour prépayée sous 24h.' }] }, style: { background: 'light', paddingY: 'xl' }, visible: true },
      { type: 'site-footer', variant: 'ecommerce', content: { logo: 'NaturShop', tagline: 'Des produits naturels, fabriqués avec soin.', copyright: `© ${year} NaturShop. Tous droits réservés.`, columns: [{ id: '1', title: 'Boutique', links: [{ id: '1', label: 'Produits', href: '#' }, { id: '2', label: 'Promotions', href: '#' }] }, { id: '2', title: 'Service client', links: [{ id: '1', label: 'Contact', href: '#' }, { id: '2', label: 'Retours', href: '#' }] }], socials: { instagram: '#', facebook: '#' } }, style: { background: 'dark', paddingY: 'none' }, visible: true },
    ],
  },

  // ─── 13. Real Estate — Brixsa ───
  {
    id: 'real-estate-brixsa',
    name: 'Brixsa',
    description: 'Template immobilier luxe — crème/brun, GeneralSans, glassmorphism, slider hero, accordéon services',
    category: 'real-estate',
    universe: 'luxe',
    emoji: '🏡',
    preview: 'from-amber-800 to-yellow-900',
    sections: [
      { type: 'site-header', variant: 'brixsa', content: { logo: 'Brixsa', links: [{ id: '1', label: 'Home', href: '/' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Property', href: '/property' }, { id: '4', label: 'Agents', href: '/agents' }, { id: '5', label: 'Blog', href: '/blog' }, { id: '6', label: 'Contact', href: '/contact' }], ctaLabel: 'Menu', ctaHref: '#' }, style: { background: 'dark', paddingY: 'none' }, visible: true },
      { type: 'hero', variant: 'brixsa', content: { title: 'Experience Living Beyond Luxury', subtitle: 'Search...', primaryButton: { label: 'Search', href: '/property', variant: 'primary' }, heroImages: [{ id: '1', src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80', alt: 'Luxury Villa' }, { id: '2', src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80', alt: 'Modern Estate' }, { id: '3', src: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80', alt: 'Palm Grove Mansion' }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'gallery-grid', variant: 'brixsa-listing', content: { title: 'More Than Properties We Deliver Prestige', subtitle: 'Découvrez notre sélection.', images: [{ id: '1', src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', alt: 'Contemporary Home Design', caption: '' }, { id: '2', src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80', alt: 'Rustic Farmhouse Charm', caption: '' }, { id: '3', src: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80', alt: 'Urban Loft Space', caption: '' }], items: [{ id: '1', title: 'Contemporary Home Design', city: 'Chicago', price: '$550,000', beds: 3, baths: 2, sqft: '2,500', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80' }, { id: '2', title: 'Rustic Farmhouse Charm', city: 'New York City', price: '$375,000', beds: 3, baths: 2, sqft: '1,500', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80' }, { id: '3', title: 'Urban Loft Space', city: 'Los Angeles', price: '$500,000', beds: 1, baths: 1, sqft: '1,500', image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80' }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'features', variant: 'brixsa-accordion', content: { title: 'Tailored Solutions for Every Move', items: [{ id: '1', icon: '🏠', title: 'Start Buying', description: 'Find your perfect home with our expert guidance and curated property listings.' }, { id: '2', icon: '💰', title: 'Start Selling', description: 'Maximize your property value with our market expertise and qualified buyers network.' }, { id: '3', icon: '🔑', title: 'Start Renting', description: 'Discover premium rental properties tailored to your lifestyle and budget.' }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'image-text', variant: 'brixsa-about', content: { title: 'We create remarkable communities that blend outdoor beauty with indoor comfort', subtitle: 'Our communities are crafted to seamlessly integrate the tranquility of nature with the elegance of modern interiors. We emphasize creating spaces that are both visually appealing and functionally efficient, ensuring a perfect balance between outdoor charm and indoor luxury.', body: 'Our developments are crafted to seamlessly integrate the serene beauty of nature with the sophistication of modern interiors. We prioritize creating environments that are both visually stunning and functionally efficient, ensuring a perfect harmony between outdoor allure and indoor luxury.', description: '', primaryButton: { label: 'En savoir plus', href: '/about', variant: 'outline' } }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'tabs', variant: 'brixsa-horizontal', content: { title: 'Our Expertise', orientation: 'horizontal', items: [{ id: '1', label: 'Smooth Closings', content: 'Our agents are committed to ensuring a seamless transaction process, offering personalized advice and expert negotiation skills.', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80' }, { id: '2', label: 'Local Experts', content: 'Our agents possess an intimate understanding of local neighborhoods, offering insights and advice tailored to your specific needs.', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80' }, { id: '3', label: 'Verified Listings', content: 'Our agents ensure that every listing is thoroughly vetted, providing you with the most reliable and accurate property information.', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80' }, { id: '4', label: 'Support', content: 'With a commitment to excellence, our agents provide comprehensive support, guiding you through every step of the real estate process.', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80' }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'slider', variant: 'brixsa-parallax', content: { title: 'Featured Properties', slides: [{ id: '1', title: 'Family Friendly Home', subtitle: 'Nestled in a peaceful suburban neighbourhood, with a spacious layout spanning 1,929 square feet, this home offers the perfect blend of comfort and style.', badge: '$3,900', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80' }, { id: '2', title: 'Elegant Condo Living', subtitle: 'Nestled in a peaceful suburban neighbourhood, with a spacious layout spanning 1,929 square feet, this home offers the perfect blend of comfort and style.', badge: '$3,900', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80' }, { id: '3', title: 'Palm Grove Mansion', subtitle: 'Nestled in a peaceful suburban neighbourhood, with a spacious layout spanning 1,929 square feet, this home offers the perfect blend of comfort and style.', badge: '$3,900', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80' }] }, style: { background: 'dark', paddingY: 'none' }, visible: true },
      { type: 'features', variant: 'brixsa-location', content: { title: 'Our Locations', items: [{ id: '1', title: 'Birmingham', icon: '', description: '' }, { id: '2', title: 'San Francisco', icon: '', description: '' }, { id: '3', title: 'Miami', icon: '', description: '' }, { id: '4', title: 'Chicago', icon: '', description: '' }, { id: '5', title: 'Los Angeles', icon: '', description: '' }, { id: '6', title: 'New York City', icon: '', description: '' }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'team', variant: 'brixsa-marquee', content: { title: 'Our Agents', subtitle: 'View all Agents', members: [{ id: '1', name: 'James Smith', role: 'CEO, Founder', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' }, { id: '2', name: 'David Johnson', role: 'CFO', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' }, { id: '3', name: 'Michael Brown', role: 'COO', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80' }, { id: '4', name: 'Matt Dymon', role: 'Real Estate Agent', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80' }, { id: '5', name: 'Jane Smith', role: 'Real Estate Agent', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80' }, { id: '6', name: 'Jeo Zaldana', role: 'Real Estate Agent', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'testimonials', variant: 'brixsa-featured', content: { eyebrow: 'The satisfaction of our customer', title: 'Témoignages', items: [{ id: '1', quote: 'Your real estate team made the process enjoyable and professional. We\'re thrilled with our new home!', author: 'Client 1', role: 'Propriétaire', rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' }, { id: '2', quote: 'The website was user-friendly with detailed listings and effective search filters, simplifying the home-buying process.', author: 'Client 2', role: 'Acheteur', rating: 5, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' }, { id: '3', quote: 'The website facilitated my home search with detailed photos and descriptions. Contacting agents was straightforward.', author: 'Client 3', role: 'Locataire', rating: 5, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80' }, { id: '4', quote: 'The website allowed me to efficiently browse listings and compare prices. Its clear layout was convenient.', author: 'Client 4', role: 'Investisseur', rating: 5, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' }, { id: '5', quote: 'It was a fantastic experience working with your real estate team! The agent was professional and made the process seamless.', author: 'Client 5', role: 'Acquéreur', rating: 5, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'blog-grid', variant: 'brixsa-grid', content: { eyebrow: 'Journal', title: 'Our Journal', items: [{ id: '1', title: 'The Importance of Home Inspections', excerpt: 'Why home inspection is a crucial step before any property purchase.', date: '2026-03-01', category: 'Investments', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80' }, { id: '2', title: 'Understanding Real Estate Terminology', excerpt: 'A comprehensive guide to essential real estate terms to navigate the market confidently.', date: '2026-02-20', category: 'Renovations', image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80' }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'cta', variant: 'brixsa-centered', content: { title: 'Are you looking to buy or rent a property?', subtitle: 'Interested? Get in touch', primaryButton: { label: 'Get in touch', href: '/contact', variant: 'secondary' }, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80', backgroundImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'site-footer', variant: 'brixsa', content: { logo: 'Brixsa', tagline: '', copyright: `© ${year} Brixsa. All rights reserved.`, columns: [{ id: '1', title: 'Navigation', links: [{ id: '1', label: 'Home', href: '/' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Property', href: '/property' }, { id: '4', label: 'Agents', href: '/agents' }, { id: '5', label: 'Blog', href: '/blog' }, { id: '6', label: 'Contact', href: '/contact' }, { id: '7', label: 'FAQ', href: '/faq' }, { id: '8', label: 'Privacy Policy', href: '/privacy-policy' }] }, { id: '2', title: 'Template', links: [{ id: '1', label: 'Style Guides', href: '#' }, { id: '2', label: 'Licenses', href: '#' }, { id: '3', label: 'Changelog', href: '#' }, { id: '4', label: 'GSAP Instructions', href: '#' }, { id: '5', label: '404', href: '#' }] }, { id: '3', title: 'Contact', links: [{ id: '1', label: '(62) 1829017', href: 'tel:621829017' }, { id: '2', label: 'hello@brixsa.com', href: 'mailto:hello@brixsa.com' }, { id: '3', label: '2912 Meadowbrook Road, Los Angeles, CA 90017', href: '#' }] }], socials: { instagram: '#', linkedin: '#' } }, style: { background: 'white', paddingY: 'none' }, visible: true },
    ],
    pages: [
      // ─── About ───
      {
        slug: '/about',
        title: 'About',
        sections: [
          { type: 'site-header', variant: 'brixsa', content: { logo: 'Brixsa', links: [{ id: '1', label: 'Home', href: '/' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Property', href: '/property' }, { id: '4', label: 'Agents', href: '/agents' }, { id: '5', label: 'Blog', href: '/blog' }, { id: '6', label: 'Contact', href: '/contact' }], ctaLabel: 'Menu', ctaHref: '#' }, style: { background: 'dark', paddingY: 'none' }, visible: true },
          { type: 'hero', variant: 'brixsa-page', content: { title: 'The Story Behind Our Standards', subtitle: 'Home • About', backgroundImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
          { type: 'stats', variant: 'brixsa-cards', content: { title: 'Our Numbers', items: [{ id: '1', value: '3000+', label: 'Property Sold' }, { id: '2', value: '29392', label: 'New Properties Listed' }, { id: '3', value: '48+', label: 'Internal team members' }, { id: '4', value: '300+', label: 'Happy Clients' }, { id: '5', value: '15+', label: 'Expert Agents' }, { id: '6', value: '5', label: 'International Awards' }] }, style: { background: 'light', paddingY: 'xl' }, visible: true },
          { type: 'features', variant: 'brixsa-accordion', content: { title: 'What Drives Us', items: [{ id: '1', icon: '🎯', title: 'Mission', description: 'To simplify the luxury home experience through trusted service, personalized care, and premium listings.' }, { id: '2', icon: '👁️', title: 'Vision', description: 'To become the most respected name in high-end real estate by redefining how luxury is bought and sold.' }, { id: '3', icon: '💎', title: 'Value', description: 'Integrity, excellence, and client-first thinking—these guide every property we showcase.' }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
          { type: 'image-text', variant: 'brixsa-about', content: { title: 'CEO\'s Words', description: 'Dear Brixsa Community, It is with great pride and dedication that I lead our team at Brixsa. Every decision we make, every project we undertake, is guided by our commitment to excellence, innovation, and sustainability. We strive to create spaces that inspire, uplift, and stand the test of time. Thank you for entrusting us with your dreams and aspirations.', primaryButton: { label: 'Learn more', href: '#', variant: 'outline' } }, style: { background: 'white', paddingY: 'xl' }, visible: true },
          { type: 'team', variant: 'brixsa-marquee', content: { title: 'Our Agents', subtitle: 'Expert agents dedicated to your success.', members: [{ id: '1', name: 'James Smith', role: 'CEO, Founder', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' }, { id: '2', name: 'David Johnson', role: 'CFO', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' }, { id: '3', name: 'Michael Brown', role: 'COO', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80' }, { id: '4', name: 'Matt Dymon', role: 'Real Estate Agent', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80' }, { id: '5', name: 'Jane Smith', role: 'Real Estate Agent', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80' }, { id: '6', name: 'Jeo Zaldana', role: 'Real Estate Agent', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
          { type: 'cta', variant: 'brixsa-centered', content: { title: 'Are you looking to buy or rent a property?', subtitle: 'Interested? Get in touch', primaryButton: { label: 'Get in touch', href: '/contact', variant: 'secondary' }, backgroundImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
          { type: 'site-footer', variant: 'brixsa', content: { logo: 'Brixsa', tagline: '', copyright: `© ${year} Brixsa. All rights reserved.`, columns: [{ id: '1', title: 'Navigation', links: [{ id: '1', label: 'Home', href: '/' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Property', href: '/property' }, { id: '4', label: 'Agents', href: '/agents' }, { id: '5', label: 'Blog', href: '/blog' }, { id: '6', label: 'Contact', href: '/contact' }] }, { id: '2', title: 'Contact', links: [{ id: '1', label: '(62) 1829017', href: 'tel:621829017' }, { id: '2', label: 'hello@brixsa.com', href: 'mailto:hello@brixsa.com' }, { id: '3', label: '2912 Meadowbrook Road, Los Angeles, CA 90017', href: '#' }] }], socials: { instagram: '#', linkedin: '#' } }, style: { background: 'white', paddingY: 'none' }, visible: true },
        ],
      },
      // ─── Property Listing ───
      {
        slug: '/property',
        title: 'Property',
        sections: [
          { type: 'site-header', variant: 'brixsa', content: { logo: 'Brixsa', links: [{ id: '1', label: 'Home', href: '/' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Property', href: '/property' }, { id: '4', label: 'Agents', href: '/agents' }, { id: '5', label: 'Blog', href: '/blog' }, { id: '6', label: 'Contact', href: '/contact' }], ctaLabel: 'Menu', ctaHref: '#' }, style: { background: 'dark', paddingY: 'none' }, visible: true },
          { type: 'hero', variant: 'brixsa-page', content: { title: 'Where Luxury Knows No Limits', subtitle: 'Home • Property', backgroundImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
          { type: 'gallery-grid', variant: 'brixsa-listing', content: { title: 'Our Properties', items: [{ id: '1', title: 'Contemporary Home Design', city: 'Chicago', price: '$550,000', beds: 3, baths: 2, sqft: '2,500', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80' }, { id: '2', title: 'Rustic Farmhouse Charm', city: 'New York City', price: '$375,000', beds: 3, baths: 2, sqft: '1,500', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80' }, { id: '3', title: 'Urban Loft Space', city: 'Los Angeles', price: '$500,000', beds: 1, baths: 1, sqft: '1,500', image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80' }, { id: '4', title: 'Family Friendly Home', city: 'Miami', price: '$400,000', beds: 4, baths: 3, sqft: '3,000', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80' }, { id: '5', title: 'Elegant Condo Living', city: 'Chicago', price: '$600,000', beds: 2, baths: 2, sqft: '4,000', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80' }, { id: '6', title: 'Palm Grove Mansion', city: 'Los Angeles', price: '$300,000', beds: 2, baths: 1, sqft: '2,000', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80' }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
          { type: 'cta', variant: 'brixsa-centered', content: { title: 'Are you looking to buy or rent a property?', subtitle: 'Interested? Get in touch', primaryButton: { label: 'Get in touch', href: '/contact', variant: 'secondary' }, backgroundImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
          { type: 'site-footer', variant: 'brixsa', content: { logo: 'Brixsa', tagline: '', copyright: `© ${year} Brixsa. All rights reserved.`, columns: [{ id: '1', title: 'Navigation', links: [{ id: '1', label: 'Home', href: '/' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Property', href: '/property' }, { id: '4', label: 'Agents', href: '/agents' }, { id: '5', label: 'Blog', href: '/blog' }, { id: '6', label: 'Contact', href: '/contact' }] }, { id: '2', title: 'Contact', links: [{ id: '1', label: '(62) 1829017', href: 'tel:621829017' }, { id: '2', label: 'hello@brixsa.com', href: 'mailto:hello@brixsa.com' }, { id: '3', label: '2912 Meadowbrook Road, Los Angeles, CA 90017', href: '#' }] }], socials: { instagram: '#', linkedin: '#' } }, style: { background: 'white', paddingY: 'none' }, visible: true },
        ],
      },
      // ─── Property Detail ───
      {
        slug: '/property/modern-apartment',
        title: 'Modern Apartment Living',
        sections: [
          { type: 'site-header', variant: 'brixsa', content: { logo: 'Brixsa', links: [{ id: '1', label: 'Home', href: '/' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Property', href: '/property' }, { id: '4', label: 'Agents', href: '/agents' }, { id: '5', label: 'Blog', href: '/blog' }, { id: '6', label: 'Contact', href: '/contact' }], ctaLabel: 'Menu', ctaHref: '#' }, style: { background: 'dark', paddingY: 'none' }, visible: true },
          { type: 'hero', variant: 'brixsa-page', content: { title: 'Modern Apartment Living', subtitle: 'Home • Property • Modern Apartment', backgroundImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
          { type: 'gallery-grid', variant: 'brixsa-detail', content: { title: 'Modern Apartment Living', price: '$350,000', location: 'Miami', description: 'This stylish and modern apartment offers a perfect blend of urban living and comfortable, thoughtfully designed spaces, ideally situated in the vibrant and bustling heart of the city, making it an exceptional place to call home.', specs: { beds: 2, baths: 2, sqft: '4,000', livingArea: '1,200', type: 'House', floor: '10', yearBuilt: '2020' }, features: ['Spacious living area', 'Modern kitchen', 'Close to public transport'], amenities: ['Swimming Pool', 'Gym/Fitness Center', '24/7 Security', 'Children\'s Playground', 'Community Clubhouse', 'Pet-Friendly Facilities', 'BBQ and Picnic Area', 'Emergency Exit', 'Library and Reading Room'], agent: { name: 'Jeo Zaldana', email: 'john.doe@example.com', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' }, images: [{ id: '1', src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80' }, { id: '2', src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80' }, { id: '3', src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80' }], relatedProperties: [{ id: '1', title: 'Contemporary Home Design', price: '$550,000', city: 'Chicago', beds: 3, baths: 2, sqft: '2,500', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80' }, { id: '2', title: 'Rustic Farmhouse Charm', price: '$375,000', city: 'New York City', beds: 3, baths: 2, sqft: '1,500', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80' }, { id: '3', title: 'Urban Loft Space', price: '$500,000', city: 'Los Angeles', beds: 1, baths: 1, sqft: '1,500', image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80' }] }, style: { background: 'light', paddingY: 'xl' }, visible: true },
          { type: 'cta', variant: 'brixsa-centered', content: { title: 'Are you looking to buy or rent a property?', subtitle: 'Interested? Get in touch', primaryButton: { label: 'Get in touch', href: '/contact', variant: 'secondary' }, backgroundImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
          { type: 'site-footer', variant: 'brixsa', content: { logo: 'Brixsa', tagline: '', copyright: `© ${year} Brixsa. All rights reserved.`, columns: [{ id: '1', title: 'Navigation', links: [{ id: '1', label: 'Home', href: '/' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Property', href: '/property' }, { id: '4', label: 'Agents', href: '/agents' }, { id: '5', label: 'Blog', href: '/blog' }, { id: '6', label: 'Contact', href: '/contact' }] }, { id: '2', title: 'Contact', links: [{ id: '1', label: '(62) 1829017', href: 'tel:621829017' }, { id: '2', label: 'hello@brixsa.com', href: 'mailto:hello@brixsa.com' }, { id: '3', label: '2912 Meadowbrook Road, Los Angeles, CA 90017', href: '#' }] }], socials: { instagram: '#', linkedin: '#' } }, style: { background: 'white', paddingY: 'none' }, visible: true },
        ],
      },
      // ─── Property Detail — Contemporary Home Design ───
      {
        slug: '/property/contemporary-home-design',
        title: 'Contemporary Home Design',
        sections: [
          { type: 'site-header', variant: 'brixsa', content: { logo: 'Brixsa', links: [{ id: '1', label: 'Home', href: '/' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Property', href: '/property' }, { id: '4', label: 'Agents', href: '/agents' }, { id: '5', label: 'Blog', href: '/blog' }, { id: '6', label: 'Contact', href: '/contact' }], ctaLabel: 'Menu', ctaHref: '#' }, style: { background: 'dark', paddingY: 'none' }, visible: true },
          { type: 'hero', variant: 'brixsa-page', content: { title: 'Contemporary Home Design', subtitle: 'Home • Property • Contemporary Home', backgroundImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
          { type: 'gallery-grid', variant: 'brixsa-detail', content: { title: 'Contemporary Home Design', price: '$550,000', location: 'Chicago', description: 'A stunning contemporary home featuring clean lines, floor-to-ceiling windows, and an open-concept layout that seamlessly blends indoor and outdoor living spaces in the heart of Chicago.', specs: { beds: 3, baths: 2, sqft: '2,500', livingArea: '1,800', type: 'House', floor: '2', yearBuilt: '2022' }, features: ['Open-concept floor plan', 'Floor-to-ceiling windows', 'Smart home technology', 'Chef\'s kitchen'], amenities: ['Swimming Pool', 'Gym/Fitness Center', '24/7 Security', 'Covered Parking', 'Community Clubhouse', 'BBQ and Picnic Area', 'Emergency Exit', 'Pet-Friendly Facilities'], agent: { name: 'James Smith', email: 'james@brixsa.com', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' }, images: [{ id: '1', src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80' }, { id: '2', src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80' }, { id: '3', src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80' }], relatedProperties: [{ id: '1', title: 'Rustic Farmhouse Charm', price: '$375,000', city: 'New York City', beds: 3, baths: 2, sqft: '1,500', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80' }, { id: '2', title: 'Urban Loft Space', price: '$500,000', city: 'Los Angeles', beds: 1, baths: 1, sqft: '1,500', image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80' }, { id: '3', title: 'Modern Apartment Living', price: '$350,000', city: 'Miami', beds: 2, baths: 2, sqft: '4,000', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80' }] }, style: { background: 'light', paddingY: 'xl' }, visible: true },
          { type: 'cta', variant: 'brixsa-centered', content: { title: 'Are you looking to buy or rent a property?', subtitle: 'Interested? Get in touch', primaryButton: { label: 'Get in touch', href: '/contact', variant: 'secondary' }, backgroundImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
          { type: 'site-footer', variant: 'brixsa', content: { logo: 'Brixsa', tagline: '', copyright: `© ${year} Brixsa. All rights reserved.`, columns: [{ id: '1', title: 'Navigation', links: [{ id: '1', label: 'Home', href: '/' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Property', href: '/property' }, { id: '4', label: 'Agents', href: '/agents' }, { id: '5', label: 'Blog', href: '/blog' }, { id: '6', label: 'Contact', href: '/contact' }] }, { id: '2', title: 'Contact', links: [{ id: '1', label: '(62) 1829017', href: 'tel:621829017' }, { id: '2', label: 'hello@brixsa.com', href: 'mailto:hello@brixsa.com' }, { id: '3', label: '2912 Meadowbrook Road, Los Angeles, CA 90017', href: '#' }] }], socials: { instagram: '#', linkedin: '#' } }, style: { background: 'white', paddingY: 'none' }, visible: true },
        ],
      },
      // ─── Property Detail — Rustic Farmhouse Charm ───
      {
        slug: '/property/rustic-farmhouse-charm',
        title: 'Rustic Farmhouse Charm',
        sections: [
          { type: 'site-header', variant: 'brixsa', content: { logo: 'Brixsa', links: [{ id: '1', label: 'Home', href: '/' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Property', href: '/property' }, { id: '4', label: 'Agents', href: '/agents' }, { id: '5', label: 'Blog', href: '/blog' }, { id: '6', label: 'Contact', href: '/contact' }], ctaLabel: 'Menu', ctaHref: '#' }, style: { background: 'dark', paddingY: 'none' }, visible: true },
          { type: 'hero', variant: 'brixsa-page', content: { title: 'Rustic Farmhouse Charm', subtitle: 'Home • Property • Rustic Farmhouse', backgroundImage: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1920&q=80' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
          { type: 'gallery-grid', variant: 'brixsa-detail', content: { title: 'Rustic Farmhouse Charm', price: '$375,000', location: 'New York City', description: 'Experience the warmth and character of this beautifully restored farmhouse, featuring original exposed beams, a wraparound porch, and modern amenities nestled on a tranquil tree-lined street.', specs: { beds: 3, baths: 2, sqft: '1,500', livingArea: '1,100', type: 'House', floor: '2', yearBuilt: '2018' }, features: ['Wraparound porch', 'Exposed beam ceilings', 'Updated farmhouse kitchen', 'Garden with fruit trees'], amenities: ['Private Garden', 'Covered Parking', '24/7 Security', 'Community Clubhouse', 'BBQ and Picnic Area', 'Pet-Friendly Facilities', 'Library and Reading Room', 'Emergency Exit'], agent: { name: 'Sarah Johnson', email: 'sarah@brixsa.com', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' }, images: [{ id: '1', src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1920&q=80' }, { id: '2', src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80' }, { id: '3', src: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80' }], relatedProperties: [{ id: '1', title: 'Contemporary Home Design', price: '$550,000', city: 'Chicago', beds: 3, baths: 2, sqft: '2,500', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80' }, { id: '2', title: 'Urban Loft Space', price: '$500,000', city: 'Los Angeles', beds: 1, baths: 1, sqft: '1,500', image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80' }, { id: '3', title: 'Family Friendly Home', price: '$400,000', city: 'Miami', beds: 4, baths: 3, sqft: '3,000', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80' }] }, style: { background: 'light', paddingY: 'xl' }, visible: true },
          { type: 'cta', variant: 'brixsa-centered', content: { title: 'Are you looking to buy or rent a property?', subtitle: 'Interested? Get in touch', primaryButton: { label: 'Get in touch', href: '/contact', variant: 'secondary' }, backgroundImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
          { type: 'site-footer', variant: 'brixsa', content: { logo: 'Brixsa', tagline: '', copyright: `© ${year} Brixsa. All rights reserved.`, columns: [{ id: '1', title: 'Navigation', links: [{ id: '1', label: 'Home', href: '/' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Property', href: '/property' }, { id: '4', label: 'Agents', href: '/agents' }, { id: '5', label: 'Blog', href: '/blog' }, { id: '6', label: 'Contact', href: '/contact' }] }, { id: '2', title: 'Contact', links: [{ id: '1', label: '(62) 1829017', href: 'tel:621829017' }, { id: '2', label: 'hello@brixsa.com', href: 'mailto:hello@brixsa.com' }, { id: '3', label: '2912 Meadowbrook Road, Los Angeles, CA 90017', href: '#' }] }], socials: { instagram: '#', linkedin: '#' } }, style: { background: 'white', paddingY: 'none' }, visible: true },
        ],
      },
      // ─── Property Detail — Urban Loft Space ───
      {
        slug: '/property/urban-loft-space',
        title: 'Urban Loft Space',
        sections: [
          { type: 'site-header', variant: 'brixsa', content: { logo: 'Brixsa', links: [{ id: '1', label: 'Home', href: '/' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Property', href: '/property' }, { id: '4', label: 'Agents', href: '/agents' }, { id: '5', label: 'Blog', href: '/blog' }, { id: '6', label: 'Contact', href: '/contact' }], ctaLabel: 'Menu', ctaHref: '#' }, style: { background: 'dark', paddingY: 'none' }, visible: true },
          { type: 'hero', variant: 'brixsa-page', content: { title: 'Urban Loft Space', subtitle: 'Home • Property • Urban Loft', backgroundImage: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1920&q=80' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
          { type: 'gallery-grid', variant: 'brixsa-detail', content: { title: 'Urban Loft Space', price: '$500,000', location: 'Los Angeles', description: 'A sleek, industrial-chic loft in the heart of downtown Los Angeles, featuring soaring ceilings, polished concrete floors, and walls of glass offering panoramic city views and natural light.', specs: { beds: 1, baths: 1, sqft: '1,500', livingArea: '1,200', type: 'Apartment', floor: '15', yearBuilt: '2021' }, features: ['Industrial-chic design', 'Panoramic city views', 'Polished concrete floors', 'Rooftop access'], amenities: ['Rooftop Terrace', 'Gym/Fitness Center', '24/7 Security', 'Concierge Service', 'Co-Working Space', 'Package Lockers', 'Bike Storage', 'Emergency Exit'], agent: { name: 'Jeo Zaldana', email: 'john.doe@example.com', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' }, images: [{ id: '1', src: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1920&q=80' }, { id: '2', src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80' }, { id: '3', src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80' }], relatedProperties: [{ id: '1', title: 'Contemporary Home Design', price: '$550,000', city: 'Chicago', beds: 3, baths: 2, sqft: '2,500', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80' }, { id: '2', title: 'Elegant Condo Living', price: '$600,000', city: 'Chicago', beds: 2, baths: 2, sqft: '4,000', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80' }, { id: '3', title: 'Palm Grove Mansion', price: '$300,000', city: 'Los Angeles', beds: 2, baths: 1, sqft: '2,000', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80' }] }, style: { background: 'light', paddingY: 'xl' }, visible: true },
          { type: 'cta', variant: 'brixsa-centered', content: { title: 'Are you looking to buy or rent a property?', subtitle: 'Interested? Get in touch', primaryButton: { label: 'Get in touch', href: '/contact', variant: 'secondary' }, backgroundImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
          { type: 'site-footer', variant: 'brixsa', content: { logo: 'Brixsa', tagline: '', copyright: `© ${year} Brixsa. All rights reserved.`, columns: [{ id: '1', title: 'Navigation', links: [{ id: '1', label: 'Home', href: '/' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Property', href: '/property' }, { id: '4', label: 'Agents', href: '/agents' }, { id: '5', label: 'Blog', href: '/blog' }, { id: '6', label: 'Contact', href: '/contact' }] }, { id: '2', title: 'Contact', links: [{ id: '1', label: '(62) 1829017', href: 'tel:621829017' }, { id: '2', label: 'hello@brixsa.com', href: 'mailto:hello@brixsa.com' }, { id: '3', label: '2912 Meadowbrook Road, Los Angeles, CA 90017', href: '#' }] }], socials: { instagram: '#', linkedin: '#' } }, style: { background: 'white', paddingY: 'none' }, visible: true },
        ],
      },
      // ─── Property Detail — Family Friendly Home ───
      {
        slug: '/property/family-friendly-home',
        title: 'Family Friendly Home',
        sections: [
          { type: 'site-header', variant: 'brixsa', content: { logo: 'Brixsa', links: [{ id: '1', label: 'Home', href: '/' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Property', href: '/property' }, { id: '4', label: 'Agents', href: '/agents' }, { id: '5', label: 'Blog', href: '/blog' }, { id: '6', label: 'Contact', href: '/contact' }], ctaLabel: 'Menu', ctaHref: '#' }, style: { background: 'dark', paddingY: 'none' }, visible: true },
          { type: 'hero', variant: 'brixsa-page', content: { title: 'Family Friendly Home', subtitle: 'Home • Property • Family Home', backgroundImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
          { type: 'gallery-grid', variant: 'brixsa-detail', content: { title: 'Family Friendly Home', price: '$400,000', location: 'Miami', description: 'The perfect family retreat featuring spacious bedrooms, a large backyard with a pool, a gourmet kitchen, and a quiet neighborhood with excellent schools and parks nearby.', specs: { beds: 4, baths: 3, sqft: '3,000', livingArea: '2,200', type: 'House', floor: '2', yearBuilt: '2019' }, features: ['Large backyard with pool', 'Gourmet kitchen', 'Walk-in closets', 'Home office space', 'Near top-rated schools'], amenities: ['Swimming Pool', 'Children\'s Playground', 'Community Clubhouse', 'BBQ and Picnic Area', 'Pet-Friendly Facilities', '24/7 Security', 'Covered Parking', 'Emergency Exit', 'Library and Reading Room'], agent: { name: 'James Smith', email: 'james@brixsa.com', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' }, images: [{ id: '1', src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80' }, { id: '2', src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80' }, { id: '3', src: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80' }], relatedProperties: [{ id: '1', title: 'Contemporary Home Design', price: '$550,000', city: 'Chicago', beds: 3, baths: 2, sqft: '2,500', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80' }, { id: '2', title: 'Rustic Farmhouse Charm', price: '$375,000', city: 'New York City', beds: 3, baths: 2, sqft: '1,500', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80' }, { id: '3', title: 'Elegant Condo Living', price: '$600,000', city: 'Chicago', beds: 2, baths: 2, sqft: '4,000', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80' }] }, style: { background: 'light', paddingY: 'xl' }, visible: true },
          { type: 'cta', variant: 'brixsa-centered', content: { title: 'Are you looking to buy or rent a property?', subtitle: 'Interested? Get in touch', primaryButton: { label: 'Get in touch', href: '/contact', variant: 'secondary' }, backgroundImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
          { type: 'site-footer', variant: 'brixsa', content: { logo: 'Brixsa', tagline: '', copyright: `© ${year} Brixsa. All rights reserved.`, columns: [{ id: '1', title: 'Navigation', links: [{ id: '1', label: 'Home', href: '/' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Property', href: '/property' }, { id: '4', label: 'Agents', href: '/agents' }, { id: '5', label: 'Blog', href: '/blog' }, { id: '6', label: 'Contact', href: '/contact' }] }, { id: '2', title: 'Contact', links: [{ id: '1', label: '(62) 1829017', href: 'tel:621829017' }, { id: '2', label: 'hello@brixsa.com', href: 'mailto:hello@brixsa.com' }, { id: '3', label: '2912 Meadowbrook Road, Los Angeles, CA 90017', href: '#' }] }], socials: { instagram: '#', linkedin: '#' } }, style: { background: 'white', paddingY: 'none' }, visible: true },
        ],
      },
      // ─── Property Detail — Elegant Condo Living ───
      {
        slug: '/property/elegant-condo-living',
        title: 'Elegant Condo Living',
        sections: [
          { type: 'site-header', variant: 'brixsa', content: { logo: 'Brixsa', links: [{ id: '1', label: 'Home', href: '/' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Property', href: '/property' }, { id: '4', label: 'Agents', href: '/agents' }, { id: '5', label: 'Blog', href: '/blog' }, { id: '6', label: 'Contact', href: '/contact' }], ctaLabel: 'Menu', ctaHref: '#' }, style: { background: 'dark', paddingY: 'none' }, visible: true },
          { type: 'hero', variant: 'brixsa-page', content: { title: 'Elegant Condo Living', subtitle: 'Home • Property • Elegant Condo', backgroundImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
          { type: 'gallery-grid', variant: 'brixsa-detail', content: { title: 'Elegant Condo Living', price: '$600,000', location: 'Chicago', description: 'An exquisitely designed luxury condo offering premium finishes, a gourmet kitchen, spa-like bathrooms, and breathtaking skyline views from every room in one of Chicago\'s most sought-after buildings.', specs: { beds: 2, baths: 2, sqft: '4,000', livingArea: '2,800', type: 'Condo', floor: '22', yearBuilt: '2023' }, features: ['Skyline views', 'Marble finishes', 'Wine cellar', 'Private elevator access', 'Spa-like bathrooms'], amenities: ['Swimming Pool', 'Gym/Fitness Center', '24/7 Security', 'Concierge Service', 'Valet Parking', 'Rooftop Lounge', 'Business Center', 'Emergency Exit', 'Pet-Friendly Facilities'], agent: { name: 'Sarah Johnson', email: 'sarah@brixsa.com', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' }, images: [{ id: '1', src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80' }, { id: '2', src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80' }, { id: '3', src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80' }], relatedProperties: [{ id: '1', title: 'Modern Apartment Living', price: '$350,000', city: 'Miami', beds: 2, baths: 2, sqft: '4,000', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80' }, { id: '2', title: 'Urban Loft Space', price: '$500,000', city: 'Los Angeles', beds: 1, baths: 1, sqft: '1,500', image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80' }, { id: '3', title: 'Palm Grove Mansion', price: '$300,000', city: 'Los Angeles', beds: 2, baths: 1, sqft: '2,000', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80' }] }, style: { background: 'light', paddingY: 'xl' }, visible: true },
          { type: 'cta', variant: 'brixsa-centered', content: { title: 'Are you looking to buy or rent a property?', subtitle: 'Interested? Get in touch', primaryButton: { label: 'Get in touch', href: '/contact', variant: 'secondary' }, backgroundImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
          { type: 'site-footer', variant: 'brixsa', content: { logo: 'Brixsa', tagline: '', copyright: `© ${year} Brixsa. All rights reserved.`, columns: [{ id: '1', title: 'Navigation', links: [{ id: '1', label: 'Home', href: '/' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Property', href: '/property' }, { id: '4', label: 'Agents', href: '/agents' }, { id: '5', label: 'Blog', href: '/blog' }, { id: '6', label: 'Contact', href: '/contact' }] }, { id: '2', title: 'Contact', links: [{ id: '1', label: '(62) 1829017', href: 'tel:621829017' }, { id: '2', label: 'hello@brixsa.com', href: 'mailto:hello@brixsa.com' }, { id: '3', label: '2912 Meadowbrook Road, Los Angeles, CA 90017', href: '#' }] }], socials: { instagram: '#', linkedin: '#' } }, style: { background: 'white', paddingY: 'none' }, visible: true },
        ],
      },
      // ─── Property Detail — Palm Grove Mansion ───
      {
        slug: '/property/palm-grove-mansion',
        title: 'Palm Grove Mansion',
        sections: [
          { type: 'site-header', variant: 'brixsa', content: { logo: 'Brixsa', links: [{ id: '1', label: 'Home', href: '/' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Property', href: '/property' }, { id: '4', label: 'Agents', href: '/agents' }, { id: '5', label: 'Blog', href: '/blog' }, { id: '6', label: 'Contact', href: '/contact' }], ctaLabel: 'Menu', ctaHref: '#' }, style: { background: 'dark', paddingY: 'none' }, visible: true },
          { type: 'hero', variant: 'brixsa-page', content: { title: 'Palm Grove Mansion', subtitle: 'Home • Property • Palm Grove', backgroundImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
          { type: 'gallery-grid', variant: 'brixsa-detail', content: { title: 'Palm Grove Mansion', price: '$300,000', location: 'Los Angeles', description: 'A charming mansion surrounded by lush palm groves, offering a serene escape from the city while being minutes away from world-class dining, shopping, and entertainment venues.', specs: { beds: 2, baths: 1, sqft: '2,000', livingArea: '1,500', type: 'House', floor: '1', yearBuilt: '2017' }, features: ['Lush tropical gardens', 'Private driveway', 'Outdoor entertainment area', 'Renovated interior'], amenities: ['Private Garden', 'Covered Parking', '24/7 Security', 'BBQ and Picnic Area', 'Pet-Friendly Facilities', 'Swimming Pool', 'Emergency Exit', 'Outdoor Lounge'], agent: { name: 'Jeo Zaldana', email: 'john.doe@example.com', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' }, images: [{ id: '1', src: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80' }, { id: '2', src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80' }, { id: '3', src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80' }], relatedProperties: [{ id: '1', title: 'Contemporary Home Design', price: '$550,000', city: 'Chicago', beds: 3, baths: 2, sqft: '2,500', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80' }, { id: '2', title: 'Modern Apartment Living', price: '$350,000', city: 'Miami', beds: 2, baths: 2, sqft: '4,000', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80' }, { id: '3', title: 'Family Friendly Home', price: '$400,000', city: 'Miami', beds: 4, baths: 3, sqft: '3,000', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80' }] }, style: { background: 'light', paddingY: 'xl' }, visible: true },
          { type: 'cta', variant: 'brixsa-centered', content: { title: 'Are you looking to buy or rent a property?', subtitle: 'Interested? Get in touch', primaryButton: { label: 'Get in touch', href: '/contact', variant: 'secondary' }, backgroundImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
          { type: 'site-footer', variant: 'brixsa', content: { logo: 'Brixsa', tagline: '', copyright: `© ${year} Brixsa. All rights reserved.`, columns: [{ id: '1', title: 'Navigation', links: [{ id: '1', label: 'Home', href: '/' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Property', href: '/property' }, { id: '4', label: 'Agents', href: '/agents' }, { id: '5', label: 'Blog', href: '/blog' }, { id: '6', label: 'Contact', href: '/contact' }] }, { id: '2', title: 'Contact', links: [{ id: '1', label: '(62) 1829017', href: 'tel:621829017' }, { id: '2', label: 'hello@brixsa.com', href: 'mailto:hello@brixsa.com' }, { id: '3', label: '2912 Meadowbrook Road, Los Angeles, CA 90017', href: '#' }] }], socials: { instagram: '#', linkedin: '#' } }, style: { background: 'white', paddingY: 'none' }, visible: true },
        ],
      },
      // ─── Agents Listing ───
      {
        slug: '/agents',
        title: 'Agents',
        sections: [
          { type: 'site-header', variant: 'brixsa', content: { logo: 'Brixsa', links: [{ id: '1', label: 'Home', href: '/' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Property', href: '/property' }, { id: '4', label: 'Agents', href: '/agents' }, { id: '5', label: 'Blog', href: '/blog' }, { id: '6', label: 'Contact', href: '/contact' }], ctaLabel: 'Menu', ctaHref: '#' }, style: { background: 'dark', paddingY: 'none' }, visible: true },
          { type: 'hero', variant: 'brixsa-page', content: { title: 'Our Agents', subtitle: 'Home • Agents', backgroundImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
          { type: 'team', variant: 'brixsa-marquee', content: { title: 'Meet the Team', subtitle: 'Expert agents dedicated to your success.', members: [{ id: '1', name: 'James Smith', role: 'CEO, Founder', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' }, { id: '2', name: 'David Johnson', role: 'CFO', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' }, { id: '3', name: 'Michael Brown', role: 'COO', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80' }, { id: '4', name: 'Matt Dymon', role: 'Real Estate Agent', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80' }, { id: '5', name: 'Jane Smith', role: 'Real Estate Agent', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80' }, { id: '6', name: 'Jeo Zaldana', role: 'Real Estate Agent', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
          { type: 'cta', variant: 'brixsa-centered', content: { title: 'Are you looking to buy or rent a property?', subtitle: 'Interested? Get in touch', primaryButton: { label: 'Get in touch', href: '/contact', variant: 'secondary' }, backgroundImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
          { type: 'site-footer', variant: 'brixsa', content: { logo: 'Brixsa', tagline: '', copyright: `© ${year} Brixsa. All rights reserved.`, columns: [{ id: '1', title: 'Navigation', links: [{ id: '1', label: 'Home', href: '/' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Property', href: '/property' }, { id: '4', label: 'Agents', href: '/agents' }, { id: '5', label: 'Blog', href: '/blog' }, { id: '6', label: 'Contact', href: '/contact' }] }, { id: '2', title: 'Contact', links: [{ id: '1', label: '(62) 1829017', href: 'tel:621829017' }, { id: '2', label: 'hello@brixsa.com', href: 'mailto:hello@brixsa.com' }, { id: '3', label: '2912 Meadowbrook Road, Los Angeles, CA 90017', href: '#' }] }], socials: { instagram: '#', linkedin: '#' } }, style: { background: 'white', paddingY: 'none' }, visible: true },
        ],
      },
      // ─── Agent Detail ───
      {
        slug: '/agent/james-smith',
        title: 'James Smith',
        sections: [
          { type: 'site-header', variant: 'brixsa', content: { logo: 'Brixsa', links: [{ id: '1', label: 'Home', href: '/' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Property', href: '/property' }, { id: '4', label: 'Agents', href: '/agents' }, { id: '5', label: 'Blog', href: '/blog' }, { id: '6', label: 'Contact', href: '/contact' }], ctaLabel: 'Menu', ctaHref: '#' }, style: { background: 'dark', paddingY: 'none' }, visible: true },
          { type: 'hero', variant: 'brixsa-page', content: { title: 'James Smith', subtitle: 'Home • Agents • James Smith', backgroundImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
          { type: 'team', variant: 'brixsa-detail', content: { members: [{ id: '1', name: 'James Smith', role: 'CEO, Founder', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', bio: 'James Smith is a passionate real estate agent with over 8 years of experience in the industry. He focuses on both residential and commercial properties, providing clients with comprehensive market analysis and tailored strategies to meet their needs. Known for his integrity and commitment to client satisfaction, he works to ensure every transaction is smooth and successful.', phone: '(62) 1829017', email: 'hello@brixsa.com', address: '2912 Meadowbrook Road, Los Angeles, CA 90017' }] }, style: { background: 'light', paddingY: 'xl' }, visible: true },
          { type: 'cta', variant: 'brixsa-centered', content: { title: 'Are you looking to buy or rent a property?', subtitle: 'Interested? Get in touch', primaryButton: { label: 'Get in touch', href: '/contact', variant: 'secondary' }, backgroundImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
          { type: 'site-footer', variant: 'brixsa', content: { logo: 'Brixsa', tagline: '', copyright: `© ${year} Brixsa. All rights reserved.`, columns: [{ id: '1', title: 'Navigation', links: [{ id: '1', label: 'Home', href: '/' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Property', href: '/property' }, { id: '4', label: 'Agents', href: '/agents' }, { id: '5', label: 'Blog', href: '/blog' }, { id: '6', label: 'Contact', href: '/contact' }] }, { id: '2', title: 'Contact', links: [{ id: '1', label: '(62) 1829017', href: 'tel:621829017' }, { id: '2', label: 'hello@brixsa.com', href: 'mailto:hello@brixsa.com' }, { id: '3', label: '2912 Meadowbrook Road, Los Angeles, CA 90017', href: '#' }] }], socials: { instagram: '#', linkedin: '#' } }, style: { background: 'white', paddingY: 'none' }, visible: true },
        ],
      },
      // ─── Blog Listing ───
      {
        slug: '/blog',
        title: 'Blog',
        sections: [
          { type: 'site-header', variant: 'brixsa', content: { logo: 'Brixsa', links: [{ id: '1', label: 'Home', href: '/' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Property', href: '/property' }, { id: '4', label: 'Agents', href: '/agents' }, { id: '5', label: 'Blog', href: '/blog' }, { id: '6', label: 'Contact', href: '/contact' }], ctaLabel: 'Menu', ctaHref: '#' }, style: { background: 'dark', paddingY: 'none' }, visible: true },
          { type: 'hero', variant: 'brixsa-page', content: { title: 'Explore. Learn. Innovate.', subtitle: 'Home • Blog', backgroundImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
          { type: 'blog-grid', variant: 'brixsa-grid', content: { title: 'Latest Articles', items: [{ id: '1', title: 'The Importance of Home Inspections', excerpt: 'Why home inspection is a crucial step before any property purchase.', date: '2026-03-01', category: 'Investments', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80', author: 'Emily Williams' }, { id: '2', title: 'Understanding Real Estate Terminology', excerpt: 'A comprehensive guide to essential real estate terms.', date: '2026-02-20', category: 'Renovations', image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', author: 'Emily Williams' }, { id: '3', title: 'Financing Options for Home Buyers', excerpt: 'Explore the best financing and mortgage options.', date: '2026-02-10', category: 'Market Trends', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', author: 'Emily Williams' }, { id: '4', title: 'The Impact of Location on Property Value', excerpt: 'How location drives property value and investment returns.', date: '2026-01-28', category: 'Property Management', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', author: 'Emily Williams' }, { id: '5', title: 'How to Choose the Right Real Estate Agent', excerpt: 'Tips for selecting the perfect agent for your needs.', date: '2026-01-15', category: 'Market Trends', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80', author: 'Emily Williams' }, { id: '6', title: 'The Benefits of Investing in Rental Properties', excerpt: 'Why rental properties are a smart investment strategy.', date: '2026-01-05', category: 'Property Management', image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80', author: 'Emily Williams' }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
          { type: 'cta', variant: 'brixsa-centered', content: { title: 'Are you looking to buy or rent a property?', subtitle: 'Interested? Get in touch', primaryButton: { label: 'Get in touch', href: '/contact', variant: 'secondary' }, backgroundImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
          { type: 'site-footer', variant: 'brixsa', content: { logo: 'Brixsa', tagline: '', copyright: `© ${year} Brixsa. All rights reserved.`, columns: [{ id: '1', title: 'Navigation', links: [{ id: '1', label: 'Home', href: '/' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Property', href: '/property' }, { id: '4', label: 'Agents', href: '/agents' }, { id: '5', label: 'Blog', href: '/blog' }, { id: '6', label: 'Contact', href: '/contact' }] }, { id: '2', title: 'Contact', links: [{ id: '1', label: '(62) 1829017', href: 'tel:621829017' }, { id: '2', label: 'hello@brixsa.com', href: 'mailto:hello@brixsa.com' }, { id: '3', label: '2912 Meadowbrook Road, Los Angeles, CA 90017', href: '#' }] }], socials: { instagram: '#', linkedin: '#' } }, style: { background: 'white', paddingY: 'none' }, visible: true },
        ],
      },
      // ─── Blog Detail ───
      {
        slug: '/blog/understanding-home-inspections',
        title: 'The Importance of Home Inspections',
        sections: [
          { type: 'site-header', variant: 'brixsa', content: { logo: 'Brixsa', links: [{ id: '1', label: 'Home', href: '/' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Property', href: '/property' }, { id: '4', label: 'Agents', href: '/agents' }, { id: '5', label: 'Blog', href: '/blog' }, { id: '6', label: 'Contact', href: '/contact' }], ctaLabel: 'Menu', ctaHref: '#' }, style: { background: 'dark', paddingY: 'none' }, visible: true },
          { type: 'blog-grid', variant: 'brixsa-detail', content: { items: [{ id: '1', title: 'The Importance of Home Inspections', excerpt: 'The article emphasizes sustainability and eco-conscious living for homeowners. It covers choosing sustainable materials like bamboo flooring and recycled glass countertops, harnessing renewable energy sources including solar panels and wind turbines, and practicing mindful purchasing to support sustainable companies.', date: '2025-09-29', category: 'Investments', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80', author: 'Emily Williams' }, { id: '2', title: 'Understanding Real Estate Terminology', excerpt: 'A comprehensive guide to essential real estate terms.', date: '2026-02-20', category: 'Renovations', image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80' }, { id: '3', title: 'Financing Options for Home Buyers', excerpt: 'Explore the best financing and mortgage options.', date: '2026-02-10', category: 'Market Trends', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' }, { id: '4', title: 'The Impact of Location on Property Value', excerpt: 'How location drives property value.', date: '2026-01-28', category: 'Property Management', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80' }] }, style: { background: 'light', paddingY: 'xl' }, visible: true },
          { type: 'cta', variant: 'brixsa-centered', content: { title: 'Are you looking to buy or rent a property?', subtitle: 'Interested? Get in touch', primaryButton: { label: 'Get in touch', href: '/contact', variant: 'secondary' }, backgroundImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
          { type: 'site-footer', variant: 'brixsa', content: { logo: 'Brixsa', tagline: '', copyright: `© ${year} Brixsa. All rights reserved.`, columns: [{ id: '1', title: 'Navigation', links: [{ id: '1', label: 'Home', href: '/' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Property', href: '/property' }, { id: '4', label: 'Agents', href: '/agents' }, { id: '5', label: 'Blog', href: '/blog' }, { id: '6', label: 'Contact', href: '/contact' }] }, { id: '2', title: 'Contact', links: [{ id: '1', label: '(62) 1829017', href: 'tel:621829017' }, { id: '2', label: 'hello@brixsa.com', href: 'mailto:hello@brixsa.com' }, { id: '3', label: '2912 Meadowbrook Road, Los Angeles, CA 90017', href: '#' }] }], socials: { instagram: '#', linkedin: '#' } }, style: { background: 'white', paddingY: 'none' }, visible: true },
        ],
      },
      // ─── Contact ───
      {
        slug: '/contact',
        title: 'Contact',
        sections: [
          { type: 'site-header', variant: 'brixsa', content: { logo: 'Brixsa', links: [{ id: '1', label: 'Home', href: '/' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Property', href: '/property' }, { id: '4', label: 'Agents', href: '/agents' }, { id: '5', label: 'Blog', href: '/blog' }, { id: '6', label: 'Contact', href: '/contact' }], ctaLabel: 'Menu', ctaHref: '#' }, style: { background: 'dark', paddingY: 'none' }, visible: true },
          { type: 'hero', variant: 'brixsa-page', content: { title: 'Share your interest with us', subtitle: 'Home • Contact', backgroundImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
          { type: 'contact', variant: 'brixsa-simple', content: { title: 'Get in Touch', subtitle: 'Have questions for us? Fill out the form and an agent will reach out to you.', email: 'hello@brixsa.com', phone: '(62) 1829017', address: '2912 Meadowbrook Road, Los Angeles, CA 90017', formButtonLabel: 'Submit' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
          { type: 'cta', variant: 'brixsa-centered', content: { title: 'Are you looking to buy or rent a property?', subtitle: 'Interested? Get in touch', primaryButton: { label: 'Get in touch', href: '/contact', variant: 'secondary' }, backgroundImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
          { type: 'site-footer', variant: 'brixsa', content: { logo: 'Brixsa', tagline: '', copyright: `© ${year} Brixsa. All rights reserved.`, columns: [{ id: '1', title: 'Navigation', links: [{ id: '1', label: 'Home', href: '/' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Property', href: '/property' }, { id: '4', label: 'Agents', href: '/agents' }, { id: '5', label: 'Blog', href: '/blog' }, { id: '6', label: 'Contact', href: '/contact' }] }, { id: '2', title: 'Contact', links: [{ id: '1', label: '(62) 1829017', href: 'tel:621829017' }, { id: '2', label: 'hello@brixsa.com', href: 'mailto:hello@brixsa.com' }, { id: '3', label: '2912 Meadowbrook Road, Los Angeles, CA 90017', href: '#' }] }], socials: { instagram: '#', linkedin: '#' } }, style: { background: 'white', paddingY: 'none' }, visible: true },
        ],
      },
      // ─── FAQ ───
      {
        slug: '/faq',
        title: 'FAQ',
        sections: [
          { type: 'site-header', variant: 'brixsa', content: { logo: 'Brixsa', links: [{ id: '1', label: 'Home', href: '/' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Property', href: '/property' }, { id: '4', label: 'Agents', href: '/agents' }, { id: '5', label: 'Blog', href: '/blog' }, { id: '6', label: 'Contact', href: '/contact' }], ctaLabel: 'Menu', ctaHref: '#' }, style: { background: 'dark', paddingY: 'none' }, visible: true },
          { type: 'hero', variant: 'brixsa-page', content: { title: 'Frequently Asked Questions', subtitle: 'Home • FAQ', backgroundImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
          { type: 'faq', variant: 'brixsa-accordion', content: { title: 'Frequently Asked Question', items: [{ id: '1', question: 'What services do you offer?', answer: 'We help clients buy, sell, and rent residential and commercial properties. We also provide property management and real estate consulting services.' }, { id: '2', question: 'How do I list my property on your website?', answer: 'Simply create an account, fill in your property details, upload photos, and submit. Our team will review and publish your listing.' }, { id: '3', question: 'Do you charge any fees for listing a property?', answer: 'Basic listings are free, but we offer premium plans for added visibility and promotion.' }, { id: '4', question: 'How can I schedule a property visit?', answer: 'Click the Schedule a Visit button on the property page or contact the assigned agent directly to arrange a time.' }, { id: '5', question: 'Can you help me find financing or a mortgage?', answer: 'Yes, we partner with trusted financial institutions to help you find the best mortgage options based on your needs.' }, { id: '6', question: 'How do I know if a property is still available?', answer: 'Each listing is updated in real time. If a property is marked Available, it is still open for inquiries.' }, { id: '7', question: 'Are your agents licensed?', answer: 'Yes. All our agents are certified professionals with verified licenses and years of experience in real estate.' }, { id: '8', question: 'What areas do you operate in?', answer: 'We currently operate in major metropolitan areas across the US, with plans to expand internationally.' }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
          { type: 'cta', variant: 'brixsa-centered', content: { title: 'Are you looking to buy or rent a property?', subtitle: 'Interested? Get in touch', primaryButton: { label: 'Get in touch', href: '/contact', variant: 'secondary' }, backgroundImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
          { type: 'site-footer', variant: 'brixsa', content: { logo: 'Brixsa', tagline: '', copyright: `© ${year} Brixsa. All rights reserved.`, columns: [{ id: '1', title: 'Navigation', links: [{ id: '1', label: 'Home', href: '/' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Property', href: '/property' }, { id: '4', label: 'Agents', href: '/agents' }, { id: '5', label: 'Blog', href: '/blog' }, { id: '6', label: 'Contact', href: '/contact' }] }, { id: '2', title: 'Contact', links: [{ id: '1', label: '(62) 1829017', href: 'tel:621829017' }, { id: '2', label: 'hello@brixsa.com', href: 'mailto:hello@brixsa.com' }, { id: '3', label: '2912 Meadowbrook Road, Los Angeles, CA 90017', href: '#' }] }], socials: { instagram: '#', linkedin: '#' } }, style: { background: 'white', paddingY: 'none' }, visible: true },
        ],
      },
      // ─── Privacy Policy ───
      {
        slug: '/privacy-policy',
        title: 'Privacy Policy',
        sections: [
          { type: 'site-header', variant: 'brixsa', content: { logo: 'Brixsa', links: [{ id: '1', label: 'Home', href: '/' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Property', href: '/property' }, { id: '4', label: 'Agents', href: '/agents' }, { id: '5', label: 'Blog', href: '/blog' }, { id: '6', label: 'Contact', href: '/contact' }], ctaLabel: 'Menu', ctaHref: '#' }, style: { background: 'dark', paddingY: 'none' }, visible: true },
          { type: 'hero', variant: 'brixsa-page', content: { title: 'Privacy Policy', subtitle: 'Home • Privacy Policy', backgroundImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
          { type: 'image-text', variant: 'brixsa-privacy', content: { title: 'Privacy Policy' }, style: { background: 'light', paddingY: 'xl' }, visible: true },
          { type: 'cta', variant: 'brixsa-centered', content: { title: 'Are you looking to buy or rent a property?', subtitle: 'Interested? Get in touch', primaryButton: { label: 'Get in touch', href: '/contact', variant: 'secondary' }, backgroundImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
          { type: 'site-footer', variant: 'brixsa', content: { logo: 'Brixsa', tagline: '', copyright: `© ${year} Brixsa. All rights reserved.`, columns: [{ id: '1', title: 'Navigation', links: [{ id: '1', label: 'Home', href: '/' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Property', href: '/property' }, { id: '4', label: 'Agents', href: '/agents' }, { id: '5', label: 'Blog', href: '/blog' }, { id: '6', label: 'Contact', href: '/contact' }] }, { id: '2', title: 'Contact', links: [{ id: '1', label: '(62) 1829017', href: 'tel:621829017' }, { id: '2', label: 'hello@brixsa.com', href: 'mailto:hello@brixsa.com' }, { id: '3', label: '2912 Meadowbrook Road, Los Angeles, CA 90017', href: '#' }] }], socials: { instagram: '#', linkedin: '#' } }, style: { background: 'white', paddingY: 'none' }, visible: true },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // ZMR MODELS AGENCY — Agence de mannequins, style ultra-minimaliste noir
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'zmr-models-agency',
    name: 'ZMR Models Agency',
    description: 'Site d\'agence de mannequins ultra-minimaliste : hero video fullscreen, galerie talent avec hover, contact dark',
    category: 'agency-models',
    universe: 'luxe' as TemplateUniverse,
    emoji: '🖤',
    preview: 'from-zinc-950 to-black',
    brand: {
      colors: { primary: '#ffffff', secondary: '#888888', accent: '#ffffff', background: '#000000', foreground: '#ffffff', muted: '#111111' },
      typography: { heading: "'Inter', sans-serif", body: "'Inter', sans-serif", size: 'default' as const },
      borderRadius: 'none' as const,
      spacing: 'default' as const,
    },
    sections: [
      {
        type: 'site-header',
        variant: 'zmr-agency',
        content: {
          logo: 'ZMR',
          links: [
            { id: '1', label: 'All Models', href: '/explore' },
            { id: '2', label: 'Events', href: '/events' },
            { id: '3', label: 'Contact', href: '/contact' },
          ],
          ctaLabel: 'Models Agency',
        },
        style: { background: 'transparent' as any, paddingY: 'none' },
        visible: true,
      },
      {
        type: 'hero',
        variant: 'zmr-agency',
        content: {
          title: 'ZMR',
          subtitle: 'Models Agency',
          backgroundImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&q=80',
          videoUrl: 'https://assets.mixkit.co/videos/47779/47779-720.mp4',
          primaryButton: { label: 'Discover Our Talents', href: '/explore', variant: 'outline' as any },
        },
        style: { background: 'dark' as any, paddingY: 'none' },
        visible: true,
      },
      {
        type: 'site-footer',
        variant: 'zmr-agency',
        content: {
          logo: 'ZMR',
          tagline: 'Models Agency',
          copyright: `© ${year} ZMR Models Agency. All rights reserved.`,
          columns: [
            {
              id: '1',
              title: 'Legal',
              links: [
                { id: '1', label: 'Mentions légales', href: '/mentions-legales' },
                { id: '2', label: 'Politique de confidentialité', href: '/privacy' },
                { id: '3', label: 'Conditions générales', href: '/terms' },
              ],
            },
          ],
          socials: { instagram: '#' },
        },
        style: { background: 'dark' as any, paddingY: 'none' },
        visible: true,
      },
    ],
    pages: [
      // ── EXPLORE (Models Gallery) ──
      {
        slug: 'explore',
        title: 'All Models',
        sections: [
          {
            type: 'site-header',
            variant: 'zmr-agency',
            content: {
              logo: 'ZMR',
              links: [
                { id: '1', label: 'All Models', href: '/explore' },
                { id: '2', label: 'Events', href: '/events' },
                { id: '3', label: 'Contact', href: '/contact' },
              ],
              ctaLabel: 'Models Agency',
            },
            style: { background: 'transparent' as any, paddingY: 'none' },
            visible: true,
          },
          {
            type: 'hero',
            variant: 'zmr-agency',
            content: {
              title: 'Our Talents',
              subtitle: 'Discover our international roster',
              backgroundImage: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1920&q=80',
            },
            style: { background: 'dark' as any, paddingY: 'none' },
            visible: true,
          },
          {
            type: 'gallery-grid',
            variant: 'zmr-agency-grid',
            content: {
              title: '',
              images: [
                { id: '1', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80', hoverSrc: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80', alt: 'Sofia Martinez', caption: '178 · Brown eyes', badge: 'Models', category: 'women' },
                { id: '2', src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80', hoverSrc: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80', alt: 'James Wilson', caption: '185 · Blue eyes', badge: 'Models', category: 'men' },
                { id: '3', src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80', hoverSrc: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&q=80', alt: 'Emma Chen', caption: '172 · Brown eyes', badge: 'Models, Advertising', category: 'women' },
                { id: '4', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', hoverSrc: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80', alt: 'Lucas Bernard', caption: '182 · Green eyes', badge: 'Models', category: 'men' },
                { id: '5', src: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80', hoverSrc: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80', alt: 'Nina Kovac', caption: '176 · Hazel eyes', badge: 'Models, Promo', category: 'women' },
                { id: '6', src: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&q=80', hoverSrc: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80', alt: 'Thomas Park', caption: '188 · Brown eyes', badge: 'Advertising', category: 'men' },
                { id: '7', src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=80', hoverSrc: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80', alt: 'Léa Dubois', caption: '174 · Blue eyes · Blonde', badge: 'Models', category: 'women' },
                { id: '8', src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80', hoverSrc: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80', alt: 'David Kim', caption: '180 · Brown eyes', badge: 'Models, Advertising', category: 'men' },
                { id: '9', src: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&q=80', hoverSrc: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80', alt: 'Chloé Martin', caption: '170 · Green eyes', badge: 'Promo', category: 'women' },
                { id: '10', src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80', hoverSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', alt: 'Antoine Moreau', caption: '184 · Brown eyes', badge: 'Models', category: 'men' },
                { id: '11', src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80', hoverSrc: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=80', alt: 'Mila Petrova', caption: '175 · Blue eyes · Blonde', badge: 'Models, Parts', category: 'women' },
                { id: '12', src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80', hoverSrc: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&q=80', alt: 'Romain Lefebvre', caption: '181 · Hazel eyes', badge: 'Advertising', category: 'men' },
              ],
            },
            style: { background: 'dark' as any, paddingY: 'xl' },
            visible: true,
          },
          {
            type: 'site-footer',
            variant: 'zmr-agency',
            content: {
              logo: 'ZMR',
              copyright: `© ${year} ZMR Models Agency. All rights reserved.`,
              columns: [{ id: '1', title: 'Legal', links: [{ id: '1', label: 'Mentions légales', href: '/mentions-legales' }, { id: '2', label: 'Politique de confidentialité', href: '/privacy' }, { id: '3', label: 'Conditions générales', href: '/terms' }] }],
            },
            style: { background: 'dark' as any, paddingY: 'none' },
            visible: true,
          },
        ],
      },
      // ── EVENTS ──
      {
        slug: 'events',
        title: 'Events',
        sections: [
          {
            type: 'site-header',
            variant: 'zmr-agency',
            content: {
              logo: 'ZMR',
              links: [
                { id: '1', label: 'All Models', href: '/explore' },
                { id: '2', label: 'Events', href: '/events' },
                { id: '3', label: 'Contact', href: '/contact' },
              ],
              ctaLabel: 'Models Agency',
            },
            style: { background: 'transparent' as any, paddingY: 'none' },
            visible: true,
          },
          {
            type: 'features',
            variant: 'zmr-events',
            content: {
              title: 'Events',
              subtitle: 'Découvrez nos prochains événements',
              items: [
                { id: '1', icon: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800', title: 'ZMR Summer Gala 2025', description: 'Le Palais Royal, Paris · 20:00' },
                { id: '2', icon: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800', title: 'Exclusive Night Club Party', description: 'Club Étoile, Paris · 23:00' },
                { id: '3', icon: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', title: 'Fashion Week Afterparty', description: 'Maison Blanche, Paris · 22:00' },
                { id: '4', icon: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', title: 'Casting Nouvelle Collection', description: 'Studio ZMR, Paris · 10:00' },
              ],
            },
            style: { background: 'dark' as any, paddingY: 'xl' },
            visible: true,
          },
          {
            type: 'site-footer',
            variant: 'zmr-agency',
            content: {
              logo: 'ZMR',
              copyright: `© ${year} ZMR Models Agency. All rights reserved.`,
              columns: [{ id: '1', title: 'Legal', links: [{ id: '1', label: 'Mentions légales', href: '/mentions-legales' }, { id: '2', label: 'Politique de confidentialité', href: '/privacy' }, { id: '3', label: 'Conditions générales', href: '/terms' }] }],
            },
            style: { background: 'dark' as any, paddingY: 'none' },
            visible: true,
          },
        ],
      },
      // ── CONTACT ──
      {
        slug: 'contact',
        title: 'Contact',
        sections: [
          {
            type: 'site-header',
            variant: 'zmr-agency',
            content: {
              logo: 'ZMR',
              links: [
                { id: '1', label: 'All Models', href: '/explore' },
                { id: '2', label: 'Events', href: '/events' },
                { id: '3', label: 'Contact', href: '/contact' },
              ],
              ctaLabel: 'Models Agency',
            },
            style: { background: 'transparent' as any, paddingY: 'none' },
            visible: true,
          },
          {
            type: 'contact',
            variant: 'zmr-with-info',
            content: {
              title: 'Contact',
              subtitle: 'Pour toute demande de booking, casting ou collaboration, n\'hésitez pas à nous contacter.',
              email: 'booking@zmrmodels.com',
              phone: '+33 1 42 00 00 00',
              address: '75003 Paris, France',
              formTitle: 'Envoyer un message',
              formButtonLabel: 'Envoyer',
            },
            style: { background: 'dark' as any, paddingY: 'xl' },
            visible: true,
          },
          {
            type: 'site-footer',
            variant: 'zmr-agency',
            content: {
              logo: 'ZMR',
              copyright: `© ${year} ZMR Models Agency. All rights reserved.`,
              columns: [{ id: '1', title: 'Legal', links: [{ id: '1', label: 'Mentions légales', href: '/mentions-legales' }, { id: '2', label: 'Politique de confidentialité', href: '/privacy' }, { id: '3', label: 'Conditions générales', href: '/terms' }] }],
            },
            style: { background: 'dark' as any, paddingY: 'none' },
            visible: true,
          },
        ],
      },
      // ── BLOG ──
      {
        slug: 'blog',
        title: 'Blog',
        sections: [
          {
            type: 'site-header',
            variant: 'zmr-agency',
            content: {
              logo: 'ZMR',
              links: [
                { id: '1', label: 'All Models', href: '/explore' },
                { id: '2', label: 'Events', href: '/events' },
                { id: '3', label: 'Contact', href: '/contact' },
              ],
              ctaLabel: 'Models Agency',
            },
            style: { background: 'transparent' as any, paddingY: 'none' },
            visible: true,
          },
          {
            type: 'blog-grid',
            variant: 'zmr-grid',
            content: {
              title: 'Blog',
              subtitle: 'Actualités, conseils et coulisses de l\'industrie du mannequinat',
              posts: [
                { id: '1', title: 'Les tendances mode printemps-été 2025', excerpt: 'Découvrez les looks qui vont marquer la saison à venir...', category: 'Actualités', image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80', date: '15 janvier 2025', readTime: '5 min', slug: 'tendances-mode-2025' },
                { id: '2', title: 'Interview : Sofia Martinez, notre cover model', excerpt: 'Rencontre avec Sofia qui nous parle de son parcours et de ses ambitions...', category: 'Success Stories', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80', date: '10 janvier 2025', readTime: '8 min', slug: 'interview-sofia-martinez' },
                { id: '3', title: 'Comment réussir son premier casting', excerpt: 'Nos conseils pour se préparer et faire bonne impression lors d\'un casting...', category: 'Conseils', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', date: '5 janvier 2025', readTime: '4 min', slug: 'reussir-premier-casting' },
              ],
            },
            style: { background: 'white' as any, paddingY: 'xl' },
            visible: true,
          },
          {
            type: 'site-footer',
            variant: 'zmr-agency',
            content: {
              logo: 'ZMR',
              copyright: `© ${year} ZMR Models Agency. All rights reserved.`,
              columns: [{ id: '1', title: 'Legal', links: [{ id: '1', label: 'Mentions légales', href: '/mentions-legales' }, { id: '2', label: 'Politique de confidentialité', href: '/privacy' }, { id: '3', label: 'Conditions générales', href: '/terms' }] }],
            },
            style: { background: 'dark' as any, paddingY: 'none' },
            visible: true,
          },
        ],
      },
      {
        slug: 'talent',
        title: 'Profil Talent',
        sections: [
          {
            type: 'site-header',
            variant: 'zmr-agency',
            content: {
              logo: 'ZMR',
              links: [
                { id: '1', label: 'All Models', href: '/explore' },
                { id: '2', label: 'Events', href: '/events' },
                { id: '3', label: 'Contact', href: '/contact' },
              ],
              ctaLabel: 'Models Agency',
            },
            style: { background: 'transparent' as any, paddingY: 'none' },
            visible: true,
          },
          {
            type: 'hero',
            variant: 'zmr-talent-profile',
            content: {
              title: 'SOFIA MARTINEZ',
              subtitle: 'PORTFOLIO|SHOWS|INSTAGRAM|EXPERIENCE',
              backgroundImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1600&q=80',
            },
            style: { background: 'dark' as any, paddingY: 'none' },
            visible: true,
          },
          {
            type: 'features',
            variant: 'zmr-measurements',
            content: {
              title: '',
              items: [
                { id: 'b1', icon: 'MODEL', title: '', description: '' },
                { id: 'b2', icon: 'COMMERCIAL', title: '', description: '' },
                { id: 'm1', icon: '', title: 'HEIGHT', description: '178cm' },
                { id: 'm2', icon: '', title: 'EYES', description: 'Brown' },
                { id: 'm3', icon: '', title: 'HAIR', description: 'Dark Brown' },
                { id: 'm4', icon: '', title: 'BUST', description: '84cm' },
                { id: 'm5', icon: '', title: 'WAIST', description: '60cm' },
                { id: 'm6', icon: '', title: 'HIPS', description: '89cm' },
                { id: 'm7', icon: '', title: 'SHOES', description: '39 EU' },
              ],
            },
            style: { background: 'dark' as any, paddingY: 'none' },
            visible: true,
          },
          {
            type: 'gallery-grid',
            variant: 'zmr-showcase',
            content: {
              title: '',
              images: [
                { id: '1', src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&q=80', alt: 'PORTFOLIO' },
                { id: '2', src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=80', alt: 'SHOWS' },
                { id: '3', src: 'https://images.unsplash.com/photo-1496440737103-cd596325d314?w=1600&q=80', alt: 'INSTAGRAM', caption: 'https://instagram.com' },
              ],
            },
            style: { background: 'dark' as any, paddingY: 'none' },
            visible: true,
          },
          {
            type: 'site-footer',
            variant: 'zmr-agency',
            content: {
              logo: 'ZMR',
              copyright: `© ${year} ZMR Models Agency. All rights reserved.`,
              columns: [{ id: '1', title: 'Legal', links: [{ id: '1', label: 'Mentions légales', href: '/mentions-legales' }, { id: '2', label: 'Politique de confidentialité', href: '/privacy' }, { id: '3', label: 'Conditions générales', href: '/terms' }] }],
            },
            style: { background: 'dark' as any, paddingY: 'none' },
            visible: true,
          },
        ],
      },
    ],
  },

  // ─── Beard X — Barbershop Premium (6 pages — scanné depuis beardtemplate.webflow.io) ───
  {
    id: 'beard-x-barbershop',
    name: 'Beard X — Barbershop',
    description: 'Site premium complet pour barbershop : accueil, à propos, services, contact, blog et boutique. Scanné pixel-perfect depuis Webflow.',
    category: 'coiffeur',
    universe: 'luxe',
    emoji: '💈',
    preview: 'from-amber-800 to-zinc-900',
    brand: {
      colors: {
        primary: '#121212',
        secondary: '#DEC7A6',
        accent: '#C09B6B',
        background: '#FFFFFF',
        foreground: '#121212',
        muted: '#F8F5EF',
      },
      typography: {
        heading: 'DM Sans',
        body: 'DM Sans',
        size: 'default',
      },
      borderRadius: 'md',
      spacing: 'relaxed',
    },

    // ══════════════════════════════════════════════
    // PAGE ACCUEIL (/)
    // ══════════════════════════════════════════════
    sections: [
      // ── Navbar (transparent overlay) ──
      { type: 'site-header', variant: 'luxe-transparent', content: { logo: 'BEARD X', links: [{ id: '1', label: 'HOME', href: '/home' }, { id: '2', label: 'ABOUT', href: '/about' }, { id: '3', label: 'PAGES', href: '#', hasDropdown: true }, { id: '4', label: 'SERVICES', href: '/services' }, { id: '5', label: 'CONTACT', href: '/contact' }], ctaLabel: 'BOOK AN APPOINTMENT', ctaHref: '/contact', cartLabel: 'CART (0)' }, style: { background: 'dark', paddingY: 'sm', textColor: '#FFFFFF', fontFamily: 'Barlow', fontWeight: 900 }, visible: true },

      // ── Hero — full-width dark photo + emblem overlay ──
      {
        type: 'hero', variant: 'luxe',
        content: {
          title: 'A UNIQUE BARBER EXPERIENCE',
          subtitle: 'Eu, in in pharetra mauris mi pretium magnis nullam et consequat vel ina sit ut pharetra ultrices feugiat etol quam luctus in dictum placerat malesuada sollicitudin eu vel diam.',
          backgroundImage: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352b63fc9635f6969ca8f39_Home-barbershop-x.jpg',
          decorativeImage: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/63868e1dab1fa01aaa25552a_home-hero-top-image-barber-webflow-ecommerce-template.png',
          primaryButton: { label: 'BOOK AN APPOINTMENT', href: '/contact', variant: 'primary' },
          secondaryButton: { label: 'BROWSE SERVICES', href: '/home#Services', variant: 'secondary' },
        },
        style: { background: 'dark', paddingY: 'xl', textAlign: 'center', textColor: '#FFFFFF', accentColor: '#DEC7A6', fontStyle: 'italic', backgroundImage: { url: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352b63fc9635f6969ca8f39_Home-barbershop-x.jpg', overlayColor: '#000000', overlayOpacity: 0.7, size: 'cover', position: 'center', attachment: 'fixed' } },
        visible: true,
      },

      // ── Stats — 10+ years (split: image left, text+stats right) ──
      {
        type: 'image-text', variant: 'luxe-image-left',
        content: {
          title: '10+ YEARS MAKING OUR CUSTOMERS HAPPY',
          subtitle: 'Nulla egestas sapien integer mi fermentum tellus tristique consequat pulvinar sagittis adipiscing egestas purus et mi tempus semper id vel prci eu magna in senectus sit eget justo eget.',
          image: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352caffe6a8ab6bbcae3ce2_Left-Image-Barbershop.jpg',
          imageAlt: 'Image Left Barbershop',
          imagePosition: 'left',
          primaryButton: { label: 'MORE ABOUT US', href: '/about', variant: 'primary' },
          stats: [
            { id: 'stat-1', value: '99%', label: 'Customer Satisfaction' },
            { id: 'stat-2', value: '10Y', label: 'Years of Experience' },
          ],
          floatingImages: [
            { src: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352d052776938303fc5a663_Floating-item-barbershop.svg', position: 'bottom-right', size: 280, opacity: 0.45 },
          ],
        },
        style: { background: 'custom', customBgColor: '#F8F5EF', paddingY: 'xl', textAlign: 'left', textColor: '#121212', accentColor: '#DEC7A6' },
        visible: true,
      },

      // ── Services — 6 items (2-column grid) + 2 CTAs ──
      {
        type: 'features', variant: 'luxe-grid',
        content: {
          title: 'BROWSE OUR SERVICES',
          subtitle: 'Nulla egestas sapien integer mi fermentum tellus tristique consequat pulvinar sagittis adipiscing egestas purus et mi tempus semper id vel prci eu magna in senectus sit eget justo eget.',
          decorativeIcon: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352cb6835e754223e11526d_Icon-barbershop.svg',
          columns: 2,
          items: [
            { id: 'svc-1', icon: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/63862eaff96ecdf8025493ea_classic-haircut-service-icon-barber-webflow-ecommerce-template.svg', title: 'CLASSIC HAIRCUT', description: 'Nulla egestas sapien integer mi fermentum tellus tristique consequatolm pulvinar sagittis adipiscing. $37 USD' },
            { id: 'svc-2', icon: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/63862eaf785a2ef90f1cabf3_beard-trim-service-icon-barber-webflow-ecommerce-template.svg', title: 'BEARD TRIM', description: 'Nulla egestas sapien integer mi fermentum tellus tristique consequatolm pulvinar sagittis adipiscing. $25 USD' },
            { id: 'svc-3', icon: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/63862eb0fc1ac2a331a28242_kids-haircut-service-icon-barber-webflow-ecommerce-template.svg', title: 'KIDS HAIRCUT', description: 'Nulla egestas sapien integer mi fermentum tellus tristique consequatolm pulvinar sagittis adipiscing. $26 USD' },
            { id: 'svc-4', icon: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/63862eaf971e1c6a341257c4_neck-shave-service-icon-barber-webflow-ecommerce-template.svg', title: 'NECK SHAVE', description: 'Nulla egestas sapien integer mi fermentum tellus tristique consequatolm pulvinar sagittis adipiscing. $12 USD' },
            { id: 'svc-5', icon: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/63862eaf5ff3e2f137ed3b3a_scalp-moisturizing-service-icon-barber-webflow-ecommerce-template.svg', title: 'SCALP MOISTURIZING', description: 'Nulla egestas sapien integer mi fermentum tellus tristique consequatolm pulvinar sagittis adipiscing. $55 USD' },
            { id: 'svc-6', icon: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/63862eaf05534bf92c96d0b5_beard-grooming-and-spa-service-icon-barber-webflow-ecommerce-template.svg', title: 'BEARD GROOMING & SPA', description: 'Nulla egestas sapien integer mi fermentum tellus tristique consequatolm pulvinar sagittis adipiscing. $46 USD' },
          ],
          primaryButton: { label: 'BOOK AN APPOINTMENT', href: '/contact', variant: 'primary' },
          secondaryButton: { label: 'BROWSE ALL SERVICES', href: '/services', variant: 'outline' },
          floatingImages: [
            { src: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352dc80844a1728a8e6cdfa_Floating-item-barbershop-services-Left.svg', position: 'bottom-left', size: 280, opacity: 0.45 },
          ],
        },
        style: { background: 'custom', customBgColor: '#F8F5EF', paddingY: 'xl', textAlign: 'center', textColor: '#121212', accentColor: '#DEC7A6' },
        visible: true,
      },

      // ── Experience gallery — mixed grid ──
      {
        type: 'gallery-grid', variant: 'luxe-masonry',
        content: {
          title: 'WE OFFER AN UNIQUE EXPERIENCE',
          subtitle: 'Nulla egestas sapien integer mi fermentum tellus tristique consequat pulvinar sagittis adipiscing egestas purus et mi tempus semper id vel prci eu magna in senectus sit eget justo eget.',
          decorativeIcon: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352cb6835e754223e11526d_Icon-barbershop.svg',
          images: [
            { id: 'exp-img-1', src: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352f2b6a7b90cfd94ae18b4_Left-Image-Experience-Barbershop.jpg', alt: 'Image Left Experience' },
            { id: 'exp-img-2', src: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352f252e708dc38e92e533c_Center-Top-Image-Experience-Barbershop.jpg', alt: 'Image Center Top Experience' },
            { id: 'exp-img-3', src: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352f268e708dc07112e544a_Center-Bottom-Image-Experience-Barbershop.jpg', alt: 'Image Center Bottom Experience' },
            { id: 'exp-img-4', src: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352f2f605de392c9d02f20b_Right-Image-Experience-Barbershop.jpg', alt: 'Image Right Experience' },
          ],
          primaryButton: { label: 'BOOK AN APPOINTMENT', href: '/contact', variant: 'primary' },
          floatingImages: [
            { src: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/636085c6d110a1e1db0e4823_floating-item-barbershop-experience-webflow-ecommerce-template.svg', position: 'top-right', size: 280, opacity: 0.45 },
            { src: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352f6f015baa6ebf4f7e84a_Floating-item-Left-barbershop-Experience.svg', position: 'bottom-left', size: 280, opacity: 0.45 },
          ],
        },
        style: { background: 'custom', customBgColor: '#F8F5EF', paddingY: 'xl', textAlign: 'left', textColor: '#121212', accentColor: '#DEC7A6' },
        visible: true,
      },

      // ── Work showcase — dark CTA with background image ──
      {
        type: 'cta', variant: 'luxe-centered',
        content: {
          title: 'TAKE A LOOK AT OUR WORK',
          subtitle: 'Nulla egestas sapien integer mi fermentum tellus tristique consequat pulvinar sagittis adipiscing egestas purus et mi tempus semper id vel prci eu magna in senectus sit eget justo eget.',
          icon: 'play',
          primaryButton: { label: 'BOOK AN APPOINTMENT', href: '/contact', variant: 'primary' },
          videoUrl: 'https://www.youtube.com/watch?v=sCurGlAOFIw',
        },
        style: { background: 'dark', paddingY: 'xl', textAlign: 'center', textColor: '#FFFFFF', accentColor: '#DEC7A6', backgroundImage: { url: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352fa0c41400e058eb15b63_Image-video-barbershop-x.jpg', overlayColor: '#000000', overlayOpacity: 0.85, size: 'cover', position: 'center', attachment: 'fixed' } },
        visible: true,
      },

      // ── Why choose us — image-text ──
      {
        type: 'image-text', variant: 'luxe-image-right',
        content: {
          title: 'WHY CHOOSE US',
          subtitle: 'Nulla egestas sapien integer mi fermentum tellus tristique consequat pulvinar sagittis adipiscing egestas purus et mi tempus semper id vel prci eu magna in senectus sit eget justo eget.',
          decorativeIcon: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352cb6835e754223e11526d_Icon-barbershop.svg',
          image: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/635302fb0af27dbf66bd5e74_Image-barbershop-choosing.jpg',
          imageAlt: 'Image Barbershop',
          imagePosition: 'right',
          features: [
            { id: 'feat-1', icon: 'user', title: 'TOP BARBERS', description: 'A mollis pretium sagittis iaculis quam lacus nulla nullam pharetra quis fermentum ipsum phasellus sit.' },
            { id: 'feat-2', icon: 'armchair', title: 'PREMIUM SERVICES', description: 'Nulla leo velit feugiat in consequat accumsan est enim mi consectetur dis pulvinar venenatis dapibus.' },
          ],
          primaryButton: { label: 'BOOK AN APPOINTMENT', href: '/contact', variant: 'primary' },
          floatingImages: [
            { src: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352d052776938303fc5a663_Floating-item-barbershop.svg', position: 'bottom-right', size: 280, opacity: 0.45 },
          ],
        },
        style: { background: 'custom', customBgColor: '#F8F5EF', paddingY: 'xl', textAlign: 'left', textColor: '#121212', accentColor: '#DEC7A6' },
        visible: true,
      },

      // ── Products — 3 items ──
      {
        type: 'product-grid', variant: 'luxe-grid',
        content: {
          title: 'BROWSE OUR PRODUCTS',
          subtitle: 'Nulla egestas sapien integer mi fermentum tellus tristique consequat pulvinar sagittis adipiscing egestas purus et mi tempus semper id vel prci eu magna in senectus sit eget justo eget.',
          decorativeIcon: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352cb6835e754223e11526d_Icon-barbershop.svg',
          columns: 3,
          items: [
            { id: 'prod-1', title: 'BEARD & MUSTACHE CARE OIL', description: 'Nulla egestas sapien integer mi fermentum tellusol tristique consequatolm pulvinar sagittis.', price: '$ 19.00 USD', image: 'https://cdn.prod.website-files.com/6351df90df95e78497f35e12/6353172e41400e47f4b2fb08_Glass-dropper-bottle-%26-tube.png' },
            { id: 'prod-2', title: 'BEARD & HAIR SERUM', description: 'Nulla egestas sapien integer mi fermentum tellusol tristique consequatolm pulvinar sagittis.', price: '$ 49.00 USD', image: 'https://cdn.prod.website-files.com/6351df90df95e78497f35e12/635317abd7135d5db1e806e2_Cosmetic-packaging-kit-with-kraft-mailer-box.png' },
            { id: 'prod-3', title: 'PREMIUM HAIR CLAY', description: 'Nulla egestas sapien integer mi fermentum tellusol tristique consequatolm pulvinar sagittis.', price: '$ 29.00 USD', image: 'https://cdn.prod.website-files.com/6351df90df95e78497f35e12/635317bbcef9162eb3edfdcc_Amber-cosmetic-bottle-packaging.png' },
          ],
          primaryButton: { label: 'BROWSE ALL PRODUCTS', href: '/shop', variant: 'outline' },
          floatingImages: [
            { src: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/635318c7d13ee9d5bb3fec73_Floating-item-Left-barbershop-products.svg', position: 'bottom-left', size: 280, opacity: 0.45 },
          ],
        },
        style: { background: 'white', paddingY: 'xl', textAlign: 'center', textColor: '#121212', accentColor: '#DEC7A6' },
        visible: true,
      },

      // ── Testimonials — slider with arrows ──
      {
        type: 'testimonials', variant: 'luxe-slider',
        content: {
          title: 'WHAT OUR CLIENTS SAY',
          subtitle: 'Nulla egestas sapien integer mi fermentum tellus tristique consequat pulvinar sagittis adipiscing egestas purus et mi tempus semper id vel prci eu magna.',
          decorativeIcon: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352cb6835e754223e11526d_Icon-barbershop.svg',
          items: [
            { id: 'test-1', quote: 'THIS BARBER SHOP IS SIMPLY AWESOME', description: 'Et proin ut in dignissim sem non a nullam magna lectus urna et dui quam tellus imperdiet sit purus at fringilla scelerisque diam amet fermentum orci fringilla aliquet nulla lectus erat eu auctor diam potenti turpis interdum eu.', author: 'JOHN CARTER', role: 'LOS ANGELES, CA.', rating: 5, avatar: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/63531ceb14dc4f7751c93706_Testimonials.jpg' },
            { id: 'test-2', quote: 'THE BEST BARBER SHOP I\'VE EVER BEEN', description: 'Et proin ut in dignissim sem non a nullam magna lectus urna et dui quam tellus imperdiet sit purus at fringilla scelerisque diam amet fermentum orci fringilla aliquet nulla lectus erat eu auctor diam potenti turpis interdum eu.', author: 'SAM HOUSTON', role: 'LOS ANGELES, CA.', rating: 5, avatar: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6353222a4d0d416ddf8e4360_Image-testimonials.jpg' },
          ],
          showArrows: true,
          cardShadow: true,
          arrowStyle: 'square-dark',
          primaryButton: { label: 'BOOK AN APPOINTMENT', href: '/contact', variant: 'primary' },
          floatingImages: [
            { src: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/635322dd2cf250efc75644d1_Floating-item-barbershop-clients.svg', position: 'top-right', size: 280, opacity: 0.45 },
          ],
        },
        style: { background: 'custom', customBgColor: '#F8F5EF', paddingY: 'xl', textAlign: 'left', textColor: '#121212', accentColor: '#DEC7A6' },
        visible: true,
      },

      // ── Instagram feed — 5 images dark grid ──
      {
        type: 'gallery-grid', variant: 'luxe-masonry',
        content: {
          title: 'FOLLOW US ON INSTAGRAM',
          decorativeIcon: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352cb6835e754223e11526d_Icon-barbershop.svg',
          images: [
            { id: 'insta-1', src: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6353262d71b74a7c9aec6273_Image-barbershop-men-01.jpg', alt: 'Image Barbershop Instagram', category: 'Instagram' },
            { id: 'insta-2', src: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/635326365ee93e1f49821d0e_Handsome-man-cutting-beard-barber-salon.png', alt: 'Image Barbershop Instagram', category: 'Instagram' },
            { id: 'insta-3', src: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6353261dd7638b80bb954e95_handsome-man-cutting-beard-barber-salon%202.png', alt: 'Image Barbershop Instagram', category: 'Instagram' },
            { id: 'insta-4', src: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/63532603db028e692e7bd202_Handsome-man-cutting-beard-barber-salon%201.jpg', alt: 'Image Barbershop Instagram', category: 'Instagram' },
            { id: 'insta-5', src: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6353262573ae728269cab801_Image-barbershop-machine.jpg', alt: 'Image Barbershop Instagram', category: 'Instagram' },
          ],
          primaryButton: { label: 'FOLLOW US', href: 'https://www.instagram.com/', variant: 'primary' },
        },
        style: { background: 'custom', customBgColor: '#1a1a1a', paddingY: 'xl', textAlign: 'center', textColor: '#ffffff', accentColor: '#DEC7A6' },
        visible: true,
      },

      // ── Newsletter (dark) ──
      { type: 'newsletter', variant: 'luxe-centered', content: { title: 'SUBSCRIBE TO OUR NEWSLETTER', subtitle: 'Nulla egestas sapien integer mi fermentum tellus tristique consequat pulvinar sagittis adipiscing egestas purus et mi tempus semper id vel prci eu magna.', decorativeIcon: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352cb6835e754223e11526d_Icon-barbershop.svg', placeholder: 'ENTER YOUR EMAIL', buttonLabel: 'SUBSCRIBE NOW' }, style: { background: 'custom', customBgColor: '#1a1a1a', paddingY: 'lg', textAlign: 'center', textColor: '#ffffff', accentColor: '#DEC7A6' }, visible: true },

      // ── Footer ──
      {
        type: 'site-footer', variant: 'luxe',
        content: {
          logo: 'BEARD X',
          logoIcon: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352cb6835e754223e11526d_Icon-barbershop.svg',
          tagline: 'Nulla egestas sapien integer mi fermentum tellus tristique consequat pulvinar sagittis adipiscing egestas purus et mi tempus semper.',
          copyright: 'Copyright © Beard X | Designed by BRIX Templates - Powered by Webflow',
          columns: [
            { id: '1', title: 'MENU', links: [{ id: '1', label: 'HOME', href: '/home' }, { id: '2', label: 'ABOUT', href: '/about' }, { id: '3', label: 'SERVICES', href: '/services' }, { id: '4', label: 'BLOG', href: '/blog' }, { id: '5', label: 'BLOG POST', href: '/blog/how-to-keep-your-razors-sharp-as-brand-new' }, { id: '6', label: 'SHOP', href: '/shop' }, { id: '7', label: 'SHOP SINGLE', href: '/product/premium-matte-pomade' }, { id: '8', label: 'CONTACT', href: '/contact' }, { id: '9', label: 'TEAM MEMBER', href: '/team/john-carter' }, { id: '10', label: 'MORE WEBFLOW TEMPLATES', href: 'https://brixtemplates.com/more-webflow-templates' }] },
            { id: '2', title: 'UTILITY PAGES', links: [{ id: '1', label: 'START HERE', href: '/template-pages/start-here' }, { id: '2', label: 'STYLEGUIDE', href: '/template-pages/style-guide' }, { id: '3', label: 'PASSWORD PROTECTED', href: '/401' }, { id: '4', label: '404 NOT FOUND', href: '/404' }, { id: '5', label: 'LICENSES', href: '/template-pages/licenses' }, { id: '6', label: 'CHANGELOG', href: '/template-pages/changelog' }] },
          ],
          socials: { facebook: 'https://www.facebook.com/', twitter: 'https://twitter.com/', instagram: 'https://www.instagram.com/', youtube: 'https://www.youtube.com/', pinterest: 'https://www.pinterest.com/' },
          floatingImages: [
            { src: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6352cb6835e754223e11526d_Icon-barbershop.svg', position: 'bottom-left', size: 220, opacity: 0.15 },
            { src: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/638112706760ce3d37c721c0_services-floating-image-top-right-barber-webflow-ecommerce-template.svg', position: 'bottom-right', size: 220, opacity: 0.15 },
          ],
        },
        style: { background: 'custom', customBgColor: '#121212', paddingY: 'lg', textAlign: 'left', textColor: '#FFFFFF', accentColor: '#DEC7A6' },
        visible: true,
      },
    ],

    // ══════════════════════════════════════════════
    // PAGES ADDITIONNELLES
    // ══════════════════════════════════════════════
    pages: [
      // ── PAGE ABOUT ──
      {
        slug: '/about',
        title: 'About',
        sections: [
          { type: 'site-header', variant: 'luxe', content: { logo: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/639278a08df82b733cd1d7a9_logo-beard-webflow-template.svg', links: [{ id: '1', label: 'Home', href: '/home' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Services', href: '/services' }, { id: '4', label: 'Contact', href: '/contact' }], ctaLabel: 'Book an appointment', ctaHref: '/contact' }, style: { background: 'white', paddingY: 'none' }, visible: true },
          {
            type: 'hero', variant: 'luxe',
            content: {
              title: 'About our barber shop',
              subtitle: 'Eu, in in pharetra mauris mi pretium magnis nullam et consequat vel ina sit ut pharetra ultrices feugiat etol quam luctus in dictum placerat malesuada sollicitudin eu vel diam.',
              primaryButton: { label: 'Book an appointment', href: '/contact', variant: 'primary' },
              secondaryButton: { label: 'Browse services', href: '/services', variant: 'outline' },
            },
            style: { background: 'white', paddingY: 'xl' },
            visible: true,
          },
          {
            type: 'image-text', variant: 'luxe-image-left',
            content: {
              title: 'Who we are',
              text: 'Eu, in in pharetra mauris mi pretium magnis nullam et consequat vel ina sit ut pharetra ultrices feugiat etol quam luctus in dictum placerat malesuada sollicitudin eu vel diam eu, in in pharetra mauris mi pretium magnis nullam et consequat vel ina sit ut pharetra ultrices feugiat. Eu, in in pharetra mauris mi pretium magnis nullam et consequat vel ina sit ut pharetra ultrices feugiat etol quam luctus in dictum placerat malesuada sollicitudin eu vel diam eu.',
              image: { src: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&q=80', alt: 'Barber shop interior' },
              primaryButton: { label: 'Book an appointment', href: '/contact', variant: 'primary' },
            },
            style: { background: 'white', paddingY: 'xl' },
            visible: true,
          },
          {
            type: 'stats', variant: 'luxe-cards',
            content: {
              items: [
                { id: '1', value: '99%', label: 'Customer satisfaction', description: 'Lorem ipsum dolor sit amet consectet adipiscing elit eget quamumto.' },
                { id: '2', value: '20k+', label: 'Services provided', description: 'Lorem ipsum dolor sit amet consectet adipiscing elit eget quamumto.' },
                { id: '3', value: '10+', label: 'Years of Experience', description: 'Lorem ipsum dolor sit amet consectet adipiscing elit eget quamumto.' },
              ],
            },
            style: { background: 'light', paddingY: 'xl' },
            visible: true,
          },
          {
            type: 'image-text', variant: 'luxe-image-right',
            content: {
              title: 'How we started our barber shop',
              text: 'Nulla egestas sapien integer mi fermentum tellus tristique consequat pulvinar sagittis adipiscing egestas purus et mi tempus semper id vel prci eu magna in senectus sit eget justo eget integer mi fermentum.',
              image: { src: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6356b2f0356e57aad870b04f_Image-right-about-barbershop-started-our-barber-shop.jpg', alt: 'Barber at work' },
              primaryButton: { label: 'MEET OUR TEAM', href: '#Team', variant: 'primary' },
            },
            style: { background: 'white', paddingY: 'xl' },
            visible: true,
          },
          {
            type: 'team', variant: 'luxe-grid',
            content: {
              title: 'Meet Our Team',
              subtitle: 'Eu, in in pharetra mauris mi pretium magnis nullam et consequat vel ina sit ut pharetra ultrices feugiat etol quam luctus in dictum.',
              members: [
                { id: '1', name: 'John Carter', role: 'Owner & Master Barber', avatar: 'https://cdn.prod.website-files.com/6351df90df95e78497f35e12/6356bf9c583d4150989357c6_John%20Carter.jpg' },
                { id: '2', name: 'Phil Houston', role: 'Master Barber', avatar: 'https://cdn.prod.website-files.com/6351df90df95e78497f35e12/6356bf946350fc3b9dc21d62_Phil%20Houston.jpg' },
                { id: '3', name: 'Frances Willem', role: 'Master Barber', avatar: 'https://cdn.prod.website-files.com/6351df90df95e78497f35e12/6356bf89b233b5c9bf83d113_Frances%20Willem.jpg' },
              ],
            },
            style: { background: 'light', paddingY: 'xl' },
            visible: true,
          },
          { type: 'gallery-grid', variant: 'luxe-grid', content: { title: 'Follow us on instagram', items: [{ id: '1', src: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6353262d71b74a7c9aec6273_Image-barbershop-men-01.jpg', alt: 'Instagram 1', category: 'Instagram' }, { id: '2', src: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/63532603db028e692e7bd202_Handsome-man-cutting-beard-barber-salon%201.jpg', alt: 'Instagram 2', category: 'Instagram' }, { id: '3', src: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6353261dd7638b80bb954e95_handsome-man-cutting-beard-barber-salon%202.png', alt: 'Instagram 3', category: 'Instagram' }, { id: '4', src: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/635326365ee93e1f49821d0e_Handsome-man-cutting-beard-barber-salon.png', alt: 'Instagram 4', category: 'Instagram' }, { id: '5', src: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6353262573ae728269cab801_Image-barbershop-machine.jpg', alt: 'Instagram 5', category: 'Instagram' }], primaryButton: { label: 'Follow us', href: 'https://www.instagram.com/', variant: 'outline' } }, style: { background: 'white', paddingY: 'lg' }, visible: true },
          { type: 'newsletter', variant: 'luxe-centered', content: { title: 'Subscribe to our newsletter', subtitle: 'Nulla egestas sapien integer mi fermentum tellus tristique consequat pulvinar sagittis adipiscing egestas purus et mi tempus semper id vel prci eu magna.', placeholder: 'Your email address', buttonLabel: 'Subscribe' }, style: { background: 'light', paddingY: 'lg' }, visible: true },
          { type: 'site-footer', variant: 'luxe', content: { logo: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/639278a08df82b733cd1d7a9_logo-beard-webflow-template.svg', tagline: 'Nulla egestas sapien integer mi fermentum tellus tristique consequat pulvinar sagittis adipiscing egestas purus et mi tempus semper.', copyright: 'Copyright © Beard X | Designed by BRIX Templates - Powered by Webflow', columns: [{ id: '1', title: 'Menu', links: [{ id: '1', label: 'home', href: '/home' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Services', href: '/services' }, { id: '4', label: 'Blog', href: '/blog' }, { id: '5', label: 'Shop', href: '/shop' }, { id: '6', label: 'Contact', href: '/contact' }, { id: '7', label: 'Team member', href: '/team/john-carter' }] }, { id: '2', title: 'Utility Pages', links: [{ id: '1', label: 'Start here', href: '/template-pages/start-here' }, { id: '2', label: 'Styleguide', href: '/template-pages/style-guide' }, { id: '3', label: 'Licenses', href: '/template-pages/licenses' }, { id: '4', label: 'Changelog', href: '/template-pages/changelog' }] }], socials: { facebook: 'https://www.facebook.com/', twitter: 'https://www.twitter.com/', instagram: 'https://www.instagram.com/', youtube: 'https://www.youtube.com/', pinterest: 'https://www.pinterest.com' } }, style: { background: 'dark', paddingY: 'none' }, visible: true },
        ],
      },

      // ── PAGE SERVICES ──
      {
        slug: '/services',
        title: 'Services',
        sections: [
          { type: 'site-header', variant: 'luxe', content: { logo: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/639278a08df82b733cd1d7a9_logo-beard-webflow-template.svg', links: [{ id: '1', label: 'Home', href: '/home' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Services', href: '/services' }, { id: '4', label: 'Contact', href: '/contact' }], ctaLabel: 'Book an appointment', ctaHref: '/contact' }, style: { background: 'white', paddingY: 'none' }, visible: true },
          {
            type: 'features', variant: 'luxe-grid',
            content: {
              title: 'Our Services',
              subtitle: 'Eun in pharetra mauris mi pretium magnis nullam et consequat vel ina sit ut pharetra ultrices feugiat etol quam luctus in dictum placerat malesuada sollicitudin eu vel diam.',
              // Note: Services page uses different subtitle from homepage
              items: [
                { id: '1', icon: 'scissors', title: 'Classic Haircut', description: 'Nulla egestas sapien integer mi fermentum tellus tristique consequatolm pulvinar sagittis adipiscing.', price: '$37 USD' },
                { id: '2', icon: 'scissors', title: 'Beard Trim', description: 'Nulla egestas sapien integer mi fermentum tellus tristique consequatolm pulvinar sagittis adipiscing.', price: '$25 USD' },
                { id: '3', icon: 'scissors', title: 'kids haircut', description: 'Nulla egestas sapien integer mi fermentum tellus tristique consequatolm pulvinar sagittis adipiscing.', price: '$26 USD' },
                { id: '4', icon: 'scissors', title: 'Neck shave', description: 'Nulla egestas sapien integer mi fermentum tellus tristique consequatolm pulvinar sagittis adipiscing.', price: '$12 USD' },
                { id: '5', icon: 'droplets', title: 'scalp Moisturizing', description: 'Nulla egestas sapien integer mi fermentum tellus tristique consequatolm pulvinar sagittis adipiscing.', price: '$55 USD' },
                { id: '6', icon: 'sparkles', title: 'beard grooming & spa', description: 'Nulla egestas sapien integer mi fermentum tellus tristique consequatolm pulvinar sagittis adipiscing.', price: '$46 USD' },
              ],
              primaryButton: { label: 'More About us', href: '/about', variant: 'outline' },
              secondaryButton: { label: 'Book an appointment', href: '/contact', variant: 'primary' },
            },
            style: { background: 'light', paddingY: 'xl' },
            visible: true,
          },
          { type: 'gallery-grid', variant: 'luxe-grid', content: { title: 'Follow us on instagram', items: [{ id: '1', src: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6353262d71b74a7c9aec6273_Image-barbershop-men-01.jpg', alt: 'Instagram 1', category: 'Instagram' }, { id: '2', src: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/63532603db028e692e7bd202_Handsome-man-cutting-beard-barber-salon%201.jpg', alt: 'Instagram 2', category: 'Instagram' }, { id: '3', src: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6353261dd7638b80bb954e95_handsome-man-cutting-beard-barber-salon%202.png', alt: 'Instagram 3', category: 'Instagram' }, { id: '4', src: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/635326365ee93e1f49821d0e_Handsome-man-cutting-beard-barber-salon.png', alt: 'Instagram 4', category: 'Instagram' }, { id: '5', src: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/6353262573ae728269cab801_Image-barbershop-machine.jpg', alt: 'Instagram 5', category: 'Instagram' }], primaryButton: { label: 'Follow us', href: 'https://www.instagram.com/', variant: 'outline' } }, style: { background: 'light', paddingY: 'lg' }, visible: true },
          { type: 'newsletter', variant: 'luxe-centered', content: { title: 'Subscribe to our newsletter', subtitle: 'Nulla egestas sapien integer mi fermentum tellus tristique consequat pulvinar sagittis adipiscing egestas purus et mi tempus semper id vel prci eu magna.', placeholder: 'Your email address', buttonLabel: 'Subscribe' }, style: { background: 'white', paddingY: 'lg' }, visible: true },
          { type: 'site-footer', variant: 'luxe', content: { logo: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/639278a08df82b733cd1d7a9_logo-beard-webflow-template.svg', tagline: 'Nulla egestas sapien integer mi fermentum tellus tristique consequat pulvinar sagittis adipiscing egestas purus et mi tempus semper.', copyright: 'Copyright © Beard X | Designed by BRIX Templates - Powered by Webflow', columns: [{ id: '1', title: 'Menu', links: [{ id: '1', label: 'home', href: '/home' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Services', href: '/services' }, { id: '4', label: 'Blog', href: '/blog' }, { id: '5', label: 'Shop', href: '/shop' }, { id: '6', label: 'Contact', href: '/contact' }, { id: '7', label: 'Team member', href: '/team/john-carter' }] }, { id: '2', title: 'Utility Pages', links: [{ id: '1', label: 'Start here', href: '/template-pages/start-here' }, { id: '2', label: 'Styleguide', href: '/template-pages/style-guide' }, { id: '3', label: 'Licenses', href: '/template-pages/licenses' }, { id: '4', label: 'Changelog', href: '/template-pages/changelog' }] }], socials: { facebook: 'https://www.facebook.com/', twitter: 'https://www.twitter.com/', instagram: 'https://www.instagram.com/', youtube: 'https://www.youtube.com/', pinterest: 'https://www.pinterest.com' } }, style: { background: 'dark', paddingY: 'none' }, visible: true },
        ],
      },

      // ── PAGE CONTACT ──
      {
        slug: '/contact',
        title: 'Contact',
        sections: [
          { type: 'site-header', variant: 'luxe', content: { logo: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/639278a08df82b733cd1d7a9_logo-beard-webflow-template.svg', links: [{ id: '1', label: 'Home', href: '/home' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Services', href: '/services' }, { id: '4', label: 'Contact', href: '/contact' }], ctaLabel: 'Book an appointment', ctaHref: '/contact' }, style: { background: 'white', paddingY: 'none' }, visible: true },
          {
            type: 'contact', variant: 'luxe-with-info',
            content: {
              title: 'Get in touch',
              subtitle: 'Elementum anetus tempus volutpat mollis nisl cursus diam velit ut quis mi consectetur sit nibh posuere sit nisi scelerisque venenatis risus sit ornare odio nullam tortor amet egestas sapien aliquet.',
              phone: '(475) 453 - 3465',
              email: 'contact@Beard.com',
              address: '4841 Oakway Lane, Los Angeles, CA, 90017',
              hours: 'Mon-Fri: 8am - 7pm | Sat-Sun: 10am - 5pm',
            },
            style: { background: 'white', paddingY: 'xl' },
            visible: true,
          },
          {
            type: 'form', variant: 'luxe-default',
            content: {
              title: 'Send us a message',
              fields: [
                { id: '1', label: 'Name', name: 'name', type: 'text', placeholder: 'Your name', required: true, width: 'full' },
                { id: '2', label: 'Email', name: 'email', type: 'email', placeholder: 'Your email', required: true, width: 'half' },
                { id: '3', label: 'Phone', name: 'phone', type: 'tel', placeholder: 'Your phone', required: false, width: 'half' },
                { id: '4', label: 'Message', name: 'message', type: 'textarea', placeholder: 'Your message', required: true, width: 'full' },
              ],
              submitLabel: 'Send message',
              successMessage: 'Thank you. Thanks for reaching out. We will get back to you soon.',
            },
            style: { background: 'light', paddingY: 'xl' },
            visible: true,
          },
          {
            type: 'features', variant: 'luxe-grid',
            content: {
              title: 'More locations',
              items: [
                { id: '1', icon: 'map-pin', title: 'Los Angeles, CA', description: '4841 Oakway Lane, Los angeles, ca, 90017\nmon-fri / 8:00 am - 7:00 pm | sat-sun / 10:00 am - 5:00 pm\n(917) - 707 - 9336 | (818) - 323 - 2528' },
                { id: '2', icon: 'map-pin', title: 'New york, NY', description: '1344 Hanover Street, New york, NY, 10016\nmon-fri / 8:00 am - 7:00 pm | sat-sun / 10:00 am - 5:00 pm\n(337) - 352 - 8177 | (646) - 200 - 7591' },
                { id: '3', icon: 'map-pin', title: 'San francisco, CA', description: '4895 Wolf Pen Road, San Francisco, CA, 94107\nmon-fri / 8:00 am - 7:00 pm | sat-sun / 10:00 am - 5:00 pm\n(254) - 123 - 1190 | (254) - 321 - 9011' },
              ],
            },
            style: { background: 'white', paddingY: 'xl' },
            visible: true,
          },
          {
            type: 'faq', variant: 'luxe-accordion',
            content: {
              title: 'Frequently Asked questions',
              subtitle: 'Turpis viverra dis non arcu at eget aenean sed imperdiet ullamcorper elementum purus neque. Ut ultrices non ultrices leo urn donec neque dui imperdiet viverra nunc nibh in tellusac.',
              items: [
                { id: '1', question: 'Do you offer neck shaving service?', answer: 'Interdum facilisis velit cursus libero magna fringilla viverra blandit gravida tortor ultricies tellus magna nibh massa interdum convallis id sed amet turpis lectus mi fringilla commodo faucibus leo facilisis libero facilisi dignissim ultrices nec ullamcorper aet pulvinar faucibus sed sit netus nullam enim ut.' },
                { id: '2', question: 'Do you offer long hair haircuts?', answer: 'Interdum facilisis velit cursus libero magna fringilla viverra blandit gravida tortor ultricies tellus magna nibh massa interdum convallis id sed amet turpis lectus mi fringilla commodo faucibus leo facilisis libero facilisi dignissim ultrices nec ullamcorper aet pulvinar faucibus sed sit netus nullam enim ut.' },
                { id: '3', question: 'Can I get a refund if i need to cancel?', answer: 'Interdum facilisis velit cursus libero magna fringilla viverra blandit gravida tortor ultricies tellus magna nibh massa interdum convallis id sed amet turpis lectus mi fringilla commodo faucibus leo facilisis libero facilisi dignissim ultrices nec ullamcorper aet pulvinar faucibus sed sit netus nullam enim ut.' },
                { id: '4', question: 'hOW DO I TAKE CARE OF MY BEARD DAILY?', answer: 'Interdum facilisis velit cursus libero magna fringilla viverra blandit gravida tortor ultricies tellus magna nibh massa interdum convallis id sed amet turpis lectus mi fringilla commodo faucibus leo facilisis libero facilisi dignissim ultrices nec ullamcorper aet pulvinar faucibus sed sit netus nullam enim ut.' },
              ],
            },
            style: { background: 'light', paddingY: 'xl' },
            visible: true,
          },
          { type: 'newsletter', variant: 'luxe-centered', content: { title: 'Subscribe to our newsletter', subtitle: 'Nulla egestas sapien integer mi fermentum tellus tristique consequat pulvinar sagittis adipiscing egestas purus et mi tempus semper id vel prci eu magna.', placeholder: 'Your email address', buttonLabel: 'Subscribe' }, style: { background: 'white', paddingY: 'lg' }, visible: true },
          { type: 'site-footer', variant: 'luxe', content: { logo: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/639278a08df82b733cd1d7a9_logo-beard-webflow-template.svg', tagline: 'Nulla egestas sapien integer mi fermentum tellus tristique consequat pulvinar sagittis adipiscing egestas purus et mi tempus semper.', copyright: 'Copyright © Beard X | Designed by BRIX Templates - Powered by Webflow', columns: [{ id: '1', title: 'Menu', links: [{ id: '1', label: 'home', href: '/home' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Services', href: '/services' }, { id: '4', label: 'Blog', href: '/blog' }, { id: '5', label: 'Shop', href: '/shop' }, { id: '6', label: 'Contact', href: '/contact' }, { id: '7', label: 'Team member', href: '/team/john-carter' }] }, { id: '2', title: 'Utility Pages', links: [{ id: '1', label: 'Start here', href: '/template-pages/start-here' }, { id: '2', label: 'Styleguide', href: '/template-pages/style-guide' }, { id: '3', label: 'Licenses', href: '/template-pages/licenses' }, { id: '4', label: 'Changelog', href: '/template-pages/changelog' }] }], socials: { facebook: 'https://www.facebook.com/', twitter: 'https://www.twitter.com/', instagram: 'https://www.instagram.com/', youtube: 'https://www.youtube.com/', pinterest: 'https://www.pinterest.com' } }, style: { background: 'dark', paddingY: 'none' }, visible: true },
        ],
      },

      // ── PAGE BLOG ──
      {
        slug: '/blog',
        title: 'Blog',
        sections: [
          { type: 'site-header', variant: 'luxe', content: { logo: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/639278a08df82b733cd1d7a9_logo-beard-webflow-template.svg', links: [{ id: '1', label: 'Home', href: '/home' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Services', href: '/services' }, { id: '4', label: 'Contact', href: '/contact' }], ctaLabel: 'Book an appointment', ctaHref: '/contact' }, style: { background: 'white', paddingY: 'none' }, visible: true },
          {
            type: 'hero', variant: 'luxe',
            content: {
              title: 'ARTICLES & NEWS',
            },
            style: { background: 'white', paddingY: 'lg' },
            visible: true,
          },
          {
            type: 'blog-grid', variant: 'luxe-featured',
            content: {
              items: [
                { id: '1', title: 'How to keep your razors sharp as brand new', category: 'Tips', date: 'Oct 24, 2022', slug: '/blog/how-to-keep-your-razors-sharp-as-brand-new', image: 'https://cdn.prod.website-files.com/6351df90df95e78497f35e12/6356e4aa16f821178987d76b_How%20to%20keep%20your%20razors%20sharp%20as%20brand%20new.jpg' },
                { id: '2', title: 'Gel vs pomade, Which one is the right for me', category: 'Articles', date: 'Oct 31, 2022', slug: '/blog/gel-vs-pomade-which-one-is-the-right-for-me' },
                { id: '3', title: '7 Trends to change your look in 2023', category: 'Articles', date: 'Oct 31, 2022', slug: '/blog/7-trends-to-change-your-look-in-2023' },
              ],
            },
            style: { background: 'light', paddingY: 'xl' },
            visible: true,
          },
          {
            type: 'blog-grid', variant: 'luxe-grid',
            content: {
              title: 'Latest Posts',
              items: [
                { id: '1', title: 'How to keep your razors sharp as brand new', category: 'Tips', date: 'Oct 24, 2022', slug: '/blog/how-to-keep-your-razors-sharp-as-brand-new' },
                { id: '2', title: '5 BEST WAYS TO MANTAIN YOUR BEARD & MUSTACHE', category: 'News', date: 'Oct 24, 2022', slug: '/blog/5-best-ways-to-mantain-your-beard-mustache' },
                { id: '3', title: 'Gel vs pomade, Which one is the right for me', category: 'Articles', date: 'Oct 24, 2022', slug: '/blog/gel-vs-pomade-which-one-is-the-right-for-me' },
                { id: '4', title: '10 Tips to keep your hair clean for longer', category: 'Tips', date: 'Oct 24, 2022', slug: '/blog/10-tips-to-keep-your-hair-clean-for-longer' },
              ],
            },
            style: { background: 'white', paddingY: 'xl' },
            visible: true,
          },
          { type: 'newsletter', variant: 'luxe-centered', content: { title: 'Subscribe to our newsletter', subtitle: 'Nulla egestas sapien integer mi fermentum tellus tristique consequat pulvinar sagittis adipiscing egestas purus et mi tempus semper id vel prci eu magna.', placeholder: 'Your email address', buttonLabel: 'Subscribe' }, style: { background: 'light', paddingY: 'lg' }, visible: true },
          { type: 'site-footer', variant: 'luxe', content: { logo: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/639278a08df82b733cd1d7a9_logo-beard-webflow-template.svg', tagline: 'Nulla egestas sapien integer mi fermentum tellus tristique consequat pulvinar sagittis adipiscing egestas purus et mi tempus semper.', copyright: 'Copyright © Beard X | Designed by BRIX Templates - Powered by Webflow', columns: [{ id: '1', title: 'Menu', links: [{ id: '1', label: 'home', href: '/home' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Services', href: '/services' }, { id: '4', label: 'Blog', href: '/blog' }, { id: '5', label: 'Shop', href: '/shop' }, { id: '6', label: 'Contact', href: '/contact' }, { id: '7', label: 'Team member', href: '/team/john-carter' }] }, { id: '2', title: 'Utility Pages', links: [{ id: '1', label: 'Start here', href: '/template-pages/start-here' }, { id: '2', label: 'Styleguide', href: '/template-pages/style-guide' }, { id: '3', label: 'Licenses', href: '/template-pages/licenses' }, { id: '4', label: 'Changelog', href: '/template-pages/changelog' }] }], socials: { facebook: 'https://www.facebook.com/', twitter: 'https://www.twitter.com/', instagram: 'https://www.instagram.com/', youtube: 'https://www.youtube.com/', pinterest: 'https://www.pinterest.com' } }, style: { background: 'dark', paddingY: 'none' }, visible: true },
        ],
      },

      // ── PAGE SHOP ──
      {
        slug: '/shop',
        title: 'Shop',
        sections: [
          { type: 'site-header', variant: 'luxe', content: { logo: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/639278a08df82b733cd1d7a9_logo-beard-webflow-template.svg', links: [{ id: '1', label: 'Home', href: '/home' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Services', href: '/services' }, { id: '4', label: 'Contact', href: '/contact' }], ctaLabel: 'Book an appointment', ctaHref: '/contact' }, style: { background: 'white', paddingY: 'none' }, visible: true },
          {
            type: 'hero', variant: 'luxe',
            content: {
              title: 'Browse our products',
              subtitle: 'Lorem amet sem ipsum tellus massa est lectus venenatis leo sapien condimentum rhoncus in a ullamcorper ullamcorper libero mauris pharetra massa elementum ut nisl suspendisse at at non tempus vestibulum arcu facilisi senectus dis facilisis aliquet.',
              // Note: Shop page hero uses different body text from other pages
            },
            style: { background: 'white', paddingY: 'lg' },
            visible: true,
          },
          {
            type: 'product-grid', variant: 'luxe-grid',
            content: {
              items: [
                { id: '1', name: 'Beard & mustache care oil', price: '$ 19.00 USD', description: 'Nulla egestas sapien integer mi fermentum tellusol tristique consequatolm pulvinar sagittis.', image: 'https://cdn.prod.website-files.com/6351df90df95e78497f35e12/6353172e41400e47f4b2fb08_Glass-dropper-bottle-%26-tube.png' },
                { id: '2', name: 'Beard & hair serum', price: '$ 49.00 USD', description: 'Nulla egestas sapien integer mi fermentum tellusol tristique consequatolm pulvinar sagittis.', image: 'https://cdn.prod.website-files.com/6351df90df95e78497f35e12/635317abd7135d5db1e806e2_Cosmetic-packaging-kit-with-kraft-mailer-box.png' },
                { id: '3', name: 'Premium Hair Clay', price: '$ 29.00 USD', description: 'Nulla egestas sapien integer mi fermentum tellusol tristique consequatolm pulvinar sagittis.', image: 'https://cdn.prod.website-files.com/6351df90df95e78497f35e12/635317bbcef9162eb3edfdcc_Amber-cosmetic-bottle-packaging.png' },
                { id: '4', name: 'Grooming hair shampoo', price: '$ 29.00 USD', description: 'Nulla egestas sapien integer mi fermentum tellusol tristique consequatolm pulvinar sagittis.', image: 'https://cdn.prod.website-files.com/6351df90df95e78497f35e12/635317c8db028ea9f87bf8fe_Hard-shadow-amber-cosmetic-package.png' },
                { id: '5', name: 'Premium matte pomade', price: '$ 39.00 USD', description: 'Nulla egestas sapien integer mi fermentum tellusol tristique consequatolm pulvinar sagittis.', image: 'https://cdn.prod.website-files.com/6351df90df95e78497f35e12/635317d6db028e73027bf966_Men-care-products.png' },
                { id: '6', name: 'Grooming hair Conditioning', price: '$ 29.00 USD', description: 'Nulla egestas sapien integer mi fermentum tellusol tristique consequatolm pulvinar sagittis.', image: 'https://cdn.prod.website-files.com/6351df90df95e78497f35e12/635317e0cef916f14bedfef9_Amber-cosmetic-bottle-packagin.png' },
              ],
            },
            style: { background: 'light', paddingY: 'xl' },
            visible: true,
          },
          { type: 'newsletter', variant: 'luxe-centered', content: { title: 'Subscribe to our newsletter', subtitle: 'Nulla egestas sapien integer mi fermentum tellus tristique consequat pulvinar sagittis adipiscing egestas purus et mi tempus semper id vel prci eu magna.', placeholder: 'Your email address', buttonLabel: 'Subscribe' }, style: { background: 'white', paddingY: 'lg' }, visible: true },
          { type: 'site-footer', variant: 'luxe', content: { logo: 'https://cdn.prod.website-files.com/6351df90df95e750c4f35ddf/639278a08df82b733cd1d7a9_logo-beard-webflow-template.svg', tagline: 'Nulla egestas sapien integer mi fermentum tellus tristique consequat pulvinar sagittis adipiscing egestas purus et mi tempus semper.', copyright: 'Copyright © Beard X | Designed by BRIX Templates - Powered by Webflow', columns: [{ id: '1', title: 'Menu', links: [{ id: '1', label: 'home', href: '/home' }, { id: '2', label: 'About', href: '/about' }, { id: '3', label: 'Services', href: '/services' }, { id: '4', label: 'Blog', href: '/blog' }, { id: '5', label: 'Shop', href: '/shop' }, { id: '6', label: 'Contact', href: '/contact' }, { id: '7', label: 'Team member', href: '/team/john-carter' }] }, { id: '2', title: 'Utility Pages', links: [{ id: '1', label: 'Start here', href: '/template-pages/start-here' }, { id: '2', label: 'Styleguide', href: '/template-pages/style-guide' }, { id: '3', label: 'Licenses', href: '/template-pages/licenses' }, { id: '4', label: 'Changelog', href: '/template-pages/changelog' }] }], socials: { facebook: 'https://www.facebook.com/', twitter: 'https://www.twitter.com/', instagram: 'https://www.instagram.com/', youtube: 'https://www.youtube.com/', pinterest: 'https://www.pinterest.com' } }, style: { background: 'dark', paddingY: 'none' }, visible: true },
        ],
      },
    ],
  },

  // ─── 26. E-commerce Éco — Canopy ───
  {
    id: 'ecommerce-canopy',
    name: 'Canopy',
    description: 'Template e-commerce éco-responsable — blanc chaud, vert forêt, coins carrés, minimaliste',
    category: 'ecommerce',
    universe: 'ecommerce',
    emoji: '🌿',
    preview: 'from-green-800 to-emerald-900',
    sections: [
      { type: 'site-header', variant: 'canopy', content: { logo: 'Canopy', links: [{ id: '1', label: 'Home', href: '/' }, { id: '2', label: 'Products', href: '/products' }, { id: '3', label: 'Our Story', href: '/story' }, { id: '4', label: 'Materials', href: '/materials' }, { id: '5', label: 'Contact', href: '/contact' }], ctaLabel: 'Livraison gratuite dès 100€ | Matériaux durables' }, style: { background: 'white', paddingY: 'none' }, visible: true },
      { type: 'hero', variant: 'canopy', content: { eyebrow: 'Collection Printemps 2026', title: 'Walk Lighter On The Planet', subtitle: 'Des chaussures conçues avec des matériaux naturels, pour un confort exceptionnel et une empreinte réduite.', primaryButton: { label: 'DÉCOUVRIR', href: '/products', variant: 'primary' }, secondaryButton: { label: 'NOTRE HISTOIRE', href: '/story', variant: 'outline' }, image: { src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80', alt: 'Sneaker eco-responsable' } }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'gallery-grid', variant: 'canopy-products', content: { title: 'Nos Best-Sellers', items: [{ id: '1', title: 'Tree Runner', subtitle: 'Fibre d\'eucalyptus', price: '110€', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80', badge: 'Best-seller' }, { id: '2', title: 'Wool Runner', subtitle: 'Laine mérinos', price: '120€', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80' }, { id: '3', title: 'Tree Dasher', subtitle: 'Fibre naturelle', price: '135€', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80', badge: 'Nouveau' }, { id: '4', title: 'Wool Pipers', subtitle: 'Laine mérinos ZQ', price: '95€', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80' }, { id: '5', title: 'Tree Breezers', subtitle: 'Eucalyptus TENCEL', price: '100€', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80' }, { id: '6', title: 'Trail Runner SWT', subtitle: 'Semelle bio-based', price: '145€', image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&q=80', badge: 'Nouveau' }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'image-text', variant: 'canopy-story', content: { title: 'Des matériaux qui changent tout', subtitle: 'NOTRE PHILOSOPHIE', description: 'Nous croyons que les meilleurs produits sont ceux qui sont bons pour vous et pour la planète. Chaque paire est conçue avec des matériaux naturels — laine mérinos, fibre d\'eucalyptus, mousse de canne à sucre — pour un confort inégalé et une empreinte carbone réduite.', image: { src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80', alt: 'Matériaux naturels' }, primaryButton: { label: 'EN SAVOIR PLUS', href: '/materials', variant: 'primary' } }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'features', variant: 'canopy-values', content: { title: 'Pourquoi Canopy ?', subtitle: 'Trois piliers guident chacune de nos décisions.', items: [{ id: '1', icon: '🌱', title: 'Matériaux Naturels', description: 'Laine mérinos, fibre d\'eucalyptus et mousse de canne à sucre. Chaque composant est choisi pour son faible impact environnemental.' }, { id: '2', icon: '🌍', title: 'Empreinte Réduite', description: 'Nous mesurons et compensons notre empreinte carbone à chaque étape, de la production à la livraison.' }, { id: '3', icon: '♻️', title: 'Design Circulaire', description: 'Nos produits sont conçus pour durer et être recyclés en fin de vie grâce à notre programme de reprise.' }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'slider', variant: 'canopy-parallax', content: { title: 'Collection Signature', slides: [{ id: '1', title: 'Tree Runner', badge: 'Coup de cœur', subtitle: 'Légèreté et respirabilité grâce à la fibre d\'eucalyptus TENCEL, pour un confort naturel incomparable', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1920&q=80' }, { id: '2', title: 'Wool Runner', badge: 'Nouveau', subtitle: 'Laine mérinos ZQ certifiée, thermorégulatrice et ultra-douce, pour un quotidien éco-responsable', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=1920&q=80' }, { id: '3', title: 'Trail Runner SWT', badge: 'Best-seller', subtitle: 'Semelle SweetFoam en canne à sucre et traction tout-terrain, conçue pour durer et être recyclée', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1920&q=80' }] }, style: { background: 'dark', paddingY: 'none' }, visible: true },
      { type: 'testimonials', variant: 'canopy-cards', content: { title: 'Ce que nos clients disent', items: [{ id: '1', quote: 'Les chaussures les plus confortables que j\'ai jamais portées. Et en plus, elles sont éco-responsables !', author: 'Marie L.', role: 'Cliente depuis 2024', rating: 5 }, { id: '2', quote: 'Légères, respirantes et stylées. Je ne peux plus m\'en passer au quotidien.', author: 'Thomas D.', role: 'Runner amateur', rating: 5 }, { id: '3', quote: 'Enfin une marque qui allie qualité premium et engagement environnemental sincère.', author: 'Sophie M.', role: 'Consultante RSE', rating: 5 }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'cta', variant: 'canopy-banner', content: { title: 'Prêt à marcher plus léger ?', subtitle: 'Rejoignez le mouvement pour une mode responsable.', primaryButton: { label: 'DÉCOUVRIR LA COLLECTION', href: '/products', variant: 'secondary' } }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'newsletter', variant: 'canopy-minimal', content: { title: 'Restez informé', subtitle: 'Recevez nos nouveautés et nos engagements directement dans votre boîte mail.' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'cta', variant: 'brixsa-centered', content: { title: 'Prêt à marcher plus léger sur la planète ?', subtitle: 'Découvrez\nla collection', primaryButton: { label: 'Découvrir', href: '/products', variant: 'secondary' }, backgroundImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'site-footer', variant: 'canopy', content: { logo: 'Canopy', tagline: 'Mode éco-responsable, confort premium.', copyright: `© ${year} Canopy. Tous droits réservés.`, columns: [{ id: '1', title: 'Boutique', links: [{ id: '1', label: 'Hommes', href: '/hommes' }, { id: '2', label: 'Femmes', href: '/femmes' }, { id: '3', label: 'Nouveautés', href: '/nouveautes' }, { id: '4', label: 'Best-sellers', href: '/best-sellers' }, { id: '5', label: 'Soldes', href: '/soldes' }] }, { id: '2', title: 'À propos', links: [{ id: '1', label: 'Notre histoire', href: '/story' }, { id: '2', label: 'Matériaux', href: '/materials' }, { id: '3', label: 'Durabilité', href: '/durabilite' }, { id: '4', label: 'Presse', href: '/presse' }, { id: '5', label: 'Carrières', href: '/carrieres' }] }, { id: '3', title: 'Aide', links: [{ id: '1', label: 'FAQ', href: '/faq' }, { id: '2', label: 'Livraison', href: '/livraison' }, { id: '3', label: 'Retours', href: '/retours' }, { id: '4', label: 'Guide des tailles', href: '/guide-tailles' }, { id: '5', label: 'Contact', href: '/contact' }] }], socials: { instagram: '#', twitter: '#', linkedin: '#' } }, style: { background: 'dark', paddingY: 'none' }, visible: true },
    ],
  },

{
    id: 'nail-salon-nacre',
    name: 'Nacre',
    description: 'Template nail studio premium — rose poudré, doré, glassmorphism, slider hero diagonal wipe, accordéon services',
    category: 'beaute',
    universe: 'luxe',
    emoji: '💅',
    preview: 'from-rose-300 to-pink-900',
    sections: [
      { type: 'site-header', variant: 'nacre', content: { logo: 'Nacre', links: [{ id: '1', label: 'Accueil', href: '/' }, { id: '2', label: 'Services', href: '/services' }, { id: '3', label: 'Galerie', href: '/galerie' }, { id: '4', label: 'À Propos', href: '/a-propos' }, { id: '5', label: 'Tarifs', href: '/tarifs' }, { id: '6', label: 'Contact', href: '/contact' }], ctaLabel: 'Menu', ctaHref: '#' }, style: { background: 'dark', paddingY: 'none' }, visible: true },
      { type: 'hero', variant: 'nacre', content: { title: 'L\'Art au Bout des Doigts', subtitle: 'Réserver...', primaryButton: { label: 'Réserver', href: '/contact', variant: 'primary' }, heroImages: [{ id: '1', src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1920&q=80', alt: 'French Élégance' }, { id: '2', src: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=1920&q=80', alt: 'Baby Boomer' }, { id: '3', src: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=1920&q=80', alt: 'Gel Artistique' }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'gallery-grid', variant: 'nacre-services', content: { title: 'Nos Prestations', subtitle: 'Voir les tarifs', items: [{ id: '1', title: 'Manucure Classique', duration: '30 min', price: '25€', description: 'Limage, cuticules, vernis couleur au choix', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80' }, { id: '2', title: 'Pose Gel Complète', duration: '1h30', price: '55€', description: 'Préparation, pose gel UV, modelage, finition', image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800&q=80' }, { id: '3', title: 'Nail Art Premium', duration: '2h', price: '75€', description: 'Création sur-mesure, strass, dégradés, motifs', image: 'https://images.unsplash.com/photo-1604902396830-aca29e19b067?w=800&q=80' }, { id: '4', title: 'Pédicure Spa', duration: '1h', price: '45€', description: 'Bain relaxant, gommage, soin, vernis', image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&q=80' }, { id: '5', title: 'Semi-Permanent', duration: '45 min', price: '35€', description: 'Vernis longue tenue 2-3 semaines', image: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=800&q=80' }, { id: '6', title: 'Soin Paraffine', duration: '30 min', price: '30€', description: 'Hydratation intense, bain paraffine tiède', image: 'https://images.unsplash.com/photo-1600587191768-f29f14c7ca84?w=800&q=80' }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'features', variant: 'nacre-accordion', content: { title: 'Nos Expertises', items: [{ id: '1', icon: '💅', title: 'Manucure', description: 'Pose de vernis, french, nail art personnalisé', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200&q=80' }, { id: '2', icon: '🦶', title: 'Pédicure', description: 'Soin complet des pieds, vernis semi-permanent', image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=1200&q=80' }, { id: '3', icon: '✨', title: 'Extensions', description: 'Pose gel, résine, capsules sur-mesure', image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=1200&q=80' }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'image-text', variant: 'nacre-about', content: { title: 'Un savoir-faire artisanal au service de votre beauté', subtitle: 'Depuis 8 ans, notre atelier allie techniques innovantes et produits haut de gamme pour sublimer vos ongles.', body: 'Chaque prestation est un moment de détente personnalisé. Nous utilisons exclusivement des produits certifiés, respectueux de vos ongles et de l\'environnement. Notre équipe de prothésistes ongulaires diplômées vous accueille dans un cadre élégant et apaisant.', description: '', primaryButton: { label: 'Découvrir notre histoire', href: '/a-propos', variant: 'outline' } }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'slider', variant: 'nacre-parallax', content: { title: 'Nos Réalisations', slides: [{ id: '1', title: 'Collection Automne', subtitle: 'Tons chauds et textures velours pour un look sophistiqué', badge: 'Nouveau', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1920&q=80' }, { id: '2', title: 'French Réinventée', subtitle: 'La classique french manucure revisitée avec des touches dorées', badge: 'Tendance', image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=1920&q=80' }, { id: '3', title: 'Nail Art Géométrique', subtitle: 'Lignes épurées et formes abstraites pour un style audacieux', badge: 'Exclusif', image: 'https://images.unsplash.com/photo-1604902396830-aca29e19b067?w=1920&q=80' }] }, style: { background: 'dark', paddingY: 'none' }, visible: true },
      { type: 'testimonials', variant: 'nacre-featured', content: { eyebrow: 'Ce que disent nos clientes', title: 'Témoignages', items: [{ id: '1', quote: 'Un vrai moment de détente à chaque visite. Le nail art est toujours impeccable et les produits sont de qualité.', author: 'Émilie W.', role: 'Cliente fidèle', rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' }, { id: '2', quote: 'L\'équipe est à l\'écoute et créative. Ma pose gel tient 3 semaines sans problème !', author: 'Camille R.', role: 'Cliente depuis 2023', rating: 5, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80' }, { id: '3', quote: 'Le cadre est magnifique et l\'accueil chaleureux. Je recommande les yeux fermés.', author: 'Sophia L.', role: 'Nouvelle cliente', rating: 5, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80' }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'cta', variant: 'nacre-centered', content: { title: 'Prenez soin de vous', subtitle: 'Réservez votre moment de détente et laissez-nous sublimer vos ongles.', primaryButton: { label: 'Réserver maintenant', href: '/contact', variant: 'secondary' }, backgroundImage: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=1920&q=80' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'cta', variant: 'brixsa-centered', content: { title: 'Envie d\'un moment de beauté sur-mesure ?', subtitle: 'Réservez\nvotre séance', primaryButton: { label: 'Réserver', href: '/contact', variant: 'secondary' }, backgroundImage: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1920&q=80' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'site-footer', variant: 'nacre', content: { logo: 'Nacre', tagline: 'L\'art de la beauté des ongles.', copyright: `© ${year} Nacre Studio. Tous droits réservés.`, columns: [{ id: '1', title: 'Navigation', links: [{ id: '1', label: 'Accueil', href: '/' }, { id: '2', label: 'Services', href: '/services' }, { id: '3', label: 'Galerie', href: '/galerie' }, { id: '4', label: 'À Propos', href: '/a-propos' }, { id: '5', label: 'Tarifs', href: '/tarifs' }, { id: '6', label: 'Contact', href: '/contact' }] }, { id: '2', title: 'Prestations', links: [{ id: '1', label: 'Manucure', href: '/services#manucure' }, { id: '2', label: 'Pédicure', href: '/services#pedicure' }, { id: '3', label: 'Nail Art', href: '/services#nail-art' }, { id: '4', label: 'Extensions', href: '/services#extensions' }, { id: '5', label: 'Soins', href: '/services#soins' }] }, { id: '3', title: 'Contact', links: [{ id: '1', label: '01 23 45 67 89', href: 'tel:0123456789' }, { id: '2', label: 'hello@nacre-studio.fr', href: 'mailto:hello@nacre-studio.fr' }, { id: '3', label: '12 Rue de la Beauté, 75008 Paris', href: '#' }] }], socials: { instagram: '#', linkedin: '#' } }, style: { background: 'white', paddingY: 'none' }, visible: true },
    ],
  },

  // ─── Obscura — Photographe Premium ───
  {
    id: 'photographe-obscura',
    name: 'Obscura',
    description: 'Template photographe premium — noir profond, or chaud, slider diagonal wipe, galerie cinématique',
    category: 'photographe',
    universe: 'luxe',
    emoji: '📸',
    preview: 'from-amber-600 to-stone-900',
    sections: [
      { type: 'site-header', variant: 'obscura', content: { logo: 'Obscura', links: [{ id: '1', label: 'Accueil', href: '/' }, { id: '2', label: 'Portfolio', href: '/portfolio' }, { id: '3', label: 'Services', href: '/services' }, { id: '4', label: 'À Propos', href: '/a-propos' }, { id: '5', label: 'Contact', href: '/contact' }], ctaLabel: 'Menu', ctaHref: '#' }, style: { background: 'dark' as any, paddingY: 'none' }, visible: true },
      { type: 'hero', variant: 'obscura', content: { title: 'Capturer l\'Émotion, Sublimer l\'Instant', subtitle: 'PHOTOGRAPHE — PARIS', primaryButton: { label: 'Découvrir', href: '/portfolio', variant: 'primary' }, heroImages: [{ id: '1', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1920&q=85', alt: 'Portrait' }, { id: '2', src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1920&q=85', alt: 'Mariage' }, { id: '3', src: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1920&q=85', alt: 'Événement' }] }, style: { background: 'dark' as any, paddingY: 'xl' }, visible: true },
      { type: 'gallery-grid', variant: 'obscura-portfolio', content: { title: 'Portfolio', items: [{ id: '1', title: 'Portrait Studio', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=85', category: 'Portrait' }, { id: '2', title: 'Mariage Champêtre', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=85', category: 'Mariage' }, { id: '3', title: 'Événement Corporate', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=85', category: 'Événement' }, { id: '4', title: 'Paysage Dramatique', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85', category: 'Paysage' }, { id: '5', title: 'Vie Urbaine', image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=85', category: 'Street' }, { id: '6', title: 'Haute Couture', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=85', category: 'Éditorial' }] }, style: { background: 'dark' as any, paddingY: 'xl' }, visible: true },
      { type: 'features', variant: 'obscura-accordion', content: { title: 'Services', items: [{ id: '1', icon: '📷', title: 'Portrait', description: 'Séances portrait en studio ou en extérieur, retouches professionnelles incluses', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200&q=85' }, { id: '2', icon: '💍', title: 'Mariage', description: 'Couverture complète de votre journée, du getting ready jusqu\'au bal', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=85' }, { id: '3', icon: '🎤', title: 'Événement', description: 'Reportage photo corporate, soirées, lancements de produit', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=85' }] }, style: { background: 'dark' as any, paddingY: 'xl' }, visible: true },
      { type: 'image-text', variant: 'obscura-about', content: { title: 'Plus qu\'un photographe, un raconteur d\'histoires', subtitle: 'Passionné par la lumière et l\'émotion, je capture les instants qui comptent depuis plus de 10 ans.', body: 'Chaque séance est une rencontre unique. Mon approche mêle technique maîtrisée et sensibilité artistique pour créer des images qui vous ressemblent. Du portrait intimiste au reportage événementiel, je m\'adapte à votre univers pour sublimer chaque moment.', description: '', primaryButton: { label: 'En savoir plus', href: '/a-propos', variant: 'outline' } }, style: { background: 'dark' as any, paddingY: 'xl' }, visible: true },
      { type: 'slider', variant: 'obscura-parallax', content: { title: 'Réalisations', slides: [{ id: '1', title: 'Lumière Dorée', subtitle: 'Un jeu d\'ombres et de lumière naturelle pour capturer l\'essence du sujet', badge: 'Portrait', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1920&q=85' }, { id: '2', title: 'Instant Éternel', subtitle: 'L\'émotion brute d\'un jour unique, sublimée par un regard artistique', badge: 'Mariage', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=85' }, { id: '3', title: 'Horizon Urbain', subtitle: 'La vibration d\'un moment capturée dans sa plus pure intensité', badge: 'Paysage', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85' }] }, style: { background: 'dark' as any, paddingY: 'none' }, visible: true },
      { type: 'testimonials', variant: 'obscura-featured', content: { eyebrow: 'Témoignages', title: 'Ce que disent mes clients', items: [{ id: '1', quote: 'Chaque image raconte une histoire unique. Le regard artistique et la sensibilité de ce photographe ont sublimé notre mariage.', author: 'Alexandre M.', role: 'Portrait studio', rating: 5 }, { id: '2', quote: 'Un professionnel d\'exception qui sait capturer l\'essence d\'un instant. Les portraits sont d\'une qualité remarquable.', author: 'Claire D.', role: 'Mariage', rating: 5 }, { id: '3', quote: 'La séance photo a été un moment magique. Le résultat dépasse toutes nos attentes, chaque cliché est une oeuvre d\'art.', author: 'Thomas B.', role: 'Événement corporate', rating: 5 }] }, style: { background: 'dark' as any, paddingY: 'xl' }, visible: true },
      { type: 'cta', variant: 'obscura-centered', content: { title: 'Racontons votre histoire', subtitle: 'Chaque image mérite d\'être exceptionnelle', primaryButton: { label: 'Réserver une séance', href: '/contact', variant: 'outline' }, backgroundImage: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1920&q=85' }, style: { background: 'dark' as any, paddingY: 'xl' }, visible: true },
      { type: 'cta', variant: 'brixsa-centered', content: { title: 'Prêt à capturer vos moments les plus précieux ?', subtitle: 'Contactez\nle studio', primaryButton: { label: 'Réserver', href: '/contact', variant: 'secondary' }, backgroundImage: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1920&q=85' }, style: { background: 'dark' as any, paddingY: 'xl' }, visible: true },
      { type: 'site-footer', variant: 'obscura', content: { logo: 'OBSCURA', tagline: 'L\'art de capturer l\'instant.', copyright: `© ${year} Obscura Photography. Tous droits réservés.`, columns: [{ id: '1', title: 'Navigation', links: [{ id: '1', label: 'Accueil', href: '/' }, { id: '2', label: 'Portfolio', href: '/portfolio' }, { id: '3', label: 'Services', href: '/services' }, { id: '4', label: 'À Propos', href: '/a-propos' }, { id: '5', label: 'Contact', href: '/contact' }] }, { id: '2', title: 'Services', links: [{ id: '1', label: 'Portrait', href: '/services#portrait' }, { id: '2', label: 'Mariage', href: '/services#mariage' }, { id: '3', label: 'Événement', href: '/services#evenement' }] }, { id: '3', title: 'Contact', links: [{ id: '1', label: '06 12 34 56 78', href: 'tel:0612345678' }, { id: '2', label: 'hello@obscura-photo.fr', href: 'mailto:hello@obscura-photo.fr' }, { id: '3', label: '15 Rue de la Lumière, 75003 Paris', href: '#' }] }], socials: { instagram: '#', behance: '#', vimeo: '#' } }, style: { background: 'dark' as any, paddingY: 'none' }, visible: true },
    ],
  },

  // ─── Braise — Restaurant Gastronomique ───
  {
    id: 'restaurant-braise',
    name: 'Braise',
    description: 'Template restaurant gastronomique \u2014 noir profond, or chaud, glassmorphism, slider diagonal wipe, accord\u00E9on menu',
    category: 'restaurant',
    universe: 'luxe',
    emoji: '\uD83C\uDF7D\uFE0F',
    preview: 'from-amber-800 to-stone-950',
    sections: [
      { type: 'site-header', variant: 'braise', content: { logo: 'Braise', links: [{ id: '1', label: 'Accueil', href: '/' }, { id: '2', label: 'La Carte', href: '/la-carte' }, { id: '3', label: 'Notre Histoire', href: '/notre-histoire' }, { id: '4', label: 'R\u00E9servation', href: '/reservation' }, { id: '5', label: '\u00C9v\u00E9nements', href: '/evenements' }, { id: '6', label: 'Contact', href: '/contact' }], ctaLabel: 'Menu', ctaHref: '#' }, style: { background: 'dark' as any, paddingY: 'none' }, visible: true },
      { type: 'hero', variant: 'braise', content: { title: 'L\'Art de la Gastronomie', subtitle: 'RESTAURANT GASTRONOMIQUE \u2014 PARIS', primaryButton: { label: 'R\u00E9server', href: '/reservation', variant: 'primary' }, heroImages: [{ id: '1', src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80', alt: 'Plat gastronomique' }, { id: '2', src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1920&q=80', alt: 'Salle du restaurant' }, { id: '3', src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1920&q=80', alt: 'Chef en cuisine' }] }, style: { background: 'dark' as any, paddingY: 'xl' }, visible: true },
      { type: 'gallery-grid', variant: 'braise-menu', content: { title: 'La Carte', subtitle: 'D\u00E9couvrir nos plats', items: [{ id: '1', title: 'Tartare de Boeuf Wagyu', duration: 'Entr\u00E9e', price: '32\u20AC', description: 'Wagyu A5, jaune d\u2019\u0153uf confit, c\u00E2pres, vinaigrette truff\u00E9e', image: 'https://images.unsplash.com/photo-1546039907-7e6588d38a64?w=800&q=80' }, { id: '2', title: 'Homard Bleu R\u00F4ti', duration: 'Plat', price: '58\u20AC', description: 'Beurre de corail, \u00E9mulsion champagne, l\u00E9gumes de saison', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80' }, { id: '3', title: 'Filet de Canette Laqu\u00E9e', duration: 'Plat', price: '45\u20AC', description: 'Laqu\u00E9e au miel de lavande, navets glac\u00E9s, jus r\u00E9duit', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80' }, { id: '4', title: 'Saint-Jacques Po\u00EAl\u00E9es', duration: 'Entr\u00E9e', price: '36\u20AC', description: 'Noix de Saint-Jacques, pur\u00E9e de c\u00E9leri-rave, beurre noisette', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80' }, { id: '5', title: 'Souffl\u00E9 au Grand Marnier', duration: 'Dessert', price: '22\u20AC', description: 'Souffl\u00E9 a\u00E9rien, cr\u00E8me anglaise vanille Bourbon', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80' }, { id: '6', title: 'Sph\u00E8re Chocolat Valrhona', duration: 'Dessert', price: '24\u20AC', description: 'Chocolat noir 70%, coeur fruit de la passion, \u00E9clats pralin\u00E9', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80' }] }, style: { background: 'dark' as any, paddingY: 'xl' }, visible: true },
      { type: 'image-text', variant: 'braise-story', content: { title: 'Une passion transmise de g\u00E9n\u00E9ration en g\u00E9n\u00E9ration', subtitle: 'Depuis 15 ans, le Chef Antoine Moreau sublime les produits d\u2019exception dans un \u00E9crin de raffinement.', body: 'Form\u00E9 aupr\u00E8s des plus grands noms de la gastronomie fran\u00E7aise, il compose une cuisine d\u2019auteur audacieuse et g\u00E9n\u00E9reuse. Chaque assiette raconte une histoire, chaque saveur r\u00E9v\u00E8le un terroir. Notre brigade s\u2019engage quotidiennement \u00E0 offrir une exp\u00E9rience culinaire inoubliable.', description: '', primaryButton: { label: 'Notre histoire', href: '/notre-histoire', variant: 'outline' }, counters: [{ id: '1', value: '2', suffix: '\u2605', label: '\u00C9toiles Michelin' }, { id: '2', value: '15', suffix: '+', label: 'Ann\u00E9es d\u2019excellence' }, { id: '3', value: '98', suffix: '%', label: 'Clients satisfaits' }] }, style: { background: 'dark' as any, paddingY: 'xl' }, visible: true },
      { type: 'features', variant: 'braise-accordion', content: { title: 'Nos Univers', items: [{ id: '1', icon: '\uD83C\uDF7D\uFE0F', title: 'La Salle', description: 'Un cadre \u00E9l\u00E9gant et intimiste, 45 couverts, vue sur les cuisines ouvertes', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80' }, { id: '2', icon: '\uD83C\uDF77', title: 'La Cave', description: 'Plus de 500 r\u00E9f\u00E9rences, s\u00E9lection du sommelier, accords mets-vins sur mesure', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&q=80' }, { id: '3', icon: '\uD83C\uDF3F', title: 'Le Jardin', description: 'Terrasse priv\u00E9e, herbes aromatiques cultiv\u00E9es sur place, brunchs dominicaux', image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&q=80' }] }, style: { background: 'dark' as any, paddingY: 'xl' }, visible: true },
      { type: 'slider', variant: 'braise-parallax', content: { title: 'Ambiances', slides: [{ id: '1', title: 'Soir\u00E9e D\u00E9gustation', subtitle: 'Un voyage gustatif en 7 services, accord\u00E9 par notre sommelier', badge: '\u00C9v\u00E9nement', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80' }, { id: '2', title: 'D\u00EEner aux Chandelles', subtitle: 'L\u2019intimit\u00E9 d\u2019un moment hors du temps dans un cadre d\u2019exception', badge: 'Romantique', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80' }, { id: '3', title: 'Brunch du Dimanche', subtitle: 'P\u00E2tisseries maison, oeufs Benedict, jus press\u00E9s et champagne', badge: 'Week-end', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80' }] }, style: { background: 'dark' as any, paddingY: 'none' }, visible: true },
      { type: 'testimonials', variant: 'braise-featured', content: { eyebrow: 'Ce que disent nos convives', title: 'T\u00E9moignages', items: [{ id: '1', quote: 'Une exp\u00E9rience gastronomique absolument remarquable. Chaque plat est une \u0153uvre d\u2019art, le service est imp\u00E9cable.', author: 'Philippe D.', role: 'Critique gastronomique', rating: 5 }, { id: '2', quote: 'Le menu d\u00E9gustation est un voyage sensoriel inoubliable. Les accords mets-vins sont d\u2019une pr\u00E9cision rare.', author: 'Isabelle M.', role: 'Sommelière', rating: 5 }, { id: '3', quote: 'Nous y c\u00E9l\u00E9brons chaque anniversaire depuis 5 ans. La constance de l\u2019excellence est ce qui nous fait revenir.', author: 'Marc & Sophie L.', role: 'Clients fid\u00E8les', rating: 5 }] }, style: { background: 'dark' as any, paddingY: 'xl' }, visible: true },
      { type: 'cta', variant: 'brixsa-centered', content: { title: 'Vivez une exp\u00E9rience gastronomique inoubliable', subtitle: 'R\u00E9servez\nvotre table', primaryButton: { label: 'R\u00E9server', href: '/reservation', variant: 'secondary' }, backgroundImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80' }, style: { background: 'dark' as any, paddingY: 'xl' }, visible: true },
      { type: 'site-footer', variant: 'braise', content: { logo: 'Braise', copyright: `\u00A9 ${year} Braise. Tous droits r\u00E9serv\u00E9s.`, columns: [{ id: '1', title: 'Navigation', links: [{ id: '1', label: 'Accueil', href: '/' }, { id: '2', label: 'La Carte', href: '/la-carte' }, { id: '3', label: 'Notre Histoire', href: '/notre-histoire' }, { id: '4', label: 'R\u00E9servation', href: '/reservation' }, { id: '5', label: '\u00C9v\u00E9nements', href: '/evenements' }] }, { id: '2', title: 'La Carte', links: [{ id: '1', label: 'Menu D\u00E9gustation', href: '/la-carte#degustation' }, { id: '2', label: 'Carte des Vins', href: '/la-carte#vins' }, { id: '3', label: 'Menu Brunch', href: '/la-carte#brunch' }, { id: '4', label: 'Menu V\u00E9g\u00E9tarien', href: '/la-carte#vegetarien' }] }, { id: '3', title: 'Contact', links: [{ id: '1', label: '12 Rue du Faubourg Saint-Honor\u00E9, 75008 Paris', href: '#' }, { id: '2', label: '01 42 65 78 90', href: 'tel:0142657890' }, { id: '3', label: 'reservation@braise-paris.fr', href: 'mailto:reservation@braise-paris.fr' }] }], socials: { instagram: '#', facebook: '#' } }, style: { background: 'dark' as any, paddingY: 'none' }, visible: true },
    ],
  },

  // ─── Forge — Coach Sportif ───
  {
    id: 'coach-forge',
    name: 'Forge',
    description: 'Template coach sportif premium \u2014 noir profond, orange \u00E9lectrique, glassmorphism, slider diagonal wipe, programmes fitness',
    category: 'coach',
    universe: 'luxe' as TemplateUniverse,
    emoji: '\uD83D\uDCAA',
    preview: 'from-orange-600 to-stone-950',
    sections: [
      { type: 'site-header', variant: 'forge', content: { logo: 'Forge', links: [{ id: '1', label: 'Accueil', href: '/' }, { id: '2', label: 'Programmes', href: '/programmes' }, { id: '3', label: 'Coaching', href: '/coaching' }, { id: '4', label: 'Transformation', href: '/transformation' }, { id: '5', label: 'Tarifs', href: '/tarifs' }, { id: '6', label: 'Contact', href: '/contact' }], ctaLabel: 'Menu', ctaHref: '#' }, style: { background: 'dark' as any, paddingY: 'none' }, visible: true },
      { type: 'hero', variant: 'forge', content: { title: 'Forgez Votre Meilleure Version', subtitle: 'COACH SPORTIF \u2014 PARIS', primaryButton: { label: 'D\u00E9couvrir', href: '/programmes', variant: 'primary' }, heroImages: [{ id: '1', src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=85', alt: 'Salle de musculation' }, { id: '2', src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1920&q=85', alt: 'Entra\u00EEnement intensif' }, { id: '3', src: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=1920&q=85', alt: 'Outdoor training' }] }, style: { background: 'dark' as any, paddingY: 'xl' }, visible: true },
      { type: 'gallery-grid', variant: 'forge-programs', content: { title: 'Programmes', subtitle: 'D\u00E9couvrir nos programmes', items: [{ id: '1', title: 'Prise de Masse', duration: '12 semaines', price: '349\u20AC', description: 'Programme intensif hypertrophie, nutrition calibr\u00E9e, suivi hebdomadaire', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=85' }, { id: '2', title: 'S\u00E8che & D\u00E9finition', duration: '8 semaines', price: '299\u20AC', description: 'Cardio HIIT, alimentation contr\u00F4l\u00E9e, sculptures des muscles', image: 'https://images.unsplash.com/photo-1550345332-09e3ac987658?w=800&q=85' }, { id: '3', title: 'Force Athl\u00E9tique', duration: '16 semaines', price: '449\u20AC', description: 'Squat, deadlift, bench press \u2014 progressions scientifiques', image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=85' }, { id: '4', title: 'HIIT & Cardio', duration: '6 semaines', price: '199\u20AC', description: 'S\u00E9ances explosives 30 min, br\u00FBlage maximal, aucun mat\u00E9riel', image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=800&q=85' }, { id: '5', title: 'Remise en Forme', duration: '10 semaines', price: '279\u20AC', description: 'Red\u00E9marrage progressif, mobilit\u00E9, renforcement global', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=85' }, { id: '6', title: 'Coaching VIP', duration: 'Sur mesure', price: 'Sur devis', description: 'Accompagnement 100% personnalis\u00E9, disponibilit\u00E9 7j/7', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=85' }] }, style: { background: 'dark' as any, paddingY: 'xl' }, visible: true },
      { type: 'image-text', variant: 'forge-story', content: { title: 'Plus qu\u2019un coach, un partenaire de transformation', subtitle: 'Depuis 12 ans, Coach Alex forge des corps et des mentalit\u00E9s d\u2019acier dans un cadre d\u2019excellence.', body: 'Ancien athl\u00E8te de haut niveau, certifi\u00E9 NSCA et sp\u00E9cialiste en pr\u00E9paration physique, il con\u00E7oit des programmes sur mesure bas\u00E9s sur la science du sport. Chaque client b\u00E9n\u00E9ficie d\u2019un suivi individualis\u00E9, d\u2019un plan nutritionnel adapt\u00E9 et d\u2019une motivation sans faille.', description: '', primaryButton: { label: '\u00C0 propos', href: '/coaching', variant: 'outline' }, counters: [{ id: '1', value: '12', suffix: '+', label: 'Ann\u00E9es d\u2019exp\u00E9rience' }, { id: '2', value: '500', suffix: '+', label: 'Clients transform\u00E9s' }, { id: '3', value: '98', suffix: '%', label: 'Taux de satisfaction' }] }, style: { background: 'dark' as any, paddingY: 'xl' }, visible: true },
      { type: 'features', variant: 'forge-accordion', content: { title: 'Nos Formules', items: [{ id: '1', icon: '\uD83C\uDFCB\uFE0F', title: 'Coaching Priv\u00E9', description: 'S\u00E9ances individuelles en salle ou \u00E0 domicile, programme 100% personnalis\u00E9, suivi nutrition', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=85' }, { id: '2', icon: '\uD83D\uDC65', title: 'Cours Collectifs', description: 'Sessions dynamiques en petit groupe (6 max), HIIT, circuit training, bootcamp', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=85' }, { id: '3', icon: '\uD83C\uDF4E', title: 'Nutrition', description: 'Plans alimentaires sur mesure, suivi macro, recettes adapt\u00E9es \u00E0 vos objectifs', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&q=85' }] }, style: { background: 'dark' as any, paddingY: 'xl' }, visible: true },
      { type: 'slider', variant: 'forge-parallax', content: { title: 'Ambiances', slides: [{ id: '1', title: 'La Salle', subtitle: 'Un espace premium de 400m\u00B2 \u00E9quip\u00E9 des meilleures machines Technogym', badge: 'Indoor', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=85' }, { id: '2', title: 'Outdoor Training', subtitle: 'S\u00E9ances en plein air au Bois de Boulogne, TRX, kettlebells et \u00E9nergie pure', badge: 'Outdoor', image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=1920&q=85' }, { id: '3', title: 'Transformations', subtitle: 'Des r\u00E9sultats visibles en 12 semaines gr\u00E2ce \u00E0 un suivi rigoureux et personnalis\u00E9', badge: 'R\u00E9sultats', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1920&q=85' }] }, style: { background: 'dark' as any, paddingY: 'none' }, visible: true },
      { type: 'testimonials', variant: 'forge-featured', content: { eyebrow: 'Ce que disent nos athl\u00E8tes', title: 'T\u00E9moignages', items: [{ id: '1', quote: 'En 3 mois, j\u2019ai perdu 15 kg et gagn\u00E9 une confiance que je n\u2019avais jamais eue. Coach Alex m\u2019a litt\u00E9ralement transform\u00E9.', author: 'Marc D.', role: 'Prise de masse \u2014 12 semaines', rating: 5 }, { id: '2', quote: 'Les cours collectifs sont incroyables. L\u2019\u00E9nergie du groupe et le coaching pr\u00E9cis font toute la diff\u00E9rence.', author: 'Sarah L.', role: 'Cours collectifs \u2014 6 mois', rating: 5 }, { id: '3', quote: 'Le programme nutrition a chang\u00E9 ma vie. Pour la premi\u00E8re fois, je comprends ce que je mange et pourquoi.', author: 'Thomas B.', role: 'Coaching VIP \u2014 1 an', rating: 5 }] }, style: { background: 'dark' as any, paddingY: 'xl' }, visible: true },
      { type: 'cta', variant: 'brixsa-centered', content: { title: 'Pr\u00EAt \u00E0 transformer votre corps et votre mental ?', subtitle: 'R\u00E9servez\nvotre essai', primaryButton: { label: 'Essai gratuit', href: '/contact', variant: 'secondary' }, backgroundImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=85' }, style: { background: 'dark' as any, paddingY: 'xl' }, visible: true },
      { type: 'site-footer', variant: 'forge', content: { logo: 'Forge', copyright: `\u00A9 ${year} Forge. Tous droits r\u00E9serv\u00E9s.`, columns: [{ id: '1', title: 'Programmes', links: [{ id: '1', label: 'Prise de Masse', href: '/programmes#masse' }, { id: '2', label: 'S\u00E8che & D\u00E9finition', href: '/programmes#seche' }, { id: '3', label: 'Force Athl\u00E9tique', href: '/programmes#force' }, { id: '4', label: 'HIIT & Cardio', href: '/programmes#hiit' }, { id: '5', label: 'Remise en Forme', href: '/programmes#remise' }] }, { id: '2', title: 'Coaching', links: [{ id: '1', label: 'Coaching Priv\u00E9', href: '/coaching#prive' }, { id: '2', label: 'Cours Collectifs', href: '/coaching#collectifs' }, { id: '3', label: 'Nutrition', href: '/coaching#nutrition' }, { id: '4', label: 'Coaching VIP', href: '/coaching#vip' }] }, { id: '3', title: 'Contact', links: [{ id: '1', label: '42 Avenue Victor Hugo, 75016 Paris', href: '#' }, { id: '2', label: '06 78 90 12 34', href: 'tel:0678901234' }, { id: '3', label: 'contact@forge-coaching.fr', href: 'mailto:contact@forge-coaching.fr' }] }], socials: { instagram: '#', youtube: '#' } }, style: { background: 'dark' as any, paddingY: 'none' }, visible: true },
    ],
  },

  // ─── Ciseaux — Salon de Coiffure ───
  {
    id: 'coiffeur-ciseaux',
    name: 'Ciseaux',
    description: 'Template salon de coiffure premium \u2014 noir profond, cuivr\u00E9 rose gold, glassmorphism, slider diagonal wipe, galerie r\u00E9alisations',
    category: 'coiffeur',
    universe: 'luxe' as TemplateUniverse,
    emoji: '\u2702\uFE0F',
    preview: 'from-rose-400 to-stone-950',
    sections: [
      { type: 'site-header', variant: 'ciseaux', content: { logo: 'Ciseaux', links: [{ id: '1', label: 'Accueil', href: '/' }, { id: '2', label: 'Prestations', href: '/prestations' }, { id: '3', label: 'Galerie', href: '/galerie' }, { id: '4', label: 'L\u2019\u00C9quipe', href: '/equipe' }, { id: '5', label: 'Tarifs', href: '/tarifs' }, { id: '6', label: 'Contact', href: '/contact' }], ctaLabel: 'Menu', ctaHref: '#' }, style: { background: 'dark' as any, paddingY: 'none' }, visible: true },
      { type: 'hero', variant: 'ciseaux', content: { title: 'L\u2019\u00C9l\u00E9gance au Naturel', subtitle: 'SALON DE COIFFURE \u2014 PARIS', primaryButton: { label: 'R\u00E9server', href: '/contact', variant: 'primary' }, heroImages: [{ id: '1', src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80', alt: 'Salon de coiffure' }, { id: '2', src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1920&q=80', alt: 'Coupe de cheveux' }, { id: '3', src: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=1920&q=80', alt: 'Coloration' }] }, style: { background: 'dark' as any, paddingY: 'xl' }, visible: true },
      { type: 'gallery-grid', variant: 'ciseaux-realisations', content: { title: 'Nos R\u00E9alisations', subtitle: 'D\u00E9couvrir nos coiffures', items: [{ id: '1', title: 'Balayage Californien', duration: 'Coloration', price: '180\u20AC', description: 'Technique balayage pour un effet soleil naturel, reflets dor\u00E9s et lumineux', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80' }, { id: '2', title: 'Coupe Structur\u00E9e', duration: 'Coupe', price: '85\u20AC', description: 'Coupe g\u00E9om\u00E9trique pr\u00E9cise, lignes nettes et volume ma\u00EEtris\u00E9', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80' }, { id: '3', title: 'Chignon de Mari\u00E9e', duration: '\u00C9v\u00E9nement', price: '220\u20AC', description: 'Chignon \u00E9l\u00E9gant et romantique pour le plus beau jour de votre vie', image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&q=80' }, { id: '4', title: 'Ombr\u00E9 Hair Rose Gold', duration: 'Coloration', price: '200\u20AC', description: 'D\u00E9grad\u00E9 subtil vers des tons ros\u00E9s cuivr\u00E9s, tendance et raffin\u00E9', image: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=800&q=80' }, { id: '5', title: 'Coupe Homme Classique', duration: 'Coupe', price: '55\u20AC', description: 'Coupe soign\u00E9e, d\u00E9grad\u00E9 impeccable, finitions \u00E0 la tondeuse', image: 'https://images.unsplash.com/photo-1503951914875-452d30030756?w=800&q=80' }, { id: '6', title: 'Lissage Br\u00E9silien', duration: 'Soin', price: '250\u20AC', description: 'Lissage longue dur\u00E9e \u00E0 la k\u00E9ratine, cheveux soyeux pendant 3 mois', image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80' }] }, style: { background: 'dark' as any, paddingY: 'xl' }, visible: true },
      { type: 'image-text', variant: 'ciseaux-story', content: { title: 'Un savoir-faire transmis avec passion', subtitle: 'Depuis 20 ans, notre \u00E9quipe de stylistes sublimers votre beaut\u00E9 naturelle dans un cadre rafin\u00E9.', body: 'Fond\u00E9 par une passionn\u00E9e de la coiffure et form\u00E9e aupr\u00E8s des plus grands noms parisiens, Ciseaux est bien plus qu\u2019un salon. C\u2019est un espace o\u00F9 chaque client est unique, chaque coupe est une cr\u00E9ation sur mesure. Nos artisans capillaires s\u2019engagent \u00E0 r\u00E9v\u00E9ler le meilleur de chaque chevelure.', description: '', primaryButton: { label: 'Notre histoire', href: '/equipe', variant: 'outline' }, counters: [{ id: '1', value: '20', suffix: '+', label: 'Ann\u00E9es d\u2019exp\u00E9rience' }, { id: '2', value: '3', suffix: '', label: 'Stylistes experts' }, { id: '3', value: '5000', suffix: '+', label: 'Clients satisfaits' }] }, style: { background: 'dark' as any, paddingY: 'xl' }, visible: true },
      { type: 'features', variant: 'ciseaux-accordion', content: { title: 'Nos Prestations', items: [{ id: '1', icon: '\u2702\uFE0F', title: 'Coupes', description: 'Coupes femme, homme et enfant, personnalis\u00E9es selon votre morphologie et votre style de vie', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80' }, { id: '2', icon: '\uD83C\uDFA8', title: 'Coloration', description: 'Balayage, m\u00E8ches, ombr\u00E9, couleur compl\u00E8te \u2014 des techniques ma\u00EEtris\u00E9es pour un r\u00E9sultat naturel', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=80' }, { id: '3', icon: '\uD83E\uDDD4', title: 'Barbe & Soins', description: 'Taille de barbe, rasage traditionnel, soins capillaires profonds et rituels bien-\u00EAtre', image: 'https://images.unsplash.com/photo-1503951914875-452d30030756?w=1200&q=80' }] }, style: { background: 'dark' as any, paddingY: 'xl' }, visible: true },
      { type: 'slider', variant: 'ciseaux-parallax', content: { title: 'Ambiances', slides: [{ id: '1', title: 'Le Salon', subtitle: 'Un espace lumineux et chaleureux, d\u00E9cor\u00E9 avec go\u00FBt, o\u00F9 chaque d\u00E9tail compte', badge: 'Int\u00E9rieur', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80' }, { id: '2', title: 'L\u2019Exp\u00E9rience', subtitle: 'Un moment de d\u00E9tente et de bien-\u00EAtre, accompagn\u00E9 d\u2019un caf\u00E9 ou d\u2019un th\u00E9', badge: 'Bien-\u00EAtre', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1920&q=80' }, { id: '3', title: 'Les Produits', subtitle: 'S\u00E9lection exclusive de soins haut de gamme pour prolonger l\u2019\u00E9clat de vos cheveux', badge: 'Premium', image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=1920&q=80' }] }, style: { background: 'dark' as any, paddingY: 'none' }, visible: true },
      { type: 'testimonials', variant: 'ciseaux-featured', content: { eyebrow: 'Ce que disent nos clients', title: 'T\u00E9moignages', items: [{ id: '1', quote: 'Un salon d\u2019exception. Mon balayage est exactement ce que je voulais, naturel et lumineux. L\u2019\u00E9quipe est \u00E0 l\u2019\u00E9coute et le r\u00E9sultat est toujours parfait.', author: 'Camille R.', role: 'Cliente fid\u00E8le \u2014 3 ans', rating: 5 }, { id: '2', quote: 'La meilleure coupe que j\u2019ai jamais eue. Le coiffeur a pris le temps de comprendre ce que je voulais et le r\u00E9sultat d\u00E9passe mes attentes.', author: 'Antoine M.', role: 'Coupe homme \u2014 r\u00E9gulier', rating: 5 }, { id: '3', quote: 'Mon chignon de mariage \u00E9tait absolument magnifique. Toutes mes invit\u00E9es m\u2019ont demand\u00E9 l\u2019adresse du salon. Merci infiniment !', author: 'Julie & Pierre D.', role: 'Coiffure de mariage', rating: 5 }] }, style: { background: 'dark' as any, paddingY: 'xl' }, visible: true },
      { type: 'cta', variant: 'brixsa-centered', content: { title: 'Offrez-vous une exp\u00E9rience coiffure d\u2019exception', subtitle: 'Prenez\nrendez-vous', primaryButton: { label: 'R\u00E9server', href: '/contact', variant: 'secondary' }, backgroundImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80' }, style: { background: 'dark' as any, paddingY: 'xl' }, visible: true },
      { type: 'site-footer', variant: 'ciseaux', content: { logo: 'Ciseaux', copyright: `\u00A9 ${year} Ciseaux. Tous droits r\u00E9serv\u00E9s.`, columns: [{ id: '1', title: 'Navigation', links: [{ id: '1', label: 'Accueil', href: '/' }, { id: '2', label: 'Prestations', href: '/prestations' }, { id: '3', label: 'Galerie', href: '/galerie' }, { id: '4', label: 'L\u2019\u00C9quipe', href: '/equipe' }, { id: '5', label: 'Tarifs', href: '/tarifs' }] }, { id: '2', title: 'Prestations', links: [{ id: '1', label: 'Coupes Femme', href: '/prestations#coupes-femme' }, { id: '2', label: 'Coupes Homme', href: '/prestations#coupes-homme' }, { id: '3', label: 'Coloration', href: '/prestations#coloration' }, { id: '4', label: 'Soins', href: '/prestations#soins' }] }, { id: '3', title: 'Contact', links: [{ id: '1', label: '8 Rue de la Paix, 75002 Paris', href: '#' }, { id: '2', label: '01 42 60 45 78', href: 'tel:0142604578' }, { id: '3', label: 'contact@ciseaux-paris.fr', href: 'mailto:contact@ciseaux-paris.fr' }] }], socials: { instagram: '#', facebook: '#' } }, style: { background: 'dark' as any, paddingY: 'none' }, visible: true },
    ],
  },
]
