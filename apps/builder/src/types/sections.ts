import type { SectionConfig } from './site'

// ─────────────────────────────────────────────
// TYPES COMMUNS
// ─────────────────────────────────────────────

export interface ButtonConfig {
  label: string
  href: string
  variant: 'primary' | 'secondary' | 'outline' | 'ghost'
}

export interface ImageConfig {
  src: string
  alt: string
}

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────

export type HeroVariant = 'startup' | 'corporate' | 'luxe' | 'creative' | 'ecommerce' | 'glass' | 'brixsa' | 'brixsa-page' | 'zmr-agency' | 'zmr-talent-profile'

export interface HeroContent {
  eyebrow?: string
  title: string
  subtitle: string
  primaryButton?: ButtonConfig
  secondaryButton?: ButtonConfig
  image?: ImageConfig
  backgroundImage?: string
  decorativeImage?: string
  videoUrl?: string
  posterImage?: string
  autoplay?: boolean
  price?: string
  originalPrice?: string
  trustText?: string
  badge?: string
}

export interface HeroConfig extends SectionConfig {
  type: 'hero'
  variant: HeroVariant
  content: HeroContent
}

// ─────────────────────────────────────────────
// FEATURES
// ─────────────────────────────────────────────

export type FeaturesVariant =
  | 'startup-grid' | 'startup-bento' | 'startup-list'
  | 'corporate-grid' | 'corporate-bento' | 'corporate-list'
  | 'luxe-grid' | 'luxe-bento' | 'luxe-list'
  | 'creative-grid' | 'creative-bento' | 'creative-list'
  | 'ecommerce-grid' | 'ecommerce-bento' | 'ecommerce-list'
  | 'glass-grid' | 'glass-bento' | 'glass-list'
  | 'brixsa-accordion'
  | 'brixsa-services'
  | 'brixsa-location'
  | 'zmr-events'
  | 'zmr-measurements'
  | 'zmr-experience'

export interface FeatureItem {
  id: string
  icon: string
  title: string
  description: string
}

export interface FeaturesContent {
  eyebrow?: string
  title: string
  subtitle?: string
  items: FeatureItem[]
  decorativeIcon?: string
  columns?: number
  primaryButton?: ButtonConfig
  secondaryButton?: ButtonConfig
}

export interface FeaturesConfig extends SectionConfig {
  type: 'features'
  variant: FeaturesVariant
  content: FeaturesContent
}

// ─────────────────────────────────────────────
// CTA
// ─────────────────────────────────────────────

export type CTAVariant =
  | 'startup-centered' | 'startup-split' | 'startup-card'
  | 'corporate-centered' | 'corporate-split' | 'corporate-card'
  | 'luxe-centered' | 'luxe-split' | 'luxe-card'
  | 'creative-centered' | 'creative-split' | 'creative-card'
  | 'ecommerce-centered' | 'ecommerce-split' | 'ecommerce-card'
  | 'glass-centered' | 'glass-split' | 'glass-card'
  // legacy
  | 'centered' | 'split' | 'banner' | 'card' | 'countdown'
  | 'brixsa-centered'

export interface CTAContent {
  title: string
  subtitle?: string
  primaryButton?: ButtonConfig
  secondaryButton?: ButtonConfig
  badge?: string
  icon?: string
  dismissible?: boolean
  targetDate?: string
}

export interface CTAConfig extends SectionConfig {
  type: 'cta'
  variant: CTAVariant
  content: CTAContent
}

// ─────────────────────────────────────────────
// STATS
// ─────────────────────────────────────────────

export type StatsVariant =
  | 'startup-simple' | 'startup-cards' | 'startup-highlight'
  | 'corporate-simple' | 'corporate-cards' | 'corporate-highlight'
  | 'luxe-simple' | 'luxe-cards' | 'luxe-highlight'
  | 'creative-simple' | 'creative-cards' | 'creative-highlight'
  | 'ecommerce-simple' | 'ecommerce-cards' | 'ecommerce-highlight'
  | 'glass-simple' | 'glass-cards' | 'glass-highlight'
  | 'review-stars'

export interface StatItem {
  id: string
  value: string
  label: string
  description?: string
}

export interface ReviewSource {
  id: string
  name: string
  rating: number
  count: string
  logo?: string
}

export interface StatsContent {
  eyebrow?: string
  title?: string
  items: StatItem[]
  average?: string
  sources?: ReviewSource[]
}

export interface StatsConfig extends SectionConfig {
  type: 'stats'
  variant: StatsVariant
  content: StatsContent
}

// ─────────────────────────────────────────────
// DEFAULTS PAR SECTION
// ─────────────────────────────────────────────

export const DEFAULT_HERO_CONTENT: HeroContent = {
  eyebrow: 'Lancez-vous en 2025',
  title: 'Reduisez vos couts operationnels de 73%',
  subtitle: 'La plateforme tout-en-un qui automatise vos workflows, centralise vos donnees et accelere votre croissance. Deja adoptee par 12 000+ entreprises.',
  primaryButton: { label: 'Demarrer l\'essai gratuit', href: '#', variant: 'primary' },
  secondaryButton: { label: 'Voir la demo en direct', href: '#demo', variant: 'outline' },
}

export const DEFAULT_FEATURES_CONTENT: FeaturesContent = {
  eyebrow: 'Plateforme complete',
  title: 'Tout ce qu\'il faut pour scaler',
  subtitle: 'Des outils de pointe connectes entre eux pour eliminer les frictions et multiplier votre impact.',
  items: [
    { id: '1', icon: 'zap', title: 'Performance sub-seconde', description: 'Infrastructure edge-first avec un temps de reponse median de 47ms. Vos utilisateurs n\'attendent jamais.' },
    { id: '2', icon: 'lock', title: 'Securite enterprise', description: 'SOC 2 Type II, chiffrement AES-256, SSO SAML et audit logs detailles pour chaque action.' },
    { id: '3', icon: 'refresh-cw', title: 'Automatisations intelligentes', description: 'Creez des workflows complexes sans code. Plus de 200 connecteurs natifs avec vos outils existants.' },
    { id: '4', icon: 'bar-chart-3', title: 'Analytics en temps reel', description: 'Tableaux de bord personnalisables avec metriques cles, alertes et rapports automatises chaque semaine.' },
    { id: '5', icon: 'globe', title: 'Multi-langue & multi-devise', description: 'Deployez dans 40+ pays avec localisation automatique, conformite fiscale et paiements locaux.' },
    { id: '6', icon: 'bot', title: 'IA predictive integree', description: 'Anticipez le churn, optimisez vos prix et personnalisez l\'experience grace au machine learning.' },
  ],
}

