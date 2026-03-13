'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sparkles, LayoutTemplate, Plus } from 'lucide-react'
import { CreateSiteDialog } from './CreateSiteDialog'
import { TemplatesModal } from '@/components/editor/TemplatesModal'
import type { PageTemplate } from '@/data/templates'

const ICONS = {
  sparkles: Sparkles,
  template: LayoutTemplate,
  plus: Plus,
} as const

interface StartBuildingCardProps {
  icon: keyof typeof ICONS
  title: string
  description: string
  action: 'coming-soon' | 'blank' | 'template'
}

export function StartBuildingCard({ icon, title, description, action }: StartBuildingCardProps) {
  const Icon = ICONS[icon]
  const [showTemplates, setShowTemplates] = useState(false)
  const [creating, setCreating] = useState(false)
  const router = useRouter()

  const handleSelectTemplate = async (template: PageTemplate) => {
    if (creating) return
    setCreating(true)
    try {
      const res = await fetch('/api/sites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: template.name, templateId: template.id }),
      })
      if (!res.ok) {
        console.error('[StartBuildingCard] create from template failed', res.status, await res.text())
        return
      }
      const site = await res.json()
      setShowTemplates(false)
      router.push(`/editor/${site.id}`)
      router.refresh()
    } catch (err) {
      console.error('[StartBuildingCard] create from template error', err)
    } finally {
      setCreating(false)
    }
  }

  const cardClassName = "flex flex-col items-center gap-3 p-8 rounded-xl border border-zinc-700 bg-zinc-900 hover:border-indigo-500 hover:bg-zinc-800/80 transition-colors text-center cursor-pointer"

  if (action === 'blank') {
    return (
      <CreateSiteDialog defaultStep="blank-form">
        <button type="button" className={cardClassName}>
          <div className="w-12 h-12 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">{title}</p>
            <p className="text-xs text-zinc-500 mt-1">{description}</p>
          </div>
        </button>
      </CreateSiteDialog>
    )
  }

  if (action === 'template') {
    return (
      <>
        <button type="button" onClick={() => setShowTemplates(true)} className={cardClassName}>
          <div className="w-12 h-12 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">{title}</p>
            <p className="text-xs text-zinc-500 mt-1">{description}</p>
          </div>
        </button>
        {showTemplates && (
          <TemplatesModal
            onSelect={handleSelectTemplate}
            onClose={() => setShowTemplates(false)}
          />
        )}
      </>
    )
  }

  // coming-soon — same active style, with "Coming soon" badge
  return (
    <button
      type="button"
      onClick={() => alert('Coming soon')}
      className={`relative ${cardClassName}`}
    >
      <div className="w-12 h-12 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="text-xs text-zinc-500 mt-1">{description}</p>
      </div>
      <span className="absolute top-3 right-3 text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/15 text-indigo-400 font-medium">
        Coming soon
      </span>
    </button>
  )
}
