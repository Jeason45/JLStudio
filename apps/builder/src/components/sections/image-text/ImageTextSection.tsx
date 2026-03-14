'use client'

import { cn } from '@/lib/utils'
import { sectionClasses, getTextColorClass, getMutedTextClass, getEyebrowClass, getTitleSizeClass, getTextAlignClass } from '../_utils'
import type { SectionConfig } from '@/types/site'
import type { ImageTextContent } from '@/types/sections'
import { Image, ArrowRight, Check } from 'lucide-react'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import { elementProps } from '@/lib/elementHelpers'
import { EditablePlaceholder } from '../_EditablePlaceholder'
import { DecorativeOrnament } from '../_DecorativeOrnament'
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
      <section className="bg-white py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className={cn('max-w-5xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16', isLeft && 'lg:flex-row-reverse')}>
          {/* Text */}
          <div className="flex-1 space-y-6">
            {hasDecorativeIcon && <DecorativeOrnament color={gold} className="justify-start" />}
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
            <div className="flex gap-3 flex-wrap pt-2">
              {content.primaryButton && (
                <a
                  {...elementProps(config.id, 'primaryButton', 'button')}
                  href={content.primaryButton.href}
                  className="px-6 py-3 bg-zinc-900 text-white text-sm font-bold uppercase tracking-wide border-2 border-zinc-900 shadow-[4px_4px_0_0_#18181b] hover:shadow-[6px_6px_0_0_#18181b] hover:translate-x-0.5 hover:-translate-y-0.5 transition-all"
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
    'brixsa-about',
    'brixsa-privacy',
  ],
  defaultVariant: 'startup-image-right',
  defaultContent: {},
}
