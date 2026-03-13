'use client'
import { useState, useRef } from 'react'
import { useCmsItems } from '@/hooks/useCmsItems'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ArrowLeft, Plus, Trash2, Search, X, ChevronLeft, ChevronRight, Download, Upload, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CmsFieldDef, CmsItemStatus } from '@/types/cms'
import { CmsItemEditor } from './CmsItemEditor'

const STATUS_TABS: { value: CmsItemStatus | 'ALL'; label: string }[] = [
  { value: 'ALL', label: 'Tous' },
  { value: 'PUBLISHED', label: 'Publies' },
  { value: 'DRAFT', label: 'Brouillons' },
  { value: 'SCHEDULED', label: 'Planifies' },
  { value: 'ARCHIVED', label: 'Archives' },
]

const STATUS_COLORS: Record<CmsItemStatus, string> = {
  DRAFT: 'bg-zinc-600',
  PUBLISHED: 'bg-green-500',
  ARCHIVED: 'bg-zinc-500',
  SCHEDULED: 'bg-amber-500',
}

interface CmsItemsManagerProps {
  collectionId: string
  collectionName: string
  fields: CmsFieldDef[]
  onBack: () => void
}

export function CmsItemsManager({ collectionId, collectionName, fields, onBack }: CmsItemsManagerProps) {
  const {
    items, total, loading,
    updateParams,
    createItem, deleteItem,
    bulkAction, importCsv, exportCsv,
  } = useCmsItems(collectionId)

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<CmsItemStatus | 'ALL'>('ALL')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [editingItemId, setEditingItemId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [page, setPage] = useState(0)
  const fileRef = useRef<HTMLInputElement>(null)
  const pageSize = 20

  const primaryField = fields.find(f => f.type === 'plain-text') ?? fields[0]

  const handleStatusFilter = (status: CmsItemStatus | 'ALL') => {
    setStatusFilter(status)
    setPage(0)
    updateParams({ status: status === 'ALL' ? undefined : status, offset: 0 })
  }

  const handleSearch = (q: string) => {
    setSearch(q)
    updateParams({ search: q || undefined, offset: 0 })
  }

  const handlePage = (dir: 'prev' | 'next') => {
    const newPage = dir === 'next' ? page + 1 : page - 1
    setPage(newPage)
    updateParams({ offset: newPage * pageSize, limit: pageSize })
  }

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const toggleAll = () => {
    if (selectedIds.size === items.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(items.map(i => i.id)))
    }
  }

  const handleBulkDelete = async () => {
    if (!confirm(`Supprimer ${selectedIds.size} item(s) ?`)) return
    await bulkAction('delete', Array.from(selectedIds))
    setSelectedIds(new Set())
  }

  const handleBulkStatus = async (status: CmsItemStatus) => {
    await bulkAction('status', Array.from(selectedIds), status)
    setSelectedIds(new Set())
  }

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const text = await file.text()
    await importCsv(text)
    if (fileRef.current) fileRef.current.value = ''
  }

  const handleExport = async () => {
    const csv = await exportCsv()
    if (!csv) return
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${collectionName}-export.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Item editor sub-view
  if (editingItemId || isCreating) {
    const editingItem = editingItemId ? items.find(i => i.id === editingItemId) : undefined
    return (
      <CmsItemEditor
        collectionId={collectionId}
        fields={fields}
        item={editingItem}
        onSave={() => { setEditingItemId(null); setIsCreating(false) }}
        onBack={() => { setEditingItemId(null); setIsCreating(false) }}
      />
    )
  }

  return (
    <>
      {/* Header */}
      <div className="px-2 py-1.5 border-b border-zinc-800 shrink-0 flex items-center gap-2">
        <button onClick={onBack} className="text-zinc-500 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
        <span className="text-[11px] font-semibold text-zinc-200 truncate flex-1">{collectionName}</span>
        <button onClick={() => setIsCreating(true)} className="text-zinc-500 hover:text-white" title="Nouvel item">
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Search */}
      <div className="px-2 py-1 border-b border-zinc-800 shrink-0">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-600" />
          <input
            value={search}
            onChange={e => handleSearch(e.target.value)}
            placeholder="Rechercher..."
            className="w-full h-6 bg-zinc-800 border border-zinc-700 text-white text-[10px] rounded pl-7 pr-6 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-600"
          />
          {search && (
            <button onClick={() => handleSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Status tabs */}
      <div className="flex gap-0.5 px-2 py-1 border-b border-zinc-800 shrink-0 overflow-x-auto">
        {STATUS_TABS.map(tab => (
          <button
            key={tab.value}
            onClick={() => handleStatusFilter(tab.value)}
            className={cn(
              'px-2 py-0.5 text-[9px] rounded transition-colors whitespace-nowrap',
              statusFilter === tab.value ? 'bg-wf-blue text-white' : 'text-zinc-500 hover:text-white hover:bg-zinc-800'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bulk actions bar */}
      {selectedIds.size > 0 && (
        <div className="flex items-center gap-1.5 px-2 py-1 border-b border-zinc-800 bg-zinc-800/50 shrink-0">
          <span className="text-[9px] text-zinc-400">{selectedIds.size} selectionne(s)</span>
          <button onClick={() => handleBulkStatus('PUBLISHED')} className="px-1.5 py-0.5 text-[9px] bg-green-600/20 text-green-400 rounded hover:bg-green-600/30">Publier</button>
          <button onClick={() => handleBulkStatus('ARCHIVED')} className="px-1.5 py-0.5 text-[9px] bg-zinc-600/20 text-zinc-400 rounded hover:bg-zinc-600/30">Archiver</button>
          <button onClick={handleBulkDelete} className="px-1.5 py-0.5 text-[9px] bg-red-600/20 text-red-400 rounded hover:bg-red-600/30">Supprimer</button>
        </div>
      )}

      <ScrollArea className="flex-1">
        <div className="p-2">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-4 h-4 text-zinc-500 animate-spin" />
            </div>
          )}

          {!loading && items.length === 0 && (
            <div className="text-center py-8">
              <p className="text-[11px] text-zinc-500">Aucun item</p>
              <button onClick={() => setIsCreating(true)} className="mt-2 text-[10px] text-wf-blue hover:underline">
                Creer un item
              </button>
            </div>
          )}

          {/* Select all */}
          {items.length > 0 && (
            <label className="flex items-center gap-2 px-2 py-1 text-[9px] text-zinc-600 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedIds.size === items.length && items.length > 0}
                onChange={toggleAll}
                className="rounded border-zinc-600 w-3 h-3"
              />
              Tout selectionner
            </label>
          )}

          {/* Items */}
          {items.map(item => {
            const title = primaryField ? (item.data[primaryField.slug] as string) ?? item.slug : item.slug
            return (
              <div
                key={item.id}
                className="flex items-center gap-2 px-2 py-1.5 rounded text-[11px] text-zinc-400 hover:bg-zinc-800 hover:text-white cursor-pointer group transition-colors"
                onClick={() => setEditingItemId(item.id)}
              >
                <input
                  type="checkbox"
                  checked={selectedIds.has(item.id)}
                  onChange={e => { e.stopPropagation(); toggleSelect(item.id) }}
                  onClick={e => e.stopPropagation()}
                  className="rounded border-zinc-600 w-3 h-3 shrink-0"
                />
                <div className={cn('w-1.5 h-1.5 rounded-full shrink-0', STATUS_COLORS[item.status])} title={item.status} />
                <span className="flex-1 truncate">{title}</span>
                <span className="text-[9px] text-zinc-600">{item.slug}</span>
                <button
                  onClick={e => { e.stopPropagation(); deleteItem(item.id) }}
                  className="opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-red-400 shrink-0"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            )
          })}
        </div>
      </ScrollArea>

      {/* Footer: pagination + import/export */}
      <div className="px-2 py-1.5 border-t border-zinc-800 shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            onClick={() => fileRef.current?.click()}
            className="text-zinc-600 hover:text-white p-0.5"
            title="Importer CSV"
          >
            <Upload className="w-3 h-3" />
          </button>
          <button
            onClick={handleExport}
            className="text-zinc-600 hover:text-white p-0.5"
            title="Exporter CSV"
          >
            <Download className="w-3 h-3" />
          </button>
          <input ref={fileRef} type="file" accept=".csv" onChange={handleImport} className="hidden" />
        </div>

        <div className="flex items-center gap-1 text-[9px] text-zinc-500">
          <button
            onClick={() => handlePage('prev')}
            disabled={page === 0}
            className="disabled:opacity-30 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-3 h-3" />
          </button>
          <span>{page * pageSize + 1}-{Math.min((page + 1) * pageSize, total)} / {total}</span>
          <button
            onClick={() => handlePage('next')}
            disabled={(page + 1) * pageSize >= total}
            className="disabled:opacity-30 hover:text-white transition-colors"
          >
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </>
  )
}
