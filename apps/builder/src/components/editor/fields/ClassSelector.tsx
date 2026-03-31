'use client'
import { useState, useRef, useEffect } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { useShallow } from 'zustand/react/shallow'
import { useClassActions } from '@/store/hooks'
import { selectSiteConfig, selectSelectedElementPath, selectActiveState } from '@/store/selectors'
import { parseElementId } from '@/lib/elementHelpers'
import { X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ELEMENT_STATES, getStateById } from '@/types/states'

interface ClassSelectorProps {
  elementName?: string
  onClassSelect?: (classId: string | null) => void
  editingClassId?: string | null
}

export function ClassSelector({ elementName, onClassSelect, editingClassId }: ClassSelectorProps) {
  const selectedElementPath = useEditorStore(selectSelectedElementPath)
  const siteConfig = useEditorStore(selectSiteConfig)
  const activeState = useEditorStore(selectActiveState)
  const { addClass, assignClassToElement, removeClassFromElement, assignClassToCustomElement, removeClassFromCustomElement } = useClassActions()
  const setActiveState = useEditorStore(s => s.setActiveState)

  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const parsed = selectedElementPath ? parseElementId(selectedElementPath) : null
  const isCustom = parsed?.contentPath.startsWith('__el.') ?? false
  const customElementId = isCustom ? parsed!.contentPath.replace('__el.', '') : null

  // Get current element's class ids
  const section = parsed
    ? siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === parsed.sectionId)
    : null

  let currentClassIds: string[] = []
  if (section && parsed) {
    if (isCustom && customElementId) {
      const findEl = (elements: typeof section.elements, id: string): NonNullable<typeof section.elements>[number] | null => {
        if (!elements) return null
        for (const el of elements) {
          if (el.id === id) return el
          if (el.children) { const f = findEl(el.children, id); if (f) return f }
        }
        return null
      }
      const el = findEl(section.elements, customElementId)
      currentClassIds = el?.classes ?? []
    } else {
      const classes = section.content.__elementClasses as Record<string, string[]> | undefined
      currentClassIds = classes?.[parsed.contentPath] ?? []
    }
  }

  const allClasses = siteConfig?.classes ?? []
  const currentClasses = currentClassIds
    .map(id => allClasses.find(c => c.id === id))
    .filter(Boolean) as typeof allClasses

  // Filter for dropdown
  const filteredClasses = allClasses.filter(c =>
    !currentClassIds.includes(c.id) &&
    c.name.toLowerCase().includes(inputValue.toLowerCase())
  )

  const isNewName = inputValue.trim() && !allClasses.some(c => c.name === inputValue.trim())

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
        setIsEditing(false)
      }
    }
    if (showDropdown) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showDropdown])

  const handleAssign = (classId: string) => {
    if (!parsed) return
    if (isCustom && customElementId) {
      assignClassToCustomElement(parsed.sectionId, customElementId, classId)
    } else {
      assignClassToElement(parsed.sectionId, parsed.contentPath, classId)
    }
    setInputValue('')
    setShowDropdown(false)
    setIsEditing(false)
  }

  const handleRemove = (classId: string) => {
    if (!parsed) return
    if (isCustom && customElementId) {
      removeClassFromCustomElement(parsed.sectionId, customElementId, classId)
    } else {
      removeClassFromElement(parsed.sectionId, parsed.contentPath, classId)
    }
    // If we were editing this class, deselect
    if (editingClassId === classId) {
      onClassSelect?.(null)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault()
      if (isNewName) {
        // Create new class and assign
        const id = addClass(inputValue.trim())
        handleAssign(id)
      } else {
        // Assign existing
        const existing = allClasses.find(c => c.name === inputValue.trim())
        if (existing) handleAssign(existing.id)
      }
    }
    if (e.key === 'Escape') {
      setShowDropdown(false)
      setIsEditing(false)
      setInputValue('')
    }
  }

  const inheritingCount = currentClasses.length > 1 ? currentClasses.length : 0

  return (
    <div className="px-3 py-2 border-b border-zinc-700/50" ref={dropdownRef}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] text-zinc-500">Style selector</span>
        {inheritingCount > 0 && (
          <span className="text-[10px]">
            Inheriting <span className="text-orange-400">{inheritingCount} selectors</span>
          </span>
        )}
      </div>

      {/* Class pills */}
      {currentClasses.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-1.5">
          {currentClasses.map((cls, i) => (
            <button
              key={cls.id}
              onClick={() => {
                const newId = editingClassId === cls.id ? null : cls.id
                if (!newId) setActiveState(null)
                onClassSelect?.(newId)
              }}
              className={cn(
                'group flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium transition-colors',
                editingClassId === cls.id
                  ? 'bg-blue-500/30 text-blue-300 ring-1 ring-blue-500/50'
                  : i === 0
                    ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                    : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
              )}
            >
              {cls.name}
              <X
                className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => { e.stopPropagation(); handleRemove(cls.id) }}
              />
            </button>
          ))}
        </div>
      )}

      {/* Input area */}
      <div className="relative">
        <div
          className="flex items-center gap-1.5 h-8 bg-zinc-800 border border-zinc-700 rounded px-2 cursor-text"
          onClick={() => { setIsEditing(true); setShowDropdown(true); setTimeout(() => inputRef.current?.focus(), 0) }}
        >
          {isEditing ? (
            <input
              ref={inputRef}
              autoFocus
              value={inputValue}
              onChange={e => { setInputValue(e.target.value); setShowDropdown(true) }}
              onKeyDown={handleKeyDown}
              placeholder={currentClasses.length > 0 ? 'Add combo class...' : 'Type class name...'}
              className="flex-1 bg-transparent text-[11px] text-white outline-none placeholder:text-zinc-600"
            />
          ) : elementName && currentClasses.length === 0 ? (
            <div className="flex items-center gap-1 flex-1 min-w-0">
              <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[11px] font-medium truncate">
                {elementName}
              </span>
            </div>
          ) : (
            <span className="flex-1 text-[11px] text-zinc-600">
              {currentClasses.length > 0 ? 'Add combo class...' : 'Type class name...'}
            </span>
          )}
          <ChevronDown className="w-3 h-3 text-zinc-600 shrink-0" />
        </div>

        {/* Dropdown */}
        {showDropdown && isEditing && (
          <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-zinc-800 border border-zinc-700 rounded shadow-xl max-h-48 overflow-y-auto">
            {isNewName && inputValue.trim() && (
              <button
                onClick={() => {
                  const id = addClass(inputValue.trim())
                  handleAssign(id)
                }}
                className="w-full px-3 py-1.5 text-left text-[11px] text-green-400 hover:bg-zinc-700 flex items-center gap-1.5"
              >
                <span className="w-4 h-4 rounded bg-green-500/20 flex items-center justify-center text-[10px]">+</span>
                Create &ldquo;{inputValue.trim()}&rdquo;
              </button>
            )}
            {filteredClasses.length > 0 ? (
              filteredClasses.map(cls => (
                <button
                  key={cls.id}
                  onClick={() => handleAssign(cls.id)}
                  className="w-full px-3 py-1.5 text-left text-[11px] text-zinc-300 hover:bg-zinc-700"
                >
                  {cls.name}
                </button>
              ))
            ) : !isNewName && (
              <div className="px-3 py-2 text-[10px] text-zinc-600">No classes found</div>
            )}
          </div>
        )}
      </div>

      {/* Editing indicator */}
      {editingClassId && (
        <div className="mt-1.5 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <span className="text-[10px] text-blue-400">
            Editing class: {allClasses.find(c => c.id === editingClassId)?.name}
          </span>
        </div>
      )}
      {!editingClassId && currentClasses.length > 0 && (
        <div className="mt-1 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
          <span className="text-[10px] text-orange-400">Editing: inline override</span>
        </div>
      )}

      {/* State selector — visible only when editing a class */}
      {editingClassId && (
        <div className="mt-2 flex items-center gap-2">
          <span className="text-[10px] text-zinc-500 shrink-0">State:</span>
          <select
            value={activeState ?? ''}
            onChange={e => setActiveState(e.target.value || null)}
            className="flex-1 h-6 bg-zinc-800 border border-zinc-700 text-[11px] text-white rounded px-1.5 focus:outline-none focus:ring-1 focus:ring-yellow-500/50 cursor-pointer"
          >
            <option value="">None</option>
            <optgroup label="Interaction">
              {ELEMENT_STATES.filter(s => s.group === 'interaction').map(s => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </optgroup>
            <optgroup label="Pseudo-element">
              {ELEMENT_STATES.filter(s => s.group === 'pseudo-element').map(s => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </optgroup>
            <optgroup label="Form">
              {ELEMENT_STATES.filter(s => s.group === 'form').map(s => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </optgroup>
          </select>
        </div>
      )}

      {/* State editing indicator */}
      {editingClassId && activeState && (
        <div className="mt-1 px-2 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded">
          <span className="text-[10px] text-yellow-400 font-medium">
            Editing: .{allClasses.find(c => c.id === editingClassId)?.name} on {getStateById(activeState)?.label}
          </span>
        </div>
      )}
    </div>
  )
}
