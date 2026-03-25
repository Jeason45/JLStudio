'use client'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useEditorStore } from '@/store/editorStore'
import type { SectionConfig } from '@/types/site'
import { cn } from '@/lib/utils'
import { GripVertical, Trash2, EyeOff, Eye, ChevronUp, ChevronDown, Settings } from 'lucide-react'
import { getSectionComponent } from '@/components/sections'
import { CustomElementRenderer, SortableElementList, SortableElement } from '@/components/sections/custom/CustomSection'
import { SectionDivider } from '@/components/sections/SectionDivider'
import { applySectionOverrides, getPaddingTopClass, getPaddingBottomClass, getSectionBgStyle, getSectionBgClass } from '@/components/sections/_utils'
import { AnimationController } from './animations/AnimationController'
import { VideoBackgroundLayer } from './VideoBackgroundLayer'
import { FloatingIllustration } from '@/components/sections/_DecorativeOrnament'
import type { AnimationConfig } from '@/types/interactions'
import { resolveInstanceContent } from '@/lib/componentResolver'
import { Component, useMemo, type ReactNode } from 'react'

class SectionErrorBoundary extends Component<{ children: ReactNode; sectionId: string; sectionType: string }, { error: Error | null }> {
  state: { error: Error | null } = { error: null }
  static getDerivedStateFromError(error: Error) { return { error } }
  componentDidCatch(error: Error) { console.error(`[SectionError] ${this.props.sectionType} (${this.props.sectionId}):`, error) }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '24px', background: '#1c1917', border: '2px solid #dc2626', borderRadius: '8px', margin: '8px', color: '#fca5a5', fontSize: '13px' }}>
          <strong style={{ color: '#f87171' }}>Section crash: {this.props.sectionType}</strong>
          <pre style={{ marginTop: '8px', fontSize: '11px', color: '#a8a29e', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{this.state.error.message}</pre>
        </div>
      )
    }
    return this.props.children
  }
}

