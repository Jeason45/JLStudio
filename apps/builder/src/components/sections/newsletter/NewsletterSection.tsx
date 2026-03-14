import { cn } from '@/lib/utils'
import type { SectionConfig } from '@/types/site'
import type { NewsletterContent } from '@/types/sections'
import { getTitleSizeClass, getTextAlignClass } from '../_utils'
import { elementProps } from '@/lib/elementHelpers'
import { DecorativeOrnament } from '../_DecorativeOrnament'

export function NewsletterSection({ config, isEditing }: { config: SectionConfig; isEditing?: boolean }) {
  const content = (config.content ?? {}) as Partial<NewsletterContent>
  const variant = config.variant ?? 'startup-centered'
  const universe = variant.split('-')[0]
  const layout = variant.replace(universe + '-', '')

  const title = content.title ?? 'Restez informe'
  const subtitle = content.subtitle
  const eyebrow = content.eyebrow
  const placeholder = content.placeholder ?? 'votre@email.com'
  const buttonLabel = content.buttonLabel ?? "S'abonner"
  const disclaimer = content.disclaimer
  const count = content.count
  const socialProof = content.socialProof
  const { accentColor, titleSize, textAlign, textColor: customTextColor } = config.style

  // ═══════════════════════════════════════════
  // STARTUP — SaaS moderne
  // ═══════════════════════════════════════════

  if (universe === 'startup') {
    const accent = accentColor ?? '#6366f1'

    const eyebrowEl = eyebrow && (
      <span className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full border border-zinc-200 text-zinc-600 bg-white shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
        {eyebrow}
      </span>
    )

    const inputEl = (
      <input
        {...elementProps(config.id, 'placeholder', 'text')}
        type="email"
        placeholder={placeholder}
        disabled={isEditing}
        className="flex-1 h-11 rounded-full px-5 text-sm border border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-offset-1"
        style={{ '--tw-ring-color': accent } as React.CSSProperties}
      />
    )

    const buttonEl = (
      <button
        {...elementProps(config.id, 'buttonLabel', 'button')}
        disabled={isEditing}
        className="h-11 px-6 rounded-full font-semibold text-sm text-white transition-all hover:scale-[1.02] whitespace-nowrap"
        style={{
          background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
          boxShadow: `0 4px 14px ${accent}40`,
        }}
      >
        {buttonLabel}
      </button>
    )

    // Centered
    if (layout === 'centered') {
      return (
        <section className="bg-zinc-50 py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className={cn("max-w-2xl mx-auto px-6 text-center space-y-6", textAlign && getTextAlignClass(textAlign))}>
            {eyebrowEl}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-bold text-zinc-900 leading-tight", titleSize && getTitleSizeClass(titleSize))}
                style={customTextColor ? { color: customTextColor } : undefined}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-zinc-500 max-w-xl mx-auto">{subtitle}</p>}
            {count && <div className="text-4xl font-bold" style={{ color: accent }}>{count}</div>}
            {socialProof && <p className="text-sm text-zinc-400">{socialProof}</p>}
            <div className="flex gap-2 max-w-md mx-auto">
              {inputEl}
              {buttonEl}
            </div>
            {disclaimer && <p className="text-xs text-zinc-400">{disclaimer}</p>}
          </div>
        </section>
      )
    }

    // Split
    return (
      <section className="bg-zinc-50 py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 flex-1">
            {eyebrowEl}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-bold text-zinc-900 leading-tight", titleSize && getTitleSizeClass(titleSize))}
                style={customTextColor ? { color: customTextColor } : undefined}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-zinc-500 max-w-md">{subtitle}</p>}
            {socialProof && <p className="text-sm text-zinc-400">{socialProof}</p>}
          </div>
          <div className="flex gap-2 shrink-0 w-full md:w-auto md:min-w-[340px]">
            {inputEl}
            {buttonEl}
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

    const eyebrowEl = eyebrow && (
      <span className="inline-block text-xs font-semibold px-3 py-1 rounded border text-blue-300 border-blue-500/30 bg-blue-500/10">
        {eyebrow}
      </span>
    )

    const inputEl = (
      <input
        {...elementProps(config.id, 'placeholder', 'text')}
        type="email"
        placeholder={placeholder}
        disabled={isEditing}
        className="flex-1 h-11 rounded-lg px-4 text-sm border border-slate-600 bg-slate-800/60 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    )

    const buttonEl = (
      <button
        {...elementProps(config.id, 'buttonLabel', 'button')}
        disabled={isEditing}
        className="h-11 px-6 rounded-lg font-semibold text-sm text-white transition-colors hover:brightness-110 whitespace-nowrap"
        style={{ backgroundColor: accent }}
      >
        {buttonLabel}
      </button>
    )

    // Centered
    if (layout === 'centered') {
      return (
        <section className="bg-slate-900 py-20 noise-overlay relative" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className={cn("relative max-w-2xl mx-auto px-6 text-center space-y-6", textAlign && getTextAlignClass(textAlign))}>
            {eyebrowEl}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-bold text-white leading-tight", titleSize && getTitleSizeClass(titleSize))}
                style={customTextColor ? { color: customTextColor } : undefined}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-slate-400 max-w-xl mx-auto">{subtitle}</p>}
            {count && <div className="text-4xl font-bold text-white">{count}</div>}
            {socialProof && <p className="text-sm text-slate-500">{socialProof}</p>}
            <div className="flex gap-2 max-w-md mx-auto">
              {inputEl}
              {buttonEl}
            </div>
            {disclaimer && <p className="text-xs text-slate-500">{disclaimer}</p>}
          </div>
        </section>
      )
    }

    // Split
    return (
      <section className="bg-slate-900 py-20 noise-overlay relative" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="relative max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 flex-1">
            {eyebrowEl}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-bold text-white leading-tight", titleSize && getTitleSizeClass(titleSize))}
                style={customTextColor ? { color: customTextColor } : undefined}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-slate-400 max-w-md">{subtitle}</p>}
            {socialProof && <p className="text-sm text-slate-500">{socialProof}</p>}
          </div>
          <div className="flex gap-2 shrink-0 w-full md:w-auto md:min-w-[340px]">
            {inputEl}
            {buttonEl}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // LUXE — Hotellerie / Mode / Joaillerie
  // ═══════════════════════════════════════════

  if (universe === 'luxe') {
    const gold = accentColor ?? '#b8860b'

    const eyebrowEl = eyebrow && (
      <span className="inline-block text-xs tracking-[0.25em] uppercase font-light" style={{ color: gold }}>
        {eyebrow}
      </span>
    )

    const inputEl = (
      <input
        {...elementProps(config.id, 'placeholder', 'text')}
        type="email"
        placeholder={placeholder}
        disabled={isEditing}
        className="flex-1 h-12 px-5 text-sm font-light tracking-wide border border-zinc-200 bg-transparent text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:border-current transition-colors"
        style={{ borderColor: `${gold}40`, '--tw-ring-color': gold } as React.CSSProperties}
      />
    )

    const buttonEl = (
      <button
        {...elementProps(config.id, 'buttonLabel', 'button')}
        disabled={isEditing}
        className="h-12 px-8 font-light text-sm tracking-[0.15em] uppercase text-white transition-colors hover:brightness-110 whitespace-nowrap"
        style={{ backgroundColor: gold }}
      >
        {buttonLabel}
      </button>
    )

    // Centered
    const hasDecorativeIcon = !!content.decorativeIcon
    if (layout === 'centered') {
      return (
        <section className="bg-white py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className={cn("max-w-2xl mx-auto px-6 text-center space-y-6", textAlign && getTextAlignClass(textAlign))}>
            {hasDecorativeIcon && <DecorativeOrnament color={gold} />}
            {eyebrowEl}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-black text-zinc-900 leading-tight tracking-tight", titleSize && getTitleSizeClass(titleSize))}
                style={customTextColor ? { color: customTextColor } : undefined}>{title}</h2>
            {!hasDecorativeIcon && <div className="w-12 h-px mx-auto" style={{ background: gold }} />}
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-zinc-400 max-w-xl mx-auto tracking-wide font-light">{subtitle}</p>}
            {count && <div className="text-4xl font-light text-zinc-900">{count}</div>}
            {socialProof && <p className="text-sm text-zinc-400 tracking-wide font-light">{socialProof}</p>}
            <div className="flex gap-0 max-w-md mx-auto">
              {inputEl}
              {buttonEl}
            </div>
            {disclaimer && <p className="text-xs text-zinc-400 tracking-wide font-light">{disclaimer}</p>}
          </div>
        </section>
      )
    }

    // Split
    return (
      <section className="bg-white py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-5 flex-1">
            {eyebrowEl}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-light text-zinc-900 leading-tight tracking-tight", titleSize && getTitleSizeClass(titleSize))}
                style={customTextColor ? { color: customTextColor } : undefined}>{title}</h2>
            <div className="w-12 h-px" style={{ background: gold }} />
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-zinc-400 max-w-md tracking-wide font-light">{subtitle}</p>}
            {socialProof && <p className="text-sm text-zinc-400 tracking-wide font-light">{socialProof}</p>}
          </div>
          <div className="flex gap-0 shrink-0 w-full md:w-auto md:min-w-[340px]">
            {inputEl}
            {buttonEl}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // CREATIVE — Agence / Portfolio / Studio
  // ═══════════════════════════════════════════

  if (universe === 'creative') {
    const eyebrowEl = eyebrow && (
      <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1.5 border-2 border-zinc-900 text-zinc-900 bg-yellow-300">
        {eyebrow}
      </span>
    )

    const inputEl = (
      <input
        {...elementProps(config.id, 'placeholder', 'text')}
        type="email"
        placeholder={placeholder}
        disabled={isEditing}
        className="flex-1 h-12 px-4 text-sm font-bold border-2 border-zinc-900 bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 focus:ring-offset-[#f5f0e8]"
      />
    )

    const buttonEl = (
      <button
        {...elementProps(config.id, 'buttonLabel', 'button')}
        disabled={isEditing}
        className="h-12 px-6 font-bold text-sm uppercase tracking-wider border-2 border-zinc-900 bg-zinc-900 text-white hover:translate-x-0.5 hover:-translate-y-0.5 transition-transform shadow-[4px_4px_0_0_#18181b] hover:shadow-[6px_6px_0_0_#18181b] whitespace-nowrap"
      >
        {buttonLabel}
      </button>
    )

    // Centered
    if (layout === 'centered') {
      return (
        <section className="bg-[#f5f0e8] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className={cn("max-w-2xl mx-auto px-6 text-center space-y-6", textAlign && getTextAlignClass(textAlign))}>
            {eyebrowEl}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-5xl font-black text-zinc-900 leading-[0.95] uppercase", titleSize && getTitleSizeClass(titleSize))}
                style={customTextColor ? { color: customTextColor } : undefined}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-zinc-600 max-w-lg mx-auto">{subtitle}</p>}
            {count && <div className="text-5xl font-black text-zinc-900 uppercase">{count}</div>}
            {socialProof && <p className="text-sm font-bold text-zinc-600 uppercase tracking-wider">{socialProof}</p>}
            <div className="flex gap-0 max-w-md mx-auto">
              {inputEl}
              {buttonEl}
            </div>
            {disclaimer && <p className="text-xs text-zinc-500">{disclaimer}</p>}
          </div>
        </section>
      )
    }

    // Split
    return (
      <section className="bg-[#f5f0e8] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 flex-1">
            {eyebrowEl}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-5xl font-black text-zinc-900 leading-[0.95] uppercase", titleSize && getTitleSizeClass(titleSize))}
                style={customTextColor ? { color: customTextColor } : undefined}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-zinc-600 max-w-md">{subtitle}</p>}
            {socialProof && <p className="text-sm font-bold text-zinc-600 uppercase tracking-wider">{socialProof}</p>}
          </div>
          <div className="flex gap-0 shrink-0 w-full md:w-auto md:min-w-[340px]">
            {inputEl}
            {buttonEl}
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

    const eyebrowEl = eyebrow && (
      <span className="inline-block text-xs font-bold px-3 py-1 rounded-full text-white" style={{ backgroundColor: accent }}>
        {eyebrow}
      </span>
    )

    const gratuitBadge = (
      <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: accent }}>
        Gratuit
      </span>
    )

    const trustText = (
      <div className="flex items-center justify-center gap-4 text-xs text-zinc-400 pt-1">
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          Donnees protegees
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          Desinscription en 1 clic
        </span>
      </div>
    )

    const inputEl = (
      <input
        {...elementProps(config.id, 'placeholder', 'text')}
        type="email"
        placeholder={placeholder}
        disabled={isEditing}
        className="flex-1 h-11 rounded-xl px-4 text-sm border border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-offset-1"
        style={{ '--tw-ring-color': accent } as React.CSSProperties}
      />
    )

    const buttonEl = (
      <button
        {...elementProps(config.id, 'buttonLabel', 'button')}
        disabled={isEditing}
        className="h-11 px-6 rounded-xl font-semibold text-sm text-white transition-colors hover:brightness-110 whitespace-nowrap"
        style={{ backgroundColor: accent }}
      >
        {buttonLabel}
      </button>
    )

    // Centered
    if (layout === 'centered') {
      return (
        <section className="bg-white py-16" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className={cn("max-w-2xl mx-auto px-6 text-center space-y-5", textAlign && getTextAlignClass(textAlign))}>
            <div className="flex items-center justify-center gap-2">
              {eyebrowEl}
              {gratuitBadge}
            </div>
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-bold text-zinc-900 leading-tight", titleSize && getTitleSizeClass(titleSize))}
                style={customTextColor ? { color: customTextColor } : undefined}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-zinc-500 max-w-xl mx-auto">{subtitle}</p>}
            {count && <div className="text-3xl font-bold" style={{ color: accent }}>{count}</div>}
            {socialProof && <p className="text-sm text-zinc-400">{socialProof}</p>}
            <div className="flex gap-2 max-w-md mx-auto">
              {inputEl}
              {buttonEl}
            </div>
            {trustText}
            {disclaimer && <p className="text-xs text-zinc-400">{disclaimer}</p>}
          </div>
        </section>
      )
    }

    // Split
    return (
      <section className="bg-white py-16" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              {eyebrowEl}
              {gratuitBadge}
            </div>
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-bold text-zinc-900 leading-tight", titleSize && getTitleSizeClass(titleSize))}
                style={customTextColor ? { color: customTextColor } : undefined}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-zinc-500 max-w-md">{subtitle}</p>}
            {socialProof && <p className="text-sm text-zinc-400">{socialProof}</p>}
            <div className="flex items-center gap-4 text-xs text-zinc-400">
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Donnees protegees
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Desinscription en 1 clic
              </span>
            </div>
          </div>
          <div className="flex gap-2 shrink-0 w-full md:w-auto md:min-w-[340px]">
            {inputEl}
            {buttonEl}
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

    const eyebrowEl = eyebrow && (
      <span className="inline-flex items-center gap-2 text-xs font-medium px-4 py-1.5 rounded-full border border-white/10 text-white/60 bg-white/[0.04] backdrop-blur-sm">
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent, boxShadow: `0 0 8px ${accent}80` }} />
        {eyebrow}
      </span>
    )

    const inputEl = (
      <input
        {...elementProps(config.id, 'placeholder', 'text')}
        type="email"
        placeholder={placeholder}
        disabled={isEditing}
        className="flex-1 h-11 rounded-xl px-4 text-sm border border-white/10 bg-white/[0.06] backdrop-blur-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:border-transparent"
        style={{ '--tw-ring-color': `${accent}80` } as React.CSSProperties}
      />
    )

    const buttonEl = (
      <button
        {...elementProps(config.id, 'buttonLabel', 'button')}
        disabled={isEditing}
        className="h-11 px-6 rounded-xl font-semibold text-sm text-white transition-all hover:scale-[1.02] whitespace-nowrap"
        style={{
          background: `linear-gradient(135deg, ${accent}, ${accent}aa)`,
          boxShadow: `0 0 20px ${accent}30, 0 0 8px ${accent}20`,
        }}
      >
        {buttonLabel}
      </button>
    )

    // Centered
    if (layout === 'centered') {
      return (
        <section className="bg-zinc-950 py-20 noise-overlay relative overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="absolute inset-0 dot-grid" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-30 blur-3xl pointer-events-none"
            style={{ background: `radial-gradient(ellipse, ${accent}20, transparent 70%)` }}
          />
          <div className={cn("relative max-w-2xl mx-auto px-6 text-center space-y-6", textAlign && getTextAlignClass(textAlign))}>
            {eyebrowEl}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-bold gradient-text leading-tight", titleSize && getTitleSizeClass(titleSize))}
                style={customTextColor ? { color: customTextColor } : undefined}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-white/40 max-w-xl mx-auto">{subtitle}</p>}
            {count && <div className="text-4xl font-bold gradient-text">{count}</div>}
            {socialProof && <p className="text-sm text-white/30">{socialProof}</p>}
            <div className="flex gap-2 max-w-md mx-auto">
              {inputEl}
              {buttonEl}
            </div>
            {disclaimer && <p className="text-xs text-white/25">{disclaimer}</p>}
          </div>
        </section>
      )
    }

    // Split
    return (
      <section className="bg-zinc-950 py-20 noise-overlay relative overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="absolute inset-0 dot-grid" />
        <div
          className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[400px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${accent}30, transparent 70%)` }}
        />
        <div className="relative max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 flex-1">
            {eyebrowEl}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-bold gradient-text leading-tight", titleSize && getTitleSizeClass(titleSize))}
                style={customTextColor ? { color: customTextColor } : undefined}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-white/40 max-w-md">{subtitle}</p>}
            {socialProof && <p className="text-sm text-white/30">{socialProof}</p>}
          </div>
          <div className="flex gap-2 shrink-0 w-full md:w-auto md:min-w-[340px]">
            {inputEl}
            {buttonEl}
          </div>
        </div>
      </section>
    )
  }

  // Fallback -> startup-centered
  return <NewsletterSection config={{ ...config, variant: 'startup-centered' }} />
}

export const newsletterMeta = {
  type: 'newsletter',
  label: 'Newsletter',
  icon: '📧',
  variants: [
    'startup-centered', 'startup-split',
    'corporate-centered', 'corporate-split',
    'luxe-centered', 'luxe-split',
    'creative-centered', 'creative-split',
    'ecommerce-centered', 'ecommerce-split',
    'glass-centered', 'glass-split',
  ],
  defaultVariant: 'startup-centered',
  defaultContent: {},
}
