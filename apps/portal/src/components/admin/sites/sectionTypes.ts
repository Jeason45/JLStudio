// Types et constantes partagés pour les sections de l'éditeur de site

export type SectionType =
  | 'HERO'
  | 'ABOUT'
  | 'SERVICES'
  | 'PRICING'
  | 'TESTIMONIALS'
  | 'GALLERY'
  | 'FAQ'
  | 'CONTACT'
  | 'CTA';

export interface SectionInstance {
  id: string;
  type: SectionType;
  content: Record<string, unknown>;
}

export const SECTION_META: Record<
  SectionType,
  { label: string; emoji: string; description: string; defaultContent: Record<string, unknown> }
> = {
  HERO: {
    label: 'Hero',
    emoji: '🚀',
    description: 'Bannière principale (titre + image + CTA)',
    defaultContent: {
      eyebrow: '',
      title: 'Titre principal accrocheur',
      subtitle: 'Une phrase qui explique ta valeur en quelques mots.',
      imageUrl: '',
      ctaPrimary: { label: 'Découvrir', href: '#contact' },
      ctaSecondary: { label: '', href: '' },
      align: 'left',
    },
  },
  ABOUT: {
    label: 'À propos',
    emoji: 'ℹ️',
    description: 'Texte + image (présentation)',
    defaultContent: {
      eyebrow: 'À propos',
      title: 'Qui sommes-nous',
      body: 'Une présentation honnête et concise de qui tu es, ce que tu fais et pour qui.',
      imageUrl: '',
      imagePosition: 'right',
    },
  },
  SERVICES: {
    label: 'Services',
    emoji: '🛠️',
    description: 'Liste de prestations en cards',
    defaultContent: {
      eyebrow: 'Nos services',
      title: 'Ce que nous faisons',
      subtitle: '',
      items: [
        { title: 'Service 1', description: 'Description du service.', icon: '✨', href: '' },
        { title: 'Service 2', description: 'Description du service.', icon: '⚡', href: '' },
        { title: 'Service 3', description: 'Description du service.', icon: '🎯', href: '' },
      ],
      columns: 3,
    },
  },
  PRICING: {
    label: 'Tarifs',
    emoji: '💰',
    description: 'Table de pricing (1 à 3 colonnes)',
    defaultContent: {
      eyebrow: 'Tarifs',
      title: 'Nos formules',
      subtitle: 'Choisissez la formule qui correspond à votre projet.',
      plans: [
        {
          name: 'Essentiel',
          price: 'Sur devis',
          period: '',
          description: 'Pour démarrer',
          features: ['Fonctionnalité 1', 'Fonctionnalité 2', 'Fonctionnalité 3'],
          highlighted: false,
          cta: { label: 'Demander un devis', href: '#contact' },
        },
        {
          name: 'Premium',
          price: 'Sur devis',
          period: '',
          description: 'Pour aller plus loin',
          features: ['Tout Essentiel', 'Bonus 1', 'Bonus 2', 'Bonus 3'],
          highlighted: true,
          cta: { label: 'Réserver', href: '#contact' },
        },
      ],
    },
  },
  TESTIMONIALS: {
    label: 'Témoignages',
    emoji: '💬',
    description: 'Avis clients',
    defaultContent: {
      eyebrow: 'Témoignages',
      title: 'Ce qu\'ils en disent',
      items: [
        { quote: 'Une expérience formidable, je recommande vivement.', author: 'Marie D.', role: 'Cliente', avatarUrl: '' },
      ],
    },
  },
  GALLERY: {
    label: 'Galerie',
    emoji: '🖼️',
    description: 'Grille d\'images',
    defaultContent: {
      eyebrow: '',
      title: 'Galerie',
      subtitle: '',
      images: [],
      columns: 3,
    },
  },
  FAQ: {
    label: 'FAQ',
    emoji: '❓',
    description: 'Questions / Réponses',
    defaultContent: {
      eyebrow: 'Questions fréquentes',
      title: 'Vous vous demandez peut-être…',
      items: [
        { question: 'Question 1 ?', answer: 'Réponse claire et concise.' },
        { question: 'Question 2 ?', answer: 'Réponse claire et concise.' },
      ],
    },
  },
  CONTACT: {
    label: 'Contact',
    emoji: '✉️',
    description: 'Formulaire + coordonnées',
    defaultContent: {
      eyebrow: 'Contact',
      title: 'Discutons de votre projet',
      subtitle: 'Réponse sous 24h ouvrées.',
      showForm: true,
      showCoordinates: true,
      mapEmbedUrl: '',
    },
  },
  CTA: {
    label: 'CTA',
    emoji: '🎯',
    description: 'Bandeau call-to-action',
    defaultContent: {
      title: 'Prêt à franchir le pas ?',
      subtitle: 'On en parle quand vous voulez.',
      ctaLabel: 'Réserver un appel',
      ctaHref: '#contact',
      backgroundColor: '#06b6d4',
    },
  },
};

export const SECTION_LIST: SectionType[] = [
  'HERO', 'ABOUT', 'SERVICES', 'PRICING', 'TESTIMONIALS', 'GALLERY', 'FAQ', 'CONTACT', 'CTA',
];

export function newSection(type: SectionType): SectionInstance {
  return {
    id: `s-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type,
    content: JSON.parse(JSON.stringify(SECTION_META[type].defaultContent)),
  };
}
