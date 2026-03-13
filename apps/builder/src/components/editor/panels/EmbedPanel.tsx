'use client'
import { useEditorStore } from '@/store/editorStore'
import { PanelSection } from '../PanelSection'
import { CodeEditor } from '../CodeEditor'
import { parseElementId, getByPath } from '@/lib/elementHelpers'

const PRESETS: { label: string; code: string }[] = [
  { label: 'YouTube', code: '<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>' },
  { label: 'Vimeo', code: '<iframe src="https://player.vimeo.com/video/VIDEO_ID" width="640" height="360" frameborder="0" allowfullscreen></iframe>' },
  { label: 'Google Maps', code: '<iframe src="https://www.google.com/maps/embed?pb=PLACE_ID" width="600" height="450" style="border:0;" allowfullscreen loading="lazy"></iframe>' },
  { label: 'Twitter', code: '<blockquote class="twitter-tweet"><a href="https://twitter.com/user/status/ID"></a></blockquote><script async src="https://platform.twitter.com/widgets.js"></script>' },
]

export function EmbedPanel() {
  const { selectedElementPath, siteConfig, updateElementContent } = useEditorStore()

  if (!selectedElementPath) return null

  const parsed = parseElementId(selectedElementPath)
  if (!parsed) return null

  const { sectionId, contentPath } = parsed
  const section = siteConfig?.pages.flatMap(p => p.sections).find(s => s.id === sectionId)
  if (!section) return null

  const currentHtml = (() => {
    const val = getByPath(section.content as Record<string, unknown>, contentPath)
    if (typeof val === 'object' && val !== null) {
      return (val as Record<string, unknown>).html as string ?? ''
    }
    return ''
  })()

  return (
    <PanelSection title="Embed Code" compact>
      <CodeEditor
        value={currentHtml}
        onChange={v => updateElementContent(sectionId, `${contentPath}.html`, v)}
        language="html"
        rows={10}
        placeholder="<!-- Paste your embed code here -->"
      />
      <div className="mt-2">
        <p className="text-[10px] text-zinc-500 mb-1">Presets</p>
        <div className="flex flex-wrap gap-1">
          {PRESETS.map(p => (
            <button
              key={p.label}
              onClick={() => updateElementContent(sectionId, `${contentPath}.html`, p.code)}
              className="px-2 py-1 text-[9px] bg-zinc-800 text-zinc-400 rounded hover:bg-zinc-700 hover:text-white transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </PanelSection>
  )
}
