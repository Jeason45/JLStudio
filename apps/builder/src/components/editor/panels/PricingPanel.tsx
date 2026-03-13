'use client'
import { useEditorStore } from '@/store/editorStore'
import { PanelSection } from '../PanelSection'
import { FieldText, FieldTextarea, FieldSelect, FieldToggle } from '../fields'
import { Plus, Trash2 } from 'lucide-react'

interface PricingPanelProps {
  sectionId: string
}

interface PlanItem {
  id: string
  name: string
  price: string
  period: string
  description: string
  features: string[]
  cta: string
  ctaHref: string
  highlighted: boolean
  badge?: string
}

export function PricingPanel({ sectionId }: PricingPanelProps) {
  const { siteConfig, updateSection } = useEditorStore()
  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  const plans: PlanItem[] = section?.content?.plans ?? []

  const addPlan = () => {
    updateSection(sectionId, {
      content: {
        ...section?.content,
        plans: [...plans, { id: `plan-${Date.now()}`, name: 'Plan', price: '0€', period: '/mois', description: '', features: [], cta: 'Choisir', ctaHref: '#', highlighted: false }]
      }
    })
  }

  const removePlan = (id: string) => {
    updateSection(sectionId, {
      content: { ...section?.content, plans: plans.filter(p => p.id !== id) }
    })
  }

  const updatePlan = (id: string, field: keyof PlanItem, value: any) => {
    updateSection(sectionId, {
      content: {
        ...section?.content,
        plans: plans.map(p => p.id === id ? { ...p, [field]: value } : p)
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
            { value: 'startup-columns', label: 'Startup — Colonnes' },
            { value: 'startup-comparison', label: 'Startup — Comparaison' },
            { value: 'corporate-columns', label: 'Corporate — Colonnes' },
            { value: 'corporate-comparison', label: 'Corporate — Comparaison' },
            { value: 'luxe-columns', label: 'Luxe — Colonnes' },
            { value: 'luxe-comparison', label: 'Luxe — Comparaison' },
            { value: 'creative-columns', label: 'Créatif — Colonnes' },
            { value: 'creative-comparison', label: 'Créatif — Comparaison' },
            { value: 'ecommerce-columns', label: 'E-commerce — Colonnes' },
            { value: 'ecommerce-comparison', label: 'E-commerce — Comparaison' },
            { value: 'glass-columns', label: 'Glass — Colonnes' },
            { value: 'glass-comparison', label: 'Glass — Comparaison' },
          ]}
        />
      </PanelSection>

      <PanelSection title="Contenu">
        <FieldText sectionId={sectionId} label="Eyebrow" contentPath="eyebrow" placeholder="Tarifs" />
        <FieldText sectionId={sectionId} label="Titre" contentPath="title" placeholder="Nos offres" required />
        <FieldTextarea sectionId={sectionId} label="Sous-titre" contentPath="subtitle" placeholder="Choisissez le plan adapte a vos besoins" />
      </PanelSection>

      <PanelSection title={`Plans (${plans.length})`}>
        <div className="space-y-3">
          {plans.map((plan, index) => (
            <div key={plan.id} className="bg-zinc-800/50 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-zinc-500">
                  {plan.name} — {plan.price}{plan.badge ? ` — ${plan.badge}` : ''}
                </span>
                <button onClick={() => removePlan(plan.id)} className="text-zinc-600 hover:text-red-400">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-zinc-500 block mb-1">Nom</label>
                  <input
                    value={plan.name}
                    onChange={e => updatePlan(plan.id, 'name', e.target.value)}
                    placeholder="Starter"
                    className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-500 block mb-1">Prix</label>
                  <input
                    value={plan.price}
                    onChange={e => updatePlan(plan.id, 'price', e.target.value)}
                    placeholder="29€"
                    className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-zinc-500 block mb-1">Periode</label>
                  <input
                    value={plan.period}
                    onChange={e => updatePlan(plan.id, 'period', e.target.value)}
                    placeholder="/mois"
                    className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-500 block mb-1">Badge</label>
                  <input
                    value={plan.badge ?? ''}
                    onChange={e => updatePlan(plan.id, 'badge', e.target.value)}
                    placeholder="Populaire"
                    className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-zinc-500 block mb-1">Description</label>
                <input
                  value={plan.description}
                  onChange={e => updatePlan(plan.id, 'description', e.target.value)}
                  placeholder="Pour les petites equipes"
                  className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-zinc-500 block mb-1">Bouton</label>
                  <input
                    value={plan.cta}
                    onChange={e => updatePlan(plan.id, 'cta', e.target.value)}
                    placeholder="Choisir"
                    className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-500 block mb-1">Lien bouton</label>
                  <input
                    value={plan.ctaHref}
                    onChange={e => updatePlan(plan.id, 'ctaHref', e.target.value)}
                    placeholder="#"
                    className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-zinc-500 block mb-1">Features (une par ligne)</label>
                <textarea
                  value={(plan.features ?? []).join('\n')}
                  onChange={e => updatePlan(plan.id, 'features', e.target.value.split('\n'))}
                  placeholder="Feature 1&#10;Feature 2"
                  rows={3}
                  className="w-full bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-wf-blue resize-none"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-xs text-zinc-500">Mis en avant</label>
                <input
                  type="checkbox"
                  checked={plan.highlighted}
                  onChange={e => updatePlan(plan.id, 'highlighted', e.target.checked)}
                  className="accent-wf-blue"
                />
              </div>
            </div>
          ))}
          <button
            onClick={addPlan}
            className="w-full flex items-center justify-center gap-2 py-2 border border-dashed border-zinc-700 rounded-lg text-xs text-zinc-500 hover:text-wf-blue hover:border-wf-blue/80 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Ajouter un plan
          </button>
        </div>
      </PanelSection>
    </>
  )
}
