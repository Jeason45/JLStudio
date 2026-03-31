import { useShallow } from 'zustand/react/shallow'
import { useEditorStore } from '../createEditorStore'

export const useClasses = () => useEditorStore(useShallow(s => ({
  classes: s.siteConfig?.classes ?? [],
  tagStyles: s.siteConfig?.tagStyles ?? {},
})))

export const useClassActions = () => useEditorStore(useShallow(s => ({
  addClass: s.addClass,
  updateClassStyles: s.updateClassStyles,
  renameClass: s.renameClass,
  deleteClass: s.deleteClass,
  duplicateClass: s.duplicateClass,
  reorderClasses: s.reorderClasses,
  assignClassToElement: s.assignClassToElement,
  removeClassFromElement: s.removeClassFromElement,
  reorderElementClasses: s.reorderElementClasses,
  assignClassToCustomElement: s.assignClassToCustomElement,
  removeClassFromCustomElement: s.removeClassFromCustomElement,
  updateTagStyle: s.updateTagStyle,
  resetTagStyle: s.resetTagStyle,
  updateClassStateStyles: s.updateClassStateStyles,
  resetClassStateProp: s.resetClassStateProp,
  updateClassBreakpointStyles: s.updateClassBreakpointStyles,
  resetClassBreakpointProp: s.resetClassBreakpointProp,
  importClassPreset: s.importClassPreset,
  importClassCollection: s.importClassCollection,
})))
