'use client'
import { useEditorStore } from '@/store/editorStore'
import { PanelSection } from '../PanelSection'
import { FieldText, FieldSelect, FieldToggle } from '../fields'
import { Plus, Trash2 } from 'lucide-react'

interface SliderPanelProps {
  sectionId: string
}

interface SlideItem {
  id: string
  image: string
  title?: string
  subtitle?: string
  badge?: string
  ctaLabel?: string
  ctaHref?: string
}

export function SliderPanel({ sectionId }: SliderPanelProps) {
  const { siteConfig, updateSection } = useEditorStore()
  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  const slides: SlideItem[] = section?.content?.slides ?? []

  const addSlide = () => {
    const newSlide: SlideItem = { id: `slide-${Date.now()}`, image: '', title: 'Nouveau slide', subtitle: '' }
    updateSection(sectionId, { content: { ...section?.content, slides: [...slides, newSlide] } })
  }

  const removeSlide = (id: string) => {
    updateSection(sectionId, { content: { ...section?.content, slides: slides.filter(s => s.id !== id) } })
  }

  const updateSlide = (id: string, field: keyof SlideItem, value: string) => {
    updateSection(sectionId, {
      content: { ...section?.content, slides: slides.map(s => s.id === id ? { ...s, [field]: value } : s) },
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
            { value: 'startup-hero', label: 'Startup — Hero' },
            { value: 'startup-cards', label: 'Startup — Cards' },
            { value: 'startup-thumbnails', label: 'Startup — Thumbnails' },
            { value: 'corporate-hero', label: 'Corporate — Hero' },
            { value: 'corporate-cards', label: 'Corporate — Cards' },
            { value: 'corporate-thumbnails', label: 'Corporate — Thumbnails' },
            { value: 'luxe-hero', label: 'Luxe — Hero' },
            { value: 'luxe-cards', label: 'Luxe — Cards' },
            { value: 'luxe-thumbnails', label: 'Luxe — Thumbnails' },
            { value: 'creative-hero', label: 'Creatif — Hero' },
            { value: 'creative-cards', label: 'Creatif — Cards' },
            { value: 'creative-thumbnails', label: 'Creatif — Thumbnails' },
            { value: 'ecommerce-hero', label: 'E-commerce — Hero' },
            { value: 'ecommerce-cards', label: 'E-commerce — Cards' },
            { value: 'ecommerce-thumbnails', label: 'E-commerce — Thumbnails' },
            { value: 'glass-hero', label: 'Glass — Hero' },
            { value: 'glass-cards', label: 'Glass — Cards' },
            { value: 'glass-thumbnails', label: 'Glass — Thumbnails' },
          ]}
        />
      </PanelSection>

      <PanelSection title="Options">
        <FieldToggle sectionId={sectionId} label="Autoplay" contentPath="autoplay" />
        <FieldToggle sectionId={sectionId} label="Boucle" contentPath="loop" />
        <FieldToggle sectionId={sectionId} label="Points" contentPath="showDots" />
        <FieldToggle sectionId={sectionId} label="Fleches" contentPath="showArrows" />
        <FieldToggle sectionId={sectionId} label="Compteur" contentPath="showCounter" />
        <FieldSelect
          sectionId={sectionId}
          label="Effet"
          contentPath="effect"
          options={[
            { value: 'slide', label: 'Slide' },
            { value: 'fade', label: 'Fade' },
            { value: 'scale', label: 'Scale' },
          ]}
        />
        <FieldText sectionId={sectionId} label="Intervalle (ms)" contentPath="interval" placeholder="5000" />
      </PanelSection>

      <PanelSection title="Contenu">
        <FieldText sectionId={sectionId} label="Badge / Eyebrow" contentPath="eyebrow" placeholder="Nos realisations" />
        <FieldText sectionId={sectionId} label="Titre" contentPath="title" placeholder="Titre du slider" />
      </PanelSection>

      <PanelSection title={`Slides (${slides.length})`}>
        <div className="space-y-3">
          {slides.map((slide, index) => (
            <div key={slide.id} className="bg-zinc-800/50 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-zinc-500 font-medium">#{index + 1}</span>
                <button onClick={() => removeSlide(slide.id)} className="text-zinc-600 hover:text-red-400 transition-colors">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <div>
                <label className="text-xs text-zinc-500 block mb-1">Image URL</label>
                <input value={slide.image} onChange={e => updateSlide(slide.id, 'image', e.target.value)} placeholder="https://..." className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue" />
              </div>
              <div>
                <label className="text-xs text-zinc-500 block mb-1">Titre</label>
                <input value={slide.title ?? ''} onChange={e => updateSlide(slide.id, 'title', e.target.value)} className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue" />
              </div>
              <div>
                <label className="text-xs text-zinc-500 block mb-1">Sous-titre</label>
                <input value={slide.subtitle ?? ''} onChange={e => updateSlide(slide.id, 'subtitle', e.target.value)} className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-zinc-500 block mb-1">CTA Label</label>
                  <input value={slide.ctaLabel ?? ''} onChange={e => updateSlide(slide.id, 'ctaLabel', e.target.value)} className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue" />
                </div>
                <div>
                  <label className="text-xs text-zinc-500 block mb-1">CTA Href</label>
                  <input value={slide.ctaHref ?? ''} onChange={e => updateSlide(slide.id, 'ctaHref', e.target.value)} className="w-full h-8 bg-zinc-700 border border-zinc-600 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue" />
                </div>
              </div>
            </div>
          ))}
          <button onClick={addSlide} className="w-full flex items-center justify-center gap-2 py-2 border border-dashed border-zinc-700 rounded-lg text-xs text-zinc-500 hover:text-wf-blue hover:border-wf-blue/80 transition-colors">
            <Plus className="w-3.5 h-3.5" /> Ajouter un slide
          </button>
        </div>
      </PanelSection>
    </>
  )
}
