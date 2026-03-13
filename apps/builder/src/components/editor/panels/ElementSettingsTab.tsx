'use client'
import { useEditorStore } from '@/store/editorStore'
import { PanelSection } from '../PanelSection'
import { Type, MousePointer, Image as ImageIcon, Square, Plus, X, Link2, FileText, Hash, Mail, Phone } from 'lucide-react'
import { SegmentedControl } from '../fields/SegmentedControl'
import { parseElementId, getByPath } from '@/lib/elementHelpers'
import { ELEMENT_FIELDS } from '@/lib/elementFields'
import { FieldImage } from '../fields/FieldImage'
import type { ElementType } from '@/types/elements'
import type { CmsFieldBinding, CmsFieldBindingProperty, CmsVisibilityRule, CmsVisibilityCondition } from '@/types/cms'

const INPUT = 'w-full h-7 bg-[#111] border border-[#333] text-white text-[11px] rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-600'
const SELECT = 'w-full h-7 bg-[#111] border border-[#333] text-white text-[11px] rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue cursor-pointer'
const LBL = 'text-[10px] text-zinc-500'
const CHK_LABEL = 'flex items-start gap-2 text-[11px] text-[#ccc] cursor-pointer'
const CHK = 'mt-0.5 w-3.5 h-3.5 rounded border-[#555] accent-blue-500 shrink-0 cursor-pointer'

const TYPE_ICONS: Record<string, React.ReactNode> = {
  heading: <Type className="w-3.5 h-3.5" />,
  text: <Type className="w-3.5 h-3.5" />,
  button: <MousePointer className="w-3.5 h-3.5" />,
  image: <ImageIcon className="w-3.5 h-3.5" />,
  badge: <Square className="w-3.5 h-3.5" />,
}

const VISIBILITY_OPTIONS = [
  { value: 'visible', label: 'Visible' },
  { value: 'hidden', label: 'Hidden' },
] as const

const ATTR_SUGGESTIONS = [
  'data-', 'aria-label', 'aria-describedby', 'aria-hidden', 'role', 'tabindex', 'loading', 'title', 'data-testid', 'data-id',
]

const HTML_TAG_OPTIONS = [
  'div', 'section', 'article', 'aside', 'main', 'header', 'footer', 'nav',
  'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'ul', 'ol', 'li', 'figure', 'figcaption',
]

const CMS_BINDING_PROPERTIES: { value: CmsFieldBindingProperty; label: string }[] = [
  { value: 'textContent', label: 'Contenu texte' },
  { value: 'src', label: 'Image src' },
  { value: 'href', label: 'Lien href' },
  { value: 'alt', label: 'Alt text' },
  { value: 'innerHTML', label: 'HTML interne' },
]

const CMS_VISIBILITY_CONDITIONS: { value: CmsVisibilityCondition; label: string }[] = [
  { value: 'is-set', label: 'Est defini' },
  { value: 'is-not-set', label: 'Non defini' },
  { value: 'equals', label: 'Egal a' },
  { value: 'not-equals', label: 'Different de' },
  { value: 'contains', label: 'Contient' },
  { value: 'gt', label: 'Superieur a' },
  { value: 'lt', label: 'Inferieur a' },
]

/* Link type icons — Webflow has 5 types */
type LinkType = 'url' | 'page' | 'section' | 'email' | 'phone'
const LINK_TYPES: { type: LinkType; icon: React.ReactNode; title: string }[] = [
  { type: 'url', icon: <Link2 className="w-3.5 h-3.5" />, title: 'URL' },
  { type: 'page', icon: <FileText className="w-3.5 h-3.5" />, title: 'Page' },
  { type: 'section', icon: <Hash className="w-3.5 h-3.5" />, title: 'Section' },
  { type: 'email', icon: <Mail className="w-3.5 h-3.5" />, title: 'Email' },
  { type: 'phone', icon: <Phone className="w-3.5 h-3.5" />, title: 'Phone' },
]

