import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import type { SiteConfig, SectionConfig, SectionStyle, DividerConfig } from '@/types/site'
import type { CustomElement } from '@/types/elements'
import { getSectionComponent } from '@/components/sections'
import { CustomElementRenderer } from '@/components/sections/custom/CustomSection'
import { resolveInstanceContent } from '@/lib/componentResolver'
import {
  applySectionOverrides,
  getSectionBgClass,
  getSectionBgStyle,
  getPaddingTopClass,
  getPaddingBottomClass,
} from '@/components/sections/_utils'

/**
 * Server-render all visible sections of a page to a static HTML string.
 */
export function renderSectionsToHtml(
  siteConfig: SiteConfig,
  sections: SectionConfig[],
): string {
  const parts: string[] = []

  for (const section of sections) {
    if (!section.visible) continue

    const html = renderSingleSection(siteConfig, section)
    if (html) parts.push(html)
  }

  return parts.join('\n')
}

function renderSingleSection(siteConfig: SiteConfig, section: SectionConfig): string {
  // Resolve component instance content (master/instance overrides)
  let resolvedSection = section
  const instance = section.__componentInstance
  if (instance && !instance.isUnlinked) {
    const comp = siteConfig.components?.find(c => c.id === instance.componentId)
    if (comp) {
      resolvedSection = { ...section, content: resolveInstanceContent(section, comp) }
    }
  }

  let sectionHtml = ''

  // Custom sections use dnd-kit which crashes in SSR — render elements directly
  if (section.type === 'custom') {
    sectionHtml = renderCustomSection(resolvedSection)
  } else {
    const SectionComponent = getSectionComponent(section.type)
    if (!SectionComponent) return ''

    try {
      sectionHtml = renderToStaticMarkup(
        createElement(SectionComponent, { config: resolvedSection, isEditing: false })
      )
    } catch (err) {
      console.error(`[Export] Section "${section.type}/${section.variant}" (${section.id}) failed:`, err)
      // Return empty wrapper rather than crashing the entire export
      sectionHtml = `<!-- Section ${section.type} render error -->`
    }
  }

  // Render custom element overlays for non-custom sections
  if (section.type !== 'custom' && section.elements && section.elements.length > 0) {
    const elementsHtml = renderCustomElements(section.elements, section.id)
    if (elementsHtml) {
      sectionHtml += `\n<div class="relative">${elementsHtml}</div>`
    }
  }

  // Post-process the HTML
  sectionHtml = stripEditorAttributes(sectionHtml)
  sectionHtml = addImageOptimizations(sectionHtml)

  // Build wrapper with style overrides (background, padding, dividers, etc.)
  return buildSectionWrapper(section, sectionHtml)
}

/**
 * Render a custom section's element tree directly (bypassing SortableElementList/dnd-kit).
 */
function renderCustomSection(section: SectionConfig): string {
  const elements = section.elements ?? []
  if (elements.length === 0) return ''

  const innerHtml = renderCustomElements(elements, section.id)
  return `<section class="relative">${innerHtml}</section>`
}

/**
 * Render an array of CustomElement to HTML using CustomElementRenderer.
 */
function renderCustomElements(elements: CustomElement[], sectionId: string): string {
  const parts: string[] = []

  for (const el of elements) {
    if (!el.visible) continue
    try {
      const html = renderToStaticMarkup(
        createElement(CustomElementRenderer, { element: el, sectionId })
      )
      parts.push(html)
    } catch (err) {
      console.error(`[Export] Custom element "${el.type}" (${el.id}) failed:`, err)
    }
  }

  return parts.join('\n')
}

/**
 * Remove editor-specific data attributes from HTML output.
 */
function stripEditorAttributes(html: string): string {
  return html
    .replace(/ data-element-id="[^"]*"/g, '')
    .replace(/ data-element-type="[^"]*"/g, '')
    .replace(/ data-element-label="[^"]*"/g, '')
}

/**
 * Add loading="lazy" and decoding="async" to images for performance.
 */
function addImageOptimizations(html: string): string {
  return html.replace(/<img(?![^>]*loading=)/g, '<img loading="lazy" decoding="async"')
}

