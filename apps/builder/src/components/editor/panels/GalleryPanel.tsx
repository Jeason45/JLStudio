'use client'
import { useEditorStore } from '@/store/editorStore'
import { PanelSection } from '../PanelSection'
import { FieldText, FieldTextarea, FieldSelect, FieldToggle } from '../fields'
import { Plus, Trash2 } from 'lucide-react'

interface GalleryPanelProps {
  sectionId: string
}

interface GalleryImage {
  id: string
  src: string
  alt: string
  caption: string
}

export function GalleryPanel({ sectionId }: GalleryPanelProps) {
  const { siteConfig, updateSection } = useEditorStore()
  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  const images: GalleryImage[] = section?.content?.images ?? []

  const addImage = () => {
    const newImage: GalleryImage = {
      id: `img-${Date.now()}`,
      src: '',
      alt: 'Image',
      caption: '',
    }
    updateSection(sectionId, {
      content: { ...section?.content, images: [...images, newImage] }
    })
  }

  const removeImage = (id: string) => {
    updateSection(sectionId, {
      content: { ...section?.content, images: images.filter(i => i.id !== id) }
    })
  }

  const updateImage = (id: string, field: keyof GalleryImage, value: string) => {
    updateSection(sectionId, {
      content: {
        ...section?.content,
        images: images.map(i => i.id === id ? { ...i, [field]: value } : i)
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
            { value: 'startup-masonry', label: 'Startup — Masonry' },
            { value: 'corporate-grid', label: 'Corporate — Grille' },
            { value: 'corporate-masonry', label: 'Corporate — Masonry' },
            { value: 'luxe-grid', label: 'Luxe — Grille' },
            { value: 'luxe-masonry', label: 'Luxe — Masonry' },
            { value: 'creative-grid', label: 'Créatif — Grille' },
            { value: 'creative-masonry', label: 'Créatif — Masonry' },
            { value: 'ecommerce-grid', label: 'E-commerce — Grille' },
            { value: 'ecommerce-masonry', label: 'E-commerce — Masonry' },
            { value: 'glass-grid', label: 'Glass — Grille' },
            { value: 'glass-masonry', label: 'Glass — Masonry' },
          ]}
        />
      </PanelSection>

      <PanelSection title="Options">
        <FieldToggle sectionId={sectionId} label="Lightbox (clic pour agrandir)" contentPath="enableLightbox" />
      </PanelSection>

      <PanelSection title="Contenu">
        <FieldText
          sectionId={sectionId}
          label="Titre"
          contentPath="title"
          placeholder="Galerie"
        />
      </PanelSection>

      <PanelSection title={`Images (${images.length})`}>
        <div className="space-y-3">
          {images.map((image, index) => (
            <div key={image.id} className="bg-zinc-800/50 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-zinc-500 font-medium">#{index + 1}</span>
                <button
                  onClick={() => removeImage(image.id)}
                  className="text-zinc-600 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <div>
                <label className="text-xs text-zinc-500 block mb-1">URL de l&apos;image</label>
                <input
                  value={image.src}
                  onChange={e => updateImage(image.id, 'src', e.target.value)}
                  placeholder="https://..."
                  className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-500 block mb-1">Texte alternatif</label>
                <input
                  value={image.alt}
                  onChange={e => updateImage(image.id, 'alt', e.target.value)}
                  className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-500 block mb-1">Legende</label>
                <input
                  value={image.caption}
                  onChange={e => updateImage(image.id, 'caption', e.target.value)}
                  className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                />
              </div>
            </div>
          ))}
          <button
            onClick={addImage}
            className="w-full flex items-center justify-center gap-2 py-2 border border-dashed border-zinc-700 rounded-lg text-xs text-zinc-500 hover:text-wf-blue hover:border-wf-blue/80 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Ajouter une image
          </button>
        </div>
      </PanelSection>
    </>
  )
}
