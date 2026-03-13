'use client'
import { useState, useCallback } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { ScrollArea } from '@/components/ui/scroll-area'
import { AlertTriangle, AlertCircle, Info, CheckCircle2, RefreshCw, ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { runAudits, type AuditResult, type AuditCategory, type Severity } from '@/lib/audits'

const SEVERITY_ICONS: Record<Severity, React.ReactNode> = {
  error: <AlertCircle className="w-3.5 h-3.5 text-red-400" />,
  warning: <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />,
  info: <Info className="w-3.5 h-3.5 text-blue-400" />,
  pass: <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />,
}

const SEVERITY_COLORS: Record<Severity, string> = {
  error: 'border-red-500/20 bg-red-500/5',
  warning: 'border-yellow-500/20 bg-yellow-500/5',
  info: 'border-blue-500/20 bg-blue-500/5',
  pass: 'border-green-500/20 bg-green-500/5',
}

const CATEGORIES: { id: AuditCategory; label: string }[] = [
  { id: 'seo', label: 'SEO' },
  { id: 'accessibility', label: 'Accessibility' },
  { id: 'performance', label: 'Performance' },
]

export function AuditsPanel() {
  const { siteConfig } = useEditorStore()
  const [activeCategory, setActiveCategory] = useState<AuditCategory | 'all'>('all')
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [results, setResults] = useState<AuditResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [hasRun, setHasRun] = useState(false)

  const filteredResults = activeCategory === 'all'
    ? results
    : results.filter(r => r.category === activeCategory)

  const counts = {
    error: results.filter(r => r.severity === 'error').length,
    warning: results.filter(r => r.severity === 'warning').length,
    info: results.filter(r => r.severity === 'info').length,
    pass: results.filter(r => r.severity === 'pass').length,
  }

  const toggleExpand = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const handleRunAudit = useCallback(() => {
    if (!siteConfig) return
    setIsRunning(true)
    // Small delay for UX feedback
    setTimeout(() => {
      setResults(runAudits(siteConfig))
      setIsRunning(false)
      setHasRun(true)
    }, 300)
  }, [siteConfig])

  return (
    <>
      {/* Run audit button + summary */}
      <div className="px-3 py-3 border-b border-zinc-700/50 shrink-0">
        <button
          onClick={handleRunAudit}
          disabled={isRunning || !siteConfig}
          className="w-full flex items-center justify-center gap-1.5 py-2 rounded text-[11px] font-medium bg-wf-blue text-white hover:bg-wf-blue/90 disabled:opacity-60 transition-colors"
        >
          <RefreshCw className={cn('w-3.5 h-3.5', isRunning && 'animate-spin')} />
          {isRunning ? 'Running audit...' : 'Run audit'}
        </button>
        {hasRun && (
          <div className="flex items-center justify-center gap-3 mt-2">
            <span className="flex items-center gap-1 text-[10px] text-red-400">{counts.error} errors</span>
            <span className="flex items-center gap-1 text-[10px] text-yellow-400">{counts.warning} warnings</span>
            <span className="flex items-center gap-1 text-[10px] text-green-400">{counts.pass} passed</span>
          </div>
        )}
      </div>

      {/* Category filter */}
      <div className="flex border-b border-zinc-700/50 shrink-0">
        <button
          onClick={() => setActiveCategory('all')}
          className={cn('flex-1 py-1.5 text-[10px] font-medium transition-colors', activeCategory === 'all' ? 'text-white border-b border-wf-blue' : 'text-zinc-500 hover:text-zinc-400')}
        >
          All
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn('flex-1 py-1.5 text-[10px] font-medium transition-colors', activeCategory === cat.id ? 'text-white border-b border-wf-blue' : 'text-zinc-500 hover:text-zinc-400')}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {!hasRun ? (
            <div className="flex flex-col items-center justify-center py-12 text-center px-4">
              <p className="text-[11px] text-zinc-500">Click &quot;Run audit&quot; to analyze your site.</p>
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center px-4">
              <CheckCircle2 className="w-8 h-8 text-green-400 mb-2" />
              <p className="text-[11px] text-zinc-400">No issues found in this category.</p>
            </div>
          ) : (
            filteredResults.map(result => (
              <div key={result.id} className={cn('rounded border', SEVERITY_COLORS[result.severity])}>
                <button
                  onClick={() => toggleExpand(result.id)}
                  className="w-full flex items-center gap-2 px-2 py-2 text-left"
                >
                  {SEVERITY_ICONS[result.severity]}
                  <span className="flex-1 text-[11px] text-[#ccc] truncate">{result.title}</span>
                  {expanded.has(result.id) ? <ChevronDown className="w-3 h-3 text-zinc-500" /> : <ChevronRight className="w-3 h-3 text-zinc-500" />}
                </button>
                {expanded.has(result.id) && (
                  <div className="px-2 pb-2 pl-8">
                    <p className="text-[10px] text-zinc-500 leading-relaxed">{result.description}</p>
                    {result.element && (
                      <p className="text-[9px] text-zinc-500 mt-1">Element: {result.element}</p>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </>
  )
}
