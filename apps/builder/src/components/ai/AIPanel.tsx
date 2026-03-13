'use client'
import { useState, useRef } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useAIGenerate } from '@/hooks/useAIGenerate'
import { useEditorStore } from '@/store/editorStore'
import { GeneratedSectionPreview } from './GeneratedSectionPreview'
import { Sparkles, Loader2, AlertCircle, Wand2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { GenerateMode } from '@/types/ai'

interface AIPanelProps {
  open: boolean
  onClose: () => void
}

const MODES: { value: GenerateMode; label: string; description: string; icon: string }[] = [
  { value: 'section', label: 'Nouvelle section', description: 'Génère une section depuis votre description', icon: '➕' },
  { value: 'improve', label: 'Améliorer', description: 'Améliore la section sélectionnée', icon: '✨' },
  { value: 'page', label: 'Page complète', description: 'Génère toute une page (4-8 sections)', icon: '📄' },
]

const QUICK_PROMPTS: Record<GenerateMode, string[]> = {
  section: [
    'Un hero centré pour une app SaaS de gestion de projet',
    'Une section features pour une plateforme e-commerce',
    'Un CTA urgent pour convertir des visiteurs en abonnés',
    '4 statistiques impressionnantes pour un SaaS B2B',
  ],
  improve: [
    'Rends le titre plus percutant et orienté bénéfices',
    'Reformule en mettant l\'accent sur la valeur client',
    'Ajoute de l\'urgence et de l\'émotion',
    'Rends le texte plus concis et direct',
  ],
  page: [
    'Landing page pour une app de productivité',
    'Site vitrine pour une agence de design',
    'Page de vente pour un cours en ligne',
    'Landing page pour un logiciel B2B',
  ],
}

export function AIPanel({ open, onClose }: AIPanelProps) {
  const [mode, setMode] = useState<GenerateMode>('section')
  const [prompt, setPrompt] = useState('')
  const { generate, loading, error, result, reset } = useAIGenerate()
  const { siteConfig, selectedSectionId, selectedPageId, addSection, updateSection } = useEditorStore()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const selectedSection = siteConfig?.pages
    .flatMap(p => p.sections)
    .find(s => s.id === selectedSectionId)

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    reset()
    const currentSection = mode === 'improve' && selectedSection
      ? JSON.stringify(selectedSection)
      : undefined
    await generate(prompt, mode, currentSection)
  }

  const handleApply = () => {
    if (!result || !selectedPageId) return
    if (mode === 'improve' && selectedSection) {
      updateSection(selectedSection.id, {
        content: result.content ?? result,
        variant: result.variant ?? selectedSection.variant,
      })
    } else {
      const sections = Array.isArray(result) ? result : [result]
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      sections.forEach((section: any) => {
        if (!section) return
        addSection(selectedPageId, {
          id: `ai-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          type: section.type,
          variant: section.variant ?? 'default',
          content: section.content ?? {},
          style: section.style ?? { background: 'white', paddingY: 'lg' },
          visible: true,
        })
      })
    }
    reset()
    setPrompt('')
    onClose()
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-96 bg-zinc-900 border-zinc-800 text-white p-0 flex flex-col">
        <SheetHeader className="px-5 py-4 border-b border-zinc-800 shrink-0">
          <SheetTitle className="text-white text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            Génération IA
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1">
          <div className="px-5 py-4 space-y-5">

            {/* Modes */}
            <div>
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Mode</p>
              <div className="space-y-1.5">
                {MODES.map(m => (
                  <button
                    key={m.value}
                    onClick={() => { setMode(m.value); reset() }}
                    disabled={m.value === 'improve' && !selectedSection}
                    className={cn(
                      'w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all',
                      mode === m.value ? 'border-indigo-500 bg-indigo-500/10' : 'border-zinc-800 hover:border-zinc-600',
                      m.value === 'improve' && !selectedSection && 'opacity-40 cursor-not-allowed'
                    )}
                  >
                    <span className="text-base leading-none mt-0.5">{m.icon}</span>
                    <div>
                      <p className="text-xs font-semibold text-white">{m.label}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">{m.description}</p>
                      {m.value === 'improve' && !selectedSection && (
                        <p className="text-xs text-amber-500 mt-0.5">Sélectionnez une section d&apos;abord</p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Section sélectionnée */}
            {mode === 'improve' && selectedSection && (
              <div className="bg-zinc-800/60 rounded-xl p-3">
                <p className="text-xs text-zinc-500 mb-1">Section à améliorer :</p>
                <p className="text-xs font-medium text-indigo-400 capitalize">{selectedSection.type}</p>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(selectedSection.content as any)?.title && (
                  <p className="text-xs text-zinc-400 truncate mt-0.5">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    &quot;{(selectedSection.content as any).title}&quot;
                  </p>
                )}
              </div>
            )}

            {/* Prompt */}
            <div>
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Votre demande</p>
              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleGenerate() }}
                placeholder={mode === 'section' ? 'Ex: Un hero pour une app de gestion de tâches...' : mode === 'improve' ? 'Ex: Rends le titre plus percutant...' : 'Ex: Landing page pour une startup fintech...'}
                rows={3}
                className="w-full bg-zinc-800 border border-zinc-700 text-white text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-zinc-600 resize-none"
              />
              <p className="text-xs text-zinc-600 mt-1">⌘↵ pour générer</p>
            </div>

            {/* Suggestions */}
            <div>
              <p className="text-xs text-zinc-600 mb-2">Suggestions :</p>
              <div className="space-y-1">
                {QUICK_PROMPTS[mode].map((qp, i) => (
                  <button key={i} onClick={() => { setPrompt(qp); textareaRef.current?.focus() }}
                    className="w-full text-left text-xs text-zinc-500 hover:text-indigo-400 py-1.5 px-3 rounded-lg hover:bg-zinc-800 transition-colors truncate">
                    {qp}
                  </button>
                ))}
              </div>
            </div>

            {/* Bouton générer */}
            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className={cn(
                'w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all',
                loading || !prompt.trim()
                  ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                  : 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
              )}
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Génération...</> : <><Wand2 className="w-4 h-4" />Générer</>}
            </button>

            {/* Erreur */}
            {error && (
              <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/30 rounded-xl p-3">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-red-400 font-medium">Erreur</p>
                  <p className="text-xs text-red-400/70 mt-0.5">{error}</p>
                  {error.includes('ANTHROPIC_API_KEY') && (
                    <p className="text-xs text-zinc-500 mt-2">
                      Ajoutez dans <code className="text-zinc-400">.env.local</code> :<br />
                      <code className="text-indigo-400">ANTHROPIC_API_KEY=sk-ant-...</code>
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Résultat */}
            {result && !error && (
              <GeneratedSectionPreview
                result={result}
                mode={mode}
                onApply={handleApply}
                onRegenerate={handleGenerate}
                loading={loading}
              />
            )}

          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
