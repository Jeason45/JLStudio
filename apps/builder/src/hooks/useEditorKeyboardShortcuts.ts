'use client'
import { useEffect } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { SIDEBAR_TOGGLE_EVENT } from '@/components/editor/Sidebar'

function dispatchSidebarToggle(tab: string) {
  window.dispatchEvent(new CustomEvent(SIDEBAR_TOGGLE_EVENT, { detail: tab }))
}

export function useEditorKeyboardShortcuts() {
  const store = useEditorStore()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' || target.isContentEditable
      const isMod = e.metaKey || e.ctrlKey
      const isShift = e.shiftKey

      // Don't interfere with text editing (except mod shortcuts)
      if (isInput && !isMod) return

      // ─── Mod shortcuts (Cmd/Ctrl + ...) ───

      if (isMod) {
        // Cmd+E — Quick Find (handled by QuickFind component for toggle)
        if (e.key === 'e') return

        // Cmd+Shift+P — Preview mode
        if (isShift && (e.key === 'p' || e.key === 'P')) {
          e.preventDefault()
          const { previewMode, setPreviewMode } = useEditorStore.getState()
          setPreviewMode(!previewMode)
          return
        }

        // Cmd+D — Duplicate section
        if (e.key === 'd') {
          e.preventDefault()
          const { selectedSectionId, selectedPageId } = useEditorStore.getState()
          if (selectedSectionId && selectedPageId) {
            useEditorStore.getState().duplicateSection(selectedPageId, selectedSectionId)
          }
          return
        }

        // Cmd+Shift+C — Copy element style
        if (isShift && (e.key === 'c' || e.key === 'C')) {
          e.preventDefault()
          useEditorStore.getState().copyElementStyle()
          return
        }

        // Cmd+Shift+V — Paste element style
        if (isShift && (e.key === 'v' || e.key === 'V')) {
          e.preventDefault()
          useEditorStore.getState().pasteElementStyle()
          return
        }

        // Cmd+C — Copy
        if (e.key === 'c' && !isShift && !isInput) {
          e.preventDefault()
          useEditorStore.getState().copyElement()
          return
        }

        // Cmd+V — Paste
        if (e.key === 'v' && !isShift && !isInput) {
          e.preventDefault()
          useEditorStore.getState().pasteElement()
          return
        }

        // Cmd+Z / Cmd+Shift+Z — Undo/Redo (handled in EditorClient, skip here)
        return
      }

      // ─── Non-mod shortcuts (only when not in input) ───
      if (isInput) return

      // Escape — deselect
      if (e.key === 'Escape') {
        e.preventDefault()
        const { selectedElementPath, selectedSectionId, isInlineEditing } = useEditorStore.getState()
        if (isInlineEditing) {
          useEditorStore.getState().setInlineEditing(false)
        } else if (selectedElementPath) {
          useEditorStore.getState().selectElement(null)
        } else if (selectedSectionId) {
          useEditorStore.getState().selectSection(null)
        }
        return
      }

      // Delete / Backspace — delete selected
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault()
        useEditorStore.getState().deleteSelected()
        return
      }

      // ─── Left panel shortcuts ───
      if (e.key === 'a' || e.key === 'A') {
        if (isShift) {
          // Shift+A — Components panel
          e.preventDefault()
          dispatchSidebarToggle('components')
        } else {
          // A — Add panel
          e.preventDefault()
          dispatchSidebarToggle('add')
        }
        return
      }

      if (e.key === 'z' || e.key === 'Z') {
        e.preventDefault()
        dispatchSidebarToggle('navigator')
        return
      }

      if (e.key === 'p' || e.key === 'P') {
        e.preventDefault()
        dispatchSidebarToggle('pages')
        return
      }

      if (e.key === 'v' || e.key === 'V') {
        e.preventDefault()
        dispatchSidebarToggle('variables')
        return
      }

      if (e.key === 'g' || e.key === 'G') {
        e.preventDefault()
        dispatchSidebarToggle('styles')
        return
      }

      if (e.key === 'x' || e.key === 'X') {
        e.preventDefault()
        dispatchSidebarToggle('interactions')
        return
      }

      if (e.key === 'j' || e.key === 'J') {
        e.preventDefault()
        dispatchSidebarToggle('assets')
        return
      }

      if (e.key === 'l' || e.key === 'L') {
        e.preventDefault()
        dispatchSidebarToggle('libraries')
        return
      }

      if (e.key === 'e' || e.key === 'E') {
        e.preventDefault()
        dispatchSidebarToggle('apps')
        return
      }

      if (e.key === 'u' || e.key === 'U') {
        e.preventDefault()
        dispatchSidebarToggle('audits')
        return
      }

      // ─── Device breakpoints ───
      if (e.key === '1') {
        e.preventDefault()
        useEditorStore.getState().setActiveBreakpoint('base')
        return
      }
      if (e.key === '2') {
        e.preventDefault()
        useEditorStore.getState().setActiveBreakpoint('768')
        return
      }
      if (e.key === '3') {
        e.preventDefault()
        useEditorStore.getState().setActiveBreakpoint('480')
        return
      }

      // ─── Arrow navigation ───
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()
        useEditorStore.getState().navigateSection(e.key === 'ArrowUp' ? 'up' : 'down')
        return
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [store])
}
