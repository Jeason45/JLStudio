'use client'
import { cn } from '@/lib/utils'
import type { SectionConfig } from '@/types/site'
import type { DropdownContent, DropdownMenuGroup } from '@/types/sections'
import { elementProps } from '@/lib/elementHelpers'
import { componentTriggerBus } from '@/lib/animations/componentTriggerBridge'
import { useMenuState } from '@/hooks/useMenuState'
import { ChevronDown } from 'lucide-react'
import { useCallback } from 'react'
import type { SectionMeta } from '@/components/sections'

const UNIVERSE_CONFIGS = {
  startup: { bg: 'bg-white', text: 'text-zinc-900', sub: 'text-zinc-500', eyebrow: 'text-indigo-600', triggerBg: 'bg-indigo-600 text-white hover:bg-indigo-700', menuBg: 'bg-white shadow-xl border border-zinc-200', itemHover: 'hover:bg-indigo-50', itemText: 'text-zinc-900', itemDesc: 'text-zinc-500', megaBg: 'bg-white shadow-xl border border-zinc-200' },
  corporate: { bg: 'bg-slate-900', text: 'text-white', sub: 'text-slate-400', eyebrow: 'text-blue-400', triggerBg: 'bg-blue-600 text-white hover:bg-blue-700', menuBg: 'bg-slate-800 shadow-xl border border-slate-700', itemHover: 'hover:bg-slate-700', itemText: 'text-white', itemDesc: 'text-slate-400', megaBg: 'bg-slate-800 shadow-xl border border-slate-700' },
  luxe: { bg: 'bg-white', text: 'text-zinc-800', sub: 'text-zinc-500', eyebrow: 'text-amber-700', triggerBg: 'bg-amber-700 text-white hover:bg-amber-800', menuBg: 'bg-white shadow-lg border border-zinc-200', itemHover: 'hover:bg-amber-50', itemText: 'text-zinc-800', itemDesc: 'text-zinc-500', megaBg: 'bg-white shadow-lg border border-zinc-200' },
  creative: { bg: 'bg-amber-50', text: 'text-zinc-900', sub: 'text-zinc-600', eyebrow: 'text-zinc-900', triggerBg: 'bg-zinc-900 text-white hover:bg-zinc-800', menuBg: 'bg-white border-2 border-zinc-900 shadow-[4px_4px_0_0_#18181b]', itemHover: 'hover:bg-yellow-100', itemText: 'text-zinc-900', itemDesc: 'text-zinc-600', megaBg: 'bg-white border-2 border-zinc-900 shadow-[4px_4px_0_0_#18181b]' },
  ecommerce: { bg: 'bg-white', text: 'text-zinc-900', sub: 'text-zinc-500', eyebrow: 'text-emerald-600', triggerBg: 'bg-emerald-600 text-white hover:bg-emerald-700', menuBg: 'bg-white shadow-lg border border-zinc-200', itemHover: 'hover:bg-emerald-50', itemText: 'text-zinc-900', itemDesc: 'text-zinc-500', megaBg: 'bg-white shadow-lg border border-zinc-200' },
  glass: { bg: 'bg-zinc-950', text: 'text-white', sub: 'text-zinc-400', eyebrow: 'text-purple-400', triggerBg: 'bg-purple-600 text-white hover:bg-purple-700', menuBg: 'bg-zinc-900/90 backdrop-blur-xl border border-white/10 shadow-xl', itemHover: 'hover:bg-white/10', itemText: 'text-white', itemDesc: 'text-zinc-400', megaBg: 'bg-zinc-900/90 backdrop-blur-xl border border-white/10 shadow-xl' },
} as const

type Universe = keyof typeof UNIVERSE_CONFIGS

function parseVariant(variant: string): { universe: Universe; layout: 'simple' | 'mega' } {
  const parts = variant.split('-')
  const layout = parts[parts.length - 1] === 'mega' ? 'mega' : 'simple'
  const universe = (parts.slice(0, -1).join('-') || 'startup') as Universe
  return { universe: universe in UNIVERSE_CONFIGS ? universe : 'startup', layout }
}

export function DropdownSection({ config }: { config: SectionConfig; isEditing?: boolean }) {
  const content = config.content as DropdownContent
  const { universe } = parseVariant(config.variant || 'startup-simple')
  const uConfig = UNIVERSE_CONFIGS[universe]
  const isMega = content.isMegaMenu ?? false
  const groups = content.groups ?? []

  const { isOpen, triggerProps, menuProps, containerRef } = useMenuState({ mode: 'hover' })

  const emitTrigger = useCallback((type: 'dropdown-open' | 'dropdown-close') => {
    componentTriggerBus.emit({ type, sourceId: config.id })
  }, [config.id])

  // Emit on state change
  if (isOpen) emitTrigger('dropdown-open')

  return (
    <section className={cn(uConfig.bg, 'py-16 md:py-24')}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {content.title && (
          <div className="text-center mb-10">
            {content.eyebrow && (
              <span {...elementProps(config.id, 'eyebrow', 'text')} className={cn('text-xs font-semibold uppercase tracking-widest', uConfig.eyebrow)}>
                {content.eyebrow}
              </span>
            )}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn('text-3xl md:text-4xl font-bold mt-3', uConfig.text)}>
              {content.title}
            </h2>
          </div>
        )}

        {/* Dropdown */}
        <div className="flex justify-center">
          <div ref={containerRef} className="relative inline-block">
            <button
              {...triggerProps}
              className={cn('flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors', uConfig.triggerBg)}
            >
              {content.triggerLabel || 'Menu'}
              <ChevronDown className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')} />
            </button>

            {/* Menu */}
            <div
              {...menuProps}
              className={cn(
                'absolute top-full mt-2 rounded-lg overflow-hidden transition-all duration-200',
                isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none',
                isMega ? cn('left-1/2 -translate-x-1/2 w-[600px]', uConfig.megaBg) : cn('left-0 min-w-[220px]', uConfig.menuBg),
              )}
            >
              {isMega ? (
                <div className="grid grid-cols-2 gap-6 p-6">
                  {groups.map((group) => (
                    <div key={group.id}>
                      <h3 className={cn('text-xs font-semibold uppercase tracking-wider mb-3', uConfig.sub)}>{group.title}</h3>
                      <div className="space-y-1">
                        {group.items.map((item) => (
                          <a key={item.id} href={item.href} className={cn('block rounded-md px-3 py-2 transition-colors', uConfig.itemHover)}>
                            <span className={cn('block text-sm font-medium', uConfig.itemText)}>{item.label}</span>
                            {item.description && <span className={cn('block text-xs mt-0.5', uConfig.itemDesc)}>{item.description}</span>}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-2">
                  {groups.map((group) => (
                    <div key={group.id}>
                      {group.title && groups.length > 1 && (
                        <div className={cn('px-3 py-1.5 text-xs font-semibold uppercase tracking-wider', uConfig.sub)}>{group.title}</div>
                      )}
                      {group.items.map((item) => (
                        <a key={item.id} href={item.href} className={cn('block px-4 py-2 text-sm transition-colors', uConfig.itemText, uConfig.itemHover)}>
                          {item.label}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export const dropdownMeta: SectionMeta = {
  type: 'dropdown',
  label: 'Dropdown',
  icon: '📋',
  variants: [
    'startup-simple', 'startup-mega',
    'corporate-simple', 'corporate-mega',
    'luxe-simple', 'luxe-mega',
    'creative-simple', 'creative-mega',
    'ecommerce-simple', 'ecommerce-mega',
    'glass-simple', 'glass-mega',
  ],
  defaultVariant: 'startup-simple',
  defaultContent: {},
}
