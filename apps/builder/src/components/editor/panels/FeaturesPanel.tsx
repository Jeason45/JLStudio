'use client'
import { useEditorStore } from '@/store/editorStore'
import { PanelSection } from '../PanelSection'
import { FieldText, FieldTextarea, FieldSelect, FieldIcon } from '../fields'
import { Plus, Trash2 } from 'lucide-react'
import type { FeatureItem } from '@/types/sections'

interface FeaturesPanelProps {
  sectionId: string
}

export function FeaturesPanel({ sectionId }: FeaturesPanelProps) {
  const { siteConfig, updateSection } = useEditorStore()
  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  const items: FeatureItem[] = section?.content?.items ?? []

  const addItem = () => {
    const newItem: FeatureItem = {
      id: `feat-${Date.now()}`,
      icon: 'sparkles',
      title: 'Nouvelle fonctionnalite',
      description: 'Description de cette fonctionnalite.',
    }
    updateSection(sectionId, {
      content: { ...section?.content, items: [...items, newItem] }
    })
  }

  const removeItem = (id: string) => {
    updateSection(sectionId, {
      content: { ...section?.content, items: items.filter(i => i.id !== id) }
    })
  }

  const updateItem = (id: string, field: keyof FeatureItem, value: string) => {
    updateSection(sectionId, {
      content: {
        ...section?.content,
        items: items.map(i => i.id === id ? { ...i, [field]: value } : i)
      }
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
            { value: 'startup-grid', label: 'Startup — Grille' },
            { value: 'startup-bento', label: 'Startup — Bento' },
            { value: 'startup-list', label: 'Startup — Liste' },
            { value: 'corporate-grid', label: 'Corporate — Grille' },
            { value: 'corporate-bento', label: 'Corporate — Bento' },
            { value: 'corporate-list', label: 'Corporate — Liste' },
            { value: 'luxe-grid', label: 'Luxe — Grille' },
            { value: 'luxe-bento', label: 'Luxe — Bento' },
            { value: 'luxe-list', label: 'Luxe — Liste' },
            { value: 'creative-grid', label: 'Créatif — Grille' },
            { value: 'creative-bento', label: 'Créatif — Bento' },
            { value: 'creative-list', label: 'Créatif — Liste' },
            { value: 'ecommerce-grid', label: 'E-commerce — Grille' },
            { value: 'ecommerce-bento', label: 'E-commerce — Bento' },
            { value: 'ecommerce-list', label: 'E-commerce — Liste' },
            { value: 'glass-grid', label: 'Glass — Grille' },
            { value: 'glass-bento', label: 'Glass — Bento' },
            { value: 'glass-list', label: 'Glass — Liste' },
          ]}
        />
      </PanelSection>

      <PanelSection title="En-tete">
        <FieldText sectionId={sectionId} label="Eyebrow" contentPath="eyebrow" placeholder="Fonctionnalites" />
        <FieldText sectionId={sectionId} label="Titre" contentPath="title" placeholder="Titre de la section" required />
        <FieldTextarea sectionId={sectionId} label="Sous-titre" contentPath="subtitle" placeholder="Description..." rows={2} />
      </PanelSection>

      <PanelSection title={`Elements (${items.length})`}>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={item.id} className="bg-zinc-800/50 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-zinc-500 font-medium">#{index + 1}</span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-zinc-600 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <FieldIcon
                sectionId={sectionId}
                label="Icone"
                value={item.icon}
                onChange={v => updateItem(item.id, 'icon', v)}
              />
              <div>
                <label className="text-xs text-zinc-500 block mb-1">Titre</label>
                <input
                  value={item.title}
                  onChange={e => updateItem(item.id, 'title', e.target.value)}
                  className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-500 block mb-1">Description</label>
                <textarea
                  value={item.description}
                  onChange={e => updateItem(item.id, 'description', e.target.value)}
                  rows={2}
                  className="w-full bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-wf-blue resize-none"
                />
              </div>
            </div>
          ))}
          <button
            onClick={addItem}
            className="w-full flex items-center justify-center gap-2 py-2 border border-dashed border-zinc-700 rounded-lg text-xs text-zinc-500 hover:text-wf-blue hover:border-wf-blue/80 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Ajouter un element
          </button>
        </div>
      </PanelSection>
    </>
  )
}
