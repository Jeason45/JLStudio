// ─── View Transitions ───
// View Transitions API wrapper with GSAP fallback

export interface ViewTransitionConfig {
  /** Unique name for the transitioning element */
  name: string
  /** Duration in ms */
  duration?: number
  /** CSS easing */
  easing?: string
}

/** Apply view-transition-name to an element */
export function setViewTransitionName(element: HTMLElement, name: string) {
  element.style.viewTransitionName = name
}

/** Remove view-transition-name */
export function clearViewTransitionName(element: HTMLElement) {
  element.style.viewTransitionName = ''
}

/** Check if View Transitions API is supported */
export function supportsViewTransitions(): boolean {
  return typeof document !== 'undefined' && 'startViewTransition' in document
}

/**
 * Perform a view transition.
 * Uses native API if available, falls back to GSAP crossfade.
 */
export async function viewTransition(
  domUpdate: () => void | Promise<void>,
  config?: ViewTransitionConfig,
): Promise<void> {
  if (supportsViewTransitions()) {
    const transition = (document as unknown as { startViewTransition: (fn: () => void | Promise<void>) => { finished: Promise<void> } }).startViewTransition(domUpdate)
    await transition.finished
    return
  }

  // Fallback: simple crossfade
  const container = document.getElementById('site-canvas') ?? document.body

  // Capture before state
  container.style.opacity = '1'
  container.style.transition = `opacity ${config?.duration ?? 300}ms ${config?.easing ?? 'ease'}`
  container.style.opacity = '0'

  await new Promise(resolve => setTimeout(resolve, (config?.duration ?? 300) / 2))
  await domUpdate()

  container.style.opacity = '1'
  await new Promise(resolve => setTimeout(resolve, (config?.duration ?? 300) / 2))
  container.style.transition = ''
}
