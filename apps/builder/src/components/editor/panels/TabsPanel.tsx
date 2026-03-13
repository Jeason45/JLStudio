'use client'
import { useEditorStore } from '@/store/editorStore'
import { PanelSection } from '../PanelSection'
import { FieldText, FieldTextarea, FieldSelect } from '../fields'
import { Plus, Trash2 } from 'lucide-react'

interface TabsPanelProps {
  sectionId: string
}

interface TabItem {
  id: string
  label: string
  content: string
  image?: string
}

export function TabsPanel({ sectionId }: TabsPanelProps) {
  const { siteConfig, updateSection } = useEditorStore()
  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  const items: TabItem[] = section?.content?.items ?? []

  const addItem = () => {
    const newItem: TabItem = { id: `tab-${Date.now()}`, label: 'Nouvel onglet', content: 'Contenu de l\'onglet...', image: '' }
    updateSection(sectionId, { content: { ...section?.content, items: [...items, newItem] } })
  }

  const removeItem = (id: string) => {
    updateSection(sectionId, { content: { ...section?.content, items: items.filter(i => i.id !== id) } })
  }

  const updateItem = (id: string, field: keyof TabItem, value: string) => {
    updateSection(sectionId, {
      content: { ...section?.content, items: items.map(i => i.id === id ? { ...i, [field]: value } : i) },
    })
  }

  return (
    <>
      <PanelSection title="Variante">
        <FieldSelect
          sectionId={sectionId}
          label="Univers & Layout"
          variantField
          options={[
            { value: 'startup-horizontal', label: 'Startup — Horizontal' },
            { value: 'startup-vertical', label: 'Startup — Vertical' },
            { value: 'corporate-horizontal', label: 'Corporate — Horizontal' },
            { value: 'corporate-vertical', label: 'Corporate — Vertical' },
            { value: 'luxe-horizontal', label: 'Luxe — Horizontal' },
            { value: 'luxe-vertical', label: 'Luxe — Vertical' },
            { value: 'creative-horizontal', label: 'Creatif — Horizontal' },
            { value: 'creative-vertical', label: 'Creatif — Vertical' },
            { value: 'ecommerce-horizontal', label: 'E-commerce — Horizontal' },
            { value: 'ecommerce-vertical', label: 'E-commerce — Vertical' },
            { value: 'glass-horizontal', label: 'Glass — Horizontal' },
            { value: 'glass-vertical', label: 'Glass — Vertical' },
          ]}
        />
        <FieldSelect
          sectionId={sectionId}
          label="Orientation"
          contentPath="orientation"
          options={[
            { value: 'horizontal', label: 'Horizontal' },
            { value: 'vertical', label: 'Vertical' },
          ]}
        />
      </PanelSection>

      <PanelSection title="Contenu">
        <FieldText sectionId={sectionId} label="Badge / Eyebrow" contentPath="eyebrow" placeholder="Fonctionnalites" />
        <FieldText sectionId={sectionId} label="Titre" contentPath="title" placeholder="Titre des onglets" required />
        <FieldTextarea sectionId={sectionId} label="Sous-titre" contentPath="subtitle" placeholder="Description..." rows={2} />
      </PanelSection>

      <PanelSection title={`Onglets (${items.length})`}>
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
                <label className="text-xs text-zinc-500 block mb-1">Label</label>
                <input value={item.label} onChange={e => updateItem(item.id, 'label', e.target.value)} className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue" />
              </div>
              <div>
                <label className="text-xs text-zinc-500 block mb-1">Contenu</label>
                <textarea value={item.content} onChange={e => updateItem(item.id, 'content', e.target.value)} rows={3} className="w-full bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-wf-blue resize-none" />
              </div>
              <div>
                <label className="text-xs text-zinc-500 block mb-1">Image (URL)</label>
                <input value={item.image ?? ''} onChange={e => updateItem(item.id, 'image', e.target.value)} placeholder="https://..." className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue" />
              </div>
            </div>
          ))}
          <button onClick={addItem} className="w-full flex items-center justify-center gap-2 py-2 border border-dashed border-zinc-700 rounded-lg text-xs text-zinc-500 hover:text-wf-blue hover:border-wf-blue/80 transition-colors">
            <Plus className="w-3.5 h-3.5" /> Ajouter un onglet
          </button>
        </div>
      </PanelSection>
    </>
  )
}
