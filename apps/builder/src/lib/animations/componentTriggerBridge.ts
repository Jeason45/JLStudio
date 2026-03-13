// ─── Component Trigger Bridge ───
// Event bus for component-level animation triggers

export type ComponentTriggerType =
  | 'navbar-open'
  | 'navbar-close'
  | 'tab-change'
  | 'slider-change'
  | 'slider-next'
  | 'slider-prev'
  | 'accordion-open'
  | 'accordion-close'
  | 'modal-open'
  | 'modal-close'
  | 'dropdown-open'
  | 'dropdown-close'
  | 'form-submit'
  | 'form-success'
  | 'form-error'

export interface ComponentTriggerEvent {
  type: ComponentTriggerType
  sourceId: string
  data?: Record<string, unknown>
}

type TriggerHandler = (event: ComponentTriggerEvent) => void

class ComponentTriggerBus {
  private handlers = new Map<string, Set<TriggerHandler>>()
  private globalHandlers = new Set<TriggerHandler>()

  /** Listen for a specific trigger type */
  on(type: ComponentTriggerType, handler: TriggerHandler): () => void {
    let set = this.handlers.get(type)
    if (!set) {
      set = new Set()
      this.handlers.set(type, set)
    }
    set.add(handler)
    return () => set!.delete(handler)
  }

  /** Listen for all trigger types */
  onAny(handler: TriggerHandler): () => void {
    this.globalHandlers.add(handler)
    return () => this.globalHandlers.delete(handler)
  }

  /** Emit a component trigger */
  emit(event: ComponentTriggerEvent) {
    const handlers = this.handlers.get(event.type)
    if (handlers) {
      for (const handler of handlers) {
        try { handler(event) } catch (e) { console.error('[ComponentTrigger]', e) }
      }
    }
    for (const handler of this.globalHandlers) {
      try { handler(event) } catch (e) { console.error('[ComponentTrigger]', e) }
    }
  }

  /** Remove all handlers */
  clear() {
    this.handlers.clear()
    this.globalHandlers.clear()
  }
}

export const componentTriggerBus = new ComponentTriggerBus()

/** Helper to create a trigger emitter for a component */
export function createTriggerEmitter(sourceId: string) {
  return (type: ComponentTriggerType, data?: Record<string, unknown>) => {
    componentTriggerBus.emit({ type, sourceId, data })
  }
}