export const DEFAULT_CTA_CONTENT: CTAContent = {
  badge: 'Offre limitee — Janvier 2025',
  title: 'Pret a accelerer votre croissance ?',
  subtitle: 'Rejoignez 12 000+ entreprises qui ont deja reduit leurs couts de 73% en moyenne.',
  primaryButton: { label: 'Commencer gratuitement — 14 jours', href: '#', variant: 'primary' },
  secondaryButton: { label: 'Planifier une demo', href: '#demo', variant: 'outline' },
}

export const DEFAULT_STATS_CONTENT: StatsContent = {
  eyebrow: 'Impact mesurable',
  title: 'Des resultats concrets, pas des promesses',
  items: [
    { id: '1', value: '12M+', label: 'Transactions traitees', description: 'Chaque mois sur notre infrastructure' },
    { id: '2', value: '73%', label: 'Reduction des couts', description: 'En moyenne pour nos clients enterprise' },
    { id: '3', value: '99.99%', label: 'Disponibilite', description: 'SLA garanti avec penalites contractuelles' },
    { id: '4', value: '< 4h', label: 'Time-to-value', description: 'De l\'inscription au premier workflow en prod' },
  ],
}

// ─────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────

export interface TestimonialItem {
  id: string
  quote: string
  author: string
  role: string
  company?: string
  avatar?: string
  rating?: number
  description?: string
}

export interface TestimonialsContent {
  eyebrow?: string
  title: string
  subtitle?: string
  items: TestimonialItem[]
  decorativeIcon?: string
  primaryButton?: ButtonConfig
  showArrows?: boolean
  cardShadow?: boolean
  arrowStyle?: string
}

// ─────────────────────────────────────────────
// PRICING
// ─────────────────────────────────────────────

export interface PricingFeature {
  text: string
  included: boolean
}

export interface PricingPlan {
  id: string
  name: string
  price: string
  period: string
  description: string
  features: PricingFeature[]
  cta: string
  ctaHref: string
  highlighted: boolean
  badge?: string
}

export interface PricingContent {
  eyebrow?: string
  title: string
  subtitle?: string
  plans: PricingPlan[]
}

// ─────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────

export interface FAQItem {
  id: string
  question: string
  answer: string
}

export interface FAQContent {
  eyebrow?: string
  title: string
  subtitle?: string
  items: FAQItem[]
}

// ─────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────

export interface ContactContent {
  eyebrow?: string
  title: string
  subtitle?: string
  email?: string
  phone?: string
  address?: string
  formTitle?: string
  formButtonLabel?: string
  successMessage?: string
  embedUrl?: string
}

// ─────────────────────────────────────────────
// FORM (configurable form builder)
// ─────────────────────────────────────────────

import type { FormField } from './crm'

export type FormVariant =
  | 'startup-default' | 'startup-split'
  | 'corporate-default' | 'corporate-split'
  | 'luxe-default' | 'luxe-split'
  | 'creative-default' | 'creative-split'
  | 'ecommerce-default' | 'ecommerce-split'
  | 'glass-default' | 'glass-split'

export interface FormContent {
  title?: string
  subtitle?: string
  fields: FormField[]
  submitLabel: string
  successMessage: string
  errorMessage?: string
  redirectUrl?: string
  formName?: string
  captchaType?: 'none' | 'recaptcha-v2' | 'recaptcha-v3' | 'hcaptcha'
  captchaKey?: string
  honeypot?: boolean
  emailNotification?: {
    enabled: boolean
    to: string
    subject: string
  }
  createContact?: boolean
  webhookUrl?: string
}

export interface FormConfig extends SectionConfig {
  type: 'form'
  variant: FormVariant
  content: FormContent
}

// ─────────────────────────────────────────────
// LOGOS
// ─────────────────────────────────────────────

export interface LogoItem {
  id: string
  name: string
  logo?: string
  quote?: string
  url?: string
}

export interface LogosContent {
  eyebrow?: string
  title?: string
  items: LogoItem[]
}

// ─────────────────────────────────────────────
// TEAM
// ─────────────────────────────────────────────

export interface TeamMember {
  id: string
  name: string
  role: string
  bio?: string
  avatar?: string
  linkedin?: string
  twitter?: string
}

export interface TeamContent {
  eyebrow?: string
  title: string
  subtitle?: string
  members: TeamMember[]
}

// ─────────────────────────────────────────────
// DEFAULTS (new sections)
// ─────────────────────────────────────────────

export const DEFAULT_TESTIMONIALS_CONTENT: TestimonialsContent = {
  eyebrow: 'Retours clients',
  title: 'Ils ont transforme leur business',
  subtitle: 'Decouvrez comment nos clients ont atteint des resultats exceptionnels.',
  items: [
    { id: '1', quote: 'Nous avons reduit notre time-to-market de 6 semaines a 4 jours. L\'equipe produit ne peut plus s\'en passer.', author: 'Camille Vasseur', role: 'VP Product', company: 'Doctolib', rating: 5 },
    { id: '2', quote: 'Le ROI a ete visible des le premier mois. 340% de retour sur investissement en 90 jours.', author: 'Thomas Leclerc', role: 'Directeur General', company: 'Qonto', rating: 5 },
    { id: '3', quote: 'L\'integration avec notre stack existante s\'est faite en moins d\'une journee. Support technique impeccable.', author: 'Amelie Renard', role: 'CTO', company: 'Alan', rating: 5 },
  ],
}

