'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import {
  Search, Upload, X, Loader2, Image as ImageIcon,
  Link2, Trash2, FolderOpen, Check, Film
} from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

interface UnsplashImage {
  id: string
  url: string
  thumb: string
  alt: string
  author: string
}

interface MediaItem {
  id: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  width: number | null
  height: number | null
  url: string
  thumbnailUrl: string | null
  alt: string
  folder: string
  createdAt: string
}

interface ImagePickerProps {
  value?: string
  onChange: (url: string) => void
  onClose: () => void
  siteId?: string
}

export function ImagePicker({ value, onChange, onClose, siteId }: ImagePickerProps) {
  const [tab, setTab] = useState<'library' | 'upload' | 'unsplash' | 'url'>('library')
  const [search, setSearch] = useState('')
  const [unsplashQuery, setUnsplashQuery] = useState('business')
  const [unsplashResults, setUnsplashResults] = useState<UnsplashImage[]>([])
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<string>('')
  const [urlInput, setUrlInput] = useState(value ?? '')
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  // Load media library
  const loadMedia = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (siteId) params.set('siteId', siteId)
      if (search) params.set('search', search)
      const res = await fetch(`/api/media?${params}`)
      if (res.ok) {
        const data = await res.json()
        setMediaItems(data.items ?? [])
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }, [siteId, search])

  useEffect(() => {
    if (tab === 'library') loadMedia()
  }, [tab, loadMedia])

  // Upload file
  const uploadFile = async (file: File) => {
    setUploading(true)
    setUploadProgress(`Upload de ${file.name}...`)
    try {
      const formData = new FormData()
      formData.append('file', file)
      if (siteId) formData.append('siteId', siteId)

      const res = await fetch('/api/media', { method: 'POST', body: formData })
      if (!res.ok) {
        const err = await res.json()
        alert(err.error ?? 'Erreur upload')
        return
      }

      const media: MediaItem = await res.json()
      onChange(media.url)
      onClose()
    } catch {
      alert('Erreur lors de l\'upload')
    } finally {
      setUploading(false)
      setUploadProgress('')
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) uploadFile(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) uploadFile(file)
  }

  const handleDeleteMedia = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!confirm('Supprimer ce média ?')) return
    try {
      await fetch(`/api/media/${id}`, { method: 'DELETE' })
      setMediaItems(prev => prev.filter(m => m.id !== id))
    } catch {
      // silently fail
    }
  }

  const searchUnsplash = async (q: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/images/unsplash?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      setUnsplashResults(data.results ?? [])
    } finally {
      setLoading(false)
    }
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const tabs = [
    { id: 'library' as const, label: 'Bibliothèque', icon: FolderOpen },
    { id: 'upload' as const, label: 'Upload', icon: Upload },
    { id: 'unsplash' as const, label: 'Unsplash', icon: ImageIcon },
    { id: 'url' as const, label: 'URL', icon: Link2 },
  ]

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in-0 duration-150" onClick={onClose} />
      <div className="relative bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 shrink-0">
          <h2 className="text-white font-semibold text-sm">Choisir une image</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-zinc-800 shrink-0">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={cn('flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors',
                tab === t.id ? 'text-white border-b-2 border-wf-blue' : 'text-zinc-500 hover:text-zinc-300'
              )}>
              <t.icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
          {/* ─── LIBRARY TAB ─── */}
          {tab === 'library' && (
            <>
              <div className="px-4 py-3 border-b border-zinc-800 shrink-0">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Rechercher dans la bibliothèque..."
                    className="w-full h-8 bg-zinc-800 border border-zinc-700 text-white text-xs rounded-lg pl-8 pr-3 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                  />
                </div>
              </div>
              <ScrollArea className="flex-1">
                <div className="p-4">
                  {loading ? (
                    <div className="flex items-center justify-center h-40">
                      <Loader2 className="w-5 h-5 animate-spin text-zinc-500" />
                    </div>
                  ) : mediaItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-40 gap-3">
                      <FolderOpen className="w-10 h-10 text-zinc-700" />
                      <div className="text-center">
                        <p className="text-sm text-zinc-500">Bibliothèque vide</p>
                        <p className="text-xs text-zinc-600 mt-1">Uploadez des images pour les retrouver ici</p>
                      </div>
                      <button onClick={() => setTab('upload')}
                        className="text-xs px-3 py-1.5 bg-wf-blue/20 text-wf-blue rounded-lg hover:bg-wf-blue/30 transition-colors">
                        Uploader une image
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 gap-2">
                      {mediaItems.map(item => (
                        <button key={item.id}
                          onClick={() => { onChange(item.url); onClose() }}
                          className={cn(
                            'group relative aspect-square rounded-lg overflow-hidden border-2 transition-all',
                            value === item.url ? 'border-wf-blue ring-2 ring-wf-blue/30' : 'border-transparent hover:border-zinc-600'
                          )}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.thumbnailUrl ?? item.url}
                            alt={item.alt || item.originalName}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          {value === item.url && (
                            <div className="absolute top-1.5 left-1.5 w-5 h-5 bg-wf-blue rounded-full flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="absolute bottom-0 left-0 right-0 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-[10px] text-white truncate">{item.originalName}</p>
                            <p className="text-[10px] text-zinc-400">{formatSize(item.size)}</p>
                          </div>
                          <button
                            onClick={e => handleDeleteMedia(item.id, e)}
                            className="absolute top-1.5 right-1.5 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center text-zinc-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <Trash2 className="w-2.5 h-2.5" />
                          </button>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </>
          )}

          {/* ─── UPLOAD TAB ─── */}
          {tab === 'upload' && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 gap-4">
              <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              <button
                onClick={() => fileRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                disabled={uploading}
                className={cn(
                  'w-full max-w-md aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-all',
                  uploading
                    ? 'border-zinc-700 opacity-60 cursor-not-allowed'
                    : dragOver
                    ? 'border-wf-blue bg-wf-blue/10'
                    : 'border-zinc-700 hover:border-wf-blue hover:bg-wf-blue/5'
                )}
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-8 h-8 text-wf-blue animate-spin" />
                    <p className="text-sm font-medium text-zinc-400">{uploadProgress}</p>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-zinc-600" />
                    <div className="text-center">
                      <p className="text-sm font-medium text-zinc-400">
                        Glissez-déposez ou cliquez pour uploader
                      </p>
                      <p className="text-xs text-zinc-600 mt-1">
                        JPG, PNG, WebP, GIF, SVG, AVIF — max 10MB
                      </p>
                      <p className="text-xs text-zinc-600">
                        Les images sont automatiquement optimisées en WebP
                      </p>
                    </div>
                  </>
                )}
              </button>
            </div>
          )}

          {/* ─── UNSPLASH TAB ─── */}
          {tab === 'unsplash' && (
            <>
              <div className="px-4 py-3 border-b border-zinc-800 shrink-0">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                    <input
                      value={unsplashQuery}
                      onChange={e => setUnsplashQuery(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') searchUnsplash(unsplashQuery) }}
                      placeholder="Ex: nature, business, technology..."
                      className="w-full h-8 bg-zinc-800 border border-zinc-700 text-white text-xs rounded-lg pl-8 pr-3 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                    />
                  </div>
                  <button onClick={() => searchUnsplash(unsplashQuery)}
                    className="px-3 h-8 bg-wf-blue text-white text-xs rounded-lg hover:bg-wf-blue/90 transition-colors">
                    Chercher
                  </button>
                </div>
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  {['business', 'nature', 'technology', 'people', 'architecture', 'food', 'travel', 'abstract'].map(tag => (
                    <button key={tag} onClick={() => { setUnsplashQuery(tag); searchUnsplash(tag) }}
                      className="text-xs px-2 py-0.5 bg-zinc-800 text-zinc-400 hover:text-white rounded-full border border-zinc-700 transition-colors">
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              <ScrollArea className="flex-1">
                <div className="p-4">
                  {loading ? (
                    <div className="flex items-center justify-center h-32">
                      <Loader2 className="w-5 h-5 animate-spin text-zinc-500" />
                    </div>
                  ) : unsplashResults.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-32 gap-2">
                      <ImageIcon className="w-8 h-8 text-zinc-700" />
                      <p className="text-xs text-zinc-600">Cherchez des images Unsplash</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      {unsplashResults.map(img => (
                        <button key={img.id} onClick={() => { onChange(img.url); onClose() }}
                          className="aspect-[4/3] rounded-lg overflow-hidden border-2 border-transparent hover:border-wf-blue transition-all group relative">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img.thumb} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-semibold bg-black/60 px-2 py-1 rounded">
                              Choisir
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </>
          )}

          {/* ─── URL TAB ─── */}
          {tab === 'url' && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 gap-4">
              <div className="w-full max-w-md space-y-3">
                <input
                  value={urlInput}
                  onChange={e => setUrlInput(e.target.value)}
                  placeholder="https://exemple.com/image.jpg"
                  className="w-full h-10 bg-zinc-800 border border-zinc-700 text-white text-sm rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-wf-blue"
                />
                {urlInput && (
                  <div className="aspect-video rounded-xl overflow-hidden bg-zinc-800 border border-zinc-700">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={urlInput}
                      alt="Apercu"
                      className="w-full h-full object-contain"
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                    />
                  </div>
                )}
                <button
                  onClick={() => { if (urlInput) { onChange(urlInput); onClose() } }}
                  disabled={!urlInput}
                  className="w-full py-2.5 bg-wf-blue hover:bg-wf-blue/90 disabled:opacity-40 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  Utiliser cette image
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
