'use client'
import { useEditorStore } from '@/store/editorStore'
import { Puzzle, X } from 'lucide-react'

export function ComponentEditorBanner() {
  const { editingComponentId, siteConfig, exitComponentEditor } = useEditorStore()

  if (!editingComponentId) return null

  const comp = siteConfig?.components?.find(c => c.id === editingComponentId)
  if (!comp) return null

  return (
    <div className="h-9 flex items-center justify-between px-3 bg-emerald-600 text-white shrink-0 z-30">
      <div className="flex items-center gap-2">
        <Puzzle className="w-4 h-4" />
        <span className="text-xs font-medium">Editing: {comp.name}</span>
      </div>
      <button
        onClick={exitComponentEditor}
        className="flex items-center gap-1.5 px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-xs font-medium transition-colors"
      >
        <X className="w-3 h-3" />
        Done
      </button>
    </div>
  )
}
