'use client'
import { useEffect, useMemo } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { getGoogleFontsMap } from '@/lib/fonts'
import { varCssName, resolveVariableValue } from '@/lib/variableResolver'

const BORDER_RADIUS_MAP: Record<string, string> = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  full: '9999px',
}

const SPACING_MAP: Record<string, string> = {
  compact: '0.85',
  default: '1',
  relaxed: '1.2',
}

export function BrandStyleInjector() {
  const { siteConfig, activeVariableMode } = useEditorStore()
  const brand = siteConfig?.brand
  const variables = siteConfig?.variables

  useEffect(() => {
    if (!brand) return

    const canvas = document.getElementById('site-canvas')
    if (!canvas) return

    const { colors, typography, borderRadius, spacing } = brand

    canvas.style.setProperty('--color-primary', colors.primary)
    canvas.style.setProperty('--color-secondary', colors.secondary)
    canvas.style.setProperty('--color-accent', colors.accent)
    canvas.style.setProperty('--color-background', colors.background)
    canvas.style.setProperty('--color-foreground', colors.foreground)
    canvas.style.setProperty('--color-muted', colors.muted)
    canvas.style.setProperty('--font-heading', typography.heading)
    canvas.style.setProperty('--font-body', typography.body)
    canvas.style.setProperty('--border-radius', BORDER_RADIUS_MAP[borderRadius] ?? '8px')
    canvas.style.setProperty('--spacing-scale', SPACING_MAP[spacing] ?? '1')
    canvas.style.fontFamily = typography.body

  }, [brand])

  // Inject user CSS variables
  useEffect(() => {
    const canvas = document.getElementById('site-canvas')
    if (!canvas || !variables?.length) return

    for (const v of variables) {
      const resolved = resolveVariableValue(v, variables, activeVariableMode)
      canvas.style.setProperty(varCssName(v), resolved)
    }

    return () => {
      for (const v of variables) {
        canvas.style.removeProperty(varCssName(v))
      }
    }
  }, [variables, activeVariableMode])

  // Load Google Fonts dynamically (brand + section + element + class overrides)
  const googleFontsMap = useMemo(() => getGoogleFontsMap(), [])

  useEffect(() => {
    if (!brand) return
    const fonts = new Set([brand.typography.heading, brand.typography.body])

    const pages = siteConfig?.pages ?? []
    for (const page of pages) {
      for (const section of page.sections) {
        // Section-level font
        if (section.style.fontFamily) {
          fonts.add(section.style.fontFamily)
        }
        // Element-level fonts from __elementStyles
        const elStyles = section.content.__elementStyles as Record<string, Record<string, unknown>> | undefined
        if (elStyles) {
          for (const style of Object.values(elStyles)) {
            if (style.fontFamily && typeof style.fontFamily === 'string') {
              fonts.add(style.fontFamily)
            }
          }
        }
      }
    }

    // Class-level fonts
    const classes = siteConfig?.classes ?? []
    for (const cls of classes) {
      const ff = (cls.styles as Record<string, unknown>).fontFamily
      if (ff && typeof ff === 'string') fonts.add(ff)
    }

    fonts.forEach(font => {
      const encoded = googleFontsMap[font]
      if (!encoded) return
      const id = `gfont-${font.replace(/\s+/g, '-').toLowerCase()}`
      if (document.getElementById(id)) return
      const link = document.createElement('link')
      link.id = id
      link.rel = 'stylesheet'
      link.href = `https://fonts.googleapis.com/css2?family=${encoded}&display=swap`
      document.head.appendChild(link)
    })
  }, [brand?.typography.heading, brand?.typography.body, siteConfig?.pages, siteConfig?.classes, googleFontsMap])

  // Generate @font-face rules for custom fonts
  const fontFaceCSS = useMemo(() => {
    const customFonts = siteConfig?.customFonts ?? []
    if (customFonts.length === 0) return ''
    const rules: string[] = []
    for (const font of customFonts) {
      for (const file of font.files) {
        rules.push(`@font-face {
  font-family: '${font.name}';
  src: url('${file.url}') format('${file.format}');
  font-weight: ${file.weight};
  font-style: ${file.style};
  font-display: swap;
}`)
      }
    }
    return rules.join('\n')
  }, [siteConfig?.customFonts])

  // Generate theme override CSS — maps hardcoded Tailwind classes to brand CSS vars
  const themeOverrideCSS = useMemo(() => {
    if (!brand) return ''
    return `
/* ═══ BACKGROUNDS ═══ */

/* All section & header backgrounds → brand background */
#site-canvas section,
#site-canvas header,
#site-canvas footer,
#site-canvas nav { background-color: var(--color-background); }

/* Muted / alternate backgrounds → brand muted */
#site-canvas .bg-zinc-50,
#site-canvas .bg-zinc-100,
#site-canvas .bg-slate-50,
#site-canvas .bg-slate-100,
#site-canvas .bg-gray-50,
#site-canvas .bg-gray-100,
#site-canvas .bg-neutral-50 { background-color: var(--color-muted); }

/* Card / surface backgrounds */
#site-canvas .bg-white { background-color: var(--color-background); }

/* ═══ FOREGROUND TEXT ═══ */

/* Dark text → foreground */
#site-canvas .text-zinc-900,
#site-canvas .text-zinc-800,
#site-canvas .text-zinc-700,
#site-canvas .text-slate-900,
#site-canvas .text-slate-800,
#site-canvas .text-slate-700,
#site-canvas .text-gray-900,
#site-canvas .text-gray-800,
#site-canvas .text-gray-700 { color: var(--color-foreground); }

/* Light text (on dark sections) → also foreground (theme decides dark/light) */
#site-canvas .text-white,
#site-canvas .text-slate-300,
#site-canvas .text-slate-200,
#site-canvas .text-zinc-200,
#site-canvas .text-zinc-300 { color: var(--color-foreground); }

/* Muted text → foreground at 60% */
#site-canvas .text-zinc-500,
#site-canvas .text-zinc-600,
#site-canvas .text-zinc-400,
#site-canvas .text-slate-500,
#site-canvas .text-slate-400,
#site-canvas .text-gray-500,
#site-canvas .text-gray-600 { color: color-mix(in srgb, var(--color-foreground) 60%, transparent); }

/* White/opacity text → foreground at matching opacity */
#site-canvas .text-white\\/70,
#site-canvas .text-white\\/60,
#site-canvas .text-white\\/80 { color: color-mix(in srgb, var(--color-foreground) 65%, transparent); }

/* ═══ PRIMARY COLOR ═══ */

/* Primary backgrounds — all common brand colors */
#site-canvas .bg-indigo-600, #site-canvas .bg-indigo-500, #site-canvas .bg-indigo-700,
#site-canvas .bg-blue-600, #site-canvas .bg-blue-500, #site-canvas .bg-blue-700,
#site-canvas .bg-purple-600, #site-canvas .bg-purple-500, #site-canvas .bg-purple-700,
#site-canvas .bg-emerald-600, #site-canvas .bg-emerald-500, #site-canvas .bg-emerald-700,
#site-canvas .bg-green-600, #site-canvas .bg-green-500,
#site-canvas .bg-amber-700, #site-canvas .bg-amber-600,
#site-canvas .bg-orange-600, #site-canvas .bg-orange-500,
#site-canvas .bg-rose-600, #site-canvas .bg-rose-500,
#site-canvas .bg-red-600, #site-canvas .bg-red-500,
#site-canvas .bg-cyan-600, #site-canvas .bg-cyan-500,
#site-canvas .bg-teal-600, #site-canvas .bg-teal-500 { background-color: var(--color-primary); }

/* Primary text */
#site-canvas .text-indigo-600, #site-canvas .text-indigo-500, #site-canvas .text-indigo-700,
#site-canvas .text-blue-600, #site-canvas .text-blue-500, #site-canvas .text-blue-400,
#site-canvas .text-purple-600, #site-canvas .text-purple-500, #site-canvas .text-purple-400,
#site-canvas .text-emerald-600, #site-canvas .text-emerald-500,
#site-canvas .text-green-600, #site-canvas .text-green-500,
#site-canvas .text-amber-700, #site-canvas .text-amber-600,
#site-canvas .text-orange-600, #site-canvas .text-orange-500,
#site-canvas .text-rose-600, #site-canvas .text-rose-500,
#site-canvas .text-cyan-600, #site-canvas .text-cyan-500,
#site-canvas .text-teal-600, #site-canvas .text-teal-500 { color: var(--color-primary); }

/* Primary light/tint backgrounds */
#site-canvas .bg-indigo-50, #site-canvas .bg-blue-50,
#site-canvas .bg-purple-50, #site-canvas .bg-emerald-50,
#site-canvas .bg-green-50, #site-canvas .bg-amber-50,
#site-canvas .bg-orange-50, #site-canvas .bg-rose-50,
#site-canvas .bg-cyan-50, #site-canvas .bg-teal-50,
#site-canvas .bg-yellow-50 { background-color: color-mix(in srgb, var(--color-primary) 8%, var(--color-background)); }

/* Primary hover backgrounds — darker shade */
#site-canvas .hover\\:bg-indigo-700:hover, #site-canvas .hover\\:bg-indigo-600:hover,
#site-canvas .hover\\:bg-blue-700:hover, #site-canvas .hover\\:bg-blue-600:hover, #site-canvas .hover\\:bg-blue-400:hover,
#site-canvas .hover\\:bg-purple-700:hover, #site-canvas .hover\\:bg-purple-600:hover,
#site-canvas .hover\\:bg-emerald-700:hover, #site-canvas .hover\\:bg-emerald-600:hover,
#site-canvas .hover\\:bg-amber-800:hover, #site-canvas .hover\\:bg-amber-700:hover,
#site-canvas .hover\\:bg-orange-700:hover, #site-canvas .hover\\:bg-orange-600:hover,
#site-canvas .hover\\:bg-green-700:hover, #site-canvas .hover\\:bg-green-600:hover,
#site-canvas .hover\\:bg-rose-700:hover, #site-canvas .hover\\:bg-rose-600:hover,
#site-canvas .hover\\:bg-cyan-700:hover, #site-canvas .hover\\:bg-cyan-600:hover,
#site-canvas .hover\\:bg-teal-700:hover, #site-canvas .hover\\:bg-teal-600:hover,
#site-canvas .hover\\:bg-zinc-800:hover, #site-canvas .hover\\:bg-zinc-900:hover { background-color: color-mix(in srgb, var(--color-primary) 85%, black); }

/* Hover backgrounds — primary on outline/ghost buttons */
#site-canvas .hover\\:bg-indigo-50:hover, #site-canvas .hover\\:bg-blue-50:hover,
#site-canvas .hover\\:bg-purple-50:hover, #site-canvas .hover\\:bg-emerald-50:hover,
#site-canvas .hover\\:bg-amber-50:hover, #site-canvas .hover\\:bg-yellow-100:hover,
#site-canvas .hover\\:bg-orange-50:hover, #site-canvas .hover\\:bg-rose-50:hover { background-color: color-mix(in srgb, var(--color-primary) 10%, var(--color-background)); }

/* Hover text — primary */
#site-canvas .hover\\:text-indigo-600:hover, #site-canvas .hover\\:text-indigo-800:hover,
#site-canvas .hover\\:text-blue-600:hover, #site-canvas .hover\\:text-blue-300:hover, #site-canvas .hover\\:text-blue-400:hover,
#site-canvas .hover\\:text-purple-600:hover, #site-canvas .hover\\:text-purple-300:hover, #site-canvas .hover\\:text-purple-400:hover,
#site-canvas .hover\\:text-emerald-600:hover, #site-canvas .hover\\:text-emerald-800:hover,
#site-canvas .hover\\:text-amber-700:hover, #site-canvas .hover\\:text-amber-800:hover,
#site-canvas .hover\\:text-orange-600:hover,
#site-canvas .hover\\:text-rose-600:hover,
#site-canvas .hover\\:text-cyan-600:hover,
#site-canvas .hover\\:text-teal-600:hover { color: var(--color-primary); }

/* Hover text — foreground */
#site-canvas .hover\\:text-white:hover,
#site-canvas .hover\\:text-zinc-900:hover,
#site-canvas .hover\\:text-zinc-200:hover,
#site-canvas .hover\\:text-zinc-300:hover { color: var(--color-foreground); }

/* Hover text — muted foreground */
#site-canvas .hover\\:text-zinc-600:hover,
#site-canvas .hover\\:text-zinc-700:hover { color: color-mix(in srgb, var(--color-foreground) 70%, transparent); }

/* Hover borders — primary */
#site-canvas .hover\\:border-indigo-600:hover, #site-canvas .hover\\:border-blue-600:hover,
#site-canvas .hover\\:border-orange-600:hover, #site-canvas .hover\\:border-zinc-500:hover { border-color: var(--color-primary); }

/* Hover bg white/muted */
#site-canvas .hover\\:bg-white:hover { background-color: var(--color-background); }
#site-canvas .hover\\:bg-zinc-100:hover, #site-canvas .hover\\:bg-zinc-50:hover,
#site-canvas .hover\\:bg-slate-700:hover, #site-canvas .hover\\:bg-white\\/10:hover,
#site-canvas .hover\\:bg-white\\/\\[0\\.06\\]:hover { background-color: color-mix(in srgb, var(--color-foreground) 8%, var(--color-background)); }

/* ═══ BORDERS ═══ */

#site-canvas .border-zinc-200, #site-canvas .border-zinc-100, #site-canvas .border-zinc-300,
#site-canvas .border-slate-200, #site-canvas .border-slate-700,
#site-canvas .border-gray-200 { border-color: color-mix(in srgb, var(--color-foreground) 15%, transparent); }

#site-canvas .border-indigo-100, #site-canvas .border-indigo-200,
#site-canvas .border-blue-100, #site-canvas .border-blue-200,
#site-canvas .border-purple-100 { border-color: color-mix(in srgb, var(--color-primary) 25%, transparent); }

/* ═══ GRADIENTS ═══ */
#site-canvas .from-indigo-600, #site-canvas .from-blue-600,
#site-canvas .from-purple-600 { --tw-gradient-from: var(--color-primary); }
#site-canvas .via-purple-600, #site-canvas .via-indigo-600 { --tw-gradient-via: var(--color-secondary); }
#site-canvas .to-indigo-800, #site-canvas .to-purple-800,
#site-canvas .to-blue-800 { --tw-gradient-to: color-mix(in srgb, var(--color-primary) 80%, black); }

/* ═══ RINGS & OUTLINES ═══ */
#site-canvas .ring-indigo-600, #site-canvas .ring-blue-600 { --tw-ring-color: var(--color-primary); }

/* ═══ SHADOWS (keep but tint) ═══ */

/* ═══ BUTTONS — keep text white on primary-colored backgrounds ═══ */
#site-canvas button.text-white,
#site-canvas a.text-white,
#site-canvas [role="button"].text-white,
#site-canvas .inline-flex.text-white,
#site-canvas [class*="rounded"][class*="bg-"][class*="text-white"] { color: #ffffff !important; }

/* Group hover text overrides for card links */
#site-canvas .group-hover\\:text-indigo-600, #site-canvas .group-hover\\:text-blue-400,
#site-canvas .group-hover\\:text-emerald-600, #site-canvas .group-hover\\:text-purple-400 { }
.group:hover #site-canvas .group-hover\\:text-indigo-600,
.group:hover #site-canvas .group-hover\\:text-blue-400,
.group:hover #site-canvas .group-hover\\:text-emerald-600 { color: var(--color-primary); }

/* ═══ EDITOR: Make gradient overlays non-interactive so images underneath are clickable ═══ */
#site-canvas [class*="bg-gradient"]:not([data-element-id]),
#site-canvas [class*="from-black"]:not([data-element-id]),
#site-canvas [class*="from-zinc"]:not([data-element-id]),
#site-canvas [class*="from-slate"]:not([data-element-id]) { pointer-events: none; }
`
  }, [brand])

  const allCSS = [fontFaceCSS, themeOverrideCSS].filter(Boolean).join('\n')

  return allCSS ? (
    <style dangerouslySetInnerHTML={{ __html: allCSS }} />
  ) : null
}
