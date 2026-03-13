'use client'
import { cn } from '@/lib/utils'
import type { SectionConfig } from '@/types/site'
import type { QuickStackContent, StackItem, StackLayout } from '@/types/sections'
import { elementProps } from '@/lib/elementHelpers'
import { Image as ImageIcon } from 'lucide-react'
import type { SectionMeta } from '@/components/sections'
import { EditablePlaceholder } from '../_EditablePlaceholder'

const UNIVERSE_CONFIGS = {
  startup: { bg: 'bg-white', text: 'text-zinc-900', sub: 'text-zinc-500', eyebrow: 'text-indigo-600', cardBg: 'bg-zinc-50 rounded-2xl', cardBorder: 'border border-zinc-100', badge: 'bg-indigo-100 text-indigo-700', ctaBg: 'text-indigo-600 hover:text-indigo-800' },
  corporate: { bg: 'bg-slate-900', text: 'text-white', sub: 'text-slate-400', eyebrow: 'text-blue-400', cardBg: 'bg-slate-800 rounded-xl', cardBorder: 'border border-slate-700', badge: 'bg-blue-900/50 text-blue-300', ctaBg: 'text-blue-400 hover:text-blue-300' },
  luxe: { bg: 'bg-white', text: 'text-zinc-800', sub: 'text-zinc-500', eyebrow: 'text-amber-700', cardBg: 'bg-zinc-50 rounded-xl', cardBorder: 'border border-zinc-200', badge: 'bg-amber-50 text-amber-800', ctaBg: 'text-amber-700 hover:text-amber-800' },
  creative: { bg: 'bg-amber-50', text: 'text-zinc-900', sub: 'text-zinc-600', eyebrow: 'text-zinc-900', cardBg: 'bg-white', cardBorder: 'border-2 border-zinc-900 shadow-[4px_4px_0_0_#18181b]', badge: 'bg-yellow-300 text-zinc-900', ctaBg: 'text-zinc-900 hover:text-zinc-700 font-black uppercase' },
  ecommerce: { bg: 'bg-white', text: 'text-zinc-900', sub: 'text-zinc-500', eyebrow: 'text-emerald-600', cardBg: 'bg-zinc-50 rounded-2xl', cardBorder: 'border border-zinc-100', badge: 'bg-emerald-100 text-emerald-700', ctaBg: 'text-emerald-600 hover:text-emerald-800' },
  glass: { bg: 'bg-zinc-950', text: 'text-white', sub: 'text-zinc-400', eyebrow: 'text-purple-400', cardBg: 'bg-white/5 backdrop-blur-sm rounded-xl', cardBorder: 'border border-white/10', badge: 'bg-purple-900/50 text-purple-300', ctaBg: 'text-purple-400 hover:text-purple-300' },
} as const

type Universe = keyof typeof UNIVERSE_CONFIGS

function parseVariant(variant: string): { universe: Universe } {
  const parts = variant.split('-')
  // Remove last part (layout number like "1", "2") if exists
  const universeParts = parts.length > 1 ? parts.slice(0, -1) : parts
  const universe = (universeParts.join('-') || 'startup') as Universe
  return { universe: universe in UNIVERSE_CONFIGS ? universe : 'startup' }
}

const LAYOUT_GRIDS: Record<StackLayout, string> = {
  '1+2': 'grid-cols-1 md:grid-cols-3',
  '2x2': 'grid-cols-1 sm:grid-cols-2',
  '3x1': 'grid-cols-1 md:grid-cols-3',
  'masonry': '',
  '1+1': 'grid-cols-1 md:grid-cols-2',
  'asymmetric': 'grid-cols-1 md:grid-cols-3',
}

