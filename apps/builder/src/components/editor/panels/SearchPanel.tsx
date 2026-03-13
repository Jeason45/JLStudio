'use client'
import { PanelSection } from '../PanelSection'
import { FieldText, FieldSelect, FieldToggle } from '../fields'

export function SearchPanel({ sectionId }: { sectionId: string }) {
  return (
    <>
      <PanelSection title="Variante">
        <FieldSelect sectionId={sectionId} label="Univers" variantField options={[
          { value: 'startup', label: 'Startup' },
          { value: 'corporate', label: 'Corporate' },
          { value: 'luxe', label: 'Luxe' },
          { value: 'creative', label: 'Creatif' },
          { value: 'ecommerce', label: 'E-commerce' },
          { value: 'glass', label: 'Glass' },
        ]} />
      </PanelSection>

      <PanelSection title="Contenu">
        <FieldText sectionId={sectionId} label="Titre" contentPath="title" placeholder="Rechercher" />
        <FieldText sectionId={sectionId} label="Placeholder" contentPath="placeholder" placeholder="Tapez votre recherche..." />
        <FieldToggle sectionId={sectionId} label="Afficher categories" contentPath="showCategories" />
      </PanelSection>
    </>
  )
}
