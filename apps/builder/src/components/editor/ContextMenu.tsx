'use client'
import { useEffect, useRef } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { Copy, Clipboard, ClipboardPaste, CopyPlus, Trash2, BoxSelect } from 'lucide-react'

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.userAgent)
const mod = isMac ? '⌘' : 'Ctrl+'

interface ContextMenuProps {
  x: number
  y: number
  onClose: () => void
}

export function EditorContextMenu({ x, y, onClose }: ContextMenuProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { selectedElementPath, selectedSectionId, selectedPageId, clipboard, copyElement, pasteElement, copyElementStyle, pasteElementStyle, duplicateSection, deleteSelected } = useEditorStore()

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('mousedown', handleClick)
    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('mousedown', handleClick)
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  const items = [
    {
      label: 'Copier',
      shortcut: `${mod}C`,
      icon: Copy,
      action: () => { copyElement(); onClose() },
      disabled: !selectedElementPath && !selectedSectionId,
    },
    {
      label: 'Coller',
      shortcut: `${mod}V`,
      icon: Clipboard,
      action: () => { pasteElement(); onClose() },
      disabled: !clipboard,
    },
    {
      label: 'Coller le style',
      icon: ClipboardPaste,
      action: () => { pasteElementStyle(); onClose() },
      disabled: !clipboard?.styleData || !selectedElementPath,
    },
    { type: 'separator' as const },
    {
      label: 'Dupliquer',
      shortcut: `${mod}D`,
      icon: CopyPlus,
      action: () => {
        if (selectedSectionId && selectedPageId) duplicateSection(selectedPageId, selectedSectionId)
        onClose()
      },
      disabled: !selectedSectionId,
    },
    {
      label: 'Supprimer',
      shortcut: '⌫',
      icon: Trash2,
      action: () => { deleteSelected(); onClose() },
      disabled: !selectedElementPath && !selectedSectionId,
      danger: true,
    },
    { type: 'separator' as const },
    {
      label: 'Envelopper dans un div',
      icon: BoxSelect,
      action: () => { onClose() },
      disabled: true,
    },
  ]

  // Clamp position to viewport
  const menuW = 220
  const menuH = items.length * 34
  const left = Math.min(x, window.innerWidth - menuW - 8)
  const top = Math.min(y, window.innerHeight - menuH - 8)

  return (
    <div
      ref={ref}
      className="fixed z-[100] bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl py-1 min-w-[200px]"
      style={{ left, top }}
    >
      {items.map((item, i) => {
        if ('type' in item && item.type === 'separator') {
          return <div key={i} className="h-px bg-zinc-700 my-1" />
        }
        const it = item as typeof items[0] & { label: string; icon: typeof Copy; action: () => void; disabled?: boolean; danger?: boolean; shortcut?: string }
        const Icon = it.icon
        return (
          <button
            key={i}
            onClick={it.action}
            disabled={it.disabled}
            className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs transition-colors ${
              it.disabled
                ? 'text-zinc-600 cursor-not-allowed'
                : it.danger
                  ? 'text-red-400 hover:bg-red-500/10'
                  : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
            <span className="flex-1 text-left">{it.label}</span>
            {it.shortcut && <span className="text-zinc-600 text-[10px]">{it.shortcut}</span>}
          </button>
        )
      })}
    </div>
  )
}
