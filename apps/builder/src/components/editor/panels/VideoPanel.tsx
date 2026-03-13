'use client'
import { PanelSection } from '../PanelSection'
import { FieldText, FieldTextarea, FieldSelect, FieldToggle } from '../fields'

interface VideoPanelProps {
  sectionId: string
}

export function VideoPanel({ sectionId }: VideoPanelProps) {
  return (
    <>
      <PanelSection title="Variante">
        <FieldSelect
          sectionId={sectionId}
          label="Univers & Layout"
          variantField
          options={[
            { value: 'startup-full', label: 'Startup — Pleine largeur' },
            { value: 'startup-feature', label: 'Startup — Feature' },
            { value: 'corporate-full', label: 'Corporate — Pleine largeur' },
            { value: 'corporate-feature', label: 'Corporate — Feature' },
            { value: 'luxe-full', label: 'Luxe — Pleine largeur' },
            { value: 'luxe-feature', label: 'Luxe — Feature' },
            { value: 'creative-full', label: 'Creatif — Pleine largeur' },
            { value: 'creative-feature', label: 'Creatif — Feature' },
            { value: 'ecommerce-full', label: 'E-commerce — Pleine largeur' },
            { value: 'ecommerce-feature', label: 'E-commerce — Feature' },
            { value: 'glass-full', label: 'Glass — Pleine largeur' },
            { value: 'glass-feature', label: 'Glass — Feature' },
          ]}
        />
      </PanelSection>

      <PanelSection title="Video">
        <FieldSelect
          sectionId={sectionId}
          label="Source"
          contentPath="provider"
          options={[
            { value: 'youtube', label: 'YouTube' },
            { value: 'vimeo', label: 'Vimeo' },
            { value: 'html5', label: 'Fichier video' },
          ]}
        />
        <FieldText sectionId={sectionId} label="URL" contentPath="url" placeholder="https://youtube.com/watch?v=..." required />
        <FieldText sectionId={sectionId} label="Poster (URL)" contentPath="poster" placeholder="https://..." />
      </PanelSection>

      <PanelSection title="Options">
        <FieldToggle sectionId={sectionId} label="Autoplay" contentPath="autoplay" />
        <FieldToggle sectionId={sectionId} label="Boucle" contentPath="loop" />
        <FieldToggle sectionId={sectionId} label="Controles" contentPath="controls" />
      </PanelSection>

      <PanelSection title="Contenu">
        <FieldText sectionId={sectionId} label="Badge / Eyebrow" contentPath="eyebrow" placeholder="Demo" />
        <FieldText sectionId={sectionId} label="Titre" contentPath="title" placeholder="Voyez la plateforme en action" />
        <FieldTextarea sectionId={sectionId} label="Sous-titre" contentPath="subtitle" rows={2} />
        <FieldTextarea sectionId={sectionId} label="Corps (mode Feature)" contentPath="body" rows={3} />
      </PanelSection>
    </>
  )
}
