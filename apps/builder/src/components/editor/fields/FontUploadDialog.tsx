'use client'
import { useState, useRef } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload, Plus, Trash2 } from 'lucide-react'
import { FONT_EXTENSIONS, FONT_CATEGORIES, type FontCategory, type CustomFontFile } from '@/lib/fonts'

interface PendingFile {
  file: File
  weight: number
  style: 'normal' | 'italic'
}

interface FontUploadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FontUploadDialog({ open, onOpenChange }: FontUploadDialogProps) {
  const { siteConfig, addCustomFont } = useEditorStore()
  const [fontName, setFontName] = useState('')
  const [category, setCategory] = useState<FontCategory>('sans-serif')
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const reset = () => {
    setFontName('')
    setCategory('sans-serif')
    setPendingFiles([])
    setError('')
  }

  const handleAddFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    const valid = files.filter(f => {
      const ext = '.' + f.name.split('.').pop()?.toLowerCase()
      return FONT_EXTENSIONS.includes(ext)
    })
    if (valid.length === 0) {
      setError('Aucun fichier de police valide (TTF, OTF, WOFF, WOFF2)')
      return
    }
    setError('')
    const newPending = valid.map(f => ({ file: f, weight: 400, style: 'normal' as const }))
    setPendingFiles(prev => [...prev, ...newPending])
    // Auto-fill font name from first file if empty
    if (!fontName && valid[0]) {
      const name = valid[0].name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')
      setFontName(name)
    }
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const removeFile = (index: number) => {
    setPendingFiles(prev => prev.filter((_, i) => i !== index))
  }

  const updateFile = (index: number, updates: Partial<PendingFile>) => {
    setPendingFiles(prev => prev.map((f, i) => i === index ? { ...f, ...updates } : f))
  }

  const handleUpload = async () => {
    if (!fontName.trim() || pendingFiles.length === 0) {
      setError('Nom et au moins un fichier requis')
      return
    }

    setUploading(true)
    setError('')

    try {
      const uploadedFiles: CustomFontFile[] = []

      for (const pf of pendingFiles) {
        const formData = new FormData()
        formData.append('file', pf.file)
        formData.append('fontName', fontName.trim())
        formData.append('weight', String(pf.weight))
        formData.append('style', pf.style)
        formData.append('siteId', siteConfig?.id ?? '')

        const res = await fetch('/api/fonts', { method: 'POST', body: formData })
        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.error ?? 'Erreur upload')
        }
        const data = await res.json()
        uploadedFiles.push({
          url: data.url,
          format: data.format,
          weight: pf.weight,
          style: pf.style,
        })
      }

      addCustomFont({
        id: crypto.randomUUID(),
        name: fontName.trim(),
        files: uploadedFiles,
        category,
      })

      reset()
      onOpenChange(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur upload')
    } finally {
      setUploading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={v => { if (!v) reset(); onOpenChange(v) }}>
      <DialogContent className="bg-zinc-900 border-zinc-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-sm">Upload Custom Font</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Font name */}
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400">Font Name</Label>
            <Input
              value={fontName}
              onChange={e => setFontName(e.target.value)}
              placeholder="My Custom Font"
              className="h-8 bg-zinc-800 border-zinc-700 text-xs"
            />
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400">Category</Label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value as FontCategory)}
              className="w-full h-8 bg-zinc-800 border border-zinc-700 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
            >
              {FONT_CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* File list */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-zinc-400">Font Files</Label>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-[10px] text-wf-blue hover:text-blue-300 flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add file
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".ttf,.otf,.woff,.woff2"
              multiple
              onChange={handleAddFiles}
              className="hidden"
            />

            {pendingFiles.length === 0 ? (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-20 border border-dashed border-zinc-700 rounded-lg flex flex-col items-center justify-center gap-1.5 text-zinc-500 hover:border-zinc-600 hover:text-zinc-400 transition-colors"
              >
                <Upload className="w-5 h-5" />
                <span className="text-[11px]">TTF, OTF, WOFF, WOFF2</span>
              </button>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {pendingFiles.map((pf, i) => (
                  <div key={i} className="flex items-center gap-2 bg-zinc-800 rounded-md p-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] text-zinc-300 truncate">{pf.file.name}</p>
                      <p className="text-[9px] text-zinc-500">{(pf.file.size / 1024).toFixed(0)} KB</p>
                    </div>
                    <select
                      value={pf.weight}
                      onChange={e => updateFile(i, { weight: parseInt(e.target.value) })}
                      className="h-6 bg-zinc-700 border-none text-[10px] text-white rounded px-1"
                    >
                      {[100, 200, 300, 400, 500, 600, 700, 800, 900].map(w => (
                        <option key={w} value={w}>{w}</option>
                      ))}
                    </select>
                    <select
                      value={pf.style}
                      onChange={e => updateFile(i, { style: e.target.value as 'normal' | 'italic' })}
                      className="h-6 bg-zinc-700 border-none text-[10px] text-white rounded px-1"
                    >
                      <option value="normal">Normal</option>
                      <option value="italic">Italic</option>
                    </select>
                    <button onClick={() => removeFile(i)} className="text-zinc-500 hover:text-red-400">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && <p className="text-[11px] text-red-400">{error}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => { reset(); onOpenChange(false) }}
              className="h-7 text-xs bg-zinc-800 border-zinc-700 text-zinc-300">
              Cancel
            </Button>
            <Button size="sm" onClick={handleUpload} disabled={uploading || !fontName.trim() || pendingFiles.length === 0}
              className="h-7 text-xs bg-wf-blue hover:bg-wf-blue/90 text-white">
              {uploading ? 'Uploading...' : 'Upload Font'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
