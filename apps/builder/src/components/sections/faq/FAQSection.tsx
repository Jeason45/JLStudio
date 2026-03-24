'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { SectionConfig } from '@/types/site'
import type { FAQContent, FAQItem } from '@/types/sections'
import { getTitleSizeClass, getTextAlignClass } from '../_utils'
import { ChevronDown } from 'lucide-react'
import { elementProps } from '@/lib/elementHelpers'

interface FAQSectionProps {
  config: SectionConfig
  isEditing?: boolean
}

// ═══════════════════════════════════════════════════
// Accordion Items per universe
// ═══════════════════════════════════════════════════

function StartupAccordionItem({ item, accent, sectionId, itemIndex }: { item: FAQItem; accent: string; sectionId: string; itemIndex: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-zinc-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span {...elementProps(sectionId, `items.${itemIndex}.question`, 'heading')} className="font-medium text-sm text-zinc-900">{item.question}</span>
        <ChevronDown
          className={cn('w-4 h-4 shrink-0 transition-transform duration-200', open && 'rotate-180')}
          style={{ color: accent }}
        />
      </button>
      <div
        className={cn(
          'grid transition-all duration-200',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">
          <p {...elementProps(sectionId, `items.${itemIndex}.answer`, 'text')} className="pb-5 text-sm leading-relaxed text-zinc-500">{item.answer}</p>
        </div>
      </div>
    </div>
  )
}

function CorporateAccordionItem({ item, accent, sectionId, itemIndex }: { item: FAQItem; accent: string; sectionId: string; itemIndex: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-slate-700/50 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span {...elementProps(sectionId, `items.${itemIndex}.question`, 'heading')} className="font-medium text-sm text-white">{item.question}</span>
        <ChevronDown
          className={cn('w-4 h-4 shrink-0 transition-transform duration-200', open && 'rotate-180')}
          style={{ color: accent }}
        />
      </button>
      <div
        className={cn(
          'grid transition-all duration-200',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">
          <p {...elementProps(sectionId, `items.${itemIndex}.answer`, 'text')} className="pb-5 text-sm leading-relaxed text-slate-400">{item.answer}</p>
        </div>
      </div>
    </div>
  )
}

function LuxeAccordionItem({ item, accent, sectionId, itemIndex }: { item: FAQItem; accent: string; sectionId: string; itemIndex: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-zinc-100/60 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left gap-4"
      >
        <span {...elementProps(sectionId, `items.${itemIndex}.question`, 'heading')} className="font-light text-sm tracking-wide text-zinc-800">{item.question}</span>
        <span
          className="text-lg font-light shrink-0 select-none leading-none w-5 text-center transition-transform duration-200"
          style={{ color: accent }}
        >
          {open ? '\u2212' : '+'}
        </span>
      </button>
      <div
        className={cn(
          'grid transition-all duration-200',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">
          <p {...elementProps(sectionId, `items.${itemIndex}.answer`, 'text')} className="pb-6 text-sm font-light leading-relaxed text-zinc-500 tracking-wide">{item.answer}</p>
        </div>
      </div>
    </div>
  )
}

function CreativeAccordionItem({ item, sectionId, itemIndex }: { item: FAQItem; sectionId: string; itemIndex: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={cn('border-2 border-zinc-900 p-0', open ? 'bg-yellow-50' : 'bg-transparent')}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 px-5 text-left gap-4"
      >
        <span {...elementProps(sectionId, `items.${itemIndex}.question`, 'heading')} className="font-black text-sm text-zinc-900 uppercase tracking-tight">{item.question}</span>
        <ChevronDown
          className={cn('w-5 h-5 shrink-0 transition-transform duration-200 text-zinc-900', open && 'rotate-180')}
        />
      </button>
      <div
        className={cn(
          'grid transition-all duration-200',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">
          <p {...elementProps(sectionId, `items.${itemIndex}.answer`, 'text')} className="pb-4 px-5 text-sm leading-relaxed text-zinc-700">{item.answer}</p>
        </div>
      </div>
    </div>
  )
}

function EcommerceAccordionItem({ item, accent, sectionId, itemIndex }: { item: FAQItem; accent: string; sectionId: string; itemIndex: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className={cn(
        'rounded-xl border transition-colors duration-200',
        open ? 'bg-emerald-50/50 border-emerald-100' : 'bg-white border-zinc-100'
      )}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 px-5 text-left gap-4"
      >
        <span {...elementProps(sectionId, `items.${itemIndex}.question`, 'heading')} className="font-medium text-sm text-zinc-900">{item.question}</span>
        <ChevronDown
          className={cn('w-4 h-4 shrink-0 transition-transform duration-200', open && 'rotate-180')}
          style={{ color: accent }}
        />
      </button>
      <div
        className={cn(
          'grid transition-all duration-200',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">
          <p {...elementProps(sectionId, `items.${itemIndex}.answer`, 'text')} className="pb-4 px-5 text-sm leading-relaxed text-zinc-500">{item.answer}</p>
        </div>
      </div>
    </div>
  )
}

function BrixsaAccordionItem({ item, sectionId, itemIndex }: { item: FAQItem; sectionId: string; itemIndex: number }) {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
      <div
        role="button"
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 0',
          textAlign: 'left',
          gap: '16px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <span
          {...elementProps(sectionId, `items.${itemIndex}.question`, 'heading')}
          style={{
            fontFamily: "'GeneralSans Variable', sans-serif",
            fontSize: 'clamp(16px, 3vw, 20px)',
            fontWeight: 500,
            color: hovered ? 'var(--color-accent, #c8a97e)' : 'var(--color-background, #e1e1e1)',
            transition: 'color 0.2s ease',
            lineHeight: 1.4,
          }}
        >
          {item.question}
        </span>
        <span
          style={{
            fontSize: '24px',
            fontWeight: 300,
            flexShrink: 0,
            width: '28px',
            textAlign: 'center',
            lineHeight: 1,
            userSelect: 'none',
            color: hovered ? 'var(--color-accent, #c8a97e)' : 'var(--color-background, #e1e1e1)',
            transition: 'color 0.2s ease',
          }}
        >
          {open ? '\u2212' : '+'}
        </span>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          opacity: open ? 1 : 0,
          transition: 'grid-template-rows 0.2s ease, opacity 0.2s ease',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <p
            {...elementProps(sectionId, `items.${itemIndex}.answer`, 'text')}
            style={{
              fontFamily: "'Inter Variable', sans-serif",
              fontSize: '15px',
              lineHeight: 1.7,
              color: 'rgba(225,225,225,0.6)',
              paddingBottom: '24px',
              margin: 0,
            }}
          >
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

function GlassAccordionItem({ item, accent, sectionId, itemIndex }: { item: FAQItem; accent: string; sectionId: string; itemIndex: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/[0.06] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span {...elementProps(sectionId, `items.${itemIndex}.question`, 'heading')} className="font-medium text-sm text-white/90">{item.question}</span>
        <ChevronDown
          className={cn(
            'w-4 h-4 shrink-0 transition-transform duration-200',
            open && 'rotate-180'
          )}
          style={{ color: accent, filter: `drop-shadow(0 0 6px ${accent}60)` }}
        />
      </button>
      <div
        className={cn(
          'grid transition-all duration-200',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">
          <p {...elementProps(sectionId, `items.${itemIndex}.answer`, 'text')} className="pb-5 text-sm leading-relaxed text-white/50">{item.answer}</p>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// Main component
// ═══════════════════════════════════════════════════

export function FAQSection({ config }: FAQSectionProps) {
  const content = (config.content ?? {}) as Partial<FAQContent>
  const variant = config.variant ?? 'startup-accordion'
  const { accentColor, textColor: customTextColor, titleSize, textAlign } = config.style
  const items: FAQItem[] = content.items ?? []
  const universe = variant.split('-')[0]
  const layout = variant.replace(`${universe}-`, '')

  // ═══════════════════════════════════════════
  // STARTUP
  // ═══════════════════════════════════════════

  if (universe === 'startup') {
    const accent = accentColor ?? '#6366f1'

    const header = (
      <div className={cn("text-center mb-12 space-y-4", textAlign && getTextAlignClass(textAlign))}>
        {content.eyebrow && (
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full border border-zinc-200 text-zinc-600 bg-white shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
            {content.eyebrow}
          </span>
        )}
        {content.title && (
          <h2
            {...elementProps(config.id, 'title', 'heading')}
            className={cn("text-3xl md:text-4xl font-bold text-zinc-900 leading-tight", titleSize && getTitleSizeClass(titleSize))}
            style={customTextColor ? { color: customTextColor } : undefined}
          >
            {content.title}
          </h2>
        )}
        {content.subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-zinc-500 max-w-2xl mx-auto">{content.subtitle}</p>}
      </div>
    )

    if (layout === 'grid') {
      const mid = Math.ceil(items.length / 2)
      const left = items.slice(0, mid)
      const right = items.slice(mid)

      return (
        <section className="bg-zinc-50 py-20 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-5xl mx-auto px-6">
            {header}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
                <div className="px-6">
                  {left.map((item, i) => (
                    <StartupAccordionItem key={item.id} item={item} accent={accent} sectionId={config.id} itemIndex={i} />
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
                <div className="px-6">
                  {right.map((item, i) => (
                    <StartupAccordionItem key={item.id} item={item} accent={accent} sectionId={config.id} itemIndex={mid + i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    }

    // accordion (default)
    return (
      <section className="bg-zinc-50 py-20 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-3xl mx-auto px-6">
          {header}
          <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
            <div className="px-6">
              {items.map((item, i) => (
                <StartupAccordionItem key={item.id} item={item} accent={accent} sectionId={config.id} itemIndex={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // CORPORATE
  // ═══════════════════════════════════════════

  if (universe === 'corporate') {
    const accent = accentColor ?? '#3b82f6'

    const header = (
      <div className={cn("text-center mb-12 space-y-4", textAlign && getTextAlignClass(textAlign))}>
        {content.eyebrow && (
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded border text-blue-400 border-blue-500/30"
            style={accentColor ? { color: accentColor, borderColor: `${accentColor}4d` } : undefined}
          >
            {content.eyebrow}
          </span>
        )}
        {content.title && (
          <h2
            {...elementProps(config.id, 'title', 'heading')}
            className={cn("text-3xl md:text-4xl font-bold text-white leading-tight", titleSize && getTitleSizeClass(titleSize))}
            style={customTextColor ? { color: customTextColor } : undefined}
          >
            {content.title}
          </h2>
        )}
        {content.subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-slate-400 max-w-2xl mx-auto">{content.subtitle}</p>}
      </div>
    )

    if (layout === 'grid') {
      const mid = Math.ceil(items.length / 2)
      const left = items.slice(0, mid)
      const right = items.slice(mid)

      return (
        <section className="bg-slate-900 noise-overlay py-20 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-5xl mx-auto px-6">
            {header}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
                <div className="px-6">
                  {left.map((item, i) => (
                    <CorporateAccordionItem key={item.id} item={item} accent={accent} sectionId={config.id} itemIndex={i} />
                  ))}
                </div>
              </div>
              <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
                <div className="px-6">
                  {right.map((item, i) => (
                    <CorporateAccordionItem key={item.id} item={item} accent={accent} sectionId={config.id} itemIndex={mid + i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    }

    // accordion
    return (
      <section className="bg-slate-900 noise-overlay py-20 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-3xl mx-auto px-6">
          {header}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
            <div className="px-6">
              {items.map((item, i) => (
                <CorporateAccordionItem key={item.id} item={item} accent={accent} sectionId={config.id} itemIndex={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // LUXE
  // ═══════════════════════════════════════════

  if (universe === 'luxe') {
    const accent = accentColor ?? '#b8860b'

    const header = (
      <div className={cn("text-center mb-14 space-y-5", textAlign && getTextAlignClass(textAlign))}>
        {content.eyebrow && (
          <span
            className="inline-block text-[11px] font-light tracking-[0.25em] uppercase"
            style={{ color: accent }}
          >
            {content.eyebrow}
          </span>
        )}
        {content.title && (
          <h2
            {...elementProps(config.id, 'title', 'heading')}
            className={cn("text-3xl md:text-4xl font-light tracking-wide text-zinc-900 leading-tight", titleSize && getTitleSizeClass(titleSize))}
            style={customTextColor ? { color: customTextColor } : undefined}
          >
            {content.title}
          </h2>
        )}
        {content.subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base font-light text-zinc-500 max-w-2xl mx-auto tracking-wide">{content.subtitle}</p>}
        <div className="w-16 h-px mx-auto" style={{ backgroundColor: accent }} />
      </div>
    )

    if (layout === 'grid') {
      const mid = Math.ceil(items.length / 2)
      const left = items.slice(0, mid)
      const right = items.slice(mid)

      return (
        <section className="bg-white py-24 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-5xl mx-auto px-6">
            {header}
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                {left.map((item, i) => (
                  <LuxeAccordionItem key={item.id} item={item} accent={accent} sectionId={config.id} itemIndex={i} />
                ))}
              </div>
              <div>
                {right.map((item, i) => (
                  <LuxeAccordionItem key={item.id} item={item} accent={accent} sectionId={config.id} itemIndex={mid + i} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )
    }

    // accordion
    return (
      <section className="bg-white py-24 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-3xl mx-auto px-6">
          {header}
          <div>
            {items.map((item, i) => (
              <LuxeAccordionItem key={item.id} item={item} accent={accent} sectionId={config.id} itemIndex={i} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // CREATIVE
  // ═══════════════════════════════════════════

  if (universe === 'creative') {
    const header = (
      <div className={cn("mb-12 space-y-4", textAlign && getTextAlignClass(textAlign))}>
        {content.eyebrow && (
          <span className="inline-block text-xs font-black uppercase tracking-tight bg-yellow-300 text-zinc-900 px-3 py-1 border-2 border-zinc-900 rotate-[-1deg]">
            {content.eyebrow}
          </span>
        )}
        {content.title && (
          <h2
            {...elementProps(config.id, 'title', 'heading')}
            className={cn("text-3xl md:text-5xl font-black text-zinc-900 leading-none uppercase tracking-tight", titleSize && getTitleSizeClass(titleSize))}
            style={customTextColor ? { color: customTextColor } : undefined}
          >
            {content.title}
          </h2>
        )}
        {content.subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-zinc-600 max-w-2xl">{content.subtitle}</p>}
      </div>
    )

    if (layout === 'grid') {
      const mid = Math.ceil(items.length / 2)
      const left = items.slice(0, mid)
      const right = items.slice(mid)

      return (
        <section className="bg-[#f5f0e8] py-20 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-5xl mx-auto px-6">
            {header}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-[-2px]">
                {left.map((item, i) => (
                  <CreativeAccordionItem key={item.id} item={item} sectionId={config.id} itemIndex={i} />
                ))}
              </div>
              <div className="space-y-[-2px]">
                {right.map((item, i) => (
                  <CreativeAccordionItem key={item.id} item={item} sectionId={config.id} itemIndex={mid + i} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )
    }

    // accordion
    return (
      <section className="bg-[#f5f0e8] py-20 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-3xl mx-auto px-6">
          {header}
          <div className="space-y-[-2px]">
            {items.map((item, i) => (
              <CreativeAccordionItem key={item.id} item={item} sectionId={config.id} itemIndex={i} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // ECOMMERCE
  // ═══════════════════════════════════════════

  if (universe === 'ecommerce') {
    const accent = accentColor ?? '#059669'

    const header = (
      <div className={cn("text-center mb-12 space-y-4", textAlign && getTextAlignClass(textAlign))}>
        {content.eyebrow && (
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100"
            style={{ color: accent }}
          >
            {content.eyebrow}
          </span>
        )}
        {content.title && (
          <h2
            {...elementProps(config.id, 'title', 'heading')}
            className={cn("text-3xl md:text-4xl font-bold text-zinc-900 leading-tight", titleSize && getTitleSizeClass(titleSize))}
            style={customTextColor ? { color: customTextColor } : undefined}
          >
            {content.title}
          </h2>
        )}
        {content.subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-zinc-500 max-w-2xl mx-auto">{content.subtitle}</p>}
      </div>
    )

    if (layout === 'grid') {
      const mid = Math.ceil(items.length / 2)
      const left = items.slice(0, mid)
      const right = items.slice(mid)

      return (
        <section className="bg-white py-20 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-5xl mx-auto px-6">
            {header}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                {left.map((item, i) => (
                  <EcommerceAccordionItem key={item.id} item={item} accent={accent} sectionId={config.id} itemIndex={i} />
                ))}
              </div>
              <div className="space-y-3">
                {right.map((item, i) => (
                  <EcommerceAccordionItem key={item.id} item={item} accent={accent} sectionId={config.id} itemIndex={mid + i} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )
    }

    // accordion
    return (
      <section className="bg-white py-20 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-3xl mx-auto px-6">
          {header}
          <div className="space-y-3">
            {items.map((item, i) => (
              <EcommerceAccordionItem key={item.id} item={item} accent={accent} sectionId={config.id} itemIndex={i} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // BRIXSA
  // ═══════════════════════════════════════════

  if (universe === 'brixsa') {
    return (
      <section
        style={{
          backgroundColor: 'var(--color-foreground, #140c08)',
          padding: '96px 0',
          overflow: 'hidden',
          fontFamily: "'Inter Variable', sans-serif",
        }}
      >
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            {content.title && (
              <h2
                {...elementProps(config.id, 'title', 'heading')}
                style={{
                  fontFamily: "'GeneralSans Variable', sans-serif",
                  fontSize: '40px',
                  fontWeight: 600,
                  color: customTextColor ?? 'var(--color-background, #e1e1e1)',
                  lineHeight: 1.2,
                  margin: 0,
                  letterSpacing: '-0.01em',
                }}
              >
                {content.title}
              </h2>
            )}
            {content.subtitle && (
              <p
                {...elementProps(config.id, 'subtitle', 'text')}
                style={{
                  fontSize: '16px',
                  color: 'rgba(225,225,225,0.5)',
                  maxWidth: '540px',
                  margin: '16px auto 0',
                  lineHeight: 1.6,
                }}
              >
                {content.subtitle}
              </p>
            )}
          </div>
          <div>
            {items.map((item, i) => (
              <BrixsaAccordionItem key={item.id} item={item} sectionId={config.id} itemIndex={i} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // GLASS (default fallback)
  // ═══════════════════════════════════════════

  {
    const accent = accentColor ?? '#a78bfa'

    const header = (
      <div className={cn("text-center mb-12 space-y-4", textAlign && getTextAlignClass(textAlign))}>
        {content.eyebrow && (
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-white/40">
            {content.eyebrow}
          </span>
        )}
        {content.title && (
          <h2
            {...elementProps(config.id, 'title', 'heading')}
            className={cn("text-3xl md:text-4xl font-bold leading-tight gradient-text", titleSize && getTitleSizeClass(titleSize))}
            style={customTextColor ? { color: customTextColor } : undefined}
          >
            {content.title}
          </h2>
        )}
        {content.subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-white/40 max-w-2xl mx-auto">{content.subtitle}</p>}
      </div>
    )

    if (layout === 'grid') {
      const mid = Math.ceil(items.length / 2)
      const left = items.slice(0, mid)
      const right = items.slice(mid)

      return (
        <section className="bg-zinc-950 noise-overlay dot-grid py-20 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-5xl mx-auto px-6 relative z-10">
            {header}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/[0.06] overflow-hidden">
                <div className="px-6">
                  {left.map((item, i) => (
                    <GlassAccordionItem key={item.id} item={item} accent={accent} sectionId={config.id} itemIndex={i} />
                  ))}
                </div>
              </div>
              <div className="bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/[0.06] overflow-hidden">
                <div className="px-6">
                  {right.map((item, i) => (
                    <GlassAccordionItem key={item.id} item={item} accent={accent} sectionId={config.id} itemIndex={mid + i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    }

    // accordion
    return (
      <section className="bg-zinc-950 noise-overlay dot-grid py-20 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          {header}
          <div className="bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/[0.06] overflow-hidden">
            <div className="px-6">
              {items.map((item, i) => (
                <GlassAccordionItem key={item.id} item={item} accent={accent} sectionId={config.id} itemIndex={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export const faqMeta = {
  type: 'faq',
  label: 'FAQ',
  icon: '❓',
  variants: [
    'startup-accordion',
    'startup-grid',
    'corporate-accordion',
    'corporate-grid',
    'luxe-accordion',
    'luxe-grid',
    'creative-accordion',
    'creative-grid',
    'ecommerce-accordion',
    'ecommerce-grid',
    'glass-accordion',
    'glass-grid',
    'brixsa-accordion',
  ],
  defaultVariant: 'startup-accordion',
  defaultContent: {},
}
