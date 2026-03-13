'use client'
import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useEditorStore } from '@/store/editorStore'
import { Braces, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CSSVariable } from '@/types/site'

interface VarPickerProps {
  /** Filter variables by type(s) */
  types?: CSSVariable['type'][]
  onSelect: (cssValue: string) => void
  onClear?: () => void
  hasVarValue?: boolean
  className?: string
}

export function VarPicker({ types, onSelect, onClear, hasVarValue, className }: VarPickerProps) {
  const { siteConfig } = useEditorStore()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const allVars = siteConfig?.variables ?? []
  const filtered = allVars
    .filter(v => !types || types.includes(v.type))
    .filter(v => !search.trim() || v.name.toLowerCase().includes(search.toLowerCase()))

  // Group by group field
  const groups = new Map<string, CSSVariable[]>()
  for (const v of filtered) {
    const g = v.group || ''
    if (!groups.has(g)) groups.set(g, [])
    groups.get(g)!.push(v)
  }

  const handleSelect = (v: CSSVariable) => {
    onSelect(`var(--${v.name.replace(/[^a-zA-Z0-9-_]/g, '-')})`)
    setOpen(false)
    setSearch('')
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            'p-1 rounded transition-colors',
            hasVarValue
              ? 'text-purple-400 bg-purple-500/10 hover:bg-purple-500/20'
              : 'text-zinc-500 hover:text-white hover:bg-zinc-700',
            className
          )}
          title="Use variable"
        >
          <Braces className="w-3.5 h-3.5" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0 bg-zinc-900 border-zinc-700" align="end" side="bottom">
        {/* Search */}
        <div className="p-2 border-b border-zinc-700/50">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-600" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search variables"
              className="w-full h-6 bg-zinc-800 border border-zinc-700 text-white text-[10px] rounded pl-7 pr-6 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-600"
              autoFocus
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Clear current var */}
        {hasVarValue && onClear && (
          <button
            onClick={() => { onClear(); setOpen(false) }}
            className="w-full px-3 py-1.5 text-left text-[10px] text-red-400 hover:bg-zinc-800 border-b border-zinc-700/50"
          >
            Remove variable reference
          </button>
        )}

        {/* Variable list */}
        <div className="max-h-48 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="px-3 py-4 text-[10px] text-zinc-600 text-center">No variables found</p>
          ) : (
            Array.from(groups.entries()).map(([group, vars]) => (
              <div key={group}>
                {group && (
                  <p className="px-3 py-1 text-[9px] text-zinc-500 font-medium uppercase tracking-wider bg-zinc-800/50">{group}</p>
                )}
                {vars.map(v => (
                  <button
                    key={v.id}
                    onClick={() => handleSelect(v)}
                    className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-zinc-800 transition-colors"
                  >
                    {v.type === 'color' ? (
                      <div className="w-3.5 h-3.5 rounded-sm border border-zinc-600 shrink-0" style={{ backgroundColor: v.value }} />
                    ) : (
                      <Braces className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    )}
                    <span className="text-[10px] text-zinc-300 truncate">--{v.name}</span>
                    <span className="text-[9px] text-zinc-600 truncate ml-auto">{v.value}</span>
                  </button>
                ))}
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
