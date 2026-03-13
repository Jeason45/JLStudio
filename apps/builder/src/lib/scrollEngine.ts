// ─── Scroll Engine ───
// Custom ScrollTrigger-like engine for advanced scroll-driven animations

import type { ScrollTriggerConfig, ScrollPosition } from '@/types/interactions'

export interface ScrollObserverEntry {
  id: string
  element: HTMLElement
  config: ScrollTriggerConfig
  onProgress: (progress: number) => void
  onEnter?: () => void
  onLeave?: () => void
  onEnterBack?: () => void
  onLeaveBack?: () => void
}

interface ResolvedPositions {
  startPx: number
  endPx: number
}

interface PinState {
  placeholder: HTMLDivElement | null
  isPinned: boolean
  originalStyles: {
    position: string
    top: string
    left: string
    width: string
    zIndex: string
  }
}

// ─── Position parser ───

function parsePosition(position: ScrollPosition, element: HTMLElement, viewport: number): number {
  const parts = position.trim().split(/\s+/)

  // Single value: px or %
  if (parts.length === 1) {
    const val = parts[0]
    if (val.endsWith('px')) return parseInt(val)
    if (val.endsWith('%')) return (parseInt(val) / 100) * viewport
    // Named positions on element
    const rect = element.getBoundingClientRect()
    const scrollY = window.scrollY
    switch (val) {
      case 'top': return rect.top + scrollY
      case 'center': return rect.top + scrollY + rect.height / 2
      case 'bottom': return rect.top + scrollY + rect.height
      default: return parseInt(val) || 0
    }
  }

  // Two values: "triggerPosition viewportPosition"
  // e.g. "top bottom" means element's top aligns with viewport bottom
  const [triggerPart, viewportPart] = parts
  const rect = element.getBoundingClientRect()
  const scrollY = window.scrollY

  let triggerPx: number
  switch (triggerPart) {
    case 'top': triggerPx = rect.top + scrollY; break
    case 'center': triggerPx = rect.top + scrollY + rect.height / 2; break
    case 'bottom': triggerPx = rect.top + scrollY + rect.height; break
    default:
      if (triggerPart.endsWith('px')) triggerPx = rect.top + scrollY + parseInt(triggerPart)
      else if (triggerPart.endsWith('%')) triggerPx = rect.top + scrollY + (parseInt(triggerPart) / 100) * rect.height
      else triggerPx = rect.top + scrollY + (parseInt(triggerPart) || 0)
  }

  let viewportPx: number
  switch (viewportPart) {
    case 'top': viewportPx = 0; break
    case 'center': viewportPx = viewport / 2; break
    case 'bottom': viewportPx = viewport; break
    default:
      if (viewportPart.endsWith('px')) viewportPx = parseInt(viewportPart)
      else if (viewportPart.endsWith('%')) viewportPx = (parseInt(viewportPart) / 100) * viewport
      else viewportPx = parseInt(viewportPart) || 0
  }

  // The scroll position where trigger aligns with viewport position
  return triggerPx - viewportPx
}

function resolvePositions(element: HTMLElement, config: ScrollTriggerConfig): ResolvedPositions {
  const vh = window.innerHeight
  const startPx = parsePosition(config.start || 'top bottom', element, vh)
  const endPx = parsePosition(config.end || 'bottom top', element, vh)
  return { startPx, endPx }
}

// ─── Marker debug ───

function createMarker(label: string, position: number, color: string): HTMLDivElement {
  const marker = document.createElement('div')
  marker.style.cssText = `
    position: absolute; top: ${position}px; left: 0; right: 0; height: 1px;
    background: ${color}; z-index: 99999; pointer-events: none;
  `
  const text = document.createElement('span')
  text.style.cssText = `
    position: absolute; right: 4px; top: -12px; font-size: 10px;
    color: ${color}; font-family: monospace; background: rgba(0,0,0,0.7);
    padding: 1px 4px; border-radius: 2px;
  `
  text.textContent = label
  marker.appendChild(text)
  document.body.appendChild(marker)
  return marker
}

// ─── Main class ───

export class ScrollObserver {
  private entries = new Map<string, ScrollObserverEntry>()
  private pinStates = new Map<string, PinState>()
  private markers = new Map<string, HTMLDivElement[]>()
  private rafId: number | null = null
  private lastScrollY = 0
  private isRunning = false

