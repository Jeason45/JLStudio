'use client'
import type { SectionConfig } from '@/types/site'
import type { CustomElement } from '@/types/elements'
import { elementProps } from '@/lib/elementHelpers'
import type { CSSProperties } from 'react'
import type { ElementLayoutStyle } from '@/types/elements'
import { useSortable } from '@dnd-kit/sortable'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useDroppable } from '@dnd-kit/core'

interface CustomSectionProps {
  config: SectionConfig
  isEditing?: boolean
}

function styleToCss(style: ElementLayoutStyle): CSSProperties {
  const css: CSSProperties = {}

  // Display
  if (style.display) css.display = style.display
  // Flex container
  if (style.flexDirection) css.flexDirection = style.flexDirection
  if (style.flexWrap) css.flexWrap = style.flexWrap
  if (style.justifyContent) css.justifyContent = style.justifyContent
  if (style.alignItems) css.alignItems = style.alignItems
  if (style.justifyItems) css.justifyItems = style.justifyItems
  if (style.alignContent) css.alignContent = style.alignContent
  if (style.gap) css.gap = style.gap
  // Flex child
  if (style.flexGrow != null) css.flexGrow = style.flexGrow
  if (style.flexShrink != null) css.flexShrink = style.flexShrink
  if (style.flexBasis) css.flexBasis = style.flexBasis
  if (style.alignSelf) css.alignSelf = style.alignSelf
  // Grid container
  if (style.gridTemplateColumns) css.gridTemplateColumns = style.gridTemplateColumns
  if (style.gridTemplateRows) css.gridTemplateRows = style.gridTemplateRows
  if (style.gridGap) css.gap = style.gridGap
  // Grid child
  if (style.gridColumn) css.gridColumn = style.gridColumn
  if (style.gridRow) css.gridRow = style.gridRow
  // Sizing
  if (style.width) css.width = style.width
  if (style.height) css.height = style.height
  if (style.minWidth) css.minWidth = style.minWidth
  if (style.maxWidth) css.maxWidth = style.maxWidth
  if (style.minHeight) css.minHeight = style.minHeight
  if (style.maxHeight) css.maxHeight = style.maxHeight
  // Spacing
  if (style.paddingTop) css.paddingTop = style.paddingTop
  if (style.paddingRight) css.paddingRight = style.paddingRight
  if (style.paddingBottom) css.paddingBottom = style.paddingBottom
  if (style.paddingLeft) css.paddingLeft = style.paddingLeft
  if (style.marginTop) css.marginTop = style.marginTop
  if (style.marginRight) css.marginRight = style.marginRight
  if (style.marginBottom) css.marginBottom = style.marginBottom
  if (style.marginLeft) css.marginLeft = style.marginLeft
  // Position
  if (style.position) css.position = style.position
  if (style.top) css.top = style.top
  if (style.right) css.right = style.right
  if (style.bottom) css.bottom = style.bottom
  if (style.left) css.left = style.left
  if (style.zIndex != null) css.zIndex = style.zIndex
  // Visual
  if (style.backgroundColor) css.backgroundColor = style.backgroundColor
  if (style.color) css.color = style.color
  if (style.fontSize) css.fontSize = style.fontSize
  if (style.fontWeight != null) css.fontWeight = style.fontWeight
  if (style.fontFamily) css.fontFamily = style.fontFamily
  if (style.textAlign) css.textAlign = style.textAlign
  if (style.lineHeight) css.lineHeight = style.lineHeight
  if (style.letterSpacing) css.letterSpacing = style.letterSpacing
  // Border
  if (style.borderWidth) css.borderWidth = style.borderWidth
  if (style.borderStyle) css.borderStyle = style.borderStyle
  if (style.borderColor) css.borderColor = style.borderColor
  if (style.borderRadius) css.borderRadius = style.borderRadius
  // Effects
  if (style.opacity != null) css.opacity = style.opacity
  if (style.boxShadow) css.boxShadow = style.boxShadow
  if (style.overflow) css.overflow = style.overflow
  if (style.cursor) css.cursor = style.cursor
  // Layout extras
  if (style.rowGap) css.rowGap = style.rowGap
  if (style.columnGap) css.columnGap = style.columnGap
  if (style.float) css.float = style.float as CSSProperties['float']
  if (style.clear) css.clear = style.clear as CSSProperties['clear']
  if (style.aspectRatio) css.aspectRatio = style.aspectRatio
  if (style.boxSizing) css.boxSizing = style.boxSizing as CSSProperties['boxSizing']
  if (style.pointerEvents) css.pointerEvents = style.pointerEvents as CSSProperties['pointerEvents']
  // Padding shorthand
  if ((style as Record<string, unknown>).padding) css.padding = (style as Record<string, unknown>).padding as string

  return css
}

