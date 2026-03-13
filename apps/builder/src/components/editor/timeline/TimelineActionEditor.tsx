'use client'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { EASING_GROUPS, getEasingLabel } from '@/data/easingPresets'
import type { TimelineAction, EasingPresetName } from '@/types/interactions'
import { X } from 'lucide-react'

interface TimelineActionEditorProps {
  action: TimelineAction
  onUpdate: (updates: Partial<TimelineAction>) => void
  onClose: () => void
  onDelete: () => void
}

export function TimelineActionEditor({ action, onUpdate, onClose, onDelete }: TimelineActionEditorProps) {
  return (
    <div className="absolute z-50 right-0 top-0 w-56 bg-zinc-800 border border-zinc-600 rounded-lg shadow-xl p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-white">Action</span>
        <button onClick={onClose} className="p-0.5 text-zinc-500 hover:text-white">
          <X className="w-3 h-3" />
        </button>
      </div>

      {/* Type */}
      <div className="space-y-1">
        <Label className="text-[10px] text-zinc-500">Type</Label>
        <select
          value={action.type}
          onChange={e => onUpdate({ type: e.target.value as TimelineAction['type'] })}
          className="w-full h-7 bg-zinc-900 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
        >
          <option value="tween">Tween</option>
          <option value="set">Set</option>
          <option value="label">Label</option>
          <option value="call">Call</option>
        </select>
      </div>

      {/* Tween mode */}
      {action.type === 'tween' && (
        <div className="space-y-1">
          <Label className="text-[10px] text-zinc-500">Mode</Label>
          <select
            value={action.tweenMode ?? 'to'}
            onChange={e => onUpdate({ tweenMode: e.target.value as 'to' | 'from' | 'fromTo' })}
            className="w-full h-7 bg-zinc-900 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
          >
            <option value="to">To</option>
            <option value="from">From</option>
            <option value="fromTo">From-To</option>
          </select>
        </div>
      )}

      {/* Start & Duration */}
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <Label className="text-[10px] text-zinc-500">Debut (ms)</Label>
          <Input
            type="number"
            value={action.startTime}
            onChange={e => onUpdate({ startTime: Number(e.target.value) })}
            className="bg-zinc-900 border-zinc-600 text-white text-xs h-7 focus-visible:ring-wf-blue"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-[10px] text-zinc-500">Duree (ms)</Label>
          <Input
            type="number"
            value={action.duration}
            onChange={e => onUpdate({ duration: Number(e.target.value) })}
            className="bg-zinc-900 border-zinc-600 text-white text-xs h-7 focus-visible:ring-wf-blue"
          />
        </div>
      </div>

      {/* Label for label type */}
      {action.type === 'label' && (
        <div className="space-y-1">
          <Label className="text-[10px] text-zinc-500">Nom du label</Label>
          <Input
            value={action.label ?? ''}
            onChange={e => onUpdate({ label: e.target.value })}
            className="bg-zinc-900 border-zinc-600 text-white text-xs h-7 focus-visible:ring-wf-blue"
          />
        </div>
      )}

      {/* Easing */}
      {(action.type === 'tween' || action.type === 'set') && (
        <div className="space-y-1">
          <Label className="text-[10px] text-zinc-500">Easing</Label>
          <select
            value={Array.isArray(action.easing) ? 'custom' : (action.easing ?? 'ease')}
            onChange={e => onUpdate({ easing: e.target.value as EasingPresetName })}
            className="w-full h-7 bg-zinc-900 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
          >
            {EASING_GROUPS.map(group => (
              <optgroup key={group.label} label={group.label}>
                {group.presets.map(p => (
                  <option key={p} value={p}>{getEasingLabel(p)}</option>
                ))}
              </optgroup>
            ))}
          </select>
          {Array.isArray(action.easing) && (
            <Input
              value={action.easing.join(', ')}
              onChange={e => {
                const parts = e.target.value.split(',').map(s => parseFloat(s.trim()))
                if (parts.length === 4 && parts.every(n => !isNaN(n))) {
                  onUpdate({ easing: parts as [number, number, number, number] })
                }
              }}
              placeholder="x1, y1, x2, y2"
              className="bg-zinc-900 border-zinc-600 text-white text-xs h-7 font-mono focus-visible:ring-wf-blue"
            />
          )}
        </div>
      )}

      {/* Relative offset */}
      <div className="space-y-1">
        <Label className="text-[10px] text-zinc-500">Offset relatif</Label>
        <Input
          value={action.relativeOffset ?? ''}
          onChange={e => onUpdate({ relativeOffset: e.target.value || undefined })}
          placeholder="myLabel+=200"
          className="bg-zinc-900 border-zinc-600 text-white text-xs h-7 placeholder:text-zinc-600 focus-visible:ring-wf-blue"
        />
      </div>

      {/* Delete */}
      <button
        onClick={onDelete}
        className="w-full text-center py-1 text-[10px] text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
      >
        Supprimer l&apos;action
      </button>
    </div>
  )
}
