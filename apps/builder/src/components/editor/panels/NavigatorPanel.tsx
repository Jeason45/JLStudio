'use client'
import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  ChevronRight, Type, MousePointer, Image, Square, Eye, EyeOff,
  LayoutDashboard, Navigation, Footprints, Puzzle,
  Box, Heading, SplitSquareHorizontal, Minus, Code, GripVertical,
  Copy, Trash2, ArrowUp, ArrowDown, WrapText,
  Search, Lock, Unlock, Zap, Monitor, Link2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { buildUnifiedTree, type UnifiedTreeNode } from '@/lib/unifiedTreeBuilder'
import type { CustomElementType, CustomElement } from '@/types/elements'
import type { SectionConfig } from '@/types/site'
import type { AnimationConfig } from '@/types/interactions'

// ─── Icon maps ───

const TYPE_ICONS: Record<string, React.ReactNode> = {
  heading: <Type className="w-3 h-3" />,
  text: <Type className="w-3 h-3 opacity-60" />,
  button: <MousePointer className="w-3 h-3" />,
  image: <Image className="w-3 h-3" />,
  badge: <Square className="w-3 h-3" />,
  icon: <Square className="w-3 h-3" />,
  video: <Square className="w-3 h-3" />,
  container: <Square className="w-3 h-3" />,
  link: <MousePointer className="w-3 h-3" />,
}

const CUSTOM_TYPE_ICONS: Record<CustomElementType, React.ReactNode> = {
  'custom-container': <Box className="w-3 h-3" />,
  'custom-heading': <Heading className="w-3 h-3" />,
  'custom-text': <Type className="w-3 h-3 opacity-60" />,
  'custom-image': <Image className="w-3 h-3" />,
  'custom-button': <MousePointer className="w-3 h-3" />,
  'custom-divider': <Minus className="w-3 h-3" />,
  'custom-spacer': <SplitSquareHorizontal className="w-3 h-3" />,
  'custom-embed': <Code className="w-3 h-3" />,
  'custom-lottie': <Code className="w-3 h-3" />,
  'custom-spline': <Box className="w-3 h-3" />,
  'custom-rive': <Box className="w-3 h-3" />,
}

const SECTION_TYPE_ICONS: Record<string, React.ReactNode> = {
  'site-header': <Navigation className="w-3.5 h-3.5 text-green-400" />,
  'site-footer': <Footprints className="w-3.5 h-3.5 text-green-400" />,
  custom: <Puzzle className="w-3.5 h-3.5" />,
}

// ─── Helpers ───

function getSectionDisplayName(section: SectionConfig): string {
  if (section.type === 'site-header') return 'Main Navbar'
  if (section.type === 'site-footer') return 'Footer'
  const label = section.content?.__label
  if (typeof label === 'string' && label.trim()) return label.trim()
  const title = section.content?.title
  if (typeof title === 'string' && title.trim()) {
    return title.trim().length > 30 ? title.trim().slice(0, 30) + '…' : title.trim()
  }
  return section.type.charAt(0).toUpperCase() + section.type.slice(1)
}

function getSectionSubtitle(section: SectionConfig): string {
  if (section.type === 'site-header' || section.type === 'site-footer') return ''
  return `${section.type} · ${section.variant}`
}

function getNodeIcon(node: UnifiedTreeNode): React.ReactNode {
  if (node.source === 'custom') {
    return CUSTOM_TYPE_ICONS[node.type as CustomElementType] ?? <Square className="w-3 h-3" />
  }
  return TYPE_ICONS[node.type] ?? <Square className="w-3 h-3" />
}

// ─── Indicator helpers ───

function sectionHasInteractions(section: SectionConfig): boolean {
  const interactions = section.content?.__interactions as Record<string, AnimationConfig[]> | undefined
  if (!interactions) return false
  return Object.values(interactions).some(arr => arr && arr.length > 0)
}

