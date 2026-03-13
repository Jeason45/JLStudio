'use client'
import { useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import type { SectionConfig } from '@/types/site'
import type { NavbarAdvancedContent, NavbarAdvancedLink, MegaMenuSection } from '@/types/sections'
import { elementProps } from '@/lib/elementHelpers'
import { componentTriggerBus } from '@/lib/animations/componentTriggerBridge'
import { useMenuState } from '@/hooks/useMenuState'
import { ChevronDown, X, Menu } from 'lucide-react'
import type { SectionMeta } from '@/components/sections'

const UNIVERSE_CONFIGS = {
  startup: {
    bg: 'bg-white', scrollBg: 'bg-white/95 backdrop-blur-sm shadow-sm', text: 'text-zinc-700', activeText: 'text-indigo-600',
    logo: 'text-zinc-900 font-bold text-xl', ctaBg: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    menuBg: 'bg-white shadow-xl border border-zinc-200 rounded-lg', menuItem: 'hover:bg-indigo-50',
    menuText: 'text-zinc-900', menuDesc: 'text-zinc-500', megaBg: 'bg-white shadow-xl border border-zinc-100',
    mobileBg: 'bg-white', hamburger: 'text-zinc-700', announceBg: 'bg-indigo-600 text-white',
  },
  corporate: {
    bg: 'bg-slate-900', scrollBg: 'bg-slate-900/95 backdrop-blur-sm shadow-lg', text: 'text-slate-300', activeText: 'text-blue-400',
    logo: 'text-white font-bold text-xl', ctaBg: 'bg-blue-600 hover:bg-blue-700 text-white',
    menuBg: 'bg-slate-800 shadow-xl border border-slate-700 rounded-lg', menuItem: 'hover:bg-slate-700',
    menuText: 'text-white', menuDesc: 'text-slate-400', megaBg: 'bg-slate-800 shadow-xl border border-slate-700',
    mobileBg: 'bg-slate-900', hamburger: 'text-white', announceBg: 'bg-blue-600 text-white',
  },
  luxe: {
    bg: 'bg-white', scrollBg: 'bg-white/95 backdrop-blur-sm shadow-sm', text: 'text-zinc-600', activeText: 'text-amber-700',
    logo: 'text-zinc-900 font-light text-xl tracking-widest uppercase', ctaBg: 'bg-amber-700 hover:bg-amber-800 text-white',
    menuBg: 'bg-white shadow-lg border border-zinc-200 rounded-lg', menuItem: 'hover:bg-amber-50',
    menuText: 'text-zinc-800', menuDesc: 'text-zinc-500', megaBg: 'bg-white shadow-lg border border-zinc-200',
    mobileBg: 'bg-white', hamburger: 'text-zinc-700', announceBg: 'bg-amber-700 text-white',
  },
  creative: {
    bg: 'bg-amber-50', scrollBg: 'bg-amber-50/95 backdrop-blur-sm border-b-2 border-zinc-900', text: 'text-zinc-900', activeText: 'text-zinc-900',
    logo: 'text-zinc-900 font-black text-xl uppercase', ctaBg: 'bg-zinc-900 hover:bg-zinc-800 text-white',
    menuBg: 'bg-white border-2 border-zinc-900 shadow-[4px_4px_0_0_#18181b]', menuItem: 'hover:bg-yellow-100',
    menuText: 'text-zinc-900', menuDesc: 'text-zinc-600', megaBg: 'bg-white border-2 border-zinc-900 shadow-[4px_4px_0_0_#18181b]',
    mobileBg: 'bg-amber-50', hamburger: 'text-zinc-900', announceBg: 'bg-zinc-900 text-white',
  },
  ecommerce: {
    bg: 'bg-white', scrollBg: 'bg-white/95 backdrop-blur-sm shadow-sm', text: 'text-zinc-600', activeText: 'text-emerald-600',
    logo: 'text-zinc-900 font-bold text-xl', ctaBg: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    menuBg: 'bg-white shadow-lg border border-zinc-200 rounded-lg', menuItem: 'hover:bg-emerald-50',
    menuText: 'text-zinc-900', menuDesc: 'text-zinc-500', megaBg: 'bg-white shadow-lg border border-zinc-200',
    mobileBg: 'bg-white', hamburger: 'text-zinc-700', announceBg: 'bg-emerald-600 text-white',
  },
  glass: {
    bg: 'bg-zinc-950', scrollBg: 'bg-zinc-950/80 backdrop-blur-xl shadow-lg', text: 'text-zinc-400', activeText: 'text-purple-400',
    logo: 'text-white font-bold text-xl', ctaBg: 'bg-purple-600 hover:bg-purple-700 text-white',
    menuBg: 'bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl', menuItem: 'hover:bg-white/10',
    menuText: 'text-white', menuDesc: 'text-zinc-400', megaBg: 'bg-zinc-900/90 backdrop-blur-xl border border-white/10 shadow-xl',
    mobileBg: 'bg-zinc-950', hamburger: 'text-white', announceBg: 'bg-purple-600 text-white',
  },
} as const

type Universe = keyof typeof UNIVERSE_CONFIGS

function parseVariant(variant: string): { universe: Universe; layout: 'standard' | 'mega' } {
  const parts = variant.split('-')
  const layout = parts[parts.length - 1] === 'mega' ? 'mega' : 'standard'
  const universe = (parts.slice(0, -1).join('-') || 'startup') as Universe
  return { universe: universe in UNIVERSE_CONFIGS ? universe : 'startup', layout }
}

// Dropdown for a single link
function NavDropdown({ link, uConfig }: { link: NavbarAdvancedLink; uConfig: typeof UNIVERSE_CONFIGS[Universe] }) {
  const { isOpen, triggerProps, menuProps, containerRef } = useMenuState({ mode: 'hover', closeDelay: 200 })

  if (!link.hasDropdown || !link.megaSections?.length) {
    return <a href={link.href} className={cn('text-sm font-medium transition-colors', uConfig.text, `hover:${uConfig.activeText}`)}>{link.label}</a>
  }

  const isMega = link.megaSections.length > 1

  return (
    <div ref={containerRef} className="relative">
      <button
        {...triggerProps}
        className={cn('flex items-center gap-1 text-sm font-medium transition-colors', isOpen ? uConfig.activeText : uConfig.text)}
      >
        {link.label}
        <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', isOpen && 'rotate-180')} />
      </button>

      <div
        {...menuProps}
        className={cn(
          'absolute top-full mt-3 transition-all duration-200 z-50',
          isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none',
          isMega
            ? cn('left-1/2 -translate-x-1/2 w-[500px] p-5', uConfig.megaBg, 'rounded-lg')
            : cn('left-0 min-w-[200px] py-2', uConfig.menuBg),
        )}
      >
        {isMega ? (
          <div className="grid grid-cols-2 gap-6">
            {link.megaSections.map((section) => (
              <div key={section.id}>
                <h4 className={cn('text-xs font-semibold uppercase tracking-wider mb-2', uConfig.menuDesc)}>{section.title}</h4>
                <div className="space-y-1">
                  {section.links.map((l) => (
                    <a key={l.id} href={l.href} className={cn('block px-2 py-1.5 rounded text-sm transition-colors', uConfig.menuText, uConfig.menuItem)}>
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          link.megaSections[0]?.links.map((l) => (
            <a key={l.id} href={l.href} className={cn('block px-4 py-2 text-sm transition-colors', uConfig.menuText, uConfig.menuItem)}>
              {l.label}
            </a>
          ))
        )}
      </div>
    </div>
  )
}

export function NavbarAdvancedSection({ config }: { config: SectionConfig; isEditing?: boolean }) {
  const content = config.content as NavbarAdvancedContent
  const { universe } = parseVariant(config.variant || 'startup-standard')
  const uConfig = UNIVERSE_CONFIGS[universe]
  const links = content.links ?? []

  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const emitTrigger = useCallback((type: 'navbar-open' | 'navbar-close') => {
    componentTriggerBus.emit({ type, sourceId: config.id })
  }, [config.id])

  // Scroll listener for sticky
  useEffect(() => {
    if (!content.sticky) return
    const handler = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [content.sticky])

  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => {
      const next = !prev
      emitTrigger(next ? 'navbar-open' : 'navbar-close')
      return next
    })
  }, [emitTrigger])

  return (
    <>
      {/* Announcement bar */}
      {content.announcementBar && (
        <div className={cn('text-center text-xs py-2 px-4', uConfig.announceBg)}>
          <span {...elementProps(config.id, 'announcementBar', 'text')}>{content.announcementBar}</span>
        </div>
      )}

      <nav className={cn(
        'w-full z-40 transition-all duration-300',
        content.sticky ? 'sticky top-0' : 'relative',
        content.transparent && !isScrolled ? 'bg-transparent' : (isScrolled ? uConfig.scrollBg : uConfig.bg),
      )}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/" className={uConfig.logo}>
              <span {...elementProps(config.id, 'logo', 'text')}>{content.logo}</span>
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-6">
              {links.map((link) => (
                <NavDropdown key={link.id} link={link} uConfig={uConfig} />
              ))}
            </div>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-3">
              {content.ctaLabel && (
                <a href={content.ctaHref ?? '#'} className={cn('hidden md:inline-flex px-4 py-2 rounded-lg text-sm font-medium transition-colors', uConfig.ctaBg)}>
                  {content.ctaLabel}
                </a>
              )}
              <button onClick={toggleMenu} className={cn('md:hidden p-2', uConfig.hamburger)}>
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={cn(
          'md:hidden overflow-hidden transition-all duration-300',
          menuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0',
          uConfig.mobileBg,
        )}>
          <div className="px-4 py-4 space-y-2 border-t border-zinc-200/10">
            {links.map((link) => (
              <a key={link.id} href={link.href} className={cn('block py-2 text-sm font-medium', uConfig.text)}>
                {link.label}
              </a>
            ))}
            {content.ctaLabel && (
              <a href={content.ctaHref ?? '#'} className={cn('block text-center mt-3 px-4 py-2 rounded-lg text-sm font-medium', uConfig.ctaBg)}>
                {content.ctaLabel}
              </a>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}

export const navbarAdvancedMeta: SectionMeta = {
  type: 'navbar-advanced',
  label: 'Navbar Avancee',
  icon: '🧭',
  variants: [
    'startup-standard', 'startup-mega',
    'corporate-standard', 'corporate-mega',
    'luxe-standard', 'luxe-mega',
    'creative-standard', 'creative-mega',
    'ecommerce-standard', 'ecommerce-mega',
    'glass-standard', 'glass-mega',
  ],
  defaultVariant: 'startup-standard',
  defaultContent: {},
}
