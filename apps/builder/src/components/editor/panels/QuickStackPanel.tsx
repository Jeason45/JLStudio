'use client'
import { useEditorStore } from '@/store/editorStore'
import { PanelSection } from '../PanelSection'
import { FieldText, FieldTextarea, FieldSelect } from '../fields'
import { Plus, Trash2 } from 'lucide-react'

interface StackItem {
  id: string
  title?: string
  subtitle?: string
  body?: string
  image?: string
  icon?: string
  badge?: string
  ctaLabel?: string
  ctaHref?: string
}

export function QuickStackPanel({ sectionId }: { sectionId: string }) {
  const { siteConfig, updateSection } = useEditorStore()
  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  const items: StackItem[] = section?.content?.items ?? []

  const addItem = () => {
    const newItem: StackItem = { id: `stack-${Date.now()}`, title: 'Nouvel element', body: 'Description...' }
    updateSection(sectionId, { content: { ...section?.content, items: [...items, newItem] } })
  }

  const removeItem = (id: string) => {
    updateSection(sectionId, { content: { ...section?.content, items: items.filter(i => i.id !== id) } })
  }

  const updateItem = (id: string, field: keyof StackItem, value: string) => {
    updateSection(sectionId, {
      content: { ...section?.content, items: items.map(i => i.id === id ? { ...i, [field]: value } : i) },
    })
  }

  return (
    <>
      <PanelSection title="Variante">
        <FieldSelect sectionId={sectionId} label="Univers" variantField options={[
          { value: 'startup-1', label: 'Startup' }, { value: 'startup-2', label: 'Startup — Alt' },
          { value: 'corporate-1', label: 'Corporate' }, { value: 'corporate-2', label: 'Corporate — Alt' },
          { value: 'luxe-1', label: 'Luxe' }, { value: 'luxe-2', label: 'Luxe — Alt' },
          { value: 'creative-1', label: 'Creatif' }, { value: 'creative-2', label: 'Creatif — Alt' },
          { value: 'ecommerce-1', label: 'E-commerce' }, { value: 'ecommerce-2', label: 'E-commerce — Alt' },
          { value: 'glass-1', label: 'Glass' }, { value: 'glass-2', label: 'Glass — Alt' },
        ]} />
      </PanelSection>

      <PanelSection title="Layout">
        <FieldSelect sectionId={sectionId} label="Disposition" contentPath="layout" options={[
          { value: '2x2', label: '2x2 Grille' },
          { value: '1+2', label: '1 grand + 2 petits' },
          { value: '3x1', label: '3 colonnes' },
          { value: '1+1', label: '2 colonnes egales' },
          { value: 'asymmetric', label: 'Asymetrique' },
          { value: 'masonry', label: 'Masonry' },
        ]} />
      </PanelSection>

      <PanelSection title="Contenu">
        <FieldText sectionId={sectionId} label="Badge / Eyebrow" contentPath="eyebrow" />
        <FieldText sectionId={sectionId} label="Titre" contentPath="title" placeholder="Titre du stack" />
        <FieldTextarea sectionId={sectionId} label="Sous-titre" contentPath="subtitle" rows={2} />
      </PanelSection>

      <PanelSection title={`Elements (${items.length})`}>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={item.id} className="bg-zinc-800/50 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-zinc-500 font-medium">#{index + 1}</span>
                <button onClick={() => removeItem(item.id)} className="text-zinc-600 hover:text-red-400 transition-colors">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <div>
                <label className="text-xs text-zinc-500 block mb-1">Titre</label>
                <input value={item.title ?? ''} onChange={e => updateItem(item.id, 'title', e.target.value)} className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue" />
              </div>
              <div>
                <label className="text-xs text-zinc-500 block mb-1">Corps</label>
                <textarea value={item.body ?? ''} onChange={e => updateItem(item.id, 'body', e.target.value)} rows={2} className="w-full bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-wf-blue resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-zinc-500 block mb-1">Icone</label>
                  <input value={item.icon ?? ''} onChange={e => updateItem(item.id, 'icon', e.target.value)} placeholder="zap" className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue" />
                </div>
                <div>
                  <label className="text-xs text-zinc-500 block mb-1">Badge</label>
                  <input value={item.badge ?? ''} onChange={e => updateItem(item.id, 'badge', e.target.value)} className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue" />
                </div>
              </div>
            </div>
          ))}
          <button onClick={addItem} className="w-full flex items-center justify-center gap-2 py-2 border border-dashed border-zinc-700 rounded-lg text-xs text-zinc-500 hover:text-wf-blue hover:border-wf-blue/80 transition-colors">
            <Plus className="w-3.5 h-3.5" /> Ajouter un element
          </button>
        </div>
      </PanelSection>
    </>
  )
}
