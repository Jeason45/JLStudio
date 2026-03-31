'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useEditorStore } from '@/store/editorStore'
import { useCanvasViewport, useCanvasTools, useCanvasActions } from '@/store/hooks/useCanvasState'
import { useSelection, useSelectionActions, useEditorFlags } from '@/store/hooks/useSelectionState'
import { selectSiteConfig } from '@/store/selectors/siteConfigSelectors'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'
import { SortableSectionWrapper } from './SortableSectionWrapper'
import { ElementSelectionOverlay } from './ElementSelectionOverlay'
import { AddLayoutModal } from './AddLayoutModal'
import { CanvasRulers } from './CanvasRulers'
import { CanvasGuides } from './CanvasGuides'
import { CanvasGridOverlay } from './CanvasGridOverlay'
import { SmartGuidesOverlay } from './SmartGuidesOverlay'
import { Undo2, Redo2, ChevronRight, ChevronDown, Monitor, Tablet, Smartphone, MoreHorizontal, ZoomIn, ZoomOut, Grid3X3, Columns3, Ruler, Magnet } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getBreakpointById, getAffectsLabel, PRIMARY_BREAKPOINTS, SECONDARY_BREAKPOINTS } from '@/types/breakpoints'
import type { BreakpointDef } from '@/types/breakpoints'
import { parseElementId } from '@/lib/elementHelpers'
import type { CustomElement } from '@/types/elements'
import { ComponentEditorBanner } from './ComponentEditorBanner'

const ICON_MAP: Record<string, typeof Monitor> = { Monitor, Tablet, Smartphone }

