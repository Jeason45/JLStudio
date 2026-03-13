import type { ElementType, ElementStyleOverride } from '@/types/elements'
import type { BackgroundLayer } from '@/components/editor/fields/BackgroundLayerEditor'

/** Default overlay label for each element type (Webflow-style) */
const TYPE_LABELS: Record<ElementType, string> = {
  heading: 'Heading',
  text: 'Paragraph',
  button: 'Button',
  image: 'Image',
  link: 'Link Block',
  badge: 'Badge',
  icon: 'Icon',
  video: 'Video',
  container: 'Div Block',
}

/**
 * Returns data-attributes to annotate a section element for selection overlay.
 * Usage: <h1 {...elementProps(config.id, 'title', 'heading')}>{title}</h1>
 * The label defaults to the Webflow-style type name (Heading, Paragraph, etc.)
 */
export function elementProps(
  sectionId: string,
  contentPath: string,
  type: ElementType,
  label?: string,
) {
  return {
    'data-element-id': `${sectionId}::${contentPath}`,
    'data-element-type': type,
    'data-element-label': label ?? TYPE_LABELS[type] ?? type,
  }
}

/** Parse a composite element id back into sectionId + contentPath */
export function parseElementId(elementId: string): { sectionId: string; contentPath: string } | null {
  const idx = elementId.indexOf('::')
  if (idx === -1) return null
  return {
    sectionId: elementId.slice(0, idx),
    contentPath: elementId.slice(idx + 2),
  }
}

/** Get a nested value from an object using dot-notation path (e.g. "items.0.title") */
export function getByPath(obj: Record<string, unknown>, path: string): unknown {
  const parts = path.split('.')
  let current: unknown = obj
  for (const part of parts) {
    if (current == null || typeof current !== 'object') return undefined
    current = (current as Record<string, unknown>)[part]
  }
  return current
}

/** Set a nested value in an object using dot-notation path. Mutates the object. */
export function setByPath(obj: Record<string, unknown>, path: string, value: unknown): void {
  const parts = path.split('.')
  let current: Record<string, unknown> = obj
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i]
    if (current[key] == null || typeof current[key] !== 'object') {
      current[key] = {}
    }
    current = current[key] as Record<string, unknown>
  }
  current[parts[parts.length - 1]] = value
}

/** Detect if a string contains HTML formatted content (rich text) */
export function isRichText(content: unknown): boolean {
  if (typeof content !== 'string') return false
  return /<[a-z][\s\S]*>/i.test(content)
}

/** Convert camelCase to kebab-case */
function toKebabCase(str: string): string {
  return str.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)
}

