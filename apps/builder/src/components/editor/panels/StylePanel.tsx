'use client'
import { useEditorStore } from '@/store/editorStore'
import { PanelSection } from '../PanelSection'
import {
  FieldSelect,
  FieldColor,
  FieldAlignment,
  FieldTitleSize,
  FieldSlider,
  FieldFontPicker,
  FieldFontWeight,
  FieldLetterSpacing,
  FieldTextTransform,
  FieldGradientBuilder,
  FieldBackgroundImage,
  FieldVideoBackground,
  FieldBorderRadius,
  FieldBoxShadow,
  FieldDivider,
} from '../fields'

interface StylePanelProps {
  sectionId: string
}

export function StylePanel({ sectionId }: StylePanelProps) {
  const { siteConfig } = useEditorStore()
  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  if (!section) return null

  const bg = section.style.background

  return (
    <>
      {/* 1. Fond */}
      <PanelSection title="Fond" defaultOpen>
        <FieldSelect
          sectionId={sectionId}
          label="Arriere-plan"
          stylePath="background"
          options={[
            { value: 'white', label: 'Blanc' },
            { value: 'light', label: 'Gris clair' },
            { value: 'dark', label: 'Sombre' },
            { value: 'primary', label: 'Couleur primaire' },
            { value: 'gradient', label: 'Degrade' },
            { value: 'custom', label: 'Couleur personnalisee' },
            { value: 'custom-gradient', label: 'Degrade personnalise' },
          ]}
        />
        {bg === 'custom' && (
          <FieldColor
            sectionId={sectionId}
            label="Couleur de fond"
            stylePath="customBgColor"
          />
        )}
        {bg === 'custom-gradient' && (
          <FieldGradientBuilder
            sectionId={sectionId}
            label="Degrade personnalise"
          />
        )}
        <FieldBackgroundImage
          sectionId={sectionId}
          label="Image de fond"
        />
        <FieldVideoBackground
          sectionId={sectionId}
          label="Video de fond"
        />
      </PanelSection>

      {/* 2. Typographie */}
      <PanelSection title="Typographie" defaultOpen={false}>
        <FieldTitleSize
          sectionId={sectionId}
          label="Taille des titres"
        />
        <FieldAlignment
          sectionId={sectionId}
          label="Alignement du texte"
        />
        <FieldColor
          sectionId={sectionId}
          label="Couleur du texte"
          stylePath="textColor"
        />
        <FieldColor
          sectionId={sectionId}
          label="Couleur d'accent"
          stylePath="accentColor"
        />
        <FieldFontPicker
          sectionId={sectionId}
          label="Police"
        />
        <FieldFontWeight
          sectionId={sectionId}
          label="Graisse"
        />
        <FieldLetterSpacing
          sectionId={sectionId}
          label="Espacement des lettres"
        />
        <FieldTextTransform
          sectionId={sectionId}
          label="Transformation"
        />
      </PanelSection>

      {/* 3. Espacement */}
      <PanelSection title="Espacement" defaultOpen={false}>
        <FieldSelect
          sectionId={sectionId}
          label="Espacement vertical (global)"
          stylePath="paddingY"
          options={[
            { value: 'none', label: 'Aucun' },
            { value: 'sm', label: 'Petit (40px)' },
            { value: 'md', label: 'Moyen (64px)' },
            { value: 'lg', label: 'Grand (96px)' },
            { value: 'xl', label: 'Tres grand (128px)' },
          ]}
        />
        <FieldSelect
          sectionId={sectionId}
          label="Padding haut (override)"
          stylePath="paddingTop"
          options={[
            { value: '', label: 'Auto (paddingY)' },
            { value: 'none', label: 'Aucun' },
            { value: 'sm', label: 'Petit' },
            { value: 'md', label: 'Moyen' },
            { value: 'lg', label: 'Grand' },
            { value: 'xl', label: 'Tres grand' },
          ]}
        />
        <FieldSelect
          sectionId={sectionId}
          label="Padding bas (override)"
          stylePath="paddingBottom"
          options={[
            { value: '', label: 'Auto (paddingY)' },
            { value: 'none', label: 'Aucun' },
            { value: 'sm', label: 'Petit' },
            { value: 'md', label: 'Moyen' },
            { value: 'lg', label: 'Grand' },
            { value: 'xl', label: 'Tres grand' },
          ]}
        />
        <FieldSelect
          sectionId={sectionId}
          label="Marge haute"
          stylePath="marginTop"
          options={[
            { value: '', label: 'Aucune' },
            { value: 'none', label: '0' },
            { value: 'sm', label: 'Petite' },
            { value: 'md', label: 'Moyenne' },
            { value: 'lg', label: 'Grande' },
            { value: 'xl', label: 'Tres grande' },
          ]}
        />
        <FieldSelect
          sectionId={sectionId}
          label="Marge basse"
          stylePath="marginBottom"
          options={[
            { value: '', label: 'Aucune' },
            { value: 'none', label: '0' },
            { value: 'sm', label: 'Petite' },
            { value: 'md', label: 'Moyenne' },
            { value: 'lg', label: 'Grande' },
            { value: 'xl', label: 'Tres grande' },
          ]}
        />
      </PanelSection>

      {/* 4. Bordures & Effets */}
      <PanelSection title="Bordures & Effets" defaultOpen={false}>
        <FieldBorderRadius
          sectionId={sectionId}
          label="Coins arrondis"
        />
        <FieldBoxShadow
          sectionId={sectionId}
          label="Ombre"
        />
        <FieldSlider
          sectionId={sectionId}
          label="Opacite"
          stylePath="opacity"
          min={0}
          max={100}
          step={5}
          unit="%"
        />
      </PanelSection>

      {/* 5. Separateurs */}
      <PanelSection title="Separateurs" defaultOpen={false}>
        <FieldDivider
          sectionId={sectionId}
          label="Separateur haut"
          position="top"
        />
        <FieldDivider
          sectionId={sectionId}
          label="Separateur bas"
          position="bottom"
        />
      </PanelSection>
    </>
  )
}
