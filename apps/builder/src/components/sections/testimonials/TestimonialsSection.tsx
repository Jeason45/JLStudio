'use client'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { SectionConfig, SectionTitleSize, SectionTextAlign } from '@/types/site'
import type { TestimonialsContent, TestimonialItem } from '@/types/sections'
import { useSectionCarousel } from '@/hooks/useSectionCarousel'
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react'
import { getTitleSizeClass, getTextAlignClass } from '../_utils'
import { elementProps } from '@/lib/elementHelpers'
import { DecorativeOrnament, FloatingIllustration } from '../_DecorativeOrnament'

interface TestimonialsSectionProps {
  config: SectionConfig
  isEditing?: boolean
}

// ─────────────────────────────────────────────
// STAR RATINGS — one per universe
// ─────────────────────────────────────────────

function StartupStars({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? 'text-amber-400' : 'text-zinc-200'}>★</span>
      ))}
    </div>
  )
}

function CorporateStars({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? 'text-amber-400' : 'text-white/20'}>★</span>
      ))}
    </div>
  )
}

function LuxeStars({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-1 mb-4 justify-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? 'text-sm' : 'text-sm text-zinc-300'} style={i < rating ? { color: '#b8860b' } : undefined}>★</span>
      ))}
    </div>
  )
}

function CreativeStars({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={cn('text-lg', i < rating ? 'text-zinc-900' : 'text-zinc-300')}>★</span>
      ))}
    </div>
  )
}

function EcommerceStars({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-0.5 mb-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={cn('text-base', i < rating ? 'text-amber-400' : 'text-zinc-200')}>★</span>
      ))}
    </div>
  )
}

