import { cn } from '@/lib/utils'
import { sectionClasses, getTextColorClass, getMutedTextClass, getEyebrowClass, getTitleSizeClass, getTextAlignClass } from '../_utils'
import type { SectionConfig } from '@/types/site'
import type { ComparisonContent, ComparisonFeature } from '@/types/sections'
import { Check, X, ShieldCheck, Crown, Sparkles } from 'lucide-react'
import { elementProps } from '@/lib/elementHelpers'

export function ComparisonSection({ config }: { config: SectionConfig }) {
  const content = (config.content ?? {}) as Partial<ComparisonContent>
  const variant = config.variant ?? 'startup-table'
  const { accentColor, textColor: customTextColor } = config.style
  const cols = content.columns ?? []
  const features = content.features ?? []
  const universe = variant.split('-')[0]
  const title = content.title

  // Shared: render a cell value (boolean or string)
  const renderValue = (val: boolean | string, opts: { checkClass?: string; xClass?: string; textClass?: string; accentIdx?: number; vi?: number }) => {
    if (typeof val === 'boolean') {
      return val
        ? <Check className={cn('w-4 h-4', opts.checkClass ?? 'text-green-500')} />
        : <X className={cn('w-4 h-4', opts.xClass ?? 'text-zinc-300')} />
    }
    return <span className={cn('text-sm font-medium', opts.textClass ?? 'text-zinc-900')}>{val}</span>
  }

  // ═══════════════════════════════════════════
  // STARTUP — SaaS / Moderne
  // ═══════════════════════════════════════════

  if (universe === 'startup') {
    const accent = accentColor ?? '#6366f1'
    const layout = variant.replace('startup-', '')

    const header = (
      <div className="text-center mb-12 space-y-4">
        {title && (
          <h2 {...elementProps(config.id, 'title', 'heading')} className="text-3xl md:text-4xl font-bold text-zinc-900 leading-tight" style={customTextColor ? { color: customTextColor } : undefined}>
            {title}
          </h2>
        )}
      </div>
    )

    // Table
    if (layout === 'table') {
      return (
        <section className="bg-zinc-50 py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-4xl mx-auto px-6">
            {header}
            <div className="rounded-2xl border border-zinc-200 overflow-hidden bg-white shadow-sm">
              {/* Header row */}
              <div className="grid bg-zinc-50 border-b border-zinc-200" style={{ gridTemplateColumns: `1.5fr ${cols.map(() => '1fr').join(' ')}` }}>
                <div className="p-4" />
                {cols.map((col, i) => (
                  <div {...elementProps(config.id, `columns.${i}`, 'heading')} key={i} className={cn('p-4 text-center font-semibold text-sm', i === 0 ? 'text-white rounded-t-lg' : 'text-zinc-600')}
                    style={i === 0 ? { backgroundColor: accent } : undefined}
                  >
                    {col}
                  </div>
                ))}
              </div>
              {/* Feature rows */}
              {features.map((feat, fi) => (
                <div
                  key={feat.id}
                  className={cn('grid border-b last:border-0 border-zinc-100', fi % 2 === 1 ? 'bg-zinc-50/50' : '')}
                  style={{ gridTemplateColumns: `1.5fr ${cols.map(() => '1fr').join(' ')}` }}
                >
                  <div {...elementProps(config.id, `features.${fi}.name`, 'text')} className="p-4 text-sm text-zinc-700 font-medium">{feat.name}</div>
                  {feat.values.map((val, vi) => (
                    <div {...elementProps(config.id, `features.${fi}.values.${vi}`, 'text')} key={vi} className="p-4 flex items-center justify-center">
                      {renderValue(val, {
                        checkClass: vi === 0 ? '' : 'text-green-500',
                        xClass: 'text-zinc-300',
                        textClass: vi === 0 ? 'font-semibold' : 'text-zinc-600',
                      })}
                      {typeof val === 'boolean' && val && vi === 0 && (
                        <span className="sr-only">Oui</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // Cards — each column as a card
    return (
      <section className="bg-zinc-50 py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-5xl mx-auto px-6">
          {header}
          <div className={cn('grid gap-6', cols.length <= 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3')}>
            {cols.map((col, ci) => (
              <div
                key={ci}
                className={cn(
                  'rounded-2xl border p-6 space-y-4',
                  ci === 0
                    ? 'border-2 bg-white shadow-lg'
                    : 'border-zinc-200 bg-white shadow-sm',
                )}
                style={ci === 0 ? { borderColor: accent } : undefined}
              >
                <div className="flex items-center gap-2">
                  <h3 {...elementProps(config.id, `columns.${ci}`, 'heading')} className={cn('font-bold text-lg', ci === 0 ? '' : 'text-zinc-900')} style={ci === 0 ? { color: accent } : undefined}>
                    {col}
                  </h3>
                  {ci === 0 && <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: accent }}>Recommande</span>}
                </div>
                <div className="space-y-3">
                  {features.map((feat, fi) => {
                    const val = feat.values[ci]
                    return (
                      <div key={feat.id} className="flex items-center gap-3">
                        {typeof val === 'boolean' ? (
                          val
                            ? <Check className="w-4 h-4 shrink-0" style={{ color: accent }} />
                            : <X className="w-4 h-4 text-zinc-300 shrink-0" />
                        ) : (
                          <Check className="w-4 h-4 shrink-0" style={{ color: accent }} />
                        )}
                        <span {...elementProps(config.id, `features.${fi}.name`, 'text')} className={cn('text-sm', typeof val === 'boolean' && !val ? 'text-zinc-400 line-through' : 'text-zinc-700')}>
                          {feat.name}
                          {typeof val === 'string' && <span className="font-semibold ml-1">{val}</span>}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // CORPORATE — Navy / Professionnel
  // ═══════════════════════════════════════════

  if (universe === 'corporate') {
    const accent = accentColor ?? '#3b82f6'
    const layout = variant.replace('corporate-', '')

    const header = (
      <div className="mb-12 space-y-4">
        {title && (
          <h2 {...elementProps(config.id, 'title', 'heading')} className="text-3xl md:text-4xl font-bold text-white leading-tight" style={customTextColor ? { color: customTextColor } : undefined}>
            {title}
          </h2>
        )}
      </div>
    )

    // Table
    if (layout === 'table') {
      return (
        <section className="bg-[#0f172a] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-4xl mx-auto px-6">
            {header}
            <div className="rounded-xl border border-slate-700/50 overflow-hidden">
              {/* Header */}
              <div className="grid bg-slate-800/50 border-b border-slate-700/50" style={{ gridTemplateColumns: `1.5fr ${cols.map(() => '1fr').join(' ')}` }}>
                <div className="p-4" />
                {cols.map((col, i) => (
                  <div {...elementProps(config.id, `columns.${i}`, 'heading')} key={i} className={cn('p-4 text-center font-semibold text-sm', i === 0 ? 'text-blue-300' : 'text-slate-400')}>
                    {col}
                  </div>
                ))}
              </div>
              {/* Rows */}
              {features.map((feat, fi) => (
                <div
                  key={feat.id}
                  className={cn('grid border-b last:border-0 border-slate-700/30', fi % 2 === 1 ? 'bg-slate-800/20' : '')}
                  style={{ gridTemplateColumns: `1.5fr ${cols.map(() => '1fr').join(' ')}` }}
                >
                  <div {...elementProps(config.id, `features.${fi}.name`, 'text')} className="p-4 text-sm text-white font-medium">{feat.name}</div>
                  {feat.values.map((val, vi) => (
                    <div {...elementProps(config.id, `features.${fi}.values.${vi}`, 'text')} key={vi} className="p-4 flex items-center justify-center">
                      {typeof val === 'boolean'
                        ? val ? <Check className="w-4 h-4" style={{ color: accent }} /> : <X className="w-4 h-4 text-slate-600" />
                        : <span className={cn('text-sm font-medium', vi === 0 ? 'text-blue-300' : 'text-slate-400')}>{val}</span>
                      }
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // Cards
    return (
      <section className="bg-[#0f172a] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-5xl mx-auto px-6">
          {header}
          <div className={cn('grid gap-6', cols.length <= 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3')}>
            {cols.map((col, ci) => (
              <div
                key={ci}
                className={cn(
                  'rounded-xl border p-6 space-y-4',
                  ci === 0
                    ? 'bg-slate-800/80 border-blue-500/40'
                    : 'bg-slate-800/30 border-slate-700/50',
                )}
              >
                <div className="flex items-center gap-2">
                  <h3 {...elementProps(config.id, `columns.${ci}`, 'heading')} className={cn('font-bold text-lg', ci === 0 ? 'text-blue-300' : 'text-white')}>
                    {col}
                  </h3>
                  {ci === 0 && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded border text-blue-300 border-blue-500/30 bg-blue-500/10">Leader</span>
                  )}
                </div>
                <div className="space-y-3">
                  {features.map((feat, fi) => {
                    const val = feat.values[ci]
                    return (
                      <div key={feat.id} className="flex items-center gap-3">
                        {typeof val === 'boolean' ? (
                          val
                            ? <Check className="w-4 h-4 shrink-0" style={{ color: accent }} />
                            : <X className="w-4 h-4 text-slate-600 shrink-0" />
                        ) : (
                          <Check className="w-4 h-4 shrink-0" style={{ color: accent }} />
                        )}
                        <span {...elementProps(config.id, `features.${fi}.name`, 'text')} className={cn('text-sm', typeof val === 'boolean' && !val ? 'text-slate-600 line-through' : 'text-slate-300')}>
                          {feat.name}
                          {typeof val === 'string' && <span className="font-semibold text-white ml-1">{val}</span>}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // LUXE — Or / Elegant
  // ═══════════════════════════════════════════

  if (universe === 'luxe') {
    const gold = accentColor ?? '#b8860b'
    const layout = variant.replace('luxe-', '')

    const header = (
      <div className="text-center mb-16 space-y-5">
        {title && (
          <h2 {...elementProps(config.id, 'title', 'heading')} className="text-3xl md:text-4xl font-light text-zinc-900 leading-tight tracking-tight" style={customTextColor ? { color: customTextColor } : undefined}>
            {title}
          </h2>
        )}
        <div className="w-12 h-px mx-auto" style={{ background: gold }} />
      </div>
    )

    // Table
    if (layout === 'table') {
      return (
        <section className="bg-white py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-4xl mx-auto px-6">
            {header}
            <div className="border border-zinc-200 overflow-hidden">
              {/* Header */}
              <div className="grid border-b border-zinc-200" style={{ gridTemplateColumns: `1.5fr ${cols.map(() => '1fr').join(' ')}` }}>
                <div className="p-5" />
                {cols.map((col, i) => (
                  <div {...elementProps(config.id, `columns.${i}`, 'heading')} key={i} className="p-5 text-center">
                    <span className={cn('text-xs tracking-[0.2em] uppercase font-light', i === 0 ? '' : 'text-zinc-400')} style={i === 0 ? { color: gold } : undefined}>
                      {col}
                    </span>
                  </div>
                ))}
              </div>
              {/* Rows */}
              {features.map((feat, fi) => (
                <div
                  key={feat.id}
                  className={cn('grid border-b last:border-0 border-zinc-100', fi % 2 === 1 ? 'bg-zinc-50/50' : '')}
                  style={{ gridTemplateColumns: `1.5fr ${cols.map(() => '1fr').join(' ')}` }}
                >
                  <div {...elementProps(config.id, `features.${fi}.name`, 'text')} className="p-5 text-sm text-zinc-700 font-light tracking-wide">{feat.name}</div>
                  {feat.values.map((val, vi) => (
                    <div {...elementProps(config.id, `features.${fi}.values.${vi}`, 'text')} key={vi} className="p-5 flex items-center justify-center">
                      {typeof val === 'boolean'
                        ? val ? <Check className="w-4 h-4" style={{ color: gold }} /> : <span className="w-4 h-px bg-zinc-200" />
                        : <span className={cn('text-sm font-light tracking-wide', vi === 0 ? '' : 'text-zinc-400')} style={vi === 0 ? { color: gold } : undefined}>{val}</span>
                      }
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // Cards
    return (
      <section className="bg-zinc-50 py-24" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-5xl mx-auto px-6">
          {header}
          <div className={cn('grid gap-8', cols.length <= 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3')}>
            {cols.map((col, ci) => (
              <div
                key={ci}
                className={cn(
                  'border p-8 space-y-6',
                  ci === 0
                    ? 'bg-white border-zinc-200 shadow-sm'
                    : 'bg-white border-zinc-100',
                )}
              >
                <div className="space-y-3">
                  {ci === 0 && <Crown className="w-5 h-5" style={{ color: gold }} />}
                  <h3 {...elementProps(config.id, `columns.${ci}`, 'heading')} className={cn('text-sm tracking-[0.2em] uppercase font-light', ci === 0 ? '' : 'text-zinc-400')} style={ci === 0 ? { color: gold } : undefined}>
                    {col}
                  </h3>
                  <div className="w-8 h-px" style={{ background: ci === 0 ? gold : '#e4e4e7' }} />
                </div>
                <div className="space-y-4">
                  {features.map((feat, fi) => {
                    const val = feat.values[ci]
                    return (
                      <div key={feat.id} className="flex items-center gap-3">
                        {typeof val === 'boolean' ? (
                          val
                            ? <Check className="w-4 h-4 shrink-0" style={{ color: gold }} />
                            : <span className="w-4 h-px bg-zinc-200 shrink-0" />
                        ) : (
                          <Check className="w-4 h-4 shrink-0" style={{ color: gold }} />
                        )}
                        <span {...elementProps(config.id, `features.${fi}.name`, 'text')} className={cn('text-sm font-light tracking-wide', typeof val === 'boolean' && !val ? 'text-zinc-300' : 'text-zinc-600')}>
                          {feat.name}
                          {typeof val === 'string' && <span className="font-medium ml-1" style={{ color: gold }}>{val}</span>}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // CREATIVE — Neobrutalist
  // ═══════════════════════════════════════════

  if (universe === 'creative') {
    const layout = variant.replace('creative-', '')

    const header = (
      <div className="mb-12 space-y-4">
        {title && (
          <h2 {...elementProps(config.id, 'title', 'heading')} className="text-3xl md:text-5xl font-black text-zinc-900 leading-[0.95]" style={customTextColor ? { color: customTextColor } : undefined}>
            {title}
          </h2>
        )}
      </div>
    )

    // Table
    if (layout === 'table') {
      return (
        <section className="bg-[#fdf6e3] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-4xl mx-auto px-6">
            {header}
            <div className="border-2 border-zinc-900 shadow-[4px_4px_0_0_#18181b] overflow-hidden bg-white">
              {/* Header */}
              <div className="grid border-b-2 border-zinc-900" style={{ gridTemplateColumns: `1.5fr ${cols.map(() => '1fr').join(' ')}` }}>
                <div className="p-4" />
                {cols.map((col, i) => (
                  <div {...elementProps(config.id, `columns.${i}`, 'heading')} key={i} className={cn('p-4 text-center font-black uppercase tracking-wider text-xs', i === 0 ? 'bg-yellow-300 text-zinc-900' : 'text-zinc-600')}>
                    {col}
                  </div>
                ))}
              </div>
              {/* Rows */}
              {features.map((feat, fi) => (
                <div
                  key={feat.id}
                  className={cn('grid border-b-2 last:border-0 border-zinc-900', fi % 2 === 1 ? 'bg-[#fdf6e3]/50' : '')}
                  style={{ gridTemplateColumns: `1.5fr ${cols.map(() => '1fr').join(' ')}` }}
                >
                  <div {...elementProps(config.id, `features.${fi}.name`, 'text')} className="p-4 text-sm font-bold text-zinc-900 uppercase tracking-wide">{feat.name}</div>
                  {feat.values.map((val, vi) => (
                    <div {...elementProps(config.id, `features.${fi}.values.${vi}`, 'text')} key={vi} className="p-4 flex items-center justify-center">
                      {typeof val === 'boolean'
                        ? val
                          ? <span className="w-5 h-5 bg-zinc-900 text-white flex items-center justify-center text-xs font-black">&#10003;</span>
                          : <span className="w-5 h-5 border-2 border-zinc-300" />
                        : <span className={cn('text-sm font-black uppercase', vi === 0 ? 'text-zinc-900' : 'text-zinc-500')}>{val}</span>
                      }
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // Cards
    return (
      <section className="bg-[#fdf6e3] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-5xl mx-auto px-6">
          {header}
          <div className={cn('grid gap-6', cols.length <= 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3')}>
            {cols.map((col, ci) => (
              <div
                key={ci}
                className={cn(
                  'border-2 border-zinc-900 p-6 space-y-4 bg-white',
                  ci === 0
                    ? 'shadow-[6px_6px_0_0_#18181b]'
                    : 'shadow-[4px_4px_0_0_#18181b]',
                )}
              >
                <div className="flex items-center gap-2">
                  <h3 {...elementProps(config.id, `columns.${ci}`, 'heading')} className="font-black text-lg uppercase tracking-wider text-zinc-900">{col}</h3>
                  {ci === 0 && <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 bg-yellow-300 border border-zinc-900">Top</span>}
                </div>
                <div className="border-t-2 border-zinc-900 pt-4 space-y-3">
                  {features.map((feat, fi) => {
                    const val = feat.values[ci]
                    return (
                      <div key={feat.id} className="flex items-center gap-3">
                        {typeof val === 'boolean' ? (
                          val
                            ? <span className="w-5 h-5 bg-zinc-900 text-white flex items-center justify-center text-xs font-black shrink-0">&#10003;</span>
                            : <span className="w-5 h-5 border-2 border-zinc-300 shrink-0" />
                        ) : (
                          <span className="w-5 h-5 bg-zinc-900 text-white flex items-center justify-center text-xs font-black shrink-0">&#10003;</span>
                        )}
                        <span {...elementProps(config.id, `features.${fi}.name`, 'text')} className={cn('text-sm font-bold', typeof val === 'boolean' && !val ? 'text-zinc-400 line-through' : 'text-zinc-900')}>
                          {feat.name}
                          {typeof val === 'string' && <span className="ml-1 text-zinc-600">({val})</span>}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // ECOMMERCE — Vert / Confiance
  // ═══════════════════════════════════════════

  if (universe === 'ecommerce') {
    const accent = accentColor ?? '#059669'
    const layout = variant.replace('ecommerce-', '')

    const header = (
      <div className="text-center mb-12 space-y-3">
        {title && (
          <h2 {...elementProps(config.id, 'title', 'heading')} className="text-3xl md:text-4xl font-bold text-zinc-900 leading-tight" style={customTextColor ? { color: customTextColor } : undefined}>
            {title}
          </h2>
        )}
      </div>
    )

    // Table
    if (layout === 'table') {
      return (
        <section className="bg-white py-16" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-4xl mx-auto px-6">
            {header}
            <div className="rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
              {/* Header */}
              <div className="grid border-b border-zinc-200 bg-zinc-50" style={{ gridTemplateColumns: `1.5fr ${cols.map(() => '1fr').join(' ')}` }}>
                <div className="p-4" />
                {cols.map((col, i) => (
                  <div {...elementProps(config.id, `columns.${i}`, 'heading')} key={i} className="p-4 text-center">
                    <span className={cn('text-sm font-bold', i === 0 ? 'text-emerald-700' : 'text-zinc-600')}>
                      {i === 0 && <ShieldCheck className="w-4 h-4 inline mr-1" style={{ color: accent }} />}
                      {col}
                    </span>
                  </div>
                ))}
              </div>
              {/* Rows */}
              {features.map((feat, fi) => (
                <div
                  key={feat.id}
                  className={cn('grid border-b last:border-0 border-zinc-100', fi % 2 === 1 ? 'bg-emerald-50/30' : '')}
                  style={{ gridTemplateColumns: `1.5fr ${cols.map(() => '1fr').join(' ')}` }}
                >
                  <div {...elementProps(config.id, `features.${fi}.name`, 'text')} className="p-4 text-sm text-zinc-700 font-medium">{feat.name}</div>
                  {feat.values.map((val, vi) => (
                    <div {...elementProps(config.id, `features.${fi}.values.${vi}`, 'text')} key={vi} className="p-4 flex items-center justify-center">
                      {typeof val === 'boolean'
                        ? val
                          ? <span className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: `${accent}15` }}><Check className="w-3.5 h-3.5" style={{ color: accent }} /></span>
                          : <X className="w-4 h-4 text-zinc-300" />
                        : <span className={cn('text-sm font-semibold', vi === 0 ? '' : 'text-zinc-500')} style={vi === 0 ? { color: accent } : undefined}>{val}</span>
                      }
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // Cards
    return (
      <section className="bg-zinc-50 py-16" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-5xl mx-auto px-6">
          {header}
          <div className={cn('grid gap-6', cols.length <= 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3')}>
            {cols.map((col, ci) => (
              <div
                key={ci}
                className={cn(
                  'rounded-2xl border p-6 space-y-4 bg-white',
                  ci === 0
                    ? 'border-2 shadow-md'
                    : 'border-zinc-200 shadow-sm',
                )}
                style={ci === 0 ? { borderColor: accent } : undefined}
              >
                <div className="flex items-center gap-2">
                  {ci === 0 && <ShieldCheck className="w-5 h-5" style={{ color: accent }} />}
                  <h3 {...elementProps(config.id, `columns.${ci}`, 'heading')} className={cn('font-bold text-lg', ci === 0 ? '' : 'text-zinc-900')} style={ci === 0 ? { color: accent } : undefined}>
                    {col}
                  </h3>
                  {ci === 0 && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: accent }}>Verifie</span>}
                </div>
                <div className="space-y-3">
                  {features.map((feat, fi) => {
                    const val = feat.values[ci]
                    return (
                      <div key={feat.id} className="flex items-center gap-3">
                        {typeof val === 'boolean' ? (
                          val
                            ? <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${accent}15` }}><Check className="w-3 h-3" style={{ color: accent }} /></span>
                            : <X className="w-4 h-4 text-zinc-300 shrink-0" />
                        ) : (
                          <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${accent}15` }}><Check className="w-3 h-3" style={{ color: accent }} /></span>
                        )}
                        <span {...elementProps(config.id, `features.${fi}.name`, 'text')} className={cn('text-sm', typeof val === 'boolean' && !val ? 'text-zinc-400 line-through' : 'text-zinc-700')}>
                          {feat.name}
                          {typeof val === 'string' && <span className="font-bold ml-1" style={{ color: accent }}>{val}</span>}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════
  // GLASS — Glassmorphism / Dark
  // ═══════════════════════════════════════════

  if (universe === 'glass') {
    const accent = accentColor ?? '#818cf8'
    const layout = variant.replace('glass-', '')

    const header = (
      <div className="text-center mb-14 space-y-4">
        {title && (
          <h2 {...elementProps(config.id, 'title', 'heading')} className="text-3xl md:text-4xl font-bold text-white leading-tight" style={customTextColor ? { color: customTextColor } : undefined}>
            {title}
          </h2>
        )}
      </div>
    )

    // Table
    if (layout === 'table') {
      return (
        <section className="bg-[#0a0a0f] py-20 relative overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="absolute inset-0 dot-grid" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ background: `radial-gradient(ellipse, ${accent}30, transparent 70%)` }}
          />
          <div className="relative max-w-4xl mx-auto px-6">
            {header}
            <div className="rounded-2xl border border-white/[0.08] overflow-hidden bg-white/[0.03] backdrop-blur-xl">
              {/* Header */}
              <div className="grid border-b border-white/[0.08]" style={{ gridTemplateColumns: `1.5fr ${cols.map(() => '1fr').join(' ')}` }}>
                <div className="p-4" />
                {cols.map((col, i) => (
                  <div {...elementProps(config.id, `columns.${i}`, 'heading')} key={i} className="p-4 text-center">
                    <span className={cn('text-sm font-semibold', i === 0 ? '' : 'text-white/40')} style={i === 0 ? { color: accent } : undefined}>
                      {col}
                    </span>
                  </div>
                ))}
              </div>
              {/* Rows */}
              {features.map((feat, fi) => (
                <div
                  key={feat.id}
                  className={cn('grid border-b last:border-0 border-white/[0.05]', fi % 2 === 1 ? 'bg-white/[0.02]' : '')}
                  style={{ gridTemplateColumns: `1.5fr ${cols.map(() => '1fr').join(' ')}` }}
                >
                  <div {...elementProps(config.id, `features.${fi}.name`, 'text')} className="p-4 text-sm text-white/70 font-medium">{feat.name}</div>
                  {feat.values.map((val, vi) => (
                    <div {...elementProps(config.id, `features.${fi}.values.${vi}`, 'text')} key={vi} className="p-4 flex items-center justify-center">
                      {typeof val === 'boolean'
                        ? val
                          ? <Check className="w-4 h-4" style={{ color: accent }} />
                          : <X className="w-4 h-4 text-white/15" />
                        : <span className={cn('text-sm font-medium', vi === 0 ? '' : 'text-white/40')} style={vi === 0 ? { color: accent } : undefined}>{val}</span>
                      }
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // Cards
    return (
      <section className="bg-[#0a0a0f] py-20 relative overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="absolute inset-0 dot-grid" />
        <div
          className="absolute top-1/3 right-1/4 w-[400px] h-[300px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${accent}30, transparent 70%)` }}
        />
        <div className="relative max-w-5xl mx-auto px-6">
          {header}
          <div className={cn('grid gap-6', cols.length <= 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3')}>
            {cols.map((col, ci) => (
              <div
                key={ci}
                className={cn(
                  'rounded-2xl border p-6 space-y-4 backdrop-blur-xl',
                  ci === 0
                    ? 'bg-white/[0.06] border-white/[0.15]'
                    : 'bg-white/[0.03] border-white/[0.08]',
                )}
              >
                {/* Glow line at top for first card */}
                {ci === 0 && (
                  <div className="absolute top-0 left-[20%] right-[20%] h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }} />
                )}
                <div className="flex items-center gap-2">
                  {ci === 0 && <Sparkles className="w-4 h-4" style={{ color: accent }} />}
                  <h3 {...elementProps(config.id, `columns.${ci}`, 'heading')} className={cn('font-bold text-lg', ci === 0 ? 'text-white' : 'text-white/60')}>
                    {col}
                  </h3>
                  {ci === 0 && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.06] text-white/60">Pro</span>
                  )}
                </div>
                <div className="space-y-3">
                  {features.map((feat, fi) => {
                    const val = feat.values[ci]
                    return (
                      <div key={feat.id} className="flex items-center gap-3">
                        {typeof val === 'boolean' ? (
                          val
                            ? <Check className="w-4 h-4 shrink-0" style={{ color: accent }} />
                            : <X className="w-4 h-4 text-white/15 shrink-0" />
                        ) : (
                          <Check className="w-4 h-4 shrink-0" style={{ color: accent }} />
                        )}
                        <span {...elementProps(config.id, `features.${fi}.name`, 'text')} className={cn('text-sm', typeof val === 'boolean' && !val ? 'text-white/20 line-through' : 'text-white/60')}>
                          {feat.name}
                          {typeof val === 'string' && <span className="font-semibold text-white ml-1">{val}</span>}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Fallback → startup-table
  return <ComparisonSection config={{ ...config, variant: 'startup-table' }} />
}

export const comparisonMeta = {
  type: 'comparison-table',
  label: 'Tableau comparatif',
  icon: '⚖️',
  variants: [
    'startup-table', 'startup-cards',
    'corporate-table', 'corporate-cards',
    'luxe-table', 'luxe-cards',
    'creative-table', 'creative-cards',
    'ecommerce-table', 'ecommerce-cards',
    'glass-table', 'glass-cards',
  ],
  defaultVariant: 'startup-table',
  defaultContent: {},
}
