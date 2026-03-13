'use client'
import { useState } from 'react'
import { useCmsItems } from '@/hooks/useCmsItems'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ArrowLeft, Save } from 'lucide-react'
import { CmsFieldRenderer } from '../cms/CmsFieldRenderer'
import type { CmsFieldDef, CmsItem, CmsItemStatus } from '@/types/cms'
import { generateSlug } from '@/lib/cmsResolver'

const SELECT = 'w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue cursor-pointer'
const INPUT = 'w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-600'
const LBL = 'text-[10px] text-zinc-500'

interface CmsItemEditorProps {
  collectionId: string
  fields: CmsFieldDef[]
  item?: CmsItem
  onSave: () => void
  onBack: () => void
}

export function CmsItemEditor({ collectionId, fields, item, onSave, onBack }: CmsItemEditorProps) {
  const { createItem, updateItem } = useCmsItems(collectionId)
  const [data, setData] = useState<Record<string, unknown>>(item?.data ?? {})
  const [slug, setSlug] = useState(item?.slug ?? '')
  const [status, setStatus] = useState<CmsItemStatus>(item?.status ?? 'DRAFT')
  const [scheduledAt, setScheduledAt] = useState(item?.scheduledAt ?? '')
  const [saving, setSaving] = useState(false)

  const setFieldValue = (fieldSlug: string, value: unknown) => {
    setData(prev => ({ ...prev, [fieldSlug]: value }))
  }

  // Auto-generate slug from first plain-text field if slug is empty
  const autoSlug = () => {
    if (slug) return
    const primaryField = fields.find(f => f.type === 'plain-text')
    if (primaryField && data[primaryField.slug]) {
      setSlug(generateSlug(String(data[primaryField.slug])))
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      if (item) {
        await updateItem(item.id, { slug, data, status, scheduledAt: status === 'SCHEDULED' ? scheduledAt || null : null })
      } else {
        const finalSlug = slug || generateSlug(String(Object.values(data)[0] ?? 'item'))
        await createItem(finalSlug, data, status, status === 'SCHEDULED' ? scheduledAt || undefined : undefined)
      }
      onSave()
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      {/* Header */}
      <div className="px-2 py-1.5 border-b border-zinc-800 shrink-0 flex items-center gap-2">
        <button onClick={onBack} className="text-zinc-500 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
        <span className="text-[11px] font-semibold text-zinc-200 truncate flex-1">
          {item ? 'Modifier item' : 'Nouvel item'}
        </span>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-1 px-2 py-1 bg-wf-blue text-white text-[10px] rounded hover:bg-wf-blue/90 disabled:opacity-50"
        >
          <Save className="w-3 h-3" />
          {saving ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3 space-y-3">
          {/* Slug */}
          <div>
            <label className={LBL}>Slug</label>
            <input
              value={slug}
              onChange={e => setSlug(e.target.value)}
              onBlur={autoSlug}
              placeholder="auto-genere..."
              className={INPUT}
            />
          </div>

          {/* Status */}
          <div>
            <label className={LBL}>Statut</label>
            <select value={status} onChange={e => setStatus(e.target.value as CmsItemStatus)} className={SELECT}>
              <option value="DRAFT">Brouillon</option>
              <option value="PUBLISHED">Publie</option>
              <option value="SCHEDULED">Planifie</option>
              <option value="ARCHIVED">Archive</option>
            </select>
          </div>

          {/* Scheduled date */}
          {status === 'SCHEDULED' && (
            <div>
              <label className={LBL}>Date de publication</label>
              <input
                type="datetime-local"
                value={scheduledAt ? scheduledAt.slice(0, 16) : ''}
                onChange={e => setScheduledAt(e.target.value ? new Date(e.target.value).toISOString() : '')}
                className={INPUT}
              />
            </div>
          )}

          {/* Separator */}
          <div className="border-t border-zinc-700/50 pt-3">
            <span className="text-[11px] font-semibold text-zinc-300">Champs</span>
          </div>

          {/* Dynamic fields */}
          {fields.map(field => (
            <CmsFieldRenderer
              key={field.id}
              field={field}
              value={data[field.slug]}
              onChange={val => setFieldValue(field.slug, val)}
            />
          ))}

          {fields.length === 0 && (
            <p className="text-[10px] text-zinc-600 text-center py-4">
              Aucun champ defini. Modifiez le schema de la collection.
            </p>
          )}
        </div>
      </ScrollArea>
    </>
  )
}