export const DEFAULT_PRICING_CONTENT: PricingContent = {
  eyebrow: 'Tarifs transparents',
  title: 'Un prix adapte a chaque etape',
  subtitle: 'Commencez gratuitement, montez en puissance quand vous etes pret. Sans engagement.',
  plans: [
    {
      id: 'starter', name: 'Starter', price: '0€', period: '/mois', description: 'Ideal pour valider votre idee',
      features: [
        { text: 'Jusqu\'a 1 000 contacts', included: true },
        { text: '3 automatisations', included: true },
        { text: 'Analytics de base', included: true },
        { text: 'Integrations tierces', included: false },
        { text: 'Support prioritaire', included: false },
        { text: 'API & Webhooks', included: false },
      ],
      cta: 'Demarrer gratuitement', ctaHref: '#', highlighted: false,
    },
    {
      id: 'pro', name: 'Growth', price: '79€', period: '/mois', description: 'Pour les equipes en croissance', badge: 'Le plus populaire',
      features: [
        { text: 'Contacts illimites', included: true },
        { text: 'Automatisations illimitees', included: true },
        { text: 'Analytics avances + rapports', included: true },
        { text: '200+ integrations natives', included: true },
        { text: 'Support prioritaire 24/7', included: true },
        { text: 'API & Webhooks', included: false },
      ],
      cta: 'Essai gratuit 14 jours', ctaHref: '#', highlighted: true,
    },
    {
      id: 'enterprise', name: 'Enterprise', price: 'Sur mesure', period: '', description: 'Pour les organisations exigeantes',
      features: [
        { text: 'Contacts illimites', included: true },
        { text: 'Automatisations illimitees', included: true },
        { text: 'Analytics + BI personnalise', included: true },
        { text: 'Integrations sur mesure', included: true },
        { text: 'Account manager dedie', included: true },
        { text: 'API, Webhooks & SSO SAML', included: true },
      ],
      cta: 'Contacter l\'equipe commerciale', ctaHref: '#', highlighted: false,
    },
  ],
}

export const DEFAULT_FAQ_CONTENT: FAQContent = {
  eyebrow: 'Questions frequentes',
  title: 'Tout ce que vous devez savoir',
  subtitle: 'Les reponses aux questions les plus posees par nos clients et prospects.',
  items: [
    { id: '1', question: 'Combien de temps faut-il pour etre operationnel ?', answer: 'La plupart de nos clients sont en production en moins de 4 heures. Notre equipe d\'onboarding vous accompagne avec une configuration guidee et des templates pre-configures pour votre secteur.' },
    { id: '2', question: 'Mes donnees sont-elles securisees ?', answer: 'Absolument. Nous sommes certifies SOC 2 Type II, conformes RGPD et heberges sur des infrastructures europeennes. Toutes les donnees sont chiffrees en AES-256 au repos et en transit.' },
    { id: '3', question: 'Est-ce que ca s\'integre avec mes outils existants ?', answer: 'Oui, nous proposons plus de 200 integrations natives (Salesforce, HubSpot, Slack, Notion, etc.) ainsi qu\'une API REST complete et des webhooks en temps reel.' },
    { id: '4', question: 'Puis-je changer de plan ou annuler a tout moment ?', answer: 'Oui, sans engagement ni frais caches. Vous pouvez upgrader, downgrader ou annuler votre abonnement en un clic depuis votre tableau de bord. Le prorata est applique automatiquement.' },
  ],
}

export const DEFAULT_CONTACT_CONTENT: ContactContent = {
  eyebrow: 'Parlons de votre projet',
  title: 'Contactez notre equipe commerciale',
  subtitle: 'Reponse garantie sous 2 heures ouvrees. Pas de chatbot, de vrais experts.',
  email: 'contact@votreentreprise.fr',
  phone: '+33 1 86 76 54 32',
  address: '42 Avenue des Champs-Elysees, 75008 Paris',
  formTitle: 'Demander une demo personnalisee',
  formButtonLabel: 'Envoyer ma demande',
  successMessage: 'Parfait ! Un expert vous recontactera sous 2 heures ouvrees.',
}

export const DEFAULT_FORM_CONTENT: FormContent = {
  title: 'Envoyez-nous un message',
  subtitle: 'Remplissez le formulaire ci-dessous et nous vous repondrons rapidement.',
  fields: [
    { id: 'f1', type: 'text', name: 'name', label: 'Nom complet', placeholder: 'Jean Dupont', required: true, width: 'full' },
    { id: 'f2', type: 'email', name: 'email', label: 'Email', placeholder: 'jean@exemple.com', required: true, width: 'half' },
    { id: 'f3', type: 'phone', name: 'phone', label: 'Telephone', placeholder: '+33 6 12 34 56 78', required: false, width: 'half' },
    { id: 'f4', type: 'textarea', name: 'message', label: 'Message', placeholder: 'Votre message...', required: true, width: 'full' },
  ],
  submitLabel: 'Envoyer',
  successMessage: 'Merci ! Votre message a bien ete envoye.',
  errorMessage: 'Une erreur est survenue. Veuillez reessayer.',
  honeypot: true,
  createContact: true,
}

export const DEFAULT_LOGOS_CONTENT: LogosContent = {
  title: 'Ils font confiance a notre plateforme',
  items: [
    { id: '1', name: 'Doctolib' },
    { id: '2', name: 'Qonto' },
    { id: '3', name: 'Alan' },
    { id: '4', name: 'Swile' },
    { id: '5', name: 'Payfit' },
    { id: '6', name: 'Spendesk' },
  ],
}

export const DEFAULT_TEAM_CONTENT: TeamContent = {
  eyebrow: 'L\'equipe',
  title: 'Des experts passionnes a votre service',
  subtitle: 'Une equipe senior issue des meilleures scale-ups europeennes.',
  members: [
    { id: '1', name: 'Margaux Delacroix', role: 'CEO & Co-fondatrice', bio: 'Ex-VP Growth chez Doctolib. 12 ans d\'experience en SaaS B2B.', linkedin: '#' },
    { id: '2', name: 'Romain Patel', role: 'CTO & Co-fondateur', bio: 'Ex-Staff Engineer chez Datadog. Expert infrastructure cloud & IA.', linkedin: '#' },
    { id: '3', name: 'Lea Fontaine', role: 'Head of Design', bio: 'Ex-Design Lead chez Figma. Passionnee par les interfaces qui convertissent.', linkedin: '#' },
  ],
}

