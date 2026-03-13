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
  category: 'saas' | 'agency' | 'ecommerce' | 'portfolio' | 'startup' | 'blog' | 'real-estate' | 'photographe' | 'coach' | 'restaurant' | 'coiffeur' | 'architecte' | 'tatoueur' | 'beaute' | 'dj' | 'traiteur' | 'agency-models'
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

  // ─── 2. SaaS Enterprise ───
  {
    id: 'saas-enterprise',
    name: 'SaaS Enterprise',
    description: 'Solution B2B corporate avec comparatif pricing et preuves sociales',
    category: 'saas',
    universe: 'corporate',
    emoji: '🏢',
    preview: 'from-slate-700 to-zinc-800',
    sections: [
      { type: 'site-header', variant: 'corporate', content: { logo: 'Nexus Platform', links: [{ id: '1', label: 'Solutions', href: '#' }, { id: '2', label: 'Entreprise', href: '#' }, { id: '3', label: 'Ressources', href: '#' }], ctaLabel: 'Demander une démo', ctaHref: '#' }, style: { background: 'white', paddingY: 'none' }, visible: true },
      { type: 'hero', variant: 'corporate', content: { eyebrow: 'Plateforme unifiée', title: 'La plateforme qui centralise vos opérations', subtitle: 'Nexus connecte vos équipes, vos données et vos processus dans un seul espace sécurisé. Adopté par les équipes de +500 collaborateurs.', primaryButton: { label: 'Planifier une démo', href: '#', variant: 'primary' }, secondaryButton: { label: 'Lire le cas client', href: '#', variant: 'outline' } }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'logos', variant: 'corporate-strip', content: { title: 'Ils nous font confiance', items: [{ id: '1', name: 'BNP Paribas' }, { id: '2', name: 'Renault' }, { id: '3', name: 'L\'Oréal' }, { id: '4', name: 'Airbus' }, { id: '5', name: 'Société Générale' }] }, style: { background: 'light', paddingY: 'md' }, visible: true },
      { type: 'features', variant: 'corporate-grid', content: { eyebrow: 'Solutions', title: 'Une suite complète pour chaque département', subtitle: 'De la direction générale aux équipes terrain, Nexus s\'adapte à vos besoins.', items: [{ id: '1', icon: '🔗', title: 'Intégrations', description: 'Connectez Salesforce, SAP, Jira et 200+ outils en quelques clics.' }, { id: '2', icon: '📋', title: 'Workflows', description: 'Automatisez vos processus métier avec un éditeur visuel no-code.' }, { id: '3', icon: '🛡️', title: 'Sécurité', description: 'SSO, RBAC, audit logs et conformité SOC 2 Type II.' }, { id: '4', icon: '📈', title: 'Reporting', description: 'Tableaux de bord exécutifs avec drill-down en temps réel.' }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'stats', variant: 'corporate-highlight', content: { title: 'Impact mesurable', items: [{ id: '1', value: '40%', label: 'Gain de productivité', description: 'En moyenne chez nos clients' }, { id: '2', value: '2.5M€', label: 'Économies annuelles', description: 'Par entreprise cliente' }, { id: '3', value: '< 4h', label: 'Temps de déploiement', description: 'Avec notre équipe CSM' }] }, style: { background: 'light', paddingY: 'xl' }, visible: true },
      { type: 'testimonials', variant: 'corporate-grid', content: { eyebrow: 'Cas clients', title: 'Ce que disent nos partenaires', items: [{ id: '1', quote: 'Nexus a transformé notre façon de collaborer entre 12 bureaux internationaux.', author: 'Philippe Moreau', role: 'DSI', company: 'Groupe Industriel', rating: 5 }, { id: '2', quote: 'Le ROI a été visible dès le premier trimestre. Un investissement stratégique.', author: 'Anne-Claire Petit', role: 'DG', company: 'FinanceCorp', rating: 5 }, { id: '3', quote: 'La conformité RGPD intégrée nous a fait gagner 6 mois de travail juridique.', author: 'Marc Lefebvre', role: 'DPO', company: 'Assurance Plus', rating: 5 }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'pricing', variant: 'corporate-comparison', content: { eyebrow: 'Tarifs', title: 'Des plans adaptés à chaque organisation', subtitle: 'Facturation annuelle · Support inclus.', plans: [{ id: 'team', name: 'Team', price: '49€', period: '/utilisateur/mois', description: 'Jusqu\'à 50 utilisateurs', highlighted: false, cta: 'Essayer', ctaHref: '#', features: [{ text: 'Workflows illimités', included: true }, { text: '50 intégrations', included: true }, { text: 'Support email', included: true }, { text: 'SSO', included: false }] }, { id: 'business', name: 'Business', price: '89€', period: '/utilisateur/mois', description: 'Jusqu\'à 500 utilisateurs', highlighted: true, badge: 'Recommandé', cta: 'Demander une démo', ctaHref: '#', features: [{ text: 'Tout Team', included: true }, { text: '200+ intégrations', included: true }, { text: 'SSO + SCIM', included: true }, { text: 'Support prioritaire', included: true }] }, { id: 'enterprise', name: 'Enterprise', price: 'Sur mesure', period: '', description: 'Utilisateurs illimités', highlighted: false, cta: 'Nous contacter', ctaHref: '#', features: [{ text: 'Tout Business', included: true }, { text: 'SLA 99.99%', included: true }, { text: 'On-premise possible', included: true }, { text: 'CSM dédié', included: true }] }] }, style: { background: 'light', paddingY: 'xl' }, visible: true },
      { type: 'faq', variant: 'corporate-grid', content: { eyebrow: 'Questions', title: 'Réponses aux questions fréquentes', items: [{ id: '1', question: 'Quel est le délai de déploiement ?', answer: 'En moyenne 4 heures pour un déploiement cloud. Jusqu\'à 2 semaines pour un déploiement on-premise.' }, { id: '2', question: 'Proposez-vous de la formation ?', answer: 'Oui, formation initiale incluse + académie en ligne avec certifications.' }, { id: '3', question: 'Les données sont-elles hébergées en France ?', answer: 'Oui, hébergement exclusif dans des datacenters français certifiés SecNumCloud.' }, { id: '4', question: 'Puis-je migrer depuis un outil existant ?', answer: 'Notre équipe CSM accompagne chaque migration avec un plan personnalisé.' }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'cta', variant: 'corporate-split', content: { badge: 'Prêt à passer à l\'échelle ?', title: 'Discutons de vos enjeux', subtitle: 'Notre équipe vous accompagne de la démo au déploiement.', primaryButton: { label: 'Planifier une démo', href: '#', variant: 'primary' }, secondaryButton: { label: 'Télécharger le livre blanc', href: '#', variant: 'outline' } }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'site-footer', variant: 'corporate', content: { logo: 'Nexus Platform', tagline: 'La plateforme des entreprises performantes.', copyright: `© ${year} Nexus Platform. Tous droits réservés.`, columns: [{ id: '1', title: 'Plateforme', links: [{ id: '1', label: 'Solutions', href: '#' }, { id: '2', label: 'Sécurité', href: '#' }] }, { id: '2', title: 'Entreprise', links: [{ id: '1', label: 'À propos', href: '#' }, { id: '2', label: 'Carrières', href: '#' }] }], socials: { linkedin: '#', twitter: '#' } }, style: { background: 'dark', paddingY: 'none' }, visible: true },
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

  // ─── 7. Startup Waitlist ───
  {
    id: 'startup-waitlist',
    name: 'Startup Waitlist',
    description: 'Page de pré-lancement avec liste d\'attente et compte à rebours',
    category: 'startup',
    universe: 'glass',
    emoji: '⚡',
    preview: 'from-violet-600 to-indigo-600',
    sections: [
      { type: 'site-header', variant: 'glass', content: { logo: 'Lumina AI', links: [{ id: '1', label: 'Fonctionnalités', href: '#' }, { id: '2', label: 'À propos', href: '#' }], ctaLabel: 'Rejoindre', ctaHref: '#' }, style: { background: 'white', paddingY: 'none' }, visible: true },
      { type: 'hero', variant: 'glass', content: { eyebrow: 'Bientôt disponible · Accès anticipé', title: 'L\'assistant IA qui comprend vraiment votre business', subtitle: 'Lumina analyse vos données, prédit vos tendances et automatise vos décisions. Soyez parmi les premiers à l\'essayer.', primaryButton: { label: 'Rejoindre la liste d\'attente', href: '#waitlist', variant: 'primary' } }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'features', variant: 'glass-list', content: { eyebrow: 'Pourquoi Lumina', title: 'Ce qui nous rend différents', items: [{ id: '1', icon: '🎯', title: 'Précision chirurgicale', description: 'Prédictions avec 94% de fiabilité grâce à notre modèle propriétaire.' }, { id: '2', icon: '🔥', title: 'Résultats en 30 secondes', description: 'Analyse instantanée de vos données, pas besoin d\'attendre des heures.' }, { id: '3', icon: '💡', title: 'Zéro configuration', description: 'Connectez vos outils et Lumina comprend votre contexte automatiquement.' }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'stats', variant: 'glass-simple', content: { title: 'L\'engouement est réel', items: [{ id: '1', value: '3 200+', label: 'Inscrits sur la liste' }, { id: '2', value: '94%', label: 'Précision IA' }, { id: '3', value: '30s', label: 'Temps d\'analyse' }] }, style: { background: 'light', paddingY: 'xl' }, visible: true },
      { type: 'newsletter', variant: 'glass-centered', content: { eyebrow: 'Liste d\'attente', title: 'Rejoignez les early adopters', subtitle: '3 mois offerts pour les 1 000 premiers inscrits. Lancement prévu T2 2026.', placeholder: 'votre@email.com', buttonLabel: 'Rejoindre', socialProof: '3 200+ personnes déjà inscrites' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'cta', variant: 'glass-centered', content: { badge: 'Lancement T2 2026', title: 'Ne manquez pas le lancement', subtitle: 'Inscrivez-vous maintenant et bénéficiez d\'un accès prioritaire + 3 mois gratuits.', primaryButton: { label: 'S\'inscrire gratuitement', href: '#', variant: 'primary' } }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'site-footer', variant: 'glass', content: { logo: 'Lumina AI', tagline: 'L\'IA au service de votre croissance.', copyright: `© ${year} Lumina AI. Tous droits réservés.`, columns: [{ id: '1', title: 'Produit', links: [{ id: '1', label: 'Fonctionnalités', href: '#' }, { id: '2', label: 'Tarifs', href: '#' }] }], socials: { twitter: '#', linkedin: '#' } }, style: { background: 'dark', paddingY: 'none' }, visible: true },
    ],
  },

  // ─── 8. Startup App ───
  {
    id: 'startup-app',
    name: 'Startup App',
    description: 'Landing complète pour app mobile ou web avec onboarding et pricing',
    category: 'startup',
    universe: 'startup',
    emoji: '📱',
    preview: 'from-indigo-500 to-violet-600',
    sections: [
      { type: 'site-header', variant: 'startup', content: { logo: 'Taskly', links: [{ id: '1', label: 'Fonctionnalités', href: '#' }, { id: '2', label: 'Comment ça marche', href: '#' }, { id: '3', label: 'Tarifs', href: '#' }], ctaLabel: 'Télécharger', ctaHref: '#' }, style: { background: 'white', paddingY: 'none' }, visible: true },
      { type: 'hero', variant: 'startup', content: { eyebrow: '#1 sur le Product Hunt · 50K+ téléchargements', title: 'Organisez votre vie en toute simplicité', subtitle: 'Taskly est l\'app de productivité qui s\'adapte à votre façon de travailler. Listes, kanban, calendrier — tout en un.', primaryButton: { label: 'Télécharger gratuitement', href: '#', variant: 'primary' }, secondaryButton: { label: 'Voir la vidéo', href: '#', variant: 'outline' } }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'logos', variant: 'startup-strip', content: { title: 'Vu dans la presse', items: [{ id: '1', name: 'TechCrunch' }, { id: '2', name: 'Product Hunt' }, { id: '3', name: 'Les Échos' }, { id: '4', name: 'Maddyness' }] }, style: { background: 'light', paddingY: 'md' }, visible: true },
      { type: 'features', variant: 'startup-bento', content: { eyebrow: 'Fonctionnalités', title: 'Tout pour être productif', subtitle: 'Les outils essentiels, sans la complexité.', items: [{ id: '1', icon: '📋', title: 'Vues multiples', description: 'Liste, kanban, calendrier, timeline — choisissez la vue qui vous convient.' }, { id: '2', icon: '🔔', title: 'Rappels intelligents', description: 'L\'IA détecte vos habitudes et vous rappelle au bon moment.' }, { id: '3', icon: '👥', title: 'Espaces d\'équipe', description: 'Collaborez avec votre équipe, partagez des tâches et suivez l\'avancement.' }, { id: '4', icon: '🔗', title: 'Intégrations', description: 'Slack, Google Calendar, Notion, GitHub — tout connecté.' }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'steps', variant: 'startup-horizontal', content: { eyebrow: 'Comment ça marche', title: 'Opérationnel en 3 étapes', items: [{ id: '1', step: '1', title: 'Créez un compte', description: 'Inscription en 30 secondes avec Google ou email.' }, { id: '2', step: '2', title: 'Importez vos tâches', description: 'Depuis Trello, Asana, Todoist ou un simple fichier CSV.' }, { id: '3', step: '3', title: 'Commencez à produire', description: 'L\'IA organise vos priorités et vous guide au quotidien.' }] }, style: { background: 'light', paddingY: 'xl' }, visible: true },
      { type: 'testimonials', variant: 'startup-marquee', content: { eyebrow: 'Avis', title: '50 000+ utilisateurs conquis', items: [{ id: '1', quote: 'Taskly a remplacé 3 apps dans mon workflow quotidien. Indispensable.', author: 'Emma Richard', role: 'Freelance', company: 'Designer indépendante', rating: 5 }, { id: '2', quote: 'Mon équipe de 15 personnes l\'a adopté en une semaine. Record battu.', author: 'Karim Benali', role: 'CTO', company: 'StartupFlow', rating: 5 }, { id: '3', quote: 'Les rappels IA sont bluffants. On dirait que l\'app me connaît.', author: 'Julie Moreau', role: 'PM', company: 'AgencyPlus', rating: 5 }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'pricing', variant: 'startup-columns', content: { eyebrow: 'Tarifs', title: 'Gratuit pour commencer, puissant pour scaler', plans: [{ id: 'free', name: 'Free', price: '0€', period: '/mois', description: 'Pour les particuliers', highlighted: false, cta: 'Commencer', ctaHref: '#', features: [{ text: '5 projets', included: true }, { text: 'Rappels basiques', included: true }, { text: 'Intégrations', included: false }] }, { id: 'pro', name: 'Pro', price: '9€', period: '/mois', description: 'Pour les pros', highlighted: true, badge: 'Populaire', cta: 'Essai gratuit', ctaHref: '#', features: [{ text: 'Projets illimités', included: true }, { text: 'Rappels IA', included: true }, { text: 'Toutes intégrations', included: true }] }, { id: 'team', name: 'Team', price: '19€', period: '/membre/mois', description: 'Pour les équipes', highlighted: false, cta: 'Essayer', ctaHref: '#', features: [{ text: 'Tout Pro', included: true }, { text: 'Espaces d\'équipe', included: true }, { text: 'Admin & permissions', included: true }] }] }, style: { background: 'light', paddingY: 'xl' }, visible: true },
      { type: 'cta', variant: 'startup-card', content: { badge: 'Gratuit · Pas de CB requise', title: 'Prêt à reprendre le contrôle de vos journées ?', subtitle: 'Rejoignez 50 000+ utilisateurs qui gèrent leur temps avec Taskly.', primaryButton: { label: 'Télécharger Taskly', href: '#', variant: 'primary' } }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'site-footer', variant: 'startup', content: { logo: 'Taskly', tagline: 'La productivité, simplement.', copyright: `© ${year} Taskly. Tous droits réservés.`, columns: [{ id: '1', title: 'Produit', links: [{ id: '1', label: 'Fonctionnalités', href: '#' }, { id: '2', label: 'Tarifs', href: '#' }] }, { id: '2', title: 'Communauté', links: [{ id: '1', label: 'Blog', href: '#' }, { id: '2', label: 'Discord', href: '#' }] }], socials: { twitter: '#', github: '#' } }, style: { background: 'dark', paddingY: 'none' }, visible: true },
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

  // ─── 10. E-commerce Luxe ───
  {
    id: 'ecommerce-luxe',
    name: 'E-commerce Luxe',
    description: 'Boutique haut de gamme avec galerie produits et newsletter élégante',
    category: 'ecommerce',
    universe: 'luxe',
    emoji: '💎',
    preview: 'from-amber-500 to-orange-600',
    sections: [
      { type: 'site-header', variant: 'luxe', content: { logo: 'MAISON ÉCLAT', links: [{ id: '1', label: 'Collection', href: '#' }, { id: '2', label: 'L\'Atelier', href: '#' }, { id: '3', label: 'Boutiques', href: '#' }], ctaLabel: 'Panier', ctaHref: '#' }, style: { background: 'white', paddingY: 'none' }, visible: true },
      { type: 'hero', variant: 'luxe', content: { eyebrow: 'COLLECTION AUTOMNE-HIVER 2026', title: 'L\'élégance dans chaque détail', subtitle: 'Découvrez notre nouvelle collection de maroquinerie artisanale. Cuir italien, cousu main, numéroté.', primaryButton: { label: 'Découvrir la collection', href: '#', variant: 'primary' } }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'gallery-grid', variant: 'luxe-grid', content: { eyebrow: 'Lookbook', title: 'Pièces phares', items: [{ id: '1', title: 'Sac Éclat Classique', category: 'Maroquinerie' }, { id: '2', title: 'Pochette Soirée', category: 'Accessoires' }, { id: '3', title: 'Portefeuille Signature', category: 'Petite maroquinerie' }, { id: '4', title: 'Ceinture Artisanale', category: 'Accessoires' }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'product-grid', variant: 'luxe-grid', content: { eyebrow: 'Boutique', title: 'Pièces d\'exception', items: [{ id: '1', name: 'Sac Éclat Noir', price: '890€', badge: 'Exclusif' }, { id: '2', name: 'Pochette Dorée', price: '450€', badge: 'Nouveau' }, { id: '3', name: 'Portefeuille Cognac', price: '290€' }, { id: '4', name: 'Ceinture Cuir Lisse', price: '195€' }] }, style: { background: 'light', paddingY: 'xl' }, visible: true },
      { type: 'testimonials', variant: 'luxe-featured', content: { eyebrow: 'Témoignages', title: 'L\'avis de nos clients', items: [{ id: '1', quote: 'La qualité du cuir est exceptionnelle. Mon sac Éclat est devenu mon indispensable au quotidien.', author: 'Isabelle Fontaine', role: 'Cliente fidèle', company: 'Paris', rating: 5 }, { id: '2', quote: 'Un savoir-faire artisanal qui se voit et se sent. C\'est un investissement, pas un achat.', author: 'Catherine Marchand', role: 'Collectionneuse', company: 'Lyon', rating: 5 }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'newsletter', variant: 'luxe-centered', content: { eyebrow: 'Newsletter', title: 'Restez informé de nos nouveautés', subtitle: 'Inscrivez-vous pour recevoir nos collections en avant-première et nos offres exclusives.', placeholder: 'votre@email.com', buttonLabel: 'S\'inscrire' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'site-footer', variant: 'luxe', content: { logo: 'MAISON ÉCLAT', tagline: 'Maroquinerie artisanale française depuis 1987.', copyright: `© ${year} Maison Éclat. Tous droits réservés.`, columns: [{ id: '1', title: 'Maison', links: [{ id: '1', label: 'Notre histoire', href: '#' }, { id: '2', label: 'L\'Atelier', href: '#' }] }, { id: '2', title: 'Boutiques', links: [{ id: '1', label: 'Paris', href: '#' }, { id: '2', label: 'Lyon', href: '#' }] }], socials: { instagram: '#' } }, style: { background: 'dark', paddingY: 'none' }, visible: true },
    ],
  },

  // ─── 11. Blog Magazine ───
  {
    id: 'blog-magazine',
    name: 'Blog Magazine',
    description: 'Blog éditorial avec articles à la une, newsletter et témoignages',
    category: 'blog',
    universe: 'startup',
    emoji: '📰',
    preview: 'from-indigo-500 to-blue-600',
    sections: [
      { type: 'site-header', variant: 'startup', content: { logo: 'TechPulse', links: [{ id: '1', label: 'Articles', href: '#' }, { id: '2', label: 'Catégories', href: '#' }, { id: '3', label: 'À propos', href: '#' }], ctaLabel: 'S\'abonner', ctaHref: '#' }, style: { background: 'white', paddingY: 'none' }, visible: true },
      { type: 'hero', variant: 'startup', content: { eyebrow: 'MÉDIA TECH & INNOVATION', title: 'Décryptez les tendances qui façonnent demain', subtitle: 'TechPulse analyse chaque semaine les innovations, startups et tendances tech qui comptent. +15 000 lecteurs.', primaryButton: { label: 'Lire les articles', href: '#', variant: 'primary' }, secondaryButton: { label: 'S\'abonner', href: '#', variant: 'outline' } }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'blog-grid', variant: 'startup-featured', content: { eyebrow: 'À la une', title: 'Articles récents', items: [{ id: '1', title: 'L\'IA générative en 2026 : où en est-on vraiment ?', excerpt: 'Bilan des promesses vs la réalité après 3 ans de révolution IA.', date: '2026-03-01', category: 'Intelligence Artificielle' }, { id: '2', title: 'Les 10 startups françaises à suivre ce trimestre', excerpt: 'Notre sélection des pépites qui pourraient devenir les prochaines licornes.', date: '2026-02-25', category: 'Startups' }, { id: '3', title: 'Web3 : le comeback silencieux', excerpt: 'Comment la blockchain s\'est intégrée sans bruit dans les infrastructures.', date: '2026-02-18', category: 'Blockchain' }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'newsletter', variant: 'startup-split', content: { eyebrow: 'Newsletter', title: 'Recevez le meilleur de la tech chaque vendredi', subtitle: 'Rejoint par 15 000+ professionnels tech. Désabonnement en un clic.', placeholder: 'votre@email.com', buttonLabel: 'S\'abonner', socialProof: '15 000+ abonnés' }, style: { background: 'light', paddingY: 'xl' }, visible: true },
      { type: 'testimonials', variant: 'startup-grid', content: { eyebrow: 'Ils nous lisent', title: 'Ce qu\'en disent nos lecteurs', items: [{ id: '1', quote: 'TechPulse est devenu ma source d\'info tech #1. Des analyses profondes, pas du buzz.', author: 'Maxime Perrin', role: 'CTO', company: 'ScaleUp', rating: 5 }, { id: '2', quote: 'La newsletter du vendredi est un rituel. Toujours pertinent, jamais de spam.', author: 'Sarah Levy', role: 'Product Manager', company: 'TechCorp', rating: 5 }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'cta', variant: 'startup-centered', content: { badge: 'Gratuit · Pas de spam', title: 'Ne ratez plus rien', subtitle: 'Rejoignez notre communauté de passionnés de tech et d\'innovation.', primaryButton: { label: 'Lire TechPulse', href: '#', variant: 'primary' } }, style: { background: 'primary', paddingY: 'xl' }, visible: true },
      { type: 'site-footer', variant: 'startup', content: { logo: 'TechPulse', tagline: 'Le média des passionnés de tech.', copyright: `© ${year} TechPulse. Tous droits réservés.`, columns: [{ id: '1', title: 'Contenu', links: [{ id: '1', label: 'Articles', href: '#' }, { id: '2', label: 'Newsletter', href: '#' }] }, { id: '2', title: 'À propos', links: [{ id: '1', label: 'L\'équipe', href: '#' }, { id: '2', label: 'Contact', href: '#' }] }], socials: { twitter: '#', linkedin: '#' } }, style: { background: 'dark', paddingY: 'none' }, visible: true },
    ],
  },

  // ─── 12. Blog Personnel ───
  {
    id: 'blog-personal',
    name: 'Blog Personnel',
    description: 'Blog personnel créatif avec articles, section à propos et newsletter',
    category: 'blog',
    universe: 'creative',
    emoji: '✍️',
    preview: 'from-rose-500 to-pink-600',
    sections: [
      { type: 'site-header', variant: 'creative', content: { logo: 'Margot écrit', links: [{ id: '1', label: 'Articles', href: '#' }, { id: '2', label: 'À propos', href: '#' }, { id: '3', label: 'Contact', href: '#' }], ctaLabel: 'Newsletter', ctaHref: '#' }, style: { background: 'white', paddingY: 'none' }, visible: true },
      { type: 'hero', variant: 'creative', content: { eyebrow: 'BLOG · LIFESTYLE · RÉFLEXIONS', title: 'Bienvenue dans mon univers', subtitle: 'J\'écris sur la créativité, le voyage et l\'art de vivre simplement. Un espace pour ralentir et réfléchir.', primaryButton: { label: 'Lire le blog', href: '#', variant: 'primary' } }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'blog-grid', variant: 'creative-grid', content: { eyebrow: 'Derniers articles', title: 'Pensées récentes', items: [{ id: '1', title: 'Apprendre à ne rien faire (et pourquoi c\'est important)', excerpt: 'Dans un monde obsédé par la productivité, j\'explore l\'art du slowdown.', date: '2026-03-03', category: 'Réflexions' }, { id: '2', title: '10 jours au Japon : carnet de voyage illustré', excerpt: 'Tokyo, Kyoto, Osaka — entre tradition et modernité.', date: '2026-02-20', category: 'Voyage' }, { id: '3', title: 'Ma routine créative du matin', excerpt: 'Comment je structure mes premières heures pour écrire et dessiner.', date: '2026-02-10', category: 'Créativité' }, { id: '4', title: 'Les livres qui ont changé ma perspective', excerpt: 'Sélection de 5 ouvrages transformateurs lus cette année.', date: '2026-01-28', category: 'Lectures' }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'image-text', variant: 'creative-image-left', content: { eyebrow: 'À propos', title: 'Qui suis-je ?', description: 'Je m\'appelle Margot. Illustratrice et auteure, j\'explore les intersections entre art, voyage et vie quotidienne. Ce blog est mon journal public — un espace de partage authentique loin des réseaux sociaux.', primaryButton: { label: 'En savoir plus', href: '#', variant: 'outline' } }, style: { background: 'light', paddingY: 'xl' }, visible: true },
      { type: 'newsletter', variant: 'creative-centered', content: { eyebrow: 'Newsletter', title: 'La lettre de Margot', subtitle: 'Un email par mois avec mes réflexions, découvertes et illustrations. Pas de spam, promis.', placeholder: 'votre@email.com', buttonLabel: 'S\'inscrire', socialProof: '2 500+ abonnés' }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'contact', variant: 'creative-simple', content: { eyebrow: 'Contact', title: 'Envie d\'échanger ?', subtitle: 'Collaboration, question ou juste dire bonjour — écrivez-moi !', fields: [{ id: '1', label: 'Nom', type: 'text', required: true }, { id: '2', label: 'Email', type: 'email', required: true }, { id: '3', label: 'Message', type: 'textarea', required: true }], submitLabel: 'Envoyer' }, style: { background: 'light', paddingY: 'xl' }, visible: true },
      { type: 'site-footer', variant: 'creative', content: { logo: 'Margot écrit', tagline: 'Art, voyage et slow living.', copyright: `© ${year} Margot. Tous droits réservés.`, columns: [{ id: '1', title: 'Blog', links: [{ id: '1', label: 'Articles', href: '#' }, { id: '2', label: 'Newsletter', href: '#' }] }], socials: { instagram: '#', twitter: '#' } }, style: { background: 'dark', paddingY: 'none' }, visible: true },
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

  // ─── 14. Real Estate — Prestige Corporate ───
  {
    id: 'real-estate-corporate',
    name: 'Prestige Realty',
    description: 'Agence immobilière professionnelle — design corporate sombre, sérieux et haut de gamme',
    category: 'real-estate',
    universe: 'corporate',
    emoji: '🏙️',
    preview: 'from-slate-800 to-zinc-900',
    sections: [
      { type: 'site-header', variant: 'corporate', content: { logo: 'Prestige Realty', links: [{ id: '1', label: 'Biens', href: '#' }, { id: '2', label: 'Services', href: '#' }, { id: '3', label: 'Équipe', href: '#' }, { id: '4', label: 'Actualités', href: '#' }], ctaLabel: 'Estimation gratuite', ctaHref: '#' }, style: { background: 'dark', paddingY: 'none' }, visible: true },
      { type: 'hero', variant: 'corporate', content: { eyebrow: 'N°1 de l\'immobilier de prestige', title: 'Votre partenaire immobilier de confiance depuis 2005', subtitle: 'Avec plus de 500 transactions réussies et un réseau d\'acheteurs qualifiés, nous transformons chaque projet en réussite.', primaryButton: { label: 'Voir nos biens', href: '#', variant: 'primary' }, secondaryButton: { label: 'Estimation gratuite', href: '#', variant: 'outline' } }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'logos', variant: 'corporate-strip', content: { title: 'Partenaires de confiance', items: [{ id: '1', name: 'Century 21' }, { id: '2', name: 'Barnes' }, { id: '3', name: 'Sotheby\'s' }, { id: '4', name: 'Engel & Völkers' }, { id: '5', name: 'Christie\'s' }] }, style: { background: 'dark', paddingY: 'md' }, visible: true },
      { type: 'features', variant: 'corporate-bento', content: { eyebrow: 'Nos services', title: 'Un accompagnement complet pour votre projet', items: [{ id: '1', icon: '🔍', title: 'Recherche personnalisée', description: 'Un agent dédié analyse vos critères pour vous présenter uniquement les biens correspondants.' }, { id: '2', icon: '📊', title: 'Analyse de marché', description: 'Rapports détaillés sur les tendances du marché local pour des décisions éclairées.' }, { id: '3', icon: '🤝', title: 'Négociation experte', description: 'Nos experts négocient les meilleures conditions pour maximiser votre investissement.' }, { id: '4', icon: '📄', title: 'Accompagnement juridique', description: 'Prise en charge complète des démarches administratives et légales.' }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'stats', variant: 'corporate-cards', content: { eyebrow: 'Performance', title: 'Des résultats qui parlent', items: [{ id: '1', value: '500+', label: 'Transactions', description: 'Depuis 2005' }, { id: '2', value: '€2.5B', label: 'Volume de ventes', description: 'Cumulé' }, { id: '3', value: '48h', label: 'Délai moyen', description: 'Première visite' }, { id: '4', value: '97%', label: 'Satisfaction', description: 'Clients satisfaits' }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'gallery-grid', variant: 'corporate-grid', content: { eyebrow: 'Portfolio', title: 'Nos biens d\'exception', subtitle: 'Sélection de propriétés premium dans les quartiers les plus recherchés.', images: [{ id: '1', src: '', alt: 'Penthouse Vue Mer', caption: 'Penthouse Vue Mer — Cannes — €3,200,000' }, { id: '2', src: '', alt: 'Hôtel Particulier', caption: 'Hôtel Particulier — Paris 16e — €8,500,000' }, { id: '3', src: '', alt: 'Villa Contemporaine', caption: 'Villa Contemporaine — Saint-Tropez — €5,800,000' }, { id: '4', src: '', alt: 'Loft Design', caption: 'Loft Design — Lyon 2e — €890,000' }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'team', variant: 'corporate-grid', content: { eyebrow: 'L\'équipe', title: 'Des experts à votre écoute', subtitle: 'Chaque membre de notre équipe est spécialisé dans un segment du marché immobilier de prestige.', members: [{ id: '1', name: 'Antoine Moreau', role: 'Directeur général' }, { id: '2', name: 'Claire Fontaine', role: 'Responsable ventes' }, { id: '3', name: 'Philippe Dubois', role: 'Expert estimation' }, { id: '4', name: 'Isabelle Roux', role: 'Agent senior' }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'testimonials', variant: 'corporate-cards', content: { eyebrow: 'Avis clients', title: 'Ils nous ont fait confiance', items: [{ id: '1', quote: 'Une expertise inégalée du marché haut de gamme. L\'équipe a trouvé notre appartement idéal en 3 semaines.', author: 'François Lemaire', role: 'Directeur', company: 'Acquéreur', rating: 5 }, { id: '2', quote: 'Vente de notre maison en 45 jours au prix souhaité. Professionnalisme et réactivité exemplaires.', author: 'Nathalie Girard', role: 'Médecin', company: 'Vendeur', rating: 5 }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'contact', variant: 'corporate-split', content: { eyebrow: 'Contact', title: 'Parlons de votre projet', subtitle: 'Estimation gratuite, recherche de biens ou simple question — nous sommes à votre disposition.', fields: [{ id: '1', label: 'Nom complet', type: 'text', required: true }, { id: '2', label: 'Email', type: 'email', required: true }, { id: '3', label: 'Téléphone', type: 'tel', required: false }, { id: '4', label: 'Votre projet', type: 'textarea', required: true }], submitLabel: 'Envoyer' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'site-footer', variant: 'corporate', content: { logo: 'Prestige Realty', tagline: 'L\'immobilier de prestige, simplement.', copyright: `© ${year} Prestige Realty. Tous droits réservés.`, columns: [{ id: '1', title: 'Navigation', links: [{ id: '1', label: 'Nos biens', href: '#' }, { id: '2', label: 'Services', href: '#' }, { id: '3', label: 'L\'équipe', href: '#' }] }, { id: '2', title: 'Contact', links: [{ id: '1', label: '+33 1 42 56 78 90', href: '#' }, { id: '2', label: 'contact@prestige-realty.fr', href: '#' }] }], socials: { linkedin: '#', instagram: '#' } }, style: { background: 'dark', paddingY: 'none' }, visible: true },
    ],
  },

  // ─── 15. Real Estate — Modern Glass ───
  {
    id: 'real-estate-glass',
    name: 'NovaProp',
    description: 'Agence immobilière moderne et tech — glassmorphism, dark futuriste, proptech vibes',
    category: 'real-estate',
    universe: 'glass',
    emoji: '🏗️',
    preview: 'from-purple-900 to-indigo-950',
    sections: [
      { type: 'site-header', variant: 'glass', content: { logo: 'NovaProp', links: [{ id: '1', label: 'Explorer', href: '#' }, { id: '2', label: 'Investir', href: '#' }, { id: '3', label: 'Agents', href: '#' }, { id: '4', label: 'Blog', href: '#' }], ctaLabel: 'Commencer', ctaHref: '#' }, style: { background: 'dark', paddingY: 'none' }, visible: true },
      { type: 'hero', variant: 'glass', content: { eyebrow: '🏠 PropTech — Nouvelle génération', title: 'L\'immobilier réinventé par la technologie', subtitle: 'Recherche IA, visites virtuelles 3D, estimation instantanée. NovaProp combine data et expertise humaine pour une expérience immobilière sans précédent.', primaryButton: { label: 'Explorer les biens', href: '#', variant: 'primary' }, secondaryButton: { label: 'Visite virtuelle', href: '#', variant: 'outline' } }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'features', variant: 'glass-bento', content: { eyebrow: 'Technologie', title: 'L\'immobilier du futur, aujourd\'hui', subtitle: 'Des outils innovants pour simplifier chaque étape de votre projet immobilier.', items: [{ id: '1', icon: '🤖', title: 'Recherche IA', description: 'Notre algorithme analyse vos préférences et vous propose les biens les plus pertinents en temps réel.' }, { id: '2', icon: '🥽', title: 'Visites virtuelles 3D', description: 'Explorez chaque propriété en immersion totale depuis votre navigateur, à toute heure.' }, { id: '3', icon: '📈', title: 'Estimation instantanée', description: 'Obtenez une estimation précise de votre bien en 30 secondes grâce à notre modèle prédictif.' }, { id: '4', icon: '🔔', title: 'Alertes intelligentes', description: 'Soyez notifié instantanément dès qu\'un bien correspondant à vos critères est mis en ligne.' }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'stats', variant: 'glass-grid', content: { eyebrow: 'Impact', title: 'La data au service de votre projet', items: [{ id: '1', value: '15K+', label: 'Biens analysés', description: 'Par notre IA mensuelle' }, { id: '2', value: '3.5x', label: 'Plus rapide', description: 'Que la recherche classique' }, { id: '3', value: '99.2%', label: 'Précision', description: 'De nos estimations' }, { id: '4', value: '24/7', label: 'Disponible', description: 'Visites virtuelles' }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'gallery-grid', variant: 'glass-grid', content: { eyebrow: 'Sélection', title: 'Propriétés à la une', subtitle: 'Les biens les plus demandés de notre catalogue, mis à jour en temps réel.', images: [{ id: '1', src: '', alt: 'Smart Home Connectée', caption: 'Smart Home Connectée — Lyon — €720,000' }, { id: '2', src: '', alt: 'Penthouse Panoramique', caption: 'Penthouse Panoramique — Paris — €2,100,000' }, { id: '3', src: '', alt: 'Éco-Villa Passive', caption: 'Éco-Villa Passive — Bordeaux — €950,000' }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'testimonials', variant: 'glass-marquee', content: { eyebrow: 'Retours clients', title: 'Ils ont trouvé avec NovaProp', items: [{ id: '1', quote: 'La visite virtuelle m\'a fait gagner un temps fou. J\'ai trouvé mon appartement sans me déplacer une seule fois inutilement.', author: 'Lucas Bernard', role: 'Développeur', company: 'Acquéreur', rating: 5 }, { id: '2', quote: 'L\'estimation IA était à 2% du prix final. Bluffant de précision pour un outil en ligne.', author: 'Emma Petit', role: 'Investisseur', company: 'Vendeur', rating: 5 }, { id: '3', quote: 'L\'alerte m\'a notifié dès la mise en ligne du bien. J\'ai été le premier à visiter et j\'ai signé dans la semaine.', author: 'Thomas Mercier', role: 'Ingénieur', company: 'Acquéreur', rating: 5 }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'blog-grid', variant: 'glass-grid', content: { eyebrow: 'Insights', title: 'Tendances du marché', items: [{ id: '1', title: 'L\'IA va-t-elle remplacer les agents immobiliers ?', excerpt: 'Analyse des dernières avancées en PropTech et leur impact sur le métier.', date: '2026-03-05', category: 'PropTech' }, { id: '2', title: 'Investir dans l\'immobilier vert en 2026', excerpt: 'Le guide complet des critères ESG pour un investissement immobilier responsable.', date: '2026-02-25', category: 'Investissement' }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'cta', variant: 'glass-centered', content: { badge: '🚀 Lancement beta', title: 'Prêt à découvrir l\'immobilier du futur ?', subtitle: 'Rejoignez 15 000+ utilisateurs qui trouvent leur bien 3x plus vite avec NovaProp.', primaryButton: { label: 'Créer mon compte', href: '#', variant: 'primary' }, secondaryButton: { label: 'Voir la démo', href: '#', variant: 'outline' } }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'site-footer', variant: 'glass', content: { logo: 'NovaProp', tagline: 'L\'immobilier réinventé par la technologie.', copyright: `© ${year} NovaProp. Tous droits réservés.`, columns: [{ id: '1', title: 'Plateforme', links: [{ id: '1', label: 'Explorer', href: '#' }, { id: '2', label: 'Estimation', href: '#' }, { id: '3', label: 'Blog', href: '#' }] }, { id: '2', title: 'Entreprise', links: [{ id: '1', label: 'À propos', href: '#' }, { id: '2', label: 'Carrières', href: '#' }, { id: '3', label: 'Contact', href: '#' }] }], socials: { twitter: '#', linkedin: '#', github: '#' } }, style: { background: 'dark', paddingY: 'none' }, visible: true },
    ],
  },

  // ─── 16. Photographe — Lumière Noire ───
  {
    id: 'photographe-lumiere-noire',
    name: 'Photographe — Lumière Noire',
    description: 'Portfolio photographe haut de gamme avec galerie immersive et booking',
    category: 'photographe',
    universe: 'creative',
    emoji: '📸',
    preview: 'from-zinc-900 to-neutral-950',
    sections: [
      { type: 'site-header', variant: 'creative', content: { logo: 'AURÉLIEN NOIR', links: [{ id: '1', label: 'Portfolio', href: '#portfolio' }, { id: '2', label: 'Services', href: '#services' }, { id: '3', label: 'À propos', href: '#about' }, { id: '4', label: 'Contact', href: '#contact' }], ctaLabel: 'Réserver', ctaHref: '#contact' }, style: { background: 'dark', paddingY: 'none' }, visible: true },
      { type: 'hero', variant: 'creative', content: { eyebrow: 'Photographe — Paris & International', title: 'Capturer l\'émotion, sublimer l\'instant', subtitle: 'Spécialisé en portrait, mariage et mode. Chaque image raconte une histoire unique, entre lumière naturelle et composition cinématographique.', primaryButton: { label: 'Voir le portfolio', href: '#portfolio', variant: 'primary' }, secondaryButton: { label: 'Réserver une séance', href: '#contact', variant: 'outline' } }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'gallery-grid', variant: 'creative-masonry', content: { eyebrow: 'Portfolio', title: 'Sélection récente', subtitle: 'Un aperçu de mes derniers travaux en portrait, mode et reportage.', images: [{ id: '1', src: '', alt: 'Portrait studio', caption: 'Portrait — Studio naturel' }, { id: '2', src: '', alt: 'Mariage champêtre', caption: 'Mariage — Provence' }, { id: '3', src: '', alt: 'Mode éditoriale', caption: 'Mode — Vogue Paris' }, { id: '4', src: '', alt: 'Reportage urbain', caption: 'Reportage — Tokyo' }, { id: '5', src: '', alt: 'Portrait extérieur', caption: 'Portrait — Golden hour' }, { id: '6', src: '', alt: 'Événement corporate', caption: 'Corporate — Gala annuel' }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'features', variant: 'creative-list', content: { eyebrow: 'Services', title: 'Des prestations sur mesure', subtitle: 'Chaque projet est unique. Je m\'adapte à vos besoins avec une approche personnalisée.', items: [{ id: '1', icon: '👤', title: 'Portrait & Headshot', description: 'Séances individuelles ou corporate en studio ou en extérieur. Retouche fine incluse, livraison sous 7 jours.' }, { id: '2', icon: '💍', title: 'Mariage & Événements', description: 'Couverture complète de votre journée, du getting ready au first dance. Album premium et galerie en ligne privée.' }, { id: '3', icon: '✨', title: 'Mode & Éditorial', description: 'Shooting éditorial, lookbook, campagne publicitaire. Direction artistique et post-production avancée.' }, { id: '4', icon: '🏢', title: 'Corporate & Marque', description: 'Portraits d\'équipe, reportage d\'entreprise, contenu pour réseaux sociaux. Forfaits annuels disponibles.' }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'image-text', variant: 'creative-image-left', content: { eyebrow: 'À propos', title: 'Aurélien Noir', text: 'Photographe professionnel depuis 12 ans, formé à l\'École Nationale de la Photographie d\'Arles. Mon approche mêle sensibilité documentaire et esthétique cinématographique.\n\nPublié dans Vogue, Elle, Le Monde. Membre de l\'Association des Photographes Professionnels. Basé à Paris, je me déplace partout en France et à l\'international.', image: { src: '', alt: 'Aurélien Noir photographe' }, button: { label: 'Télécharger le portfolio PDF', href: '#', variant: 'outline' } }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'testimonials', variant: 'creative-featured', content: { eyebrow: 'Témoignages', title: 'Ce qu\'ils en disent', items: [{ id: '1', quote: 'Aurélien a capturé notre mariage avec une sensibilité incroyable. Chaque photo est une œuvre d\'art que nous chérissons.', author: 'Claire & Thomas', role: 'Mariage', company: 'Provence, 2025', rating: 5 }, { id: '2', quote: 'Un œil unique pour le portrait corporate. Il a su mettre notre équipe en valeur tout en restant naturel.', author: 'Marc Dubois', role: 'DRH', company: 'Groupe Luxe', rating: 5 }, { id: '3', quote: 'Le shooting mode était parfaitement dirigé. Les photos ont dépassé toutes nos attentes pour la campagne.', author: 'Léa Chen', role: 'Directrice Artistique', company: 'Maison Céleste', rating: 5 }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'pricing', variant: 'creative-columns', content: { eyebrow: 'Tarifs', title: 'Formules & prestations', subtitle: 'Prix indicatifs — chaque projet fait l\'objet d\'un devis personnalisé.', plans: [{ id: 'portrait', name: 'Portrait', price: '350€', period: '', description: 'Séance 1h', highlighted: false, cta: 'Réserver', ctaHref: '#contact', features: [{ text: '1 heure de shooting', included: true }, { text: '15 photos retouchées', included: true }, { text: 'Galerie privée en ligne', included: true }, { text: 'Tirages fine art', included: false }] }, { id: 'mariage', name: 'Mariage', price: '2 800€', period: '', description: 'Journée complète', highlighted: true, badge: 'Populaire', cta: 'Demander un devis', ctaHref: '#contact', features: [{ text: 'Couverture journée entière', included: true }, { text: '400+ photos retouchées', included: true }, { text: 'Album premium 30×30', included: true }, { text: 'Séance engagement offerte', included: true }] }, { id: 'corporate', name: 'Corporate', price: '900€', period: '', description: 'Demi-journée', highlighted: false, cta: 'Demander un devis', ctaHref: '#contact', features: [{ text: '4 heures sur site', included: true }, { text: '30 photos retouchées', included: true }, { text: 'Portraits individuels', included: true }, { text: 'Droits usage pro', included: true }] }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'contact', variant: 'creative-with-info', content: { eyebrow: 'Contact', title: 'Parlons de votre projet', subtitle: 'Décrivez-moi votre projet et je vous répondrai sous 24h avec une proposition personnalisée.', email: 'hello@aureliannoir.com', phone: '+33 6 12 34 56 78', address: 'Studio — 42 rue du Faubourg Saint-Antoine, Paris 12e', fields: [{ id: '1', label: 'Nom', type: 'text', required: true }, { id: '2', label: 'Email', type: 'email', required: true }, { id: '3', label: 'Type de projet', type: 'select', options: ['Portrait', 'Mariage', 'Mode', 'Corporate', 'Autre'] }, { id: '4', label: 'Message', type: 'textarea', required: true }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'site-footer', variant: 'creative', content: { logo: 'AURÉLIEN NOIR', tagline: 'Photographe — Paris & International', copyright: `© ${year} Aurélien Noir. Tous droits réservés.`, columns: [{ id: '1', title: 'Navigation', links: [{ id: '1', label: 'Portfolio', href: '#' }, { id: '2', label: 'Services', href: '#' }, { id: '3', label: 'Tarifs', href: '#' }] }, { id: '2', title: 'Suivez-moi', links: [{ id: '1', label: 'Instagram', href: '#' }, { id: '2', label: 'Behance', href: '#' }] }], socials: { twitter: '#', linkedin: '#' } }, style: { background: 'dark', paddingY: 'none' }, visible: true },
    ],
  },

  // ─── 17. Coach Sportif — FitForce ───
  {
    id: 'coach-sportif-fitforce',
    name: 'Coach Sportif — FitForce',
    description: 'Site de coach sportif avec programmes, booking et témoignages clients',
    category: 'coach',
    universe: 'startup',
    emoji: '💪',
    preview: 'from-emerald-600 to-teal-700',
    sections: [
      { type: 'site-header', variant: 'startup', content: { logo: 'FitForce', links: [{ id: '1', label: 'Programmes', href: '#programmes' }, { id: '2', label: 'Résultats', href: '#results' }, { id: '3', label: 'Tarifs', href: '#pricing' }, { id: '4', label: 'Contact', href: '#contact' }], ctaLabel: 'Séance d\'essai', ctaHref: '#contact' }, style: { background: 'white', paddingY: 'none' }, visible: true },
      { type: 'hero', variant: 'startup', content: { eyebrow: 'Coach certifié — 10 ans d\'expérience', title: 'Transformez votre corps, libérez votre potentiel', subtitle: 'Coaching personnalisé en salle ou à domicile à Paris. Programmes sur mesure adaptés à vos objectifs : perte de poids, prise de muscle, préparation sportive ou bien-être.', primaryButton: { label: 'Réserver ma séance d\'essai', href: '#contact', variant: 'primary' }, secondaryButton: { label: 'Voir les programmes', href: '#programmes', variant: 'outline' } }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'stats', variant: 'startup-cards', content: { eyebrow: 'Résultats', title: 'Des chiffres qui parlent', items: [{ id: '1', value: '500+', label: 'Clients coachés', description: 'Depuis 2015' }, { id: '2', value: '98%', label: 'Satisfaction', description: 'Avis 5 étoiles' }, { id: '3', value: '-12kg', label: 'Perte moyenne', description: 'Programme 3 mois' }, { id: '4', value: '10 ans', label: 'Expérience', description: 'Diplômé d\'État' }] }, style: { background: 'light', paddingY: 'xl' }, visible: true },
      { type: 'features', variant: 'startup-bento', content: { eyebrow: 'Programmes', title: 'Un programme adapté à chaque objectif', subtitle: 'Que vous soyez débutant ou athlète confirmé, je crée un programme 100% personnalisé.', items: [{ id: '1', icon: '🔥', title: 'Perte de poids', description: 'Combinaison HIIT + musculation + plan alimentaire. Résultats visibles dès les premières semaines.' }, { id: '2', icon: '💪', title: 'Prise de muscle', description: 'Programmes de musculation progressifs avec suivi nutrition protéinée et supplémentation adaptée.' }, { id: '3', icon: '🏃', title: 'Préparation sportive', description: 'Entraînement spécifique pour marathon, trail, sports de combat ou compétition.' }, { id: '4', icon: '🧘', title: 'Bien-être & mobilité', description: 'Stretching, yoga, renforcement postural pour les sédentaires et les seniors.' }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'steps', variant: 'startup-horizontal', content: { eyebrow: 'Comment ça marche', title: 'Votre parcours en 4 étapes', items: [{ id: '1', title: 'Bilan initial', description: 'Évaluation de votre condition physique, vos objectifs et votre historique.' }, { id: '2', title: 'Programme sur mesure', description: 'Je crée votre programme personnalisé : entraînement + nutrition + récupération.' }, { id: '3', title: 'Coaching régulier', description: 'Séances 2 à 4 fois par semaine avec suivi de progression et ajustements.' }, { id: '4', title: 'Résultats durables', description: 'Autonomie progressive et habitudes saines pour des résultats qui durent.' }] }, style: { background: 'light', paddingY: 'xl' }, visible: true },
      { type: 'testimonials', variant: 'startup-marquee', content: { eyebrow: 'Témoignages', title: 'Leurs transformations', items: [{ id: '1', quote: 'J\'ai perdu 15kg en 4 mois avec Alex. Le suivi est incroyable, il s\'adapte à mon rythme et me pousse juste ce qu\'il faut.', author: 'Sophie L.', role: '-15kg', company: 'Programme perte de poids', rating: 5 }, { id: '2', quote: 'Après 6 mois de coaching, j\'ai couru mon premier marathon en 3h45. Alex a un vrai talent pour la préparation mentale.', author: 'Pierre M.', role: 'Marathon', company: 'Préparation sportive', rating: 5 }, { id: '3', quote: 'À 58 ans, je n\'ai jamais été aussi en forme. Les séances mobilité ont changé ma vie quotidienne.', author: 'Catherine D.', role: 'Senior fit', company: 'Bien-être & mobilité', rating: 5 }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'pricing', variant: 'startup-columns', content: { eyebrow: 'Tarifs', title: 'Investissez dans votre santé', subtitle: 'Première séance d\'essai offerte — Packs de 10 et 20 séances disponibles.', plans: [{ id: 'solo', name: 'Séance solo', price: '75€', period: '/séance', description: 'À l\'unité', highlighted: false, cta: 'Réserver', ctaHref: '#contact', features: [{ text: '1h de coaching personnalisé', included: true }, { text: 'Programme adapté', included: true }, { text: 'Suivi nutrition', included: false }, { text: 'Suivi WhatsApp', included: false }] }, { id: 'pack', name: 'Pack Transformation', price: '599€', period: '/10 séances', description: 'Le plus populaire', highlighted: true, badge: 'Meilleur rapport', cta: 'Choisir', ctaHref: '#contact', features: [{ text: '10 séances d\'1h', included: true }, { text: 'Programme évolutif', included: true }, { text: 'Plan nutrition personnalisé', included: true }, { text: 'Suivi WhatsApp illimité', included: true }] }, { id: 'premium', name: 'Premium 3 mois', price: '1 490€', period: '/trimestre', description: 'Transformation complète', highlighted: false, cta: 'Postuler', ctaHref: '#contact', features: [{ text: '24 séances (2x/sem)', included: true }, { text: 'Programme + nutrition', included: true }, { text: 'Bilan mensuel complet', included: true }, { text: 'Accès app de suivi', included: true }] }] }, style: { background: 'light', paddingY: 'xl' }, visible: true },
      { type: 'faq', variant: 'startup-accordion', content: { eyebrow: 'FAQ', title: 'Vos questions fréquentes', items: [{ id: '1', question: 'La première séance est-elle vraiment gratuite ?', answer: 'Oui, la première séance d\'essai est 100% gratuite et sans engagement. C\'est l\'occasion de se rencontrer et de définir vos objectifs.' }, { id: '2', question: 'Où se déroulent les séances ?', answer: 'En salle (Cercle de la Forme, Paris 11e), à domicile (Paris et proche banlieue) ou en extérieur dans les parcs parisiens.' }, { id: '3', question: 'J\'ai des problèmes de dos, est-ce adapté ?', answer: 'Absolument. Je travaille régulièrement avec des personnes ayant des pathologies. Les exercices sont adaptés en coordination avec votre médecin si nécessaire.' }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'contact', variant: 'startup-simple', content: { eyebrow: 'Contact', title: 'Prêt à commencer ?', subtitle: 'Réservez votre séance d\'essai gratuite ou posez-moi vos questions.', email: 'alex@fitforce-coaching.fr', phone: '+33 6 98 76 54 32' }, style: { background: 'light', paddingY: 'xl' }, visible: true },
      { type: 'site-footer', variant: 'startup', content: { logo: 'FitForce', tagline: 'Coaching sportif personnalisé — Paris', copyright: `© ${year} FitForce. Tous droits réservés.`, columns: [{ id: '1', title: 'Navigation', links: [{ id: '1', label: 'Programmes', href: '#' }, { id: '2', label: 'Tarifs', href: '#' }, { id: '3', label: 'Contact', href: '#' }] }], socials: { twitter: '#', linkedin: '#' } }, style: { background: 'dark', paddingY: 'none' }, visible: true },
    ],
  },

  // ─── 18. Restaurant — Maison Céleste ───
  {
    id: 'restaurant-maison-celeste',
    name: 'Restaurant — Maison Céleste',
    description: 'Restaurant gastronomique avec menu, réservation et ambiance luxe',
    category: 'restaurant',
    universe: 'luxe',
    emoji: '🍽️',
    preview: 'from-amber-800 to-stone-900',
    sections: [
      { type: 'site-header', variant: 'luxe', content: { logo: 'MAISON CÉLESTE', links: [{ id: '1', label: 'La Carte', href: '#menu' }, { id: '2', label: 'Notre Histoire', href: '#about' }, { id: '3', label: 'Événements', href: '#events' }, { id: '4', label: 'Contact', href: '#contact' }], ctaLabel: 'Réserver', ctaHref: '#reservation' }, style: { background: 'dark', paddingY: 'none' }, visible: true },
      { type: 'hero', variant: 'luxe', content: { eyebrow: 'Restaurant gastronomique — 1 étoile Michelin', title: 'L\'art de la cuisine française réinventée', subtitle: 'Au cœur du Marais, le Chef Julien Beaumont propose une cuisine d\'auteur qui marie tradition française et influences méditerranéennes, dans un cadre intimiste et raffiné.', primaryButton: { label: 'Réserver une table', href: '#reservation', variant: 'primary' }, secondaryButton: { label: 'Découvrir la carte', href: '#menu', variant: 'outline' } }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'gallery-grid', variant: 'luxe-masonry', content: { eyebrow: 'Galerie', title: 'Instants de table', subtitle: 'Chaque plat est une composition visuelle autant que gustative.', images: [{ id: '1', src: '', alt: 'Tartare de daurade', caption: 'Tartare de daurade — agrumes & huile de basilic' }, { id: '2', src: '', alt: 'Intérieur du restaurant', caption: 'Salle principale — 32 couverts' }, { id: '3', src: '', alt: 'Dessert signature', caption: 'Sphère chocolat — cœur passion & éclats de fève de Tonka' }, { id: '4', src: '', alt: 'Cave à vins', caption: 'Notre cave — 400+ références' }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'features', variant: 'luxe-list', content: { eyebrow: 'La Carte', title: 'Menus dégustation', subtitle: 'Produits de saison, sourcing local et pêche responsable. La carte évolue chaque semaine.', items: [{ id: '1', icon: '🌿', title: 'Menu Découverte — 79€', description: 'Amuse-bouche, entrée, poisson, viande, pré-dessert, dessert. Accord mets-vins +39€.' }, { id: '2', icon: '✨', title: 'Menu Signature — 129€', description: '7 temps autour des produits d\'exception. Homard bleu, pigeon fermier, truffe noire. Accord +59€.' }, { id: '3', icon: '🌱', title: 'Menu Végétal — 69€', description: '5 plats 100% végétaux, créatifs et gourmands. Produits du potager de Bonneuil.' }, { id: '4', icon: '🍷', title: 'Carte des vins', description: '400+ références, sélection bio et naturelle. Sommelier dédié pour vous guider.' }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'image-text', variant: 'luxe-image-right', content: { eyebrow: 'Notre histoire', title: 'Chef Julien Beaumont', text: 'Formé chez Alain Ducasse et passé par les cuisines du Noma à Copenhague, Julien ouvre Maison Céleste en 2019 avec une vision : rendre la haute gastronomie accessible et chaleureuse.\n\nÉtoilé Michelin dès 2021, le restaurant cultive l\'excellence sans l\'élitisme. Chaque service est un moment de partage où la cuisine raconte l\'histoire de ses producteurs.', image: { src: '', alt: 'Chef Julien Beaumont' }, button: { label: 'Notre philosophie', href: '#', variant: 'outline' } }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'testimonials', variant: 'luxe-featured', content: { eyebrow: 'Avis', title: 'L\'expérience Maison Céleste', items: [{ id: '1', quote: 'Un moment suspendu. Chaque plat est un voyage sensoriel. Le menu végétal est une révélation absolue.', author: 'Florence M.', role: 'Guide Fooding', company: '', rating: 5 }, { id: '2', quote: 'Le cadre est sublime, le service irréprochable, et les accords mets-vins de Maxime sont d\'une justesse rare.', author: 'Antoine R.', role: 'Critique gastronomique', company: 'Le Figaro', rating: 5 }, { id: '3', quote: 'Notre dîner d\'anniversaire ici restera un de nos plus beaux souvenirs. Merci pour cette magie.', author: 'Claire & Éric', role: 'Clients réguliers', company: '', rating: 5 }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'map', variant: 'luxe-info', content: { eyebrow: 'Nous trouver', title: 'Informations pratiques', address: '17 rue de Turenne, 75003 Paris', phone: '+33 1 42 72 XX XX', email: 'reservation@maisonceleste.fr', hours: 'Mar-Sam : 12h-14h / 19h30-22h · Fermé dimanche et lundi', mapEmbed: '' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'contact', variant: 'luxe-simple', content: { eyebrow: 'Réservation', title: 'Réserver votre table', subtitle: 'Pour les groupes de 8+ ou événements privatifs, contactez-nous directement.', email: 'reservation@maisonceleste.fr', phone: '+33 1 42 72 XX XX' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'site-footer', variant: 'luxe', content: { logo: 'MAISON CÉLESTE', tagline: 'Restaurant gastronomique — Paris 3e', copyright: `© ${year} Maison Céleste. Tous droits réservés.`, columns: [{ id: '1', title: 'Horaires', links: [{ id: '1', label: 'Mar-Sam : 12h-14h / 19h30-22h', href: '#' }] }, { id: '2', title: 'Suivez-nous', links: [{ id: '1', label: 'Instagram', href: '#' }, { id: '2', label: 'TripAdvisor', href: '#' }] }], socials: { twitter: '#', linkedin: '#' } }, style: { background: 'dark', paddingY: 'none' }, visible: true },
    ],
  },

  // ─── 19. Coiffeur — Atelier Mèches ───
  {
    id: 'coiffeur-atelier-meches',
    name: 'Coiffeur — Atelier Mèches',
    description: 'Salon de coiffure haut de gamme avec galerie looks, tarifs et réservation',
    category: 'coiffeur',
    universe: 'creative',
    emoji: '✂️',
    preview: 'from-rose-700 to-pink-900',
    sections: [
      { type: 'site-header', variant: 'creative', content: { logo: 'ATELIER MÈCHES', links: [{ id: '1', label: 'Nos Looks', href: '#looks' }, { id: '2', label: 'Services', href: '#services' }, { id: '3', label: 'L\'Équipe', href: '#team' }, { id: '4', label: 'Tarifs', href: '#pricing' }], ctaLabel: 'Prendre RDV', ctaHref: '#booking' }, style: { background: 'dark', paddingY: 'none' }, visible: true },
      { type: 'hero', variant: 'creative', content: { eyebrow: 'Salon de coiffure — Paris 6e', title: 'Votre style, notre signature', subtitle: 'Coloriste expert, coupe créative, soins Olaplex & Kérastase. L\'Atelier Mèches sublime chaque chevelure avec une approche artisanale et personnalisée.', primaryButton: { label: 'Prendre rendez-vous', href: '#booking', variant: 'primary' }, secondaryButton: { label: 'Voir nos réalisations', href: '#looks', variant: 'outline' } }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'gallery-grid', variant: 'creative-masonry', content: { eyebrow: 'Nos réalisations', title: 'Avant / Après', subtitle: 'Découvrez les transformations réalisées par notre équipe.', images: [{ id: '1', src: '', alt: 'Balayage caramel', caption: 'Balayage caramel — par Marina' }, { id: '2', src: '', alt: 'Coupe courte structurée', caption: 'Coupe pixie — par Thomas' }, { id: '3', src: '', alt: 'Coloration cuivrée', caption: 'Cuivré intense — par Marina' }, { id: '4', src: '', alt: 'Blow-out wavy', caption: 'Brushing wavy — par Julie' }, { id: '5', src: '', alt: 'Blond polaire', caption: 'Blond glacé — par Marina' }, { id: '6', src: '', alt: 'Coupe homme', caption: 'Fade texturé — par Thomas' }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'features', variant: 'creative-grid', content: { eyebrow: 'Services', title: 'Nos expertises', subtitle: 'Un savoir-faire complet pour prendre soin de vos cheveux.', items: [{ id: '1', icon: '✂️', title: 'Coupe & Coiffage', description: 'Coupe femme, homme et enfant. Diagnostic capillaire, conseil morpho et coiffage sur mesure.' }, { id: '2', icon: '🎨', title: 'Coloration & Balayage', description: 'Coloration permanente, ton sur ton, balayage, ombré, mèches. Techniques sur mesure avec produits premium.' }, { id: '3', icon: '💆', title: 'Soins & Traitements', description: 'Soins Olaplex, Kérastase, botox capillaire. Rituels profonds pour cheveux abîmés ou secs.' }, { id: '4', icon: '👰', title: 'Coiffure Événementielle', description: 'Chignon, tresse, ondulations pour mariages, galas et événements. Essai inclus.' }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'team', variant: 'creative-grid', content: { eyebrow: 'L\'équipe', title: 'Nos artistes capillaires', subtitle: 'Passionnés et formés auprès des plus grandes maisons.', members: [{ id: '1', name: 'Marina Volkov', role: 'Coloriste experte', bio: '15 ans d\'expérience. Formée L\'Oréal Professionnel. Spécialiste balayage et blond.', image: '' }, { id: '2', name: 'Thomas Reix', role: 'Coiffeur créatif', bio: 'Ancien Dessange. Spécialiste coupes structurées et coiffure homme.', image: '' }, { id: '3', name: 'Julie Chen', role: 'Coiffeuse & Soin', bio: 'Experte soins Kérastase et coiffure événementielle.', image: '' }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'pricing', variant: 'creative-columns', content: { eyebrow: 'Tarifs', title: 'Nos prestations', subtitle: 'Tarifs indicatifs — un devis précis vous sera proposé en salon.', plans: [{ id: 'coupe', name: 'Coupe', price: 'Dès 55€', period: '', description: 'Femme / Homme', highlighted: false, cta: 'Réserver', ctaHref: '#booking', features: [{ text: 'Diagnostic capillaire', included: true }, { text: 'Shampoing + soin', included: true }, { text: 'Coupe personnalisée', included: true }, { text: 'Brushing / coiffage', included: true }] }, { id: 'color', name: 'Couleur', price: 'Dès 85€', period: '', description: 'Coloration / Balayage', highlighted: true, badge: 'Populaire', cta: 'Réserver', ctaHref: '#booking', features: [{ text: 'Diagnostic couleur', included: true }, { text: 'Coloration / balayage', included: true }, { text: 'Soin Olaplex inclus', included: true }, { text: 'Brushing finish', included: true }] }, { id: 'mariage', name: 'Mariée', price: 'Dès 280€', period: '', description: 'Forfait complet', highlighted: false, cta: 'Devis', ctaHref: '#booking', features: [{ text: 'Essai préalable', included: true }, { text: 'Coiffure jour J', included: true }, { text: 'Accessoires inclus', included: true }, { text: 'Déplacement possible', included: true }] }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'testimonials', variant: 'creative-marquee', content: { eyebrow: 'Avis clients', title: 'Elles adorent', items: [{ id: '1', quote: 'Marina est une magicienne du balayage. Je n\'ai jamais eu un blond aussi naturel et lumineux.', author: 'Camille S.', role: 'Cliente fidèle', company: '', rating: 5 }, { id: '2', quote: 'Enfin un salon qui prend le temps d\'écouter. Ma coupe est parfaite, le soin Olaplex a sauvé mes cheveux.', author: 'Léa B.', role: 'Google Review', company: '', rating: 5 }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'contact', variant: 'creative-with-info', content: { eyebrow: 'Rendez-vous', title: 'Prendre rendez-vous', subtitle: 'En ligne ou par téléphone. Nous vous accueillons du mardi au samedi.', email: 'bonjour@ateliermeches.fr', phone: '+33 1 45 XX XX XX', address: '23 rue de Seine, 75006 Paris' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'site-footer', variant: 'creative', content: { logo: 'ATELIER MÈCHES', tagline: 'Salon de coiffure — Paris 6e', copyright: `© ${year} Atelier Mèches. Tous droits réservés.`, columns: [{ id: '1', title: 'Horaires', links: [{ id: '1', label: 'Mar-Ven : 10h-19h30', href: '#' }, { id: '2', label: 'Sam : 9h-18h', href: '#' }] }], socials: { twitter: '#', linkedin: '#' } }, style: { background: 'dark', paddingY: 'none' }, visible: true },
    ],
  },

  // ─── 20. Architecte d'intérieur — Studio Archi ───
  {
    id: 'architecte-interieur-studio',
    name: 'Architecte d\'intérieur — Studio Archi',
    description: 'Portfolio architecte d\'intérieur luxe avec projets, processus et contact',
    category: 'architecte',
    universe: 'luxe',
    emoji: '🏛️',
    preview: 'from-stone-700 to-neutral-900',
    sections: [
      { type: 'site-header', variant: 'luxe', content: { logo: 'STUDIO ARCHI', links: [{ id: '1', label: 'Projets', href: '#projects' }, { id: '2', label: 'Approche', href: '#approach' }, { id: '3', label: 'Services', href: '#services' }, { id: '4', label: 'Contact', href: '#contact' }], ctaLabel: 'Consultation', ctaHref: '#contact' }, style: { background: 'dark', paddingY: 'none' }, visible: true },
      { type: 'hero', variant: 'luxe', content: { eyebrow: 'Architecture d\'intérieur — Paris & Côte d\'Azur', title: 'Des espaces qui racontent votre histoire', subtitle: 'Camille Orsini conçoit des intérieurs d\'exception alliant fonctionnalité, esthétique et émotion. Résidentiel, hôtellerie et espaces commerciaux.', primaryButton: { label: 'Découvrir nos projets', href: '#projects', variant: 'primary' }, secondaryButton: { label: 'Prendre rendez-vous', href: '#contact', variant: 'outline' } }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'gallery-grid', variant: 'luxe-masonry', content: { eyebrow: 'Projets', title: 'Réalisations sélectionnées', subtitle: 'Une sélection de projets résidentiels et commerciaux.', images: [{ id: '1', src: '', alt: 'Loft Marais', caption: 'Loft 180m² — Le Marais, Paris' }, { id: '2', src: '', alt: 'Hôtel Riviera', caption: 'Hôtel Boutique — Saint-Tropez' }, { id: '3', src: '', alt: 'Appartement haussmannien', caption: 'Haussmannien 250m² — Paris 8e' }, { id: '4', src: '', alt: 'Restaurant design', caption: 'Restaurant Nōma — Paris 2e' }, { id: '5', src: '', alt: 'Villa contemporaine', caption: 'Villa Azur — Cap d\'Antibes' }, { id: '6', src: '', alt: 'Boutique luxe', caption: 'Boutique Maison Céleste — Paris 1er' }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'image-text', variant: 'luxe-image-left', content: { eyebrow: 'Approche', title: 'L\'art de l\'espace vécu', text: 'Chaque projet commence par une écoute attentive. Je m\'immerge dans votre univers, vos habitudes, vos inspirations pour créer un espace qui vous ressemble profondément.\n\nMa signature : des matériaux nobles, des lignes épurées et une lumière naturelle magnifiée. Je collabore avec les meilleurs artisans et fournisseurs pour une exécution irréprochable.', image: { src: '', alt: 'Camille Orsini architecte' }, button: { label: 'Notre processus', href: '#services', variant: 'outline' } }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'steps', variant: 'luxe-vertical', content: { eyebrow: 'Processus', title: 'Comment nous travaillons', items: [{ id: '1', title: 'Consultation & Brief', description: 'Rencontre sur site, analyse de vos besoins, définition du brief créatif et du budget.' }, { id: '2', title: 'Concept & Moodboard', description: 'Recherche d\'inspiration, planches tendances, premières esquisses et choix de matériaux.' }, { id: '3', title: 'Plans & 3D', description: 'Plans techniques détaillés, modélisation 3D photoréaliste et chiffrage artisans.' }, { id: '4', title: 'Suivi de chantier', description: 'Coordination des corps de métier, contrôle qualité et livraison clé en main.' }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'features', variant: 'luxe-grid', content: { eyebrow: 'Services', title: 'Nos prestations', subtitle: 'Un accompagnement complet, de la conception à la livraison.', items: [{ id: '1', icon: '🏠', title: 'Résidentiel', description: 'Appartements, maisons, lofts. Rénovation complète ou décoration. Du brief à la remise des clés.' }, { id: '2', icon: '🏨', title: 'Hôtellerie & Hospitality', description: 'Hôtels boutique, restaurants, bars. Création d\'ambiance et d\'identité spatiale unique.' }, { id: '3', icon: '🏪', title: 'Retail & Bureaux', description: 'Boutiques, showrooms, espaces de travail. Design centré sur l\'expérience client et le bien-être.' }, { id: '4', icon: '📐', title: 'Conseil & Coaching Déco', description: 'Séance de conseil de 2h pour repenser un espace. Plan d\'action et shopping list.' }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'testimonials', variant: 'luxe-featured', content: { eyebrow: 'Témoignages', title: 'Ils nous font confiance', items: [{ id: '1', quote: 'Camille a transformé notre appartement haussmannien en un lieu de vie contemporain tout en préservant son âme. Un travail d\'orfèvre.', author: 'Sophie & Laurent', role: 'Propriétaires', company: 'Paris 8e', rating: 5 }, { id: '2', quote: 'Le design de notre hôtel a été salué par AD Magazine. Camille a un sens inné des proportions et des matières.', author: 'Jean-Michel Duval', role: 'Directeur', company: 'Hôtel Riviera', rating: 5 }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'contact', variant: 'luxe-with-info', content: { eyebrow: 'Contact', title: 'Parlons de votre projet', subtitle: 'Consultation initiale gratuite de 30 minutes. Décrivez-moi votre projet et vos envies.', email: 'camille@studioarchi.fr', phone: '+33 6 XX XX XX XX', address: 'Studio — 8 rue de Beaune, 75007 Paris' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'site-footer', variant: 'luxe', content: { logo: 'STUDIO ARCHI', tagline: 'Architecture d\'intérieur — Paris & Côte d\'Azur', copyright: `© ${year} Studio Archi — Camille Orsini. Tous droits réservés.`, columns: [{ id: '1', title: 'Suivez-nous', links: [{ id: '1', label: 'Instagram', href: '#' }, { id: '2', label: 'Pinterest', href: '#' }, { id: '3', label: 'AD Magazine', href: '#' }] }], socials: { twitter: '#', linkedin: '#' } }, style: { background: 'dark', paddingY: 'none' }, visible: true },
    ],
  },

  // ─── 21. Tatoueur — Encre & Âme ───
  {
    id: 'tatoueur-encre-ame',
    name: 'Tatoueur — Encre & Âme',
    description: 'Portfolio tatoueur avec galerie, styles, booking et infos pratiques',
    category: 'tatoueur',
    universe: 'creative',
    emoji: '🖋️',
    preview: 'from-zinc-800 to-black',
    sections: [
      { type: 'site-header', variant: 'creative', content: { logo: 'ENCRE & ÂME', links: [{ id: '1', label: 'Galerie', href: '#gallery' }, { id: '2', label: 'Styles', href: '#styles' }, { id: '3', label: 'Infos', href: '#info' }, { id: '4', label: 'RDV', href: '#booking' }], ctaLabel: 'Prendre RDV', ctaHref: '#booking' }, style: { background: 'dark', paddingY: 'none' }, visible: true },
      { type: 'hero', variant: 'creative', content: { eyebrow: 'Tatoueur professionnel — Paris 11e', title: 'Chaque tatouage est une pièce unique', subtitle: 'Spécialisé en fine line, dotwork et néo-traditionnel. Des créations sur mesure qui allient précision technique et vision artistique. Sur rendez-vous uniquement.', primaryButton: { label: 'Voir la galerie', href: '#gallery', variant: 'primary' }, secondaryButton: { label: 'Demander un devis', href: '#booking', variant: 'outline' } }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'gallery-grid', variant: 'creative-masonry', content: { eyebrow: 'Portfolio', title: 'Travaux récents', subtitle: 'Sélection de pièces réalisées au studio.', images: [{ id: '1', src: '', alt: 'Fine line floral', caption: 'Fine Line — Pivoine' }, { id: '2', src: '', alt: 'Dotwork géométrique', caption: 'Dotwork — Mandala' }, { id: '3', src: '', alt: 'Néo-trad couleur', caption: 'Néo-Trad — Serpent & Roses' }, { id: '4', src: '', alt: 'Minimaliste', caption: 'Minimaliste — Constellation' }, { id: '5', src: '', alt: 'Blackwork', caption: 'Blackwork — Sleeve' }, { id: '6', src: '', alt: 'Lettering', caption: 'Lettering — Script custom' }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'features', variant: 'creative-grid', content: { eyebrow: 'Styles', title: 'Mes spécialités', subtitle: 'Chaque style a sa technique. Je vous guide vers celui qui correspond le mieux à votre projet.', items: [{ id: '1', icon: '✒️', title: 'Fine Line', description: 'Lignes ultra-fines, détails délicats. Idéal pour les motifs floraux, géométriques et minimalistes.' }, { id: '2', icon: '⚫', title: 'Dotwork', description: 'Technique point par point pour des ombrages subtils. Mandalas, patterns sacrés et ornementaux.' }, { id: '3', icon: '🎨', title: 'Néo-Traditionnel', description: 'Couleurs vives, contours nets, sujets classiques revisités avec une touche moderne.' }, { id: '4', icon: '🖤', title: 'Blackwork', description: 'Grands aplats noirs, motifs tribaux contemporains, sleeves et demi-sleeves.' }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'image-text', variant: 'creative-image-right', content: { eyebrow: 'À propos', title: 'Romain "Enk" Vasseur', text: 'Tatoueur depuis 8 ans, formé en apprentissage puis perfectionné lors de conventions internationales (London Tattoo Convention, Mondial du Tatouage).\n\nMon approche : chaque projet commence par un échange approfondi. Je dessine un design 100% custom qui s\'adapte à votre morphologie et vos envies. Pas de flash, que du sur-mesure.', image: { src: '', alt: 'Romain tatoueur' } }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'steps', variant: 'creative-horizontal', content: { eyebrow: 'Comment ça marche', title: 'Du projet à l\'encre', items: [{ id: '1', title: 'Contact & brief', description: 'Décrivez votre projet via le formulaire : emplacement, taille, style, références visuelles.' }, { id: '2', title: 'Design & validation', description: 'Je crée le design et vous l\'envoie pour validation. Retouches incluses.' }, { id: '3', title: 'Séance tatouage', description: 'Réalisation au studio dans des conditions d\'hygiène irréprochables.' }, { id: '4', title: 'Cicatrisation', description: 'Guide de soin détaillé + suivi post-séance. Retouche gratuite sous 3 mois.' }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'faq', variant: 'creative-accordion', content: { eyebrow: 'FAQ', title: 'Questions fréquentes', items: [{ id: '1', question: 'Combien coûte un tatouage ?', answer: 'Le tarif minimum est de 100€. Au-delà, le prix dépend de la taille, la complexité et le temps. Un devis précis est envoyé après validation du design.' }, { id: '2', question: 'Est-ce que ça fait mal ?', answer: 'La douleur varie selon la zone et la sensibilité de chacun. Les zones les plus sensibles : côtes, pied, cou. Les bras et cuisses sont généralement bien tolérés.' }, { id: '3', question: 'Puis-je venir avec mon propre design ?', answer: 'Bien sûr ! Envoyez-moi vos références et idées, je les adapterai en un design optimisé pour le tatouage.' }, { id: '4', question: 'Faut-il laisser un acompte ?', answer: 'Oui, un acompte de 50€ est demandé pour réserver votre créneau. Il est déduit du prix final.' }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'contact', variant: 'creative-with-info', content: { eyebrow: 'Réservation', title: 'Prendre rendez-vous', subtitle: 'Remplissez le formulaire avec votre projet. Réponse sous 48h. Liste d\'attente : ~3 semaines.', email: 'romain@encreetame.fr', phone: '+33 6 XX XX XX XX', address: 'Studio Encre & Âme — 87 rue Oberkampf, 75011 Paris' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'site-footer', variant: 'creative', content: { logo: 'ENCRE & ÂME', tagline: 'Tatouage custom — Paris 11e', copyright: `© ${year} Encre & Âme. Tous droits réservés.`, columns: [{ id: '1', title: 'Suivez le travail', links: [{ id: '1', label: 'Instagram', href: '#' }, { id: '2', label: 'TikTok', href: '#' }] }], socials: { twitter: '#', linkedin: '#' } }, style: { background: 'dark', paddingY: 'none' }, visible: true },
    ],
  },

  // ─── 22. Institut de beauté — L'Écrin ───
  {
    id: 'institut-beaute-ecrin',
    name: 'Institut de beauté — L\'Écrin',
    description: 'Institut de beauté premium avec soins, tarifs et réservation en ligne',
    category: 'beaute',
    universe: 'luxe',
    emoji: '💎',
    preview: 'from-rose-300 to-pink-400',
    sections: [
      { type: 'site-header', variant: 'luxe', content: { logo: 'L\'ÉCRIN', links: [{ id: '1', label: 'Soins', href: '#soins' }, { id: '2', label: 'Notre Institut', href: '#about' }, { id: '3', label: 'Tarifs', href: '#pricing' }, { id: '4', label: 'Contact', href: '#contact' }], ctaLabel: 'Réserver', ctaHref: '#contact' }, style: { background: 'white', paddingY: 'none' }, visible: true },
      { type: 'hero', variant: 'luxe', content: { eyebrow: 'Institut de beauté — Paris 16e', title: 'Un moment de beauté absolue', subtitle: 'Soins visage sur mesure, épilation définitive, manucure japonaise et massages bien-être. L\'Écrin vous offre une parenthèse de luxe dans un cadre intimiste et raffiné.', primaryButton: { label: 'Réserver un soin', href: '#contact', variant: 'primary' }, secondaryButton: { label: 'Découvrir les soins', href: '#soins', variant: 'outline' } }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'features', variant: 'luxe-bento', content: { eyebrow: 'Nos soins', title: 'L\'excellence au service de votre beauté', subtitle: 'Des protocoles exclusifs avec des produits de haute cosmétique.', items: [{ id: '1', icon: '✨', title: 'Soins Visage Premium', description: 'Diagnostic peau, nettoyage en profondeur, sérums ciblés et massage kobido. Résultats visibles dès la première séance.' }, { id: '2', icon: '💅', title: 'Manucure & Pédicure', description: 'Manucure japonaise P-Shine, pose semi-permanent, nail art. Pédicure médicale et esthétique.' }, { id: '3', icon: '🌿', title: 'Massages Bien-être', description: 'Massage californien, pierres chaudes, drainage lymphatique. Durées 30, 60 ou 90 minutes.' }, { id: '4', icon: '⚡', title: 'Épilation Définitive', description: 'Lumière pulsée dernière génération. Protocole personnalisé, résultats permanents en 6-8 séances.' }] }, style: { background: 'light', paddingY: 'xl' }, visible: true },
      { type: 'image-text', variant: 'luxe-image-right', content: { eyebrow: 'Notre institut', title: 'Un écrin de sérénité', text: 'Niché au cœur du 16e arrondissement, L\'Écrin est un espace de 120m² entièrement dédié à votre bien-être. Trois cabines privées, un espace détente avec tisanerie, et une équipe de 4 esthéticiennes diplômées.\n\nNous travaillons exclusivement avec des marques de haute cosmétique : Biologique Recherche, Augustinus Bader, Dr. Barbara Sturm.', image: { src: '', alt: 'Institut l\'Écrin intérieur' } }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'pricing', variant: 'luxe-columns', content: { eyebrow: 'Tarifs', title: 'Nos formules', subtitle: 'Carte cadeau disponible pour toutes les prestations.', plans: [{ id: 'visage', name: 'Soin Visage', price: 'Dès 95€', period: '', description: 'Éclat & Jeunesse', highlighted: false, cta: 'Réserver', ctaHref: '#contact', features: [{ text: 'Diagnostic de peau', included: true }, { text: 'Nettoyage profond', included: true }, { text: 'Soin ciblé (rides, taches, éclat)', included: true }, { text: 'Massage kobido 15min', included: true }] }, { id: 'rituel', name: 'Rituel Signature', price: '195€', period: '', description: '2h de soin complet', highlighted: true, badge: 'Best-seller', cta: 'Réserver', ctaHref: '#contact', features: [{ text: 'Gommage corps complet', included: true }, { text: 'Enveloppement aux algues', included: true }, { text: 'Massage relaxant 45min', included: true }, { text: 'Soin visage express', included: true }] }, { id: 'epilation', name: 'Épilation Lumière', price: 'Dès 60€', period: '/séance', description: 'Résultats définitifs', highlighted: false, cta: 'Consultation', ctaHref: '#contact', features: [{ text: 'Consultation gratuite', included: true }, { text: 'Test cutané', included: true }, { text: 'Séance personnalisée', included: true }, { text: 'Suivi post-traitement', included: true }] }] }, style: { background: 'light', paddingY: 'xl' }, visible: true },
      { type: 'testimonials', variant: 'luxe-marquee', content: { eyebrow: 'Avis', title: 'Elles recommandent L\'Écrin', items: [{ id: '1', quote: 'Le soin visage Biologique Recherche a transformé ma peau. Le cadre est magnifique et l\'équipe aux petits soins.', author: 'Isabelle D.', role: 'Soin visage', company: '', rating: 5 }, { id: '2', quote: 'Le Rituel Signature est un pur bonheur. 2 heures de détente absolue. Je l\'offre à toutes mes amies.', author: 'Marie-Claire P.', role: 'Rituel Signature', company: '', rating: 5 }, { id: '3', quote: 'Après 6 séances d\'épilation lumière pulsée, plus un seul poil. Résultat bluffant et zéro douleur.', author: 'Sophia K.', role: 'Épilation définitive', company: '', rating: 5 }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'contact', variant: 'luxe-with-info', content: { eyebrow: 'Réservation', title: 'Prendre rendez-vous', subtitle: 'Par téléphone ou en ligne. Ouvert du mardi au samedi, 10h-19h.', email: 'contact@lecrin-beaute.fr', phone: '+33 1 46 XX XX XX', address: '14 rue de la Pompe, 75116 Paris' }, style: { background: 'light', paddingY: 'xl' }, visible: true },
      { type: 'site-footer', variant: 'luxe', content: { logo: 'L\'ÉCRIN', tagline: 'Institut de beauté — Paris 16e', copyright: `© ${year} L'Écrin. Tous droits réservés.`, columns: [{ id: '1', title: 'Horaires', links: [{ id: '1', label: 'Mar-Sam : 10h-19h', href: '#' }] }, { id: '2', title: 'Nous suivre', links: [{ id: '1', label: 'Instagram', href: '#' }, { id: '2', label: 'Google Maps', href: '#' }] }], socials: { twitter: '#', linkedin: '#' } }, style: { background: 'dark', paddingY: 'none' }, visible: true },
    ],
  },

  // ─── 23. DJ — NØVA ───
  {
    id: 'dj-nova',
    name: 'DJ — NØVA',
    description: 'Site DJ/producteur avec bio, mixes, événements et booking',
    category: 'dj',
    universe: 'glass',
    emoji: '🎧',
    preview: 'from-violet-600 to-fuchsia-700',
    sections: [
      { type: 'site-header', variant: 'glass', content: { logo: 'NØVA', links: [{ id: '1', label: 'Mixes', href: '#mixes' }, { id: '2', label: 'Events', href: '#events' }, { id: '3', label: 'Bio', href: '#bio' }, { id: '4', label: 'Booking', href: '#booking' }], ctaLabel: 'Booking', ctaHref: '#booking' }, style: { background: 'dark', paddingY: 'none' }, visible: true },
      { type: 'hero', variant: 'glass', content: { eyebrow: 'DJ & Producer — House / Techno / Afro', title: 'Feel the frequency', subtitle: 'Basé à Paris, NØVA fusionne house progressive, techno mélodique et percussions afro dans des sets hypnotiques. Résidences Rex Club, Concrete, Fabric London.', primaryButton: { label: 'Écouter les mixes', href: '#mixes', variant: 'primary' }, secondaryButton: { label: 'Booking request', href: '#booking', variant: 'outline' } }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'gallery-grid', variant: 'glass-grid', content: { eyebrow: 'Derniers mixes', title: 'Écouter', subtitle: 'Sélection de mes derniers sets et productions.', images: [{ id: '1', src: '', alt: 'Mix 1', caption: 'Sunrise Set — Ibiza Opening 2025 · 2h15' }, { id: '2', src: '', alt: 'Mix 2', caption: 'Rex Club Residency — Mars 2026 · 1h45' }, { id: '3', src: '', alt: 'Mix 3', caption: 'Afro House Special — Boiler Room · 1h30' }, { id: '4', src: '', alt: 'Production', caption: 'EP "Frequencies" — Afterlife Records · 3 tracks' }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'stats', variant: 'glass-grid', content: { eyebrow: 'En chiffres', title: 'NØVA worldwide', items: [{ id: '1', value: '200+', label: 'Shows / an', description: 'Clubs & festivals' }, { id: '2', value: '850K', label: 'Auditeurs mensuels', description: 'Spotify + SoundCloud' }, { id: '3', value: '15', label: 'Pays', description: 'Europe, Afrique, Amérique' }, { id: '4', value: '3', label: 'Labels', description: 'Afterlife, Innervisions, Keinemusik' }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'features', variant: 'glass-list', content: { eyebrow: 'Prochains événements', title: 'Agenda 2026', items: [{ id: '1', icon: '📍', title: '22 Mars — Rex Club, Paris', description: 'Résidence mensuelle. 23h-6h. Line-up : NØVA b2b Einmusik. Préventes : 15€.' }, { id: '2', icon: '📍', title: '5 Avril — Fabric, London', description: 'Room 1. 22h-4h. Guest set pour Afterlife Night. Préventes via Resident Advisor.' }, { id: '3', icon: '📍', title: '1-3 Mai — Sonar Festival, Barcelona', description: 'SonarClub Stage. Set samedi 2h00-3h30. Badge festival requis.' }, { id: '4', icon: '📍', title: '21 Juin — Fête de la Musique, Paris', description: 'Open air gratuit — Parvis de l\'Hôtel de Ville. 18h-00h. Set 21h-22h30.' }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'image-text', variant: 'glass-image-left', content: { eyebrow: 'Bio', title: 'NØVA', text: 'Né à Paris, bercé par les sonorités ouest-africaines de ses parents et la scène électronique des clubs parisiens, NØVA développe un son unique à la croisée des cultures.\n\nAprès 5 ans de résidences dans les clubs européens et un EP remarqué sur Afterlife, il s\'impose comme une figure montante de la scène house/techno francophone. Ses sets sont des voyages : progressifs, hypnotiques, émotionnels.', image: { src: '', alt: 'NØVA DJ' } }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'testimonials', variant: 'glass-featured', content: { eyebrow: 'Press', title: 'Ils parlent de NØVA', items: [{ id: '1', quote: 'Un des DJ les plus excitants de la nouvelle scène française. Son EP "Frequencies" est un bijou de production.', author: 'Resident Advisor', role: '', company: 'Review', rating: 5 }, { id: '2', quote: 'NØVA réinvente la house avec une sensibilité rare. Ses sets à Concrete sont devenus légendaires.', author: 'Trax Magazine', role: '', company: 'Interview', rating: 5 }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'contact', variant: 'glass-simple', content: { eyebrow: 'Booking', title: 'Booking & Collaborations', subtitle: 'Pour toute demande de booking, résidence ou collaboration, contactez mon agent ou écrivez-moi directement.', email: 'booking@nova-music.com', phone: '' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'site-footer', variant: 'glass', content: { logo: 'NØVA', tagline: 'DJ & Producer — Paris', copyright: `© ${year} NØVA. All rights reserved.`, columns: [{ id: '1', title: 'Écouter', links: [{ id: '1', label: 'Spotify', href: '#' }, { id: '2', label: 'SoundCloud', href: '#' }, { id: '3', label: 'Bandcamp', href: '#' }] }, { id: '2', title: 'Suivre', links: [{ id: '1', label: 'Instagram', href: '#' }, { id: '2', label: 'Resident Advisor', href: '#' }] }], socials: { twitter: '#', linkedin: '#' } }, style: { background: 'dark', paddingY: 'none' }, visible: true },
    ],
  },

  // ─── 24. Traiteur — Les Saveurs d'Hélène ───
  {
    id: 'traiteur-saveurs-helene',
    name: 'Traiteur — Les Saveurs d\'Hélène',
    description: 'Traiteur événementiel avec menus, prestations et demande de devis',
    category: 'traiteur',
    universe: 'luxe',
    emoji: '🥂',
    preview: 'from-amber-600 to-orange-800',
    sections: [
      { type: 'site-header', variant: 'luxe', content: { logo: 'LES SAVEURS D\'HÉLÈNE', links: [{ id: '1', label: 'Prestations', href: '#prestations' }, { id: '2', label: 'Menus', href: '#menus' }, { id: '3', label: 'Galerie', href: '#gallery' }, { id: '4', label: 'Devis', href: '#contact' }], ctaLabel: 'Devis gratuit', ctaHref: '#contact' }, style: { background: 'dark', paddingY: 'none' }, visible: true },
      { type: 'hero', variant: 'luxe', content: { eyebrow: 'Traiteur événementiel — Paris & Île-de-France', title: 'Des saveurs qui subliment vos événements', subtitle: 'Mariages, galas, séminaires, cocktails. Hélène et son équipe créent des expériences culinaires sur mesure avec des produits frais, locaux et de saison.', primaryButton: { label: 'Demander un devis', href: '#contact', variant: 'primary' }, secondaryButton: { label: 'Voir nos menus', href: '#menus', variant: 'outline' } }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'features', variant: 'luxe-bento', content: { eyebrow: 'Prestations', title: 'Un service complet pour chaque occasion', subtitle: 'De l\'apéritif au dessert, nous prenons en charge l\'intégralité de votre événement.', items: [{ id: '1', icon: '💍', title: 'Mariages', description: 'Menu gastronomique, cocktail dinatoire ou brunch du lendemain. De 30 à 300 convives.' }, { id: '2', icon: '🏢', title: 'Événements corporate', description: 'Séminaires, lancements produit, team building. Formules petit-déjeuner, déjeuner et cocktail.' }, { id: '3', icon: '🥂', title: 'Cocktails & Réceptions', description: 'Pièces cocktail créatives, verrines, finger food. Service debout élégant et fluide.' }, { id: '4', icon: '🍽️', title: 'Dîners privés', description: 'Chef à domicile pour vos dîners intimistes de 8 à 30 personnes. Expérience gastronomique chez vous.' }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'gallery-grid', variant: 'luxe-masonry', content: { eyebrow: 'Galerie', title: 'Nos réalisations', subtitle: 'Un aperçu de nos derniers événements.', images: [{ id: '1', src: '', alt: 'Mariage champêtre', caption: 'Mariage — Château de Fontainebleau — 180 convives' }, { id: '2', src: '', alt: 'Cocktail corporate', caption: 'Cocktail — Lancement Chanel — Palais de Tokyo' }, { id: '3', src: '', alt: 'Buffet desserts', caption: 'Table sucrée — Mariage d\'été' }, { id: '4', src: '', alt: 'Dîner assis', caption: 'Gala — Fondation Cartier — Menu 5 services' }, { id: '5', src: '', alt: 'Finger food', caption: 'Pièces cocktail — Séminaire L\'Oréal' }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'pricing', variant: 'luxe-columns', content: { eyebrow: 'Menus', title: 'Nos formules', subtitle: 'Tarifs par personne — menus personnalisables selon vos envies et votre budget.', plans: [{ id: 'cocktail', name: 'Cocktail', price: 'Dès 45€', period: '/pers.', description: '12 pièces + boissons', highlighted: false, cta: 'Demander un devis', ctaHref: '#contact', features: [{ text: '8 pièces salées', included: true }, { text: '4 pièces sucrées', included: true }, { text: 'Boissons (3h)', included: true }, { text: 'Service & vaisselle', included: true }] }, { id: 'diner', name: 'Dîner Assis', price: 'Dès 85€', period: '/pers.', description: 'Menu 4 services', highlighted: true, badge: 'Best-seller', cta: 'Demander un devis', ctaHref: '#contact', features: [{ text: 'Amuse-bouche + entrée', included: true }, { text: 'Plat principal', included: true }, { text: 'Fromage & dessert', included: true }, { text: 'Vins, service, personnel', included: true }] }, { id: 'prestige', name: 'Prestige', price: 'Dès 150€', period: '/pers.', description: 'Expérience complète', highlighted: false, cta: 'Demander un devis', ctaHref: '#contact', features: [{ text: 'Cocktail + dîner 5 services', included: true }, { text: 'Produits d\'exception', included: true }, { text: 'Accord mets-vins premium', included: true }, { text: 'Maître d\'hôtel dédié', included: true }] }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'image-text', variant: 'luxe-image-left', content: { eyebrow: 'Notre philosophie', title: 'Hélène Marchand', text: 'Formée chez Alain Passard (L\'Arpège) et ancienne cheffe du George V, Hélène fonde son service traiteur en 2018 avec une conviction : la grande cuisine peut être conviviale.\n\nChaque menu est créé sur mesure avec des producteurs locaux triés sur le volet. Nous cuisinons tout sur place, le jour même, pour garantir une fraîcheur et une qualité irréprochables.', image: { src: '', alt: 'Hélène Marchand cheffe' }, button: { label: 'Nos producteurs', href: '#', variant: 'outline' } }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'testimonials', variant: 'luxe-featured', content: { eyebrow: 'Témoignages', title: 'Ils nous ont fait confiance', items: [{ id: '1', quote: 'Hélène a sublimé notre mariage. Chaque plat était un chef-d\'œuvre, nos invités en parlent encore 6 mois après.', author: 'Marine & Julien', role: 'Mariage', company: '180 convives — Château de Vaux', rating: 5 }, { id: '2', quote: 'Service impeccable pour notre gala annuel. L\'équipe est professionnelle, discrète et les mets étaient exceptionnels.', author: 'Nathalie Blanc', role: 'Dir. Communication', company: 'Fondation Cartier', rating: 5 }, { id: '3', quote: 'Le dîner privé chez nous était magique. Hélène en cheffe à domicile, c\'est l\'assurance d\'une soirée parfaite.', author: 'Philippe & Anne', role: 'Dîner anniversaire', company: '20 convives', rating: 5 }] }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'contact', variant: 'luxe-with-info', content: { eyebrow: 'Devis', title: 'Parlons de votre événement', subtitle: 'Décrivez-nous votre projet : date, lieu, nombre de convives, style souhaité. Devis sous 48h.', email: 'contact@saveurs-helene.fr', phone: '+33 6 XX XX XX XX', address: 'Laboratoire — 12 rue des Artisans, 93100 Montreuil' }, style: { background: 'dark', paddingY: 'xl' }, visible: true },
      { type: 'site-footer', variant: 'luxe', content: { logo: 'LES SAVEURS D\'HÉLÈNE', tagline: 'Traiteur événementiel — Paris & Île-de-France', copyright: `© ${year} Les Saveurs d'Hélène. Tous droits réservés.`, columns: [{ id: '1', title: 'Navigation', links: [{ id: '1', label: 'Prestations', href: '#' }, { id: '2', label: 'Menus', href: '#' }, { id: '3', label: 'Galerie', href: '#' }] }], socials: { twitter: '#', linkedin: '#' } }, style: { background: 'dark', paddingY: 'none' }, visible: true },
    ],
  },

  // ─── 25. Coach Business — Ascend ───
  {
    id: 'coach-business-ascend',
    name: 'Coach Business — Ascend',
    description: 'Coach business/entrepreneur avec méthode, programmes et témoignages',
    category: 'coach',
    universe: 'corporate',
    emoji: '📈',
    preview: 'from-blue-700 to-indigo-900',
    sections: [
      { type: 'site-header', variant: 'corporate', content: { logo: 'ASCEND', links: [{ id: '1', label: 'Méthode', href: '#method' }, { id: '2', label: 'Programmes', href: '#programs' }, { id: '3', label: 'Résultats', href: '#results' }, { id: '4', label: 'Contact', href: '#contact' }], ctaLabel: 'Appel découverte', ctaHref: '#contact' }, style: { background: 'white', paddingY: 'none' }, visible: true },
      { type: 'hero', variant: 'corporate', content: { eyebrow: 'Coaching business & leadership', title: 'Passez au niveau supérieur', subtitle: 'Entrepreneurs, dirigeants, managers : développez votre leadership, structurez votre croissance et atteignez vos objectifs avec un accompagnement stratégique personnalisé.', primaryButton: { label: 'Réserver mon appel gratuit', href: '#contact', variant: 'primary' }, secondaryButton: { label: 'Découvrir la méthode', href: '#method', variant: 'outline' } }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'logos', variant: 'corporate-strip', content: { title: 'Ils ont été accompagnés par Ascend', items: [{ id: '1', name: 'Doctolib' }, { id: '2', name: 'Qonto' }, { id: '3', name: 'BlaBlaCar' }, { id: '4', name: 'ManoMano' }, { id: '5', name: 'Back Market' }] }, style: { background: 'light', paddingY: 'md' }, visible: true },
      { type: 'stats', variant: 'corporate-highlight', content: { eyebrow: 'Impact', title: 'Des résultats mesurables', items: [{ id: '1', value: '300+', label: 'Dirigeants accompagnés', description: 'Depuis 2018' }, { id: '2', value: '+47%', label: 'Croissance moyenne', description: 'CA des coachés à 12 mois' }, { id: '3', value: '94%', label: 'Recommandent', description: 'Le programme à leurs pairs' }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'steps', variant: 'corporate-horizontal', content: { eyebrow: 'La méthode ASCEND', title: 'Un framework éprouvé en 4 phases', items: [{ id: '1', title: 'Audit & Diagnostic', description: 'Analyse approfondie de votre situation : business model, organisation, leadership, blocages.' }, { id: '2', title: 'Stratégie & Roadmap', description: 'Définition des objectifs chiffrés et du plan d\'action à 90 jours, 6 mois et 12 mois.' }, { id: '3', title: 'Coaching intensif', description: 'Sessions hebdomadaires de 60min + accès aux outils et frameworks Ascend.' }, { id: '4', title: 'Ancrage & Autonomie', description: 'Consolidation des acquis, mise en place de rituels et passage en coaching mensuel.' }] }, style: { background: 'light', paddingY: 'xl' }, visible: true },
      { type: 'features', variant: 'corporate-bento', content: { eyebrow: 'Programmes', title: 'Choisissez votre parcours', subtitle: 'Trois programmes adaptés à votre étape de développement.', items: [{ id: '1', icon: '🚀', title: 'Lancer — Entrepreneur solo', description: 'Structurez votre offre, trouvez vos premiers clients et atteignez vos premiers 100K€ de CA.' }, { id: '2', icon: '📈', title: 'Scaler — Dirigeant PME', description: 'Passez de 5 à 50 collaborateurs, structurez vos process et déléguez efficacement.' }, { id: '3', icon: '👑', title: 'Leader — Comité de direction', description: 'Développez votre posture de leader, gérez les crises et alignez vos équipes sur la vision.' }, { id: '4', icon: '🎓', title: 'Masterclass (en ligne)', description: 'Programme vidéo de 12 semaines avec exercices, templates et 2 sessions de coaching live.' }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'testimonials', variant: 'corporate-featured', content: { eyebrow: 'Témoignages', title: 'Ils ont transformé leur business', items: [{ id: '1', quote: 'En 8 mois de coaching avec Ascend, j\'ai doublé mon CA et recruté mes 3 premiers salariés. Le framework est redoutablement efficace.', author: 'Karim Benali', role: 'Fondateur', company: 'AgTech Solutions', rating: 5 }, { id: '2', quote: 'Le programme Leader m\'a permis de prendre du recul et de passer de manager opérationnel à vrai dirigeant. Indispensable.', author: 'Céline Durand', role: 'DG', company: 'Groupe MediaLab', rating: 5 }, { id: '3', quote: 'La Masterclass en ligne est dense et concrète. Les templates business sont immédiatement applicables.', author: 'Lucas Martin', role: 'Freelance', company: 'Consultant IT', rating: 5 }] }, style: { background: 'light', paddingY: 'xl' }, visible: true },
      { type: 'pricing', variant: 'corporate-columns', content: { eyebrow: 'Investissement', title: 'Tarifs des programmes', subtitle: 'Éligible OPCO et crédit d\'impôt formation. Facilités de paiement disponibles.', plans: [{ id: 'masterclass', name: 'Masterclass', price: '997€', period: '', description: '12 semaines en ligne', highlighted: false, cta: 'S\'inscrire', ctaHref: '#contact', features: [{ text: '36 vidéos de formation', included: true }, { text: 'Templates & frameworks', included: true }, { text: '2 sessions live Q&A', included: true }, { text: 'Coaching 1:1', included: false }] }, { id: 'coaching', name: 'Coaching Individuel', price: '2 500€', period: '/mois', description: '6 mois minimum', highlighted: true, badge: 'Best-seller', cta: 'Appel découverte', ctaHref: '#contact', features: [{ text: '4 sessions/mois de 60min', included: true }, { text: 'Accès Masterclass inclus', included: true }, { text: 'Support WhatsApp illimité', included: true }, { text: 'Audit business complet', included: true }] }, { id: 'comite', name: 'Programme Leader', price: 'Sur mesure', period: '', description: 'Comité de direction', highlighted: false, cta: 'Nous contacter', ctaHref: '#contact', features: [{ text: 'Diagnostic organisationnel', included: true }, { text: 'Coaching collectif CODIR', included: true }, { text: 'Ateliers leadership', included: true }, { text: 'Suivi trimestriel', included: true }] }] }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'faq', variant: 'corporate-accordion', content: { eyebrow: 'FAQ', title: 'Questions fréquentes', items: [{ id: '1', question: 'L\'appel découverte est-il gratuit ?', answer: 'Oui, 30 minutes sans engagement pour comprendre votre situation et voir si nous pouvons travailler ensemble.' }, { id: '2', question: 'Le coaching est-il finançable ?', answer: 'Oui, nos programmes sont éligibles au financement OPCO et au crédit d\'impôt formation. Nous vous accompagnons dans les démarches.' }, { id: '3', question: 'Combien de temps dure un accompagnement ?', answer: 'Le programme standard est de 6 mois. Certains dirigeants poursuivent en coaching mensuel de maintien pendant 1 à 2 ans.' }] }, style: { background: 'light', paddingY: 'xl' }, visible: true },
      { type: 'cta', variant: 'corporate-split', content: { badge: 'Places limitées', title: 'Prêt à accélérer ?', subtitle: 'Réservez votre appel découverte gratuit de 30 minutes et explorons ensemble vos objectifs.', primaryButton: { label: 'Réserver mon appel gratuit', href: '#contact', variant: 'primary' }, secondaryButton: { label: 'Télécharger le guide', href: '#', variant: 'outline' } }, style: { background: 'white', paddingY: 'xl' }, visible: true },
      { type: 'site-footer', variant: 'corporate', content: { logo: 'ASCEND', tagline: 'Coaching business & leadership', copyright: `© ${year} Ascend Coaching. Tous droits réservés.`, columns: [{ id: '1', title: 'Programmes', links: [{ id: '1', label: 'Masterclass', href: '#' }, { id: '2', label: 'Coaching', href: '#' }, { id: '3', label: 'Leader', href: '#' }] }, { id: '2', title: 'Ressources', links: [{ id: '1', label: 'Blog', href: '#' }, { id: '2', label: 'Podcast', href: '#' }, { id: '3', label: 'Newsletter', href: '#' }] }], socials: { twitter: '#', linkedin: '#' } }, style: { background: 'dark', paddingY: 'none' }, visible: true },
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
]