  add(entry: ScrollObserverEntry) {
    this.entries.set(entry.id, entry)
    this.pinStates.set(entry.id, {
      placeholder: null,
      isPinned: false,
      originalStyles: { position: '', top: '', left: '', width: '', zIndex: '' },
    })

    if (entry.config.markers) {
      const { startPx, endPx } = resolvePositions(entry.element, entry.config)
      const startMarker = createMarker(`start: ${entry.id}`, startPx, '#22c55e')
      const endMarker = createMarker(`end: ${entry.id}`, endPx, '#ef4444')
      this.markers.set(entry.id, [startMarker, endMarker])
    }

    if (!this.isRunning) this.start()
  }

  remove(id: string) {
    // Cleanup pin
    const pinState = this.pinStates.get(id)
    if (pinState?.isPinned) {
      const entry = this.entries.get(id)
      if (entry) this.unpinElement(entry.element, pinState)
    }

    // Cleanup markers
    const markerEls = this.markers.get(id)
    if (markerEls) {
      markerEls.forEach(m => m.remove())
      this.markers.delete(id)
    }

    this.entries.delete(id)
    this.pinStates.delete(id)

    if (this.entries.size === 0) this.stop()
  }

  private start() {
    this.isRunning = true
    this.tick()
  }

  private stop() {
    this.isRunning = false
    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }

  private tick = () => {
    if (!this.isRunning) return

    const scrollY = window.scrollY
    const scrollDir = scrollY > this.lastScrollY ? 'down' : 'up'

    for (const [id, entry] of this.entries) {
      const { startPx, endPx } = resolvePositions(entry.element, entry.config)
      const distance = endPx - startPx
      if (distance <= 0) continue

      const rawProgress = (scrollY - startPx) / distance
      const progress = Math.max(0, Math.min(1, rawProgress))

      // Scrub smoothing
      if (entry.config.scrub && typeof entry.config.scrub === 'number') {
        // Lerp-based smoothing handled by caller
      }

      entry.onProgress(progress)

      // Pin handling
      if (entry.config.pin) {
        const pinState = this.pinStates.get(id)!
        if (scrollY >= startPx && scrollY <= endPx) {
          if (!pinState.isPinned) {
            this.pinElement(entry.element, pinState)
          }
          // Update pinned position
          entry.element.style.top = '0px'
        } else if (pinState.isPinned) {
          this.unpinElement(entry.element, pinState)
          if (scrollY > endPx) {
            entry.element.style.transform = `translateY(${distance}px)`
          }
        }
      }

      // Toggle actions — track previous state per entry
      const prevProgress = (entry as unknown as { _prevProgress?: number })._prevProgress ?? -1
      const wasInView = prevProgress > 0 && prevProgress < 1
      const isNowInView = rawProgress > 0 && rawProgress < 1

      // Entering the range
      if (!wasInView && isNowInView) {
        if (scrollDir === 'down') entry.onEnter?.()
        else entry.onEnterBack?.()
      }
      // Leaving the range
      if (wasInView && !isNowInView) {
        if (scrollDir === 'down') entry.onLeave?.()
        else entry.onLeaveBack?.()
      }

      ;(entry as unknown as { _prevProgress?: number })._prevProgress = rawProgress
    }

    this.lastScrollY = scrollY
    this.rafId = requestAnimationFrame(this.tick)
  }

  private pinElement(el: HTMLElement, state: PinState) {
    state.originalStyles = {
      position: el.style.position,
      top: el.style.top,
      left: el.style.left,
      width: el.style.width,
      zIndex: el.style.zIndex,
    }

    const rect = el.getBoundingClientRect()

    // Create placeholder
    const placeholder = document.createElement('div')
    placeholder.style.width = rect.width + 'px'
    placeholder.style.height = rect.height + 'px'
    placeholder.style.visibility = 'hidden'
    el.parentNode?.insertBefore(placeholder, el)
    state.placeholder = placeholder

    // Pin element
    el.style.position = 'fixed'
    el.style.top = '0px'
    el.style.left = rect.left + 'px'
    el.style.width = rect.width + 'px'
    el.style.zIndex = '1000'
    state.isPinned = true
  }

  private unpinElement(el: HTMLElement, state: PinState) {
    // Restore styles
    el.style.position = state.originalStyles.position
    el.style.top = state.originalStyles.top
    el.style.left = state.originalStyles.left
    el.style.width = state.originalStyles.width
    el.style.zIndex = state.originalStyles.zIndex

    // Remove placeholder
    state.placeholder?.remove()
    state.placeholder = null
    state.isPinned = false
  }

  clear() {
    for (const id of this.entries.keys()) {
      this.remove(id)
    }
    this.stop()
  }
}

export const scrollObserver = new ScrollObserver()