function sectionHasBreakpointOverrides(section: SectionConfig): boolean {
  const bpStyles = section.content?.__elementBreakpointStyles as Record<string, unknown> | undefined
  return !!bpStyles && Object.keys(bpStyles).length > 0
}

function sectionIsComponentInstance(section: SectionConfig): boolean {
  const inst = section.__componentInstance
  return !!inst && !inst.isUnlinked
}

function elementHasInteraction(section: SectionConfig, elementPath: string): boolean {
  const interactions = section.content?.__interactions as Record<string, AnimationConfig[]> | undefined
  if (!interactions) return false
  // elementPath format: "sectionId::contentPath" — extract contentPath
  const contentPath = elementPath.split('::')[1]
  if (!contentPath) return false
  return !!(interactions[contentPath] && interactions[contentPath].length > 0)
}

function elementHasBreakpointOverride(section: SectionConfig, elementPath: string): boolean {
  const bpStyles = section.content?.__elementBreakpointStyles as Record<string, Record<string, unknown>> | undefined
  if (!bpStyles) return false
  const contentPath = elementPath.split('::')[1]
  if (!contentPath) return false
  return !!bpStyles[contentPath] && Object.keys(bpStyles[contentPath]).length > 0
}

// ─── Search filter ───

function filterTreeNodes(nodes: UnifiedTreeNode[], query: string): UnifiedTreeNode[] {
  const q = query.toLowerCase()
  return nodes.reduce<UnifiedTreeNode[]>((acc, node) => {
    const labelMatch = node.label.toLowerCase().includes(q)
    const typeMatch = node.type.toLowerCase().includes(q)
    const filteredChildren = node.children ? filterTreeNodes(node.children, query) : undefined
    const hasMatchingChildren = filteredChildren && filteredChildren.length > 0
    if (labelMatch || typeMatch || hasMatchingChildren) {
      acc.push({ ...node, children: hasMatchingChildren ? filteredChildren : node.children })
    }
    return acc
  }, [])
}

// ─── Context Menu types ───

type ContextMenuTarget =
  | { kind: 'section'; sectionId: string; sectionIndex: number; totalSections: number }
  | { kind: 'element'; sectionId: string; elementId: string; node: UnifiedTreeNode }

interface ContextMenuState {
  x: number
  y: number
  target: ContextMenuTarget
}

// ─── Inline Rename ───

function InlineRename({ value, onCommit, onCancel }: { value: string; onCommit: (v: string) => void; onCancel: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [text, setText] = useState(value)

  useEffect(() => {
    inputRef.current?.focus()
    inputRef.current?.select()
  }, [])

  return (
    <input
      ref={inputRef}
      value={text}
      onChange={(e) => setText(e.target.value)}
      onBlur={() => onCommit(text)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onCommit(text)
        if (e.key === 'Escape') onCancel()
      }}
      className="bg-zinc-700 text-white text-[11px] px-1 py-0 rounded border border-zinc-600 outline-none w-full"
      onClick={(e) => e.stopPropagation()}
    />
  )
}

// ─── Context Menu Component ───

