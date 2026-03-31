import { useShallow } from 'zustand/react/shallow'
import { useEditorStore } from '../createEditorStore'

export const useCmsState = () => useEditorStore(useShallow(s => ({
  cmsCollections: s.cmsCollections,
  cmsActiveCollectionId: s.cmsActiveCollectionId,
  cmsItems: s.cmsItems,
})))

export const useCmsActions = () => useEditorStore(useShallow(s => ({
  setCmsCollections: s.setCmsCollections,
  setCmsActiveCollection: s.setCmsActiveCollection,
  setCmsItems: s.setCmsItems,
  setCmsListBinding: s.setCmsListBinding,
  setCmsFieldBinding: s.setCmsFieldBinding,
  setCmsVisibility: s.setCmsVisibility,
  setPageCollectionId: s.setPageCollectionId,
  updateCmsListSort: s.updateCmsListSort,
  updateCmsListFilters: s.updateCmsListFilters,
  updateCmsListLimit: s.updateCmsListLimit,
  updateCmsListOffset: s.updateCmsListOffset,
})))
