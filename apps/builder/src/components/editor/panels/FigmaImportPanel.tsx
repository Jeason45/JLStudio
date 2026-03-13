'use client'

import { useState, useCallback, useEffect } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChevronRight, ChevronDown, Frame, Type, Image, Square, Loader2, ArrowLeft, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CustomElement } from '@/types/elements'

// ─── Types ───

interface FigmaTreeNode {
  id: string
  name: string
  type: string
  children?: FigmaTreeNode[]
}

interface ImportedElement {
  id: string
  type: string
  label: string
  content: Record<string, unknown>
  style: Record<string, unknown>
  children?: ImportedElement[]
  visible: boolean
}

// ─── Helpers ───

const FIGMA_TOKEN_KEY = 'figma_access_token'

function parseFileKey(url: string): string | null {
  // figma.com/file/{key}/... or figma.com/design/{key}/...
  const match = url.match(/figma\.com\/(?:file|design)\/([a-zA-Z0-9]+)/)
  return match ? match[1] : null
}

function getNodeIcon(type: string) {
  switch (type) {
    case 'TEXT': return <Type className="w-3 h-3 text-emerald-400" />
    case 'FRAME':
    case 'COMPONENT':
    case 'COMPONENT_SET':
    case 'INSTANCE':
      return <Frame className="w-3 h-3 text-blue-400" />
    case 'RECTANGLE':
    case 'ELLIPSE':
    case 'LINE':
    case 'VECTOR':
    case 'STAR':
    case 'POLYGON':
    case 'BOOLEAN_OPERATION':
      return <Square className="w-3 h-3 text-zinc-400" />
    default:
      if (type === 'GROUP') return <Frame className="w-3 h-3 text-purple-400" />
      return <Image className="w-3 h-3 text-amber-400" />
  }
}

function isSelectableNode(type: string) {
  return ['FRAME', 'COMPONENT', 'COMPONENT_SET', 'INSTANCE', 'GROUP'].includes(type)
}

// ─── Tree Node Component ───

