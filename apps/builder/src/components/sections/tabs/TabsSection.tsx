'use client'
import { useState, useCallback, useRef, type KeyboardEvent } from 'react'
import { cn } from '@/lib/utils'
import type { SectionConfig } from '@/types/site'
import type { TabsContent, TabItem } from '@/types/sections'
import { elementProps } from '@/lib/elementHelpers'
import { componentTriggerBus } from '@/lib/animations/componentTriggerBridge'
import type { SectionMeta } from '@/components/sections'
import { EditablePlaceholder } from '@/components/sections/_EditablePlaceholder'
import { BrixsaViewCursor } from '@/components/sections/_BrixsaViewCursor'

// ═══════════════════════════════════════════════════
// Universe configs
// ═══════════════════════════════════════════════════

const UNIVERSE_CONFIGS = {
  startup: {
    bg: 'bg-white', text: 'text-zinc-900', sub: 'text-zinc-500', eyebrow: 'text-indigo-600',
    tabBg: 'bg-zinc-100', tabActive: 'bg-indigo-600 text-white', tabInactive: 'text-zinc-600 hover:text-zinc-900',
    contentBg: 'bg-zinc-50', accent: '#6366f1', border: 'border-zinc-200',
  },
  corporate: {
    bg: 'bg-slate-900', text: 'text-white', sub: 'text-slate-400', eyebrow: 'text-blue-400',
    tabBg: 'bg-slate-800', tabActive: 'bg-blue-600 text-white', tabInactive: 'text-slate-400 hover:text-white',
    contentBg: 'bg-slate-800/50', accent: '#3b82f6', border: 'border-slate-700',
  },
  luxe: {
    bg: 'bg-white', text: 'text-zinc-800', sub: 'text-zinc-500', eyebrow: 'text-amber-700',
    tabBg: 'bg-transparent', tabActive: 'border-b-2 border-amber-600 text-zinc-900', tabInactive: 'text-zinc-500 hover:text-zinc-800 border-b-2 border-transparent',
    contentBg: 'bg-zinc-50/50', accent: '#b45309', border: 'border-zinc-200',
  },
  creative: {
    bg: 'bg-amber-50', text: 'text-zinc-900', sub: 'text-zinc-600', eyebrow: 'text-zinc-900',
    tabBg: 'bg-transparent', tabActive: 'bg-yellow-300 border-2 border-zinc-900 text-zinc-900 font-black', tabInactive: 'border-2 border-zinc-900 text-zinc-900 hover:bg-yellow-100',
    contentBg: 'bg-white border-2 border-zinc-900', accent: '#eab308', border: 'border-zinc-900',
  },
  ecommerce: {
    bg: 'bg-white', text: 'text-zinc-900', sub: 'text-zinc-500', eyebrow: 'text-emerald-600',
    tabBg: 'bg-zinc-100', tabActive: 'bg-emerald-600 text-white rounded-full', tabInactive: 'text-zinc-600 hover:text-zinc-900 rounded-full',
    contentBg: 'bg-emerald-50/30', accent: '#059669', border: 'border-zinc-200',
  },
  glass: {
    bg: 'bg-zinc-950', text: 'text-white', sub: 'text-zinc-400', eyebrow: 'text-purple-400',
    tabBg: 'bg-white/5 backdrop-blur-sm', tabActive: 'bg-white/15 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]', tabInactive: 'text-zinc-400 hover:text-white',
    contentBg: 'bg-white/5 backdrop-blur-md border border-white/10', accent: '#a855f7', border: 'border-white/10',
  },
  brixsa: {
    bg: 'bg-zinc-900', text: 'text-white', sub: 'text-white/60', eyebrow: 'text-white',
    tabBg: 'bg-transparent', tabActive: 'text-white opacity-100', tabInactive: 'text-white/40 hover:text-white/70',
    contentBg: 'bg-transparent', accent: 'var(--color-primary, #4a2711)', border: 'border-white/10',
  },
} as const

type Universe = keyof typeof UNIVERSE_CONFIGS

function parseVariant(variant: string): { universe: Universe; orientation: 'horizontal' | 'vertical' } {
  const parts = variant.split('-')
  const orientation = parts[parts.length - 1] === 'vertical' ? 'vertical' : 'horizontal'
  const universe = (parts.slice(0, -1).join('-') || 'startup') as Universe
  return { universe: universe in UNIVERSE_CONFIGS ? universe : 'startup', orientation }
}

