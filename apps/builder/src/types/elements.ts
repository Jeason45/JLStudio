// ─────────────────────────────────────────────
// ELEMENT-LEVEL EDITING TYPES
// ─────────────────────────────────────────────

export interface ElementAddress {
  sectionId: string
  contentPath: string // ex: "title", "primaryButton", "items.0.title"
}

export type ElementType =
  | 'heading'
  | 'text'
  | 'button'
  | 'image'
  | 'badge'
  | 'icon'
  | 'video'
  | 'container'
  | 'link'

export interface SelectedElement {
  address: ElementAddress
  elementType: ElementType
  label: string
  rect: DOMRect
  domElement: HTMLElement
}

export interface ElementStyleOverride {
  // Typography
  color?: string
  fontSize?: string
  fontWeight?: number
  fontFamily?: string
  textAlign?: 'left' | 'center' | 'right'
  lineHeight?: string
  letterSpacing?: string
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
  textDecoration?: 'none' | 'underline' | 'line-through'
  fontStyle?: 'normal' | 'italic'
  textShadow?: string
  textDecorationStyle?: 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy'
  textDecorationThickness?: string
  textDecorationColor?: string
  textUnderlineOffset?: string
  textIndent?: string
  wordSpacing?: string
  whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line' | 'break-spaces'
  wordBreak?: 'normal' | 'break-all' | 'keep-all' | 'break-word'
  overflowWrap?: 'normal' | 'break-word' | 'anywhere'
  hyphens?: 'none' | 'manual' | 'auto'
  textOverflow?: 'clip' | 'ellipsis'
  webkitLineClamp?: number
  fontVariant?: 'normal' | 'small-caps' | 'all-small-caps' | 'petite-caps' | 'all-petite-caps' | 'unicase' | 'titling-caps'
  fontVariationSettings?: string
  columnCount?: number
  columnGap?: string
  columnRuleWidth?: string
  columnRuleStyle?: 'none' | 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge'
  columnRuleColor?: string
  // Background
  backgroundColor?: string
  backgroundGradient?: string
  backgroundImage?: string
  backgroundSize?: string
  backgroundPosition?: string
  backgroundRepeat?: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat' | 'round' | 'space'
  backgroundAttachment?: 'scroll' | 'fixed' | 'local'
  backgroundClip?: 'border-box' | 'padding-box' | 'content-box' | 'text'
  backgroundOrigin?: 'border-box' | 'padding-box' | 'content-box'
  backgroundBlendMode?: string
  /** JSON-stringified BackgroundLayer[] for multi-background support */
  backgroundLayers?: string
  /** Video background configuration */
  videoBackground?: { url: string; poster?: string; loop?: boolean; muted?: boolean }
  // Border
  borderWidth?: string
  borderStyle?: 'none' | 'solid' | 'dashed' | 'dotted'
  borderColor?: string
  borderRadius?: string
  borderTopLeftRadius?: string
  borderTopRightRadius?: string
  borderBottomLeftRadius?: string
  borderBottomRightRadius?: string
  // Per-side borders
  borderTopWidth?: string
  borderTopStyle?: string
  borderTopColor?: string
  borderRightWidth?: string
  borderRightStyle?: string
  borderRightColor?: string
  borderBottomWidth?: string
  borderBottomStyle?: string
  borderBottomColor?: string
  borderLeftWidth?: string
  borderLeftStyle?: string
  borderLeftColor?: string
  // Spacing
  padding?: string
  paddingTop?: string
  paddingRight?: string
  paddingBottom?: string
  paddingLeft?: string
  margin?: string
  marginTop?: string
  marginRight?: string
  marginBottom?: string
  marginLeft?: string
  // Effects
  opacity?: number
  boxShadow?: string
  backdropFilter?: string
  mixBlendMode?: string
  filter?: string
  transform?: string
  transformOrigin?: string
  perspective?: string
  perspectiveOrigin?: string
  childrenPerspective?: string
  backfaceVisibility?: 'visible' | 'hidden'
  transformStyle?: 'flat' | 'preserve-3d'
  clipPath?: string
  maskImage?: string
  maskSize?: string
  maskPosition?: string
  willChange?: string
  transition?: string
  // Outline
  outlineWidth?: string
  outlineStyle?: string
  outlineColor?: string
  outlineOffset?: string
  // Sizing
  width?: string
  height?: string
  minWidth?: string
  maxWidth?: string
  minHeight?: string
  maxHeight?: string
  // Layout
  display?: string
  overflow?: string
  flexDirection?: string
  flexWrap?: string
  justifyContent?: string
  alignItems?: string
  justifyItems?: string
  alignContent?: string
  gap?: string
  rowGap?: string
  gridTemplateColumns?: string
  gridTemplateRows?: string
  gridGap?: string
  gridAutoFlow?: string
  // Flex child
  flexGrow?: number
  flexShrink?: number
  flexBasis?: string
  alignSelf?: string
  order?: number
  // Grid child
  gridColumn?: string
  gridRow?: string
  gridColumnStart?: string
  gridColumnEnd?: string
  gridRowStart?: string
  gridRowEnd?: string
  justifySelf?: string
  // Position
  position?: string
  top?: string
  right?: string
  bottom?: string
  left?: string
  zIndex?: number
  // Pseudo-element content
  content?: string
  // Cursor
  cursor?: string
  // Size extras
  aspectRatio?: string
  boxSizing?: string
  objectFit?: string
  objectPosition?: string
  // Position extras
  float?: string
  clear?: string
  // Typography extras
  webkitTextStrokeWidth?: string
  webkitTextStrokeColor?: string
  direction?: string
  textDecorationSkipInk?: string
  // Effects extras
  pointerEvents?: string
  visibility?: string
  // Custom CSS
  customCssProperties?: string
}

