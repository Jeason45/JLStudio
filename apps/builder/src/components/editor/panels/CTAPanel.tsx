'use client'
import { PanelSection } from '../PanelSection'
import { FieldText, FieldTextarea, FieldSelect } from '../fields'

interface CTAPanelProps {
  sectionId: string
}

export function CTAPanel({ sectionId }: CTAPanelProps) {
  return (
    <>
      <PanelSection title="Variante">
        <FieldSelect
          sectionId={sectionId}
          label="Disposition"
          variantField
          options={[
            { value: 'startup-centered', label: 'Startup — Centré' },
            { value: 'startup-split', label: 'Startup — Split' },
            { value: 'startup-card', label: 'Startup — Carte' },
            { value: 'corporate-centered', label: 'Corporate — Centré' },
            { value: 'corporate-split', label: 'Corporate — Split' },
            { value: 'corporate-card', label: 'Corporate — Carte' },
            { value: 'luxe-centered', label: 'Luxe — Centré' },
            { value: 'luxe-split', label: 'Luxe — Split' },
            { value: 'luxe-card', label: 'Luxe — Carte' },
            { value: 'creative-centered', label: 'Créatif — Centré' },
            { value: 'creative-split', label: 'Créatif — Split' },
            { value: 'creative-card', label: 'Créatif — Carte' },
            { value: 'ecommerce-centered', label: 'E-commerce — Centré' },
            { value: 'ecommerce-split', label: 'E-commerce — Split' },
            { value: 'ecommerce-card', label: 'E-commerce — Carte' },
            { value: 'glass-centered', label: 'Glass — Centré' },
            { value: 'glass-split', label: 'Glass — Split' },
            { value: 'glass-card', label: 'Glass — Carte' },
          ]}
        />
      </PanelSection>

      <PanelSection title="Contenu">
        <FieldText sectionId={sectionId} label="Badge" contentPath="badge" placeholder="Offre speciale" />
        <FieldText sectionId={sectionId} label="Titre" contentPath="title" placeholder="Passez a l'action" required />
        <FieldTextarea sectionId={sectionId} label="Sous-titre" contentPath="subtitle" placeholder="Description..." rows={2} />
      </PanelSection>

      <PanelSection title="Bouton principal">
        <FieldText sectionId={sectionId} label="Texte" contentPath="primaryButton.label" placeholder="Commencer" />
        <FieldText sectionId={sectionId} label="Lien" contentPath="primaryButton.href" placeholder="#" />
      </PanelSection>

      <PanelSection title="Bouton secondaire" defaultOpen={false}>
        <FieldText sectionId={sectionId} label="Texte" contentPath="secondaryButton.label" placeholder="En savoir plus" />
        <FieldText sectionId={sectionId} label="Lien" contentPath="secondaryButton.href" placeholder="#" />
      </PanelSection>

      <PanelSection title="Compte a rebours" defaultOpen={false}>
        <FieldText sectionId={sectionId} label="Date cible (ISO)" contentPath="targetDate" placeholder="2025-12-31T00:00:00Z" />
        <FieldText sectionId={sectionId} label="Icone" contentPath="icon" placeholder="🎉" />
      </PanelSection>
    </>
  )
}
