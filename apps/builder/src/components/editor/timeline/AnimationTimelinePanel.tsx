'use client'
import { useState, useRef, useCallback, useEffect } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { useShallow } from 'zustand/react/shallow'
import { selectSiteConfig, selectSelectedSectionId } from '@/store/selectors'
import { TimelineToolbar } from './TimelineToolbar'
import { TimelineTrackRow } from './TimelineTrackRow'
import { TimelineScrubber } from './TimelineScrubber'
import { TimelineActionEditor } from './TimelineActionEditor'
import { TimelinePlayer } from '@/lib/timelineEngine'
import { ChevronUp, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { TimelineConfig, TimelineAction } from '@/types/interactions'

export function AnimationTimelinePanel() {
  const siteConfig = useEditorStore(selectSiteConfig)
  const selectedSectionId = useEditorStore(selectSelectedSectionId)
  const {
    timelineOpen, setTimelineOpen,
    timelinePanelHeight, setTimelinePanelHeight,
    activeTimelineId, setActiveTimelineId,
    scrubberTime, setScrubberTime,
    updateTimelineAction, removeTimelineAction, moveTimelineAction,
    removeTimelineTrack, createTimeline, updateTimeline,
  } = useEditorStore(useShallow(s => ({
    timelineOpen: s.timelineOpen,
    setTimelineOpen: s.setTimelineOpen,
    timelinePanelHeight: s.timelinePanelHeight,
    setTimelinePanelHeight: s.setTimelinePanelHeight,
    activeTimelineId: s.activeTimelineId,
    setActiveTimelineId: s.setActiveTimelineId,
    scrubberTime: s.scrubberTime,
    setScrubberTime: s.setScrubberTime,
    updateTimelineAction: s.updateTimelineAction,
    removeTimelineAction: s.removeTimelineAction,
    moveTimelineAction: s.moveTimelineAction,
    removeTimelineTrack: s.removeTimelineTrack,
    createTimeline: s.createTimeline,
    updateTimeline: s.updateTimeline,
  })))

  const [zoom, setZoom] = useState(1)
  const [selectedActionId, setSelectedActionId] = useState<string | null>(null)
  const [editingAction, setEditingAction] = useState<{ trackId: string; action: TimelineAction } | null>(null)
  const [isResizing, setIsResizing] = useState(false)
  const playerRef = useRef<TimelinePlayer | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // Find current section's timelines
  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === selectedSectionId)
  const timelines = (section?.content.__timelines ?? []) as TimelineConfig[]
  const activeTimeline = timelines.find(t => t.id === activeTimelineId) ?? timelines[0]

  // Cleanup player on unmount or timeline change
  useEffect(() => {
    return () => { playerRef.current?.destroy() }
  }, [activeTimeline?.id])

  const handlePlay = useCallback(() => {
    if (!activeTimeline) return
    if (!playerRef.current) {
      playerRef.current = new TimelinePlayer(activeTimeline, setScrubberTime)
      playerRef.current.resolve()
    }
    playerRef.current.play()
    setIsPlaying(true)
  }, [activeTimeline, setScrubberTime])

  const handlePause = useCallback(() => {
    playerRef.current?.pause()
    setIsPlaying(false)
  }, [])

  const handleStop = useCallback(() => {
    playerRef.current?.stop()
    setIsPlaying(false)
    setScrubberTime(0)
  }, [setScrubberTime])

  const handleRestart = useCallback(() => {
    playerRef.current?.stop()
    setScrubberTime(0)
    handlePlay()
  }, [handlePlay, setScrubberTime])

  const handleSeek = useCallback((time: number) => {
    setScrubberTime(time)
    playerRef.current?.seekTo(time)
  }, [setScrubberTime])

  const handleCreateTimeline = () => {
    if (!selectedSectionId) return
    const tl: TimelineConfig = {
      id: `tl-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: 'Timeline',
      trigger: { type: 'page-load', delay: 0 },
      tracks: [],
      totalDuration: 3000,
      playbackRate: 1,
      repeat: 0,
      yoyo: false,
      autoplay: true,
      paused: false,
    }
    createTimeline(selectedSectionId, tl)
    setActiveTimelineId(tl.id)
    setTimelineOpen(true)
  }

  // Resize handle
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
    const startY = e.clientY
    const startHeight = timelinePanelHeight

    const onMove = (me: MouseEvent) => {
      const dy = startY - me.clientY
      setTimelinePanelHeight(Math.max(150, Math.min(500, startHeight + dy)))
    }
    const onUp = () => {
      setIsResizing(false)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  // Hide completely when closed and no timelines exist
  if (!timelineOpen && timelines.length === 0) {
    return null
  }

  if (!timelineOpen) {
    return (
      <div className="flex items-center justify-center gap-2 py-1 bg-zinc-900 border-t border-zinc-700">
        <button
          onClick={() => setTimelineOpen(true)}
          className="flex items-center gap-1 px-3 py-0.5 text-[10px] text-zinc-400 hover:text-white transition-colors"
        >
          <ChevronUp className="w-3 h-3" /> Timeline
        </button>
      </div>
    )
  }

  return (
    <div
      className={cn('bg-zinc-850 border-t border-zinc-700 flex flex-col', isResizing && 'select-none')}
      style={{ height: timelinePanelHeight }}
    >
      {/* Resize handle */}
      <div
        onMouseDown={handleResizeStart}
        className="h-1 bg-zinc-700 hover:bg-wf-blue cursor-row-resize shrink-0 transition-colors"
      />

      {!activeTimeline ? (
        <div className="flex-1 flex items-center justify-center">
          <button
            onClick={handleCreateTimeline}
            className="flex items-center gap-2 px-4 py-2 text-xs text-wf-blue hover:text-blue-300 hover:bg-wf-blue/10 rounded-lg border border-dashed border-zinc-700 transition-colors"
          >
            <Plus className="w-4 h-4" /> Creer une timeline
          </button>
        </div>
      ) : (
        <>
          {/* Timeline selector tabs */}
          {timelines.length > 1 && (
            <div className="flex items-center gap-1 px-2 py-1 bg-zinc-900 border-b border-zinc-800 shrink-0">
              {timelines.map(tl => (
                <button
                  key={tl.id}
                  onClick={() => setActiveTimelineId(tl.id)}
                  className={cn(
                    'px-2 py-0.5 text-[10px] rounded transition-colors',
                    tl.id === activeTimeline.id ? 'text-white bg-wf-blue/20' : 'text-zinc-500 hover:text-white'
                  )}
                >
                  {tl.name}
                </button>
              ))}
            </div>
          )}

          {/* Toolbar */}
          <TimelineToolbar
            isPlaying={isPlaying}
            onPlay={handlePlay}
            onPause={handlePause}
            onStop={handleStop}
            onRestart={handleRestart}
            zoom={zoom}
            onZoomChange={setZoom}
            currentTime={scrubberTime}
            totalDuration={activeTimeline.totalDuration}
            sectionId={selectedSectionId ?? ''}
            timelineId={activeTimeline.id}
          />

          {/* Scrubber */}
          <div className="overflow-x-auto shrink-0">
            <TimelineScrubber
              currentTime={scrubberTime}
              totalDuration={activeTimeline.totalDuration}
              zoom={zoom}
              onSeek={handleSeek}
            />
          </div>

          {/* Tracks */}
          <div className="flex-1 overflow-auto relative">
            {activeTimeline.tracks.length === 0 ? (
              <div className="flex items-center justify-center h-full text-[10px] text-zinc-500">
                Aucune piste. Ajoutez-en via le bouton dans la toolbar.
              </div>
            ) : (
              activeTimeline.tracks.map(track => (
                <TimelineTrackRow
                  key={track.id}
                  track={track}
                  zoom={zoom}
                  totalDuration={activeTimeline.totalDuration}
                  selectedActionId={selectedActionId}
                  onSelectAction={(actionId) => {
                    setSelectedActionId(actionId)
                    const action = track.actions.find(a => a.id === actionId)
                    if (action) setEditingAction({ trackId: track.id, action })
                  }}
                  onMoveAction={(actionId, newTime) => {
                    if (!selectedSectionId) return
                    updateTimelineAction(selectedSectionId, activeTimeline.id, track.id, actionId, { startTime: Math.round(newTime) })
                  }}
                  onResizeAction={(actionId, newDuration) => {
                    if (!selectedSectionId) return
                    updateTimelineAction(selectedSectionId, activeTimeline.id, track.id, actionId, { duration: Math.round(newDuration) })
                  }}
                  onToggleLock={() => {
                    if (!selectedSectionId) return
                    updateTimeline(selectedSectionId, activeTimeline.id, {
                      tracks: activeTimeline.tracks.map(t =>
                        t.id === track.id ? { ...t, locked: !t.locked } : t
                      ),
                    })
                  }}
                  onToggleCollapse={() => {
                    if (!selectedSectionId) return
                    updateTimeline(selectedSectionId, activeTimeline.id, {
                      tracks: activeTimeline.tracks.map(t =>
                        t.id === track.id ? { ...t, collapsed: !t.collapsed } : t
                      ),
                    })
                  }}
                  onDelete={() => {
                    if (!selectedSectionId) return
                    removeTimelineTrack(selectedSectionId, activeTimeline.id, track.id)
                  }}
                  onUpdateLabel={(label) => {
                    if (!selectedSectionId) return
                    updateTimeline(selectedSectionId, activeTimeline.id, {
                      tracks: activeTimeline.tracks.map(t =>
                        t.id === track.id ? { ...t, label } : t
                      ),
                    })
                  }}
                />
              ))
            )}

            {/* Action editor popover */}
            {editingAction && (
              <TimelineActionEditor
                action={editingAction.action}
                onUpdate={(updates) => {
                  if (!selectedSectionId) return
                  updateTimelineAction(selectedSectionId, activeTimeline.id, editingAction.trackId, editingAction.action.id, updates)
                  setEditingAction({ ...editingAction, action: { ...editingAction.action, ...updates } })
                }}
                onClose={() => { setEditingAction(null); setSelectedActionId(null) }}
                onDelete={() => {
                  if (!selectedSectionId) return
                  removeTimelineAction(selectedSectionId, activeTimeline.id, editingAction.trackId, editingAction.action.id)
                  setEditingAction(null)
                  setSelectedActionId(null)
                }}
              />
            )}
          </div>
        </>
      )}
    </div>
  )
}
