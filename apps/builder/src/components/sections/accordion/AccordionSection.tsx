'use client'
import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import type { SectionConfig } from '@/types/site'
import type { AccordionContent, AccordionIconStyle, FAQItem } from '@/types/sections'
import { elementProps } from '@/lib/elementHelpers'
import { componentTriggerBus } from '@/lib/animations/componentTriggerBridge'
import { ChevronDown, Plus, Minus, ArrowDown } from 'lucide-react'
import type { SectionMeta } from '@/components/sections'

// ═══════════════════════════════════════════════════
// Universe configs
// ═══════════════════════════════════════════════════

const UNIVERSE_CONFIGS = {
  startup: {
    bg: 'bg-white', text: 'text-zinc-900', sub: 'text-zinc-500', eyebrow: 'text-indigo-600',
    itemBorder: 'border-zinc-100', questionText: 'text-zinc-900', answerText: 'text-zinc-500',
    accent: '#6366f1', openBg: '',
  },
  corporate: {
    bg: 'bg-slate-900', text: 'text-white', sub: 'text-slate-400', eyebrow: 'text-blue-400',
    itemBorder: 'border-slate-700/50', questionText: 'text-white', answerText: 'text-slate-400',
    accent: '#3b82f6', openBg: '',
  },
  luxe: {
    bg: 'bg-white', text: 'text-zinc-800', sub: 'text-zinc-500', eyebrow: 'text-amber-700',
    itemBorder: 'border-zinc-100/60', questionText: 'text-zinc-800', answerText: 'text-zinc-500',
    accent: '#b45309', openBg: '',
  },
  creative: {
    bg: 'bg-amber-50', text: 'text-zinc-900', sub: 'text-zinc-600', eyebrow: 'text-zinc-900',
    itemBorder: 'border-zinc-900', questionText: 'text-zinc-900', answerText: 'text-zinc-700',
    accent: '#eab308', openBg: 'bg-yellow-50',
  },
  ecommerce: {
    bg: 'bg-white', text: 'text-zinc-900', sub: 'text-zinc-500', eyebrow: 'text-emerald-600',
    itemBorder: 'border-zinc-200', questionText: 'text-zinc-900', answerText: 'text-zinc-500',
    accent: '#059669', openBg: '',
  },
  glass: {
    bg: 'bg-zinc-950', text: 'text-white', sub: 'text-zinc-400', eyebrow: 'text-purple-400',
    itemBorder: 'border-white/10', questionText: 'text-white', answerText: 'text-zinc-400',
    accent: '#a855f7', openBg: 'bg-white/5',
  },
} as const

type Universe = keyof typeof UNIVERSE_CONFIGS

function parseVariant(variant: string): { universe: Universe; mode: 'single' | 'multi' } {
  const parts = variant.split('-')
  const mode = parts[parts.length - 1] === 'multi' ? 'multi' : 'single'
  const universe = (parts.slice(0, -1).join('-') || 'startup') as Universe
  return { universe: universe in UNIVERSE_CONFIGS ? universe : 'startup', mode }
}

// ═══════════════════════════════════════════════════
// Icon Component
// ═══════════════════════════════════════════════════

function AccordionIcon({ style, open, accent }: { style: AccordionIconStyle; open: boolean; accent: string }) {
  if (style === 'none') return null

  const iconClass = cn('w-4 h-4 shrink-0 transition-transform duration-200')

  if (style === 'plus-minus') {
    return open
      ? <Minus className={iconClass} style={{ color: accent }} />
      : <Plus className={iconClass} style={{ color: accent }} />
  }
  if (style === 'arrow') {
    return <ArrowDown className={cn(iconClass, open && 'rotate-180')} style={{ color: accent }} />
  }
  // default: chevron
  return <ChevronDown className={cn(iconClass, open && 'rotate-180')} style={{ color: accent }} />
}

// ═══════════════════════════════════════════════════
// Accordion Item
// ═══════════════════════════════════════════════════

