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

  // fallback → startup
  return <SiteFooterSection config={{ ...config, variant: 'startup' }} />
}

export const siteFooterMeta = {
  type: 'site-footer',
  label: 'Footer',
  icon: '🔻',
  variants: ['startup', 'corporate', 'luxe', 'creative', 'ecommerce', 'glass', 'brixsa', 'zmr-agency'],
  defaultVariant: 'startup',
  defaultContent: {},
}
