'use client'
import { PanelSection } from '../PanelSection'
import { FieldText, FieldTextarea, FieldSelect } from '../fields'

interface TestimonialsPanelProps {
  sectionId: string
}

export function TestimonialsPanel({ sectionId }: TestimonialsPanelProps) {
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
            { value: 'startup-marquee', label: 'Startup — Marquee' },
            { value: 'corporate-grid', label: 'Corporate — Grille' },
            { value: 'corporate-featured', label: 'Corporate — Featured' },
            { value: 'corporate-marquee', label: 'Corporate — Marquee' },
            { value: 'luxe-grid', label: 'Luxe — Grille' },
            { value: 'luxe-featured', label: 'Luxe — Featured' },
            { value: 'luxe-marquee', label: 'Luxe — Marquee' },
            { value: 'creative-grid', label: 'Créatif — Grille' },
            { value: 'creative-featured', label: 'Créatif — Featured' },
            { value: 'creative-marquee', label: 'Créatif — Marquee' },
            { value: 'ecommerce-grid', label: 'E-commerce — Grille' },
            { value: 'ecommerce-featured', label: 'E-commerce — Featured' },
            { value: 'ecommerce-marquee', label: 'E-commerce — Marquee' },
            { value: 'glass-grid', label: 'Glass — Grille' },
            { value: 'glass-featured', label: 'Glass — Featured' },
            { value: 'glass-marquee', label: 'Glass — Marquee' },
          ]}
        />
      </PanelSection>

      <PanelSection title="Contenu">
        <FieldText
          sectionId={sectionId}
          label="Badge / Eyebrow"
          contentPath="eyebrow"
          placeholder="Temoignages"
        />
        <FieldText
          sectionId={sectionId}
          label="Titre"
          contentPath="title"
          placeholder="Ce que disent nos clients"
          required
        />
        <FieldTextarea
          sectionId={sectionId}
          label="Sous-titre"
          contentPath="subtitle"
          placeholder="Decouvrez les retours..."
          rows={2}
        />
      </PanelSection>
    </>
  )
}
