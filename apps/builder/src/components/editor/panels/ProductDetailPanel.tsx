'use client'
import { useEditorStore } from '@/store/editorStore'
import { PanelSection } from '../PanelSection'
import { FieldText, FieldTextarea } from '../fields'
import { Plus, Trash2 } from 'lucide-react'

export function ProductDetailPanel({ sectionId }: { sectionId: string }) {
  const { siteConfig, updateSection } = useEditorStore()
  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  if (!section) return null

  const c = section.content || {}

  const update = (field: string, value: unknown) => {
    updateSection(sectionId, { content: { ...c, [field]: value } })
  }

  const variants: { id: string; label: string; options: string[] }[] = c.variants || []

  const addVariant = () => {
    update('variants', [...variants, { id: String(Date.now()), label: 'Option', options: ['Choix 1', 'Choix 2'] }])
  }

  const removeVariant = (id: string) => {
    update('variants', variants.filter((v: { id: string }) => v.id !== id))
  }

  const updateVariant = (id: string, field: string, value: unknown) => {
    update('variants', variants.map((v: { id: string }) => v.id === id ? { ...v, [field]: value } : v))
  }

  const badges: string[] = c.trustBadges || []

  return (
    <>
      <PanelSection title="Produit">
        <FieldText sectionId={sectionId} label="Nom" contentPath="name" />
        <FieldTextarea sectionId={sectionId} label="Description" contentPath="description" />
        <FieldText sectionId={sectionId} label="Prix (centimes)" contentPath="price" />
        <FieldText sectionId={sectionId} label="Prix barre" contentPath="compareAtPrice" />
        <FieldText sectionId={sectionId} label="Badge" contentPath="badge" />
      </PanelSection>

      <PanelSection title="Variantes">
        {variants.map((v: { id: string; label: string; options: string[] }) => (
          <div key={v.id} className="flex items-start gap-2 mb-2">
            <div className="flex-1 space-y-1">
              <div>
                <label className="text-[10px] text-zinc-300">Label</label>
                <input
                  value={v.label}
                  onChange={e => updateVariant(v.id, 'label', e.target.value)}
                  className="w-full px-2 py-1 rounded bg-zinc-800 border border-zinc-700 text-xs text-zinc-200 outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-300">Options (virgule)</label>
                <input
                  value={v.options.join(', ')}
                  onChange={e => updateVariant(v.id, 'options', e.target.value.split(',').map((s: string) => s.trim()))}
                  className="w-full px-2 py-1 rounded bg-zinc-800 border border-zinc-700 text-xs text-zinc-200 outline-none"
                />
              </div>
            </div>
            <button onClick={() => removeVariant(v.id)} className="mt-5 text-zinc-600 hover:text-red-400">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
        <button onClick={addVariant} className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 mt-1">
          <Plus className="w-3 h-3" /> Variante
        </button>
      </PanelSection>

      <PanelSection title="Boutons">
        <FieldText sectionId={sectionId} label="Ajouter au panier" contentPath="addToCartLabel" />
        <FieldText sectionId={sectionId} label="Acheter maintenant" contentPath="buyNowLabel" />
      </PanelSection>

      <PanelSection title="Badges de confiance">
        {badges.map((b: string, i: number) => (
          <div key={i} className="flex items-center gap-2 mb-1">
            <input
              value={b}
              onChange={e => {
                const next = [...badges]
                next[i] = e.target.value
                update('trustBadges', next)
              }}
              className="flex-1 px-2 py-1 rounded bg-zinc-800 border border-zinc-700 text-xs text-zinc-200 outline-none"
            />
            <button onClick={() => update('trustBadges', badges.filter((_: string, j: number) => j !== i))} className="text-zinc-600 hover:text-red-400">
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
        <button onClick={() => update('trustBadges', [...badges, 'Nouveau badge'])} className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 mt-1">
          <Plus className="w-3 h-3" /> Badge
        </button>
      </PanelSection>
    </>
  )
}
