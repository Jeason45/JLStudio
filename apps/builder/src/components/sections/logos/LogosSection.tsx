import { cn } from '@/lib/utils'
import type { SectionConfig, SectionTitleSize, SectionTextAlign } from '@/types/site'
import type { LogosContent, LogoItem } from '@/types/sections'
import { getTitleSizeClass, getTextAlignClass } from '../_utils'
import { elementProps } from '@/lib/elementHelpers'

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

type Universe = 'startup' | 'corporate' | 'luxe' | 'creative' | 'ecommerce' | 'glass'
type Layout = 'strip' | 'grid'

interface LogosVariantProps {
  sectionId: string
  content: Partial<LogosContent>
  items: LogoItem[]
  titleSize?: SectionTitleSize
  textAlign?: SectionTextAlign
  textColor?: string
}

function parseVariant(v: string): { universe: Universe; layout: Layout } {
  const parts = v.split('-')
  const layout = (parts.pop() ?? 'strip') as Layout
  const universe = (parts.join('-') || 'startup') as Universe
  return { universe, layout }
}

// Noise overlay used by corporate & glass
function NoiseOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.035]"
      style={{
        backgroundImage:
          'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        backgroundRepeat: 'repeat',
        backgroundSize: '128px 128px',
      }}
    />
  )
}

// Dot-grid used by glass
function DotGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.07]"
      style={{
        backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    />
  )
}

// ─────────────────────────────────────────────
// Logo renderers per universe
// ─────────────────────────────────────────────

function renderLogoImage(item: LogoItem, className: string, sectionId: string, index: number) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img {...elementProps(sectionId, `items.${index}.logo`, 'image')} src={item.logo} alt={item.name} className={className} />
    </>
  )
}

// ─────────────────────────────────────────────
// STARTUP
// ─────────────────────────────────────────────

function StartupLogoCard({ item, sectionId, index }: { item: LogoItem; sectionId: string; index: number }) {
  return (
    <div {...elementProps(sectionId, `items.${index}.logo`, 'image')} className="h-12 px-6 rounded-lg flex items-center justify-center bg-white border border-zinc-100 shadow-sm">
      {item.logo ? (
        renderLogoImage(item, 'h-5 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300', sectionId, index)
      ) : (
        <span className="text-sm font-semibold tracking-tight text-zinc-400">
          {item.name}
        </span>
      )}
    </div>
  )
}

