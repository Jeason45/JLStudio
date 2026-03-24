import type { ElementStyleOverride } from '@/types/elements'

// ─────────────────────────────────────────────
// CLASS LIBRARY — Pre-built CSS class presets
// ─────────────────────────────────────────────

export interface ClassPreset {
  id: string
  name: string
  description: string
  styles: ElementStyleOverride
  stateOverrides?: Record<string, Partial<ElementStyleOverride>>
  breakpointOverrides?: Record<string, Partial<ElementStyleOverride>>
}

export interface ClassCollection {
  id: string
  name: string
  description: string
  category: ClassCategory
  icon: string
  presets: ClassPreset[]
}

export type ClassCategory =
  | 'buttons'
  | 'cards'
  | 'typography'
  | 'layout'
  | 'forms'
  | 'badges'
  | 'links'
  | 'effects'

export const CLASS_CATEGORIES: { id: ClassCategory; label: string; icon: string }[] = [
  { id: 'buttons', label: 'Boutons', icon: 'mouse-pointer-click' },
  { id: 'cards', label: 'Cards', icon: 'square' },
  { id: 'typography', label: 'Typographie', icon: 'type' },
  { id: 'layout', label: 'Layout', icon: 'layout-grid' },
  { id: 'forms', label: 'Formulaires', icon: 'text-cursor-input' },
  { id: 'badges', label: 'Badges', icon: 'tag' },
  { id: 'links', label: 'Liens', icon: 'link' },
  { id: 'effects', label: 'Effets', icon: 'sparkles' },
]

// ─────────────────────────────────────────────
// BUTTONS
// ─────────────────────────────────────────────

