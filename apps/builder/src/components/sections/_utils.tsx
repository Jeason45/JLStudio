import React from 'react'
import { cn } from '@/lib/utils'
import type {
  SectionBackground,
  SectionPaddingY,
  SectionTitleSize,
  SectionTextAlign,
  SectionStyle,
  SectionSpacing,
  SectionLetterSpacing,
  SectionTextTransform,
  SectionBorderRadius,
  SectionBoxShadow,
} from '@/types/site'

// ─── Background ───────────────────────────────

export function getSectionBgClass(bg: SectionBackground): string {
  return {
    white: 'bg-white',
    light: 'bg-zinc-50',
    dark: 'bg-zinc-900',
    primary: 'bg-indigo-600',
    gradient: 'bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800',
    custom: '',
    'custom-gradient': '',
  }[bg] ?? 'bg-white'
}

export function getSectionBgStyle(style: SectionStyle): React.CSSProperties {
  const css: React.CSSProperties = {}
  if (style.background === 'custom' && style.customBgColor) {
    css.backgroundColor = style.customBgColor
  }
  if (style.background === 'custom-gradient' && style.customGradient) {
    const { from, to, direction } = style.customGradient
    const dirMap: Record<string, string> = {
      'to-r': 'to right', 'to-l': 'to left', 'to-t': 'to top', 'to-b': 'to bottom',
      'to-br': 'to bottom right', 'to-bl': 'to bottom left',
      'to-tr': 'to top right', 'to-tl': 'to top left',
    }
    css.background = `linear-gradient(${dirMap[direction] ?? 'to right'}, ${from}, ${to})`
  }
  if (style.opacity != null && style.opacity < 100) {
    css.opacity = style.opacity / 100
  }
  return css
}

// ─── Padding ──────────────────────────────────

export function getSectionPyClass(py: SectionPaddingY): string {
  return {
    none: 'py-0',
    sm: 'py-10',
    md: 'py-16',
    lg: 'py-24',
    xl: 'py-32',
  }[py] ?? 'py-24'
}

const PT_MAP: Record<SectionSpacing, string> = {
  none: 'pt-0', sm: 'pt-10', md: 'pt-16', lg: 'pt-24', xl: 'pt-32',
}

const PB_MAP: Record<SectionSpacing, string> = {
  none: 'pb-0', sm: 'pb-10', md: 'pb-16', lg: 'pb-24', xl: 'pb-32',
}

const MT_MAP: Record<SectionSpacing, string> = {
  none: 'mt-0', sm: 'mt-10', md: 'mt-16', lg: 'mt-24', xl: 'mt-32',
}

const MB_MAP: Record<SectionSpacing, string> = {
  none: 'mb-0', sm: 'mb-10', md: 'mb-16', lg: 'mb-24', xl: 'mb-32',
}

export function getPaddingTopClass(v?: SectionSpacing): string {
  if (!v) return ''
  return PT_MAP[v] ?? ''
}

export function getPaddingBottomClass(v?: SectionSpacing): string {
  if (!v) return ''
  return PB_MAP[v] ?? ''
}

export function getMarginTopClass(v?: SectionSpacing): string {
  if (!v) return ''
  return MT_MAP[v] ?? ''
}

export function getMarginBottomClass(v?: SectionSpacing): string {
  if (!v) return ''
  return MB_MAP[v] ?? ''
}

// ─── Text ─────────────────────────────────────

export function getTextColorClass(bg: SectionBackground): string {
  return ['dark', 'primary', 'gradient', 'custom-gradient'].includes(bg) ? 'text-white' : 'text-zinc-900'
}

export function getMutedTextClass(bg: SectionBackground): string {
  return ['dark', 'primary', 'gradient', 'custom-gradient'].includes(bg) ? 'text-white/70' : 'text-zinc-500'
}

export function getEyebrowClass(bg: SectionBackground): string {
  return ['dark', 'primary', 'gradient', 'custom-gradient'].includes(bg)
    ? 'text-white/80 bg-white/10 border-white/20'
    : 'text-indigo-600 bg-indigo-50 border-indigo-100'
}

export function getTitleSizeClass(size?: SectionTitleSize): string {
  const map: Record<SectionTitleSize, string> = {
    sm: 'text-xl md:text-2xl',
    md: 'text-2xl md:text-3xl',
    lg: 'text-3xl md:text-4xl lg:text-5xl',
    xl: 'text-4xl md:text-5xl lg:text-6xl',
    '2xl': 'text-5xl md:text-6xl lg:text-7xl',
    '3xl': 'text-6xl md:text-7xl lg:text-8xl',
    '4xl': 'text-7xl md:text-8xl lg:text-9xl',
  }
  return map[size ?? 'lg']
}

