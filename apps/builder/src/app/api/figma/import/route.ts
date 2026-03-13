import { NextRequest, NextResponse } from 'next/server'

// ─── Figma API types ───

interface FigmaColor {
  r: number
  g: number
  b: number
  a: number
}

interface FigmaPaint {
  type: string
  color?: FigmaColor
  opacity?: number
  visible?: boolean
  imageRef?: string
  gradientStops?: Array<{ color: FigmaColor; position: number }>
  gradientHandlePositions?: Array<{ x: number; y: number }>
}

interface FigmaTypeStyle {
  fontFamily?: string
  fontSize?: number
  fontWeight?: number
  lineHeightPx?: number
  letterSpacing?: number
  textAlignHorizontal?: string
  textCase?: string
  textDecoration?: string
}

interface FigmaEffect {
  type: string
  visible?: boolean
  color?: FigmaColor
  offset?: { x: number; y: number }
  radius?: number
  spread?: number
}

interface FigmaNode {
  id: string
  name: string
  type: string
  visible?: boolean
  children?: FigmaNode[]
  // Geometry
  absoluteBoundingBox?: { x: number; y: number; width: number; height: number }
  // Style
  fills?: FigmaPaint[]
  strokes?: FigmaPaint[]
  strokeWeight?: number
  cornerRadius?: number
  rectangleCornerRadii?: [number, number, number, number]
  opacity?: number
  effects?: FigmaEffect[]
  clipsContent?: boolean
  // Text
  characters?: string
  style?: FigmaTypeStyle
  // Auto layout
  layoutMode?: 'HORIZONTAL' | 'VERTICAL' | 'NONE'
  primaryAxisSizingMode?: string
  counterAxisSizingMode?: string
  primaryAxisAlignItems?: string
  counterAxisAlignItems?: string
  paddingLeft?: number
  paddingRight?: number
  paddingTop?: number
  paddingBottom?: number
  itemSpacing?: number
  // Constraints
  constraints?: { vertical: string; horizontal: string }
}

// ─── Helpers ───

