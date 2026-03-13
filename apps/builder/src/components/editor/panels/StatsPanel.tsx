'use client'
import { useEditorStore } from '@/store/editorStore'
import { PanelSection } from '../PanelSection'
import { FieldText, FieldSelect } from '../fields'
import { Plus, Trash2 } from 'lucide-react'
import type { StatItem } from '@/types/sections'

interface StatsPanelProps {
  sectionId: string
}

export function StatsPanel({ sectionId }: StatsPanelProps) {
  const { siteConfig, updateSection } = useEditorStore()
  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  const items: StatItem[] = section?.content?.items ?? []

  const addItem = () => {
    updateSection(sectionId, {
      content: {
        ...section?.content,
        items: [...items, { id: `stat-${Date.now()}`, value: '0', label: 'Metrique', description: '' }]
      }
    })
  }

  const removeItem = (id: string) => {
    updateSection(sectionId, {
      content: { ...section?.content, items: items.filter(i => i.id !== id) }
    })
  }

  const updateItem = (id: string, field: keyof StatItem, value: string) => {
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
            { value: 'startup-simple', label: 'Startup — Simple' },
            { value: 'startup-cards', label: 'Startup — Cards' },
            { value: 'startup-highlight', label: 'Startup — Highlight' },
            { value: 'corporate-simple', label: 'Corporate — Simple' },
            { value: 'corporate-cards', label: 'Corporate — Cards' },
            { value: 'corporate-highlight', label: 'Corporate — Highlight' },
            { value: 'luxe-simple', label: 'Luxe — Simple' },
            { value: 'luxe-cards', label: 'Luxe — Cards' },
            { value: 'luxe-highlight', label: 'Luxe — Highlight' },
            { value: 'creative-simple', label: 'Créatif — Simple' },
            { value: 'creative-cards', label: 'Créatif — Cards' },
            { value: 'creative-highlight', label: 'Créatif — Highlight' },
            { value: 'ecommerce-simple', label: 'E-commerce — Simple' },
            { value: 'ecommerce-cards', label: 'E-commerce — Cards' },
            { value: 'ecommerce-highlight', label: 'E-commerce — Highlight' },
            { value: 'glass-simple', label: 'Glass — Simple' },
            { value: 'glass-cards', label: 'Glass — Cards' },
            { value: 'glass-highlight', label: 'Glass — Highlight' },
            { value: 'review-stars', label: 'Avis / Stars' },
          ]}
        />
      </PanelSection>

      <PanelSection title="En-tete">
        <FieldText sectionId={sectionId} label="Eyebrow" contentPath="eyebrow" placeholder="Nos chiffres" />
        <FieldText sectionId={sectionId} label="Titre" contentPath="title" placeholder="Des resultats concrets" />
      </PanelSection>

      <PanelSection title={`Statistiques (${items.length})`}>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={item.id} className="bg-zinc-800/50 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-zinc-500">Stat #{index + 1}</span>
                <button onClick={() => removeItem(item.id)} className="text-zinc-600 hover:text-red-400">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-zinc-500 block mb-1">Valeur</label>
                  <input
                    value={item.value}
                    onChange={e => updateItem(item.id, 'value', e.target.value)}
                    placeholder="10K+"
                    className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-500 block mb-1">Label</label>
                  <input
                    value={item.label}
                    onChange={e => updateItem(item.id, 'label', e.target.value)}
                    placeholder="Sites crees"
                    className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-zinc-500 block mb-1">Description</label>
                <input
                  value={item.description ?? ''}
                  onChange={e => updateItem(item.id, 'description', e.target.value)}
                  placeholder="Detail optionnel"
                  className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                />
              </div>
            </div>
          ))}
          <button
            onClick={addItem}
            className="w-full flex items-center justify-center gap-2 py-2 border border-dashed border-zinc-700 rounded-lg text-xs text-zinc-500 hover:text-wf-blue hover:border-wf-blue/80 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Ajouter une statistique
          </button>
        </div>
      </PanelSection>
    </>
  )
}