function getSectionLabel(section: { type: string; content: Record<string, unknown> }): string {
  if (section.type === 'site-header') return 'Main Navbar'
  if (section.type === 'site-footer') return 'Footer'
  if (section.type === 'custom') return 'Custom Section'
  const label = section.content?.__label
  if (typeof label === 'string' && label.trim()) return label.trim()
  const title = section.content?.title
  if (typeof title === 'string' && title.trim()) {
    return title.trim().length > 25 ? title.trim().slice(0, 25) + '…' : title.trim()
  }
  return section.type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

function findElById(elements: CustomElement[], id: string): CustomElement | null {
  for (const el of elements) {
    if (el.id === id) return el
    if (el.children) { const f = findElById(el.children, id); if (f) return f }
  }
  return null
}

function resolveElementLabel(path: string, section: { elements?: CustomElement[] }): string {
  const parsed = parseElementId(path)
  if (!parsed) return path
  const cp = parsed.contentPath
  if (cp.startsWith('__el.')) {
    const el = findElById(section.elements ?? [], cp.slice(5))
    return el?.label ?? 'Element'
  }
  if (typeof document !== 'undefined') {
    const dom = document.querySelector(`[data-element-id="${path}"]`) as HTMLElement | null
    if (dom) return dom.getAttribute('data-element-label') ?? cp
  }
  const last = cp.split('.').pop() ?? cp
  return last.charAt(0).toUpperCase() + last.slice(1)
}

// ─── Vision filter CSS values ───
const VISION_FILTERS: Record<string, string> = {
  deuteranopia: 'url(#deuteranopia)',
  protanopia: 'url(#protanopia)',
  tritanopia: 'url(#tritanopia)',
  achromatopsia: 'grayscale(100%)',
  blurred: 'blur(2px)',
}

const VISION_OPTIONS = [
  { value: 'none', label: 'None' },
  { value: 'deuteranopia', label: 'Deuteranopia' },
  { value: 'protanopia', label: 'Protanopia' },
  { value: 'tritanopia', label: 'Tritanopia' },
  { value: 'achromatopsia', label: 'Achromatopsia' },
  { value: 'blurred', label: 'Blurred vision' },
]

const TEXT_ZOOM_PRESETS = [9, 16, 24, 32]

/** Canvas settings popover (width, scale, vision, text zoom) */
function CanvasSettingsPopover({
  currentWidth, onWidthChange,
  canvasZoom, onZoomChange,
  visionFilter, onVisionFilterChange,
  textZoom, onTextZoomChange,
  onClose,
}: {
  currentWidth: number
  onWidthChange: (w: number) => void
  canvasZoom: number
  onZoomChange: (z: number) => void
  visionFilter: string
  onVisionFilterChange: (f: string) => void
  textZoom: number | null
  onTextZoomChange: (s: number | null) => void
  onClose: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [widthInput, setWidthInput] = useState(String(currentWidth))
  const [scaleInput, setScaleInput] = useState(String(Math.round(canvasZoom * 100)))
  const [advancedOpen, setAdvancedOpen] = useState(false)

  useEffect(() => {
    setWidthInput(String(currentWidth))
  }, [currentWidth])

  useEffect(() => {
    setScaleInput(String(Math.round(canvasZoom * 100)))
  }, [canvasZoom])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  const commitWidth = () => {
    const v = parseInt(widthInput)
    if (!isNaN(v) && v >= 100 && v <= 4000) onWidthChange(v)
    else setWidthInput(String(currentWidth))
  }

  const commitScale = () => {
    const v = parseInt(scaleInput)
    if (!isNaN(v) && v >= 10 && v <= 300) onZoomChange(v / 100)
    else setScaleInput(String(Math.round(canvasZoom * 100)))
  }

  const inputCls = 'h-7 bg-[#1e1e1e] border border-[#3a3a3a] text-[#e0e0e0] text-[11px] rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue font-mono'
  const labelCls = 'text-[11px] text-zinc-400 font-medium'

  return (
    <div
      ref={ref}
      className="absolute top-full right-0 mt-2 w-[260px] bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl z-[99999] overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="px-4 pt-3 pb-1">
        <span className="text-[11px] text-zinc-300 font-semibold uppercase tracking-wider">Canvas settings</span>
      </div>

      {/* Width */}
      <div className="px-4 py-2 flex items-center justify-between gap-2">
        <span className={labelCls}>Width</span>
        <div className="flex items-center gap-1">
          <input
            value={widthInput}
            onChange={(e) => setWidthInput(e.target.value)}
            onBlur={commitWidth}
            onKeyDown={(e) => { if (e.key === 'Enter') commitWidth() }}
            className={cn(inputCls, 'w-[70px] text-right')}
          />
          <span className="text-[10px] text-zinc-500">px</span>
        </div>
      </div>

      {/* Scale */}
      <div className="px-4 py-2 flex items-center justify-between gap-2">
        <span className={labelCls}>Scale</span>
        <div className="flex items-center gap-1">
          <input
            value={scaleInput}
            onChange={(e) => setScaleInput(e.target.value)}
            onBlur={commitScale}
            onKeyDown={(e) => { if (e.key === 'Enter') commitScale() }}
            className={cn(inputCls, 'w-[60px] text-right')}
          />
          <span className="text-[10px] text-zinc-500">%</span>
        </div>
      </div>

      <div className="mx-4 border-t border-zinc-700/50" />

      {/* Vision preview */}
      <div className="px-4 py-2">
        <span className={labelCls}>Vision preview</span>
        <select
          value={visionFilter}
          onChange={(e) => onVisionFilterChange(e.target.value)}
          className={cn(inputCls, 'w-full mt-1.5 cursor-pointer')}
        >
          {VISION_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="mx-4 border-t border-zinc-700/50" />

      {/* Text zoom preview */}
      <div className="px-4 py-2">
        <span className={labelCls}>Text zoom preview</span>
        <div className="flex items-center gap-1.5 mt-1.5">
          {TEXT_ZOOM_PRESETS.map(size => (
            <button
              key={size}
              onClick={() => onTextZoomChange(textZoom === size ? null : size)}
              className={cn(
                'h-7 flex-1 rounded text-[11px] font-mono transition-colors border',
                textZoom === size
                  ? 'bg-wf-blue/20 border-wf-blue text-wf-blue'
                  : 'bg-[#1e1e1e] border-[#3a3a3a] text-zinc-400 hover:text-white hover:border-zinc-500'
              )}
            >
              {size}
            </button>
          ))}
          <button
            onClick={() => onTextZoomChange(null)}
            className="h-7 px-2 rounded text-[11px] bg-[#1e1e1e] border border-[#3a3a3a] text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Advanced settings */}
      <div className="mx-4 border-t border-zinc-700/50" />
      <div className="px-4 py-2">
        <button
          onClick={() => setAdvancedOpen(!advancedOpen)}
          className="flex items-center gap-1.5 text-[11px] text-zinc-400 hover:text-white transition-colors w-full"
        >
          <ChevronRight className={cn('w-3 h-3 transition-transform', advancedOpen && 'rotate-90')} />
          <span>Advanced settings</span>
        </button>
        {advancedOpen && (
          <div className="mt-2 pl-4 text-[11px] text-zinc-500">
            <p>No additional settings available.</p>
          </div>
        )}
      </div>

      <div className="h-1" />
    </div>
  )
}

/** SVG filters for color blindness simulation */
function VisionFiltersSVG() {
  return (
    <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
      <defs>
        <filter id="deuteranopia">
          <feColorMatrix type="matrix" values="0.625 0.375 0 0 0  0.7 0.3 0 0 0  0 0.3 0.7 0 0  0 0 0 1 0" />
        </filter>
        <filter id="protanopia">
          <feColorMatrix type="matrix" values="0.567 0.433 0 0 0  0.558 0.442 0 0 0  0 0.242 0.758 0 0  0 0 0 1 0" />
        </filter>
        <filter id="tritanopia">
          <feColorMatrix type="matrix" values="0.95 0.05 0 0 0  0 0.433 0.567 0 0  0 0.475 0.525 0 0  0 0 0 1 0" />
        </filter>
      </defs>
    </svg>
  )
}

/** Breakpoint icon with background highlight when active (like Webflow) */
function BreakpointIcon({ bp, active, onClick }: { bp: BreakpointDef; active: boolean; onClick: () => void }) {
  const Icon = ICON_MAP[bp.icon] ?? Monitor
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick() }}
      title={`${bp.label}${bp.shortcut ? ` (${bp.shortcut})` : ''}`}
      className={cn(
        'w-6 h-6 flex items-center justify-center rounded transition-colors',
        active
          ? 'bg-[#303030] text-white'
          : 'text-zinc-500 hover:text-zinc-200 hover:bg-[#303030]/50'
      )}
    >
      <Icon className="w-4 h-4" />
    </button>
  )
}