function NavigatorContextMenu({
  menu,
  onClose,
}: {
  menu: ContextMenuState
  onClose: () => void
}) {
  const menuRef = useRef<HTMLDivElement>(null)
  const {
    selectedPageId, duplicateSection, removeSection, moveSection,
    removeCustomElement, addCustomElement,
  } = useEditorStore()

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) onClose()
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  // Adjust position to stay within viewport
  useEffect(() => {
    if (!menuRef.current) return
    const rect = menuRef.current.getBoundingClientRect()
    if (rect.right > window.innerWidth) {
      menuRef.current.style.left = `${menu.x - rect.width}px`
    }
    if (rect.bottom > window.innerHeight) {
      menuRef.current.style.top = `${menu.y - rect.height}px`
    }
  }, [menu.x, menu.y])

  const menuItem = (label: string, icon: React.ReactNode, onClick: () => void, destructive = false) => (
    <button
      key={label}
      onClick={() => { onClick(); onClose() }}
      className={cn(
        'w-full flex items-center gap-2 px-3 py-1.5 text-[11px] text-left transition-colors',
        destructive
          ? 'text-red-400 hover:bg-red-500/10'
          : 'text-zinc-300 hover:bg-zinc-700'
      )}
    >
      {icon}
      {label}
    </button>
  )

  const target = menu.target

  return (
    <div
      ref={menuRef}
      className="fixed z-[999] bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl py-1 min-w-[160px]"
      style={{ left: menu.x, top: menu.y }}
    >
      {target.kind === 'section' && selectedPageId && (
        <>
          {menuItem('Duplicate', <Copy className="w-3 h-3" />, () => duplicateSection(selectedPageId, target.sectionId))}
          {target.sectionIndex > 0 && menuItem('Move Up', <ArrowUp className="w-3 h-3" />, () => moveSection(selectedPageId, target.sectionIndex, target.sectionIndex - 1))}
          {target.sectionIndex < target.totalSections - 1 && menuItem('Move Down', <ArrowDown className="w-3 h-3" />, () => moveSection(selectedPageId, target.sectionIndex, target.sectionIndex + 1))}
          <div className="border-t border-zinc-700 my-1" />
          {menuItem('Delete', <Trash2 className="w-3 h-3" />, () => removeSection(selectedPageId, target.sectionId), true)}
        </>
      )}
      {target.kind === 'element' && target.node.source === 'custom' && (
        <>
          {menuItem('Duplicate', <Copy className="w-3 h-3" />, () => {
            // Duplicate the custom element by reading its data and adding a clone next to it
            const store = useEditorStore.getState()
            const page = store.siteConfig?.pages.find(p => p.id === store.selectedPageId)
            if (!page) return
            const section = page.sections.find(s => s.id === target.sectionId)
            if (!section?.elements) return
            const findInTree = (els: CustomElement[]): { el: CustomElement; parentId: string | null; idx: number } | null => {
              for (let i = 0; i < els.length; i++) {
                if (els[i].id === target.elementId) return { el: els[i], parentId: null, idx: i }
                if (els[i].children) {
                  const found = findInTree(els[i].children!)
                  if (found && found.parentId === null) return { ...found, parentId: els[i].id }
                  if (found) return found
                }
              }
              return null
            }
            const found = findInTree(section.elements)
            if (!found) return
            const clone: CustomElement = JSON.parse(JSON.stringify(found.el))
            clone.id = crypto.randomUUID()
            clone.label = found.el.label + ' (copy)'
            addCustomElement(target.sectionId, clone, found.parentId ?? undefined, found.idx + 1)
          })}
          {menuItem('Wrap in Div', <WrapText className="w-3 h-3" />, () => {
            const store = useEditorStore.getState()
            const page = store.siteConfig?.pages.find(p => p.id === store.selectedPageId)
            if (!page) return
            const section = page.sections.find(s => s.id === target.sectionId)
            if (!section?.elements) return
            const findInTree = (els: CustomElement[]): { el: CustomElement; parentId: string | null; idx: number } | null => {
              for (let i = 0; i < els.length; i++) {
                if (els[i].id === target.elementId) return { el: els[i], parentId: null, idx: i }
                if (els[i].children) {
                  const found = findInTree(els[i].children!)
                  if (found && found.parentId === null) return { ...found, parentId: els[i].id }
                  if (found) return found
                }
              }
              return null
            }
            const found = findInTree(section.elements)
            if (!found) return
            // Remove original element
            removeCustomElement(target.sectionId, target.elementId)
            // Create wrapper div containing the original
            const clone: CustomElement = JSON.parse(JSON.stringify(found.el))
            const wrapper: CustomElement = {
              id: crypto.randomUUID(),
              type: 'custom-container',
              label: 'Div Block',
              content: {},
              style: {} as CustomElement['style'],
              children: [clone],
              visible: true,
            }
            addCustomElement(target.sectionId, wrapper, found.parentId ?? undefined, found.idx)
          })}
          <div className="border-t border-zinc-700 my-1" />
          {menuItem('Delete', <Trash2 className="w-3 h-3" />, () => removeCustomElement(target.sectionId, target.elementId), true)}
        </>
      )}
    </div>
  )
}

