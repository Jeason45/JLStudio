'use client'
import { useState, useEffect, useRef } from 'react'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'
import { useEditorStore } from '@/store/editorStore'
import type { CmsFieldDef, CmsItem } from '@/types/cms'

const INPUT = 'w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-600'
const LBL = 'text-[10px] text-zinc-500 mb-0.5 block'

interface CmsFieldRendererProps {
  field: CmsFieldDef
  value: unknown
  onChange: (value: unknown) => void
}

/** Image upload helper */
function ImageUploadField({ value, onChange, label, required, helpText }: {
  value: string; onChange: (url: string) => void; label: string; required?: boolean; helpText?: string
}) {
  const { siteConfig } = useEditorStore()
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      if (siteConfig?.id) formData.append('siteId', siteConfig.id)
      const res = await fetch('/api/media', { method: 'POST', body: formData })
      if (res.ok) {
        const media = await res.json()
        onChange(media.url)
      }
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleUpload(file)
  }

  return (
    <div>
      <label className={LBL}>{label}{required && ' *'}</label>
      {value ? (
        <div className="relative group rounded overflow-hidden border border-zinc-700 bg-zinc-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="w-full h-28 object-cover" />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              onClick={() => fileRef.current?.click()}
              className="px-2 py-1 bg-zinc-700 text-white text-[10px] rounded hover:bg-zinc-600"
            >
              Changer
            </button>
            <button
              onClick={() => onChange('')}
              className="p-1 bg-red-600/80 text-white rounded hover:bg-red-500"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center gap-1.5 py-5 border border-dashed rounded cursor-pointer transition-colors ${
            dragOver ? 'border-wf-blue bg-wf-blue/10' : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-500'
          }`}
        >
          {uploading ? (
            <Loader2 className="w-5 h-5 text-zinc-400 animate-spin" />
          ) : (
            <>
              <ImageIcon className="w-5 h-5 text-zinc-500" />
              <span className="text-[10px] text-zinc-500">Cliquer ou glisser une image</span>
            </>
          )}
        </div>
      )}
      {/* URL fallback input */}
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={helpText || 'Ou coller une URL...'}
        className={`${INPUT} mt-1`}
      />
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => {
        const f = e.target.files?.[0]
        if (f) handleUpload(f)
        e.target.value = ''
      }} />
    </div>
  )
}

/** Multi-image upload with grid preview */
function MultiImageUploadField({ value, onChange, label, required, helpText }: {
  value: string[]; onChange: (urls: string[]) => void; label: string; required?: boolean; helpText?: string
}) {
  const { siteConfig } = useEditorStore()
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const handleUpload = async (files: FileList | File[]) => {
    const imageFiles = Array.from(files).filter(f => f.type.startsWith('image/'))
    if (!imageFiles.length) return
    setUploading(true)
    try {
      const urls: string[] = []
      for (const file of imageFiles) {
        const formData = new FormData()
        formData.append('file', file)
        if (siteConfig?.id) formData.append('siteId', siteConfig.id)
        const res = await fetch('/api/media', { method: 'POST', body: formData })
        if (res.ok) {
          const media = await res.json()
          urls.push(media.url)
        }
      }
      onChange([...value, ...urls])
    } finally {
      setUploading(false)
    }
  }

  const removeAt = (idx: number) => onChange(value.filter((_, i) => i !== idx))

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files?.length) handleUpload(e.dataTransfer.files)
  }

  return (
    <div>
      <label className={LBL}>{label}{required && ' *'} <span className="text-zinc-600">({value.length})</span></label>

      {/* Grid of existing images */}
      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-1 mb-1.5">
          {value.map((url, i) => (
            <div key={i} className="relative group aspect-square rounded overflow-hidden border border-zinc-700 bg-zinc-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="w-full h-full object-cover" />
              <button
                onClick={() => removeAt(i)}
                className="absolute top-0.5 right-0.5 p-0.5 bg-black/70 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Drop zone */}
      <div
        onClick={() => fileRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`flex items-center justify-center gap-1.5 py-3 border border-dashed rounded cursor-pointer transition-colors ${
          dragOver ? 'border-wf-blue bg-wf-blue/10' : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-500'
        }`}
      >
        {uploading ? (
          <Loader2 className="w-4 h-4 text-zinc-400 animate-spin" />
        ) : (
          <>
            <Upload className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-[10px] text-zinc-500">Ajouter des images</span>
          </>
        )}
      </div>

      <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={e => {
        if (e.target.files?.length) handleUpload(e.target.files)
        e.target.value = ''
      }} />
      {helpText && <span className="text-[9px] text-zinc-600 mt-0.5 block">{helpText}</span>}
    </div>
  )
}

/** Internal hook to fetch items from a referenced collection */
function useReferencedItems(collectionId: string | undefined) {
  const [items, setItems] = useState<CmsItem[]>([])
  useEffect(() => {
    if (!collectionId) return
    fetch(`/api/cms/collections/${collectionId}/items?limit=100&status=PUBLISHED`)
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.data) setItems(d.data) })
      .catch(() => {})
  }, [collectionId])
  return items
}

export function CmsFieldRenderer({ field, value, onChange }: CmsFieldRendererProps) {
  const strVal = value != null ? String(value) : ''
  const refItems = useReferencedItems(
    (field.type === 'reference' || field.type === 'multi-reference') ? field.referenceCollectionId : undefined
  )

  switch (field.type) {
    case 'plain-text':
      return (
        <div>
          <label className={LBL}>{field.name}{field.required && ' *'}</label>
          <input value={strVal} onChange={e => onChange(e.target.value)} placeholder={field.helpText} className={INPUT} />
        </div>
      )

    case 'rich-text':
      return (
        <div>
          <label className={LBL}>{field.name}{field.required && ' *'}</label>
          <textarea
            value={strVal}
            onChange={e => onChange(e.target.value)}
            placeholder={field.helpText}
            rows={4}
            className="w-full bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-600 resize-y"
          />
        </div>
      )

    case 'image':
      return (
        <ImageUploadField
          value={strVal}
          onChange={v => onChange(v)}
          label={field.name}
          required={field.required}
          helpText={field.helpText}
        />
      )

    case 'video':
    case 'link':
      return (
        <div>
          <label className={LBL}>{field.name}{field.required && ' *'}</label>
          <input value={strVal} onChange={e => onChange(e.target.value)} placeholder={`URL ${field.type}...`} className={INPUT} />
        </div>
      )

    case 'multi-image':
      return (
        <MultiImageUploadField
          value={Array.isArray(value) ? (value as string[]) : strVal ? strVal.split('\n').filter(Boolean) : []}
          onChange={v => onChange(v)}
          label={field.name}
          required={field.required}
          helpText={field.helpText}
        />
      )

    case 'email':
    case 'phone':
      return (
        <div>
          <label className={LBL}>{field.name}{field.required && ' *'}</label>
          <input type={field.type === 'email' ? 'email' : 'tel'} value={strVal} onChange={e => onChange(e.target.value)} placeholder={field.helpText} className={INPUT} />
        </div>
      )

    case 'number':
      return (
        <div>
          <label className={LBL}>{field.name}{field.required && ' *'}</label>
          <input type="number" value={strVal} onChange={e => onChange(Number(e.target.value))} className={INPUT} />
        </div>
      )

    case 'boolean':
      return (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={!!value}
            onChange={e => onChange(e.target.checked)}
            className="rounded border-zinc-600"
          />
          <label className="text-[11px] text-zinc-300">{field.name}</label>
        </div>
      )

    case 'date':
    case 'datetime':
      return (
        <div>
          <label className={LBL}>{field.name}{field.required && ' *'}</label>
          <input
            type={field.type === 'datetime' ? 'datetime-local' : 'date'}
            value={strVal}
            onChange={e => onChange(e.target.value)}
            className={INPUT}
          />
        </div>
      )

    case 'color':
      return (
        <div>
          <label className={LBL}>{field.name}{field.required && ' *'}</label>
          <div className="flex gap-2 items-center">
            <input type="color" value={strVal || '#000000'} onChange={e => onChange(e.target.value)} className="w-7 h-7 rounded cursor-pointer border border-zinc-700" />
            <input value={strVal} onChange={e => onChange(e.target.value)} placeholder="#000000" className={INPUT} />
          </div>
        </div>
      )

    case 'option':
      return (
        <div>
          <label className={LBL}>{field.name}{field.required && ' *'}</label>
          <select
            value={strVal}
            onChange={e => onChange(e.target.value)}
            className="w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue cursor-pointer"
          >
            <option value="">Choisir...</option>
            {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      )

    case 'multi-option': {
      const selected = Array.isArray(value) ? (value as string[]) : strVal ? strVal.split(',').filter(Boolean) : []
      const toggleOpt = (opt: string) => {
        const next = selected.includes(opt) ? selected.filter(x => x !== opt) : [...selected, opt]
        onChange(next)
      }
      return (
        <div>
          <label className={LBL}>{field.name}{field.required && ' *'}</label>
          <div className="bg-zinc-800 border border-zinc-700 rounded p-1.5 space-y-0.5 max-h-32 overflow-y-auto">
            {field.options?.map(opt => (
              <label key={opt} className="flex items-center gap-1.5 px-1.5 py-1 rounded hover:bg-zinc-700/50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selected.includes(opt)}
                  onChange={() => toggleOpt(opt)}
                  className="rounded border-zinc-600 w-3 h-3"
                />
                <span className="text-[11px] text-zinc-300">{opt}</span>
              </label>
            ))}
          </div>
          {selected.length > 0 && (
            <span className="text-[9px] text-zinc-600 mt-0.5 block">{selected.join(', ')}</span>
          )}
        </div>
      )
    }

    case 'reference':
      return (
        <div>
          <label className={LBL}>{field.name} (ref){field.required && ' *'}</label>
          {refItems.length > 0 ? (
            <select
              value={strVal}
              onChange={e => onChange(e.target.value)}
              className="w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue cursor-pointer"
            >
              <option value="">Choisir...</option>
              {refItems.map(item => (
                <option key={item.id} value={item.id}>
                  {String(Object.values(item.data)[0] ?? item.slug)}
                </option>
              ))}
            </select>
          ) : (
            <input value={strVal} onChange={e => onChange(e.target.value)} placeholder="ID de l'item reference..." className={INPUT} />
          )}
        </div>
      )

    case 'multi-reference': {
      const selectedIds = Array.isArray(value) ? (value as string[]) : []
      const toggleId = (id: string) => {
        const next = selectedIds.includes(id)
          ? selectedIds.filter(x => x !== id)
          : [...selectedIds, id]
        onChange(next)
      }
      return (
        <div>
          <label className={LBL}>{field.name} (multi-ref){field.required && ' *'}</label>
          {refItems.length > 0 ? (
            <div className="max-h-32 overflow-y-auto bg-zinc-800 border border-zinc-700 rounded p-1 space-y-0.5">
              {refItems.map(item => {
                const label = String(Object.values(item.data)[0] ?? item.slug)
                const checked = selectedIds.includes(item.id)
                return (
                  <label key={item.id} className="flex items-center gap-1.5 px-1.5 py-1 rounded hover:bg-zinc-700/50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleId(item.id)}
                      className="rounded border-zinc-600 w-3 h-3"
                    />
                    <span className="text-[11px] text-zinc-300 truncate">{label}</span>
                  </label>
                )
              })}
            </div>
          ) : (
            <textarea
              value={selectedIds.join('\n')}
              onChange={e => onChange(e.target.value.split('\n').filter(Boolean))}
              placeholder="Un ID par ligne..."
              rows={3}
              className="w-full bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-600 resize-y"
            />
          )}
          {selectedIds.length > 0 && (
            <span className="text-[9px] text-zinc-600 mt-0.5 block">{selectedIds.length} selectionne(s)</span>
          )}
        </div>
      )
    }

    default:
      return (
        <div>
          <label className={LBL}>{field.name}</label>
          <input value={strVal} onChange={e => onChange(e.target.value)} className={INPUT} />
        </div>
      )
  }
}
