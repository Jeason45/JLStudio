export interface StateDef {
  id: string           // ':hover', '::before', etc.
  label: string        // 'Hover', 'Before', etc.
  group: 'interaction' | 'pseudo-element' | 'form'
  cssSuffix: string    // ':hover', '::before'
}

export const ELEMENT_STATES: StateDef[] = [
  { id: ':hover',         label: 'Hover',            group: 'interaction',    cssSuffix: ':hover' },
  { id: ':active',        label: 'Pressed',          group: 'interaction',    cssSuffix: ':active' },
  { id: ':focus',         label: 'Focused',          group: 'interaction',    cssSuffix: ':focus' },
  { id: ':focus-visible', label: 'Focus (keyboard)', group: 'interaction',    cssSuffix: ':focus-visible' },
  { id: ':visited',       label: 'Visited',          group: 'interaction',    cssSuffix: ':visited' },
  { id: '::before',       label: 'Before',           group: 'pseudo-element', cssSuffix: '::before' },
  { id: '::after',        label: 'After',            group: 'pseudo-element', cssSuffix: '::after' },
  { id: '::placeholder',  label: 'Placeholder',      group: 'form',           cssSuffix: '::placeholder' },
]

export function getStateById(stateId: string): StateDef | undefined {
  return ELEMENT_STATES.find(s => s.id === stateId)
}

export function isPseudoElement(stateId: string): boolean {
  return stateId.startsWith('::')
}