export function ElementSettingsTab() {
  const { selectedElementPath, siteConfig, updateElementContent, updateElementSettings, setCmsFieldBinding, setCmsVisibility } = useEditorStore()

  if (!selectedElementPath) return null

  const parsed = parseElementId(selectedElementPath)
  if (!parsed) return null

  const { sectionId, contentPath } = parsed

  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  if (!section) return null

  const el = document.querySelector(`[data-element-id="${selectedElementPath}"]`) as HTMLElement | null
  const elementType = (el?.getAttribute('data-element-type') ?? 'text') as ElementType
  const isImage = elementType === 'image'
  const isButton = elementType === 'button' || elementType === 'link'
  const elementLabel = elementType.charAt(0).toUpperCase() + elementType.slice(1)

  const contentFields = ELEMENT_FIELDS[elementType] ?? []

  // Read persisted settings
  const settings = (section.content.__elementSettings as Record<string, Record<string, unknown>> | undefined)?.[contentPath] ?? {}
  const elementId = (settings.htmlId as string) ?? ''
  const htmlTag = (settings.htmlTag as string) ?? ''
  const visibility = (settings.visibility as string) ?? 'visible'
  const linkType = (settings.linkType as LinkType) ?? 'url'
  const openInNewTab = (settings.openInNewTab as boolean) ?? false
  const preload = (settings.preload as string) ?? 'default'
  const keepInHtml = (settings.keepInHtmlWhenHidden as boolean) ?? false
  const allowEdit = (settings.allowEditInEditor as boolean) ?? true
  const excludeSearch = (settings.excludeFromSearch as boolean) ?? true
  const customAttrs: { name: string; value: string }[] = (() => {
    const raw = settings.customAttributes
    if (!raw) return []
    if (Array.isArray(raw)) return raw as { name: string; value: string }[]
    if (typeof raw === 'string') {
      try { return JSON.parse(raw) } catch { return [] }
    }
    return []
  })()

  const setSetting = (key: string, value: unknown) => {
    updateElementSettings(sectionId, contentPath, { [key]: value })
  }

  const getContentValue = (fieldKey: string): string => {
    if (fieldKey === 'text' || fieldKey === 'label') {
      const val = getByPath(section.content as Record<string, unknown>, contentPath)
      if (typeof val === 'string') return val
      if (typeof val === 'object' && val !== null) {
        return (val as Record<string, unknown>)[fieldKey] as string ?? ''
      }
      return ''
    }
    // For image src: if contentPath points directly to a string, use it
    if (fieldKey === 'src') {
      const directVal = getByPath(section.content as Record<string, unknown>, contentPath)
      if (typeof directVal === 'string') return directVal
    }
    const fullPath = `${contentPath}.${fieldKey}`
    const val = getByPath(section.content as Record<string, unknown>, fullPath)
    return typeof val === 'string' ? val : (val?.toString() ?? '')
  }

  const setContentValue = (fieldKey: string, value: string) => {
    if (fieldKey === 'text') {
      const currentVal = getByPath(section.content as Record<string, unknown>, contentPath)
      if (typeof currentVal === 'string') {
        updateElementContent(sectionId, contentPath, value)
      } else {
        updateElementContent(sectionId, `${contentPath}.text`, value)
      }
    } else if (fieldKey === 'label') {
      const currentVal = getByPath(section.content as Record<string, unknown>, contentPath)
      if (typeof currentVal === 'string') {
        updateElementContent(sectionId, contentPath, value)
      } else {
        updateElementContent(sectionId, `${contentPath}.${fieldKey}`, value)
      }
    } else if (fieldKey === 'src') {
      // If contentPath points to a string (direct image URL), update directly
      const currentVal = getByPath(section.content as Record<string, unknown>, contentPath)
      if (typeof currentVal === 'string') {
        updateElementContent(sectionId, contentPath, value)
      } else {
        updateElementContent(sectionId, `${contentPath}.${fieldKey}`, value)
      }
    } else {
      updateElementContent(sectionId, `${contentPath}.${fieldKey}`, value)
    }
  }

  // Handle link type changes — update href prefix
  const handleLinkTypeChange = (type: LinkType) => {
    setSetting('linkType', type)
    const currentHref = getContentValue('href')
    if (type === 'email' && !currentHref.startsWith('mailto:')) {
      setContentValue('href', 'mailto:')
    } else if (type === 'phone' && !currentHref.startsWith('tel:')) {
      setContentValue('href', 'tel:')
    } else if (type === 'section' && !currentHref.startsWith('#')) {
      setContentValue('href', '#')
    }
  }

  // Handle open in new tab
  const handleOpenInNewTab = (checked: boolean) => {
    setSetting('openInNewTab', checked)
    setContentValue('target', checked ? '_blank' : '_self')
  }

  // URL label based on link type
  const urlLabel = linkType === 'email' ? 'Email' : linkType === 'phone' ? 'Phone' : 'URL'
  const urlPlaceholder = linkType === 'email' ? 'mailto:hello@example.com'
    : linkType === 'phone' ? 'tel:+33612345678'
    : linkType === 'section' ? '#section-id'
    : linkType === 'page' ? '/page-slug'
    : '#'

  // Filter content fields — remove href/target (now in Link settings)
  const filteredContentFields = contentFields.filter(f => !isButton || (f.key !== 'href' && f.key !== 'target'))

  return (
    <>
      {/* ID, Tag, Visibility */}
      <div className="px-3 py-3 space-y-3 border-b border-[#333]">
        <div className="flex items-center gap-3">
          <label className={`${LBL} w-16 shrink-0`}>ID</label>
          <input
            value={elementId}
            onChange={e => setSetting('htmlId', e.target.value || undefined)}
            placeholder="For in-page linking"
            className={INPUT}
          />
        </div>
        <div className="flex items-center gap-3">
          <label className={`${LBL} w-16 shrink-0`}>Visibility</label>
          <SegmentedControl
            options={VISIBILITY_OPTIONS}
            value={visibility}
            onChange={v => setSetting('visibility', v ?? 'visible')}
          />
        </div>
      </div>

      {/* Link settings — for button/link elements */}
      {isButton && (
        <PanelSection title="Link settings" compact>
          {/* Link type icons */}
          <div className="flex rounded overflow-hidden border border-[#333]">
            {LINK_TYPES.map(lt => (
              <button key={lt.type} onClick={() => handleLinkTypeChange(lt.type)}
                className={`flex-1 h-8 flex items-center justify-center border-r border-[#333] last:border-r-0 transition-colors ${
                  linkType === lt.type ? 'bg-[#111] text-white' : 'bg-[#333] text-[#999] hover:text-white'
                }`} title={lt.title}>
                {lt.icon}
              </button>
            ))}
          </div>

          {/* URL */}
          <div className="flex items-center gap-3 mt-2">
            <label className={`${LBL} w-14 shrink-0`}>{urlLabel}</label>
            <input
              value={getContentValue('href')}
              onChange={e => setContentValue('href', e.target.value)}
              placeholder={urlPlaceholder}
              className={INPUT}
            />
          </div>

          {/* Open in new tab — checkbox */}
          <label className="flex items-center gap-2 mt-2 cursor-pointer">
            <input type="checkbox" checked={openInNewTab}
              onChange={e => handleOpenInNewTab(e.target.checked)}
              className={CHK} />
            <span className="text-[11px] text-[#ccc]">Open in new tab</span>
          </label>

          {/* Preload */}
          <div className="flex items-center gap-3 mt-2">
            <label className={`${LBL} w-14 shrink-0`}>Preload</label>
            <select value={preload} onChange={e => setSetting('preload', e.target.value)} className={SELECT}>
              <option value="default">Default</option>
              <option value="prefetch">Prefetch</option>
              <option value="prerender">Prerender</option>
            </select>
          </div>
        </PanelSection>
      )}

      {/* Content fields (element-type specific) */}
      {filteredContentFields.length > 0 && (
        <PanelSection title={`${elementLabel} settings`} compact>
          {filteredContentFields.map(field => (
            <div key={field.key} className="space-y-0.5">
              {field.kind === 'image' ? (
                <FieldImage
                  sectionId={sectionId}
                  label={field.label}
                  contentPath={(() => {
                    // If contentPath directly points to a string, use it (e.g. slides.0.image)
                    const directVal = getByPath(section.content as Record<string, unknown>, contentPath)
                    if (typeof directVal === 'string') return contentPath
                    // Otherwise append the field key (e.g. image → image.src)
                    return `${contentPath}.${field.key}`
                  })()}
                />
              ) : (
              <>
              <label className={LBL}>{field.label}</label>
              {field.kind === 'textarea' ? (
                <textarea
                  value={getContentValue(field.key)}
                  onChange={e => setContentValue(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  rows={2}
                  className="w-full bg-[#111] border border-[#333] text-white text-[11px] rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-600 resize-none"
                />
              ) : (
                <input
                  value={getContentValue(field.key)}
                  onChange={e => setContentValue(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className={INPUT}
                />
              )}
              </>
              )}
            </div>
          ))}

        </PanelSection>
      )}

      {/* Custom Attributes */}
      <PanelSection title="Custom attributes" compact defaultOpen={false}>
        {customAttrs.length === 0 && (
          <p className="text-[10px] text-zinc-600 text-center py-2">None</p>
        )}
        {customAttrs.map((attr, i) => (
          <div key={i} className="flex gap-1.5 items-end">
            <div className="flex-1 space-y-0.5">
              <label className={LBL}>Name</label>
              <input
                value={attr.name}
                onChange={e => {
                  const copy = [...customAttrs]
                  copy[i] = { ...copy[i], name: e.target.value }
                  setSetting('customAttributes', copy)
                }}
                placeholder="data-*"
                className={INPUT}
                list={`attr-suggestions-${i}`}
              />
              <datalist id={`attr-suggestions-${i}`}>
                {ATTR_SUGGESTIONS.map(s => <option key={s} value={s} />)}
              </datalist>
            </div>
            <div className="flex-1 space-y-0.5">
              <label className={LBL}>Value</label>
              <input
                value={attr.value}
                onChange={e => {
                  const copy = [...customAttrs]
                  copy[i] = { ...copy[i], value: e.target.value }
                  setSetting('customAttributes', copy)
                }}
                placeholder="..."
                className={INPUT}
              />
            </div>
            <button
              onClick={() => setSetting('customAttributes', customAttrs.filter((_, j) => j !== i))}
              className="h-7 w-7 flex items-center justify-center text-zinc-500 hover:text-red-400 shrink-0"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
        <button
          onClick={() => setSetting('customAttributes', [...customAttrs, { name: '', value: '' }])}
          className="w-full flex items-center justify-center gap-1 py-1.5 text-[10px] text-zinc-500 hover:text-zinc-300 border border-dashed border-[#444] rounded transition-colors mt-1"
        >
          <Plus className="w-3 h-3" /> Add attribute
        </button>
      </PanelSection>

      {/* Advanced */}
      <PanelSection title="Advanced" compact defaultOpen={false}>
        <div className="space-y-2.5">
          <label className={CHK_LABEL}>
            <input type="checkbox" checked={keepInHtml}
              onChange={e => setSetting('keepInHtmlWhenHidden', e.target.checked)}
              className={CHK} />
            <span>Keep in HTML when hidden</span>
          </label>
          <label className={CHK_LABEL}>
            <input type="checkbox" checked={allowEdit}
              onChange={e => setSetting('allowEditInEditor', e.target.checked)}
              className={CHK} />
            <span>Allow users to edit this element in edit mode and the Editor</span>
          </label>
          <label className={CHK_LABEL}>
            <input type="checkbox" checked={excludeSearch}
              onChange={e => setSetting('excludeFromSearch', e.target.checked)}
              className={CHK} />
            <span>Exclude {elementLabel}&apos;s content from site search results</span>
          </label>
          <p className="text-[10px] text-[#777] bg-[#1a1a1a] rounded px-2 py-1.5 leading-relaxed">
            To exclude the whole page, go to its <span className="underline text-[#aaa] cursor-pointer">Page settings</span>.
          </p>
        </div>
      </PanelSection>

      {/* Embed Code — for custom-embed elements */}
      {section.type === 'custom' && (() => {
        const embedHtml = (() => {
          const val = getByPath(section.content as Record<string, unknown>, contentPath)
          if (typeof val === 'object' && val !== null) return (val as Record<string, unknown>).html as string ?? ''
          return ''
        })()
        const el2 = document.querySelector(`[data-element-id="${selectedElementPath}"]`)
        const elType2 = el2?.getAttribute('data-element-type')
        if (elType2 !== 'embed' && !contentPath.includes('embed')) return null
        return (
          <PanelSection title="Embed Code" compact defaultOpen>
            <textarea
              value={embedHtml}
              onChange={e => updateElementContent(sectionId, `${contentPath}.html`, e.target.value)}
              placeholder="<!-- Paste embed code -->"
              rows={6}
              className="w-full bg-[#111] border border-[#333] text-[10px] font-mono text-zinc-300 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-700 resize-none"
            />
          </PanelSection>
        )
      })()}

      {/* CMS Field Binding */}
      {section.content.__cmsBinding && (
        <PanelSection title="CMS Binding" compact defaultOpen={false}>
          {(() => {
            const fieldBindings = (section.content.__fieldBindings ?? {}) as Record<string, CmsFieldBinding>
            const binding = fieldBindings[contentPath]
            return (
              <div className="space-y-2">
                <div>
                  <label className={LBL}>Champ CMS</label>
                  <input
                    value={binding?.fieldSlug ?? ''}
                    onChange={e => {
                      const b: CmsFieldBinding = {
                        fieldSlug: e.target.value,
                        property: binding?.property ?? 'textContent',
                        fallback: binding?.fallback,
                      }
                      setCmsFieldBinding(sectionId, contentPath, b)
                    }}
                    placeholder="slug du champ..."
                    className={INPUT}
                  />
                </div>
                <div>
                  <label className={LBL}>Propriete cible</label>
                  <select
                    value={binding?.property ?? 'textContent'}
                    onChange={e => {
                      if (!binding) return
                      setCmsFieldBinding(sectionId, contentPath, { ...binding, property: e.target.value as CmsFieldBindingProperty })
                    }}
                    className={SELECT}
                  >
                    {CMS_BINDING_PROPERTIES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className={LBL}>Fallback</label>
                  <input
                    value={binding?.fallback ?? ''}
                    onChange={e => {
                      if (!binding) return
                      setCmsFieldBinding(sectionId, contentPath, { ...binding, fallback: e.target.value || undefined })
                    }}
                    placeholder="Valeur par defaut..."
                    className={INPUT}
                  />
                </div>
              </div>
            )
          })()}
        </PanelSection>
      )}

      {/* CMS Conditional Visibility */}
      {section.content.__cmsBinding && (
        <PanelSection title="CMS Visibility" compact defaultOpen={false}>
          {(() => {
            const visibilityRules = (section.content.__cmsVisibility ?? {}) as Record<string, CmsVisibilityRule>
            const rule = visibilityRules[contentPath]
            return (
              <div className="space-y-2">
                <div>
                  <label className={LBL}>Champ condition</label>
                  <input
                    value={rule?.fieldSlug ?? ''}
                    onChange={e => {
                      const r: CmsVisibilityRule = {
                        fieldSlug: e.target.value,
                        condition: rule?.condition ?? 'is-set',
                        value: rule?.value,
                        action: rule?.action ?? 'show',
                      }
                      setCmsVisibility(sectionId, contentPath, r)
                    }}
                    placeholder="slug du champ..."
                    className={INPUT}
                  />
                </div>
                {rule && (
                  <>
                    <div>
                      <label className={LBL}>Condition</label>
                      <select
                        value={rule.condition}
                        onChange={e => setCmsVisibility(sectionId, contentPath, { ...rule, condition: e.target.value as CmsVisibilityCondition })}
                        className={SELECT}
                      >
                        {CMS_VISIBILITY_CONDITIONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                      </select>
                    </div>
                    {!['is-set', 'is-not-set'].includes(rule.condition) && (
                      <div>
                        <label className={LBL}>Valeur</label>
                        <input
                          value={String(rule.value ?? '')}
                          onChange={e => setCmsVisibility(sectionId, contentPath, { ...rule, value: e.target.value })}
                          className={INPUT}
                        />
                      </div>
                    )}
                    <div>
                      <label className={LBL}>Action</label>
                      <select
                        value={rule.action}
                        onChange={e => setCmsVisibility(sectionId, contentPath, { ...rule, action: e.target.value as 'show' | 'hide' })}
                        className={SELECT}
                      >
                        <option value="show">Afficher si vrai</option>
                        <option value="hide">Masquer si vrai</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
            )
          })()}
        </PanelSection>
      )}
    </>
  )
}
