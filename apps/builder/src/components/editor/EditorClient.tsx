'use client'
import { useEffect } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { useAutoSave } from '@/hooks/useAutoSave'
import { useEditorKeyboardShortcuts } from '@/hooks/useEditorKeyboardShortcuts'
import { EditorHeader } from './EditorHeader'
import { Sidebar } from './Sidebar'
import { Canvas } from './Canvas'
import { PropertiesPanel } from './PropertiesPanel'
import { EditorDndContext } from './DndContext'
import { BrandStyleInjector } from './BrandStyleInjector'
import { ClassStyleInjector } from './ClassStyleInjector'
import { QuickFind } from './QuickFind'
import { PreviewOverlay } from './PreviewOverlay'
import { AnimationTimelinePanel } from './timeline/AnimationTimelinePanel'
import type { SiteConfig } from '@/types/site'

interface SiteData {
  id: string
  name: string
  config: unknown
  status: string
}

interface EditorClientProps {
  site: SiteData
}

export function EditorClient({ site }: EditorClientProps) {
  const { setSiteConfig, siteConfig, undo, redo, canUndo, canRedo, previewMode } = useEditorStore()
  useAutoSave()
  useEditorKeyboardShortcuts()

  useEffect(() => {
    setSiteConfig(site.config as SiteConfig)
  }, [site.id]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        if (canUndo) undo()
      }
      if ((e.metaKey || e.ctrlKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault()
        if (canRedo) redo()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [undo, redo, canUndo, canRedo])

  if (!siteConfig) {
    return (
      <div className="h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-wf-blue border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="h-screen bg-zinc-950 flex flex-col overflow-hidden">
      <EditorHeader siteName={site.name} siteId={site.id} />
      <BrandStyleInjector />
      <ClassStyleInjector />
      <EditorDndContext>
        <div className="flex flex-1 overflow-hidden">
          {!previewMode && <Sidebar />}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <Canvas />
            {!previewMode && <AnimationTimelinePanel />}
          </div>
          {!previewMode && <PropertiesPanel />}
        </div>
      </EditorDndContext>
      <PreviewOverlay />
      <QuickFind />
    </div>
  )
}
