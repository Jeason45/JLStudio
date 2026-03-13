'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useEditorStore } from '@/store/editorStore'
import { Label } from '@/components/ui/label'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { isVarRef, extractVarName } from '@/lib/variableResolver'
import { VarPicker } from './VarPicker'
import { ColorPickerPopover } from './ColorPickerPopover'
import type { SectionStyle } from '@/types/site'

function normalizeToHex(value: string): string {
  if (!value) return ''
  if (value.startsWith('#')) return value
  try {
    const ctx = document.createElement('canvas').getContext('2d')
    if (!ctx) return value
    ctx.fillStyle = value
    return ctx.fillStyle
  } catch { return value }
}

const CHECKERBOARD = 'repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%)'

interface FieldColorProps {
  sectionId?: string
  label: string
  stylePath?: keyof SectionStyle
  className?: string
  value?: string
  onChange?: (value: string) => void
}

export function FieldColor({ sectionId, label, stylePath, className, value: controlledValue, onChange }: FieldColorProps) {
  const { siteConfig, updateSection } = useEditorStore()
  const isControlled = controlledValue !== undefined || onChange !== undefined
  const [pickerOpen, setPickerOpen] = useState(false)
  const [pickerPos, setPickerPos] = useState<{ top: number; left: number; width: number }>({ top: 0, left: 0, width: 0 })
  const triggerRef = useRef<HTMLButtonElement>(null)
  const pickerRef = useRef<HTMLDivElement>(null)

  const section = !isControlled ? siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId) : undefined
  const value = isControlled ? (controlledValue ?? '') : ((section?.style[stylePath!] as string) ?? '')

  const isVar = isVarRef(value)
  const varName = isVar ? extractVarName(value) : null

  const handleChange = (newValue: string) => {
    if (isControlled) {
      onChange?.(newValue)
      return
    }
    if (!section) return
    updateSection(sectionId!, { style: { ...section.style, [stylePath!]: newValue } })
  }

  const handleReset = () => {
    if (isControlled) {
      onChange?.('')
      return
    }
    if (!section) return
    const newStyle = { ...section.style }
    delete (newStyle as Record<string, unknown>)[stylePath!]
    updateSection(sectionId!, { style: newStyle })
  }

  const PICKER_HEIGHT = 280 // approximate height of the color picker

  const openPicker = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      const openAbove = spaceBelow < PICKER_HEIGHT && rect.top > PICKER_HEIGHT
      setPickerPos({
        top: openAbove ? rect.top - PICKER_HEIGHT - 4 : rect.bottom + 4,
        left: rect.left,
        width: rect.width,
      })
    }
    setPickerOpen(true)
  }, [])

  const togglePicker = useCallback(() => {
    if (pickerOpen) {
      setPickerOpen(false)
    } else {
      openPicker()
    }
  }, [pickerOpen, openPicker])

  // Close picker on outside click
  useEffect(() => {
    if (!pickerOpen) return
    const handler = (e: MouseEvent) => {
      const target = e.target as Node
      if (triggerRef.current?.contains(target)) return
      if (pickerRef.current?.contains(target)) return
      setPickerOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [pickerOpen])

  const displayValue = normalizeToHex(isVar ? '' : value)

  const pickerPortal = pickerOpen && !isVar && typeof document !== 'undefined' && createPortal(
    <>
      {/* Backdrop — blocks scroll & interactions, click to close */}
      <div className="fixed inset-0 z-[99]" onMouseDown={() => setPickerOpen(false)} />
      <div
        ref={pickerRef}
        className="fixed z-[100]"
        style={{ top: pickerPos.top, left: pickerPos.left, width: pickerPos.width }}
      >
        <ColorPickerPopover
          color={displayValue || '#000000'}
          onChange={handleChange}
        />
      </div>
    </>,
    document.body
  )

  // Inline compact mode (for use inside WfRow)
  if (!label) {
    return (
      <div className={cn('min-w-0', className)}>
        {isVar ? (
          <div className="flex items-center gap-1.5 min-w-0 h-6">
            <span className="flex-1 text-[11px] text-purple-300 truncate min-w-0">--{varName}</span>
          </div>
        ) : (
          <button
            ref={triggerRef}
            onClick={togglePicker}
            className="w-full h-6 flex items-center gap-1.5 bg-[#2a2a2a] border border-[#444] rounded px-1.5 cursor-pointer hover:border-[#555] transition-colors min-w-0"
          >
            <span
              className="w-4 h-4 rounded-sm shrink-0 border border-[#555]"
              style={displayValue
                ? { backgroundColor: displayValue }
                : { backgroundImage: CHECKERBOARD, backgroundSize: '6px 6px' }
              }
            />
            <span className="flex-1 min-w-0 text-[11px] text-left truncate" style={{ color: displayValue ? '#e0e0e0' : '#777' }}>
              {displayValue || 'transparent'}
            </span>
          </button>
        )}
        {pickerPortal}
      </div>
    )
  }

  return (
    <div className={cn('space-y-1.5', className)}>
      <Label className="text-xs text-zinc-400">{label}</Label>
      <div className="flex items-center gap-2">
        {isVar ? (
          <>
            <div className="w-8 h-8 rounded-md border border-purple-500/30 bg-purple-500/10 flex items-center justify-center">
              <span className="text-purple-400 text-[9px] font-bold">V</span>
            </div>
            <span className="flex-1 text-[11px] text-purple-300 truncate">--{varName}</span>
          </>
        ) : (
          <>
            <button
              ref={triggerRef}
              onClick={togglePicker}
              className="w-8 h-8 rounded-md border border-zinc-700 cursor-pointer shrink-0"
              style={displayValue
                ? { backgroundColor: displayValue }
                : { backgroundImage: CHECKERBOARD, backgroundSize: '8px 8px' }
              }
              title="Pick color"
            />
            <input
              type="text"
              value={displayValue || ''}
              onChange={e => handleChange(e.target.value)}
              placeholder="transparent"
              className="flex-1 h-8 bg-zinc-800 border border-zinc-700 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-600 uppercase"
            />
          </>
        )}
        <VarPicker
          types={['color']}
          onSelect={handleChange}
          onClear={handleReset}
          hasVarValue={isVar}
        />
        {value && !isVar && (
          <button onClick={handleReset} className="p-1 text-zinc-500 hover:text-white transition-colors" title="Reinitialiser">
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      {pickerPortal}
    </div>
  )
}
