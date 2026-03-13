'use client'
import { PanelSection } from '../PanelSection'
import { FieldText, FieldTextarea, FieldSelect } from '../fields'

interface FAQPanelProps {
  sectionId: string
}

export function FAQPanel({ sectionId }: FAQPanelProps) {
  return (
    <>
      <PanelSection title="Variante">
        <FieldSelect
          sectionId={sectionId}
          label="Univers & Layout"
          variantField
          options={[
            { value: 'startup-accordion', label: 'Startup — Accordéon' },
            { value: 'startup-grid', label: 'Startup — Grille' },
            { value: 'corporate-accordion', label: 'Corporate — Accordéon' },
            { value: 'corporate-grid', label: 'Corporate — Grille' },
            { value: 'luxe-accordion', label: 'Luxe — Accordéon' },
            { value: 'luxe-grid', label: 'Luxe — Grille' },
            { value: 'creative-accordion', label: 'Créatif — Accordéon' },
            { value: 'creative-grid', label: 'Créatif — Grille' },
            { value: 'ecommerce-accordion', label: 'E-commerce — Accordéon' },
            { value: 'ecommerce-grid', label: 'E-commerce — Grille' },
            { value: 'glass-accordion', label: 'Glass — Accordéon' },
            { value: 'glass-grid', label: 'Glass — Grille' },
          ]}
        />
      </PanelSection>

      <PanelSection title="Contenu">
        <FieldText
          sectionId={sectionId}
          label="Badge / Eyebrow"
          contentPath="eyebrow"
          placeholder="FAQ"
        />
        <FieldText
          sectionId={sectionId}
          label="Titre"
          contentPath="title"
          placeholder="Questions frequentes"
          required
        />
        <FieldTextarea
          sectionId={sectionId}
          label="Sous-titre"
          contentPath="subtitle"
          placeholder="Trouvez les reponses..."
          rows={2}
        />
      </PanelSection>
    </>
  )
}