const BUTTON_PRESETS: ClassCollection[] = [
  {
    id: 'col-btn-solid',
    name: 'Boutons solides',
    description: 'Boutons remplis avec fond coloré',
    category: 'buttons',
    icon: 'mouse-pointer-click',
    presets: [
      {
        id: 'cls-btn-primary',
        name: 'btn-primary',
        description: 'Bouton principal avec accent',
        styles: {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          paddingTop: '12px',
          paddingBottom: '12px',
          paddingLeft: '24px',
          paddingRight: '24px',
          backgroundColor: 'var(--brand-primary, #638BFF)',
          color: '#ffffff',
          fontSize: '14px',
          fontWeight: 600,
          lineHeight: '1.5',
          borderRadius: '8px',
          borderWidth: '0',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        },
        stateOverrides: {
          ':hover': {
            backgroundColor: 'var(--brand-primary-hover, #4a73e6)',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(99, 139, 255, 0.3)',
          },
          ':active': {
            transform: 'translateY(0)',
            boxShadow: 'none',
          },
          ':focus-visible': {
            boxShadow: '0 0 0 2px var(--brand-primary, #638BFF)',
          },
        },
      },
      {
        id: 'cls-btn-secondary',
        name: 'btn-secondary',
        description: 'Bouton secondaire neutre',
        styles: {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          paddingTop: '12px',
          paddingBottom: '12px',
          paddingLeft: '24px',
          paddingRight: '24px',
          backgroundColor: 'var(--brand-secondary, #1e293b)',
          color: '#ffffff',
          fontSize: '14px',
          fontWeight: 600,
          lineHeight: '1.5',
          borderRadius: '8px',
          borderWidth: '0',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        },
        stateOverrides: {
          ':hover': {
            backgroundColor: 'var(--brand-secondary-hover, #334155)',
            transform: 'translateY(-1px)',
          },
        },
      },
      {
        id: 'cls-btn-danger',
        name: 'btn-danger',
        description: 'Bouton action destructive',
        styles: {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          paddingTop: '12px',
          paddingBottom: '12px',
          paddingLeft: '24px',
          paddingRight: '24px',
          backgroundColor: '#ef4444',
          color: '#ffffff',
          fontSize: '14px',
          fontWeight: 600,
          lineHeight: '1.5',
          borderRadius: '8px',
          borderWidth: '0',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        },
        stateOverrides: {
          ':hover': {
            backgroundColor: '#dc2626',
            transform: 'translateY(-1px)',
          },
        },
      },
    ],
  },
  {
    id: 'col-btn-outline',
    name: 'Boutons outline',
    description: 'Boutons avec bordure, sans fond',
    category: 'buttons',
    icon: 'mouse-pointer-click',
    presets: [
      {
        id: 'cls-btn-outline',
        name: 'btn-outline',
        description: 'Bouton bordure accent',
        styles: {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          paddingTop: '12px',
          paddingBottom: '12px',
          paddingLeft: '24px',
          paddingRight: '24px',
          backgroundColor: 'transparent',
          color: 'var(--brand-primary, #638BFF)',
          fontSize: '14px',
          fontWeight: 600,
          lineHeight: '1.5',
          borderRadius: '8px',
          borderWidth: '1.5px',
          borderStyle: 'solid',
          borderColor: 'var(--brand-primary, #638BFF)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        },
        stateOverrides: {
          ':hover': {
            backgroundColor: 'var(--brand-primary, #638BFF)',
            color: '#ffffff',
          },
        },
      },
      {
        id: 'cls-btn-outline-light',
        name: 'btn-outline-light',
        description: 'Bouton bordure claire (dark bg)',
        styles: {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          paddingTop: '12px',
          paddingBottom: '12px',
          paddingLeft: '24px',
          paddingRight: '24px',
          backgroundColor: 'transparent',
          color: '#ffffff',
          fontSize: '14px',
          fontWeight: 600,
          lineHeight: '1.5',
          borderRadius: '8px',
          borderWidth: '1.5px',
          borderStyle: 'solid',
          borderColor: 'rgba(255,255,255,0.25)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        },
        stateOverrides: {
          ':hover': {
            backgroundColor: 'rgba(255,255,255,0.08)',
            borderColor: 'rgba(255,255,255,0.5)',
          },
        },
      },
    ],
  },
  {
    id: 'col-btn-special',
    name: 'Boutons speciaux',
    description: 'Boutons ghost, pill, icon',
    category: 'buttons',
    icon: 'mouse-pointer-click',
    presets: [
      {
        id: 'cls-btn-ghost',
        name: 'btn-ghost',
        description: 'Bouton transparent avec hover subtil',
        styles: {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          paddingTop: '10px',
          paddingBottom: '10px',
          paddingLeft: '16px',
          paddingRight: '16px',
          backgroundColor: 'transparent',
          color: 'var(--brand-foreground, #ffffff)',
          fontSize: '14px',
          fontWeight: 500,
          lineHeight: '1.5',
          borderRadius: '8px',
          borderWidth: '0',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        },
        stateOverrides: {
          ':hover': {
            backgroundColor: 'rgba(255,255,255,0.06)',
          },
        },
      },
      {
        id: 'cls-btn-pill',
        name: 'btn-pill',
        description: 'Bouton arrondi complet',
        styles: {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          paddingTop: '12px',
          paddingBottom: '12px',
          paddingLeft: '28px',
          paddingRight: '28px',
          backgroundColor: 'var(--brand-primary, #638BFF)',
          color: '#ffffff',
          fontSize: '14px',
          fontWeight: 600,
          lineHeight: '1.5',
          borderRadius: '100px',
          borderWidth: '0',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        },
        stateOverrides: {
          ':hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(99, 139, 255, 0.35)',
          },
        },
      },
      {
        id: 'cls-btn-icon',
        name: 'btn-icon',
        description: 'Bouton icone carre',
        styles: {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '44px',
          height: '44px',
          backgroundColor: 'rgba(255,255,255,0.06)',
          color: 'var(--brand-foreground, #ffffff)',
          fontSize: '18px',
          borderRadius: '10px',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'rgba(255,255,255,0.08)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        },
        stateOverrides: {
          ':hover': {
            backgroundColor: 'rgba(255,255,255,0.12)',
            borderColor: 'rgba(255,255,255,0.15)',
          },
        },
      },
    ],
  },
]

// ─────────────────────────────────────────────
// CARDS
// ─────────────────────────────────────────────

const CARD_PRESETS: ClassCollection[] = [
  {
    id: 'col-cards',
    name: 'Cards',
    description: 'Conteneurs de contenu stylises',
    category: 'cards',
    icon: 'square',
    presets: [
      {
        id: 'cls-card-default',
        name: 'card-default',
        description: 'Card avec fond et bordure subtile',
        styles: {
          backgroundColor: 'var(--brand-card, #18181b)',
          borderRadius: '12px',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'rgba(255,255,255,0.06)',
          paddingTop: '24px',
          paddingBottom: '24px',
          paddingLeft: '24px',
          paddingRight: '24px',
          transition: 'all 0.3s ease',
        },
        stateOverrides: {
          ':hover': {
            borderColor: 'rgba(255,255,255,0.12)',
            transform: 'translateY(-2px)',
          },
        },
      },
      {
        id: 'cls-card-glass',
        name: 'card-glass',
        description: 'Card glassmorphism avec backdrop blur',
        styles: {
          backgroundColor: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(20px)',
          borderRadius: '16px',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'rgba(255,255,255,0.08)',
          paddingTop: '28px',
          paddingBottom: '28px',
          paddingLeft: '28px',
          paddingRight: '28px',
          transition: 'all 0.3s ease',
        },
        stateOverrides: {
          ':hover': {
            backgroundColor: 'rgba(255,255,255,0.06)',
            borderColor: 'rgba(255,255,255,0.15)',
          },
        },
      },
      {
        id: 'cls-card-elevated',
        name: 'card-elevated',
        description: 'Card avec ombre portee',
        styles: {
          backgroundColor: 'var(--brand-card, #1c1c1e)',
          borderRadius: '16px',
          paddingTop: '28px',
          paddingBottom: '28px',
          paddingLeft: '28px',
          paddingRight: '28px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
          transition: 'all 0.3s ease',
        },
        stateOverrides: {
          ':hover': {
            boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
            transform: 'translateY(-4px)',
          },
        },
      },
      {
        id: 'cls-card-bordered',
        name: 'card-bordered',
        description: 'Card avec bordure accent au hover',
        styles: {
          backgroundColor: 'var(--brand-card, #18181b)',
          borderRadius: '12px',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'rgba(255,255,255,0.06)',
          paddingTop: '24px',
          paddingBottom: '24px',
          paddingLeft: '24px',
          paddingRight: '24px',
          transition: 'all 0.3s ease',
        },
        stateOverrides: {
          ':hover': {
            borderColor: 'var(--brand-primary, #638BFF)',
            boxShadow: '0 0 0 1px var(--brand-primary, #638BFF)',
          },
        },
      },
      {
        id: 'cls-card-gradient',
        name: 'card-gradient-border',
        description: 'Card avec bordure gradient',
        styles: {
          backgroundColor: 'var(--brand-card, #18181b)',
          borderRadius: '16px',
          paddingTop: '28px',
          paddingBottom: '28px',
          paddingLeft: '28px',
          paddingRight: '28px',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'transparent',
          backgroundClip: 'padding-box',
          boxShadow: '0 0 0 1px rgba(99, 139, 255, 0.2)',
          transition: 'all 0.3s ease',
        },
        stateOverrides: {
          ':hover': {
            boxShadow: '0 0 0 1px rgba(99, 139, 255, 0.5), 0 8px 30px rgba(99, 139, 255, 0.1)',
          },
        },
      },
    ],
  },
]

// ─────────────────────────────────────────────
// TYPOGRAPHY
// ─────────────────────────────────────────────

const TYPOGRAPHY_CLASS_PRESETS: ClassCollection[] = [
  {
    id: 'col-text-display',
    name: 'Titres display',
    description: 'Grands titres pour hero et sections',
    category: 'typography',
    icon: 'type',
    presets: [
      {
        id: 'cls-text-hero',
        name: 'text-hero',
        description: 'Titre hero XXL',
        styles: {
          fontSize: '72px',
          fontWeight: 800,
          lineHeight: '1.05',
          letterSpacing: '-0.03em',
          color: 'var(--brand-foreground, #ffffff)',
        },
        breakpointOverrides: {
          '768': { fontSize: '48px' },
          '480': { fontSize: '36px', letterSpacing: '-0.02em' },
        },
      },
      {
        id: 'cls-text-display',
        name: 'text-display',
        description: 'Titre display XL',
        styles: {
          fontSize: '56px',
          fontWeight: 700,
          lineHeight: '1.1',
          letterSpacing: '-0.025em',
          color: 'var(--brand-foreground, #ffffff)',
        },
        breakpointOverrides: {
          '768': { fontSize: '40px' },
          '480': { fontSize: '32px' },
        },
      },
      {
        id: 'cls-text-heading',
        name: 'text-heading',
        description: 'Titre de section',
        styles: {
          fontSize: '40px',
          fontWeight: 700,
          lineHeight: '1.15',
          letterSpacing: '-0.02em',
          color: 'var(--brand-foreground, #ffffff)',
        },
        breakpointOverrides: {
          '768': { fontSize: '32px' },
          '480': { fontSize: '28px' },
        },
      },
      {
        id: 'cls-text-subheading',
        name: 'text-subheading',
        description: 'Sous-titre de section',
        styles: {
          fontSize: '24px',
          fontWeight: 600,
          lineHeight: '1.3',
          letterSpacing: '-0.01em',
          color: 'var(--brand-foreground, #ffffff)',
        },
        breakpointOverrides: {
          '768': { fontSize: '20px' },
        },
      },
    ],
  },
  {
    id: 'col-text-body',
    name: 'Corps de texte',
    description: 'Paragraphes et textes courants',
    category: 'typography',
    icon: 'type',
    presets: [
      {
        id: 'cls-text-body-lg',
        name: 'text-body-lg',
        description: 'Texte large (intro, lead)',
        styles: {
          fontSize: '18px',
          fontWeight: 400,
          lineHeight: '1.7',
          color: 'rgba(255,255,255,0.7)',
        },
        breakpointOverrides: {
          '480': { fontSize: '16px' },
        },
      },
      {
        id: 'cls-text-body',
        name: 'text-body',
        description: 'Texte standard',
        styles: {
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '1.6',
          color: 'rgba(255,255,255,0.6)',
        },
      },
      {
        id: 'cls-text-small',
        name: 'text-small',
        description: 'Texte petit (captions, meta)',
        styles: {
          fontSize: '13px',
          fontWeight: 400,
          lineHeight: '1.5',
          color: 'rgba(255,255,255,0.45)',
        },
      },
      {
        id: 'cls-text-label',
        name: 'text-label',
        description: 'Label uppercase',
        styles: {
          fontSize: '12px',
          fontWeight: 600,
          lineHeight: '1.4',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--brand-primary, #638BFF)',
        },
      },
      {
        id: 'cls-text-gradient',
        name: 'text-gradient',
        description: 'Texte avec gradient',
        styles: {
          backgroundImage: 'linear-gradient(135deg, var(--brand-primary, #638BFF), var(--brand-accent, #a78bfa))',
          backgroundClip: 'text',
          color: 'transparent',
          fontWeight: 700,
        },
      },
    ],
  },
]

// ─────────────────────────────────────────────
// LAYOUT
// ─────────────────────────────────────────────

const LAYOUT_PRESETS: ClassCollection[] = [
  {
    id: 'col-containers',
    name: 'Containers',
    description: 'Conteneurs de page avec max-width',
    category: 'layout',
    icon: 'layout-grid',
    presets: [
      {
        id: 'cls-container',
        name: 'container',
        description: 'Conteneur standard 1200px',
        styles: {
          maxWidth: '1200px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '24px',
          paddingRight: '24px',
          width: '100%',
        },
        breakpointOverrides: {
          '480': { paddingLeft: '16px', paddingRight: '16px' },
        },
      },
      {
        id: 'cls-container-sm',
        name: 'container-sm',
        description: 'Conteneur etroit 720px',
        styles: {
          maxWidth: '720px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '24px',
          paddingRight: '24px',
          width: '100%',
        },
      },
      {
        id: 'cls-container-lg',
        name: 'container-lg',
        description: 'Conteneur large 1440px',
        styles: {
          maxWidth: '1440px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '32px',
          paddingRight: '32px',
          width: '100%',
        },
      },
    ],
  },
  {
    id: 'col-grids',
    name: 'Grilles',
    description: 'Layouts en grille responsive',
    category: 'layout',
    icon: 'layout-grid',
    presets: [
      {
        id: 'cls-grid-2',
        name: 'grid-2',
        description: 'Grille 2 colonnes',
        styles: {
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px',
        },
        breakpointOverrides: {
          '768': { gridTemplateColumns: '1fr' },
        },
      },
      {
        id: 'cls-grid-3',
        name: 'grid-3',
        description: 'Grille 3 colonnes',
        styles: {
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        },
        breakpointOverrides: {
          '768': { gridTemplateColumns: 'repeat(2, 1fr)' },
          '480': { gridTemplateColumns: '1fr' },
        },
      },
      {
        id: 'cls-grid-4',
        name: 'grid-4',
        description: 'Grille 4 colonnes',
        styles: {
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px',
        },
        breakpointOverrides: {
          '768': { gridTemplateColumns: 'repeat(2, 1fr)' },
          '480': { gridTemplateColumns: '1fr' },
        },
      },
      {
        id: 'cls-flex-center',
        name: 'flex-center',
        description: 'Flex centre vertical et horizontal',
        styles: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      {
        id: 'cls-flex-between',
        name: 'flex-between',
        description: 'Flex space-between',
        styles: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        },
      },
      {
        id: 'cls-flex-col',
        name: 'flex-col',
        description: 'Flex colonne centree',
        styles: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        },
      },
    ],
  },
  {
    id: 'col-spacing',
    name: 'Sections spacing',
    description: 'Paddings de section premium',
    category: 'layout',
    icon: 'layout-grid',
    presets: [
      {
        id: 'cls-section-lg',
        name: 'section-lg',
        description: 'Section padding XL',
        styles: {
          paddingTop: '120px',
          paddingBottom: '120px',
        },
        breakpointOverrides: {
          '768': { paddingTop: '80px', paddingBottom: '80px' },
          '480': { paddingTop: '60px', paddingBottom: '60px' },
        },
      },
      {
        id: 'cls-section-md',
        name: 'section-md',
        description: 'Section padding medium',
        styles: {
          paddingTop: '80px',
          paddingBottom: '80px',
        },
        breakpointOverrides: {
          '768': { paddingTop: '56px', paddingBottom: '56px' },
          '480': { paddingTop: '40px', paddingBottom: '40px' },
        },
      },
    ],
  },
]

// ─────────────────────────────────────────────
// FORMS
// ─────────────────────────────────────────────

const FORM_PRESETS: ClassCollection[] = [
  {
    id: 'col-inputs',
    name: 'Champs de formulaire',
    description: 'Inputs, textareas, selects',
    category: 'forms',
    icon: 'text-cursor-input',
    presets: [
      {
        id: 'cls-input-default',
        name: 'input-default',
        description: 'Input standard dark',
        styles: {
          width: '100%',
          height: '44px',
          paddingLeft: '14px',
          paddingRight: '14px',
          backgroundColor: 'rgba(255,255,255,0.04)',
          color: '#ffffff',
          fontSize: '14px',
          borderRadius: '8px',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'rgba(255,255,255,0.1)',
          transition: 'all 0.2s ease',
        },
        stateOverrides: {
          ':focus': {
            borderColor: 'var(--brand-primary, #638BFF)',
            boxShadow: '0 0 0 3px rgba(99, 139, 255, 0.15)',
          },
          '::placeholder': {
            color: 'rgba(255,255,255,0.3)',
          },
        },
      },
      {
        id: 'cls-input-underline',
        name: 'input-underline',
        description: 'Input avec bordure bottom seulement',
        styles: {
          width: '100%',
          height: '44px',
          paddingLeft: '4px',
          paddingRight: '4px',
          backgroundColor: 'transparent',
          color: '#ffffff',
          fontSize: '14px',
          borderRadius: '0',
          borderWidth: '0',
          borderBottomWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'rgba(255,255,255,0.15)',
          transition: 'all 0.2s ease',
        },
        stateOverrides: {
          ':focus': {
            borderColor: 'var(--brand-primary, #638BFF)',
          },
          '::placeholder': {
            color: 'rgba(255,255,255,0.3)',
          },
        },
      },
      {
        id: 'cls-textarea',
        name: 'textarea',
        description: 'Zone de texte multi-lignes',
        styles: {
          width: '100%',
          minHeight: '120px',
          paddingTop: '12px',
          paddingBottom: '12px',
          paddingLeft: '14px',
          paddingRight: '14px',
          backgroundColor: 'rgba(255,255,255,0.04)',
          color: '#ffffff',
          fontSize: '14px',
          lineHeight: '1.6',
          borderRadius: '8px',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'rgba(255,255,255,0.1)',
          transition: 'all 0.2s ease',
        },
        stateOverrides: {
          ':focus': {
            borderColor: 'var(--brand-primary, #638BFF)',
            boxShadow: '0 0 0 3px rgba(99, 139, 255, 0.15)',
          },
        },
      },
    ],
  },
]

// ─────────────────────────────────────────────
// BADGES
// ─────────────────────────────────────────────

const BADGE_PRESETS: ClassCollection[] = [
  {
    id: 'col-badges',
    name: 'Badges & Tags',
    description: 'Etiquettes et indicateurs',
    category: 'badges',
    icon: 'tag',
    presets: [
      {
        id: 'cls-badge',
        name: 'badge',
        description: 'Badge standard accent',
        styles: {
          display: 'inline-flex',
          alignItems: 'center',
          paddingTop: '4px',
          paddingBottom: '4px',
          paddingLeft: '12px',
          paddingRight: '12px',
          backgroundColor: 'rgba(99, 139, 255, 0.12)',
          color: 'var(--brand-primary, #638BFF)',
          fontSize: '12px',
          fontWeight: 600,
          borderRadius: '100px',
        },
      },
      {
        id: 'cls-badge-outline',
        name: 'badge-outline',
        description: 'Badge bordure sans fond',
        styles: {
          display: 'inline-flex',
          alignItems: 'center',
          paddingTop: '4px',
          paddingBottom: '4px',
          paddingLeft: '12px',
          paddingRight: '12px',
          backgroundColor: 'transparent',
          color: 'rgba(255,255,255,0.6)',
          fontSize: '12px',
          fontWeight: 500,
          borderRadius: '100px',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'rgba(255,255,255,0.15)',
        },
      },
      {
        id: 'cls-badge-success',
        name: 'badge-success',
        description: 'Badge statut succes',
        styles: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          paddingTop: '4px',
          paddingBottom: '4px',
          paddingLeft: '12px',
          paddingRight: '12px',
          backgroundColor: 'rgba(34, 197, 94, 0.12)',
          color: '#22c55e',
          fontSize: '12px',
          fontWeight: 600,
          borderRadius: '100px',
        },
      },
    ],
  },
]

