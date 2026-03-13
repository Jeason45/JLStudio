'use client'
import { useEditorStore } from '@/store/editorStore'
import { PanelSection } from '../PanelSection'
import { FieldText, FieldTextarea, FieldSelect, FieldToggle } from '../fields'
import { Plus, Trash2 } from 'lucide-react'

interface SiteFooterPanelProps {
  sectionId: string
}

interface FooterLink {
  id: string
  label: string
  href: string
}

interface FooterColumn {
  id: string
  title: string
  links: FooterLink[]
}

export function SiteFooterPanel({ sectionId }: SiteFooterPanelProps) {
  const { siteConfig, updateSection } = useEditorStore()
  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  const content = section?.content ?? {}
  const columns: FooterColumn[] = content.columns ?? []
  const socials = content.socials ?? {}

  const updateSocial = (key: string, value: string) => {
    updateSection(sectionId, {
      content: {
        ...content,
        socials: { ...socials, [key]: value }
      }
    })
  }

  const addColumn = () => {
    const newColumn: FooterColumn = {
      id: `col-${Date.now()}`,
      title: 'Colonne',
      links: [],
    }
    updateSection(sectionId, {
      content: { ...content, columns: [...columns, newColumn] }
    })
  }

  const removeColumn = (id: string) => {
    updateSection(sectionId, {
      content: { ...content, columns: columns.filter(c => c.id !== id) }
    })
  }

  const updateColumnTitle = (id: string, value: string) => {
    updateSection(sectionId, {
      content: {
        ...content,
        columns: columns.map(c => c.id === id ? { ...c, title: value } : c)
      }
    })
  }

  const addLinkToColumn = (colId: string) => {
    updateSection(sectionId, {
      content: {
        ...content,
        columns: columns.map(c => {
          if (c.id !== colId) return c
          return {
            ...c,
            links: [...c.links, { id: `link-${Date.now()}`, label: 'Lien', href: '#' }]
          }
        })
      }
    })
  }

  const removeLinkFromColumn = (colId: string, linkId: string) => {
    updateSection(sectionId, {
      content: {
        ...content,
        columns: columns.map(c => {
          if (c.id !== colId) return c
          return { ...c, links: c.links.filter(l => l.id !== linkId) }
        })
      }
    })
  }

  const updateLinkInColumn = (colId: string, linkId: string, field: 'label' | 'href', value: string) => {
    updateSection(sectionId, {
      content: {
        ...content,
        columns: columns.map(c => {
          if (c.id !== colId) return c
          return {
            ...c,
            links: c.links.map(l => l.id === linkId ? { ...l, [field]: value } : l)
          }
        })
      }
    })
  }

  return (
    <>
      <PanelSection title="Contenu">
        <FieldText sectionId={sectionId} label="Logo" contentPath="logo" placeholder="Nom ou URL du logo" />
        <FieldTextarea sectionId={sectionId} label="Tagline" contentPath="tagline" placeholder="Votre slogan..." rows={2} />
        <FieldText sectionId={sectionId} label="Copyright" contentPath="copyright" placeholder="© 2026 MonSite" />
      </PanelSection>

      <PanelSection title="Reseaux sociaux" defaultOpen={false}>
        <FieldText sectionId={sectionId} label="Twitter / X" contentPath="socials.twitter" placeholder="https://twitter.com/..." />
        <FieldText sectionId={sectionId} label="LinkedIn" contentPath="socials.linkedin" placeholder="https://linkedin.com/..." />
        <FieldText sectionId={sectionId} label="GitHub" contentPath="socials.github" placeholder="https://github.com/..." />
        <FieldText sectionId={sectionId} label="Instagram" contentPath="socials.instagram" placeholder="https://instagram.com/..." />
      </PanelSection>

      <PanelSection title={`Colonnes (${columns.length})`}>
        <div className="space-y-3">
          {columns.map((column, colIndex) => (
            <div key={column.id} className="bg-zinc-800/50 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-zinc-500 font-medium">#{colIndex + 1}</span>
                <button
                  onClick={() => removeColumn(column.id)}
                  className="text-zinc-600 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <div>
                <label className="text-xs text-zinc-500 block mb-1">Titre de la colonne</label>
                <input
                  value={column.title}
                  onChange={e => updateColumnTitle(column.id, e.target.value)}
                  className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                />
              </div>

              <div className="pl-2 border-l border-zinc-700 space-y-2 mt-2">
                {column.links.map((link, linkIndex) => (
                  <div key={link.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-zinc-600">Lien {linkIndex + 1}</span>
                      <button
                        onClick={() => removeLinkFromColumn(column.id, link.id)}
                        className="text-zinc-600 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-2.5 h-2.5" />
                      </button>
                    </div>
                    <input
                      value={link.label}
                      onChange={e => updateLinkInColumn(column.id, link.id, 'label', e.target.value)}
                      placeholder="Label"
                      className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                    />
                    <input
                      value={link.href}
                      onChange={e => updateLinkInColumn(column.id, link.id, 'href', e.target.value)}
                      placeholder="Lien (href)"
                      className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                    />
                  </div>
                ))}
                <button
                  onClick={() => addLinkToColumn(column.id)}
                  className="w-full flex items-center justify-center gap-1 py-1.5 border border-dashed border-zinc-700 rounded text-[10px] text-zinc-500 hover:text-wf-blue hover:border-wf-blue/80 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  Ajouter un lien
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={addColumn}
            className="w-full flex items-center justify-center gap-2 py-2 border border-dashed border-zinc-700 rounded-lg text-xs text-zinc-500 hover:text-wf-blue hover:border-wf-blue/80 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Ajouter une colonne
          </button>
        </div>
      </PanelSection>
    </>
  )
}
