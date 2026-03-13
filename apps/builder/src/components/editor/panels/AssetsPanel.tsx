'use client'
import { useState, useCallback, useEffect, useRef } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ImageIcon, Upload, Search, X, Grid3X3, List, Film, FileText, Trash2, Copy, Loader2, ImagePlus, Type, Download, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CustomElement } from '@/types/elements'

type AssetFilter = 'all' | 'images' | 'videos' | 'documents'
type ViewMode = 'grid' | 'list'
type PanelTab = 'files' | 'unsplash'

interface MediaItem {
  id: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  width?: number
  height?: number
  url: string
  thumbnailUrl?: string
  alt?: string
  folder?: string
  createdAt: string
}

interface UploadProgress {
  file: File
  status: 'pending' | 'uploading' | 'done' | 'error'
  error?: string
}

interface UnsplashPhoto {
  id: string
  urls: { small: string; regular: string; full: string; thumb: string }
  alt_description: string
  user: { name: string; url: string }
  width: number
  height: number
  download_location: string
}

const FILTER_TABS: { id: AssetFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'images', label: 'Images' },
  { id: 'videos', label: 'Videos' },
  { id: 'documents', label: 'Docs' },
]

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`
}

function getAssetType(mime: string): 'image' | 'video' | 'document' {
  if (mime.startsWith('image/')) return 'image'
  if (mime.startsWith('video/')) return 'video'
  return 'document'
}

function generateId() {
  return `el-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

// ── Unsplash Tab Component ──────────────────────────────────────────────────
function UnsplashTab({ onInsert }: { onInsert: (url: string, alt: string, width: number, height: number) => void }) {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [insertingId, setInsertingId] = useState<string | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Debounce search input
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(query)
      setPage(1)
      setPhotos([])
    }, 400)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [query])

  // Fetch photos
  const fetchPhotos = useCallback(async (pageNum: number, append: boolean) => {
    if (pageNum === 1) setIsLoading(true)
    else setIsLoadingMore(true)

    try {
      const params = new URLSearchParams()
      if (debouncedQuery.trim()) params.set('query', debouncedQuery.trim())
      params.set('page', String(pageNum))
      params.set('per_page', '20')

      const res = await fetch(`/api/unsplash?${params}`)
      if (res.ok) {
        const data = await res.json()
        setPhotos(prev => append ? [...prev, ...data.results] : data.results)
        setTotalPages(data.total_pages ?? 1)
      }
    } catch (err) {
      console.error('Unsplash fetch error:', err)
    } finally {
      setIsLoading(false)
      setIsLoadingMore(false)
    }
  }, [debouncedQuery])

  // Fetch on query/page change
  useEffect(() => {
    fetchPhotos(page, page > 1)
  }, [debouncedQuery, page, fetchPhotos])

  // Track download (Unsplash API guidelines)
  const trackDownload = async (photo: UnsplashPhoto) => {
    if (photo.download_location) {
      try {
        await fetch('/api/unsplash', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ download_location: photo.download_location }),
        })
      } catch { /* ignore */ }
    }
  }

  // Insert photo
  const handleInsert = async (photo: UnsplashPhoto) => {
    setInsertingId(photo.id)
    await trackDownload(photo)
    onInsert(photo.urls.regular, photo.alt_description || `Photo by ${photo.user.name}`, photo.width, photo.height)
    setInsertingId(null)
  }

  const loadMore = () => {
    if (page < totalPages && !isLoadingMore) {
      setPage(p => p + 1)
    }
  }

  return (
    <>
      {/* Search */}
      <div className="px-2 py-1.5 border-b border-zinc-700/50 shrink-0">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-600" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Rechercher sur Unsplash..."
            className="w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded pl-7 pr-6 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-500"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1">
        {isLoading ? (
          // Loading skeletons
          <div className="p-2 grid grid-cols-2 gap-1.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] rounded-md bg-zinc-800 animate-pulse" />
            ))}
          </div>
        ) : photos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center px-4">
            <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-3 text-zinc-600">
              <ImageIcon className="w-5 h-5" />
            </div>
            <p className="text-[11px] text-zinc-400 font-medium mb-1">
              {debouncedQuery ? 'Aucun resultat' : 'Recherchez des photos'}
            </p>
            <p className="text-[10px] text-zinc-500 leading-relaxed">
              {debouncedQuery ? 'Essayez un autre terme de recherche.' : 'Tapez un mot-cle pour trouver des photos libres de droits.'}
            </p>
          </div>
        ) : (
          <div className="p-2">
            {/* Photo grid */}
            <div className="grid grid-cols-2 gap-1.5">
              {photos.map(photo => (
                <div
                  key={photo.id}
                  className="relative rounded-md overflow-hidden bg-zinc-800 border border-zinc-700 cursor-pointer hover:border-zinc-500 transition-colors group"
                  style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
                >
                  <img
                    src={photo.urls.small}
                    alt={photo.alt_description || ''}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1.5">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => handleInsert(photo)}
                        disabled={insertingId === photo.id}
                        className="p-1.5 rounded bg-wf-blue/90 text-white hover:bg-wf-blue transition-colors disabled:opacity-50"
                        title="Inserer dans le canvas"
                      >
                        {insertingId === photo.id ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <ImagePlus className="w-3 h-3" />
                        )}
                      </button>
                      <a
                        href={photo.urls.full}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded bg-zinc-700/80 text-white hover:bg-zinc-600 transition-colors"
                        title="Voir en taille originale"
                        onClick={e => e.stopPropagation()}
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div>
                      <a
                        href={photo.user.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[9px] text-white/80 hover:text-white truncate block"
                        onClick={e => e.stopPropagation()}
                      >
                        {photo.user.name}
                      </a>
                      <p className="text-[8px] text-zinc-400">{photo.width} x {photo.height}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load more */}
            {page < totalPages && (
              <div className="flex justify-center mt-3 mb-1">
                <button
                  onClick={loadMore}
                  disabled={isLoadingMore}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-800 border border-zinc-700 text-[10px] text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors disabled:opacity-50"
                >
                  {isLoadingMore ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Download className="w-3 h-3" />
                  )}
                  Charger plus
                </button>
              </div>
            )}

            {/* Unsplash credit */}
            <div className="flex items-center justify-center gap-1 mt-3 mb-2">
              <span className="text-[9px] text-zinc-500">Photos par</span>
              <a
                href="https://unsplash.com/?utm_source=website_configurator&utm_medium=referral"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9px] text-zinc-500 hover:text-zinc-300 underline transition-colors"
              >
                Unsplash
              </a>
            </div>
          </div>
        )}
      </ScrollArea>
    </>
  )
}

