'use client'
import { useEditorStore } from '@/store/editorStore'
import { PanelSection } from '../PanelSection'
import { FieldText, FieldTextarea, FieldSelect, FieldToggle } from '../fields'
import { Plus, Trash2 } from 'lucide-react'

interface AccordionPanelProps {
  sectionId: string
}

interface FAQItem {
  id: string
  question: string
  answer: string
}

export function AccordionPanel({ sectionId }: AccordionPanelProps) {
  const { siteConfig, updateSection } = useEditorStore()
  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  const items: FAQItem[] = section?.content?.items ?? []

  const addItem = () => {
    const newItem: FAQItem = { id: `acc-${Date.now()}`, question: 'Nouvelle question', answer: 'Reponse...' }
    updateSection(sectionId, { content: { ...section?.content, items: [...items, newItem] } })
  }

  const removeItem = (id: string) => {
    updateSection(sectionId, { content: { ...section?.content, items: items.filter(i => i.id !== id) } })
  }

  const updateItem = (id: string, field: keyof FAQItem, value: string) => {
    updateSection(sectionId, {
      content: { ...section?.content, items: items.map(i => i.id === id ? { ...i, [field]: value } : i) },
    })
  }

  return (
    <>
      <PanelSection title="Variante">
        <FieldSelect
          sectionId={sectionId}
          label="Univers & Mode"
          variantField
          options={[
            { value: 'startup-single', label: 'Startup — Simple' },
            { value: 'startup-multi', label: 'Startup — Multiple' },
            { value: 'corporate-single', label: 'Corporate — Simple' },
            { value: 'corporate-multi', label: 'Corporate — Multiple' },
            { value: 'luxe-single', label: 'Luxe — Simple' },
            { value: 'luxe-multi', label: 'Luxe — Multiple' },
            { value: 'creative-single', label: 'Creatif — Simple' },
            { value: 'creative-multi', label: 'Creatif — Multiple' },
            { value: 'ecommerce-single', label: 'E-commerce — Simple' },
            { value: 'ecommerce-multi', label: 'E-commerce — Multiple' },
            { value: 'glass-single', label: 'Glass — Simple' },
            { value: 'glass-multi', label: 'Glass — Multiple' },
          ]}
        />
      </PanelSection>

      <PanelSection title="Options">
        <FieldToggle sectionId={sectionId} label="Ouvrir plusieurs" contentPath="allowMultiple" />
        <FieldSelect
          sectionId={sectionId}
          label="Style d'icone"
          contentPath="iconStyle"
          options={[
            { value: 'chevron', label: 'Chevron' },
            { value: 'plus-minus', label: 'Plus / Moins' },
            { value: 'arrow', label: 'Fleche' },
            { value: 'none', label: 'Aucun' },
          ]}
        />
      </PanelSection>

      <PanelSection title="Contenu">
        <FieldText sectionId={sectionId} label="Badge / Eyebrow" contentPath="eyebrow" placeholder="En savoir plus" />
        <FieldText sectionId={sectionId} label="Titre" contentPath="title" placeholder="Titre de l'accordion" required />
        <FieldTextarea sectionId={sectionId} label="Sous-titre" contentPath="subtitle" placeholder="Description..." rows={2} />
      </PanelSection>

      <PanelSection title={`Items (${items.length})`}>
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
                <label className="text-xs text-zinc-500 block mb-1">Question</label>
                <input value={item.question} onChange={e => updateItem(item.id, 'question', e.target.value)} className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue" />
              </div>
              <div>
                <label className="text-xs text-zinc-500 block mb-1">Reponse</label>
                <textarea value={item.answer} onChange={e => updateItem(item.id, 'answer', e.target.value)} rows={3} className="w-full bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-wf-blue resize-none" />
              </div>
            </div>
          ))}
          <button onClick={addItem} className="w-full flex items-center justify-center gap-2 py-2 border border-dashed border-zinc-700 rounded-lg text-xs text-zinc-500 hover:text-wf-blue hover:border-wf-blue/80 transition-colors">
            <Plus className="w-3.5 h-3.5" /> Ajouter un item
          </button>
        </div>
      </PanelSection>
    </>
  )
}
