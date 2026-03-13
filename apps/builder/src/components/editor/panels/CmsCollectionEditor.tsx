'use client'
import { useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ArrowLeft, Plus, Trash2, GripVertical } from 'lucide-react'
import type { CmsCollection, CmsFieldDef, CmsFieldType, CmsCollectionSettings } from '@/types/cms'
import { generateSlug } from '@/lib/cmsResolver'

const INPUT = 'w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-600'
const SELECT = 'w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue cursor-pointer'
const LBL = 'text-[10px] text-zinc-500'

const FIELD_TYPES: { value: CmsFieldType; label: string }[] = [
  { value: 'plain-text', label: 'Texte' },
  { value: 'rich-text', label: 'Texte riche' },
  { value: 'image', label: 'Image' },
  { value: 'multi-image', label: 'Multi-images' },
  { value: 'video', label: 'Video' },
  { value: 'link', label: 'Lien' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Telephone' },
  { value: 'number', label: 'Nombre' },
  { value: 'boolean', label: 'Booleen' },
  { value: 'date', label: 'Date' },
  { value: 'datetime', label: 'Date & heure' },
  { value: 'color', label: 'Couleur' },
  { value: 'option', label: 'Option' },
  { value: 'reference', label: 'Reference' },
  { value: 'multi-reference', label: 'Multi-reference' },
]

interface CmsCollectionEditorProps {
  collection: CmsCollection
  onUpdate: (updates: Partial<Pick<CmsCollection, 'name' | 'slug'>> & { fields?: CmsFieldDef[]; settings?: CmsCollectionSettings }) => Promise<void>
  onBack: () => void
}

export function CmsCollectionEditor({ collection, onUpdate, onBack }: CmsCollectionEditorProps) {
  const [name, setName] = useState(collection.name)
  const [slug, setSlug] = useState(collection.slug)
  const [fields, setFields] = useState<CmsFieldDef[]>(collection.fields)
  const [addingField, setAddingField] = useState(false)
  const [newFieldName, setNewFieldName] = useState('')
  const [newFieldType, setNewFieldType] = useState<CmsFieldType>('plain-text')

  const save = async (updatedFields?: CmsFieldDef[]) => {
    await onUpdate({ name, slug, fields: updatedFields ?? fields })
  }

  const addField = () => {
    if (!newFieldName.trim()) return
    const field: CmsFieldDef = {
      id: `f-${Date.now()}`,
      slug: generateSlug(newFieldName.trim()),
      name: newFieldName.trim(),
      type: newFieldType,
    }
    const updated = [...fields, field]
    setFields(updated)
    save(updated)
    setNewFieldName('')
    setNewFieldType('plain-text')
    setAddingField(false)
  }

  const removeField = (fieldId: string) => {
    const updated = fields.filter(f => f.id !== fieldId)
    setFields(updated)
    save(updated)
  }

  const updateField = (fieldId: string, updates: Partial<CmsFieldDef>) => {
    const updated = fields.map(f => f.id === fieldId ? { ...f, ...updates } : f)
    setFields(updated)
    save(updated)
  }

  return (
    <>
      {/* Header */}
      <div className="px-2 py-1.5 border-b border-zinc-800 shrink-0 flex items-center gap-2">
        <button onClick={onBack} className="text-zinc-500 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
        <span className="text-[11px] font-semibold text-zinc-200 truncate">Schema : {collection.name}</span>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3 space-y-4">
          {/* Collection info */}
          <div className="space-y-2">
            <div>
              <label className={LBL}>Nom</label>
              <input value={name} onChange={e => setName(e.target.value)} onBlur={() => save()} className={INPUT} />
            </div>
            <div>
              <label className={LBL}>Slug</label>
              <input value={slug} onChange={e => setSlug(e.target.value)} onBlur={() => save()} className={INPUT} />
            </div>
          </div>

          {/* Fields */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-zinc-300">Champs ({fields.length})</span>
              <button onClick={() => setAddingField(true)} className="text-zinc-500 hover:text-white">
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1">
              {fields.map(field => (
                <div key={field.id} className="flex items-center gap-1.5 px-2 py-1.5 bg-zinc-800/50 rounded group">
                  <GripVertical className="w-3 h-3 text-zinc-700 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <input
                      value={field.name}
                      onChange={e => updateField(field.id, { name: e.target.value })}
                      className="w-full bg-transparent text-[11px] text-zinc-300 focus:outline-none"
                    />
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[9px] text-zinc-600">{field.slug}</span>
                      <span className="text-[9px] text-purple-400">{FIELD_TYPES.find(t => t.value === field.type)?.label}</span>
                      {field.required && <span className="text-[9px] text-amber-400">requis</span>}
                    </div>
                  </div>
                  <label className="flex items-center gap-1 text-[9px] text-zinc-600 opacity-0 group-hover:opacity-100">
                    <input
                      type="checkbox"
                      checked={!!field.required}
                      onChange={e => updateField(field.id, { required: e.target.checked })}
                      className="rounded border-zinc-600 w-3 h-3"
                    />
                    Req.
                  </label>
                  <button
                    onClick={() => removeField(field.id)}
                    className="opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-red-400 shrink-0"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add field form */}
            {addingField && (
              <div className="mt-2 p-2 bg-zinc-800/50 rounded space-y-1.5">
                <input
                  value={newFieldName}
                  onChange={e => setNewFieldName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addField()}
                  placeholder="Nom du champ..."
                  autoFocus
                  className="w-full h-6 bg-zinc-900 border border-zinc-600 text-white text-[10px] rounded px-1.5 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                />
                <select
                  value={newFieldType}
                  onChange={e => setNewFieldType(e.target.value as CmsFieldType)}
                  className={SELECT}
                >
                  {FIELD_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
                <div className="flex gap-1.5">
                  <button onClick={addField} className="flex-1 py-1 bg-wf-blue text-white text-[10px] rounded hover:bg-wf-blue/90">Ajouter</button>
                  <button onClick={() => { setAddingField(false); setNewFieldName('') }} className="flex-1 py-1 bg-zinc-800 text-zinc-400 text-[10px] rounded hover:bg-zinc-700">Annuler</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </>
  )
}