// ═══════════════════════════════════════════════════
// Tab Item Component
// ═══════════════════════════════════════════════════

function TabButton({
  item, isActive, config, onClick, onKeyDown, tabRef, index, sectionId,
}: {
  item: TabItem; isActive: boolean; config: typeof UNIVERSE_CONFIGS[Universe]
  onClick: () => void; onKeyDown: (e: KeyboardEvent) => void; tabRef: (el: HTMLButtonElement | null) => void; index: number; sectionId: string
}) {
  return (
    <button
      ref={tabRef}
      role="tab"
      id={`tab-${item.id}`}
      aria-selected={isActive}
      aria-controls={`tabpanel-${item.id}`}
      tabIndex={isActive ? 0 : -1}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={cn(
        'px-4 py-2.5 text-sm font-medium transition-all duration-200 whitespace-nowrap',
        isActive ? config.tabActive : config.tabInactive,
      )}
    >
      <span {...elementProps(sectionId, `items.${index}.label`, 'text')}>{item.label}</span>
    </button>
  )
}

// ═══════════════════════════════════════════════════
// Brixsa constants
// ═══════════════════════════════════════════════════

const BRIXSA_DEFAULT_TABS: TabItem[] = [
  { id: 'brixsa-1', label: 'Smooth Closings', content: 'Our agents are committed to ensuring a seamless transaction process, offering personalized advice and expert negotiation skills.', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80' },
  { id: 'brixsa-2', label: 'Local Experts', content: 'Our agents possess an intimate understanding of local neighborhoods, offering insights and advice that are tailored to your specific needs.', image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&q=80' },
  { id: 'brixsa-3', label: 'Verified Listings', content: 'Our agents ensure that every listing is thoroughly vetted, providing you with the most reliable and accurate property information available.', image: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1200&q=80' },
  { id: 'brixsa-4', label: 'Support', content: 'With a commitment to excellence, our agents provide comprehensive support, guiding you through every step of the real estate process.', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80' },
]

const BRIXSA_DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80',
  'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&q=80',
  'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1200&q=80',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80',
]

const BRIXSA_IMAGE_GRADIENTS = [
  'linear-gradient(135deg, #2a1f1a 0%, #3d2b1f 50%, #1a1210 100%)',
  'linear-gradient(135deg, #1a2a1f 0%, #1f3d2b 50%, #121a14 100%)',
  'linear-gradient(135deg, #1a1f2a 0%, #1f2b3d 50%, #12141a 100%)',
  'linear-gradient(135deg, #2a1a2a 0%, #3d1f3d 50%, #1a121a 100%)',
]

// ═══════════════════════════════════════════════════
// Brixsa Tab Item (custom font + opacity style)
// ═══════════════════════════════════════════════════

function BrixsaTabButton({
  item, isActive, onClick, onMouseEnter, onKeyDown, tabRef, index, sectionId,
}: {
  item: TabItem; isActive: boolean
  onClick: () => void; onMouseEnter: () => void; onKeyDown: (e: KeyboardEvent) => void; tabRef: (el: HTMLButtonElement | null) => void; index: number; sectionId: string
}) {
  return (
    <button
      ref={tabRef}
      role="tab"
      id={`tab-${item.id}`}
      aria-selected={isActive}
      aria-controls={`tabpanel-${item.id}`}
      tabIndex={isActive ? 0 : -1}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onKeyDown={onKeyDown}
      className="cursor-pointer text-left"
      style={{
        fontFamily: '"GeneralSans Variable", sans-serif',
        fontSize: 'clamp(1.5rem, 1.0714rem + 1.9048vw, 2.5rem)',
        fontWeight: 500,
        lineHeight: '125%',
        color: 'var(--color-background, #e1e1e1)',
        opacity: isActive ? 1 : 0.4,
        transition: 'opacity 0.6s',
        paddingTop: '8px',
        paddingBottom: '8px',
      }}
    >
      <span {...elementProps(sectionId, `items.${index}.label`, 'text')}>{item.label}</span>
    </button>
  )
}

// ═══════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════

export function TabsSection({ config, isEditing }: { config: SectionConfig; isEditing?: boolean }) {
  const content = config.content as TabsContent
  const { universe, orientation: variantOrientation } = parseVariant(config.variant || 'startup-horizontal')
  const uConfig = UNIVERSE_CONFIGS[universe]
  const items = content.items ?? []
  const orientation = content.orientation ?? variantOrientation

  const [activeId, setActiveId] = useState(items[0]?.id ?? '')
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const emitTrigger = useCallback((tabId: string) => {
    componentTriggerBus.emit({ type: 'tab-change', sourceId: config.id, data: { tabId } })
  }, [config.id])

  const handleSelect = useCallback((id: string) => {
    setActiveId(id)
    emitTrigger(id)
  }, [emitTrigger])

  const handleKeyDown = useCallback((e: KeyboardEvent, currentIndex: number) => {
    const isHorizontal = orientation === 'horizontal'
    const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp'
    const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown'

    let newIndex = currentIndex
    if (e.key === nextKey) {
      e.preventDefault()
      newIndex = (currentIndex + 1) % items.length
    } else if (e.key === prevKey) {
      e.preventDefault()
      newIndex = (currentIndex - 1 + items.length) % items.length
    } else if (e.key === 'Home') {
      e.preventDefault()
      newIndex = 0
    } else if (e.key === 'End') {
      e.preventDefault()
      newIndex = items.length - 1
    } else {
      return
    }

    handleSelect(items[newIndex].id)
    tabRefs.current[newIndex]?.focus()
  }, [orientation, items, handleSelect])

  const isBrixsa = universe === 'brixsa'
  const isVertical = orientation === 'vertical'

  const activeItem = items.find(i => i.id === activeId) ?? items[0]

  if (items.length === 0 && !isBrixsa) return null

  const activeIndex = items.indexOf(activeItem)

  // ── Brixsa layout: 2-column grid, image crossfade + clickable tab list ──
  if (isBrixsa) {
    const brixsaItems = items.length > 0 ? items : BRIXSA_DEFAULT_TABS
    const brixsaActiveId = brixsaItems.find(i => i.id === activeId) ? activeId : brixsaItems[0]?.id ?? ''

    const imagePanel = (
      <BrixsaViewCursor className="relative overflow-hidden" style={{ width: '100%' }}>
        {brixsaItems.map((item, i) => {
          const isActive = item.id === brixsaActiveId
          // Always get image: from item.image, or fallback to defaults
          const imgSrc = item.image || BRIXSA_DEFAULT_IMAGES[i % BRIXSA_DEFAULT_IMAGES.length]

          return (
            <div
              key={item.id}
              className="absolute inset-0"
              style={{
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 1 : 0,
                transition: 'opacity 0.6s ease',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                {...elementProps(config.id, `items.${i}.image`, 'image')}
                src={imgSrc}
                alt={item.label}
                className="w-full h-full object-cover"
                style={{
                  transform: isActive ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 5s ease',
                }}
              />
            </div>
          )
        })}
      </BrixsaViewCursor>
    )

    const tabsPanel = (
      <div {...elementProps(config.id, 'tabsPanel', 'container', 'Tabs Panel')} className="relative flex flex-col justify-center" style={{ backgroundColor: 'var(--color-foreground, #140c08)', color: 'var(--color-background, #e1e1e1)', padding: 'clamp(20px, 5vw, 52px)' }}>
        {/* Tab list */}
        <div {...elementProps(config.id, 'tabList', 'container', 'Tab List')} role="tablist" aria-orientation="vertical" className="flex flex-col">
          {brixsaItems.map((item, i) => (
            <BrixsaTabButton
              key={item.id}
              item={item}
              isActive={item.id === brixsaActiveId}
              onClick={() => handleSelect(item.id)}
              onMouseEnter={() => handleSelect(item.id)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              tabRef={(el) => { tabRefs.current[i] = el }}
              index={i}
              sectionId={config.id}
            />
          ))}
        </div>

        {/* Description — absolutely positioned at bottom, animated */}
        <div style={{ position: 'absolute', left: 'clamp(20px, 5vw, 32%)', bottom: 'clamp(30px, 6vw, 60px)', maxWidth: '312px', overflow: 'hidden' }}>
          {brixsaItems.map((item, i) => (
            <div
              key={item.id}
              role="tabpanel"
              id={`tabpanel-${item.id}`}
              aria-labelledby={`tab-${item.id}`}
              style={{
                position: item.id === brixsaActiveId ? 'relative' : 'absolute',
                opacity: item.id === brixsaActiveId ? 1 : 0,
                transform: item.id === brixsaActiveId ? 'translateY(0)' : 'translateY(40px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
                pointerEvents: item.id === brixsaActiveId ? 'auto' : 'none',
              }}
            >
              <p
                {...elementProps(config.id, `items.${i}.content`, 'text')}
                style={{
                  fontFamily: '"Inter Variable", sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '150%',
                  color: 'var(--color-background, #e1e1e1)',
                }}
              >
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    )

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container')}
        style={{ aspectRatio: '1440 / 860' }}
      >
        <div
          {...elementProps(config.id, 'grid', 'container', 'Split Grid')}
          className="grid h-full"
          style={{
            gridTemplateColumns: '1fr 1fr',
            gap: 0,
          }}
        >
          {isVertical ? (
            <>
              {tabsPanel}
              {imagePanel}
            </>
          ) : (
            <>
              {imagePanel}
              {tabsPanel}
            </>
          )}
        </div>
      </section>
    )
  }

  // ── Default layout (all other universes) ──
  return (
    <section className={cn(uConfig.bg, 'py-16 md:py-24')}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        {(content.eyebrow || content.title) && (
          <div className="text-center mb-10">
            {content.eyebrow && (
              <span {...elementProps(config.id, 'eyebrow', 'text')} className={cn('text-xs font-semibold uppercase tracking-widest', uConfig.eyebrow)}>
                {content.eyebrow}
              </span>
            )}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn('text-3xl md:text-4xl font-bold mt-3', uConfig.text)}>
              {content.title}
            </h2>
            {content.subtitle && (
              <p {...elementProps(config.id, 'subtitle', 'text')} className={cn('mt-4 text-lg max-w-2xl mx-auto', uConfig.sub)}>
                {content.subtitle}
              </p>
            )}
          </div>
        )}

        {/* Tabs + Content */}
        <div className={cn(
          orientation === 'vertical' ? 'flex flex-col md:flex-row gap-6' : 'space-y-6'
        )}>
          {/* Tab List */}
          <div
            role="tablist"
            aria-orientation={orientation}
            className={cn(
              'flex gap-1 p-1 rounded-lg',
              uConfig.tabBg,
              orientation === 'vertical' ? 'md:flex-col md:w-56 md:shrink-0' : 'flex-row overflow-x-auto',
            )}
          >
            {items.map((item, i) => (
              <TabButton
                key={item.id}
                item={item}
                isActive={item.id === activeId}
                config={uConfig}
                onClick={() => handleSelect(item.id)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                tabRef={(el) => { tabRefs.current[i] = el }}
                index={i}
                sectionId={config.id}
              />
            ))}
          </div>

          {/* Tab Panel */}
          <div
            role="tabpanel"
            id={`tabpanel-${activeId}`}
            aria-labelledby={`tab-${activeId}`}
            className={cn('flex-1 rounded-lg p-6 md:p-8', uConfig.contentBg)}
          >
            {activeItem && (
              <div className="space-y-4">
                {activeItem.image ? (
                  <div className="rounded-lg overflow-hidden mb-4">
                    <img {...elementProps(config.id, `items.${activeIndex}.image`, 'image')} src={activeItem.image} alt={activeItem.label} className="w-full h-48 md:h-64 object-cover" />
                  </div>
                ) : isEditing ? (
                  <EditablePlaceholder sectionId={config.id} contentPath={`items.${activeIndex}.image`} type="image" className="h-48 md:h-64 mb-4" />
                ) : null}
                <p {...elementProps(config.id, `items.${activeIndex}.content`, 'text')} className={cn('text-sm leading-relaxed', uConfig.sub)}>
                  {activeItem.content}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export const tabsMeta: SectionMeta = {
  type: 'tabs',
  label: 'Tabs',
  icon: '📑',
  variants: [
    'startup-horizontal', 'startup-vertical',
    'corporate-horizontal', 'corporate-vertical',
    'luxe-horizontal', 'luxe-vertical',
    'creative-horizontal', 'creative-vertical',
    'ecommerce-horizontal', 'ecommerce-vertical',
    'glass-horizontal', 'glass-vertical',
    'brixsa-horizontal', 'brixsa-vertical',
  ],
  defaultVariant: 'startup-horizontal',
  defaultContent: {},
}
