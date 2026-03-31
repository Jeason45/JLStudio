import { useShallow } from 'zustand/react/shallow'
import { useEditorStore } from '../createEditorStore'

export const useComponents = () => useEditorStore(useShallow(s => ({
  components: s.siteConfig?.components ?? [],
  editingComponentId: s.editingComponentId,
})))

export const useComponentActions = () => useEditorStore(useShallow(s => ({
  createComponentFromSection: s.createComponentFromSection,
  instantiateComponent: s.instantiateComponent,
  deleteComponent: s.deleteComponent,
  updateComponent: s.updateComponent,
  enterComponentEditor: s.enterComponentEditor,
  exitComponentEditor: s.exitComponentEditor,
  updateComponentMaster: s.updateComponentMaster,
  syncMasterToInstances: s.syncMasterToInstances,
  addComponentProp: s.addComponentProp,
  updateComponentProp: s.updateComponentProp,
  removeComponentProp: s.removeComponentProp,
  setInstancePropOverride: s.setInstancePropOverride,
  resetInstanceProp: s.resetInstanceProp,
  addComponentSlot: s.addComponentSlot,
  removeComponentSlot: s.removeComponentSlot,
  addComponentVariant: s.addComponentVariant,
  updateComponentVariant: s.updateComponentVariant,
  removeComponentVariant: s.removeComponentVariant,
  setInstanceVariant: s.setInstanceVariant,
  unlinkInstance: s.unlinkInstance,
  resetInstanceToMaster: s.resetInstanceToMaster,
})))
