'use client'
import { useEditorStore } from '@/store/editorStore'
import { PanelSection } from '../PanelSection'
import { FieldText, FieldSelect } from '../fields'
import { Plus, Trash2 } from 'lucide-react'

interface LogosPanelProps {
  sectionId: string
}

interface LogoItem {
  id: string
  name: string
  quote?: string
  url?: string
}

export function LogosPanel({ sectionId }: LogosPanelProps) {
  const { siteConfig, updateSection } = useEditorStore()
  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  const items: LogoItem[] = section?.content?.items ?? []

  const addItem = () => {
    updateSection(sectionId, {
      content: {
        ...section?.content,
        items: [...items, { id: `logo-${Date.now()}`, name: 'Logo' }]
      }
    })
  }

  const removeItem = (id: string) => {
    updateSection(sectionId, {
      content: { ...section?.content, items: items.filter(i => i.id !== id) }
    })
  }

  const updateItem = (id: string, field: keyof LogoItem, value: string) => {
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
            { value: 'startup-strip', label: 'Startup — Rangée' },
            { value: 'startup-grid', label: 'Startup — Grille' },
            { value: 'corporate-strip', label: 'Corporate — Rangée' },
            { value: 'corporate-grid', label: 'Corporate — Grille' },
            { value: 'luxe-strip', label: 'Luxe — Rangée' },
            { value: 'luxe-grid', label: 'Luxe — Grille' },
            { value: 'creative-strip', label: 'Créatif — Rangée' },
            { value: 'creative-grid', label: 'Créatif — Grille' },
            { value: 'ecommerce-strip', label: 'E-commerce — Rangée' },
            { value: 'ecommerce-grid', label: 'E-commerce — Grille' },
            { value: 'glass-strip', label: 'Glass — Rangée' },
            { value: 'glass-grid', label: 'Glass — Grille' },
          ]}
        />
      </PanelSection>

      <PanelSection title="Contenu">
        <FieldText sectionId={sectionId} label="Eyebrow" contentPath="eyebrow" placeholder="Ils nous font confiance" />
        <FieldText sectionId={sectionId} label="Titre" contentPath="title" placeholder="Nos partenaires" />
      </PanelSection>

      <PanelSection title={`Logos (${items.length})`}>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={item.id} className="bg-zinc-800/50 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-zinc-500">Logo #{index + 1}</span>
                <button onClick={() => removeItem(item.id)} className="text-zinc-600 hover:text-red-400">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <div>
                <label className="text-xs text-zinc-500 block mb-1">Nom</label>
                <input
                  value={item.name}
                  onChange={e => updateItem(item.id, 'name', e.target.value)}
                  placeholder="Nom du logo"
                  className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-500 block mb-1">Citation (optionnel)</label>
                <input
                  value={item.quote ?? ''}
                  onChange={e => updateItem(item.id, 'quote', e.target.value)}
                  placeholder="Citation presse"
                  className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-500 block mb-1">URL</label>
                <input
                  value={item.url ?? ''}
                  onChange={e => updateItem(item.id, 'url', e.target.value)}
                  placeholder="https://..."
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
            Ajouter un logo
          </button>
        </div>
      </PanelSection>
    </>
  )
}
