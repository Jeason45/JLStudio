'use client'
import { useEditorStore } from '@/store/editorStore'
import { PanelSection } from '../PanelSection'
import { FieldText, FieldTextarea, FieldSelect, FieldToggle, FieldIcon } from '../fields'
import { Plus, Trash2 } from 'lucide-react'

interface StepsPanelProps {
  sectionId: string
}

interface StepItem {
  id: string
  number: string
  title: string
  description: string
  icon?: string
}

export function StepsPanel({ sectionId }: StepsPanelProps) {
  const { siteConfig, updateSection } = useEditorStore()
  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  const items: StepItem[] = section?.content?.items ?? []

  const addItem = () => {
    updateSection(sectionId, {
      content: {
        ...section?.content,
        items: [...items, { id: `step-${Date.now()}`, number: String(items.length + 1).padStart(2, '0'), title: 'Etape', description: '', icon: 'pin' }]
      }
    })
  }

  const removeItem = (id: string) => {
    updateSection(sectionId, {
      content: { ...section?.content, items: items.filter(i => i.id !== id) }
    })
  }

  const updateItem = (id: string, field: keyof StepItem, value: string) => {
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
            { value: 'startup-horizontal', label: 'Startup — Horizontal' },
            { value: 'startup-vertical', label: 'Startup — Vertical' },
            { value: 'corporate-horizontal', label: 'Corporate — Horizontal' },
            { value: 'corporate-vertical', label: 'Corporate — Vertical' },
            { value: 'luxe-horizontal', label: 'Luxe — Horizontal' },
            { value: 'luxe-vertical', label: 'Luxe — Vertical' },
            { value: 'creative-horizontal', label: 'Créatif — Horizontal' },
            { value: 'creative-vertical', label: 'Créatif — Vertical' },
            { value: 'ecommerce-horizontal', label: 'E-commerce — Horizontal' },
            { value: 'ecommerce-vertical', label: 'E-commerce — Vertical' },
            { value: 'glass-horizontal', label: 'Glass — Horizontal' },
            { value: 'glass-vertical', label: 'Glass — Vertical' },
          ]}
        />
      </PanelSection>

      <PanelSection title="En-tete">
        <FieldText sectionId={sectionId} label="Eyebrow" contentPath="eyebrow" placeholder="Comment ca marche" />
        <FieldText sectionId={sectionId} label="Titre" contentPath="title" placeholder="Les etapes" required />
        <FieldTextarea sectionId={sectionId} label="Sous-titre" contentPath="subtitle" placeholder="Un processus simple et efficace" />
      </PanelSection>

      <PanelSection title={`Etapes (${items.length})`}>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={item.id} className="bg-zinc-800/50 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-zinc-500">Etape #{index + 1}</span>
                <button onClick={() => removeItem(item.id)} className="text-zinc-600 hover:text-red-400">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-zinc-500 block mb-1">Numero</label>
                  <input
                    value={item.number}
                    onChange={e => updateItem(item.id, 'number', e.target.value)}
                    placeholder="01"
                    className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                  />
                </div>
                <FieldIcon
                  sectionId={sectionId}
                  label="Icone"
                  value={item.icon ?? ''}
                  onChange={v => updateItem(item.id, 'icon', v)}
                />
              </div>
              <div>
                <label className="text-xs text-zinc-500 block mb-1">Titre</label>
                <input
                  value={item.title}
                  onChange={e => updateItem(item.id, 'title', e.target.value)}
                  placeholder="Titre de l'etape"
                  className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-500 block mb-1">Description</label>
                <textarea
                  value={item.description}
                  onChange={e => updateItem(item.id, 'description', e.target.value)}
                  placeholder="Description de l'etape"
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
            Ajouter une etape
          </button>
        </div>
      </PanelSection>
    </>
  )
}
