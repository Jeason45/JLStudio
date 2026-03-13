'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { elementProps } from '@/lib/elementHelpers'
import type { FeaturesConfig, FeaturesContent, FeatureItem } from '@/types/sections'
import type { SectionConfig } from '@/types/site'
import { Check, ArrowRight, Star } from 'lucide-react'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import { getTitleSizeClass, getTextAlignClass } from '../_utils'
import { EditablePlaceholder } from '../_EditablePlaceholder'

interface FeaturesSectionProps {
  config: SectionConfig
  isEditing?: boolean
}

export function FeaturesSection({ config, isEditing }: FeaturesSectionProps) {
  const features = config as FeaturesConfig
  const content = (features.content ?? {}) as Partial<FeaturesContent>
  const { accentColor, textColor: customTextColor, titleSize, textAlign } = config.style
  const items: FeatureItem[] = content.items ?? []
  const variant = features.variant ?? 'startup-grid'
  const universe = variant.split('-')[0]

  const title = content.title
  const subtitle = content.subtitle
  const eyebrow = content.eyebrow

  // ═══════════════════════════════════════════
  // STARTUP — SaaS moderne
  // ═══════════════════════════════════════════

  if (universe === 'startup') {
    const accent = accentColor ?? '#6366f1'
    const layout = variant.replace('startup-', '')

    const header = (
      <div className={cn("text-center mb-14 space-y-4", textAlign && getTextAlignClass(textAlign))}>
        {eyebrow ? (
          <span {...elementProps(config.id, 'eyebrow', 'badge')} className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full border border-zinc-200 text-zinc-600 bg-white shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
            {eyebrow}
          </span>
        ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="eyebrow" type="badge" className="mb-4" />}
        {title && (
          <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-bold text-zinc-900 leading-tight", titleSize && getTitleSizeClass(titleSize))} style={customTextColor ? { color: customTextColor } : undefined}>
            {title}
          </h2>
        )}
        {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-zinc-500 max-w-2xl mx-auto">{subtitle}</p>}
      </div>
    )

    // Grid
    if (layout === 'grid') {
      return (
        <section className="bg-zinc-50 py-20 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-6xl mx-auto px-6">
            {header}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((item, i) => (
                <div key={item.id} className="bg-white rounded-2xl p-7 border border-zinc-100 shadow-sm hover:shadow-md transition-shadow group">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-5 transition-colors"
                    style={{ backgroundColor: `${accent}12` }}
                  >
                    <DynamicIcon name={item.icon} className="w-5 h-5" fallbackClassName="text-xl leading-none" />
                  </div>
                  <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className="font-semibold text-zinc-900 mb-2">{item.title}</h3>
                  <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-zinc-500 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // Bento
    if (layout === 'bento') {
      return (
        <section className="bg-white py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-6xl mx-auto px-6">
            {header}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item, i) => (
                <div
                  key={item.id}
                  className={cn(
                    'rounded-2xl p-7 border border-zinc-100 bg-zinc-50 hover:bg-white transition-colors',
                    i === 0 && 'lg:col-span-2 lg:row-span-2 lg:p-10',
                  )}
                >
                  <div
                    className={cn('rounded-xl flex items-center justify-center text-xl mb-5', i === 0 ? 'w-14 h-14' : 'w-11 h-11')}
                    style={{ backgroundColor: `${accent}12` }}
                  >
                    <DynamicIcon name={item.icon} className="w-5 h-5" fallbackClassName="text-xl leading-none" />
                  </div>
                  <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className={cn('font-semibold text-zinc-900 mb-2', i === 0 && 'text-xl')}>{item.title}</h3>
                  <p {...elementProps(config.id, `items.${i}.description`, 'text')} className={cn('text-sm text-zinc-500 leading-relaxed', i === 0 && 'text-base max-w-md')}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // List
    return (
      <section className="bg-white py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-6xl mx-auto px-6">
          {header}
          <div className="space-y-6 max-w-3xl mx-auto">
            {items.map((item, i) => (
              <div key={item.id} className={cn('flex items-start gap-6', i % 2 === 1 && 'flex-row-reverse text-right')}>
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0"
                  style={{ backgroundColor: `${accent}12` }}
                >
                  <DynamicIcon name={item.icon} className="w-5 h-5" fallbackClassName="text-xl leading-none" />
                </div>
                <div className="flex-1 pt-1">
                  <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className="font-semibold text-zinc-900 mb-1">{item.title}</h3>
                  <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-zinc-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // CORPORATE — Entreprise / Finance
  // ═══════════════════════════════════════════

  if (universe === 'corporate') {
    const accent = accentColor ?? '#3b82f6'
    const layout = variant.replace('corporate-', '')

    const header = (
      <div className={cn("mb-14 space-y-4", textAlign && getTextAlignClass(textAlign))}>
        {eyebrow ? (
          <span {...elementProps(config.id, 'eyebrow', 'badge')} className="inline-block text-xs font-semibold px-3 py-1 rounded border text-blue-300 border-blue-500/30 bg-blue-500/10">
            {eyebrow}
          </span>
        ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="eyebrow" type="badge" className="mb-4" />}
        {title && (
          <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-bold text-white leading-tight", titleSize && getTitleSizeClass(titleSize))} style={customTextColor ? { color: customTextColor } : undefined}>
            {title}
          </h2>
        )}
        {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-slate-400 max-w-2xl">{subtitle}</p>}
      </div>
    )

    // Grid
    if (layout === 'grid') {
      return (
        <section className="bg-slate-900 py-20 noise-overlay relative" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="relative max-w-7xl mx-auto px-6">
            {header}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((item, i) => (
                <div key={item.id} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/30 transition-colors">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg mb-4 bg-blue-500/10 border border-blue-500/20">
                    <DynamicIcon name={item.icon} className="w-5 h-5" fallbackClassName="text-xl leading-none" />
                  </div>
                  <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className="font-semibold text-white mb-2">{item.title}</h3>
                  <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // Bento
    if (layout === 'bento') {
      return (
        <section className="bg-slate-900 py-20 noise-overlay relative" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="relative max-w-7xl mx-auto px-6">
            {header}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item, i) => (
                <div
                  key={item.id}
                  className={cn(
                    'rounded-xl p-6 border-l-2 bg-slate-800/30',
                    i === 0 ? 'lg:col-span-2 lg:p-8 border-blue-400' : 'border-slate-600',
                  )}
                  style={i === 0 ? { borderLeftColor: accent } : undefined}
                >
                  <div className="mb-3"><DynamicIcon name={item.icon} className="w-5 h-5" fallbackClassName="text-lg leading-none" /></div>
                  <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className={cn('font-semibold text-white mb-2', i === 0 && 'text-xl')}>{item.title}</h3>
                  <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // List
    return (
      <section className="bg-slate-900 py-20 noise-overlay relative" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="relative max-w-7xl mx-auto px-6">
          {header}
          <div className="max-w-3xl space-y-0 divide-y divide-slate-700/50">
            {items.map((item, i) => (
              <div key={item.id} className="flex items-start gap-5 py-6 first:pt-0 last:pb-0">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0 bg-slate-800 border border-slate-700">
                  <DynamicIcon name={item.icon} className="w-5 h-5" fallbackClassName="text-xl leading-none" />
                </div>
                <div className="flex-1">
                  <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className="font-semibold text-white mb-1">{item.title}</h3>
                  <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 shrink-0 mt-1" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // LUXE — Hôtellerie / Mode / Joaillerie
  // ═══════════════════════════════════════════

  if (universe === 'luxe') {
    const gold = accentColor ?? '#b8860b'
    const layout = variant.replace('luxe-', '')

    const header = (
      <div className={cn("text-center mb-16 space-y-5", textAlign && getTextAlignClass(textAlign))}>
        {eyebrow ? (
          <span {...elementProps(config.id, 'eyebrow', 'badge')} className="inline-block text-xs tracking-[0.25em] uppercase font-light" style={{ color: gold }}>
            {eyebrow}
          </span>
        ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="eyebrow" type="badge" className="mb-4" />}
        {title && (
          <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-light text-zinc-900 leading-tight tracking-tight", titleSize && getTitleSizeClass(titleSize))} style={customTextColor ? { color: customTextColor } : undefined}>
            {title}
          </h2>
        )}
        <div className="w-12 h-px mx-auto" style={{ background: gold }} />
        {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-zinc-400 max-w-xl mx-auto tracking-wide font-light">{subtitle}</p>}
      </div>
    )

    // Grid
    if (layout === 'grid') {
      return (
        <section className="bg-white py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-5xl mx-auto px-6">
            {header}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {items.map((item, i) => (
                <div key={item.id} className="text-center space-y-4">
                  <DynamicIcon name={item.icon} className="w-7 h-7" fallbackClassName="text-2xl leading-none" />
                  <div className="w-8 h-px mx-auto" style={{ background: gold }} />
                  <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className="font-medium text-zinc-900 tracking-wide text-sm uppercase">{item.title}</h3>
                  <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-zinc-400 leading-relaxed font-light">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // Bento
    if (layout === 'bento') {
      return (
        <section className="bg-zinc-50 py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-5xl mx-auto px-6">
            {header}
            <div className="grid sm:grid-cols-2 gap-6">
              {items.map((item, i) => (
                <div
                  key={item.id}
                  className={cn(
                    'bg-white p-8 border border-zinc-100',
                    i === 0 && 'sm:col-span-2 sm:p-12',
                  )}
                >
                  <span className="text-xs font-light tracking-[0.2em] uppercase" style={{ color: gold }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className={cn('font-medium text-zinc-900 mt-3 mb-3 tracking-wide', i === 0 ? 'text-xl' : 'text-sm uppercase')}>
                    {item.title}
                  </h3>
                  <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-zinc-400 leading-relaxed font-light">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // List
    return (
      <section className="bg-white py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-3xl mx-auto px-6">
          {header}
          <div className="space-y-10">
            {items.map((item, i) => (
              <div key={item.id} className="flex gap-8 items-start">
                <span className="text-2xl font-light tracking-wide shrink-0 w-10 pt-1" style={{ color: gold }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 border-t border-zinc-100 pt-4">
                  <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className="font-medium text-zinc-900 mb-2 tracking-wide text-sm uppercase">{item.title}</h3>
                  <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-zinc-400 leading-relaxed font-light">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // CREATIVE — Agence / Portfolio / Studio
  // ═══════════════════════════════════════════

  if (universe === 'creative') {
    const accent = accentColor ?? '#ea580c'
    const layout = variant.replace('creative-', '')

    const header = (
      <div className={cn("mb-14 space-y-4", textAlign && getTextAlignClass(textAlign))}>
        {eyebrow ? (
          <span
            {...elementProps(config.id, 'eyebrow', 'badge')}
            className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1.5 border-2 border-zinc-900 text-zinc-900"
            style={accentColor ? { backgroundColor: accentColor, borderColor: accentColor, color: '#fff' } : undefined}
          >
            {eyebrow}
          </span>
        ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="eyebrow" type="badge" className="mb-4" />}
        {title && (
          <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-5xl font-black text-zinc-900 leading-[0.95]", titleSize && getTitleSizeClass(titleSize))} style={customTextColor ? { color: customTextColor } : undefined}>
            {title}
          </h2>
        )}
        {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-zinc-600 max-w-lg">{subtitle}</p>}
      </div>
    )

    // Grid
    if (layout === 'grid') {
      return (
        <section className="bg-[#f5f0e8] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-7xl mx-auto px-6">
            {header}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((item, i) => (
                <div key={item.id} className="relative bg-white border-2 border-zinc-900 p-6 hover:translate-x-0.5 hover:-translate-y-0.5 transition-transform shadow-[4px_4px_0_0_#18181b] hover:shadow-[6px_6px_0_0_#18181b]">
                  <div className="mb-4"><DynamicIcon name={item.icon} className="w-7 h-7" fallbackClassName="text-2xl leading-none" /></div>
                  <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className="font-bold text-zinc-900 mb-2 uppercase text-sm tracking-wide">{item.title}</h3>
                  <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-zinc-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // Bento
    if (layout === 'bento') {
      return (
        <section className="bg-[#f5f0e8] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-7xl mx-auto px-6">
            {header}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item, i) => (
                <div
                  key={item.id}
                  className={cn(
                    'bg-white border-2 border-zinc-900 p-6 relative',
                    i === 0 && 'lg:col-span-2 lg:row-span-2 lg:p-10',
                  )}
                >
                  <span className="absolute top-3 right-3 text-[10px] font-black uppercase tracking-wider text-zinc-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="mb-4"><DynamicIcon name={item.icon} className={cn('w-7 h-7', i === 0 && 'w-10 h-10')} fallbackClassName={cn('text-2xl leading-none', i === 0 && 'text-4xl')} /></div>
                  <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className={cn('font-black text-zinc-900 uppercase tracking-wide', i === 0 ? 'text-2xl mb-3' : 'text-sm mb-2')}>
                    {item.title}
                  </h3>
                  <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-zinc-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // List
    return (
      <section className="bg-[#f5f0e8] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-4xl mx-auto px-6">
          {header}
          <div className="space-y-0 border-t-2 border-zinc-900">
            {items.map((item, i) => (
              <div key={item.id} className="flex items-start gap-6 py-6 border-b-2 border-zinc-900">
                <span className="text-4xl md:text-5xl font-black text-zinc-200 leading-none shrink-0 w-16" style={accentColor ? { color: accentColor } : undefined}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className="font-black text-zinc-900 uppercase tracking-wide text-sm mb-1">{item.title}</h3>
                  <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-zinc-600 leading-relaxed">{item.description}</p>
                </div>
                <div className="shrink-0 mt-1"><DynamicIcon name={item.icon} className="w-5 h-5" fallbackClassName="text-xl leading-none" /></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // ECOMMERCE — Boutique / Marketplace
  // ═══════════════════════════════════════════

  if (universe === 'ecommerce') {
    const accent = accentColor ?? '#059669'
    const layout = variant.replace('ecommerce-', '')

    const header = (
      <div className={cn("text-center mb-14 space-y-3", textAlign && getTextAlignClass(textAlign))}>
        {eyebrow ? (
          <span {...elementProps(config.id, 'eyebrow', 'badge')} className="inline-block text-xs font-bold px-3 py-1 rounded-full text-white" style={{ backgroundColor: accent }}>
            {eyebrow}
          </span>
        ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="eyebrow" type="badge" className="mb-4" />}
        {title && (
          <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-bold text-zinc-900 leading-tight", titleSize && getTitleSizeClass(titleSize))} style={customTextColor ? { color: customTextColor } : undefined}>
            {title}
          </h2>
        )}
        {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-zinc-500 max-w-xl mx-auto">{subtitle}</p>}
      </div>
    )

    // Grid
    if (layout === 'grid') {
      return (
        <section className="bg-white py-16" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-6xl mx-auto px-6">
            {header}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((item, i) => (
                <div key={item.id} className="rounded-2xl p-6 border border-zinc-100 bg-zinc-50 hover:border-emerald-200 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ backgroundColor: `${accent}12` }}>
                      <DynamicIcon name={item.icon} className="w-5 h-5" fallbackClassName="text-xl leading-none" />
                    </div>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className="font-semibold text-zinc-900 mb-2">{item.title}</h3>
                  <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-zinc-500 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // Bento
    if (layout === 'bento') {
      return (
        <section className="bg-zinc-50 py-16" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-6xl mx-auto px-6">
            {header}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item, i) => (
                <div
                  key={item.id}
                  className={cn(
                    'rounded-2xl p-6 bg-white border border-zinc-100',
                    i === 0 && 'lg:col-span-2 lg:p-8',
                  )}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <DynamicIcon name={item.icon} className="w-5 h-5" fallbackClassName="text-xl leading-none" />
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: accent }}>
                      INCLUS
                    </span>
                  </div>
                  <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className={cn('font-semibold text-zinc-900 mb-2', i === 0 && 'text-xl')}>{item.title}</h3>
                  <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-zinc-500 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // List (Checklist)
    return (
      <section className="bg-white py-16" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-3xl mx-auto px-6">
          {header}
          <div className="space-y-4">
            {items.map((item, i) => (
              <div key={item.id} className="flex items-start gap-4 p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: accent }}>
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className="font-semibold text-zinc-900 mb-0.5">{item.title}</h3>
                  <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-zinc-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // GLASS — IA / Crypto / Tech
  // ═══════════════════════════════════════════

  if (universe === 'glass') {
    const accent = accentColor ?? '#818cf8'
    const layout = variant.replace('glass-', '')

    const header = (
      <div className={cn("text-center mb-14 space-y-4", textAlign && getTextAlignClass(textAlign))}>
        {eyebrow ? (
          <span {...elementProps(config.id, 'eyebrow', 'badge')} className="inline-flex items-center gap-2 text-xs font-medium px-4 py-1.5 rounded-full border border-white/10 text-white/60 bg-white/[0.04] backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent, boxShadow: `0 0 8px ${accent}80` }} />
            {eyebrow}
          </span>
        ) : isEditing && <EditablePlaceholder sectionId={config.id} contentPath="eyebrow" type="badge" className="mb-4" />}
        {title && (
          <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-bold gradient-text leading-tight", titleSize && getTitleSizeClass(titleSize))} style={customTextColor ? { color: customTextColor, background: 'none', WebkitTextFillColor: 'unset' } : undefined}>
            {title}
          </h2>
        )}
        {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-white/40 max-w-2xl mx-auto">{subtitle}</p>}
      </div>
    )

    // Grid
    if (layout === 'grid') {
      return (
        <section className="bg-zinc-950 py-20 noise-overlay relative overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="absolute inset-0 dot-grid" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-30 blur-3xl pointer-events-none"
            style={{ background: `radial-gradient(ellipse, ${accent}20, transparent 70%)` }}
          />
          <div className="relative max-w-6xl mx-auto px-6">
            {header}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item, i) => (
                <div key={item.id} className="bg-white/[0.04] backdrop-blur-xl rounded-2xl p-6 border border-white/[0.08] hover:border-white/[0.15] transition-colors group">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4 border border-white/10"
                    style={{ backgroundColor: `${accent}10` }}
                  >
                    <DynamicIcon name={item.icon} className="w-5 h-5" fallbackClassName="text-xl leading-none" />
                  </div>
                  <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className="font-semibold text-white mb-2">{item.title}</h3>
                  <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-white/40 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // Bento
    if (layout === 'bento') {
      return (
        <section className="bg-zinc-950 py-20 noise-overlay relative overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="absolute inset-0 dot-grid" />
          <div className="relative max-w-6xl mx-auto px-6">
            {header}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item, i) => (
                <div
                  key={item.id}
                  className={cn(
                    'bg-white/[0.03] backdrop-blur-xl rounded-2xl p-6 border border-white/[0.06] relative overflow-hidden',
                    i === 0 && 'lg:col-span-2 lg:row-span-2 lg:p-10',
                  )}
                >
                  {/* Glow accent line at top */}
                  <div className="absolute top-0 left-[20%] right-[20%] h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}40, transparent)` }} />
                  <div className="mb-4"><DynamicIcon name={item.icon} className={cn('w-5 h-5', i === 0 && 'w-8 h-8')} fallbackClassName={cn('text-xl leading-none', i === 0 && 'text-3xl')} /></div>
                  <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className={cn('font-semibold text-white mb-2', i === 0 && 'text-xl')}>{item.title}</h3>
                  <p {...elementProps(config.id, `items.${i}.description`, 'text')} className={cn('text-sm text-white/40 leading-relaxed', i === 0 && 'text-base text-white/50 max-w-md')}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // List
    return (
      <section className="bg-zinc-950 py-20 noise-overlay relative overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="absolute inset-0 dot-grid" />
        <div className="relative max-w-3xl mx-auto px-6">
          {header}
          <div className="space-y-3">
            {items.map((item, i) => (
              <div key={item.id} className="flex items-start gap-5 p-5 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:bg-white/[0.06] transition-colors">
                <div className="mt-0.5"><DynamicIcon name={item.icon} className="w-5 h-5" fallbackClassName="text-xl leading-none" /></div>
                <div className="flex-1">
                  <h3 {...elementProps(config.id, `items.${i}.title`, 'heading')} className="font-semibold text-white mb-1">{item.title}</h3>
                  <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-white/40 leading-relaxed">{item.description}</p>
                </div>
                <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: accent, boxShadow: `0 0 6px ${accent}60` }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // BRIXSA — Split Layout Accordion
  // ═══════════════════════════════════════════

  if (variant === 'brixsa-accordion') {
    const scrollRevealRef = (el: HTMLDivElement | null) => {
      if (!el) return
      el.style.opacity = '0'
      el.style.transform = 'translateY(40px)'
      el.style.transition = 'opacity 0.8s ease, transform 0.8s ease'
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          obs.disconnect()
        }
      }, { threshold: 0.15 })
      obs.observe(el)
    }

    const panelImages = [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80',
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1200&q=80',
    ]

    const defaultPanelLabels = ['Start Buying', 'Start Selling', 'Start Renting']

    const resolvedPanels = items.length > 0
      ? items.map((item, i) => ({
          title: item.title || defaultPanelLabels[i % defaultPanelLabels.length],
          image: (item as unknown as Record<string, unknown>).image as string || panelImages[i % panelImages.length],
          id: item.id,
        }))
      : defaultPanelLabels.map((label, i) => ({ title: label, image: panelImages[i], id: `default-${i}` }))

    return (
      <section {...elementProps(config.id, 'wrapper', 'container', 'Services Section')} className="overflow-hidden" style={{ backgroundColor: '#f6efe5', fontFamily: 'var(--font-body, inherit)' }}>
        {/* Header area */}
        <div {...elementProps(config.id, 'headerArea', 'container', 'Header Area')} style={{ padding: '0 60px' }}>
          <div style={{ maxWidth: 1320, margin: '0 auto', textAlign: 'center' }}>
            {title && (
              <div>
                <h2
                  {...elementProps(config.id, 'title', 'heading')}
                  className={cn(titleSize && getTitleSizeClass(titleSize))}
                  style={{
                    maxWidth: 700,
                    margin: '0 auto',
                    fontFamily: '"GeneralSans Variable", sans-serif',
                    fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
                    fontWeight: 500,
                    lineHeight: '110%',
                    textTransform: 'capitalize' as const,
                    marginBottom: 60,
                    ...(customTextColor ? { color: customTextColor } : { color: '#140c08' }),
                  }}
                >
                  {title}
                </h2>
              </div>
            )}
          </div>
        </div>

        {/* 3 equal panels — only image zooms on hover, panels stay same size */}
        <style>{`
          .brixsa-panel:hover .brixsa-panel-img { transform: scale(1.08) !important; }
          .brixsa-panel:hover .brixsa-panel-overlay { background-color: rgba(0,0,0,0.2) !important; }
          .brixsa-panel:hover .brixsa-panel-arrow { opacity: 1 !important; top: calc(100% + 16px) !important; }
        `}</style>
        <div
          {...elementProps(config.id, 'panelsRow', 'container', 'Panels Row')}
          className="flex flex-row"
          style={{ minHeight: 700 }}
        >
          {resolvedPanels.map((panel, i) => (
            <div
              key={panel.id}
              {...elementProps(config.id, `panels.${i}`, 'container', 'Panel')}
              className="brixsa-panel relative overflow-hidden cursor-pointer"
              style={{
                flex: '1 1 0%',
                minHeight: 700,
                backgroundColor: '#140c08',
                color: '#e1e1e1',
              }}
            >
              {/* Background image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                {...elementProps(config.id, `panels.${i}.image`, 'image', 'Panel Image')}
                src={panel.image}
                alt={panel.title}
                className="brixsa-panel-img absolute inset-0 w-full h-full object-cover"
                style={{ transition: 'transform 0.7s ease' }}
              />

              {/* Overlay */}
              <div
                {...elementProps(config.id, `panels.${i}.overlay`, 'container', 'Overlay')}
                className="brixsa-panel-overlay absolute inset-0"
                style={{
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  zIndex: 1,
                  transition: 'background-color 0.4s',
                }}
              />

              {/* Content */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ zIndex: 2 }}
              >
                <div className="relative flex flex-col items-center" style={{ gap: 40 }}>
                  <h4
                    {...elementProps(config.id, `items.${i}.title`, 'heading')}
                    style={{
                      fontFamily: '"GeneralSans Variable", sans-serif',
                      fontSize: 'clamp(1.5rem, 1.0714rem + 1.9048vw, 2.5rem)',
                      fontWeight: 500,
                      textTransform: 'capitalize' as const,
                      color: '#ffffff',
                      textAlign: 'center',
                      margin: 0,
                    }}
                  >
                    {panel.title}
                  </h4>

                  {/* Arrow icon */}
                  <div
                    {...elementProps(config.id, `panels.${i}.arrow`, 'icon', 'Arrow Icon')}
                    className="brixsa-panel-arrow"
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 40px)',
                      opacity: 0,
                      transition: 'top 0.5s ease, opacity 0.5s ease',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // BRIXSA — Services (Smooth Closings split layout)
  // ═══════════════════════════════════════════

  if (variant === 'brixsa-services') {
    const [activeIndex, setActiveIndex] = useState(0)

    const serviceImages = [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80',
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80',
    ]

    const defaultServices = [
      { title: 'Smooth Closings', description: 'Our agents are committed to ensuring a seamless transaction process, offering personalized advice and expert negotiation skills.' },
      { title: 'Local Experts', description: 'Our team of local experts provides in-depth knowledge of neighborhoods, market trends, and community insights.' },
      { title: 'Verified Listings', description: 'Every property in our portfolio undergoes thorough verification to ensure quality, accuracy, and compliance.' },
      { title: 'Support', description: 'We provide dedicated support throughout your entire real estate journey, from first inquiry to final closing.' },
    ]

    const resolvedItems = items.length > 0
      ? items.map((item, i) => ({
          title: item.title || defaultServices[i % defaultServices.length].title,
          description: (item as unknown as Record<string, unknown>).description as string || defaultServices[i % defaultServices.length].description,
          image: (item as unknown as Record<string, unknown>).image as string || serviceImages[i % serviceImages.length],
          id: item.id,
        }))
      : defaultServices.map((s, i) => ({ ...s, image: serviceImages[i], id: `default-${i}` }))

    return (
      <section {...elementProps(config.id, 'wrapper', 'container', 'Expertise Section')} style={{ fontFamily: 'var(--font-body, inherit)' }}>
        {/* Split layout */}
        <div {...elementProps(config.id, 'splitLayout', 'container', 'Split Layout')} style={{ display: 'flex', minHeight: 650, overflow: 'hidden' }}>
          {/* Left side — Image with crossfade */}
          <div {...elementProps(config.id, 'imagePanel', 'container', 'Image Panel')} style={{ position: 'relative', width: '50%', overflow: 'hidden' }}>
            {resolvedItems.map((item, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={item.id}
                src={item.image}
                alt={item.title}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: activeIndex === i ? 1 : 0,
                  transition: 'opacity 0.6s ease',
                }}
              />
            ))}
            {/* Featured badge */}
            <div
              {...elementProps(config.id, 'featuredBadge', 'badge')}
              style={{
                position: 'absolute',
                top: 24,
                left: 24,
                zIndex: 2,
                padding: '8px 20px',
                borderRadius: 4,
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                background: 'rgba(158, 158, 158, 0.3)',
                color: '#ffffff',
                fontSize: 16,
                fontWeight: 400,
              }}
            >
              Featured
            </div>
          </div>

          {/* Right side — Dark panel with service names */}
          <div
            {...elementProps(config.id, 'contentPanel', 'container', 'Content Panel')}
            style={{
              width: '50%',
              backgroundColor: '#140c08',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '60px 60px 60px 80px',
              position: 'relative',
            }}
          >
            {/* Service names */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: -20 }}>
              {resolvedItems.map((item, i) => {
                const isActive = activeIndex === i
                return (
                  <h3
                    key={item.id}
                    {...elementProps(config.id, `items.${i}.title`, 'heading')}
                    onMouseEnter={() => setActiveIndex(i)}
                    style={{
                      fontFamily: '"GeneralSans Variable", sans-serif',
                      fontSize: 'clamp(1.25rem, 1rem + 1.2vw, 2rem)',
                      fontWeight: 500,
                      lineHeight: '130%',
                      color: isActive ? '#ffffff' : '#e1e1e1',
                      opacity: isActive ? 1 : 0.4,
                      cursor: 'pointer',
                      margin: 0,
                      padding: '6px 0',
                      transition: 'opacity 0.4s ease, color 0.4s ease',
                    }}
                  >
                    {item.title}
                  </h3>
                )
              })}
            </div>

            {/* Description — fixed height zone, absolutely positioned at bottom so it never pushes titles */}
            <div style={{ position: 'absolute', bottom: 60, left: 80, right: 60, height: 80 }}>
              {resolvedItems.map((item, i) => (
                <p
                  key={item.id}
                  {...elementProps(config.id, `items.${i}.description`, 'text')}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    fontFamily: 'var(--font-body, inherit)',
                    fontSize: 16,
                    lineHeight: '170%',
                    color: '#e1e1e1',
                    opacity: activeIndex === i ? 0.7 : 0,
                    margin: 0,
                    maxWidth: 420,
                    transition: 'opacity 0.4s ease',
                  }}
                >
                  {item.description}
                </p>
              ))}
            </div>

            {/* View circle button */}
            <div
              {...elementProps(config.id, 'viewButton', 'button')}
              style={{
                position: 'absolute',
                bottom: 40,
                right: 60,
                width: 56,
                height: 56,
                borderRadius: '50%',
                border: '1.5px solid rgba(255,255,255,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'border-color 0.3s ease, background-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              <span style={{ color: '#ffffff', fontSize: 13, fontWeight: 500, fontFamily: '"GeneralSans Variable", sans-serif' }}>View</span>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // BRIXSA — Location (Cities showcase)
  // ═══════════════════════════════════════════

  if (variant === 'brixsa-location') {
    const [activeCity, setActiveCity] = useState<number | null>(null)

    const cityImages = [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=300&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=300&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=300&q=80',
    ]

    const defaultCities = ['Birmingham', 'San Francisco', 'Miami', 'Chicago', 'Los Angeles', 'New York City']
    const cities = items.length > 0 ? items.map(item => item.title) : defaultCities

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Locations Section')}
        style={{
          backgroundColor: '#140c08',
          color: '#e1e1e1',
          position: 'relative',
          padding: '220px 60px',
          fontFamily: 'var(--font-body, inherit)',
        }}
      >
        {/* Cities wrapper */}
        <div
          {...elementProps(config.id, 'citiesGrid', 'container', 'Cities Grid')}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: 1096,
            margin: '0 auto',
            gap: 24,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {cities.map((city, i) => (
            <div
              key={items[i]?.id ?? `city-${i}`}
              style={{ display: 'flex', gap: 24, alignItems: 'center' }}
            >
              <div
                style={{ position: 'relative' }}
                onMouseEnter={() => setActiveCity(i)}
                onMouseLeave={() => setActiveCity(null)}
              >
                {/* Hover image above city name */}
                <img
                  {...elementProps(config.id, `items.${i}.image`, 'image', 'City Image')}
                  src={cityImages[i % cityImages.length]}
                  alt=""
                  style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    width: 120,
                    aspectRatio: '3/4',
                    objectFit: 'cover',
                    borderRadius: 6,
                    pointerEvents: 'none',
                    opacity: activeCity === i ? 1 : 0,
                    transform: activeCity === i ? 'translateX(-50%) scale(1)' : 'translateX(-50%) scale(0.8)',
                    transition: 'opacity 0.35s ease, transform 0.35s ease',
                    marginBottom: 8,
                    zIndex: 10,
                  }}
                />
                <h2
                  {...elementProps(config.id, `items.${i}.title`, 'heading')}
                  style={{
                    fontFamily: '"GeneralSans Variable", sans-serif',
                    fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
                    fontWeight: 500,
                    lineHeight: '100%',
                    margin: 0,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    textUnderlineOffset: '5px',
                    textDecorationThickness: '3px',
                    textDecorationColor: activeCity === i ? '#e1e1e1' : 'transparent',
                    transition: 'text-decoration-color 0.5s ease',
                    color: '#e1e1e1',
                  }}
                >
                  {city}
                </h2>
              </div>
              {i < cities.length - 1 && (
                <span
                  {...elementProps(config.id, `divider.${i}`, 'text', 'Divider')}
                  style={{
                    fontFamily: '"GeneralSans Variable", sans-serif',
                    fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
                    fontWeight: 500,
                    lineHeight: '100%',
                    opacity: 0.1,
                    color: '#e1e1e1',
                  }}
                >
                  /
                </span>
              )}
            </div>
          ))}
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════════════════
  // ZMR-EVENTS — Grille événements style ZMR : fond noir, cards 16:9,
  // date badge blanc, type badge, titre, lieu, heure, prix, CTA "Réserver"
  // ═══════════════════════════════════════════════════════
  if (variant === 'zmr-events') {
    return (
      <section
        style={{ fontFamily: 'var(--font-body, inherit)', background: '#000', paddingTop: '200px', paddingBottom: '80px' }}
      >
        {/* Title */}
        {content.title && (
          <h2
            {...elementProps(config.id, 'title', 'heading')}
            className="text-center mb-4"
            style={{ color: 'white', fontSize: 'clamp(20px, 4vw, 40px)', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase' }}
          >
            {content.title}
          </h2>
        )}
        {content.subtitle && (
          <p
            {...elementProps(config.id, 'subtitle', 'text')}
            className="text-center mb-12"
            style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', fontWeight: 300 }}
          >
            {content.subtitle}
          </p>
        )}

        {/* Events Grid */}
        <div
          className="max-w-[1400px] mx-auto px-10 grid gap-10"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))' }}
        >
          {items.map((item, i) => (
            <div
              key={item.id}
              className="rounded-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
              style={{ background: '#111', cursor: 'pointer' }}
            >
              {/* Image 16:9 */}
              <div className="relative" style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                {item.icon && item.icon.startsWith('http') ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    {...elementProps(config.id, `items.${i}.icon`, 'image')}
                    src={item.icon}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                    <span className="text-4xl">{item.icon || '📅'}</span>
                  </div>
                )}
                {/* Date Badge */}
                <div className="absolute top-4 left-4 bg-white text-black px-4 py-3 rounded text-center" style={{ minWidth: '60px' }}>
                  <div style={{ fontSize: '24px', fontWeight: 700, lineHeight: 1 }}>
                    {item.title?.match(/\d+/)?.[0] || '15'}
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.05em' }}>
                    {item.title?.match(/[A-Z]{3}/)?.[0] || 'JAN'}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  {...elementProps(config.id, `items.${i}.title`, 'heading')}
                  style={{ color: 'white', fontSize: '22px', fontWeight: 500, marginBottom: '12px', letterSpacing: '0.02em' }}
                >
                  {item.title}
                </h3>
                <p
                  {...elementProps(config.id, `items.${i}.description`, 'text')}
                  className="flex items-center gap-4 mb-3"
                  style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}
                >
                  {item.description}
                </p>
                {/* Footer with CTA */}
                <div className="flex justify-between items-center mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ color: 'white', fontSize: '18px', fontWeight: 600 }}>
                    {item.icon === 'free' ? 'GRATUIT' : 'Voir détails'}
                  </span>
                  <span
                    className="px-4 py-2 text-xs font-medium tracking-[0.1em] uppercase transition-all"
                    style={{ border: '1px solid white', borderRadius: '4px', color: 'white' }}
                  >
                    RÉSERVER
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════════════════
  // ZMR-MEASUREMENTS — Barre de mensurations talent : type badges (pills border #444),
  // mesures en row horizontale (13px uppercase, letter-spacing 0.1em), fond #0a0a0a
  // ═══════════════════════════════════════════════════════
  if (variant === 'zmr-measurements') {
    // Items: each item.title = label (e.g. "HEIGHT"), item.description = value (e.g. "178cm")
    // item.icon used as type badge text (e.g. "MODEL", "ACTING")
    const typeBadges = items.filter(it => it.icon && !it.icon.startsWith('http')).map(it => it.icon)
    const measurements = items.filter(it => it.title && it.description)
    return (
      <section
        className="measurements-section"
        style={{
          fontFamily: 'var(--font-body, inherit)',
          background: '#0a0a0a',
          padding: '20px 40px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Type Badges */}
        {typeBadges.length > 0 && (
          <div
            className="type-badges"
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '16px',
            }}
          >
            {typeBadges.map((badge, i) => (
              <span
                key={i}
                className="type-badge"
                style={{
                  padding: '4px 16px',
                  border: '1px solid #444',
                  borderRadius: '999px',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* Measurements Row */}
        <div
          className="measurements-list"
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '8px 24px',
            fontSize: '13px',
            color: 'rgba(255,255,255,0.7)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          {measurements.map((item, i) => (
            <div key={item.id} style={{ display: 'flex', gap: '6px' }}>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>
                {item.title}
              </span>
              <span
                {...elementProps(config.id, `items.${i}.description`, 'text')}
                style={{ color: 'white', fontWeight: 500 }}
              >
                {item.description}
              </span>
            </div>
          ))}
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════════════════
  // ZMR-EXPERIENCE — Grille expériences talent : auto-fill 280px, 4:3 images,
  // type badge blanc, titre/brand/role/year, fond #0a0a0a
  // ═══════════════════════════════════════════════════════
  if (variant === 'zmr-experience') {
    return (
      <section
        className="section-work"
        style={{
          fontFamily: 'var(--font-body, inherit)',
          background: '#0a0a0a',
          padding: '60px 40px',
        }}
      >
        {content.title && (
          <h2
            {...elementProps(config.id, 'title', 'heading')}
            className="text-center mb-10"
            style={{
              color: 'white',
              fontSize: 'clamp(22px, 3.5vw, 50px)',
              fontWeight: 900,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            {content.title}
          </h2>
        )}

        <div
          className="max-w-[1400px] mx-auto grid gap-6"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
        >
          {items.map((item, i) => (
            <div
              key={item.id}
              className="overflow-hidden transition-transform duration-300 hover:-translate-y-1"
              style={{ background: '#111', borderRadius: '4px', cursor: 'pointer' }}
            >
              {/* Image 4:3 */}
              <div className="relative" style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
                {item.icon && item.icon.startsWith('http') ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    {...elementProps(config.id, `items.${i}.icon`, 'image')}
                    src={item.icon}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                    <span className="text-4xl">{item.icon || '📸'}</span>
                  </div>
                )}
                {/* Type Badge */}
                <div
                  className="absolute top-3 left-3 px-3 py-1 rounded text-xs font-semibold uppercase"
                  style={{
                    background: 'white',
                    color: '#000',
                    fontSize: '10px',
                    letterSpacing: '0.1em',
                  }}
                >
                  {item.description?.split('|')[0]?.trim() || 'SHOW'}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3
                  {...elementProps(config.id, `items.${i}.title`, 'heading')}
                  style={{
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: 600,
                    margin: 0,
                    marginBottom: '6px',
                    letterSpacing: '0.02em',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '13px',
                    fontWeight: 300,
                    margin: 0,
                  }}
                >
                  {item.description?.split('|').slice(1).join(' · ').trim() || ''}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  // fallback → startup-grid
  return <FeaturesSection config={{ ...config, variant: 'startup-grid' }} />
}

export const featuresMeta = {
  type: 'features',
  label: 'Features',
  icon: '✦',
  variants: [
    'startup-grid', 'startup-bento', 'startup-list',
    'corporate-grid', 'corporate-bento', 'corporate-list',
    'luxe-grid', 'luxe-bento', 'luxe-list',
    'creative-grid', 'creative-bento', 'creative-list',
    'ecommerce-grid', 'ecommerce-bento', 'ecommerce-list',
    'glass-grid', 'glass-bento', 'glass-list',
    'brixsa-accordion',
    'brixsa-services',
    'brixsa-location',
    'zmr-events',
    'zmr-measurements',
    'zmr-experience',
  ],
  defaultVariant: 'startup-grid',
  defaultContent: {},
}
