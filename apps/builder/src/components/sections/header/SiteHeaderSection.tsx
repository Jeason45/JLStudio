import { cn } from '@/lib/utils'
import type { SectionConfig } from '@/types/site'
import type { SiteHeaderContent, NavLink } from '@/types/sections'
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { elementProps } from '@/lib/elementHelpers'
import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { renderLogo } from '@/components/sections/_utils'

export function SiteHeaderSection({ config }: { config: SectionConfig }) {
  const content = (config.content ?? {}) as Partial<SiteHeaderContent>
  const variant = config.variant ?? 'startup'
  const { accentColor } = config.style
  const links: NavLink[] = content.links ?? []
  const logo = content.logo ?? 'Logo'
  const ctaLabel = content.ctaLabel
  const ctaHref = content.ctaHref ?? '#'
  const cartLabel = content.cartLabel

  // ─── VARIANT: corporate ───
  // Univers entreprise / finance : fond navy sombre, clean, CTA sobre avec bordure
  if (variant === 'corporate') {
    return (
      <header className="bg-slate-900 px-6 py-0 border-b border-slate-700/50" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          <div className="flex items-center gap-10">
            <div {...elementProps(config.id, 'logo', 'image')} className="font-semibold text-lg text-white tracking-wide">{renderLogo(logo, 'font-semibold text-lg text-white tracking-wide')}</div>
            <nav className="hidden md:flex items-center gap-8">
              {links.map((link, i) => (
                <a
                  {...elementProps(config.id, `links.${i}.label`, 'link')}
                  key={link.id}
                  href={link.href}
                  className="text-sm text-slate-300 hover:text-white transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-blue-400 hover:after:w-full after:transition-all"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          {ctaLabel && (
            <a
              {...elementProps(config.id, 'ctaLabel', 'button')}
              href={ctaHref}
              className="px-5 py-2 rounded text-sm font-medium border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-all"
              style={accentColor ? { borderColor: accentColor, color: accentColor } : undefined}
            >
              {ctaLabel}
            </a>
          )}
        </div>
      </header>
    )
  }

  // ─── VARIANT: luxe-transparent ───
  // Univers luxe transparent : overlay sur hero, logo gauche, nav droite, accents dorés
  if (variant === 'luxe-transparent') {
    const gold = accentColor ?? '#b8860b'
    return (
      <header className="absolute top-0 left-0 w-full px-6 py-5" style={{ zIndex: 50, fontFamily: 'var(--font-body, inherit)', backgroundColor: 'transparent' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div {...elementProps(config.id, 'logo', 'image')} className="text-lg font-medium tracking-[0.15em] uppercase" style={{ color: '#FFFFFF' }}>{renderLogo(logo, 'text-lg font-medium tracking-[0.15em] uppercase')}</div>
          <nav className="hidden md:flex items-center gap-8" style={{ backgroundColor: 'transparent' }}>
            {links.map((link, i) => (
              <a
                {...elementProps(config.id, `links.${i}.label`, 'link')}
                key={link.id}
                href={link.href}
                className="text-xs tracking-[0.12em] uppercase transition-colors"
                style={{ color: 'rgba(255,255,255,0.8)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#FFFFFF' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.8)' }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-5">
            {cartLabel && (
              <span {...elementProps(config.id, 'cartLabel', 'text')} className="text-xs tracking-[0.12em] uppercase" style={{ color: 'rgba(255,255,255,0.8)' }}>
                {cartLabel}
              </span>
            )}
            {ctaLabel && (
              <a
                {...elementProps(config.id, 'ctaLabel', 'button')}
                href={ctaHref}
                className="inline-flex px-5 py-2 text-xs tracking-[0.12em] uppercase font-medium border transition-colors"
                style={{ borderColor: gold, color: gold, backgroundColor: 'transparent' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = gold; (e.currentTarget as HTMLElement).style.color = '#1a1a1a' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.color = gold }}
              >
                {ctaLabel}
              </a>
            )}
          </div>
        </div>
      </header>
    )
  }

  // ─── VARIANT: luxe ───
  // Univers luxe / premium : beaucoup d'espace, logo centré, accents dorés, finesse
  if (variant === 'luxe') {
    const gold = accentColor ?? '#b8860b'
    return (
      <header className="bg-white px-6" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-6xl mx-auto">
          {/* Logo centré */}
          <div className="flex justify-center py-6">
            <div {...elementProps(config.id, 'logo', 'image')} className="text-2xl font-light tracking-[0.25em] uppercase text-zinc-800">{renderLogo(logo, 'text-2xl font-light tracking-[0.25em] uppercase text-zinc-800')}</div>
          </div>
          {/* Séparateur doré fin */}
          <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
          {/* Nav centrée */}
          <div className="flex items-center justify-center py-4 gap-10">
            <nav className="hidden md:flex items-center gap-10">
              {links.map((link, i) => (
                <a
                  {...elementProps(config.id, `links.${i}.label`, 'link')}
                  key={link.id}
                  href={link.href}
                  className="text-xs tracking-[0.15em] uppercase text-zinc-500 hover:text-zinc-900 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            {ctaLabel && (
              <a
                {...elementProps(config.id, 'ctaLabel', 'button')}
                href={ctaHref}
                className="text-xs tracking-[0.15em] uppercase font-medium transition-colors"
                style={{ color: gold }}
              >
                {ctaLabel}
              </a>
            )}
          </div>
        </div>
      </header>
    )
  }

  // ─── VARIANT: startup (default) ───
  // Univers SaaS / tech : pilules nav, CTA gradient arrondi, moderne
  if (variant === 'startup') {
    const accent = accentColor ?? '#6366f1'
    return (
      <header className="bg-white px-6 py-3 border-b border-zinc-100" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div {...elementProps(config.id, 'logo', 'image')} className="font-bold text-xl text-zinc-900 tracking-tight">{renderLogo(logo, 'font-bold text-xl text-zinc-900 tracking-tight')}</div>
          <nav className="hidden md:flex items-center bg-zinc-100 rounded-full px-1.5 py-1">
            {links.map((link, i) => (
              <a
                {...elementProps(config.id, `links.${i}.label`, 'link')}
                key={link.id}
                href={link.href}
                className="text-sm px-4 py-1.5 rounded-full text-zinc-600 hover:text-zinc-900 hover:bg-white transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>
          {ctaLabel && (
            <a
              {...elementProps(config.id, 'ctaLabel', 'button')}
              href={ctaHref}
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]"
              style={{ backgroundColor: accent, boxShadow: `0 4px 14px ${accent}40` }}
            >
              {ctaLabel}
            </a>
          )}
        </div>
      </header>
    )
  }

  // ─── VARIANT: creative ───
  // Univers agence / portfolio : néobrutalist, bordures épaisses, uppercase, contrasté
  if (variant === 'creative') {
    return (
      <header className="bg-[#f5f0e8] px-6 py-0 border-b-[3px] border-zinc-900" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          <div {...elementProps(config.id, 'logo', 'image')} className="font-black text-2xl text-zinc-900 tracking-tight">{renderLogo(logo, 'font-black text-2xl text-zinc-900 tracking-tight')}</div>
          <nav className="hidden md:flex items-center gap-6">
            {links.map((link, i) => (
              <a
                {...elementProps(config.id, `links.${i}.label`, 'link')}
                key={link.id}
                href={link.href}
                className="text-xs font-bold uppercase tracking-wider text-zinc-900 hover:text-orange-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            {ctaLabel && (
              <a
                {...elementProps(config.id, 'ctaLabel', 'button')}
                href={ctaHref}
                className="px-5 py-2.5 bg-zinc-900 text-white text-xs font-bold uppercase tracking-wider rounded-none hover:bg-orange-600 transition-colors border-2 border-zinc-900 hover:border-orange-600"
                style={accentColor ? { backgroundColor: accentColor, borderColor: accentColor } : undefined}
              >
                {ctaLabel}
              </a>
            )}
            <button className="w-10 h-10 border-2 border-zinc-900 flex items-center justify-center hover:bg-zinc-900 hover:text-white transition-colors md:hidden">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>
    )
  }

  // ─── VARIANT: ecommerce ───
  // Univers boutique : barre de recherche, icônes panier/compte, catégories
  if (variant === 'ecommerce') {
    const accent = accentColor ?? '#059669'
    return (
      <header className="bg-white border-b border-zinc-200" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        {/* Top bar */}
        <div className="px-6 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
            <div {...elementProps(config.id, 'logo', 'image')} className="font-bold text-xl text-zinc-900">{renderLogo(logo, 'font-bold text-xl text-zinc-900')}</div>
            {/* Search bar */}
            <div {...elementProps(config.id, 'searchBar', 'text')} className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="flex w-full h-10 rounded-lg border border-zinc-200 overflow-hidden bg-zinc-50">
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  className="flex-1 px-4 text-sm bg-transparent outline-none text-zinc-700 placeholder:text-zinc-400"
                />
                <button className="px-3 flex items-center justify-center text-white" style={{ backgroundColor: accent }}>
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>
            {/* Icons */}
            <div className="flex items-center gap-4">
              {ctaLabel && (
                <a {...elementProps(config.id, 'ctaLabel', 'button')} href={ctaHref} className="hidden sm:block text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors">
                  {ctaLabel}
                </a>
              )}
              <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-zinc-100 transition-colors text-zinc-600">
                <User className="w-5 h-5" />
              </button>
              <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-zinc-100 transition-colors text-zinc-600 relative">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] font-bold text-white rounded-full flex items-center justify-center" style={{ backgroundColor: accent }}>
                  0
                </span>
              </button>
            </div>
          </div>
        </div>
        {/* Category nav */}
        <div className="border-t border-zinc-100 px-6">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center gap-6 overflow-x-auto py-2.5 scrollbar-hide">
              {links.map((link, i) => (
                <a
                  {...elementProps(config.id, `links.${i}.label`, 'link')}
                  key={link.id}
                  href={link.href}
                  className="text-sm text-zinc-600 hover:text-zinc-900 whitespace-nowrap transition-colors font-medium"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>
    )
  }

  // ─── VARIANT: glass ───
  // Univers tech / IA / crypto : glassmorphism, fond sombre, effets blur, futuriste
  if (variant === 'glass') {
    const accent = accentColor ?? '#818cf8'
    return (
      <header className="bg-zinc-950/80 backdrop-blur-2xl px-6 py-0 border-b border-white/[0.08]" style={{ fontFamily: 'var(--font-body, inherit)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          <div {...elementProps(config.id, 'logo', 'image')} className="font-bold text-lg text-white tracking-tight">{renderLogo(logo, 'font-bold text-lg text-white tracking-tight')}</div>
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link, i) => (
              <a
                {...elementProps(config.id, `links.${i}.label`, 'link')}
                key={link.id}
                href={link.href}
                className="text-sm px-3.5 py-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>
          {ctaLabel && (
            <a
              {...elementProps(config.id, 'ctaLabel', 'button')}
              href={ctaHref}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:brightness-110"
              style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)`, boxShadow: `0 0 20px ${accent}30` }}
            >
              {ctaLabel}
            </a>
          )}
        </div>
      </header>
    )
  }

  // ─── VARIANT: obscura ───
  // Photographer premium : minimal transparent header, text-only menu button, off-canvas centered nav
  if (variant === 'obscura') {
    return <ObscuraHeader config={config} logo={logo} ctaLabel={ctaLabel} links={links} />
  }

  // ─── VARIANT: canopy ───
  // Eco e-commerce header inspiré Allbirds : clean, minimal, sticky, announcement bar vert forêt
  if (variant === 'canopy') {
    return <CanopyHeader config={config} logo={logo} ctaLabel={ctaLabel} links={links} />
  }

  // ─── VARIANT: nacre ───
  // Nail salon premium : transparent glassmorphism header, off-canvas menu bordeaux profond
  if (variant === 'nacre') {
    return <NacreHeader config={config} logo={logo} ctaLabel={ctaLabel} links={links} />
  }

  // ─── VARIANT: brixsa ───
  // Transparent overlay navbar : glassmorphism menu button, logo left, minimal
  if (variant === 'brixsa') {
    return <BrixsaHeader config={config} logo={logo} ctaLabel={ctaLabel} links={links} />
  }

  if (variant === 'zmr-agency') {
    return <ZmrAgencyHeader config={config} logo={logo} ctaLabel={ctaLabel} links={links} />
  }

  // ─── VARIANT: braise ───
  // Restaurant gastronomique premium : transparent glassmorphism header, off-canvas menu burgundy profond
  if (variant === 'braise') {
    return <BraiseHeader config={config} logo={logo} ctaLabel={ctaLabel} links={links} />
  }

  // ─── VARIANT: forge ───
  // Coach sportif premium : transparent glassmorphism header, off-canvas fullscreen menu, orange accent
  if (variant === 'forge') {
    return <ForgeHeader config={config} logo={logo} ctaLabel={ctaLabel} links={links} />
  }

  // ─── VARIANT: ciseaux ───
  // Salon de coiffure premium : transparent glassmorphism header, off-canvas fullscreen menu, copper accent
  if (variant === 'ciseaux') {
    return <CiseauxHeader config={config} logo={logo} ctaLabel={ctaLabel} links={links} />
  }

  // ─── VARIANT: atelier ───
  // Architecte d'intérieur premium : transparent glassmorphism header, off-canvas fullscreen menu, sand/bronze accent
  if (variant === 'atelier') {
    return <AtelierHeader config={config} logo={logo} ctaLabel={ctaLabel} links={links} />
  }

  // ─── VARIANT: encre ───
  // Tatoueur premium : transparent glassmorphism header, off-canvas fullscreen menu, crimson accent
  if (variant === 'encre') {
    return <EncreHeader config={config} logo={logo} ctaLabel={ctaLabel} links={links} />
  }

  // ─── VARIANT: serenite ───
  // Institut de beauté & spa premium : transparent glassmorphism header, off-canvas fullscreen menu, warm gold accent
  if (variant === 'serenite') {
    return <SereniteHeader config={config} logo={logo} ctaLabel={ctaLabel} links={links} />
  }

  // ─── VARIANT: pulse ───
  // DJ / musicien premium : glassmorphism header transparent, off-canvas fullscreen menu, accents cyan néon
  if (variant === 'pulse') {
    return <PulseHeader config={config} logo={logo} ctaLabel={ctaLabel} links={links} />
  }

  // ─── VARIANT: saveur ───
  // Traiteur & chef à domicile premium : transparent glassmorphism header, off-canvas fullscreen menu, accents or antique
  if (variant === 'saveur') {
    return <SaveurHeader config={config} logo={logo} ctaLabel={ctaLabel} links={links} />
  }

  // fallback → startup
  return <SiteHeaderSection config={{ ...config, variant: 'startup' }} />
}

// ─── Nacre Off-Canvas Menu ───

function NacreHeader({ config, logo, ctaLabel, links }: { config: SectionConfig; logo: string; ctaLabel?: string; links: NavLink[] }) {
  const [menuOpen, setMenuOpen] = useState(false)

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [menuOpen])

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [menuOpen])

  const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), [])

  // Default nav links for nail salon
  const menuLinks: { label: string; href: string }[] = links.length > 0
    ? links.map(l => ({ label: l.label, href: l.href }))
    : [
        { label: 'Accueil', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Galerie', href: '/galerie' },
        { label: 'A Propos', href: '/a-propos' },
        { label: 'Tarifs', href: '/tarifs' },
        { label: 'Contact', href: '/contact' },
      ]

  const socials = [
    { label: 'Instagram', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
    )},
    { label: 'Facebook', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    )},
    { label: 'TikTok', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.16z"/></svg>
    )},
  ]

  return (
    <>
      {/* Nacre header responsive styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .nacre-resp-menu-grid { grid-template-columns: 1fr !important; }
          .nacre-resp-menu-right { display: none !important; }
        }
      ` }} />
      {/* ─── NAVBAR ─── */}
      <header
        {...elementProps(config.id, 'wrapper', 'container', 'Header')}
        className={cn('absolute top-0 left-0 w-full flex items-center')}
        style={{
          zIndex: 888,
          backgroundColor: 'transparent',
          minHeight: '72px',
          paddingLeft: 'clamp(20px, 5vw, 60px)',
          paddingRight: 'clamp(20px, 5vw, 60px)',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        <div
          {...elementProps(config.id, 'navGrid', 'container', 'Nav Grid')}
          className={cn('grid items-center w-full')}
          style={{
            gridTemplateColumns: '.375fr minmax(min-content, max-content)',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          {/* LEFT — Logo */}
          <div
            {...elementProps(config.id, 'logo', 'image')}
            className="tracking-wide"
            style={{
              maxWidth: '140px',
              fontSize: '20px',
              fontWeight: 600,
              color: '#F0E0DA',
              fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
            }}
          >
            {renderLogo(logo, 'font-semibold text-lg')}
          </div>

          {/* RIGHT — Menu button (glassmorphism) */}
          <div
            {...elementProps(config.id, 'ctaLabel', 'button')}
            role="button"
            onClick={toggleMenu}
            className={cn('flex items-center cursor-pointer')}
            style={{
              borderRadius: '999px',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              backgroundColor: 'rgba(197, 169, 110, 0.2)',
              color: '#F0E0DA',
              paddingLeft: '20px',
              paddingRight: '20px',
              paddingTop: '10px',
              paddingBottom: '10px',
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: "'Inter Variable', var(--font-body, sans-serif)",
              border: '1px solid rgba(197, 169, 110, 0.15)',
              gap: '10px',
              whiteSpace: 'nowrap',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(197, 169, 110, 0.35)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(197, 169, 110, 0.2)' }}
          >
            <span {...elementProps(config.id, 'menuLabel', 'text', 'Menu Label')}>{ctaLabel || 'Menu'}</span>
            {/* Hamburger icon */}
            <span
              {...elementProps(config.id, 'menuIcon', 'icon', 'Menu Icon')}
              className={cn('flex flex-col items-center')}
              style={{ gap: '3px' }}
            >
              <span style={{ width: '18px', height: '2px', display: 'block', backgroundColor: '#F0E0DA' }} />
              <span style={{ width: '18px', height: '2px', display: 'block', backgroundColor: '#F0E0DA' }} />
            </span>
          </div>
        </div>
      </header>

      {/* ─── OFF-CANVAS MENU OVERLAY ─── */}
      <div
        {...elementProps(config.id, 'offCanvas', 'container', 'Off-Canvas Menu')}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          visibility: menuOpen ? 'visible' : 'hidden',
          opacity: menuOpen ? 1 : 0,
          transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.5s',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        {/* Bordeaux profond background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#2A1A1E',
          }}
        />

        {/* Menu content grid */}
        <div
          {...elementProps(config.id, 'offCanvasGrid', 'container', 'Menu Grid')}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            fontFamily: "'Inter Variable', var(--font-body, sans-serif)",
          }}
          className="nacre-resp-menu-grid"
        >
          {/* LEFT COLUMN — Navigation */}
          <div
            {...elementProps(config.id, 'offCanvasNav', 'container', 'Menu Navigation')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 'clamp(20px, 5vw, 60px)',
              paddingTop: 'clamp(40px, 8vw, 80px)',
            }}
          >
            {/* Top — Logo + Close */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '48px' }}>
              <div
                {...elementProps(config.id, 'offCanvasLogo', 'text', 'Menu Logo')}
                style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#F0E0DA',
                  fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
                }}
              >
                {renderLogo(logo)}
              </div>
              <div
                {...elementProps(config.id, 'closeButton', 'button', 'Close Button')}
                role="button"
                onClick={toggleMenu}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  borderRadius: '999px',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  backgroundColor: 'rgba(197, 169, 110, 0.2)',
                  color: '#C9A96E',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  fontSize: '14px',
                  fontWeight: 500,
                  border: '1px solid rgba(197, 169, 110, 0.15)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(197, 169, 110, 0.35)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(197, 169, 110, 0.2)' }}
              >
                <span>Fermer</span>
                <X size={18} strokeWidth={2} />
              </div>
            </div>

            {/* Navigation links — staggered slide-in from left */}
            <nav
              {...elementProps(config.id, 'offCanvasLinks', 'container', 'Menu Links')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                flex: 1,
              }}
            >
              {menuLinks.map((link, i) => (
                <a
                  key={link.label}
                  {...elementProps(config.id, `menuLinks.${i}`, 'link', link.label)}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontSize: 'clamp(28px, 5vw, 48px)',
                    fontWeight: 500,
                    color: '#F0E0DA',
                    textDecoration: 'none',
                    padding: '8px 0',
                    transition: 'color 0.3s, transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.5s',
                    display: 'block',
                    fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    transform: menuOpen ? 'translateX(0)' : 'translateX(-60px)',
                    opacity: menuOpen ? 1 : 0,
                    transitionDelay: `${i * 0.1}s`,
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#C9A96E' }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#F0E0DA' }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Bottom — Social Icons + Phone */}
            <div
              {...elementProps(config.id, 'offCanvasBottom', 'container', 'Menu Bottom')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '32px',
                borderTop: '1px solid rgba(240, 224, 218, 0.1)',
              }}
            >
              {/* Social icons */}
              <div
                {...elementProps(config.id, 'offCanvasSocials', 'container', 'Social Icons')}
                style={{ display: 'flex', gap: '16px' }}
              >
                {socials.map((s, i) => (
                  <a
                    key={s.label}
                    {...elementProps(config.id, `social.${i}`, 'link', s.label)}
                    href={s.href}
                    style={{
                      color: 'rgba(240, 224, 218, 0.5)',
                      transition: 'color 0.3s, border-color 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '1px solid rgba(240, 224, 218, 0.15)',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C9A96E'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201, 169, 110, 0.4)' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(240, 224, 218, 0.5)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(240, 224, 218, 0.15)' }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>

              {/* Phone number */}
              <a
                {...elementProps(config.id, 'offCanvasPhone', 'link', 'Phone')}
                href="tel:+33600000000"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'rgba(240, 224, 218, 0.5)',
                  fontSize: '14px',
                  fontWeight: 400,
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C9A96E' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(240, 224, 218, 0.5)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                +33 6 00 00 00 00
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN — Decorative image with rose tint */}
          <div
            {...elementProps(config.id, 'offCanvasImage', 'image', 'Menu Image')}
            className="nacre-resp-menu-right"
            style={{
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: '#3D2630',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200&q=80"
              alt="Nail art"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.7,
                transform: menuOpen ? 'scale(1)' : 'scale(1.1)',
                transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
            {/* Rose tint overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(42, 26, 30, 0.5) 0%, rgba(201, 169, 110, 0.15) 60%, transparent 100%)',
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Brixsa Off-Canvas Menu ───

// ─── Canopy Header ───
// Nature / éco-luxe : transparent overlay, glassmorphism menu button forest green, off-canvas full-screen

// ─── Obscura Header ───

function ObscuraHeader({ config, logo, ctaLabel, links }: { config: SectionConfig; logo: string; ctaLabel?: string; links: NavLink[] }) {
  const [menuOpen, setMenuOpen] = useState(false)

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [menuOpen])

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [menuOpen])

  const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), [])

  const menuLinks: { label: string; href: string }[] = [
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'À propos', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Journal', href: '/journal' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <>
      {/* Obscura responsive styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 480px) {
          .obscura-resp-header { padding-left: 20px !important; padding-right: 20px !important; }
        }
      ` }} />
      {/* ─── NAVBAR ─── */}
      <header
        {...elementProps(config.id, 'wrapper', 'container', 'Header')}
        className="absolute top-0 left-0 w-full flex items-center obscura-resp-header"
        style={{
          zIndex: 888,
          backgroundColor: 'transparent',
          minHeight: '72px',
          paddingLeft: 'clamp(24px, 5vw, 60px)',
          paddingRight: 'clamp(24px, 5vw, 60px)',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        <div
          {...elementProps(config.id, 'navGrid', 'container', 'Nav Grid')}
          className="flex items-center justify-between w-full"
        >
          {/* LEFT — Logo */}
          <div
            {...elementProps(config.id, 'logo', 'image')}
            style={{
              fontSize: '18px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#E8E4DF',
              fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
            }}
          >
            {renderLogo(logo)}
          </div>

          {/* RIGHT — Menu text button (ultra minimal) */}
          <div
            {...elementProps(config.id, 'ctaLabel', 'button')}
            role="button"
            onClick={toggleMenu}
            style={{
              color: '#E8E4DF',
              fontSize: '13px',
              fontWeight: 400,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: '8px 0',
              transition: 'color 0.3s ease',
              fontFamily: "'Inter Variable', 'Inter', sans-serif",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#D4A853' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#E8E4DF' }}
          >
            <span {...elementProps(config.id, 'menuLabel', 'text', 'Menu Label')}>{ctaLabel || 'Menu'}</span>
          </div>
        </div>
      </header>

      {/* ─── OFF-CANVAS MENU OVERLAY ─── */}
      <div
        {...elementProps(config.id, 'offCanvas', 'container', 'Off-Canvas Menu')}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          visibility: menuOpen ? 'visible' : 'hidden',
          opacity: menuOpen ? 1 : 0,
          transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.5s',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        {/* Dark background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#0A0A0A',
          }}
        />

        {/* Close button — top right */}
        <div
          {...elementProps(config.id, 'closeButton', 'button', 'Close Button')}
          role="button"
          onClick={toggleMenu}
          style={{
            position: 'absolute',
            top: 'clamp(24px, 4vw, 40px)',
            right: 'clamp(24px, 5vw, 60px)',
            color: '#E8E4DF',
            fontSize: '13px',
            fontWeight: 400,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            zIndex: 10,
            fontFamily: "'Inter Variable', 'Inter', sans-serif",
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#D4A853' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#E8E4DF' }}
        >
          Fermer
        </div>

        {/* Menu content — centered vertically */}
        <div
          {...elementProps(config.id, 'offCanvasContent', 'container', 'Menu Content')}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
          }}
        >
          {/* Navigation links — stacked, centered */}
          <nav
            {...elementProps(config.id, 'offCanvasLinks', 'container', 'Menu Links')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {menuLinks.map((link, i) => (
              <a
                key={link.label}
                {...elementProps(config.id, `menuLinks.${i}`, 'link', link.label)}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: 'clamp(32px, 6vw, 56px)',
                  fontWeight: 400,
                  color: '#E8E4DF',
                  textDecoration: 'none',
                  padding: '8px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.4s ease ${i * 0.08}s, transform 0.4s ease ${i * 0.08}s, color 0.3s ease`,
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  const line = e.currentTarget.querySelector('.obscura-link-line') as HTMLElement
                  if (line) { line.style.width = '40px'; line.style.opacity = '1' }
                }}
                onMouseLeave={(e) => {
                  const line = e.currentTarget.querySelector('.obscura-link-line') as HTMLElement
                  if (line) { line.style.width = '0px'; line.style.opacity = '0' }
                }}
              >
                {/* Gold line that extends on hover */}
                <span
                  className="obscura-link-line"
                  style={{
                    display: 'inline-block',
                    width: '0px',
                    height: '2px',
                    backgroundColor: '#D4A853',
                    transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease',
                    opacity: 0,
                    flexShrink: 0,
                  }}
                />
                {link.label}
              </a>
            ))}
          </nav>

          {/* Bottom center — contact info */}
          <div
            {...elementProps(config.id, 'offCanvasBottom', 'container', 'Menu Bottom')}
            style={{
              position: 'absolute',
              bottom: 'clamp(32px, 5vw, 60px)',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
              fontFamily: "'Inter Variable', 'Inter', sans-serif",
            }}
          >
            <span
              {...elementProps(config.id, 'contactEmail', 'text', 'Contact Email')}
              style={{
                fontSize: '13px',
                color: 'rgba(232, 228, 223, 0.4)',
                letterSpacing: '0.05em',
              }}
            >
              hello@studio.com
            </span>
            <span
              style={{
                width: '1px',
                height: '14px',
                backgroundColor: 'rgba(232, 228, 223, 0.15)',
              }}
            />
            <span
              {...elementProps(config.id, 'contactPhone', 'text', 'Contact Phone')}
              style={{
                fontSize: '13px',
                color: 'rgba(232, 228, 223, 0.4)',
                letterSpacing: '0.05em',
              }}
            >
              +33 6 00 00 00 00
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Canopy Header ───

function CanopyHeader({ config, logo, ctaLabel, links }: { config: SectionConfig; logo: string; ctaLabel?: string; links: NavLink[] }) {
  const [menuOpen, setMenuOpen] = useState(false)

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [menuOpen])

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [menuOpen])

  const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), [])

  // Navigation links for the off-canvas menu
  const menuLinks: { label: string; href: string }[] = [
    ...links.map(l => ({ label: l.label, href: l.href })),
    ...(links.length === 0 ? [
      { label: 'Accueil', href: '/' },
      { label: 'Collection', href: '/collection' },
      { label: 'Notre histoire', href: '/about' },
      { label: 'Journal', href: '/blog' },
      { label: 'Boutique', href: '/shop' },
      { label: 'Contact', href: '/contact' },
    ] : []),
  ]

  const socials = [
    { label: 'Instagram', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
    )},
    { label: 'X', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    )},
    { label: 'LinkedIn', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    )},
  ]

  return (
    <>
      {/* Canopy responsive styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .canopy-resp-menu-grid { grid-template-columns: 1fr !important; }
          .canopy-resp-menu-right { display: none !important; }
        }
      ` }} />
      {/* ─── NAVBAR ─── */}
      <header
        {...elementProps(config.id, 'wrapper', 'container', 'Header')}
        className={cn('absolute top-0 left-0 w-full flex items-center')}
        style={{
          zIndex: 888,
          backgroundColor: 'transparent',
          minHeight: '72px',
          paddingLeft: 'clamp(20px, 5vw, 60px)',
          paddingRight: 'clamp(20px, 5vw, 60px)',
          fontFamily: 'var(--font-body, inherit)',
        }}
      >
        <div
          {...elementProps(config.id, 'navGrid', 'container', 'Nav Grid')}
          className={cn('grid items-center w-full')}
          style={{
            gridTemplateColumns: '.375fr minmax(min-content, max-content)',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          {/* LEFT — Logo */}
          <div
            {...elementProps(config.id, 'logo', 'image')}
            className="text-white tracking-wide"
            style={{
              maxWidth: '140px',
              fontSize: '20px',
              fontWeight: 600,
              color: '#FAFAF8',
              fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
            }}
          >
            {renderLogo(logo)}<sup style={{ fontSize: '0.5em', verticalAlign: 'super' }}>&reg;</sup>
          </div>

          {/* RIGHT — Menu button (glassmorphism forest green) */}
          <div
            {...elementProps(config.id, 'ctaLabel', 'button')}
            role="button"
            onClick={toggleMenu}
            className={cn('flex items-center cursor-pointer')}
            style={{
              borderRadius: '4px',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              backgroundColor: 'rgba(45, 80, 22, 0.25)',
              color: 'white',
              paddingLeft: '20px',
              paddingRight: '20px',
              paddingTop: '8px',
              paddingBottom: '8px',
              fontSize: '16px',
              fontWeight: 500,
              fontFamily: "'Inter Variable', var(--font-body, sans-serif)",
              border: '1px solid rgba(255,255,255,0.15)',
              gap: '10px',
              whiteSpace: 'nowrap',
            }}
          >
            <span {...elementProps(config.id, 'menuLabel', 'text', 'Menu Label')}>Menu</span>
            {/* Toggle icon */}
            <span
              {...elementProps(config.id, 'menuIcon', 'icon', 'Menu Icon')}
              className={cn('flex flex-col items-center')}
              style={{ gap: '3px' }}
            >
              <span style={{ width: '18px', height: '2px', display: 'block', backgroundColor: '#FAFAF8' }} />
              <span style={{ width: '18px', height: '2px', display: 'block', backgroundColor: '#FAFAF8' }} />
            </span>
          </div>
        </div>
      </header>

      {/* ─── OFF-CANVAS MENU OVERLAY ─── */}
      <div
        {...elementProps(config.id, 'offCanvas', 'container', 'Off-Canvas Menu')}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          visibility: menuOpen ? 'visible' : 'hidden',
          opacity: menuOpen ? 1 : 0,
          transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.5s',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        {/* Dark background overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#1A1A1A',
          }}
        />

        {/* Menu content grid */}
        <div
          {...elementProps(config.id, 'offCanvasGrid', 'container', 'Menu Grid')}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            fontFamily: "'Inter Variable', var(--font-body, sans-serif)",
          }}
          className="canopy-resp-menu-grid"
        >
          {/* LEFT COLUMN — Navigation */}
          <div
            {...elementProps(config.id, 'offCanvasNav', 'container', 'Menu Navigation')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 'clamp(20px, 5vw, 60px)',
              paddingTop: 'clamp(40px, 8vw, 80px)',
            }}
          >
            {/* Top — Logo + Close */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '48px' }}>
              <div
                {...elementProps(config.id, 'offCanvasLogo', 'text', 'Menu Logo')}
                style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#FAFAF8',
                  fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
                }}
              >
                {renderLogo(logo)}<sup style={{ fontSize: '0.5em', verticalAlign: 'super' }}>&reg;</sup>
              </div>
              <div
                {...elementProps(config.id, 'closeButton', 'button', 'Close Button')}
                role="button"
                onClick={toggleMenu}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  borderRadius: '4px',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  backgroundColor: 'rgba(45, 80, 22, 0.25)',
                  color: '#FAFAF8',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  paddingTop: '8px',
                  paddingBottom: '8px',
                  fontSize: '16px',
                  fontWeight: 500,
                  border: '1px solid rgba(255,255,255,0.15)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>Fermer</span>
                <X size={18} strokeWidth={2} />
              </div>
            </div>

            {/* Navigation links — staggered slide-in */}
            <nav
              {...elementProps(config.id, 'offCanvasLinks', 'container', 'Menu Links')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                flex: 1,
              }}
            >
              {menuLinks.map((link, i) => (
                <a
                  key={link.label}
                  {...elementProps(config.id, `menuLinks.${i}`, 'link', link.label)}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontSize: 'clamp(28px, 5vw, 48px)',
                    fontWeight: 500,
                    color: '#FAFAF8',
                    textDecoration: 'none',
                    padding: '8px 0',
                    transition: 'color 0.3s, transform 0.3s',
                    display: 'block',
                    fontFamily: "'Inter Variable', var(--font-body, sans-serif)",
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                    opacity: menuOpen ? 1 : 0,
                    transitionDelay: `${i * 0.1}s`,
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#2D5016' }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#FAFAF8' }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Bottom — Announcement text + Social Icons */}
            <div
              {...elementProps(config.id, 'offCanvasBottom', 'container', 'Menu Bottom')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                paddingTop: '32px',
                borderTop: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {/* Announcement / CTA text */}
              {ctaLabel && (
                <p
                  {...elementProps(config.id, 'offCanvasAnnouncement', 'text', 'Announcement')}
                  style={{
                    fontSize: '14px',
                    fontWeight: 400,
                    color: 'rgba(250,250,248,0.5)',
                    lineHeight: 1.6,
                    margin: 0,
                    maxWidth: '360px',
                  }}
                >
                  {ctaLabel}
                </p>
              )}

              {/* Social icons */}
              <div
                {...elementProps(config.id, 'offCanvasSocials', 'container', 'Social Icons')}
                style={{ display: 'flex', gap: '16px' }}
              >
                {socials.map((s, i) => (
                  <a
                    key={s.label}
                    {...elementProps(config.id, `social.${i}`, 'link', s.label)}
                    href={s.href}
                    style={{
                      color: 'rgba(255,255,255,0.5)',
                      transition: 'color 0.3s, transform 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '1px solid rgba(255,255,255,0.15)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = '#FAFAF8'
                      ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(45, 80, 22, 0.6)'
                      ;(e.currentTarget as HTMLElement).style.transform = 'scale(1.1)'
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'
                      ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'
                      ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Decorative image with green tint overlay */}
          <div
            {...elementProps(config.id, 'offCanvasImage', 'image', 'Menu Image')}
            className="canopy-resp-menu-right"
            style={{
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: '#2a2a2a',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80"
              alt="Forest canopy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.7,
                transform: menuOpen ? 'scale(1)' : 'scale(1.1)',
                transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
            {/* Green tint overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(45, 80, 22, 0.35) 0%, rgba(26,26,26,0.3) 60%)',
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

function BrixsaHeader({ config, logo, ctaLabel, links }: { config: SectionConfig; logo: string; ctaLabel?: string; links: NavLink[] }) {
  const [menuOpen, setMenuOpen] = useState(false)

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [menuOpen])

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [menuOpen])

  const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), [])

  // All menu links (include FAQ + Privacy Policy beyond the section links)
  const menuLinks: { label: string; href: string }[] = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Property', href: '/property' },
    { label: 'Agents', href: '/agents' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
  ]

  const socials = [
    { label: 'Instagram', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
    )},
    { label: 'Facebook', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    )},
    { label: 'X', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    )},
    { label: 'LinkedIn', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    )},
  ]

  return (
    <>
      {/* Brixsa responsive styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .brixsa-resp-menu-grid { grid-template-columns: 1fr !important; }
          .brixsa-resp-menu-right { display: none !important; }
        }
      ` }} />
      {/* ─── NAVBAR ─── */}
      <header
        {...elementProps(config.id, 'wrapper', 'container', 'Header')}
        className={cn('absolute top-0 left-0 w-full flex items-center')}
        style={{
          zIndex: 888,
          backgroundColor: 'transparent',
          minHeight: '72px',
          paddingLeft: 'clamp(20px, 5vw, 60px)',
          paddingRight: 'clamp(20px, 5vw, 60px)',
          fontFamily: 'var(--font-body, inherit)',
        }}
      >
        <div
          {...elementProps(config.id, 'navGrid', 'container', 'Nav Grid')}
          className={cn('grid items-center w-full')}
          style={{
            gridTemplateColumns: '.375fr minmax(min-content, max-content)',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          {/* LEFT — Logo */}
          <div
            {...elementProps(config.id, 'logo', 'image')}
            className="text-white tracking-wide"
            style={{
              maxWidth: '140px',
              fontSize: '20px',
              fontWeight: 600,
              fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
            }}
          >
            {renderLogo(logo)}<sup>®</sup>
          </div>

          {/* RIGHT — Menu button (glassmorphism) */}
          <div
            {...elementProps(config.id, 'ctaLabel', 'button')}
            role="button"
            onClick={toggleMenu}
            className={cn('flex items-center cursor-pointer')}
            style={{
              borderRadius: '4px',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(128,117,117,0.5)',
              color: 'white',
              paddingLeft: '20px',
              paddingRight: '20px',
              paddingTop: '8px',
              paddingBottom: '8px',
              fontSize: '16px',
              fontWeight: 500,
              fontFamily: "'Inter Variable', var(--font-body, sans-serif)",
              border: 'none',
              gap: '10px',
              whiteSpace: 'nowrap',
            }}
          >
            <span {...elementProps(config.id, 'menuLabel', 'text', 'Menu Label')}>{ctaLabel || 'Menu'}</span>
            {/* Toggle icon */}
            <span
              {...elementProps(config.id, 'menuIcon', 'icon', 'Menu Icon')}
              className={cn('flex flex-col items-center')}
              style={{ gap: '3px' }}
            >
              <span className="bg-white" style={{ width: '18px', height: '2px', display: 'block' }} />
              <span className="bg-white" style={{ width: '18px', height: '2px', display: 'block' }} />
            </span>
          </div>
        </div>
      </header>

      {/* ─── OFF-CANVAS MENU OVERLAY ─── */}
      <div
        {...elementProps(config.id, 'offCanvas', 'container', 'Off-Canvas Menu')}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          visibility: menuOpen ? 'visible' : 'hidden',
          opacity: menuOpen ? 1 : 0,
          transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.5s',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        {/* Dark background overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#1a1a1a',
          }}
        />

        {/* Menu content grid */}
        <div
          {...elementProps(config.id, 'offCanvasGrid', 'container', 'Menu Grid')}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            fontFamily: "'Inter Variable', var(--font-body, sans-serif)",
          }}
          className="brixsa-resp-menu-grid"
        >
          {/* LEFT COLUMN — Navigation */}
          <div
            {...elementProps(config.id, 'offCanvasNav', 'container', 'Menu Navigation')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 'clamp(20px, 5vw, 60px)',
              paddingTop: 'clamp(40px, 8vw, 80px)',
            }}
          >
            {/* Top — Logo + Close */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '48px' }}>
              <div
                {...elementProps(config.id, 'offCanvasLogo', 'text', 'Menu Logo')}
                style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: 'white',
                  fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
                }}
              >
                {renderLogo(logo)}<sup>®</sup>
              </div>
              <div
                {...elementProps(config.id, 'closeButton', 'button', 'Close Button')}
                role="button"
                onClick={toggleMenu}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  borderRadius: '4px',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  backgroundColor: 'rgba(128,117,117,0.5)',
                  color: 'white',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  paddingTop: '8px',
                  paddingBottom: '8px',
                  fontSize: '16px',
                  fontWeight: 500,
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>Close</span>
                <X size={18} strokeWidth={2} />
              </div>
            </div>

            {/* Navigation links */}
            <nav
              {...elementProps(config.id, 'offCanvasLinks', 'container', 'Menu Links')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                flex: 1,
              }}
            >
              {menuLinks.map((link, i) => (
                <a
                  key={link.label}
                  {...elementProps(config.id, `menuLinks.${i}`, 'link', link.label)}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontSize: i < 6 ? 'clamp(24px, 5vw, 40px)' : '18px',
                    fontWeight: i < 6 ? 500 : 400,
                    color: i < 6 ? 'white' : 'rgba(255,255,255,0.5)',
                    textDecoration: 'none',
                    padding: i < 6 ? '8px 0' : '4px 0',
                    transition: 'color 0.3s, transform 0.3s',
                    display: 'block',
                    fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: `${i * 0.05}s`,
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#c8a97e' }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = i < 6 ? 'white' : 'rgba(255,255,255,0.5)' }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Bottom — Social Icons + CTA */}
            <div
              {...elementProps(config.id, 'offCanvasBottom', 'container', 'Menu Bottom')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '32px',
                borderTop: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {/* Social icons */}
              <div
                {...elementProps(config.id, 'offCanvasSocials', 'container', 'Social Icons')}
                style={{ display: 'flex', gap: '16px' }}
              >
                {socials.map((s, i) => (
                  <a
                    key={s.label}
                    {...elementProps(config.id, `social.${i}`, 'link', s.label)}
                    href={s.href}
                    style={{
                      color: 'rgba(255,255,255,0.5)',
                      transition: 'color 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '1px solid rgba(255,255,255,0.15)',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'white'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.4)' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)' }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>

              {/* CTA */}
              <a
                {...elementProps(config.id, 'offCanvasCta', 'button', 'Get in Touch')}
                href="#contact"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 28px',
                  backgroundColor: '#c8a97e',
                  color: '#1a1a1a',
                  fontSize: '14px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  borderRadius: '4px',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#d4b88e' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#c8a97e' }}
              >
                Get in touch
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN — Image overlay */}
          <div
            {...elementProps(config.id, 'offCanvasImage', 'image', 'Menu Image')}
            className="brixsa-resp-menu-right"
            style={{
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: '#2a2a2a',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80"
              alt="Luxury property"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.7,
                transform: menuOpen ? 'scale(1)' : 'scale(1.1)',
                transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
            {/* Image overlay gradient */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(26,26,26,0.4) 0%, transparent 60%)',
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
  }

// ─── ZMR Agency Header ───

function ZmrAgencyHeader({ config, logo, ctaLabel, links }: { config: SectionConfig; logo: string; ctaLabel?: string; links: NavLink[] }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(true)
  const lastScrollY = useRef(0)
  const headerRef = useRef<HTMLDivElement>(null)
  const [canvasRect, setCanvasRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null)
  const [viewportRect, setViewportRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null)
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null)

  useEffect(() => { setMounted(true) }, [])

  // Track canvas viewport rect + scroll direction
  useEffect(() => {
    if (!mounted) return
    const canvasEl = document.getElementById('site-canvas')
    if (!canvasEl) return

    // Walk up to the scrollable ancestor
    let scrollParent: HTMLElement | null = canvasEl.parentElement
    while (scrollParent) {
      const style = getComputedStyle(scrollParent)
      if (style.overflowY === 'auto' || style.overflowY === 'scroll' || style.overflow === 'auto') break
      scrollParent = scrollParent.parentElement
    }
    if (!scrollParent) return
    setScrollContainer(scrollParent)

    const updateRect = () => {
      const r = canvasEl.getBoundingClientRect()
      setCanvasRect({ top: r.top, left: r.left, width: r.width, height: r.height })
      // Viewport rect = scroll container bounds (stable, for overlays)
      const vr = scrollParent!.getBoundingClientRect()
      setViewportRect({ top: vr.top, left: r.left, width: r.width, height: vr.height })
    }
    updateRect()

    const ro = new ResizeObserver(updateRect)
    ro.observe(canvasEl)

    const onScroll = () => {
      const y = scrollParent!.scrollTop
      const delta = y - lastScrollY.current
      // Hide when scrolling down more than 5px (and past initial 80px)
      // Show immediately when scrolling up at all
      if (delta > 5 && y > 80) {
        setHeaderVisible(false)
      } else if (delta < -5) {
        setHeaderVisible(true)
      }
      lastScrollY.current = y
      updateRect()
    }
    scrollParent.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      scrollParent!.removeEventListener('scroll', onScroll)
      ro.disconnect()
    }
  }, [mounted])

  if (!mounted || !canvasRect || !scrollContainer) return <div style={{ height: 0 }} />

  return createPortal(
    <div style={{
      position: 'fixed',
      top: viewportRect?.top ?? canvasRect.top,
      left: viewportRect?.left ?? canvasRect.left,
      width: viewportRect?.width ?? canvasRect.width,
      height: viewportRect?.height ?? canvasRect.height,
      zIndex: 30,
      pointerEvents: 'none',
      overflow: 'hidden',
    }}>
      {/* Header — clipped to canvas viewport */}
      {!menuOpen && !searchOpen && (
        <header
          ref={headerRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            pointerEvents: 'none',
            fontFamily: 'var(--font-body, inherit)',
            height: '160px',
            transform: headerVisible ? 'translateY(0)' : 'translateY(-160px)',
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Centered Logo */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              top: '20px',
              zIndex: 10,
              pointerEvents: 'auto',
            }}
          >
            <a
              href="/"
              {...elementProps(config.id, 'logo', 'image')}
              style={{
                color: 'white',
                fontWeight: 300,
                letterSpacing: '0.2em',
                fontSize: 'clamp(32px, 6vw, 72px)',
                lineHeight: 1,
                transition: 'opacity 0.3s',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'block',
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
            >
              {renderLogo(logo)}
            </a>
            {ctaLabel && (
              <p style={{
                color: 'white',
                fontWeight: 300,
                letterSpacing: '0.4em',
                fontSize: 'clamp(8px, 1vw, 11px)',
                textTransform: 'uppercase',
                marginTop: '10px',
              }}>
                {ctaLabel}
              </p>
            )}
          </div>

          {/* Right Icons */}
          <div
            style={{
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              top: 'clamp(20px, 4vh, 32px)',
              right: 'clamp(16px, 4vw, 32px)',
              gap: 'clamp(16px, 3vw, 24px)',
              zIndex: 50,
              pointerEvents: 'auto',
            }}
          >
            <button
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'opacity 0.3s' }}
              onClick={() => setSearchOpen(true)}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.5')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <Search style={{ width: 20, height: 20, color: 'white' }} />
            </button>
            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'opacity 0.3s' }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.5')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <User style={{ width: 20, height: 20, color: 'white' }} />
            </button>
            <a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'opacity 0.3s' }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.5')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="white" stroke="none" />
              </svg>
            </a>
            <button
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 'clamp(28px, 4vw, 32px)', height: 'clamp(28px, 4vw, 32px)' }}
              onClick={() => setMenuOpen(true)}
            >
              <span style={{ width: '100%', height: '2px', backgroundColor: 'white', marginBottom: 'clamp(6px, 1vw, 8px)' }} />
              <span style={{ width: '100%', height: '2px', backgroundColor: 'white' }} />
            </button>
          </div>
        </header>
      )}

      {/* Fullscreen Menu Overlay */}
      {menuOpen && viewportRect && (
        <div
          style={{
            position: 'fixed',
            top: viewportRect.top,
            left: viewportRect.left,
            width: viewportRect.width,
            height: viewportRect.height,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'black',
            zIndex: 99999,
            padding: '20px',
            overflowY: 'auto',
            pointerEvents: 'auto',
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(12px, 2.5vh, 28px)' }}>
            {links.map((link, i) => (
              <a
                {...elementProps(config.id, `links.${i}.label`, 'link')}
                key={link.id}
                href={link.href}
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: 'clamp(28px, 5.5vw, 90px)',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  transition: 'opacity 0.3s',
                  background: 'none',
                  display: 'block',
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = '0.5')}
                onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <button
            style={{
              position: 'absolute',
              top: 'clamp(20px, 4vh, 32px)',
              right: 'clamp(20px, 4vw, 32px)',
              width: '32px',
              height: '32px',
              zIndex: 10000,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => setMenuOpen(false)}
          >
            <span style={{ position: 'absolute', width: '100%', height: '2px', backgroundColor: 'white', transform: 'rotate(45deg)' }} />
            <span style={{ position: 'absolute', width: '100%', height: '2px', backgroundColor: 'white', transform: 'rotate(-45deg)' }} />
          </button>
        </div>
      )}

      {/* Search Overlay */}
      {searchOpen && viewportRect && (
        <div
          style={{
            position: 'fixed',
            top: viewportRect.top,
            left: viewportRect.left,
            width: viewportRect.width,
            height: viewportRect.height,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'black',
            zIndex: 99999,
            pointerEvents: 'auto',
          }}
        >
          <div style={{ width: '100%', maxWidth: '600px', padding: '0 24px' }}>
            <input
              type="text"
              placeholder="Rechercher..."
              autoFocus
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.3)',
                color: 'white',
                fontSize: 'clamp(24px, 5vw, 32px)',
                fontWeight: 300,
                letterSpacing: '-0.01em',
                padding: '16px 0',
                outline: 'none',
              }}
            />
          </div>
          <button
            style={{
              position: 'absolute',
              top: 'clamp(20px, 4vh, 32px)',
              right: 'clamp(20px, 4vw, 32px)',
              width: '32px',
              height: '32px',
              zIndex: 10000,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => setSearchOpen(false)}
          >
            <span style={{ position: 'absolute', width: '100%', height: '2px', backgroundColor: 'white', transform: 'rotate(45deg)' }} />
            <span style={{ position: 'absolute', width: '100%', height: '2px', backgroundColor: 'white', transform: 'rotate(-45deg)' }} />
          </button>
        </div>
      )}
    </div>,
    document.body
  )
}

// ─── Braise Off-Canvas Menu ───
// Restaurant gastronomique premium : glassmorphism burgundy, off-canvas fullscreen, staggered links

function BraiseHeader({ config, logo, ctaLabel, links }: { config: SectionConfig; logo: string; ctaLabel?: string; links: NavLink[] }) {
  const [menuOpen, setMenuOpen] = useState(false)

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [menuOpen])

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [menuOpen])

  const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), [])

  // Default nav links for restaurant
  const menuLinks: { label: string; href: string }[] = links.length > 0
    ? links.map(l => ({ label: l.label, href: l.href }))
    : [
        { label: 'Accueil', href: '/' },
        { label: 'La Carte', href: '/carte' },
        { label: 'Notre Histoire', href: '/histoire' },
        { label: 'Réservation', href: '/reservation' },
        { label: 'Événements', href: '/evenements' },
        { label: 'Contact', href: '/contact' },
      ]

  const socials = [
    { label: 'Instagram', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
    )},
    { label: 'Facebook', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    )},
    { label: 'TripAdvisor', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15a3 3 0 110-6 3 3 0 010 6zm4 0a3 3 0 110-6 3 3 0 010 6zm2.5-7H7.5C6.67 10 6 9.33 6 8.5S6.67 7 7.5 7h9c.83 0 1.5.67 1.5 1.5S16.33 10 15.5 10z"/></svg>
    )},
  ]

  return (
    <>
      {/* Braise header responsive styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .braise-resp-menu-grid { grid-template-columns: 1fr !important; }
          .braise-resp-menu-right { display: none !important; }
        }
      ` }} />
      {/* ─── NAVBAR ─── */}
      <header
        {...elementProps(config.id, 'wrapper', 'container', 'Header')}
        className={cn('absolute top-0 left-0 w-full flex items-center')}
        style={{
          zIndex: 888,
          backgroundColor: 'transparent',
          minHeight: '72px',
          paddingLeft: 'clamp(20px, 5vw, 60px)',
          paddingRight: 'clamp(20px, 5vw, 60px)',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        <div
          {...elementProps(config.id, 'navGrid', 'container', 'Nav Grid')}
          className={cn('grid items-center w-full')}
          style={{
            gridTemplateColumns: '.375fr minmax(min-content, max-content)',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          {/* LEFT — Logo */}
          <div
            {...elementProps(config.id, 'logo', 'image')}
            className="tracking-wide"
            style={{
              maxWidth: '140px',
              fontSize: '20px',
              fontWeight: 600,
              color: '#F5F0E8',
              fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
            }}
          >
            {renderLogo(logo, 'font-semibold text-lg')}
          </div>

          {/* RIGHT — Menu button (glassmorphism burgundy tint) */}
          <div
            {...elementProps(config.id, 'ctaLabel', 'button')}
            role="button"
            onClick={toggleMenu}
            className={cn('flex items-center cursor-pointer')}
            style={{
              borderRadius: '999px',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              backgroundColor: 'rgba(114, 47, 55, 0.3)',
              color: '#F5F0E8',
              paddingLeft: '20px',
              paddingRight: '20px',
              paddingTop: '10px',
              paddingBottom: '10px',
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
              border: '1px solid rgba(114, 47, 55, 0.2)',
              gap: '10px',
              whiteSpace: 'nowrap',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(114, 47, 55, 0.45)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(114, 47, 55, 0.3)' }}
          >
            <span {...elementProps(config.id, 'menuLabel', 'text', 'Menu Label')}>{ctaLabel || 'Menu'}</span>
            {/* Hamburger icon */}
            <span
              {...elementProps(config.id, 'menuIcon', 'icon', 'Menu Icon')}
              className={cn('flex flex-col items-center')}
              style={{ gap: '3px' }}
            >
              <span style={{ width: '18px', height: '2px', display: 'block', backgroundColor: '#F5F0E8' }} />
              <span style={{ width: '18px', height: '2px', display: 'block', backgroundColor: '#F5F0E8' }} />
            </span>
          </div>
        </div>
      </header>

      {/* ─── OFF-CANVAS MENU OVERLAY ─── */}
      <div
        {...elementProps(config.id, 'offCanvas', 'container', 'Off-Canvas Menu')}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          visibility: menuOpen ? 'visible' : 'hidden',
          opacity: menuOpen ? 1 : 0,
          transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.5s',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        {/* Dark near-black background with glassmorphism */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(26, 18, 9, 0.95)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
          }}
        />

        {/* Menu content grid */}
        <div
          {...elementProps(config.id, 'offCanvasGrid', 'container', 'Menu Grid')}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
          }}
          className="braise-resp-menu-grid"
        >
          {/* LEFT COLUMN — Navigation */}
          <div
            {...elementProps(config.id, 'offCanvasNav', 'container', 'Menu Navigation')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 'clamp(20px, 5vw, 60px)',
              paddingTop: 'clamp(40px, 8vw, 80px)',
            }}
          >
            {/* Top — Logo + Close */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '48px' }}>
              <div
                {...elementProps(config.id, 'offCanvasLogo', 'text', 'Menu Logo')}
                style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#F5F0E8',
                  fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
                }}
              >
                {renderLogo(logo)}
              </div>
              <div
                {...elementProps(config.id, 'closeButton', 'button', 'Close Button')}
                role="button"
                onClick={toggleMenu}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  borderRadius: '999px',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  backgroundColor: 'rgba(114, 47, 55, 0.3)',
                  color: '#C8A96E',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  fontSize: '14px',
                  fontWeight: 500,
                  border: '1px solid rgba(114, 47, 55, 0.2)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(114, 47, 55, 0.45)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(114, 47, 55, 0.3)' }}
              >
                <span>Fermer</span>
                <X size={18} strokeWidth={2} />
              </div>
            </div>

            {/* Navigation links — staggered slide-in from left */}
            <nav
              {...elementProps(config.id, 'offCanvasLinks', 'container', 'Menu Links')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                flex: 1,
              }}
            >
              {menuLinks.map((link, i) => (
                <a
                  key={link.label}
                  {...elementProps(config.id, `menuLinks.${i}`, 'link', link.label)}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontSize: 'clamp(28px, 5vw, 48px)',
                    fontWeight: 500,
                    color: '#E8E4DF',
                    textDecoration: 'none',
                    padding: '8px 0',
                    transition: 'color 0.3s, transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.5s',
                    display: 'block',
                    fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    transform: menuOpen ? 'translateX(0)' : 'translateX(-30px)',
                    opacity: menuOpen ? 1 : 0,
                    transitionDelay: `${i * 0.05}s`,
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#C8A96E' }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#E8E4DF' }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Bottom — Social Icons */}
            <div
              {...elementProps(config.id, 'offCanvasBottom', 'container', 'Menu Bottom')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '32px',
                borderTop: '1px solid rgba(232, 228, 223, 0.1)',
              }}
            >
              {/* Social icons */}
              <div
                {...elementProps(config.id, 'offCanvasSocials', 'container', 'Social Icons')}
                style={{ display: 'flex', gap: '16px' }}
              >
                {socials.map((s, i) => (
                  <a
                    key={s.label}
                    {...elementProps(config.id, `social.${i}`, 'link', s.label)}
                    href={s.href}
                    style={{
                      color: 'rgba(232, 228, 223, 0.5)',
                      transition: 'color 0.3s, border-color 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '1px solid rgba(232, 228, 223, 0.15)',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C8A96E'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200, 169, 110, 0.4)' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(232, 228, 223, 0.5)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(232, 228, 223, 0.15)' }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>

              {/* Phone number */}
              <a
                {...elementProps(config.id, 'offCanvasPhone', 'link', 'Phone')}
                href="tel:+33100000000"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'rgba(232, 228, 223, 0.5)',
                  fontSize: '14px',
                  fontWeight: 400,
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C8A96E' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(232, 228, 223, 0.5)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                +33 1 00 00 00 00
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN — Decorative food image */}
          <div
            {...elementProps(config.id, 'offCanvasImage', 'image', 'Menu Image')}
            className="braise-resp-menu-right"
            style={{
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: '#1A1209',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80"
              alt="Gastronomie"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.7,
                transform: menuOpen ? 'scale(1)' : 'scale(1.1)',
                transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
            {/* Dark burgundy tint overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(26, 18, 9, 0.5) 0%, rgba(114, 47, 55, 0.2) 60%, transparent 100%)',
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Forge Off-Canvas Menu (Coach Sportif Premium) ───

function ForgeHeader({ config, logo, ctaLabel, links }: { config: SectionConfig; logo: string; ctaLabel?: string; links: NavLink[] }) {
  const [menuOpen, setMenuOpen] = useState(false)

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [menuOpen])

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [menuOpen])

  const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), [])

  // Default nav links for sports coach
  const menuLinks: { label: string; href: string }[] = links.length > 0
    ? links.map(l => ({ label: l.label, href: l.href }))
    : [
        { label: 'Accueil', href: '/' },
        { label: 'Programmes', href: '/programmes' },
        { label: 'Coaching', href: '/coaching' },
        { label: 'Transformation', href: '/transformation' },
        { label: 'Tarifs', href: '/tarifs' },
        { label: 'Contact', href: '/contact' },
      ]

  const socials = [
    { label: 'Instagram', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
    )},
    { label: 'YouTube', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
    )},
    { label: 'TikTok', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52V6.8a4.84 4.84 0 01-1-.11z"/></svg>
    )},
  ]

  return (
    <>
      {/* Forge header responsive styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .forge-resp-menu-grid { grid-template-columns: 1fr !important; }
          .forge-resp-menu-right { display: none !important; }
        }
      ` }} />
      {/* ─── NAVBAR ─── */}
      <header
        {...elementProps(config.id, 'wrapper', 'container', 'Header')}
        className={cn('absolute top-0 left-0 w-full flex items-center')}
        style={{
          zIndex: 888,
          backgroundColor: 'transparent',
          minHeight: '72px',
          paddingLeft: 'clamp(20px, 5vw, 60px)',
          paddingRight: 'clamp(20px, 5vw, 60px)',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        <div
          {...elementProps(config.id, 'navGrid', 'container', 'Nav Grid')}
          className={cn('grid items-center w-full')}
          style={{
            gridTemplateColumns: '.375fr minmax(min-content, max-content)',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          {/* LEFT — Logo */}
          <div
            {...elementProps(config.id, 'logo', 'image')}
            className="tracking-wide"
            style={{
              maxWidth: '140px',
              fontSize: '20px',
              fontWeight: 600,
              color: '#E8E8E8',
              fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
            }}
          >
            {renderLogo(logo, 'font-semibold text-lg')}
          </div>

          {/* RIGHT — Menu button (glassmorphism orange tint) */}
          <div
            {...elementProps(config.id, 'ctaLabel', 'button')}
            role="button"
            onClick={toggleMenu}
            className={cn('flex items-center cursor-pointer')}
            style={{
              borderRadius: '999px',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              backgroundColor: 'rgba(255, 77, 0, 0.25)',
              color: '#E8E8E8',
              paddingLeft: '20px',
              paddingRight: '20px',
              paddingTop: '10px',
              paddingBottom: '10px',
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
              border: '1px solid rgba(255, 77, 0, 0.2)',
              gap: '10px',
              whiteSpace: 'nowrap',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255, 77, 0, 0.4)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255, 77, 0, 0.25)' }}
          >
            <span {...elementProps(config.id, 'menuLabel', 'text', 'Menu Label')}>{ctaLabel || 'Menu'}</span>
            {/* Hamburger icon */}
            <span
              {...elementProps(config.id, 'menuIcon', 'icon', 'Menu Icon')}
              className={cn('flex flex-col items-center')}
              style={{ gap: '3px' }}
            >
              <span style={{ width: '18px', height: '2px', display: 'block', backgroundColor: '#E8E8E8' }} />
              <span style={{ width: '18px', height: '2px', display: 'block', backgroundColor: '#E8E8E8' }} />
            </span>
          </div>
        </div>
      </header>

      {/* ─── OFF-CANVAS MENU OVERLAY ─── */}
      <div
        {...elementProps(config.id, 'offCanvas', 'container', 'Off-Canvas Menu')}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          visibility: menuOpen ? 'visible' : 'hidden',
          opacity: menuOpen ? 1 : 0,
          transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.5s',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        {/* Dark background with glassmorphism */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(10, 10, 10, 0.95)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
          }}
        />

        {/* Menu content grid */}
        <div
          {...elementProps(config.id, 'offCanvasGrid', 'container', 'Menu Grid')}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
          }}
          className="forge-resp-menu-grid"
        >
          {/* LEFT COLUMN — Navigation */}
          <div
            {...elementProps(config.id, 'offCanvasNav', 'container', 'Menu Navigation')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 'clamp(20px, 5vw, 60px)',
              paddingTop: 'clamp(40px, 8vw, 80px)',
            }}
          >
            {/* Top — Logo + Close */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '48px' }}>
              <div
                {...elementProps(config.id, 'offCanvasLogo', 'text', 'Menu Logo')}
                style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#E8E8E8',
                  fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
                }}
              >
                {renderLogo(logo)}
              </div>
              <div
                {...elementProps(config.id, 'closeButton', 'button', 'Close Button')}
                role="button"
                onClick={toggleMenu}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  borderRadius: '999px',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  backgroundColor: 'rgba(255, 77, 0, 0.25)',
                  color: '#FF4D00',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  fontSize: '14px',
                  fontWeight: 500,
                  border: '1px solid rgba(255, 77, 0, 0.2)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255, 77, 0, 0.4)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255, 77, 0, 0.25)' }}
              >
                <span>Fermer</span>
                <X size={18} strokeWidth={2} />
              </div>
            </div>

            {/* Navigation links — staggered slide-in from left */}
            <nav
              {...elementProps(config.id, 'offCanvasLinks', 'container', 'Menu Links')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                flex: 1,
              }}
            >
              {menuLinks.map((link, i) => (
                <a
                  key={link.label}
                  {...elementProps(config.id, `menuLinks.${i}`, 'link', link.label)}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontSize: 'clamp(28px, 5vw, 48px)',
                    fontWeight: 500,
                    color: '#E8E8E8',
                    textDecoration: 'none',
                    padding: '8px 0',
                    transition: 'color 0.3s, transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.5s',
                    display: 'block',
                    fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    transform: menuOpen ? 'translateX(0)' : 'translateX(-30px)',
                    opacity: menuOpen ? 1 : 0,
                    transitionDelay: `${i * 0.05}s`,
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#FF4D00' }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#E8E8E8' }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Bottom — Social Icons */}
            <div
              {...elementProps(config.id, 'offCanvasBottom', 'container', 'Menu Bottom')}
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingTop: '32px',
                borderTop: '1px solid rgba(232, 232, 232, 0.1)',
              }}
            >
              {/* Social icons */}
              <div
                {...elementProps(config.id, 'offCanvasSocials', 'container', 'Social Icons')}
                style={{ display: 'flex', gap: '16px' }}
              >
                {socials.map((s, i) => (
                  <a
                    key={s.label}
                    {...elementProps(config.id, `social.${i}`, 'link', s.label)}
                    href={s.href}
                    style={{
                      color: 'rgba(232, 232, 232, 0.5)',
                      transition: 'color 0.3s, border-color 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '1px solid rgba(232, 232, 232, 0.15)',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#FF4D00'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 77, 0, 0.4)' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(232, 232, 232, 0.5)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(232, 232, 232, 0.15)' }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Decorative workout image */}
          <div
            {...elementProps(config.id, 'offCanvasImage', 'image', 'Menu Image')}
            className="forge-resp-menu-right"
            style={{
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: '#0A0A0A',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80"
              alt="Coaching sportif"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.7,
                transform: menuOpen ? 'scale(1)' : 'scale(1.1)',
                transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
            {/* Dark orange tint overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.5) 0%, rgba(255, 77, 0, 0.15) 60%, transparent 100%)',
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Ciseaux Off-Canvas Menu (Salon de Coiffure Premium) ───

function CiseauxHeader({ config, logo, ctaLabel, links }: { config: SectionConfig; logo: string; ctaLabel?: string; links: NavLink[] }) {
  const [menuOpen, setMenuOpen] = useState(false)

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [menuOpen])

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [menuOpen])

  const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), [])

  // Default nav links for hair salon
  const menuLinks: { label: string; href: string }[] = links.length > 0
    ? links.map(l => ({ label: l.label, href: l.href }))
    : [
        { label: 'Accueil', href: '/' },
        { label: 'Prestations', href: '/prestations' },
        { label: 'Galerie', href: '/galerie' },
        { label: "L'\u00C9quipe", href: '/equipe' },
        { label: 'Tarifs', href: '/tarifs' },
        { label: 'Contact', href: '/contact' },
      ]

  const socials = [
    { label: 'Instagram', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
    )},
    { label: 'Facebook', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    )},
    { label: 'Pinterest', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345c-.091.379-.293 1.194-.333 1.361-.052.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
    )},
  ]

  return (
    <>
      {/* Ciseaux header responsive styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .ciseaux-resp-menu-grid { grid-template-columns: 1fr !important; }
          .ciseaux-resp-menu-right { display: none !important; }
        }
      ` }} />
      {/* ─── NAVBAR ─── */}
      <header
        {...elementProps(config.id, 'wrapper', 'container', 'Header')}
        className={cn('absolute top-0 left-0 w-full flex items-center')}
        style={{
          zIndex: 888,
          backgroundColor: 'transparent',
          minHeight: '72px',
          paddingLeft: 'clamp(20px, 5vw, 60px)',
          paddingRight: 'clamp(20px, 5vw, 60px)',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        <div
          {...elementProps(config.id, 'navGrid', 'container', 'Nav Grid')}
          className={cn('grid items-center w-full')}
          style={{
            gridTemplateColumns: '.375fr minmax(min-content, max-content)',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          {/* LEFT — Logo */}
          <div
            {...elementProps(config.id, 'logo', 'image')}
            className="tracking-wide"
            style={{
              maxWidth: '140px',
              fontSize: '20px',
              fontWeight: 600,
              color: '#FFFFFF',
              fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
            }}
          >
            {renderLogo(logo, 'font-semibold text-lg')}
          </div>

          {/* RIGHT — Menu button (glassmorphism copper tint) */}
          <div
            {...elementProps(config.id, 'ctaLabel', 'button')}
            role="button"
            onClick={toggleMenu}
            className={cn('flex items-center cursor-pointer')}
            style={{
              borderRadius: '999px',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              backgroundColor: 'rgba(183, 110, 121, 0.25)',
              color: '#FFFFFF',
              paddingLeft: '20px',
              paddingRight: '20px',
              paddingTop: '10px',
              paddingBottom: '10px',
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
              border: '1px solid rgba(183, 110, 121, 0.2)',
              gap: '10px',
              whiteSpace: 'nowrap',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(183, 110, 121, 0.4)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(183, 110, 121, 0.25)' }}
          >
            <span {...elementProps(config.id, 'menuLabel', 'text', 'Menu Label')}>{ctaLabel || 'Menu'}</span>
            {/* Hamburger icon */}
            <span
              {...elementProps(config.id, 'menuIcon', 'icon', 'Menu Icon')}
              className={cn('flex flex-col items-center')}
              style={{ gap: '3px' }}
            >
              <span style={{ width: '18px', height: '2px', display: 'block', backgroundColor: '#FFFFFF' }} />
              <span style={{ width: '18px', height: '2px', display: 'block', backgroundColor: '#FFFFFF' }} />
            </span>
          </div>
        </div>
      </header>

      {/* ─── OFF-CANVAS MENU OVERLAY ─── */}
      <div
        {...elementProps(config.id, 'offCanvas', 'container', 'Off-Canvas Menu')}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          visibility: menuOpen ? 'visible' : 'hidden',
          opacity: menuOpen ? 1 : 0,
          transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.5s',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        {/* Dark background with glassmorphism */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(11, 11, 11, 0.95)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
          }}
        />

        {/* Menu content grid */}
        <div
          {...elementProps(config.id, 'offCanvasGrid', 'container', 'Menu Grid')}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
          }}
          className="ciseaux-resp-menu-grid"
        >
          {/* LEFT COLUMN — Navigation */}
          <div
            {...elementProps(config.id, 'offCanvasNav', 'container', 'Menu Navigation')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 'clamp(20px, 5vw, 60px)',
              paddingTop: 'clamp(40px, 8vw, 80px)',
            }}
          >
            {/* Top — Logo + Close */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '48px' }}>
              <div
                {...elementProps(config.id, 'offCanvasLogo', 'text', 'Menu Logo')}
                style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
                }}
              >
                {renderLogo(logo)}
              </div>
              <div
                {...elementProps(config.id, 'closeButton', 'button', 'Close Button')}
                role="button"
                onClick={toggleMenu}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  borderRadius: '999px',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  backgroundColor: 'rgba(183, 110, 121, 0.25)',
                  color: '#B76E79',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  fontSize: '14px',
                  fontWeight: 500,
                  border: '1px solid rgba(183, 110, 121, 0.2)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(183, 110, 121, 0.4)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(183, 110, 121, 0.25)' }}
              >
                <span>Fermer</span>
                <X size={18} strokeWidth={2} />
              </div>
            </div>

            {/* Navigation links — staggered slide-in from left */}
            <nav
              {...elementProps(config.id, 'offCanvasLinks', 'container', 'Menu Links')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                flex: 1,
              }}
            >
              {menuLinks.map((link, i) => (
                <a
                  key={link.label}
                  {...elementProps(config.id, `menuLinks.${i}`, 'link', link.label)}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontSize: 'clamp(28px, 5vw, 48px)',
                    fontWeight: 500,
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    padding: '8px 0',
                    transition: 'color 0.3s, transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.5s',
                    display: 'block',
                    fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    transform: menuOpen ? 'translateX(0)' : 'translateX(-30px)',
                    opacity: menuOpen ? 1 : 0,
                    transitionDelay: `${i * 0.05}s`,
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#B76E79' }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#FFFFFF' }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Bottom — Social Icons */}
            <div
              {...elementProps(config.id, 'offCanvasBottom', 'container', 'Menu Bottom')}
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingTop: '32px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              {/* Social icons */}
              <div
                {...elementProps(config.id, 'offCanvasSocials', 'container', 'Social Icons')}
                style={{ display: 'flex', gap: '16px' }}
              >
                {socials.map((s, i) => (
                  <a
                    key={s.label}
                    {...elementProps(config.id, `social.${i}`, 'link', s.label)}
                    href={s.href}
                    style={{
                      color: 'rgba(255, 255, 255, 0.5)',
                      transition: 'color 0.3s, border-color 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#B76E79'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(183, 110, 121, 0.4)' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255, 255, 255, 0.5)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.15)' }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Decorative salon image */}
          <div
            {...elementProps(config.id, 'offCanvasImage', 'image', 'Menu Image')}
            className="ciseaux-resp-menu-right"
            style={{
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: '#0B0B0B',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=85"
              alt="Salon de coiffure"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.7,
                transform: menuOpen ? 'scale(1)' : 'scale(1.1)',
                transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
            {/* Dark copper tint overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(11, 11, 11, 0.5) 0%, rgba(183, 110, 121, 0.15) 60%, transparent 100%)',
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Atelier Off-Canvas Menu (Architecte d'intérieur Premium) ───

function AtelierHeader({ config, logo, ctaLabel, links }: { config: SectionConfig; logo: string; ctaLabel?: string; links: NavLink[] }) {
  const [menuOpen, setMenuOpen] = useState(false)

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [menuOpen])

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [menuOpen])

  const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), [])

  // Default nav links for interior architect
  const menuLinks: { label: string; href: string }[] = links.length > 0
    ? links.map(l => ({ label: l.label, href: l.href }))
    : [
        { label: 'Projets', href: '/projets' },
        { label: 'Services', href: '/services' },
        { label: '\u00C0 propos', href: '/a-propos' },
        { label: 'R\u00E9alisations', href: '/realisations' },
        { label: 'Contact', href: '/contact' },
      ]

  const socials = [
    { label: 'Instagram', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
    )},
    { label: 'Pinterest', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345c-.091.379-.293 1.194-.333 1.361-.052.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
    )},
    { label: 'Houzz', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7.5V22h7v-7h6v7h7V7.5L12 2zm0 2.236l8 4.618V20h-3v-7H7v7H4V8.854l8-4.618z"/></svg>
    )},
  ]

  return (
    <>
      {/* Atelier header responsive styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .atelier-resp-menu-grid { grid-template-columns: 1fr !important; }
          .atelier-resp-menu-right { display: none !important; }
        }
      ` }} />
      {/* ─── NAVBAR ─── */}
      <header
        {...elementProps(config.id, 'wrapper', 'container', 'Header')}
        className={cn('absolute top-0 left-0 w-full flex items-center')}
        style={{
          zIndex: 888,
          backgroundColor: 'transparent',
          minHeight: '72px',
          paddingLeft: 'clamp(20px, 5vw, 60px)',
          paddingRight: 'clamp(20px, 5vw, 60px)',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        <div
          {...elementProps(config.id, 'navGrid', 'container', 'Nav Grid')}
          className={cn('grid items-center w-full')}
          style={{
            gridTemplateColumns: '.375fr minmax(min-content, max-content)',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          {/* LEFT — Logo in sand color */}
          <div
            {...elementProps(config.id, 'logo', 'image')}
            className="tracking-wide"
            style={{
              maxWidth: '160px',
              fontSize: '18px',
              fontWeight: 500,
              color: '#C4B5A0',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
            }}
          >
            {renderLogo(logo, 'font-medium text-lg tracking-wider')}
          </div>

          {/* RIGHT — Menu button (glassmorphism sand/bronze tint) */}
          <div
            {...elementProps(config.id, 'ctaLabel', 'button')}
            role="button"
            onClick={toggleMenu}
            className={cn('flex items-center cursor-pointer')}
            style={{
              borderRadius: '999px',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              backgroundColor: 'rgba(139, 115, 85, 0.25)',
              color: '#FFFFFF',
              paddingLeft: '20px',
              paddingRight: '20px',
              paddingTop: '10px',
              paddingBottom: '10px',
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
              border: '1px solid rgba(196, 181, 160, 0.2)',
              gap: '10px',
              whiteSpace: 'nowrap',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(139, 115, 85, 0.4)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(139, 115, 85, 0.25)' }}
          >
            <span {...elementProps(config.id, 'menuLabel', 'text', 'Menu Label')}>{ctaLabel || 'Menu'}</span>
            {/* Hamburger icon — animated lines */}
            <span
              {...elementProps(config.id, 'menuIcon', 'icon', 'Menu Icon')}
              className={cn('flex flex-col items-center')}
              style={{ gap: '4px' }}
            >
              <span style={{
                width: '18px', height: '1.5px', display: 'block', backgroundColor: '#C4B5A0',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform: menuOpen ? 'translateY(2.75px) rotate(45deg)' : 'none',
              }} />
              <span style={{
                width: '18px', height: '1.5px', display: 'block', backgroundColor: '#C4B5A0',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform: menuOpen ? 'translateY(-2.75px) rotate(-45deg)' : 'none',
              }} />
            </span>
          </div>
        </div>
      </header>

      {/* ─── OFF-CANVAS MENU OVERLAY ─── */}
      <div
        {...elementProps(config.id, 'offCanvas', 'container', 'Off-Canvas Menu')}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          visibility: menuOpen ? 'visible' : 'hidden',
          opacity: menuOpen ? 1 : 0,
          transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.5s',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        {/* Dark charcoal background with glassmorphism */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(26, 26, 26, 0.97)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
          }}
        />

        {/* Menu content grid */}
        <div
          {...elementProps(config.id, 'offCanvasGrid', 'container', 'Menu Grid')}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
          }}
          className="atelier-resp-menu-grid"
        >
          {/* LEFT COLUMN — Navigation */}
          <div
            {...elementProps(config.id, 'offCanvasNav', 'container', 'Menu Navigation')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 'clamp(20px, 5vw, 60px)',
              paddingTop: 'clamp(40px, 8vw, 80px)',
            }}
          >
            {/* Top — Logo + Close */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '48px' }}>
              <div
                {...elementProps(config.id, 'offCanvasLogo', 'text', 'Menu Logo')}
                style={{
                  fontSize: '18px',
                  fontWeight: 500,
                  color: '#C4B5A0',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
                }}
              >
                {renderLogo(logo)}
              </div>
              <div
                {...elementProps(config.id, 'closeButton', 'button', 'Close Button')}
                role="button"
                onClick={toggleMenu}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  borderRadius: '999px',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  backgroundColor: 'rgba(139, 115, 85, 0.25)',
                  color: '#C4B5A0',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  fontSize: '14px',
                  fontWeight: 500,
                  border: '1px solid rgba(196, 181, 160, 0.2)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(139, 115, 85, 0.4)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(139, 115, 85, 0.25)' }}
              >
                <span>Fermer</span>
                <X size={18} strokeWidth={1.5} />
              </div>
            </div>

            {/* Navigation links — staggered slide-in from left */}
            <nav
              {...elementProps(config.id, 'offCanvasLinks', 'container', 'Menu Links')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                flex: 1,
              }}
            >
              {menuLinks.map((link, i) => (
                <a
                  key={link.label}
                  {...elementProps(config.id, `menuLinks.${i}`, 'link', link.label)}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontSize: 'clamp(28px, 5vw, 52px)',
                    fontWeight: 400,
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    padding: '8px 0',
                    transition: 'color 0.3s, transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.5s',
                    display: 'block',
                    fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
                    letterSpacing: '-0.01em',
                    lineHeight: 1.15,
                    transform: menuOpen ? 'translateX(0)' : 'translateX(-30px)',
                    opacity: menuOpen ? 1 : 0,
                    transitionDelay: `${i * 0.05}s`,
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#C4B5A0' }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#FFFFFF' }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Bottom — Social Icons */}
            <div
              {...elementProps(config.id, 'offCanvasBottom', 'container', 'Menu Bottom')}
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingTop: '32px',
                borderTop: '1px solid rgba(196, 181, 160, 0.12)',
              }}
            >
              {/* Social icons */}
              <div
                {...elementProps(config.id, 'offCanvasSocials', 'container', 'Social Icons')}
                style={{ display: 'flex', gap: '16px' }}
              >
                {socials.map((s, i) => (
                  <a
                    key={s.label}
                    {...elementProps(config.id, `social.${i}`, 'link', s.label)}
                    href={s.href}
                    style={{
                      color: 'rgba(196, 181, 160, 0.5)',
                      transition: 'color 0.3s, border-color 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '1px solid rgba(196, 181, 160, 0.15)',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C4B5A0'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196, 181, 160, 0.4)' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(196, 181, 160, 0.5)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196, 181, 160, 0.15)' }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Decorative interior design image */}
          <div
            {...elementProps(config.id, 'offCanvasImage', 'image', 'Menu Image')}
            className="atelier-resp-menu-right"
            style={{
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: '#1A1A1A',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=85"
              alt="Architecture intérieure"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.7,
                transform: menuOpen ? 'scale(1)' : 'scale(1.1)',
                transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
            {/* Sand/bronze tint overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.55) 0%, rgba(139, 115, 85, 0.15) 60%, transparent 100%)',
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Encre Off-Canvas Menu (Tatoueur Premium) ───

function EncreHeader({ config, logo, ctaLabel, links }: { config: SectionConfig; logo: string; ctaLabel?: string; links: NavLink[] }) {
  const [menuOpen, setMenuOpen] = useState(false)

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [menuOpen])

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [menuOpen])

  const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), [])

  // Default nav links for tattoo parlor
  const menuLinks: { label: string; href: string }[] = links.length > 0
    ? links.map(l => ({ label: l.label, href: l.href }))
    : [
        { label: 'Portfolio', href: '/portfolio' },
        { label: 'Styles', href: '/styles' },
        { label: '\u00C0 propos', href: '/a-propos' },
        { label: 'Flash', href: '/flash' },
        { label: 'Contact', href: '/contact' },
      ]

  const socials = [
    { label: 'Instagram', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
    )},
    { label: 'TikTok', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52V6.8a4.84 4.84 0 01-1-.11z"/></svg>
    )},
    { label: 'Facebook', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    )},
  ]

  return (
    <>
      {/* Encre header responsive styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .encre-resp-menu-grid { grid-template-columns: 1fr !important; }
          .encre-resp-menu-right { display: none !important; }
        }
      ` }} />
      {/* ─── NAVBAR ─── */}
      <header
        {...elementProps(config.id, 'wrapper', 'container', 'Header')}
        className={cn('absolute top-0 left-0 w-full flex items-center')}
        style={{
          zIndex: 888,
          backgroundColor: 'transparent',
          minHeight: '72px',
          paddingLeft: 'clamp(20px, 5vw, 60px)',
          paddingRight: 'clamp(20px, 5vw, 60px)',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        <div
          {...elementProps(config.id, 'navGrid', 'container', 'Nav Grid')}
          className={cn('grid items-center w-full')}
          style={{
            gridTemplateColumns: '.375fr minmax(min-content, max-content)',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          {/* LEFT — Logo in crimson red */}
          <div
            {...elementProps(config.id, 'logo', 'image')}
            className="tracking-wide"
            style={{
              maxWidth: '160px',
              fontSize: '20px',
              fontWeight: 700,
              color: '#C41E3A',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
            }}
          >
            {renderLogo(logo, 'font-bold text-lg tracking-wide')}
          </div>

          {/* RIGHT — Menu button (glassmorphism crimson tint) */}
          <div
            {...elementProps(config.id, 'ctaLabel', 'button')}
            role="button"
            onClick={toggleMenu}
            className={cn('flex items-center cursor-pointer')}
            style={{
              borderRadius: '999px',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              backgroundColor: 'rgba(196, 30, 58, 0.2)',
              color: '#FFFFFF',
              paddingLeft: '20px',
              paddingRight: '20px',
              paddingTop: '10px',
              paddingBottom: '10px',
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
              border: '1px solid rgba(196, 30, 58, 0.25)',
              gap: '10px',
              whiteSpace: 'nowrap',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(196, 30, 58, 0.38)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(196, 30, 58, 0.2)' }}
          >
            <span {...elementProps(config.id, 'menuLabel', 'text', 'Menu Label')}>{ctaLabel || 'Menu'}</span>
            {/* Hamburger icon — animated lines */}
            <span
              {...elementProps(config.id, 'menuIcon', 'icon', 'Menu Icon')}
              className={cn('flex flex-col items-center')}
              style={{ gap: '4px' }}
            >
              <span style={{
                width: '18px', height: '1.5px', display: 'block', backgroundColor: '#FFFFFF',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform: menuOpen ? 'translateY(2.75px) rotate(45deg)' : 'none',
              }} />
              <span style={{
                width: '18px', height: '1.5px', display: 'block', backgroundColor: '#FFFFFF',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform: menuOpen ? 'translateY(-2.75px) rotate(-45deg)' : 'none',
              }} />
            </span>
          </div>
        </div>
      </header>

      {/* ─── OFF-CANVAS MENU OVERLAY ─── */}
      <div
        {...elementProps(config.id, 'offCanvas', 'container', 'Off-Canvas Menu')}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          visibility: menuOpen ? 'visible' : 'hidden',
          opacity: menuOpen ? 1 : 0,
          transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.5s',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        {/* Deep black background with glassmorphism */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(10, 10, 10, 0.97)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
          }}
        />

        {/* Menu content grid */}
        <div
          {...elementProps(config.id, 'offCanvasGrid', 'container', 'Menu Grid')}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
          }}
          className="encre-resp-menu-grid"
        >
          {/* LEFT COLUMN — Navigation */}
          <div
            {...elementProps(config.id, 'offCanvasNav', 'container', 'Menu Navigation')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 'clamp(20px, 5vw, 60px)',
              paddingTop: 'clamp(40px, 8vw, 80px)',
            }}
          >
            {/* Top — Logo + Close */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '48px' }}>
              <div
                {...elementProps(config.id, 'offCanvasLogo', 'text', 'Menu Logo')}
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#C41E3A',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
                }}
              >
                {renderLogo(logo)}
              </div>
              <div
                {...elementProps(config.id, 'closeButton', 'button', 'Close Button')}
                role="button"
                onClick={toggleMenu}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  borderRadius: '999px',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  backgroundColor: 'rgba(196, 30, 58, 0.2)',
                  color: '#C41E3A',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  fontSize: '14px',
                  fontWeight: 500,
                  border: '1px solid rgba(196, 30, 58, 0.25)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(196, 30, 58, 0.38)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(196, 30, 58, 0.2)' }}
              >
                <span>Fermer</span>
                <X size={18} strokeWidth={1.5} />
              </div>
            </div>

            {/* Navigation links — staggered slide-in from left */}
            <nav
              {...elementProps(config.id, 'offCanvasLinks', 'container', 'Menu Links')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                flex: 1,
              }}
            >
              {menuLinks.map((link, i) => (
                <a
                  key={link.label}
                  {...elementProps(config.id, `menuLinks.${i}`, 'link', link.label)}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontSize: 'clamp(28px, 5vw, 52px)',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    padding: '8px 0',
                    transition: 'color 0.3s, transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.5s',
                    display: 'block',
                    fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
                    letterSpacing: '-0.01em',
                    lineHeight: 1.15,
                    transform: menuOpen ? 'translateX(0)' : 'translateX(-30px)',
                    opacity: menuOpen ? 1 : 0,
                    transitionDelay: `${i * 0.05}s`,
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#C41E3A' }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#FFFFFF' }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Bottom — Social Icons */}
            <div
              {...elementProps(config.id, 'offCanvasBottom', 'container', 'Menu Bottom')}
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingTop: '32px',
                borderTop: '1px solid rgba(196, 30, 58, 0.15)',
              }}
            >
              {/* Social icons */}
              <div
                {...elementProps(config.id, 'offCanvasSocials', 'container', 'Social Icons')}
                style={{ display: 'flex', gap: '16px' }}
              >
                {socials.map((s, i) => (
                  <a
                    key={s.label}
                    {...elementProps(config.id, `social.${i}`, 'link', s.label)}
                    href={s.href}
                    style={{
                      color: 'rgba(255, 255, 255, 0.4)',
                      transition: 'color 0.3s, border-color 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C41E3A'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196, 30, 58, 0.4)' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255, 255, 255, 0.4)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.12)' }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Decorative tattoo image */}
          <div
            {...elementProps(config.id, 'offCanvasImage', 'image', 'Menu Image')}
            className="encre-resp-menu-right"
            style={{
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: '#0A0A0A',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1200&q=80"
              alt="Tattoo art"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.65,
                transform: menuOpen ? 'scale(1)' : 'scale(1.1)',
                transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
            {/* Crimson tint overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.6) 0%, rgba(196, 30, 58, 0.12) 60%, transparent 100%)',
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Serenite Off-Canvas Menu (Institut de Beauté & Spa Premium) ───

function SereniteHeader({ config, logo, ctaLabel, links }: { config: SectionConfig; logo: string; ctaLabel?: string; links: NavLink[] }) {
  const [menuOpen, setMenuOpen] = useState(false)

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [menuOpen])

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [menuOpen])

  const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), [])

  // Default nav links for spa / beauty institute
  const menuLinks: { label: string; href: string }[] = links.length > 0
    ? links.map(l => ({ label: l.label, href: l.href }))
    : [
        { label: 'Soins', href: '/soins' },
        { label: 'Massages', href: '/massages' },
        { label: 'Espaces', href: '/espaces' },
        { label: '\u00C0 propos', href: '/a-propos' },
        { label: 'R\u00E9servation', href: '/reservation' },
      ]

  const socials = [
    { label: 'Instagram', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
    )},
    { label: 'Facebook', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    )},
    { label: 'Pinterest', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
    )},
  ]

  return (
    <>
      {/* Serenite header responsive styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .serenite-resp-menu-grid { grid-template-columns: 1fr !important; }
          .serenite-resp-menu-right { display: none !important; }
        }
      ` }} />
      {/* ─── NAVBAR ─── */}
      <header
        {...elementProps(config.id, 'wrapper', 'container', 'Header')}
        className={cn('absolute top-0 left-0 w-full flex items-center')}
        style={{
          zIndex: 888,
          backgroundColor: 'transparent',
          minHeight: '72px',
          paddingLeft: 'clamp(20px, 5vw, 60px)',
          paddingRight: 'clamp(20px, 5vw, 60px)',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        <div
          {...elementProps(config.id, 'navGrid', 'container', 'Nav Grid')}
          className={cn('grid items-center w-full')}
          style={{
            gridTemplateColumns: '.375fr minmax(min-content, max-content)',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          {/* LEFT — Logo in warm gold */}
          <div
            {...elementProps(config.id, 'logo', 'image')}
            className="tracking-wide"
            style={{
              maxWidth: '160px',
              fontSize: '20px',
              fontWeight: 700,
              color: '#D4B896',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
            }}
          >
            {renderLogo(logo, 'font-bold text-lg tracking-wide')}
          </div>

          {/* RIGHT — Menu button (glassmorphism gold tint) */}
          <div
            {...elementProps(config.id, 'ctaLabel', 'button')}
            role="button"
            onClick={toggleMenu}
            className={cn('flex items-center cursor-pointer')}
            style={{
              borderRadius: '999px',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              backgroundColor: 'rgba(212, 184, 150, 0.15)',
              color: '#FFFFFF',
              paddingLeft: '20px',
              paddingRight: '20px',
              paddingTop: '10px',
              paddingBottom: '10px',
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
              border: '1px solid rgba(212, 184, 150, 0.25)',
              gap: '10px',
              whiteSpace: 'nowrap',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(212, 184, 150, 0.28)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(212, 184, 150, 0.15)' }}
          >
            <span {...elementProps(config.id, 'menuLabel', 'text', 'Menu Label')}>{ctaLabel || 'Menu'}</span>
            {/* Hamburger icon — animated lines */}
            <span
              {...elementProps(config.id, 'menuIcon', 'icon', 'Menu Icon')}
              className={cn('flex flex-col items-center')}
              style={{ gap: '4px' }}
            >
              <span style={{
                width: '18px', height: '1.5px', display: 'block', backgroundColor: '#D4B896',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform: menuOpen ? 'translateY(2.75px) rotate(45deg)' : 'none',
              }} />
              <span style={{
                width: '18px', height: '1.5px', display: 'block', backgroundColor: '#D4B896',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform: menuOpen ? 'translateY(-2.75px) rotate(-45deg)' : 'none',
              }} />
            </span>
          </div>
        </div>
      </header>

      {/* ─── OFF-CANVAS MENU OVERLAY ─── */}
      <div
        {...elementProps(config.id, 'offCanvas', 'container', 'Off-Canvas Menu')}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          visibility: menuOpen ? 'visible' : 'hidden',
          opacity: menuOpen ? 1 : 0,
          transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.5s',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        {/* Deep navy background with glassmorphism */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(27, 27, 47, 0.97)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
          }}
        />

        {/* Menu content grid */}
        <div
          {...elementProps(config.id, 'offCanvasGrid', 'container', 'Menu Grid')}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
          }}
          className="serenite-resp-menu-grid"
        >
          {/* LEFT COLUMN — Navigation */}
          <div
            {...elementProps(config.id, 'offCanvasNav', 'container', 'Menu Navigation')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 'clamp(20px, 5vw, 60px)',
              paddingTop: 'clamp(40px, 8vw, 80px)',
            }}
          >
            {/* Top — Logo + Close */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '48px' }}>
              <div
                {...elementProps(config.id, 'offCanvasLogo', 'text', 'Menu Logo')}
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#D4B896',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
                }}
              >
                {renderLogo(logo)}
              </div>
              <div
                {...elementProps(config.id, 'closeButton', 'button', 'Close Button')}
                role="button"
                onClick={toggleMenu}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  borderRadius: '999px',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  backgroundColor: 'rgba(212, 184, 150, 0.15)',
                  color: '#D4B896',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  fontSize: '14px',
                  fontWeight: 500,
                  border: '1px solid rgba(212, 184, 150, 0.25)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(212, 184, 150, 0.28)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(212, 184, 150, 0.15)' }}
              >
                <span>Fermer</span>
                <X size={18} strokeWidth={1.5} />
              </div>
            </div>

            {/* Navigation links — staggered slide-in from left */}
            <nav
              {...elementProps(config.id, 'offCanvasLinks', 'container', 'Menu Links')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                flex: 1,
              }}
            >
              {menuLinks.map((link, i) => (
                <a
                  key={link.label}
                  {...elementProps(config.id, `menuLinks.${i}`, 'link', link.label)}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontSize: 'clamp(28px, 5vw, 52px)',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    padding: '8px 0',
                    transition: 'color 0.3s, transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.5s',
                    display: 'block',
                    fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
                    letterSpacing: '-0.01em',
                    lineHeight: 1.15,
                    transform: menuOpen ? 'translateX(0)' : 'translateX(-30px)',
                    opacity: menuOpen ? 1 : 0,
                    transitionDelay: `${i * 0.05}s`,
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#D4B896' }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#FFFFFF' }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Bottom — Social Icons */}
            <div
              {...elementProps(config.id, 'offCanvasBottom', 'container', 'Menu Bottom')}
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingTop: '32px',
                borderTop: '1px solid rgba(212, 184, 150, 0.15)',
              }}
            >
              {/* Social icons */}
              <div
                {...elementProps(config.id, 'offCanvasSocials', 'container', 'Social Icons')}
                style={{ display: 'flex', gap: '16px' }}
              >
                {socials.map((s, i) => (
                  <a
                    key={s.label}
                    {...elementProps(config.id, `social.${i}`, 'link', s.label)}
                    href={s.href}
                    style={{
                      color: 'rgba(255, 255, 255, 0.4)',
                      transition: 'color 0.3s, border-color 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#D4B896'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212, 184, 150, 0.4)' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255, 255, 255, 0.4)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.12)' }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Decorative spa image */}
          <div
            {...elementProps(config.id, 'offCanvasImage', 'image', 'Menu Image')}
            className="serenite-resp-menu-right"
            style={{
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: '#1B1B2F',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80"
              alt="Spa serenity"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.65,
                transform: menuOpen ? 'scale(1)' : 'scale(1.1)',
                transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
            {/* Gold tint overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(27, 27, 47, 0.6) 0%, rgba(212, 184, 150, 0.1) 60%, transparent 100%)',
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Pulse Off-Canvas Menu (DJ / Musicien) ───

function PulseHeader({ config, logo, ctaLabel, links }: { config: SectionConfig; logo: string; ctaLabel?: string; links: NavLink[] }) {
  const [menuOpen, setMenuOpen] = useState(false)

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [menuOpen])

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [menuOpen])

  const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), [])

  // Default nav links for DJ / musician
  const menuLinks: { label: string; href: string }[] = links.length > 0
    ? links.map(l => ({ label: l.label, href: l.href }))
    : [
        { label: 'Dates', href: '/dates' },
        { label: 'Mix', href: '/mix' },
        { label: 'Productions', href: '/productions' },
        { label: '\u00C0 propos', href: '/a-propos' },
        { label: 'Contact', href: '/contact' },
      ]

  const socials = [
    { label: 'Instagram', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
    )},
    { label: 'SoundCloud', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M1.175 12.225c-.015.109-.023.219-.023.33 0 1.217.958 2.184 2.175 2.184.12 0 .238-.01.353-.03H11.3V9.6H3.69a2.526 2.526 0 00-2.515 2.625zm5.808-4.308c-.195-.065-.4-.1-.612-.1-1.094 0-1.985.852-2.025 1.928H11.3V7.617a4.547 4.547 0 00-4.317.3zm7.317 7.508H11.3V9.6h3v5.825zm1.5 0V9.6h1.5v5.825h-1.5zm3 0V9.6h1.5v5.825H18.8zm3 0V9.6h1.5v5.825H21.8zm-3.65-8.8a6.5 6.5 0 00-4.85 2.175V6.1a6.5 6.5 0 019.5 5.8v.7H11.3V9.6h6.5a6.47 6.47 0 00-.65-2.975z"/></svg>
    )},
    { label: 'Spotify', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
    )},
  ]

  return (
    <>
      {/* Pulse header responsive styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .pulse-resp-menu-grid { grid-template-columns: 1fr !important; }
          .pulse-resp-menu-right { display: none !important; }
        }
      ` }} />
      {/* ─── NAVBAR ─── */}
      <header
        {...elementProps(config.id, 'wrapper', 'container', 'Header')}
        className={cn('absolute top-0 left-0 w-full flex items-center')}
        style={{
          zIndex: 888,
          backgroundColor: 'transparent',
          minHeight: '72px',
          paddingLeft: 'clamp(20px, 5vw, 60px)',
          paddingRight: 'clamp(20px, 5vw, 60px)',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        <div
          {...elementProps(config.id, 'navGrid', 'container', 'Nav Grid')}
          className={cn('grid items-center w-full')}
          style={{
            gridTemplateColumns: '.375fr minmax(min-content, max-content)',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          {/* LEFT — Logo in neon cyan */}
          <div
            {...elementProps(config.id, 'logo', 'image')}
            className="tracking-wide"
            style={{
              maxWidth: '160px',
              fontSize: '20px',
              fontWeight: 700,
              color: '#00E5FF',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
            }}
          >
            {renderLogo(logo, 'font-bold text-lg tracking-wide')}
          </div>

          {/* RIGHT — Menu button (glassmorphism cyan tint) */}
          <div
            {...elementProps(config.id, 'ctaLabel', 'button')}
            role="button"
            onClick={toggleMenu}
            className={cn('flex items-center cursor-pointer')}
            style={{
              borderRadius: '999px',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              backgroundColor: 'rgba(0, 229, 255, 0.12)',
              color: '#FFFFFF',
              paddingLeft: '20px',
              paddingRight: '20px',
              paddingTop: '10px',
              paddingBottom: '10px',
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
              border: '1px solid rgba(0, 229, 255, 0.25)',
              gap: '10px',
              whiteSpace: 'nowrap',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(0, 229, 255, 0.22)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(0, 229, 255, 0.12)' }}
          >
            <span {...elementProps(config.id, 'menuLabel', 'text', 'Menu Label')}>{ctaLabel || 'Menu'}</span>
            {/* Hamburger icon — animated lines */}
            <span
              {...elementProps(config.id, 'menuIcon', 'icon', 'Menu Icon')}
              className={cn('flex flex-col items-center')}
              style={{ gap: '4px' }}
            >
              <span style={{
                width: '18px', height: '1.5px', display: 'block', backgroundColor: '#00E5FF',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform: menuOpen ? 'translateY(2.75px) rotate(45deg)' : 'none',
              }} />
              <span style={{
                width: '18px', height: '1.5px', display: 'block', backgroundColor: '#00E5FF',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform: menuOpen ? 'translateY(-2.75px) rotate(-45deg)' : 'none',
              }} />
            </span>
          </div>
        </div>
      </header>

      {/* ─── OFF-CANVAS MENU OVERLAY ─── */}
      <div
        {...elementProps(config.id, 'offCanvas', 'container', 'Off-Canvas Menu')}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          visibility: menuOpen ? 'visible' : 'hidden',
          opacity: menuOpen ? 1 : 0,
          transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.5s',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        {/* Absolute black background with glassmorphism */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(13, 13, 13, 0.97)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
          }}
        />

        {/* Menu content grid */}
        <div
          {...elementProps(config.id, 'offCanvasGrid', 'container', 'Menu Grid')}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
          }}
          className="pulse-resp-menu-grid"
        >
          {/* LEFT COLUMN — Navigation */}
          <div
            {...elementProps(config.id, 'offCanvasNav', 'container', 'Menu Navigation')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 'clamp(20px, 5vw, 60px)',
              paddingTop: 'clamp(40px, 8vw, 80px)',
            }}
          >
            {/* Top — Logo + Close */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '48px' }}>
              <div
                {...elementProps(config.id, 'offCanvasLogo', 'text', 'Menu Logo')}
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#00E5FF',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
                }}
              >
                {renderLogo(logo)}
              </div>
              <div
                {...elementProps(config.id, 'closeButton', 'button', 'Close Button')}
                role="button"
                onClick={toggleMenu}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  borderRadius: '999px',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  backgroundColor: 'rgba(0, 229, 255, 0.12)',
                  color: '#00E5FF',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  fontSize: '14px',
                  fontWeight: 500,
                  border: '1px solid rgba(0, 229, 255, 0.25)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(0, 229, 255, 0.22)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(0, 229, 255, 0.12)' }}
              >
                <span>Fermer</span>
                <X size={18} strokeWidth={1.5} />
              </div>
            </div>

            {/* Navigation links — staggered slide-in from left */}
            <nav
              {...elementProps(config.id, 'offCanvasLinks', 'container', 'Menu Links')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                flex: 1,
              }}
            >
              {menuLinks.map((link, i) => (
                <a
                  key={link.label}
                  {...elementProps(config.id, `menuLinks.${i}`, 'link', link.label)}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontSize: 'clamp(28px, 5vw, 52px)',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    padding: '8px 0',
                    transition: 'color 0.3s, transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.5s',
                    display: 'block',
                    fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
                    letterSpacing: '-0.01em',
                    lineHeight: 1.15,
                    transform: menuOpen ? 'translateX(0)' : 'translateX(-30px)',
                    opacity: menuOpen ? 1 : 0,
                    transitionDelay: `${i * 0.05}s`,
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#00E5FF' }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#FFFFFF' }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Bottom — Social Icons */}
            <div
              {...elementProps(config.id, 'offCanvasBottom', 'container', 'Menu Bottom')}
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingTop: '32px',
                borderTop: '1px solid rgba(0, 229, 255, 0.15)',
              }}
            >
              {/* Social icons */}
              <div
                {...elementProps(config.id, 'offCanvasSocials', 'container', 'Social Icons')}
                style={{ display: 'flex', gap: '16px' }}
              >
                {socials.map((s, i) => (
                  <a
                    key={s.label}
                    {...elementProps(config.id, `social.${i}`, 'link', s.label)}
                    href={s.href}
                    style={{
                      color: 'rgba(255, 255, 255, 0.4)',
                      transition: 'color 0.3s, border-color 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#00E5FF'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 229, 255, 0.4)' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255, 255, 255, 0.4)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.12)' }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Decorative DJ/music image */}
          <div
            {...elementProps(config.id, 'offCanvasImage', 'image', 'Menu Image')}
            className="pulse-resp-menu-right"
            style={{
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: '#0D0D0D',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=80"
              alt="DJ performance"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.6,
                transform: menuOpen ? 'scale(1)' : 'scale(1.1)',
                transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
            {/* Cyan/magenta tint overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(13, 13, 13, 0.7) 0%, rgba(0, 229, 255, 0.08) 50%, rgba(255, 0, 110, 0.06) 100%)',
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Saveur Off-Canvas Menu (Traiteur & Chef à domicile) ───

function SaveurHeader({ config, logo, ctaLabel, links }: { config: SectionConfig; logo: string; ctaLabel?: string; links: NavLink[] }) {
  const [menuOpen, setMenuOpen] = useState(false)

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [menuOpen])

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [menuOpen])

  const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), [])

  // Default nav links for caterer / private chef
  const menuLinks: { label: string; href: string }[] = links.length > 0
    ? links.map(l => ({ label: l.label, href: l.href }))
    : [
        { label: 'Prestations', href: '/prestations' },
        { label: 'Menus', href: '/menus' },
        { label: 'Galerie', href: '/galerie' },
        { label: '\u00C0 propos', href: '/a-propos' },
        { label: 'Contact', href: '/contact' },
      ]

  const socials = [
    { label: 'Instagram', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
    )},
    { label: 'Facebook', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    )},
    { label: 'Pinterest', href: '#', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
    )},
  ]

  return (
    <>
      {/* Saveur header responsive styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .saveur-resp-menu-grid { grid-template-columns: 1fr !important; }
          .saveur-resp-menu-right { display: none !important; }
        }
      ` }} />
      {/* ─── NAVBAR ─── */}
      <header
        {...elementProps(config.id, 'wrapper', 'container', 'Header')}
        className={cn('absolute top-0 left-0 w-full flex items-center')}
        style={{
          zIndex: 888,
          backgroundColor: 'transparent',
          minHeight: '72px',
          paddingLeft: 'clamp(20px, 5vw, 60px)',
          paddingRight: 'clamp(20px, 5vw, 60px)',
          fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
        }}
      >
        <div
          {...elementProps(config.id, 'navGrid', 'container', 'Nav Grid')}
          className={cn('grid items-center w-full')}
          style={{
            gridTemplateColumns: '.375fr minmax(min-content, max-content)',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          {/* LEFT — Logo in antique gold */}
          <div
            {...elementProps(config.id, 'logo', 'image')}
            className="tracking-wide"
            style={{
              maxWidth: '160px',
              fontSize: '20px',
              fontWeight: 600,
              color: '#C8A97E',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
            }}
          >
            {renderLogo(logo, 'font-semibold text-lg tracking-wide')}
          </div>

          {/* RIGHT — Menu button (glassmorphism gold tint) */}
          <div
            {...elementProps(config.id, 'ctaLabel', 'button')}
            role="button"
            onClick={toggleMenu}
            className={cn('flex items-center cursor-pointer')}
            style={{
              borderRadius: '999px',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              backgroundColor: 'rgba(200, 169, 126, 0.15)',
              color: '#FFFFFF',
              paddingLeft: '20px',
              paddingRight: '20px',
              paddingTop: '10px',
              paddingBottom: '10px',
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
              border: '1px solid rgba(200, 169, 126, 0.3)',
              gap: '10px',
              whiteSpace: 'nowrap',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(200, 169, 126, 0.28)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(200, 169, 126, 0.15)' }}
          >
            <span {...elementProps(config.id, 'menuLabel', 'text', 'Menu Label')}>{ctaLabel || 'Menu'}</span>
            {/* Hamburger icon — animated lines */}
            <span
              {...elementProps(config.id, 'menuIcon', 'icon', 'Menu Icon')}
              className={cn('flex flex-col items-center')}
              style={{ gap: '4px' }}
            >
              <span style={{
                width: '18px', height: '1.5px', display: 'block', backgroundColor: '#C8A97E',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform: menuOpen ? 'translateY(2.75px) rotate(45deg)' : 'none',
              }} />
              <span style={{
                width: '18px', height: '1.5px', display: 'block', backgroundColor: '#C8A97E',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform: menuOpen ? 'translateY(-2.75px) rotate(-45deg)' : 'none',
              }} />
            </span>
          </div>
        </div>
      </header>

      {/* ─── OFF-CANVAS MENU OVERLAY ─── */}
      <div
        {...elementProps(config.id, 'offCanvas', 'container', 'Off-Canvas Menu')}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          visibility: menuOpen ? 'visible' : 'hidden',
          opacity: menuOpen ? 1 : 0,
          transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.5s',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        {/* Deep brown-black background with glassmorphism */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(28, 25, 23, 0.97)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
          }}
        />

        {/* Menu content grid */}
        <div
          {...elementProps(config.id, 'offCanvasGrid', 'container', 'Menu Grid')}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            fontFamily: "'GeneralSans Variable', 'General Sans', sans-serif",
          }}
          className="saveur-resp-menu-grid"
        >
          {/* LEFT COLUMN — Navigation */}
          <div
            {...elementProps(config.id, 'offCanvasNav', 'container', 'Menu Navigation')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 'clamp(20px, 5vw, 60px)',
              paddingTop: 'clamp(40px, 8vw, 80px)',
            }}
          >
            {/* Top — Logo + Close */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '48px' }}>
              <div
                {...elementProps(config.id, 'offCanvasLogo', 'text', 'Menu Logo')}
                style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#C8A97E',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
                }}
              >
                {renderLogo(logo)}
              </div>
              <div
                {...elementProps(config.id, 'closeButton', 'button', 'Close Button')}
                role="button"
                onClick={toggleMenu}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  borderRadius: '999px',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  backgroundColor: 'rgba(200, 169, 126, 0.15)',
                  color: '#C8A97E',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  fontSize: '14px',
                  fontWeight: 500,
                  border: '1px solid rgba(200, 169, 126, 0.3)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(200, 169, 126, 0.28)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(200, 169, 126, 0.15)' }}
              >
                <span>Fermer</span>
                <X size={18} strokeWidth={1.5} />
              </div>
            </div>

            {/* Navigation links — staggered slide-in from left */}
            <nav
              {...elementProps(config.id, 'offCanvasLinks', 'container', 'Menu Links')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                flex: 1,
              }}
            >
              {menuLinks.map((link, i) => (
                <a
                  key={link.label}
                  {...elementProps(config.id, `menuLinks.${i}`, 'link', link.label)}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontSize: 'clamp(28px, 5vw, 52px)',
                    fontWeight: 300,
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    padding: '8px 0',
                    transition: 'color 0.3s, transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.5s',
                    display: 'block',
                    fontFamily: "'GeneralSans Variable', var(--font-body, sans-serif)",
                    letterSpacing: '0.01em',
                    lineHeight: 1.15,
                    transform: menuOpen ? 'translateX(0)' : 'translateX(-30px)',
                    opacity: menuOpen ? 1 : 0,
                    transitionDelay: `${i * 0.05}s`,
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#C8A97E' }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#FFFFFF' }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Bottom — Social Icons */}
            <div
              {...elementProps(config.id, 'offCanvasBottom', 'container', 'Menu Bottom')}
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingTop: '32px',
                borderTop: '1px solid rgba(200, 169, 126, 0.15)',
              }}
            >
              {/* Social icons */}
              <div
                {...elementProps(config.id, 'offCanvasSocials', 'container', 'Social Icons')}
                style={{ display: 'flex', gap: '16px' }}
              >
                {socials.map((s, i) => (
                  <a
                    key={s.label}
                    {...elementProps(config.id, `social.${i}`, 'link', s.label)}
                    href={s.href}
                    style={{
                      color: 'rgba(255, 255, 255, 0.4)',
                      transition: 'color 0.3s, border-color 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C8A97E'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200, 169, 126, 0.4)' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255, 255, 255, 0.4)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.12)' }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Decorative gastronomy image */}
          <div
            {...elementProps(config.id, 'offCanvasImage', 'image', 'Menu Image')}
            className="saveur-resp-menu-right"
            style={{
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: '#1C1917',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80"
              alt="Gastronomie raffinée"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.65,
                transform: menuOpen ? 'scale(1)' : 'scale(1.1)',
                transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
            {/* Warm gold tint overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(28, 25, 23, 0.65) 0%, rgba(200, 169, 126, 0.08) 60%, transparent 100%)',
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export const siteHeaderMeta = {
  type: 'site-header',
  label: 'Header',
  icon: '🧭',
  variants: ['startup', 'corporate', 'luxe-transparent', 'luxe', 'creative', 'ecommerce', 'glass', 'nacre', 'brixsa', 'obscura', 'zmr-agency', 'braise', 'forge', 'ciseaux', 'atelier', 'encre', 'serenite', 'pulse', 'saveur'],
  defaultVariant: 'startup',
  defaultContent: {},
}