function GlassStars({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={cn('text-base', i < rating ? 'text-amber-400' : 'text-white/20')}
          style={i < rating ? { textShadow: '0 0 8px rgba(251,191,36,0.6)' } : undefined}
        >★</span>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────
// NOISE OVERLAY helper
// ─────────────────────────────────────────────

function NoiseOverlay() {
  return (
    <div
      className="absolute inset-0 opacity-[0.03] pointer-events-none"
      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}
    />
  )
}

// ─────────────────────────────────────────────
// DOT GRID helper (glass universe)
// ─────────────────────────────────────────────

function DotGrid() {
  return (
    <div
      className="absolute inset-0 opacity-[0.07] pointer-events-none"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    />
  )
}

// ─────────────────────────────────────────────
// STARTUP — bg-zinc-50 / white, indigo accent, soft rounded cards
// ─────────────────────────────────────────────

function StartupHeader({ content, accent, styleOverrides, sectionId }: { content: Partial<TestimonialsContent>; accent: string; styleOverrides?: StyleOverrides; sectionId: string }) {
  const { titleSize, textAlign, textColor } = styleOverrides ?? {}
  return (
    <div className={cn("mb-12 text-center space-y-3", textAlign && getTextAlignClass(textAlign))}>
      {content.eyebrow && (
        <span
          className="inline-block text-xs font-semibold px-3 py-1 rounded-full text-indigo-600 bg-indigo-50 border border-indigo-100"
          style={{ backgroundColor: `${accent}15`, borderColor: `${accent}30`, color: accent }}
        >
          {content.eyebrow}
        </span>
      )}
      {content.title && <h2 {...elementProps(sectionId, 'title', 'heading')} className={cn("text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{content.title}</h2>}
      {content.subtitle && <p {...elementProps(sectionId, 'subtitle', 'text')} className="text-lg max-w-2xl mx-auto text-zinc-500">{content.subtitle}</p>}
    </div>
  )
}

function StartupCard({ item, accent, large, sectionId, itemIndex }: { item: TestimonialItem; accent: string; large?: boolean; sectionId: string; itemIndex: number }) {
  return (
    <div className={cn('rounded-2xl p-6 bg-white border border-zinc-100 shadow-sm', large && 'flex flex-col justify-center')}>
      <StartupStars rating={item.rating} />
      <p {...elementProps(sectionId, `items.${itemIndex}.quote`, 'text')} className={cn('leading-relaxed mb-4 text-zinc-500', large ? 'text-lg mb-6' : 'text-sm')}>&ldquo;{item.quote}&rdquo;</p>
      <div className="flex items-center gap-3">
        <div
          {...elementProps(sectionId, `items.${itemIndex}.avatar`, 'image')}
          className={cn('rounded-full flex items-center justify-center font-bold shrink-0', large ? 'w-12 h-12 text-lg' : 'w-9 h-9 text-sm')}
          style={{ backgroundColor: `${accent}15`, color: accent }}
        >
          {item.author.charAt(0)}
        </div>
        <div>
          <p {...elementProps(sectionId, `items.${itemIndex}.author`, 'text')} className={cn('font-semibold text-zinc-900', large ? 'text-base' : 'text-sm')}>{item.author}</p>
          <p {...elementProps(sectionId, `items.${itemIndex}.role`, 'text')} className={cn('text-zinc-500', large ? 'text-sm' : 'text-xs')}>{item.role}{item.company ? ` · ${item.company}` : ''}</p>
        </div>
      </div>
    </div>
  )
}

function StartupGrid({ content, items, accent, styleOverrides, sectionId }: { content: Partial<TestimonialsContent>; items: TestimonialItem[]; accent: string; styleOverrides?: StyleOverrides; sectionId: string }) {
  return (
    <section className="bg-zinc-50 py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <StartupHeader content={content} accent={accent} styleOverrides={styleOverrides} sectionId={sectionId} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => <StartupCard key={item.id} item={item} accent={accent} sectionId={sectionId} itemIndex={i} />)}
        </div>
      </div>
    </section>
  )
}

function StartupFeatured({ content, items, accent, styleOverrides, sectionId }: { content: Partial<TestimonialsContent>; items: TestimonialItem[]; accent: string; styleOverrides?: StyleOverrides; sectionId: string }) {
  const [main, ...rest] = items
  return (
    <section className="bg-zinc-50 py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <StartupHeader content={content} accent={accent} styleOverrides={styleOverrides} sectionId={sectionId} />
        <div className="grid lg:grid-cols-2 gap-6">
          <StartupCard item={main} accent={accent} large sectionId={sectionId} itemIndex={0} />
          <div className="space-y-4">
            {rest.map((item, i) => <StartupCard key={item.id} item={item} accent={accent} sectionId={sectionId} itemIndex={i + 1} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

function StartupMarquee({ content, items, accent, styleOverrides, sectionId }: { content: Partial<TestimonialsContent>; items: TestimonialItem[]; accent: string; styleOverrides?: StyleOverrides; sectionId: string }) {
  const doubled = [...items, ...items]
  return (
    <section className="bg-zinc-50 py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <StartupHeader content={content} accent={accent} styleOverrides={styleOverrides} sectionId={sectionId} />
      </div>
      <div className="overflow-hidden relative">
        <div className="flex gap-6 animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]" style={{ width: 'max-content' }}>
          {doubled.map((item, i) => (
            <div key={`${item.id}-${i}`} className="w-[320px] shrink-0">
              <StartupCard item={item} accent={accent} sectionId={sectionId} itemIndex={i % items.length} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// CORPORATE — bg-slate-900, noise, blue accent, structured cards
// ─────────────────────────────────────────────

function CorporateHeader({ content, accent, styleOverrides, sectionId }: { content: Partial<TestimonialsContent>; accent: string; styleOverrides?: StyleOverrides; sectionId: string }) {
  const { titleSize, textAlign, textColor } = styleOverrides ?? {}
  return (
    <div className={cn("mb-12 text-center space-y-3", textAlign && getTextAlignClass(textAlign))}>
      {content.eyebrow && (
        <span
          className="inline-block text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded text-blue-300 bg-blue-500/10 border border-blue-500/20"
          style={{ borderColor: `${accent}30`, color: `${accent}cc` }}
        >
          {content.eyebrow}
        </span>
      )}
      {content.title && <h2 {...elementProps(sectionId, 'title', 'heading')} className={cn("text-3xl md:text-4xl lg:text-5xl font-bold text-white", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{content.title}</h2>}
      {content.subtitle && <p {...elementProps(sectionId, 'subtitle', 'text')} className="text-lg max-w-2xl mx-auto text-slate-400">{content.subtitle}</p>}
    </div>
  )
}

function CorporateCard({ item, accent, large, sectionId, itemIndex }: { item: TestimonialItem; accent: string; large?: boolean; sectionId: string; itemIndex: number }) {
  return (
    <div
      className={cn('rounded-xl p-6 bg-slate-800/60 border border-slate-700', large && 'flex flex-col justify-center')}
      style={{ borderLeftWidth: '3px', borderLeftColor: accent }}
    >
      <CorporateStars rating={item.rating} />
      <p {...elementProps(sectionId, `items.${itemIndex}.quote`, 'text')} className={cn('leading-relaxed mb-4 text-slate-300', large ? 'text-lg mb-6' : 'text-sm')}>&ldquo;{item.quote}&rdquo;</p>
      <div className="flex items-center gap-3">
        <div {...elementProps(sectionId, `items.${itemIndex}.avatar`, 'image')} className={cn('rounded-full flex items-center justify-center font-bold shrink-0 bg-blue-500/20 text-blue-300', large ? 'w-12 h-12 text-lg' : 'w-9 h-9 text-sm')}>
          {item.author.charAt(0)}
        </div>
        <div>
          <p {...elementProps(sectionId, `items.${itemIndex}.author`, 'text')} className={cn('font-semibold text-white', large ? 'text-base' : 'text-sm')}>{item.author}</p>
          <p {...elementProps(sectionId, `items.${itemIndex}.role`, 'text')} className={cn('text-slate-400', large ? 'text-sm' : 'text-xs')}>{item.role}{item.company ? ` · ${item.company}` : ''}</p>
        </div>
      </div>
    </div>
  )
}

function CorporateGrid({ content, items, accent, styleOverrides, sectionId }: { content: Partial<TestimonialsContent>; items: TestimonialItem[]; accent: string; styleOverrides?: StyleOverrides; sectionId: string }) {
  return (
    <section className="relative bg-slate-900 py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
      <NoiseOverlay />
      <div className="relative max-w-6xl mx-auto px-6">
        <CorporateHeader content={content} accent={accent} styleOverrides={styleOverrides} sectionId={sectionId} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => <CorporateCard key={item.id} item={item} accent={accent} sectionId={sectionId} itemIndex={i} />)}
        </div>
      </div>
    </section>
  )
}

function CorporateFeatured({ content, items, accent, styleOverrides, sectionId }: { content: Partial<TestimonialsContent>; items: TestimonialItem[]; accent: string; styleOverrides?: StyleOverrides; sectionId: string }) {
  const [main, ...rest] = items
  return (
    <section className="relative bg-slate-900 py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
      <NoiseOverlay />
      <div className="relative max-w-6xl mx-auto px-6">
        <CorporateHeader content={content} accent={accent} styleOverrides={styleOverrides} sectionId={sectionId} />
        <div className="grid lg:grid-cols-2 gap-6">
          <CorporateCard item={main} accent={accent} large sectionId={sectionId} itemIndex={0} />
          <div className="space-y-4">
            {rest.map((item, i) => <CorporateCard key={item.id} item={item} accent={accent} sectionId={sectionId} itemIndex={i + 1} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

function CorporateMarquee({ content, items, accent, styleOverrides, sectionId }: { content: Partial<TestimonialsContent>; items: TestimonialItem[]; accent: string; styleOverrides?: StyleOverrides; sectionId: string }) {
  const doubled = [...items, ...items]
  return (
    <section className="relative bg-slate-900 py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
      <NoiseOverlay />
      <div className="relative max-w-6xl mx-auto px-6">
        <CorporateHeader content={content} accent={accent} styleOverrides={styleOverrides} sectionId={sectionId} />
      </div>
      <div className="overflow-hidden relative">
        <div className="flex gap-6 animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]" style={{ width: 'max-content' }}>
          {doubled.map((item, i) => (
            <div key={`${item.id}-${i}`} className="w-[320px] shrink-0">
              <CorporateCard item={item} accent={accent} sectionId={sectionId} itemIndex={i % items.length} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// LUXE — bg-white / zinc-50, gold, font-light, tracking-wide, italic quotes, gold dividers
// ─────────────────────────────────────────────

function LuxeHeader({ content, styleOverrides, sectionId, arrows }: { content: Partial<TestimonialsContent>; styleOverrides?: StyleOverrides; sectionId: string; arrows?: React.ReactNode }) {
  const { titleSize, textAlign, textColor } = styleOverrides ?? {}
  const hasDecorativeIcon = !!content.decorativeIcon
  return (
    <div className={cn("mb-16 space-y-4", arrows ? "text-left" : "text-center", textAlign && getTextAlignClass(textAlign))}>
      {hasDecorativeIcon && <DecorativeOrnament color="#b8860b" iconUrl={typeof content.decorativeIcon === 'string' && content.decorativeIcon.startsWith('http') ? content.decorativeIcon : undefined} />}
      {content.eyebrow && (
        <span className="inline-block text-[11px] font-light tracking-[0.25em] uppercase" style={{ color: '#b8860b' }}>
          {content.eyebrow}
        </span>
      )}
      {content.title && (
        <div className={cn(arrows && "flex items-start justify-between gap-8")}>
          <div>
            <h2 {...elementProps(sectionId, 'title', 'heading')} className={cn("text-3xl md:text-4xl lg:text-5xl font-black tracking-wide text-zinc-900", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{content.title}</h2>
          </div>
          {arrows}
        </div>
      )}
      {content.subtitle && <p {...elementProps(sectionId, 'subtitle', 'text')} className={cn("text-base text-zinc-400 font-light tracking-wide", !arrows && "max-w-2xl mx-auto")}>{content.subtitle}</p>}
    </div>
  )
}

function LuxeCard({ item, large, horizontal, sectionId, itemIndex }: { item: TestimonialItem; large?: boolean; horizontal?: boolean; sectionId: string; itemIndex: number }) {
  if (horizontal) {
    return (
      <div className="bg-white rounded-sm p-6 flex gap-5 border border-zinc-100 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
        {item.avatar && (
          // eslint-disable-next-line @next/next/no-img-element
          <img {...elementProps(sectionId, `items.${itemIndex}.avatar`, 'image')} src={item.avatar} alt={item.author || ''} className="w-20 h-20 rounded-sm object-cover shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <LuxeStars rating={item.rating} />
          <p {...elementProps(sectionId, `items.${itemIndex}.quote`, 'text')} className="text-sm font-bold text-zinc-900 mb-2">
            &ldquo;{item.quote}&rdquo;
          </p>
          {item.description && (
            <p {...elementProps(sectionId, `items.${itemIndex}.description`, 'text')} className="text-sm text-zinc-500 font-light leading-relaxed mb-4">
              {item.description}
            </p>
          )}
          <div className="flex items-center gap-3 pt-2">
            <p {...elementProps(sectionId, `items.${itemIndex}.author`, 'text')} className="text-sm font-bold tracking-wide text-zinc-900">{item.author}</p>
            {item.role && (
              <>
                <div className="w-px h-4 bg-zinc-300" />
                <p {...elementProps(sectionId, `items.${itemIndex}.role`, 'text')} className="text-xs text-zinc-400 font-light tracking-wide">{item.role}{item.company ? ` · ${item.company}` : ''}</p>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('p-8 text-center', large && 'flex flex-col justify-center')}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {item.avatar && <img {...elementProps(sectionId, `items.${itemIndex}.avatar`, 'image')} src={item.avatar} alt={item.author || ''} className="w-16 h-16 rounded-full object-cover mx-auto mb-4" />}
      <LuxeStars rating={item.rating} />
      <p {...elementProps(sectionId, `items.${itemIndex}.quote`, 'text')} className={cn('leading-relaxed mb-4 italic text-zinc-900 font-medium', large ? 'text-xl' : 'text-sm')}>
        &ldquo;{item.quote}&rdquo;
      </p>
      {item.description && (
        <p {...elementProps(sectionId, `items.${itemIndex}.description`, 'text')} className="text-sm text-zinc-500 font-light leading-relaxed mb-6 max-w-lg mx-auto">
          {item.description}
        </p>
      )}
      <div className="mx-auto w-8 h-px mb-4" style={{ backgroundColor: '#b8860b' }} />
      <p {...elementProps(sectionId, `items.${itemIndex}.author`, 'text')} className="text-sm font-medium tracking-wide text-zinc-900">{item.author}</p>
      <p {...elementProps(sectionId, `items.${itemIndex}.role`, 'text')} className="text-xs text-zinc-400 font-light tracking-wide mt-1">{item.role}{item.company ? ` · ${item.company}` : ''}</p>
    </div>
  )
}

function LuxeGrid({ content, items, styleOverrides, sectionId }: { content: Partial<TestimonialsContent>; items: TestimonialItem[]; styleOverrides?: StyleOverrides; sectionId: string }) {
  return (
    <section className="bg-white py-24 relative overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
      <div className="max-w-6xl mx-auto px-6 relative">
        <LuxeHeader content={content} styleOverrides={styleOverrides} sectionId={sectionId} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0 divide-x divide-zinc-100">
          {items.map((item, i) => <LuxeCard key={item.id} item={item} sectionId={sectionId} itemIndex={i} />)}
        </div>
      </div>
    </section>
  )
}

function LuxeFeatured({ content, items, styleOverrides, sectionId }: { content: Partial<TestimonialsContent>; items: TestimonialItem[]; styleOverrides?: StyleOverrides; sectionId: string }) {
  const [main, ...rest] = items
  return (
    <section className="bg-white py-24 relative overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
      <div className="max-w-6xl mx-auto px-6 relative">
        <LuxeHeader content={content} styleOverrides={styleOverrides} sectionId={sectionId} />
        <div className="grid lg:grid-cols-2 gap-0 divide-x divide-zinc-100">
          <LuxeCard item={main} large sectionId={sectionId} itemIndex={0} />
          <div className="divide-y divide-zinc-100">
            {rest.map((item, i) => <LuxeCard key={item.id} item={item} sectionId={sectionId} itemIndex={i + 1} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

function LuxeMarquee({ content, items, styleOverrides, sectionId }: { content: Partial<TestimonialsContent>; items: TestimonialItem[]; styleOverrides?: StyleOverrides; sectionId: string }) {
  const doubled = [...items, ...items]
  return (
    <section className="bg-zinc-50 py-24 relative overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
      <div className="max-w-6xl mx-auto px-6 relative">
        <LuxeHeader content={content} styleOverrides={styleOverrides} sectionId={sectionId} />
      </div>
      <div className="overflow-hidden relative">
        <div className="flex gap-0 animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]" style={{ width: 'max-content' }}>
          {doubled.map((item, i) => (
            <div key={`${item.id}-${i}`} className="w-[360px] shrink-0 border-r border-zinc-200">
              <LuxeCard item={item} sectionId={sectionId} itemIndex={i % items.length} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// CREATIVE — neobrutalist, crème bg, thick borders, big quote marks
// ─────────────────────────────────────────────

function CreativeHeader({ content, styleOverrides, sectionId }: { content: Partial<TestimonialsContent>; styleOverrides?: StyleOverrides; sectionId: string }) {
  const { titleSize, textAlign, textColor } = styleOverrides ?? {}
  return (
    <div className={cn("mb-12 text-left space-y-3", textAlign && getTextAlignClass(textAlign))}>
      {content.eyebrow && (
        <span className="inline-block text-xs font-black uppercase tracking-wider px-3 py-1 bg-zinc-900 text-white border-2 border-zinc-900">
          {content.eyebrow}
        </span>
      )}
      {content.title && <h2 {...elementProps(sectionId, 'title', 'heading')} className={cn("text-3xl md:text-4xl lg:text-5xl font-black text-zinc-900 uppercase", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{content.title}</h2>}
      {content.subtitle && <p {...elementProps(sectionId, 'subtitle', 'text')} className="text-lg max-w-2xl text-zinc-600 font-medium">{content.subtitle}</p>}
    </div>
  )
}

function CreativeCard({ item, large, sectionId, itemIndex }: { item: TestimonialItem; large?: boolean; sectionId: string; itemIndex: number }) {
  return (
    <div className={cn(
      'p-6 bg-white border-2 border-zinc-900 shadow-[4px_4px_0_0_#18181b]',
      large && 'flex flex-col justify-center'
    )}>
      <span className="text-4xl font-black text-zinc-900 leading-none mb-2 block">&ldquo;</span>
      <CreativeStars rating={item.rating} />
      <p {...elementProps(sectionId, `items.${itemIndex}.quote`, 'text')} className={cn('leading-relaxed mb-4 text-zinc-700 font-medium', large ? 'text-lg mb-6' : 'text-sm')}>
        {item.quote}
      </p>
      <div className="flex items-center gap-3 pt-4 border-t-2 border-zinc-900">
        <div {...elementProps(sectionId, `items.${itemIndex}.avatar`, 'image')} className={cn(
          'rounded-none flex items-center justify-center font-black shrink-0 bg-zinc-900 text-white',
          large ? 'w-12 h-12 text-lg' : 'w-9 h-9 text-sm'
        )}>
          {item.author.charAt(0)}
        </div>
        <div>
          <p {...elementProps(sectionId, `items.${itemIndex}.author`, 'text')} className={cn('font-black text-zinc-900 uppercase', large ? 'text-base' : 'text-sm')}>{item.author}</p>
          <p {...elementProps(sectionId, `items.${itemIndex}.role`, 'text')} className={cn('text-zinc-500 font-medium', large ? 'text-sm' : 'text-xs')}>{item.role}{item.company ? ` · ${item.company}` : ''}</p>
        </div>
      </div>
    </div>
  )
}

function CreativeGrid({ content, items, styleOverrides, sectionId }: { content: Partial<TestimonialsContent>; items: TestimonialItem[]; styleOverrides?: StyleOverrides; sectionId: string }) {
  return (
    <section className="bg-[#f5f0e8] py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <CreativeHeader content={content} styleOverrides={styleOverrides} sectionId={sectionId} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => <CreativeCard key={item.id} item={item} sectionId={sectionId} itemIndex={i} />)}
        </div>
      </div>
    </section>
  )
}

function CreativeFeatured({ content, items, styleOverrides, sectionId }: { content: Partial<TestimonialsContent>; items: TestimonialItem[]; styleOverrides?: StyleOverrides; sectionId: string }) {
  const [main, ...rest] = items
  return (
    <section className="bg-[#f5f0e8] py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <CreativeHeader content={content} styleOverrides={styleOverrides} sectionId={sectionId} />
        <div className="grid lg:grid-cols-2 gap-6">
          <CreativeCard item={main} large sectionId={sectionId} itemIndex={0} />
          <div className="space-y-4">
            {rest.map((item, i) => <CreativeCard key={item.id} item={item} sectionId={sectionId} itemIndex={i + 1} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

function CreativeMarquee({ content, items, styleOverrides, sectionId }: { content: Partial<TestimonialsContent>; items: TestimonialItem[]; styleOverrides?: StyleOverrides; sectionId: string }) {
  const doubled = [...items, ...items]
  return (
    <section className="bg-[#f5f0e8] py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <CreativeHeader content={content} styleOverrides={styleOverrides} sectionId={sectionId} />
      </div>
      <div className="overflow-hidden relative">
        <div className="flex gap-6 animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]" style={{ width: 'max-content' }}>
          {doubled.map((item, i) => (
            <div key={`${item.id}-${i}`} className="w-[320px] shrink-0">
              <CreativeCard item={item} sectionId={sectionId} itemIndex={i % items.length} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// ECOMMERCE — bg-white, green accent, star ratings, "Achat verifie" badge
// ─────────────────────────────────────────────

function EcommerceHeader({ content, accent, styleOverrides, sectionId }: { content: Partial<TestimonialsContent>; accent: string; styleOverrides?: StyleOverrides; sectionId: string }) {
  const { titleSize, textAlign, textColor } = styleOverrides ?? {}
  return (
    <div className={cn("mb-12 text-center space-y-3", textAlign && getTextAlignClass(textAlign))}>
      {content.eyebrow && (
        <span
          className="inline-block text-xs font-semibold px-3 py-1 rounded-full border"
          style={{ backgroundColor: `${accent}10`, borderColor: `${accent}30`, color: accent }}
        >
          {content.eyebrow}
        </span>
      )}
      {content.title && <h2 {...elementProps(sectionId, 'title', 'heading')} className={cn("text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{content.title}</h2>}
      {content.subtitle && <p {...elementProps(sectionId, 'subtitle', 'text')} className="text-lg max-w-2xl mx-auto text-zinc-500">{content.subtitle}</p>}
    </div>
  )
}

function EcommerceCard({ item, accent, large, sectionId, itemIndex }: { item: TestimonialItem; accent: string; large?: boolean; sectionId: string; itemIndex: number }) {
  return (
    <div className={cn('rounded-xl p-6 bg-white border border-zinc-200 shadow-sm', large && 'flex flex-col justify-center')}>
      <div className="flex items-center justify-between mb-3">
        <EcommerceStars rating={item.rating} />
        <span
          className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full"
          style={{ backgroundColor: `${accent}12`, color: accent }}
        >
          Achat v&eacute;rifi&eacute; ✓
        </span>
      </div>
      <p {...elementProps(sectionId, `items.${itemIndex}.quote`, 'text')} className={cn('leading-relaxed mb-4 text-zinc-600', large ? 'text-lg mb-6' : 'text-sm')}>&ldquo;{item.quote}&rdquo;</p>
      <div className="flex items-center gap-3">
        <div
          {...elementProps(sectionId, `items.${itemIndex}.avatar`, 'image')}
          className={cn('rounded-full flex items-center justify-center font-bold shrink-0', large ? 'w-12 h-12 text-lg' : 'w-9 h-9 text-sm')}
          style={{ backgroundColor: `${accent}15`, color: accent }}
        >
          {item.author.charAt(0)}
        </div>
        <div>
          <p {...elementProps(sectionId, `items.${itemIndex}.author`, 'text')} className={cn('font-semibold text-zinc-900', large ? 'text-base' : 'text-sm')}>{item.author}</p>
          <p {...elementProps(sectionId, `items.${itemIndex}.role`, 'text')} className={cn('text-zinc-400', large ? 'text-sm' : 'text-xs')}>{item.role}{item.company ? ` · ${item.company}` : ''}</p>
        </div>
      </div>
    </div>
  )
}

function EcommerceGrid({ content, items, accent, styleOverrides, sectionId }: { content: Partial<TestimonialsContent>; items: TestimonialItem[]; accent: string; styleOverrides?: StyleOverrides; sectionId: string }) {
  return (
    <section className="bg-white py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <EcommerceHeader content={content} accent={accent} styleOverrides={styleOverrides} sectionId={sectionId} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => <EcommerceCard key={item.id} item={item} accent={accent} sectionId={sectionId} itemIndex={i} />)}
        </div>
      </div>
    </section>
  )
}

function EcommerceFeatured({ content, items, accent, styleOverrides, sectionId }: { content: Partial<TestimonialsContent>; items: TestimonialItem[]; accent: string; styleOverrides?: StyleOverrides; sectionId: string }) {
  const [main, ...rest] = items
  return (
    <section className="bg-white py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <EcommerceHeader content={content} accent={accent} styleOverrides={styleOverrides} sectionId={sectionId} />
        <div className="grid lg:grid-cols-2 gap-6">
          <EcommerceCard item={main} accent={accent} large sectionId={sectionId} itemIndex={0} />
          <div className="space-y-4">
            {rest.map((item, i) => <EcommerceCard key={item.id} item={item} accent={accent} sectionId={sectionId} itemIndex={i + 1} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

function EcommerceMarquee({ content, items, accent, styleOverrides, sectionId }: { content: Partial<TestimonialsContent>; items: TestimonialItem[]; accent: string; styleOverrides?: StyleOverrides; sectionId: string }) {
  const doubled = [...items, ...items]
  return (
    <section className="bg-white py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <EcommerceHeader content={content} accent={accent} styleOverrides={styleOverrides} sectionId={sectionId} />
      </div>
      <div className="overflow-hidden relative">
        <div className="flex gap-6 animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]" style={{ width: 'max-content' }}>
          {doubled.map((item, i) => (
            <div key={`${item.id}-${i}`} className="w-[320px] shrink-0">
              <EcommerceCard item={item} accent={accent} sectionId={sectionId} itemIndex={i % items.length} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// GLASS — bg-zinc-950, noise, dot-grid, glassmorphism, gradient-text, glow
// ─────────────────────────────────────────────

function GlassHeader({ content, accent, styleOverrides, sectionId }: { content: Partial<TestimonialsContent>; accent: string; styleOverrides?: StyleOverrides; sectionId: string }) {
  const { titleSize, textAlign, textColor } = styleOverrides ?? {}
  return (
    <div className={cn("mb-12 text-center space-y-3", textAlign && getTextAlignClass(textAlign))}>
      {content.eyebrow && (
        <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
          {content.eyebrow}
        </span>
      )}
      {content.title && (
        <h2
          {...elementProps(sectionId, 'title', 'heading')}
          className={cn("text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent", titleSize && getTitleSizeClass(titleSize))}
          style={textColor ? { color: textColor } : { backgroundImage: `linear-gradient(135deg, #fff 0%, ${accent} 50%, #a78bfa 100%)` }}
        >
          {content.title}
        </h2>
      )}
      {content.subtitle && <p {...elementProps(sectionId, 'subtitle', 'text')} className="text-lg max-w-2xl mx-auto text-white/50">{content.subtitle}</p>}
    </div>
  )
}

function GlassCard({ item, accent, large, sectionId, itemIndex }: { item: TestimonialItem; accent: string; large?: boolean; sectionId: string; itemIndex: number }) {
  return (
    <div
      className={cn(
        'rounded-2xl p-6 backdrop-blur-xl bg-white/[0.05] border border-white/[0.08] shadow-lg',
        large && 'flex flex-col justify-center'
      )}
      style={{ boxShadow: `0 0 40px -12px ${accent}20` }}
    >
      <GlassStars rating={item.rating} />
      <p {...elementProps(sectionId, `items.${itemIndex}.quote`, 'text')} className={cn('leading-relaxed mb-4 text-white/60', large ? 'text-lg mb-6' : 'text-sm')}>&ldquo;{item.quote}&rdquo;</p>
      <div className="flex items-center gap-3">
        <div
          {...elementProps(sectionId, `items.${itemIndex}.avatar`, 'image')}
          className={cn('rounded-full flex items-center justify-center font-bold shrink-0 bg-white/10 text-white/80', large ? 'w-12 h-12 text-lg' : 'w-9 h-9 text-sm')}
        >
          {item.author.charAt(0)}
        </div>
        <div>
          <p {...elementProps(sectionId, `items.${itemIndex}.author`, 'text')} className={cn('font-semibold text-white', large ? 'text-base' : 'text-sm')}>{item.author}</p>
          <p {...elementProps(sectionId, `items.${itemIndex}.role`, 'text')} className={cn('text-white/40', large ? 'text-sm' : 'text-xs')}>{item.role}{item.company ? ` · ${item.company}` : ''}</p>
        </div>
      </div>
    </div>
  )
}

function GlassGrid({ content, items, accent, styleOverrides, sectionId }: { content: Partial<TestimonialsContent>; items: TestimonialItem[]; accent: string; styleOverrides?: StyleOverrides; sectionId: string }) {
  return (
    <section className="relative bg-zinc-950 py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
      <NoiseOverlay />
      <DotGrid />
      <div className="relative max-w-6xl mx-auto px-6">
        <GlassHeader content={content} accent={accent} styleOverrides={styleOverrides} sectionId={sectionId} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => <GlassCard key={item.id} item={item} accent={accent} sectionId={sectionId} itemIndex={i} />)}
        </div>
      </div>
    </section>
  )
}

function GlassFeatured({ content, items, accent, styleOverrides, sectionId }: { content: Partial<TestimonialsContent>; items: TestimonialItem[]; accent: string; styleOverrides?: StyleOverrides; sectionId: string }) {
  const [main, ...rest] = items
  return (
    <section className="relative bg-zinc-950 py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
      <NoiseOverlay />
      <DotGrid />
      <div className="relative max-w-6xl mx-auto px-6">
        <GlassHeader content={content} accent={accent} styleOverrides={styleOverrides} sectionId={sectionId} />
        <div className="grid lg:grid-cols-2 gap-6">
          <GlassCard item={main} accent={accent} large sectionId={sectionId} itemIndex={0} />
          <div className="space-y-4">
            {rest.map((item, i) => <GlassCard key={item.id} item={item} accent={accent} sectionId={sectionId} itemIndex={i + 1} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

function GlassMarquee({ content, items, accent, styleOverrides, sectionId }: { content: Partial<TestimonialsContent>; items: TestimonialItem[]; accent: string; styleOverrides?: StyleOverrides; sectionId: string }) {
  const doubled = [...items, ...items]
  return (
    <section className="relative bg-zinc-950 py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
      <NoiseOverlay />
      <DotGrid />
      <div className="relative max-w-6xl mx-auto px-6">
        <GlassHeader content={content} accent={accent} styleOverrides={styleOverrides} sectionId={sectionId} />
      </div>
      <div className="overflow-hidden relative">
        <div className="flex gap-6 animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]" style={{ width: 'max-content' }}>
          {doubled.map((item, i) => (
            <div key={`${item.id}-${i}`} className="w-[320px] shrink-0">
              <GlassCard item={item} accent={accent} sectionId={sectionId} itemIndex={i % items.length} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// BRIXSA — 50/50 Image + Quote Slider, warm black bg
// ─────────────────────────────────────────────

function CanopyCards({ content, items, sectionId, styleOverrides }: { content: Partial<TestimonialsContent>; items: TestimonialItem[]; accent: string; styleOverrides?: StyleOverrides; sectionId: string }) {
  const displayItems = items.slice(0, 6)

  const scrollRevealRef = (index: number) => (el: HTMLDivElement | null) => {
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(30px)'
    el.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
        obs.disconnect()
      }
    }, { threshold: 0.1 })
    obs.observe(el)
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .canopy-testimonial-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .canopy-testimonial-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 24px rgba(0,0,0,0.1);
        }
        @media (max-width: 768px) {
          .canopy-testimonials-grid {
            grid-template-columns: 1fr !important;
          }
        }
      ` }} />
      <section
        {...elementProps(sectionId, 'wrapper', 'container', 'Testimonials Section')}
        style={{
          backgroundColor: '#F0EDE8',
          padding: 'clamp(60px, 8vw, 100px) 24px',
          fontFamily: 'var(--font-body, inherit)',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
          <h2
            {...elementProps(sectionId, 'title', 'heading')}
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: styleOverrides?.textColor ?? '#1A1A1A',
              lineHeight: 1.2,
              marginBottom: 12,
            }}
          >
            {content.title || 'Ce que disent nos clients'}
          </h2>
          {content.subtitle && (
            <p
              {...elementProps(sectionId, 'subtitle', 'text')}
              style={{ fontSize: 16, color: '#666', lineHeight: 1.6 }}
            >
              {content.subtitle}
            </p>
          )}
        </div>

        {/* Cards grid */}
        <div
          className="canopy-testimonials-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
            maxWidth: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          {displayItems.map((item, i) => {
            const rating = item.rating ?? 5
            return (
              <div
                key={item.id ?? i}
                ref={scrollRevealRef(i)}
                className="canopy-testimonial-card"
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: 32,
                  boxShadow: '0 1px 10px rgba(0,0,0,0.05)',
                }}
              >
                {/* Stars */}
                <div style={{ marginBottom: 16 }}>
                  {Array.from({ length: 5 }).map((_, si) => (
                    <span key={si} style={{ color: si < rating ? '#D4A853' : '#E0E0E0', fontSize: 18, marginRight: 2 }}>&#9733;</span>
                  ))}
                </div>

                {/* Quote */}
                <p
                  {...elementProps(sectionId, `items.${i}.quote`, 'text')}
                  style={{
                    fontSize: 16,
                    color: '#333',
                    fontStyle: 'italic',
                    lineHeight: 1.6,
                    marginBottom: 20,
                  }}
                >
                  &ldquo;{item.quote || 'Une experience exceptionnelle.'}&rdquo;
                </p>

                {/* Divider */}
                <div style={{ height: 1, backgroundColor: '#E8E8E5', marginBottom: 16 }} />

                {/* Author */}
                <p
                  {...elementProps(sectionId, `items.${i}.author`, 'text')}
                  style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', marginBottom: 2 }}
                >
                  {item.author || 'Client'}
                </p>
                <p
                  {...elementProps(sectionId, `items.${i}.role`, 'text')}
                  style={{ fontSize: 13, color: '#666' }}
                >
                  {item.role || ''}
                </p>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

function ObscuraFeatured({ content, items, sectionId }: { content: Partial<TestimonialsContent>; items: TestimonialItem[]; accent: string; styleOverrides?: StyleOverrides; sectionId: string }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const defaultQuotes = [
    'Chaque image raconte une histoire unique. Le regard artistique et la sensibilité de ce photographe ont sublimé notre mariage.',
    'Un professionnel d\'exception qui sait capturer l\'essence d\'un instant. Les portraits sont d\'une qualité remarquable.',
    'La séance photo a été un moment magique. Le résultat dépasse toutes nos attentes, chaque cliché est une oeuvre d\'art.',
  ]

  const quotes = items.length > 0
    ? items.map((item, i) => item.quote || defaultQuotes[i % defaultQuotes.length])
    : defaultQuotes

  const authors = items.length > 0
    ? items.map((item, i) => ({ name: item.author || ['Alexandre M.', 'Claire D.', 'Thomas B.'][i % 3], role: item.role || 'Client' }))
    : [
        { name: 'Alexandre M.', role: 'Portrait studio' },
        { name: 'Claire D.', role: 'Mariage' },
        { name: 'Thomas B.', role: 'Événement corporate' },
      ]

  const total = quotes.length

  const goPrev = () => setActiveIndex((prev) => (prev - 1 + total) % total)
  const goNext = () => setActiveIndex((prev) => (prev + 1) % total)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total)
    }, 7000)
    return () => clearInterval(timer)
  }, [total])

  const initialsGradients = [
    'linear-gradient(135deg, #1a1a18 0%, #2a2520 50%, #1a1510 100%)',
    'linear-gradient(135deg, #1a1a1a 0%, #252018 50%, #181510 100%)',
    'linear-gradient(135deg, #181818 0%, #22201a 50%, #161410 100%)',
  ]

  return (
    <section {...elementProps(sectionId, 'wrapper', 'container', 'Testimonials Section')} style={{ backgroundColor: '#0A0A0A', color: '#E8E4DF', fontFamily: 'var(--font-body, inherit)' }}>
      <style>{`
        @media (max-width: 768px) {
          .obscura-testimonial-split { flex-direction: column !important; }
          .obscura-testimonial-split > div { flex: 1 1 100% !important; min-height: 50vh; }
        }
      `}</style>
      <div {...elementProps(sectionId, 'splitLayout', 'container', 'Split Layout')} className="obscura-testimonial-split flex flex-row w-full" style={{ minHeight: '620px' }}>
        {/* LEFT — Initials (50%) */}
        <div {...elementProps(sectionId, 'imagePanel', 'container', 'Initials Panel')} className="relative overflow-hidden flex items-center justify-center" style={{ flex: '1 1 50%', backgroundColor: '#0A0A0A' }}>
          {Array.from({ length: total }).map((_, i) => {
            const item = items[i]
            const gradIdx = i % initialsGradients.length
            const initials = (item?.author || authors[i]?.name || 'CL').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
            return (
              <div
                key={item?.id ?? i}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background: initialsGradients[gradIdx],
                  opacity: i === activeIndex ? 1 : 0,
                  zIndex: i === activeIndex ? 2 : 0,
                  transition: 'opacity 0.6s ease',
                }}
              >
                {item?.avatar ? (
                  <img
                    {...elementProps(sectionId, `items.${i}.avatar`, 'image')}
                    src={item.avatar}
                    alt={item.author || ''}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <span
                    style={{
                      fontFamily: '"GeneralSans Variable", sans-serif',
                      fontSize: 'clamp(6rem, 4rem + 8vw, 12rem)',
                      fontWeight: 700,
                      color: '#D4A853',
                      lineHeight: 1,
                      userSelect: 'none',
                    }}
                  >
                    {initials}
                  </span>
                )}
              </div>
            )
          })}
        </div>

        {/* RIGHT — Content (50%) */}
        <div {...elementProps(sectionId, 'contentPanel', 'container', 'Content Panel')} className="flex flex-col" style={{ flex: '1 1 50%', backgroundColor: '#111111', color: '#E8E4DF', padding: '60px' }}>
          {/* Top label */}
          <p
            {...elementProps(sectionId, 'eyebrow', 'text')}
            style={{ fontSize: '14px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D4A853', marginBottom: 'auto' }}
          >
            {content.eyebrow || content.title || 'Témoignages'}
          </p>

          {/* Main content */}
          <div className="flex flex-col" style={{ maxWidth: '536px', marginTop: 'auto', marginLeft: 'auto' }}>
            {/* Quote text wrap */}
            <div style={{ marginTop: 'auto', marginBottom: '40px', marginLeft: 'auto' }}>
              {quotes.map((quote, i) => (
                <div key={items[i]?.id ?? i} style={{ display: i === activeIndex ? 'block' : 'none' }}>
                  <p
                    {...elementProps(sectionId, `items.${i}.quote`, 'text')}
                    style={{
                      fontFamily: '"GeneralSans Variable", var(--font-body, sans-serif)',
                      fontSize: 'clamp(1.5rem, 1.0714rem + 1.9048vw, 2.5rem)',
                      fontWeight: 400,
                      fontStyle: 'italic',
                      lineHeight: '135%',
                      color: '#E8E4DF',
                    }}
                  >
                    &ldquo;{quote}&rdquo;
                  </p>
                  {/* Author */}
                  <div style={{ marginTop: '24px' }}>
                    <p
                      {...elementProps(sectionId, `items.${i}.author`, 'text')}
                      style={{ fontSize: '16px', fontWeight: 600, color: '#E8E4DF' }}
                    >
                      {authors[i]?.name}
                    </p>
                    <p
                      {...elementProps(sectionId, `items.${i}.role`, 'text')}
                      style={{ fontSize: '14px', fontWeight: 400, color: '#8A8480', marginTop: '4px' }}
                    >
                      {authors[i]?.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation arrows */}
            {total > 1 && (
              <div {...elementProps(sectionId, 'navArrows', 'container', 'Nav Arrows')} style={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
                <div
                  {...elementProps(sectionId, 'prevButton', 'button', 'Previous')}
                  role="button"
                  onClick={goPrev}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    border: '1px solid rgba(212, 168, 83, 0.4)',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s, border-color 0.3s',
                    padding: 0,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(212, 168, 83, 0.15)'; e.currentTarget.style.borderColor = 'rgba(212, 168, 83, 0.7)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(212, 168, 83, 0.4)' }}
                >
                  <span {...elementProps(sectionId, 'prevIcon', 'icon', 'Previous Arrow')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
                      <path d="M15 6L9 12L15 18" stroke="#D4A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
                <div
                  {...elementProps(sectionId, 'nextButton', 'button', 'Next')}
                  role="button"
                  onClick={goNext}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    border: '1px solid rgba(212, 168, 83, 0.4)',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s, border-color 0.3s',
                    padding: 0,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(212, 168, 83, 0.15)'; e.currentTarget.style.borderColor = 'rgba(212, 168, 83, 0.7)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(212, 168, 83, 0.4)' }}
                >
                  <span {...elementProps(sectionId, 'nextIcon', 'icon', 'Next Arrow')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
                      <path d="M9 6L15 12L9 18" stroke="#D4A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function NacreFeatured({ content, items, sectionId }: { content: Partial<TestimonialsContent>; items: TestimonialItem[]; accent: string; styleOverrides?: StyleOverrides; sectionId: string }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const defaultQuotes = [
    'Un moment de d\u00E9tente absolu. Mes ongles n\'ont jamais \u00E9t\u00E9 aussi beaux, le nail art est une vraie \u0153uvre d\'art\u00A0!',
    'L\'\u00E9quipe est aux petits soins, l\'ambiance est zen et le r\u00E9sultat toujours impeccable. Mon adresse beaut\u00E9 pr\u00E9f\u00E9r\u00E9e.',
    'Je recommande les yeux ferm\u00E9s\u00A0! La pose de gel tient 3 semaines sans probl\u00E8me et les finitions sont parfaites.',
    'Un salon qui allie expertise et raffinement. Chaque visite est un vrai moment de plaisir.',
  ]

  const quotes = items.length > 0
    ? items.map((item, i) => item.quote || defaultQuotes[i % defaultQuotes.length])
    : defaultQuotes

  const authors = items.length > 0
    ? items.map((item, i) => ({ name: item.author || ['Camille L.', 'Sophie M.', 'Isabelle R.', 'Marie D.'][i % 4], role: item.role || 'Cliente fid\u00E8le' }))
    : [
        { name: 'Camille L.', role: 'Cliente fid\u00E8le' },
        { name: 'Sophie M.', role: 'Abonn\u00E9e annuelle' },
        { name: 'Isabelle R.', role: 'Nouvelle cliente' },
        { name: 'Marie D.', role: 'Cliente VIP' },
      ]

  const total = quotes.length

  const goPrev = () => setActiveIndex((prev) => (prev - 1 + total) % total)
  const goNext = () => setActiveIndex((prev) => (prev + 1) % total)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total)
    }, 7000)
    return () => clearInterval(timer)
  }, [total])

  const initialsGradients = [
    'linear-gradient(135deg, #e8d5cd 0%, #d4bfb5 50%, #c4a99c 100%)',
    'linear-gradient(135deg, #dcc8be 0%, #c9b3a8 50%, #b89e92 100%)',
    'linear-gradient(135deg, #e2cfc5 0%, #d1bab0 50%, #c0a59a 100%)',
    'linear-gradient(135deg, #ddc5bc 0%, #ccb0a5 50%, #bb9b8e 100%)',
  ]

  return (
    <section {...elementProps(sectionId, 'wrapper', 'container', 'Testimonials Section')} style={{ backgroundColor: '#2A1A1E', color: '#F0E0DA', fontFamily: 'var(--font-body, inherit)' }}>
      <style>{`
        @media (max-width: 768px) {
          .nacre-testimonial-split { flex-direction: column !important; }
          .nacre-testimonial-split > div { flex: 1 1 100% !important; min-height: 50vh; }
        }
      `}</style>
      <div {...elementProps(sectionId, 'splitLayout', 'container', 'Split Layout')} className="nacre-testimonial-split flex flex-row w-full" style={{ minHeight: '620px' }}>
        {/* LEFT — Initials (50%) */}
        <div {...elementProps(sectionId, 'imagePanel', 'container', 'Initials Panel')} className="relative overflow-hidden flex items-center justify-center" style={{ flex: '1 1 50%', backgroundColor: '#F5E6E0' }}>
          {Array.from({ length: total }).map((_, i) => {
            const item = items[i]
            const gradIdx = i % initialsGradients.length
            const initials = (item?.author || authors[i]?.name || 'CL').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
            return (
              <div
                key={item?.id ?? i}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background: initialsGradients[gradIdx],
                  opacity: i === activeIndex ? 1 : 0,
                  zIndex: i === activeIndex ? 2 : 0,
                  transition: 'opacity 0.6s ease',
                }}
              >
                {item?.avatar ? (
                  <img
                    {...elementProps(sectionId, `items.${i}.avatar`, 'image')}
                    src={item.avatar}
                    alt={item.author || ''}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <span
                    style={{
                      fontFamily: '"GeneralSans Variable", sans-serif',
                      fontSize: 'clamp(6rem, 4rem + 8vw, 12rem)',
                      fontWeight: 700,
                      color: '#C9A96E',
                      lineHeight: 1,
                      userSelect: 'none',
                    }}
                  >
                    {initials}
                  </span>
                )}
              </div>
            )
          })}
        </div>

        {/* RIGHT — Content (50%) */}
        <div {...elementProps(sectionId, 'contentPanel', 'container', 'Content Panel')} className="flex flex-col" style={{ flex: '1 1 50%', backgroundColor: '#2A1A1E', color: '#F0E0DA', padding: '60px' }}>
          {/* Top label */}
          <p
            {...elementProps(sectionId, 'eyebrow', 'text')}
            style={{ fontSize: '14px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: 'auto' }}
          >
            {content.eyebrow || content.title || 'Ce que disent nos clientes'}
          </p>

          {/* Main content */}
          <div className="flex flex-col" style={{ maxWidth: '536px', marginTop: 'auto', marginLeft: 'auto' }}>
            {/* Quote text wrap */}
            <div style={{ marginTop: 'auto', marginBottom: '40px', marginLeft: 'auto' }}>
              {quotes.map((quote, i) => (
                <div key={items[i]?.id ?? i} style={{ display: i === activeIndex ? 'block' : 'none' }}>
                  <p
                    {...elementProps(sectionId, `items.${i}.quote`, 'text')}
                    style={{
                      fontFamily: '"GeneralSans Variable", var(--font-body, sans-serif)',
                      fontSize: 'clamp(1.5rem, 1.0714rem + 1.9048vw, 2.5rem)',
                      fontWeight: 400,
                      fontStyle: 'italic',
                      lineHeight: '135%',
                      color: '#F0E0DA',
                    }}
                  >
                    &ldquo;{quote}&rdquo;
                  </p>
                  {/* Author */}
                  <div style={{ marginTop: '24px' }}>
                    <p
                      {...elementProps(sectionId, `items.${i}.author`, 'text')}
                      style={{ fontSize: '16px', fontWeight: 600, color: '#F0E0DA' }}
                    >
                      {authors[i]?.name}
                    </p>
                    <p
                      {...elementProps(sectionId, `items.${i}.role`, 'text')}
                      style={{ fontSize: '14px', fontWeight: 400, color: '#8A7A75', marginTop: '4px' }}
                    >
                      {authors[i]?.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation arrows */}
            {total > 1 && (
              <div {...elementProps(sectionId, 'navArrows', 'container', 'Nav Arrows')} style={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
                <div
                  {...elementProps(sectionId, 'prevButton', 'button', 'Previous')}
                  role="button"
                  onClick={goPrev}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(197, 169, 110, 0.3)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                    padding: 0,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(197, 169, 110, 0.5)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(197, 169, 110, 0.3)' }}
                >
                  <span {...elementProps(sectionId, 'prevIcon', 'icon', 'Previous Arrow')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
                      <path d="M15 6L9 12L15 18" stroke="#F0E0DA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
                <div
                  {...elementProps(sectionId, 'nextButton', 'button', 'Next')}
                  role="button"
                  onClick={goNext}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(197, 169, 110, 0.3)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                    padding: 0,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(197, 169, 110, 0.5)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(197, 169, 110, 0.3)' }}
                >
                  <span {...elementProps(sectionId, 'nextIcon', 'icon', 'Next Arrow')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
                      <path d="M9 6L15 12L9 18" stroke="#F0E0DA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function BrixsaFeatured({ content, items, sectionId }: { content: Partial<TestimonialsContent>; items: TestimonialItem[]; accent: string; styleOverrides?: StyleOverrides; sectionId: string }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const defaultQuotes = [
    'Your real estate team made the process enjoyable and professional. We\'re thrilled with our new home!',
    'The website was user-friendly with detailed listings and effective search filters, simplifying the home-buying process.',
    'The website facilitated my home search with detailed photos and descriptions. Contacting agents was straightforward.',
    'The website allowed me to efficiently browse listings and compare prices. Its clear layout and fast loading were convenient.',
    'It was a fantastic experience working with your real estate team! The agent was professional and made the process seamless.',
  ]

  const quotes = items.length > 0
    ? items.map((item, i) => item.quote || defaultQuotes[i % defaultQuotes.length])
    : defaultQuotes

  const total = quotes.length

  const goPrev = () => setActiveIndex((prev) => (prev - 1 + total) % total)
  const goNext = () => setActiveIndex((prev) => (prev + 1) % total)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total)
    }, 7000)
    return () => clearInterval(timer)
  }, [total])

  const imageGradients = [
    'linear-gradient(135deg, #3a2a1a 0%, #5c4033 50%, #2a1a0a 100%)',
    'linear-gradient(135deg, #2a3a1a 0%, #405c33 50%, #1a2a0a 100%)',
    'linear-gradient(135deg, #1a2a3a 0%, #33405c 50%, #0a1a2a 100%)',
    'linear-gradient(135deg, #3a1a2a 0%, #5c3340 50%, #2a0a1a 100%)',
  ]

  return (
    <section {...elementProps(sectionId, 'wrapper', 'container', 'Testimonials Section')} style={{ backgroundColor: '#140c08', color: '#e1e1e1', fontFamily: 'var(--font-body, inherit)' }}>
      <div {...elementProps(sectionId, 'splitLayout', 'container', 'Split Layout')} className="flex flex-row w-full" style={{ aspectRatio: '1440/860' }}>
        {/* LEFT — Images (50%) */}
        <div {...elementProps(sectionId, 'imagePanel', 'container', 'Image Panel')} className="relative overflow-hidden" style={{ flex: '1 1 50%' }}>
          {Array.from({ length: total }).map((_, i) => {
            const item = items[i]
            const imgIdx = i % imageGradients.length
            return (
              <div
                key={item?.id ?? i}
                className="absolute inset-0"
                style={{
                  background: imageGradients[imgIdx],
                  opacity: i === activeIndex ? 1 : 0,
                  zIndex: i === activeIndex ? 2 : 0,
                  transition: 'opacity 0.6s ease',
                }}
              >
                {item?.avatar && (
                  <img
                    {...elementProps(sectionId, `items.${i}.avatar`, 'image')}
                    src={item.avatar}
                    alt={item.author || ''}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* RIGHT — Content (50%) */}
        <div {...elementProps(sectionId, 'contentPanel', 'container', 'Content Panel')} className="flex flex-col" style={{ flex: '1 1 50%', backgroundColor: '#140c08', color: '#e1e1e1', padding: '60px' }}>
          {/* Top label */}
          <p
            {...elementProps(sectionId, 'eyebrow', 'text')}
            style={{ fontSize: '16px', fontWeight: 400, color: '#e1e1e1', marginBottom: 'auto' }}
          >
            {content.eyebrow || content.title || 'The satisfaction of our customer'}
          </p>

          {/* Main content */}
          <div className="flex flex-col" style={{ maxWidth: '536px', marginTop: 'auto', marginLeft: 'auto' }}>
            {/* Quote text wrap */}
            <div style={{ marginTop: 'auto', marginBottom: '80px', marginLeft: 'auto' }}>
              {quotes.map((quote, i) => (
                <div key={items[i]?.id ?? i} style={{ display: i === activeIndex ? 'block' : 'none' }}>
                  <p
                    {...elementProps(sectionId, `items.${i}.quote`, 'text')}
                    style={{
                      fontFamily: 'GeneralSans Variable, var(--font-body, sans-serif)',
                      fontSize: 'clamp(1.5rem, 1.0714rem + 1.9048vw, 2.5rem)',
                      fontWeight: 400,
                      lineHeight: '125%',
                      color: '#e1e1e1',
                    }}
                  >
                    &ldquo;{quote}&rdquo;
                  </p>
                </div>
              ))}
            </div>

            {/* Navigation arrows */}
            {total > 1 && (
              <div {...elementProps(sectionId, 'navArrows', 'container', 'Nav Arrows')} style={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
                <div
                  {...elementProps(sectionId, 'prevButton', 'button', 'Previous')}
                  role="button"
                  onClick={goPrev}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                    padding: 0,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)' }}
                >
                  <span {...elementProps(sectionId, 'prevIcon', 'icon', 'Previous Arrow')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
                      <path d="M15 6L9 12L15 18" stroke="#e1e1e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
                <div
                  {...elementProps(sectionId, 'nextButton', 'button', 'Next')}
                  role="button"
                  onClick={goNext}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                    padding: 0,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)' }}
                >
                  <span {...elementProps(sectionId, 'nextIcon', 'icon', 'Next Arrow')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
                      <path d="M9 6L15 12L9 18" stroke="#e1e1e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// BRAISE — Restaurant Featured Testimonial
// ─────────────────────────────────────────────

function BraiseFeatured({ content, items, sectionId }: { content: Partial<TestimonialsContent>; items: TestimonialItem[]; accent: string; styleOverrides?: StyleOverrides; sectionId: string }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const defaultQuotes = [
    'Une exp\u00E9rience culinaire exceptionnelle. Chaque plat est une \u0153uvre d\u2019art, le service est irr\u00E9prochable.',
    'Le chef sublime les produits du terroir avec une cr\u00E9ativit\u00E9 remarquable. Une adresse incontournable.',
    'L\u2019ambiance feutr\u00E9e, les saveurs d\u00E9licates\u2026 Un moment suspendu dans le temps.',
  ]

  const defaultAuthors = [
    { name: 'Laurent M.', role: 'Guide Michelin' },
    { name: 'Marie-Claire D.', role: 'Critique gastronomique' },
    { name: 'Philippe R.', role: 'Client fid\u00E8le' },
  ]

  const quotes = items.length > 0
    ? items.map((item, i) => item.quote || defaultQuotes[i % defaultQuotes.length])
    : defaultQuotes

  const authors = items.length > 0
    ? items.map((item, i) => ({ name: item.author || defaultAuthors[i % defaultAuthors.length].name, role: item.role || defaultAuthors[i % defaultAuthors.length].role }))
    : defaultAuthors

  const total = quotes.length

  const goPrev = () => setActiveIndex((prev) => (prev - 1 + total) % total)
  const goNext = () => setActiveIndex((prev) => (prev + 1) % total)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total)
    }, 7000)
    return () => clearInterval(timer)
  }, [total])

  return (
    <section {...elementProps(sectionId, 'wrapper', 'container', 'Testimonials Section')} style={{ backgroundColor: '#1A1209', color: '#E8E4DF', fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif" }}>
      <style>{`
        @media (max-width: 768px) {
          .braise-testimonial-split { flex-direction: column !important; }
          .braise-testimonial-split > div { flex: 1 1 100% !important; min-height: 50vh; }
        }
      `}</style>
      <div {...elementProps(sectionId, 'splitLayout', 'container', 'Split Layout')} className="braise-testimonial-split flex flex-row w-full" style={{ minHeight: '620px' }}>
        {/* LEFT — Quote (50%) */}
        <div {...elementProps(sectionId, 'contentPanel', 'container', 'Content Panel')} className="flex flex-col" style={{ flex: '1 1 50%', backgroundColor: '#F5F0E8', color: '#1A1209', padding: '60px' }}>
          {/* Top label */}
          <p
            {...elementProps(sectionId, 'eyebrow', 'text')}
            style={{ fontSize: '14px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: 'auto' }}
          >
            {content.eyebrow || content.title || 'T\u00E9moignages'}
          </p>

          {/* Main content */}
          <div className="flex flex-col" style={{ maxWidth: '536px', marginTop: 'auto', marginLeft: 'auto' }}>
            {/* Quote text wrap */}
            <div style={{ marginTop: 'auto', marginBottom: '40px', marginLeft: 'auto' }}>
              {quotes.map((quote, i) => (
                <div key={items[i]?.id ?? i} style={{ display: i === activeIndex ? 'block' : 'none' }}>
                  <p
                    {...elementProps(sectionId, `items.${i}.quote`, 'text')}
                    style={{
                      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                      fontSize: 'clamp(1.5rem, 1.0714rem + 1.9048vw, 2.5rem)',
                      fontWeight: 400,
                      fontStyle: 'italic',
                      lineHeight: '135%',
                      color: '#1A1209',
                    }}
                  >
                    &ldquo;{quote}&rdquo;
                  </p>
                  {/* Author */}
                  <div style={{ marginTop: '24px' }}>
                    <p
                      {...elementProps(sectionId, `items.${i}.author`, 'text')}
                      style={{ fontSize: '16px', fontWeight: 600, color: '#1A1209' }}
                    >
                      {authors[i]?.name}
                    </p>
                    <p
                      {...elementProps(sectionId, `items.${i}.role`, 'text')}
                      style={{ fontSize: '14px', fontWeight: 400, color: '#6B5D4F', marginTop: '4px' }}
                    >
                      {authors[i]?.role}
                    </p>
                    {/* Gold stars */}
                    <div style={{ display: 'flex', gap: '4px', marginTop: '12px' }}>
                      {Array.from({ length: 5 }).map((_, s) => (
                        <span key={s} style={{ color: '#C8A96E', fontSize: '14px' }}>&#9733;</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation dots */}
            {total > 1 && (
              <div {...elementProps(sectionId, 'navDots', 'container', 'Nav Dots')} style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
                {Array.from({ length: total }).map((_, i) => (
                  <div
                    key={i}
                    role="button"
                    onClick={() => setActiveIndex(i)}
                    style={{
                      width: i === activeIndex ? '32px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      backgroundColor: i === activeIndex ? '#C8A96E' : 'rgba(26, 18, 9, 0.2)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — Large Initial (50%) */}
        <div {...elementProps(sectionId, 'imagePanel', 'container', 'Initials Panel')} className="relative overflow-hidden flex items-center justify-center" style={{ flex: '1 1 50%', backgroundColor: '#1A1209' }}>
          {Array.from({ length: total }).map((_, i) => {
            const item = items[i]
            const initial = (item?.author || authors[i]?.name || 'L').charAt(0).toUpperCase()
            return (
              <div
                key={item?.id ?? i}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  backgroundColor: '#1A1209',
                  opacity: i === activeIndex ? 1 : 0,
                  zIndex: i === activeIndex ? 2 : 0,
                  transition: 'opacity 0.6s ease',
                }}
              >
                {item?.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    {...elementProps(sectionId, `items.${i}.avatar`, 'image')}
                    src={item.avatar}
                    alt={item.author || ''}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <span
                    style={{
                      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                      fontSize: 'clamp(8rem, 6rem + 10vw, 16rem)',
                      fontWeight: 700,
                      color: '#C8A96E',
                      lineHeight: 1,
                      userSelect: 'none',
                      opacity: 0.9,
                    }}
                  >
                    {initial}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// FORGE — Sports Coach Featured Testimonial
// ─────────────────────────────────────────────

function ForgeFeatured({ content, items, sectionId }: { content: Partial<TestimonialsContent>; items: TestimonialItem[]; accent: string; styleOverrides?: StyleOverrides; sectionId: string }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const defaultQuotes = [
    'J\u2019ai perdu 15kg en 4 mois gr\u00E2ce au programme personnalis\u00E9. Le suivi est exceptionnel, chaque s\u00E9ance est un d\u00E9fi motivant.',
    'Le coaching priv\u00E9 a transform\u00E9 ma condition physique. Les r\u00E9sultats sont au-del\u00E0 de mes attentes.',
    'L\u2019approche nutrition + sport est la cl\u00E9. En 3 mois, j\u2019ai gagn\u00E9 en masse musculaire et en \u00E9nergie.',
  ]

  const defaultAuthors = [
    { name: 'Alexandre T.', role: 'Programme Perte de Poids' },
    { name: 'Julie M.', role: 'Coaching Priv\u00E9' },
    { name: 'Marc D.', role: 'Programme Complet' },
  ]

  const quotes = items.length > 0
    ? items.map((item, i) => item.quote || defaultQuotes[i % defaultQuotes.length])
    : defaultQuotes

  const authors = items.length > 0
    ? items.map((item, i) => ({ name: item.author || defaultAuthors[i % defaultAuthors.length].name, role: item.role || defaultAuthors[i % defaultAuthors.length].role }))
    : defaultAuthors

  const total = quotes.length

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total)
    }, 7000)
    return () => clearInterval(timer)
  }, [total])

  return (
    <section {...elementProps(sectionId, 'wrapper', 'container', 'Testimonials Section')} style={{ backgroundColor: '#0A0A0A', color: '#E8E8E8', fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif" }}>
      <style>{`
        @media (max-width: 768px) {
          .forge-testimonial-split { flex-direction: column !important; }
          .forge-testimonial-split > div { flex: 1 1 100% !important; min-height: 50vh; }
        }
      `}</style>
      <div {...elementProps(sectionId, 'splitLayout', 'container', 'Split Layout')} className="forge-testimonial-split flex flex-row w-full" style={{ minHeight: '620px' }}>
        {/* LEFT — Quote (50%) */}
        <div {...elementProps(sectionId, 'contentPanel', 'container', 'Content Panel')} className="flex flex-col" style={{ flex: '1 1 50%', backgroundColor: '#1A1A1A', color: '#E8E8E8', padding: '60px' }}>
          {/* Top label */}
          <p
            {...elementProps(sectionId, 'eyebrow', 'text')}
            style={{ fontSize: '14px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FF4D00', marginBottom: 'auto' }}
          >
            {content.eyebrow || content.title || 'T\u00E9moignages'}
          </p>

          {/* Main content */}
          <div className="flex flex-col" style={{ maxWidth: '536px', marginTop: 'auto', marginLeft: 'auto' }}>
            {/* Quote text wrap */}
            <div style={{ marginTop: 'auto', marginBottom: '40px', marginLeft: 'auto' }}>
              {quotes.map((quote, i) => (
                <div key={items[i]?.id ?? i} style={{ display: i === activeIndex ? 'block' : 'none' }}>
                  <p
                    {...elementProps(sectionId, `items.${i}.quote`, 'text')}
                    style={{
                      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                      fontSize: 'clamp(1.5rem, 1.0714rem + 1.9048vw, 2.5rem)',
                      fontWeight: 400,
                      fontStyle: 'italic',
                      lineHeight: '135%',
                      color: '#E8E8E8',
                    }}
                  >
                    &ldquo;{quote}&rdquo;
                  </p>
                  {/* Author */}
                  <div style={{ marginTop: '24px' }}>
                    <p
                      {...elementProps(sectionId, `items.${i}.author`, 'text')}
                      style={{ fontSize: '16px', fontWeight: 600, color: '#E8E8E8' }}
                    >
                      {authors[i]?.name}
                    </p>
                    <p
                      {...elementProps(sectionId, `items.${i}.role`, 'text')}
                      style={{ fontSize: '14px', fontWeight: 400, color: '#888888', marginTop: '4px' }}
                    >
                      {authors[i]?.role}
                    </p>
                    {/* Orange stars */}
                    <div style={{ display: 'flex', gap: '4px', marginTop: '12px' }}>
                      {Array.from({ length: 5 }).map((_, s) => (
                        <span key={s} style={{ color: '#FF4D00', fontSize: '14px' }}>&#9733;</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation dots */}
            {total > 1 && (
              <div {...elementProps(sectionId, 'navDots', 'container', 'Nav Dots')} style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
                {Array.from({ length: total }).map((_, i) => (
                  <div
                    key={i}
                    role="button"
                    onClick={() => setActiveIndex(i)}
                    style={{
                      width: i === activeIndex ? '32px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      backgroundColor: i === activeIndex ? '#FF4D00' : 'rgba(232, 232, 232, 0.2)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — Large Initial (50%) */}
        <div {...elementProps(sectionId, 'imagePanel', 'container', 'Initials Panel')} className="relative overflow-hidden flex items-center justify-center" style={{ flex: '1 1 50%', backgroundColor: '#0A0A0A' }}>
          {Array.from({ length: total }).map((_, i) => {
            const item = items[i]
            const initial = (item?.author || authors[i]?.name || 'A').charAt(0).toUpperCase()
            return (
              <div
                key={item?.id ?? i}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  backgroundColor: '#0A0A0A',
                  opacity: i === activeIndex ? 1 : 0,
                  zIndex: i === activeIndex ? 2 : 0,
                  transition: 'opacity 0.6s ease',
                }}
              >
                {item?.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    {...elementProps(sectionId, `items.${i}.avatar`, 'image')}
                    src={item.avatar}
                    alt={item.author || ''}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <span
                    style={{
                      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                      fontSize: 'clamp(8rem, 6rem + 10vw, 16rem)',
                      fontWeight: 700,
                      color: '#FF4D00',
                      lineHeight: 1,
                      userSelect: 'none',
                      opacity: 0.9,
                    }}
                  >
                    {initial}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// CISEAUX — Hair Salon Featured Testimonial
// ─────────────────────────────────────────────

function CiseauxFeatured({ content, items, sectionId }: { content: Partial<TestimonialsContent>; items: TestimonialItem[]; accent: string; styleOverrides?: StyleOverrides; sectionId: string }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const defaultQuotes = [
    'Sophie a su trouver la coupe parfaite pour mon visage. Je n\u2019ai jamais re\u00E7u autant de compliments !',
    'Le balayage est magnifique et naturel. L\u2019\u00E9quipe prend le temps d\u2019\u00E9couter et de conseiller.',
    'Ambiance chaleureuse, produits premium et r\u00E9sultat impeccable. Mon salon depuis 5 ans.',
  ]

  const defaultAuthors = [
    { name: 'Am\u00E9lie R.', role: 'Cliente fid\u00E8le' },
    { name: 'Nathalie B.', role: 'Coloration' },
    { name: 'Christophe L.', role: 'Coupe homme' },
  ]

  const quotes = items.length > 0
    ? items.map((item, i) => item.quote || defaultQuotes[i % defaultQuotes.length])
    : defaultQuotes

  const authors = items.length > 0
    ? items.map((item, i) => ({ name: item.author || defaultAuthors[i % defaultAuthors.length].name, role: item.role || defaultAuthors[i % defaultAuthors.length].role }))
    : defaultAuthors

  const total = quotes.length

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total)
    }, 7000)
    return () => clearInterval(timer)
  }, [total])

  return (
    <section {...elementProps(sectionId, 'wrapper', 'container', 'Testimonials Section')} style={{ backgroundColor: '#0B0B0B', color: '#FFFFFF', fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif" }}>
      <style>{`
        @media (max-width: 768px) {
          .ciseaux-testimonial-split { flex-direction: column !important; }
          .ciseaux-testimonial-split > div { flex: 1 1 100% !important; min-height: 50vh; }
        }
      `}</style>
      <div {...elementProps(sectionId, 'splitLayout', 'container', 'Split Layout')} className="ciseaux-testimonial-split flex flex-row w-full" style={{ minHeight: '620px' }}>
        {/* LEFT — Quote (50%) */}
        <div {...elementProps(sectionId, 'contentPanel', 'container', 'Content Panel')} className="flex flex-col" style={{ flex: '1 1 50%', backgroundColor: '#FFFFFF', color: '#0B0B0B', padding: '60px' }}>
          {/* Top label */}
          <p
            {...elementProps(sectionId, 'eyebrow', 'text')}
            style={{ fontSize: '14px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B76E79', marginBottom: 'auto' }}
          >
            {content.eyebrow || content.title || 'T\u00E9moignages'}
          </p>

          {/* Main content */}
          <div className="flex flex-col" style={{ maxWidth: '536px', marginTop: 'auto', marginLeft: 'auto' }}>
            {/* Quote text wrap */}
            <div style={{ marginTop: 'auto', marginBottom: '40px', marginLeft: 'auto' }}>
              {quotes.map((quote, i) => (
                <div key={items[i]?.id ?? i} style={{ display: i === activeIndex ? 'block' : 'none' }}>
                  <p
                    {...elementProps(sectionId, `items.${i}.quote`, 'text')}
                    style={{
                      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                      fontSize: 'clamp(1.5rem, 1.0714rem + 1.9048vw, 2.5rem)',
                      fontWeight: 400,
                      fontStyle: 'italic',
                      lineHeight: '135%',
                      color: '#0B0B0B',
                    }}
                  >
                    &ldquo;{quote}&rdquo;
                  </p>
                  {/* Author */}
                  <div style={{ marginTop: '24px' }}>
                    <p
                      {...elementProps(sectionId, `items.${i}.author`, 'text')}
                      style={{ fontSize: '16px', fontWeight: 600, color: '#0B0B0B' }}
                    >
                      {authors[i]?.name}
                    </p>
                    <p
                      {...elementProps(sectionId, `items.${i}.role`, 'text')}
                      style={{ fontSize: '14px', fontWeight: 400, color: '#B5B0A8', marginTop: '4px' }}
                    >
                      {authors[i]?.role}
                    </p>
                    {/* Copper stars */}
                    <div style={{ display: 'flex', gap: '4px', marginTop: '12px' }}>
                      {Array.from({ length: 5 }).map((_, s) => (
                        <span key={s} style={{ color: '#B76E79', fontSize: '14px' }}>&#9733;</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation dots */}
            {total > 1 && (
              <div {...elementProps(sectionId, 'navDots', 'container', 'Nav Dots')} style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
                {Array.from({ length: total }).map((_, i) => (
                  <div
                    key={i}
                    role="button"
                    onClick={() => setActiveIndex(i)}
                    style={{
                      width: i === activeIndex ? '32px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      backgroundColor: i === activeIndex ? '#B76E79' : 'rgba(11, 11, 11, 0.15)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — Large Initial (50%) */}
        <div {...elementProps(sectionId, 'imagePanel', 'container', 'Initials Panel')} className="relative overflow-hidden flex items-center justify-center" style={{ flex: '1 1 50%', backgroundColor: '#0B0B0B' }}>
          {Array.from({ length: total }).map((_, i) => {
            const item = items[i]
            const initial = (item?.author || authors[i]?.name || 'A').charAt(0).toUpperCase()
            return (
              <div
                key={item?.id ?? i}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  backgroundColor: '#0B0B0B',
                  opacity: i === activeIndex ? 1 : 0,
                  zIndex: i === activeIndex ? 2 : 0,
                  transition: 'opacity 0.6s ease',
                }}
              >
                {item?.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    {...elementProps(sectionId, `items.${i}.avatar`, 'image')}
                    src={item.avatar}
                    alt={item.author || ''}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <span
                    style={{
                      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                      fontSize: 'clamp(8rem, 6rem + 10vw, 16rem)',
                      fontWeight: 700,
                      color: '#B76E79',
                      lineHeight: 1,
                      userSelect: 'none',
                      opacity: 0.9,
                    }}
                  >
                    {initial}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// ATELIER — Interior Architecture Featured Testimonial
// ─────────────────────────────────────────────

function AtelierFeatured({ content, items, sectionId }: { content: Partial<TestimonialsContent>; items: TestimonialItem[]; accent: string; styleOverrides?: StyleOverrides; sectionId: string }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const defaultQuotes = [
    'Notre appartement a \u00e9t\u00e9 compl\u00e8tement m\u00e9tamorphos\u00e9. L\u2019\u00e9quipe a su capturer notre vision et la transcender. Chaque pi\u00e8ce raconte une histoire.',
    'Un suivi impeccable du d\u00e9but \u00e0 la fin. Le r\u00e9sultat d\u00e9passe nos attentes les plus folles.',
    'Ils ont transform\u00e9 notre h\u00f4tel en une exp\u00e9rience sensorielle unique. Nos clients sont \u00e9merveill\u00e9s.',
  ]

  const defaultAuthors = [
    { name: 'Marie & Philippe D.', role: 'R\u00e9novation Haussmannien' },
    { name: 'Sophie L.', role: 'Am\u00e9nagement Loft' },
    { name: 'Antoine R.', role: 'Suite H\u00f4teli\u00e8re' },
  ]

  const quotes = items.length > 0
    ? items.map((item, i) => item.quote || defaultQuotes[i % defaultQuotes.length])
    : defaultQuotes

  const authors = items.length > 0
    ? items.map((item, i) => ({ name: item.author || defaultAuthors[i % defaultAuthors.length].name, role: item.role || defaultAuthors[i % defaultAuthors.length].role }))
    : defaultAuthors

  const total = quotes.length

  const goPrev = () => setActiveIndex((prev) => (prev - 1 + total) % total)
  const goNext = () => setActiveIndex((prev) => (prev + 1) % total)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total)
    }, 7000)
    return () => clearInterval(timer)
  }, [total])

  return (
    <section {...elementProps(sectionId, 'wrapper', 'container', 'Testimonials Section')} style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF', fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif" }}>
      <style>{`
        @media (max-width: 768px) {
          .atelier-testimonial-split { flex-direction: column !important; }
          .atelier-testimonial-split > div { flex: 1 1 100% !important; min-height: 50vh; }
        }
      `}</style>
      <div {...elementProps(sectionId, 'splitLayout', 'container', 'Split Layout')} className="atelier-testimonial-split flex flex-row w-full" style={{ minHeight: '620px' }}>
        {/* LEFT — Quote (50%) */}
        <div {...elementProps(sectionId, 'contentPanel', 'container', 'Content Panel')} className="flex flex-col" style={{ flex: '1 1 50%', backgroundColor: '#F8F6F3', color: '#1A1A1A', padding: '60px' }}>
          {/* Top label */}
          <p
            {...elementProps(sectionId, 'eyebrow', 'text')}
            style={{ fontSize: '14px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C4B5A0', marginBottom: 'auto' }}
          >
            {content.eyebrow || content.title || 'T\u00e9moignages'}
          </p>

          {/* Main content */}
          <div className="flex flex-col" style={{ maxWidth: '536px', marginTop: 'auto', marginLeft: 'auto' }}>
            {/* Quote text wrap */}
            <div style={{ marginTop: 'auto', marginBottom: '40px', marginLeft: 'auto' }}>
              {quotes.map((quote, i) => (
                <div key={items[i]?.id ?? i} style={{ display: i === activeIndex ? 'block' : 'none' }}>
                  <p
                    {...elementProps(sectionId, `items.${i}.quote`, 'text')}
                    style={{
                      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                      fontSize: 'clamp(1.5rem, 1.0714rem + 1.9048vw, 2.5rem)',
                      fontWeight: 400,
                      fontStyle: 'italic',
                      lineHeight: '135%',
                      color: '#1A1A1A',
                    }}
                  >
                    &ldquo;{quote}&rdquo;
                  </p>
                  {/* Author */}
                  <div style={{ marginTop: '24px' }}>
                    <p
                      {...elementProps(sectionId, `items.${i}.author`, 'text')}
                      style={{ fontSize: '16px', fontWeight: 600, color: '#1A1A1A' }}
                    >
                      {authors[i]?.name}
                    </p>
                    <p
                      {...elementProps(sectionId, `items.${i}.role`, 'text')}
                      style={{ fontSize: '14px', fontWeight: 400, color: '#8B7355', marginTop: '4px' }}
                    >
                      {authors[i]?.role}
                    </p>
                    {/* Sand stars */}
                    <div style={{ display: 'flex', gap: '4px', marginTop: '12px' }}>
                      {Array.from({ length: 5 }).map((_, s) => (
                        <span key={s} style={{ color: '#C4B5A0', fontSize: '14px' }}>&#9733;</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation dots + arrows */}
            {total > 1 && (
              <div {...elementProps(sectionId, 'navDots', 'container', 'Nav Dots')} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                {Array.from({ length: total }).map((_, i) => (
                  <div
                    key={i}
                    role="button"
                    onClick={() => setActiveIndex(i)}
                    style={{
                      width: i === activeIndex ? '32px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      backgroundColor: i === activeIndex ? '#C4B5A0' : 'rgba(26, 26, 26, 0.2)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
                  <button
                    onClick={goPrev}
                    style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'transparent', border: '1px solid rgba(139, 115, 85, 0.4)', color: '#8B7355', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s ease' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                  </button>
                  <button
                    onClick={goNext}
                    style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#8B7355', border: '1px solid #8B7355', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s ease' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — Large Initial / Photo (50%) */}
        <div {...elementProps(sectionId, 'imagePanel', 'container', 'Initials Panel')} className="relative overflow-hidden flex items-center justify-center" style={{ flex: '1 1 50%', backgroundColor: '#1A1A1A' }}>
          {Array.from({ length: total }).map((_, i) => {
            const item = items[i]
            const initial = (item?.author || authors[i]?.name || 'M').charAt(0).toUpperCase()
            return (
              <div
                key={item?.id ?? i}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  backgroundColor: '#1A1A1A',
                  opacity: i === activeIndex ? 1 : 0,
                  zIndex: i === activeIndex ? 2 : 0,
                  transition: 'opacity 0.6s ease',
                }}
              >
                {item?.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    {...elementProps(sectionId, `items.${i}.avatar`, 'image')}
                    src={item.avatar}
                    alt={item.author || ''}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <span
                    style={{
                      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                      fontSize: 'clamp(8rem, 6rem + 10vw, 16rem)',
                      fontWeight: 700,
                      color: '#C4B5A0',
                      lineHeight: 1,
                      userSelect: 'none',
                      opacity: 0.9,
                    }}
                  >
                    {initial}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// ENCRE — Tattoo Studio Featured Testimonials (50/50 split)
// Deep black background, crimson accents
// ─────────────────────────────────────────────

function EncreFeatured({ content, items, sectionId }: { content: Partial<TestimonialsContent>; items: TestimonialItem[]; accent: string; styleOverrides?: StyleOverrides; sectionId: string }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const defaultQuotes = [
    'Mon sleeve a pris 6 séances et le résultat est absolument incroyable. Chaque détail est parfait, la profondeur du réalisme est bluffante.',
    'Je cherchais quelqu\'un pour un cover-up complexe et le résultat dépasse toutes mes attentes. On ne voit plus du tout l\'ancien tatouage.',
    'L\'ambiance du studio est top, l\'artiste prend vraiment le temps d\'écouter et de comprendre ce qu\'on veut. Je recommande à 100%.',
  ]

  const defaultAuthors = [
    { name: 'Lucas M.', role: 'Sleeve Réaliste' },
    { name: 'Émilie R.', role: 'Cover-up Floral' },
    { name: 'Thomas D.', role: 'Tatouage Japonais' },
  ]

  const quotes = items.length > 0
    ? items.map((item, i) => item.quote || defaultQuotes[i % defaultQuotes.length])
    : defaultQuotes

  const authors = items.length > 0
    ? items.map((item, i) => ({ name: item.author || defaultAuthors[i % defaultAuthors.length].name, role: item.role || defaultAuthors[i % defaultAuthors.length].role }))
    : defaultAuthors

  const total = quotes.length

  const goPrev = () => setActiveIndex((prev) => (prev - 1 + total) % total)
  const goNext = () => setActiveIndex((prev) => (prev + 1) % total)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total)
    }, 7000)
    return () => clearInterval(timer)
  }, [total])

  return (
    <section {...elementProps(sectionId, 'wrapper', 'container', 'Testimonials Section')} style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif" }}>
      <style>{`
        @media (max-width: 768px) {
          .encre-testimonial-split { flex-direction: column !important; }
          .encre-testimonial-split > div { flex: 1 1 100% !important; min-height: 50vh; }
        }
      `}</style>
      <div {...elementProps(sectionId, 'splitLayout', 'container', 'Split Layout')} className="encre-testimonial-split flex flex-row w-full" style={{ minHeight: '620px' }}>
        {/* LEFT — Quote (50%) */}
        <div {...elementProps(sectionId, 'contentPanel', 'container', 'Content Panel')} className="flex flex-col" style={{ flex: '1 1 50%', backgroundColor: '#111111', color: '#FFFFFF', padding: '60px' }}>
          {/* Top label */}
          <p
            {...elementProps(sectionId, 'eyebrow', 'text')}
            style={{ fontSize: '14px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C41E3A', marginBottom: 'auto' }}
          >
            {content.eyebrow || content.title || 'Témoignages'}
          </p>

          {/* Main content */}
          <div className="flex flex-col" style={{ maxWidth: '536px', marginTop: 'auto', marginLeft: 'auto' }}>
            {/* Quote text wrap */}
            <div style={{ marginTop: 'auto', marginBottom: '40px', marginLeft: 'auto' }}>
              {quotes.map((quote, i) => (
                <div key={items[i]?.id ?? i} style={{ display: i === activeIndex ? 'block' : 'none' }}>
                  {/* Crimson quote mark */}
                  <div style={{ color: '#C41E3A', fontSize: '80px', lineHeight: '0.6', marginBottom: '24px', fontFamily: 'Georgia, serif' }}>&ldquo;</div>
                  <p
                    {...elementProps(sectionId, `items.${i}.quote`, 'text')}
                    style={{
                      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                      fontSize: 'clamp(1.5rem, 1.0714rem + 1.9048vw, 2.5rem)',
                      fontWeight: 400,
                      fontStyle: 'italic',
                      lineHeight: '135%',
                      color: '#FFFFFF',
                    }}
                  >
                    {quote}
                  </p>
                  {/* Author */}
                  <div style={{ marginTop: '24px' }}>
                    <p
                      {...elementProps(sectionId, `items.${i}.author`, 'text')}
                      style={{ fontSize: '16px', fontWeight: 600, color: '#FFFFFF' }}
                    >
                      {authors[i]?.name}
                    </p>
                    <p
                      {...elementProps(sectionId, `items.${i}.role`, 'text')}
                      style={{ fontSize: '14px', fontWeight: 400, color: '#C41E3A', marginTop: '4px' }}
                    >
                      {authors[i]?.role}
                    </p>
                    {/* Crimson stars */}
                    <div style={{ display: 'flex', gap: '4px', marginTop: '12px' }}>
                      {Array.from({ length: 5 }).map((_, s) => (
                        <span key={s} style={{ color: '#C41E3A', fontSize: '14px' }}>&#9733;</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation dots + arrows */}
            {total > 1 && (
              <div {...elementProps(sectionId, 'navDots', 'container', 'Nav Dots')} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                {Array.from({ length: total }).map((_, i) => (
                  <div
                    key={i}
                    role="button"
                    onClick={() => setActiveIndex(i)}
                    style={{
                      width: i === activeIndex ? '32px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      backgroundColor: i === activeIndex ? '#C41E3A' : 'rgba(255, 255, 255, 0.2)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
                  <button
                    onClick={goPrev}
                    style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'transparent', border: '1px solid rgba(196, 30, 58, 0.4)', color: '#C41E3A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s ease' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                  </button>
                  <button
                    onClick={goNext}
                    style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#C41E3A', border: '1px solid #C41E3A', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s ease' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — Large Initial / Photo (50%) */}
        <div {...elementProps(sectionId, 'imagePanel', 'container', 'Initials Panel')} className="relative overflow-hidden flex items-center justify-center" style={{ flex: '1 1 50%', backgroundColor: '#0A0A0A' }}>
          {Array.from({ length: total }).map((_, i) => {
            const item = items[i]
            const initial = (item?.author || authors[i]?.name || 'T').charAt(0).toUpperCase()
            return (
              <div
                key={item?.id ?? i}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  backgroundColor: '#0A0A0A',
                  opacity: i === activeIndex ? 1 : 0,
                  zIndex: i === activeIndex ? 2 : 0,
                  transition: 'opacity 0.6s ease',
                }}
              >
                {item?.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    {...elementProps(sectionId, `items.${i}.avatar`, 'image')}
                    src={item.avatar}
                    alt={item.author || ''}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <span
                    style={{
                      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                      fontSize: 'clamp(8rem, 6rem + 10vw, 16rem)',
                      fontWeight: 700,
                      color: '#C41E3A',
                      lineHeight: 1,
                      userSelect: 'none',
                      opacity: 0.15,
                    }}
                  >
                    {initial}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// SERENITE — Spa & Beauty Institute Featured Testimonials (50/50 split)
// Deep navy background, warm gold accents, lavender secondary text
// ─────────────────────────────────────────────

function SereniteFeature({ content, items, sectionId }: { content: Partial<TestimonialsContent>; items: TestimonialItem[]; accent: string; styleOverrides?: StyleOverrides; sectionId: string }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const defaultQuotes = [
    'Un moment hors du temps. Le massage aux pierres chaudes est une pure merveille, je ressors complètement régénérée à chaque visite.',
    'Mon rituel beauté mensuel depuis 5 ans. Les soins visage sont d\'une qualité exceptionnelle, ma peau n\'a jamais été aussi belle.',
    'Le hammam suivi du gommage au savon noir est une expérience inoubliable. L\'équipe est aux petits soins, un vrai cocon de douceur.',
  ]

  const defaultAuthors = [
    { name: 'Isabelle M.', role: 'Massage Pierres Chaudes' },
    { name: 'Caroline L.', role: 'Soin Éclat Absolu' },
    { name: 'Nathalie P.', role: 'Rituel Hammam' },
  ]

  const quotes = items.length > 0
    ? items.map((item, i) => item.quote || defaultQuotes[i % defaultQuotes.length])
    : defaultQuotes

  const authors = items.length > 0
    ? items.map((item, i) => ({ name: item.author || defaultAuthors[i % defaultAuthors.length].name, role: item.role || defaultAuthors[i % defaultAuthors.length].role }))
    : defaultAuthors

  const total = quotes.length

  const goPrev = () => setActiveIndex((prev) => (prev - 1 + total) % total)
  const goNext = () => setActiveIndex((prev) => (prev + 1) % total)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total)
    }, 7000)
    return () => clearInterval(timer)
  }, [total])

  return (
    <section {...elementProps(sectionId, 'wrapper', 'container', 'Testimonials Section')} style={{ backgroundColor: '#1B1B2F', color: '#FFFFFF', fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif" }}>
      <style>{`
        @media (max-width: 768px) {
          .serenite-testimonial-split { flex-direction: column !important; }
          .serenite-testimonial-split > div { flex: 1 1 100% !important; min-height: 50vh; }
        }
      `}</style>
      <div {...elementProps(sectionId, 'splitLayout', 'container', 'Split Layout')} className="serenite-testimonial-split flex flex-row w-full" style={{ minHeight: '620px' }}>
        {/* LEFT — Quote (50%) */}
        <div {...elementProps(sectionId, 'contentPanel', 'container', 'Content Panel')} className="flex flex-col" style={{ flex: '1 1 50%', backgroundColor: '#13132A', color: '#FFFFFF', padding: '60px' }}>
          {/* Top label */}
          <p
            {...elementProps(sectionId, 'eyebrow', 'text')}
            style={{ fontSize: '14px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D4B896', marginBottom: 'auto' }}
          >
            {content.eyebrow || content.title || 'Témoignages'}
          </p>

          {/* Main content */}
          <div className="flex flex-col" style={{ maxWidth: '536px', marginTop: 'auto', marginLeft: 'auto' }}>
            {/* Quote text wrap */}
            <div style={{ marginTop: 'auto', marginBottom: '40px', marginLeft: 'auto' }}>
              {quotes.map((quote, i) => (
                <div key={items[i]?.id ?? i} style={{ display: i === activeIndex ? 'block' : 'none' }}>
                  {/* Gold quote mark */}
                  <div style={{ color: '#D4B896', fontSize: '80px', lineHeight: '0.6', marginBottom: '24px', fontFamily: 'Georgia, serif' }}>&ldquo;</div>
                  <p
                    {...elementProps(sectionId, `items.${i}.quote`, 'text')}
                    style={{
                      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                      fontSize: 'clamp(1.5rem, 1.0714rem + 1.9048vw, 2.5rem)',
                      fontWeight: 400,
                      fontStyle: 'italic',
                      lineHeight: '135%',
                      color: '#FFFFFF',
                    }}
                  >
                    {quote}
                  </p>
                  {/* Author */}
                  <div style={{ marginTop: '24px' }}>
                    <p
                      {...elementProps(sectionId, `items.${i}.author`, 'text')}
                      style={{ fontSize: '16px', fontWeight: 600, color: '#FFFFFF' }}
                    >
                      {authors[i]?.name}
                    </p>
                    <p
                      {...elementProps(sectionId, `items.${i}.role`, 'text')}
                      style={{ fontSize: '14px', fontWeight: 400, color: '#7B6F8A', marginTop: '4px' }}
                    >
                      {authors[i]?.role}
                    </p>
                    {/* Gold stars */}
                    <div style={{ display: 'flex', gap: '4px', marginTop: '12px' }}>
                      {Array.from({ length: 5 }).map((_, s) => (
                        <span key={s} style={{ color: '#D4B896', fontSize: '14px' }}>&#9733;</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation dots + arrows */}
            {total > 1 && (
              <div {...elementProps(sectionId, 'navDots', 'container', 'Nav Dots')} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                {Array.from({ length: total }).map((_, i) => (
                  <div
                    key={i}
                    role="button"
                    onClick={() => setActiveIndex(i)}
                    style={{
                      width: i === activeIndex ? '32px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      backgroundColor: i === activeIndex ? '#D4B896' : 'rgba(255, 255, 255, 0.2)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
                  <button
                    onClick={goPrev}
                    style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'transparent', border: '1px solid rgba(212, 184, 150, 0.4)', color: '#D4B896', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s ease' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                  </button>
                  <button
                    onClick={goNext}
                    style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#D4B896', border: '1px solid #D4B896', color: '#1B1B2F', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s ease' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — Large Initial / Photo (50%) */}
        <div {...elementProps(sectionId, 'imagePanel', 'container', 'Initials Panel')} className="relative overflow-hidden flex items-center justify-center" style={{ flex: '1 1 50%', backgroundColor: '#1B1B2F' }}>
          {Array.from({ length: total }).map((_, i) => {
            const item = items[i]
            const initial = (item?.author || authors[i]?.name || 'S').charAt(0).toUpperCase()
            return (
              <div
                key={item?.id ?? i}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  backgroundColor: '#1B1B2F',
                  opacity: i === activeIndex ? 1 : 0,
                  zIndex: i === activeIndex ? 2 : 0,
                  transition: 'opacity 0.6s ease',
                }}
              >
                {item?.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    {...elementProps(sectionId, `items.${i}.avatar`, 'image')}
                    src={item.avatar}
                    alt={item.author || ''}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <span
                    style={{
                      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                      fontSize: 'clamp(8rem, 6rem + 10vw, 16rem)',
                      fontWeight: 700,
                      color: '#D4B896',
                      lineHeight: 1,
                      userSelect: 'none',
                      opacity: 0.15,
                    }}
                  >
                    {initial}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// SLIDER variants (one per universe) — embla carousel
// ─────────────────────────────────────────────

const SLIDER_CONFIGS = {
  startup: { bg: 'bg-zinc-50', cardBg: 'bg-white border-zinc-100', dotActive: 'bg-indigo-600', dotInactive: 'bg-zinc-300', arrowBg: 'bg-white shadow-lg', arrowText: 'text-zinc-700' },
  corporate: { bg: 'bg-slate-900', cardBg: 'bg-slate-800 border-slate-700', dotActive: 'bg-blue-500', dotInactive: 'bg-slate-600', arrowBg: 'bg-slate-800 border border-slate-700', arrowText: 'text-white' },
  luxe: { bg: 'bg-white', cardBg: 'bg-white border-zinc-200', dotActive: 'bg-amber-600', dotInactive: 'bg-zinc-300', arrowBg: 'bg-zinc-900', arrowText: 'text-white', arrowShape: 'square' as const, arrowPosition: 'header' as const },
  creative: { bg: 'bg-amber-50', cardBg: 'bg-white border-2 border-zinc-900', dotActive: 'bg-zinc-900', dotInactive: 'bg-zinc-400', arrowBg: 'bg-yellow-300 border-2 border-zinc-900', arrowText: 'text-zinc-900' },
  ecommerce: { bg: 'bg-white', cardBg: 'bg-white border-zinc-200', dotActive: 'bg-emerald-600', dotInactive: 'bg-zinc-300', arrowBg: 'bg-white shadow-md', arrowText: 'text-zinc-700' },
  glass: { bg: 'bg-zinc-950', cardBg: 'bg-white/5 border-white/10 backdrop-blur-sm', dotActive: 'bg-purple-500', dotInactive: 'bg-zinc-700', arrowBg: 'bg-white/10 border border-white/10', arrowText: 'text-white' },
} as const

function makeSliderVariant(
  universe: keyof typeof SLIDER_CONFIGS,
  renderHeader: (props: { content: Partial<TestimonialsContent>; accent: string; styleOverrides?: StyleOverrides; sectionId: string; arrows?: React.ReactNode }) => React.ReactNode,
  renderCard: (props: { item: TestimonialItem; accent: string; sectionId: string; itemIndex: number }) => React.ReactNode,
  options?: { slideWidth?: string },
) {
  const cfg = SLIDER_CONFIGS[universe]
  const slideW = options?.slideWidth ?? '100%'
  const isSquareArrow = 'arrowShape' in cfg && cfg.arrowShape === 'square'
  const isHeaderArrow = 'arrowPosition' in cfg && cfg.arrowPosition === 'header'
  return function SliderVariant({ content, items, accent, styleOverrides, sectionId }: { content: Partial<TestimonialsContent>; items: TestimonialItem[]; accent: string; styleOverrides?: StyleOverrides; sectionId: string }) {
    const { emblaRef, selectedIndex, scrollSnaps, canScrollPrev, canScrollNext, scrollPrev, scrollNext, scrollTo } = useSectionCarousel({ loop: true, autoplay: true, interval: 5000 })

    const ArrowIconLeft = isSquareArrow ? ArrowLeft : ChevronLeft
    const ArrowIconRight = isSquareArrow ? ArrowRight : ChevronRight
    const arrowButtons = items.length > 1 ? (
      <div className={cn(isHeaderArrow ? 'flex gap-2' : 'contents')}>
        <button onClick={scrollPrev} className={cn(
          'flex items-center justify-center transition-all',
          isSquareArrow ? 'w-12 h-12' : 'w-10 h-10 rounded-full',
          !isHeaderArrow && 'absolute -left-4 top-1/2 -translate-y-1/2',
          cfg.arrowBg
        )}>
          <ArrowIconLeft className={cn(isSquareArrow ? 'w-6 h-6' : 'w-5 h-5')} style={{ color: 'white' }} />
        </button>
        <button onClick={scrollNext} className={cn(
          'flex items-center justify-center transition-all',
          isSquareArrow ? 'w-12 h-12' : 'w-10 h-10 rounded-full',
          !isHeaderArrow && 'absolute -right-4 top-1/2 -translate-y-1/2',
          cfg.arrowBg
        )}>
          <ArrowIconRight className={cn(isSquareArrow ? 'w-6 h-6' : 'w-5 h-5')} style={{ color: 'white' }} />
        </button>
      </div>
    ) : null

    return (
      <section className={cn(cfg.bg, 'py-24 relative overflow-hidden')} style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-6xl mx-auto px-6">
          {renderHeader({ content, accent, styleOverrides, sectionId, arrows: isHeaderArrow ? arrowButtons : undefined })}
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {items.map((item, i) => (
                  <div key={item.id} className="min-w-0 px-3" style={{ flex: `0 0 ${slideW}` }}>
                    {renderCard({ item, accent, sectionId, itemIndex: i })}
                  </div>
                ))}
              </div>
            </div>
            {!isHeaderArrow && arrowButtons}
          </div>
          {scrollSnaps.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {scrollSnaps.map((_, i) => (
                <button key={i} onClick={() => scrollTo(i)} className={cn('w-2.5 h-2.5 rounded-full transition-all', i === selectedIndex ? cfg.dotActive : cfg.dotInactive)} />
              ))}
            </div>
          )}
        </div>
      </section>
    )
  }
}

const StartupSlider = makeSliderVariant('startup',
  (props) => <StartupHeader {...props} />,
  (props) => <StartupCard {...props} />,
)
const CorporateSlider = makeSliderVariant('corporate',
  (props) => <CorporateHeader {...props} />,
  (props) => <CorporateCard {...props} />,
)
const LuxeSlider = makeSliderVariant('luxe',
  ({ content, styleOverrides, sectionId, arrows }) => <LuxeHeader content={content} styleOverrides={styleOverrides} sectionId={sectionId} arrows={arrows} />,
  ({ item, sectionId, itemIndex }) => <LuxeCard item={item} horizontal sectionId={sectionId} itemIndex={itemIndex} />,
  { slideWidth: '48%' },
)
const CreativeSlider = makeSliderVariant('creative',
  ({ content, styleOverrides, sectionId }) => <CreativeHeader content={content} styleOverrides={styleOverrides} sectionId={sectionId} />,
  ({ item, sectionId, itemIndex }) => <CreativeCard item={item} sectionId={sectionId} itemIndex={itemIndex} />,
)
const EcommerceSlider = makeSliderVariant('ecommerce',
  (props) => <EcommerceHeader {...props} />,
  (props) => <EcommerceCard {...props} />,
)
const GlassSlider = makeSliderVariant('glass',
  (props) => <GlassHeader {...props} />,
  (props) => <GlassCard {...props} />,
)

// ─────────────────────────────────────────────
// MAIN COMPONENT — routes to 24 variants
// ─────────────────────────────────────────────

interface StyleOverrides { titleSize?: SectionTitleSize; textAlign?: SectionTextAlign; textColor?: string }

const VARIANT_MAP: Record<string, React.FC<{ content: Partial<TestimonialsContent>; items: TestimonialItem[]; accent: string; styleOverrides?: StyleOverrides; sectionId: string }>> = {
  'startup-grid': StartupGrid,
  'startup-featured': StartupFeatured,
  'startup-marquee': StartupMarquee,
  'corporate-grid': CorporateGrid,
  'corporate-featured': CorporateFeatured,
  'corporate-marquee': CorporateMarquee,
  'luxe-grid': LuxeGrid,
  'luxe-featured': LuxeFeatured,
  'luxe-marquee': LuxeMarquee,
  'creative-grid': CreativeGrid,
  'creative-featured': CreativeFeatured,
  'creative-marquee': CreativeMarquee,
  'ecommerce-grid': EcommerceGrid,
  'ecommerce-featured': EcommerceFeatured,
  'ecommerce-marquee': EcommerceMarquee,
  'glass-grid': GlassGrid,
  'glass-featured': GlassFeatured,
  'glass-marquee': GlassMarquee,
  'startup-slider': StartupSlider,
  'corporate-slider': CorporateSlider,
  'luxe-slider': LuxeSlider,
  'creative-slider': CreativeSlider,
  'ecommerce-slider': EcommerceSlider,
  'glass-slider': GlassSlider,
  'canopy-cards': CanopyCards,
  'obscura-featured': ObscuraFeatured,
  'nacre-featured': NacreFeatured,
  'brixsa-featured': BrixsaFeatured,
  'braise-featured': BraiseFeatured,
  'forge-featured': ForgeFeatured,
  'ciseaux-featured': CiseauxFeatured,
  'atelier-featured': AtelierFeatured,
  'encre-featured': EncreFeatured,
  'serenite-featured': SereniteFeature,
}

export function TestimonialsSection({ config }: TestimonialsSectionProps) {
  const content = (config.content ?? {}) as Partial<TestimonialsContent>
  const variant = config.variant ?? 'startup-grid'
  const { accentColor, titleSize, textAlign, textColor } = config.style
  const items: TestimonialItem[] = content.items ?? []

  if (items.length === 0) return null

  // Determine default accent per universe
  const universe = variant.split('-')[0]
  const defaultAccents: Record<string, string> = {
    startup: '#6366f1',
    corporate: '#3b82f6',
    luxe: '#b8860b',
    creative: '#18181b',
    ecommerce: '#059669',
    glass: '#6366f1',
    canopy: '#D4A853',
    obscura: '#D4A853',
    nacre: '#C9A96E',
    brixsa: '#e1e1e1',
    braise: '#C8A96E',
    forge: '#FF4D00',
    ciseaux: '#B76E79',
    atelier: '#C4B5A0',
    encre: '#C41E3A',
    serenite: '#D4B896',
  }
  const accent = accentColor ?? defaultAccents[universe] ?? '#6366f1'

  const Variant = VARIANT_MAP[variant] ?? VARIANT_MAP['startup-grid']!

  return <Variant content={content} items={items} accent={accent} styleOverrides={{ titleSize, textAlign, textColor }} sectionId={config.id} />
}

export const testimonialsMeta = {
  type: 'testimonials',
  label: 'Temoignages',
  icon: '💬',
  variants: [
    'startup-grid', 'startup-featured', 'startup-marquee',
    'corporate-grid', 'corporate-featured', 'corporate-marquee',
    'luxe-grid', 'luxe-featured', 'luxe-marquee',
    'creative-grid', 'creative-featured', 'creative-marquee',
    'ecommerce-grid', 'ecommerce-featured', 'ecommerce-marquee',
    'glass-grid', 'glass-featured', 'glass-marquee',
    'startup-slider', 'corporate-slider', 'luxe-slider',
    'creative-slider', 'ecommerce-slider', 'glass-slider',
    'canopy-cards',
    'obscura-featured',
    'nacre-featured',
    'brixsa-featured',
    'braise-featured',
    'forge-featured',
    'ciseaux-featured',
    'atelier-featured',
    'encre-featured',
    'serenite-featured',
  ],
  defaultVariant: 'startup-grid',
  defaultContent: {},
}