function AccordionItem({
  item, open, onToggle, iconStyle, uConfig, sectionId, itemIndex, isCreative,
}: {
  item: FAQItem; open: boolean; onToggle: () => void; iconStyle: AccordionIconStyle
  uConfig: typeof UNIVERSE_CONFIGS[Universe]; sectionId: string; itemIndex: number; isCreative: boolean
}) {
  return (
    <div className={cn(
      isCreative ? 'border-2 border-zinc-900' : cn('border-b last:border-0', uConfig.itemBorder),
      open && uConfig.openBg,
    )}>
      <button
        onClick={onToggle}
        aria-expanded={open}
        className={cn(
          'w-full flex items-center justify-between text-left gap-4',
          isCreative ? 'py-4 px-5' : 'py-5',
        )}
      >
        <span
          {...elementProps(sectionId, `items.${itemIndex}.question`, 'heading')}
          className={cn(
            'text-sm',
            uConfig.questionText,
            isCreative ? 'font-black uppercase tracking-tight' : 'font-medium',
          )}
        >
          {item.question}
        </span>
        <AccordionIcon style={iconStyle} open={open} accent={uConfig.accent} />
      </button>
      <div className={cn(
        'grid transition-all duration-200',
        open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
      )}>
        <div className="overflow-hidden">
          <p
            {...elementProps(sectionId, `items.${itemIndex}.answer`, 'text')}
            className={cn(
              'text-sm leading-relaxed',
              uConfig.answerText,
              isCreative ? 'pb-4 px-5' : 'pb-5',
            )}
          >
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════

export function AccordionSection({ config }: { config: SectionConfig; isEditing?: boolean }) {
  const content = config.content as AccordionContent
  const { universe, mode: variantMode } = parseVariant(config.variant || 'startup-single')
  const uConfig = UNIVERSE_CONFIGS[universe]
  const items = content.items ?? []
  const allowMultiple = content.allowMultiple ?? (variantMode === 'multi')
  const iconStyle = content.iconStyle ?? 'chevron'

  // State: single → string | null, multi → Set<string>
  const [openSingle, setOpenSingle] = useState<string | null>(null)
  const [openMulti, setOpenMulti] = useState<Set<string>>(new Set())

  const isOpen = useCallback((id: string) => {
    return allowMultiple ? openMulti.has(id) : openSingle === id
  }, [allowMultiple, openMulti, openSingle])

  const toggle = useCallback((id: string) => {
    if (allowMultiple) {
      setOpenMulti(prev => {
        const next = new Set(prev)
        if (next.has(id)) {
          next.delete(id)
          componentTriggerBus.emit({ type: 'accordion-close', sourceId: config.id, data: { itemId: id } })
        } else {
          next.add(id)
          componentTriggerBus.emit({ type: 'accordion-open', sourceId: config.id, data: { itemId: id } })
        }
        return next
      })
    } else {
      setOpenSingle(prev => {
        const next = prev === id ? null : id
        componentTriggerBus.emit({
          type: next ? 'accordion-open' : 'accordion-close',
          sourceId: config.id,
          data: { itemId: id },
        })
        return next
      })
    }
  }, [allowMultiple, config.id])

  if (items.length === 0) return null

  return (
    <section className={cn(uConfig.bg, 'py-16 md:py-24')}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
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

        {/* Accordion Items */}
        <div className={cn(universe === 'creative' ? 'space-y-2' : '')}>
          {items.map((item, i) => (
            <AccordionItem
              key={item.id}
              item={item}
              open={isOpen(item.id)}
              onToggle={() => toggle(item.id)}
              iconStyle={iconStyle}
              uConfig={uConfig}
              sectionId={config.id}
              itemIndex={i}
              isCreative={universe === 'creative'}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export const accordionMeta: SectionMeta = {
  type: 'accordion',
  label: 'Accordion',
  icon: '🪗',
  variants: [
    'startup-single', 'startup-multi',
    'corporate-single', 'corporate-multi',
    'luxe-single', 'luxe-multi',
    'creative-single', 'creative-multi',
    'ecommerce-single', 'ecommerce-multi',
    'glass-single', 'glass-multi',
  ],
  defaultVariant: 'startup-single',
  defaultContent: {},
}
