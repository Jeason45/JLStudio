'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useEditorStore } from '@/store/editorStore'
import {
  Rocket, Copy, Check, ExternalLink, Clock, ToggleLeft, ToggleRight,
  AlertCircle, CheckCircle2, XCircle, History, Globe, Loader2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface PublishPanelProps {
  open: boolean
  onClose: () => void
}

interface ExportResponse {
  success?: boolean
  error?: string
  details?: string
  pagesExported?: number
  duration?: number
  deployUrl?: string
  deployId?: string
  coolifyDeployId?: string
  coolifyAppUuid?: string
  building?: boolean
}

interface DeployRecord {
  id: string
  status: 'PENDING' | 'BUILDING' | 'SUCCESS' | 'FAILED'
  environment: string
  pagesExported: number
  duration: number
  deployUrl: string | null
  coolifyDeployId: string | null
  error: string | null
  createdAt: string
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso)
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  } catch {
    return iso
  }
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`
  return `${(ms / 1000).toFixed(1)}s`
}

const STATUS_CONFIG = {
  PENDING: { icon: Clock, color: 'text-yellow-500', label: 'En attente' },
  BUILDING: { icon: Loader2, color: 'text-blue-400', label: 'Déploiement...' },
  SUCCESS: { icon: CheckCircle2, color: 'text-green-500', label: 'Publié' },
  FAILED: { icon: XCircle, color: 'text-red-500', label: 'Échoué' },
} as const

export function PublishPanel({ open, onClose }: PublishPanelProps) {
  const { siteConfig, updateDeploy } = useEditorStore()
  const [isPublishing, setIsPublishing] = useState(false)
  const [publishResult, setPublishResult] = useState<'success' | 'building' | 'error' | null>(null)
  const [publishError, setPublishError] = useState<string | null>(null)
  const [publishStats, setPublishStats] = useState<{ pages: number; duration: number } | null>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [activeEnv, setActiveEnv] = useState<'staging' | 'production'>('production')
  const [deploys, setDeploys] = useState<DeployRecord[]>([])
  const [loadingHistory, setLoadingHistory] = useState(false)
  const [activeBuildDeployId, setActiveBuildDeployId] = useState<string | null>(null)
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const deploy = siteConfig?.deploy ?? {}
  const siteId = siteConfig?.id
  const siteName = siteConfig?.meta.title ?? 'site'
  const slugified = siteName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  const stagingUrl = deploy.stagingUrl || `https://${slugified}.staging.jlstudio.dev`
  const productionUrl = deploy.productionUrl || deploy.deployUrl || `https://${slugified}.jlstudio.dev`

  // Cleanup poll on unmount
  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current)
    }
  }, [])

  const fetchDeploys = useCallback(async () => {
    if (!siteId) return
    setLoadingHistory(true)
    try {
      const res = await fetch(`/api/sites/${siteId}/deploys?limit=10`)
      if (res.ok) {
        const data = await res.json()
        setDeploys(data.deploys || [])
      }
    } catch {
      // Silently fail — history is non-critical
    } finally {
      setLoadingHistory(false)
    }
  }, [siteId])

  // Poll for build status
  const startPolling = useCallback((deployId: string) => {
    if (pollRef.current) clearInterval(pollRef.current)

    setActiveBuildDeployId(deployId)

    pollRef.current = setInterval(async () => {
      if (!siteId) return

      try {
        const res = await fetch(`/api/sites/${siteId}/deploys/${deployId}`)
        if (!res.ok) return

        const data = await res.json()
        const status = data.deploy?.status

        if (status === 'SUCCESS') {
          setPublishResult('success')
          setActiveBuildDeployId(null)
          if (pollRef.current) clearInterval(pollRef.current)
          fetchDeploys()
          setTimeout(() => setPublishResult(null), 5000)
        } else if (status === 'FAILED') {
          setPublishResult('error')
          setPublishError(data.deploy?.error || 'Deploy Coolify échoué')
          setActiveBuildDeployId(null)
          if (pollRef.current) clearInterval(pollRef.current)
          fetchDeploys()
        }
        // BUILDING — keep polling
      } catch {
        // Silently continue polling
      }
    }, 3000)
  }, [siteId, fetchDeploys])

  useEffect(() => {
    if (open && siteId) {
      fetchDeploys()
    }
  }, [open, siteId, fetchDeploys])

  const handlePublish = async () => {
    if (!siteId) return
    setIsPublishing(true)
    setPublishResult(null)
    setPublishError(null)
    setPublishStats(null)

    try {
      const res = await fetch(`/api/sites/${siteId}/export`, { method: 'POST' })
      const data: ExportResponse = await res.json()

      if (!res.ok || data.error) {
        setPublishResult('error')
        setPublishError(data.error || 'Export failed')
        fetchDeploys()
        return
      }

      updateDeploy({
        lastPublishedAt: new Date().toISOString(),
        deployUrl: data.deployUrl,
        coolifyAppUuid: data.coolifyAppUuid,
      })
      setPublishStats({ pages: data.pagesExported ?? 0, duration: data.duration ?? 0 })

      if (data.building && data.deployId) {
        // Coolify is building — start polling
        setPublishResult('building')
        startPolling(data.deployId)
      } else {
        setPublishResult('success')
        setTimeout(() => setPublishResult(null), 5000)
      }

      fetchDeploys()
    } catch (err) {
      setPublishResult('error')
      setPublishError(String(err))
    } finally {
      setIsPublishing(false)
    }
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
              disabled={isPublishing || publishResult === 'building'}
              className={cn(
                'w-full h-11 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2',
                isPublishing || publishResult === 'building'
                  ? 'bg-green-700 text-green-100 cursor-wait'
                  : publishResult === 'success'
                    ? 'bg-green-600 text-white'
                    : 'bg-green-600 hover:bg-green-700 text-white active:scale-[0.98]'
              )}
            >
              {isPublishing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Exporting...
                </>
              ) : publishResult === 'building' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Deploying to Coolify...
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

            {publishResult === 'error' && publishError && (
              <div className="mt-2 p-2 bg-red-500/10 border border-red-500/20 rounded text-[10px] text-red-400 flex items-start gap-1.5">
                <AlertCircle className="w-3 h-3 mt-0.5 shrink-0" />
                <span>{publishError}</span>
              </div>
            )}

            {publishResult === 'building' && publishStats && (
              <p className="text-[10px] text-blue-400 mt-2 flex items-center gap-1">
                <Loader2 className="w-3 h-3 animate-spin" />
                {publishStats.pages} page{publishStats.pages > 1 ? 's' : ''} exported — deploying via Coolify...
              </p>
            )}

            {publishResult === 'success' && publishStats && (
              <p className="text-[10px] text-green-400 mt-2">
                {publishStats.pages} page{publishStats.pages > 1 ? 's' : ''} exported in {formatDuration(publishStats.duration)}
              </p>
            )}

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
            <div>
              <p className="text-[10px] text-zinc-500 mb-1 flex items-center gap-1">
                <Globe className="w-3 h-3" />
                Staging URL
              </p>
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

            <div>
              <p className="text-[10px] text-zinc-500 mb-1 flex items-center gap-1">
                <Globe className="w-3 h-3" />
                Production URL
              </p>
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
            <p className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <History className="w-3 h-3" />
              Deploy history
            </p>

            {loadingHistory ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="w-4 h-4 animate-spin text-zinc-400" />
              </div>
            ) : deploys.length === 0 ? (
              <p className="text-[10px] text-zinc-600 py-2">No deploys yet</p>
            ) : (
              <div className="space-y-1.5">
                {deploys.map((d) => {
                  const config = STATUS_CONFIG[d.status] || STATUS_CONFIG.PENDING
                  const Icon = config.icon
                  const isActive = d.id === activeBuildDeployId

                  return (
                    <div
                      key={d.id}
                      className={cn(
                        'flex items-center gap-2 p-2 border rounded text-[10px]',
                        isActive
                          ? 'bg-blue-500/5 border-blue-500/20'
                          : 'bg-zinc-800/50 border-zinc-700/50'
                      )}
                    >
                      <Icon className={cn(
                        'w-3 h-3 shrink-0',
                        config.color,
                        (d.status === 'BUILDING' || d.status === 'PENDING') && 'animate-spin'
                      )} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className={cn(
                            'font-medium',
                            d.status === 'SUCCESS' ? 'text-zinc-300'
                              : d.status === 'FAILED' ? 'text-red-400'
                              : d.status === 'BUILDING' ? 'text-blue-400'
                              : 'text-yellow-400'
                          )}>
                            {d.status === 'SUCCESS'
                              ? `${d.pagesExported} pages`
                              : config.label}
                          </span>
                          {d.duration > 0 && (
                            <span className="text-zinc-600">{formatDuration(d.duration)}</span>
                          )}
                        </div>
                        <p className="text-zinc-600 truncate">{formatDate(d.createdAt)}</p>
                        {d.status === 'FAILED' && d.error && (
                          <p className="text-red-500/70 truncate mt-0.5">{d.error}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-3 bg-zinc-800/50 border border-zinc-700 rounded text-[10px] text-zinc-500">
            Export generates static HTML served by Nginx via Coolify. SSL is provisioned automatically via Let&apos;s Encrypt.
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
