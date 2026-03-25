'use client'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from '@dnd-kit/core'
import { useState, useCallback, useMemo } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { SectionDragOverlay } from './SectionDragOverlay'
import { clearActiveSmartGuides } from './SmartGuidesOverlay'
import { snapModifier } from '@/lib/snapModifier'

interface EditorDndContextProps {
  children: React.ReactNode
}

export function EditorDndContext({ children }: EditorDndContextProps) {
  const { siteConfig, selectedPageId, moveSection, addSection, moveCustomElement, addCustomElement, selectSection, setIsDragging } = useEditorStore()
  const [activeDragId, setActiveDragId] = useState<string | null>(null)
  const [activeDragType, setActiveDragType] = useState<'section' | 'new-section' | 'element' | 'new-element' | null>(null)
  const [activeDragLabel, setActiveDragLabel] = useState<string>('')

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event
    const data = active.data.current

    console.log('[DnD DEBUG] dragStart', { id: active.id, type: data?.type, data })

    setActiveDragId(String(active.id))
    setIsDragging(true)

    if (data?.type === 'new-section') {
      setActiveDragType('new-section')
      setActiveDragLabel(data.label ?? data.sectionType ?? '')
    } else if (data?.type === 'new-element') {
      setActiveDragType('new-element')
      setActiveDragLabel(data.label ?? '')
    } else if (data?.type === 'element') {
      setActiveDragType('element')
      setActiveDragLabel(data.elementId ?? '')
    } else {
      setActiveDragType('section')
      setActiveDragLabel(data?.sectionType ?? '')
    }
  }, [setIsDragging])

  const handleDragOver = useCallback((_event: DragOverEvent) => {
    // Handled by sortable
  }, [])

  const handleDragCancel = useCallback(() => {
    console.log('[DnD DEBUG] dragCancel')
    setActiveDragId(null)
    setActiveDragType(null)
    setActiveDragLabel('')
    setIsDragging(false)
    clearActiveSmartGuides()
  }, [setIsDragging])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event

    console.log('[DnD DEBUG] dragEnd', {
      activeId: active.id,
      activeType: active.data.current?.type,
      overId: over?.id ?? 'NULL',
      overType: over?.data?.current?.type ?? 'NULL',
      selectedPageId,
    })

    setActiveDragId(null)
    setActiveDragType(null)
    setActiveDragLabel('')
    setIsDragging(false)
    clearActiveSmartGuides()

    if (!over || !selectedPageId) return

    const activeData = active.data.current
    const overData = over.data.current

    // Case 1: Reorder existing sections
    if (activeData?.type === 'section' && overData?.type === 'section') {
      const page = siteConfig?.pages.find(p => p.id === selectedPageId)
      if (!page) return

      const fromIndex = page.sections.findIndex(s => s.id === active.id)
      const toIndex = page.sections.findIndex(s => s.id === over.id)

      if (fromIndex !== -1 && toIndex !== -1 && fromIndex !== toIndex) {
        moveSection(selectedPageId, fromIndex, toIndex)
      }
      return
    }

    // Case 2: Add new section from sidebar
    if (activeData?.type === 'new-section') {
      const page = siteConfig?.pages.find(p => p.id === selectedPageId)
      if (!page) return

      const sectionType = activeData.sectionType as string
      const defaultContent = activeData.defaultContent ?? {}
      const defaultVariant = activeData.defaultVariant ?? 'default'

      let insertIndex = page.sections.length

      if (overData?.type === 'section') {
        const overIndex = page.sections.findIndex(s => s.id === over.id)
        if (overIndex !== -1) insertIndex = overIndex
      }

      addSection(selectedPageId, {
        id: `section-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        type: sectionType,
        variant: defaultVariant,
        content: defaultContent,
        style: { background: 'white', paddingY: 'lg' },
        visible: true,
      }, insertIndex)
    }

    // Case 3: Reorder elements within a section
    if (activeData?.type === 'element') {
      const sectionId = activeData.sectionId as string
      const elementId = activeData.elementId as string

      if (!sectionId || !elementId) return

      // Determine where it's being dropped
      if (overData?.type === 'element') {
        // Dropped on another element — reorder in same parent
        const overElementId = overData.elementId as string
        const page = siteConfig?.pages.find(p => p.id === selectedPageId)
        if (!page) return
        const section = page.sections.find(s => s.id === sectionId)
        if (!section?.elements) return

        // Find the parent and index of the over element
        const { parentId, index } = findElementPosition(section.elements, overElementId)
        if (index !== -1) {
          moveCustomElement(sectionId, elementId, parentId, index)
        }
      } else if (overData?.type === 'element-container') {
        // Dropped on a container droppable
        const targetParentId = overData.parentId as string | null
        moveCustomElement(sectionId, elementId, targetParentId, 0)
      }
      return
    }

    // Case 4: Add new element from sidebar
    if (activeData?.type === 'new-element') {
      const elementDef = activeData.elementDef
      if (!elementDef) return

      // Find target section
      let targetSectionId: string | null = null
      let targetParentId: string | null = null
      let targetIndex = 0

      if (overData?.type === 'element') {
        targetSectionId = overData.sectionId as string
        const page = siteConfig?.pages.find(p => p.id === selectedPageId)
        if (page) {
          const section = page.sections.find(s => s.id === targetSectionId)
          if (section?.elements) {
            const pos = findElementPosition(section.elements, overData.elementId as string)
            targetParentId = pos.parentId
            targetIndex = pos.index !== -1 ? pos.index : 0
          }
        }
      } else if (overData?.type === 'element-container') {
        targetSectionId = overData.sectionId as string
        targetParentId = overData.parentId as string | null
      } else if (overData?.type === 'section') {
        // Dropped on a section directly
        targetSectionId = String(over.id)
      }

      if (!targetSectionId) {
        // No target section — create a custom section
        targetSectionId = `section-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
        addSection(selectedPageId, {
          id: targetSectionId,
          type: 'custom',
          variant: 'default',
          content: {},
          style: { background: 'white', paddingY: 'lg' },
          visible: true,
        })
        selectSection(targetSectionId)
      }

      // Support pre-built elements with children (from Library presets)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const expandChildren = (defs?: any[]): any[] | undefined => {
        if (!defs || defs.length === 0) return elementDef.type === 'custom-container' ? [] : undefined
        return defs.map(child => ({
          id: `el-${Date.now()}-${Math.random().toString(36).slice(2, 6)}-${Math.random().toString(36).slice(2, 4)}`,
          type: child.type,
          label: child.label,
          content: { ...child.defaultContent },
          style: { ...child.defaultStyle },
          children: expandChildren(child.children),
          visible: true,
        }))
      }

      addCustomElement(targetSectionId, {
        id: `el-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        type: elementDef.type,
        label: elementDef.label,
        content: { ...elementDef.defaultContent },
        style: { ...elementDef.defaultStyle },
        children: expandChildren(elementDef.children),
        visible: true,
      }, targetParentId ?? undefined, targetIndex)
    }
  }, [siteConfig, selectedPageId, moveSection, addSection, moveCustomElement, addCustomElement, selectSection, setIsDragging])

  const modifiers = useMemo(() => [snapModifier], [])

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={modifiers}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      {children}
      <DragOverlay dropAnimation={null}>
        {activeDragId && (
          <SectionDragOverlay
            type={activeDragType}
            label={activeDragLabel}
          />
        )}
      </DragOverlay>
    </DndContext>
  )
}

// Helper: find the parent and index of an element in the tree
function findElementPosition(
  elements: { id: string; children?: { id: string; children?: unknown[] }[] }[],
  targetId: string,
  parentId: string | null = null
): { parentId: string | null; index: number } {
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].id === targetId) {
      return { parentId, index: i }
    }
    const el = elements[i]
    if (el.children && el.children.length > 0) {
      const result = findElementPosition(
        el.children as { id: string; children?: { id: string; children?: unknown[] }[] }[],
        targetId,
        el.id
      )
      if (result.index !== -1) return result
    }
  }
  return { parentId: null, index: -1 }
}