// ─── Drag-and-Drop types ───

type DragItem =
  | { kind: 'section'; sectionId: string; index: number }
  | { kind: 'element'; sectionId: string; elementId: string; parentId: string | null; index: number }

type DropTarget =
  | { kind: 'section'; index: number }
  | { kind: 'element'; sectionId: string; parentId: string | null; index: number }

// ─── Main Component ───

export function NavigatorPanel() {
  const {
    siteConfig, selectedPageId, selectedSectionId, selectedElementPath,
    selectSection, selectElement, updateSection, updateCustomElement,
    moveSection, moveCustomElement, toggleLockElement, lockedElements,
  } = useEditorStore()
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
  const [renamingId, setRenamingId] = useState<string | null>(null)
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)

  // Drag state
  const [dragItem, setDragItem] = useState<DragItem | null>(null)
  const [dropTarget, setDropTarget] = useState<DropTarget | null>(null)

  const currentPage = siteConfig?.pages.find(p => p.id === selectedPageId)

  const toggleExpand = (sectionId: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev)
      next.has(sectionId) ? next.delete(sectionId) : next.add(sectionId)
      return next
    })
  }

  const toggleNodeExpand = (key: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  const toggleVisibility = (sectionId: string, visible: boolean) => {
    updateSection(sectionId, { visible })
  }

  const effectiveSections = currentPage?.sections ?? []

  // ─── Rename handlers ───

  const handleSectionRename = (sectionId: string, newLabel: string) => {
    const section = currentPage?.sections.find(s => s.id === sectionId)
    if (!section) return
    const trimmed = newLabel.trim()
    if (trimmed && trimmed !== getSectionDisplayName(section)) {
      const content = { ...section.content, __label: trimmed }
      updateSection(sectionId, { content })
    }
    setRenamingId(null)
  }

  const handleElementRename = (sectionId: string, elementId: string, newLabel: string) => {
    const trimmed = newLabel.trim()
    if (trimmed) {
      updateCustomElement(sectionId, elementId, { label: trimmed })
    }
    setRenamingId(null)
  }

  // ─── Context menu handler ───

  const handleCloseContextMenu = useCallback(() => setContextMenu(null), [])

  // ─── Drag handlers for sections ───

  const handleSectionDragStart = (e: React.DragEvent, sectionId: string, index: number) => {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', sectionId)
    setDragItem({ kind: 'section', sectionId, index })
  }

  const handleSectionDragOver = (e: React.DragEvent, index: number) => {
    if (!dragItem || dragItem.kind !== 'section') return
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDropTarget({ kind: 'section', index })
  }

  const handleSectionDrop = (e: React.DragEvent, toIndex: number) => {
    e.preventDefault()
    if (!dragItem || dragItem.kind !== 'section' || !selectedPageId) return
    const fromIndex = dragItem.index
    if (fromIndex !== toIndex && fromIndex !== toIndex - 1) {
      moveSection(selectedPageId, fromIndex, fromIndex < toIndex ? toIndex - 1 : toIndex)
    }
    setDragItem(null)
    setDropTarget(null)
  }

  // ─── Drag handlers for elements ───

  const findElementInfo = (sectionId: string, elementId: string): { parentId: string | null; index: number } | null => {
    const section = currentPage?.sections.find(s => s.id === sectionId)
    if (!section?.elements) return null
    const search = (els: CustomElement[], parentId: string | null): { parentId: string | null; index: number } | null => {
      for (let i = 0; i < els.length; i++) {
        if (els[i].id === elementId) return { parentId, index: i }
        if (els[i].children) {
          const found = search(els[i].children!, els[i].id)
          if (found) return found
        }
      }
      return null
    }
    return search(section.elements, null)
  }

  const handleElementDragStart = (e: React.DragEvent, sectionId: string, elementId: string) => {
    e.stopPropagation()
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', elementId)
    const info = findElementInfo(sectionId, elementId)
    if (info) {
      setDragItem({ kind: 'element', sectionId, elementId, parentId: info.parentId, index: info.index })
    }
  }

  const handleElementDragOver = (e: React.DragEvent, sectionId: string, parentId: string | null, index: number) => {
    if (!dragItem || dragItem.kind !== 'element') return
    if (dragItem.sectionId !== sectionId) return // Only within same section
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.dropEffect = 'move'
    setDropTarget({ kind: 'element', sectionId, parentId, index })
  }

  const handleElementDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!dragItem || dragItem.kind !== 'element' || !dropTarget || dropTarget.kind !== 'element') {
      setDragItem(null)
      setDropTarget(null)
      return
    }
    // Prevent dropping element into itself
    if (dragItem.elementId === dropTarget.parentId) {
      setDragItem(null)
      setDropTarget(null)
      return
    }
    moveCustomElement(
      dragItem.sectionId,
      dragItem.elementId,
      dropTarget.parentId ?? null,
      dropTarget.index
    )
    setDragItem(null)
    setDropTarget(null)
  }

  const handleDragEnd = () => {
    setDragItem(null)
    setDropTarget(null)
  }

  // ─── Drop indicator ───

  const isDropIndicatorVisible = (kind: 'section' | 'element', index: number, parentId?: string | null, sectionId?: string): boolean => {
    if (!dropTarget) return false
    if (kind === 'section' && dropTarget.kind === 'section') {
      return dropTarget.index === index
    }
    if (kind === 'element' && dropTarget.kind === 'element') {
      return dropTarget.index === index && dropTarget.parentId === (parentId ?? null) && dropTarget.sectionId === sectionId
    }
    return false
  }

  // ─── Unified tree node renderer ───

  const renderTreeNode = (node: UnifiedTreeNode, sectionId: string, depth: number, flatIndex: number, parentId: string | null, section: SectionConfig) => {
    const isSelected = selectedElementPath === node.elementPath
    const hasChildren = node.children && node.children.length > 0
    const isExpanded = expandedNodes.has(node.key) || !!searchQuery
    const isRenaming = node.editable && renamingId === node.key
    const icon = getNodeIcon(node)
    const isCustom = node.source === 'custom'
    const isLocked = lockedElements.has(node.elementPath)

    // Extract element ID for custom elements
    const elIdMatch = node.editable ? node.elementPath.match(/::__el\.(.+)$/) : null
    const elementId = elIdMatch?.[1]
    const isDragging = dragItem?.kind === 'element' && elementId && dragItem.elementId === elementId

    // Indicators
    const hasAnimation = elementHasInteraction(section, node.elementPath)
    const hasBpOverride = elementHasBreakpointOverride(section, node.elementPath)

    return (
      <div key={node.key} style={{ marginLeft: depth > 0 ? 8 : 0 }}>
        {/* Drop indicator before this element */}
        {isCustom && elementId && isDropIndicatorVisible('element', flatIndex, parentId, sectionId) && (
          <div className="h-0.5 bg-blue-500 rounded-full mx-1 my-0.5" />
        )}
        <div
          className={cn(
            'flex items-center gap-1 px-1.5 py-1 rounded text-[11px] transition-colors group',
            isLocked ? 'cursor-not-allowed' : 'cursor-pointer',
            isSelected && !isLocked ? 'bg-wf-blue/20 text-blue-300' : 'text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300',
            node.visible === false && 'opacity-40',
            isDragging && 'opacity-30',
            isLocked && 'opacity-50'
          )}
          onClick={() => {
            if (isLocked) return
            selectElement(node.elementPath)
          }}
          onDoubleClick={(e) => {
            if (!node.editable || isLocked) return
            e.stopPropagation()
            setRenamingId(node.key)
          }}
          onContextMenu={(e) => {
            if (!isCustom || !elementId) return
            e.preventDefault()
            e.stopPropagation()
            setContextMenu({
              x: e.clientX,
              y: e.clientY,
              target: { kind: 'element', sectionId, elementId, node },
            })
          }}
          draggable={isCustom && !!elementId && !isLocked}
          onDragStart={(e) => {
            if (isCustom && elementId && !isLocked) handleElementDragStart(e, sectionId, elementId)
          }}
          onDragOver={(e) => {
            if (isCustom && elementId) handleElementDragOver(e, sectionId, parentId, flatIndex)
          }}
          onDrop={handleElementDrop}
          onDragEnd={handleDragEnd}
        >
          {/* Drag handle for custom elements */}
          {isCustom && elementId && !isLocked ? (
            <GripVertical className="w-3 h-3 text-zinc-700 opacity-0 group-hover:opacity-100 shrink-0 cursor-grab transition-opacity" />
          ) : isCustom && elementId ? (
            <span className="w-3 shrink-0" />
          ) : null}

          {hasChildren ? (
            <button
              onClick={(e) => { e.stopPropagation(); toggleNodeExpand(node.key) }}
              className="p-0.5 shrink-0"
            >
              <ChevronRight className={cn('w-3 h-3 transition-transform', isExpanded && 'rotate-90')} />
            </button>
          ) : (
            <span className="w-4" />
          )}
          <span className="shrink-0 text-zinc-600">{icon}</span>
          {isRenaming && elementId ? (
            <InlineRename
              value={node.label}
              onCommit={(v) => handleElementRename(sectionId, elementId, v)}
              onCancel={() => setRenamingId(null)}
            />
          ) : (
            <span className="truncate flex-1">{node.label}</span>
          )}

          {/* Indicator dots */}
          <span className="flex items-center gap-0.5 shrink-0">
            {hasAnimation && <span className="w-1.5 h-1.5 rounded-full bg-purple-400" title="Animation" />}
            {hasBpOverride && <span className="w-1.5 h-1.5 rounded-full bg-violet-400" title="Breakpoint override" />}
          </span>

          {/* Lock button */}
          <button
            onClick={(e) => { e.stopPropagation(); toggleLockElement(node.elementPath) }}
            className={cn(
              'p-0.5 shrink-0 transition-all',
              isLocked
                ? 'text-amber-400 opacity-100'
                : 'text-zinc-700 opacity-0 group-hover:opacity-100 hover:text-zinc-400'
            )}
            title={isLocked ? 'Déverrouiller' : 'Verrouiller'}
          >
            {isLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
          </button>
        </div>

        {hasChildren && isExpanded && (
          <div className="ml-2 border-l border-zinc-800/60 pl-1 space-y-0.5">
            {node.children!.map((child, ci) => renderTreeNode(child, sectionId, depth + 1, ci, elementId ?? null, section))}
            {/* Drop indicator at the end of children */}
            {isCustom && elementId && dragItem?.kind === 'element' && (
              <div
                className="h-4"
                onDragOver={(e) => handleElementDragOver(e, sectionId, elementId ?? null, node.children!.length)}
                onDrop={handleElementDrop}
              >
                {isDropIndicatorVisible('element', node.children!.length, elementId, sectionId) && (
                  <div className="h-0.5 bg-blue-500 rounded-full mx-1 my-0.5" />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  // Filter sections by search query
  const filteredSections = useMemo(() => {
    if (!searchQuery) return effectiveSections
    const q = searchQuery.toLowerCase()
    return effectiveSections.filter(section => {
      const name = getSectionDisplayName(section).toLowerCase()
      if (name.includes(q)) return true
      if (section.type.includes(q)) return true
      // Check if any child elements match
      const tree = buildUnifiedTree(section)
      return filterTreeNodes(tree, searchQuery).length > 0
    })
  }, [effectiveSections, searchQuery])

  return (
    <div className="flex flex-col h-full">
      {/* Search bar */}
      <div className="px-2 pt-2 pb-1">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-600" />
          <input
            ref={searchRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher..."
            className="w-full bg-zinc-800 border border-zinc-700 rounded text-[11px] text-zinc-300 pl-7 pr-6 py-1.5 outline-none focus:border-zinc-500 placeholder:text-zinc-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400"
            >
              <span className="text-xs">✕</span>
            </button>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 pt-0">
          {/* Body root */}
          <div className="flex items-center gap-1.5 px-1.5 py-1.5 text-xs text-[#ccc] font-medium">
            <LayoutDashboard className="w-3.5 h-3.5 text-zinc-500" />
            <span>Body</span>
          </div>

          {/* Sections tree */}
          {!filteredSections.length ? (
            <p className="text-zinc-500 text-[10px] text-center py-4 ml-4">
              {searchQuery ? 'Aucun résultat' : 'No elements'}
            </p>
          ) : (
            <div className="ml-2 border-l border-zinc-800/60 space-y-0.5">
              {filteredSections.map((section, sectionIndex) => {
                const actualIndex = effectiveSections.indexOf(section)
                const isExpanded = expandedSections.has(section.id) || !!searchQuery
                const isSelected = selectedSectionId === section.id
                const isSectionLocked = lockedElements.has(section.id)
                let unifiedTree = buildUnifiedTree(section)
                if (searchQuery) {
                  unifiedTree = filterTreeNodes(unifiedTree, searchQuery)
                }
                const hasElements = unifiedTree.length > 0

                const sectionIcon = SECTION_TYPE_ICONS[section.type] ?? <LayoutDashboard className="w-3.5 h-3.5 text-zinc-500" />
                const displayName = getSectionDisplayName(section)
                const subtitle = getSectionSubtitle(section)
                const isRenaming = renamingId === section.id
                const isSectionDragging = dragItem?.kind === 'section' && dragItem.sectionId === section.id

                // Section-level indicators
                const hasInteractions = sectionHasInteractions(section)
                const hasBpOverrides = sectionHasBreakpointOverrides(section)
                const isInstance = sectionIsComponentInstance(section)

                return (
                  <div key={section.id}>
                    {/* Drop indicator before this section */}
                    {isDropIndicatorVisible('section', actualIndex) && (
                      <div className="h-0.5 bg-blue-500 rounded-full mx-1 my-0.5" />
                    )}

                    {/* Section row */}
                    <div
                      className={cn(
                        'flex items-center gap-1 px-1.5 py-1 rounded text-[11px] transition-colors group ml-1',
                        isSectionLocked ? 'cursor-not-allowed' : 'cursor-pointer',
                        isSelected && !selectedElementPath && !isSectionLocked ? 'bg-wf-blue/15 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white',
                        section.visible === false && 'opacity-40',
                        isSectionDragging && 'opacity-30',
                        isSectionLocked && 'opacity-50'
                      )}
                      onClick={() => {
                        if (isSectionLocked) return
                        selectSection(section.id); selectElement(null)
                      }}
                      onDoubleClick={(e) => {
                        if (isSectionLocked) return
                        e.stopPropagation()
                        if (section.type !== 'site-header' && section.type !== 'site-footer') {
                          setRenamingId(section.id)
                        }
                      }}
                      onContextMenu={(e) => {
                        e.preventDefault()
                        setContextMenu({
                          x: e.clientX,
                          y: e.clientY,
                          target: {
                            kind: 'section',
                            sectionId: section.id,
                            sectionIndex: actualIndex,
                            totalSections: effectiveSections.length,
                          },
                        })
                      }}
                      draggable={!isSectionLocked}
                      onDragStart={(e) => handleSectionDragStart(e, section.id, actualIndex)}
                      onDragOver={(e) => handleSectionDragOver(e, actualIndex)}
                      onDrop={(e) => handleSectionDrop(e, actualIndex)}
                      onDragEnd={handleDragEnd}
                    >
                      {/* Drag handle */}
                      {!isSectionLocked && (
                        <GripVertical className="w-3 h-3 text-zinc-700 opacity-0 group-hover:opacity-100 shrink-0 cursor-grab transition-opacity" />
                      )}

                      {/* Expand toggle */}
                      <button
                        onClick={(e) => { e.stopPropagation(); if (hasElements) toggleExpand(section.id) }}
                        className={cn('p-0.5 transition-transform shrink-0', !hasElements && 'invisible')}
                      >
                        <ChevronRight className={cn('w-3 h-3 transition-transform', isExpanded && 'rotate-90')} />
                      </button>

                      <span className="shrink-0">{sectionIcon}</span>

                      <div className="flex-1 min-w-0">
                        {isRenaming ? (
                          <InlineRename
                            value={displayName}
                            onCommit={(v) => handleSectionRename(section.id, v)}
                            onCancel={() => setRenamingId(null)}
                          />
                        ) : (
                          <>
                            <span className="truncate block">{displayName}</span>
                            {subtitle && (
                              <span className="text-[9px] text-zinc-500 truncate block">{subtitle}</span>
                            )}
                          </>
                        )}
                      </div>

                      {/* Section indicator dots */}
                      <span className="flex items-center gap-0.5 shrink-0">
                        {hasInteractions && <span className="w-1.5 h-1.5 rounded-full bg-purple-400" title="Animations" />}
                        {hasBpOverrides && <span className="w-1.5 h-1.5 rounded-full bg-violet-400" title="Breakpoint overrides" />}
                        {isInstance && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Component instance" />}
                      </span>

                      {/* Lock button */}
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleLockElement(section.id) }}
                        className={cn(
                          'p-0.5 shrink-0 transition-all',
                          isSectionLocked
                            ? 'text-amber-400 opacity-100'
                            : 'text-zinc-700 opacity-0 group-hover:opacity-100 hover:text-zinc-400'
                        )}
                        title={isSectionLocked ? 'Déverrouiller' : 'Verrouiller'}
                      >
                        {isSectionLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                      </button>

                      {/* Visibility toggle */}
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleVisibility(section.id, !section.visible) }}
                        className="opacity-0 group-hover:opacity-100 p-0.5 text-zinc-600 hover:text-white transition-all shrink-0"
                      >
                        {section.visible !== false ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      </button>
                    </div>

                    {/* Unified element tree */}
                    {isExpanded && hasElements && (
                      <div className="ml-6 border-l border-zinc-800/60 space-y-0.5 pl-1 py-0.5">
                        {unifiedTree.map((node, ni) => renderTreeNode(node, section.id, 0, ni, null, section))}
                        {/* Drop zone at end of elements */}
                        {dragItem?.kind === 'element' && dragItem.sectionId === section.id && (
                          <div
                            className="h-4"
                            onDragOver={(e) => handleElementDragOver(e, section.id, null, (section.elements ?? []).length)}
                            onDrop={handleElementDrop}
                          >
                            {isDropIndicatorVisible('element', (section.elements ?? []).length, null, section.id) && (
                              <div className="h-0.5 bg-blue-500 rounded-full mx-1 my-0.5" />
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}

              {/* Drop indicator at the very end (for dropping section at the last position) */}
              {dragItem?.kind === 'section' && (
                <div
                  className="h-4 ml-1"
                  onDragOver={(e) => handleSectionDragOver(e, effectiveSections.length)}
                  onDrop={(e) => handleSectionDrop(e, effectiveSections.length)}
                >
                  {isDropIndicatorVisible('section', effectiveSections.length) && (
                    <div className="h-0.5 bg-blue-500 rounded-full mx-1 my-0.5" />
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Context menu portal */}
        {contextMenu && (
          <NavigatorContextMenu menu={contextMenu} onClose={handleCloseContextMenu} />
        )}
      </ScrollArea>
    </div>
  )
}