/** Convert ElementStyleOverride to a CSS string for injection in <style> tags */
export function elementStyleToCSSString(style: ElementStyleOverride, important = false): string {
  const parts: string[] = []
  const imp = important ? ' !important' : ''

  // Handle backgroundLayers → multi-value CSS (takes priority over single bg props)
  if (style.backgroundLayers) {
    try {
      const layers: BackgroundLayer[] = JSON.parse(style.backgroundLayers)
      if (layers.length > 0) {
        const images: string[] = []
        const sizes: string[] = []
        const positions: string[] = []
        const repeats: string[] = []
        const blendModes: string[] = []
        for (const layer of layers) {
          images.push(layer.type === 'gradient' ? layer.value : `url(${layer.value})`)
          if (layer.size === 'custom') {
            sizes.push(`${layer.customWidth || 'auto'} ${layer.customHeight || 'auto'}`)
          } else {
            sizes.push(layer.size || 'cover')
          }
          if (layer.positionLeft || layer.positionTop) {
            positions.push(`${layer.positionLeft || '50%'} ${layer.positionTop || '50%'}`)
          } else {
            positions.push(layer.position || 'center')
          }
          repeats.push(layer.repeat || 'no-repeat')
          blendModes.push(layer.blendMode || 'normal')
        }
        parts.push(`background-image: ${images.join(', ')}${imp}`)
        parts.push(`background-size: ${sizes.join(', ')}${imp}`)
        parts.push(`background-position: ${positions.join(', ')}${imp}`)
        parts.push(`background-repeat: ${repeats.join(', ')}${imp}`)
        parts.push(`background-blend-mode: ${blendModes.join(', ')}${imp}`)
      }
    } catch { /* ignore invalid JSON */ }
  }

  for (const [key, value] of Object.entries(style)) {
    if (value === undefined || value === null || value === '') continue
    // Skip properties handled by backgroundLayers or custom CSS
    if (key === 'backgroundLayers' || key === 'videoBackground' || key === 'customCssProperties') continue
    const cssProp = toKebabCase(key)
    // Special handling for backgroundGradient -> background
    if (key === 'backgroundGradient') {
      parts.push(`background: ${value}${imp}`)
    } else if (key === 'backgroundImage') {
      parts.push(`background-image: url(${value})${imp}`)
    } else if (key === 'backgroundClip') {
      parts.push(`background-clip: ${value}${imp}`)
      if (value === 'text') {
        parts.push(`-webkit-background-clip: text${imp}`)
        parts.push(`color: transparent${imp}`)
      }
    } else if (key === 'clipPath') {
      parts.push(`clip-path: ${value}${imp}`)
    } else if (key === 'maskImage') {
      parts.push(`mask-image: ${value}${imp}`)
      parts.push(`-webkit-mask-image: ${value}${imp}`)
    } else if (key === 'maskSize') {
      parts.push(`mask-size: ${value}${imp}`)
      parts.push(`-webkit-mask-size: ${value}${imp}`)
    } else if (key === 'maskPosition') {
      parts.push(`mask-position: ${value}${imp}`)
      parts.push(`-webkit-mask-position: ${value}${imp}`)
    } else if (key === 'webkitLineClamp') {
      parts.push(`display: -webkit-box${imp}`)
      parts.push(`-webkit-box-orient: vertical${imp}`)
      parts.push(`-webkit-line-clamp: ${value}${imp}`)
      parts.push(`overflow: hidden${imp}`)
    } else if (key === 'gridGap') {
      parts.push(`gap: ${value}${imp}`)
    } else if (key === 'webkitTextStrokeWidth') {
      parts.push(`-webkit-text-stroke-width: ${value}${imp}`)
    } else if (key === 'webkitTextStrokeColor') {
      parts.push(`-webkit-text-stroke-color: ${value}${imp}`)
    } else {
      parts.push(`${cssProp}: ${value}${imp}`)
    }
  }

  // Custom CSS properties
  if (style.customCssProperties) {
    try {
      const props: { property: string; value: string }[] = JSON.parse(style.customCssProperties)
      for (const p of props) {
        if (p.property && p.value) parts.push(`${p.property}: ${p.value}${imp}`)
      }
    } catch { /* ignore invalid JSON */ }
  }

  return parts.join('; ')
}

