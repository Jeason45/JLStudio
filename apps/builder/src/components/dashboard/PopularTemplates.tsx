'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { PAGE_TEMPLATES, UNIVERSE_COLORS, type PageTemplate } from '@/data/templates'
import { MiniSectionPreview } from '@/components/editor/MiniSectionPreview'

const POPULAR_IDS = ['saas-landing', 'agency-creative', 'startup-app', 'ecommerce-boutique']

export function PopularTemplates() {
  const [creating, setCreating] = useState<string | null>(null)
  const router = useRouter()

  const popular = POPULAR_IDS
    .map(id => PAGE_TEMPLATES.find(t => t.id === id))
    .filter((t): t is PageTemplate => !!t)

  const handleClick = async (template: PageTemplate) => {
    if (creating) return
    setCreating(template.id)
    try {
      const res = await fetch('/api/sites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: template.name, templateId: template.id }),
      })
      if (!res.ok) return
      const site = await res.json()
      router.push(`/editor/${site.id}`)
      router.refresh()
    } catch {
      // silent
    } finally {
      setCreating(null)
    }
  }

  return (
    <section className="mb-10">
      <h2 className="text-lg font-semibold mb-4">Templates populaires</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {popular.map(template => {
          const universe = UNIVERSE_COLORS[template.universe]
          return (
            <div
              key={template.id}
              role="button"
              tabIndex={0}
              onClick={() => handleClick(template)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(template) } }}
              className={cn(
                'group flex flex-col rounded-xl border border-zinc-700 overflow-hidden text-left transition-all hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 cursor-pointer',
                creating === template.id && 'opacity-60 pointer-events-none'
              )}
            >
              <div className="relative">
                <PopularTemplatePreview template={template} />
                <span className={cn('absolute top-2 right-2 z-10 text-[10px] font-medium px-1.5 py-0.5 rounded-full', universe.bg, universe.text)}>
                  {universe.label}
                </span>
              </div>
              <div className="p-3 bg-zinc-900">
                <p className="text-sm font-medium text-white">{template.name}</p>
                <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1">{template.description}</p>
                <p className="text-[10px] text-zinc-600 mt-1">{template.sections.length} sections</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function PopularTemplatePreview({ template }: { template: PageTemplate }) {
  const heroSection = template.sections.find(s => s.type === 'hero')
  if (!heroSection) {
    return (
      <div className={cn('h-24 bg-gradient-to-br flex items-center justify-center', template.preview)}>
        <span className="text-2xl">{template.emoji}</span>
      </div>
    )
  }
  return (
    <MiniSectionPreview
      sectionType={heroSection.type}
      variant={heroSection.variant ?? 'startup'}
      content={heroSection.content}
      style={heroSection.style ?? { background: 'white', paddingY: 'xl' }}
      scale={0.18}
    />
  )
}
