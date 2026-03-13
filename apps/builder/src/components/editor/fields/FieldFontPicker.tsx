'use client'
import { useState, useRef, useEffect, useMemo } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { Label } from '@/components/ui/label'
import { X, Search, ChevronDown, Upload } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FONT_LIST, FONT_CATEGORIES, type FontCategory } from '@/lib/fonts'
import { FontUploadDialog } from './FontUploadDialog'

interface FieldFontPickerProps {
  sectionId?: string
  label: string
  className?: string
  value?: string
  onChange?: (value: string) => void
}

export function FieldFontPicker({ sectionId, label, className, value: controlledValue, onChange }: FieldFontPickerProps) {
  const { siteConfig, updateSection } = useEditorStore()
  const isControlled = controlledValue !== undefined || onChange !== undefined

  const section = !isControlled ? siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId) : undefined
  const value = isControlled ? (controlledValue ?? '') : (section?.style.fontFamily ?? '')
  const brandFont = siteConfig?.brand.typography.heading ?? 'Inter'

  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<FontCategory | 'all' | 'custom'>('all')
  const [uploadOpen, setUploadOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const customFonts = siteConfig?.customFonts ?? []

  const filteredFonts = useMemo(() => {
    if (activeCategory === 'custom') return []
    let fonts = FONT_LIST
    if (activeCategory !== 'all') {
      fonts = fonts.filter(f => f.category === activeCategory)
    }
    if (search) {
      const q = search.toLowerCase()
      fonts = fonts.filter(f => f.name.toLowerCase().includes(q))
    }
    return fonts
  }, [activeCategory, search])

  const filteredCustomFonts = useMemo(() => {
    if (activeCategory !== 'all' && activeCategory !== 'custom') return []
    if (search) {
      const q = search.toLowerCase()
      return customFonts.filter(f => f.name.toLowerCase().includes(q))
    }
    return customFonts
  }, [activeCategory, search, customFonts])

  const handleChange = (font: string) => {
    if (isControlled) {
      onChange?.(font)
    } else if (section) {
      updateSection(sectionId!, { style: { ...section.style, fontFamily: font || undefined } })
    }
    setOpen(false)
    setSearch('')
  }

  const handleReset = () => {
    if (isControlled) {
      onChange?.('')
    } else if (section) {
      const newStyle = { ...section.style }
      delete newStyle.fontFamily
      updateSection(sectionId!, { style: newStyle })
    }
  }

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  // Focus search on open
  useEffect(() => {
    if (open) searchRef.current?.focus()
  }, [open])

  const isInline = !label

  return (
    <div className={cn(isInline ? 'relative' : 'space-y-1.5 relative', className)} ref={containerRef}>
      {label && <Label className="text-xs text-zinc-400">{label}</Label>}
      <div className="flex items-center gap-1.5 min-w-0">
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            'flex-1 min-w-0 text-[11px] rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue flex items-center justify-between gap-1 text-left',
            isInline ? 'h-6 bg-[#383838] border border-[#4a4a4a] text-[#e0e0e0]' : 'h-7 bg-zinc-800 border border-zinc-700 text-white rounded-md'
          )}
        >
          <span className="truncate" style={value ? { fontFamily: value } : undefined}>
            {value || `Brand (${brandFont})`}
          </span>
          <ChevronDown className={cn('w-3 h-3 text-zinc-500 shrink-0 transition-transform', open && 'rotate-180')} />
        </button>
        {value && (
          <button onClick={handleReset} className="p-1 text-zinc-500 hover:text-white transition-colors shrink-0" title="Reset to brand">
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {open && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl overflow-hidden">
          {/* Search */}
          <div className="p-2 border-b border-zinc-700/50">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-500" />
              <input
                ref={searchRef}
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search fonts..."
                className="w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded pl-7 pr-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
              />
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex gap-0.5 px-2 py-1.5 border-b border-zinc-700/50 overflow-x-auto">
            <TabBtn active={activeCategory === 'all'} onClick={() => setActiveCategory('all')}>All</TabBtn>
            {customFonts.length > 0 && (
              <TabBtn active={activeCategory === 'custom'} onClick={() => setActiveCategory('custom')}>Custom</TabBtn>
            )}
            {FONT_CATEGORIES.map(c => (
              <TabBtn key={c.id} active={activeCategory === c.id} onClick={() => setActiveCategory(c.id)}>{c.label}</TabBtn>
            ))}
          </div>

          {/* Font list */}
          <div className="max-h-[240px] overflow-y-auto">
            {/* Brand option */}
            <button
              onClick={() => handleChange('')}
              className={cn(
                'w-full px-3 py-1.5 text-left text-[11px] hover:bg-zinc-800 transition-colors',
                !value ? 'text-wf-blue' : 'text-zinc-400'
              )}
            >
              Brand ({brandFont})
            </button>

            {/* Custom fonts */}
            {filteredCustomFonts.length > 0 && (
              <>
                {(activeCategory === 'all') && (
                  <div className="px-3 pt-2 pb-1 text-[9px] font-medium text-zinc-600 uppercase tracking-wider">Custom</div>
                )}
                {filteredCustomFonts.map(font => (
                  <button
                    key={font.id}
                    onClick={() => handleChange(font.name)}
                    className={cn(
                      'w-full px-3 py-1.5 text-left text-[11px] hover:bg-zinc-800 transition-colors flex items-center justify-between',
                      value === font.name ? 'text-wf-blue' : 'text-zinc-300'
                    )}
                    style={{ fontFamily: font.name }}
                  >
                    <span>{font.name}</span>
                    <span className="text-[9px] text-violet-500">custom</span>
                  </button>
                ))}
              </>
            )}

            {/* Google fonts */}
            {filteredFonts.length > 0 && activeCategory === 'all' && customFonts.length > 0 && (
              <div className="px-3 pt-2 pb-1 text-[9px] font-medium text-zinc-600 uppercase tracking-wider">Google Fonts</div>
            )}
            {filteredFonts.map(font => (
              <button
                key={font.name}
                onClick={() => handleChange(font.name)}
                className={cn(
                  'w-full px-3 py-1.5 text-left text-[11px] hover:bg-zinc-800 transition-colors flex items-center justify-between',
                  value === font.name ? 'text-wf-blue' : 'text-zinc-300'
                )}
                style={{ fontFamily: font.name }}
              >
                <span>{font.name}</span>
                <span className="text-[9px] text-zinc-600">{font.category}</span>
              </button>
            ))}

            {filteredFonts.length === 0 && filteredCustomFonts.length === 0 && (
              <p className="px-3 py-4 text-[11px] text-zinc-600 text-center">No fonts found</p>
            )}
          </div>

          {/* Upload button */}
          <div className="border-t border-zinc-700/50 p-2">
            <button
              onClick={() => { setUploadOpen(true); setOpen(false) }}
              className="w-full h-7 flex items-center justify-center gap-1.5 text-[11px] text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-750 rounded-md transition-colors"
            >
              <Upload className="w-3 h-3" />
              Upload Custom Font
            </button>
          </div>
        </div>
      )}

      <FontUploadDialog open={uploadOpen} onOpenChange={setUploadOpen} />
    </div>
  )
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-2 py-0.5 text-[10px] rounded whitespace-nowrap transition-colors',
        active ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-zinc-300'
      )}
    >
      {children}
    </button>
  )
}
