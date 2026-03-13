'use client'
import { useEditorStore } from '@/store/editorStore'
import { PanelSection } from '../PanelSection'
import { FieldText, FieldSelect, FieldToggle } from '../fields'
import { Plus, Trash2 } from 'lucide-react'

export function DropdownPanel({ sectionId }: { sectionId: string }) {
  const { siteConfig, updateSection } = useEditorStore()
  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  const groups = section?.content?.groups ?? []

  const addGroup = () => {
    const g = { id: `grp-${Date.now()}`, title: 'Groupe', items: [{ id: `item-${Date.now()}`, label: 'Lien', href: '#' }] }
    updateSection(sectionId, { content: { ...section?.content, groups: [...groups, g] } })
  }

  const removeGroup = (id: string) => {
    updateSection(sectionId, { content: { ...section?.content, groups: groups.filter((g: { id: string }) => g.id !== id) } })
  }

  return (
    <>
      <PanelSection title="Variante">
        <FieldSelect sectionId={sectionId} label="Univers & Layout" variantField options={[
          { value: 'startup-simple', label: 'Startup — Simple' }, { value: 'startup-mega', label: 'Startup — Mega' },
          { value: 'corporate-simple', label: 'Corporate — Simple' }, { value: 'corporate-mega', label: 'Corporate — Mega' },
          { value: 'luxe-simple', label: 'Luxe — Simple' }, { value: 'luxe-mega', label: 'Luxe — Mega' },
          { value: 'creative-simple', label: 'Creatif — Simple' }, { value: 'creative-mega', label: 'Creatif — Mega' },
          { value: 'ecommerce-simple', label: 'E-commerce — Simple' }, { value: 'ecommerce-mega', label: 'E-commerce — Mega' },
          { value: 'glass-simple', label: 'Glass — Simple' }, { value: 'glass-mega', label: 'Glass — Mega' },
        ]} />
      </PanelSection>

      <PanelSection title="Options">
        <FieldText sectionId={sectionId} label="Label du bouton" contentPath="triggerLabel" placeholder="Menu" />
        <FieldToggle sectionId={sectionId} label="Mega menu" contentPath="isMegaMenu" />
      </PanelSection>

      <PanelSection title="Contenu">
        <FieldText sectionId={sectionId} label="Titre" contentPath="title" placeholder="Menu" />
      </PanelSection>

      <PanelSection title={`Groupes (${groups.length})`}>
        <div className="space-y-2">
          {groups.map((g: { id: string; title: string }, i: number) => (
            <div key={g.id} className="bg-zinc-800/50 rounded-lg p-2 flex items-center justify-between">
              <span className="text-xs text-zinc-400">{g.title || `Groupe ${i + 1}`}</span>
              <button onClick={() => removeGroup(g.id)} className="text-zinc-600 hover:text-red-400"><Trash2 className="w-3 h-3" /></button>
            </div>
          ))}
          <button onClick={addGroup} className="w-full flex items-center justify-center gap-2 py-2 border border-dashed border-zinc-700 rounded-lg text-xs text-zinc-500 hover:text-wf-blue hover:border-wf-blue/80 transition-colors">
            <Plus className="w-3.5 h-3.5" /> Ajouter un groupe
          </button>
        </div>
      </PanelSection>
    </>
  )
}
