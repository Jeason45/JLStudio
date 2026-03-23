// ─────────────────────────────────────────────
// LIBRARY TYPES — Unified preset library
// ─────────────────────────────────────────────

import type { CustomElementType, ElementLayoutStyle, CustomElement } from './elements'
import type { SectionStyle, SectionBackground } from './site'

/** The 6 library categories */
export type LibraryCategory =
  | 'components'    // pre-built UI blocks (buttons, cards, navbars, forms...)
  | 'wireframes'    // empty structural layouts (page skeletons)
  | 'templates'     // full pre-styled pages by industry
  | 'elements'      // atomic elements (headings, text, images, dividers, spacers)
  | 'illustrations' // SVG illustrations and decorations
  | 'icons'         // icon sets
  | 'animations'    // animation presets and visual effects

export interface LibrarySubcategory {
  id: string
  label: string
  icon?: string
}

/** Subcategories per category */
export const LIBRARY_SUBCATEGORIES: Record<LibraryCategory, LibrarySubcategory[]> = {
  components: [
    { id: 'buttons', label: 'Boutons' },
    { id: 'badges', label: 'Badges' },
    { id: 'cards', label: 'Cards' },
    { id: 'navbars', label: 'Navbars' },
    { id: 'headers', label: 'Headers' },
    { id: 'footers', label: 'Footers' },
    { id: 'hero-blocks', label: 'Hero Blocks' },
    { id: 'features', label: 'Features' },
    { id: 'testimonials', label: 'Temoignages' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'cta', label: 'CTA' },
    { id: 'forms', label: 'Formulaires' },
    { id: 'stats', label: 'Statistiques' },
    { id: 'animations', label: 'Animations' },
  ],
  wireframes: [
    { id: 'landing', label: 'Landing Page' },
    { id: 'about', label: 'A propos' },
    { id: 'blog', label: 'Blog' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'ecommerce', label: 'E-commerce' },
  ],
  templates: [
    { id: 'saas', label: 'SaaS' },
    { id: 'agency', label: 'Agence' },
    { id: 'startup', label: 'Startup' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'blog', label: 'Blog' },
    { id: 'real-estate', label: 'Immobilier Premium' },
    { id: 'immobilier', label: 'Immobilier' },
    { id: 'sante', label: 'Santé / Bien-être' },
    { id: 'photographe', label: 'Photographe' },
    { id: 'coach', label: 'Coach / Consultant' },
    { id: 'restaurant', label: 'Restaurant' },
    { id: 'coiffeur', label: 'Coiffeur' },
    { id: 'architecte', label: 'Architecte d\'intérieur' },
    { id: 'tatoueur', label: 'Tatoueur' },
    { id: 'beaute', label: 'Institut beauté' },
    { id: 'dj', label: 'DJ / Musicien' },
    { id: 'traiteur', label: 'Traiteur' },
    { id: 'agency-models', label: 'Agence Mannequins' },
  ],
  elements: [
    { id: 'headings', label: 'Titres' },
    { id: 'text', label: 'Textes' },
    { id: 'images', label: 'Images' },
    { id: 'dividers', label: 'Separateurs' },
    { id: 'spacers', label: 'Espaceurs' },
    { id: 'containers', label: 'Conteneurs' },
    { id: 'lists', label: 'Listes' },
    { id: 'links', label: 'Liens' },
    { id: 'navigation', label: 'Navigation' },
    { id: 'inputs', label: 'Champs de formulaire' },
    { id: 'social', label: 'Liens sociaux' },
    { id: 'progress', label: 'Progression' },
    { id: 'avatars', label: 'Avatars' },
  ],
  illustrations: [
    { id: 'abstract', label: 'Abstraites' },
    { id: 'patterns', label: 'Motifs' },
    { id: 'decorative', label: 'Decoratifs' },
    { id: 'blobs', label: 'Blobs' },
    { id: 'gradients', label: 'Gradients' },
    { id: 'shapes', label: 'Formes' },
  ],
  icons: [
    { id: 'lucide', label: 'Lucide' },
    { id: 'heroicons', label: 'Heroicons' },
    { id: 'phosphor', label: 'Phosphor' },
    { id: 'simple-icons', label: 'Brand Icons' },
  ],
  animations: [
    { id: 'entrances', label: 'Entrees' },
    { id: 'hovers', label: 'Hover Effects' },
    { id: 'loops', label: 'Boucles' },
    { id: 'scroll', label: 'Scroll Effects' },
    { id: 'text', label: 'Text Animations' },
  ],
}

/** Base item shared by all library entries */
export interface LibraryItemBase {
  id: string
  label: string
  category: LibraryCategory
  subcategory: string
  tags: string[]
  thumbnail?: string   // URL, data-uri, or inline SVG
  universe?: string    // "startup" | "corporate" | "luxe" | "creatif" | "glass" | "ecommerce"
}

/** Element preset — produces a single element (or tree with children) when dropped */
export interface LibraryElementItem extends LibraryItemBase {
  dropType: 'element'
  elementDef: LibraryElementDef
}

export interface LibraryElementDef {
  type: CustomElementType
  label: string
  defaultStyle: Record<string, unknown>
  defaultContent: Record<string, unknown>
  children?: LibraryElementDef[]
}

/** Simplified section style for library presets */
export interface LibrarySectionStyle {
  background: SectionBackground
  customBgColor?: string
  paddingY: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

/** Section preset — produces a full section when dropped */
export interface LibrarySectionItem extends LibraryItemBase {
  dropType: 'section'
  sectionType: string
  variant: string
  content: Record<string, unknown>
  style: LibrarySectionStyle
}

/** Template preset — produces multiple sections (full page) when applied */
export interface LibraryTemplateItem extends LibraryItemBase {
  dropType: 'template'
  sections: Array<{
    type: string
    variant: string
    content: Record<string, unknown>
    style: LibrarySectionStyle
  }>
}

/** Icon preset — produces an inline SVG element */
export interface LibraryIconItem extends LibraryItemBase {
  dropType: 'icon'
  svg: string          // raw SVG string
  iconSet: string
  iconName: string
}

export type LibraryItem = LibraryElementItem | LibrarySectionItem | LibraryTemplateItem | LibraryIconItem
