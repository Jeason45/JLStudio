'use client'
import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import type { SectionConfig } from '@/types/site'
import type { FormContent } from '@/types/sections'
import type { FormField } from '@/types/crm'
import { getTitleSizeClass, getTextAlignClass } from '../_utils'
import { elementProps } from '@/lib/elementHelpers'

interface FormSectionProps {
  config: SectionConfig
  isEditing?: boolean
}

// ─── Dynamic field renderer ───

function FormFieldInput({
  field,
  inputClass,
  accent,
  isEditing,
}: {
  field: FormField
  inputClass: string
  accent: string
  isEditing?: boolean
}) {
  const ringStyle = { '--tw-ring-color': accent } as React.CSSProperties
  const common = {
    name: field.name,
    required: field.required,
    disabled: isEditing,
    placeholder: field.placeholder,
  }

  switch (field.type) {
    case 'textarea':
      return (
        <textarea
          {...common}
          className={cn(inputClass, 'h-28 resize-none py-3')}
          style={ringStyle}
          minLength={field.validation?.minLength}
          maxLength={field.validation?.maxLength}
        />
      )

    case 'select':
      return (
        <select
          name={field.name}
          required={field.required}
          disabled={isEditing}
          className={inputClass}
          style={ringStyle}
          multiple={field.multiple}
        >
          <option value="">{field.placeholder || 'Choisir...'}</option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      )

    case 'radio':
      return (
        <div className="flex flex-wrap gap-4">
          {field.options?.map((opt) => (
            <label key={opt} className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" name={field.name} value={opt} disabled={isEditing} required={field.required} />
              {opt}
            </label>
          ))}
        </div>
      )

    case 'checkbox':
      return (
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" name={field.name} disabled={isEditing} required={field.required} />
          {field.placeholder || field.label}
        </label>
      )

    case 'toggle':
      return (
        <label className="flex items-center gap-3 cursor-pointer">
          <div className="relative">
            <input type="checkbox" name={field.name} disabled={isEditing} className="sr-only peer" />
            <div className="w-10 h-6 rounded-full bg-zinc-300 peer-checked:bg-indigo-500 transition-colors" style={{ '--peer-checked-bg': accent } as React.CSSProperties} />
            <div className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm peer-checked:translate-x-4 transition-transform" />
          </div>
          <span className="text-sm">{field.placeholder || field.label}</span>
        </label>
      )

    case 'file':
      return (
        <input
          type="file"
          name={field.name}
          required={field.required}
          disabled={isEditing}
          accept={field.accept}
          multiple={field.multiple}
          className={inputClass}
          style={ringStyle}
        />
      )

    case 'range':
      return (
        <div className="flex items-center gap-3">
          <input
            type="range"
            name={field.name}
            disabled={isEditing}
            min={field.validation?.min}
            max={field.validation?.max}
            step={field.step}
            defaultValue={field.defaultValue}
            className="flex-1"
            style={{ accentColor: accent }}
          />
          <span className="text-sm text-zinc-400 min-w-[2rem] text-center">{field.defaultValue ?? field.validation?.min ?? 0}</span>
        </div>
      )

    case 'color':
      return (
        <input
          type="color"
          name={field.name}
          required={field.required}
          disabled={isEditing}
          defaultValue={field.defaultValue || '#6366f1'}
          className="w-10 h-10 rounded border border-zinc-200 cursor-pointer"
        />
      )

    case 'hidden':
      return <input type="hidden" name={field.name} value={field.defaultValue || ''} />

    default:
      // text, email, phone, password, number, url, date, time, search
      return (
        <input
          {...common}
          type={field.type === 'phone' ? 'tel' : field.type}
          className={inputClass}
          style={ringStyle}
          pattern={field.validation?.pattern}
          minLength={field.validation?.minLength}
          maxLength={field.validation?.maxLength}
          min={field.validation?.min}
          max={field.validation?.max}
          step={field.step}
        />
      )
  }
}

// ─── Main FormSection ───

