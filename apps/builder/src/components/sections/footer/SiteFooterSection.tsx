import { cn } from '@/lib/utils'
import type { SectionConfig } from '@/types/site'
import type { SiteFooterContent } from '@/types/sections'
import { elementProps } from '@/lib/elementHelpers'
import { FloatingIllustration } from '../_DecorativeOrnament'
import { renderLogo } from '@/components/sections/_utils'

const socialLabels: Record<string, string> = { twitter: 'Twitter', linkedin: 'LinkedIn', github: 'GitHub', instagram: 'Instagram' }

function SocialsRow({ socials, className, sectionId }: { socials: Record<string, string | undefined>; className?: string; sectionId?: string }) {
  const entries = Object.entries(socials).filter(([, v]) => v)
  if (!entries.length) return null
  return (
    <div className="flex gap-4">
      {entries.map(([key, url], i) => (
        <a {...(sectionId ? elementProps(sectionId, `socials.${key}`, 'link') : {})} key={key} href={url} className={cn('text-sm transition-colors', className)}>{socialLabels[key] ?? key}</a>
      ))}
    </div>
  )
}

export function SiteFooterSection({ config, isEditing }: { config: SectionConfig; isEditing?: boolean }) {
  const content = (config.content ?? {}) as Partial<SiteFooterContent>
  const variant = config.variant ?? 'startup'
  const { accentColor } = config.style
  const columns = content.columns ?? []
  const socials = content.socials ?? {}
  const logo = content.logo ?? 'Logo'

  // ─── VARIANT: corporate ───
  // Univers entreprise : fond navy, structuré, professionnel, bottom bar avec liens légaux
  if (variant === 'corporate') {
    return (
      <footer className="bg-slate-900 px-6 pt-14 pb-6 border-t border-slate-700/50" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-10 sm:grid-cols-5 mb-12">
            <div className="sm:col-span-2">
              <p {...elementProps(config.id, 'logo', 'image')} className="font-semibold text-lg text-white tracking-wide mb-3">{renderLogo(logo, 'font-semibold text-lg text-white tracking-wide')}</p>
              {content.tagline && <p className="text-sm text-slate-400 leading-relaxed max-w-xs">{content.tagline}</p>}
              <div className="mt-5">
                <SocialsRow socials={socials} className="text-slate-500 hover:text-blue-400" sectionId={config.id} />
              </div>
            </div>
            {columns.map((col, ci) => (
              <div key={col.id || `col-${ci}`}>
                <p {...elementProps(config.id, `columns.${ci}.title`, 'heading')} className="font-semibold text-sm text-white mb-4">{col.title}</p>
                <ul className="space-y-2.5">
                  {col.links.map((link, li) => (
                    <li key={link.id || `${ci}-${li}`}><a {...elementProps(config.id, `columns.${ci}.links.${li}.label`, 'link')} href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">{link.label}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-700/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p {...elementProps(config.id, 'copyright', 'text')} className="text-xs text-slate-500">{content.copyright}</p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Mentions légales</a>
              <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Politique de confidentialité</a>
              <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">CGV</a>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  // ─── VARIANT: luxe ───
  // Univers luxe : centré, espacé, accent doré, typographie fine, respirant
  if (variant === 'luxe') {
    const gold = accentColor ?? '#b8860b'
    const customBg = config.style.customBgColor
    const hasColumnTitles = columns.some(col => col.title)

    if (hasColumnTitles) {
      // Multi-column layout when columns have titles
      return (
        <footer className="bg-zinc-950 px-6 pt-20 pb-10 relative overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)', ...(customBg ? { backgroundColor: customBg } : { backgroundColor: '#09090b' }) }}>
          <div className="max-w-6xl mx-auto relative z-[2]">
            <div className={cn('grid gap-10 mb-14', columns.length >= 2 ? 'sm:grid-cols-3' : 'sm:grid-cols-2')}>
              {/* Brand column */}
              <div>
                <div {...elementProps(config.id, 'logo', 'image')} className="text-xl font-light tracking-[0.25em] uppercase text-white mb-4">{renderLogo(logo, 'text-xl font-light tracking-[0.25em] uppercase text-white')}</div>
                {content.tagline && <p className="text-sm text-white/40 leading-relaxed tracking-wide mb-6">{content.tagline}</p>}
                <SocialsRow socials={socials} className="text-white/30 hover:text-white" sectionId={config.id} />
              </div>
              {/* Link columns */}
              {columns.map((col, ci) => (
                <div key={col.id || `col-${ci}`}>
                  <p {...elementProps(config.id, `columns.${ci}.title`, 'heading')} className="text-xs font-medium tracking-[0.15em] uppercase text-white/50 mb-5">{col.title}</p>
                  <ul className="space-y-3">
                    {col.links.map((link, li) => (
                      <li key={link.id || `${ci}-${li}`}>
                        <a {...elementProps(config.id, `columns.${ci}.links.${li}.label`, 'link')} href={link.href} className="text-sm font-medium tracking-[0.08em] uppercase text-white/70 hover:text-white transition-colors">{link.label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {/* Bottom bar */}
            <div className="border-t border-white/10 pt-6">
              <p {...elementProps(config.id, 'copyright', 'text')} className="text-[11px] text-white/25 tracking-wide text-center">{content.copyright}</p>
            </div>
          </div>
        </footer>
      )
    }

    // Single-column centered layout (no column titles)
    return (
      <footer className="bg-zinc-950 px-6 pt-20 pb-10 relative overflow-hidden" style={{ fontFamily: 'var(--font-body, inherit)', ...(customBg ? { backgroundColor: customBg } : { backgroundColor: '#09090b' }) }}>
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-10 relative z-[2]">
          <div {...elementProps(config.id, 'logo', 'image')} className="text-2xl font-light tracking-[0.25em] uppercase text-white">{renderLogo(logo, 'text-2xl font-light tracking-[0.25em] uppercase text-white')}</div>
          {content.tagline && <p className="text-sm text-white/40 max-w-md tracking-wide">{content.tagline}</p>}
          {/* Gold divider */}
          <div className="w-16 h-px" style={{ background: gold }} />
          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3" style={{ backgroundColor: 'transparent' }}>
            {columns.flatMap((col, ci) => col.links.map((link, li) => ({ link, ci, li }))).map(({ link, ci, li }) => (
              <a {...elementProps(config.id, `columns.${ci}.links.${li}.label`, 'link')} key={`${ci}-${li}-${link.id || link.label}`} href={link.href} className="text-xs tracking-[0.15em] uppercase transition-colors" style={{ color: 'rgba(255,255,255,0.5)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#FFFFFF' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)' }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          {/* Socials */}
          <SocialsRow socials={socials} className="text-white/30 hover:text-white text-xs tracking-[0.1em] uppercase" sectionId={config.id} />
          <p {...elementProps(config.id, 'copyright', 'text')} className="text-[11px] text-white/25 tracking-wide">{content.copyright}</p>
        </div>
      </footer>
    )
  }

  // ─── VARIANT: startup (default) ───
  // Univers SaaS : moderne, colonnes clean, CTA, badges
  if (variant === 'startup') {
    const accent = accentColor ?? '#6366f1'
    return (
      <footer className="bg-zinc-950 px-6 pt-16 pb-8 border-t border-zinc-800" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-6xl mx-auto">
          <div className={cn('grid gap-10 mb-14', columns.length >= 3 ? 'sm:grid-cols-4' : 'sm:grid-cols-3')}>
            <div>
              <div {...elementProps(config.id, 'logo', 'image')} className="font-bold text-xl text-white tracking-tight mb-3">{renderLogo(logo, 'font-bold text-xl text-white tracking-tight')}</div>
              {content.tagline && <p className="text-sm text-zinc-400 leading-relaxed">{content.tagline}</p>}
              <div className="mt-5">
                <SocialsRow socials={socials} className="text-zinc-500 hover:text-white" sectionId={config.id} />
              </div>
            </div>
            {columns.map((col, ci) => (
              <div key={col.id || `col-${ci}`}>
                <p {...elementProps(config.id, `columns.${ci}.title`, 'heading')} className="font-semibold text-sm text-white mb-4">{col.title}</p>
                <ul className="space-y-2.5">
                  {col.links.map((link, li) => (
                    <li key={link.id || `${ci}-${li}`}><a {...elementProps(config.id, `columns.${ci}.links.${li}.label`, 'link')} href={link.href} className="text-sm text-zinc-500 hover:text-white transition-colors">{link.label}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {/* Bottom bar */}
          <div className="border-t border-zinc-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p {...elementProps(config.id, 'copyright', 'text')} className="text-xs text-zinc-600">{content.copyright}</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
              <span className="text-xs text-zinc-500">Tous les systèmes opérationnels</span>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  // ─── VARIANT: creative ───
  // Univers agence : néobrutalist, typo bold, fond crème, bordure épaisse, audacieux
  if (variant === 'creative') {
    return (
      <footer className="bg-[#f5f0e8] px-6 pt-16 pb-8 border-t-[3px] border-zinc-900" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-10 sm:grid-cols-2 mb-14">
            {/* Brand */}
            <div>
              <div {...elementProps(config.id, 'logo', 'image')} className="font-black text-4xl md:text-5xl text-zinc-900 tracking-tight mb-4">{renderLogo(logo, 'font-black text-4xl md:text-5xl text-zinc-900 tracking-tight')}</div>
              {content.tagline && <p className="text-base text-zinc-600 max-w-sm">{content.tagline}</p>}
            </div>
            {/* Links in grid */}
            <div className={cn('grid gap-6', columns.length >= 3 ? 'grid-cols-3' : 'grid-cols-2')}>
              {columns.map((col, ci) => (
                <div key={col.id || `col-${ci}`}>
                  <p {...elementProps(config.id, `columns.${ci}.title`, 'heading')} className="font-bold text-xs uppercase tracking-wider text-zinc-900 mb-4">{col.title}</p>
                  <ul className="space-y-2">
                    {col.links.map((link, li) => (
                      <li key={link.id || `${ci}-${li}`}><a {...elementProps(config.id, `columns.${ci}.links.${li}.label`, 'link')} href={link.href} className="text-sm text-zinc-600 hover:text-orange-600 transition-colors">{link.label}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          {/* Bottom */}
          <div className="border-t-2 border-zinc-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p {...elementProps(config.id, 'copyright', 'text')} className="text-xs text-zinc-500 font-medium">{content.copyright}</p>
            <SocialsRow socials={socials} className="text-xs font-bold uppercase tracking-wider text-zinc-900 hover:text-orange-600" sectionId={config.id} />
          </div>
        </div>
      </footer>
    )
  }

  // ─── VARIANT: ecommerce ───
  // Univers boutique : riche, newsletter intégrée, paiement, colonnes multiples
  if (variant === 'ecommerce') {
    const accent = accentColor ?? '#059669'
    return (
      <footer className="bg-zinc-900 px-6" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        {/* Newsletter band */}
        <div className="max-w-7xl mx-auto py-10 border-b border-zinc-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-semibold text-white">Inscrivez-vous à notre newsletter</p>
              <p className="text-sm text-zinc-400 mt-1">Offres exclusives et nouveautés en avant-première.</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="email"
                placeholder="votre@email.com"
                className="h-10 px-4 rounded-lg text-sm flex-1 sm:w-60 outline-none bg-zinc-800 text-white placeholder:text-zinc-500 border border-zinc-700"
              />
              <button className="h-10 px-5 rounded-lg text-sm font-semibold text-white transition-colors hover:brightness-110" style={{ backgroundColor: accent }}>
                S&apos;inscrire
              </button>
            </div>
          </div>
        </div>
        {/* Columns */}
        <div className="max-w-7xl mx-auto py-10">
          <div className={cn('grid gap-8', columns.length >= 4 ? 'sm:grid-cols-5' : 'sm:grid-cols-4')}>
            <div>
              <p {...elementProps(config.id, 'logo', 'image')} className="font-bold text-lg text-white mb-3">{renderLogo(logo, 'font-bold text-lg text-white')}</p>
              {content.tagline && <p className="text-sm text-zinc-400">{content.tagline}</p>}
              <div className="mt-4">
                <SocialsRow socials={socials} className="text-zinc-500 hover:text-white" sectionId={config.id} />
              </div>
            </div>
            {columns.map((col, ci) => (
              <div key={col.id || `col-${ci}`}>
                <p {...elementProps(config.id, `columns.${ci}.title`, 'heading')} className="font-semibold text-sm text-white mb-3">{col.title}</p>
                <ul className="space-y-2">
                  {col.links.map((link, li) => (
                    <li key={link.id || `${ci}-${li}`}><a {...elementProps(config.id, `columns.${ci}.links.${li}.label`, 'link')} href={link.href} className="text-sm text-zinc-400 hover:text-white transition-colors">{link.label}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        {/* Bottom with payment methods */}
        <div className="max-w-7xl mx-auto border-t border-zinc-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p {...elementProps(config.id, 'copyright', 'text')} className="text-xs text-zinc-600">{content.copyright}</p>
          <div className="flex items-center gap-3">
            {['Visa', 'Mastercard', 'PayPal', 'Apple Pay'].map(m => (
              <span key={m} className="text-[10px] font-medium text-zinc-500 bg-zinc-800 px-2 py-1 rounded">{m}</span>
            ))}
          </div>
        </div>
      </footer>
    )
  }

  // ─── VARIANT: glass ───
  // Univers tech/IA : glassmorphism, dark, blur, glow effects
  if (variant === 'glass') {
    const accent = accentColor ?? '#818cf8'
    return (
      <footer className="bg-zinc-950 px-6 pt-16 pb-8 border-t border-white/[0.06]" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-6xl mx-auto">
          {/* Glow card */}
          <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/[0.08] p-10 mb-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <div {...elementProps(config.id, 'logo', 'image')} className="font-bold text-xl text-white tracking-tight mb-2">{renderLogo(logo, 'font-bold text-xl text-white tracking-tight')}</div>
                {content.tagline && <p className="text-sm text-white/40 max-w-md">{content.tagline}</p>}
              </div>
              <div className={cn('grid gap-8', columns.length >= 3 ? 'grid-cols-3' : 'grid-cols-2')}>
                {columns.map((col, ci) => (
                  <div key={col.id || `col-${ci}`}>
                    <p {...elementProps(config.id, `columns.${ci}.title`, 'heading')} className="font-medium text-xs text-white/30 uppercase tracking-wider mb-3">{col.title}</p>
                    <ul className="space-y-2">
                      {col.links.map((link, li) => (
                        <li key={link.id || `${ci}-${li}`}>
                          <a {...elementProps(config.id, `columns.${ci}.links.${li}.label`, 'link')} href={link.href} className="text-sm text-white/50 hover:text-white transition-colors">{link.label}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Bottom */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p {...elementProps(config.id, 'copyright', 'text')} className="text-xs text-white/20">{content.copyright}</p>
            <div className="flex items-center gap-4">
              <SocialsRow socials={socials} className="text-white/30 hover:text-white text-xs" sectionId={config.id} />
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accent, boxShadow: `0 0 10px ${accent}60` }} />
            </div>
          </div>
        </div>
      </footer>
    )
  }

  // ─── VARIANT: canopy ───
  // Univers eco e-commerce : fond near-black #1A1A1A, multi-colonnes, sustainability badge, Allbirds-inspired
  if (variant === 'canopy') {
    const headingFont = "'GeneralSans Variable', sans-serif"
    const bodyFont = "'Inter Variable', sans-serif"
    // Split columns: first column = main links (large), rest = secondary groups
    const mainCol = columns[0]
    const secondaryCols = columns.slice(1)
    return (
      <footer
        {...elementProps(config.id, 'wrapper', 'container', 'Footer')}
        className="relative"
        style={{ backgroundColor: '#1A1A1A', color: '#E8E8E5', fontFamily: bodyFont }}
      >
        {/* Inject hover animations for text-mask effect */}
        <style>{`
          .canopy-link-mask { overflow: hidden; height: 1.5em; position: relative; display: block; }
          .canopy-link-mask .canopy-text-main { display: block; transition: transform 0.3s ease; }
          .canopy-link-mask .canopy-text-alt { position: absolute; top: 100%; left: 0; display: block; transition: transform 0.3s ease; }
          .canopy-link-mask:hover .canopy-text-main,
          .canopy-link-mask:hover .canopy-text-alt { transform: translateY(-100%); }
          @media (max-width: 768px) {
            .canopy-resp-footer-top { flex-direction: column !important; }
            .canopy-resp-links-area { flex-direction: column !important; }
          }
        `}</style>

        <div {...elementProps(config.id, 'footerInner', 'container', 'Footer Inner')} style={{ paddingTop: 'clamp(60px, 10vw, 120px)', paddingLeft: 'clamp(20px, 5vw, 60px)', paddingRight: 'clamp(20px, 5vw, 60px)' }}>
          {/* Footer top */}
          <div {...elementProps(config.id, 'footerTop', 'container', 'Footer Top')} className="flex flex-row canopy-resp-footer-top" style={{ gap: 'clamp(30px, 10vw, 150px)', paddingBottom: 60 }}>
            {/* LEFT column: logo + description + social */}
            <div {...elementProps(config.id, 'brandCol', 'container', 'Brand Column')} className="flex-shrink-0 flex flex-col" style={{ flex: '1 1 auto', maxWidth: '312px' }}>
              <p
                {...elementProps(config.id, 'logo', 'image')}
                style={{ fontFamily: headingFont, fontSize: 28, fontWeight: 600, color: '#FAFAF8', marginBottom: 30 }}
              >
                {renderLogo(logo)}<sup style={{ fontSize: '0.5em', verticalAlign: 'super' }}>&reg;</sup>
              </p>
              {(content.tagline) && (
                <p
                  {...elementProps(config.id, 'tagline', 'text')}
                  style={{ fontFamily: bodyFont, fontSize: 16, fontWeight: 400, lineHeight: '150%', color: 'rgba(232,232,229,0.7)' }}
                >
                  {content.tagline}
                </p>
              )}
              {/* Social icons row */}
              <div {...elementProps(config.id, 'socialsRow', 'container', 'Social Icons')} className="flex flex-row items-center" style={{ marginTop: 24, gap: 16 }}>
                {/* Instagram */}
                <a
                  {...elementProps(config.id, 'socials.instagram', 'link')}
                  href={socials.instagram ?? '#'}
                  aria-label="Instagram"
                  style={{ color: '#E8E8E5', transition: 'transform 0.5s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.2)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                {/* X (Twitter) */}
                <a
                  {...elementProps(config.id, 'socials.twitter', 'link')}
                  href={socials.twitter ?? '#'}
                  aria-label="X"
                  style={{ color: '#E8E8E5', transition: 'transform 0.5s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.2)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                {/* LinkedIn */}
                <a
                  {...elementProps(config.id, 'socials.linkedin', 'link')}
                  href={socials.linkedin ?? '#'}
                  aria-label="LinkedIn"
                  style={{ color: '#E8E8E5', transition: 'transform 0.5s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.2)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* RIGHT area */}
            <div {...elementProps(config.id, 'linksArea', 'container', 'Links Area')} className="flex-1 flex flex-row justify-between canopy-resp-links-area" style={{ gap: 'clamp(24px, 6vw, 100px)' }}>
              {/* Main links column — large text with padding-left hover */}
              {mainCol && (
                <div className="flex-1 flex flex-col" style={{ gap: 12 }}>
                  {mainCol.links.map((link, li) => (
                    <a
                      key={link.id || `0-${li}`}
                      {...elementProps(config.id, `columns.0.links.${li}.label`, 'link')}
                      href={link.href}
                      className="block"
                      style={{
                        fontFamily: headingFont,
                        fontWeight: 500,
                        fontSize: 'clamp(1.125rem, 0.5357rem + 2.619vw, 2.5rem)',
                        lineHeight: '125%',
                        color: '#E8E8E5',
                        textDecoration: 'none',
                        paddingLeft: 0,
                        transition: 'padding 0.5s ease',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.paddingLeft = '10px' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.paddingLeft = '0px' }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}

              {/* Secondary links columns — text mask hover effect */}
              {secondaryCols.length > 0 && (
                <div className="flex-1 flex flex-col justify-between" style={{ gap: 'clamp(24px, 5vw, 80px)' }}>
                  {secondaryCols.map((col, ci) => {
                    const colIndex = ci + 1
                    return (
                      <div key={col.id || `col-${ci}`}>
                        <p
                          {...elementProps(config.id, `columns.${colIndex}.title`, 'heading')}
                          style={{ fontSize: 16, fontWeight: 500, color: 'rgba(232,232,229,0.4)', marginBottom: 12 }}
                        >
                          {col.title}
                        </p>
                        <div className="flex flex-col" style={{ gap: 4 }}>
                          {col.links.map((link, li) => (
                            <a
                              key={link.id || `${ci}-${li}`}
                              {...elementProps(config.id, `columns.${colIndex}.links.${li}.label`, 'link')}
                              href={link.href}
                              className="canopy-link-mask"
                              style={{ color: '#E8E8E5', textDecoration: 'none', fontSize: 14 }}
                            >
                              <span className="canopy-text-main">{link.label}</span>
                              <span className="canopy-text-alt">{link.label}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sustainability line */}
        <div
          style={{
            textAlign: 'center',
            padding: '0 clamp(20px, 5vw, 60px)',
            paddingBottom: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2D5016" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75" />
            </svg>
            <span style={{ fontSize: 13, fontWeight: 400, color: 'rgba(232,232,229,0.5)', letterSpacing: '0.02em' }}>
              Engag&eacute;s pour un avenir durable
            </span>
          </div>
        </div>

        {/* Footer bottom bar */}
        <div
          {...elementProps(config.id, 'bottomBar', 'container', 'Footer Bottom')}
          className="flex flex-wrap items-center justify-between"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '32px clamp(20px, 5vw, 60px)', gap: 16 }}
        >
          <p
            {...elementProps(config.id, 'copyright', 'text')}
            style={{ color: 'rgba(232,232,229,0.4)', textDecoration: 'none', fontSize: 14, margin: 0 }}
          >
            {content.copyright ?? `\u00A9 ${new Date().getFullYear()} Canopy. Tous droits r\u00E9serv\u00E9s.`}
          </p>
          <span
            {...elementProps(config.id, 'poweredBy', 'text')}
            style={{ color: 'rgba(232,232,229,0.4)', fontSize: 14 }}
          >
            Powered by Canopy
          </span>
        </div>
      </footer>
    )
  }

  // ─── VARIANT: obscura ───
  // Univers photographe premium : fond noir #0A0A0A, or #D4A853, GeneralSans + Inter, text mask hover
  if (variant === 'obscura') {
    const headingFont = "'GeneralSans Variable', sans-serif"
    const bodyFont = "'Inter Variable', sans-serif"
    const mainCol = columns[0]
    const secondaryCols = columns.slice(1)
    return (
      <footer
        {...elementProps(config.id, 'wrapper', 'container', 'Footer')}
        className="relative"
        style={{ backgroundColor: '#0A0A0A', color: '#E8E4DF', fontFamily: bodyFont }}
      >
        {/* Inject hover animations for text-mask effect */}
        <style>{`
          .obscura-link-mask { overflow: hidden; height: 1.5em; position: relative; display: block; }
          .obscura-link-mask .obscura-text-main { display: block; transition: transform 0.3s ease; }
          .obscura-link-mask .obscura-text-alt { position: absolute; top: 100%; left: 0; display: block; transition: transform 0.3s ease; }
          .obscura-link-mask:hover .obscura-text-main,
          .obscura-link-mask:hover .obscura-text-alt { transform: translateY(-100%); }
          @media (max-width: 768px) {
            .obscura-resp-footer-top { flex-direction: column !important; }
            .obscura-resp-links-area { flex-direction: column !important; }
          }
        `}</style>

        <div {...elementProps(config.id, 'footerInner', 'container', 'Footer Inner')} style={{ paddingTop: 'clamp(60px, 10vw, 120px)', paddingLeft: 'clamp(20px, 5vw, 60px)', paddingRight: 'clamp(20px, 5vw, 60px)' }}>
          {/* Footer top */}
          <div {...elementProps(config.id, 'footerTop', 'container', 'Footer Top')} className="flex flex-row obscura-resp-footer-top" style={{ gap: 'clamp(30px, 10vw, 150px)', paddingBottom: 60 }}>
            {/* LEFT column: logo + description + social */}
            <div {...elementProps(config.id, 'brandCol', 'container', 'Brand Column')} className="flex-shrink-0 flex flex-col" style={{ flex: '1 1 auto', maxWidth: '312px' }}>
              <p
                {...elementProps(config.id, 'logo', 'image')}
                style={{ fontFamily: headingFont, fontSize: 28, fontWeight: 600, color: '#E8E4DF', marginBottom: 30, textTransform: 'uppercase', letterSpacing: '0.1em' }}
              >
                {renderLogo(logo)}
              </p>
              {(content.tagline) && (
                <p
                  {...elementProps(config.id, 'tagline', 'text')}
                  style={{ fontFamily: bodyFont, fontSize: 16, fontWeight: 400, lineHeight: '150%', color: '#8A8480' }}
                >
                  {content.tagline}
                </p>
              )}
              {/* Social icons row */}
              <div {...elementProps(config.id, 'socialsRow', 'container', 'Social Icons')} className="flex flex-row items-center" style={{ marginTop: 24, gap: 16 }}>
                {/* Instagram */}
                <a
                  {...elementProps(config.id, 'socials.instagram', 'link')}
                  href={socials.instagram ?? '#'}
                  aria-label="Instagram"
                  style={{ color: '#E8E4DF', transition: 'transform 0.5s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.2)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                {/* Behance */}
                <a
                  {...elementProps(config.id, 'socials.behance', 'link')}
                  href={(socials as Record<string, string | undefined>).behance ?? '#'}
                  aria-label="Behance"
                  style={{ color: '#E8E4DF', transition: 'transform 0.5s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.2)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.5 11c2.5 0 2.5-3.5 0-3.5H3v3.5h4.5zm1 2H3v4h5.5c2.7 0 2.7-4 0-4zm5.5-.5c0-1 .8-1.8 1.8-1.8s1.7.8 1.7 1.8h-3.5zM22 12.5c0-.3 0-.6-.1-.8h-7.9c.2-2.2 3.5-2.5 4.8-.7h2.6C20 8.4 17 7.2 14.8 8.4 12.5 9.6 12 13 13.5 15c1.5 2 5 2 6.8 0 .5-.6.7-1.5.7-2.5zM15 7h5V5.5h-5V7z" />
                  </svg>
                </a>
                {/* Vimeo */}
                <a
                  {...elementProps(config.id, 'socials.vimeo', 'link')}
                  href={(socials as Record<string, string | undefined>).vimeo ?? '#'}
                  aria-label="Vimeo"
                  style={{ color: '#E8E4DF', transition: 'transform 0.5s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.2)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 7.42c-.1 2.15-1.6 5.08-4.52 8.82C14.44 20.05 11.87 22 9.82 22c-1.27 0-2.34-1.17-3.22-3.53L4.85 12.3C4.25 9.94 3.6 8.76 2.9 8.76c-.16 0-.73.34-1.7 1.02L0 8.32c1.07-.94 2.12-1.88 3.16-2.82C4.56 4.3 5.6 3.68 6.3 3.62c1.74-.17 2.82 1.02 3.22 3.58.44 2.76.74 4.47.92 5.15.51 2.32 1.07 3.48 1.68 3.48.47 0 1.18-.75 2.14-2.24.95-1.5 1.46-2.64 1.53-3.42.14-1.3-.37-1.95-1.53-1.95-.55 0-1.11.12-1.69.37 1.12-3.67 3.26-5.45 6.43-5.35 2.35.07 3.46 1.6 3.32 4.58z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* RIGHT area */}
            <div {...elementProps(config.id, 'linksArea', 'container', 'Links Area')} className="flex-1 flex flex-row justify-between obscura-resp-links-area" style={{ gap: 'clamp(24px, 6vw, 100px)' }}>
              {/* Main links column — large text with padding-left hover */}
              {mainCol && (
                <div className="flex-1 flex flex-col" style={{ gap: 12 }}>
                  {mainCol.links.map((link, li) => (
                    <a
                      key={link.id || `0-${li}`}
                      {...elementProps(config.id, `columns.0.links.${li}.label`, 'link')}
                      href={link.href}
                      className="block"
                      style={{
                        fontFamily: headingFont,
                        fontWeight: 500,
                        fontSize: 'clamp(1.125rem, 0.5357rem + 2.619vw, 2.5rem)',
                        lineHeight: '125%',
                        color: '#E8E4DF',
                        textDecoration: 'none',
                        paddingLeft: 0,
                        transition: 'padding 0.5s ease',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.paddingLeft = '10px' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.paddingLeft = '0px' }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}

              {/* Secondary links column — text mask hover effect */}
              {secondaryCols.length > 0 && (
                <div className="flex-1 flex flex-col justify-between" style={{ gap: 'clamp(24px, 5vw, 80px)' }}>
                  {secondaryCols.map((col, ci) => {
                    const colIndex = ci + 1
                    return (
                      <div key={col.id || `col-${ci}`}>
                        <p
                          {...elementProps(config.id, `columns.${colIndex}.title`, 'heading')}
                          style={{ fontSize: 16, fontWeight: 500, color: '#8A8480', marginBottom: 12 }}
                        >
                          {col.title}
                        </p>
                        <div className="flex flex-col" style={{ gap: 4 }}>
                          {col.links.map((link, li) => (
                            <a
                              key={link.id || `${ci}-${li}`}
                              {...elementProps(config.id, `columns.${colIndex}.links.${li}.label`, 'link')}
                              href={link.href}
                              className="obscura-link-mask"
                              style={{ color: '#E8E4DF', textDecoration: 'none', fontSize: 14 }}
                            >
                              <span className="obscura-text-main">{link.label}</span>
                              <span className="obscura-text-alt">{link.label}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer bottom bar */}
        <div
          {...elementProps(config.id, 'bottomBar', 'container', 'Footer Bottom')}
          className="flex flex-wrap items-center justify-between"
          style={{ borderTop: '1px solid rgba(212, 168, 83, 0.2)', padding: '32px clamp(20px, 5vw, 60px)', gap: 16 }}
        >
          <span
            {...elementProps(config.id, 'copyright', 'text')}
            style={{ color: '#8A8480', fontSize: 14 }}
          >
            {content.copyright ?? 'Obscura Photography'}
          </span>
          <span
            {...elementProps(config.id, 'poweredBy', 'text')}
            style={{ color: '#8A8480', fontSize: 14 }}
          >
            Powered by JL Studio
          </span>
        </div>
      </footer>
    )
  }

  // ─── VARIANT: nacre ───
  // Univers premium nail salon : fond rose poudré #F5E6E0, GeneralSans + Inter, grands liens hover-slide, text mask hover
  if (variant === 'nacre') {
    const headingFont = "'GeneralSans Variable', sans-serif"
    const bodyFont = "'Inter Variable', sans-serif"
    const mainCol = columns[0]
    const secondaryCols = columns.slice(1)
    return (
      <footer
        {...elementProps(config.id, 'wrapper', 'container', 'Footer')}
        className="relative"
        style={{ backgroundColor: '#F5E6E0', color: '#2A1A1E', fontFamily: bodyFont }}
      >
        {/* Inject hover animations for text-mask effect */}
        <style>{`
          .nacre-link-mask { overflow: hidden; height: 1.5em; position: relative; display: block; }
          .nacre-link-mask .nacre-text-main { display: block; transition: transform 0.3s ease; }
          .nacre-link-mask .nacre-text-alt { position: absolute; top: 100%; left: 0; display: block; transition: transform 0.3s ease; }
          .nacre-link-mask:hover .nacre-text-main,
          .nacre-link-mask:hover .nacre-text-alt { transform: translateY(-100%); }
          @media (max-width: 768px) {
            .nacre-resp-footer-top { flex-direction: column !important; }
            .nacre-resp-links-area { flex-direction: column !important; }
          }
        `}</style>

        <div {...elementProps(config.id, 'footerInner', 'container', 'Footer Inner')} style={{ paddingTop: 'clamp(60px, 10vw, 120px)', paddingLeft: 'clamp(20px, 5vw, 60px)', paddingRight: 'clamp(20px, 5vw, 60px)' }}>
          {/* Footer top */}
          <div {...elementProps(config.id, 'footerTop', 'container', 'Footer Top')} className="flex flex-row nacre-resp-footer-top" style={{ gap: 'clamp(30px, 10vw, 150px)', paddingBottom: 60 }}>
            {/* LEFT column: logo + description + social */}
            <div {...elementProps(config.id, 'brandCol', 'container', 'Brand Column')} className="flex-shrink-0 flex flex-col" style={{ flex: '1 1 auto', maxWidth: '312px' }}>
              <p
                {...elementProps(config.id, 'logo', 'image')}
                style={{ fontFamily: headingFont, fontSize: 28, fontWeight: 600, color: '#2A1A1E', marginBottom: 30 }}
              >
                {renderLogo(logo)}<sup style={{ fontSize: '0.5em', verticalAlign: 'super' }}>&reg;</sup>
              </p>
              {(content.tagline) && (
                <p
                  {...elementProps(config.id, 'tagline', 'text')}
                  style={{ fontFamily: bodyFont, fontSize: 16, fontWeight: 400, lineHeight: '150%', color: '#2A1A1E' }}
                >
                  {content.tagline}
                </p>
              )}
              {/* Social icons row */}
              <div {...elementProps(config.id, 'socialsRow', 'container', 'Social Icons')} className="flex flex-row items-center" style={{ marginTop: 24, gap: 16 }}>
                {/* Instagram */}
                <a
                  {...elementProps(config.id, 'socials.instagram', 'link')}
                  href={socials.instagram ?? '#'}
                  aria-label="Instagram"
                  style={{ color: '#2A1A1E', transition: 'transform 0.5s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.2)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                {/* Pinterest */}
                <a
                  {...elementProps(config.id, 'socials.pinterest', 'link')}
                  href={(socials as Record<string, string | undefined>).pinterest ?? '#'}
                  aria-label="Pinterest"
                  style={{ color: '#2A1A1E', transition: 'transform 0.5s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.2)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                  </svg>
                </a>
                {/* TikTok */}
                <a
                  {...elementProps(config.id, 'socials.tiktok', 'link')}
                  href={(socials as Record<string, string | undefined>).tiktok ?? '#'}
                  aria-label="TikTok"
                  style={{ color: '#2A1A1E', transition: 'transform 0.5s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.2)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.75a8.18 8.18 0 004.76 1.52V6.84a4.84 4.84 0 01-1-.15z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* RIGHT area */}
            <div {...elementProps(config.id, 'linksArea', 'container', 'Links Area')} className="flex-1 flex flex-row justify-between nacre-resp-links-area" style={{ gap: 'clamp(24px, 6vw, 100px)' }}>
              {/* Main links column — large text with padding-left hover */}
              {mainCol && (
                <div className="flex-1 flex flex-col" style={{ gap: 12 }}>
                  {mainCol.links.map((link, li) => (
                    <a
                      key={link.id || `0-${li}`}
                      {...elementProps(config.id, `columns.0.links.${li}.label`, 'link')}
                      href={link.href}
                      className="block"
                      style={{
                        fontFamily: headingFont,
                        fontWeight: 500,
                        fontSize: 'clamp(1.125rem, 0.5357rem + 2.619vw, 2.5rem)',
                        lineHeight: '125%',
                        color: '#2A1A1E',
                        textDecoration: 'none',
                        paddingLeft: 0,
                        transition: 'padding 0.5s ease',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.paddingLeft = '10px' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.paddingLeft = '0px' }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}

              {/* Secondary links column — text mask hover effect */}
              {secondaryCols.length > 0 && (
                <div className="flex-1 flex flex-col justify-between" style={{ gap: 'clamp(24px, 5vw, 80px)' }}>
                  {secondaryCols.map((col, ci) => {
                    const colIndex = ci + 1
                    return (
                      <div key={col.id || `col-${ci}`}>
                        <p
                          {...elementProps(config.id, `columns.${colIndex}.title`, 'heading')}
                          style={{ fontSize: 16, fontWeight: 500, color: '#8A7A75', marginBottom: 12 }}
                        >
                          {col.title}
                        </p>
                        <div className="flex flex-col" style={{ gap: 4 }}>
                          {col.links.map((link, li) => (
                            <a
                              key={link.id || `${ci}-${li}`}
                              {...elementProps(config.id, `columns.${colIndex}.links.${li}.label`, 'link')}
                              href={link.href}
                              className="nacre-link-mask"
                              style={{ color: '#2A1A1E', textDecoration: 'none', fontSize: 14 }}
                            >
                              <span className="nacre-text-main">{link.label}</span>
                              <span className="nacre-text-alt">{link.label}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer bottom bar */}
        <div
          {...elementProps(config.id, 'bottomBar', 'container', 'Footer Bottom')}
          className="flex flex-wrap items-center justify-between"
          style={{ borderTop: '1px solid #C9A96E', padding: '32px clamp(20px, 5vw, 60px)', gap: 16 }}
        >
          <a
            {...elementProps(config.id, 'copyright', 'link')}
            href="#"
            className="hover:underline"
            style={{ color: '#2A1A1E', textDecoration: 'none', fontSize: 14 }}
          >
            {content.copyright ?? 'Nacre Studio'}
          </a>
          <span
            {...elementProps(config.id, 'poweredBy', 'text')}
            style={{ color: '#8A7A75', fontSize: 14 }}
          >
            Powered by Nacre
          </span>
        </div>
      </footer>
    )
  }

  // ─── VARIANT: brixsa ───
  // Univers premium real estate : fond crème #f6efe5, GeneralSans + Inter, grands liens hover-slide, text mask hover
  if (variant === 'brixsa') {
    const headingFont = "'GeneralSans Variable', sans-serif"
    const bodyFont = "'Inter Variable', sans-serif"
    // Split columns: first column = main links (large), rest = secondary groups
    const mainCol = columns[0]
    const secondaryCols = columns.slice(1)
    return (
      <footer
        {...elementProps(config.id, 'wrapper', 'container', 'Footer')}
        className="relative"
        style={{ backgroundColor: '#f6efe5', color: '#140c08', fontFamily: bodyFont }}
      >
        {/* Inject hover animations for text-mask effect */}
        <style>{`
          .brixsa-link-mask { overflow: hidden; height: 1.5em; position: relative; display: block; }
          .brixsa-link-mask .brixsa-text-main { display: block; transition: transform 0.3s ease; }
          .brixsa-link-mask .brixsa-text-alt { position: absolute; top: 100%; left: 0; display: block; transition: transform 0.3s ease; }
          .brixsa-link-mask:hover .brixsa-text-main,
          .brixsa-link-mask:hover .brixsa-text-alt { transform: translateY(-100%); }
          @media (max-width: 768px) {
            .brixsa-resp-footer-top { flex-direction: column !important; }
            .brixsa-resp-links-area { flex-direction: column !important; }
          }
        `}</style>

        <div {...elementProps(config.id, 'footerInner', 'container', 'Footer Inner')} style={{ paddingTop: 'clamp(60px, 10vw, 120px)', paddingLeft: 'clamp(20px, 5vw, 60px)', paddingRight: 'clamp(20px, 5vw, 60px)' }}>
          {/* Footer top */}
          <div {...elementProps(config.id, 'footerTop', 'container', 'Footer Top')} className="flex flex-row brixsa-resp-footer-top" style={{ gap: 'clamp(30px, 10vw, 150px)', paddingBottom: 60 }}>
            {/* LEFT column: logo + description + social */}
            <div {...elementProps(config.id, 'brandCol', 'container', 'Brand Column')} className="flex-shrink-0 flex flex-col" style={{ flex: '1 1 auto', maxWidth: '312px' }}>
              <p
                {...elementProps(config.id, 'logo', 'image')}
                style={{ fontFamily: headingFont, fontSize: 28, fontWeight: 600, color: '#140c08', marginBottom: 30 }}
              >
                {renderLogo(logo)}<sup style={{ fontSize: '0.5em', verticalAlign: 'super' }}>&reg;</sup>
              </p>
              {(content.tagline) && (
                <p
                  {...elementProps(config.id, 'tagline', 'text')}
                  style={{ fontFamily: bodyFont, fontSize: 16, fontWeight: 400, lineHeight: '150%', color: '#140c08' }}
                >
                  {content.tagline}
                </p>
              )}
              {/* Social icons row */}
              <div {...elementProps(config.id, 'socialsRow', 'container', 'Social Icons')} className="flex flex-row items-center" style={{ marginTop: 24, gap: 16 }}>
                {/* Instagram */}
                <a
                  {...elementProps(config.id, 'socials.instagram', 'link')}
                  href={socials.instagram ?? '#'}
                  aria-label="Instagram"
                  className="brixsa-social-icon"
                  style={{ color: '#140c08', transition: 'transform 0.5s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.2)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                {/* Facebook */}
                <a
                  {...elementProps(config.id, 'socials.facebook', 'link')}
                  href={(socials as Record<string, string | undefined>).facebook ?? '#'}
                  aria-label="Facebook"
                  style={{ color: '#140c08', transition: 'transform 0.5s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.2)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" />
                  </svg>
                </a>
                {/* X (Twitter) */}
                <a
                  {...elementProps(config.id, 'socials.twitter', 'link')}
                  href={socials.twitter ?? '#'}
                  aria-label="X"
                  style={{ color: '#140c08', transition: 'transform 0.5s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.2)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                {/* LinkedIn */}
                <a
                  {...elementProps(config.id, 'socials.linkedin', 'link')}
                  href={socials.linkedin ?? '#'}
                  aria-label="LinkedIn"
                  style={{ color: '#140c08', transition: 'transform 0.5s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.2)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* RIGHT area */}
            <div {...elementProps(config.id, 'linksArea', 'container', 'Links Area')} className="flex-1 flex flex-row justify-between brixsa-resp-links-area" style={{ gap: 'clamp(24px, 6vw, 100px)' }}>
              {/* Main links column — large text with padding-left hover */}
              {mainCol && (
                <div className="flex-1 flex flex-col" style={{ gap: 12 }}>
                  {mainCol.links.map((link, li) => (
                    <a
                      key={link.id || `0-${li}`}
                      {...elementProps(config.id, `columns.0.links.${li}.label`, 'link')}
                      href={link.href}
                      className="block"
                      style={{
                        fontFamily: headingFont,
                        fontWeight: 500,
                        fontSize: 'clamp(1.125rem, 0.5357rem + 2.619vw, 2.5rem)',
                        lineHeight: '125%',
                        color: '#140c08',
                        textDecoration: 'none',
                        paddingLeft: 0,
                        transition: 'padding 0.5s ease',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.paddingLeft = '10px' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.paddingLeft = '0px' }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}

              {/* Secondary links column — text mask hover effect */}
              {secondaryCols.length > 0 && (
                <div className="flex-1 flex flex-col justify-between" style={{ gap: 'clamp(24px, 5vw, 80px)' }}>
                  {secondaryCols.map((col, ci) => {
                    const colIndex = ci + 1
                    return (
                      <div key={col.id || `col-${ci}`}>
                        <p
                          {...elementProps(config.id, `columns.${colIndex}.title`, 'heading')}
                          style={{ fontSize: 16, fontWeight: 500, color: '#56595a', marginBottom: 12 }}
                        >
                          {col.title}
                        </p>
                        <div className="flex flex-col" style={{ gap: 4 }}>
                          {col.links.map((link, li) => (
                            <a
                              key={link.id || `${ci}-${li}`}
                              {...elementProps(config.id, `columns.${colIndex}.links.${li}.label`, 'link')}
                              href={link.href}
                              className="brixsa-link-mask"
                              style={{ color: '#140c08', textDecoration: 'none', fontSize: 14 }}
                            >
                              <span className="brixsa-text-main">{link.label}</span>
                              <span className="brixsa-text-alt">{link.label}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer bottom bar */}
        <div
          {...elementProps(config.id, 'bottomBar', 'container', 'Footer Bottom')}
          className="flex flex-wrap items-center justify-between"
          style={{ borderTop: '1px solid rgba(158,158,158,0.6)', padding: '32px clamp(20px, 5vw, 60px)', gap: 16 }}
        >
          <a
            {...elementProps(config.id, 'copyright', 'link')}
            href="#"
            className="hover:underline"
            style={{ color: '#140c08', textDecoration: 'none', fontSize: 14 }}
          >
            {content.copyright ?? 'Flowfye'}
          </a>
          <span
            {...elementProps(config.id, 'poweredBy', 'text')}
            style={{ color: '#140c08', fontSize: 14 }}
          >
            Powered by Brixsa
          </span>
        </div>
      </footer>
    )
  }

  // ─── VARIANT: zmr-agency ───
  // Agence mannequins : ultra-minimaliste noir, liens légaux centrés en gris, copyright
  if (variant === 'zmr-agency') {
    const links = content.columns?.[0]?.links ?? []
    return (
      <footer
        style={{ fontFamily: 'var(--font-body, inherit)', backgroundColor: '#000000', color: '#ffffff', padding: '32px clamp(20px, 5vw, 40px) 28px' }}
      >
        <div className="max-w-[1400px] mx-auto text-center">
          {/* Legal Links with dot separators */}
          <nav className="flex flex-wrap justify-center gap-4 mb-4" style={{ fontSize: '11px' }}>
            {links.map((link, i) => (
              <span key={link.id || `link-${i}`} className="flex items-center gap-4">
                {i > 0 && <span style={{ color: '#4b5563' }}>.</span>}
                <a
                  {...elementProps(config.id, `columns.0.links.${i}.label`, 'link')}
                  href={link.href}
                  style={{ color: '#6b7280', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseOver={(e) => (e.currentTarget.style.color = '#9ca3af')}
                  onMouseOut={(e) => (e.currentTarget.style.color = '#6b7280')}
                >
                  {link.label}
                </a>
              </span>
            ))}
          </nav>

          {/* Copyright */}
          <p
            {...elementProps(config.id, 'copyright', 'text')}
            style={{ fontSize: '11px', color: '#6b7280' }}
          >
            {content.copyright ?? `© ${new Date().getFullYear()} All rights reserved.`}
          </p>
        </div>
      </footer>
    )
  }

  // ─── VARIANT: braise ───
  // Univers restaurant gastronomique : fond noir profond #1A1209, crème #F5F0E8, or #C8A96E, burgundy #722F37
  if (variant === 'braise') {
    const headingFont = "'GeneralSans Variable', 'General Sans', sans-serif"
    const bodyFont = "'GeneralSans Variable', 'General Sans', sans-serif"
    const nearBlack = '#1A1209'
    const cream = '#F5F0E8'
    const gold = '#C8A96E'
    const textLight = '#E8E4DF'
    const textMuted = 'rgba(232,228,223,0.45)'
    return (
      <footer
        {...elementProps(config.id, 'wrapper', 'container', 'Footer')}
        className="relative"
        style={{ backgroundColor: nearBlack, color: textLight, fontFamily: bodyFont }}
      >
        {/* Inject hover animations for text-mask effect */}
        <style>{`
          .braise-link-mask { overflow: hidden; height: 1.5em; position: relative; display: block; }
          .braise-link-mask .braise-text-main { display: block; transition: transform 0.3s ease; }
          .braise-link-mask .braise-text-alt { position: absolute; top: 100%; left: 0; display: block; transition: transform 0.3s ease; }
          .braise-link-mask:hover .braise-text-main,
          .braise-link-mask:hover .braise-text-alt { transform: translateY(-100%); }
          @media (max-width: 768px) {
            .braise-resp-footer-cols { flex-direction: column !important; gap: 32px !important; }
          }
        `}</style>

        <div {...elementProps(config.id, 'footerInner', 'container', 'Footer Inner')} style={{ paddingTop: 'clamp(60px, 10vw, 100px)', paddingLeft: 'clamp(20px, 5vw, 60px)', paddingRight: 'clamp(20px, 5vw, 60px)' }}>
          {/* Logo + gold separator */}
          <div {...elementProps(config.id, 'brandArea', 'container', 'Brand Area')} className="flex flex-col items-center" style={{ marginBottom: 48 }}>
            <p
              {...elementProps(config.id, 'logo', 'image')}
              style={{ fontFamily: headingFont, fontSize: 32, fontWeight: 600, color: cream, letterSpacing: '0.05em', marginBottom: 20 }}
            >
              {renderLogo(logo)}
            </p>
            <div style={{ width: 60, height: 1, backgroundColor: gold }} />
          </div>

          {/* 3 Columns */}
          <div {...elementProps(config.id, 'columnsArea', 'container', 'Columns Area')} className="flex flex-row justify-center braise-resp-footer-cols" style={{ gap: 'clamp(40px, 8vw, 120px)', paddingBottom: 48 }}>
            {columns.map((col, ci) => (
              <div key={col.id || `col-${ci}`} className="flex flex-col" style={{ minWidth: 140 }}>
                <p
                  {...elementProps(config.id, `columns.${ci}.title`, 'heading')}
                  style={{ fontFamily: headingFont, fontSize: 13, fontWeight: 600, color: gold, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}
                >
                  {col.title}
                </p>
                <div className="flex flex-col" style={{ gap: 6 }}>
                  {col.links.map((link, li) => (
                    <a
                      key={link.id || `${ci}-${li}`}
                      {...elementProps(config.id, `columns.${ci}.links.${li}.label`, 'link')}
                      href={link.href}
                      className="braise-link-mask"
                      style={{ color: textLight, textDecoration: 'none', fontSize: 14, fontWeight: 400 }}
                    >
                      <span className="braise-text-main">{link.label}</span>
                      <span className="braise-text-alt">{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          {...elementProps(config.id, 'bottomBar', 'container', 'Footer Bottom')}
          className="flex flex-wrap items-center justify-between"
          style={{ borderTop: `1px solid rgba(200,169,110,0.25)`, padding: '24px clamp(20px, 5vw, 60px)', gap: 16 }}
        >
          <p
            {...elementProps(config.id, 'copyright', 'text')}
            style={{ color: textMuted, fontSize: 13 }}
          >
            {content.copyright ?? `\u00A9 ${new Date().getFullYear()} Braise. Tous droits r\u00E9serv\u00E9s.`}
          </p>
          {/* Social icons */}
          <div {...elementProps(config.id, 'socialsRow', 'container', 'Social Icons')} className="flex flex-row items-center" style={{ gap: 16 }}>
            {/* Instagram */}
            <a
              {...elementProps(config.id, 'socials.instagram', 'link')}
              href={socials.instagram ?? '#'}
              aria-label="Instagram"
              style={{ color: textMuted, transition: 'color 0.3s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = gold }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = textMuted }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            {/* Facebook */}
            <a
              {...elementProps(config.id, 'socials.facebook', 'link')}
              href={(socials as Record<string, string | undefined>).facebook ?? '#'}
              aria-label="Facebook"
              style={{ color: textMuted, transition: 'color 0.3s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = gold }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = textMuted }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            {/* TripAdvisor */}
            <a
              {...elementProps(config.id, 'socials.tripadvisor', 'link')}
              href={(socials as Record<string, string | undefined>).tripadvisor ?? '#'}
              aria-label="TripAdvisor"
              style={{ color: textMuted, transition: 'color 0.3s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = gold }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = textMuted }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="8.5" cy="14" r="2.5"/><circle cx="15.5" cy="14" r="2.5"/><circle cx="12" cy="6" r="2"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
            </a>
          </div>
        </div>
      </footer>
    )
  }

  // ─── VARIANT: forge ───
  // Univers coach sportif : fond noir profond #0A0A0A, gris #1A1A1A, texte clair #E8E8E8, muted #888888, orange #FF4D00
  if (variant === 'forge') {
    const headingFont = "'GeneralSans Variable', 'General Sans', sans-serif"
    const bodyFont = "'GeneralSans Variable', 'General Sans', sans-serif"
    const nearBlack = '#0A0A0A'
    const textLight = '#E8E8E8'
    const textMuted = '#888888'
    const orange = '#FF4D00'
    return (
      <footer
        {...elementProps(config.id, 'wrapper', 'container', 'Footer')}
        className="relative"
        style={{ backgroundColor: nearBlack, color: textLight, fontFamily: bodyFont }}
      >
        {/* Inject hover animations for text-mask effect */}
        <style>{`
          .forge-link-mask { overflow: hidden; height: 1.5em; position: relative; display: block; }
          .forge-link-mask .forge-text-main { display: block; transition: transform 0.3s ease; }
          .forge-link-mask .forge-text-alt { position: absolute; top: 100%; left: 0; display: block; transition: transform 0.3s ease; }
          .forge-link-mask:hover .forge-text-main,
          .forge-link-mask:hover .forge-text-alt { transform: translateY(-100%); }
          @media (max-width: 768px) {
            .forge-resp-footer-cols { flex-direction: column !important; gap: 32px !important; }
          }
        `}</style>

        <div {...elementProps(config.id, 'footerInner', 'container', 'Footer Inner')} style={{ paddingTop: 'clamp(60px, 10vw, 100px)', paddingLeft: 'clamp(20px, 5vw, 60px)', paddingRight: 'clamp(20px, 5vw, 60px)' }}>
          {/* Logo + orange separator */}
          <div {...elementProps(config.id, 'brandArea', 'container', 'Brand Area')} className="flex flex-col items-center" style={{ marginBottom: 48 }}>
            <p
              {...elementProps(config.id, 'logo', 'image')}
              style={{ fontFamily: headingFont, fontSize: 32, fontWeight: 600, color: '#FFFFFF', letterSpacing: '0.05em', marginBottom: 20 }}
            >
              {renderLogo(logo)}
            </p>
            <div style={{ width: 60, height: 1, backgroundColor: orange }} />
          </div>

          {/* 3 Columns */}
          <div {...elementProps(config.id, 'columnsArea', 'container', 'Columns Area')} className="flex flex-row justify-center forge-resp-footer-cols" style={{ gap: 'clamp(40px, 8vw, 120px)', paddingBottom: 48 }}>
            {columns.map((col, ci) => (
              <div key={col.id || `col-${ci}`} className="flex flex-col" style={{ minWidth: 140 }}>
                <p
                  {...elementProps(config.id, `columns.${ci}.title`, 'heading')}
                  style={{ fontFamily: headingFont, fontSize: 13, fontWeight: 600, color: orange, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}
                >
                  {col.title}
                </p>
                <div className="flex flex-col" style={{ gap: 6 }}>
                  {col.links.map((link, li) => (
                    <a
                      key={link.id || `${ci}-${li}`}
                      {...elementProps(config.id, `columns.${ci}.links.${li}.label`, 'link')}
                      href={link.href}
                      className="forge-link-mask"
                      style={{ color: textLight, textDecoration: 'none', fontSize: 14, fontWeight: 400 }}
                    >
                      <span className="forge-text-main">{link.label}</span>
                      <span className="forge-text-alt">{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          {...elementProps(config.id, 'bottomBar', 'container', 'Footer Bottom')}
          className="flex flex-wrap items-center justify-between"
          style={{ borderTop: `1px solid rgba(255,77,0,0.25)`, padding: '24px clamp(20px, 5vw, 60px)', gap: 16 }}
        >
          <p
            {...elementProps(config.id, 'copyright', 'text')}
            style={{ color: textMuted, fontSize: 13 }}
          >
            {content.copyright ?? `\u00A9 ${new Date().getFullYear()} Forge. Tous droits r\u00E9serv\u00E9s.`}
          </p>
          {/* Social icons */}
          <div {...elementProps(config.id, 'socialsRow', 'container', 'Social Icons')} className="flex flex-row items-center" style={{ gap: 16 }}>
            {/* Instagram */}
            <a
              {...elementProps(config.id, 'socials.instagram', 'link')}
              href={socials.instagram ?? '#'}
              aria-label="Instagram"
              style={{ color: textMuted, transition: 'color 0.3s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = orange }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = textMuted }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            {/* YouTube */}
            <a
              {...elementProps(config.id, 'socials.youtube', 'link')}
              href={(socials as Record<string, string | undefined>).youtube ?? '#'}
              aria-label="YouTube"
              style={{ color: textMuted, transition: 'color 0.3s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = orange }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = textMuted }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            {/* TikTok */}
            <a
              {...elementProps(config.id, 'socials.tiktok', 'link')}
              href={(socials as Record<string, string | undefined>).tiktok ?? '#'}
              aria-label="TikTok"
              style={{ color: textMuted, transition: 'color 0.3s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = orange }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = textMuted }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.16z"/></svg>
            </a>
          </div>
        </div>
      </footer>
    )
  }

  // ─── VARIANT: ciseaux ───
  // Univers salon de coiffure premium : fond #0B0B0B, cuivré #B76E79, gris chaud #B5B0A8, text-mask hover
  if (variant === 'ciseaux') {
    const headingFont = "'GeneralSans Variable', 'General Sans', sans-serif"
    const bodyFont = "'GeneralSans Variable', 'General Sans', sans-serif"
    const nearBlack = '#0B0B0B'
    const white = '#FFFFFF'
    const warmGray = '#B5B0A8'
    const copper = '#B76E79'
    const textMuted = 'rgba(181,176,168,0.5)'
    return (
      <footer
        {...elementProps(config.id, 'wrapper', 'container', 'Footer')}
        className="relative"
        style={{ backgroundColor: nearBlack, color: white, fontFamily: bodyFont }}
      >
        {/* Inject hover animations for text-mask effect */}
        <style>{`
          .ciseaux-link-mask { overflow: hidden; height: 1.5em; position: relative; display: block; }
          .ciseaux-link-mask .ciseaux-text-main { display: block; transition: transform 0.3s ease; }
          .ciseaux-link-mask .ciseaux-text-alt { position: absolute; top: 100%; left: 0; display: block; transition: transform 0.3s ease; }
          .ciseaux-link-mask:hover .ciseaux-text-main,
          .ciseaux-link-mask:hover .ciseaux-text-alt { transform: translateY(-100%); }
          @media (max-width: 768px) {
            .ciseaux-resp-footer-cols { flex-direction: column !important; gap: 32px !important; }
          }
        `}</style>

        <div {...elementProps(config.id, 'footerInner', 'container', 'Footer Inner')} style={{ paddingTop: 'clamp(60px, 10vw, 100px)', paddingLeft: 'clamp(20px, 5vw, 60px)', paddingRight: 'clamp(20px, 5vw, 60px)' }}>
          {/* Logo + copper separator */}
          <div {...elementProps(config.id, 'brandArea', 'container', 'Brand Area')} className="flex flex-col items-center" style={{ marginBottom: 48 }}>
            <p
              {...elementProps(config.id, 'logo', 'image')}
              style={{ fontFamily: headingFont, fontSize: 32, fontWeight: 600, color: white, letterSpacing: '0.05em', marginBottom: 20 }}
            >
              {renderLogo(logo)}
            </p>
            <div style={{ width: 60, height: 1, backgroundColor: copper }} />
          </div>

          {/* 3 Columns */}
          <div {...elementProps(config.id, 'columnsArea', 'container', 'Columns Area')} className="flex flex-row justify-center ciseaux-resp-footer-cols" style={{ gap: 'clamp(40px, 8vw, 120px)', paddingBottom: 48 }}>
            {columns.map((col, ci) => (
              <div key={col.id || `col-${ci}`} className="flex flex-col" style={{ minWidth: 140 }}>
                <p
                  {...elementProps(config.id, `columns.${ci}.title`, 'heading')}
                  style={{ fontFamily: headingFont, fontSize: 13, fontWeight: 600, color: copper, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}
                >
                  {col.title}
                </p>
                <div className="flex flex-col" style={{ gap: 6 }}>
                  {col.links.map((link, li) => (
                    <a
                      key={link.id || `${ci}-${li}`}
                      {...elementProps(config.id, `columns.${ci}.links.${li}.label`, 'link')}
                      href={link.href}
                      className="ciseaux-link-mask"
                      style={{ color: warmGray, textDecoration: 'none', fontSize: 14, fontWeight: 400 }}
                    >
                      <span className="ciseaux-text-main">{link.label}</span>
                      <span className="ciseaux-text-alt">{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          {...elementProps(config.id, 'bottomBar', 'container', 'Footer Bottom')}
          className="flex flex-wrap items-center justify-between"
          style={{ borderTop: `1px solid rgba(183,110,121,0.25)`, padding: '24px clamp(20px, 5vw, 60px)', gap: 16 }}
        >
          <p
            {...elementProps(config.id, 'copyright', 'text')}
            style={{ color: textMuted, fontSize: 13 }}
          >
            {content.copyright ?? `\u00A9 ${new Date().getFullYear()} Ciseaux. Tous droits r\u00E9serv\u00E9s.`}
          </p>
          {/* Social icons */}
          <div {...elementProps(config.id, 'socialsRow', 'container', 'Social Icons')} className="flex flex-row items-center" style={{ gap: 16 }}>
            {/* Instagram */}
            <a
              {...elementProps(config.id, 'socials.instagram', 'link')}
              href={socials.instagram ?? '#'}
              aria-label="Instagram"
              style={{ color: textMuted, transition: 'color 0.3s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = copper }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = textMuted }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            {/* Facebook */}
            <a
              {...elementProps(config.id, 'socials.facebook', 'link')}
              href={(socials as Record<string, string | undefined>).facebook ?? '#'}
              aria-label="Facebook"
              style={{ color: textMuted, transition: 'color 0.3s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = copper }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = textMuted }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            {/* Pinterest */}
            <a
              {...elementProps(config.id, 'socials.pinterest', 'link')}
              href={(socials as Record<string, string | undefined>).pinterest ?? '#'}
              aria-label="Pinterest"
              style={{ color: textMuted, transition: 'color 0.3s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = copper }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = textMuted }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0a12 12 0 00-4.373 23.18c-.1-.937-.19-2.376.04-3.4.21-.93 1.353-5.73 1.353-5.73s-.346-.69-.346-1.71c0-1.6.928-2.8 2.083-2.8.983 0 1.457.737 1.457 1.62 0 .988-.63 2.464-.953 3.833-.27 1.143.574 2.074 1.703 2.074 2.043 0 3.613-2.154 3.613-5.26 0-2.752-1.978-4.676-4.803-4.676-3.27 0-5.19 2.452-5.19 4.99 0 .988.38 2.048.856 2.624.094.114.108.214.08.33-.088.364-.283 1.143-.322 1.302-.05.21-.167.255-.386.154-1.443-.672-2.346-2.78-2.346-4.473 0-3.628 2.636-6.96 7.604-6.96 3.993 0 7.094 2.845 7.094 6.645 0 3.964-2.498 7.16-5.966 7.16-1.166 0-2.262-.606-2.636-1.322l-.717 2.735c-.26.998-.962 2.25-1.432 3.013A12 12 0 0012 0z"/></svg>
            </a>
          </div>
        </div>
      </footer>
    )
  }

  // ─── VARIANT: atelier ───
  // Univers architecte d'intérieur premium : fond charcoal #1A1A1A, sable #C4B5A0, bronze #8B7355, text-mask hover
  if (variant === 'atelier') {
    const headingFont = "'GeneralSans Variable', 'General Sans', sans-serif"
    const bodyFont = "'GeneralSans Variable', 'General Sans', sans-serif"
    const nearBlack = '#1A1A1A'
    const white = '#FFFFFF'
    const sand = '#C4B5A0'
    const bronze = '#8B7355'
    const textMuted = 'rgba(196,181,160,0.5)'
    return (
      <footer
        {...elementProps(config.id, 'wrapper', 'container', 'Footer')}
        className="relative"
        style={{ backgroundColor: nearBlack, color: white, fontFamily: bodyFont }}
      >
        {/* Inject hover animations for text-mask effect */}
        <style>{`
          .atelier-link-mask { overflow: hidden; height: 1.5em; position: relative; display: block; }
          .atelier-link-mask .atelier-text-main { display: block; transition: transform 0.3s ease; }
          .atelier-link-mask .atelier-text-alt { position: absolute; top: 100%; left: 0; display: block; transition: transform 0.3s ease; }
          .atelier-link-mask:hover .atelier-text-main,
          .atelier-link-mask:hover .atelier-text-alt { transform: translateY(-100%); }
          @media (max-width: 768px) {
            .atelier-resp-footer-cols { flex-direction: column !important; gap: 32px !important; }
          }
        `}</style>

        <div {...elementProps(config.id, 'footerInner', 'container', 'Footer Inner')} style={{ paddingTop: 'clamp(60px, 10vw, 100px)', paddingLeft: 'clamp(20px, 5vw, 60px)', paddingRight: 'clamp(20px, 5vw, 60px)' }}>
          {/* Logo + sand separator */}
          <div {...elementProps(config.id, 'brandArea', 'container', 'Brand Area')} className="flex flex-col items-center" style={{ marginBottom: 48 }}>
            <p
              {...elementProps(config.id, 'logo', 'image')}
              style={{ fontFamily: headingFont, fontSize: 32, fontWeight: 600, color: sand, letterSpacing: '0.05em', marginBottom: 20 }}
            >
              {renderLogo(logo)}
            </p>
            <div style={{ width: 60, height: 1, backgroundColor: bronze }} />
          </div>

          {/* 3 Columns */}
          <div {...elementProps(config.id, 'columnsArea', 'container', 'Columns Area')} className="flex flex-row justify-center atelier-resp-footer-cols" style={{ gap: 'clamp(40px, 8vw, 120px)', paddingBottom: 48 }}>
            {columns.map((col, ci) => (
              <div key={col.id || `col-${ci}`} className="flex flex-col" style={{ minWidth: 140 }}>
                <p
                  {...elementProps(config.id, `columns.${ci}.title`, 'heading')}
                  style={{ fontFamily: headingFont, fontSize: 13, fontWeight: 600, color: bronze, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}
                >
                  {col.title}
                </p>
                <div className="flex flex-col" style={{ gap: 6 }}>
                  {col.links.map((link, li) => (
                    <a
                      key={link.id || `${ci}-${li}`}
                      {...elementProps(config.id, `columns.${ci}.links.${li}.label`, 'link')}
                      href={link.href}
                      className="atelier-link-mask"
                      style={{ color: sand, textDecoration: 'none', fontSize: 14, fontWeight: 400 }}
                    >
                      <span className="atelier-text-main">{link.label}</span>
                      <span className="atelier-text-alt">{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          {...elementProps(config.id, 'bottomBar', 'container', 'Footer Bottom')}
          className="flex flex-wrap items-center justify-between"
          style={{ borderTop: `1px solid rgba(139,115,85,0.25)`, padding: '24px clamp(20px, 5vw, 60px)', gap: 16 }}
        >
          <p
            {...elementProps(config.id, 'copyright', 'text')}
            style={{ color: textMuted, fontSize: 13 }}
          >
            {content.copyright ?? `\u00A9 ${new Date().getFullYear()} Atelier. Tous droits r\u00E9serv\u00E9s.`}
          </p>
          {/* Social icons */}
          <div {...elementProps(config.id, 'socialsRow', 'container', 'Social Icons')} className="flex flex-row items-center" style={{ gap: 16 }}>
            {/* Instagram */}
            <a
              {...elementProps(config.id, 'socials.instagram', 'link')}
              href={socials.instagram ?? '#'}
              aria-label="Instagram"
              style={{ color: textMuted, transition: 'color 0.3s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = bronze }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = textMuted }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            {/* Pinterest */}
            <a
              {...elementProps(config.id, 'socials.pinterest', 'link')}
              href={(socials as Record<string, string | undefined>).pinterest ?? '#'}
              aria-label="Pinterest"
              style={{ color: textMuted, transition: 'color 0.3s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = bronze }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = textMuted }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0a12 12 0 00-4.373 23.18c-.1-.937-.19-2.376.04-3.4.21-.93 1.353-5.73 1.353-5.73s-.346-.69-.346-1.71c0-1.6.928-2.8 2.083-2.8.983 0 1.457.737 1.457 1.62 0 .988-.63 2.464-.953 3.833-.27 1.143.574 2.074 1.703 2.074 2.043 0 3.613-2.249 3.613-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
            </a>
            {/* Houzz */}
            <a
              {...elementProps(config.id, 'socials.houzz', 'link')}
              href={(socials as Record<string, string | undefined>).houzz ?? '#'}
              aria-label="Houzz"
              style={{ color: textMuted, transition: 'color 0.3s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = bronze }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = textMuted }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.5 2L3 8.5V22h7v-7h5v7h6V8.5L12.5 2zm5 18h-3v-7H9.5v7h-3V9.5l6-4.2 5 3.5V20z"/></svg>
            </a>
          </div>
        </div>
      </footer>
    )
  }

  // ─── VARIANT: encre ───
  // Univers tatoueur premium : fond noir profond #0A0A0A, blanc #FFFFFF, gris acier #8C8C8C, cramoisi #C41E3A, text-mask hover
  if (variant === 'encre') {
    const headingFont = "'GeneralSans Variable', 'General Sans', sans-serif"
    const bodyFont = "'GeneralSans Variable', 'General Sans', sans-serif"
    const deepBlack = '#0A0A0A'
    const white = '#FFFFFF'
    const steelGray = '#8C8C8C'
    const crimson = '#C41E3A'
    const textMuted = 'rgba(140,140,140,0.5)'
    return (
      <footer
        {...elementProps(config.id, 'wrapper', 'container', 'Footer')}
        className="relative"
        style={{ backgroundColor: deepBlack, color: white, fontFamily: bodyFont }}
      >
        {/* Inject hover animations for text-mask effect */}
        <style>{`
          .encre-link-mask { overflow: hidden; height: 1.5em; position: relative; display: block; }
          .encre-link-mask .encre-text-main { display: block; transition: transform 0.3s ease; }
          .encre-link-mask .encre-text-alt { position: absolute; top: 100%; left: 0; display: block; transition: transform 0.3s ease; }
          .encre-link-mask:hover .encre-text-main,
          .encre-link-mask:hover .encre-text-alt { transform: translateY(-100%); }
          @media (max-width: 768px) {
            .encre-resp-footer-cols { flex-direction: column !important; gap: 32px !important; }
          }
        `}</style>

        <div {...elementProps(config.id, 'footerInner', 'container', 'Footer Inner')} style={{ paddingTop: 'clamp(60px, 10vw, 100px)', paddingLeft: 'clamp(20px, 5vw, 60px)', paddingRight: 'clamp(20px, 5vw, 60px)' }}>
          {/* Logo + crimson separator */}
          <div {...elementProps(config.id, 'brandArea', 'container', 'Brand Area')} className="flex flex-col items-center" style={{ marginBottom: 48 }}>
            <p
              {...elementProps(config.id, 'logo', 'image')}
              style={{ fontFamily: headingFont, fontSize: 32, fontWeight: 600, color: crimson, letterSpacing: '0.05em', marginBottom: 20 }}
            >
              {renderLogo(logo)}
            </p>
            <div style={{ width: 60, height: 1, backgroundColor: crimson }} />
          </div>

          {/* 3 Columns */}
          <div {...elementProps(config.id, 'columnsArea', 'container', 'Columns Area')} className="flex flex-row justify-center encre-resp-footer-cols" style={{ gap: 'clamp(40px, 8vw, 120px)', paddingBottom: 48 }}>
            {columns.map((col, ci) => (
              <div key={col.id || `col-${ci}`} className="flex flex-col" style={{ minWidth: 140 }}>
                <p
                  {...elementProps(config.id, `columns.${ci}.title`, 'heading')}
                  style={{ fontFamily: headingFont, fontSize: 13, fontWeight: 600, color: crimson, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}
                >
                  {col.title}
                </p>
                <div className="flex flex-col" style={{ gap: 6 }}>
                  {col.links.map((link, li) => (
                    <a
                      key={link.id || `${ci}-${li}`}
                      {...elementProps(config.id, `columns.${ci}.links.${li}.label`, 'link')}
                      href={link.href}
                      className="encre-link-mask"
                      style={{ color: steelGray, textDecoration: 'none', fontSize: 14, fontWeight: 400 }}
                    >
                      <span className="encre-text-main">{link.label}</span>
                      <span className="encre-text-alt">{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          {...elementProps(config.id, 'bottomBar', 'container', 'Footer Bottom')}
          className="flex flex-wrap items-center justify-between"
          style={{ borderTop: `1px solid rgba(196,30,58,0.25)`, padding: '24px clamp(20px, 5vw, 60px)', gap: 16 }}
        >
          <p
            {...elementProps(config.id, 'copyright', 'text')}
            style={{ color: textMuted, fontSize: 13 }}
          >
            {content.copyright ?? `\u00A9 ${new Date().getFullYear()} Encre. Tous droits r\u00E9serv\u00E9s.`}
          </p>
          {/* Social icons */}
          <div {...elementProps(config.id, 'socialsRow', 'container', 'Social Icons')} className="flex flex-row items-center" style={{ gap: 16 }}>
            {/* Instagram */}
            <a
              {...elementProps(config.id, 'socials.instagram', 'link')}
              href={socials.instagram ?? '#'}
              aria-label="Instagram"
              style={{ color: textMuted, transition: 'color 0.3s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = crimson }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = textMuted }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            {/* TikTok */}
            <a
              {...elementProps(config.id, 'socials.tiktok', 'link')}
              href={(socials as Record<string, string | undefined>).tiktok ?? '#'}
              aria-label="TikTok"
              style={{ color: textMuted, transition: 'color 0.3s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = crimson }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = textMuted }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.2 8.2 0 004.79 1.53V6.78a4.85 4.85 0 01-1.02-.09z" />
              </svg>
            </a>
            {/* Facebook */}
            <a
              {...elementProps(config.id, 'socials.facebook', 'link')}
              href={(socials as Record<string, string | undefined>).facebook ?? '#'}
              aria-label="Facebook"
              style={{ color: textMuted, transition: 'color 0.3s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = crimson }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = textMuted }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    )
  }

  // fallback → startup
  return <SiteFooterSection config={{ ...config, variant: 'startup' }} />
}

export const siteFooterMeta = {
  type: 'site-footer',
  label: 'Footer',
  icon: '🔻',
  variants: ['startup', 'corporate', 'luxe', 'creative', 'ecommerce', 'glass', 'canopy', 'obscura', 'nacre', 'brixsa', 'braise', 'forge', 'ciseaux', 'zmr-agency', 'atelier', 'encre'],
  defaultVariant: 'startup',
  defaultContent: {},
}
