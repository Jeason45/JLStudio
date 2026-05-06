// JL Studio agency — Brief data model & constants

export interface BriefType {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  specificFields: SpecificField[];
}

export interface SpecificField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'number' | 'url';
  placeholder?: string;
  options?: { value: string; label: string }[];
}

export interface BriefFormData {
  contactId: string;
  projectName: string;
  objectives: string;
  targetAudience: string;
  budget: string;
  deadline: string;
  features: string[];
  inspirations: string;
  notes: string;
  [key: string]: string | string[] | number | undefined;
}

export const BRIEF_TYPES: BriefType[] = [
  {
    id: 'site-vitrine',
    title: 'Site Vitrine',
    description: "Site web corporate ou personnel pour présenter votre activité, vos services et votre image de marque.",
    icon: '🌐',
    color: '#3B82F6',
    specificFields: [
      { key: 'pageCount', label: 'Nombre de pages estimées', type: 'select', options: [
        { value: '1-5', label: '1 à 5 pages' },
        { value: '5-10', label: '5 à 10 pages' },
        { value: '10-20', label: '10 à 20 pages' },
        { value: '20+', label: 'Plus de 20 pages' },
      ]},
      { key: 'existingContent', label: 'Contenu existant (textes, images)', type: 'select', options: [
        { value: 'oui', label: 'Oui, tout est prêt' },
        { value: 'partiel', label: 'Partiellement' },
        { value: 'non', label: 'Non, à créer entièrement' },
      ]},
    ],
  },
  {
    id: 'e-commerce',
    title: 'E-commerce',
    description: "Boutique en ligne complète avec catalogue produits, panier, paiement sécurisé et gestion des commandes.",
    icon: '🛒',
    color: '#10b981',
    specificFields: [
      { key: 'productCount', label: 'Nombre de produits estimés', type: 'select', options: [
        { value: '1-50', label: '1 à 50 produits' },
        { value: '50-200', label: '50 à 200 produits' },
        { value: '200-1000', label: '200 à 1000 produits' },
        { value: '1000+', label: 'Plus de 1000 produits' },
      ]},
      { key: 'paymentMethods', label: 'Moyens de paiement souhaités', type: 'text', placeholder: 'Ex: Carte bancaire, PayPal, virement...' },
      { key: 'shippingNeeds', label: 'Besoins en livraison', type: 'textarea', placeholder: 'Décrivez vos besoins de livraison (zones, transporteurs, tarifs...)' },
    ],
  },
  {
    id: 'application-web',
    title: 'Application Web',
    description: "Application web sur mesure avec fonctionnalités avancées, gestion utilisateurs et logique métier spécifique.",
    icon: '⚡',
    color: '#a78bfa',
    specificFields: [
      { key: 'estimatedUsers', label: "Nombre d'utilisateurs estimés", type: 'select', options: [
        { value: '1-100', label: '1 à 100 utilisateurs' },
        { value: '100-1000', label: '100 à 1000 utilisateurs' },
        { value: '1000-10000', label: '1000 à 10 000 utilisateurs' },
        { value: '10000+', label: 'Plus de 10 000 utilisateurs' },
      ]},
      { key: 'specificFeatures', label: 'Fonctionnalités spécifiques requises', type: 'textarea', placeholder: 'Décrivez les fonctionnalités métier spécifiques (API, intégrations, automatisations...)' },
    ],
  },
  {
    id: 'refonte',
    title: 'Refonte',
    description: "Modernisation de votre site existant : refonte design, technique ou complète selon vos besoins.",
    icon: '🔄',
    color: '#f59e0b',
    specificFields: [
      { key: 'currentSiteUrl', label: 'URL du site actuel', type: 'url', placeholder: 'https://www.votre-site.fr' },
      { key: 'identifiedProblems', label: 'Problèmes identifiés avec le design actuel', type: 'textarea', placeholder: 'Décrivez les problèmes visuels ou UX que vous souhaitez corriger...' },
      { key: 'currentStack', label: 'Stack technique actuelle', type: 'text', placeholder: 'Ex: WordPress, PHP, MySQL...' },
      { key: 'technicalProblems', label: 'Problèmes techniques identifiés', type: 'textarea', placeholder: 'Décrivez les problèmes techniques (lenteur, sécurité, bugs, maintenance...)' },
      { key: 'redesignReasons', label: 'Raisons principales de la refonte', type: 'textarea', placeholder: 'Expliquez pourquoi une refonte complète est nécessaire...' },
    ],
  },
];

export const COMMON_FEATURES = [
  { key: 'contact_form', label: 'Formulaire de contact' },
  { key: 'blog', label: 'Blog / Actualités' },
  { key: 'newsletter', label: 'Newsletter' },
  { key: 'multilingual', label: 'Multilangue' },
  { key: 'member_area', label: 'Espace membre' },
  { key: 'seo', label: 'Optimisation SEO' },
  { key: 'analytics', label: 'Analytics / Statistiques' },
  { key: 'social_media', label: 'Intégration réseaux sociaux' },
  { key: 'chat', label: 'Chat en direct' },
  { key: 'crm_integration', label: 'Intégration CRM' },
  { key: 'responsive', label: 'Design responsive' },
  { key: 'accessibility', label: 'Accessibilité (RGAA/WCAG)' },
];

export const REFONTE_SCOPES = [
  { value: 'design', label: 'Design', description: "Modernisation du design et de l'expérience utilisateur sans modifier la structure technique.", icon: '🎨' },
  { value: 'technique', label: 'Technique', description: "Migration ou refactorisation technique pour améliorer performances, sécurité et maintenabilité.", icon: '🔧' },
  { value: 'complete', label: 'Complète', description: "Refonte intégrale : nouveau design, nouvelle architecture technique et nouveau contenu.", icon: '🔄' },
];

export const REFONTE_FIELDS_BY_SCOPE: Record<string, string[]> = {
  design: ['currentSiteUrl', 'identifiedProblems'],
  technique: ['currentStack', 'technicalProblems'],
  complete: ['currentSiteUrl', 'redesignReasons'],
};

export const BUDGET_OPTIONS = [
  { value: '<2000', label: 'Moins de 2 000 €' },
  { value: '2000-5000', label: '2 000 - 5 000 €' },
  { value: '5000-10000', label: '5 000 - 10 000 €' },
  { value: '>10000', label: 'Plus de 10 000 €' },
];

export const STEP_LABELS = [
  'Client & Projet',
  'Objectifs',
  'Fonctionnalités',
  'Détails spécifiques',
  'Budget & Planning',
  'Récapitulatif',
];

export function getInitialBriefData(): BriefFormData {
  return {
    contactId: '',
    projectName: '',
    objectives: '',
    targetAudience: '',
    budget: '',
    deadline: '',
    features: [],
    inspirations: '',
    notes: '',
  };
}

export function budgetToNumber(budget: string): number | null {
  switch (budget) {
    case '<2000': return 1500;
    case '2000-5000': return 3500;
    case '5000-10000': return 7500;
    case '>10000': return 12000;
    default: return null;
  }
}
