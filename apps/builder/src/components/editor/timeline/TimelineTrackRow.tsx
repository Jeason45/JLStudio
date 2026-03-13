'use client'
import { useState } from 'react'
import { Lock, Unlock, ChevronDown, ChevronRight, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { TimelineTrack, TimelineAction } from '@/types/interactions'
import { TimelineActionBlock } from './TimelineActionBlock'

interface TimelineTrackRowProps {
  track: TimelineTrack
  zoom: number
  totalDuration: number
  selectedActionId: string | null
  onSelectAction: (actionId: string) => void
  onMoveAction: (actionId: string, newStartTime: number) => void
  onResizeAction: (actionId: string, newDuration: number) => void
  onToggleLock: () => void
  onToggleCollapse: () => void
  onDelete: () => void
  onUpdateLabel: (label: string) => void
}

export function TimelineTrackRow({
  track,
  zoom,
  totalDuration,
  selectedActionId,
  onSelectAction,
  onMoveAction,
  onResizeAction,
  onToggleLock,
  onToggleCollapse,
  onDelete,
  onUpdateLabel,
}: TimelineTrackRowProps) {
  const [isEditingLabel, setIsEditingLabel] = useState(false)
  const pxPerMs = zoom * 0.1

  return (
    <div className={cn('flex border-b border-zinc-800', track.collapsed ? 'h-6' : 'h-8')}>
      {/* Track label (left sidebar) */}
      <div className="w-40 shrink-0 flex items-center gap-1 px-2 bg-zinc-900 border-r border-zinc-700">
        <button onClick={onToggleCollapse} className="p-0.5 text-zinc-500 hover:text-white transition-colors">
          {track.collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>

        {isEditingLabel ? (
          <input
            autoFocus
            className="flex-1 bg-transparent text-[10px] text-white outline-none border-b border-wf-blue"
            value={track.label}
            onChange={e => onUpdateLabel(e.target.value)}
            onBlur={() => setIsEditingLabel(false)}
            onKeyDown={e => e.key === 'Enter' && setIsEditingLabel(false)}
          />
        ) : (
          <span
            onDoubleClick={() => setIsEditingLabel(true)}
            className="flex-1 text-[10px] text-zinc-300 truncate cursor-default"
          >
            {track.label}
          </span>
        )}

        <button onClick={onToggleLock} className="p-0.5 text-zinc-500 hover:text-white transition-colors">
          {track.locked ? <Lock className="w-2.5 h-2.5" /> : <Unlock className="w-2.5 h-2.5" />}
        </button>
        <button onClick={onDelete} className="p-0.5 text-zinc-500 hover:text-red-400 transition-colors">
          <Trash2 className="w-2.5 h-2.5" />
        </button>
      </div>

      {/* Action blocks area */}
      <div
        className="relative flex-1 bg-zinc-850 overflow-hidden"
        style={{ minWidth: `${totalDuration * pxPerMs}px` }}
      >
        {!track.collapsed && track.actions.map(action => (
          <TimelineActionBlock
            key={action.id}
            action={action}
            zoom={zoom}
            totalDuration={totalDuration}
            selected={selectedActionId === action.id}
            onSelect={() => onSelectAction(action.id)}
            onMove={(newTime) => onMoveAction(action.id, newTime)}
            onResize={(newDuration) => onResizeAction(action.id, newDuration)}
          />
        ))}
      </div>
    </div>
  )
}