function TreeNode({
  node,
  depth,
  selected,
  expanded,
  onToggle,
  onSelect,
}: {
  node: FigmaTreeNode
  depth: number
  selected: Set<string>
  expanded: Set<string>
  onToggle: (id: string) => void
  onSelect: (id: string) => void
}) {
  const hasChildren = node.children && node.children.length > 0
  const isExpanded = expanded.has(node.id)
  const isSelected = selected.has(node.id)
  const selectable = isSelectableNode(node.type)

  return (
    <>
      <div
        className={cn(
          'flex items-center gap-1 py-0.5 px-1 rounded cursor-pointer hover:bg-zinc-700/40 transition-colors',
          isSelected && 'bg-blue-500/20',
        )}
        style={{ paddingLeft: `${depth * 16 + 4}px` }}
        onClick={() => {
          if (selectable) onSelect(node.id)
        }}
      >
        {/* Expand/collapse */}
        {hasChildren ? (
          <button
            onClick={(e) => { e.stopPropagation(); onToggle(node.id) }}
            className="w-3 h-3 flex items-center justify-center shrink-0 text-zinc-500 hover:text-zinc-300"
          >
            {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          </button>
        ) : (
          <span className="w-3 h-3 shrink-0" />
        )}

        {/* Checkbox for selectable */}
        {selectable && (
          <button
            onClick={(e) => { e.stopPropagation(); onSelect(node.id) }}
            className={cn(
              'w-3.5 h-3.5 rounded border shrink-0 flex items-center justify-center transition-colors',
              isSelected ? 'bg-blue-500 border-blue-500' : 'border-zinc-600 hover:border-zinc-400',
            )}
          >
            {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
          </button>
        )}

        {/* Icon */}
        {getNodeIcon(node.type)}

        {/* Label */}
        <span className={cn(
          'text-[11px] truncate',
          selectable ? 'text-zinc-200' : 'text-zinc-500',
        )}>
          {node.name}
        </span>

        {/* Type badge */}
        <span className="text-[9px] text-zinc-600 ml-auto shrink-0">{node.type}</span>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && node.children!.map(child => (
        <TreeNode
          key={child.id}
          node={child}
          depth={depth + 1}
          selected={selected}
          expanded={expanded}
          onToggle={onToggle}
          onSelect={onSelect}
        />
      ))}
    </>
  )
}

// ─── Main Panel ───

export function FigmaImportPanel({ onBack }: { onBack?: () => void }) {
  const [token, setToken] = useState('')
  const [fileUrl, setFileUrl] = useState('')
  const [fileTree, setFileTree] = useState<FigmaTreeNode | null>(null)
  const [loading, setLoading] = useState(false)
  const [importing, setImporting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [progress, setProgress] = useState(0)
  const [importResult, setImportResult] = useState<string | null>(null)

  const addSection = useEditorStore(s => s.addSection)
  const selectedPageId = useEditorStore(s => s.selectedPageId) ?? ''

  // Load saved token
  useEffect(() => {
    const saved = localStorage.getItem(FIGMA_TOKEN_KEY)
    if (saved) setToken(saved)
  }, [])

  // Save token when it changes
  useEffect(() => {
    if (token) localStorage.setItem(FIGMA_TOKEN_KEY, token)
  }, [token])

  // ─── Load file structure ───
  const loadFile = useCallback(async () => {
    const fileKey = parseFileKey(fileUrl)
    if (!fileKey) {
      setError('URL Figma invalide. Format attendu : figma.com/file/{key}/... ou figma.com/design/{key}/...')
      return
    }
    if (!token) {
      setError('Token d\'acces Figma requis')
      return
    }

    setLoading(true)
    setError(null)
    setFileTree(null)
    setSelected(new Set())

    try {
      const res = await fetch('/api/figma/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileKey, accessToken: token }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erreur lors du chargement')
      setFileTree(data.fileTree)
      // Auto-expand first level
      if (data.fileTree?.children) {
        setExpanded(new Set(data.fileTree.children.map((c: FigmaTreeNode) => c.id)))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }, [fileUrl, token])

  // ─── Toggle expand ───
  const toggleExpand = useCallback((id: string) => {
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  // ─── Toggle selection ───
  const toggleSelect = useCallback((id: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  // ─── Import selected frames ───
  const importSelected = useCallback(async () => {
    if (selected.size === 0) return
    const fileKey = parseFileKey(fileUrl)
    if (!fileKey || !token) return

    setImporting(true)
    setError(null)
    setProgress(10)
    setImportResult(null)

    try {
      const nodeIds = Array.from(selected)
      setProgress(30)

      const res = await fetch('/api/figma/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileKey, nodeIds, accessToken: token }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erreur lors de l\'import')

      setProgress(70)

      // Convert imported elements to sections
      const elements = data.elements as ImportedElement[]
      let count = 0
      for (const el of elements) {
        const sectionId = 'sec-figma-' + Math.random().toString(36).slice(2, 8)
        const section = {
          id: sectionId,
          type: 'custom',
          variant: 'custom-1',
          content: {},
          style: {
            background: 'white' as const,
            paddingY: 'md' as const,
          },
          visible: true,
          elements: [convertToCustomElement(el)],
        }
        addSection(selectedPageId, section)
        count++
      }

      setProgress(100)
      setImportResult(`${count} frame${count > 1 ? 's' : ''} importe${count > 1 ? 's' : ''} avec succes`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setImporting(false)
    }
  }, [selected, fileUrl, token, addSection, selectedPageId])

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-zinc-700/50">
        {onBack && (
          <button onClick={onBack} className="text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        )}
        <span className="text-[11px] font-medium text-zinc-200">Figma Import</span>
        <span className="text-[9px] bg-violet-500/20 text-violet-400 px-1.5 py-0.5 rounded ml-auto">Beta</span>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3 space-y-3">
          {/* Token input */}
          <div className="space-y-1">
            <label className="text-[10px] text-zinc-500 font-medium">Personal Access Token</label>
            <input
              type="password"
              value={token}
              onChange={e => setToken(e.target.value)}
              placeholder="figd_xxxxxxxxxxxx"
              className="w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-600"
            />
            <p className="text-[9px] text-zinc-600">
              Figma &gt; Settings &gt; Personal Access Tokens
            </p>
          </div>

          {/* URL input */}
          <div className="space-y-1">
            <label className="text-[10px] text-zinc-500 font-medium">URL du fichier Figma</label>
            <input
              value={fileUrl}
              onChange={e => setFileUrl(e.target.value)}
              placeholder="https://figma.com/design/abc123/..."
              className="w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-600"
            />
          </div>

          {/* Load button */}
          <button
            onClick={loadFile}
            disabled={loading || !token || !fileUrl}
            className={cn(
              'w-full h-8 rounded text-[11px] font-medium transition-colors flex items-center justify-center gap-1.5',
              loading || !token || !fileUrl
                ? 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
                : 'bg-wf-blue text-white hover:bg-blue-500',
            )}
          >
            {loading ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                Chargement...
              </>
            ) : (
              'Charger le fichier'
            )}
          </button>

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded p-2">
              <p className="text-[10px] text-red-400">{error}</p>
            </div>
          )}

          {/* File tree */}
          {fileTree && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-zinc-500 font-medium">
                  Pages et frames
                </span>
                <span className="text-[9px] text-zinc-600">
                  {selected.size} selectionne{selected.size > 1 ? 's' : ''}
                </span>
              </div>

              <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-1 max-h-[400px] overflow-y-auto">
                {fileTree.children?.map(page => (
                  <div key={page.id}>
                    {/* Page header */}
                    <div
                      className="flex items-center gap-1 py-1 px-1 text-[10px] font-medium text-zinc-400 cursor-pointer hover:text-zinc-200"
                      onClick={() => toggleExpand(page.id)}
                    >
                      {expanded.has(page.id) ? (
                        <ChevronDown className="w-3 h-3" />
                      ) : (
                        <ChevronRight className="w-3 h-3" />
                      )}
                      <span>{page.name}</span>
                    </div>

                    {/* Page children */}
                    {expanded.has(page.id) && page.children?.map(child => (
                      <TreeNode
                        key={child.id}
                        node={child}
                        depth={1}
                        selected={selected}
                        expanded={expanded}
                        onToggle={toggleExpand}
                        onSelect={toggleSelect}
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              {importing && (
                <div className="space-y-1">
                  <div className="w-full bg-zinc-800 rounded-full h-1.5">
                    <div
                      className="bg-wf-blue h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-[9px] text-zinc-500 text-center">Import en cours...</p>
                </div>
              )}

              {/* Import result */}
              {importResult && (
                <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                  <p className="text-[10px] text-green-400">{importResult}</p>
                </div>
              )}

              {/* Import button */}
              <button
                onClick={importSelected}
                disabled={importing || selected.size === 0}
                className={cn(
                  'w-full h-8 rounded text-[11px] font-medium transition-colors flex items-center justify-center gap-1.5',
                  importing || selected.size === 0
                    ? 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
                    : 'bg-wf-blue text-white hover:bg-blue-500',
                )}
              >
                {importing ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Import en cours...
                  </>
                ) : (
                  `Importer ${selected.size > 0 ? `(${selected.size})` : ''}`
                )}
              </button>
            </div>
          )}

          {/* Help section */}
          {!fileTree && !loading && (
            <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-3 space-y-2">
              <p className="text-[10px] text-zinc-400 font-medium">Comment ca marche</p>
              <ol className="text-[10px] text-zinc-500 space-y-1 list-decimal list-inside">
                <li>Generez un Personal Access Token dans Figma</li>
                <li>Collez l&apos;URL de votre fichier Figma</li>
                <li>Selectionnez les frames a importer</li>
                <li>Les frames sont converties en elements editables</li>
              </ol>
              <div className="pt-1 border-t border-zinc-700/50">
                <p className="text-[9px] text-zinc-600">
                  Supporte : frames, auto-layout, textes, images, couleurs, ombres, border-radius
                </p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

// ─── Convert ImportedElement → CustomElement ───

function convertToCustomElement(el: ImportedElement): CustomElement {
  return {
    id: el.id,
    type: el.type as CustomElement['type'],
    label: el.label,
    content: el.content,
    style: el.style as CustomElement['style'],
    visible: el.visible,
    children: el.children?.map(convertToCustomElement),
  }
}