/** Map of contentPath → style overrides, stored in section.content.__elementStyles */
export type ElementStyleMap = Record<string, ElementStyleOverride>

// ─────────────────────────────────────────────
// CUSTOM ELEMENTS (Phase 2 — Layout)
// ─────────────────────────────────────────────

export type CustomElementType =
  | 'custom-container'
  | 'custom-text'
  | 'custom-heading'
  | 'custom-image'
  | 'custom-button'
  | 'custom-divider'
  | 'custom-spacer'
  | 'custom-embed'
  | 'custom-lottie'
  | 'custom-spline'
  | 'custom-rive'

export interface CustomElement {
  id: string
  type: CustomElementType
  label: string
  content: Record<string, unknown>
  style: ElementLayoutStyle
  /** Breakpoint-specific style overrides for responsive design */
  breakpointStyles?: Record<string, Partial<ElementLayoutStyle>>
  children?: CustomElement[]
  visible: boolean
  classes?: string[]
  htmlId?: string
  htmlTag?: string
  customAttributes?: Array<{ name: string; value: string }>
}

export interface ElementLayoutStyle {
  // Display
  display?: 'block' | 'flex' | 'grid' | 'inline-block' | 'inline-flex' | 'inline-grid' | 'inline' | 'none'
  // Flex container
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  justifyItems?: string
  alignContent?: string
  gap?: string
  // Flex child
  flexGrow?: number
  flexShrink?: number
  flexBasis?: string
  alignSelf?: 'auto' | 'start' | 'end' | 'center' | 'stretch' | 'baseline'
  order?: number
  // Grid container
  gridTemplateColumns?: string
  gridTemplateRows?: string
  gridGap?: string
  gridAutoFlow?: string
  // Grid child
  gridColumn?: string
  gridRow?: string
  gridColumnStart?: string
  gridColumnEnd?: string
  gridRowStart?: string
  gridRowEnd?: string
  justifySelf?: string
  // Sizing
  width?: string
  height?: string
  minWidth?: string
  maxWidth?: string
  minHeight?: string
  maxHeight?: string
  // Spacing
  paddingTop?: string
  paddingRight?: string
  paddingBottom?: string
  paddingLeft?: string
  marginTop?: string
  marginRight?: string
  marginBottom?: string
  marginLeft?: string
  // Position
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'
  top?: string
  right?: string
  bottom?: string
  left?: string
  zIndex?: number
  // Visual
  backgroundColor?: string
  color?: string
  fontSize?: string
  fontWeight?: number
  fontFamily?: string
  textAlign?: 'left' | 'center' | 'right' | 'justify'
  lineHeight?: string
  letterSpacing?: string
  // Border
  borderWidth?: string
  borderStyle?: string
  borderColor?: string
  borderRadius?: string
  // Effects
  opacity?: number
  boxShadow?: string
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto'
  cursor?: string
  // Sizing extras
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  objectPosition?: string
  // Layout extras
  rowGap?: string
  columnGap?: string
  float?: 'left' | 'right' | 'none'
  clear?: 'left' | 'right' | 'both' | 'none'
  aspectRatio?: string
  boxSizing?: string
  pointerEvents?: string
  visibility?: 'visible' | 'hidden' | 'collapse'
  // Pseudo-element content
  content?: string
}
