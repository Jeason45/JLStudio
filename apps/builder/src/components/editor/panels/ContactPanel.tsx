'use client'
import { PanelSection } from '../PanelSection'
import { FieldText, FieldTextarea, FieldSelect } from '../fields'

interface ContactPanelProps {
  sectionId: string
}

export function ContactPanel({ sectionId }: ContactPanelProps) {
  return (
    <>
      <PanelSection title="Variante">
        <FieldSelect
          sectionId={sectionId}
          label="Univers & Layout"
          variantField
          options={[
            { value: 'startup-simple', label: 'Startup — Simple' },
            { value: 'startup-with-info', label: 'Startup — Avec infos' },
            { value: 'corporate-simple', label: 'Corporate — Simple' },
            { value: 'corporate-with-info', label: 'Corporate — Avec infos' },
            { value: 'luxe-simple', label: 'Luxe — Simple' },
            { value: 'luxe-with-info', label: 'Luxe — Avec infos' },
            { value: 'creative-simple', label: 'Créatif — Simple' },
            { value: 'creative-with-info', label: 'Créatif — Avec infos' },
            { value: 'ecommerce-simple', label: 'E-commerce — Simple' },
            { value: 'ecommerce-with-info', label: 'E-commerce — Avec infos' },
            { value: 'glass-simple', label: 'Glass — Simple' },
            { value: 'glass-with-info', label: 'Glass — Avec infos' },
          ]}
        />
      </PanelSection>

      <PanelSection title="Contenu">
        <FieldText
          sectionId={sectionId}
          label="Badge / Eyebrow"
          contentPath="eyebrow"
          placeholder="Contact"
        />
        <FieldText
          sectionId={sectionId}
          label="Titre"
          contentPath="title"
          placeholder="Contactez-nous"
          required
        />
        <FieldTextarea
          sectionId={sectionId}
          label="Sous-titre"
          contentPath="subtitle"
          placeholder="Nous serions ravis d'echanger..."
          rows={2}
        />
      </PanelSection>

      <PanelSection title="Coordonnees">
        <FieldText
          sectionId={sectionId}
          label="Email"
          contentPath="email"
          placeholder="contact@exemple.com"
        />
        <FieldText
          sectionId={sectionId}
          label="Telephone"
          contentPath="phone"
          placeholder="+33 1 23 45 67 89"
        />
        <FieldText
          sectionId={sectionId}
          label="Adresse"
          contentPath="address"
          placeholder="123 Rue de Paris, 75001"
        />
      </PanelSection>

      <PanelSection title="Formulaire" defaultOpen={false}>
        <FieldText
          sectionId={sectionId}
          label="Titre du formulaire"
          contentPath="formTitle"
          placeholder="Envoyez-nous un message"
        />
        <FieldText
          sectionId={sectionId}
          label="Texte du bouton"
          contentPath="formButtonLabel"
          placeholder="Envoyer le message"
        />
      </PanelSection>
    </>
  )
}