// ─────────────────────────────────────────────
// LINKS
// ─────────────────────────────────────────────

const LINK_PRESETS: ClassCollection[] = [
  {
    id: 'col-links',
    name: 'Liens',
    description: 'Styles de liens avec hover',
    category: 'links',
    icon: 'link',
    presets: [
      {
        id: 'cls-link-underline',
        name: 'link-underline',
        description: 'Lien avec underline au hover',
        styles: {
          color: 'var(--brand-primary, #638BFF)',
          textDecoration: 'none',
          transition: 'all 0.2s ease',
          cursor: 'pointer',
        },
        stateOverrides: {
          ':hover': {
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
          },
        },
      },
      {
        id: 'cls-link-subtle',
        name: 'link-subtle',
        description: 'Lien discret gris → blanc',
        styles: {
          color: 'rgba(255,255,255,0.5)',
          textDecoration: 'none',
          transition: 'all 0.2s ease',
          cursor: 'pointer',
        },
        stateOverrides: {
          ':hover': {
            color: '#ffffff',
          },
        },
      },
      {
        id: 'cls-link-arrow',
        name: 'link-arrow',
        description: 'Lien avec fleche droite',
        styles: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          color: 'var(--brand-primary, #638BFF)',
          fontSize: '14px',
          fontWeight: 600,
          textDecoration: 'none',
          transition: 'all 0.2s ease',
          cursor: 'pointer',
        },
        stateOverrides: {
          ':hover': {
            gap: '10px',
          },
        },
      },
    ],
  },
]