// ─── BLOG GRID ───────────────────────────────
export interface BlogPost {
  id: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  image?: string
  slug: string
}
export interface BlogGridContent {
  eyebrow?: string
  title: string
  subtitle?: string
  posts: BlogPost[]
  ctaLabel?: string
  ctaHref?: string
}

// ─── TIMELINE ────────────────────────────────
export interface TimelineItem {
  id: string
  date: string
  title: string
  description: string
  icon?: string
}
export interface TimelineContent {
  eyebrow?: string
  title: string
  items: TimelineItem[]
}

// ─── CHANGELOG ───────────────────────────────
export interface ChangelogEntry {
  id: string
  version: string
  date: string
  type: 'feature' | 'fix' | 'improvement' | 'breaking'
  title: string
  description: string
}
export interface ChangelogContent {
  title: string
  subtitle?: string
  entries: ChangelogEntry[]
}

// ─── QUOTE ───────────────────────────────────
export interface QuoteContent {
  quote: string
  author: string
  role?: string
  company?: string
  logo?: string
}

// ─── RICHTEXT ────────────────────────────────
export interface RichtextContent {
  html: string
}

// ─── STEPS / PROCESS ─────────────────────────
export interface StepItem {
  id: string
  number: string
  title: string
  description: string
  icon?: string
}
export interface StepsContent {
  eyebrow?: string
  title: string
  subtitle?: string
  items: StepItem[]
}

// ─── GALLERY ─────────────────────────────────
export interface GalleryImage {
  id: string
  src: string
  alt: string
  caption?: string
  /** Hover-state image (e.g. talent second photo) */
  hoverSrc?: string
  /** Badge label (e.g. "Models", "Advertising") */
  badge?: string
  /** Category for filtering (e.g. "women", "men") */
  category?: string
  /** Subcategory for filtering */
  subcategory?: string
}
export interface GalleryContent {
  title?: string
  images: GalleryImage[]
  columns?: number
  decorativeIcon?: string
  primaryButton?: ButtonConfig
}

// ─── IMAGE TEXT ──────────────────────────────
export interface ImageTextContent {
  eyebrow?: string
  title: string
  subtitle?: string
  body: string
  image: string
  imageAlt: string
  imagePosition: 'left' | 'right'
  primaryButton?: ButtonConfig
  secondaryButton?: ButtonConfig
  items?: Array<{ id: string; icon?: string; title: string; description?: string }>
  stats?: Array<{ id: string; value: string; label: string }>
  decorativeIcon?: string
}

// ─── PRODUCT HERO ────────────────────────────
export interface ProductHeroContent {
  name: string
  tagline: string
  description: string
  price: string
  originalPrice?: string
  badge?: string
  features: string[]
  images: string[]
  ctaLabel: string
  ctaHref: string
}

// ─── PRODUCT GRID ────────────────────────────
export interface ProductItem {
  id: string
  name: string
  price: string
  originalPrice?: string
  image?: string
  badge?: string
  category?: string
  rating?: number
  reviews?: number
  description?: string
}
export interface ProductGridContent {
  eyebrow?: string
  title: string
  subtitle?: string
  items: ProductItem[]
  ctaLabel?: string
  ctaHref?: string
  decorativeIcon?: string
  primaryButton?: ButtonConfig
}

// ─── COMPARISON TABLE ────────────────────────
export interface ComparisonFeature {
  id: string
  name: string
  values: (string | boolean)[]
}
export interface ComparisonContent {
  title: string
  columns: string[]
  features: ComparisonFeature[]
}

// ─── NEWSLETTER ──────────────────────────────
export interface NewsletterContent {
  eyebrow?: string
  title: string
  subtitle?: string
  placeholder: string
  buttonLabel: string
  disclaimer?: string
  count?: string
  socialProof?: string
  decorativeIcon?: string
}


// ─── AWARDS ──────────────────────────────────
export interface AwardItem {
  id: string
  name: string
  year: string
  issuer: string
  icon?: string
}
export interface AwardsContent {
  eyebrow?: string
  title?: string
  items: AwardItem[]
}


// ─── SITE HEADER ─────────────────────────────
export interface NavLink {
  id: string
  label: string
  href: string
}
export interface SiteHeaderContent {
  logo: string
  links: NavLink[]
  ctaLabel?: string
  ctaHref?: string
  cartLabel?: string
  sticky?: boolean
  transparent?: boolean
}

// ─── SITE FOOTER ─────────────────────────────
export interface FooterColumn {
  id: string
  title: string
  links: NavLink[]
}
export interface SiteFooterContent {
  logo: string
  tagline?: string
  columns: FooterColumn[]
  copyright: string
  socials?: { twitter?: string; linkedin?: string; github?: string; instagram?: string }
}

// ─── DEFAULTS (new sections) ────────────────

export const DEFAULT_BLOG_GRID_CONTENT: BlogGridContent = {
  eyebrow: 'Ressources',
  title: 'Insights & bonnes pratiques',
  subtitle: 'Analyses, guides et retours d\'experience pour accelerer votre croissance.',
  ctaLabel: 'Voir toutes les ressources',
  ctaHref: '#blog',
  posts: [
    { id: '1', title: 'Comment nous avons reduit le churn de 40% en 90 jours', excerpt: 'Retour d\'experience complet sur notre strategie de retention client avec des tactiques actionnables.', category: 'Growth', date: '28 Jan 2025', readTime: '8 min', slug: '#' },
    { id: '2', title: 'Le guide ultime de l\'automatisation des workflows B2B', excerpt: 'De la theorie a la pratique : comment automatiser 80% de vos taches repetitives sans sacrifier la qualite.', category: 'Produit', date: '15 Jan 2025', readTime: '12 min', slug: '#' },
    { id: '3', title: '5 metriques SaaS que vous devriez suivre en 2025', excerpt: 'Au-dela du MRR et du churn : les indicateurs avances qui predisent la croissance durable.', category: 'Analytics', date: '3 Jan 2025', readTime: '6 min', slug: '#' },
  ],
}

