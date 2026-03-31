import { useEditorStore } from '../createEditorStore'
import { selectSiteConfig } from '../selectors/siteConfigSelectors'
import { selectSelectedSectionId } from '../selectors/selectionSelectors'

export const useSelectedSection = () => {
  const sectionId = useEditorStore(selectSelectedSectionId)
  const siteConfig = useEditorStore(selectSiteConfig)
  if (!sectionId || !siteConfig) return null
  for (const page of siteConfig.pages) {
    const section = page.sections.find(s => s.id === sectionId)
    if (section) return section
  }
  return null
}
