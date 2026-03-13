'use client'
import { useEditorStore } from '@/store/editorStore'
import { PanelSection } from '../PanelSection'
import { FieldText, FieldTextarea, FieldSelect, FieldToggle } from '../fields'
import { Plus, Trash2 } from 'lucide-react'

interface ProductGridPanelProps {
  sectionId: string
}

interface ProductItem {
  id: string
  name: string
  price: string
  originalPrice: string
  badge: string
  category: string
}

export function ProductGridPanel({ sectionId }: ProductGridPanelProps) {
  const { siteConfig, updateSection } = useEditorStore()
  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  const items: ProductItem[] = section?.content?.items ?? []

  const addItem = () => {
    const newItem: ProductItem = {
      id: `prod-${Date.now()}`,
      name: 'Produit',
      price: '0€',
      originalPrice: '',
      badge: '',
      category: '',
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

  const updateItem = (id: string, field: keyof ProductItem, value: string) => {
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
            { value: 'startup-list', label: 'Startup — Liste' },
            { value: 'corporate-grid', label: 'Corporate — Grille' },
            { value: 'corporate-list', label: 'Corporate — Liste' },
            { value: 'luxe-grid', label: 'Luxe — Grille' },
            { value: 'luxe-list', label: 'Luxe — Liste' },
            { value: 'creative-grid', label: 'Créatif — Grille' },
            { value: 'creative-list', label: 'Créatif — Liste' },
            { value: 'ecommerce-grid', label: 'E-commerce — Grille' },
            { value: 'ecommerce-list', label: 'E-commerce — Liste' },
            { value: 'glass-grid', label: 'Glass — Grille' },
            { value: 'glass-list', label: 'Glass — Liste' },
          ]}
        />
      </PanelSection>

      <PanelSection title="En-tete">
        <FieldText sectionId={sectionId} label="Eyebrow" contentPath="eyebrow" placeholder="Nos produits" />
        <FieldText sectionId={sectionId} label="Titre" contentPath="title" placeholder="Titre de la section" required />
        <FieldText sectionId={sectionId} label="Bouton CTA" contentPath="ctaLabel" placeholder="Voir tout" />
        <FieldText sectionId={sectionId} label="Lien CTA" contentPath="ctaHref" placeholder="/produits" />
      </PanelSection>

      <PanelSection title={`Produits (${items.length})`}>
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
              <div>
                <label className="text-xs text-zinc-500 block mb-1">Nom</label>
                <input
                  value={item.name}
                  onChange={e => updateItem(item.id, 'name', e.target.value)}
                  className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-zinc-500 block mb-1">Prix</label>
                  <input
                    value={item.price}
                    onChange={e => updateItem(item.id, 'price', e.target.value)}
                    className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-500 block mb-1">Ancien prix</label>
                  <input
                    value={item.originalPrice}
                    onChange={e => updateItem(item.id, 'originalPrice', e.target.value)}
                    placeholder="Optionnel"
                    className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-zinc-500 block mb-1">Badge</label>
                  <input
                    value={item.badge}
                    onChange={e => updateItem(item.id, 'badge', e.target.value)}
                    placeholder="Nouveau, Promo..."
                    className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-500 block mb-1">Categorie</label>
                  <input
                    value={item.category}
                    onChange={e => updateItem(item.id, 'category', e.target.value)}
                    className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={addItem}
            className="w-full flex items-center justify-center gap-2 py-2 border border-dashed border-zinc-700 rounded-lg text-xs text-zinc-500 hover:text-wf-blue hover:border-wf-blue/80 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Ajouter un produit
          </button>
        </div>
      </PanelSection>
    </>
  )
}