/** Apply element style overrides as inline CSS */
export function elementStyleToCSS(style?: ElementStyleOverride): React.CSSProperties | undefined {
  if (!style) return undefined
  const css: React.CSSProperties = {}

  // Handle backgroundLayers → multi-value CSS
  if (style.backgroundLayers) {
    try {
      const layers: BackgroundLayer[] = JSON.parse(style.backgroundLayers)
      if (layers.length > 0) {
        const images: string[] = []
        const sizes: string[] = []
        const positions: string[] = []
        const repeats: string[] = []
        const blendModes: string[] = []
        for (const layer of layers) {
          images.push(layer.type === 'gradient' ? layer.value : `url(${layer.value})`)
          if (layer.size === 'custom') {
            sizes.push(`${layer.customWidth || 'auto'} ${layer.customHeight || 'auto'}`)
          } else {
            sizes.push(layer.size || 'cover')
          }
          if (layer.positionLeft || layer.positionTop) {
            positions.push(`${layer.positionLeft || '50%'} ${layer.positionTop || '50%'}`)
          } else {
            positions.push(layer.position || 'center')
          }
          repeats.push(layer.repeat || 'no-repeat')
          blendModes.push(layer.blendMode || 'normal')
        }
        css.backgroundImage = images.join(', ')
        css.backgroundSize = sizes.join(', ')
        css.backgroundPosition = positions.join(', ')
        css.backgroundRepeat = repeats.join(', ')
        css.backgroundBlendMode = blendModes.join(', ') as React.CSSProperties['backgroundBlendMode']
      }
    } catch { /* ignore invalid JSON */ }
  }

  // Layout
  if (style.display) css.display = style.display as React.CSSProperties['display']
  if (style.overflow) css.overflow = style.overflow as React.CSSProperties['overflow']
  if (style.flexDirection) css.flexDirection = style.flexDirection as React.CSSProperties['flexDirection']
  if (style.flexWrap) css.flexWrap = style.flexWrap as React.CSSProperties['flexWrap']
  if (style.justifyContent) css.justifyContent = style.justifyContent as React.CSSProperties['justifyContent']
  if (style.alignItems) css.alignItems = style.alignItems as React.CSSProperties['alignItems']
  if (style.justifyItems) css.justifyItems = style.justifyItems as React.CSSProperties['justifyItems']
  if (style.alignContent) css.alignContent = style.alignContent as React.CSSProperties['alignContent']
  if (style.rowGap) css.rowGap = style.rowGap
  if (style.gridTemplateColumns) css.gridTemplateColumns = style.gridTemplateColumns
  if (style.gridTemplateRows) css.gridTemplateRows = style.gridTemplateRows
  if (style.gridGap) css.gap = style.gridGap
  if (style.gridAutoFlow) css.gridAutoFlow = style.gridAutoFlow as React.CSSProperties['gridAutoFlow']
  // Typography
  if (style.color) css.color = style.color
  if (style.fontSize) css.fontSize = style.fontSize
  if (style.fontWeight) css.fontWeight = style.fontWeight
  if (style.fontFamily) css.fontFamily = style.fontFamily
  if (style.textAlign) css.textAlign = style.textAlign
  if (style.lineHeight) css.lineHeight = style.lineHeight
  if (style.letterSpacing) css.letterSpacing = style.letterSpacing
  if (style.textTransform) css.textTransform = style.textTransform
  if (style.textDecoration) css.textDecoration = style.textDecoration
  if (style.fontStyle) css.fontStyle = style.fontStyle
  if (style.textShadow) css.textShadow = style.textShadow
  if (style.textDecorationStyle) css.textDecorationStyle = style.textDecorationStyle as React.CSSProperties['textDecorationStyle']
  if (style.textDecorationThickness) css.textDecorationThickness = style.textDecorationThickness
  if (style.textDecorationColor) css.textDecorationColor = style.textDecorationColor
  if (style.textUnderlineOffset) css.textUnderlineOffset = style.textUnderlineOffset
  if (style.textIndent) css.textIndent = style.textIndent
  if (style.wordSpacing) css.wordSpacing = style.wordSpacing
  if (style.whiteSpace) css.whiteSpace = style.whiteSpace
  if (style.wordBreak) css.wordBreak = style.wordBreak
  if (style.overflowWrap) css.overflowWrap = style.overflowWrap
  if (style.hyphens) css.hyphens = style.hyphens
  if (style.textOverflow) css.textOverflow = style.textOverflow
  if (style.webkitLineClamp != null) {
    css.display = '-webkit-box'
    ;(css as Record<string, unknown>)['WebkitBoxOrient'] = 'vertical'
    ;(css as Record<string, unknown>)['WebkitLineClamp'] = style.webkitLineClamp
    css.overflow = 'hidden'
  }
  if (style.fontVariant) css.fontVariant = style.fontVariant
  if (style.fontVariationSettings) css.fontVariationSettings = style.fontVariationSettings
  if (style.columnCount != null) css.columnCount = style.columnCount
  if (style.columnGap) css.columnGap = style.columnGap
  if (style.columnRuleWidth) css.columnRuleWidth = style.columnRuleWidth
  if (style.columnRuleStyle) css.columnRuleStyle = style.columnRuleStyle as React.CSSProperties['columnRuleStyle']
  if (style.columnRuleColor) css.columnRuleColor = style.columnRuleColor
  // Background
  if (style.backgroundColor) css.backgroundColor = style.backgroundColor
  if (style.backgroundGradient) css.background = style.backgroundGradient
  if (style.backgroundImage) css.backgroundImage = `url(${style.backgroundImage})`
  if (style.backgroundSize) css.backgroundSize = style.backgroundSize
  if (style.backgroundPosition) css.backgroundPosition = style.backgroundPosition
  if (style.backgroundRepeat) css.backgroundRepeat = style.backgroundRepeat
  if (style.backgroundAttachment) css.backgroundAttachment = style.backgroundAttachment
  if (style.backgroundClip) {
    css.backgroundClip = style.backgroundClip
    if (style.backgroundClip === 'text') {
      ;(css as Record<string, unknown>)['WebkitBackgroundClip'] = 'text'
      css.color = 'transparent'
    }
  }
  if (style.backgroundOrigin) css.backgroundOrigin = style.backgroundOrigin
  if (style.backgroundBlendMode) css.backgroundBlendMode = style.backgroundBlendMode as React.CSSProperties['backgroundBlendMode']
  // Border
  if (style.borderWidth) css.borderWidth = style.borderWidth
  if (style.borderStyle) css.borderStyle = style.borderStyle
  if (style.borderColor) css.borderColor = style.borderColor
  if (style.borderRadius) css.borderRadius = style.borderRadius
  if (style.borderTopLeftRadius) css.borderTopLeftRadius = style.borderTopLeftRadius
  if (style.borderTopRightRadius) css.borderTopRightRadius = style.borderTopRightRadius
  if (style.borderBottomLeftRadius) css.borderBottomLeftRadius = style.borderBottomLeftRadius
  if (style.borderBottomRightRadius) css.borderBottomRightRadius = style.borderBottomRightRadius
  // Per-side borders
  if (style.borderTopWidth) css.borderTopWidth = style.borderTopWidth
  if (style.borderTopStyle) css.borderTopStyle = style.borderTopStyle as React.CSSProperties['borderTopStyle']
  if (style.borderTopColor) css.borderTopColor = style.borderTopColor
  if (style.borderRightWidth) css.borderRightWidth = style.borderRightWidth
  if (style.borderRightStyle) css.borderRightStyle = style.borderRightStyle as React.CSSProperties['borderRightStyle']
  if (style.borderRightColor) css.borderRightColor = style.borderRightColor
  if (style.borderBottomWidth) css.borderBottomWidth = style.borderBottomWidth
  if (style.borderBottomStyle) css.borderBottomStyle = style.borderBottomStyle as React.CSSProperties['borderBottomStyle']
  if (style.borderBottomColor) css.borderBottomColor = style.borderBottomColor
  if (style.borderLeftWidth) css.borderLeftWidth = style.borderLeftWidth
  if (style.borderLeftStyle) css.borderLeftStyle = style.borderLeftStyle as React.CSSProperties['borderLeftStyle']
  if (style.borderLeftColor) css.borderLeftColor = style.borderLeftColor
  // Spacing
  if (style.padding) css.padding = style.padding
  if (style.paddingTop) css.paddingTop = style.paddingTop
  if (style.paddingRight) css.paddingRight = style.paddingRight
  if (style.paddingBottom) css.paddingBottom = style.paddingBottom
  if (style.paddingLeft) css.paddingLeft = style.paddingLeft
  if (style.margin) css.margin = style.margin
  if (style.marginTop) css.marginTop = style.marginTop
  if (style.marginRight) css.marginRight = style.marginRight
  if (style.marginBottom) css.marginBottom = style.marginBottom
  if (style.marginLeft) css.marginLeft = style.marginLeft
  // Effects
  if (style.opacity != null) css.opacity = style.opacity
  if (style.boxShadow) css.boxShadow = style.boxShadow
  if (style.backdropFilter) css.backdropFilter = style.backdropFilter
  if (style.mixBlendMode) css.mixBlendMode = style.mixBlendMode as React.CSSProperties['mixBlendMode']
  if (style.filter) css.filter = style.filter
  if (style.transform) css.transform = style.transform
  if (style.transition) css.transition = style.transition
  if (style.outlineWidth) css.outlineWidth = style.outlineWidth
  if (style.outlineStyle) css.outlineStyle = style.outlineStyle as React.CSSProperties['outlineStyle']
  if (style.outlineColor) css.outlineColor = style.outlineColor
  if (style.outlineOffset) css.outlineOffset = style.outlineOffset
  if (style.cursor) css.cursor = style.cursor
  if (style.pointerEvents) css.pointerEvents = style.pointerEvents as React.CSSProperties['pointerEvents']
  if (style.visibility) css.visibility = style.visibility as React.CSSProperties['visibility']
  // Size extras
  if (style.aspectRatio) css.aspectRatio = style.aspectRatio
  if (style.boxSizing) css.boxSizing = style.boxSizing as React.CSSProperties['boxSizing']
  if (style.objectFit) css.objectFit = style.objectFit as React.CSSProperties['objectFit']
  if (style.objectPosition) css.objectPosition = style.objectPosition
  // Position extras
  if (style.float) css.float = style.float as React.CSSProperties['float']
  if (style.clear) css.clear = style.clear as React.CSSProperties['clear']
  // Typography extras
  if (style.webkitTextStrokeWidth) (css as Record<string, unknown>)['WebkitTextStrokeWidth'] = style.webkitTextStrokeWidth
  if (style.webkitTextStrokeColor) (css as Record<string, unknown>)['WebkitTextStrokeColor'] = style.webkitTextStrokeColor
  if (style.direction) css.direction = style.direction as React.CSSProperties['direction']
  if (style.textDecorationSkipInk) (css as Record<string, unknown>)['textDecorationSkipInk'] = style.textDecorationSkipInk
  // Custom CSS properties
  if (style.customCssProperties) {
    try {
      const props: { property: string; value: string }[] = JSON.parse(style.customCssProperties)
      for (const p of props) {
        if (p.property && p.value) (css as Record<string, unknown>)[p.property] = p.value
      }
    } catch { /* ignore */ }
  }
  // 3D Transforms & Clipping
  if (style.transformOrigin) css.transformOrigin = style.transformOrigin
  if (style.perspective) css.perspective = style.perspective
  if (style.perspectiveOrigin) css.perspectiveOrigin = style.perspectiveOrigin
  if (style.backfaceVisibility) css.backfaceVisibility = style.backfaceVisibility
  if (style.transformStyle) css.transformStyle = style.transformStyle
  if (style.clipPath) css.clipPath = style.clipPath
  if (style.willChange) css.willChange = style.willChange
  if (style.maskImage) {
    css.maskImage = style.maskImage
    ;(css as Record<string, unknown>)['WebkitMaskImage'] = style.maskImage
  }
  if (style.maskSize) {
    css.maskSize = style.maskSize
    ;(css as Record<string, unknown>)['WebkitMaskSize'] = style.maskSize
  }
  if (style.maskPosition) {
    css.maskPosition = style.maskPosition
    ;(css as Record<string, unknown>)['WebkitMaskPosition'] = style.maskPosition
  }
  // Sizing
  if (style.width) css.width = style.width
  if (style.height) css.height = style.height
  if (style.minWidth) css.minWidth = style.minWidth
  if (style.maxWidth) css.maxWidth = style.maxWidth
  if (style.minHeight) css.minHeight = style.minHeight
  if (style.maxHeight) css.maxHeight = style.maxHeight
  // Flex item properties
  if (style.flexGrow != null) css.flexGrow = style.flexGrow
  if (style.flexShrink != null) css.flexShrink = style.flexShrink
  if (style.flexBasis) css.flexBasis = style.flexBasis
  if (style.alignSelf) css.alignSelf = style.alignSelf
  if (style.order != null) css.order = style.order
  // Grid item properties
  if (style.gridColumn) css.gridColumn = style.gridColumn
  if (style.gridRow) css.gridRow = style.gridRow
  if (style.gridColumnStart) css.gridColumnStart = style.gridColumnStart
  if (style.gridColumnEnd) css.gridColumnEnd = style.gridColumnEnd
  if (style.gridRowStart) css.gridRowStart = style.gridRowStart
  if (style.gridRowEnd) css.gridRowEnd = style.gridRowEnd
  if (style.justifySelf) css.justifySelf = style.justifySelf
  // Positioning
  if (style.position) css.position = style.position as React.CSSProperties['position']
  if (style.top) css.top = style.top
  if (style.right) css.right = style.right
  if (style.bottom) css.bottom = style.bottom
  if (style.left) css.left = style.left
  if (style.zIndex != null) css.zIndex = style.zIndex
  // Gap
  if (style.gap) css.gap = style.gap
  // Pseudo-element content
  if (style.content) css.content = style.content
  return Object.keys(css).length > 0 ? css : undefined
}
