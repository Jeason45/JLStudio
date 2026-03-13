// ─────────────────────────────────────────────
// Library utilities — expand presets to real elements
// ─────────────────────────────────────────────

import type { CustomElement, ElementLayoutStyle } from '@/types/elements'
import type { LibraryElementDef, LibraryIconItem } from '@/types/library'

let _counter = 0

function uid() {
  return `el-${Date.now()}-${(++_counter).toString(36)}-${Math.random().toString(36).slice(2, 5)}`
}

/** Recursively expand a LibraryElementDef into a full CustomElement tree */
export function expandLibraryElement(def: LibraryElementDef): CustomElement {
  const children = def.children?.map(expandLibraryElement)
  return {
    id: uid(),
    type: def.type,
    label: def.label,
    content: { ...def.defaultContent },
    style: { ...def.defaultStyle } as ElementLayoutStyle,
    children: def.type === 'custom-container' ? (children ?? []) : undefined,
    visible: true,
  }
}

/** Expand an icon item into a CustomElement (embed with inline SVG) */
export function expandIconElement(item: LibraryIconItem): CustomElement {
  return {
    id: uid(),
    type: 'custom-embed',
    label: item.iconName,
    content: { html: item.svg },
    style: { width: '24px', height: '24px' } as ElementLayoutStyle,
    visible: true,
  }
}