function ElementContent({ element, sectionId }: { element: CustomElement; sectionId: string }) {
  const css = styleToCss(element.style)
  const props = elementProps(sectionId, `__el.${element.id}`, 'container')

  switch (element.type) {
    case 'custom-container':
      return (
        <SortableElementList elements={element.children ?? []} sectionId={sectionId} parentId={element.id}>
          {(child) => <SortableElement key={child.id} element={child} sectionId={sectionId} />}
        </SortableElementList>
      )

    case 'custom-heading': {
      const tag = (element.content.tag as string) || 'h2'
      const text = (element.content.text as string) || ''
      const headingProps = elementProps(sectionId, `__el.${element.id}`, 'heading')
      if (tag === 'h1') return <h1 {...headingProps} style={css}>{text}</h1>
      if (tag === 'h3') return <h3 {...headingProps} style={css}>{text}</h3>
      if (tag === 'h4') return <h4 {...headingProps} style={css}>{text}</h4>
      if (tag === 'h5') return <h5 {...headingProps} style={css}>{text}</h5>
      if (tag === 'h6') return <h6 {...headingProps} style={css}>{text}</h6>
      return <h2 {...headingProps} style={css}>{text}</h2>
    }

    case 'custom-text':
      return (
        <p {...elementProps(sectionId, `__el.${element.id}`, 'text')} style={css}>
          {(element.content.text as string) || ''}
        </p>
      )

    case 'custom-image':
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          {...elementProps(sectionId, `__el.${element.id}`, 'image')}
          src={(element.content.src as string) || '/placeholder.svg'}
          alt={(element.content.alt as string) || ''}
          style={css}
        />
      )

    case 'custom-button':
      return (
        <a
          {...elementProps(sectionId, `__el.${element.id}`, 'button')}
          href={(element.content.href as string) || '#'}
          style={css}
        >
          {(element.content.label as string) || 'Bouton'}
        </a>
      )

    case 'custom-divider':
      return <hr {...props} style={{ ...css, border: 'none', borderTop: `1px solid ${css.borderColor || '#e5e7eb'}` }} />

    case 'custom-spacer':
      return <div {...props} style={{ ...css, height: css.height || '2rem' }} />

    case 'custom-embed':
      return (
        <div {...props} style={css} dangerouslySetInnerHTML={{ __html: (element.content.html as string) || '' }} />
      )

    default:
      return <div {...props} style={css} />
  }
}

// Sortable wrapper for each element on the canvas
export function SortableElement({ element, sectionId }: { element: CustomElement; sectionId: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: element.id,
    data: {
      type: 'element',
      sectionId,
      elementId: element.id,
      parentId: null, // will be set by context
    },
  })

  if (!element.visible) return null

  const css = styleToCss(element.style)
  const isAbsolute = css.position === 'absolute'
  const style: CSSProperties = {
    ...css,
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : undefined,
    // Keep absolute positioning if set, otherwise use relative for sortable
    ...(!isAbsolute ? { position: 'relative' } : {}),
  }

  const isContainer = element.type === 'custom-container'

  if (isContainer) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        {...elementProps(sectionId, `__el.${element.id}`, 'container')}
      >
        <ElementContent element={element} sectionId={sectionId} />
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <ElementContent element={element} sectionId={sectionId} />
    </div>
  )
}

