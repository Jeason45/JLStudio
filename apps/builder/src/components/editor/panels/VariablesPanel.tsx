'use client'
import { useState, useMemo } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Variable, Plus, Search, X, Trash2, Palette, Ruler, Type, Hash, Percent, Copy, ChevronDown, ChevronRight, Download, Upload, Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import { exportDesignTokens, parseDesignTokens, hasCssFunctions } from '@/lib/variableResolver'
import type { CSSVariable } from '@/types/site'

const TYPE_ICONS: Record<string, React.ReactNode> = {
  color: <Palette className="w-3.5 h-3.5" />,
  size: <Ruler className="w-3.5 h-3.5" />,
  'font-family': <Type className="w-3.5 h-3.5" />,
  number: <Hash className="w-3.5 h-3.5" />,
  percentage: <Percent className="w-3.5 h-3.5" />,
}

const TYPE_COLORS: Record<string, string> = {
  color: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
  size: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
  'font-family': 'bg-orange-500/10 border-orange-500/20 text-orange-400',
  number: 'bg-green-500/10 border-green-500/20 text-green-400',
  percentage: 'bg-teal-500/10 border-teal-500/20 text-teal-400',
}

const INPUT = 'w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-500'
const SELECT = 'w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue cursor-pointer'

type VarType = CSSVariable['type']

