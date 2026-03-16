'use client'

import { cn } from '@/lib/utils'
import { sectionClasses, getTextColorClass, getMutedTextClass, getEyebrowClass, getTitleSizeClass, getTextAlignClass } from '../_utils'
import type { SectionConfig } from '@/types/site'
import type { ImageTextContent } from '@/types/sections'
import { Image, ArrowRight, Check } from 'lucide-react'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import { elementProps } from '@/lib/elementHelpers'
import { EditablePlaceholder } from '../_EditablePlaceholder'
import { DecorativeOrnament, FloatingIllustration } from '../_DecorativeOrnament'
import { useBrixsaScrollReveal, useBrixsaCounter } from '@/hooks/useBrixsaScrollReveal'

export function ImageTextSection({ config, isEditing }: { config: SectionConfig; isEditing?: boolean }) {
  const content = (config.content ?? {}) as Partial<ImageTextContent>
  const variant = config.variant ?? 'startup-image-right'
  const { accentColor, textColor: customTextColor } = config.style

  // Parse universe and layout from variant
  const isLeft = variant.endsWith('-image-left')
  const universe = variant.replace(/-image-(right|left)$/, '')

  // ═══════════════════════════════════════════
  // STARTUP — SaaS / Modern
  // ═══════════════════════════════════════════

  if (universe === 'startup') {
    const accent = accentColor ?? '#6366f1'

    return (
      <section className="bg-white py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className={cn('max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12', isLeft && 'lg:flex-row-reverse')}>
          {/* Text */}
          <div className="flex-1 space-y-5">
            {content.eyebrow && (
              <span
                {...elementProps(config.id, 'eyebrow', 'badge')}
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full border border-zinc-200 text-zinc-600 bg-white shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
                {content.eyebrow}
              </span>
            )}
            {content.title && (
              <h2 {...elementProps(config.id, 'title', 'heading')} className="text-3xl md:text-4xl font-bold text-zinc-900 leading-tight" style={customTextColor ? { color: customTextColor } : undefined}>
                {content.title}
              </h2>
            )}
            {content.subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-zinc-500">{content.subtitle}</p>}
            {content.body && <p {...elementProps(config.id, 'body', 'text')} className="text-sm text-zinc-500 leading-relaxed">{content.body}</p>}
            <div className="flex gap-3 flex-wrap pt-2">
              {content.primaryButton && (
                <a
                  {...elementProps(config.id, 'primaryButton', 'button')}
                  href={content.primaryButton.href}
                  className="px-6 py-2.5 text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg"
                  style={{ backgroundColor: accent, boxShadow: `0 4px 14px ${accent}40` }}
                >
                  {content.primaryButton.label}
                </a>
              )}
              {content.secondaryButton && (
                <a {...elementProps(config.id, 'secondaryButton', 'button')} href={content.secondaryButton.href} className="px-6 py-2.5 rounded-xl text-sm font-semibold border border-zinc-200 text-zinc-700 hover:bg-zinc-50 transition-colors">
                  {content.secondaryButton.label}
                </a>
              )}
            </div>
          </div>
          {/* Image */}
          <div className="flex-1 aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-100 shadow-lg">
            {content.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img {...elementProps(config.id, 'image', 'image')} src={content.image} alt={content.imageAlt ?? ''} className="w-full h-full object-cover" />
            ) : isEditing ? (
              <EditablePlaceholder sectionId={config.id} contentPath="image.src" type="image" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Image className="w-10 h-10 text-zinc-300" />
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // CORPORATE — Navy / Professional
  // ═══════════════════════════════════════════

  if (universe === 'corporate') {
    const accent = accentColor ?? '#3b82f6'

    return (
      <section className="bg-slate-900 py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className={cn('max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-14', isLeft && 'lg:flex-row-reverse')}>
          {/* Text */}
          <div className="flex-1 space-y-5">
            {content.eyebrow && (
              <span {...elementProps(config.id, 'eyebrow', 'badge')} className="inline-block text-xs font-semibold px-3 py-1 rounded border text-blue-300 border-blue-500/30 bg-blue-500/10">
                {content.eyebrow}
              </span>
            )}
            {content.title && (
              <h2 {...elementProps(config.id, 'title', 'heading')} className="text-3xl md:text-4xl font-bold text-white leading-tight" style={customTextColor ? { color: customTextColor } : undefined}>
                {content.title}
              </h2>
            )}
            {content.subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-slate-400">{content.subtitle}</p>}
            {content.body && <p {...elementProps(config.id, 'body', 'text')} className="text-sm text-slate-400 leading-relaxed">{content.body}</p>}
            <div className="flex gap-3 flex-wrap pt-2">
              {content.primaryButton && (
                <a
                  {...elementProps(config.id, 'primaryButton', 'button')}
                  href={content.primaryButton.href}
                  className="px-6 py-2.5 text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: accent }}
                >
                  {content.primaryButton.label}
                  <ArrowRight className="w-4 h-4 inline-block ml-2" />
                </a>
              )}
              {content.secondaryButton && (
                <a {...elementProps(config.id, 'secondaryButton', 'button')} href={content.secondaryButton.href} className="px-6 py-2.5 rounded-lg text-sm font-semibold border border-slate-600 text-slate-300 hover:bg-slate-800 transition-colors">
                  {content.secondaryButton.label}
                </a>
              )}
            </div>
          </div>
          {/* Image */}
          <div className="flex-1 aspect-[4/3] rounded-xl overflow-hidden bg-slate-800/50 border border-slate-700/50">
            {content.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img {...elementProps(config.id, 'image', 'image')} src={content.image} alt={content.imageAlt ?? ''} className="w-full h-full object-cover" />
            ) : isEditing ? (
              <EditablePlaceholder sectionId={config.id} contentPath="image.src" type="image" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Image className="w-10 h-10 text-white/20" />
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // LUXE — Gold / Elegant
  // ═══════════════════════════════════════════

  if (universe === 'luxe') {
    const gold = accentColor ?? '#b8860b'
    const hasDecorativeIcon = !!content.decorativeIcon

    return (
      <section className="bg-white py-24 relative overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className={cn('max-w-5xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 relative', isLeft && 'lg:flex-row-reverse')}>
          {/* Text */}
          <div className="flex-1 space-y-6">
            {hasDecorativeIcon && <DecorativeOrnament color={gold} iconUrl={typeof content.decorativeIcon === 'string' && content.decorativeIcon.startsWith('http') ? content.decorativeIcon : undefined} className="justify-start" />}
            {content.eyebrow && (
              <span {...elementProps(config.id, 'eyebrow', 'badge')} className="inline-block text-xs tracking-[0.25em] uppercase font-light" style={{ color: gold }}>
                {content.eyebrow}
              </span>
            )}
            {content.title && (
              <h2 {...elementProps(config.id, 'title', 'heading')} className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight leading-tight" style={customTextColor ? { color: customTextColor } : undefined}>
                {content.title}
              </h2>
            )}
            {!hasDecorativeIcon && <div className="w-12 h-px" style={{ background: gold }} />}
            {content.subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-zinc-400 tracking-wide font-light">{content.subtitle}</p>}
            {/* Stats row */}
            {content.stats && (content.stats as { id: string; value: string; label: string }[]).length > 0 && (
              <div className="flex gap-10 pt-2">
                {(content.stats as { id: string; value: string; label: string }[]).map((stat, si) => (
                  <div key={stat.id || si}>
                    <p className="text-4xl font-black text-zinc-900 tracking-tight">
                      {stat.value.replace(/[A-Za-z%]+$/, '')}<span style={{ color: gold }}>{stat.value.match(/[A-Za-z%]+$/)?.[0] || ''}</span>
                    </p>
                    <p className="text-xs font-bold tracking-wide uppercase text-zinc-900 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}
            {content.body && <p {...elementProps(config.id, 'body', 'text')} className="text-sm text-zinc-400 leading-relaxed font-light tracking-wide">{content.body}</p>}
            {content.items && content.items.length > 0 && (
              <div className="space-y-4 pt-2">
                {content.items.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full mt-0.5"
                      style={{ backgroundColor: `${gold}15`, border: `1px solid ${gold}30` }}
                    >
                      {item.icon ? (
                        <DynamicIcon name={item.icon} className="w-3.5 h-3.5" fallbackClassName="text-xs leading-none" style={{ color: gold }} />
                      ) : (
                        <Check className="w-3.5 h-3.5" style={{ color: gold }} />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-800 tracking-wide">{item.title}</p>
                      {item.description && (
                        <p className="text-xs text-zinc-400 font-light tracking-wide leading-relaxed mt-0.5">{item.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-4 flex-wrap pt-2">
              {content.primaryButton && (
                <a
                  {...elementProps(config.id, 'primaryButton', 'button')}
                  href={content.primaryButton.href}
                  className="px-8 py-3 text-white text-xs font-light tracking-widest uppercase hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: gold }}
                >
                  {content.primaryButton.label}
                </a>
              )}
              {content.secondaryButton && (
                <a
                  {...elementProps(config.id, 'secondaryButton', 'button')}
                  href={content.secondaryButton.href}
                  className="px-8 py-3 text-xs font-light tracking-widest uppercase border transition-colors hover:bg-zinc-50"
                  style={{ borderColor: gold, color: gold }}
                >
                  {content.secondaryButton.label}
                </a>
              )}
            </div>
          </div>
          {/* Image */}
          <div className="flex-1 aspect-[4/3] overflow-hidden">
            {content.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img {...elementProps(config.id, 'image', 'image')} src={content.image} alt={content.imageAlt ?? ''} className="w-full h-full object-cover" />
            ) : isEditing ? (
              <EditablePlaceholder sectionId={config.id} contentPath="image.src" type="image" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-zinc-100">
                <Image className="w-10 h-10 text-zinc-300" />
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // CREATIVE — Neobrutalist
  // ═══════════════════════════════════════════

  if (universe === 'creative') {
    return (
      <section className="bg-[#fdf6e3] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className={cn('max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-stretch gap-10', isLeft && 'lg:flex-row-reverse')}>
          {/* Text */}
          <div className="flex-1 space-y-5 flex flex-col justify-center">
            {content.eyebrow && (
              <span {...elementProps(config.id, 'eyebrow', 'badge')} className="inline-block self-start text-xs font-bold uppercase tracking-wider px-3 py-1.5 border-2 border-zinc-900 text-zinc-900 bg-white">
                {content.eyebrow}
              </span>
            )}
            {content.title && (
              <h2 {...elementProps(config.id, 'title', 'heading')} className="text-3xl md:text-5xl font-black text-zinc-900 leading-[0.95]" style={customTextColor ? { color: customTextColor } : undefined}>
                {content.title}
              </h2>
            )}
            {content.subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-zinc-600">{content.subtitle}</p>}
            {content.body && <p {...elementProps(config.id, 'body', 'text')} className="text-sm text-zinc-600 leading-relaxed">{content.body}</p>}
            {content.items && content.items.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-2">
                {content.items.map((item) => (
                  <div key={item.id} className={cn(
                    'bg-[#f5f0e3] rounded-lg px-4 py-3',
                    item.description ? 'w-full' : ''
                  )}>
                    <div className="flex items-center gap-3">
                      {item.icon && (
                        <DynamicIcon name={item.icon} className="w-5 h-5 flex-shrink-0" style={{ color: accentColor ?? '#B92E2D' }} />
                      )}
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-900">{item.title}</span>
                    </div>
                    {item.description && (
                      <p className="text-xs text-zinc-600 mt-2 leading-relaxed">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-3 flex-wrap pt-2">
              {content.primaryButton && (
                <a
                  {...elementProps(config.id, 'primaryButton', 'button')}
                  href={content.primaryButton.href}
                  className={cn(
                    'px-6 py-3 text-sm font-bold uppercase tracking-wide border-2 transition-all',
                    content.primaryButton.variant === 'outline'
                      ? 'bg-transparent border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white'
                      : 'bg-zinc-900 text-white border-zinc-900 shadow-[4px_4px_0_0_#18181b] hover:shadow-[6px_6px_0_0_#18181b] hover:translate-x-0.5 hover:-translate-y-0.5'
                  )}
                >
                  {content.primaryButton.label}
                </a>
              )}
              {content.secondaryButton && (
                <a
                  {...elementProps(config.id, 'secondaryButton', 'button')}
                  href={content.secondaryButton.href}
                  className="px-6 py-3 bg-white text-zinc-900 text-sm font-bold uppercase tracking-wide border-2 border-zinc-900 shadow-[4px_4px_0_0_#18181b] hover:shadow-[6px_6px_0_0_#18181b] hover:translate-x-0.5 hover:-translate-y-0.5 transition-all"
                >
                  {content.secondaryButton.label}
                </a>
              )}
            </div>
          </div>
          {/* Image */}
          <div className="flex-1 aspect-[4/3] border-2 border-zinc-900 overflow-hidden shadow-[6px_6px_0_0_#18181b]">
            {content.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img {...elementProps(config.id, 'image', 'image')} src={content.image} alt={content.imageAlt ?? ''} className="w-full h-full object-cover" />
            ) : isEditing ? (
              <EditablePlaceholder sectionId={config.id} contentPath="image.src" type="image" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-white">
                <Image className="w-10 h-10 text-zinc-400" />
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // ECOMMERCE — Green / Trust
  // ═══════════════════════════════════════════

  if (universe === 'ecommerce') {
    const accent = accentColor ?? '#059669'

    return (
      <section className="bg-white py-16" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className={cn('max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12', isLeft && 'lg:flex-row-reverse')}>
          {/* Text */}
          <div className="flex-1 space-y-5">
            {content.eyebrow && (
              <span {...elementProps(config.id, 'eyebrow', 'badge')} className="inline-block text-xs font-bold px-3 py-1 rounded-full text-white" style={{ backgroundColor: accent }}>
                {content.eyebrow}
              </span>
            )}
            {content.title && (
              <h2 {...elementProps(config.id, 'title', 'heading')} className="text-3xl md:text-4xl font-bold text-zinc-900 leading-tight" style={customTextColor ? { color: customTextColor } : undefined}>
                {content.title}
              </h2>
            )}
            {content.subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-zinc-500">{content.subtitle}</p>}
            {content.body && <p {...elementProps(config.id, 'body', 'text')} className="text-sm text-zinc-500 leading-relaxed">{content.body}</p>}
            <div className="flex gap-3 flex-wrap pt-2">
              {content.primaryButton && (
                <a
                  {...elementProps(config.id, 'primaryButton', 'button')}
                  href={content.primaryButton.href}
                  className="px-6 py-2.5 text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
                  style={{ backgroundColor: accent }}
                >
                  <Check className="w-4 h-4" />
                  {content.primaryButton.label}
                </a>
              )}
              {content.secondaryButton && (
                <a {...elementProps(config.id, 'secondaryButton', 'button')} href={content.secondaryButton.href} className="px-6 py-2.5 rounded-xl text-sm font-semibold border border-zinc-200 text-zinc-700 hover:bg-zinc-50 transition-colors">
                  {content.secondaryButton.label}
                </a>
              )}
            </div>
            {/* Trust badge */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                <svg className="w-4 h-4" style={{ color: accent }} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                Certifie
              </div>
              <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                <svg className="w-4 h-4" style={{ color: accent }} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Verifie
              </div>
            </div>
          </div>
          {/* Image */}
          <div className="flex-1 aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-100">
            {content.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img {...elementProps(config.id, 'image', 'image')} src={content.image} alt={content.imageAlt ?? ''} className="w-full h-full object-cover" />
            ) : isEditing ? (
              <EditablePlaceholder sectionId={config.id} contentPath="image.src" type="image" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Image className="w-10 h-10 text-zinc-300" />
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // GLASS — Dark / Glassmorphism
  // ═══════════════════════════════════════════

  if (universe === 'glass') {
    const accent = accentColor ?? '#818cf8'

    return (
      <section className="bg-[#0a0a0f] py-20 relative overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="absolute inset-0 dot-grid" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-30 blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${accent}20, transparent 70%)` }}
        />
        <div className={cn('relative max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12', isLeft && 'lg:flex-row-reverse')}>
          {/* Text */}
          <div className="flex-1 space-y-5">
            {content.eyebrow && (
              <span {...elementProps(config.id, 'eyebrow', 'badge')} className="inline-flex items-center gap-2 text-xs font-medium px-4 py-1.5 rounded-full border border-white/10 text-white/60 bg-white/[0.04] backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent, boxShadow: `0 0 8px ${accent}80` }} />
                {content.eyebrow}
              </span>
            )}
            {content.title && (
              <h2
                {...elementProps(config.id, 'title', 'heading')}
                className="text-3xl md:text-4xl font-bold gradient-text leading-tight"
                style={customTextColor ? { color: customTextColor, background: 'none', WebkitTextFillColor: 'unset' } : undefined}
              >
                {content.title}
              </h2>
            )}
            {content.subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-white/40">{content.subtitle}</p>}
            {content.body && <p {...elementProps(config.id, 'body', 'text')} className="text-sm text-white/40 leading-relaxed">{content.body}</p>}
            <div className="flex gap-3 flex-wrap pt-2">
              {content.primaryButton && (
                <a
                  {...elementProps(config.id, 'primaryButton', 'button')}
                  href={content.primaryButton.href}
                  className="px-6 py-2.5 text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: accent, boxShadow: `0 0 20px ${accent}30` }}
                >
                  {content.primaryButton.label}
                </a>
              )}
              {content.secondaryButton && (
                <a {...elementProps(config.id, 'secondaryButton', 'button')} href={content.secondaryButton.href} className="px-6 py-2.5 rounded-xl text-sm font-semibold border border-white/10 text-white/60 hover:bg-white/[0.06] transition-colors backdrop-blur-sm">
                  {content.secondaryButton.label}
                </a>
              )}
            </div>
          </div>
          {/* Image */}
          <div className="flex-1 aspect-[4/3] bg-white/[0.04] backdrop-blur-xl rounded-2xl overflow-hidden border border-white/[0.08]">
            {content.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img {...elementProps(config.id, 'image', 'image')} src={content.image} alt={content.imageAlt ?? ''} className="w-full h-full object-cover" />
            ) : isEditing ? (
              <EditablePlaceholder sectionId={config.id} contentPath="image.src" type="image" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Image className="w-10 h-10 text-white/20" />
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // OBSCURA — About the Photographer
  // ═══════════════════════════════════════════

  if (variant === 'obscura-about') {
    const statNumberStyle = {
      fontFamily: "'GeneralSans Variable', var(--font-heading, sans-serif)",
      fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
      fontWeight: 400,
      lineHeight: '110%',
      color: '#D4A853',
    } as const

    const paraStyle = {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '160%',
      color: '#8A8480',
      fontFamily: "'Inter Variable', var(--font-body, sans-serif)",
    } as const

    /* eslint-disable react-hooks/rules-of-hooks */
    const titleRevealRef = useBrixsaScrollReveal({ threshold: 0.15, disabled: isEditing })
    const counter500Ref = useBrixsaCounter(500, { disabled: isEditing })
    const counter12Ref = useBrixsaCounter(12, { disabled: isEditing })
    const counter50Ref = useBrixsaCounter(50, { disabled: isEditing })
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'About Section')}
        style={{ backgroundColor: '#0A0A0A', padding: 'clamp(60px, 12vw, 180px) clamp(20px, 5vw, 60px)', fontFamily: 'var(--font-body, inherit)' }}
      >
        <style>{`
          @media (max-width: 768px) {
            .obscura-resp-text-cols { grid-template-columns: 1fr !important; }
            .obscura-resp-stats { grid-template-columns: 1fr !important; }
          }
          .obscura-cta-btn {
            border: 1px solid #D4A853;
            background: transparent;
            color: #D4A853;
            padding: 14px 32px;
            font-family: "Inter Variable", sans-serif;
            font-size: 14px;
            font-weight: 400;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            cursor: pointer;
            transition: background 0.4s ease, color 0.4s ease;
            text-decoration: none;
            display: inline-block;
          }
          .obscura-cta-btn:hover {
            background: #D4A853;
            color: #0A0A0A;
          }
        `}</style>
        <div
          {...elementProps(config.id, 'container', 'container', 'Container')}
          className="mx-auto"
          style={{ maxWidth: '1320px' }}
        >
          {/* Title — full width, large asymmetric */}
          <h2
            {...elementProps(config.id, 'title', 'heading')}
            ref={titleRevealRef}
            style={{
              fontFamily: "'GeneralSans Variable', var(--font-heading, sans-serif)",
              fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
              fontWeight: 400,
              lineHeight: '110%',
              color: customTextColor ?? '#E8E4DF',
              maxWidth: '680px',
              margin: 0,
            }}
          >
            {content.title || 'Capturer l\u2019Essence de Chaque Instant, Avec Passion et Pr\u00e9cision'}
          </h2>

          {/* Two paragraphs side by side — offset right */}
          <div
            {...elementProps(config.id, 'textRow', 'container', 'Text Row')}
            className="grid grid-cols-2 obscura-resp-text-cols"
            style={{ gap: 'clamp(16px, 3vw, 32px)', marginTop: 'clamp(60px, 8vw, 120px)', marginLeft: 'auto', maxWidth: '780px' }}
          >
            <p
              {...elementProps(config.id, 'subtitle', 'text')}
              style={paraStyle}
            >
              {content.subtitle || 'Chaque image raconte une histoire unique. Mon approche allie technique ma\u00eetris\u00e9e et sensibilit\u00e9 artistique pour cr\u00e9er des photographies qui transcendent le simple souvenir et deviennent de v\u00e9ritables \u0153uvres intemporelles.'}
            </p>
            <p
              {...elementProps(config.id, 'body', 'text')}
              style={paraStyle}
            >
              {content.body || 'De la lumi\u00e8re naturelle aux compositions soign\u00e9es, je m\u2019attache \u00e0 r\u00e9v\u00e9ler la beaut\u00e9 authentique de chaque sujet. Portraits, mariages, \u00e9v\u00e9nements \u2014 chaque projet est une nouvelle opportunit\u00e9 de repousser les limites de la cr\u00e9ativit\u00e9.'}
            </p>
          </div>

          {/* Stats — 3 columns, offset right */}
          <div
            {...elementProps(config.id, 'statsRow', 'container', 'Stats Row')}
            className="grid grid-cols-3 obscura-resp-stats"
            style={{ gap: 'clamp(16px, 3vw, 32px)', marginTop: 'clamp(40px, 6vw, 80px)', marginLeft: 'auto', maxWidth: '780px' }}
          >
            <div {...elementProps(config.id, 'stat1', 'container', 'Stat Block')}>
              <div
                {...elementProps(config.id, 'stat1Value', 'text', 'Stat Value')}
                className="flex items-baseline"
                style={statNumberStyle}
              >
                <span ref={counter500Ref}>0</span>
                <span>+</span>
              </div>
              <p style={{ marginTop: '4px', fontSize: '14px', fontWeight: 400, color: '#8A8480', fontFamily: "'Inter Variable', sans-serif" }}>
                Projets r\u00e9alis\u00e9s
              </p>
            </div>
            <div {...elementProps(config.id, 'stat2', 'container', 'Stat Block')}>
              <div
                {...elementProps(config.id, 'stat2Value', 'text', 'Stat Value')}
                className="flex items-baseline"
                style={statNumberStyle}
              >
                <span ref={counter12Ref}>0</span>
              </div>
              <p style={{ marginTop: '4px', fontSize: '14px', fontWeight: 400, color: '#8A8480', fontFamily: "'Inter Variable', sans-serif" }}>
                Ann\u00e9es d\u2019exp\u00e9rience
              </p>
            </div>
            <div {...elementProps(config.id, 'stat3', 'container', 'Stat Block')}>
              <div
                {...elementProps(config.id, 'stat3Value', 'text', 'Stat Value')}
                className="flex items-baseline"
                style={statNumberStyle}
              >
                <span ref={counter50Ref}>0</span>
                <span>+</span>
              </div>
              <p style={{ marginTop: '4px', fontSize: '14px', fontWeight: 400, color: '#8A8480', fontFamily: "'Inter Variable', sans-serif" }}>
                Mariages photographi\u00e9s
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div
            {...elementProps(config.id, 'ctaRow', 'container', 'CTA Row')}
            style={{ marginTop: 'clamp(40px, 6vw, 80px)', marginLeft: 'auto', maxWidth: '780px' }}
          >
            <a
              {...elementProps(config.id, 'ctaButton', 'button', 'CTA Button')}
              href="/contact"
              className="obscura-cta-btn"
            >
              {(content as Record<string, unknown>).ctaLabel as string ?? 'Me contacter'}
            </a>
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // CANOPY STORY — Sustainability Storytelling
  // ═══════════════════════════════════════════

  if (variant === 'canopy-story') {
    const forestGreen = '#2D5016'
    const taupe = '#8B7355'

    const paraStyle = {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '150%',
      color: '#1A1A1A',
      fontFamily: "'Inter Variable', var(--font-body, sans-serif)",
    } as const

    const statNumberStyle = {
      fontFamily: "'Inter Variable', var(--font-heading, sans-serif)",
      fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
      fontWeight: 700,
      lineHeight: '110%',
      color: forestGreen,
    } as const

    /* eslint-disable react-hooks/rules-of-hooks */
    const titleRevealRef = useBrixsaScrollReveal({ threshold: 0.15, disabled: isEditing })
    const counter95Ref = useBrixsaCounter(95, { disabled: isEditing })
    const counter60Ref = useBrixsaCounter(60, { disabled: isEditing })
    const counter100Ref = useBrixsaCounter(100, { disabled: isEditing })
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Canopy Story Section')}
        style={{ backgroundColor: '#FAFAF8', padding: 'clamp(60px, 12vw, 180px) clamp(20px, 5vw, 60px)', fontFamily: "'Inter Variable', var(--font-body, sans-serif)" }}
      >
        <style>{`
          @media (max-width: 768px) {
            .canopy-story-text-cols { grid-template-columns: 1fr !important; }
          }
        `}</style>
        <div
          {...elementProps(config.id, 'container', 'container', 'Container')}
          className="mx-auto"
          style={{ maxWidth: '1320px' }}
        >
          {/* Title — full width, big asymmetric (brixsa-about layout) */}
          <div ref={titleRevealRef}>
            <h2
              {...elementProps(config.id, 'title', 'heading')}
              style={{
                fontFamily: "'Inter Variable', var(--font-heading, sans-serif)",
                fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
                fontWeight: 700,
                lineHeight: '110%',
                letterSpacing: '-0.02em',
                color: customTextColor ?? '#1A1A1A',
                maxWidth: '680px',
              }}
            >
              {content.title || 'Des matériaux qui changent tout pour la planète'}
            </h2>
          </div>

          {/* Two paragraphs side by side — offset right */}
          <div
            {...elementProps(config.id, 'textRow', 'container', 'Text Row')}
            className="grid grid-cols-2 canopy-story-text-cols"
            style={{ gap: 'clamp(16px, 3vw, 32px)', marginTop: 'clamp(60px, 8vw, 120px)', marginLeft: 'auto', maxWidth: '780px' }}
          >
            <p
              {...elementProps(config.id, 'subtitle', 'text')}
              style={paraStyle}
            >
              {content.subtitle || 'Nous croyons que les meilleurs produits sont ceux qui sont bons pour vous et pour la planète. Chaque paire est conçue avec des matériaux naturels — laine mérinos, fibre d\'eucalyptus, mousse de canne à sucre.'}
            </p>
            <p
              {...elementProps(config.id, 'body', 'text')}
              style={paraStyle}
            >
              {content.body || 'Un confort inégalé et une empreinte carbone réduite. Nos procédés de fabrication privilégient les circuits courts et les énergies renouvelables pour minimiser notre impact à chaque étape.'}
            </p>
          </div>

          {/* Counter stats — offset right */}
          <div
            {...elementProps(config.id, 'statsRow', 'container', 'Stats Row')}
            className="grid grid-cols-3"
            style={{ gap: 'clamp(16px, 3vw, 32px)', marginTop: 'clamp(40px, 6vw, 80px)', marginLeft: 'auto', maxWidth: '780px' }}
          >
            <div {...elementProps(config.id, 'stat1', 'container', 'Stat Block')}>
              <div
                {...elementProps(config.id, 'stat1Value', 'text')}
                className="flex items-baseline"
                style={statNumberStyle}
              >
                <span ref={counter95Ref}>0</span>
                <span>%</span>
              </div>
              <p style={{ marginTop: '4px', fontSize: '16px', fontWeight: 400, color: taupe }}>
                Matériaux naturels
              </p>
            </div>
            <div {...elementProps(config.id, 'stat2', 'container', 'Stat Block')}>
              <div
                {...elementProps(config.id, 'stat2Value', 'text')}
                className="flex items-baseline"
                style={statNumberStyle}
              >
                <span ref={counter60Ref}>0</span>
                <span>%</span>
              </div>
              <p style={{ marginTop: '4px', fontSize: '16px', fontWeight: 400, color: taupe }}>
                Moins de CO₂
              </p>
            </div>
            <div {...elementProps(config.id, 'stat3', 'container', 'Stat Block')}>
              <div
                {...elementProps(config.id, 'stat3Value', 'text')}
                className="flex items-baseline"
                style={statNumberStyle}
              >
                <span ref={counter100Ref}>0</span>
                <span>%</span>
              </div>
              <p style={{ marginTop: '4px', fontSize: '16px', fontWeight: 400, color: taupe }}>
                Recyclable
              </p>
            </div>
          </div>

          {/* CTA Button */}
          {content.primaryButton && (
            <div style={{ marginTop: 'clamp(40px, 6vw, 80px)', marginLeft: 'auto', maxWidth: '780px' }}>
              <a
                {...elementProps(config.id, 'primaryButton', 'button')}
                href={content.primaryButton.href}
                style={{
                  display: 'inline-block',
                  padding: '16px 36px',
                  background: '#1A1A1A',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  border: 'none',
                  transition: 'background 0.3s ease',
                }}
              >
                {content.primaryButton.label}
              </a>
            </div>
          )}
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // NACRE ABOUT — Asymmetric Layout with Counters (Nail Salon)
  // ═══════════════════════════════════════════

  if (variant === 'nacre-about') {
    const statNumberStyle = {
      fontFamily: "'GeneralSans Variable', var(--font-heading, sans-serif)",
      fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
      fontWeight: 500,
      lineHeight: '110%',
      color: '#2A1A1E',
    } as const

    const paraStyle = {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '150%',
      color: '#2A1A1E',
      fontFamily: "'Inter Variable', var(--font-body, sans-serif)",
    } as const

    /* eslint-disable react-hooks/rules-of-hooks */
    const titleRevealRef = useBrixsaScrollReveal({ threshold: 0.15, disabled: isEditing })
    const counter500Ref = useBrixsaCounter(500, { disabled: isEditing })
    const counter8Ref = useBrixsaCounter(8, { disabled: isEditing })
    const counter15Ref = useBrixsaCounter(15, { disabled: isEditing })
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'About Section')}
        style={{ backgroundColor: '#F5E6E0', padding: 'clamp(60px, 12vw, 180px) clamp(20px, 5vw, 60px)', fontFamily: 'var(--font-body, inherit)' }}
      >
        <style>{`
          @media (max-width: 768px) {
            .nacre-resp-text-cols { grid-template-columns: 1fr !important; }
            .nacre-resp-stats { grid-template-columns: 1fr !important; }
          }
        `}</style>
        <div
          {...elementProps(config.id, 'container', 'container', 'Container')}
          className="mx-auto"
          style={{ maxWidth: '1320px' }}
        >
          {/* Title — full width */}
          <h2
            ref={titleRevealRef}
            {...elementProps(config.id, 'title', 'heading')}
            style={{
              fontFamily: "'GeneralSans Variable', var(--font-heading, sans-serif)",
              fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
              fontWeight: 500,
              lineHeight: '110%',
              textTransform: 'capitalize',
              color: customTextColor ?? '#2A1A1E',
              maxWidth: '680px',
            }}
          >
            {content.title || 'Un savoir-faire d\u2019exception au service de votre beaut\u00e9'}
          </h2>

          {/* Two paragraphs side by side — offset right */}
          <div
            {...elementProps(config.id, 'textRow', 'container', 'Text Row')}
            className="grid grid-cols-2 nacre-resp-text-cols"
            style={{ gap: 'clamp(16px, 3vw, 32px)', marginTop: 'clamp(60px, 8vw, 120px)', marginLeft: 'auto', maxWidth: '780px' }}
          >
            <p
              {...elementProps(config.id, 'subtitle', 'text')}
              style={paraStyle}
            >
              {content.subtitle || 'Notre institut allie techniques innovantes et produits haut de gamme pour sublimer vos mains et vos pieds. Chaque prestation est r\u00e9alis\u00e9e dans un cadre raffin\u00e9, pens\u00e9 pour votre bien-\u00eatre.'}
            </p>
            <p
              {...elementProps(config.id, 'body', 'text')}
              style={paraStyle}
            >
              {content.body || 'De la manucure classique au nail art cr\u00e9atif, en passant par les soins des ongles et les extensions gel, nous proposons une gamme compl\u00e8te de prestations personnalis\u00e9es selon vos envies et votre style.'}
            </p>
          </div>

          {/* Stats — offset right */}
          <div
            {...elementProps(config.id, 'statsRow', 'container', 'Stats Row')}
            className="grid grid-cols-3 nacre-resp-stats"
            style={{ gap: 'clamp(16px, 3vw, 32px)', marginTop: 'clamp(40px, 6vw, 80px)', marginLeft: 'auto', maxWidth: '780px' }}
          >
            <div {...elementProps(config.id, 'stat1', 'container', 'Stat Block')}>
              <div
                {...elementProps(config.id, 'stat1Value', 'text')}
                className="flex items-baseline"
                style={statNumberStyle}
              >
                <span ref={counter500Ref}>0</span>
                <span>+</span>
              </div>
              <p style={{ marginTop: '4px', fontSize: '16px', fontWeight: 400, color: '#8A7A75' }}>
                Clientes fid\u00e8les
              </p>
            </div>
            <div {...elementProps(config.id, 'stat2', 'container', 'Stat Block')}>
              <div {...elementProps(config.id, 'stat2Value', 'text')} className="flex items-baseline" style={statNumberStyle}>
                <span ref={counter8Ref}>0</span>
              </div>
              <p style={{ marginTop: '4px', fontSize: '16px', fontWeight: 400, color: '#8A7A75' }}>
                Ans d&apos;exp\u00e9rience
              </p>
            </div>
            <div {...elementProps(config.id, 'stat3', 'container', 'Stat Block')}>
              <div {...elementProps(config.id, 'stat3Value', 'text')} className="flex items-baseline" style={statNumberStyle}>
                <span ref={counter15Ref}>0</span>
                <span>+</span>
              </div>
              <p style={{ marginTop: '4px', fontSize: '16px', fontWeight: 400, color: '#8A7A75' }}>
                Prestations
              </p>
            </div>
          </div>

          {/* CTA Button */}
          {content.primaryButton && (
            <div style={{ marginTop: 'clamp(40px, 6vw, 80px)', marginLeft: 'auto', maxWidth: '780px' }}>
              <a
                {...elementProps(config.id, 'primaryButton', 'link')}
                href={content.primaryButton.href ?? '#'}
                style={{
                  display: 'inline-block',
                  backgroundColor: '#C9A96E',
                  color: '#2A1A1E',
                  fontFamily: "'GeneralSans Variable', sans-serif",
                  fontWeight: 500,
                  fontSize: 16,
                  padding: '16px 40px',
                  textDecoration: 'none',
                  transition: 'opacity 0.3s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
              >
                {content.primaryButton.label ?? 'D\u00e9couvrir nos soins'}
              </a>
            </div>
          )}
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // BRAISE STORY — Restaurant Asymmetric Image + Text
  // ═══════════════════════════════════════════

  if (variant === 'braise-story') {
    const statNumberStyle = {
      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
      fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
      fontWeight: 500,
      lineHeight: '110%',
      color: '#C8A96E',
    } as const

    const paraStyle = {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '170%',
      color: '#E8E4DF',
      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
    } as const

    /* eslint-disable react-hooks/rules-of-hooks */
    const titleRevealRef = useBrixsaScrollReveal({ threshold: 0.15, disabled: isEditing })
    const imageRevealRef = useBrixsaScrollReveal({ threshold: 0.1, disabled: isEditing })
    const counter15Ref = useBrixsaCounter(15, { disabled: isEditing })
    const counter2Ref = useBrixsaCounter(2, { disabled: isEditing })
    const counter45Ref = useBrixsaCounter(45, { disabled: isEditing })
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'About Section')}
        style={{
          backgroundColor: '#1A1209',
          padding: 'clamp(60px, 12vw, 180px) clamp(20px, 5vw, 60px)',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        <style>{`
          @media (max-width: 968px) {
            .braise-story-grid { grid-template-columns: 1fr !important; }
            .braise-story-image { min-height: 400px !important; }
          }
          .braise-story-image:hover .braise-story-img { transform: scale(1.03) !important; }
          .braise-story-cta:hover {
            background-color: #C8A96E !important;
            color: #1A1209 !important;
          }
        `}</style>
        <div
          {...elementProps(config.id, 'container', 'container', 'Container')}
          className="mx-auto braise-story-grid"
          style={{
            maxWidth: '1320px',
            display: 'grid',
            gridTemplateColumns: '55% 45%',
            gap: 'clamp(32px, 5vw, 80px)',
            alignItems: 'center',
          }}
        >
          {/* Left — Image with scroll reveal dezoom */}
          <div
            ref={imageRevealRef}
            {...elementProps(config.id, 'imageContainer', 'container', 'Image Container')}
            className="braise-story-image"
            style={{
              position: 'relative',
              overflow: 'hidden',
              minHeight: 600,
              borderRadius: 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              {...elementProps(config.id, 'image', 'image', 'Chef Image')}
              src={content.image || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1200&q=85'}
              alt={content.title || 'Notre histoire'}
              className="braise-story-img"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: 'scale(1.08)',
                transition: 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            />
          </div>

          {/* Right — Text content */}
          <div
            ref={titleRevealRef}
            {...elementProps(config.id, 'textContent', 'container', 'Text Content')}
            style={{ display: 'flex', flexDirection: 'column', gap: 0 }}
          >
            {/* Subtitle / Eyebrow */}
            <span
              {...elementProps(config.id, 'eyebrow', 'text')}
              style={{
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: '3px',
                textTransform: 'uppercase' as const,
                color: '#C8A96E',
                marginBottom: 20,
              }}
            >
              {content.eyebrow || 'NOTRE HISTOIRE'}
            </span>

            {/* Title */}
            <h2
              {...elementProps(config.id, 'title', 'heading')}
              style={{
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                fontSize: 'clamp(2rem, 1.3rem + 3.2vw, 3.5rem)',
                fontWeight: 500,
                lineHeight: '115%',
                color: customTextColor ?? '#F5F0E8',
                margin: 0,
                marginBottom: 24,
              }}
            >
              {content.title || 'Une passion transmise de génération en génération'}
            </h2>

            {/* Body text */}
            <p
              {...elementProps(config.id, 'body', 'text')}
              style={{
                ...paraStyle,
                marginBottom: 'clamp(32px, 5vw, 56px)',
                maxWidth: 480,
              }}
            >
              {content.body || 'Depuis plus de quinze ans, notre chef perpétue un savoir-faire d\'exception, alliant produits d\'exception et techniques modernes pour créer une cuisine qui raconte une histoire à chaque assiette.'}
            </p>

            {/* Counter stats */}
            <div
              {...elementProps(config.id, 'statsRow', 'container', 'Stats Row')}
              style={{
                display: 'flex',
                gap: 'clamp(24px, 4vw, 48px)',
                marginBottom: 'clamp(32px, 5vw, 56px)',
              }}
            >
              <div {...elementProps(config.id, 'stat1', 'container', 'Stat Block')}>
                <div
                  {...elementProps(config.id, 'stat1Value', 'text')}
                  className="flex items-baseline"
                  style={statNumberStyle}
                >
                  <span ref={counter15Ref}>0</span>
                  <span>+</span>
                </div>
                <p style={{ marginTop: '4px', fontSize: '13px', fontWeight: 400, color: 'rgba(232, 228, 223, 0.6)', letterSpacing: '0.5px' }}>
                  Années d&apos;expérience
                </p>
              </div>
              <div {...elementProps(config.id, 'stat2', 'container', 'Stat Block')}>
                <div {...elementProps(config.id, 'stat2Value', 'text')} className="flex items-baseline" style={statNumberStyle}>
                  <span ref={counter2Ref}>0</span>
                </div>
                <p style={{ marginTop: '4px', fontSize: '13px', fontWeight: 400, color: 'rgba(232, 228, 223, 0.6)', letterSpacing: '0.5px' }}>
                  Étoiles Michelin
                </p>
              </div>
              <div {...elementProps(config.id, 'stat3', 'container', 'Stat Block')}>
                <div {...elementProps(config.id, 'stat3Value', 'text')} className="flex items-baseline" style={statNumberStyle}>
                  <span ref={counter45Ref}>0</span>
                </div>
                <p style={{ marginTop: '4px', fontSize: '13px', fontWeight: 400, color: 'rgba(232, 228, 223, 0.6)', letterSpacing: '0.5px' }}>
                  Couverts par service
                </p>
              </div>
            </div>

            {/* CTA Button — gold outline → fill on hover */}
            <a
              {...elementProps(config.id, 'primaryButton', 'link')}
              href={content.primaryButton?.href ?? '#'}
              className="braise-story-cta"
              style={{
                display: 'inline-block',
                border: '1px solid #C8A96E',
                backgroundColor: 'transparent',
                color: '#C8A96E',
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                fontWeight: 500,
                fontSize: 14,
                letterSpacing: '1.5px',
                textTransform: 'uppercase' as const,
                padding: '16px 40px',
                textDecoration: 'none',
                transition: 'background-color 0.4s ease, color 0.4s ease',
                alignSelf: 'flex-start',
              }}
            >
              {content.primaryButton?.label ?? 'Découvrir notre carte'}
            </a>
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // FORGE STORY — Sports Coach Asymmetric Layout
  // ═══════════════════════════════════════════

  if (variant === 'forge-story') {
    const statNumberStyle = {
      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
      fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
      fontWeight: 500,
      lineHeight: '110%',
      color: '#FF4D00',
    } as const

    const paraStyle = {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '170%',
      color: '#E8E8E8',
      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
    } as const

    /* eslint-disable react-hooks/rules-of-hooks */
    const titleRevealRef = useBrixsaScrollReveal({ threshold: 0.15, disabled: isEditing })
    const imageRevealRef = useBrixsaScrollReveal({ threshold: 0.1, disabled: isEditing })
    const counter12Ref = useBrixsaCounter(12, { disabled: isEditing })
    const counter500Ref = useBrixsaCounter(500, { disabled: isEditing })
    const counter98Ref = useBrixsaCounter(98, { disabled: isEditing })
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'About Section')}
        style={{
          backgroundColor: '#0A0A0A',
          padding: 'clamp(60px, 12vw, 180px) clamp(20px, 5vw, 60px)',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        <style>{`
          @media (max-width: 968px) {
            .forge-story-grid { grid-template-columns: 1fr !important; }
            .forge-story-image { min-height: 400px !important; }
          }
          .forge-story-image:hover .forge-story-img { transform: scale(1.03) !important; }
          .forge-story-cta:hover {
            background-color: #FF4D00 !important;
            color: #0A0A0A !important;
          }
        `}</style>
        <div
          {...elementProps(config.id, 'container', 'container', 'Container')}
          className="mx-auto forge-story-grid"
          style={{
            maxWidth: '1320px',
            display: 'grid',
            gridTemplateColumns: '55% 45%',
            gap: 'clamp(32px, 5vw, 80px)',
            alignItems: 'center',
          }}
        >
          {/* Left — Image with scroll reveal dezoom */}
          <div
            ref={imageRevealRef}
            {...elementProps(config.id, 'imageContainer', 'container', 'Image Container')}
            className="forge-story-image"
            style={{
              position: 'relative',
              overflow: 'hidden',
              minHeight: 600,
              borderRadius: 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              {...elementProps(config.id, 'image', 'image', 'Coach Image')}
              src={content.image || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=85'}
              alt={content.title || 'Mon parcours'}
              className="forge-story-img"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: 'scale(1.08)',
                transition: 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            />
          </div>

          {/* Right — Text content */}
          <div
            ref={titleRevealRef}
            {...elementProps(config.id, 'textContent', 'container', 'Text Content')}
            style={{ display: 'flex', flexDirection: 'column', gap: 0 }}
          >
            {/* Subtitle / Eyebrow */}
            <span
              {...elementProps(config.id, 'eyebrow', 'text')}
              style={{
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: '3px',
                textTransform: 'uppercase' as const,
                color: '#FF4D00',
                marginBottom: 20,
              }}
            >
              {content.eyebrow || 'MON PARCOURS'}
            </span>

            {/* Title */}
            <h2
              {...elementProps(config.id, 'title', 'heading')}
              style={{
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                fontSize: 'clamp(2rem, 1.3rem + 3.2vw, 3.5rem)',
                fontWeight: 500,
                lineHeight: '115%',
                color: customTextColor ?? '#E8E8E8',
                margin: 0,
                marginBottom: 24,
              }}
            >
              {content.title || 'Plus qu\'un coach, un partenaire de transformation'}
            </h2>

            {/* Body text */}
            <p
              {...elementProps(config.id, 'body', 'text')}
              style={{
                ...paraStyle,
                marginBottom: 'clamp(32px, 5vw, 56px)',
                maxWidth: 480,
              }}
            >
              {content.body || 'Depuis plus de douze ans, j\'accompagne des hommes et des femmes dans leur transformation physique et mentale. Ma m\u00e9thode allie science du sport, nutrition personnalis\u00e9e et coaching mental pour des r\u00e9sultats durables et mesurables.'}
            </p>

            {/* Counter stats */}
            <div
              {...elementProps(config.id, 'statsRow', 'container', 'Stats Row')}
              style={{
                display: 'flex',
                gap: 'clamp(24px, 4vw, 48px)',
                marginBottom: 'clamp(32px, 5vw, 56px)',
              }}
            >
              <div {...elementProps(config.id, 'stat1', 'container', 'Stat Block')}>
                <div
                  {...elementProps(config.id, 'stat1Value', 'text')}
                  className="flex items-baseline"
                  style={statNumberStyle}
                >
                  <span ref={counter12Ref}>0</span>
                  <span>+</span>
                </div>
                <p style={{ marginTop: '4px', fontSize: '13px', fontWeight: 400, color: '#888888', letterSpacing: '0.5px' }}>
                  Ann&eacute;es d&apos;exp&eacute;rience
                </p>
              </div>
              <div {...elementProps(config.id, 'stat2', 'container', 'Stat Block')}>
                <div {...elementProps(config.id, 'stat2Value', 'text')} className="flex items-baseline" style={statNumberStyle}>
                  <span ref={counter500Ref}>0</span>
                  <span>+</span>
                </div>
                <p style={{ marginTop: '4px', fontSize: '13px', fontWeight: 400, color: '#888888', letterSpacing: '0.5px' }}>
                  Clients transform&eacute;s
                </p>
              </div>
              <div {...elementProps(config.id, 'stat3', 'container', 'Stat Block')}>
                <div {...elementProps(config.id, 'stat3Value', 'text')} className="flex items-baseline" style={statNumberStyle}>
                  <span ref={counter98Ref}>0</span>
                  <span>%</span>
                </div>
                <p style={{ marginTop: '4px', fontSize: '13px', fontWeight: 400, color: '#888888', letterSpacing: '0.5px' }}>
                  Taux de satisfaction
                </p>
              </div>
            </div>

            {/* CTA Button — orange outline, fill on hover */}
            <a
              {...elementProps(config.id, 'primaryButton', 'link')}
              href={content.primaryButton?.href ?? '#'}
              className="forge-story-cta"
              style={{
                display: 'inline-block',
                border: '1px solid #FF4D00',
                backgroundColor: 'transparent',
                color: '#FF4D00',
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                fontWeight: 500,
                fontSize: 14,
                letterSpacing: '1.5px',
                textTransform: 'uppercase' as const,
                padding: '16px 40px',
                textDecoration: 'none',
                transition: 'background-color 0.4s ease, color 0.4s ease',
                alignSelf: 'flex-start',
              }}
            >
              {content.primaryButton?.label ?? 'D\u00e9couvrir les programmes'}
            </a>
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // CISEAUX STORY — Hair Salon Asymmetric Layout
  // ═══════════════════════════════════════════

  if (variant === 'ciseaux-story') {
    const statNumberStyle = {
      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
      fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
      fontWeight: 500,
      lineHeight: '110%',
      color: '#B76E79',
    } as const

    const paraStyle = {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '170%',
      color: '#B5B0A8',
      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
    } as const

    /* eslint-disable react-hooks/rules-of-hooks */
    const titleRevealRef = useBrixsaScrollReveal({ threshold: 0.15, disabled: isEditing })
    const imageRevealRef = useBrixsaScrollReveal({ threshold: 0.1, disabled: isEditing })
    const counter20Ref = useBrixsaCounter(20, { disabled: isEditing })
    const counter3Ref = useBrixsaCounter(3, { disabled: isEditing })
    const counter5000Ref = useBrixsaCounter(5000, { disabled: isEditing })
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'About Section')}
        style={{
          backgroundColor: '#0B0B0B',
          padding: 'clamp(60px, 12vw, 180px) clamp(20px, 5vw, 60px)',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        <style>{`
          @media (max-width: 968px) {
            .ciseaux-story-grid { grid-template-columns: 1fr !important; }
            .ciseaux-story-image { min-height: 400px !important; }
          }
          .ciseaux-story-image:hover .ciseaux-story-img { transform: scale(1.03) !important; }
          .ciseaux-story-cta:hover {
            background-color: #B76E79 !important;
            color: #0B0B0B !important;
          }
        `}</style>
        <div
          {...elementProps(config.id, 'container', 'container', 'Container')}
          className="mx-auto ciseaux-story-grid"
          style={{
            maxWidth: '1320px',
            display: 'grid',
            gridTemplateColumns: '55% 45%',
            gap: 'clamp(32px, 5vw, 80px)',
            alignItems: 'center',
          }}
        >
          {/* Left — Image with scroll reveal dezoom */}
          <div
            ref={imageRevealRef}
            {...elementProps(config.id, 'imageContainer', 'container', 'Image Container')}
            className="ciseaux-story-image"
            style={{
              position: 'relative',
              overflow: 'hidden',
              minHeight: 600,
              borderRadius: 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              {...elementProps(config.id, 'image', 'image', 'Salon Image')}
              src={content.image || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=85'}
              alt={content.title || 'Notre histoire'}
              className="ciseaux-story-img"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: 'scale(1.08)',
                transition: 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            />
          </div>

          {/* Right — Text content */}
          <div
            ref={titleRevealRef}
            {...elementProps(config.id, 'textContent', 'container', 'Text Content')}
            style={{ display: 'flex', flexDirection: 'column', gap: 0 }}
          >
            {/* Subtitle / Eyebrow */}
            <span
              {...elementProps(config.id, 'eyebrow', 'text')}
              style={{
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: '3px',
                textTransform: 'uppercase' as const,
                color: '#B76E79',
                marginBottom: 20,
              }}
            >
              {content.eyebrow || 'NOTRE HISTOIRE'}
            </span>

            {/* Title */}
            <h2
              {...elementProps(config.id, 'title', 'heading')}
              style={{
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                fontSize: 'clamp(2rem, 1.3rem + 3.2vw, 3.5rem)',
                fontWeight: 500,
                lineHeight: '115%',
                color: customTextColor ?? '#FFFFFF',
                margin: 0,
                marginBottom: 24,
              }}
            >
              {content.title || 'Un savoir-faire artisanal au service de votre style'}
            </h2>

            {/* Body text */}
            <p
              {...elementProps(config.id, 'body', 'text')}
              style={{
                ...paraStyle,
                marginBottom: 'clamp(32px, 5vw, 56px)',
                maxWidth: 480,
              }}
            >
              {content.body || 'Depuis plus de vingt ans, notre équipe de coiffeurs passionnés perpétue un savoir-faire d\'exception, alliant techniques modernes et attention personnalisée pour révéler la meilleure version de vous-même.'}
            </p>

            {/* Counter stats */}
            <div
              {...elementProps(config.id, 'statsRow', 'container', 'Stats Row')}
              style={{
                display: 'flex',
                gap: 'clamp(24px, 4vw, 48px)',
                marginBottom: 'clamp(32px, 5vw, 56px)',
              }}
            >
              <div {...elementProps(config.id, 'stat1', 'container', 'Stat Block')}>
                <div
                  {...elementProps(config.id, 'stat1Value', 'text')}
                  className="flex items-baseline"
                  style={statNumberStyle}
                >
                  <span ref={counter20Ref}>0</span>
                  <span>+</span>
                </div>
                <p style={{ marginTop: '4px', fontSize: '13px', fontWeight: 400, color: 'rgba(181, 176, 168, 0.6)', letterSpacing: '0.5px' }}>
                  Années d&apos;expérience
                </p>
              </div>
              <div {...elementProps(config.id, 'stat2', 'container', 'Stat Block')}>
                <div {...elementProps(config.id, 'stat2Value', 'text')} className="flex items-baseline" style={statNumberStyle}>
                  <span ref={counter3Ref}>0</span>
                </div>
                <p style={{ marginTop: '4px', fontSize: '13px', fontWeight: 400, color: 'rgba(181, 176, 168, 0.6)', letterSpacing: '0.5px' }}>
                  Coiffeurs experts
                </p>
              </div>
              <div {...elementProps(config.id, 'stat3', 'container', 'Stat Block')}>
                <div {...elementProps(config.id, 'stat3Value', 'text')} className="flex items-baseline" style={statNumberStyle}>
                  <span ref={counter5000Ref}>0</span>
                  <span>+</span>
                </div>
                <p style={{ marginTop: '4px', fontSize: '13px', fontWeight: 400, color: 'rgba(181, 176, 168, 0.6)', letterSpacing: '0.5px' }}>
                  Clients fidèles
                </p>
              </div>
            </div>

            {/* CTA Button — copper outline → fill on hover */}
            <a
              {...elementProps(config.id, 'primaryButton', 'link')}
              href={content.primaryButton?.href ?? '#'}
              className="ciseaux-story-cta"
              style={{
                display: 'inline-block',
                border: '1px solid #B76E79',
                backgroundColor: 'transparent',
                color: '#B76E79',
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                fontWeight: 500,
                fontSize: 14,
                letterSpacing: '1.5px',
                textTransform: 'uppercase' as const,
                padding: '16px 40px',
                textDecoration: 'none',
                transition: 'background-color 0.4s ease, color 0.4s ease',
                alignSelf: 'flex-start',
              }}
            >
              {content.primaryButton?.label ?? 'Prendre rendez-vous'}
            </a>
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // ARCHITECTE ATELIER STORY — Interior Architect Asymmetric Layout
  // ═══════════════════════════════════════════

  if (variant === 'atelier-story') {
    const statNumberStyle = {
      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
      fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
      fontWeight: 500,
      lineHeight: '110%',
      color: '#C4B5A0',
    } as const

    const paraStyle = {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '170%',
      color: '#B5B0A8',
      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
    } as const

    /* eslint-disable react-hooks/rules-of-hooks */
    const titleRevealRef = useBrixsaScrollReveal({ threshold: 0.15, disabled: isEditing })
    const imageRevealRef = useBrixsaScrollReveal({ threshold: 0.1, disabled: isEditing })
    const counter150Ref = useBrixsaCounter(150, { disabled: isEditing })
    const counter12000Ref = useBrixsaCounter(12000, { disabled: isEditing })
    const counter15Ref = useBrixsaCounter(15, { disabled: isEditing })
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'About Section')}
        style={{
          backgroundColor: '#1A1A1A',
          padding: 'clamp(60px, 12vw, 180px) clamp(20px, 5vw, 60px)',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        <style>{`
          @media (max-width: 968px) {
            .atelier-story-grid { grid-template-columns: 1fr !important; }
            .atelier-story-image { min-height: 400px !important; }
          }
          .atelier-story-image:hover .atelier-story-img { transform: scale(1.03) !important; }
          .atelier-story-cta:hover {
            background-color: #8B7355 !important;
            color: #1A1A1A !important;
          }
        `}</style>
        <div
          {...elementProps(config.id, 'container', 'container', 'Container')}
          className="mx-auto atelier-story-grid"
          style={{
            maxWidth: '1320px',
            display: 'grid',
            gridTemplateColumns: '55% 45%',
            gap: 'clamp(32px, 5vw, 80px)',
            alignItems: 'center',
          }}
        >
          {/* Left — Image with scroll reveal dezoom */}
          <div
            ref={imageRevealRef}
            {...elementProps(config.id, 'imageContainer', 'container', 'Image Container')}
            className="atelier-story-image"
            style={{
              position: 'relative',
              overflow: 'hidden',
              minHeight: 600,
              borderRadius: 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              {...elementProps(config.id, 'image', 'image', 'Atelier Image')}
              src={content.image || 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=1200&q=85'}
              alt={content.title || 'Notre atelier'}
              className="atelier-story-img"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: 'scale(1.08)',
                transition: 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            />
          </div>

          {/* Right — Text content */}
          <div
            ref={titleRevealRef}
            {...elementProps(config.id, 'textContent', 'container', 'Text Content')}
            style={{ display: 'flex', flexDirection: 'column', gap: 0 }}
          >
            {/* Subtitle / Eyebrow */}
            <span
              {...elementProps(config.id, 'eyebrow', 'text')}
              style={{
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: '3px',
                textTransform: 'uppercase' as const,
                color: '#C4B5A0',
                marginBottom: 20,
              }}
            >
              {content.eyebrow || 'NOTRE ATELIER'}
            </span>

            {/* Title */}
            <h2
              {...elementProps(config.id, 'title', 'heading')}
              style={{
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                fontSize: 'clamp(2rem, 1.3rem + 3.2vw, 3.5rem)',
                fontWeight: 500,
                lineHeight: '115%',
                color: customTextColor ?? '#FFFFFF',
                margin: 0,
                marginBottom: 24,
              }}
            >
              {content.title || 'L\'excellence au service de vos espaces'}
            </h2>

            {/* Body text */}
            <p
              {...elementProps(config.id, 'body', 'text')}
              style={{
                ...paraStyle,
                marginBottom: 'clamp(32px, 5vw, 56px)',
                maxWidth: 480,
              }}
            >
              {content.body || 'Depuis plus de 15 ans, notre atelier transforme vos espaces de vie en lieux d\'exception. Chaque projet est une histoire unique, pensée dans les moindres détails pour créer une harmonie parfaite entre esthétique et fonctionnalité.'}
            </p>

            {/* Counter stats */}
            <div
              {...elementProps(config.id, 'statsRow', 'container', 'Stats Row')}
              style={{
                display: 'flex',
                gap: 'clamp(24px, 4vw, 48px)',
                marginBottom: 'clamp(32px, 5vw, 56px)',
              }}
            >
              <div {...elementProps(config.id, 'stat1', 'container', 'Stat Block')}>
                <div
                  {...elementProps(config.id, 'stat1Value', 'text')}
                  className="flex items-baseline"
                  style={statNumberStyle}
                >
                  <span ref={counter150Ref}>0</span>
                  <span>+</span>
                </div>
                <p style={{ marginTop: '4px', fontSize: '13px', fontWeight: 400, color: 'rgba(181, 176, 168, 0.6)', letterSpacing: '0.5px' }}>
                  Projets livrés
                </p>
              </div>
              <div {...elementProps(config.id, 'stat2', 'container', 'Stat Block')}>
                <div {...elementProps(config.id, 'stat2Value', 'text')} className="flex items-baseline" style={statNumberStyle}>
                  <span ref={counter12000Ref}>0</span>
                  <span>+</span>
                </div>
                <p style={{ marginTop: '4px', fontSize: '13px', fontWeight: 400, color: 'rgba(181, 176, 168, 0.6)', letterSpacing: '0.5px' }}>
                  m² aménagés
                </p>
              </div>
              <div {...elementProps(config.id, 'stat3', 'container', 'Stat Block')}>
                <div {...elementProps(config.id, 'stat3Value', 'text')} className="flex items-baseline" style={statNumberStyle}>
                  <span ref={counter15Ref}>0</span>
                  <span>+</span>
                </div>
                <p style={{ marginTop: '4px', fontSize: '13px', fontWeight: 400, color: 'rgba(181, 176, 168, 0.6)', letterSpacing: '0.5px' }}>
                  Années d&apos;expérience
                </p>
              </div>
            </div>

            {/* CTA Button — bronze outline → fill on hover */}
            <a
              {...elementProps(config.id, 'primaryButton', 'link')}
              href={content.primaryButton?.href ?? '#'}
              className="atelier-story-cta"
              style={{
                display: 'inline-block',
                border: '1px solid #8B7355',
                backgroundColor: 'transparent',
                color: '#8B7355',
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                fontWeight: 500,
                fontSize: 14,
                letterSpacing: '1.5px',
                textTransform: 'uppercase' as const,
                padding: '16px 40px',
                textDecoration: 'none',
                transition: 'background-color 0.4s ease, color 0.4s ease',
                alignSelf: 'flex-start',
              }}
            >
              {content.primaryButton?.label ?? 'Découvrir nos réalisations'}
            </a>
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // ENCRE — Story Split Layout (Tattoo Parlor)
  // ═══════════════════════════════════════════

  if (variant === 'encre-story') {
    const statNumberStyle = {
      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
      fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
      fontWeight: 500,
      lineHeight: '110%',
      color: '#C41E3A',
    } as const

    const paraStyle = {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '170%',
      color: '#8C8C8C',
      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
    } as const

    /* eslint-disable react-hooks/rules-of-hooks */
    const titleRevealRef = useBrixsaScrollReveal({ threshold: 0.15, disabled: isEditing })
    const imageRevealRef = useBrixsaScrollReveal({ threshold: 0.1, disabled: isEditing })
    const counter3000Ref = useBrixsaCounter(3000, { disabled: isEditing })
    const counter12Ref = useBrixsaCounter(12, { disabled: isEditing })
    const counter8Ref = useBrixsaCounter(8, { disabled: isEditing })
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'About Section')}
        style={{
          backgroundColor: '#0A0A0A',
          padding: 'clamp(60px, 12vw, 180px) clamp(20px, 5vw, 60px)',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        <style>{`
          @media (max-width: 968px) {
            .encre-story-grid { grid-template-columns: 1fr !important; }
            .encre-story-image { min-height: 400px !important; }
          }
          .encre-story-image:hover .encre-story-img { transform: scale(1.03) !important; }
          .encre-story-cta:hover {
            background-color: #C41E3A !important;
            color: #FFFFFF !important;
          }
        `}</style>
        <div
          {...elementProps(config.id, 'container', 'container', 'Container')}
          className="mx-auto encre-story-grid"
          style={{
            maxWidth: '1320px',
            display: 'grid',
            gridTemplateColumns: '55% 45%',
            gap: 'clamp(32px, 5vw, 80px)',
            alignItems: 'center',
          }}
        >
          {/* Left — Image with scroll reveal dezoom */}
          <div
            ref={imageRevealRef}
            {...elementProps(config.id, 'imageContainer', 'container', 'Image Container')}
            className="encre-story-image"
            style={{
              position: 'relative',
              overflow: 'hidden',
              minHeight: 600,
              borderRadius: 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              {...elementProps(config.id, 'image', 'image', 'Encre Image')}
              src={content.image || 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=1200&q=85'}
              alt={content.title || 'L\'art du tatouage'}
              className="encre-story-img"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: 'scale(1.08)',
                transition: 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            />
            {/* Crimson accent line overlay at bottom */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '3px',
                backgroundColor: '#C41E3A',
                zIndex: 2,
              }}
            />
          </div>

          {/* Right — Text content */}
          <div
            ref={titleRevealRef}
            {...elementProps(config.id, 'textContent', 'container', 'Text Content')}
            style={{ display: 'flex', flexDirection: 'column', gap: 0 }}
          >
            {/* Eyebrow */}
            <span
              {...elementProps(config.id, 'eyebrow', 'text')}
              style={{
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: '3px',
                textTransform: 'uppercase' as const,
                color: '#C41E3A',
                marginBottom: 20,
              }}
            >
              {content.eyebrow || 'NOTRE STUDIO'}
            </span>

            {/* Title */}
            <h2
              {...elementProps(config.id, 'title', 'heading')}
              style={{
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                fontSize: 'clamp(2rem, 1.3rem + 3.2vw, 3.5rem)',
                fontWeight: 500,
                lineHeight: '115%',
                color: customTextColor ?? '#FFFFFF',
                margin: 0,
                marginBottom: 24,
              }}
            >
              {content.title || 'L\'art du tatouage, sans compromis'}
            </h2>

            {/* Body text */}
            <p
              {...elementProps(config.id, 'body', 'text')}
              style={{
                ...paraStyle,
                marginBottom: 'clamp(32px, 5vw, 56px)',
                maxWidth: 480,
              }}
            >
              {content.body || 'Depuis plus de 12 ans, notre studio repousse les limites du tatouage artistique. Chaque œuvre est le fruit d\'une collaboration étroite entre l\'artiste et le client, où précision technique et vision créative se rencontrent pour créer des pièces intemporelles.'}
            </p>

            {/* Counter stats */}
            <div
              {...elementProps(config.id, 'statsRow', 'container', 'Stats Row')}
              style={{
                display: 'flex',
                gap: 'clamp(24px, 4vw, 48px)',
                marginBottom: 'clamp(32px, 5vw, 56px)',
              }}
            >
              <div {...elementProps(config.id, 'stat1', 'container', 'Stat Block')}>
                <div
                  {...elementProps(config.id, 'stat1Value', 'text')}
                  className="flex items-baseline"
                  style={statNumberStyle}
                >
                  <span ref={counter3000Ref}>0</span>
                  <span>+</span>
                </div>
                <p style={{ marginTop: '4px', fontSize: '13px', fontWeight: 400, color: 'rgba(140, 140, 140, 0.7)', letterSpacing: '0.5px' }}>
                  Tattoos réalisés
                </p>
              </div>
              <div {...elementProps(config.id, 'stat2', 'container', 'Stat Block')}>
                <div {...elementProps(config.id, 'stat2Value', 'text')} className="flex items-baseline" style={statNumberStyle}>
                  <span ref={counter12Ref}>0</span>
                  <span>+</span>
                </div>
                <p style={{ marginTop: '4px', fontSize: '13px', fontWeight: 400, color: 'rgba(140, 140, 140, 0.7)', letterSpacing: '0.5px' }}>
                  Années d&apos;expérience
                </p>
              </div>
              <div {...elementProps(config.id, 'stat3', 'container', 'Stat Block')}>
                <div {...elementProps(config.id, 'stat3Value', 'text')} className="flex items-baseline" style={statNumberStyle}>
                  <span ref={counter8Ref}>0</span>
                  <span>+</span>
                </div>
                <p style={{ marginTop: '4px', fontSize: '13px', fontWeight: 400, color: 'rgba(140, 140, 140, 0.7)', letterSpacing: '0.5px' }}>
                  Styles maîtrisés
                </p>
              </div>
            </div>

            {/* CTA Button — crimson outline → fill on hover */}
            <a
              {...elementProps(config.id, 'primaryButton', 'link')}
              href={content.primaryButton?.href ?? '#'}
              className="encre-story-cta"
              style={{
                display: 'inline-block',
                border: '1px solid #C41E3A',
                backgroundColor: 'transparent',
                color: '#C41E3A',
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                fontWeight: 500,
                fontSize: 14,
                letterSpacing: '1.5px',
                textTransform: 'uppercase' as const,
                padding: '16px 40px',
                textDecoration: 'none',
                transition: 'background-color 0.4s ease, color 0.4s ease',
                alignSelf: 'flex-start',
              }}
            >
              {content.primaryButton?.label ?? 'Prendre rendez-vous'}
            </a>
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // BRIXSA ABOUT — Asymmetric Layout with Counters
  // ═══════════════════════════════════════════

  if (variant === 'brixsa-about') {
    const statNumberStyle = {
      fontFamily: "'GeneralSans Variable', var(--font-heading, sans-serif)",
      fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
      fontWeight: 500,
      lineHeight: '110%',
      color: '#140c08',
    } as const

    const paraStyle = {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '150%',
      color: '#140c08',
      fontFamily: "'Inter Variable', var(--font-body, sans-serif)",
    } as const

    /* eslint-disable react-hooks/rules-of-hooks */
    const titleRevealRef = useBrixsaScrollReveal({ threshold: 0.15, disabled: isEditing })
    const counter500Ref = useBrixsaCounter(500, { disabled: isEditing })
    const counter50Ref = useBrixsaCounter(50, { disabled: isEditing })
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'About Section')}
        style={{ backgroundColor: '#f6efe5', padding: 'clamp(60px, 12vw, 180px) clamp(20px, 5vw, 60px)', fontFamily: 'var(--font-body, inherit)' }}
      >
        <style>{`
          @media (max-width: 768px) {
            .brixsa-resp-text-cols { grid-template-columns: 1fr !important; }
          }
        `}</style>
        <div
          {...elementProps(config.id, 'container', 'container', 'Container')}
          className="mx-auto"
          style={{ maxWidth: '1320px' }}
        >
          {/* Title — full width */}
          <h2
            {...elementProps(config.id, 'title', 'heading')}
            style={{
              fontFamily: "'GeneralSans Variable', var(--font-heading, sans-serif)",
              fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
              fontWeight: 500,
              lineHeight: '110%',
              textTransform: 'capitalize',
              color: customTextColor ?? '#140c08',
              maxWidth: '680px',
            }}
          >
            {content.title || 'We Create Remarkable Communities That Blend Outdoor Beauty With Indoor Comfort'}
          </h2>

          {/* Two paragraphs side by side — offset right */}
          <div
            {...elementProps(config.id, 'textRow', 'container', 'Text Row')}
            className="grid grid-cols-2 brixsa-resp-text-cols"
            style={{ gap: 'clamp(16px, 3vw, 32px)', marginTop: 'clamp(60px, 8vw, 120px)', marginLeft: 'auto', maxWidth: '780px' }}
          >
            <p
              {...elementProps(config.id, 'subtitle', 'text')}
              style={paraStyle}
            >
              {content.subtitle || 'Our communities are crafted to seamlessly integrate the tranquility of nature with the elegance of modern interiors. We emphasize creating spaces that are both visually appealing and functionally efficient, ensuring a perfect balance between outdoor charm and indoor luxury.'}
            </p>
            <p
              {...elementProps(config.id, 'body', 'text')}
              style={paraStyle}
            >
              {content.body || 'Our developments are crafted to seamlessly integrate the serene beauty of nature with the sophistication of modern interiors. We prioritize creating environments that are both visually stunning and functionally efficient, ensuring a perfect harmony between outdoor allure and indoor luxury.'}
            </p>
          </div>

          {/* Stats — offset right */}
          <div
            {...elementProps(config.id, 'statsRow', 'container', 'Stats Row')}
            className="grid grid-cols-2"
            style={{ gap: 'clamp(16px, 3vw, 32px)', marginTop: 'clamp(40px, 6vw, 80px)', marginLeft: 'auto', maxWidth: '780px' }}
          >
            <div {...elementProps(config.id, 'stat1', 'container', 'Stat Block')}>
              <div
                {...elementProps(config.id, 'eyebrow', 'text')}
                className="flex items-baseline"
                style={statNumberStyle}
              >
                <span ref={counter500Ref}>0</span>
                <span>+</span>
              </div>
              <p style={{ marginTop: '4px', fontSize: '16px', fontWeight: 400, color: '#140c08' }}>
                Happy Clients Served
              </p>
            </div>
            <div {...elementProps(config.id, 'stat2', 'container', 'Stat Block')}>
              <div {...elementProps(config.id, 'stat2Value', 'text', 'Stat Value')} className="flex items-baseline" style={statNumberStyle}>
                <span>$</span>
                <span ref={counter50Ref}>0</span>
                <span>M+</span>
              </div>
              <p style={{ marginTop: '4px', fontSize: '16px', fontWeight: 400, color: '#140c08' }}>
                Total Property Sales
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // BRIXSA PRIVACY — Rich-text legal page
  // ═══════════════════════════════════════════

  if (variant === 'brixsa-privacy') {
    const headingStyle = {
      fontFamily: "'GeneralSans Variable', var(--font-heading, sans-serif)",
      fontSize: '28px',
      fontWeight: 700,
      lineHeight: '130%',
      color: customTextColor ?? '#140c08',
      margin: 0,
    } as const

    const bodyStyle = {
      fontFamily: "'Inter Variable', var(--font-body, sans-serif)",
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '1.7',
      color: '#444444',
      margin: 0,
    } as const

    const bulletColor = accentColor ?? '#140c08'

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Privacy Section')}
        style={{ backgroundColor: '#f5f0e8', padding: '100px 24px', fontFamily: 'var(--font-body, inherit)' }}
      >
        <div
          {...elementProps(config.id, 'container', 'container', 'Container')}
          style={{ maxWidth: '800px', margin: '0 auto' }}
        >
          {/* Section 1 — What Information We are Taking */}
          <div
            {...elementProps(config.id, 'section1', 'container', 'Section 1')}
            style={{ marginBottom: '40px' }}
          >
            <h2
              {...elementProps(config.id, 'heading1', 'heading')}
              style={{ ...headingStyle, marginBottom: '16px' }}
            >
              {content.title || 'What Information We are Taking'}
            </h2>
            <p
              {...elementProps(config.id, 'body1a', 'text')}
              style={{ ...bodyStyle, marginBottom: '12px' }}
            >
              When you visit our website or use our services, we may collect personal information such as your name, email address, phone number, and mailing address. This information is gathered when you voluntarily provide it through contact forms, account registration, or service inquiries.
            </p>
            <p
              {...elementProps(config.id, 'body1b', 'text')}
              style={bodyStyle}
            >
              We also automatically collect certain technical data, including your IP address, browser type, operating system, referring URLs, and browsing behavior on our site. This data helps us understand how visitors interact with our platform and allows us to improve user experience.
            </p>
          </div>

          {/* Section 2 — How We Use Your Informations */}
          <div
            {...elementProps(config.id, 'section2', 'container', 'Section 2')}
            style={{ marginBottom: '40px' }}
          >
            <h2
              {...elementProps(config.id, 'heading2', 'heading')}
              style={{ ...headingStyle, marginBottom: '16px' }}
            >
              How We Use Your Informations
            </h2>
            <p
              {...elementProps(config.id, 'body2', 'text')}
              style={{ ...bodyStyle, marginBottom: '16px' }}
            >
              The information we collect is used to provide, maintain, and improve our services. Specifically, we use your data for the following purposes:
            </p>
            <ul
              {...elementProps(config.id, 'list2', 'container', 'Bullet List')}
              style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              <li
                {...elementProps(config.id, 'listItem2a', 'text')}
                style={{ ...bodyStyle, display: 'flex', alignItems: 'baseline', gap: '12px' }}
              >
                <span style={{ width: '6px', height: '6px', minWidth: '6px', borderRadius: '50%', backgroundColor: bulletColor, display: 'inline-block', position: 'relative', top: '-2px' }} />
                Some legal item
              </li>
              <li
                {...elementProps(config.id, 'listItem2b', 'text')}
                style={{ ...bodyStyle, display: 'flex', alignItems: 'baseline', gap: '12px' }}
              >
                <span style={{ width: '6px', height: '6px', minWidth: '6px', borderRadius: '50%', backgroundColor: bulletColor, display: 'inline-block', position: 'relative', top: '-2px' }} />
                Some another legal item
              </li>
              <li
                {...elementProps(config.id, 'listItem2c', 'text')}
                style={{ ...bodyStyle, display: 'flex', alignItems: 'baseline', gap: '12px' }}
              >
                <span style={{ width: '6px', height: '6px', minWidth: '6px', borderRadius: '50%', backgroundColor: bulletColor, display: 'inline-block', position: 'relative', top: '-2px' }} />
                Last legal item
              </li>
            </ul>
          </div>

          {/* Section 3 — Cookies and Tracking */}
          <div
            {...elementProps(config.id, 'section3', 'container', 'Section 3')}
            style={{ marginBottom: '40px' }}
          >
            <h2
              {...elementProps(config.id, 'heading3', 'heading')}
              style={{ ...headingStyle, marginBottom: '16px' }}
            >
              Cookies and Tracking
            </h2>
            <p
              {...elementProps(config.id, 'body3a', 'text')}
              style={{ ...bodyStyle, marginBottom: '12px' }}
            >
              Our website uses cookies and similar tracking technologies to enhance your browsing experience. Cookies are small text files stored on your device that help us recognize you on subsequent visits, remember your preferences, and analyze site traffic.
            </p>
            <p
              {...elementProps(config.id, 'body3b', 'text')}
              style={bodyStyle}
            >
              You can control cookie settings through your browser preferences. Most browsers allow you to refuse cookies or alert you when a cookie is being placed. However, disabling cookies may affect certain features and functionality of our website.
            </p>
          </div>

          {/* Section 4 — Your Rights */}
          <div
            {...elementProps(config.id, 'section4', 'container', 'Section 4')}
            style={{ marginBottom: '40px' }}
          >
            <h2
              {...elementProps(config.id, 'heading4', 'heading')}
              style={{ ...headingStyle, marginBottom: '16px' }}
            >
              Your Rights
            </h2>
            <p
              {...elementProps(config.id, 'body4', 'text')}
              style={bodyStyle}
            >
              You have the right to access, correct, or delete your personal data at any time. You may also object to or restrict the processing of your information, and you have the right to data portability. To exercise any of these rights, please contact us using the information provided below.
            </p>
          </div>

          {/* Section 5 — Contact Us */}
          <div
            {...elementProps(config.id, 'section5', 'container', 'Section 5')}
          >
            <h2
              {...elementProps(config.id, 'heading5', 'heading')}
              style={{ ...headingStyle, marginBottom: '16px' }}
            >
              Contact Us
            </h2>
            <p
              {...elementProps(config.id, 'body5', 'text')}
              style={bodyStyle}
            >
              If you have any questions or concerns about this Privacy Policy or our data practices, please reach out to us at privacy@brixsa.com or write to our office at 123 Real Estate Boulevard, Suite 400, New York, NY 10001.
            </p>
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // SERENITE — Story / About (Spa / Beauty Institute)
  // ═══════════════════════════════════════════

  if (variant === 'serenite-story') {
    const statNumberStyle = {
      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
      fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
      fontWeight: 500,
      lineHeight: '110%',
      color: '#D4B896',
    } as const

    const paraStyle = {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '170%',
      color: '#7B6F8A',
      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
    } as const

    /* eslint-disable react-hooks/rules-of-hooks */
    const titleRevealRef = useBrixsaScrollReveal({ threshold: 0.15, disabled: isEditing })
    const imageRevealRef = useBrixsaScrollReveal({ threshold: 0.1, disabled: isEditing })
    const counter5000Ref = useBrixsaCounter(5000, { disabled: isEditing })
    const counter18Ref = useBrixsaCounter(18, { disabled: isEditing })
    const counter100Ref = useBrixsaCounter(100, { disabled: isEditing })
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'About Section')}
        style={{
          backgroundColor: '#1B1B2F',
          padding: 'clamp(60px, 12vw, 180px) clamp(20px, 5vw, 60px)',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        <style>{`
          @media (max-width: 968px) {
            .serenite-story-grid { grid-template-columns: 1fr !important; }
            .serenite-story-image { min-height: 400px !important; }
          }
          .serenite-story-image:hover .serenite-story-img { transform: scale(1.03) !important; }
          .serenite-story-cta:hover {
            background-color: #D4B896 !important;
            color: #1B1B2F !important;
          }
        `}</style>
        <div
          {...elementProps(config.id, 'container', 'container', 'Container')}
          className="mx-auto serenite-story-grid"
          style={{
            maxWidth: '1320px',
            display: 'grid',
            gridTemplateColumns: '55% 45%',
            gap: 'clamp(32px, 5vw, 80px)',
            alignItems: 'center',
          }}
        >
          {/* Left — Image with scroll reveal dezoom */}
          <div
            ref={imageRevealRef}
            {...elementProps(config.id, 'imageContainer', 'container', 'Image Container')}
            className="serenite-story-image"
            style={{
              position: 'relative',
              overflow: 'hidden',
              minHeight: 600,
              borderRadius: 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              {...elementProps(config.id, 'image', 'image', 'Serenite Image')}
              src={content.image || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=85'}
              alt={content.title || 'Le bien-être élevé au rang d\'art'}
              className="serenite-story-img"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: 'scale(1.08)',
                transition: 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            />
            {/* Gold accent line overlay at bottom */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '3px',
                backgroundColor: '#D4B896',
                zIndex: 2,
              }}
            />
          </div>

          {/* Right — Text content */}
          <div
            ref={titleRevealRef}
            {...elementProps(config.id, 'textContent', 'container', 'Text Content')}
            style={{ display: 'flex', flexDirection: 'column', gap: 0 }}
          >
            {/* Eyebrow */}
            <span
              {...elementProps(config.id, 'eyebrow', 'text')}
              style={{
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: '3px',
                textTransform: 'uppercase' as const,
                color: '#D4B896',
                marginBottom: 20,
              }}
            >
              {content.eyebrow || 'NOTRE INSTITUT'}
            </span>

            {/* Title */}
            <h2
              {...elementProps(config.id, 'title', 'heading')}
              style={{
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                fontSize: 'clamp(2rem, 1.3rem + 3.2vw, 3.5rem)',
                fontWeight: 500,
                lineHeight: '115%',
                color: customTextColor ?? '#FFFFFF',
                margin: 0,
                marginBottom: 24,
              }}
            >
              {content.title || 'Le bien-être élevé au rang d\'art'}
            </h2>

            {/* Body text */}
            <p
              {...elementProps(config.id, 'body', 'text')}
              style={{
                ...paraStyle,
                marginBottom: 'clamp(32px, 5vw, 56px)',
                maxWidth: 480,
              }}
            >
              {content.body || 'Depuis plus de 18 ans, notre institut est un havre de paix dédié à votre bien-être. Chaque soin est une expérience sensorielle unique, alliant techniques ancestrales et innovations cosmétiques pour sublimer votre beauté naturelle.'}
            </p>

            {/* Counter stats */}
            <div
              {...elementProps(config.id, 'statsRow', 'container', 'Stats Row')}
              style={{
                display: 'flex',
                gap: 'clamp(24px, 4vw, 48px)',
                marginBottom: 'clamp(32px, 5vw, 56px)',
              }}
            >
              <div {...elementProps(config.id, 'stat1', 'container', 'Stat Block')}>
                <div
                  {...elementProps(config.id, 'stat1Value', 'text')}
                  className="flex items-baseline"
                  style={statNumberStyle}
                >
                  <span ref={counter5000Ref}>0</span>
                  <span>+</span>
                </div>
                <p style={{ marginTop: '4px', fontSize: '13px', fontWeight: 400, color: 'rgba(123, 111, 138, 0.7)', letterSpacing: '0.5px' }}>
                  Soins réalisés
                </p>
              </div>
              <div {...elementProps(config.id, 'stat2', 'container', 'Stat Block')}>
                <div {...elementProps(config.id, 'stat2Value', 'text')} className="flex items-baseline" style={statNumberStyle}>
                  <span ref={counter18Ref}>0</span>
                  <span>+</span>
                </div>
                <p style={{ marginTop: '4px', fontSize: '13px', fontWeight: 400, color: 'rgba(123, 111, 138, 0.7)', letterSpacing: '0.5px' }}>
                  Années d&apos;expérience
                </p>
              </div>
              <div {...elementProps(config.id, 'stat3', 'container', 'Stat Block')}>
                <div {...elementProps(config.id, 'stat3Value', 'text')} className="flex items-baseline" style={statNumberStyle}>
                  <span ref={counter100Ref}>0</span>
                  <span>%</span>
                </div>
                <p style={{ marginTop: '4px', fontSize: '13px', fontWeight: 400, color: 'rgba(123, 111, 138, 0.7)', letterSpacing: '0.5px' }}>
                  Produits bio &amp; naturels
                </p>
              </div>
            </div>

            {/* CTA Button — gold outline → fill on hover */}
            <a
              {...elementProps(config.id, 'primaryButton', 'link')}
              href={content.primaryButton?.href ?? '#'}
              className="serenite-story-cta"
              style={{
                display: 'inline-block',
                border: '1px solid #D4B896',
                backgroundColor: 'transparent',
                color: '#D4B896',
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                fontWeight: 500,
                fontSize: 14,
                letterSpacing: '1.5px',
                textTransform: 'uppercase' as const,
                padding: '16px 40px',
                textDecoration: 'none',
                transition: 'background-color 0.4s ease, color 0.4s ease',
                alignSelf: 'flex-start',
              }}
            >
              {content.primaryButton?.label ?? 'Découvrir nos soins'}
            </a>
          </div>
        </div>
      </section>
    )
  }

  // DJ PULSE — Story Split Layout (DJ / Musician)
  // ═══════════════════════════════════════════

  if (variant === 'pulse-story') {
    const statNumberStyle = {
      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
      fontSize: 'clamp(2.25rem, 1.3929rem + 3.8095vw, 4.25rem)',
      fontWeight: 500,
      lineHeight: '110%',
      color: '#00E5FF',
    } as const

    const paraStyle = {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '170%',
      color: 'rgba(255, 255, 255, 0.55)',
      fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
    } as const

    /* eslint-disable react-hooks/rules-of-hooks */
    const titleRevealRef = useBrixsaScrollReveal({ threshold: 0.15, disabled: isEditing })
    const imageRevealRef = useBrixsaScrollReveal({ threshold: 0.1, disabled: isEditing })
    const counter500Ref = useBrixsaCounter(500, { disabled: isEditing })
    const counter15Ref = useBrixsaCounter(15, { disabled: isEditing })
    const counter50Ref = useBrixsaCounter(50, { disabled: isEditing })
    /* eslint-enable react-hooks/rules-of-hooks */

    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'About Section')}
        style={{
          backgroundColor: '#0D0D0D',
          padding: 'clamp(60px, 12vw, 180px) clamp(20px, 5vw, 60px)',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        <style>{`
          @media (max-width: 968px) {
            .pulse-story-grid { grid-template-columns: 1fr !important; }
            .pulse-story-image { min-height: 400px !important; }
          }
          .pulse-story-image:hover .pulse-story-img { transform: scale(1.03) !important; }
          .pulse-story-cta:hover {
            background-color: #FF006E !important;
            color: #FFFFFF !important;
          }
        `}</style>
        <div
          {...elementProps(config.id, 'container', 'container', 'Container')}
          className="mx-auto pulse-story-grid"
          style={{
            maxWidth: '1320px',
            display: 'grid',
            gridTemplateColumns: '55% 45%',
            gap: 'clamp(32px, 5vw, 80px)',
            alignItems: 'center',
          }}
        >
          {/* Left — Image with scroll reveal dezoom */}
          <div
            ref={imageRevealRef}
            {...elementProps(config.id, 'imageContainer', 'container', 'Image Container')}
            className="pulse-story-image"
            style={{
              position: 'relative',
              overflow: 'hidden',
              minHeight: 600,
              borderRadius: 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              {...elementProps(config.id, 'image', 'image', 'Pulse Image')}
              src={content.image || 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=1200&q=85'}
              alt={content.title || 'Le son qui fait vibrer'}
              className="pulse-story-img"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: 'scale(1.08)',
                transition: 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            />
            {/* Cyan accent line overlay at bottom */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '3px',
                backgroundColor: '#00E5FF',
                zIndex: 2,
              }}
            />
          </div>

          {/* Right — Text content */}
          <div
            ref={titleRevealRef}
            {...elementProps(config.id, 'textContent', 'container', 'Text Content')}
            style={{ display: 'flex', flexDirection: 'column', gap: 0 }}
          >
            {/* Eyebrow */}
            <span
              {...elementProps(config.id, 'eyebrow', 'text')}
              style={{
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: '3px',
                textTransform: 'uppercase' as const,
                color: '#00E5FF',
                marginBottom: 20,
              }}
            >
              {content.eyebrow || 'L\'ARTISTE'}
            </span>

            {/* Title */}
            <h2
              {...elementProps(config.id, 'title', 'heading')}
              style={{
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                fontSize: 'clamp(2rem, 1.3rem + 3.2vw, 3.5rem)',
                fontWeight: 500,
                lineHeight: '115%',
                color: customTextColor ?? '#FFFFFF',
                margin: 0,
                marginBottom: 24,
              }}
            >
              {content.title || 'Le son qui fait vibrer'}
            </h2>

            {/* Body text */}
            <p
              {...elementProps(config.id, 'body', 'text')}
              style={{
                ...paraStyle,
                marginBottom: 'clamp(32px, 5vw, 56px)',
                maxWidth: 480,
              }}
            >
              {content.body || 'Depuis plus de 15 ans, la musique est bien plus qu\'une passion — c\'est une obsession. Des clubs underground de Berlin aux festivals internationaux, chaque set est une histoire unique écrite pour le dancefloor. Une énergie brute, un son signature, une connexion instantanée avec le public.'}
            </p>

            {/* Counter stats */}
            <div
              {...elementProps(config.id, 'statsRow', 'container', 'Stats Row')}
              style={{
                display: 'flex',
                gap: 'clamp(24px, 4vw, 48px)',
                marginBottom: 'clamp(32px, 5vw, 56px)',
              }}
            >
              <div {...elementProps(config.id, 'stat1', 'container', 'Stat Block')}>
                <div
                  {...elementProps(config.id, 'stat1Value', 'text')}
                  className="flex items-baseline"
                  style={statNumberStyle}
                >
                  <span ref={counter500Ref}>0</span>
                  <span>+</span>
                </div>
                <p style={{ marginTop: '4px', fontSize: '13px', fontWeight: 400, color: 'rgba(255, 255, 255, 0.35)', letterSpacing: '0.5px' }}>
                  Events
                </p>
              </div>
              <div {...elementProps(config.id, 'stat2', 'container', 'Stat Block')}>
                <div {...elementProps(config.id, 'stat2Value', 'text')} className="flex items-baseline" style={statNumberStyle}>
                  <span ref={counter15Ref}>0</span>
                  <span>+</span>
                </div>
                <p style={{ marginTop: '4px', fontSize: '13px', fontWeight: 400, color: 'rgba(255, 255, 255, 0.35)', letterSpacing: '0.5px' }}>
                  Années d&apos;expérience
                </p>
              </div>
              <div {...elementProps(config.id, 'stat3', 'container', 'Stat Block')}>
                <div {...elementProps(config.id, 'stat3Value', 'text')} className="flex items-baseline" style={statNumberStyle}>
                  <span ref={counter50Ref}>0</span>
                  <span>+</span>
                </div>
                <p style={{ marginTop: '4px', fontSize: '13px', fontWeight: 400, color: 'rgba(255, 255, 255, 0.35)', letterSpacing: '0.5px' }}>
                  Tracks produites
                </p>
              </div>
            </div>

            {/* CTA Button — magenta outline → fill on hover */}
            <a
              {...elementProps(config.id, 'primaryButton', 'link')}
              href={content.primaryButton?.href ?? '#'}
              className="pulse-story-cta"
              style={{
                display: 'inline-block',
                border: '1px solid #FF006E',
                backgroundColor: 'transparent',
                color: '#FF006E',
                fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                fontWeight: 500,
                fontSize: 14,
                letterSpacing: '1.5px',
                textTransform: 'uppercase' as const,
                padding: '16px 40px',
                textDecoration: 'none',
                transition: 'background-color 0.4s ease, color 0.4s ease',
                alignSelf: 'flex-start',
              }}
            >
              {content.primaryButton?.label ?? 'Réserver un set'}
            </a>
          </div>
        </div>
      </section>
    )
  }

  // Fallback to startup-image-right
  return <ImageTextSection config={{ ...config, variant: 'startup-image-right' }} isEditing={isEditing} />
}

export const imageTextMeta = {
  type: 'image-text',
  label: 'Image + Texte',
  icon: '🖼️',
  variants: [
    'startup-image-right', 'startup-image-left',
    'corporate-image-right', 'corporate-image-left',
    'luxe-image-right', 'luxe-image-left',
    'creative-image-right', 'creative-image-left',
    'ecommerce-image-right', 'ecommerce-image-left',
    'glass-image-right', 'glass-image-left',
    'canopy-story',
    'obscura-about',
    'nacre-about',
    'braise-story',
    'forge-story',
    'ciseaux-story',
    'atelier-story',
    'encre-story',
    'serenite-story',
    'pulse-story',
    'brixsa-about',
    'brixsa-privacy',
  ],
  defaultVariant: 'startup-image-right',
  defaultContent: {},
}
