'use client'
import { useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useEditorStore } from '@/store/editorStore'
import { Rocket, Copy, Check, ExternalLink, Clock, ToggleLeft, ToggleRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PublishPanelProps {
  open: boolean
  onClose: () => void
}

// Mock deploy history
const MOCK_HISTORY = [
  { id: '1', timestamp: '2026-03-08T14:30:00Z', status: 'success' as const, duration: '12s' },
  { id: '2', timestamp: '2026-03-07T10:15:00Z', status: 'success' as const, duration: '9s' },
  { id: '3', timestamp: '2026-03-06T16:45:00Z', status: 'success' as const, duration: '11s' },
  { id: '4', timestamp: '2026-03-05T09:00:00Z', status: 'failed' as const, duration: '3s' },
  { id: '5', timestamp: '2026-03-04T11:20:00Z', status: 'success' as const, duration: '10s' },
]

function formatDate(iso: string): string {
  try {
    const d = new Date(iso)
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  } catch {
    return iso
  }
}

export function PublishPanel({ open, onClose }: PublishPanelProps) {
  const { siteConfig, updateDeploy } = useEditorStore()
  const [isPublishing, setIsPublishing] = useState(false)
  const [publishResult, setPublishResult] = useState<'success' | 'error' | null>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [activeEnv, setActiveEnv] = useState<'staging' | 'production'>('production')

  const deploy = siteConfig?.deploy ?? {}
  const siteName = siteConfig?.meta.title ?? 'site'
  const slugified = siteName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  const stagingUrl = deploy.stagingUrl || `https://${slugified}.staging.example.com`
  const productionUrl = deploy.productionUrl || `https://${slugified}.example.com`

  const handlePublish = async () => {
    setIsPublishing(true)
    setPublishResult(null)
    // Simulate publish
    await new Promise(resolve => setTimeout(resolve, 2000))
    updateDeploy({ lastPublishedAt: new Date().toISOString() })
    setIsPublishing(false)
    setPublishResult('success')
    setTimeout(() => setPublishResult(null), 3000)
  }

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const handleToggleAutoDeploy = () => {
    updateDeploy({ autoDeploy: !deploy.autoDeploy })
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-96 bg-zinc-900 border-zinc-800 text-white p-0 flex flex-col">
        <SheetHeader className="px-5 py-4 border-b border-zinc-800 shrink-0">
          <SheetTitle className="text-white text-sm flex items-center gap-2">
            <Rocket className="w-4 h-4 text-green-400" />
            Publish
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">

          {/* Publish button */}
          <div>
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className={cn(
                'w-full h-11 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2',
                isPublishing
                  ? 'bg-green-700 text-green-100 cursor-wait'
                  : publishResult === 'success'
                    ? 'bg-green-600 text-white'
                    : 'bg-green-600 hover:bg-green-700 text-white active:scale-[0.98]'
              )}
            >
              {isPublishing ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Publishing...
                </>
              ) : publishResult === 'success' ? (
                <>
                  <Check className="w-4 h-4" />
                  Published!
                </>
              ) : (
                <>
                  <Rocket className="w-4 h-4" />
                  Publish to {activeEnv === 'production' ? 'Production' : 'Staging'}
                </>
              )}
            </button>

            {deploy.lastPublishedAt && (
              <p className="text-[10px] text-zinc-500 mt-2 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Last published: {formatDate(deploy.lastPublishedAt)}
              </p>
            )}
          </div>

          {/* Environment toggle */}
          <div>
            <p className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider mb-2">Environment</p>
            <div className="flex rounded-lg overflow-hidden border border-zinc-700">
              <button
                onClick={() => setActiveEnv('staging')}
                className={cn(
                  'flex-1 h-8 text-[11px] font-medium transition-colors',
                  activeEnv === 'staging'
                    ? 'bg-orange-600/20 text-orange-400 border-r border-zinc-700'
                    : 'bg-zinc-800 text-zinc-500 hover:text-zinc-300 border-r border-zinc-700'
                )}
              >
                Staging
              </button>
              <button
                onClick={() => setActiveEnv('production')}
                className={cn(
                  'flex-1 h-8 text-[11px] font-medium transition-colors',
                  activeEnv === 'production'
                    ? 'bg-green-600/20 text-green-400'
                    : 'bg-zinc-800 text-zinc-500 hover:text-zinc-300'
                )}
              >
                Production
              </button>
            </div>
          </div>

          {/* URLs */}
          <div className="space-y-3">
            {/* Staging URL */}
            <div>
              <p className="text-[10px] text-zinc-500 mb-1">Staging URL</p>
              <div className="flex items-center gap-1">
                <div className="flex-1 h-7 bg-zinc-800 border border-zinc-700 rounded px-2 flex items-center">
                  <span className="text-[11px] text-zinc-400 truncate">{stagingUrl}</span>
                </div>
                <button
                  onClick={() => handleCopy(stagingUrl, 'staging')}
                  className="w-7 h-7 flex items-center justify-center rounded border border-zinc-700 bg-zinc-800 text-zinc-500 hover:text-white transition-colors shrink-0"
                  title="Copy URL"
                >
                  {copiedField === 'staging' ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                </button>
                <a
                  href={stagingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 flex items-center justify-center rounded border border-zinc-700 bg-zinc-800 text-zinc-500 hover:text-white transition-colors shrink-0"
                  title="Open"
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Production URL */}
            <div>
              <p className="text-[10px] text-zinc-500 mb-1">Production URL</p>
              <div className="flex items-center gap-1">
                <div className="flex-1 h-7 bg-zinc-800 border border-zinc-700 rounded px-2 flex items-center">
                  <span className="text-[11px] text-zinc-400 truncate">{productionUrl}</span>
                </div>
                <button
                  onClick={() => handleCopy(productionUrl, 'production')}
                  className="w-7 h-7 flex items-center justify-center rounded border border-zinc-700 bg-zinc-800 text-zinc-500 hover:text-white transition-colors shrink-0"
                  title="Copy URL"
                >
                  {copiedField === 'production' ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                </button>
                <a
                  href={productionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 flex items-center justify-center rounded border border-zinc-700 bg-zinc-800 text-zinc-500 hover:text-white transition-colors shrink-0"
                  title="Open"
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Auto-deploy */}
          <div className="flex items-center justify-between p-3 bg-zinc-800 border border-zinc-700 rounded">
            <div>
              <p className="text-[11px] text-zinc-300 font-medium">Auto-deploy</p>
              <p className="text-[10px] text-zinc-500">Publish automatically on save</p>
            </div>
            <button
              onClick={handleToggleAutoDeploy}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              {deploy.autoDeploy ? (
                <ToggleRight className="w-7 h-7 text-green-400" />
              ) : (
                <ToggleLeft className="w-7 h-7" />
              )}
            </button>
          </div>

          {/* Deploy history */}
          <div>
            <p className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider mb-2">Recent deploys</p>
            <div className="space-y-1">
              {MOCK_HISTORY.map(entry => (
                <div key={entry.id} className="flex items-center gap-2 px-2.5 py-2 bg-zinc-800/30 border border-zinc-800 rounded">
                  <span className={cn(
                    'w-2 h-2 rounded-full shrink-0',
                    entry.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                  )} />
                  <span className="flex-1 text-[10px] text-zinc-400">
                    {formatDate(entry.timestamp)}
                  </span>
                  <span className={cn(
                    'text-[9px] px-1.5 py-0.5 rounded font-medium',
                    entry.status === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                  )}>
                    {entry.status}
                  </span>
                  <span className="text-[9px] text-zinc-600">{entry.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
