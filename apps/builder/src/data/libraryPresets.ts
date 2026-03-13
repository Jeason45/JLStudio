// ─────────────────────────────────────────────
// LIBRARY — Master registry (imports all presets)
// ─────────────────────────────────────────────

import { LIBRARY_COMPONENTS } from './library/components'
import { LIBRARY_ELEMENTS } from './library/elements'
import { LIBRARY_WIREFRAMES } from './library/wireframes'
import { LIBRARY_TEMPLATES } from './library/templates'
import { LIBRARY_ILLUSTRATIONS } from './library/illustrations'
import { LIBRARY_ICONS } from './library/icons'
import { LIBRARY_ANIMATIONS } from './library/animations'
import type { LibraryCategory, LibraryItem } from '@/types/library'

/** All library items by category */
export const LIBRARY_BY_CATEGORY: Record<LibraryCategory, LibraryItem[]> = {
  components: LIBRARY_COMPONENTS,
  elements: LIBRARY_ELEMENTS,
  wireframes: LIBRARY_WIREFRAMES,
  templates: LIBRARY_TEMPLATES,
  illustrations: LIBRARY_ILLUSTRATIONS,
  icons: LIBRARY_ICONS,
  animations: LIBRARY_ANIMATIONS,
}

/** All library items flat */
export const ALL_LIBRARY_ITEMS: LibraryItem[] = [
  ...LIBRARY_COMPONENTS,
  ...LIBRARY_ELEMENTS,
  ...LIBRARY_WIREFRAMES,
  ...LIBRARY_TEMPLATES,
  ...LIBRARY_ILLUSTRATIONS,
  ...LIBRARY_ICONS,
  ...LIBRARY_ANIMATIONS,
]

/** Category metadata for UI */
export const LIBRARY_CATEGORY_META: { id: LibraryCategory; label: string; count: number }[] = [
  { id: 'components', label: 'Components', count: LIBRARY_COMPONENTS.length },
  { id: 'elements', label: 'Elements', count: LIBRARY_ELEMENTS.length },
  { id: 'animations', label: 'Animations', count: LIBRARY_ANIMATIONS.length },
  { id: 'wireframes', label: 'Wireframes', count: LIBRARY_WIREFRAMES.length },
  { id: 'templates', label: 'Templates', count: LIBRARY_TEMPLATES.length },
  { id: 'illustrations', label: 'Illustrations', count: LIBRARY_ILLUSTRATIONS.length },
  { id: 'icons', label: 'Icons', count: LIBRARY_ICONS.length },
]
