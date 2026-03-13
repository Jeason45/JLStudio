'use client'
import { useEditorStore } from '@/store/editorStore'
import { Play, Pause, Square, SkipBack, Plus, ZoomIn, ZoomOut } from 'lucide-react'
import { useState } from 'react'

interface TimelineToolbarProps {
  isPlaying: boolean
  onPlay: () => void
  onPause: () => void
  onStop: () => void
  onRestart: () => void
  zoom: number
  onZoomChange: (zoom: number) => void
  currentTime: number
  totalDuration: number
  sectionId: string
  timelineId: string
}

export function TimelineToolbar({
  isPlaying,
  onPlay,
  onPause,
  onStop,
  onRestart,
  zoom,
  onZoomChange,
  currentTime,
  totalDuration,
  sectionId,
  timelineId,
}: TimelineToolbarProps) {
  const { addTimelineTrack } = useEditorStore()
  const [showAddTrack, setShowAddTrack] = useState(false)

  const formatTime = (ms: number) => {
    const s = Math.floor(ms / 1000)
    const remainMs = Math.floor(ms % 1000)
    return `${s}.${String(remainMs).padStart(3, '0')}s`
  }

  const handleAddTrack = () => {
    const track = {
      id: `track-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      elementRef: '',
      label: 'Nouvelle piste',
      locked: false,
      collapsed: false,
      actions: [],
    }
    addTimelineTrack(sectionId, timelineId, track)
    setShowAddTrack(false)
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border-b border-zinc-700">
      {/* Transport */}
      <div className="flex items-center gap-1">
        <button onClick={onRestart} className="p-1 text-zinc-400 hover:text-white transition-colors">
          <SkipBack className="w-3.5 h-3.5" />
        </button>
        {isPlaying ? (
          <button onClick={onPause} className="p-1 text-wf-blue hover:text-blue-300 transition-colors">
            <Pause className="w-4 h-4" />
          </button>
        ) : (
          <button onClick={onPlay} className="p-1 text-wf-blue hover:text-blue-300 transition-colors">
            <Play className="w-4 h-4" />
          </button>
        )}
        <button onClick={onStop} className="p-1 text-zinc-400 hover:text-white transition-colors">
          <Square className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Time display */}
      <div className="text-[10px] text-zinc-400 font-mono min-w-[100px]">
        {formatTime(currentTime)} / {formatTime(totalDuration)}
      </div>

      <div className="flex-1" />

      {/* Add track */}
      <button
        onClick={handleAddTrack}
        className="flex items-center gap-1 px-2 py-0.5 text-[10px] text-wf-blue hover:text-blue-300 hover:bg-wf-blue/10 rounded transition-colors"
      >
        <Plus className="w-3 h-3" /> Piste
      </button>

      {/* Zoom */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onZoomChange(Math.max(0.5, zoom - 0.25))}
          className="p-0.5 text-zinc-400 hover:text-white transition-colors"
        >
          <ZoomOut className="w-3 h-3" />
        </button>
        <span className="text-[9px] text-zinc-500 min-w-[28px] text-center">{Math.round(zoom * 100)}%</span>
        <button
          onClick={() => onZoomChange(Math.min(4, zoom + 0.25))}
          className="p-0.5 text-zinc-400 hover:text-white transition-colors"
        >
          <ZoomIn className="w-3 h-3" />
        </button>
      </div>
    </div>
  )
}