// Map section types to data-interactive values for JS targeting
const INTERACTIVE_TYPES: Record<string, string> = {
  'site-header': 'site-header',
  'navbar-advanced': 'navbar-advanced',
  accordion: 'accordion',
  faq: 'faq',
  tabs: 'tabs',
  slider: 'slider',
  lightbox: 'lightbox',
  dropdown: 'dropdown',
  contact: 'contact',
  newsletter: 'newsletter',
  form: 'form',
}

function buildSectionWrapper(section: SectionConfig, innerHtml: string): string {
  const style = section.style
  const overrides = applySectionOverrides(style)

  // Build wrapper inline styles
  const wrapperStyles: Record<string, string> = {}
  if (overrides.style.backgroundColor) wrapperStyles.backgroundColor = overrides.style.backgroundColor
  if (overrides.style.background) wrapperStyles.background = overrides.style.background as string
  if (overrides.style.opacity != null) wrapperStyles.opacity = String(overrides.style.opacity)
  if (overrides.style.fontFamily) wrapperStyles.fontFamily = overrides.style.fontFamily as string

  // Section-level CSS variable overrides
  if (style.fontFamily) wrapperStyles['--font-body'] = style.fontFamily
  if (style.textColor) {
    wrapperStyles['--color-foreground'] = style.textColor
    wrapperStyles.color = style.textColor
  }
  if (style.accentColor) wrapperStyles['--color-primary'] = style.accentColor

  // Transparent header handling
  const isTransparentHeader = section.type === 'site-header' && (
    section.variant?.includes('transparent') || section.variant === 'brixsa' || section.variant === 'zmr-agency'
  )
  if (isTransparentHeader) {
    wrapperStyles.height = '0'
    wrapperStyles.overflow = 'visible'
    wrapperStyles.zIndex = '50'
  }

  // Special layout for brixsa variants
  const isBrixsaCta = section.type === 'cta' && section.variant?.includes('brixsa')
  const isBrixsaFooter = section.type === 'site-footer' && section.variant?.includes('brixsa')
  if (isBrixsaCta) wrapperStyles.zIndex = '2'
  if (isBrixsaFooter) {
    wrapperStyles.position = 'sticky'
    wrapperStyles.bottom = '0'
    wrapperStyles.zIndex = '0'
  }

  // Wrapper classes
  const isJlstudioHero = section.type === 'hero' && section.variant === 'jlstudio'
  const isParallaxSlider = section.type === 'slider' && (section.variant?.includes('parallax') || section.variant?.includes('process'))
  const isJlstudioProcess = section.type === 'steps' && section.variant === 'jlstudio-process'
  const isJlstudioPortfolio = section.type === 'gallery-grid' && section.variant?.includes('jlstudio-portfolio')

  const wrapperClasses = [
    'relative',
    !isTransparentHeader && !isBrixsaCta && !isJlstudioHero && !isParallaxSlider && !isJlstudioProcess && !isJlstudioPortfolio ? 'overflow-hidden' : '',
    overrides.className,
  ].filter(Boolean).join(' ')

  // Content wrapper classes & styles
  const hasCustomBg = style.background === 'custom' || style.background === 'custom-gradient'
  const hasStandardBgOverride = !hasCustomBg && style.background !== 'white'
  const hasBgOverride = hasCustomBg || hasStandardBgOverride
  const hasBgImage = !!style.backgroundImage?.url
  const hasPaddingOverride = !!style.paddingTop || !!style.paddingBottom

  const contentClasses = [
    'relative',
    !isTransparentHeader && (hasBgOverride || hasBgImage) ? '[&>section]:!bg-transparent [&>section]:!bg-none [&>footer]:!bg-transparent [&>footer]:!bg-none [&>header]:!bg-transparent [&>header]:!bg-none' : '',
    !isTransparentHeader && !hasBgImage && hasStandardBgOverride ? getSectionBgClass(style.background) : '',
    hasPaddingOverride ? '[&>section]:!py-0 [&>section]:!pt-0 [&>section]:!pb-0' : '',
    hasPaddingOverride && style.paddingTop ? getPaddingTopClass(style.paddingTop) : '',
    hasPaddingOverride && style.paddingBottom ? getPaddingBottomClass(style.paddingBottom) : '',
  ].filter(Boolean).join(' ')

  const contentStyles: Record<string, string> = { zIndex: '2' }
  if (!isTransparentHeader && !hasBgImage && hasCustomBg) {
    const bgStyle = getSectionBgStyle(style)
    if (bgStyle.backgroundColor) contentStyles.backgroundColor = bgStyle.backgroundColor
    if (bgStyle.background) contentStyles.background = bgStyle.background as string
  }
  if (isTransparentHeader) contentStyles.backgroundColor = 'transparent'

  // Build HTML pieces
  const bgImageHtml = buildBackgroundImage(style)
  const videoHtml = buildVideoBackground(style)
  const dividerTopHtml = buildDivider(style.dividerTop, 'top')
  const dividerBottomHtml = buildDivider(style.dividerBottom, 'bottom')

  // data-interactive attribute for JS interactivity targeting
  const interactiveType = INTERACTIVE_TYPES[section.type]
  const dataAttr = interactiveType ? ` data-interactive="${interactiveType}"` : ''

  return `<div class="${wrapperClasses}"${dataAttr} style="${inlineStyle(wrapperStyles)}">
  ${bgImageHtml}
  ${videoHtml}
  ${dividerTopHtml}
  <div class="${contentClasses}" style="${inlineStyle(contentStyles)}">
    ${innerHtml}
  </div>
  ${dividerBottomHtml}
</div>`
}

