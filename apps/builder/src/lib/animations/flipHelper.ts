// ─── FLIP Animation Helper ───
// First, Last, Invert, Play technique for layout animations

export interface FlipConfig {
  duration?: number
  easing?: string
  onComplete?: () => void
}

interface ElementSnapshot {
  element: HTMLElement
  rect: DOMRect
  opacity: number
}

export class FlipAnimator {
  private snapshots = new Map<string, ElementSnapshot>()

  /** Step 1: Record current positions */
  recordPositions(selector: string | HTMLElement[]): void {
    this.snapshots.clear()
    const elements = typeof selector === 'string'
      ? Array.from(document.querySelectorAll(selector)) as HTMLElement[]
      : selector

    for (const el of elements) {
      const id = el.dataset.flipId ?? el.dataset.elementId ?? el.id
      if (!id) continue
      this.snapshots.set(id, {
        element: el,
        rect: el.getBoundingClientRect(),
        opacity: parseFloat(getComputedStyle(el).opacity) || 1,
      })
    }
  }

  /** Step 2: Apply DOM changes, then call animate() */
  animate(config: FlipConfig = {}): Animation[] {
    const { duration = 400, easing = 'cubic-bezier(0.2, 0, 0, 1)', onComplete } = config
    const animations: Animation[] = []

    for (const [id, snapshot] of this.snapshots) {
      const el = document.querySelector(`[data-flip-id="${id}"], [data-element-id="${id}"], #${CSS.escape(id)}`) as HTMLElement | null
      if (!el) continue

      const lastRect = el.getBoundingClientRect()
      const firstRect = snapshot.rect

      // Calculate invert
      const dx = firstRect.left - lastRect.left
      const dy = firstRect.top - lastRect.top
      const sw = firstRect.width / lastRect.width
      const sh = firstRect.height / lastRect.height

      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5 && Math.abs(sw - 1) < 0.01 && Math.abs(sh - 1) < 0.01) {
        continue // No significant change
      }

      const anim = el.animate([
        {
          transform: `translate(${dx}px, ${dy}px) scale(${sw}, ${sh})`,
          transformOrigin: 'top left',
        },
        {
          transform: 'translate(0, 0) scale(1, 1)',
          transformOrigin: 'top left',
        },
      ], {
        duration,
        easing,
        fill: 'none',
      })

      animations.push(anim)
    }

    if (onComplete && animations.length > 0) {
      Promise.all(animations.map(a => a.finished)).then(onComplete)
    }

    this.snapshots.clear()
    return animations
  }
}

/** Convenience function for one-shot FLIP */
export function flip(
  elements: string | HTMLElement[],
  domChange: () => void,
  config?: FlipConfig,
): Animation[] {
  const flipper = new FlipAnimator()
  flipper.recordPositions(elements)
  domChange()
  return flipper.animate(config)
}
