'use client'
import { GripVertical } from 'lucide-react'

interface SectionDragOverlayProps {
  type: 'section' | 'new-section' | 'element' | 'new-element' | 'new-template' | null
  label: string
}

export function SectionDragOverlay({ type, label }: SectionDragOverlayProps) {
  if (type === 'new-template') {
    return (
      <div className="bg-violet-500 text-white text-xs font-medium px-3 py-2 rounded-lg shadow-xl opacity-90 flex items-center gap-2 cursor-grabbing">
        <GripVertical className="w-3.5 h-3.5" />
        <span>+ {label}</span>
      </div>
    )
  }

  if (type === 'new-section') {
    return (
      <div className="bg-wf-blue text-white text-xs font-medium px-3 py-2 rounded-lg shadow-xl opacity-90 flex items-center gap-2 cursor-grabbing">
        <GripVertical className="w-3.5 h-3.5" />
        <span>+ {label}</span>
      </div>
    )
  }

  if (type === 'new-element') {
    return (
      <div className="bg-emerald-500 text-white text-xs font-medium px-3 py-2 rounded-lg shadow-xl opacity-90 flex items-center gap-2 cursor-grabbing">
        <GripVertical className="w-3.5 h-3.5" />
        <span>+ {label}</span>
      </div>
    )
  }

  if (type === 'element') {
    return (
      <div className="bg-zinc-700 border border-zinc-500 text-zinc-200 text-xs font-medium px-3 py-2 rounded-lg shadow-xl opacity-90 flex items-center gap-2 cursor-grabbing">
        <GripVertical className="w-3.5 h-3.5" />
        <span>{label}</span>
      </div>
    )
  }

  return (
    <div className="bg-zinc-800 border border-zinc-600 text-zinc-200 text-xs font-medium px-3 py-2 rounded-lg shadow-xl opacity-90 flex items-center gap-2 cursor-grabbing">
      <GripVertical className="w-3.5 h-3.5" />
      <span>{label}</span>
    </div>
  )
}