function StartupStrip({ sectionId, content, items, titleSize, textAlign, textColor }: LogosVariantProps) {
  return (
    <section className="bg-zinc-50 py-16" style={{ fontFamily: 'var(--font-body, inherit)' }}>
      <div className="max-w-5xl mx-auto px-6">
        {content.eyebrow && (
          <div className={cn("text-center mb-3", textAlign && getTextAlignClass(textAlign))}>
            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full text-indigo-600 bg-indigo-50 border border-indigo-100">
              {content.eyebrow}
            </span>
          </div>
        )}
        {content.title && (
          <p {...elementProps(sectionId, 'title', 'heading')} className={cn("text-center text-sm font-medium text-zinc-500 mb-8", titleSize && getTitleSizeClass(titleSize))}
             style={textColor ? { color: textColor } : undefined}>{content.title}</p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {items.map((item, i) => (
            <StartupLogoCard key={item.id} item={item} sectionId={sectionId} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StartupGrid({ sectionId, content, items, titleSize, textAlign, textColor }: LogosVariantProps) {
  return (
    <section className="bg-zinc-50 py-16" style={{ fontFamily: 'var(--font-body, inherit)' }}>
      <div className="max-w-4xl mx-auto px-6">
        {content.eyebrow && (
          <div className={cn("text-center mb-3", textAlign && getTextAlignClass(textAlign))}>
            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full text-indigo-600 bg-indigo-50 border border-indigo-100">
              {content.eyebrow}
            </span>
          </div>
        )}
        {content.title && (
          <p {...elementProps(sectionId, 'title', 'heading')} className={cn("text-center text-sm font-medium text-zinc-500 mb-8", titleSize && getTitleSizeClass(titleSize))}
             style={textColor ? { color: textColor } : undefined}>{content.title}</p>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <div
              {...elementProps(sectionId, `items.${i}.logo`, 'image')}
              key={item.id}
              className="rounded-lg bg-white border border-zinc-100 shadow-sm p-6 flex flex-col items-center justify-center gap-2"
            >
              {item.logo ? (
                renderLogoImage(item, 'h-6 object-contain grayscale opacity-60', sectionId, i)
              ) : (
                <span className="text-sm font-semibold text-zinc-400">{item.name}</span>
              )}
              {item.quote && (
                <p className="text-xs text-zinc-400 italic text-center mt-1 leading-relaxed">
                  {item.quote}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// CORPORATE
// ─────────────────────────────────────────────

function CorporateStrip({ sectionId, content, items, titleSize, textAlign, textColor }: LogosVariantProps) {
  return (
    <section className="relative bg-slate-900 py-16 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
      <NoiseOverlay />
      <div className="relative max-w-5xl mx-auto px-6">
        {content.eyebrow && (
          <div className={cn("text-center mb-3", textAlign && getTextAlignClass(textAlign))}>
            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full text-blue-300 bg-blue-500/10 border border-blue-500/20">
              {content.eyebrow}
            </span>
          </div>
        )}
        {content.title && (
          <p {...elementProps(sectionId, 'title', 'heading')} className={cn("text-center text-sm font-medium text-slate-400 mb-8", titleSize && getTitleSizeClass(titleSize))}
             style={textColor ? { color: textColor } : undefined}>{content.title}</p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-8">
          {items.map((item, i) => (
            <div {...elementProps(sectionId, `items.${i}.logo`, 'image')} key={item.id} className="h-10 px-6 flex items-center justify-center">
              {item.logo ? (
                renderLogoImage(item, 'h-5 object-contain brightness-0 invert opacity-50 hover:opacity-100 transition-opacity duration-300', sectionId, i)
              ) : (
                <span className="text-sm font-bold tracking-tight text-white/40 hover:text-white/80 transition-colors duration-300">
                  {item.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CorporateGrid({ sectionId, content, items, titleSize, textAlign, textColor }: LogosVariantProps) {
  return (
    <section className="relative bg-slate-900 py-16 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
      <NoiseOverlay />
      <div className="relative max-w-4xl mx-auto px-6">
        {content.eyebrow && (
          <div className={cn("text-center mb-3", textAlign && getTextAlignClass(textAlign))}>
            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full text-blue-300 bg-blue-500/10 border border-blue-500/20">
              {content.eyebrow}
            </span>
          </div>
        )}
        {content.title && (
          <p {...elementProps(sectionId, 'title', 'heading')} className={cn("text-center text-sm font-medium text-slate-400 mb-8", titleSize && getTitleSizeClass(titleSize))}
             style={textColor ? { color: textColor } : undefined}>{content.title}</p>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <div
              {...elementProps(sectionId, `items.${i}.logo`, 'image')}
              key={item.id}
              className="rounded-lg bg-white/5 border border-white/10 p-6 flex flex-col items-center justify-center gap-2"
            >
              {item.logo ? (
                renderLogoImage(item, 'h-6 object-contain brightness-0 invert opacity-50', sectionId, i)
              ) : (
                <span className="text-sm font-bold text-white/40">{item.name}</span>
              )}
              {item.quote && (
                <p className="text-xs text-slate-400 italic text-center mt-1 leading-relaxed">
                  {item.quote}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// LUXE
// ─────────────────────────────────────────────

function LuxeStrip({ sectionId, content, items, titleSize, textAlign, textColor }: LogosVariantProps) {
  return (
    <section className="bg-white py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
      <div className="max-w-5xl mx-auto px-6">
        {content.eyebrow && (
          <div className={cn("text-center mb-4", textAlign && getTextAlignClass(textAlign))}>
            <span
              className="inline-block text-[10px] font-medium uppercase tracking-[0.25em] px-4 py-1.5"
              style={{ color: '#b8860b' }}
            >
              {content.eyebrow}
            </span>
          </div>
        )}
        {content.title ? (
          <p {...elementProps(sectionId, 'title', 'heading')} className={cn("text-center text-xs font-light uppercase tracking-[0.2em] text-zinc-400 mb-12", titleSize && getTitleSizeClass(titleSize))}
             style={textColor ? { color: textColor } : undefined}>
            {content.title}
          </p>
        ) : (
          <p {...elementProps(sectionId, 'title', 'heading')} className={cn("text-center text-xs font-light uppercase tracking-[0.2em] text-zinc-400 mb-12", titleSize && getTitleSizeClass(titleSize))}
             style={textColor ? { color: textColor } : undefined}>
            Ils nous font confiance
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-12">
          {items.map((item, i) => (
            <div {...elementProps(sectionId, `items.${i}.logo`, 'image')} key={item.id} className="h-10 flex items-center justify-center">
              {item.logo ? (
                renderLogoImage(item, 'h-5 object-contain opacity-30 hover:opacity-60 transition-opacity duration-500', sectionId, i)
              ) : (
                <span
                  className="text-xs font-light uppercase tracking-[0.2em] text-zinc-300 hover:text-zinc-500 transition-colors duration-500"
                >
                  {item.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function LuxeGrid({ sectionId, content, items, titleSize, textAlign, textColor }: LogosVariantProps) {
  return (
    <section className="bg-white py-20" style={{ fontFamily: 'var(--font-body, inherit)' }}>
      <div className="max-w-4xl mx-auto px-6">
        {content.eyebrow && (
          <div className={cn("text-center mb-4", textAlign && getTextAlignClass(textAlign))}>
            <span
              className="inline-block text-[10px] font-medium uppercase tracking-[0.25em] px-4 py-1.5"
              style={{ color: '#b8860b' }}
            >
              {content.eyebrow}
            </span>
          </div>
        )}
        {content.title ? (
          <p {...elementProps(sectionId, 'title', 'heading')} className={cn("text-center text-xs font-light uppercase tracking-[0.2em] text-zinc-400 mb-12", titleSize && getTitleSizeClass(titleSize))}
             style={textColor ? { color: textColor } : undefined}>
            {content.title}
          </p>
        ) : (
          <p {...elementProps(sectionId, 'title', 'heading')} className={cn("text-center text-xs font-light uppercase tracking-[0.2em] text-zinc-400 mb-12", titleSize && getTitleSizeClass(titleSize))}
             style={textColor ? { color: textColor } : undefined}>
            Ils nous font confiance
          </p>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              {...elementProps(sectionId, `items.${i}.logo`, 'image')}
              key={item.id}
              className="py-8 px-6 flex flex-col items-center justify-center gap-3 border-b border-zinc-100"
            >
              {item.logo ? (
                renderLogoImage(item, 'h-6 object-contain opacity-30', sectionId, i)
              ) : (
                <span className="text-xs font-light uppercase tracking-[0.2em] text-zinc-300">
                  {item.name}
                </span>
              )}
              {item.quote && (
                <p className="text-[11px] text-zinc-400 italic text-center leading-relaxed font-light">
                  &laquo;&nbsp;{item.quote}&nbsp;&raquo;
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// CREATIVE (neobrutalist)
// ─────────────────────────────────────────────

function CreativeStrip({ sectionId, content, items, titleSize, textAlign, textColor }: LogosVariantProps) {
  return (
    <section className="bg-[#f5f0e8] py-16" style={{ fontFamily: 'var(--font-body, inherit)' }}>
      <div className="max-w-5xl mx-auto px-6">
        {content.eyebrow && (
          <div className={cn("text-center mb-3", textAlign && getTextAlignClass(textAlign))}>
            <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 bg-zinc-900 text-[#f5f0e8] rotate-[-1deg]">
              {content.eyebrow}
            </span>
          </div>
        )}
        {content.title && (
          <p {...elementProps(sectionId, 'title', 'heading')} className={cn("text-center text-sm font-bold text-zinc-900 mb-8", titleSize && getTitleSizeClass(titleSize))}
             style={textColor ? { color: textColor } : undefined}>{content.title}</p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {items.map((item, i) => (
            <div
              {...elementProps(sectionId, `items.${i}.logo`, 'image')}
              key={item.id}
              className="h-14 px-6 flex items-center justify-center border-2 border-zinc-900 bg-white shadow-[3px_3px_0_0_#18181b] hover:shadow-[1px_1px_0_0_#18181b] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150"
            >
              {item.logo ? (
                renderLogoImage(item, 'h-5 object-contain', sectionId, i)
              ) : (
                <span className="text-sm font-black tracking-tight text-zinc-900">
                  {item.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CreativeGrid({ sectionId, content, items, titleSize, textAlign, textColor }: LogosVariantProps) {
  return (
    <section className="bg-[#f5f0e8] py-16" style={{ fontFamily: 'var(--font-body, inherit)' }}>
      <div className="max-w-4xl mx-auto px-6">
        {content.eyebrow && (
          <div className={cn("text-center mb-3", textAlign && getTextAlignClass(textAlign))}>
            <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 bg-zinc-900 text-[#f5f0e8] rotate-[-1deg]">
              {content.eyebrow}
            </span>
          </div>
        )}
        {content.title && (
          <p {...elementProps(sectionId, 'title', 'heading')} className={cn("text-center text-sm font-bold text-zinc-900 mb-8", titleSize && getTitleSizeClass(titleSize))}
             style={textColor ? { color: textColor } : undefined}>{content.title}</p>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <div
              {...elementProps(sectionId, `items.${i}.logo`, 'image')}
              key={item.id}
              className="border-2 border-zinc-900 bg-white p-6 shadow-[4px_4px_0_0_#18181b] flex flex-col items-center justify-center gap-2"
            >
              {item.logo ? (
                renderLogoImage(item, 'h-6 object-contain', sectionId, i)
              ) : (
                <span className="text-sm font-black tracking-tight text-zinc-900">
                  {item.name}
                </span>
              )}
              {item.quote && (
                <p className="text-xs text-zinc-700 font-medium text-center mt-1 leading-relaxed">
                  &laquo;&nbsp;{item.quote}&nbsp;&raquo;
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// ECOMMERCE
// ─────────────────────────────────────────────

function EcommerceStrip({ sectionId, content, items, titleSize, textAlign, textColor }: LogosVariantProps) {
  return (
    <section className="bg-white py-16" style={{ fontFamily: 'var(--font-body, inherit)' }}>
      <div className="max-w-5xl mx-auto px-6">
        {(content.eyebrow || !content.title) && (
          <div className={cn("text-center mb-3", textAlign && getTextAlignClass(textAlign))}>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border"
              style={{ color: '#059669', backgroundColor: '#ecfdf5', borderColor: '#a7f3d0' }}
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {content.eyebrow ?? 'Marques partenaires'}
            </span>
          </div>
        )}
        {content.title && (
          <p {...elementProps(sectionId, 'title', 'heading')} className={cn("text-center text-sm font-medium text-zinc-500 mb-8", titleSize && getTitleSizeClass(titleSize))}
             style={textColor ? { color: textColor } : undefined}>{content.title}</p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-8">
          {items.map((item, i) => (
            <div {...elementProps(sectionId, `items.${i}.logo`, 'image')} key={item.id} className="h-12 px-4 flex items-center justify-center">
              {item.logo ? (
                renderLogoImage(item, 'h-6 object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300', sectionId, i)
              ) : (
                <span className="text-sm font-semibold text-zinc-400 hover:text-emerald-600 transition-colors duration-300">
                  {item.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function EcommerceGrid({ sectionId, content, items, titleSize, textAlign, textColor }: LogosVariantProps) {
  return (
    <section className="bg-white py-16" style={{ fontFamily: 'var(--font-body, inherit)' }}>
      <div className="max-w-4xl mx-auto px-6">
        {(content.eyebrow || !content.title) && (
          <div className={cn("text-center mb-3", textAlign && getTextAlignClass(textAlign))}>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border"
              style={{ color: '#059669', backgroundColor: '#ecfdf5', borderColor: '#a7f3d0' }}
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {content.eyebrow ?? 'Marques partenaires'}
            </span>
          </div>
        )}
        {content.title && (
          <p {...elementProps(sectionId, 'title', 'heading')} className={cn("text-center text-sm font-medium text-zinc-500 mb-8", titleSize && getTitleSizeClass(titleSize))}
             style={textColor ? { color: textColor } : undefined}>{content.title}</p>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <div
              {...elementProps(sectionId, `items.${i}.logo`, 'image')}
              key={item.id}
              className="rounded-xl bg-zinc-50 border border-zinc-100 p-6 flex flex-col items-center justify-center gap-2 hover:border-emerald-200 hover:bg-emerald-50/30 transition-colors duration-300"
            >
              {item.logo ? (
                renderLogoImage(item, 'h-6 object-contain grayscale opacity-50', sectionId, i)
              ) : (
                <span className="text-sm font-semibold text-zinc-400">{item.name}</span>
              )}
              {item.quote && (
                <p className="text-xs text-zinc-400 italic text-center mt-1 leading-relaxed">
                  {item.quote}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// GLASS
// ─────────────────────────────────────────────

function GlassStrip({ sectionId, content, items, titleSize, textAlign, textColor }: LogosVariantProps) {
  return (
    <section className="relative bg-zinc-950 py-16 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
      <NoiseOverlay />
      <DotGrid />
      <div className="relative max-w-5xl mx-auto px-6">
        {content.eyebrow && (
          <div className={cn("text-center mb-3", textAlign && getTextAlignClass(textAlign))}>
            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full text-purple-300 bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm">
              {content.eyebrow}
            </span>
          </div>
        )}
        {content.title && (
          <p {...elementProps(sectionId, 'title', 'heading')} className={cn("text-center text-sm font-medium text-zinc-500 mb-8", titleSize && getTitleSizeClass(titleSize))}
             style={textColor ? { color: textColor } : undefined}>{content.title}</p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {items.map((item, i) => (
            <div
              {...elementProps(sectionId, `items.${i}.logo`, 'image')}
              key={item.id}
              className="h-14 px-6 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.08)] hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] hover:border-white/20 transition-all duration-300"
            >
              {item.logo ? (
                renderLogoImage(item, 'h-5 object-contain brightness-0 invert opacity-50 hover:opacity-100 transition-opacity duration-300', sectionId, i)
              ) : (
                <span className="text-sm font-semibold text-white/40 hover:text-white/80 transition-colors duration-300">
                  {item.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function GlassGrid({ sectionId, content, items, titleSize, textAlign, textColor }: LogosVariantProps) {
  return (
    <section className="relative bg-zinc-950 py-16 overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)' }}>
      <NoiseOverlay />
      <DotGrid />
      <div className="relative max-w-4xl mx-auto px-6">
        {content.eyebrow && (
          <div className={cn("text-center mb-3", textAlign && getTextAlignClass(textAlign))}>
            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full text-purple-300 bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm">
              {content.eyebrow}
            </span>
          </div>
        )}
        {content.title && (
          <p {...elementProps(sectionId, 'title', 'heading')} className={cn("text-center text-sm font-medium text-zinc-500 mb-8", titleSize && getTitleSizeClass(titleSize))}
             style={textColor ? { color: textColor } : undefined}>{content.title}</p>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <div
              {...elementProps(sectionId, `items.${i}.logo`, 'image')}
              key={item.id}
              className="rounded-xl bg-white/5 border border-white/10 backdrop-blur-md p-6 flex flex-col items-center justify-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.08)] hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] hover:border-white/20 transition-all duration-300"
            >
              {item.logo ? (
                renderLogoImage(item, 'h-6 object-contain brightness-0 invert opacity-50', sectionId, i)
              ) : (
                <span className="text-sm font-semibold text-white/40">{item.name}</span>
              )}
              {item.quote && (
                <p className="text-xs text-zinc-500 italic text-center mt-1 leading-relaxed">
                  {item.quote}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// Variant dispatcher
// ─────────────────────────────────────────────

const VARIANTS: Record<string, React.FC<LogosVariantProps>> = {
  'startup-strip': StartupStrip,
  'startup-grid': StartupGrid,
  'corporate-strip': CorporateStrip,
  'corporate-grid': CorporateGrid,
  'luxe-strip': LuxeStrip,
  'luxe-grid': LuxeGrid,
  'creative-strip': CreativeStrip,
  'creative-grid': CreativeGrid,
  'ecommerce-strip': EcommerceStrip,
  'ecommerce-grid': EcommerceGrid,
  'glass-strip': GlassStrip,
  'glass-grid': GlassGrid,
}

// ─────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────

interface LogosSectionProps {
  config: SectionConfig
  isEditing?: boolean
}

export function LogosSection({ config }: LogosSectionProps) {
  const content = (config.content ?? {}) as Partial<LogosContent>
  const variant = config.variant ?? 'startup-strip'
  const items: LogoItem[] = content.items ?? []
  const { titleSize, textAlign, textColor } = config.style

  const Component = VARIANTS[variant] ?? VARIANTS['startup-strip']

  return <Component sectionId={config.id} content={content} items={items} titleSize={titleSize} textAlign={textAlign} textColor={textColor} />
}

export const logosMeta = {
  type: 'logos',
  label: 'Logos clients',
  icon: '🏢',
  variants: [
    'startup-strip',
    'startup-grid',
    'corporate-strip',
    'corporate-grid',
    'luxe-strip',
    'luxe-grid',
    'creative-strip',
    'creative-grid',
    'ecommerce-strip',
    'ecommerce-grid',
    'glass-strip',
    'glass-grid',
  ],
  defaultVariant: 'startup-strip',
  defaultContent: {},
}
