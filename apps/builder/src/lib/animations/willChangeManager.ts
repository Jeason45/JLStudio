// ─── Will-Change Manager ───
// Auto-applies will-change to animated elements for GPU optimization

const trackedElements = new Map<HTMLElement, { props: Set<string>; timeout: ReturnType<typeof setTimeout> | null }>()

const PROPERTY_MAP: Record<string, string> = {
  transform: 'transform',
  opacity: 'opacity',
  filter: 'filter',
  'background-color': 'background-color',
  color: 'color',
  'border-color': 'border-color',
  'border-radius': 'border-radius',
  'box-shadow': 'box-shadow',
  width: 'width',
  height: 'height',
  'clip-path': 'clip-path',
  'backdrop-filter': 'backdrop-filter',
}

/** Add will-change for an element before animation starts */
export function addWillChange(element: HTMLElement, animatedProps: string[]) {
  let entry = trackedElements.get(element)
  if (!entry) {
    entry = { props: new Set(), timeout: null }
    trackedElements.set(element, entry)
  }

  // Clear any pending cleanup
  if (entry.timeout) {
    clearTimeout(entry.timeout)
    entry.timeout = null
  }

  for (const prop of animatedProps) {
    const mapped = PROPERTY_MAP[prop] ?? prop
    entry.props.add(mapped)
  }

  element.style.willChange = Array.from(entry.props).join(', ')
}

/** Remove will-change after animation completes (with delay for chained anims) */
export function removeWillChange(element: HTMLElement, delay = 200) {
  const entry = trackedElements.get(element)
  if (!entry) return

  entry.timeout = setTimeout(() => {
    element.style.willChange = 'auto'
    entry.props.clear()
    trackedElements.delete(element)
  }, delay)
}

/** Scan elements with active animations and apply will-change */
export function scanAndApplyWillChange(container: HTMLElement) {
  const animated = container.querySelectorAll('[data-element-id]')
  for (const el of animated) {
    const htmlEl = el as HTMLElement
    const style = htmlEl.style

    const props: string[] = []
    if (style.transform) props.push('transform')
    if (style.opacity) props.push('opacity')
    if (style.filter) props.push('filter')

    if (props.length > 0) {
      addWillChange(htmlEl, props)
    }
  }
}

/** Detect animated properties from AnimationConfig */
export function detectAnimatedProperties(from?: Record<string, unknown>, to?: Record<string, unknown>): string[] {
  const props = new Set<string>()
  const allKeys = new Set([...Object.keys(from ?? {}), ...Object.keys(to ?? {})])

  for (const key of allKeys) {
    // Transform properties
    if (['x', 'y', 'z', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'skewX', 'skewY'].includes(key)) {
      props.add('transform')
    } else if (['blur', 'brightness', 'contrast', 'grayscale', 'hueRotate', 'saturate', 'sepia', 'invert'].includes(key)) {
      props.add('filter')
    } else if (['backdropBlur', 'backdropBrightness'].includes(key)) {
      props.add('backdrop-filter')
    } else if (key === 'opacity') {
      props.add('opacity')
    } else if (PROPERTY_MAP[key]) {
      props.add(PROPERTY_MAP[key])
    }
  }

  return Array.from(props)
}

/** Clear all tracked will-change */
export function clearAllWillChange() {
  for (const [element, entry] of trackedElements) {
    if (entry.timeout) clearTimeout(entry.timeout)
    element.style.willChange = 'auto'
  }
  trackedElements.clear()
}
