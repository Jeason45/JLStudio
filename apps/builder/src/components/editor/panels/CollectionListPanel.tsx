'use client'
import { useEditorStore } from '@/store/editorStore'
import { useCmsCollections } from '@/hooks/useCmsCollections'
import { PanelSection } from '../PanelSection'
import { Plus, Trash2 } from 'lucide-react'
import type { CmsFilter, CmsFilterOperator } from '@/types/cms'

const INPUT = 'w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-600'
const SELECT = 'w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue cursor-pointer'
const LBL = 'text-[10px] text-zinc-500'

const OPERATORS: { value: CmsFilterOperator; label: string }[] = [
  { value: 'eq', label: '=' },
  { value: 'neq', label: '!=' },
  { value: 'contains', label: 'contient' },
  { value: 'gt', label: '>' },
  { value: 'gte', label: '>=' },
  { value: 'lt', label: '<' },
  { value: 'lte', label: '<=' },
  { value: 'exists', label: 'existe' },
]

export function CollectionListPanel({ sectionId }: { sectionId: string }) {
  const { siteConfig, setCmsListBinding, updateCmsListSort, updateCmsListFilters, updateCmsListLimit } = useEditorStore()
  const { collections } = useCmsCollections(siteConfig?.id)

  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  if (!section) return null

  const binding = section.content.__cmsBinding as import('@/types/cms').CmsListBinding | undefined
  const selectedCollection = collections.find(c => c.id === binding?.collectionId)
  const fields = selectedCollection?.fields ?? []

  const handleSelectCollection = (collectionId: string) => {
    setCmsListBinding(sectionId, {
      collectionId,
      limit: 10,
      offset: 0,
      sortField: 'createdAt',
      sortDirection: 'desc',
      filters: [],
    })
  }

  const addFilter = () => {
    if (!binding) return
    const newFilter: CmsFilter = { fieldSlug: fields[0]?.slug ?? '', operator: 'eq', value: '' }
    updateCmsListFilters(sectionId, [...(binding.filters ?? []), newFilter])
  }

  const updateFilter = (index: number, updates: Partial<CmsFilter>) => {
    if (!binding) return
    const filters = [...binding.filters]
    filters[index] = { ...filters[index], ...updates }
    updateCmsListFilters(sectionId, filters)
  }

  const removeFilter = (index: number) => {
    if (!binding) return
    updateCmsListFilters(sectionId, binding.filters.filter((_, i) => i !== index))
  }

  return (
    <>
      <PanelSection title="Collection" compact>
        <div>
          <label className={LBL}>Collection source</label>
          <select
            value={binding?.collectionId ?? ''}
            onChange={e => e.target.value && handleSelectCollection(e.target.value)}
            className={SELECT}
          >
            <option value="">Choisir une collection...</option>
            {collections.map(c => (
              <option key={c.id} value={c.id}>{c.name} ({c._count?.items ?? 0})</option>
            ))}
          </select>
        </div>
      </PanelSection>

      {binding && (
        <>
          <PanelSection title="Affichage" compact>
            <div>
              <label className={LBL}>Limite</label>
              <input
                type="number"
                min={1}
                max={100}
                value={binding.limit}
                onChange={e => updateCmsListLimit(sectionId, Number(e.target.value) || 10)}
                className={INPUT}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={LBL}>Trier par</label>
                <select
                  value={binding.sortField}
                  onChange={e => updateCmsListSort(sectionId, e.target.value, binding.sortDirection)}
                  className={SELECT}
                >
                  <option value="createdAt">Date de creation</option>
                  <option value="updatedAt">Derniere modif.</option>
                  <option value="publishedAt">Date publication</option>
                  {fields.map(f => <option key={f.slug} value={f.slug}>{f.name}</option>)}
                </select>
              </div>
              <div>
                <label className={LBL}>Ordre</label>
                <select
                  value={binding.sortDirection}
                  onChange={e => updateCmsListSort(sectionId, binding.sortField, e.target.value as 'asc' | 'desc')}
                  className={SELECT}
                >
                  <option value="desc">Descendant</option>
                  <option value="asc">Ascendant</option>
                </select>
              </div>
            </div>
          </PanelSection>

          <PanelSection title="Filtres" compact defaultOpen={false}>
            {(binding.filters ?? []).map((filter, i) => (
              <div key={i} className="flex gap-1 items-end">
                <div className="flex-1">
                  <select value={filter.fieldSlug} onChange={e => updateFilter(i, { fieldSlug: e.target.value })} className={SELECT}>
                    {fields.map(f => <option key={f.slug} value={f.slug}>{f.name}</option>)}
                  </select>
                </div>
                <select value={filter.operator} onChange={e => updateFilter(i, { operator: e.target.value as CmsFilterOperator })} className="w-16 h-7 bg-zinc-800 border border-zinc-700 text-white text-[10px] rounded px-1">
                  {OPERATORS.map(op => <option key={op.value} value={op.value}>{op.label}</option>)}
                </select>
                <input
                  value={String(filter.value ?? '')}
                  onChange={e => updateFilter(i, { value: e.target.value })}
                  placeholder="valeur"
                  className="flex-1 h-7 bg-zinc-800 border border-zinc-700 text-white text-[10px] rounded px-1.5"
                />
                <button onClick={() => removeFilter(i)} className="text-zinc-600 hover:text-red-400 h-7">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
            <button
              onClick={addFilter}
              className="w-full flex items-center justify-center gap-1 py-1.5 text-[10px] text-zinc-500 hover:text-zinc-300 border border-dashed border-zinc-700 rounded transition-colors"
            >
              <Plus className="w-3 h-3" /> Ajouter un filtre
            </button>
          </PanelSection>
        </>
      )}
    </>
  )
}
