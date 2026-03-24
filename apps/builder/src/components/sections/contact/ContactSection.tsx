'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { SectionConfig } from '@/types/site'
import type { ContactContent } from '@/types/sections'
import { getTitleSizeClass, getTextAlignClass } from '../_utils'
import { Mail, Phone, MapPin } from 'lucide-react'
import { elementProps } from '@/lib/elementHelpers'

interface ContactSectionProps {
  config: SectionConfig
  isEditing?: boolean
}

export function ContactSection({ config, isEditing }: ContactSectionProps) {
  const content = (config.content ?? {}) as Partial<ContactContent>
  const { accentColor, titleSize, textAlign, textColor: customTextColor } = config.style
  const variant = config.variant ?? 'startup-with-info'
  const universe = variant.split('-')[0]
  const layout = variant.replace(universe + '-', '')

  const title = content.title ?? 'Contactez-nous'
  const subtitle = content.subtitle
  const eyebrow = content.eyebrow
  const email = content.email
  const phone = content.phone
  const address = content.address
  const formTitle = content.formTitle
  const buttonLabel = content.formButtonLabel ?? 'Envoyer le message'

  // ═══════════════════════════════════════════════════════
  // STARTUP — SaaS moderne, bg-zinc-50, indigo accent
  // ═══════════════════════════════════════════════════════

  if (universe === 'startup') {
    const accent = accentColor ?? '#6366f1'

    const eyebrowEl = eyebrow && (
      <span className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full border border-zinc-200 text-zinc-600 bg-white shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
        {eyebrow}
      </span>
    )

    const inputClass = 'w-full h-11 rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-default'

    const form = (
      <div className="rounded-2xl bg-white border border-zinc-100 shadow-sm p-6 space-y-4">
        {formTitle && <h3 className="font-semibold text-zinc-900 mb-1">{formTitle}</h3>}
        <div className="grid grid-cols-2 gap-3">
          <input className={inputClass} style={{ '--tw-ring-color': accent } as React.CSSProperties} placeholder="Prenom" disabled={isEditing} />
          <input className={inputClass} style={{ '--tw-ring-color': accent } as React.CSSProperties} placeholder="Nom" disabled={isEditing} />
        </div>
        <input className={inputClass} style={{ '--tw-ring-color': accent } as React.CSSProperties} placeholder="Email" type="email" disabled={isEditing} />
        <input className={inputClass} style={{ '--tw-ring-color': accent } as React.CSSProperties} placeholder="Sujet" disabled={isEditing} />
        <textarea
          className={cn(inputClass, 'h-28 resize-none py-3')}
          style={{ '--tw-ring-color': accent } as React.CSSProperties}
          placeholder="Votre message..."
          disabled={isEditing}
        />
        <button
          {...elementProps(config.id, 'formButtonLabel', 'button')}
          disabled={isEditing}
          className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.01] disabled:cursor-default"
          style={{ background: `linear-gradient(135deg, ${accent}, ${accent}dd)`, boxShadow: `0 4px 14px ${accent}30` }}
        >
          {buttonLabel}
        </button>
      </div>
    )

    const infoPanel = (
      <div className="space-y-6">
        {eyebrowEl}
        <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-bold text-zinc-900 leading-tight", titleSize && getTitleSizeClass(titleSize))}
            style={customTextColor ? { color: customTextColor } : undefined}>{title}</h2>
        {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-zinc-500 leading-relaxed">{subtitle}</p>}
        <div className="space-y-4 pt-2">
          {email && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-indigo-50 shrink-0">
                <Mail className="w-4 h-4" style={{ color: accent }} />
              </div>
              <div>
                <p className="text-xs text-zinc-400">Email</p>
                <p className="text-sm font-medium text-zinc-900">{email}</p>
              </div>
            </div>
          )}
          {phone && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-indigo-50 shrink-0">
                <Phone className="w-4 h-4" style={{ color: accent }} />
              </div>
              <div>
                <p className="text-xs text-zinc-400">Telephone</p>
                <p className="text-sm font-medium text-zinc-900">{phone}</p>
              </div>
            </div>
          )}
          {address && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-indigo-50 shrink-0">
                <MapPin className="w-4 h-4" style={{ color: accent }} />
              </div>
              <div>
                <p className="text-xs text-zinc-400">Adresse</p>
                <p className="text-sm font-medium text-zinc-900">{address}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    )

    if (layout === 'simple') {
      return (
        <section className="bg-zinc-50 py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-lg mx-auto px-6">
            <div className={cn("text-center mb-8 space-y-3", textAlign && getTextAlignClass(textAlign))}>
              {eyebrowEl}
              <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-bold text-zinc-900 leading-tight", titleSize && getTitleSizeClass(titleSize))}
                  style={customTextColor ? { color: customTextColor } : undefined}>{title}</h2>
              {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-zinc-500">{subtitle}</p>}
            </div>
            {form}
          </div>
        </section>
      )
    }

    // with-info
    return (
      <section className="bg-zinc-50 py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {infoPanel}
            {form}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════════════════
  // CORPORATE — bg-slate-900, noise-overlay, blue accent
  // ═══════════════════════════════════════════════════════

  if (universe === 'corporate') {
    const accent = accentColor ?? '#3b82f6'

    const eyebrowEl = eyebrow && (
      <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase px-4 py-1.5 rounded-md border border-white/10 text-blue-300 bg-white/5">
        {eyebrow}
      </span>
    )

    const inputClass = 'w-full h-11 rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-slate-900 disabled:cursor-default'

    const form = (
      <div className="rounded-xl bg-white/5 border border-white/10 p-6 space-y-4 backdrop-blur-sm">
        {formTitle && <h3 className="font-semibold text-white mb-1">{formTitle}</h3>}
        <div className="grid grid-cols-2 gap-3">
          <input className={inputClass} style={{ '--tw-ring-color': accent } as React.CSSProperties} placeholder="Prenom" disabled={isEditing} />
          <input className={inputClass} style={{ '--tw-ring-color': accent } as React.CSSProperties} placeholder="Nom" disabled={isEditing} />
        </div>
        <input className={inputClass} style={{ '--tw-ring-color': accent } as React.CSSProperties} placeholder="Email" type="email" disabled={isEditing} />
        <input className={inputClass} style={{ '--tw-ring-color': accent } as React.CSSProperties} placeholder="Sujet" disabled={isEditing} />
        <textarea
          className={cn(inputClass, 'h-28 resize-none py-3')}
          style={{ '--tw-ring-color': accent } as React.CSSProperties}
          placeholder="Votre message..."
          disabled={isEditing}
        />
        <button
          {...elementProps(config.id, 'formButtonLabel', 'button')}
          disabled={isEditing}
          className="w-full py-3 rounded-lg text-sm font-semibold text-white transition-colors hover:brightness-110 disabled:cursor-default"
          style={{ backgroundColor: accent }}
        >
          {buttonLabel}
        </button>
      </div>
    )

    const infoPanel = (
      <div className="space-y-6">
        {eyebrowEl}
        <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-bold text-white leading-tight", titleSize && getTitleSizeClass(titleSize))}
            style={customTextColor ? { color: customTextColor } : undefined}>{title}</h2>
        {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-white/60 leading-relaxed">{subtitle}</p>}
        <div className="space-y-4 pt-2">
          {email && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 shrink-0">
                <Mail className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-white/40">Email</p>
                <p className="text-sm font-medium text-white">{email}</p>
              </div>
            </div>
          )}
          {phone && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 shrink-0">
                <Phone className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-white/40">Telephone</p>
                <p className="text-sm font-medium text-white">{phone}</p>
              </div>
            </div>
          )}
          {address && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 shrink-0">
                <MapPin className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-white/40">Adresse</p>
                <p className="text-sm font-medium text-white">{address}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    )

    if (layout === 'simple') {
      return (
        <section className="relative bg-slate-900 py-20 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'256\' height=\'256\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")' }} />
          <div className="relative max-w-lg mx-auto px-6">
            <div className={cn("text-center mb-8 space-y-3", textAlign && getTextAlignClass(textAlign))}>
              {eyebrowEl}
              <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-bold text-white leading-tight", titleSize && getTitleSizeClass(titleSize))}
                  style={customTextColor ? { color: customTextColor } : undefined}>{title}</h2>
              {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-white/60">{subtitle}</p>}
            </div>
            {form}
          </div>
        </section>
      )
    }

    // with-info
    return (
      <section className="relative bg-slate-900 py-20 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'256\' height=\'256\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")' }} />
        <div className="relative max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {infoPanel}
            {form}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════════════════
  // LUXE — bg-white, gold accent, font-light, tracking-wide
  // ═══════════════════════════════════════════════════════

  if (universe === 'luxe') {
    const accent = accentColor ?? '#b8860b'

    const eyebrowEl = eyebrow && (
      <span className="inline-block text-[11px] font-light tracking-[0.25em] uppercase" style={{ color: accent }}>
        {eyebrow}
      </span>
    )

    const inputClass = 'w-full h-11 border-b bg-transparent px-0 text-sm font-light tracking-wide text-zinc-900 placeholder:text-zinc-300 focus:outline-none disabled:cursor-default'

    const form = (
      <div className="p-8 space-y-6" style={{ borderTop: `1px solid ${accent}30` }}>
        {formTitle && <h3 className="font-light tracking-wide text-zinc-900 mb-2">{formTitle}</h3>}
        <div className="grid grid-cols-2 gap-6">
          <input className={inputClass} style={{ borderColor: `${accent}30` }} placeholder="Prenom" disabled={isEditing} />
          <input className={inputClass} style={{ borderColor: `${accent}30` }} placeholder="Nom" disabled={isEditing} />
        </div>
        <input className={inputClass} style={{ borderColor: `${accent}30` }} placeholder="Email" type="email" disabled={isEditing} />
        <input className={inputClass} style={{ borderColor: `${accent}30` }} placeholder="Sujet" disabled={isEditing} />
        <textarea
          className={cn(inputClass, 'h-28 resize-none py-3')}
          style={{ borderColor: `${accent}30` }}
          placeholder="Votre message..."
          disabled={isEditing}
        />
        <button
          {...elementProps(config.id, 'formButtonLabel', 'button')}
          disabled={isEditing}
          className="w-full py-3 text-sm font-light tracking-[0.15em] uppercase text-white transition-colors hover:brightness-110 disabled:cursor-default"
          style={{ backgroundColor: accent }}
        >
          {buttonLabel}
        </button>
      </div>
    )

    const infoPanel = (
      <div className="space-y-6">
        {eyebrowEl}
        <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-light tracking-wide text-zinc-900 leading-tight", titleSize && getTitleSizeClass(titleSize))}
            style={customTextColor ? { color: customTextColor } : undefined}>{title}</h2>
        {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base font-light text-zinc-400 leading-relaxed tracking-wide">{subtitle}</p>}
        <div className="w-12 h-px" style={{ backgroundColor: accent }} />
        <div className="space-y-5 pt-2">
          {email && (
            <div className="flex items-center gap-4">
              <Mail className="w-4 h-4 shrink-0" style={{ color: accent }} />
              <div>
                <p className="text-[11px] tracking-[0.15em] uppercase text-zinc-400">Email</p>
                <p className="text-sm font-light tracking-wide text-zinc-900">{email}</p>
              </div>
            </div>
          )}
          {phone && (
            <div className="flex items-center gap-4">
              <Phone className="w-4 h-4 shrink-0" style={{ color: accent }} />
              <div>
                <p className="text-[11px] tracking-[0.15em] uppercase text-zinc-400">Telephone</p>
                <p className="text-sm font-light tracking-wide text-zinc-900">{phone}</p>
              </div>
            </div>
          )}
          {address && (
            <div className="flex items-center gap-4">
              <MapPin className="w-4 h-4 shrink-0" style={{ color: accent }} />
              <div>
                <p className="text-[11px] tracking-[0.15em] uppercase text-zinc-400">Adresse</p>
                <p className="text-sm font-light tracking-wide text-zinc-900">{address}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    )

    if (layout === 'simple') {
      return (
        <section className="bg-white py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-lg mx-auto px-6">
            <div className={cn("text-center mb-10 space-y-4", textAlign && getTextAlignClass(textAlign))}>
              {eyebrowEl}
              <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-light tracking-wide text-zinc-900 leading-tight", titleSize && getTitleSizeClass(titleSize))}
                  style={customTextColor ? { color: customTextColor } : undefined}>{title}</h2>
              {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base font-light text-zinc-400 tracking-wide">{subtitle}</p>}
              <div className="w-12 h-px mx-auto" style={{ backgroundColor: accent }} />
            </div>
            {form}
          </div>
        </section>
      )
    }

    // with-info
    return (
      <section className="bg-white py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {infoPanel}
            {form}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════════════════
  // CREATIVE — bg-[#f5f0e8] creme, neobrutalist
  // ═══════════════════════════════════════════════════════

  if (universe === 'creative') {
    const eyebrowEl = eyebrow && (
      <span className="inline-block text-xs font-bold uppercase px-3 py-1 border-2 border-zinc-900 bg-yellow-300 text-zinc-900">
        {eyebrow}
      </span>
    )

    const inputClass = 'w-full h-11 border-2 border-zinc-900 bg-white px-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 disabled:cursor-default'

    const form = (
      <div className="border-2 border-zinc-900 bg-white p-6 shadow-[4px_4px_0_0_#18181b] space-y-4">
        {formTitle && <h3 className="font-bold text-zinc-900 mb-1">{formTitle}</h3>}
        <div className="grid grid-cols-2 gap-3">
          <input className={inputClass} placeholder="Prenom" disabled={isEditing} />
          <input className={inputClass} placeholder="Nom" disabled={isEditing} />
        </div>
        <input className={inputClass} placeholder="Email" type="email" disabled={isEditing} />
        <input className={inputClass} placeholder="Sujet" disabled={isEditing} />
        <textarea
          className={cn(inputClass, 'h-28 resize-none py-3')}
          placeholder="Votre message..."
          disabled={isEditing}
        />
        <button
          {...elementProps(config.id, 'formButtonLabel', 'button')}
          disabled={isEditing}
          className="w-full py-3 border-2 border-zinc-900 bg-zinc-900 text-white text-sm font-bold uppercase tracking-wide shadow-[3px_3px_0_0_#b8860b] hover:shadow-[1px_1px_0_0_#b8860b] hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:cursor-default"
        >
          {buttonLabel}
        </button>
      </div>
    )

    const infoPanel = (
      <div className="space-y-6">
        {eyebrowEl}
        <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-black text-zinc-900 leading-tight", titleSize && getTitleSizeClass(titleSize))}
            style={customTextColor ? { color: customTextColor } : undefined}>{title}</h2>
        {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-zinc-600 leading-relaxed">{subtitle}</p>}
        <div className="w-16 h-1 bg-zinc-900" />
        <div className="space-y-4 pt-2">
          {email && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border-2 border-zinc-900 bg-yellow-300 flex items-center justify-center shrink-0 shadow-[2px_2px_0_0_#18181b]">
                <Mail className="w-4 h-4 text-zinc-900" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-zinc-400">Email</p>
                <p className="text-sm font-bold text-zinc-900">{email}</p>
              </div>
            </div>
          )}
          {phone && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border-2 border-zinc-900 bg-yellow-300 flex items-center justify-center shrink-0 shadow-[2px_2px_0_0_#18181b]">
                <Phone className="w-4 h-4 text-zinc-900" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-zinc-400">Telephone</p>
                <p className="text-sm font-bold text-zinc-900">{phone}</p>
              </div>
            </div>
          )}
          {address && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border-2 border-zinc-900 bg-yellow-300 flex items-center justify-center shrink-0 shadow-[2px_2px_0_0_#18181b]">
                <MapPin className="w-4 h-4 text-zinc-900" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-zinc-400">Adresse</p>
                <p className="text-sm font-bold text-zinc-900">{address}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    )

    if (layout === 'simple') {
      return (
        <section className="bg-[#f5f0e8] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-lg mx-auto px-6">
            <div className={cn("text-center mb-8 space-y-3", textAlign && getTextAlignClass(textAlign))}>
              {eyebrowEl}
              <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-black text-zinc-900 leading-tight", titleSize && getTitleSizeClass(titleSize))}
                  style={customTextColor ? { color: customTextColor } : undefined}>{title}</h2>
              {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-zinc-600">{subtitle}</p>}
            </div>
            {form}
          </div>
        </section>
      )
    }

    // with-info
    return (
      <section className="bg-[#f5f0e8] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {infoPanel}
            {form}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════════════════
  // ECOMMERCE — bg-white, green accent, trust badges
  // ═══════════════════════════════════════════════════════

  if (universe === 'ecommerce') {
    const accent = accentColor ?? '#059669'

    const eyebrowEl = eyebrow && (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full text-white" style={{ backgroundColor: accent }}>
        {eyebrow}
      </span>
    )

    const inputClass = 'w-full h-11 rounded-lg border border-zinc-200 bg-white px-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-default'

    const form = (
      <div className="rounded-xl bg-white border border-zinc-200 p-6 shadow-sm space-y-4">
        {formTitle && <h3 className="font-semibold text-zinc-900 mb-1">{formTitle}</h3>}
        <div className="grid grid-cols-2 gap-3">
          <input className={inputClass} style={{ '--tw-ring-color': accent } as React.CSSProperties} placeholder="Prenom" disabled={isEditing} />
          <input className={inputClass} style={{ '--tw-ring-color': accent } as React.CSSProperties} placeholder="Nom" disabled={isEditing} />
        </div>
        <input className={inputClass} style={{ '--tw-ring-color': accent } as React.CSSProperties} placeholder="Email" type="email" disabled={isEditing} />
        <input className={inputClass} style={{ '--tw-ring-color': accent } as React.CSSProperties} placeholder="Sujet" disabled={isEditing} />
        <textarea
          className={cn(inputClass, 'h-28 resize-none py-3')}
          style={{ '--tw-ring-color': accent } as React.CSSProperties}
          placeholder="Votre message..."
          disabled={isEditing}
        />
        <button
          {...elementProps(config.id, 'formButtonLabel', 'button')}
          disabled={isEditing}
          className="w-full py-3 rounded-lg text-sm font-semibold text-white transition-colors hover:brightness-110 disabled:cursor-default"
          style={{ backgroundColor: accent }}
        >
          {buttonLabel}
        </button>
        <div className="flex items-center justify-center gap-4 pt-2 text-[11px] text-zinc-400">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
            Securise
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            Reponse rapide
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
            Sans spam
          </span>
        </div>
      </div>
    )

    const infoPanel = (
      <div className="space-y-6">
        {eyebrowEl}
        <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-bold text-zinc-900 leading-tight", titleSize && getTitleSizeClass(titleSize))}
            style={customTextColor ? { color: customTextColor } : undefined}>{title}</h2>
        {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-zinc-500 leading-relaxed">{subtitle}</p>}
        <div className="space-y-4 pt-2">
          {email && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${accent}15` }}>
                <Mail className="w-4 h-4" style={{ color: accent }} />
              </div>
              <div>
                <p className="text-xs text-zinc-400">Email</p>
                <p className="text-sm font-medium text-zinc-900">{email}</p>
              </div>
            </div>
          )}
          {phone && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${accent}15` }}>
                <Phone className="w-4 h-4" style={{ color: accent }} />
              </div>
              <div>
                <p className="text-xs text-zinc-400">Telephone</p>
                <p className="text-sm font-medium text-zinc-900">{phone}</p>
              </div>
            </div>
          )}
          {address && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${accent}15` }}>
                <MapPin className="w-4 h-4" style={{ color: accent }} />
              </div>
              <div>
                <p className="text-xs text-zinc-400">Adresse</p>
                <p className="text-sm font-medium text-zinc-900">{address}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    )

    if (layout === 'simple') {
      return (
        <section className="bg-white py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-lg mx-auto px-6">
            <div className={cn("text-center mb-8 space-y-3", textAlign && getTextAlignClass(textAlign))}>
              {eyebrowEl}
              <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-bold text-zinc-900 leading-tight", titleSize && getTitleSizeClass(titleSize))}
                  style={customTextColor ? { color: customTextColor } : undefined}>{title}</h2>
              {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-zinc-500">{subtitle}</p>}
            </div>
            {form}
          </div>
        </section>
      )
    }

    // with-info
    return (
      <section className="bg-white py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {infoPanel}
            {form}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════════════════
  // BRIXSA — bg-#140c08, gold accent, real estate contact
  // ═══════════════════════════════════════════════════════

  if (universe === 'brixsa') {
    const gold = accentColor ?? 'var(--color-accent, #c8a97e)'

    const heroImage = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80'

    const inputStyles: React.CSSProperties = {
      width: '100%',
      height: '48px',
      backgroundColor: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '4px',
      padding: '0 16px',
      fontSize: '14px',
      color: 'var(--color-background, #e1e1e1)',
      outline: 'none',
      fontFamily: "'Inter Variable', Inter, sans-serif",
    }

    const labelStyles: React.CSSProperties = {
      display: 'block',
      fontSize: '13px',
      fontWeight: 500,
      color: 'color-mix(in srgb, var(--color-background, #e1e1e1) 70%, transparent)',
      marginBottom: '6px',
      fontFamily: "'Inter Variable', Inter, sans-serif",
    }

    const form = (
      <div
        {...elementProps(config.id, 'form', 'container')}
        style={{
          backgroundColor: 'rgba(255,255,255,0.05)',
          borderRadius: '8px',
          padding: '40px',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div
          {...elementProps(config.id, 'formGrid', 'container')}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}
        >
          <div {...elementProps(config.id, 'firstNameField', 'container')}>
            <label style={labelStyles}>First Name</label>
            <input
              style={inputStyles}
              placeholder="John"
              disabled={isEditing}
            />
          </div>
          <div {...elementProps(config.id, 'lastNameField', 'container')}>
            <label style={labelStyles}>Last Name</label>
            <input
              style={inputStyles}
              placeholder="Doe"
              disabled={isEditing}
            />
          </div>
        </div>
        <div {...elementProps(config.id, 'phoneField', 'container')} style={{ marginBottom: '20px' }}>
          <label style={labelStyles}>Phone</label>
          <input
            style={inputStyles}
            placeholder="+1 (555) 000-0000"
            type="tel"
            disabled={isEditing}
          />
        </div>
        <div {...elementProps(config.id, 'emailField', 'container')} style={{ marginBottom: '20px' }}>
          <label style={labelStyles}>Email Address</label>
          <input
            style={inputStyles}
            placeholder="john@example.com"
            type="email"
            disabled={isEditing}
          />
        </div>
        <div {...elementProps(config.id, 'messageField', 'container')} style={{ marginBottom: '28px' }}>
          <label style={labelStyles}>Message</label>
          <textarea
            style={{
              ...inputStyles,
              height: '120px',
              resize: 'none' as const,
              paddingTop: '12px',
              paddingBottom: '12px',
            }}
            placeholder="Tell us about what you're looking for..."
            disabled={isEditing}
          />
        </div>
        <div
          {...elementProps(config.id, 'formButtonLabel', 'button')}
          role="button"
          style={{
            width: '100%',
            padding: '14px 0',
            backgroundColor: gold,
            color: 'var(--color-foreground, #140c08)',
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: '0.5px',
            textTransform: 'uppercase' as const,
            border: 'none',
            borderRadius: '4px',
            cursor: isEditing ? 'default' : 'pointer',
            fontFamily: "'Inter Variable', Inter, sans-serif",
            textAlign: 'center' as const,
          }}
        >
          {buttonLabel ?? 'Submit'}
        </div>
      </div>
    )

    const infoPanel = (
      <div {...elementProps(config.id, 'infoPanel', 'container')} style={{ display: 'flex', flexDirection: 'column' as const, gap: '20px' }}>
        <h2
          {...elementProps(config.id, 'title', 'heading')}
          style={{
            fontSize: '42px',
            fontWeight: 600,
            color: customTextColor ?? 'var(--color-background, #e1e1e1)',
            lineHeight: 1.15,
            margin: 0,
            fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
          }}
        >
          {title ?? 'Share your interest with us'}
        </h2>
        <p
          {...elementProps(config.id, 'subtitle', 'text')}
          style={{
            fontSize: '16px',
            color: 'color-mix(in srgb, var(--color-background, #e1e1e1) 60%, transparent)',
            lineHeight: 1.6,
            margin: 0,
            fontFamily: "'Inter Variable', Inter, sans-serif",
          }}
        >
          {subtitle ?? 'Have questions for us? Fill out the form and an agent will reach out to you.'}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px', paddingTop: '8px' }}>
          {email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Mail style={{ width: '18px', height: '18px', color: gold, flexShrink: 0 }} />
              <span style={{ fontSize: '14px', color: 'color-mix(in srgb, var(--color-background, #e1e1e1) 80%, transparent)', fontFamily: "'Inter Variable', Inter, sans-serif" }}>{email}</span>
            </div>
          )}
          {phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Phone style={{ width: '18px', height: '18px', color: gold, flexShrink: 0 }} />
              <span style={{ fontSize: '14px', color: 'color-mix(in srgb, var(--color-background, #e1e1e1) 80%, transparent)', fontFamily: "'Inter Variable', Inter, sans-serif" }}>{phone}</span>
            </div>
          )}
          {address && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <MapPin style={{ width: '18px', height: '18px', color: gold, flexShrink: 0 }} />
              <span style={{ fontSize: '14px', color: 'color-mix(in srgb, var(--color-background, #e1e1e1) 80%, transparent)', fontFamily: "'Inter Variable', Inter, sans-serif" }}>{address}</span>
            </div>
          )}
        </div>
      </div>
    )

    if (layout === 'simple') {
      return (
        <section
          {...elementProps(config.id, 'section', 'container')}
          style={{ backgroundColor: 'var(--color-foreground, #140c08)', fontFamily: "'Inter Variable', Inter, sans-serif" }}
        >
          {/* Hero image */}
          <div
            {...elementProps(config.id, 'heroImageWrapper', 'container')}
            style={{
              width: '100%',
              height: '340px',
              overflow: 'hidden',
              position: 'relative' as const,
            }}
          >
            <img
              {...elementProps(config.id, 'heroImage', 'image')}
              src={heroImage}
              alt="Contact hero"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover' as const,
                objectPosition: 'center',
                display: 'block',
              }}
            />
            <div style={{
              position: 'absolute' as const,
              bottom: 0,
              left: 0,
              right: 0,
              height: '120px',
              background: 'linear-gradient(to top, var(--color-foreground, #140c08), transparent)',
            }} />
          </div>

          <div style={{ maxWidth: '560px', margin: '0 auto', padding: '48px 24px 80px' }}>
            <div
              {...elementProps(config.id, 'headerBlock', 'container')}
              style={{ textAlign: 'center' as const, marginBottom: '40px' }}
            >
              <h2
                {...elementProps(config.id, 'title', 'heading')}
                style={{
                  fontSize: '38px',
                  fontWeight: 600,
                  color: customTextColor ?? 'var(--color-background, #e1e1e1)',
                  lineHeight: 1.15,
                  margin: '0 0 12px',
                  fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
                }}
              >
                {title ?? 'Share your interest with us'}
              </h2>
              <p
                {...elementProps(config.id, 'subtitle', 'text')}
                style={{
                  fontSize: '16px',
                  color: 'color-mix(in srgb, var(--color-background, #e1e1e1) 60%, transparent)',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {subtitle ?? 'Have questions for us? Fill out the form and an agent will reach out to you.'}
              </p>
            </div>
            {form}
          </div>
        </section>
      )
    }

    // with-info
    return (
      <section
        {...elementProps(config.id, 'wrapper', 'container', 'Contact Section')}
        style={{ backgroundColor: 'var(--color-foreground, #140c08)', fontFamily: "'Inter Variable', Inter, sans-serif" }}
      >
        {/* Hero image */}
        <div
          {...elementProps(config.id, 'heroImageWrapper', 'container')}
          style={{
            width: '100%',
            height: '340px',
            overflow: 'hidden',
            position: 'relative' as const,
          }}
        >
          <img
            {...elementProps(config.id, 'heroImage', 'image')}
            src={heroImage}
            alt="Contact hero"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover' as const,
              objectPosition: 'center',
              display: 'block',
            }}
          />
          <div style={{
            position: 'absolute' as const,
            bottom: 0,
            left: 0,
            right: 0,
            height: '120px',
            background: 'linear-gradient(to top, var(--color-foreground, #140c08), transparent)',
          }} />
        </div>

        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px 80px' }}>
          <div
            {...elementProps(config.id, 'contentGrid', 'container')}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}
          >
            {infoPanel}
            {form}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════════════════
  // GLASS — bg-zinc-950, glassmorphism, gradient-text, glow
  // ═══════════════════════════════════════════════════════

  if (universe === 'glass') {
    const accent = accentColor ?? '#8b5cf6'

    const eyebrowEl = eyebrow && (
      <span className="inline-flex items-center gap-2 text-xs font-medium px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white/70">
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent, boxShadow: `0 0 6px ${accent}` }} />
        {eyebrow}
      </span>
    )

    const inputClass = 'w-full h-11 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm px-4 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-zinc-950 disabled:cursor-default'

    const form = (
      <div className="relative rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 space-y-4 overflow-hidden">
        {/* Subtle glow */}
        <div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: accent }}
        />
        <div className="relative">
          {formTitle && <h3 className="font-semibold text-white mb-3">{formTitle}</h3>}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <input className={inputClass} style={{ '--tw-ring-color': accent } as React.CSSProperties} placeholder="Prenom" disabled={isEditing} />
              <input className={inputClass} style={{ '--tw-ring-color': accent } as React.CSSProperties} placeholder="Nom" disabled={isEditing} />
            </div>
            <input className={inputClass} style={{ '--tw-ring-color': accent } as React.CSSProperties} placeholder="Email" type="email" disabled={isEditing} />
            <input className={inputClass} style={{ '--tw-ring-color': accent } as React.CSSProperties} placeholder="Sujet" disabled={isEditing} />
            <textarea
              className={cn(inputClass, 'h-28 resize-none py-3')}
              style={{ '--tw-ring-color': accent } as React.CSSProperties}
              placeholder="Votre message..."
              disabled={isEditing}
            />
            <button
              {...elementProps(config.id, 'formButtonLabel', 'button')}
              disabled={isEditing}
              className="w-full py-3 rounded-lg text-sm font-semibold text-white transition-all hover:brightness-110 disabled:cursor-default"
              style={{
                background: `linear-gradient(135deg, ${accent}, ${accent}bb)`,
                boxShadow: `0 0 20px ${accent}30, inset 0 1px 0 rgba(255,255,255,0.1)`,
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {buttonLabel}
            </button>
          </div>
        </div>
      </div>
    )

    const infoPanel = (
      <div className="space-y-6">
        {eyebrowEl}
        <h2
          {...elementProps(config.id, 'title', 'heading')}
          className={cn("text-3xl md:text-4xl font-bold leading-tight bg-clip-text text-transparent", titleSize && getTitleSizeClass(titleSize))}
          style={customTextColor ? { color: customTextColor } : { backgroundImage: `linear-gradient(135deg, #fff 0%, ${accent} 100%)` }}
        >
          {title}
        </h2>
        {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-white/50 leading-relaxed">{subtitle}</p>}
        <div className="space-y-4 pt-2">
          {email && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 shrink-0 backdrop-blur-sm">
                <Mail className="w-4 h-4" style={{ color: accent }} />
              </div>
              <div>
                <p className="text-xs text-white/30">Email</p>
                <p className="text-sm font-medium text-white/90">{email}</p>
              </div>
            </div>
          )}
          {phone && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 shrink-0 backdrop-blur-sm">
                <Phone className="w-4 h-4" style={{ color: accent }} />
              </div>
              <div>
                <p className="text-xs text-white/30">Telephone</p>
                <p className="text-sm font-medium text-white/90">{phone}</p>
              </div>
            </div>
          )}
          {address && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 shrink-0 backdrop-blur-sm">
                <MapPin className="w-4 h-4" style={{ color: accent }} />
              </div>
              <div>
                <p className="text-xs text-white/30">Adresse</p>
                <p className="text-sm font-medium text-white/90">{address}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    )

    if (layout === 'simple') {
      return (
        <section className="relative bg-zinc-950 py-20 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          {/* Noise overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'256\' height=\'256\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")' }} />
          {/* Dot grid */}
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          {/* Center glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: accent }} />
          <div className="relative max-w-lg mx-auto px-6">
            <div className={cn("text-center mb-8 space-y-3", textAlign && getTextAlignClass(textAlign))}>
              {eyebrowEl}
              <h2
                {...elementProps(config.id, 'title', 'heading')}
                className={cn("text-3xl md:text-4xl font-bold leading-tight bg-clip-text text-transparent", titleSize && getTitleSizeClass(titleSize))}
                style={customTextColor ? { color: customTextColor } : { backgroundImage: `linear-gradient(135deg, #fff 0%, ${accent} 100%)` }}
              >
                {title}
              </h2>
              {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-white/50">{subtitle}</p>}
            </div>
            {form}
          </div>
        </section>
      )
    }

    // with-info (default fallback)
    return (
      <section className="relative bg-zinc-950 py-20 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'256\' height=\'256\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")' }} />
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        {/* Center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: accent }} />
        <div className="relative max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {infoPanel}
            {form}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════════════════
  // JLSTUDIO — 2-column split: image left + form right
  // ═══════════════════════════════════════════════════════
  if (universe === 'jlstudio') {
    return <JlstudioSplitContact config={config} title={title} subtitle={subtitle} eyebrow={eyebrow} email={email} phone={phone} address={address} buttonLabel={buttonLabel} customTextColor={customTextColor} isEditing={isEditing} />
  }

  // ═══════════════════════════════════════════════════════
  // ZMR-AGENCY — Fond noir, cards info minimalistes (email/phone/address),
  // formulaire dark avec inputs transparents, style luxe ultra-minimaliste
  // ═══════════════════════════════════════════════════════
  if (universe === 'zmr') {
    return <ZmrContact config={config} title={title} subtitle={subtitle} email={email} phone={phone} address={address} buttonLabel={buttonLabel} customTextColor={customTextColor} titleSize={titleSize} isEditing={isEditing} />
  }


  if (universe === 'warm') {
    const accent = accentColor ?? '#b4654a'
    const inputClass = 'w-full h-11 border-b bg-transparent px-0 text-sm font-light text-zinc-800 placeholder:text-zinc-400 focus:outline-none disabled:cursor-default'

    return (
      <section style={{ fontFamily: 'var(--font-body, inherit)', background: '#faf7f2' }} className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Info */}
            <div className="space-y-6">
              {eyebrow && <span className="inline-block text-xs font-medium tracking-[0.15em] uppercase" style={{ color: accent }}>{eyebrow}</span>}
              <div className="w-12 h-px" style={{ background: accent, opacity: 0.4 }} />
              <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-light leading-tight tracking-tight", titleSize && getTitleSizeClass(titleSize))} style={{ color: customTextColor ?? '#3d2b1f', fontFamily: 'Georgia, serif' }}>{title}</h2>
              {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base leading-relaxed" style={{ color: '#78593e' }}>{subtitle}</p>}
              <div className="space-y-5 pt-2">
                {email && <div className="flex items-center gap-4"><Mail className="w-4 h-4 shrink-0" style={{ color: accent }} /><div><p className="text-[11px] tracking-[0.1em] uppercase" style={{ color: '#78593e' }}>Email</p><p className="text-sm" style={{ color: '#3d2b1f' }}>{email}</p></div></div>}
                {phone && <div className="flex items-center gap-4"><Phone className="w-4 h-4 shrink-0" style={{ color: accent }} /><div><p className="text-[11px] tracking-[0.1em] uppercase" style={{ color: '#78593e' }}>Téléphone</p><p className="text-sm" style={{ color: '#3d2b1f' }}>{phone}</p></div></div>}
                {address && <div className="flex items-center gap-4"><MapPin className="w-4 h-4 shrink-0" style={{ color: accent }} /><div><p className="text-[11px] tracking-[0.1em] uppercase" style={{ color: '#78593e' }}>Adresse</p><p className="text-sm" style={{ color: '#3d2b1f' }}>{address}</p></div></div>}
              </div>
            </div>
            {/* Form */}
            <div className="p-8 space-y-6 bg-white rounded" style={{ borderRadius: '0.25rem' }}>
              {formTitle && <h3 className="font-light" style={{ color: '#3d2b1f', fontFamily: 'Georgia, serif' }}>{formTitle}</h3>}
              <div className="grid grid-cols-2 gap-6">
                <input className={inputClass} style={{ borderColor: `${accent}25` }} placeholder="Prénom" disabled={isEditing} />
                <input className={inputClass} style={{ borderColor: `${accent}25` }} placeholder="Nom" disabled={isEditing} />
              </div>
              <input className={inputClass} style={{ borderColor: `${accent}25` }} placeholder="Email" disabled={isEditing} />
              <textarea className={cn(inputClass, 'h-28 resize-none py-3')} style={{ borderColor: `${accent}25` }} placeholder="Votre message..." disabled={isEditing} />
              <button {...elementProps(config.id, 'formButtonLabel', 'button')} disabled={isEditing} className="w-full py-3 text-sm font-medium tracking-[0.05em] text-white transition-colors hover:brightness-110 disabled:cursor-default" style={{ backgroundColor: accent, borderRadius: '0.25rem' }}>{buttonLabel}</button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════════════════
  // PLAYFUL — Duolingo/Figma, bold, rounded, vibrant
  // ═══════════════════════════════════════════════════════
  if (universe === 'playful') {
    const accent = accentColor ?? '#7c3aed'
    const inputClass = 'w-full h-12 rounded-xl border-2 border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-violet-400 disabled:cursor-default'

    return (
      <section className="bg-white py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-lg mx-auto px-6">
          <div className={cn("text-center mb-10 space-y-4", textAlign && getTextAlignClass(textAlign))}>
            {eyebrow && <span className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2 rounded-full text-white" style={{ backgroundColor: accent }}>{eyebrow}</span>}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-extrabold text-zinc-900 leading-tight", titleSize && getTitleSizeClass(titleSize))} style={customTextColor ? { color: customTextColor } : undefined}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-zinc-500 font-medium">{subtitle}</p>}
          </div>
          <div className="p-8 rounded-3xl border-2 border-zinc-100 space-y-5" style={{ background: '#faf5ff' }}>
            <div className="grid grid-cols-2 gap-4">
              <input className={inputClass} placeholder="Prénom" disabled={isEditing} />
              <input className={inputClass} placeholder="Nom" disabled={isEditing} />
            </div>
            <input className={inputClass} placeholder="Email" disabled={isEditing} />
            <textarea className={cn(inputClass, 'h-28 resize-none py-3 rounded-xl')} placeholder="Votre message..." disabled={isEditing} />
            <button {...elementProps(config.id, 'formButtonLabel', 'button')} disabled={isEditing} className="w-full py-3.5 rounded-xl text-base font-bold text-white transition-all hover:shadow-lg hover:scale-[1.02] disabled:cursor-default" style={{ backgroundColor: accent }}>{buttonLabel} 🚀</button>
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════════════════
  // RETRO — Vintage, slab, amber, sharp
  // ═══════════════════════════════════════════════════════
  if (universe === 'retro') {
    const accent = accentColor ?? '#d97706'
    const inputClass = 'w-full h-11 border-b-2 bg-transparent px-0 text-sm font-bold text-zinc-900 placeholder:text-zinc-400 focus:outline-none disabled:cursor-default'

    return (
      <section style={{ fontFamily: 'var(--font-body, inherit)', background: '#fffbeb' }} className="py-20">
        <div className="max-w-lg mx-auto px-6">
          <div className={cn("text-center mb-10 space-y-4", textAlign && getTextAlignClass(textAlign))}>
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="w-12 h-0.5" style={{ backgroundColor: '#92400e' }} />
              <span style={{ color: '#92400e' }}>✦</span>
              <div className="w-12 h-0.5" style={{ backgroundColor: '#92400e' }} />
            </div>
            {eyebrow && <span className="inline-block text-xs font-extrabold tracking-[0.2em] uppercase px-3 py-1" style={{ backgroundColor: accent, color: '#fffbeb' }}>{eyebrow}</span>}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-black uppercase tracking-wide", titleSize && getTitleSizeClass(titleSize))} style={{ color: customTextColor ?? '#451a03' }}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base" style={{ color: '#78350f' }}>{subtitle}</p>}
          </div>
          <div className="p-8 border-2 space-y-6" style={{ borderColor: '#92400e', background: '#fff' }}>
            <div className="grid grid-cols-2 gap-6">
              <input className={inputClass} style={{ borderColor: '#92400e' }} placeholder="PRÉNOM" disabled={isEditing} />
              <input className={inputClass} style={{ borderColor: '#92400e' }} placeholder="NOM" disabled={isEditing} />
            </div>
            <input className={inputClass} style={{ borderColor: '#92400e' }} placeholder="EMAIL" disabled={isEditing} />
            <textarea className={cn(inputClass, 'h-28 resize-none py-3')} style={{ borderColor: '#92400e' }} placeholder="VOTRE MESSAGE..." disabled={isEditing} />
            <button {...elementProps(config.id, 'formButtonLabel', 'button')} disabled={isEditing} className="w-full py-3.5 text-sm font-extrabold tracking-[0.1em] uppercase text-white transition-all hover:brightness-110 disabled:cursor-default" style={{ backgroundColor: accent, borderRadius: 0 }}>{buttonLabel}</button>
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════════════════
  // DARK-PREMIUM — Noir & gold, ultra-thin
  // ═══════════════════════════════════════════════════════
  if (variant.startsWith('dark-premium') || (universe === 'dark' && variant.includes('premium'))) {
    const gold = accentColor ?? '#d4af37'
    const inputClass = 'w-full h-11 border-b bg-transparent px-0 text-sm font-light tracking-wide text-white placeholder:text-white/30 focus:outline-none disabled:cursor-default'

    return (
      <section style={{ fontFamily: 'var(--font-body, inherit)', background: '#0a0a0a' }} className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Info */}
            <div className="space-y-8">
              {eyebrow && <span className="inline-block text-[0.6875rem] font-normal tracking-[0.3em] uppercase" style={{ color: gold }}>{eyebrow}</span>}
              <div className="w-16 h-px" style={{ background: `linear-gradient(90deg, ${gold}, transparent)` }} />
              <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-extralight leading-tight tracking-[0.04em] uppercase text-white", titleSize && getTitleSizeClass(titleSize))} style={customTextColor ? { color: customTextColor } : undefined}>{title}</h2>
              {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base font-light tracking-wide" style={{ color: `${gold}80` }}>{subtitle}</p>}
              <div className="space-y-6 pt-2">
                {email && <div className="flex items-center gap-4"><Mail className="w-4 h-4 shrink-0" style={{ color: gold }} /><div><p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: `${gold}60` }}>Email</p><p className="text-sm font-light text-white">{email}</p></div></div>}
                {phone && <div className="flex items-center gap-4"><Phone className="w-4 h-4 shrink-0" style={{ color: gold }} /><div><p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: `${gold}60` }}>Téléphone</p><p className="text-sm font-light text-white">{phone}</p></div></div>}
                {address && <div className="flex items-center gap-4"><MapPin className="w-4 h-4 shrink-0" style={{ color: gold }} /><div><p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: `${gold}60` }}>Adresse</p><p className="text-sm font-light text-white">{address}</p></div></div>}
              </div>
            </div>
            {/* Form */}
            <div className="p-8 space-y-6 border" style={{ borderColor: `${gold}20` }}>
              {formTitle && <h3 className="font-light text-sm tracking-[0.1em] uppercase text-white">{formTitle}</h3>}
              <div className="grid grid-cols-2 gap-6">
                <input className={inputClass} style={{ borderColor: `${gold}20` }} placeholder="Prénom" disabled={isEditing} />
                <input className={inputClass} style={{ borderColor: `${gold}20` }} placeholder="Nom" disabled={isEditing} />
              </div>
              <input className={inputClass} style={{ borderColor: `${gold}20` }} placeholder="Email" disabled={isEditing} />
              <textarea className={cn(inputClass, 'h-28 resize-none py-3')} style={{ borderColor: `${gold}20` }} placeholder="Votre message..." disabled={isEditing} />
              <button {...elementProps(config.id, 'formButtonLabel', 'button')} disabled={isEditing} className="w-full py-3.5 text-xs font-normal tracking-[0.2em] uppercase border text-white transition-all hover:bg-white/5 disabled:cursor-default" style={{ borderColor: gold, color: gold }}>{buttonLabel}</button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════════════════
  // EDITORIAL — NYT/Medium, serif, rules
  // ═══════════════════════════════════════════════════════
  if (universe === 'editorial') {
    const inputClass = 'w-full h-11 border-b bg-transparent px-0 text-sm font-normal text-zinc-900 placeholder:text-zinc-400 focus:outline-none disabled:cursor-default'

    return (
      <section style={{ fontFamily: 'var(--font-body, inherit)', background: '#fafaf9' }} className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="w-full h-px bg-zinc-900 mb-12" />
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Info */}
            <div className="space-y-6">
              {eyebrow && <span className="inline-block text-[0.6875rem] font-normal tracking-[0.15em] uppercase text-zinc-900">{eyebrow}</span>}
              <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-normal leading-tight tracking-tight", titleSize && getTitleSizeClass(titleSize))} style={{ color: customTextColor ?? '#18181b', fontFamily: 'Georgia, serif' }}>{title}</h2>
              {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base leading-relaxed" style={{ color: '#52525b', fontFamily: 'Georgia, serif' }}>{subtitle}</p>}
              <div className="w-full h-px bg-zinc-200" />
              <div className="space-y-5">
                {email && <div className="flex items-center gap-4"><Mail className="w-4 h-4 shrink-0 text-zinc-400" /><div><p className="text-[0.6875rem] tracking-[0.12em] uppercase text-zinc-400">Email</p><p className="text-sm text-zinc-900">{email}</p></div></div>}
                {phone && <div className="flex items-center gap-4"><Phone className="w-4 h-4 shrink-0 text-zinc-400" /><div><p className="text-[0.6875rem] tracking-[0.12em] uppercase text-zinc-400">Téléphone</p><p className="text-sm text-zinc-900">{phone}</p></div></div>}
                {address && <div className="flex items-center gap-4"><MapPin className="w-4 h-4 shrink-0 text-zinc-400" /><div><p className="text-[0.6875rem] tracking-[0.12em] uppercase text-zinc-400">Adresse</p><p className="text-sm text-zinc-900">{address}</p></div></div>}
              </div>
            </div>
            {/* Form */}
            <div className="space-y-6">
              {formTitle && <h3 className="font-normal" style={{ color: '#18181b', fontFamily: 'Georgia, serif' }}>{formTitle}</h3>}
              <div className="grid grid-cols-2 gap-6">
                <input className={inputClass} style={{ borderColor: '#18181b' }} placeholder="Prénom" disabled={isEditing} />
                <input className={inputClass} style={{ borderColor: '#18181b' }} placeholder="Nom" disabled={isEditing} />
              </div>
              <input className={inputClass} style={{ borderColor: '#18181b' }} placeholder="Email" disabled={isEditing} />
              <textarea className={cn(inputClass, 'h-28 resize-none py-3')} style={{ borderColor: '#18181b' }} placeholder="Votre message..." disabled={isEditing} />
              <button {...elementProps(config.id, 'formButtonLabel', 'button')} disabled={isEditing} className="w-full py-3.5 text-xs font-normal tracking-[0.12em] uppercase bg-zinc-900 text-white hover:bg-zinc-800 transition-colors disabled:cursor-default">{buttonLabel}</button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════════════════
  // ORGANIC — Nature, green, rounded
  // ═══════════════════════════════════════════════════════
  if (universe === 'organic') {
    const green = accentColor ?? '#3f6212'
    const inputClass = 'w-full h-12 rounded-lg border bg-white px-4 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none disabled:cursor-default'

    return (
      <section style={{ fontFamily: 'var(--font-body, inherit)', background: '#f7fee7' }} className="py-24">
        <div className="max-w-lg mx-auto px-6">
          <div className={cn("text-center mb-10 space-y-4", textAlign && getTextAlignClass(textAlign))}>
            {eyebrow && <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.08em] uppercase px-4 py-1.5 rounded-full" style={{ backgroundColor: `${green}12`, color: green }}>🌿 {eyebrow}</span>}
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-light leading-tight tracking-tight", titleSize && getTitleSizeClass(titleSize))} style={{ color: customTextColor ?? '#1a2e05', fontFamily: 'Georgia, serif' }}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base leading-relaxed" style={{ color: '#4d7c0f' }}>{subtitle}</p>}
          </div>
          <div className="p-8 rounded-2xl bg-white border space-y-5" style={{ borderColor: `${green}15` }}>
            <div className="grid grid-cols-2 gap-4">
              <input className={inputClass} style={{ borderColor: `${green}20` }} placeholder="Prénom" disabled={isEditing} />
              <input className={inputClass} style={{ borderColor: `${green}20` }} placeholder="Nom" disabled={isEditing} />
            </div>
            <input className={inputClass} style={{ borderColor: `${green}20` }} placeholder="Email" disabled={isEditing} />
            <textarea className={cn(inputClass, 'h-28 resize-none py-3')} style={{ borderColor: `${green}20` }} placeholder="Votre message..." disabled={isEditing} />
            <button {...elementProps(config.id, 'formButtonLabel', 'button')} disabled={isEditing} className="w-full py-3.5 rounded-full text-sm font-medium text-white transition-all hover:brightness-110 disabled:cursor-default" style={{ backgroundColor: green }}>{buttonLabel}</button>
          </div>
        </div>
      </section>
    )
  }



  // Fallback — unknown universe, render nothing
  return null
}

// ═══════════════════════════════════════════════════════
// ZMR CONTACT — Full contact page matching original ZMR design
// ═══════════════════════════════════════════════════════
function ZmrContact({ config, title, subtitle, email, phone, address, buttonLabel, customTextColor, titleSize, isEditing }: {
  config: SectionConfig; title: string; subtitle?: string; email?: string; phone?: string; address?: string; buttonLabel: string; customTextColor?: string; titleSize?: string; isEditing?: boolean
}) {
  const [selectedType, setSelectedType] = useState<'professional' | 'model' | null>(null)
  const [wantCallback, setWantCallback] = useState(false)
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)

  const labelStyle: React.CSSProperties = {
    fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: 400,
  }
  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '14px 0', fontSize: '15px', fontWeight: 300, letterSpacing: '0.02em', color: 'white',
    background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.15)', outline: 'none', transition: 'border-color 0.4s ease',
  }

  // Generate next 7 days for callback
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() + i)
    const label = i === 0 ? "Aujourd'hui" : i === 1 ? 'Demain' : d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })
    return { key: d.toISOString().slice(0, 10), label }
  })
  const timeSlots = ['09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00', '17:00 - 18:00']

  const chipStyle = (active: boolean): React.CSSProperties => ({
    padding: '10px 16px', fontSize: '12px', letterSpacing: '0.05em', fontWeight: 400, cursor: 'pointer', transition: 'all 0.3s ease',
    border: active ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.1)',
    background: active ? 'rgba(255,255,255,0.1)' : 'transparent',
    color: active ? 'white' : 'rgba(255,255,255,0.5)',
  })

  return (
    <section style={{ fontFamily: 'var(--font-body, inherit)', background: '#0a0a0a', padding: '140px 48px 80px', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 50%)' }} />

      <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        {/* Title */}
        <h2
          {...elementProps(config.id, 'title', 'heading')}
          style={{ color: customTextColor ?? 'white', fontSize: '3.5rem', fontWeight: 200, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '16px' }}
        >
          {title}
        </h2>
        {subtitle && (
          <p {...elementProps(config.id, 'subtitle', 'text')} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', fontWeight: 300, lineHeight: 1.7, maxWidth: '420px', margin: '0 auto 40px', whiteSpace: 'pre-line' }}>
            {subtitle}
          </p>
        )}

        {/* Contact Info Cards — 3-col with 1px gap borders */}
        {(email || phone || address) && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.08)', maxWidth: '680px', margin: '0 auto 48px' }}>
            {email && (
              <div style={{ background: '#0a0a0a', padding: '28px 24px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.4s ease', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}
                onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#0a0a0a')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7L13.03 12.7a1.94 1.94 0 01-2.06 0L2 7" /></svg>
                <p style={labelStyle}>Email</p>
                <p {...elementProps(config.id, 'email', 'text')} style={{ color: 'white', fontSize: '14px', fontWeight: 300, margin: 0 }}>{email}</p>
              </div>
            )}
            {phone && (
              <div style={{ background: '#0a0a0a', padding: '28px 24px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.4s ease', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}
                onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#0a0a0a')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>
                <p style={labelStyle}>Téléphone</p>
                <p {...elementProps(config.id, 'phone', 'text')} style={{ color: 'white', fontSize: '14px', fontWeight: 300, margin: 0 }}>{phone}</p>
              </div>
            )}
            {address && (
              <div style={{ background: '#0a0a0a', padding: '28px 24px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.4s ease', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}
                onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#0a0a0a')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                <p style={labelStyle}>Adresse</p>
                <p {...elementProps(config.id, 'address', 'text')} style={{ color: 'white', fontSize: '14px', fontWeight: 300, margin: 0 }}>{address}</p>
              </div>
            )}
          </div>
        )}

        {/* Type Selection — Professional / Model */}
        <p style={{ ...labelStyle, letterSpacing: '0.35em', marginBottom: '16px' }}>Vous êtes</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', maxWidth: '520px', margin: '0 auto 32px' }}>
          {/* Professional */}
          <button
            onClick={() => setSelectedType(selectedType === 'professional' ? null : 'professional')}
            style={{
              padding: '28px 24px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.3s',
              border: selectedType === 'professional' ? '1px solid rgba(255,255,255,0.25)' : '1px solid rgba(255,255,255,0.1)',
              background: selectedType === 'professional' ? 'rgba(255,255,255,0.05)' : 'transparent',
            }}
            onMouseOver={(e) => { if (selectedType !== 'professional') { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)' } }}
            onMouseOut={(e) => { if (selectedType !== 'professional') { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'transparent' } }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={selectedType === 'professional' ? 'white' : 'rgba(255,255,255,0.4)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 12px', display: 'block' }}>
              <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
            </svg>
            <p style={{ color: 'white', fontSize: '15px', fontWeight: 300, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 4px' }}>Professionnel</p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', margin: 0 }}>Recherche de talents</p>
          </button>
          {/* Model */}
          <button
            onClick={() => setSelectedType(selectedType === 'model' ? null : 'model')}
            style={{
              padding: '28px 24px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.3s',
              border: selectedType === 'model' ? '1px solid rgba(255,255,255,0.25)' : '1px solid rgba(255,255,255,0.1)',
              background: selectedType === 'model' ? 'rgba(255,255,255,0.05)' : 'transparent',
            }}
            onMouseOver={(e) => { if (selectedType !== 'model') { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)' } }}
            onMouseOut={(e) => { if (selectedType !== 'model') { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'transparent' } }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={selectedType === 'model' ? 'white' : 'rgba(255,255,255,0.4)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 12px', display: 'block' }}>
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
            <p style={{ color: 'white', fontSize: '15px', fontWeight: 300, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 4px' }}>Devenir Mannequin</p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', margin: 0 }}>Candidature agence</p>
          </button>
        </div>

        {/* Divider */}
        <div style={{ width: '50px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)', margin: '0 auto 32px' }} />

        {/* Form */}
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
          {/* Name + Email — 2 columns */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px 32px', marginBottom: '24px' }}>
            <div>
              <p style={labelStyle}>Nom *</p>
              <input style={inputStyle} placeholder="Votre nom" disabled={isEditing}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')} />
            </div>
            <div>
              <p style={labelStyle}>Email *</p>
              <input style={inputStyle} type="email" placeholder="votre@email.com" disabled={isEditing}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')} />
            </div>
          </div>

          {/* Phone — full width */}
          <div style={{ marginBottom: '24px' }}>
            <p style={labelStyle}>Téléphone</p>
            <input style={inputStyle} type="tel" placeholder="+33 6 00 00 00 00" disabled={isEditing}
              onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')} />
          </div>

          {/* Message — textarea */}
          <div style={{ marginBottom: '24px' }}>
            <p style={labelStyle}>Message *</p>
            <textarea
              rows={3}
              style={{ ...inputStyle, resize: 'none' as const, fontFamily: 'inherit', lineHeight: 1.6 }}
              placeholder="Décrivez votre projet ou votre demande..."
              disabled={isEditing}
              onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')}
            />
          </div>

          {/* Callback checkbox */}
          <div
            onClick={() => setWantCallback(!wantCallback)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '24px', padding: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" style={{ flexShrink: 0 }}>
              <rect x="0.5" y="0.5" width="19" height="19" rx="3" fill={wantCallback ? 'rgba(255,255,255,0.1)' : 'transparent'} stroke={wantCallback ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.25)'} strokeWidth="1" style={{ transition: 'all 0.3s' }} />
              {wantCallback && <path d="M5 10l3 3 7-7" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />}
            </svg>
            <span style={{ color: 'white', fontSize: '13px', letterSpacing: '0.06em', fontWeight: 300 }}>Je souhaite être rappelé</span>
          </div>

          {/* Day & Time Selection (conditional) */}
          {wantCallback && (
            <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '28px' }}>
              <p style={{ ...labelStyle, marginBottom: '14px' }}>Choisissez un jour</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
                {days.map(d => (
                  <button key={d.key} onClick={() => { setSelectedDay(selectedDay === d.key ? null : d.key); setSelectedSlot(null) }} style={chipStyle(selectedDay === d.key)}>
                    {d.label}
                  </button>
                ))}
              </div>
              {selectedDay && (
                <>
                  <p style={{ ...labelStyle, marginBottom: '14px' }}>Choisissez l&apos;heure</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                    {timeSlots.map(slot => (
                      <button key={slot} onClick={() => setSelectedSlot(selectedSlot === slot ? null : slot)} style={chipStyle(selectedSlot === slot)}>
                        {slot}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Submit */}
          <div style={{ textAlign: 'center' }}>
            <button
              {...elementProps(config.id, 'formButtonLabel', 'button')}
              disabled={isEditing}
              style={{
                padding: '18px 72px', background: 'white', border: 'none', color: '#0a0a0a',
                fontSize: '12px', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 500,
                cursor: 'pointer', transition: 'all 0.4s ease',
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.9)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              {buttonLabel}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════
// JLSTUDIO SPLIT — Image left + Form right, dark theme
// ═══════════════════════════════════════════════════════
function JlstudioSplitContact({ config, title, subtitle, eyebrow, email, phone, address, buttonLabel, customTextColor, isEditing }: {
  config: SectionConfig; title: string; subtitle?: string; eyebrow?: string; email?: string; phone?: string; address?: string; buttonLabel: string; customTextColor?: string; isEditing?: boolean
}) {
  const accent = config.style.accentColor ?? '#638BFF'
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [wantCallback, setWantCallback] = useState(false)
  const content = (config.content ?? {}) as Partial<ContactContent>

  const projectTypes = ['Site Vitrine', 'E-Commerce', 'Application Web', 'Landing Page', 'Refonte', 'Autre']

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '14px 16px', fontSize: '14px', fontWeight: 400, color: 'white',
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '6px', outline: 'none', transition: 'border-color 0.3s ease',
    fontFamily: 'inherit',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' as const,
    marginBottom: '8px', color: 'rgba(255,255,255,0.5)', fontWeight: 500,
  }

  return (
    <section style={{ fontFamily: 'var(--font-body, inherit)' }} className="bg-[#050507] relative overflow-hidden">
      <div className="grid md:grid-cols-2 min-h-[700px]">
        {/* Left — Image with overlay title */}
        <div className="relative hidden md:block">
          <div
            {...elementProps(config.id, 'heroImage', 'image')}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${content.address ? '' : 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80'})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050507]/30 to-[#050507]/80" />
          <div className="absolute inset-0 flex flex-col justify-end p-12">
            {eyebrow && (
              <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: accent }}>
                {eyebrow}
              </span>
            )}
            <h2
              {...elementProps(config.id, 'title', 'heading')}
              className="text-4xl md:text-5xl font-bold text-white leading-tight mb-3"
              style={customTextColor ? { color: customTextColor } : undefined}
            >
              {title}
            </h2>
            {subtitle && (
              <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-white/50 max-w-md">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right — Form */}
        <div className="relative p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          {/* Mobile-only title */}
          <div className="md:hidden mb-8">
            {eyebrow && (
              <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 block" style={{ color: accent }}>
                {eyebrow}
              </span>
            )}
            <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
            {subtitle && <p className="text-sm text-white/50">{subtitle}</p>}
          </div>

          {/* Project type pills */}
          <div className="mb-6">
            <label style={labelStyle}>Type de projet</label>
            <div className="flex flex-wrap gap-2">
              {projectTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(selectedType === type ? null : type)}
                  disabled={isEditing}
                  className="transition-all duration-200"
                  style={{
                    padding: '8px 16px', fontSize: '13px', fontWeight: 500, borderRadius: '20px', cursor: 'pointer',
                    border: selectedType === type ? `1px solid ${accent}` : '1px solid rgba(255,255,255,0.1)',
                    background: selectedType === type ? `${accent}20` : 'rgba(255,255,255,0.03)',
                    color: selectedType === type ? accent : 'rgba(255,255,255,0.6)',
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Name + Email row */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label style={labelStyle}>Nom</label>
              <input style={inputStyle} placeholder="Jean Dupont" disabled={isEditing} />
            </div>
            <div>
              <label style={labelStyle}>Email</label>
              <input style={inputStyle} placeholder="jean@exemple.fr" type="email" disabled={isEditing} />
            </div>
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label style={labelStyle}>Telephone</label>
            <input style={inputStyle} placeholder="+33 6 00 00 00 00" type="tel" disabled={isEditing} />
          </div>

          {/* Message */}
          <div className="mb-4">
            <label style={labelStyle}>Votre message</label>
            <textarea
              style={{ ...inputStyle, height: '120px', resize: 'vertical' as const }}
              placeholder="Decrivez votre projet..."
              disabled={isEditing}
            />
          </div>

          {/* Callback checkbox */}
          <label className="flex items-center gap-3 mb-6 cursor-pointer select-none">
            <div
              onClick={() => !isEditing && setWantCallback(!wantCallback)}
              className="w-5 h-5 rounded border flex items-center justify-center transition-colors"
              style={{
                borderColor: wantCallback ? accent : 'rgba(255,255,255,0.2)',
                backgroundColor: wantCallback ? accent : 'transparent',
              }}
            >
              {wantCallback && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
            </div>
            <span className="text-sm text-white/50">Je souhaite etre rappele</span>
          </label>

          {/* Submit */}
          <button
            {...elementProps(config.id, 'formButtonLabel', 'button')}
            disabled={isEditing}
            className="w-full py-4 rounded-lg font-semibold text-white text-sm tracking-wide transition-all duration-300 hover:brightness-110"
            style={{ background: accent }}
          >
            {buttonLabel}
          </button>

          {/* Bottom link */}
          <p className="text-center mt-4 text-xs text-white/30">
            Decrivez votre projet en 2 minutes
          </p>
        </div>
      </div>
    </section>
  )
}

export const contactMeta = {
  type: 'contact',
  label: 'Contact',
  icon: '📧',
  variants: [
    'startup-simple', 'startup-with-info',
    'corporate-simple', 'corporate-with-info',
    'luxe-simple', 'luxe-with-info',
    'creative-simple', 'creative-with-info',
    'ecommerce-simple', 'ecommerce-with-info',
    'glass-simple', 'glass-with-info',
    'brixsa-simple', 'brixsa-with-info',
    'zmr-simple', 'zmr-with-info',
    'jlstudio-split',
    'warm-simple', 'warm-with-info',
    'playful-simple', 'playful-with-info',
    'retro-simple', 'retro-with-info',
    'dark-premium-simple', 'dark-premium-with-info',
    'editorial-simple', 'editorial-with-info',
    'organic-simple', 'organic-with-info',
  ],
  defaultVariant: 'startup-with-info',
  defaultContent: {},
}