export const DEFAULT_TIMELINE_CONTENT: TimelineContent = {
  eyebrow: 'Notre parcours',
  title: 'De la vision a la realite',
  items: [
    { id: '1', date: 'Mars 2022', title: 'Fondation', description: 'Margaux et Romain quittent leurs postes pour lancer la plateforme avec une conviction : l\'automatisation doit etre accessible a tous.', icon: 'lightbulb' },
    { id: '2', date: 'Septembre 2022', title: 'Seed de 2,5M€', description: 'Tour de table mene par Partech et Kima Ventures. L\'equipe passe de 2 a 12 personnes en 3 mois.', icon: 'sprout' },
    { id: '3', date: 'Juin 2023', title: 'Lancement public & 1 000 clients', description: 'Apres 6 mois de beta privee, la plateforme ouvre au public. Cap des 1 000 clients franchi en 8 semaines.', icon: 'rocket' },
    { id: '4', date: 'Janvier 2025', title: 'Serie A de 18M€ & 12 000 clients', description: 'Tour de table mene par Index Ventures. Ouverture des bureaux a Berlin et expansion europeenne.', icon: 'trophy' },
  ],
}

export const DEFAULT_STEPS_CONTENT: StepsContent = {
  eyebrow: 'Demarrage rapide',
  title: 'Operationnel en 3 etapes',
  subtitle: 'Pas besoin de consultant ni de formation longue. Vous etes autonome des le premier jour.',
  items: [
    { id: '1', number: '01', title: 'Connectez vos outils', description: 'Reliez votre CRM, vos outils de communication et vos bases de donnees en quelques clics grace a nos 200+ connecteurs.', icon: 'link' },
    { id: '2', number: '02', title: 'Configurez vos workflows', description: 'Utilisez nos templates pre-construits ou creez vos propres automatisations avec notre editeur visuel no-code.', icon: 'settings' },
    { id: '3', number: '03', title: 'Mesurez & optimisez', description: 'Suivez vos KPIs en temps reel, identifiez les goulots d\'etranglement et ameliorez continuellement vos processus.', icon: 'trending-up' },
  ],
}

export const DEFAULT_IMAGE_TEXT_CONTENT: ImageTextContent = {
  eyebrow: 'Pourquoi nous',
  title: 'Construit par des operationnels, pour des operationnels',
  subtitle: 'Nous connaissons vos frustrations — nous les avons vecues.',
  body: 'Apres des annees a jongler entre 15 outils differents, nous avons construit la plateforme que nous aurions voulu avoir. Un seul endroit pour automatiser, mesurer et optimiser l\'ensemble de vos operations. Resultat : des equipes 3x plus productives et des couts divises par 4.',
  image: '',
  imageAlt: 'Capture d\'ecran de la plateforme',
  imagePosition: 'right',
  primaryButton: { label: 'Decouvrir la plateforme', href: '#', variant: 'primary' },
}

export const DEFAULT_GALLERY_CONTENT: GalleryContent = {
  title: 'La plateforme en images',
  columns: 3,
  images: [
    { id: '1', src: '', alt: 'Dashboard principal', caption: 'Vue d\'ensemble de vos KPIs' },
    { id: '2', src: '', alt: 'Editeur de workflows', caption: 'Automatisez sans code' },
    { id: '3', src: '', alt: 'Analytics avances', caption: 'Analysez en profondeur' },
    { id: '4', src: '', alt: 'Integrations', caption: '200+ connecteurs natifs' },
    { id: '5', src: '', alt: 'Collaboration', caption: 'Travaillez en equipe' },
    { id: '6', src: '', alt: 'Application mobile', caption: 'Pilotez depuis votre mobile' },
  ],
}

export const DEFAULT_PRODUCT_GRID_CONTENT: ProductGridContent = {
  eyebrow: 'Solutions',
  title: 'Nos modules a la carte',
  ctaLabel: 'Voir tous les modules',
  ctaHref: '#solutions',
  items: [
    { id: '1', name: 'Suite Automatisation', price: '49€/mois', badge: 'Bestseller', category: 'Ops', rating: 4.9, reviews: 342 },
    { id: '2', name: 'Analytics Pro', price: '29€/mois', category: 'Data', rating: 4.8, reviews: 187 },
    { id: '3', name: 'CRM Intelligent', price: '39€/mois', category: 'Sales', rating: 4.7, reviews: 156 },
    { id: '4', name: 'Module IA Predictive', price: '79€/mois', badge: 'Nouveau', category: 'IA', rating: 5.0, reviews: 48 },
  ],
}

export const DEFAULT_NEWSLETTER_CONTENT: NewsletterContent = {
  eyebrow: 'La newsletter Growth',
  title: 'Recevez nos meilleurs insights',
  subtitle: 'Chaque mardi, une analyse approfondie et des strategies actionnables pour accelerer votre croissance. Rejoignez 8 400+ decideurs.',
  placeholder: 'votre@email.com',
  buttonLabel: 'Recevoir les insights',
  disclaimer: 'Pas de spam. Desinscription en un clic. Vos donnees restent privees.',
}

export const DEFAULT_SITE_HEADER_CONTENT: SiteHeaderContent = {
  logo: 'VotreMarque',
  links: [
    { id: '1', label: 'Produit', href: '#features' },
    { id: '2', label: 'Tarifs', href: '#pricing' },
    { id: '3', label: 'Clients', href: '#testimonials' },
    { id: '4', label: 'Ressources', href: '#blog' },
  ],
  ctaLabel: 'Essai gratuit',
  ctaHref: '#signup',
  sticky: true,
}

export const DEFAULT_SITE_FOOTER_CONTENT: SiteFooterContent = {
  logo: 'VotreMarque',
  tagline: 'La plateforme qui accelere votre croissance.',
  copyright: `© ${new Date().getFullYear()} VotreMarque. Tous droits reserves.`,
  columns: [
    { id: '1', title: 'Produit', links: [{ id: '1', label: 'Fonctionnalites', href: '#' }, { id: '2', label: 'Tarifs', href: '#' }, { id: '3', label: 'Integrations', href: '#' }, { id: '4', label: 'Changelog', href: '#' }] },
    { id: '2', title: 'Ressources', links: [{ id: '1', label: 'Documentation', href: '#' }, { id: '2', label: 'Blog', href: '#' }, { id: '3', label: 'Guides', href: '#' }, { id: '4', label: 'API Reference', href: '#' }] },
    { id: '3', title: 'Entreprise', links: [{ id: '1', label: 'A propos', href: '#' }, { id: '2', label: 'Carrieres', href: '#' }, { id: '3', label: 'Presse', href: '#' }, { id: '4', label: 'Contact', href: '#' }] },
  ],
  socials: { twitter: '#', linkedin: '#', github: '#' },
}