export function VariablesPanel() {
  const { siteConfig, addVariable, updateVariable, deleteVariable, activeVariableMode, setActiveVariableMode } = useEditorStore()
  const [search, setSearch] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [newName, setNewName] = useState('')
  const [newType, setNewType] = useState<VarType>('color')
  const [newValue, setNewValue] = useState('')
  const [newGroup, setNewGroup] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set())
  const [showImport, setShowImport] = useState(false)
  const [importJson, setImportJson] = useState('')

  const variables = siteConfig?.variables ?? []
  const filteredVariables = search.trim()
    ? variables.filter(v => v.name.toLowerCase().includes(search.toLowerCase()) || v.group?.toLowerCase().includes(search.toLowerCase()))
    : variables

  // Collect all existing groups for autocomplete
  const existingGroups = useMemo(() => {
    const groups = new Set<string>()
    for (const v of variables) {
      if (v.group) groups.add(v.group)
    }
    return Array.from(groups).sort()
  }, [variables])

  // Group variables
  const grouped = useMemo(() => {
    const map = new Map<string, CSSVariable[]>()
    for (const v of filteredVariables) {
      const g = v.group || ''
      if (!map.has(g)) map.set(g, [])
      map.get(g)!.push(v)
    }
    return map
  }, [filteredVariables])

  const handleCreate = () => {
    if (!newName.trim()) return
    addVariable(newName.trim(), newType, newValue, newGroup.trim() || undefined)
    setIsCreating(false)
    setNewName('')
    setNewValue('')
    setNewGroup('')
  }

  const toggleGroup = (g: string) => {
    setCollapsedGroups(prev => {
      const next = new Set(prev)
      if (next.has(g)) next.delete(g)
      else next.add(g)
      return next
    })
  }

  const handleDuplicate = (v: CSSVariable) => {
    addVariable(`${v.name}-copy`, v.type, v.value, v.group)
    const newVar = siteConfig?.variables?.at(-1)
    if (newVar && v.modeValues) {
      updateVariable(newVar.id, { modeValues: { ...v.modeValues }, description: v.description })
    }
  }

  const handleExport = () => {
    const json = exportDesignTokens(variables)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'design-tokens.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = () => {
    if (!importJson.trim()) return
    try {
      const imported = parseDesignTokens(importJson)
      for (const v of imported) {
        addVariable(v.name, v.type, v.value, v.group)
        // Apply extra fields after creation
        const created = siteConfig?.variables?.at(-1)
        if (created) {
          const updates: Partial<CSSVariable> = {}
          if (v.modeValues) updates.modeValues = v.modeValues
          if (v.description) updates.description = v.description
          if (Object.keys(updates).length > 0) updateVariable(created.id, updates)
        }
      }
      setShowImport(false)
      setImportJson('')
    } catch {
      alert('Format JSON invalide')
    }
  }

  return (
    <>
      {/* Mode switcher + toolbar */}
      <div className="px-2 py-1.5 border-b border-zinc-700/50 shrink-0 flex items-center gap-1">
        <button
          onClick={() => setActiveVariableMode(null)}
          className={cn(
            'flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium transition-colors',
            !activeVariableMode ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-zinc-300'
          )}
        >
          <Sun className="w-3 h-3" />
          Default
        </button>
        <button
          onClick={() => setActiveVariableMode('dark')}
          className={cn(
            'flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium transition-colors',
            activeVariableMode === 'dark' ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-zinc-300'
          )}
        >
          <Moon className="w-3 h-3" />
          Dark
        </button>
        <div className="flex-1" />
        <button onClick={handleExport} className="p-1 text-zinc-500 hover:text-white transition-colors" title="Export design tokens">
          <Download className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => setShowImport(!showImport)} className="p-1 text-zinc-500 hover:text-white transition-colors" title="Import design tokens">
          <Upload className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Import panel */}
      {showImport && (
        <div className="px-3 py-2 border-b border-zinc-700/50 space-y-2 shrink-0">
          <label className="text-[10px] text-zinc-500">Paste W3C Design Tokens JSON</label>
          <textarea
            value={importJson}
            onChange={e => setImportJson(e.target.value)}
            rows={4}
            className="w-full bg-zinc-800 border border-zinc-700 text-white text-[10px] rounded p-2 font-mono focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-500 resize-none"
            placeholder='{ "colors": { "primary": { "$value": "#6366f1", "$type": "color" } } }'
          />
          <div className="flex gap-2">
            <button onClick={handleImport} className="flex-1 py-1.5 bg-wf-blue text-white text-[11px] rounded hover:bg-wf-blue/90 transition-colors">
              Import
            </button>
            <button onClick={() => { setShowImport(false); setImportJson('') }} className="flex-1 py-1.5 bg-zinc-800 text-zinc-400 text-[11px] rounded hover:bg-zinc-700 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="px-2 py-1.5 border-b border-zinc-700/50 shrink-0">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search variables"
            className="w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded pl-7 pr-6 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-500"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Create variable */}
      {isCreating ? (
        <div className="px-3 py-3 border-b border-zinc-700/50 space-y-2 shrink-0">
          <div>
            <label className="text-[10px] text-zinc-500">Name</label>
            <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="my-variable" className={INPUT} autoFocus />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-zinc-500">Type</label>
              <select value={newType} onChange={e => setNewType(e.target.value as VarType)} className={SELECT}>
                <option value="color">Color</option>
                <option value="size">Size</option>
                <option value="font-family">Font Family</option>
                <option value="number">Number</option>
                <option value="percentage">Percentage</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] text-zinc-500">Group</label>
              <input
                value={newGroup}
                onChange={e => setNewGroup(e.target.value)}
                placeholder="e.g. colors"
                className={INPUT}
                list="var-groups"
              />
              <datalist id="var-groups">
                {existingGroups.map(g => <option key={g} value={g} />)}
              </datalist>
            </div>
          </div>
          <div>
            <label className="text-[10px] text-zinc-500">Value</label>
            <input
              value={newValue}
              onChange={e => setNewValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCreate()}
              placeholder={newType === 'color' ? '#6366f1' : newType === 'size' ? '16px' : newType === 'percentage' ? '50%' : '...'}
              type={newType === 'color' ? 'color' : 'text'}
              className={cn(INPUT, newType === 'color' && 'h-8')}
            />
          </div>
          <div className="flex gap-2">
            <button onClick={handleCreate} className="flex-1 py-1.5 bg-wf-blue text-white text-[11px] rounded hover:bg-wf-blue/90 transition-colors">
              Create
            </button>
            <button onClick={() => setIsCreating(false)} className="flex-1 py-1.5 bg-zinc-800 text-zinc-400 text-[11px] rounded hover:bg-zinc-700 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="px-3 py-2 border-b border-zinc-700/50 shrink-0">
          <button
            onClick={() => setIsCreating(true)}
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded text-[11px] font-medium bg-zinc-800 text-[#ccc] hover:bg-zinc-700 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            New variable
          </button>
        </div>
      )}

      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredVariables.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center px-4">
              <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-3 text-zinc-500">
                <Variable className="w-5 h-5" />
              </div>
              <p className="text-[11px] text-zinc-400 font-medium mb-1">No variables yet</p>
              <p className="text-[10px] text-zinc-500 leading-relaxed">
                Create CSS variables for consistent colors, sizes, and fonts across your site.
              </p>
            </div>
          ) : (
            Array.from(grouped.entries()).map(([group, vars]) => {
              const isCollapsed = collapsedGroups.has(group || '__ungrouped')
              const groupKey = group || '__ungrouped'

              return (
                <div key={groupKey} className="mb-1">
                  {/* Group header */}
                  {group && (
                    <button
                      onClick={() => toggleGroup(groupKey)}
                      className="w-full flex items-center gap-1 px-2 py-1.5 text-[10px] text-zinc-500 font-medium uppercase tracking-wider hover:text-zinc-300 transition-colors"
                    >
                      {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      {group}
                      <span className="text-zinc-500 font-normal">({vars.length})</span>
                    </button>
                  )}

                  {/* Variables */}
                  {!isCollapsed && (
                    <div className="space-y-0.5">
                      {vars.map(v => (
                        <VariableRow
                          key={v.id}
                          variable={v}
                          isEditing={editingId === v.id}
                          onEdit={() => setEditingId(editingId === v.id ? null : v.id)}
                          onDuplicate={() => handleDuplicate(v)}
                          onDelete={() => deleteVariable(v.id)}
                          onUpdate={(updates) => updateVariable(v.id, updates)}
                          activeMode={activeVariableMode}
                          existingGroups={existingGroups}
                          allVariables={variables}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      </ScrollArea>
    </>
  )
}

// ─── Variable Row ───

interface VariableRowProps {
  variable: CSSVariable
  isEditing: boolean
  onEdit: () => void
  onDuplicate: () => void
  onDelete: () => void
  onUpdate: (updates: Partial<CSSVariable>) => void
  activeMode: string | null
  existingGroups: string[]
  allVariables: CSSVariable[]
}

function VariableRow({ variable: v, isEditing, onEdit, onDuplicate, onDelete, onUpdate, activeMode, existingGroups, allVariables }: VariableRowProps) {
  const [rawMode, setRawMode] = useState(false)
  const displayValue = activeMode && v.modeValues?.[activeMode] ? v.modeValues[activeMode] : v.value
  const isAlias = v.value.startsWith('alias:')
  const aliasTarget = isAlias ? allVariables.find(x => x.id === v.value.slice(6)) : null

  return (
    <div className="rounded hover:bg-zinc-800/50 transition-colors">
      {/* Summary row */}
      <div
        className="flex items-center gap-2 px-2 py-2 cursor-pointer group"
        onClick={onEdit}
      >
        <div className={cn('w-7 h-7 rounded border flex items-center justify-center shrink-0', TYPE_COLORS[v.type])}>
          {v.type === 'color' && !isAlias ? (
            <div className="w-4 h-4 rounded-sm border border-zinc-600" style={{ backgroundColor: displayValue }} />
          ) : (
            TYPE_ICONS[v.type]
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] text-[#ccc] truncate">--{v.name}</p>
          <p className="text-[9px] text-zinc-500 truncate">
            {isAlias ? `→ --${aliasTarget?.name ?? '?'}` : displayValue}
          </p>
        </div>
        {v.modeValues?.dark && (
          <Moon className="w-3 h-3 text-zinc-500 shrink-0" />
        )}
        <button
          onClick={e => { e.stopPropagation(); onDuplicate() }}
          className="opacity-0 group-hover:opacity-100 p-1 text-zinc-600 hover:text-zinc-300 transition-all"
          title="Duplicate"
        >
          <Copy className="w-3 h-3" />
        </button>
        <button
          onClick={e => { e.stopPropagation(); onDelete() }}
          className="opacity-0 group-hover:opacity-100 p-1 text-zinc-600 hover:text-red-400 transition-all"
          title="Delete"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>

      {/* Inline editor */}
      {isEditing && (
        <div className="px-3 pb-3 space-y-2">
          <div>
            <label className="text-[10px] text-zinc-500">Name</label>
            <input
              defaultValue={v.name}
              onBlur={e => onUpdate({ name: e.target.value })}
              className="w-full h-6 bg-zinc-900 border border-zinc-600 text-white text-[10px] rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-zinc-500">Type</label>
              <select
                value={v.type}
                onChange={e => onUpdate({ type: e.target.value as VarType })}
                className="w-full h-6 bg-zinc-900 border border-zinc-600 text-white text-[10px] rounded px-1 focus:outline-none cursor-pointer"
              >
                <option value="color">Color</option>
                <option value="size">Size</option>
                <option value="font-family">Font Family</option>
                <option value="number">Number</option>
                <option value="percentage">Percentage</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] text-zinc-500">Group</label>
              <input
                defaultValue={v.group ?? ''}
                onBlur={e => onUpdate({ group: e.target.value.trim() || undefined })}
                placeholder="Ungrouped"
                className="w-full h-6 bg-zinc-900 border border-zinc-600 text-white text-[10px] rounded px-2 focus:outline-none"
                list={`groups-${v.id}`}
              />
              <datalist id={`groups-${v.id}`}>
                {existingGroups.map(g => <option key={g} value={g} />)}
              </datalist>
            </div>
          </div>
          <div>
            <label className="text-[10px] text-zinc-500">Description</label>
            <input
              defaultValue={v.description ?? ''}
              onBlur={e => onUpdate({ description: e.target.value.trim() || undefined })}
              placeholder="Optional description"
              className="w-full h-6 bg-zinc-900 border border-zinc-600 text-white text-[10px] rounded px-2 focus:outline-none"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-0.5">
              <label className="text-[10px] text-zinc-500">Default value</label>
              {(hasCssFunctions(v.value) || rawMode) && (
                <button
                  onClick={() => setRawMode(!rawMode)}
                  className={cn('text-[9px] px-1.5 py-0.5 rounded', rawMode ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-zinc-300')}
                >
                  Raw CSS
                </button>
              )}
            </div>
            {v.type === 'color' && !rawMode ? (
              <div className="flex gap-1">
                <input
                  type="color"
                  value={v.value.startsWith('#') ? v.value : '#6366f1'}
                  onChange={e => onUpdate({ value: e.target.value })}
                  className="w-7 h-6 rounded border border-zinc-600 bg-zinc-900 cursor-pointer [&::-webkit-color-swatch-wrapper]:p-0.5 [&::-webkit-color-swatch]:rounded-sm"
                />
                <input
                  defaultValue={v.value}
                  onBlur={e => onUpdate({ value: e.target.value })}
                  className="flex-1 h-6 bg-zinc-900 border border-zinc-600 text-white text-[10px] rounded px-2 focus:outline-none uppercase"
                />
              </div>
            ) : (
              <input
                defaultValue={v.value}
                onBlur={e => onUpdate({ value: e.target.value })}
                placeholder={v.type === 'size' ? '16px' : v.type === 'percentage' ? '50%' : '...'}
                className="w-full h-6 bg-zinc-900 border border-zinc-600 text-white text-[10px] rounded px-2 focus:outline-none font-mono"
              />
            )}
          </div>
          {/* Dark mode value */}
          <div>
            <label className="text-[10px] text-zinc-500 flex items-center gap-1">
              <Moon className="w-3 h-3" /> Dark mode value
            </label>
            {v.type === 'color' ? (
              <div className="flex gap-1">
                <input
                  type="color"
                  value={(v.modeValues?.dark ?? v.value).startsWith('#') ? (v.modeValues?.dark ?? v.value) : '#1a1a1a'}
                  onChange={e => onUpdate({ modeValues: { ...v.modeValues, dark: e.target.value } })}
                  className="w-7 h-6 rounded border border-zinc-600 bg-zinc-900 cursor-pointer [&::-webkit-color-swatch-wrapper]:p-0.5 [&::-webkit-color-swatch]:rounded-sm"
                />
                <input
                  defaultValue={v.modeValues?.dark ?? ''}
                  onBlur={e => {
                    const val = e.target.value.trim()
                    if (val) {
                      onUpdate({ modeValues: { ...v.modeValues, dark: val } })
                    } else {
                      const next = { ...v.modeValues }
                      delete next.dark
                      onUpdate({ modeValues: Object.keys(next).length > 0 ? next : undefined })
                    }
                  }}
                  placeholder="Same as default"
                  className="flex-1 h-6 bg-zinc-900 border border-zinc-600 text-white text-[10px] rounded px-2 focus:outline-none uppercase"
                />
              </div>
            ) : (
              <input
                defaultValue={v.modeValues?.dark ?? ''}
                onBlur={e => {
                  const val = e.target.value.trim()
                  if (val) {
                    onUpdate({ modeValues: { ...v.modeValues, dark: val } })
                  } else {
                    const next = { ...v.modeValues }
                    delete next.dark
                    onUpdate({ modeValues: Object.keys(next).length > 0 ? next : undefined })
                  }
                }}
                placeholder="Same as default"
                className="w-full h-6 bg-zinc-900 border border-zinc-600 text-white text-[10px] rounded px-2 focus:outline-none font-mono"
              />
            )}
          </div>
          {/* Alias picker */}
          <div>
            <label className="text-[10px] text-zinc-500">Alias to variable</label>
            <select
              value={isAlias ? v.value.slice(6) : ''}
              onChange={e => {
                const targetId = e.target.value
                if (targetId) {
                  onUpdate({ value: `alias:${targetId}` })
                } else {
                  onUpdate({ value: v.type === 'color' ? '#6366f1' : '' })
                }
              }}
              className="w-full h-6 bg-zinc-900 border border-zinc-600 text-white text-[10px] rounded px-1 focus:outline-none cursor-pointer"
            >
              <option value="">None (direct value)</option>
              {allVariables.filter(x => x.id !== v.id && x.type === v.type).map(x => (
                <option key={x.id} value={x.id}>--{x.name}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  )
}