export function Canvas() {
  // Optimized selectors — each hook only re-renders when its slice changes
  const siteConfig = useEditorStore(selectSiteConfig)
  const { canvasZoom, canvasOffset, isPanning } = useCanvasViewport()
  const { showRulers, showGrid, showColumns, snapEnabled } = useCanvasTools()
  const { setCanvasZoom, setCanvasOffset, zoomIn, zoomOut, zoomTo100, setIsPanning, toggleRulers, toggleGrid, toggleColumns, toggleSnap } = useCanvasActions()
  const { selectedPageId, selectedSectionId, selectedElementPath } = useSelection()
  const { selectSection, selectElement, clearSelection, selectPage } = useSelectionActions()
  const { isDragging, activeBreakpoint, activeState, previewMode, editingComponentId } = useEditorFlags()
  const { undo, redo, canUndo, canRedo, setActiveBreakpoint } = useEditorStore(useShallow(s => ({
    undo: s.undo, redo: s.redo, canUndo: s.canUndo, canRedo: s.canRedo, setActiveBreakpoint: s.setActiveBreakpoint,
  })))
  const currentPage = siteConfig?.pages.find(p => p.id === selectedPageId)
  const editingComponent = editingComponentId ? siteConfig?.components?.find(c => c.id === editingComponentId) : null
  const sectionIds = editingComponent
    ? [editingComponent.sectionSnapshot.id]
    : (currentPage?.sections.map(s => s.id) ?? [])

  const bp = getBreakpointById(activeBreakpoint)
  const bpWidth = bp?.width ?? 992

  // Custom width from drag resize (null = use breakpoint default)
  const [customWidth, setCustomWidth] = useState<number | null>(null)
  const [isResizing, setIsResizing] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [canvasSettingsOpen, setCanvasSettingsOpen] = useState(false)
  const [addLayoutOpen, setAddLayoutOpen] = useState(false)
  const [visionFilter, setVisionFilter] = useState<string>('none')
  const [textZoom, setTextZoom] = useState<number | null>(null)
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null)
  const resizeRef = useRef<{ startX: number; startWidth: number } | null>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const panStartRef = useRef<{ x: number; y: number; offsetX: number; offsetY: number } | null>(null)
  const spaceDownRef = useRef(false)

  // Reset custom width when breakpoint changes
  useEffect(() => {
    setCustomWidth(null)
  }, [activeBreakpoint])

  const isBase = activeBreakpoint === 'base'
  const isFullWidth = isBase && !customWidth
  const currentWidth = customWidth ?? bpWidth

  // Affects label for vertical canvas label
  const affectsLabel = getAffectsLabel(activeBreakpoint)

  // ─── Zoom via Ctrl+scroll ───
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!e.ctrlKey && !e.metaKey) return
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    const store = useEditorStore.getState()
    const newZoom = Math.max(0.1, Math.min(3, Math.round((store.canvasZoom + delta) * 100) / 100))
    setCanvasZoom(newZoom)
  }, [setCanvasZoom])

  useEffect(() => {
    const container = canvasContainerRef.current
    if (!container) return
    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => container.removeEventListener('wheel', handleWheel)
  }, [handleWheel])

  // ─── Pan (Space+Drag / Middle Mouse) ───
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault()
        spaceDownRef.current = true
        setIsPanning(true)
      }
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        spaceDownRef.current = false
        if (!panStartRef.current) setIsPanning(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [setIsPanning])

  const handlePanStart = useCallback((e: React.MouseEvent) => {
    // Space+click or middle mouse
    if (!(spaceDownRef.current || e.button === 1)) return
    e.preventDefault()
    e.stopPropagation()
    const store = useEditorStore.getState()
    panStartRef.current = { x: e.clientX, y: e.clientY, offsetX: store.canvasOffset.x, offsetY: store.canvasOffset.y }
    setIsPanning(true)

    const onMove = (me: MouseEvent) => {
      if (!panStartRef.current) return
      const dx = me.clientX - panStartRef.current.x
      const dy = me.clientY - panStartRef.current.y
      setCanvasOffset({
        x: panStartRef.current.offsetX + dx,
        y: panStartRef.current.offsetY + dy,
      })
    }
    const onUp = () => {
      panStartRef.current = null
      if (!spaceDownRef.current) setIsPanning(false)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [setCanvasOffset, setIsPanning])

  // ─── Drag resize handlers ───
  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsResizing(true)
    resizeRef.current = { startX: e.clientX, startWidth: currentWidth }

    const handleMouseMove = (ev: MouseEvent) => {
      if (!resizeRef.current) return
      const delta = (ev.clientX - resizeRef.current.startX) * 2
      const newWidth = Math.max(280, Math.min(2400, resizeRef.current.startWidth + delta))
      setCustomWidth(Math.round(newWidth))
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      resizeRef.current = null
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    document.body.style.cursor = 'ew-resize'
    document.body.style.userSelect = 'none'
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [currentWidth])

  // Track cursor for rulers
  const handleCanvasMouseMove = useCallback((e: React.MouseEvent) => {
    const container = canvasContainerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }, [])

  // ─── Internal link navigation helper ───
  const navigateToSlug = useCallback((href: string) => {
    if (!href || href === '#') return

    // Skip external links
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')) return

    // Normalize: handle '#slug' and '/slug'
    let slug = href
    if (slug.startsWith('#')) slug = '/' + slug.slice(1)
    if (!slug.startsWith('/')) slug = '/' + slug

    // Match against siteConfig pages
    const pages = siteConfig?.pages
    if (!pages) return

    const normalize = (s: string) => s.startsWith('/') ? s : '/' + s

    // 1. Exact match
    let matchedPage = pages.find(p => normalize(p.slug) === slug)

    // 2. Prefix fallback: /property/xxx → /property
    if (!matchedPage && slug.includes('/')) {
      const parentSlug = slug.substring(0, slug.lastIndexOf('/')) || '/'
      matchedPage = pages.find(p => normalize(p.slug) === parentSlug)
    }

    if (matchedPage) {
      selectPage(matchedPage.id)
      // Scroll to top — target the overflow-auto viewport, not #site-canvas
      requestAnimationFrame(() => {
        const canvasEl = document.getElementById('site-canvas')
        if (!canvasEl) return
        // Walk up to find the scrollable parent (overflow-auto)
        let scroller: HTMLElement | null = canvasEl.parentElement
        while (scroller) {
          const ov = getComputedStyle(scroller).overflowY
          if (ov === 'auto' || ov === 'scroll') break
          scroller = scroller.parentElement
        }
        if (scroller) scroller.scrollTo({ top: 0, behavior: 'instant' })
      })
    }
  }, [siteConfig?.pages, selectPage])

  // ─── Internal link navigation (both editor & preview) ───
  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    // Walk up from the click target to find an <a> tag (event delegation)
    let target = e.target as HTMLElement | null
    while (target && target.tagName !== 'A') {
      target = target.parentElement
    }
    if (!target) return
    const anchor = target as HTMLAnchorElement
    const href = anchor.getAttribute('href')
    if (!href || href === '#') return

    // Skip external links
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')) return

    // Always prevent default for internal links (avoid 404)
    e.preventDefault()

    // Navigate to internal page (both edit and preview mode)
    navigateToSlug(href)
  }, [navigateToSlug])

  // ─── Global click interceptor for fixed/portal overlays (menus, modals) ───
  // Only intercepts links inside elements that are rendered by canvas sections
  // (e.g., position:fixed overlays from ZMR header menu) — NOT editor UI links
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      // Walk up to find <a> tag
      let target = e.target as HTMLElement | null
      while (target && target.tagName !== 'A') {
        target = target.parentElement
      }
      if (!target) return
      const anchor = target as HTMLAnchorElement
      const href = anchor.getAttribute('href')
      if (!href || href === '#') return
      if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')) return

      const canvas = document.getElementById('site-canvas')
      if (canvas?.contains(target)) return // already handled by handleCanvasClick

      // Only intercept if the link is inside a section overlay (data attribute marker)
      // or inside an element that was rendered by a canvas section (position:fixed overlays).
      // Skip all links that are part of the editor UI (header, sidebar, panels).
      const editorUI = (target as HTMLElement).closest('[data-editor-ui]') || (target as HTMLElement).closest('header.bg-\\[\\#1e1e1e\\]') || (target as HTMLElement).closest('[class*="sidebar"]')
      if (editorUI) return // Don't intercept editor UI links

      // Check if the link is inside a canvas-rendered overlay (fixed menus from sections)
      // These are outside #site-canvas in the DOM but rendered by section components
      const isCanvasOverlay = (target as HTMLElement).closest('[class*="fixed"][class*="inset-0"]')
      if (!isCanvasOverlay) return // Not a canvas overlay — let it navigate normally

      e.preventDefault()
      // Don't stopPropagation — let onClick handlers (e.g. menu close) still fire
      navigateToSlug(href)
    }

    document.addEventListener('click', handler, true) // capture phase
    return () => document.removeEventListener('click', handler, true)
  }, [navigateToSlug])

  // ─── Scroll to top when page changes (PagesPanel, link navigation, etc.) ───
  useEffect(() => {
    if (!selectedPageId) return
    requestAnimationFrame(() => {
      const canvasEl = document.getElementById('site-canvas')
      if (!canvasEl) return
      let scroller: HTMLElement | null = canvasEl.parentElement
      while (scroller) {
        const ov = getComputedStyle(scroller).overflowY
        if (ov === 'auto' || ov === 'scroll') break
        scroller = scroller.parentElement
      }
      if (scroller) scroller.scrollTo({ top: 0, behavior: 'instant' })
    })
  }, [selectedPageId])

  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas-drop-zone',
    data: { type: 'canvas' },
  })

  // Breadcrumb data
  const section = currentPage?.sections.find(s => s.id === selectedSectionId)
  let elementLabel: string | null = null
  if (selectedElementPath && section) {
    elementLabel = resolveElementLabel(selectedElementPath, section)
  }

  const zoomPercent = Math.round(canvasZoom * 100)

  return (
    <main
      className="flex-1 min-h-0 bg-[#404040] overflow-hidden flex flex-col canvas-scroll"
      onClick={() => { if (!previewMode) { selectSection(null); selectElement(null); clearSelection() } }}
      style={{ cursor: isPanning ? 'grabbing' : undefined }}
    >
      {/* SVG filters for vision accessibility simulation */}
      <VisionFiltersSVG />

      {/* ─── Component Editor Banner ─── */}
      <ComponentEditorBanner />

      {/* ─── Breadcrumb bar ─── */}
      {!previewMode && !editingComponentId && (
        <div className="h-9 flex items-center px-3 gap-1.5 bg-[#363636] border-b border-[#2a2a2a] shrink-0">
          {/* Left: Undo/Redo + breadcrumb */}
          <div className="flex items-center gap-1 flex-1 min-w-0">
            <button
              onClick={(e) => { e.stopPropagation(); undo() }}
              disabled={!canUndo}
              title="Undo (⌘Z)"
              className="w-6 h-6 flex items-center justify-center rounded text-zinc-400 hover:text-white hover:bg-[#303030] disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); redo() }}
              disabled={!canRedo}
              title="Redo (⌘⇧Z)"
              className="w-6 h-6 flex items-center justify-center rounded text-zinc-400 hover:text-white hover:bg-[#303030] disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              <Redo2 className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-zinc-700/50 mx-1.5" />
            {!section ? (
              <span className="text-xs text-zinc-400">No element selected</span>
            ) : (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); selectSection(null); selectElement(null) }}
                  className="text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  Body
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                <button
                  onClick={(e) => { e.stopPropagation(); selectSection(section.id); selectElement(null) }}
                  className={cn(
                    'text-xs transition-colors truncate max-w-40',
                    !selectedElementPath ? 'text-white font-medium' : 'text-zinc-300 hover:text-white'
                  )}
                >
                  {getSectionLabel(section)}
                </button>
                {elementLabel && (
                  <>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                    <span className="text-xs text-white font-medium truncate max-w-40">
                      {elementLabel}
                    </span>
                  </>
                )}
              </>
            )}
          </div>

          {/* Center: Canvas tools (zoom, grid, rulers, snap) */}
          <div className="flex items-center gap-0.5 shrink-0">
            <button
              onClick={(e) => { e.stopPropagation(); zoomOut() }}
              title="Zoom Out"
              className="w-6 h-6 flex items-center justify-center rounded text-zinc-400 hover:text-white hover:bg-[#303030] transition-colors"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); zoomTo100() }}
              title="Reset Zoom"
              className="h-6 px-1.5 rounded text-zinc-300 hover:text-white hover:bg-[#303030] transition-colors"
            >
              <span className="text-[10px] font-mono">{zoomPercent}%</span>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); zoomIn() }}
              title="Zoom In"
              className="w-6 h-6 flex items-center justify-center rounded text-zinc-400 hover:text-white hover:bg-[#303030] transition-colors"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <div className="w-px h-4 bg-zinc-700/50 mx-1" />
            <button
              onClick={(e) => { e.stopPropagation(); toggleRulers() }}
              title="Toggle Rulers (R)"
              className={cn(
                'w-6 h-6 flex items-center justify-center rounded transition-colors',
                showRulers ? 'bg-[#303030] text-white' : 'text-zinc-500 hover:text-zinc-200 hover:bg-[#303030]/50'
              )}
            >
              <Ruler className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); toggleGrid() }}
              title="Toggle Grid"
              className={cn(
                'w-6 h-6 flex items-center justify-center rounded transition-colors',
                showGrid ? 'bg-[#303030] text-white' : 'text-zinc-500 hover:text-zinc-200 hover:bg-[#303030]/50'
              )}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); toggleColumns() }}
              title="Toggle Columns"
              className={cn(
                'w-6 h-6 flex items-center justify-center rounded transition-colors',
                showColumns ? 'bg-[#303030] text-white' : 'text-zinc-500 hover:text-zinc-200 hover:bg-[#303030]/50'
              )}
            >
              <Columns3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); toggleSnap() }}
              title="Toggle Snap"
              className={cn(
                'w-6 h-6 flex items-center justify-center rounded transition-colors',
                snapEnabled ? 'bg-[#303030] text-white' : 'text-zinc-500 hover:text-zinc-200 hover:bg-[#303030]/50'
              )}
            >
              <Magnet className="w-3.5 h-3.5" />
            </button>
            <div className="w-px h-4 bg-zinc-700/50 mx-1" />
          </div>

          {/* Right: width dropdown + breakpoint device icons */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Width dropdown — opens canvas settings popover */}
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setCanvasSettingsOpen(!canvasSettingsOpen) }}
                className={cn(
                  'h-6 px-2 rounded flex items-center gap-1 transition-colors',
                  canvasSettingsOpen ? 'bg-[#555] text-white' : 'bg-[#303030] hover:bg-[#555] text-zinc-200'
                )}
              >
                <span className="text-xs font-mono">{currentWidth}px</span>
                <ChevronDown className="w-3 h-3 text-zinc-400" />
              </button>
              {canvasSettingsOpen && (
                <CanvasSettingsPopover
                  currentWidth={currentWidth}
                  onWidthChange={(w) => setCustomWidth(w)}
                  canvasZoom={canvasZoom}
                  onZoomChange={setCanvasZoom}
                  visionFilter={visionFilter}
                  onVisionFilterChange={setVisionFilter}
                  textZoom={textZoom}
                  onTextZoomChange={setTextZoom}
                  onClose={() => setCanvasSettingsOpen(false)}
                />
              )}
            </div>
            <div className="w-px h-4 bg-zinc-700/50 mx-0.5" />
            {PRIMARY_BREAKPOINTS.map(bpDef => (
              <BreakpointIcon
                key={bpDef.id}
                bp={bpDef}
                active={activeBreakpoint === bpDef.id}
                onClick={() => setActiveBreakpoint(bpDef.id)}
              />
            ))}
            {/* More dropdown for secondary breakpoints */}
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setMoreOpen(!moreOpen) }}
                className={cn(
                  'w-6 h-6 flex items-center justify-center rounded transition-colors',
                  SECONDARY_BREAKPOINTS.some(b => b.id === activeBreakpoint)
                    ? 'bg-[#303030] text-white'
                    : 'text-zinc-500 hover:text-zinc-200 hover:bg-[#303030]/50'
                )}
                title="More breakpoints"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
              {moreOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={(e) => { e.stopPropagation(); setMoreOpen(false) }} />
                  <div className="absolute top-full right-0 mt-1 bg-[#2d2d2d] border border-[#4a4a4a] rounded-lg shadow-xl z-50 py-1 min-w-[180px]">
                    {SECONDARY_BREAKPOINTS.map(bpDef => {
                      const Icon = ICON_MAP[bpDef.icon] ?? Monitor
                      return (
                        <button
                          key={bpDef.id}
                          onClick={(e) => { e.stopPropagation(); setActiveBreakpoint(bpDef.id); setMoreOpen(false) }}
                          className={cn(
                            'w-full px-3 py-2 flex items-center gap-2.5 text-xs transition-colors',
                            activeBreakpoint === bpDef.id
                              ? 'text-white bg-[#303030]'
                              : 'text-zinc-300 hover:text-white hover:bg-[#303030]/60'
                          )}
                        >
                          <Icon className="w-4 h-4" />
                          {bpDef.label}
                          <span className="text-zinc-500 ml-auto">{bpDef.width}px</span>
                        </button>
                      )
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── Canvas area with rulers ─── */}
      <div
        ref={canvasContainerRef}
        className={cn('flex-1 flex flex-col relative overflow-hidden')}
        onMouseMove={handleCanvasMouseMove}
        onMouseDown={handlePanStart}
      >
        {/* Rulers */}
        {showRulers && !previewMode && (
          <CanvasRulers zoom={canvasZoom} offset={canvasOffset} cursorPos={cursorPos} />
        )}

        {/* Scrollable + zoomable viewport */}
        <div
          className={cn('flex-1 overflow-auto relative', showRulers && !previewMode ? 'ml-5 mt-5' : '')}
          style={{ cursor: isPanning ? 'grabbing' : undefined }}
        >
          <div
            style={{
              // In preview mode at zoom 1, skip transform entirely so CSS
              // background-attachment:fixed and position:fixed work correctly
              ...(previewMode && canvasZoom === 1 && canvasOffset.x === 0 && canvasOffset.y === 0
                ? {}
                : {
                    transform: `scale(${canvasZoom}) translate(${canvasOffset.x / canvasZoom}px, ${canvasOffset.y / canvasZoom}px)`,
                    transformOrigin: '0 0',
                    width: canvasZoom !== 1 ? `${100 / canvasZoom}%` : undefined,
                  }),
            }}
          >
            <div className={cn(
              'relative',
              isFullWidth ? 'flex flex-col' : 'flex justify-center',
            )}>
              <div className={cn('relative', isFullWidth ? 'flex-1 flex flex-col' : 'flex-1 flex items-stretch justify-center')}>
                {/* Vertical breakpoint label (non-desktop only) — attached to canvas left edge */}
                {!isBase && !previewMode && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full z-20 pointer-events-none">
                    <div
                      className="bg-[#2d2d2d] text-white text-[11px] font-medium px-2 py-4 rounded-l flex flex-col items-center gap-2 select-none"
                      style={{ writingMode: 'vertical-lr' }}
                    >
                      <span className="font-semibold tracking-wider text-xs">{bp?.shortLabel ?? activeBreakpoint}</span>
                      {affectsLabel && (
                        <span className="text-zinc-400 text-[10px]">{affectsLabel}</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Editor-only styles: make overlays non-interactive so elements beneath are selectable */}
                {!previewMode && (
                  <style dangerouslySetInnerHTML={{ __html: `
                    #site-canvas [class*="bg-gradient"]:not([data-element-id]),
                    #site-canvas [class*="from-black"]:not([data-element-id]),
                    #site-canvas [class*="from-zinc"]:not([data-element-id]),
                    #site-canvas [class*="from-slate"]:not([data-element-id]),
                    #site-canvas [class*="to-transparent"]:not([data-element-id]) { pointer-events: none; }
                  `}} />
                )}
                {/* Canvas */}
                <div
                  id="site-canvas"
                  ref={setNodeRef}
                  onClickCapture={handleCanvasClick}
                  className={cn(
                    'relative',
                    // In preview mode, remove overflow-hidden so background-attachment:fixed works
                    !previewMode && 'overflow-hidden',
                    isFullWidth
                      ? 'flex-1 border-x border-dashed border-zinc-300'
                      : 'flex-1 shadow-lg border border-zinc-600/30',
                    !isResizing && !isFullWidth && 'transition-all duration-300',
                    isOver && isDragging && !previewMode && 'ring-2 ring-wf-blue ring-offset-2 ring-offset-[#404040]'
                  )}
                  {...(activeState && !activeState.startsWith('::') ? { 'data-force-state': activeState } : {})}
                  style={{
                    backgroundColor: 'var(--color-background, #ffffff)',
                    ...(isFullWidth ? {} : {
                      width: `${currentWidth}px`,
                      maxWidth: `${currentWidth}px`,
                      margin: '0 auto',
                    }),
                    ...(visionFilter && visionFilter !== 'none' ? { filter: VISION_FILTERS[visionFilter] } : {}),
                    ...(textZoom ? { fontSize: `${textZoom}px` } : {}),
                  }}
                >
                  {/* Grid / Columns overlay */}
                  {!previewMode && <CanvasGridOverlay />}
                  {/* Guides overlay */}
                  {!previewMode && <CanvasGuides zoom={canvasZoom} />}
                  {/* Smart guides overlay */}
                  {!previewMode && <SmartGuidesOverlay />}
                  {!previewMode && <ElementSelectionOverlay />}
                  <SortableContext items={sectionIds} strategy={verticalListSortingStrategy}>
                    {editingComponent ? (
                      /* Component editor: render only the master snapshot */
                      <SortableSectionWrapper
                        key={editingComponent.sectionSnapshot.id}
                        section={editingComponent.sectionSnapshot}
                        pageId="__component-editor__"
                      />
                    ) : !currentPage || currentPage.sections.length === 0 ? (
                      <div className={cn(
                        'h-full min-h-[400px] flex flex-col items-center justify-center gap-2 transition-colors',
                        isOver && isDragging ? 'bg-wf-blue/5' : ''
                      )}>
                        <button
                          onClick={(e) => { e.stopPropagation(); setAddLayoutOpen(true) }}
                          className={cn(
                            'px-5 py-2.5 rounded-lg text-sm font-medium transition-all',
                            isOver && isDragging
                              ? 'bg-wf-blue/15 text-wf-blue'
                              : 'bg-blue-50 text-wf-blue hover:bg-blue-100'
                          )}
                        >
                          {isOver && isDragging ? 'Drop here' : '+  Add a layout'}
                        </button>
                      </div>
                    ) : (
                      <>
                        {currentPage.sections.map((s) => (
                          <SortableSectionWrapper
                            key={s.id}
                            section={s}
                            pageId={currentPage.id}
                          />
                        ))}
                        {isDragging && !previewMode && (
                          <div className={cn(
                            'h-16 flex items-center justify-center border-2 border-dashed transition-colors mx-4 my-2 rounded-lg',
                            isOver ? 'border-wf-blue bg-wf-blue/5' : 'border-zinc-200'
                          )}>
                            <span className="text-xs text-zinc-400">Drop here</span>
                          </div>
                        )}
                      </>
                    )}
                  </SortableContext>
                </div>

                {/* Right drag handle (non full-width) */}
                {!previewMode && !isFullWidth && (
                  <div
                    onMouseDown={handleResizeStart}
                    className={cn(
                      'w-3 flex items-center justify-center cursor-ew-resize group shrink-0 select-none z-10',
                      isResizing && 'bg-wf-blue/10'
                    )}
                    title="Drag to resize"
                  >
                    <div className={cn(
                      'w-1 h-16 rounded-full transition-colors',
                      isResizing ? 'bg-wf-blue' : 'bg-zinc-600 group-hover:bg-zinc-400'
                    )} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {addLayoutOpen && <AddLayoutModal onClose={() => setAddLayoutOpen(false)} />}
    </main>
  )
}