export const DEFAULT_COMPARISON_CONTENT: ComparisonContent = {
  title: 'Pourquoi nous plutot que les autres',
  columns: ['Notre plateforme', 'Alternatives'],
  features: [
    { id: '1', name: 'Time-to-value', values: ['< 4 heures', '2-6 semaines'] },
    { id: '2', name: 'Automatisations illimitees', values: [true, false] },
    { id: '3', name: 'IA predictive integree', values: [true, false] },
    { id: '4', name: 'Support 24/7 avec SLA', values: [true, false] },
    { id: '5', name: 'Prix mensuel (equipe de 10)', values: ['79€', '350€+'] },
    { id: '6', name: 'API & Webhooks', values: [true, 'Payant'] },
  ],
}

// ═════════════════════════════════════════════════
// WIDGETS RICHES — ÉTAPE 9
// ═════════════════════════════════════════════════

// ─── TABS ───────────────────────────────────────

export type TabsVariant =
  | 'startup-horizontal' | 'startup-vertical'
  | 'corporate-horizontal' | 'corporate-vertical'
  | 'luxe-horizontal' | 'luxe-vertical'
  | 'creative-horizontal' | 'creative-vertical'
  | 'ecommerce-horizontal' | 'ecommerce-vertical'
  | 'glass-horizontal' | 'glass-vertical'
  | 'brixsa-horizontal' | 'brixsa-vertical'

export interface TabItem {
  id: string
  label: string
  content: string
  image?: string
}

export interface TabsContent {
  eyebrow?: string
  title: string
  subtitle?: string
  orientation: 'horizontal' | 'vertical'
  items: TabItem[]
}

// ─── ACCORDION ──────────────────────────────────

export type AccordionVariant =
  | 'startup-single' | 'startup-multi'
  | 'corporate-single' | 'corporate-multi'
  | 'luxe-single' | 'luxe-multi'
  | 'creative-single' | 'creative-multi'
  | 'ecommerce-single' | 'ecommerce-multi'
  | 'glass-single' | 'glass-multi'

export type AccordionIconStyle = 'chevron' | 'plus-minus' | 'arrow' | 'none'

export interface AccordionContent {
  eyebrow?: string
  title: string
  subtitle?: string
  allowMultiple: boolean
  iconStyle: AccordionIconStyle
  items: FAQItem[]
}

// ─── SLIDER ─────────────────────────────────────

export type SliderVariant =
  | 'startup-hero' | 'startup-cards' | 'startup-thumbnails'
  | 'corporate-hero' | 'corporate-cards' | 'corporate-thumbnails'
  | 'luxe-hero' | 'luxe-cards' | 'luxe-thumbnails'
  | 'creative-hero' | 'creative-cards' | 'creative-thumbnails'
  | 'ecommerce-hero' | 'ecommerce-cards' | 'ecommerce-thumbnails'
  | 'glass-hero' | 'glass-cards' | 'glass-thumbnails'
  | 'brixsa-parallax'

export type SliderEffect = 'slide' | 'fade' | 'scale'

export interface SlideItem {
  id: string
  image: string
  title?: string
  subtitle?: string
  badge?: string
  ctaLabel?: string
  ctaHref?: string
}

export interface SliderContent {
  eyebrow?: string
  title?: string
  autoplay: boolean
  loop: boolean
  showDots: boolean
  showArrows: boolean
  showCounter: boolean
  effect: SliderEffect
  interval: number
  slides: SlideItem[]
}

// ─── LIGHTBOX ───────────────────────────────────

export interface LightboxContent {
  eyebrow?: string
  title?: string
  subtitle?: string
  columns: number
  gap: number
  showCaptions: boolean
  enableZoom: boolean
  enableKeyboard: boolean
  images: GalleryImage[]
}

// ─── DROPDOWN ───────────────────────────────────

export interface DropdownMenuItem {
  id: string
  label: string
  href: string
  description?: string
  icon?: string
}

export interface DropdownMenuGroup {
  id: string
  title: string
  items: DropdownMenuItem[]
}

export interface DropdownContent {
  eyebrow?: string
  title: string
  triggerLabel: string
  isMegaMenu: boolean
  groups: DropdownMenuGroup[]
}

// ─── VIDEO ──────────────────────────────────────

export type VideoProvider = 'youtube' | 'vimeo' | 'html5'

export interface VideoContent {
  eyebrow?: string
  title?: string
  subtitle?: string
  body?: string
  provider: VideoProvider
  url: string
  poster?: string
  autoplay: boolean
  loop: boolean
  controls: boolean
}

// ─── MAP ────────────────────────────────────────

export type MapProvider = 'embed' | 'openstreetmap' | 'mapbox'

export interface MapMarker {
  id: string
  lat: number
  lng: number
  label?: string
}

export interface MapContent {
  eyebrow?: string
  title?: string
  subtitle?: string
  provider: MapProvider
  embedUrl?: string
  address?: string
  phone?: string
  hours?: string
  linkLabel?: string
  linkHref?: string
  lat?: number
  lng?: number
  zoom: number
  markers: MapMarker[]
  apiKey?: string
}

// ─── SEARCH ─────────────────────────────────────

export interface SearchContent {
  title?: string
  placeholder: string
  showCategories: boolean
}

// ─── QUICK STACK ────────────────────────────────

export type StackLayout = '1+2' | '2x2' | '3x1' | 'masonry' | '1+1' | 'asymmetric'

export interface StackItem {
  id: string
  title?: string
  subtitle?: string
  body?: string
  image?: string
  icon?: string
  badge?: string
  ctaLabel?: string
  ctaHref?: string
}

export interface QuickStackContent {
  eyebrow?: string
  title?: string
  subtitle?: string
  layout: StackLayout
  items: StackItem[]
}

// ─── NAVBAR AVANCÉE ─────────────────────────────

export interface MegaMenuSection {
  id: string
  title: string
  links: NavLink[]
}