function StackCard({ item, index, uConfig, sectionId, isLarge, isEditing }: {
  item: StackItem; index: number; uConfig: typeof UNIVERSE_CONFIGS[Universe]; sectionId: string; isLarge?: boolean; isEditing?: boolean
}) {
  return (
    <div className={cn('p-6', uConfig.cardBg, uConfig.cardBorder, isLarge && 'md:row-span-2 flex flex-col justify-center')}>
      {item.badge ? (
        <span {...elementProps(sectionId, `items.${index}.badge`, 'badge')} className={cn('inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-3', uConfig.badge)}>{item.badge}</span>
      ) : isEditing ? (
        <EditablePlaceholder sectionId={sectionId} contentPath={`items.${index}.badge`} type="badge" className="mb-3" />
      ) : null}
      {item.image ? (
        <div className="aspect-video rounded-lg overflow-hidden mb-4">
          <img {...elementProps(sectionId, `items.${index}.image`, 'image')} src={item.image} alt={item.title ?? ''} className="w-full h-full object-cover" />
        </div>
      ) : isEditing ? (
        <EditablePlaceholder sectionId={sectionId} contentPath={`items.${index}.image`} type="image" className="aspect-video mb-4" />
      ) : null}
      {!item.image && item.icon && (
        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center mb-4', uConfig.badge)}>
          <span className="text-lg">{item.icon === 'zap' ? '⚡' : item.icon === 'bar-chart-3' ? '📊' : item.icon === 'link' ? '🔗' : item.icon === 'lock' ? '🔒' : '✦'}</span>
        </div>
      )}
      {item.title && (
        <h3 {...elementProps(sectionId, `items.${index}.title`, 'heading')} className={cn('font-semibold text-lg mb-2', uConfig.text)}>
          {item.title}
        </h3>
      )}
      {item.subtitle && <p {...elementProps(sectionId, `items.${index}.subtitle`, 'text')} className={cn('text-sm mb-1', uConfig.sub)}>{item.subtitle}</p>}
      {item.body && (
        <p {...elementProps(sectionId, `items.${index}.body`, 'text')} className={cn('text-sm leading-relaxed', uConfig.sub)}>
          {item.body}
        </p>
      )}
      {item.ctaLabel && (
        <a {...elementProps(sectionId, `items.${index}.ctaLabel`, 'button')} href={item.ctaHref ?? '#'} className={cn('inline-block mt-4 text-sm font-medium transition-colors', uConfig.ctaBg)}>
          {item.ctaLabel} &rarr;
        </a>
      )}
    </div>
  )
}

export function QuickStackSection({ config, isEditing }: { config: SectionConfig; isEditing?: boolean }) {
  const content = config.content as QuickStackContent
  const { universe } = parseVariant(config.variant || 'startup-1')
  const uConfig = UNIVERSE_CONFIGS[universe]
  const items = content.items ?? []
  const layout = content.layout ?? '2x2'

  if (items.length === 0) return null

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
            {content.title && (
              <h2 {...elementProps(config.id, 'title', 'heading')} className={cn('text-3xl md:text-4xl font-bold mt-3', uConfig.text)}>
                {content.title}
              </h2>
            )}
            {content.subtitle && (
              <p {...elementProps(config.id, 'subtitle', 'text')} className={cn('mt-4 text-lg max-w-2xl mx-auto', uConfig.sub)}>
                {content.subtitle}
              </p>
            )}
          </div>
        )}

        {/* Stack Layout */}
        {layout === 'masonry' ? (
          <div className="columns-2 md:columns-3 gap-4">
            {items.map((item, i) => (
              <div key={item.id} className="break-inside-avoid mb-4">
                <StackCard item={item} index={i} uConfig={uConfig} sectionId={config.id} isEditing={isEditing} />
              </div>
            ))}
          </div>
        ) : layout === '1+2' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {items[0] && (
              <div className="md:col-span-2">
                <StackCard item={items[0]} index={0} uConfig={uConfig} sectionId={config.id} isLarge isEditing={isEditing} />
              </div>
            )}
            <div className="space-y-4">
              {items.slice(1).map((item, i) => (
                <StackCard key={item.id} item={item} index={i + 1} uConfig={uConfig} sectionId={config.id} isEditing={isEditing} />
              ))}
            </div>
          </div>
        ) : layout === '3x1' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {items[0] && (
              <div className="md:row-span-2">
                <StackCard item={items[0]} index={0} uConfig={uConfig} sectionId={config.id} isLarge isEditing={isEditing} />
              </div>
            )}
            {items.slice(1).map((item, i) => (
              <StackCard key={item.id} item={item} index={i + 1} uConfig={uConfig} sectionId={config.id} isEditing={isEditing} />
            ))}
          </div>
        ) : layout === 'asymmetric' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {items.map((item, i) => (
              <div key={item.id} className={i === 1 ? 'md:col-span-2' : ''}>
                <StackCard item={item} index={i} uConfig={uConfig} sectionId={config.id} isEditing={isEditing} />
              </div>
            ))}
          </div>
        ) : (
          <div className={cn('grid gap-4', LAYOUT_GRIDS[layout] ?? 'grid-cols-1 sm:grid-cols-2')}>
            {items.map((item, i) => (
              <StackCard key={item.id} item={item} index={i} uConfig={uConfig} sectionId={config.id} isEditing={isEditing} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export const quickStackMeta: SectionMeta = {
  type: 'quick-stack',
  label: 'Quick Stack',
  icon: '📦',
  variants: [
    'startup-1', 'startup-2',
    'corporate-1', 'corporate-2',
    'luxe-1', 'luxe-2',
    'creative-1', 'creative-2',
    'ecommerce-1', 'ecommerce-2',
    'glass-1', 'glass-2',
  ],
  defaultVariant: 'startup-1',
  defaultContent: {},
}
