'use client'
import { useState, useEffect, useRef } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { Settings2, MousePointer, Zap, Image } from 'lucide-react'
import { StylePanel } from './panels/StylePanel'
import { ElementStyleTab } from './panels/ElementStyleTab'
import { ElementSettingsTab } from './panels/ElementSettingsTab'
import { SectionSettingsTab } from './panels/SectionSettingsTab'
import { InteractionsPanel } from './panels/InteractionsPanel'
import { SplitTextPanel } from './panels/SplitTextPanel'
import { DraggablePanel } from './panels/DraggablePanel'
import { AnimationLibraryPanel } from './panels/AnimationLibraryPanel'
import { ScrollTriggerPanel } from './panels/ScrollTriggerPanel'
import { CSSPreviewPanel } from './panels/CSSPreviewPanel'
import { parseElementId } from '@/lib/elementHelpers'
import { cn } from '@/lib/utils'
import type { ScrollTriggerConfig } from '@/types/interactions'

type Tab = 'style' | 'settings' | 'interactions' | 'css'

const TABS: { key: Tab; label: string }[] = [
  { key: 'style', label: 'Style' },
  { key: 'settings', label: 'Settings' },
  { key: 'interactions', label: 'Interactions' },
  { key: 'css', label: 'CSS' },
]

export function PropertiesPanel() {
  const { selectedSectionId, selectedElementPath, siteConfig } = useEditorStore()
  const [activeTab, setActiveTab] = useState<Tab>('style')
  const prevSelectionRef = useRef<string | null>(null)

  const selectedSection = siteConfig?.pages
    .flatMap(p => p.sections)
    .find(s => s.id === selectedSectionId)

  const isElementMode = !!selectedElementPath

  // Only reset tab to style when switching from NO selection to a selection
  useEffect(() => {
    const currentSelection = selectedElementPath || selectedSectionId || null
    if (prevSelectionRef.current === null && currentSelection !== null) {
      setActiveTab('style')
    }
    prevSelectionRef.current = currentSelection
  }, [selectedSectionId, selectedElementPath])

  // Nothing selected — Webflow-style empty state
  if (!selectedSection) {
    return (
      <aside className="w-[250px] bg-[#1e1e1e] border-l border-[#2a2a2a] flex flex-col shrink-0 overflow-hidden dark-scroll-zone">
        {/* Header with label */}
        <div className="border-b border-zinc-700/50 shrink-0">
          <div className="h-10 flex items-center px-3 gap-2">
            <div className="w-4 h-4 border border-zinc-500 rounded-sm" />
            <span className="text-[13px] font-medium text-zinc-300">None Selected</span>
          </div>

          {/* Tabs — still visible but muted */}
          <div className="flex">
            {TABS.map(tab => (
              <button
                key={tab.key}
                className="flex-1 py-2 text-xs font-medium text-zinc-500 border-b-2 border-transparent cursor-default"
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Style selector (like Webflow) */}
        <div className="px-3 py-2.5 border-b border-zinc-700/50">
          <label className="text-[11px] text-zinc-400 mb-1 block">Style selector</label>
          <div className="h-7 bg-zinc-700/50 rounded px-2 flex items-center">
            <span className="text-xs text-zinc-400">None</span>
          </div>
        </div>

        {/* Empty state cursor */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
          <MousePointer className="w-12 h-12 text-zinc-600 mb-3" />
          <p className="text-zinc-400 text-[13px] font-medium mb-1">Make a selection</p>
          <p className="text-zinc-500 text-xs">
            Select an element on the canvas to activate this panel
          </p>
        </div>
      </aside>
    )
  }

  const headerIcon = isElementMode
    ? <MousePointer className="w-3.5 h-3.5 text-zinc-400" />
    : <Image className="w-3.5 h-3.5 text-zinc-400" />
  const headerLabel = isElementMode
    ? 'Element'
    : selectedSection.type.charAt(0).toUpperCase() + selectedSection.type.slice(1)

  return (
    <aside className="w-[250px] bg-[#1e1e1e] border-l border-[#2a2a2a] flex flex-col shrink-0 overflow-hidden dark-scroll-zone">
      {/* Header */}
      <div className="border-b border-zinc-700/50 shrink-0">
        <div className="h-10 flex items-center px-3 gap-2">
          {headerIcon}
          <span className="text-[12px] font-medium text-zinc-200 truncate flex-1">
            {headerLabel}
          </span>
        </div>

        {/* Tabs — Webflow style */}
        <div className="flex">
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                'flex-1 py-2 text-xs font-medium transition-colors border-b-2',
                activeTab === tab.key
                  ? 'text-white border-wf-blue'
                  : 'text-zinc-400 border-transparent hover:text-zinc-200'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content — RADICAL overflow fix: hard 300px constraint */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ maxWidth: '250px' }}>
        {/* ── Style tab ── */}
        {activeTab === 'style' && (
          <div style={{ maxWidth: '250px', overflow: 'hidden' }}>
            {isElementMode ? (
              <ElementStyleTab />
            ) : (
              <StylePanel sectionId={selectedSection.id} />
            )}
          </div>
        )}

        {/* ── Settings tab ── */}
        {activeTab === 'settings' && (
          <div style={{ maxWidth: '250px', overflow: 'hidden' }}>
            {isElementMode ? (
              <ElementSettingsTab />
            ) : (
              <SectionSettingsTab sectionId={selectedSection.id} />
            )}
          </div>
        )}

        {/* ── Interactions tab ── */}
        {activeTab === 'interactions' && (
          <div style={{ maxWidth: '250px', overflow: 'hidden' }}>
            {isElementMode ? (
              <>
                <InteractionsPanel />
                <SplitTextPanel />
                <DraggablePanel />
                <AnimationLibraryPanel />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-32 text-center px-4">
                <Zap className="w-5 h-5 text-zinc-700 mb-2" />
                <p className="text-zinc-600 text-xs">
                  Selectionnez un element pour ajouter des interactions
                </p>
              </div>
            )}
          </div>
        )}

        {/* ── CSS tab ── */}
        {activeTab === 'css' && (
          <div style={{ maxWidth: '250px', overflow: 'hidden' }}>
            {isElementMode ? (
              <CSSPreviewPanel />
            ) : (
              <div className="flex flex-col items-center justify-center h-32 text-center px-4">
                <Settings2 className="w-5 h-5 text-zinc-700 mb-2" />
                <p className="text-zinc-600 text-xs">
                  Selectionnez un element pour voir le CSS
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  )
}
