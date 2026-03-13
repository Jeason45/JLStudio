'use client'
import { useEditorStore } from '@/store/editorStore'
import { PanelSection } from '../PanelSection'
import { FieldText, FieldTextarea, FieldSelect, FieldToggle } from '../fields'
import { Plus, Trash2 } from 'lucide-react'

interface TeamPanelProps {
  sectionId: string
}

interface MemberItem {
  id: string
  name: string
  role: string
  bio?: string
  linkedin?: string
  twitter?: string
}

export function TeamPanel({ sectionId }: TeamPanelProps) {
  const { siteConfig, updateSection } = useEditorStore()
  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  const members: MemberItem[] = section?.content?.members ?? []

  const addMember = () => {
    updateSection(sectionId, {
      content: {
        ...section?.content,
        members: [...members, { id: `member-${Date.now()}`, name: 'Nom', role: 'Role' }]
      }
    })
  }

  const removeMember = (id: string) => {
    updateSection(sectionId, {
      content: { ...section?.content, members: members.filter(m => m.id !== id) }
    })
  }

  const updateMember = (id: string, field: keyof MemberItem, value: string) => {
    updateSection(sectionId, {
      content: {
        ...section?.content,
        members: members.map(m => m.id === id ? { ...m, [field]: value } : m)
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
        <FieldText sectionId={sectionId} label="Eyebrow" contentPath="eyebrow" placeholder="Notre equipe" />
        <FieldText sectionId={sectionId} label="Titre" contentPath="title" placeholder="Les personnes derriere le projet" required />
        <FieldTextarea sectionId={sectionId} label="Sous-titre" contentPath="subtitle" placeholder="Une equipe passionnee" />
      </PanelSection>

      <PanelSection title={`Membres (${members.length})`}>
        <div className="space-y-3">
          {members.map((member, index) => (
            <div key={member.id} className="bg-zinc-800/50 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-zinc-500">Membre #{index + 1}</span>
                <button onClick={() => removeMember(member.id)} className="text-zinc-600 hover:text-red-400">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-zinc-500 block mb-1">Nom</label>
                  <input
                    value={member.name}
                    onChange={e => updateMember(member.id, 'name', e.target.value)}
                    placeholder="Jean Dupont"
                    className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-500 block mb-1">Role</label>
                  <input
                    value={member.role}
                    onChange={e => updateMember(member.id, 'role', e.target.value)}
                    placeholder="CEO"
                    className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-zinc-500 block mb-1">Bio</label>
                <textarea
                  value={member.bio ?? ''}
                  onChange={e => updateMember(member.id, 'bio', e.target.value)}
                  placeholder="Courte biographie"
                  rows={2}
                  className="w-full bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-wf-blue resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-zinc-500 block mb-1">LinkedIn</label>
                  <input
                    value={member.linkedin ?? ''}
                    onChange={e => updateMember(member.id, 'linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-500 block mb-1">Twitter</label>
                  <input
                    value={member.twitter ?? ''}
                    onChange={e => updateMember(member.id, 'twitter', e.target.value)}
                    placeholder="https://twitter.com/..."
                    className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={addMember}
            className="w-full flex items-center justify-center gap-2 py-2 border border-dashed border-zinc-700 rounded-lg text-xs text-zinc-500 hover:text-wf-blue hover:border-wf-blue/80 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Ajouter un membre
          </button>
        </div>
      </PanelSection>
    </>
  )
}
