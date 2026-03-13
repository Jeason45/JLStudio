'use client'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { SectionConfig, SectionTitleSize, SectionTextAlign } from '@/types/site'
import type { TestimonialsContent, TestimonialItem } from '@/types/sections'
import { useSectionCarousel } from '@/hooks/useSectionCarousel'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getTitleSizeClass, getTextAlignClass } from '../_utils'
import { elementProps } from '@/lib/elementHelpers'

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

function LuxeHeader({ content, styleOverrides, sectionId }: { content: Partial<TestimonialsContent>; styleOverrides?: StyleOverrides; sectionId: string }) {
  const { titleSize, textAlign, textColor } = styleOverrides ?? {}
  return (
    <div className={cn("mb-16 text-center space-y-4", textAlign && getTextAlignClass(textAlign))}>
      {content.eyebrow && (
        <span className="inline-block text-[11px] font-light tracking-[0.25em] uppercase" style={{ color: '#b8860b' }}>
          {content.eyebrow}
        </span>
      )}
      {content.title && (
        <>
          <div className="flex items-center justify-center gap-4 mb-2">
            <span className="h-px w-12" style={{ backgroundColor: '#b8860b' }} />
            <h2 {...elementProps(sectionId, 'title', 'heading')} className={cn("text-3xl md:text-4xl lg:text-5xl font-light tracking-wide text-zinc-900", titleSize && getTitleSizeClass(titleSize))} style={textColor ? { color: textColor } : undefined}>{content.title}</h2>
            <span className="h-px w-12" style={{ backgroundColor: '#b8860b' }} />
          </div>
        </>
      )}
      {content.subtitle && <p {...elementProps(sectionId, 'subtitle', 'text')} className="text-base max-w-2xl mx-auto text-zinc-400 font-light tracking-wide">{content.subtitle}</p>}
    </div>
  )
}

function LuxeCard({ item, large, sectionId, itemIndex }: { item: TestimonialItem; large?: boolean; sectionId: string; itemIndex: number }) {
  return (
    <div className={cn('p-8 text-center', large && 'flex flex-col justify-center')}>
      <LuxeStars rating={item.rating} />
      <p {...elementProps(sectionId, `items.${itemIndex}.quote`, 'text')} className={cn('leading-relaxed mb-6 italic text-zinc-500 font-light', large ? 'text-xl' : 'text-sm')}>
        &ldquo;{item.quote}&rdquo;
      </p>
      <div className="mx-auto w-8 h-px mb-4" style={{ backgroundColor: '#b8860b' }} />
      <p {...elementProps(sectionId, `items.${itemIndex}.author`, 'text')} className="text-sm font-medium tracking-wide text-zinc-900">{item.author}</p>
      <p {...elementProps(sectionId, `items.${itemIndex}.role`, 'text')} className="text-xs text-zinc-400 font-light tracking-wide mt-1">{item.role}{item.company ? ` · ${item.company}` : ''}</p>
    </div>
  )
}

function LuxeGrid({ content, items, styleOverrides, sectionId }: { content: Partial<TestimonialsContent>; items: TestimonialItem[]; styleOverrides?: StyleOverrides; sectionId: string }) {
  return (
    <section className="bg-white py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
      <div className="max-w-6xl mx-auto px-6">
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
    <section className="bg-white py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
      <div className="max-w-6xl mx-auto px-6">
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
    <section className="bg-zinc-50 py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
      <div className="max-w-6xl mx-auto px-6">
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
// SLIDER variants (one per universe) — embla carousel
// ─────────────────────────────────────────────

const SLIDER_CONFIGS = {
  startup: { bg: 'bg-zinc-50', cardBg: 'bg-white border-zinc-100', dotActive: 'bg-indigo-600', dotInactive: 'bg-zinc-300', arrowBg: 'bg-white shadow-lg', arrowText: 'text-zinc-700' },
  corporate: { bg: 'bg-slate-900', cardBg: 'bg-slate-800 border-slate-700', dotActive: 'bg-blue-500', dotInactive: 'bg-slate-600', arrowBg: 'bg-slate-800 border border-slate-700', arrowText: 'text-white' },
  luxe: { bg: 'bg-white', cardBg: 'bg-white border-zinc-200', dotActive: 'bg-amber-600', dotInactive: 'bg-zinc-300', arrowBg: 'bg-white border border-zinc-200', arrowText: 'text-zinc-700' },
  creative: { bg: 'bg-amber-50', cardBg: 'bg-white border-2 border-zinc-900', dotActive: 'bg-zinc-900', dotInactive: 'bg-zinc-400', arrowBg: 'bg-yellow-300 border-2 border-zinc-900', arrowText: 'text-zinc-900' },
  ecommerce: { bg: 'bg-white', cardBg: 'bg-white border-zinc-200', dotActive: 'bg-emerald-600', dotInactive: 'bg-zinc-300', arrowBg: 'bg-white shadow-md', arrowText: 'text-zinc-700' },
  glass: { bg: 'bg-zinc-950', cardBg: 'bg-white/5 border-white/10 backdrop-blur-sm', dotActive: 'bg-purple-500', dotInactive: 'bg-zinc-700', arrowBg: 'bg-white/10 border border-white/10', arrowText: 'text-white' },
} as const

function makeSliderVariant(
  universe: keyof typeof SLIDER_CONFIGS,
  renderHeader: (props: { content: Partial<TestimonialsContent>; accent: string; styleOverrides?: StyleOverrides; sectionId: string }) => React.ReactNode,
  renderCard: (props: { item: TestimonialItem; accent: string; sectionId: string; itemIndex: number }) => React.ReactNode,
) {
  const cfg = SLIDER_CONFIGS[universe]
  return function SliderVariant({ content, items, accent, styleOverrides, sectionId }: { content: Partial<TestimonialsContent>; items: TestimonialItem[]; accent: string; styleOverrides?: StyleOverrides; sectionId: string }) {
    const { emblaRef, selectedIndex, scrollSnaps, canScrollPrev, canScrollNext, scrollPrev, scrollNext, scrollTo } = useSectionCarousel({ loop: true, autoplay: true, interval: 5000 })

    return (
      <section className={cn(cfg.bg, 'py-24')} style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-6xl mx-auto px-6">
          {renderHeader({ content, accent, styleOverrides, sectionId })}
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {items.map((item, i) => (
                  <div key={item.id} className="flex-[0_0_100%] min-w-0 px-3">
                    {renderCard({ item, accent, sectionId, itemIndex: i })}
                  </div>
                ))}
              </div>
            </div>
            {items.length > 1 && (
              <>
                <button onClick={scrollPrev} disabled={!canScrollPrev} className={cn('absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-30', cfg.arrowBg)}>
                  <ChevronLeft className={cn('w-5 h-5', cfg.arrowText)} />
                </button>
                <button onClick={scrollNext} disabled={!canScrollNext} className={cn('absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-30', cfg.arrowBg)}>
                  <ChevronRight className={cn('w-5 h-5', cfg.arrowText)} />
                </button>
              </>
            )}
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
  ({ content, styleOverrides, sectionId }) => <LuxeHeader content={content} styleOverrides={styleOverrides} sectionId={sectionId} />,
  ({ item, sectionId, itemIndex }) => <LuxeCard item={item} sectionId={sectionId} itemIndex={itemIndex} />,
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
  'brixsa-featured': BrixsaFeatured,
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
    brixsa: '#e1e1e1',
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
    'brixsa-featured',
  ],
  defaultVariant: 'startup-grid',
  defaultContent: {},
}