// ─────────────────────────────────────────────
// EFFECTS
// ─────────────────────────────────────────────

const EFFECT_PRESETS: ClassCollection[] = [
  {
    id: 'col-effects',
    name: 'Effets visuels',
    description: 'Glass, shadow, hover, glow',
    category: 'effects',
    icon: 'sparkles',
    presets: [
      {
        id: 'cls-glass',
        name: 'glass',
        description: 'Effet glassmorphism',
        styles: {
          backgroundColor: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(20px)',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'rgba(255,255,255,0.08)',
        },
      },
      {
        id: 'cls-glass-strong',
        name: 'glass-strong',
        description: 'Glassmorphism prononce',
        styles: {
          backgroundColor: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(40px)',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'rgba(255,255,255,0.12)',
        },
      },
      {
        id: 'cls-shadow-soft',
        name: 'shadow-soft',
        description: 'Ombre douce',
        styles: {
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        },
      },
      {
        id: 'cls-shadow-xl',
        name: 'shadow-xl',
        description: 'Grande ombre dramatique',
        styles: {
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        },
      },
      {
        id: 'cls-hover-scale',
        name: 'hover-scale',
        description: 'Zoom subtil au hover',
        styles: {
          transition: 'transform 0.3s ease',
        },
        stateOverrides: {
          ':hover': {
            transform: 'scale(1.03)',
          },
        },
      },
      {
        id: 'cls-hover-glow',
        name: 'hover-glow',
        description: 'Glow accent au hover',
        styles: {
          transition: 'box-shadow 0.3s ease',
        },
        stateOverrides: {
          ':hover': {
            boxShadow: '0 0 30px rgba(99, 139, 255, 0.2)',
          },
        },
      },
      {
        id: 'cls-hover-lift',
        name: 'hover-lift',
        description: 'Elevation au hover',
        styles: {
          transition: 'all 0.3s ease',
        },
        stateOverrides: {
          ':hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
          },
        },
      },
      {
        id: 'cls-divider',
        name: 'divider',
        description: 'Ligne separatrice subtile',
        styles: {
          width: '100%',
          height: '1px',
          backgroundColor: 'rgba(255,255,255,0.06)',
        },
      },
      {
        id: 'cls-gradient-accent',
        name: 'gradient-accent',
        description: 'Fond gradient accent',
        styles: {
          backgroundImage: 'linear-gradient(135deg, var(--brand-primary, #638BFF), var(--brand-accent, #a78bfa))',
        },
      },
    ],
  },
]

// ─────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────

export const CLASS_LIBRARY: ClassCollection[] = [
  ...BUTTON_PRESETS,
  ...CARD_PRESETS,
  ...TYPOGRAPHY_CLASS_PRESETS,
  ...LAYOUT_PRESETS,
  ...FORM_PRESETS,
  ...BADGE_PRESETS,
  ...LINK_PRESETS,
  ...EFFECT_PRESETS,
]

export function getCollectionsByCategory(category: ClassCategory): ClassCollection[] {
  return CLASS_LIBRARY.filter(c => c.category === category)
}

export function getPresetById(presetId: string): ClassPreset | undefined {
  for (const col of CLASS_LIBRARY) {
    const found = col.presets.find(p => p.id === presetId)
    if (found) return found
  }
  return undefined
}

export function getAllPresets(): ClassPreset[] {
  return CLASS_LIBRARY.flatMap(c => c.presets)
}

export function getCollectionById(collectionId: string): ClassCollection | undefined {
  return CLASS_LIBRARY.find(c => c.id === collectionId)
}
