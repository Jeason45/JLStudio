import type { ElementType } from '@/types/elements'

export interface ElementTreeNode {
  path: string
  type: ElementType
  label: string
  children?: ElementTreeNode[]
  dynamicChildren?: {
    labelField: string
    childTemplate: ElementTreeNode[]
  }
}

export const SECTION_ELEMENT_TREES: Record<string, ElementTreeNode[]> = {
  hero: [
    { path: 'badge', type: 'badge', label: 'Badge' },
    { path: 'title', type: 'heading', label: 'Titre' },
    { path: 'subtitle', type: 'text', label: 'Sous-titre' },
    { path: 'primaryButton', type: 'button', label: 'Bouton principal' },
    { path: 'secondaryButton', type: 'button', label: 'Bouton secondaire' },
    { path: 'image', type: 'image', label: 'Image' },
  ],
  features: [
    { path: 'badge', type: 'badge', label: 'Badge' },
    { path: 'title', type: 'heading', label: 'Titre' },
    { path: 'subtitle', type: 'text', label: 'Sous-titre' },
    { path: 'items', type: 'container', label: 'Items', dynamicChildren: {
      labelField: 'title',
      childTemplate: [
        { path: 'title', type: 'heading', label: 'Titre' },
        { path: 'description', type: 'text', label: 'Description' },
      ],
    }},
  ],
  cta: [
    { path: 'badge', type: 'badge', label: 'Badge' },
    { path: 'title', type: 'heading', label: 'Titre' },
    { path: 'subtitle', type: 'text', label: 'Sous-titre' },
    { path: 'primaryButton', type: 'button', label: 'Bouton principal' },
    { path: 'secondaryButton', type: 'button', label: 'Bouton secondaire' },
  ],
  stats: [
    { path: 'title', type: 'heading', label: 'Titre' },
    { path: 'subtitle', type: 'text', label: 'Sous-titre' },
    { path: 'items', type: 'container', label: 'Items', dynamicChildren: {
      labelField: 'label',
      childTemplate: [
        { path: 'value', type: 'text', label: 'Valeur' },
        { path: 'label', type: 'text', label: 'Label' },
      ],
    }},
  ],
  testimonials: [
    { path: 'title', type: 'heading', label: 'Titre' },
    { path: 'subtitle', type: 'text', label: 'Sous-titre' },
    { path: 'items', type: 'container', label: 'Items', dynamicChildren: {
      labelField: 'name',
      childTemplate: [
        { path: 'quote', type: 'text', label: 'Citation' },
        { path: 'name', type: 'text', label: 'Nom' },
        { path: 'role', type: 'text', label: 'Role' },
      ],
    }},
  ],
  pricing: [
    { path: 'title', type: 'heading', label: 'Titre' },
    { path: 'subtitle', type: 'text', label: 'Sous-titre' },
    { path: 'items', type: 'container', label: 'Plans', dynamicChildren: {
      labelField: 'name',
      childTemplate: [
        { path: 'name', type: 'heading', label: 'Nom' },
        { path: 'price', type: 'text', label: 'Prix' },
        { path: 'description', type: 'text', label: 'Description' },
      ],
    }},
  ],
  faq: [
    { path: 'title', type: 'heading', label: 'Titre' },
    { path: 'subtitle', type: 'text', label: 'Sous-titre' },
    { path: 'items', type: 'container', label: 'Questions', dynamicChildren: {
      labelField: 'question',
      childTemplate: [
        { path: 'question', type: 'heading', label: 'Question' },
        { path: 'answer', type: 'text', label: 'Reponse' },
      ],
    }},
  ],
  contact: [
    { path: 'title', type: 'heading', label: 'Titre' },
    { path: 'subtitle', type: 'text', label: 'Sous-titre' },
  ],
  logos: [
    { path: 'title', type: 'heading', label: 'Titre' },
    { path: 'subtitle', type: 'text', label: 'Sous-titre' },
    { path: 'items', type: 'container', label: 'Logos', dynamicChildren: {
      labelField: 'name',
      childTemplate: [
        { path: 'logo', type: 'image', label: 'Logo' },
      ],
    }},
  ],
  newsletter: [
    { path: 'title', type: 'heading', label: 'Titre' },
    { path: 'subtitle', type: 'text', label: 'Sous-titre' },
    { path: 'buttonText', type: 'button', label: 'Bouton' },
  ],
  steps: [
    { path: 'title', type: 'heading', label: 'Titre' },
    { path: 'subtitle', type: 'text', label: 'Sous-titre' },
    { path: 'items', type: 'container', label: 'Etapes', dynamicChildren: {
      labelField: 'title',
      childTemplate: [
        { path: 'number', type: 'badge', label: 'Numero' },
        { path: 'title', type: 'heading', label: 'Titre' },
        { path: 'description', type: 'text', label: 'Description' },
      ],
    }},
  ],
  timeline: [
    { path: 'title', type: 'heading', label: 'Titre' },
    { path: 'subtitle', type: 'text', label: 'Sous-titre' },
    { path: 'items', type: 'container', label: 'Evenements', dynamicChildren: {
      labelField: 'title',
      childTemplate: [
        { path: 'date', type: 'text', label: 'Date' },
        { path: 'title', type: 'heading', label: 'Titre' },
        { path: 'description', type: 'text', label: 'Description' },
      ],
    }},
  ],
  team: [
    { path: 'title', type: 'heading', label: 'Titre' },
    { path: 'subtitle', type: 'text', label: 'Sous-titre' },
    { path: 'items', type: 'container', label: 'Membres', dynamicChildren: {
      labelField: 'name',
      childTemplate: [
        { path: 'name', type: 'heading', label: 'Nom' },
        { path: 'role', type: 'text', label: 'Role' },
      ],
    }},
  ],
  'blog-grid': [
    { path: 'title', type: 'heading', label: 'Titre' },
    { path: 'subtitle', type: 'text', label: 'Sous-titre' },
    { path: 'items', type: 'container', label: 'Articles', dynamicChildren: {
      labelField: 'title',
      childTemplate: [
        { path: 'title', type: 'heading', label: 'Titre' },
        { path: 'excerpt', type: 'text', label: 'Extrait' },
      ],
    }},
  ],
  'gallery-grid': [
    { path: 'title', type: 'heading', label: 'Titre' },
    { path: 'subtitle', type: 'text', label: 'Sous-titre' },
    { path: 'items', type: 'container', label: 'Images', dynamicChildren: {
      labelField: 'alt',
      childTemplate: [
        { path: 'src', type: 'image', label: 'Image' },
      ],
    }},
  ],
  'image-text': [
    { path: 'title', type: 'heading', label: 'Titre' },
    { path: 'subtitle', type: 'text', label: 'Sous-titre' },
    { path: 'button', type: 'button', label: 'Bouton' },
    { path: 'image', type: 'image', label: 'Image' },
  ],
  'product-grid': [
    { path: 'title', type: 'heading', label: 'Titre' },
    { path: 'subtitle', type: 'text', label: 'Sous-titre' },
    { path: 'items', type: 'container', label: 'Produits', dynamicChildren: {
      labelField: 'name',
      childTemplate: [
        { path: 'name', type: 'heading', label: 'Nom' },
        { path: 'image', type: 'image', label: 'Image' },
        { path: 'price', type: 'text', label: 'Prix' },
        { path: 'cta', type: 'button', label: 'Bouton' },
      ],
    }},
  ],
  'comparison-table': [
    { path: 'title', type: 'heading', label: 'Titre' },
    { path: 'subtitle', type: 'text', label: 'Sous-titre' },
    { path: 'items', type: 'container', label: 'Lignes', dynamicChildren: {
      labelField: 'feature',
      childTemplate: [
        { path: 'feature', type: 'text', label: 'Feature' },
      ],
    }},
  ],
  'site-header': [
    { path: 'logo', type: 'text', label: 'Logo' },
    { path: 'ctaButton', type: 'button', label: 'Bouton CTA' },
  ],
  'site-footer': [
    { path: 'logo', type: 'text', label: 'Logo' },
    { path: 'description', type: 'text', label: 'Description' },
  ],
}