// ── Main AssetsPanel ────────────────────────────────────────────────────────
export function AssetsPanel() {
  const { siteConfig, selectedSectionId, addCustomElement } = useEditorStore()
  const [activeTab, setActiveTab] = useState<PanelTab>('files')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<AssetFilter>('all')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [assets, setAssets] = useState<MediaItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [uploadQueue, setUploadQueue] = useState<UploadProgress[]>([])
  const [copied, setCopied] = useState<string | null>(null)
  const [editingAlt, setEditingAlt] = useState<string | null>(null)
  const [altValue, setAltValue] = useState('')
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropRef = useRef<HTMLDivElement>(null)
  const altInputRef = useRef<HTMLInputElement>(null)

  const siteId = siteConfig?.id
  const isUploading = uploadQueue.some(q => q.status === 'uploading' || q.status === 'pending')

  // Fetch assets
  const fetchAssets = useCallback(async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (siteId) params.set('siteId', siteId)
      if (search.trim()) params.set('search', search.trim())
      const res = await fetch(`/api/media?${params}`)
      if (res.ok) {
        const data = await res.json()
        setAssets(data.items ?? [])
      }
    } catch (err) {
      console.error('Failed to fetch assets:', err)
    } finally {
      setIsLoading(false)
    }
  }, [siteId, search])

  useEffect(() => { fetchAssets() }, [fetchAssets])

  // Upload single file (returns true on success)
  const uploadSingleFile = async (file: File): Promise<boolean> => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      if (siteId) formData.append('siteId', siteId)
      const res = await fetch('/api/media', { method: 'POST', body: formData })
      if (res.ok) {
        return true
      } else {
        const err = await res.json()
        console.error('Upload failed:', err.error)
        return false
      }
    } catch (err) {
      console.error('Upload error:', err)
      return false
    }
  }

  // Upload multiple files with progress tracking
  const uploadFiles = async (files: File[]) => {
    if (files.length === 0) return

    const queue: UploadProgress[] = files.map(f => ({ file: f, status: 'pending' as const }))
    setUploadQueue(queue)

    for (let i = 0; i < files.length; i++) {
      setUploadQueue(prev => prev.map((item, idx) =>
        idx === i ? { ...item, status: 'uploading' } : item
      ))

      const success = await uploadSingleFile(files[i])

      setUploadQueue(prev => prev.map((item, idx) =>
        idx === i ? { ...item, status: success ? 'done' : 'error', error: success ? undefined : 'Upload failed' } : item
      ))
    }

    await fetchAssets()

    // Clear queue after a delay
    setTimeout(() => setUploadQueue([]), 2000)
  }

  // Delete asset
  const deleteAsset = async (id: string) => {
    try {
      const res = await fetch(`/api/media/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setAssets(prev => prev.filter(a => a.id !== id))
      }
    } catch (err) {
      console.error('Delete error:', err)
    }
  }

  // Update alt text
  const updateAlt = async (id: string, alt: string) => {
    try {
      const res = await fetch(`/api/media/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alt }),
      })
      if (res.ok) {
        setAssets(prev => prev.map(a => a.id === id ? { ...a, alt } : a))
      }
    } catch (err) {
      console.error('Alt update error:', err)
    }
    setEditingAlt(null)
  }

  const startEditAlt = (asset: MediaItem) => {
    setEditingAlt(asset.id)
    setAltValue(asset.alt || '')
    setTimeout(() => altInputRef.current?.focus(), 50)
  }

  // Copy URL
  const copyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url)
    setCopied(id)
    setTimeout(() => setCopied(null), 1500)
  }

  // Insert image into canvas (used by both local assets and Unsplash)
  const insertImageElement = (src: string, alt: string, width?: number, height?: number, label?: string) => {
    if (!selectedSectionId) return
    const el: CustomElement = {
      id: generateId(),
      type: 'custom-image',
      label: label || alt || 'Image',
      content: {
        src,
        alt: alt || 'Image',
        width,
        height,
      },
      style: {
        width: '100%',
        maxWidth: width ? `${Math.min(width, 800)}px` : '800px',
      },
      visible: true,
    }
    addCustomElement(selectedSectionId, el)
  }

  // Insert local asset as image
  const insertAsImage = (asset: MediaItem) => {
    insertImageElement(asset.url, asset.alt || asset.originalName, asset.width, asset.height, asset.originalName)
  }

  // Insert Unsplash photo
  const handleUnsplashInsert = (url: string, alt: string, width: number, height: number) => {
    insertImageElement(url, alt, width, height, alt)
  }

  // Drag from assets panel (HTML5 native drag)
  const handleAssetDragStart = (e: React.DragEvent, asset: MediaItem) => {
    e.dataTransfer.setData('text/plain', asset.url)
    e.dataTransfer.setData('application/json', JSON.stringify({
      type: 'asset',
      assetType: getAssetType(asset.mimeType),
      url: asset.url,
      alt: asset.alt || asset.originalName,
      width: asset.width,
      height: asset.height,
      originalName: asset.originalName,
    }))
    e.dataTransfer.effectAllowed = 'copy'
  }

  // Drag & drop upload
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) uploadFiles(files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isDragOver) setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }

  // Filter
  const filteredAssets = assets.filter(a => {
    if (filter === 'all') return true
    const type = getAssetType(a.mimeType)
    if (filter === 'images') return type === 'image'
    if (filter === 'videos') return type === 'video'
    return type === 'document'
  })

  const renderAltEditor = (asset: MediaItem) => {
    if (editingAlt === asset.id) {
      return (
        <div className="flex gap-1 mt-1" onClick={e => e.stopPropagation()}>
          <input
            ref={altInputRef}
            value={altValue}
            onChange={e => setAltValue(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') updateAlt(asset.id, altValue)
              if (e.key === 'Escape') setEditingAlt(null)
            }}
            onBlur={() => updateAlt(asset.id, altValue)}
            placeholder="Alt text..."
            className="flex-1 h-5 bg-zinc-900 border border-zinc-600 text-white text-[10px] rounded px-1.5 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-500"
          />
        </div>
      )
    }
    return (
      <button
        onClick={e => { e.stopPropagation(); startEditAlt(asset) }}
        className="flex items-center gap-0.5 mt-0.5 text-[9px] text-zinc-500 hover:text-zinc-400 transition-colors"
        title={asset.alt ? `Alt: ${asset.alt}` : 'Add alt text'}
      >
        <Type className="w-2.5 h-2.5" />
        <span className="truncate max-w-[60px]">{asset.alt || 'Add alt'}</span>
      </button>
    )
  }

  return (
    <>
      {/* Tab switcher: Mes fichiers | Unsplash */}
      <div className="flex border-b border-zinc-700/50 shrink-0">
        <button
          onClick={() => setActiveTab('files')}
          className={cn(
            'flex-1 py-2 text-[11px] font-medium transition-colors',
            activeTab === 'files' ? 'text-white border-b-2 border-wf-blue' : 'text-zinc-500 hover:text-zinc-300'
          )}
        >
          Mes fichiers
        </button>
        <button
          onClick={() => setActiveTab('unsplash')}
          className={cn(
            'flex-1 py-2 text-[11px] font-medium transition-colors',
            activeTab === 'unsplash' ? 'text-white border-b-2 border-wf-blue' : 'text-zinc-500 hover:text-zinc-300'
          )}
        >
          Unsplash
        </button>
      </div>

      {activeTab === 'unsplash' ? (
        <UnsplashTab onInsert={handleUnsplashInsert} />
      ) : (
        <>
          {/* Upload area */}
          <div className="px-3 py-2 border-b border-zinc-700/50 shrink-0">
            <div
              ref={dropRef}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                'border-2 border-dashed rounded-lg py-4 flex flex-col items-center gap-1.5 transition-colors cursor-pointer',
                isDragOver ? 'border-wf-blue bg-wf-blue/10' : 'border-zinc-700 hover:border-zinc-500'
              )}
            >
              {isUploading ? (
                <Loader2 className="w-5 h-5 text-wf-blue animate-spin" />
              ) : (
                <Upload className="w-5 h-5 text-zinc-500" />
              )}
              <p className="text-[10px] text-zinc-500">
                {isUploading ? `Uploading ${uploadQueue.filter(q => q.status === 'done').length}/${uploadQueue.length}...` : 'Drop files or click to upload'}
              </p>
              <p className="text-[9px] text-zinc-500">PNG, JPG, GIF, SVG, WebP, AVIF</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*,.pdf,.svg"
              className="hidden"
              onChange={e => {
                const files = Array.from(e.target.files || [])
                if (files.length > 0) uploadFiles(files)
                e.target.value = ''
              }}
            />
            {/* Upload progress queue */}
            {uploadQueue.length > 0 && (
              <div className="mt-2 space-y-1">
                {uploadQueue.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[10px]">
                    {item.status === 'uploading' && <Loader2 className="w-3 h-3 text-wf-blue animate-spin shrink-0" />}
                    {item.status === 'done' && <div className="w-3 h-3 rounded-full bg-green-500 shrink-0" />}
                    {item.status === 'error' && <div className="w-3 h-3 rounded-full bg-red-500 shrink-0" />}
                    {item.status === 'pending' && <div className="w-3 h-3 rounded-full bg-zinc-600 shrink-0" />}
                    <span className={cn(
                      'truncate',
                      item.status === 'error' ? 'text-red-400' : item.status === 'done' ? 'text-green-400' : 'text-zinc-400'
                    )}>
                      {item.file.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Search + View toggle */}
          <div className="px-2 py-1.5 border-b border-zinc-700/50 shrink-0">
            <div className="flex gap-1.5">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-600" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search assets"
                  className="w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded pl-7 pr-6 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-500"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="w-7 h-7 flex items-center justify-center rounded bg-zinc-800 border border-zinc-700 text-zinc-500 hover:text-white transition-colors"
              >
                {viewMode === 'grid' ? <List className="w-3 h-3" /> : <Grid3X3 className="w-3 h-3" />}
              </button>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex border-b border-zinc-700/50 shrink-0">
            {FILTER_TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={cn(
                  'flex-1 py-1.5 text-[10px] font-medium transition-colors',
                  filter === tab.id ? 'text-white border-b border-wf-blue' : 'text-zinc-500 hover:text-zinc-400'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <ScrollArea className="flex-1">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-5 h-5 text-zinc-500 animate-spin" />
              </div>
            ) : filteredAssets.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center px-4">
                <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-3 text-zinc-600">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <p className="text-[11px] text-zinc-400 font-medium mb-1">No assets yet</p>
                <p className="text-[10px] text-zinc-500 leading-relaxed">
                  Upload images, videos, and documents to use in your site.
                </p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="p-2 grid grid-cols-3 gap-1">
                {filteredAssets.map(asset => (
                  <div
                    key={asset.id}
                    draggable={getAssetType(asset.mimeType) === 'image'}
                    onDragStart={e => handleAssetDragStart(e, asset)}
                    className="aspect-square rounded bg-zinc-800 border border-zinc-700 overflow-hidden cursor-pointer hover:border-zinc-500 transition-colors group relative"
                  >
                    {getAssetType(asset.mimeType) === 'image' ? (
                      <img src={asset.thumbnailUrl || asset.url} alt={asset.alt || asset.originalName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-600">
                        {getAssetType(asset.mimeType) === 'video' ? <Film className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={e => { e.stopPropagation(); copyUrl(asset.url, asset.id) }}
                          className="p-1.5 rounded bg-zinc-700/80 text-white hover:bg-zinc-600 transition-colors"
                          title="Copy URL"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                        {getAssetType(asset.mimeType) === 'image' && selectedSectionId && (
                          <button
                            onClick={e => { e.stopPropagation(); insertAsImage(asset) }}
                            className="p-1.5 rounded bg-zinc-700/80 text-wf-blue hover:bg-zinc-600 transition-colors"
                            title="Insert as image element"
                          >
                            <ImagePlus className="w-3 h-3" />
                          </button>
                        )}
                        <button
                          onClick={e => { e.stopPropagation(); deleteAsset(asset.id) }}
                          className="p-1.5 rounded bg-zinc-700/80 text-red-400 hover:bg-zinc-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                      {renderAltEditor(asset)}
                    </div>
                    {copied === asset.id && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                        <span className="text-[10px] text-green-400 font-medium">Copied!</span>
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-black/60 px-1 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-[8px] text-white truncate">{asset.originalName}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-2 space-y-0.5">
                {filteredAssets.map(asset => (
                  <div
                    key={asset.id}
                    draggable={getAssetType(asset.mimeType) === 'image'}
                    onDragStart={e => handleAssetDragStart(e, asset)}
                    className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-zinc-800 transition-colors cursor-pointer group"
                  >
                    <div className="w-8 h-8 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0 overflow-hidden">
                      {getAssetType(asset.mimeType) === 'image' ? (
                        <img src={asset.thumbnailUrl || asset.url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <FileText className="w-3.5 h-3.5 text-zinc-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] text-[#ccc] truncate">{asset.originalName}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-[9px] text-zinc-500">{formatSize(asset.size)}</p>
                        {renderAltEditor(asset)}
                      </div>
                    </div>
                    <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-all shrink-0">
                      <button
                        onClick={() => copyUrl(asset.url, asset.id)}
                        className="p-1 text-zinc-600 hover:text-white"
                        title="Copy URL"
                      >
                        {copied === asset.id ? <span className="text-[9px] text-green-400">OK</span> : <Copy className="w-3 h-3" />}
                      </button>
                      {getAssetType(asset.mimeType) === 'image' && selectedSectionId && (
                        <button
                          onClick={() => insertAsImage(asset)}
                          className="p-1 text-zinc-600 hover:text-wf-blue"
                          title="Insert as image"
                        >
                          <ImagePlus className="w-3 h-3" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteAsset(asset.id)}
                        className="p-1 text-zinc-600 hover:text-red-400"
                        title="Delete"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </>
      )}
    </>
  )
}