export interface NavbarAdvancedLink {
  id: string
  label: string
  href: string
  hasDropdown: boolean
  megaSections?: MegaMenuSection[]
}

export type HamburgerStyle = 'minimal' | 'bold' | 'animated'

export interface NavbarAdvancedContent {
  logo: string
  links: NavbarAdvancedLink[]
  ctaLabel?: string
  ctaHref?: string
  sticky: boolean
  transparent: boolean
  hamburgerStyle: HamburgerStyle
  announcementBar?: string
}

// ─── DEFAULTS WIDGETS ───────────────────────────

export const DEFAULT_TABS_CONTENT: TabsContent = {
  eyebrow: 'Fonctionnalites',
  title: 'Tout ce dont vous avez besoin',
  subtitle: 'Decouvrez nos fonctionnalites principales en detail.',
  orientation: 'horizontal',
  items: [
    { id: '1', label: 'Automatisation', content: 'Automatisez vos workflows complexes sans ecrire une seule ligne de code. Notre editeur visuel vous permet de creer des enchainements de taches en quelques minutes.' },
    { id: '2', label: 'Analytics', content: 'Suivez vos KPIs en temps reel avec des tableaux de bord personnalisables. Recevez des alertes automatiques quand vos metriques sortent des seuils definis.' },
    { id: '3', label: 'Integrations', content: 'Connectez vos outils existants grace a plus de 200 integrations natives. Salesforce, HubSpot, Slack, Notion — tout est compatible.' },
  ],
}

export const DEFAULT_ACCORDION_CONTENT: AccordionContent = {
  eyebrow: 'En savoir plus',
  title: 'Tout comprendre en un coup d\'oeil',
  subtitle: 'Les reponses detaillees a vos interrogations.',
  allowMultiple: false,
  iconStyle: 'chevron',
  items: [
    { id: '1', question: 'Comment fonctionne la facturation ?', answer: 'La facturation est mensuelle ou annuelle au choix. Vous pouvez changer de plan a tout moment sans frais. Le prorata est applique automatiquement.' },
    { id: '2', question: 'Quelles sont les limites du plan gratuit ?', answer: 'Le plan gratuit inclut jusqu\'a 1 000 contacts, 3 automatisations et les analytics de base. Parfait pour valider votre idee avant de scaler.' },
    { id: '3', question: 'Proposez-vous un accompagnement ?', answer: 'Oui, tous les plans incluent un onboarding guide. Les plans Growth et Enterprise beneficient d\'un account manager dedie et de sessions de formation.' },
    { id: '4', question: 'Mes donnees sont-elles en securite ?', answer: 'Absolument. Nous sommes certifies SOC 2 Type II, conformes RGPD, et toutes les donnees sont chiffrees AES-256 au repos et en transit.' },
  ],
}

export const DEFAULT_SLIDER_CONTENT: SliderContent = {
  title: 'Nos realisations',
  autoplay: true,
  loop: true,
  showDots: true,
  showArrows: true,
  showCounter: false,
  effect: 'slide',
  interval: 5000,
  slides: [
    { id: '1', image: '', title: 'Projet Alpha', subtitle: 'Une refonte complete qui a triple le taux de conversion.', ctaLabel: 'Voir le cas', ctaHref: '#' },
    { id: '2', image: '', title: 'Projet Beta', subtitle: 'Automatisation des workflows qui a reduit les couts de 60%.', ctaLabel: 'Decouvrir', ctaHref: '#' },
    { id: '3', image: '', title: 'Projet Gamma', subtitle: 'Deploiement multi-pays en moins de 3 semaines.', ctaLabel: 'En savoir plus', ctaHref: '#' },
  ],
}

export const DEFAULT_LIGHTBOX_CONTENT: LightboxContent = {
  title: 'Galerie interactive',
  columns: 3,
  gap: 4,
  showCaptions: true,
  enableZoom: true,
  enableKeyboard: true,
  images: [
    { id: '1', src: '', alt: 'Dashboard principal', caption: 'Vue d\'ensemble des KPIs' },
    { id: '2', src: '', alt: 'Editeur de workflows', caption: 'Automatisez sans code' },
    { id: '3', src: '', alt: 'Analytics avances', caption: 'Analysez en profondeur' },
    { id: '4', src: '', alt: 'Integrations', caption: '200+ connecteurs natifs' },
    { id: '5', src: '', alt: 'Collaboration', caption: 'Travaillez en equipe' },
    { id: '6', src: '', alt: 'Mobile', caption: 'Pilotez partout' },
  ],
}

export const DEFAULT_DROPDOWN_CONTENT: DropdownContent = {
  title: 'Menu deroulant',
  triggerLabel: 'Options',
  isMegaMenu: false,
  groups: [
    {
      id: '1', title: 'Produit', items: [
        { id: '1', label: 'Fonctionnalites', href: '#features', description: 'Decouvrez toutes nos fonctionnalites' },
        { id: '2', label: 'Integrations', href: '#integrations', description: 'Connectez vos outils favoris' },
        { id: '3', label: 'API', href: '#api', description: 'Documentation technique complete' },
      ],
    },
  ],
}

export const DEFAULT_VIDEO_CONTENT: VideoContent = {
  eyebrow: 'Demo',
  title: 'Voyez la plateforme en action',
  subtitle: 'Une visite guidee de 2 minutes pour comprendre comment tout fonctionne.',
  provider: 'youtube',
  url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  autoplay: false,
  loop: false,
  controls: true,
}

export const DEFAULT_MAP_CONTENT: MapContent = {
  eyebrow: 'Nous trouver',
  title: 'Nos bureaux',
  subtitle: 'Venez nous rendre visite.',
  provider: 'openstreetmap',
  address: '42 Avenue des Champs-Elysees, 75008 Paris',
  phone: '+33 1 86 76 54 32',
  hours: 'Lun-Ven 9h-18h',
  linkLabel: 'Itineraire Google Maps',
  linkHref: 'https://maps.google.com',
  lat: 48.8698,
  lng: 2.3075,
  zoom: 15,
  markers: [{ id: '1', lat: 48.8698, lng: 2.3075, label: 'Siege social' }],
}

