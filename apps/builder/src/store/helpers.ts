import type { CustomElement } from '@/types/elements'
import type { SiteConfig, SectionConfig } from '@/types/site'

export function findElement(elements: CustomElement[], id: string): CustomElement | null {
  for (const el of elements) {
    if (el.id === id) return el
    if (el.children) {
      const found = findElement(el.children, id)
      if (found) return found
    }
  }
  return null
}

export function removeFromTree(elements: CustomElement[], id: string): CustomElement[] {
  return elements.filter(el => {
    if (el.id === id) return false
    if (el.children) el.children = removeFromTree(el.children, id)
    return true
  })
}

export function findSectionById(siteConfig: SiteConfig, sectionId: string): SectionConfig | undefined {
  for (const page of siteConfig.pages) {
    const section = page.sections.find(s => s.id === sectionId)
    if (section) return section
  }
  return undefined
}
