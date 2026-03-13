'use client'
import { Play, Square, RotateCcw } from 'lucide-react'
import { useEditorStore } from '@/store/editorStore'
import { animationRegistry } from '@/lib/animationPlayback'

export function PreviewOverlay() {
  const { previewMode, setPreviewMode } = useEditorStore()

  if (!previewMode) return null

  const handleStop = () => {
    animationRegistry.pauseAll()
    setPreviewMode(false)
  }

  const handleRestart = () => {
    // Restart all registered animations
    for (const anim of animationRegistry.getAll()) {
      if (anim.animation) {
        anim.animation.currentTime = 0
        anim.animation.play()
      }
    }
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-2 px-4 py-2 bg-zinc-900/95 border border-zinc-700 rounded-full shadow-2xl backdrop-blur-sm">
      <div className="flex items-center gap-1.5 pr-3 border-r border-zinc-700">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs text-white font-medium">Preview</span>
      </div>

      <button
        onClick={handleRestart}
        className="p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-800 transition-colors"
        title="Rejouer"
      >
        <RotateCcw className="w-4 h-4" />
      </button>

      <button
        onClick={handleStop}
        className="flex items-center gap-1.5 px-3 py-1 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-md transition-colors"
      >
        <Square className="w-3 h-3" />
        <span className="text-xs">Arreter</span>
      </button>
    </div>
  )
}