export const DEFAULT_SEARCH_CONTENT: SearchContent = {
  title: 'Rechercher',
  placeholder: 'Tapez votre recherche...',
  showCategories: true,
}

export const DEFAULT_QUICK_STACK_CONTENT: QuickStackContent = {
  eyebrow: 'Vue d\'ensemble',
  title: 'Nos solutions',
  layout: '2x2',
  items: [
    { id: '1', title: 'Automatisation', body: 'Simplifiez vos processus metier avec des workflows intelligents.', icon: 'zap' },
    { id: '2', title: 'Analytics', body: 'Prenez des decisions eclairees grace a des donnees en temps reel.', icon: 'bar-chart-3' },
    { id: '3', title: 'Integrations', body: 'Connectez tous vos outils en quelques clics.', icon: 'link' },
    { id: '4', title: 'Securite', body: 'Vos donnees protegees avec les meilleurs standards.', icon: 'lock' },
  ],
}

// ─── Product Detail (E-commerce) ───

export type ProductDetailVariant =
  | 'startup-split' | 'startup-gallery'
  | 'corporate-split' | 'corporate-gallery'
  | 'luxe-split' | 'luxe-gallery'
  | 'creative-split' | 'creative-gallery'
  | 'ecommerce-split' | 'ecommerce-gallery'
  | 'glass-split' | 'glass-gallery'

export interface ProductDetailContent {
  productId?: string
  name: string
  description: string
  price: number
  compareAtPrice?: number
  images: string[]
  badge?: string
  variants: { id: string; label: string; options: string[] }[]
  addToCartLabel: string
  buyNowLabel?: string
  trustBadges: string[]
}

// ─── Cart (E-commerce) ───

export type CartVariant =
  | 'startup-slide' | 'startup-page'
  | 'corporate-slide' | 'corporate-page'
  | 'luxe-slide' | 'luxe-page'
  | 'creative-slide' | 'creative-page'
  | 'ecommerce-slide' | 'ecommerce-page'
  | 'glass-slide' | 'glass-page'

export interface CartContent {
  emptyMessage: string
  continueShoppingLabel: string
  checkoutLabel: string
  showCouponField: boolean
  showProductImages: boolean
}

// ─── Checkout (E-commerce) ───

export type CheckoutVariant =
  | 'startup-steps' | 'startup-single'
  | 'corporate-steps' | 'corporate-single'
  | 'luxe-steps' | 'luxe-single'
  | 'creative-steps' | 'creative-single'
  | 'ecommerce-steps' | 'ecommerce-single'
  | 'glass-steps' | 'glass-single'

export interface CheckoutContent {
  paymentProviders: ('stripe' | 'paypal')[]
  stripePublishableKey?: string
  paypalClientId?: string
  showOrderSummary: boolean
  showCouponField: boolean
  successRedirectUrl?: string
  termsUrl?: string
}

// ─── Collection List (CMS) ───

export interface CollectionListContent {
  title?: string
  subtitle?: string
  /** CMS list binding (collectionId, limit, sort, filters) */
  __cmsBinding?: import('@/types/cms').CmsListBinding
  /** Per-element CMS field bindings */
  __fieldBindings?: Record<string, import('@/types/cms').CmsFieldBinding>
  /** Per-element CMS visibility rules */
  __cmsVisibility?: Record<string, import('@/types/cms').CmsVisibilityRule>
  emptyMessage?: string
  columns?: number
  showPagination?: boolean
}

export type CollectionListVariant =
  | 'startup-grid' | 'startup-list'
  | 'corporate-grid' | 'corporate-list'
  | 'luxe-grid' | 'luxe-list'

export const DEFAULT_COLLECTION_LIST_CONTENT: CollectionListContent = {
  title: 'Collection',
  subtitle: 'Contenus dynamiques depuis le CMS.',
  emptyMessage: 'Aucun element a afficher.',
  columns: 3,
  showPagination: true,
}

export const DEFAULT_NAVBAR_ADVANCED_CONTENT: NavbarAdvancedContent = {
  logo: 'VotreMarque',
  links: [
    { id: '1', label: 'Produit', href: '#features', hasDropdown: true, megaSections: [
      { id: '1', title: 'Fonctionnalites', links: [
        { id: '1', label: 'Automatisation', href: '#auto' },
        { id: '2', label: 'Analytics', href: '#analytics' },
        { id: '3', label: 'Integrations', href: '#integrations' },
      ]},
      { id: '2', title: 'Ressources', links: [
        { id: '4', label: 'Documentation', href: '#docs' },
        { id: '5', label: 'Blog', href: '#blog' },
        { id: '6', label: 'Changelog', href: '#changelog' },
      ]},
    ]},
    { id: '2', label: 'Tarifs', href: '#pricing', hasDropdown: false },
    { id: '3', label: 'Clients', href: '#testimonials', hasDropdown: false },
    { id: '4', label: 'Contact', href: '#contact', hasDropdown: false },
  ],
  ctaLabel: 'Essai gratuit',
  ctaHref: '#signup',
  sticky: true,
  transparent: false,
  hamburgerStyle: 'minimal',
}

// ─── E-commerce defaults ───

export const DEFAULT_PRODUCT_DETAIL_CONTENT: ProductDetailContent = {
  name: 'Nom du produit',
  description: 'Description detaillee du produit avec ses caracteristiques principales.',
  price: 4990,
  compareAtPrice: 5990,
  images: [],
  badge: 'Nouveau',
  variants: [
    { id: '1', label: 'Taille', options: ['S', 'M', 'L', 'XL'] },
  ],
  addToCartLabel: 'Ajouter au panier',
  buyNowLabel: 'Acheter maintenant',
  trustBadges: ['Livraison gratuite', 'Retours 30 jours', 'Paiement securise'],
}

export const DEFAULT_CART_CONTENT: CartContent = {
  emptyMessage: 'Votre panier est vide.',
  continueShoppingLabel: 'Continuer vos achats',
  checkoutLabel: 'Passer la commande',
  showCouponField: true,
  showProductImages: true,
}

export const DEFAULT_CHECKOUT_CONTENT: CheckoutContent = {
  paymentProviders: ['stripe'],
  showOrderSummary: true,
  showCouponField: true,
  successRedirectUrl: '/merci',
}
