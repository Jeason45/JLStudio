'use client'
import { useEditorStore } from '@/store/editorStore'
import { PanelSection } from '../PanelSection'
import { FieldText, FieldSelect, FieldToggle } from '../fields'
import { Plus, Trash2 } from 'lucide-react'

interface NavLink {
  id: string
  label: string
  href: string
  hasDropdown: boolean
}

export function NavbarAdvancedPanel({ sectionId }: { sectionId: string }) {
  const { siteConfig, updateSection } = useEditorStore()
  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  const links: NavLink[] = section?.content?.links ?? []

  const addLink = () => {
    const newLink: NavLink = { id: `nav-${Date.now()}`, label: 'Nouveau lien', href: '#', hasDropdown: false }
    updateSection(sectionId, { content: { ...section?.content, links: [...links, newLink] } })
  }

  const removeLink = (id: string) => {
    updateSection(sectionId, { content: { ...section?.content, links: links.filter(l => l.id !== id) } })
  }

  const updateLink = (id: string, field: string, value: string | boolean) => {
    updateSection(sectionId, {
      content: { ...section?.content, links: links.map(l => l.id === id ? { ...l, [field]: value } : l) },
    })
  }

  return (
    <>
      <PanelSection title="Variante">
        <FieldSelect sectionId={sectionId} label="Univers & Layout" variantField options={[
          { value: 'startup-standard', label: 'Startup — Standard' }, { value: 'startup-mega', label: 'Startup — Mega' },
          { value: 'corporate-standard', label: 'Corporate — Standard' }, { value: 'corporate-mega', label: 'Corporate — Mega' },
          { value: 'luxe-standard', label: 'Luxe — Standard' }, { value: 'luxe-mega', label: 'Luxe — Mega' },
          { value: 'creative-standard', label: 'Creatif — Standard' }, { value: 'creative-mega', label: 'Creatif — Mega' },
          { value: 'ecommerce-standard', label: 'E-commerce — Standard' }, { value: 'ecommerce-mega', label: 'E-commerce — Mega' },
          { value: 'glass-standard', label: 'Glass — Standard' }, { value: 'glass-mega', label: 'Glass — Mega' },
        ]} />
      </PanelSection>

      <PanelSection title="Options">
        <FieldToggle sectionId={sectionId} label="Sticky" contentPath="sticky" />
        <FieldToggle sectionId={sectionId} label="Transparent" contentPath="transparent" />
        <FieldSelect sectionId={sectionId} label="Style hamburger" contentPath="hamburgerStyle" options={[
          { value: 'minimal', label: 'Minimal' }, { value: 'bold', label: 'Bold' }, { value: 'animated', label: 'Anime' },
        ]} />
      </PanelSection>

      <PanelSection title="Contenu">
        <FieldText sectionId={sectionId} label="Logo" contentPath="logo" placeholder="VotreMarque" required />
        <FieldText sectionId={sectionId} label="CTA Label" contentPath="ctaLabel" placeholder="Essai gratuit" />
        <FieldText sectionId={sectionId} label="CTA Href" contentPath="ctaHref" placeholder="#signup" />
        <FieldText sectionId={sectionId} label="Bandeau annonce" contentPath="announcementBar" placeholder="Nouveau ! Version 2.0 disponible" />
      </PanelSection>

      <PanelSection title={`Liens (${links.length})`}>
        <div className="space-y-3">
          {links.map((link, index) => (
            <div key={link.id} className="bg-zinc-800/50 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-zinc-500 font-medium">#{index + 1}</span>
                <button onClick={() => removeLink(link.id)} className="text-zinc-600 hover:text-red-400 transition-colors">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-zinc-500 block mb-1">Label</label>
                  <input value={link.label} onChange={e => updateLink(link.id, 'label', e.target.value)} className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue" />
                </div>
                <div>
                  <label className="text-xs text-zinc-500 block mb-1">Href</label>
                  <input value={link.href} onChange={e => updateLink(link.id, 'href', e.target.value)} className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue" />
                </div>
              </div>
            </div>
          ))}
          <button onClick={addLink} className="w-full flex items-center justify-center gap-2 py-2 border border-dashed border-zinc-700 rounded-lg text-xs text-zinc-500 hover:text-wf-blue hover:border-wf-blue/80 transition-colors">
            <Plus className="w-3.5 h-3.5" /> Ajouter un lien
          </button>
        </div>
      </PanelSection>
    </>
  )
}
