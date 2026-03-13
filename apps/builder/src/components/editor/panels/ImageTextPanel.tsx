'use client'
import { useEditorStore } from '@/store/editorStore'
import { PanelSection } from '../PanelSection'
import { FieldText, FieldTextarea, FieldSelect, FieldToggle } from '../fields'
import { Plus, Trash2 } from 'lucide-react'

interface ImageTextPanelProps {
  sectionId: string
}

export function ImageTextPanel({ sectionId }: ImageTextPanelProps) {
  return (
    <>
      <PanelSection title="Variante">
        <FieldSelect
          sectionId={sectionId}
          label="Univers & Layout"
          variantField
          options={[
            { value: 'startup-image-right', label: 'Startup — Image droite' },
            { value: 'startup-image-left', label: 'Startup — Image gauche' },
            { value: 'corporate-image-right', label: 'Corporate — Image droite' },
            { value: 'corporate-image-left', label: 'Corporate — Image gauche' },
            { value: 'luxe-image-right', label: 'Luxe — Image droite' },
            { value: 'luxe-image-left', label: 'Luxe — Image gauche' },
            { value: 'creative-image-right', label: 'Créatif — Image droite' },
            { value: 'creative-image-left', label: 'Créatif — Image gauche' },
            { value: 'ecommerce-image-right', label: 'E-commerce — Image droite' },
            { value: 'ecommerce-image-left', label: 'E-commerce — Image gauche' },
            { value: 'glass-image-right', label: 'Glass — Image droite' },
            { value: 'glass-image-left', label: 'Glass — Image gauche' },
          ]}
        />
      </PanelSection>

      <PanelSection title="Contenu">
        <FieldText sectionId={sectionId} label="Eyebrow" contentPath="eyebrow" placeholder="A propos" />
        <FieldText sectionId={sectionId} label="Titre" contentPath="title" placeholder="Notre mission" required />
        <FieldTextarea sectionId={sectionId} label="Sous-titre" contentPath="subtitle" placeholder="En quelques mots" rows={2} />
        <FieldTextarea sectionId={sectionId} label="Contenu" contentPath="body" placeholder="Texte principal..." rows={4} />
      </PanelSection>

      <PanelSection title="Image">
        <FieldText sectionId={sectionId} label="Image" contentPath="image" placeholder="URL de l'image" />
        <FieldText sectionId={sectionId} label="Texte alternatif" contentPath="imageAlt" placeholder="Description de l'image" />
        <FieldSelect
          sectionId={sectionId}
          label="Position de l'image"
          contentPath="imagePosition"
          options={[
            { value: 'left', label: 'Gauche' },
            { value: 'right', label: 'Droite' },
          ]}
        />
      </PanelSection>

      <PanelSection title="Boutons" defaultOpen={false}>
        <FieldText sectionId={sectionId} label="Bouton principal — Label" contentPath="primaryButton.label" placeholder="En savoir plus" />
        <FieldText sectionId={sectionId} label="Bouton principal — Lien" contentPath="primaryButton.href" placeholder="#" />
        <FieldText sectionId={sectionId} label="Bouton secondaire — Label" contentPath="secondaryButton.label" placeholder="Contactez-nous" />
        <FieldText sectionId={sectionId} label="Bouton secondaire — Lien" contentPath="secondaryButton.href" placeholder="#" />
      </PanelSection>
    </>
  )
}
