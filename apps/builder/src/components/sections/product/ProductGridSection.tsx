import { cn } from '@/lib/utils'
import { sectionClasses, getTextColorClass, getMutedTextClass, getEyebrowClass, getTitleSizeClass, getTextAlignClass } from '../_utils'
import type { SectionConfig } from '@/types/site'
import type { ProductGridContent, ProductItem } from '@/types/sections'
import { Star, ShoppingCart, Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'
import { elementProps } from '@/lib/elementHelpers'
import { DecorativeOrnament, FloatingIllustration } from '../_DecorativeOrnament'

export function ProductGridSection({ config }: { config: SectionConfig }) {
  const content = (config.content ?? {}) as Partial<ProductGridContent>
  const variant = config.variant ?? 'startup-grid'
  const { accentColor, textColor: customTextColor } = config.style
  const items: ProductItem[] = content.items ?? []
  const universe = variant.split('-')[0]

  const title = content.title
  const subtitle = content.subtitle
  const eyebrow = content.eyebrow

  // ═══════════════════════════════════════════
  // SHARED: Product card image placeholder
  // ═══════════════════════════════════════════

  const productImage = (item: ProductItem, className: string, i = 0) =>
    item.image ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img {...elementProps(config.id, `items.${i}.image`, 'image')} src={item.image} alt={item.name} className={cn('object-contain', className)} />
    ) : (
      <span {...elementProps(config.id, `items.${i}.image`, 'image')} className="text-3xl">📦</span>
    )

  const starRating = (item: ProductItem, starClass?: string, textClass?: string) =>
    item.rating ? (
      <div className="flex items-center gap-1">
        <Star className={cn('w-3.5 h-3.5 fill-amber-400 text-amber-400', starClass)} />
        <span className={cn('text-xs text-amber-500', textClass)}>{item.rating}</span>
        {item.reviews != null && <span className={cn('text-xs', textClass ?? 'text-zinc-400')}>({item.reviews})</span>}
      </div>
    ) : null

  // ═══════════════════════════════════════════
  // STARTUP — SaaS / Moderne
  // ═══════════════════════════════════════════

  if (universe === 'startup') {
    const accent = accentColor ?? '#6366f1'
    const layout = variant.replace('startup-', '')

    const header = (
      <div className="text-center mb-12 space-y-4">
        {eyebrow && (
          <span className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full border border-zinc-200 text-zinc-600 bg-white shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
            {eyebrow}
          </span>
        )}
        {title && (
          <h2 {...elementProps(config.id, 'title', 'heading')} className="text-3xl md:text-4xl font-bold text-zinc-900 leading-tight" style={customTextColor ? { color: customTextColor } : undefined}>
            {title}
          </h2>
        )}
      </div>
    )

    // Grid — 3-4 column product cards
    if (layout === 'grid') {
      return (
        <section className="bg-zinc-50 py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-6xl mx-auto px-6">
            {header}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {items.map((item, i) => (
                <div key={item.id} className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
                  {item.badge && (
                    <div className="px-3 pt-3">
                      <span className="text-xs text-white px-2.5 py-0.5 rounded-full" style={{ backgroundColor: accent }}>{item.badge}</span>
                    </div>
                  )}
                  <div className="h-36 flex items-center justify-center m-3 rounded-xl bg-zinc-50">
                    {productImage(item, 'h-full', i)}
                  </div>
                  <div className="px-4 pb-4 space-y-2">
                    <p {...elementProps(config.id, `items.${i}.name`, 'heading')} className="font-semibold text-sm text-zinc-900">{item.name}</p>
                    {starRating(item)}
                    <div className="flex items-center justify-between">
                      <div>
                        <span {...elementProps(config.id, `items.${i}.price`, 'text')} className="font-bold text-zinc-900">{item.price}</span>
                        {item.originalPrice && <span className="text-xs line-through ml-1 text-zinc-400">{item.originalPrice}</span>}
                      </div>
                      <button
                        {...elementProps(config.id, `items.${i}.cta`, 'button')}
                        className="w-8 h-8 text-white rounded-lg flex items-center justify-center hover:opacity-90 transition-colors"
                        style={{ backgroundColor: accent }}
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // List — horizontal rows, image left, details right
    return (
      <section className="bg-zinc-50 py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-4xl mx-auto px-6">
          {header}
          <div className="space-y-4">
            {items.map((item, i) => (
              <div key={item.id} className="flex items-center gap-6 bg-white rounded-2xl border border-zinc-100 shadow-sm p-4 hover:shadow-md transition-shadow group">
                <div className="w-28 h-28 rounded-xl bg-zinc-50 flex items-center justify-center shrink-0">
                  {productImage(item, 'h-full', i)}
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <p {...elementProps(config.id, `items.${i}.name`, 'heading')} className="font-semibold text-zinc-900">{item.name}</p>
                    {item.badge && <span className="text-xs text-white px-2 py-0.5 rounded-full" style={{ backgroundColor: accent }}>{item.badge}</span>}
                  </div>
                  {starRating(item)}
                  {item.category && <p className="text-xs text-zinc-400">{item.category}</p>}
                </div>
                <div className="text-right shrink-0 space-y-2">
                  <div>
                    <span {...elementProps(config.id, `items.${i}.price`, 'text')} className="font-bold text-lg text-zinc-900">{item.price}</span>
                    {item.originalPrice && <span className="text-xs line-through ml-1 text-zinc-400">{item.originalPrice}</span>}
                  </div>
                  <button
                    {...elementProps(config.id, `items.${i}.cta`, 'button')}
                    className="px-4 py-2 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-colors"
                    style={{ backgroundColor: accent }}
                  >
                    <ShoppingCart className="w-4 h-4 inline mr-1" />
                    Ajouter
                  </button>
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
        {eyebrow && (
          <span className="inline-block text-xs font-semibold px-3 py-1 rounded border text-blue-300 border-blue-500/30 bg-blue-500/10">
            {eyebrow}
          </span>
        )}
        {title && (
          <h2 {...elementProps(config.id, 'title', 'heading')} className="text-3xl md:text-4xl font-bold text-white leading-tight" style={customTextColor ? { color: customTextColor } : undefined}>
            {title}
          </h2>
        )}
      </div>
    )

    // Grid
    if (layout === 'grid') {
      return (
        <section className="bg-[#0f172a] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-7xl mx-auto px-6">
            {header}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {items.map((item, i) => (
                <div key={item.id} className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden hover:border-blue-500/30 transition-colors">
                  {item.badge && (
                    <div className="px-4 pt-4">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded border text-blue-300 border-blue-500/30 bg-blue-500/10">{item.badge}</span>
                    </div>
                  )}
                  <div className="h-32 flex items-center justify-center m-4 rounded-lg bg-slate-900/50 border border-slate-700/30">
                    {productImage(item, 'h-full', i)}
                  </div>
                  <div className="px-4 pb-4 space-y-2">
                    <p {...elementProps(config.id, `items.${i}.name`, 'heading')} className="font-semibold text-sm text-white">{item.name}</p>
                    {item.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs text-amber-400">{item.rating}</span>
                        {item.reviews != null && <span className="text-xs text-slate-500">({item.reviews})</span>}
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
                      <div>
                        <span {...elementProps(config.id, `items.${i}.price`, 'text')} className="font-bold text-white">{item.price}</span>
                        {item.originalPrice && <span className="text-xs line-through ml-1 text-slate-500">{item.originalPrice}</span>}
                      </div>
                      <button {...elementProps(config.id, `items.${i}.cta`, 'button')} className="text-xs font-semibold px-3 py-1.5 rounded border transition-colors" style={{ color: accent, borderColor: `${accent}50` }}>
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // List
    return (
      <section className="bg-[#0f172a] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-5xl mx-auto px-6">
          {header}
          <div className="divide-y divide-slate-700/50">
            {items.map((item, i) => (
              <div key={item.id} className="flex items-center gap-6 py-5 group">
                <div className="w-24 h-24 rounded-lg bg-slate-800/50 border border-slate-700/30 flex items-center justify-center shrink-0">
                  {productImage(item, 'h-full', i)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <p {...elementProps(config.id, `items.${i}.name`, 'heading')} className="font-semibold text-white">{item.name}</p>
                    {item.badge && <span className="text-xs font-semibold px-2 py-0.5 rounded border text-blue-300 border-blue-500/30 bg-blue-500/10">{item.badge}</span>}
                  </div>
                  {item.rating && (
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs text-amber-400">{item.rating}</span>
                      {item.reviews != null && <span className="text-xs text-slate-500">({item.reviews})</span>}
                    </div>
                  )}
                  {item.category && <p className="text-xs text-slate-500 mt-1">{item.category}</p>}
                </div>
                <div className="text-right shrink-0 space-y-2">
                  <div>
                    <span {...elementProps(config.id, `items.${i}.price`, 'text')} className="font-bold text-lg text-white">{item.price}</span>
                    {item.originalPrice && <span className="text-xs line-through ml-2 text-slate-500">{item.originalPrice}</span>}
                  </div>
                  <button {...elementProps(config.id, `items.${i}.cta`, 'button')} className="text-xs font-semibold px-4 py-1.5 rounded border transition-colors" style={{ color: accent, borderColor: `${accent}50` }}>
                    Voir details <ArrowRight className="w-3 h-3 inline ml-1" />
                  </button>
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
    const hasDecorativeIcon = !!content.decorativeIcon

    const header = (
      <div className="text-center mb-16 space-y-5">
        {hasDecorativeIcon && <DecorativeOrnament color={gold} iconUrl={typeof content.decorativeIcon === 'string' && content.decorativeIcon.startsWith('http') ? content.decorativeIcon : undefined} />}
        {eyebrow && (
          <span className="inline-block text-xs tracking-[0.25em] uppercase font-light" style={{ color: gold }}>
            {eyebrow}
          </span>
        )}
        {title && (
          <h2 {...elementProps(config.id, 'title', 'heading')} className="text-3xl md:text-4xl font-black text-zinc-900 leading-tight tracking-tight" style={customTextColor ? { color: customTextColor } : undefined}>
            {title}
          </h2>
        )}
        {!hasDecorativeIcon && <div className="w-12 h-px mx-auto" style={{ background: gold }} />}
        {subtitle && <p {...elementProps(config.id, 'subtitle', 'text')} className="text-base text-zinc-400 max-w-xl mx-auto tracking-wide font-light">{subtitle}</p>}
      </div>
    )

    // Grid
    if (layout === 'grid') {
      return (
        <section className="bg-white py-24 relative overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-5xl mx-auto px-6 relative">
            {header}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item, i) => (
                <div key={item.id} className="group text-center space-y-4">
                  <div className="aspect-square bg-zinc-50 border border-zinc-100 flex items-center justify-center overflow-hidden">
                    {productImage(item, 'h-full group-hover:scale-105 transition-transform duration-500', i)}
                  </div>
                  {item.badge && (
                    <span className="inline-block text-[10px] tracking-[0.2em] uppercase font-light" style={{ color: gold }}>
                      {item.badge}
                    </span>
                  )}
                  <h3 {...elementProps(config.id, `items.${i}.name`, 'heading')} className="font-medium text-zinc-900 tracking-wide text-sm uppercase">{item.name}</h3>
                  {item.description && (
                    <p {...elementProps(config.id, `items.${i}.description`, 'text')} className="text-sm text-zinc-400 font-light leading-relaxed">{item.description}</p>
                  )}
                  <div className="flex items-center justify-center gap-3">
                    <span {...elementProps(config.id, `items.${i}.price`, 'text')} className="text-lg font-light tracking-wide text-zinc-900">{item.price}</span>
                    {item.originalPrice && <span className="text-sm line-through text-zinc-400 font-light">{item.originalPrice}</span>}
                  </div>
                  <div className="w-8 h-px mx-auto" style={{ background: gold }} />
                </div>
              ))}
            </div>
            {content.primaryButton && (
              <div className="flex justify-center mt-12">
                <a {...elementProps(config.id, 'primaryButton', 'button')} href={content.primaryButton.href} className="px-8 py-3.5 text-sm font-medium tracking-[0.1em] uppercase border border-zinc-300 text-zinc-700 hover:bg-zinc-50 transition-colors">
                  {content.primaryButton.label}
                </a>
              </div>
            )}
          </div>
        </section>
      )
    }

    // List
    return (
      <section className="bg-white py-24 relative overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-4xl mx-auto px-6 relative">
          {header}
          <div className="space-y-0 divide-y divide-zinc-100">
            {items.map((item, i) => (
              <div key={item.id} className="flex items-center gap-8 py-8 group">
                <div className="w-28 h-28 bg-zinc-50 border border-zinc-100 flex items-center justify-center shrink-0 overflow-hidden">
                  {productImage(item, 'h-full group-hover:scale-105 transition-transform duration-500', i)}
                </div>
                <div className="flex-1 min-w-0 space-y-2">
                  {item.badge && (
                    <span className="text-[10px] tracking-[0.2em] uppercase font-light" style={{ color: gold }}>
                      {item.badge}
                    </span>
                  )}
                  <h3 {...elementProps(config.id, `items.${i}.name`, 'heading')} className="font-medium text-zinc-900 tracking-wide text-sm uppercase">{item.name}</h3>
                  {item.category && <p className="text-xs text-zinc-400 tracking-widest uppercase font-light">{item.category}</p>}
                </div>
                <div className="text-right shrink-0 space-y-2">
                  <span {...elementProps(config.id, `items.${i}.price`, 'text')} className="text-xl font-light tracking-wide text-zinc-900">{item.price}</span>
                  {item.originalPrice && <p className="text-sm line-through text-zinc-400 font-light">{item.originalPrice}</p>}
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-300 shrink-0" />
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
        {eyebrow && (
          <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1.5 border-2 border-zinc-900 text-zinc-900 bg-yellow-300">
            {eyebrow}
          </span>
        )}
        {title && (
          <h2 {...elementProps(config.id, 'title', 'heading')} className="text-3xl md:text-5xl font-black text-zinc-900 leading-[0.95]" style={customTextColor ? { color: customTextColor } : undefined}>
            {title}
          </h2>
        )}
      </div>
    )

    // Grid
    if (layout === 'grid') {
      return (
        <section className="bg-[#fdf6e3] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-7xl mx-auto px-6">
            {header}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {items.map((item, i) => (
                <div key={item.id} className="bg-white border-2 border-zinc-900 shadow-[4px_4px_0_0_#18181b] hover:shadow-[6px_6px_0_0_#18181b] hover:translate-x-0.5 hover:-translate-y-0.5 transition-all">
                  {item.badge && (
                    <div className="px-3 pt-3">
                      <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 bg-yellow-300 border border-zinc-900">{item.badge}</span>
                    </div>
                  )}
                  <div className="h-32 flex items-center justify-center m-3 bg-[#fdf6e3] border border-zinc-200">
                    {productImage(item, 'h-full', i)}
                  </div>
                  <div className="px-4 pb-4 space-y-2">
                    <p {...elementProps(config.id, `items.${i}.name`, 'heading')} className="font-black text-sm text-zinc-900 uppercase tracking-wide">{item.name}</p>
                    {starRating(item)}
                    <div className="flex items-center justify-between pt-2 border-t-2 border-zinc-900">
                      <div>
                        <span {...elementProps(config.id, `items.${i}.price`, 'text')} className="font-black text-lg text-zinc-900">{item.price}</span>
                        {item.originalPrice && <span className="text-xs line-through ml-1 text-zinc-500">{item.originalPrice}</span>}
                      </div>
                      <button {...elementProps(config.id, `items.${i}.cta`, 'button')} className="w-8 h-8 bg-zinc-900 text-white flex items-center justify-center hover:bg-zinc-700 transition-colors border-2 border-zinc-900">
                        <ShoppingCart className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // List
    return (
      <section className="bg-[#fdf6e3] py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-5xl mx-auto px-6">
          {header}
          <div className="border-t-2 border-zinc-900">
            {items.map((item, i) => (
              <div key={item.id} className="flex items-center gap-6 py-5 border-b-2 border-zinc-900 group">
                <div className="w-24 h-24 bg-white border-2 border-zinc-900 shadow-[3px_3px_0_0_#18181b] flex items-center justify-center shrink-0">
                  {productImage(item, 'h-full', i)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <p {...elementProps(config.id, `items.${i}.name`, 'heading')} className="font-black text-zinc-900 uppercase tracking-wide">{item.name}</p>
                    {item.badge && <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 bg-yellow-300 border border-zinc-900">{item.badge}</span>}
                  </div>
                  {starRating(item)}
                  {item.category && <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mt-1">{item.category}</p>}
                </div>
                <div className="text-right shrink-0 space-y-2">
                  <div>
                    <span {...elementProps(config.id, `items.${i}.price`, 'text')} className="font-black text-2xl text-zinc-900">{item.price}</span>
                    {item.originalPrice && <span className="text-sm line-through ml-2 text-zinc-500">{item.originalPrice}</span>}
                  </div>
                  <button {...elementProps(config.id, `items.${i}.cta`, 'button')} className="text-xs font-black uppercase tracking-wider px-4 py-2 bg-zinc-900 text-white border-2 border-zinc-900 hover:bg-zinc-700 transition-colors">
                    Ajouter
                  </button>
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
        {eyebrow && (
          <span className="inline-block text-xs font-bold px-3 py-1 rounded-full text-white" style={{ backgroundColor: accent }}>
            {eyebrow}
          </span>
        )}
        {title && (
          <h2 {...elementProps(config.id, 'title', 'heading')} className="text-3xl md:text-4xl font-bold text-zinc-900 leading-tight" style={customTextColor ? { color: customTextColor } : undefined}>
            {title}
          </h2>
        )}
      </div>
    )

    // Grid
    if (layout === 'grid') {
      return (
        <section className="bg-white py-16" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="max-w-6xl mx-auto px-6">
            {header}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {items.map((item, i) => (
                <div key={item.id} className="rounded-2xl border border-zinc-100 bg-white shadow-sm overflow-hidden hover:border-emerald-200 transition-colors group">
                  {item.badge && (
                    <div className="px-3 pt-3">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full text-white" style={{ backgroundColor: accent }}>{item.badge}</span>
                    </div>
                  )}
                  <div className="h-32 flex items-center justify-center m-3 rounded-xl bg-zinc-50">
                    {productImage(item, 'h-full', i)}
                  </div>
                  <div className="px-4 pb-4 space-y-2">
                    <p {...elementProps(config.id, `items.${i}.name`, 'heading')} className="font-semibold text-sm text-zinc-900">{item.name}</p>
                    {item.rating && (
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(s => (
                          <Star key={s} className={cn('w-3 h-3', s <= Math.round(item.rating!) ? 'fill-amber-400 text-amber-400' : 'text-zinc-200')} />
                        ))}
                        {item.reviews != null && <span className="text-xs text-zinc-400 ml-1">({item.reviews})</span>}
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-[10px] font-medium" style={{ color: accent }}>
                      <ShieldCheck className="w-3 h-3" />
                      Verifie
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <span {...elementProps(config.id, `items.${i}.price`, 'text')} className="font-bold text-zinc-900">{item.price}</span>
                        {item.originalPrice && <span className="text-xs line-through ml-1 text-zinc-400">{item.originalPrice}</span>}
                      </div>
                      <button
                        {...elementProps(config.id, `items.${i}.cta`, 'button')}
                        className="px-3 py-1.5 text-white text-xs font-bold rounded-lg hover:opacity-90 transition-colors"
                        style={{ backgroundColor: accent }}
                      >
                        Ajouter
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // List
    return (
      <section className="bg-zinc-50 py-16" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-4xl mx-auto px-6">
          {header}
          <div className="space-y-3">
            {items.map((item, i) => (
              <div key={item.id} className="flex items-center gap-5 bg-white rounded-2xl border border-zinc-100 p-4 hover:border-emerald-200 transition-colors">
                <div className="w-24 h-24 rounded-xl bg-zinc-50 flex items-center justify-center shrink-0">
                  {productImage(item, 'h-full', i)}
                </div>
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <p {...elementProps(config.id, `items.${i}.name`, 'heading')} className="font-semibold text-zinc-900">{item.name}</p>
                    {item.badge && <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: accent }}>{item.badge}</span>}
                  </div>
                  {item.rating && (
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className={cn('w-3 h-3', s <= Math.round(item.rating!) ? 'fill-amber-400 text-amber-400' : 'text-zinc-200')} />
                      ))}
                      {item.reviews != null && <span className="text-xs text-zinc-400 ml-1">({item.reviews})</span>}
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[10px] font-medium" style={{ color: accent }}>
                      <Check className="w-3 h-3" /> En stock
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-medium" style={{ color: accent }}>
                      <ShieldCheck className="w-3 h-3" /> Garanti
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0 space-y-2">
                  <div>
                    <span {...elementProps(config.id, `items.${i}.price`, 'text')} className="font-bold text-lg text-zinc-900">{item.price}</span>
                    {item.originalPrice && <p className="text-xs line-through text-zinc-400">{item.originalPrice}</p>}
                  </div>
                  <button
                    {...elementProps(config.id, `items.${i}.cta`, 'button')}
                    className="px-4 py-2 text-white text-sm font-bold rounded-lg hover:opacity-90 transition-colors"
                    style={{ backgroundColor: accent }}
                  >
                    Ajouter
                  </button>
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
        {eyebrow && (
          <span className="inline-flex items-center gap-2 text-xs font-medium px-4 py-1.5 rounded-full border border-white/10 text-white/60 bg-white/[0.04] backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent, boxShadow: `0 0 8px ${accent}80` }} />
            {eyebrow}
          </span>
        )}
        {title && (
          <h2 {...elementProps(config.id, 'title', 'heading')} className="text-3xl md:text-4xl font-bold text-white leading-tight" style={customTextColor ? { color: customTextColor } : undefined}>
            {title}
          </h2>
        )}
      </div>
    )

    // Grid
    if (layout === 'grid') {
      return (
        <section className="bg-[#0a0a0f] py-20 relative overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
          <div className="absolute inset-0 dot-grid" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-30 blur-3xl pointer-events-none"
            style={{ background: `radial-gradient(ellipse, ${accent}20, transparent 70%)` }}
          />
          <div className="relative max-w-6xl mx-auto px-6">
            {header}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {items.map((item, i) => (
                <div key={item.id} className="bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/[0.08] overflow-hidden hover:border-white/[0.15] transition-colors group">
                  {item.badge && (
                    <div className="px-4 pt-4">
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full border border-white/10 text-white/80 bg-white/[0.06]">{item.badge}</span>
                    </div>
                  )}
                  <div className="h-32 flex items-center justify-center m-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    {productImage(item, 'h-full', i)}
                  </div>
                  <div className="px-4 pb-4 space-y-2">
                    <p {...elementProps(config.id, `items.${i}.name`, 'heading')} className="font-semibold text-sm text-white">{item.name}</p>
                    {item.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs text-amber-400">{item.rating}</span>
                        {item.reviews != null && <span className="text-xs text-white/30">({item.reviews})</span>}
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                      <div>
                        <span {...elementProps(config.id, `items.${i}.price`, 'text')} className="font-bold text-white">{item.price}</span>
                        {item.originalPrice && <span className="text-xs line-through ml-1 text-white/30">{item.originalPrice}</span>}
                      </div>
                      <button
                        {...elementProps(config.id, `items.${i}.cta`, 'button')}
                        className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 bg-white/[0.06] text-white hover:bg-white/[0.12] transition-colors"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }

    // List
    return (
      <section className="bg-[#0a0a0f] py-20 relative overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="absolute inset-0 dot-grid" />
        <div
          className="absolute top-1/3 right-1/4 w-[400px] h-[300px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${accent}30, transparent 70%)` }}
        />
        <div className="relative max-w-4xl mx-auto px-6">
          {header}
          <div className="space-y-3">
            {items.map((item, i) => (
              <div key={item.id} className="flex items-center gap-5 bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/[0.08] p-4 hover:border-white/[0.15] transition-colors">
                <div className="w-24 h-24 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0">
                  {productImage(item, 'h-full', i)}
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <p {...elementProps(config.id, `items.${i}.name`, 'heading')} className="font-semibold text-white">{item.name}</p>
                    {item.badge && <span className="text-xs font-medium px-2 py-0.5 rounded-full border border-white/10 text-white/60 bg-white/[0.06]">{item.badge}</span>}
                  </div>
                  {item.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs text-amber-400">{item.rating}</span>
                      {item.reviews != null && <span className="text-xs text-white/30">({item.reviews})</span>}
                    </div>
                  )}
                  {item.category && <p className="text-xs text-white/30">{item.category}</p>}
                </div>
                <div className="text-right shrink-0 space-y-2">
                  <div>
                    <span {...elementProps(config.id, `items.${i}.price`, 'text')} className="font-bold text-lg text-white">{item.price}</span>
                    {item.originalPrice && <span className="text-xs line-through ml-1 text-white/30">{item.originalPrice}</span>}
                  </div>
                  <button
                    {...elementProps(config.id, `items.${i}.cta`, 'button')}
                    className="px-4 py-2 rounded-lg text-sm font-medium border border-white/10 bg-white/[0.06] text-white hover:bg-white/[0.12] transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 inline mr-1" style={{ color: accent }} />
                    Ajouter
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Fallback → startup-grid
  return <ProductGridSection config={{ ...config, variant: 'startup-grid' }} />
}

export const productGridMeta = {
  type: 'product-grid',
  label: 'Grille Produits',
  icon: '🛍️',
  variants: [
    'startup-grid', 'startup-list',
    'corporate-grid', 'corporate-list',
    'luxe-grid', 'luxe-list',
    'creative-grid', 'creative-list',
    'ecommerce-grid', 'ecommerce-list',
    'glass-grid', 'glass-list',
  ],
  defaultVariant: 'startup-grid',
  defaultContent: {},
}