export function FormSection({ config, isEditing }: FormSectionProps) {
  const content = (config.content ?? {}) as Partial<FormContent>
  const { accentColor, titleSize, textAlign, textColor: customTextColor } = config.style
  const variant = config.variant ?? 'startup-default'
  const universe = variant.split('-')[0]
  const layout = variant.replace(universe + '-', '')

  const title = content.title ?? 'Envoyez-nous un message'
  const subtitle = content.subtitle
  const fields = content.fields ?? []
  const submitLabel = content.submitLabel ?? 'Envoyer'
  const successMsg = content.successMessage ?? 'Merci !'
  const errorMsg = content.errorMessage ?? 'Erreur. Veuillez reessayer.'
  const honeypot = content.honeypot ?? false

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isEditing) return
    setStatus('loading')
    try {
      const formData = new FormData(e.currentTarget)
      // Check honeypot
      if (honeypot && formData.get('_hp_field')) {
        setStatus('success')
        return
      }
      const data: Record<string, string> = {}
      formData.forEach((v, k) => {
        if (k !== '_hp_field') data[k] = v.toString()
      })
      const submitUrl = content.submitUrl
      const res = submitUrl
        ? await fetch(submitUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          })
        : await fetch('/api/forms/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ siteId: config.id.split('_')[0], formName: content.formName || 'form', data }),
          })
      if (!res.ok) throw new Error()
      // Redirect if configured, otherwise show success message
      if (content.redirectUrl) {
        window.location.href = content.redirectUrl
        return
      }
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }, [isEditing, honeypot, config.id, content.formName, content.submitUrl, content.redirectUrl])

  // ─── Build fields grid ───
  const renderFields = (inputClass: string, accent: string, labelClass: string) => (
    <div className="grid grid-cols-2 gap-4">
      {fields.map((field) => {
        if (field.type === 'hidden') {
          return <FormFieldInput key={field.id} field={field} inputClass={inputClass} accent={accent} isEditing={isEditing} />
        }
        return (
          <div key={field.id} className={field.width === 'half' ? 'col-span-1' : 'col-span-2'}>
            <label className={cn('block mb-1.5', labelClass)}>
              {field.label}
              {field.required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            <FormFieldInput field={field} inputClass={inputClass} accent={accent} isEditing={isEditing} />
          </div>
        )
      })}
    </div>
  )

  // ─── Success / Error overlay ───
  if (status === 'success') {
    return (
      <section className="py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-lg mx-auto px-6 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <p className="text-lg font-semibold text-zinc-900">{successMsg}</p>
        </div>
      </section>
    )
  }

  if (status === 'error') {
    return (
      <section className="py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-lg mx-auto px-6 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </div>
          <p className="text-lg font-semibold text-zinc-900">{errorMsg}</p>
          <button onClick={() => setStatus('idle')} className="text-sm text-indigo-600 underline">Reessayer</button>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════════════════
  // STARTUP
  // ═══════════════════════════════════════════════════════

  if (universe === 'startup') {
    const accent = accentColor ?? '#6366f1'
    const inputClass = 'w-full h-11 rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-default'
    const labelClass = 'text-sm font-medium text-zinc-700'

    const formEl = (
      <form onSubmit={handleSubmit} className="rounded-2xl bg-white border border-zinc-100 shadow-sm p-6 space-y-4">
        {renderFields(inputClass, accent, labelClass)}
        {honeypot && <input type="text" name="_hp_field" className="hidden" tabIndex={-1} autoComplete="off" />}
        <button
          type="submit"
          disabled={isEditing || status === 'loading'}
          className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.01] disabled:cursor-default disabled:opacity-70"
          style={{ background: `linear-gradient(135deg, ${accent}, ${accent}dd)`, boxShadow: `0 4px 14px ${accent}30` }}
        >
          {status === 'loading' ? 'Envoi...' : submitLabel}
        </button>
      </form>
    )

    if (layout === 'split') {
      return (
        <section className="bg-zinc-50 py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className={cn("space-y-4", textAlign && getTextAlignClass(textAlign))}>
                <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-bold text-zinc-900 leading-tight", titleSize && getTitleSizeClass(titleSize))}
                    style={customTextColor ? { color: customTextColor } : undefined}>{title}</h2>
                {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-zinc-500 leading-relaxed">{subtitle}</p>}
              </div>
              {formEl}
            </div>
          </div>
        </section>
      )
    }

    // default
    return (
      <section className="bg-zinc-50 py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-lg mx-auto px-6">
          <div className={cn("text-center mb-8 space-y-3", textAlign && getTextAlignClass(textAlign))}>
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-bold text-zinc-900 leading-tight", titleSize && getTitleSizeClass(titleSize))}
                style={customTextColor ? { color: customTextColor } : undefined}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-zinc-500">{subtitle}</p>}
          </div>
          {formEl}
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════════════════
  // CORPORATE
  // ═══════════════════════════════════════════════════════

  if (universe === 'corporate') {
    const accent = accentColor ?? '#3b82f6'
    const inputClass = 'w-full h-11 rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-slate-900 disabled:cursor-default'
    const labelClass = 'text-sm font-medium text-white/70'

    const formEl = (
      <form onSubmit={handleSubmit} className="rounded-xl bg-white/5 border border-white/10 p-6 space-y-4 backdrop-blur-sm">
        {renderFields(inputClass, accent, labelClass)}
        {honeypot && <input type="text" name="_hp_field" className="hidden" tabIndex={-1} autoComplete="off" />}
        <button
          type="submit"
          disabled={isEditing || status === 'loading'}
          className="w-full py-3 rounded-lg text-sm font-semibold text-white transition-colors hover:brightness-110 disabled:cursor-default disabled:opacity-70"
          style={{ backgroundColor: accent }}
        >
          {status === 'loading' ? 'Envoi...' : submitLabel}
        </button>
      </form>
    )

    const noise = (
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'256\' height=\'256\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")' }} />
    )

    if (layout === 'split') {
      return (
        <section className="relative bg-slate-900 py-20 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          {noise}
          <div className="relative max-w-5xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className={cn("space-y-4", textAlign && getTextAlignClass(textAlign))}>
                <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-bold text-white leading-tight", titleSize && getTitleSizeClass(titleSize))}
                    style={customTextColor ? { color: customTextColor } : undefined}>{title}</h2>
                {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-white/60 leading-relaxed">{subtitle}</p>}
              </div>
              {formEl}
            </div>
          </div>
        </section>
      )
    }

    return (
      <section className="relative bg-slate-900 py-20 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        {noise}
        <div className="relative max-w-lg mx-auto px-6">
          <div className={cn("text-center mb-8 space-y-3", textAlign && getTextAlignClass(textAlign))}>
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-bold text-white leading-tight", titleSize && getTitleSizeClass(titleSize))}
                style={customTextColor ? { color: customTextColor } : undefined}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-white/60">{subtitle}</p>}
          </div>
          {formEl}
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════════════════
  // LUXE
  // ═══════════════════════════════════════════════════════

  if (universe === 'luxe') {
    const accent = accentColor ?? '#b8860b'
    const inputClass = 'w-full h-11 border-b bg-transparent px-0 text-sm font-light tracking-wide text-zinc-900 placeholder:text-zinc-300 focus:outline-none disabled:cursor-default'
    const labelClass = 'text-[11px] tracking-[0.15em] uppercase text-zinc-400 font-light'

    const formEl = (
      <form onSubmit={handleSubmit} className="p-8 space-y-6" style={{ borderTop: `1px solid ${accent}30` }}>
        {renderFields(inputClass, accent, labelClass)}
        {honeypot && <input type="text" name="_hp_field" className="hidden" tabIndex={-1} autoComplete="off" />}
        <button
          type="submit"
          disabled={isEditing || status === 'loading'}
          className="w-full py-3 text-sm font-light tracking-[0.15em] uppercase text-white transition-colors hover:brightness-110 disabled:cursor-default disabled:opacity-70"
          style={{ backgroundColor: accent }}
        >
          {status === 'loading' ? 'Envoi...' : submitLabel}
        </button>
      </form>
    )

    if (layout === 'split') {
      return (
        <section className="bg-white py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className={cn("space-y-4", textAlign && getTextAlignClass(textAlign))}>
                <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-light tracking-wide text-zinc-900 leading-tight", titleSize && getTitleSizeClass(titleSize))}
                    style={customTextColor ? { color: customTextColor } : undefined}>{title}</h2>
                {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base font-light text-zinc-400 tracking-wide leading-relaxed">{subtitle}</p>}
                <div className="w-12 h-px" style={{ backgroundColor: accent }} />
              </div>
              {formEl}
            </div>
          </div>
        </section>
      )
    }

    return (
      <section className="bg-white py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-lg mx-auto px-6">
          <div className={cn("text-center mb-10 space-y-4", textAlign && getTextAlignClass(textAlign))}>
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-light tracking-wide text-zinc-900 leading-tight", titleSize && getTitleSizeClass(titleSize))}
                style={customTextColor ? { color: customTextColor } : undefined}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base font-light text-zinc-400 tracking-wide">{subtitle}</p>}
            <div className="w-12 h-px mx-auto" style={{ backgroundColor: accent }} />
          </div>
          {formEl}
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════════════════
  // CREATIVE
  // ═══════════════════════════════════════════════════════

  if (universe === 'creative') {
    const accent = accentColor ?? '#18181b'
    const inputClass = 'w-full h-11 border-2 border-zinc-900 bg-white px-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 disabled:cursor-default'
    const labelClass = 'text-xs font-bold uppercase text-zinc-900'

    const formEl = (
      <form onSubmit={handleSubmit} className="border-2 border-zinc-900 bg-white p-6 shadow-[4px_4px_0_0_#18181b] space-y-4">
        {renderFields(inputClass, accent, labelClass)}
        {honeypot && <input type="text" name="_hp_field" className="hidden" tabIndex={-1} autoComplete="off" />}
        <button
          type="submit"
          disabled={isEditing || status === 'loading'}
          className="w-full py-3 border-2 border-zinc-900 bg-zinc-900 text-white text-sm font-bold uppercase tracking-wide shadow-[3px_3px_0_0_#b8860b] hover:shadow-[1px_1px_0_0_#b8860b] hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:cursor-default disabled:opacity-70"
        >
          {status === 'loading' ? 'Envoi...' : submitLabel}
        </button>
      </form>
    )

    if (layout === 'split') {
      return (
        <section className="bg-[#f5f0e8] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className={cn("space-y-4", textAlign && getTextAlignClass(textAlign))}>
                <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-black text-zinc-900 leading-tight", titleSize && getTitleSizeClass(titleSize))}
                    style={customTextColor ? { color: customTextColor } : undefined}>{title}</h2>
                {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-zinc-600 leading-relaxed">{subtitle}</p>}
                <div className="w-16 h-1 bg-zinc-900" />
              </div>
              {formEl}
            </div>
          </div>
        </section>
      )
    }

    return (
      <section className="bg-[#f5f0e8] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-lg mx-auto px-6">
          <div className={cn("text-center mb-8 space-y-3", textAlign && getTextAlignClass(textAlign))}>
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-black text-zinc-900 leading-tight", titleSize && getTitleSizeClass(titleSize))}
                style={customTextColor ? { color: customTextColor } : undefined}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-zinc-600">{subtitle}</p>}
          </div>
          {formEl}
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════════════════
  // ECOMMERCE
  // ═══════════════════════════════════════════════════════

  if (universe === 'ecommerce') {
    const accent = accentColor ?? '#059669'
    const inputClass = 'w-full h-11 rounded-lg border border-zinc-200 bg-white px-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-default'
    const labelClass = 'text-sm font-medium text-zinc-700'

    const formEl = (
      <form onSubmit={handleSubmit} className="rounded-xl bg-white border border-zinc-200 p-6 shadow-sm space-y-4">
        {renderFields(inputClass, accent, labelClass)}
        {honeypot && <input type="text" name="_hp_field" className="hidden" tabIndex={-1} autoComplete="off" />}
        <button
          type="submit"
          disabled={isEditing || status === 'loading'}
          className="w-full py-3 rounded-lg text-sm font-semibold text-white transition-colors hover:brightness-110 disabled:cursor-default disabled:opacity-70"
          style={{ backgroundColor: accent }}
        >
          {status === 'loading' ? 'Envoi...' : submitLabel}
        </button>
        <div className="flex items-center justify-center gap-4 pt-2 text-[11px] text-zinc-400">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
            Securise
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            Confidentiel
          </span>
        </div>
      </form>
    )

    if (layout === 'split') {
      return (
        <section className="bg-white py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className={cn("space-y-4", textAlign && getTextAlignClass(textAlign))}>
                <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-bold text-zinc-900 leading-tight", titleSize && getTitleSizeClass(titleSize))}
                    style={customTextColor ? { color: customTextColor } : undefined}>{title}</h2>
                {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-zinc-500 leading-relaxed">{subtitle}</p>}
              </div>
              {formEl}
            </div>
          </div>
        </section>
      )
    }

    return (
      <section className="bg-white py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-lg mx-auto px-6">
          <div className={cn("text-center mb-8 space-y-3", textAlign && getTextAlignClass(textAlign))}>
            <h2 {...elementProps(config.id, 'title', 'heading')} className={cn("text-3xl md:text-4xl font-bold text-zinc-900 leading-tight", titleSize && getTitleSizeClass(titleSize))}
                style={customTextColor ? { color: customTextColor } : undefined}>{title}</h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-zinc-500">{subtitle}</p>}
          </div>
          {formEl}
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════════════════
  // GLASS (default fallback)
  // ═══════════════════════════════════════════════════════

  {
    const accent = accentColor ?? '#8b5cf6'
    const inputClass = 'w-full h-11 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm px-4 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-zinc-950 disabled:cursor-default'
    const labelClass = 'text-sm font-medium text-white/60'

    const formEl = (
      <form onSubmit={handleSubmit} className="relative rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 space-y-4 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: accent }} />
        <div className="relative">
          {renderFields(inputClass, accent, labelClass)}
          {honeypot && <input type="text" name="_hp_field" className="hidden" tabIndex={-1} autoComplete="off" />}
          <button
            type="submit"
            disabled={isEditing || status === 'loading'}
            className="w-full py-3 rounded-lg text-sm font-semibold text-white transition-all hover:brightness-110 disabled:cursor-default disabled:opacity-70 mt-4"
            style={{
              background: `linear-gradient(135deg, ${accent}, ${accent}bb)`,
              boxShadow: `0 0 20px ${accent}30, inset 0 1px 0 rgba(255,255,255,0.1)`,
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {status === 'loading' ? 'Envoi...' : submitLabel}
          </button>
        </div>
      </form>
    )

    const noise = (
      <>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'256\' height=\'256\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")' }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: accent }} />
      </>
    )

    if (layout === 'split') {
      return (
        <section className="relative bg-zinc-950 py-20 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          {noise}
          <div className="relative max-w-5xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className={cn("space-y-4", textAlign && getTextAlignClass(textAlign))}>
                <h2
                  {...elementProps(config.id, 'title', 'heading')}
                  className={cn("text-3xl md:text-4xl font-bold leading-tight bg-clip-text text-transparent", titleSize && getTitleSizeClass(titleSize))}
                  style={customTextColor ? { color: customTextColor } : { backgroundImage: `linear-gradient(135deg, #fff 0%, ${accent} 100%)` }}
                >
                  {title}
                </h2>
                {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-white/50 leading-relaxed">{subtitle}</p>}
              </div>
              {formEl}
            </div>
          </div>
        </section>
      )
    }

    return (
      <section className="relative bg-zinc-950 py-20 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        {noise}
        <div className="relative max-w-lg mx-auto px-6">
          <div className={cn("text-center mb-8 space-y-3", textAlign && getTextAlignClass(textAlign))}>
            <h2
              {...elementProps(config.id, 'title', 'heading')}
              className={cn("text-3xl md:text-4xl font-bold leading-tight bg-clip-text text-transparent", titleSize && getTitleSizeClass(titleSize))}
              style={customTextColor ? { color: customTextColor } : { backgroundImage: `linear-gradient(135deg, #fff 0%, ${accent} 100%)` }}
            >
              {title}
            </h2>
            {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-lg text-white/50">{subtitle}</p>}
          </div>
          {formEl}
        </div>
      </section>
    )
  }
}

export const formMeta = {
  type: 'form',
  label: 'Formulaire',
  icon: '📝',
  variants: [
    'startup-default', 'startup-split',
    'corporate-default', 'corporate-split',
    'luxe-default', 'luxe-split',
    'creative-default', 'creative-split',
    'ecommerce-default', 'ecommerce-split',
    'glass-default', 'glass-split',
  ],
  defaultVariant: 'startup-default',
  defaultContent: {},
}