// Wrapper that provides SortableContext for a list of elements
export function SortableElementList({
  elements,
  sectionId,
  parentId,
  children,
}: {
  elements: CustomElement[]
  sectionId: string
  parentId: string | null
  children: (el: CustomElement) => React.ReactNode
}) {
  const { setNodeRef } = useDroppable({
    id: parentId ? `droppable-${parentId}` : `droppable-${sectionId}-root`,
    data: {
      type: 'element-container',
      sectionId,
      parentId,
    },
  })

  const ids = elements.filter(e => e.visible).map(e => e.id)

  return (
    <SortableContext items={ids} strategy={verticalListSortingStrategy}>
      <div ref={setNodeRef} style={{ minHeight: elements.length === 0 ? '2rem' : undefined }}>
        {elements.filter(e => e.visible).map(el => children(el))}
      </div>
    </SortableContext>
  )
}

// Legacy non-sortable renderer (used in SortableSectionWrapper for pre-built sections)
export function CustomElementRenderer({ element, sectionId }: { element: CustomElement; sectionId: string }) {
  if (!element.visible) return null

  const css = styleToCss(element.style)
  const props = elementProps(sectionId, `__el.${element.id}`, 'container')

  switch (element.type) {
    case 'custom-container':
      return (
        <div {...props} style={css}>
          {element.children?.map(child => (
            <CustomElementRenderer key={child.id} element={child} sectionId={sectionId} />
          ))}
        </div>
      )

    case 'custom-heading': {
      const tag = (element.content.tag as string) || 'h2'
      const text = (element.content.text as string) || ''
      const headingProps = elementProps(sectionId, `__el.${element.id}`, 'heading')
      if (tag === 'h1') return <h1 {...headingProps} style={css}>{text}</h1>
      if (tag === 'h3') return <h3 {...headingProps} style={css}>{text}</h3>
      if (tag === 'h4') return <h4 {...headingProps} style={css}>{text}</h4>
      if (tag === 'h5') return <h5 {...headingProps} style={css}>{text}</h5>
      if (tag === 'h6') return <h6 {...headingProps} style={css}>{text}</h6>
      return <h2 {...headingProps} style={css}>{text}</h2>
    }

    case 'custom-text':
      return (
        <p {...elementProps(sectionId, `__el.${element.id}`, 'text')} style={css}>
          {(element.content.text as string) || ''}
        </p>
      )

    case 'custom-image':
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          {...elementProps(sectionId, `__el.${element.id}`, 'image')}
          src={(element.content.src as string) || '/placeholder.svg'}
          alt={(element.content.alt as string) || ''}
          style={css}
        />
      )

    case 'custom-button':
      return (
        <a
          {...elementProps(sectionId, `__el.${element.id}`, 'button')}
          href={(element.content.href as string) || '#'}
          style={css}
        >
          {(element.content.label as string) || 'Bouton'}
        </a>
      )

    case 'custom-divider':
      return <hr {...props} style={{ ...css, border: 'none', borderTop: `1px solid ${css.borderColor || '#e5e7eb'}` }} />

    case 'custom-spacer':
      return <div {...props} style={{ ...css, height: css.height || '2rem' }} />

    case 'custom-embed':
      return (
        <div {...props} style={css} dangerouslySetInnerHTML={{ __html: (element.content.html as string) || '' }} />
      )

    default:
      return <div {...props} style={css} />
  }
}

export function CustomSection({ config }: CustomSectionProps) {
  const elements = config.elements ?? []

  if (elements.length === 0) {
    return (
      <section className="py-16 flex items-center justify-center">
        <div className="text-center text-zinc-400">
          <p className="text-sm">Section personnalisee vide</p>
          <p className="text-xs mt-1">Ajoutez des elements depuis la barre laterale</p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative">
      <SortableElementList elements={elements} sectionId={config.id} parentId={null}>
        {(element) => <SortableElement key={element.id} element={element} sectionId={config.id} />}
      </SortableElementList>
    </section>
  )
}

export const customMeta = {
  type: 'custom',
  label: 'Section libre',
  icon: '🧩',
  variants: ['default'],
  defaultVariant: 'default',
  defaultContent: {},
}