function buildBackgroundImage(style: SectionStyle): string {
  if (!style.backgroundImage?.url) return ''

  const img = style.backgroundImage
  let html = `<div class="absolute inset-0 pointer-events-none" style="z-index:0">
  <div class="absolute inset-0 bg-cover bg-center" style="background-image:url(${img.url});background-size:${img.size ?? 'cover'};background-position:${img.position ?? 'center'};background-attachment:${img.attachment ?? 'scroll'}"></div>`

  if (img.overlayColor) {
    const opacity = (img.overlayOpacity ?? 50) / 100
    html += `\n  <div class="absolute inset-0" style="background-color:${img.overlayColor};opacity:${opacity}"></div>`
  }

  html += '\n</div>'
  return html
}

function buildVideoBackground(style: SectionStyle): string {
  if (!style.videoBackground?.url) return ''

  const vid = style.videoBackground
  const attrs = [
    'autoplay',
    vid.loop !== false ? 'loop' : '',
    vid.muted !== false ? 'muted' : '',
    'playsinline',
    vid.poster ? `poster="${vid.poster}"` : '',
  ].filter(Boolean).join(' ')

  return `<div class="absolute inset-0 overflow-hidden pointer-events-none" style="z-index:0">
  <video class="absolute inset-0 w-full h-full object-cover" ${attrs}>
    <source src="${vid.url}" type="video/mp4">
  </video>
</div>`
}

function buildDivider(config: DividerConfig | undefined, position: 'top' | 'bottom'): string {
  if (!config || config.shape === 'none') return ''

  const PATHS: Record<string, string> = {
    wave: 'M0,64 C320,128 640,0 960,64 C1280,128 1600,0 1920,64 L1920,160 L0,160 Z',
    angle: 'M0,160 L1920,0 L1920,160 Z',
    curve: 'M0,160 Q960,0 1920,160 Z',
    triangle: 'M0,160 L960,0 L1920,160 Z',
  }

  const path = PATHS[config.shape]
  if (!path) return ''

  const color = config.color ?? '#ffffff'
  const isTop = position === 'top'

  return `<div class="absolute left-0 right-0 w-full overflow-hidden leading-none pointer-events-none" style="${isTop ? 'top' : 'bottom'}:0;height:60px;${isTop ? 'transform:rotate(180deg);' : ''}z-index:1">
  <svg viewBox="0 0 1920 160" preserveAspectRatio="none" class="w-full h-full">
    <path d="${path}" fill="${color}"/>
  </svg>
</div>`
}

function inlineStyle(styles: Record<string, string>): string {
  return Object.entries(styles)
    .map(([k, v]) => `${camelToKebab(k)}:${v}`)
    .join(';')
}

function camelToKebab(str: string): string {
  // CSS custom properties (--foo-bar) should not be transformed
  if (str.startsWith('--')) return str
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}
