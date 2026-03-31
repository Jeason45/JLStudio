import type { StateCreator } from 'zustand'
import type { EditorState, TimelineSlice } from '../types'
import type { TimelineConfig } from '@/types/interactions'

export const createTimelineSlice: StateCreator<EditorState, [['zustand/immer', never]], [], TimelineSlice> = (set, get) => ({
  timelineOpen: false,
  timelinePanelHeight: 250,
  activeTimelineId: null,
  scrubberTime: 0,

  setTimelineOpen: (open) => set((state) => { state.timelineOpen = open }),
  setTimelinePanelHeight: (height) => set((state) => { state.timelinePanelHeight = height }),
  setActiveTimelineId: (id) => set((state) => { state.activeTimelineId = id }),
  setScrubberTime: (time) => set((state) => { state.scrubberTime = time }),

  createTimeline: (sectionId, timeline) => {
    set((state) => {
      if (!state.siteConfig) return
      for (const page of state.siteConfig.pages) {
        const section = page.sections.find(s => s.id === sectionId)
        if (section) {
          if (!section.content.__timelines) section.content.__timelines = []
          ;(section.content.__timelines as TimelineConfig[]).push(timeline)
          state.isDirty = true
          break
        }
      }
    })
    get()._pushHistory()
  },

  deleteTimeline: (sectionId, timelineId) => {
    set((state) => {
      if (!state.siteConfig) return
      for (const page of state.siteConfig.pages) {
        const section = page.sections.find(s => s.id === sectionId)
        if (section && section.content.__timelines) {
          section.content.__timelines = (section.content.__timelines as TimelineConfig[]).filter(t => t.id !== timelineId)
          state.isDirty = true
          break
        }
      }
    })
    get()._pushHistory()
  },

  updateTimeline: (sectionId, timelineId, updates) => {
    set((state) => {
      if (!state.siteConfig) return
      for (const page of state.siteConfig.pages) {
        const section = page.sections.find(s => s.id === sectionId)
        if (section && section.content.__timelines) {
          const tl = (section.content.__timelines as TimelineConfig[]).find(t => t.id === timelineId)
          if (tl) Object.assign(tl, updates)
          state.isDirty = true
          break
        }
      }
    })
    get()._pushHistory()
  },

  addTimelineTrack: (sectionId, timelineId, track) => {
    set((state) => {
      if (!state.siteConfig) return
      for (const page of state.siteConfig.pages) {
        const section = page.sections.find(s => s.id === sectionId)
        if (section && section.content.__timelines) {
          const tl = (section.content.__timelines as TimelineConfig[]).find(t => t.id === timelineId)
          if (tl) tl.tracks.push(track)
          state.isDirty = true
          break
        }
      }
    })
    get()._pushHistory()
  },

  removeTimelineTrack: (sectionId, timelineId, trackId) => {
    set((state) => {
      if (!state.siteConfig) return
      for (const page of state.siteConfig.pages) {
        const section = page.sections.find(s => s.id === sectionId)
        if (section && section.content.__timelines) {
          const tl = (section.content.__timelines as TimelineConfig[]).find(t => t.id === timelineId)
          if (tl) tl.tracks = tl.tracks.filter(t => t.id !== trackId)
          state.isDirty = true
          break
        }
      }
    })
    get()._pushHistory()
  },

  addTimelineAction: (sectionId, timelineId, trackId, action) => {
    set((state) => {
      if (!state.siteConfig) return
      for (const page of state.siteConfig.pages) {
        const section = page.sections.find(s => s.id === sectionId)
        if (section && section.content.__timelines) {
          const tl = (section.content.__timelines as TimelineConfig[]).find(t => t.id === timelineId)
          const track = tl?.tracks.find(t => t.id === trackId)
          if (track) track.actions.push(action)
          state.isDirty = true
          break
        }
      }
    })
    get()._pushHistory()
  },

  updateTimelineAction: (sectionId, timelineId, trackId, actionId, updates) => {
    set((state) => {
      if (!state.siteConfig) return
      for (const page of state.siteConfig.pages) {
        const section = page.sections.find(s => s.id === sectionId)
        if (section && section.content.__timelines) {
          const tl = (section.content.__timelines as TimelineConfig[]).find(t => t.id === timelineId)
          const track = tl?.tracks.find(t => t.id === trackId)
          const action = track?.actions.find(a => a.id === actionId)
          if (action) Object.assign(action, updates)
          state.isDirty = true
          break
        }
      }
    })
    get()._pushHistory()
  },

  removeTimelineAction: (sectionId, timelineId, trackId, actionId) => {
    set((state) => {
      if (!state.siteConfig) return
      for (const page of state.siteConfig.pages) {
        const section = page.sections.find(s => s.id === sectionId)
        if (section && section.content.__timelines) {
          const tl = (section.content.__timelines as TimelineConfig[]).find(t => t.id === timelineId)
          const track = tl?.tracks.find(t => t.id === trackId)
          if (track) track.actions = track.actions.filter(a => a.id !== actionId)
          state.isDirty = true
          break
        }
      }
    })
    get()._pushHistory()
  },

  moveTimelineAction: (sectionId, timelineId, fromTrackId, toTrackId, actionId, newStartTime) => {
    set((state) => {
      if (!state.siteConfig) return
      for (const page of state.siteConfig.pages) {
        const section = page.sections.find(s => s.id === sectionId)
        if (section && section.content.__timelines) {
          const tl = (section.content.__timelines as TimelineConfig[]).find(t => t.id === timelineId)
          if (!tl) break
          const fromTrack = tl.tracks.find(t => t.id === fromTrackId)
          const toTrack = tl.tracks.find(t => t.id === toTrackId)
          if (!fromTrack || !toTrack) break
          const actionIdx = fromTrack.actions.findIndex(a => a.id === actionId)
          if (actionIdx === -1) break
          const [action] = fromTrack.actions.splice(actionIdx, 1)
          action.startTime = newStartTime
          toTrack.actions.push(action)
          state.isDirty = true
          break
        }
      }
    })
    get()._pushHistory()
  },
})
