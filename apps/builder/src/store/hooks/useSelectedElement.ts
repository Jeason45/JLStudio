import { useEditorStore } from '../createEditorStore'
import { selectSiteConfig } from '../selectors/siteConfigSelectors'
import { selectSelectedSectionId, selectSelectedElementPath } from '../selectors/selectionSelectors'

/**
 * Returns the currently selected element's content value by traversing
 * the section's content tree using the selectedElementPath.
 *
 * Path format: "key.nestedKey.arrayIndex.deeperKey"
 */
export const useSelectedElement = () => {
  const sectionId = useEditorStore(selectSelectedSectionId)
  const elementPath = useEditorStore(selectSelectedElementPath)
  const siteConfig = useEditorStore(selectSiteConfig)

  if (!sectionId || !elementPath || !siteConfig) return null

  // Find the section across all pages
  let section = null
  for (const page of siteConfig.pages) {
    const found = page.sections.find(s => s.id === sectionId)
    if (found) {
      section = found
      break
    }
  }

  if (!section) return null

  // Traverse the content tree using the path
  const pathParts = elementPath.split('.')
  let current: unknown = section.content
  for (const part of pathParts) {
    if (current == null || typeof current !== 'object') return null
    current = (current as Record<string, unknown>)[part]
  }

  return {
    sectionId,
    elementPath,
    value: current,
    section,
  }
}
