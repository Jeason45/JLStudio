// ─── Split Text ───
// Split text elements into individual chars/words/lines for staggered animation

export type SplitMode = 'chars' | 'words' | 'lines'

export interface SplitTextConfig {
  mode: SplitMode
  /** CSS class to add to each split element */
  wrapperClass?: string
}

export interface SplitResult {
  elements: HTMLElement[]
  revert: () => void
}

export function splitText(element: HTMLElement, config: SplitTextConfig): SplitResult {
  const originalHTML = element.innerHTML
  const text = element.textContent ?? ''
  const wrapperClass = config.wrapperClass ?? 'split-item'

  let items: string[]

  switch (config.mode) {
    case 'chars':
      items = text.split('')
      break
    case 'words':
      items = text.split(/\s+/).filter(Boolean)
      break
    case 'lines': {
      // For lines, we need to measure. Use temporary element.
      const tempEl = element.cloneNode(true) as HTMLElement
      tempEl.style.position = 'absolute'
      tempEl.style.visibility = 'hidden'
      tempEl.style.whiteSpace = 'normal'
      document.body.appendChild(tempEl)

      const words = text.split(/\s+/).filter(Boolean)
      tempEl.innerHTML = ''
      const spans: HTMLSpanElement[] = []

      for (const word of words) {
        const span = document.createElement('span')
        span.textContent = word + ' '
        span.style.display = 'inline'
        tempEl.appendChild(span)
        spans.push(span)
      }

      const lines: string[] = []
      let currentLine = ''
      let lastTop = spans[0]?.offsetTop ?? 0

      for (const span of spans) {
        if (span.offsetTop !== lastTop) {
          lines.push(currentLine.trim())
          currentLine = ''
          lastTop = span.offsetTop
        }
        currentLine += (span.textContent ?? '')
      }
      if (currentLine.trim()) lines.push(currentLine.trim())

      document.body.removeChild(tempEl)
      items = lines
      break
    }
  }

  // Build split HTML
  const separator = config.mode === 'chars' ? '' : ' '
  element.innerHTML = items
    .map((item, i) => {
      const display = config.mode === 'lines' ? 'block' : 'inline-block'
      return `<span class="${wrapperClass}" style="display:${display};overflow:hidden" data-split-index="${i}">${item}${config.mode === 'words' && i < items.length - 1 ? '&nbsp;' : ''}</span>`
    })
    .join(separator === ' ' ? '' : '')

  const elements = Array.from(element.querySelectorAll(`.${wrapperClass}`)) as HTMLElement[]

  return {
    elements,
    revert: () => {
      element.innerHTML = originalHTML
    },
  }
}

/** Apply staggered animation to split elements */
export async function animateSplitText(
  splitResult: SplitResult,
  animation: {
    from: Record<string, unknown>
    to: Record<string, unknown>
    duration: number
    staggerDelay: number
    easing?: string
  },
): Promise<void> {
  const { elements } = splitResult
  const animations: Animation[] = []

  for (let i = 0; i < elements.length; i++) {
    const el = elements[i]
    Object.assign(el.style, animation.from)
    const anim = el.animate(
      [animation.from as Keyframe, animation.to as Keyframe],
      {
        duration: animation.duration,
        delay: i * animation.staggerDelay,
        easing: animation.easing ?? 'ease-out',
        fill: 'forwards',
      }
    )
    animations.push(anim)
  }

  await Promise.all(animations.map(a => a.finished))
}
