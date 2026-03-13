'use client'
import { useEditorStore } from '@/store/editorStore'
import { PanelSection } from '../PanelSection'
import { FieldText, FieldTextarea, FieldSelect, FieldToggle } from '../fields'
import { Plus, Trash2 } from 'lucide-react'

interface NewsletterPanelProps {
  sectionId: string
}

export function NewsletterPanel({ sectionId }: NewsletterPanelProps) {
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
            { value: 'corporate-centered', label: 'Corporate — Centré' },
            { value: 'corporate-split', label: 'Corporate — Split' },
            { value: 'luxe-centered', label: 'Luxe — Centré' },
            { value: 'luxe-split', label: 'Luxe — Split' },
            { value: 'creative-centered', label: 'Créatif — Centré' },
            { value: 'creative-split', label: 'Créatif — Split' },
            { value: 'ecommerce-centered', label: 'E-commerce — Centré' },
            { value: 'ecommerce-split', label: 'E-commerce — Split' },
            { value: 'glass-centered', label: 'Glass — Centré' },
            { value: 'glass-split', label: 'Glass — Split' },
          ]}
        />
      </PanelSection>

      <PanelSection title="Contenu">
        <FieldText sectionId={sectionId} label="Eyebrow" contentPath="eyebrow" placeholder="Newsletter" />
        <FieldText sectionId={sectionId} label="Titre" contentPath="title" placeholder="Restez informe" required />
        <FieldTextarea sectionId={sectionId} label="Sous-titre" contentPath="subtitle" placeholder="Recevez nos dernieres actualites..." rows={2} />
      </PanelSection>

      <PanelSection title="Formulaire">
        <FieldText sectionId={sectionId} label="Placeholder" contentPath="placeholder" placeholder="Votre email..." />
        <FieldText sectionId={sectionId} label="Bouton" contentPath="buttonLabel" placeholder="S'inscrire" />
        <FieldTextarea sectionId={sectionId} label="Mention legale" contentPath="disclaimer" placeholder="En vous inscrivant, vous acceptez..." rows={2} />
      </PanelSection>

      <PanelSection title="Liste d'attente" defaultOpen={false}>
        <FieldText sectionId={sectionId} label="Nombre d'inscrits" contentPath="count" placeholder="1 234" />
        <FieldText sectionId={sectionId} label="Preuve sociale" contentPath="socialProof" placeholder="Rejoignez 1 234 abonnes" />
      </PanelSection>
    </>
  )
}