function figmaColorToRgba(c: FigmaColor, opacity?: number): string {
  const r = Math.round(c.r * 255)
  const g = Math.round(c.g * 255)
  const b = Math.round(c.b * 255)
  const a = opacity !== undefined ? opacity : c.a
  if (a === 1) return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
  return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`
}

function figmaAlignToCSS(align?: string): 'flex-start' | 'flex-end' | 'center' | 'space-between' | undefined {
  if (!align) return undefined
  const map: Record<string, 'flex-start' | 'flex-end' | 'center' | 'space-between'> = {
    MIN: 'flex-start',
    MAX: 'flex-end',
    CENTER: 'center',
    SPACE_BETWEEN: 'space-between',
  }
  return map[align]
}

function figmaTextAlignToCSS(align?: string): 'left' | 'center' | 'right' | 'justify' | undefined {
  if (!align) return undefined
  const map: Record<string, 'left' | 'center' | 'right' | 'justify'> = {
    LEFT: 'left',
    CENTER: 'center',
    RIGHT: 'right',
    JUSTIFIED: 'justify',
  }
  return map[align]
}

function extractBackgroundColor(fills?: FigmaPaint[]): string | undefined {
  if (!fills) return undefined
  const solidFill = fills.find(f => f.type === 'SOLID' && f.visible !== false && f.color)
  if (solidFill?.color) return figmaColorToRgba(solidFill.color, solidFill.opacity)
  return undefined
}

function extractTextColor(fills?: FigmaPaint[]): string | undefined {
  return extractBackgroundColor(fills)
}

function hasImageFill(fills?: FigmaPaint[]): boolean {
  if (!fills) return false
  return fills.some(f => f.type === 'IMAGE' && f.visible !== false)
}

function extractBorderRadius(node: FigmaNode): string | undefined {
  if (node.rectangleCornerRadii) {
    const [tl, tr, br, bl] = node.rectangleCornerRadii
    if (tl === tr && tr === br && br === bl) return `${tl}px`
    return `${tl}px ${tr}px ${br}px ${bl}px`
  }
  if (node.cornerRadius) return `${node.cornerRadius}px`
  return undefined
}

function extractBoxShadow(effects?: FigmaEffect[]): string | undefined {
  if (!effects) return undefined
  const shadows = effects.filter(e => (e.type === 'DROP_SHADOW' || e.type === 'INNER_SHADOW') && e.visible !== false)
  if (shadows.length === 0) return undefined
  return shadows.map(s => {
    const inset = s.type === 'INNER_SHADOW' ? 'inset ' : ''
    const x = s.offset?.x ?? 0
    const y = s.offset?.y ?? 0
    const blur = s.radius ?? 0
    const spread = s.spread ?? 0
    const color = s.color ? figmaColorToRgba(s.color) : 'rgba(0,0,0,0.25)'
    return `${inset}${x}px ${y}px ${blur}px ${spread}px ${color}`
  }).join(', ')
}

function genId(): string {
  return 'el-' + Math.random().toString(36).slice(2, 10)
}

// ─── Conversion ───

interface ConvertedElement {
  id: string
  type: 'custom-container' | 'custom-text' | 'custom-heading' | 'custom-image' | 'custom-button' | 'custom-divider' | 'custom-spacer' | 'custom-embed'
  label: string
  content: Record<string, unknown>
  style: Record<string, unknown>
  children?: ConvertedElement[]
  visible: boolean
}

function convertNode(
  node: FigmaNode,
  imageMap: Record<string, string>,
  depth: number = 0,
): ConvertedElement | null {
  if (node.visible === false) return null
  // Skip pages (top-level)
  if (node.type === 'DOCUMENT' || node.type === 'CANVAS') return null

  const bbox = node.absoluteBoundingBox

  // TEXT
  if (node.type === 'TEXT') {
    const s = node.style
    return {
      id: genId(),
      type: 'custom-text',
      label: node.name || 'Text',
      content: { text: node.characters || '' },
      style: {
        ...(bbox && { width: `${bbox.width}px` }),
        ...(s?.fontFamily && { fontFamily: s.fontFamily }),
        ...(s?.fontSize && { fontSize: `${s.fontSize}px` }),
        ...(s?.fontWeight && { fontWeight: s.fontWeight }),
        ...(s?.lineHeightPx && { lineHeight: `${s.lineHeightPx}px` }),
        ...(s?.letterSpacing && { letterSpacing: `${s.letterSpacing}px` }),
        ...(s?.textAlignHorizontal && { textAlign: figmaTextAlignToCSS(s.textAlignHorizontal) }),
        ...((extractTextColor(node.fills as FigmaPaint[])) && { color: extractTextColor(node.fills as FigmaPaint[]) }),
        ...(node.opacity !== undefined && node.opacity < 1 && { opacity: node.opacity }),
      },
      visible: true,
    }
  }

  // IMAGE fill → custom-image
  if (hasImageFill(node.fills as FigmaPaint[])) {
    const imgUrl = imageMap[node.id] || ''
    return {
      id: genId(),
      type: 'custom-image',
      label: node.name || 'Image',
      content: { src: imgUrl, alt: node.name || '' },
      style: {
        ...(bbox && { width: `${bbox.width}px`, height: `${bbox.height}px` }),
        ...((extractBorderRadius(node)) && { borderRadius: extractBorderRadius(node) }),
        ...(node.opacity !== undefined && node.opacity < 1 && { opacity: node.opacity }),
      },
      visible: true,
    }
  }

  // FRAME, GROUP, COMPONENT, INSTANCE, RECTANGLE, ELLIPSE, etc → container
  const isAutoLayout = node.layoutMode && node.layoutMode !== 'NONE'
  const bgColor = extractBackgroundColor(node.fills as FigmaPaint[])
  const borderRadius = extractBorderRadius(node)
  const boxShadow = extractBoxShadow(node.effects)

  const style: Record<string, unknown> = {}
  if (bbox && depth > 0) {
    style.width = `${bbox.width}px`
    style.height = `${bbox.height}px`
  }
  if (bgColor) style.backgroundColor = bgColor
  if (borderRadius) style.borderRadius = borderRadius
  if (boxShadow) style.boxShadow = boxShadow
  if (node.opacity !== undefined && node.opacity < 1) style.opacity = node.opacity
  if (node.clipsContent) style.overflow = 'hidden'

  // Strokes → border
  if (node.strokes && node.strokes.length > 0) {
    const stroke = node.strokes.find(s => s.visible !== false && s.color)
    if (stroke?.color) {
      style.borderWidth = `${node.strokeWeight ?? 1}px`
      style.borderStyle = 'solid'
      style.borderColor = figmaColorToRgba(stroke.color, stroke.opacity)
    }
  }

  // Auto layout → flex
  if (isAutoLayout) {
    style.display = 'flex'
    style.flexDirection = node.layoutMode === 'VERTICAL' ? 'column' : 'row'
    if (node.itemSpacing) style.gap = `${node.itemSpacing}px`
    if (node.paddingTop) style.paddingTop = `${node.paddingTop}px`
    if (node.paddingBottom) style.paddingBottom = `${node.paddingBottom}px`
    if (node.paddingLeft) style.paddingLeft = `${node.paddingLeft}px`
    if (node.paddingRight) style.paddingRight = `${node.paddingRight}px`
    const justify = figmaAlignToCSS(node.primaryAxisAlignItems)
    if (justify) style.justifyContent = justify
    const align = figmaAlignToCSS(node.counterAxisAlignItems)
    if (align) style.alignItems = align
  }

  // Convert children
  const children: ConvertedElement[] = []
  if (node.children) {
    for (const child of node.children) {
      const converted = convertNode(child, imageMap, depth + 1)
      if (converted) children.push(converted)
    }
  }

  // If it's a plain rectangle with no children, make it simpler
  if (node.type === 'RECTANGLE' && children.length === 0) {
    return {
      id: genId(),
      type: 'custom-container',
      label: node.name || 'Rectangle',
      content: {},
      style,
      visible: true,
    }
  }

  return {
    id: genId(),
    type: 'custom-container',
    label: node.name || 'Frame',
    content: {},
    style,
    children: children.length > 0 ? children : undefined,
    visible: true,
  }
}

// ─── Route handler ───

interface ImportBody {
  fileKey: string
  nodeIds?: string[]
  accessToken: string
}

async function figmaFetch(url: string, token: string) {
  const res = await fetch(url, {
    headers: { 'X-Figma-Token': token },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Figma API error ${res.status}: ${text}`)
  }
  return res.json()
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ImportBody

    if (!body.fileKey || !body.accessToken) {
      return NextResponse.json({ error: 'fileKey and accessToken are required' }, { status: 400 })
    }

    // 1. Fetch file structure or specific nodes
    let nodes: FigmaNode[] = []

    if (body.nodeIds && body.nodeIds.length > 0) {
      const ids = body.nodeIds.join(',')
      const data = await figmaFetch(
        `https://api.figma.com/v1/files/${body.fileKey}/nodes?ids=${encodeURIComponent(ids)}`,
        body.accessToken,
      )
      // data.nodes is { nodeId: { document: FigmaNode } }
      nodes = Object.values(data.nodes as Record<string, { document: FigmaNode }>).map(n => n.document)
    } else {
      const data = await figmaFetch(
        `https://api.figma.com/v1/files/${body.fileKey}`,
        body.accessToken,
      )
      // Return full file tree
      const doc = data.document as FigmaNode
      return NextResponse.json({ fileTree: doc })
    }

    // 2. Collect all node IDs with image fills for image export
    const imageNodeIds: string[] = []
    function collectImageNodes(node: FigmaNode) {
      if (hasImageFill(node.fills as FigmaPaint[])) {
        imageNodeIds.push(node.id)
      }
      if (node.children) node.children.forEach(collectImageNodes)
    }
    nodes.forEach(collectImageNodes)

    // 3. Fetch rendered images for image fills
    let imageMap: Record<string, string> = {}
    if (imageNodeIds.length > 0) {
      const ids = imageNodeIds.join(',')
      const imgData = await figmaFetch(
        `https://api.figma.com/v1/images/${body.fileKey}?ids=${encodeURIComponent(ids)}&format=png&scale=2`,
        body.accessToken,
      )
      imageMap = (imgData.images as Record<string, string>) || {}
    }

    // 4. Convert nodes to CustomElement format
    const elements: ConvertedElement[] = []
    for (const node of nodes) {
      const converted = convertNode(node, imageMap, 0)
      if (converted) elements.push(converted)
    }

    return NextResponse.json({ elements, images: imageMap })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
