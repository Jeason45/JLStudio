'use client'
import { PanelSection } from '../PanelSection'
import { FieldText, FieldTextarea, FieldSelect, FieldImage, FieldVideo } from '../fields'

interface HeroPanelProps {
  sectionId: string
}

export function HeroPanel({ sectionId }: HeroPanelProps) {
  return (
    <>
      <PanelSection title="Variante">
        <FieldSelect
          sectionId={sectionId}
          label="Univers"
          variantField
          options={[
            { value: 'startup', label: 'Startup / SaaS' },
            { value: 'corporate', label: 'Corporate' },
            { value: 'luxe', label: 'Luxe' },
            { value: 'creative', label: 'Créatif' },
            { value: 'ecommerce', label: 'E-commerce' },
            { value: 'glass', label: 'Glass / Tech' },
          ]}
        />
      </PanelSection>

      <PanelSection title="Contenu">
        <FieldText sectionId={sectionId} label="Badge / Eyebrow" contentPath="eyebrow" placeholder="Nouveau produit" />
        <FieldText sectionId={sectionId} label="Titre" contentPath="title" placeholder="Votre titre principal" required />
        <FieldTextarea sectionId={sectionId} label="Sous-titre" contentPath="subtitle" placeholder="Description accrocheuse..." rows={3} />
      </PanelSection>

      <PanelSection title="Médias">
        <FieldImage sectionId={sectionId} label="Image principale" contentPath="image.src" />
        <FieldImage sectionId={sectionId} label="Image de fond" contentPath="backgroundImage" />
        <FieldVideo sectionId={sectionId} label="Vidéo" contentPath="videoUrl" />
        <FieldImage sectionId={sectionId} label="Poster vidéo" contentPath="posterImage" />
      </PanelSection>

      <PanelSection title="E-commerce" defaultOpen={false}>
        <FieldText sectionId={sectionId} label="Prix" contentPath="price" placeholder="49,90€" />
        <FieldText sectionId={sectionId} label="Ancien prix (barré)" contentPath="originalPrice" placeholder="89,90€" />
        <FieldText sectionId={sectionId} label="Texte confiance" contentPath="trustText" placeholder="Certifié SOC 2 Type II" />
      </PanelSection>

      <PanelSection title="Bouton principal">
        <FieldText sectionId={sectionId} label="Texte" contentPath="primaryButton.label" placeholder="Commencer" />
        <FieldText sectionId={sectionId} label="Lien" contentPath="primaryButton.href" placeholder="#" />
      </PanelSection>

      <PanelSection title="Bouton secondaire" defaultOpen={false}>
        <FieldText sectionId={sectionId} label="Texte" contentPath="secondaryButton.label" placeholder="En savoir plus" />
        <FieldText sectionId={sectionId} label="Lien" contentPath="secondaryButton.href" placeholder="#" />
      </PanelSection>
    </>
  )
}
