'use client'
import { useEditorStore } from '@/store/editorStore'
import { PanelSection } from '../PanelSection'
import { FieldText, FieldTextarea, FieldSelect, FieldToggle } from '../fields'
import { Plus, Trash2 } from 'lucide-react'

interface BlogGridPanelProps {
  sectionId: string
}

interface PostItem {
  id: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  slug?: string
}

export function BlogGridPanel({ sectionId }: BlogGridPanelProps) {
  const { siteConfig, updateSection } = useEditorStore()
  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  const posts: PostItem[] = section?.content?.posts ?? []

  const addPost = () => {
    updateSection(sectionId, {
      content: {
        ...section?.content,
        posts: [...posts, { id: `post-${Date.now()}`, title: 'Nouvel article', excerpt: '', category: 'General', date: new Date().toLocaleDateString('fr-FR'), readTime: '5 min', slug: '#' }]
      }
    })
  }

  const removePost = (id: string) => {
    updateSection(sectionId, {
      content: { ...section?.content, posts: posts.filter(p => p.id !== id) }
    })
  }

  const updatePost = (id: string, field: keyof PostItem, value: string) => {
    updateSection(sectionId, {
      content: {
        ...section?.content,
        posts: posts.map(p => p.id === id ? { ...p, [field]: value } : p)
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
            { value: 'startup-featured', label: 'Startup — Featured' },
            { value: 'corporate-grid', label: 'Corporate — Grille' },
            { value: 'corporate-featured', label: 'Corporate — Featured' },
            { value: 'luxe-grid', label: 'Luxe — Grille' },
            { value: 'luxe-featured', label: 'Luxe — Featured' },
            { value: 'creative-grid', label: 'Créatif — Grille' },
            { value: 'creative-featured', label: 'Créatif — Featured' },
            { value: 'ecommerce-grid', label: 'E-commerce — Grille' },
            { value: 'ecommerce-featured', label: 'E-commerce — Featured' },
            { value: 'glass-grid', label: 'Glass — Grille' },
            { value: 'glass-featured', label: 'Glass — Featured' },
          ]}
        />
      </PanelSection>

      <PanelSection title="En-tete">
        <FieldText sectionId={sectionId} label="Eyebrow" contentPath="eyebrow" placeholder="Blog" />
        <FieldText sectionId={sectionId} label="Titre" contentPath="title" placeholder="Nos derniers articles" required />
        <FieldTextarea sectionId={sectionId} label="Sous-titre" contentPath="subtitle" placeholder="Decouvrez nos publications" />
        <FieldText sectionId={sectionId} label="Label CTA" contentPath="ctaLabel" placeholder="Voir tout le blog" />
        <FieldText sectionId={sectionId} label="Lien CTA" contentPath="ctaHref" placeholder="/blog" />
      </PanelSection>

      <PanelSection title={`Articles (${posts.length})`}>
        <div className="space-y-3">
          {posts.map((post, index) => (
            <div key={post.id} className="bg-zinc-800/50 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-zinc-500">Article #{index + 1}</span>
                <button onClick={() => removePost(post.id)} className="text-zinc-600 hover:text-red-400">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <div>
                <label className="text-xs text-zinc-500 block mb-1">Titre</label>
                <input
                  value={post.title}
                  onChange={e => updatePost(post.id, 'title', e.target.value)}
                  placeholder="Titre de l'article"
                  className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-500 block mb-1">Extrait</label>
                <textarea
                  value={post.excerpt}
                  onChange={e => updatePost(post.id, 'excerpt', e.target.value)}
                  placeholder="Resume de l'article"
                  rows={2}
                  className="w-full bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-wf-blue resize-none"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs text-zinc-500 block mb-1">Categorie</label>
                  <input
                    value={post.category}
                    onChange={e => updatePost(post.id, 'category', e.target.value)}
                    placeholder="General"
                    className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-500 block mb-1">Date</label>
                  <input
                    value={post.date}
                    onChange={e => updatePost(post.id, 'date', e.target.value)}
                    placeholder="01/01/2025"
                    className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-500 block mb-1">Lecture</label>
                  <input
                    value={post.readTime}
                    onChange={e => updatePost(post.id, 'readTime', e.target.value)}
                    placeholder="5 min"
                    className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={addPost}
            className="w-full flex items-center justify-center gap-2 py-2 border border-dashed border-zinc-700 rounded-lg text-xs text-zinc-500 hover:text-wf-blue hover:border-wf-blue/80 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Ajouter un article
          </button>
        </div>
      </PanelSection>
    </>
  )
}