function getSectionDisplayLabel(section: SectionConfig): string {
  if (section.type === 'site-header') return 'Navbar'
  if (section.type === 'site-footer') return 'Footer'
  if (section.type === 'custom') return 'Custom Section'
  const label = section.content?.__label
  if (typeof label === 'string' && label.trim()) return label.trim()
  const title = section.content?.title
  if (typeof title === 'string' && title.trim()) {
    return title.trim().length > 20 ? title.trim().slice(0, 20) + '…' : title.trim()
  }
  return section.type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

interface SortableSectionWrapperProps {
  section: SectionConfig
  pageId: string
}

export function SortableSectionWrapper({ section, pageId }: SortableSectionWrapperProps) {
  const { selectedSectionId, selectSection, removeSection, updateSection, previewMode } = useEditorStore()
  const isSelected = !previewMode && section.id === selectedSectionId

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: section.id,
    data: {
      type: 'section',
      sectionType: section.type,
      section,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  const siteConfig = useEditorStore(s => s.siteConfig)
  const SectionComponent = getSectionComponent(section.type)
  const overrides = applySectionOverrides(section.style)

  // Resolve component instance content (prop/variant/slot overrides)
  const resolvedSection = useMemo(() => {
    const instance = section.__componentInstance
    if (!instance || instance.isUnlinked) return section
    const comp = siteConfig?.components?.find(c => c.id === instance.componentId)
    if (!comp) return section
    return { ...section, content: resolveInstanceContent(section, comp) }
  }, [section, siteConfig?.components])

  // Determine if we need to override the child section's hardcoded styles
  const hasCustomBg = section.style.background === 'custom' || section.style.background === 'custom-gradient'
  const hasStandardBgOverride = !hasCustomBg && section.style.background !== 'white'
  const hasBgOverride = hasCustomBg || hasStandardBgOverride
  const hasBgImage = !!section.style.backgroundImage?.url
  const hasPaddingOverride = !!section.style.paddingTop || !!section.style.paddingBottom
  const hasFontOverride = !!section.style.fontFamily
  const hasTextColor = !!section.style.textColor
  const hasAccentColor = !!section.style.accentColor

  const handleClick = (e: React.MouseEvent) => {
    if (previewMode) return
    // Skip locked sections
    if (useEditorStore.getState().lockedElements.has(section.id)) return
    e.stopPropagation()
    selectSection(section.id)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedSectionId === section.id) selectSection(null)
    removeSection(pageId, section.id)
  }

  const handleToggleVisibility = (e: React.MouseEvent) => {
    e.stopPropagation()
    updateSection(section.id, { visible: !section.visible })
  }

  const currentPage = useEditorStore.getState().siteConfig?.pages.find(p => p.id === pageId)
  const sectionIndex = currentPage?.sections.findIndex(s => s.id === section.id) ?? -1
  const totalSections = currentPage?.sections.length ?? 0

  const handleMoveUp = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (sectionIndex > 0) {
      useEditorStore.getState().moveSection(pageId, sectionIndex, sectionIndex - 1)
    }
  }

  const handleMoveDown = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (sectionIndex < totalSections - 1) {
      useEditorStore.getState().moveSection(pageId, sectionIndex, sectionIndex + 1)
    }
  }

  // In preview mode, brixsa CTA needs higher z-index and brixsa footer needs sticky bottom
  // so the CTA image scrolls away revealing the footer behind it
  const isBrixsaCta = previewMode && section.type === 'cta' && section.variant?.includes('brixsa')
  const isBrixsaFooter = previewMode && section.type === 'site-footer' && section.variant?.includes('brixsa')
  // JL Studio hero uses position:sticky for scroll-pinned zoom animation — overflow-hidden breaks it
  const isJlstudioHero = section.type === 'hero' && section.variant === 'jlstudio'
  // Parallax slider variants use background-attachment:fixed which breaks under overflow-hidden
  const isParallaxSlider = section.type === 'slider' && (section.variant?.includes('parallax') || section.variant?.includes('process'))
  // JL Studio process uses position:sticky for the Brixsa-style scrolling bg effect
  const isJlstudioProcess = previewMode && section.type === 'steps' && section.variant === 'jlstudio-process'
  // JL Studio portfolio uses position:sticky for parallax text-over-image effect
  const isJlstudioPortfolio = previewMode && section.type === 'gallery-grid' && section.variant?.includes('jlstudio-portfolio')
  // Transparent headers (luxe-transparent, brixsa) need zero-height wrapper so they overlay the next section
  const isTransparentHeader = section.type === 'site-header' && (
    section.variant?.includes('transparent') || section.variant === 'brixsa' || section.variant === 'zmr-agency'
  )

  return (
    <div
      ref={setNodeRef}
      data-section-id={section.id}
      style={{
        ...style,
        ...overrides.style,
        // Override CSS variables so child sections inherit them
        ...(hasFontOverride ? { '--font-body': section.style.fontFamily } as React.CSSProperties : {}),
        ...(hasTextColor ? { '--color-foreground': section.style.textColor, color: section.style.textColor } as React.CSSProperties : {}),
        ...(hasAccentColor ? { '--color-primary': section.style.accentColor } as React.CSSProperties : {}),
        // Brixsa footer reveal: CTA wrapper has high z-index, footer sticks at bottom behind it
        ...(isBrixsaCta ? { zIndex: 2 } : {}),
        ...(isBrixsaFooter ? { position: 'sticky' as const, bottom: 0, zIndex: 0 } : {}),
        // Transparent header: zero height so it overlays the hero below
        ...(isTransparentHeader ? { height: 0, overflow: 'visible', zIndex: 50 } : {}),
      }}
      onClick={handleClick}
      className={cn(
        'relative group transition-all',
        !isTransparentHeader && !isBrixsaCta && !isJlstudioHero && !isParallaxSlider && !isJlstudioProcess && !isJlstudioPortfolio && 'overflow-hidden',
        overrides.className,
        !section.visible && 'opacity-40',
        !previewMode && !isSelected && 'hover:outline hover:outline-1 hover:outline-wf-blue/30 hover:outline-offset-[-1px]',
        isSelected && 'outline outline-[1.5px] outline-wf-blue outline-offset-[-1.5px]',
        isDragging && 'z-50'
      )}
    >
      {/* Toolbar */}
      <div className={cn(
        'absolute top-2 right-2 z-20 flex items-center gap-0.5 bg-wf-blue rounded-lg p-1 transition-opacity shadow-lg',
        previewMode ? 'hidden' : isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      )}>
        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          className="p-1 hover:bg-wf-blue-hover rounded text-white cursor-grab active:cursor-grabbing"
          title="Deplacer"
          onClick={e => e.stopPropagation()}
        >
          <GripVertical className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-3 bg-wf-blue/60 mx-0.5" />

        {/* Move up */}
        <button
          onClick={handleMoveUp}
          disabled={sectionIndex === 0}
          className="p-1 hover:bg-wf-blue-hover rounded text-white disabled:opacity-30"
          title="Monter"
        >
          <ChevronUp className="w-3 h-3" />
        </button>

        {/* Move down */}
        <button
          onClick={handleMoveDown}
          disabled={sectionIndex === totalSections - 1}
          className="p-1 hover:bg-wf-blue-hover rounded text-white disabled:opacity-30"
          title="Descendre"
        >
          <ChevronDown className="w-3 h-3" />
        </button>

        <div className="w-px h-3 bg-wf-blue/60 mx-0.5" />

        {/* Visibility */}
        <button
          onClick={handleToggleVisibility}
          className="p-1 hover:bg-wf-blue-hover rounded text-white"
          title={section.visible ? 'Masquer' : 'Afficher'}
        >
          {section.visible ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
        </button>

        {/* Delete */}
        <button
          onClick={handleDelete}
          className="p-1 hover:bg-red-500 rounded text-white transition-colors"
          title="Supprimer"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>

      {/* Label */}
      <div className={cn(
        'absolute top-2 left-2 z-20 flex items-center gap-1 transition-opacity',
        previewMode ? 'hidden' : isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      )}>
        <span className="bg-wf-blue text-white text-[10px] px-2 py-1 rounded font-medium">
          {getSectionDisplayLabel(section)}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); selectSection(section.id) }}
          className="bg-emerald-500 hover:bg-emerald-600 text-white p-1 rounded transition-colors"
          title="Settings"
        >
          <Settings className="w-3 h-3" />
        </button>
      </div>

      {/* Background image overlay */}
      {section.style.backgroundImage?.url && (
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${section.style.backgroundImage.url})`,
              backgroundSize: section.style.backgroundImage.size ?? 'cover',
              backgroundPosition: section.style.backgroundImage.position ?? 'center',
              backgroundAttachment: section.style.backgroundImage.attachment ?? 'scroll',
            }}
          />
          {section.style.backgroundImage.overlayColor && (
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: section.style.backgroundImage.overlayColor,
                opacity: (section.style.backgroundImage.overlayOpacity ?? 50) / 100,
              }}
            />
          )}
        </div>
      )}

      {/* Video background */}
      {section.style.videoBackground?.url && (
        <VideoBackgroundLayer
          url={section.style.videoBackground.url}
          poster={section.style.videoBackground.poster}
          loop={section.style.videoBackground.loop}
          muted={section.style.videoBackground.muted}
        />
      )}

      {/* Divider top */}
      <SectionDivider config={section.style.dividerTop} position="top" />

      {/* Floating illustrations — rendered outside the content wrapper so they aren't covered by its zIndex/bg */}
      {(section.content as any)?.floatingImages?.map((fi: any, idx: number) => (
        <FloatingIllustration key={`fi-${idx}`} src={fi.src} position={fi.position} size={fi.size} opacity={fi.opacity} />
      ))}

      {/* Content */}
      <div
        className={cn(
          'relative',
          // When bg is overridden or bg image is active, make child element transparent so our wrapper bg shows through
          !isTransparentHeader && (hasBgOverride || hasBgImage) && '[&>section]:!bg-transparent [&>section]:!bg-none [&>footer]:!bg-transparent [&>footer]:!bg-none [&>header]:!bg-transparent [&>header]:!bg-none',
          // Apply standard bg class on this wrapper (light, dark, primary, gradient) — skip for transparent headers and when bg image is present
          !isTransparentHeader && !hasBgImage && hasStandardBgOverride && getSectionBgClass(section.style.background),
          // When padding overrides are set, zero out child section padding and apply ours
          hasPaddingOverride && '[&>section]:!py-0 [&>section]:!pt-0 [&>section]:!pb-0',
          hasPaddingOverride && section.style.paddingTop && getPaddingTopClass(section.style.paddingTop),
          hasPaddingOverride && section.style.paddingBottom && getPaddingBottomClass(section.style.paddingBottom),
        )}
        style={{
          zIndex: 2,
          // Apply custom bg inline styles (custom color or custom gradient) — skip for transparent headers and when bg image is present
          ...(!isTransparentHeader && !hasBgImage && hasCustomBg ? getSectionBgStyle(section.style) : {}),
          // Transparent headers: ensure no background leaks through
          ...(isTransparentHeader ? { backgroundColor: 'transparent' } : {}),
        }}
      >
        <SectionErrorBoundary sectionId={section.id} sectionType={`${section.type}/${section.variant ?? 'default'}`}>
          {SectionComponent ? (
            <SectionComponent config={resolvedSection} isEditing={!previewMode} />
          ) : (
            <PlaceholderSection section={section} />
          )}
        </SectionErrorBoundary>
        {section.type !== 'custom' && (section.elements?.length ?? 0) > 0 && !previewMode && (
          <div className="relative">
            <SortableElementList elements={section.elements!} sectionId={section.id} parentId={null}>
              {(el) => <SortableElement key={el.id} element={el} sectionId={section.id} />}
            </SortableElementList>
          </div>
        )}
        {section.type !== 'custom' && (section.elements?.length ?? 0) > 0 && previewMode && (
          <div className="relative">
            {section.elements!.map(el => (
              <CustomElementRenderer key={el.id} element={el} sectionId={section.id} />
            ))}
          </div>
        )}
        <AnimationController
          sectionId={section.id}
          interactions={(section.content.__interactions ?? {}) as Record<string, AnimationConfig[]>}
          disabled={false}
        />
      </div>

      {/* Divider bottom */}
      <SectionDivider config={section.style.dividerBottom} position="bottom" />

    </div>
  )
}

function PlaceholderSection({ section }: { section: SectionConfig }) {
  const bg: Record<string, string> = {
    white: 'bg-white',
    light: 'bg-zinc-50',
    dark: 'bg-zinc-900',
    primary: 'bg-wf-blue',
    gradient: 'bg-gradient-to-br from-wf-blue to-purple-700',
    custom: '',
    'custom-gradient': '',
  }
  const bgClass = bg[section.style.background] ?? 'bg-white'

  const py = {
    none: 'py-0', sm: 'py-8', md: 'py-12', lg: 'py-20', xl: 'py-32',
  }[section.style.paddingY] ?? 'py-16'

  const isDark = ['dark', 'primary', 'gradient', 'custom-gradient'].includes(section.style.background)

  return (
    <div className={cn('flex items-center justify-center', bgClass, py)}>
      <div className="text-center">
        <p className={cn('text-sm font-medium capitalize', isDark ? 'text-white/60' : 'text-zinc-400')}>
          Section <span className="font-bold">{section.type}</span>
        </p>
        <p className={cn('text-xs mt-1', isDark ? 'text-white/30' : 'text-zinc-300')}>
          Cliquez pour configurer
        </p>
      </div>
    </div>
  )
}
