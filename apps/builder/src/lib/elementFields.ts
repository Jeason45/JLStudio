import type { ElementType } from '@/types/elements'

export type FieldKind = 'text' | 'textarea' | 'url' | 'image' | 'select' | 'icon' | 'video' | 'color' | 'number'

export interface ElementFieldDef {
  key: string
  label: string
  kind: FieldKind
  options?: { value: string; label: string }[]
  placeholder?: string
  inlineEditable?: boolean
}

/** Fields to display per element type */
export const ELEMENT_FIELDS: Record<ElementType, ElementFieldDef[]> = {
  heading: [
    { key: 'text', label: 'Texte', kind: 'textarea', inlineEditable: true },
  ],
  text: [
    { key: 'text', label: 'Texte', kind: 'textarea', inlineEditable: true },
  ],
  button: [
    { key: 'label', label: 'Label', kind: 'text' },
    { key: 'href', label: 'Lien', kind: 'url', placeholder: 'https://...' },
  ],
  image: [
    { key: 'src', label: 'Image', kind: 'image' },
    { key: 'alt', label: 'Texte alternatif', kind: 'text', placeholder: 'Description de l\'image' },
  ],
  badge: [
    { key: 'text', label: 'Texte', kind: 'text', inlineEditable: true },
  ],
  icon: [
    { key: 'name', label: 'Icone', kind: 'icon' },
  ],
  video: [
    { key: 'url', label: 'URL video', kind: 'url', placeholder: 'https://youtube.com/...' },
  ],
  container: [],
  link: [
    { key: 'label', label: 'Texte', kind: 'text' },
    { key: 'href', label: 'Lien', kind: 'url', placeholder: 'https://...' },
  ],
}

/** Style fields available for element-level styling */
export const ELEMENT_STYLE_FIELDS = [
  { key: 'color', label: 'Couleur du texte', kind: 'color' as const },
  { key: 'fontSize', label: 'Taille', kind: 'text' as const, placeholder: '16px' },
  { key: 'fontWeight', label: 'Epaisseur', kind: 'select' as const, options: [
    { value: '300', label: 'Light' },
    { value: '400', label: 'Normal' },
    { value: '500', label: 'Medium' },
    { value: '600', label: 'Semi-bold' },
    { value: '700', label: 'Bold' },
    { value: '800', label: 'Extra-bold' },
    { value: '900', label: 'Black' },
  ]},
  { key: 'backgroundColor', label: 'Fond', kind: 'color' as const },
  { key: 'borderRadius', label: 'Arrondi', kind: 'text' as const, placeholder: '8px' },
  { key: 'opacity', label: 'Opacite', kind: 'number' as const },
  { key: 'padding', label: 'Padding', kind: 'text' as const, placeholder: '8px 16px' },
  { key: 'margin', label: 'Margin', kind: 'text' as const, placeholder: '0px' },
  { key: 'boxShadow', label: 'Ombre', kind: 'text' as const, placeholder: '0 2px 8px rgba(0,0,0,0.1)' },
]