export function getTextAlignClass(align?: SectionTextAlign): string {
  return {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  }[align ?? 'center']
}

// ─── Typography extras ────────────────────────

export function getLetterSpacingClass(v?: SectionLetterSpacing): string {
  if (!v || v === 'normal') return ''
  return { tight: 'tracking-tight', wide: 'tracking-wide', wider: 'tracking-wider' }[v] ?? ''
}

export function getTextTransformClass(v?: SectionTextTransform): string {
  if (!v || v === 'none') return ''
  return { uppercase: 'uppercase', lowercase: 'lowercase', capitalize: 'capitalize' }[v] ?? ''
}

export function getFontWeightClass(w?: number): string {
  if (!w) return ''
  const map: Record<number, string> = {
    100: 'font-thin', 200: 'font-extralight', 300: 'font-light',
    400: 'font-normal', 500: 'font-medium', 600: 'font-semibold',
    700: 'font-bold', 800: 'font-extrabold', 900: 'font-black',
  }
  return map[w] ?? ''
}

// ─── Borders & Effects ────────────────────────

export function getSectionBorderRadiusClass(v?: SectionBorderRadius): string {
  if (!v || v === 'none') return ''
  return {
    sm: 'rounded-sm', md: 'rounded-md', lg: 'rounded-lg',
    xl: 'rounded-xl', full: 'rounded-3xl',
  }[v] ?? ''
}

export function getSectionBoxShadowClass(v?: SectionBoxShadow): string {
  if (!v || v === 'none') return ''
  return {
    sm: 'shadow-sm', md: 'shadow-md', lg: 'shadow-lg', xl: 'shadow-xl',
  }[v] ?? ''
}

// ─── Composite ────────────────────────────────

/**
 * For variant-based sections: returns extra className + inline style from SectionStyle overrides.
 */
export function applySectionOverrides(style: SectionStyle): { className: string; style: React.CSSProperties } {
  const classes = cn(
    getLetterSpacingClass(style.letterSpacing),
    getTextTransformClass(style.textTransform),
    getFontWeightClass(style.fontWeight),
    getSectionBorderRadiusClass(style.borderRadius),
    getSectionBoxShadowClass(style.boxShadow),
    style.paddingTop ? getPaddingTopClass(style.paddingTop) : '',
    style.paddingBottom ? getPaddingBottomClass(style.paddingBottom) : '',
    getMarginTopClass(style.marginTop),
    getMarginBottomClass(style.marginBottom),
  )

  const css: React.CSSProperties = {
    ...getSectionBgStyle(style),
  }
  if (style.fontFamily) {
    css.fontFamily = style.fontFamily
  }

  return { className: classes, style: css }
}

/**
 * Backward-compat sectionClasses:
 * - sectionClasses(bg, py, extra?) — legacy 3-arg call
 * - sectionClasses(style, extra?)  — new SectionStyle call
 */
export function sectionClasses(bgOrStyle: SectionBackground | SectionStyle, pyOrExtra?: SectionPaddingY | string, extra?: string): string {
  if (typeof bgOrStyle === 'string') {
    // Legacy call: sectionClasses(bg, py, extra?)
    return cn(getSectionBgClass(bgOrStyle), getSectionPyClass(pyOrExtra as SectionPaddingY), extra)
  }
  // New call: sectionClasses(style, extra?)
  const s = bgOrStyle
  const paddingCls = s.paddingTop || s.paddingBottom
    ? cn(getPaddingTopClass(s.paddingTop ?? s.paddingY as SectionSpacing), getPaddingBottomClass(s.paddingBottom ?? s.paddingY as SectionSpacing))
    : getSectionPyClass(s.paddingY)

  return cn(
    getSectionBgClass(s.background),
    paddingCls,
    getLetterSpacingClass(s.letterSpacing),
    getTextTransformClass(s.textTransform),
    getFontWeightClass(s.fontWeight),
    getSectionBorderRadiusClass(s.borderRadius),
    getSectionBoxShadowClass(s.boxShadow),
    getMarginTopClass(s.marginTop),
    getMarginBottomClass(s.marginBottom),
    pyOrExtra as string, // extra
  )
}

// ─── Logo rendering helper ────────────────────
// Detects if logo string is a URL (image) or plain text and renders accordingly.
const IMAGE_URL_RE = /^(https?:\/\/|\/|data:image\/)/i
export function isLogoUrl(logo: string): boolean {
  return IMAGE_URL_RE.test(logo.trim())
}

export function renderLogo(logo: string, className?: string, imgClassName?: string): React.ReactNode {
  if (isLogoUrl(logo)) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={logo} alt="Logo" className={cn('h-8 w-auto object-contain', imgClassName)} />
  }
  return <span className={className}>{logo}</span>
}
