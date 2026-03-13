'use client'
import { useState } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { PanelSection } from '../PanelSection'
import { FieldText, FieldTextarea, FieldSelect, FieldToggle } from '../fields'
import { Plus, Trash2, ChevronDown, ChevronUp, GripVertical } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import type { FormContent } from '@/types/sections'
import type { FormField, FormFieldType } from '@/types/crm'

const FIELD_TYPES: { value: FormFieldType; label: string }[] = [
  { value: 'text', label: 'Texte' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Telephone' },
  { value: 'textarea', label: 'Zone de texte' },
  { value: 'select', label: 'Liste deroulante' },
  { value: 'checkbox', label: 'Case a cocher' },
  { value: 'radio', label: 'Boutons radio' },
  { value: 'number', label: 'Nombre' },
  { value: 'date', label: 'Date' },
  { value: 'time', label: 'Heure' },
  { value: 'url', label: 'URL' },
  { value: 'password', label: 'Mot de passe' },
  { value: 'file', label: 'Fichier' },
  { value: 'range', label: 'Curseur' },
  { value: 'color', label: 'Couleur' },
  { value: 'toggle', label: 'Toggle' },
  { value: 'search', label: 'Recherche' },
  { value: 'hidden', label: 'Cache' },
]

interface FormPanelProps {
  sectionId: string
}

export function FormPanel({ sectionId }: FormPanelProps) {
  const { siteConfig, updateSection } = useEditorStore()
  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  const content = (section?.content ?? {}) as Partial<FormContent>
  const fields = content.fields ?? []

  const [expandedField, setExpandedField] = useState<string | null>(null)

  const updateContent = (patch: Partial<FormContent>) => {
    if (!section) return
    updateSection(sectionId, { content: { ...section.content, ...patch } })
  }

  const updateFields = (newFields: FormField[]) => {
    updateContent({ fields: newFields })
  }

  const addField = () => {
    const id = `f${Date.now()}`
    const newField: FormField = {
      id,
      type: 'text',
      name: `field_${fields.length + 1}`,
      label: `Champ ${fields.length + 1}`,
      placeholder: '',
      required: false,
      width: 'full',
    }
    updateFields([...fields, newField])
    setExpandedField(id)
  }

  const removeField = (id: string) => {
    updateFields(fields.filter(f => f.id !== id))
  }

  const updateField = (id: string, patch: Partial<FormField>) => {
    updateFields(fields.map(f => f.id === id ? { ...f, ...patch } : f))
  }

  const moveField = (index: number, dir: -1 | 1) => {
    const newFields = [...fields]
    const target = index + dir
    if (target < 0 || target >= newFields.length) return
    ;[newFields[index], newFields[target]] = [newFields[target], newFields[index]]
    updateFields(newFields)
  }

  const needsOptions = (type: FormFieldType) => type === 'select' || type === 'radio'

  return (
    <>
      <PanelSection title="Variante">
        <FieldSelect
          sectionId={sectionId}
          label="Univers & Layout"
          variantField
          options={[
            { value: 'startup-default', label: 'Startup — Defaut' },
            { value: 'startup-split', label: 'Startup — Split' },
            { value: 'corporate-default', label: 'Corporate — Defaut' },
            { value: 'corporate-split', label: 'Corporate — Split' },
            { value: 'luxe-default', label: 'Luxe — Defaut' },
            { value: 'luxe-split', label: 'Luxe — Split' },
            { value: 'creative-default', label: 'Creatif — Defaut' },
            { value: 'creative-split', label: 'Creatif — Split' },
            { value: 'ecommerce-default', label: 'E-commerce — Defaut' },
            { value: 'ecommerce-split', label: 'E-commerce — Split' },
            { value: 'glass-default', label: 'Glass — Defaut' },
            { value: 'glass-split', label: 'Glass — Split' },
          ]}
        />
      </PanelSection>

      <PanelSection title="Contenu">
        <FieldText sectionId={sectionId} label="Titre" contentPath="title" placeholder="Envoyez-nous un message" />
        <FieldTextarea sectionId={sectionId} label="Sous-titre" contentPath="subtitle" placeholder="Remplissez le formulaire..." rows={2} />
      </PanelSection>

      <PanelSection title="Champs">
        <div className="space-y-2">
          {fields.map((field, idx) => (
            <div key={field.id} className="border border-zinc-800 rounded-lg overflow-hidden">
              {/* Header row */}
              <div
                className="flex items-center gap-2 px-3 py-2 bg-zinc-900/50 cursor-pointer"
                onClick={() => setExpandedField(expandedField === field.id ? null : field.id)}
              >
                <GripVertical className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                <span className="text-xs font-medium text-zinc-300 flex-1 truncate">
                  {field.label || field.name}
                  {field.required && <span className="text-red-400 ml-1">*</span>}
                </span>
                <span className="text-[10px] text-zinc-500 uppercase">{field.type}</span>
                <div className="flex items-center gap-0.5">
                  <button onClick={(e) => { e.stopPropagation(); moveField(idx, -1) }} className="p-0.5 text-zinc-500 hover:text-zinc-300" disabled={idx === 0}>
                    <ChevronUp className="w-3 h-3" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); moveField(idx, 1) }} className="p-0.5 text-zinc-500 hover:text-zinc-300" disabled={idx === fields.length - 1}>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); removeField(field.id) }} className="p-0.5 text-zinc-500 hover:text-red-400">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Expanded details */}
              {expandedField === field.id && (
                <div className="p-3 space-y-3 border-t border-zinc-800">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label className="text-[11px] text-zinc-500">Type</Label>
                      <select
                        value={field.type}
                        onChange={(e) => updateField(field.id, { type: e.target.value as FormFieldType })}
                        className="w-full h-8 rounded-md border border-zinc-800 bg-zinc-900 px-2 text-xs text-zinc-300"
                      >
                        {FIELD_TYPES.map(ft => (
                          <option key={ft.value} value={ft.value}>{ft.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[11px] text-zinc-500">Largeur</Label>
                      <select
                        value={field.width ?? 'full'}
                        onChange={(e) => updateField(field.id, { width: e.target.value as 'full' | 'half' })}
                        className="w-full h-8 rounded-md border border-zinc-800 bg-zinc-900 px-2 text-xs text-zinc-300"
                      >
                        <option value="full">Pleine</option>
                        <option value="half">Moitie</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-[11px] text-zinc-500">Label</Label>
                    <Input
                      value={field.label}
                      onChange={(e) => updateField(field.id, { label: e.target.value })}
                      className="h-8 text-xs bg-zinc-900 border-zinc-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-[11px] text-zinc-500">Nom (attribut name)</Label>
                    <Input
                      value={field.name}
                      onChange={(e) => updateField(field.id, { name: e.target.value })}
                      className="h-8 text-xs bg-zinc-900 border-zinc-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-[11px] text-zinc-500">Placeholder</Label>
                    <Input
                      value={field.placeholder ?? ''}
                      onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                      className="h-8 text-xs bg-zinc-900 border-zinc-800"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-[11px] text-zinc-500">Requis</Label>
                    <Switch
                      checked={field.required}
                      onCheckedChange={(v) => updateField(field.id, { required: v })}
                    />
                  </div>

                  {needsOptions(field.type) && (
                    <div className="space-y-1">
                      <Label className="text-[11px] text-zinc-500">Options (une par ligne)</Label>
                      <textarea
                        value={(field.options ?? []).join('\n')}
                        onChange={(e) => updateField(field.id, { options: e.target.value.split('\n').filter(Boolean) })}
                        className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-zinc-300 min-h-[60px] resize-y"
                        placeholder={"Option 1\nOption 2\nOption 3"}
                      />
                    </div>
                  )}

                  {field.type === 'file' && (
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <Label className="text-[11px] text-zinc-500">Types acceptes</Label>
                        <Input
                          value={field.accept ?? ''}
                          onChange={(e) => updateField(field.id, { accept: e.target.value })}
                          placeholder=".pdf,.jpg,.png"
                          className="h-8 text-xs bg-zinc-900 border-zinc-800"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-[11px] text-zinc-500">Multiples</Label>
                        <Switch
                          checked={field.multiple ?? false}
                          onCheckedChange={(v) => updateField(field.id, { multiple: v })}
                        />
                      </div>
                    </div>
                  )}

                  {/* Validation section */}
                  <div className="pt-2 border-t border-zinc-800 space-y-2">
                    <Label className="text-[11px] text-zinc-300 uppercase tracking-wider">Validation</Label>
                    {(field.type === 'text' || field.type === 'textarea' || field.type === 'password' || field.type === 'search' || field.type === 'url') && (
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <Label className="text-[10px] text-zinc-500">Min longueur</Label>
                          <Input
                            type="number"
                            value={field.validation?.minLength ?? ''}
                            onChange={(e) => updateField(field.id, { validation: { ...field.validation, minLength: e.target.value ? Number(e.target.value) : undefined } })}
                            className="h-7 text-xs bg-zinc-900 border-zinc-800"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px] text-zinc-500">Max longueur</Label>
                          <Input
                            type="number"
                            value={field.validation?.maxLength ?? ''}
                            onChange={(e) => updateField(field.id, { validation: { ...field.validation, maxLength: e.target.value ? Number(e.target.value) : undefined } })}
                            className="h-7 text-xs bg-zinc-900 border-zinc-800"
                          />
                        </div>
                      </div>
                    )}
                    {(field.type === 'number' || field.type === 'range') && (
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <Label className="text-[10px] text-zinc-500">Min</Label>
                          <Input
                            type="number"
                            value={field.validation?.min ?? ''}
                            onChange={(e) => updateField(field.id, { validation: { ...field.validation, min: e.target.value ? Number(e.target.value) : undefined } })}
                            className="h-7 text-xs bg-zinc-900 border-zinc-800"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px] text-zinc-500">Max</Label>
                          <Input
                            type="number"
                            value={field.validation?.max ?? ''}
                            onChange={(e) => updateField(field.id, { validation: { ...field.validation, max: e.target.value ? Number(e.target.value) : undefined } })}
                            className="h-7 text-xs bg-zinc-900 border-zinc-800"
                          />
                        </div>
                      </div>
                    )}
                    <div className="space-y-1">
                      <Label className="text-[10px] text-zinc-500">Message d&apos;erreur</Label>
                      <Input
                        value={field.validation?.customMessage ?? ''}
                        onChange={(e) => updateField(field.id, { validation: { ...field.validation, customMessage: e.target.value || undefined } })}
                        placeholder="Message personnalise..."
                        className="h-7 text-xs bg-zinc-900 border-zinc-800"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={addField}
            className="w-full text-xs h-8 border-dashed border-zinc-700 text-zinc-400 hover:text-zinc-200"
          >
            <Plus className="w-3 h-3 mr-1" />
            Ajouter un champ
          </Button>
        </div>
      </PanelSection>

      <PanelSection title="Bouton">
        <FieldText sectionId={sectionId} label="Texte du bouton" contentPath="submitLabel" placeholder="Envoyer" />
      </PanelSection>

      <PanelSection title="Soumission" defaultOpen={false}>
        <FieldTextarea sectionId={sectionId} label="Message de succes" contentPath="successMessage" placeholder="Merci ! Votre message a bien ete envoye." rows={2} />
        <FieldTextarea sectionId={sectionId} label="Message d'erreur" contentPath="errorMessage" placeholder="Erreur. Veuillez reessayer." rows={2} />
        <FieldText sectionId={sectionId} label="URL de redirection" contentPath="redirectUrl" placeholder="https://..." />
      </PanelSection>

      <PanelSection title="Notifications" defaultOpen={false}>
        <FieldToggle sectionId={sectionId} label="Notification email" contentPath="emailNotification.enabled" />
        {content.emailNotification?.enabled && (
          <>
            <FieldText sectionId={sectionId} label="Email destinataire" contentPath="emailNotification.to" placeholder="admin@exemple.com" />
            <FieldText sectionId={sectionId} label="Sujet de l'email" contentPath="emailNotification.subject" placeholder="Nouveau message du formulaire" />
          </>
        )}
      </PanelSection>

      <PanelSection title="CRM" defaultOpen={false}>
        <FieldToggle sectionId={sectionId} label="Creer un contact automatiquement" contentPath="createContact" />
      </PanelSection>

      <PanelSection title="Anti-spam" defaultOpen={false}>
        <FieldToggle sectionId={sectionId} label="Honeypot" contentPath="honeypot" />
        <FieldSelect
          sectionId={sectionId}
          label="Captcha"
          contentPath="captchaType"
          options={[
            { value: 'none', label: 'Aucun' },
            { value: 'recaptcha-v2', label: 'reCAPTCHA v2' },
            { value: 'recaptcha-v3', label: 'reCAPTCHA v3' },
            { value: 'hcaptcha', label: 'hCaptcha' },
          ]}
        />
        {content.captchaType && content.captchaType !== 'none' && (
          <FieldText sectionId={sectionId} label="Cle du captcha" contentPath="captchaKey" placeholder="Votre cle publique" />
        )}
      </PanelSection>

      <PanelSection title="Webhook" defaultOpen={false}>
        <FieldText sectionId={sectionId} label="URL du webhook" contentPath="webhookUrl" placeholder="https://hooks.exemple.com/..." />
      </PanelSection>
    </>
  )
}
