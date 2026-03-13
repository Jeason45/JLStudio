'use client'
import { useEditorStore } from '@/store/editorStore'
import { PanelSection } from '../PanelSection'
import { FieldText, FieldTextarea, FieldSelect, FieldToggle } from '../fields'
import { Plus, Trash2 } from 'lucide-react'

interface ComparisonPanelProps {
  sectionId: string
}

interface ComparisonFeature {
  id: string
  name: string
  values: string[]
}

export function ComparisonPanel({ sectionId }: ComparisonPanelProps) {
  const { siteConfig, updateSection } = useEditorStore()
  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  const columns: string[] = section?.content?.columns ?? []
  const features: ComparisonFeature[] = section?.content?.features ?? []

  const updateColumn = (index: number, value: string) => {
    const newColumns = [...columns]
    newColumns[index] = value
    updateSection(sectionId, {
      content: { ...section?.content, columns: newColumns }
    })
  }

  const addFeature = () => {
    const newFeature: ComparisonFeature = {
      id: `feat-${Date.now()}`,
      name: 'Fonctionnalite',
      values: columns.map(() => ''),
    }
    updateSection(sectionId, {
      content: { ...section?.content, features: [...features, newFeature] }
    })
  }

  const removeFeature = (id: string) => {
    updateSection(sectionId, {
      content: { ...section?.content, features: features.filter(f => f.id !== id) }
    })
  }

  const updateFeatureName = (id: string, value: string) => {
    updateSection(sectionId, {
      content: {
        ...section?.content,
        features: features.map(f => f.id === id ? { ...f, name: value } : f)
      }
    })
  }

  const updateFeatureValue = (id: string, colIndex: number, value: string) => {
    updateSection(sectionId, {
      content: {
        ...section?.content,
        features: features.map(f => {
          if (f.id !== id) return f
          const newValues = [...f.values]
          newValues[colIndex] = value
          return { ...f, values: newValues }
        })
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
            { value: 'startup-table', label: 'Startup — Tableau' },
            { value: 'startup-cards', label: 'Startup — Cards' },
            { value: 'corporate-table', label: 'Corporate — Tableau' },
            { value: 'corporate-cards', label: 'Corporate — Cards' },
            { value: 'luxe-table', label: 'Luxe — Tableau' },
            { value: 'luxe-cards', label: 'Luxe — Cards' },
            { value: 'creative-table', label: 'Créatif — Tableau' },
            { value: 'creative-cards', label: 'Créatif — Cards' },
            { value: 'ecommerce-table', label: 'E-commerce — Tableau' },
            { value: 'ecommerce-cards', label: 'E-commerce — Cards' },
            { value: 'glass-table', label: 'Glass — Tableau' },
            { value: 'glass-cards', label: 'Glass — Cards' },
          ]}
        />
      </PanelSection>

      <PanelSection title="Contenu">
        <FieldText sectionId={sectionId} label="Titre" contentPath="title" placeholder="Comparaison" required />
      </PanelSection>

      <PanelSection title="Colonnes">
        <div className="space-y-2">
          {columns.map((col, index) => (
            <div key={index}>
              <label className="text-xs text-zinc-500 block mb-1">Colonne {index + 1}</label>
              <input
                value={col}
                onChange={e => updateColumn(index, e.target.value)}
                className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
              />
            </div>
          ))}
        </div>
      </PanelSection>

      <PanelSection title={`Caracteristiques (${features.length})`}>
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={feature.id} className="bg-zinc-800/50 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-zinc-500 font-medium">#{index + 1}</span>
                <button
                  onClick={() => removeFeature(feature.id)}
                  className="text-zinc-600 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <div>
                <label className="text-xs text-zinc-500 block mb-1">Nom</label>
                <input
                  value={feature.name}
                  onChange={e => updateFeatureName(feature.id, e.target.value)}
                  className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                />
              </div>
              {columns.map((col, colIndex) => (
                <div key={colIndex}>
                  <label className="text-xs text-zinc-500 block mb-1">{col || `Colonne ${colIndex + 1}`}</label>
                  <input
                    value={feature.values[colIndex] ?? ''}
                    onChange={e => updateFeatureValue(feature.id, colIndex, e.target.value)}
                    className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                  />
                </div>
              ))}
            </div>
          ))}
          <button
            onClick={addFeature}
            className="w-full flex items-center justify-center gap-2 py-2 border border-dashed border-zinc-700 rounded-lg text-xs text-zinc-500 hover:text-wf-blue hover:border-wf-blue/80 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Ajouter une caracteristique
          </button>
        </div>
      </PanelSection>
    </>
  )
}
