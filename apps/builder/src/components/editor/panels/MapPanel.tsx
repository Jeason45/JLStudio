'use client'
import { PanelSection } from '../PanelSection'
import { FieldText, FieldTextarea, FieldSelect } from '../fields'

export function MapPanel({ sectionId }: { sectionId: string }) {
  return (
    <>
      <PanelSection title="Variante">
        <FieldSelect sectionId={sectionId} label="Univers & Layout" variantField options={[
          { value: 'startup-full', label: 'Startup — Pleine' }, { value: 'startup-info', label: 'Startup — Info' },
          { value: 'corporate-full', label: 'Corporate — Pleine' }, { value: 'corporate-info', label: 'Corporate — Info' },
          { value: 'luxe-full', label: 'Luxe — Pleine' }, { value: 'luxe-info', label: 'Luxe — Info' },
          { value: 'creative-full', label: 'Creatif — Pleine' }, { value: 'creative-info', label: 'Creatif — Info' },
          { value: 'ecommerce-full', label: 'E-commerce — Pleine' }, { value: 'ecommerce-info', label: 'E-commerce — Info' },
          { value: 'glass-full', label: 'Glass — Pleine' }, { value: 'glass-info', label: 'Glass — Info' },
        ]} />
      </PanelSection>

      <PanelSection title="Contenu">
        <FieldText sectionId={sectionId} label="Badge / Eyebrow" contentPath="eyebrow" />
        <FieldText sectionId={sectionId} label="Titre" contentPath="title" placeholder="Nos bureaux" />
        <FieldTextarea sectionId={sectionId} label="Sous-titre" contentPath="subtitle" rows={2} />
      </PanelSection>

      <PanelSection title="Carte">
        <FieldSelect sectionId={sectionId} label="Fournisseur" contentPath="provider" options={[
          { value: 'openstreetmap', label: 'OpenStreetMap' },
          { value: 'google', label: 'Google Maps (embed)' },
          { value: 'mapbox', label: 'Mapbox (static)' },
        ]} />
        <FieldText sectionId={sectionId} label="URL Embed" contentPath="embedUrl" placeholder="https://..." />
        <FieldText sectionId={sectionId} label="Cle API (optionnel)" contentPath="apiKey" placeholder="pk.xxx..." />
      </PanelSection>

      <PanelSection title="Informations">
        <FieldText sectionId={sectionId} label="Adresse" contentPath="address" placeholder="42 Avenue des Champs-Elysees" />
        <FieldText sectionId={sectionId} label="Telephone" contentPath="phone" placeholder="+33 1 86 76 54 32" />
        <FieldText sectionId={sectionId} label="Horaires" contentPath="hours" placeholder="Lun-Ven 9h-18h" />
        <FieldText sectionId={sectionId} label="Lien label" contentPath="linkLabel" placeholder="Itineraire" />
        <FieldText sectionId={sectionId} label="Lien URL" contentPath="linkHref" placeholder="https://maps.google.com" />
      </PanelSection>
    </>
  )
}
