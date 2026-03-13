'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { ScrollArea } from '@/components/ui/scroll-area'
import { FileText, Home, FolderOpen, Plus, Search, Settings, X, ChevronDown, AlertTriangle, KeyRound, Copy, Trash2, Database, Code, Lock, LockOpen, GripVertical, FolderPlus } from 'lucide-react'
import { cn } from '@/lib/utils'

// Utility page definitions
const UTILITY_PAGES = [
  { slug: '/404', title: '404', icon: AlertTriangle, label: '404' },
  { slug: '/password-protected', title: 'Password', icon: KeyRound, label: 'Password' },
  { slug: '/search-results', title: 'Search Results', icon: Search, label: 'Search Results' },
] as const

export function PagesPanel() {
  const {
    siteConfig, selectedPageId, selectPage,
    addPage, deletePage, duplicatePage, updatePage, setPagePassword, reorderPages,
  } = useEditorStore()
  const [search, setSearch] = useState('')
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['pages', 'utility']))
  const [isAdding, setIsAdding] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newSlug, setNewSlug] = useState('')
  const [editingPageId, setEditingPageId] = useState<string | null>(null)
  const [codePageId, setCodePageId] = useState<string | null>(null)
  const [passwordPageId, setPasswordPageId] = useState<string | null>(null)
  const [menuPageId, setMenuPageId] = useState<string | null>(null)
  const [isAddingFolder, setIsAddingFolder] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())
  const menuRef = useRef<HTMLDivElement>(null)

  // Drag state
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [dropIndex, setDropIndex] = useState<number | null>(null)

  const toggleSection = (id: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const toggleFolder = (folder: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev)
      next.has(folder) ? next.delete(folder) : next.add(folder)
      return next
    })
  }

  // Close menu on outside click
  useEffect(() => {
    if (!menuPageId) return
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuPageId(null)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuPageId])

  const pages = siteConfig?.pages ?? []
  const regularPages = pages.filter(p => !p.isUtilityPage)
  const filteredPages = search.trim()
    ? regularPages.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.slug.toLowerCase().includes(search.toLowerCase()))
    : regularPages

  // Group pages by folder
  const folders = new Set<string>()
  for (const p of filteredPages) {
    if (p.folder) folders.add(p.folder)
  }
  const ungroupedPages = filteredPages.filter(p => !p.folder)
  const folderGroups = Array.from(folders).sort().map(f => ({
    name: f,
    pages: filteredPages.filter(p => p.folder === f),
  }))

  const handleAdd = () => {
    if (!newTitle.trim()) return
    const slug = newSlug.trim() || `/${newTitle.trim().toLowerCase().replace(/\s+/g, '-')}`
    addPage(newTitle.trim(), slug.startsWith('/') ? slug : `/${slug}`)
    setIsAdding(false)
    setNewTitle('')
    setNewSlug('')
  }

  const handleAddFolder = () => {
    if (!newFolderName.trim()) return
    // Just register the folder name — pages can be assigned to it via context menu
    setExpandedFolders(prev => new Set(prev).add(newFolderName.trim()))
    // Create the folder by adding a dummy reference so it shows up
    // We'll create a page inside the folder
    const folderSlug = `/${newFolderName.trim().toLowerCase().replace(/\s+/g, '-')}`
    addPage(newFolderName.trim(), folderSlug)
    // Set the folder on the newly created page
    const latestPages = useEditorStore.getState().siteConfig?.pages ?? []
    const newPage = latestPages[latestPages.length - 1]
    if (newPage) {
      updatePage(newPage.id, { folder: newFolderName.trim() })
    }
    setIsAddingFolder(false)
    setNewFolderName('')
  }

  // Utility page click handler
  const handleUtilityPageClick = useCallback((slug: string, title: string) => {
    const allPages = useEditorStore.getState().siteConfig?.pages ?? []
    const existing = allPages.find(p => p.slug === slug && p.isUtilityPage)
    if (existing) {
      selectPage(existing.id)
    } else {
      // Create the utility page
      addPage(title, slug)
      // Mark it as utility page
      const updatedPages = useEditorStore.getState().siteConfig?.pages ?? []
      const created = updatedPages[updatedPages.length - 1]
      if (created) {
        updatePage(created.id, { isUtilityPage: true })
      }
    }
  }, [selectPage, addPage, updatePage])

  // Drag handlers for reordering
  const handleDragStart = (e: React.DragEvent, pageIndex: number) => {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', String(pageIndex))
    setDragIndex(pageIndex)
  }

  const handleDragOver = (e: React.DragEvent, pageIndex: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDropIndex(pageIndex)
  }

  const handleDragLeave = () => {
    setDropIndex(null)
  }

  const handleDrop = (e: React.DragEvent, toPageIndex: number) => {
    e.preventDefault()
    const fromPageIndex = parseInt(e.dataTransfer.getData('text/plain'), 10)
    if (!isNaN(fromPageIndex) && fromPageIndex !== toPageIndex) {
      // Convert filtered index to real pages array index
      const fromPage = filteredPages[fromPageIndex]
      const toPage = filteredPages[toPageIndex]
      if (fromPage && toPage) {
        // Only allow reorder within same folder
        if (fromPage.folder === toPage.folder) {
          const realFrom = pages.findIndex(p => p.id === fromPage.id)
          const realTo = pages.findIndex(p => p.id === toPage.id)
          if (realFrom !== -1 && realTo !== -1) {
            reorderPages(realFrom, realTo)
          }
        }
      }
    }
    setDragIndex(null)
    setDropIndex(null)
  }

  const handleDragEnd = () => {
    setDragIndex(null)
    setDropIndex(null)
  }

  // Render a page row
  const renderPageRow = (page: typeof pages[0]) => {
    const isHome = page.slug === '/'
    const realIndex = filteredPages.findIndex(p => p.id === page.id)

    return (
      <div
        key={page.id}
        className="relative"
        draggable={!editingPageId}
        onDragStart={e => handleDragStart(e, realIndex)}
        onDragOver={e => handleDragOver(e, realIndex)}
        onDragLeave={handleDragLeave}
        onDrop={e => handleDrop(e, realIndex)}
        onDragEnd={handleDragEnd}
      >
        {/* Drop indicator line */}
        {dropIndex === realIndex && dragIndex !== null && dragIndex !== realIndex && (
          <div className="absolute top-0 left-2 right-2 h-[2px] bg-blue-500 rounded-full z-10" />
        )}

        <div
          className={cn(
            'flex items-center gap-1.5 px-1 py-1.5 rounded text-[11px] transition-colors cursor-pointer group',
            selectedPageId === page.id ? 'bg-wf-blue/15 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white',
            dragIndex === realIndex && 'opacity-40'
          )}
          onClick={() => selectPage(page.id)}
        >
          {/* Drag handle */}
          <div className="opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing shrink-0 text-zinc-600 hover:text-zinc-400">
            <GripVertical className="w-3 h-3" />
          </div>

          {isHome ? <Home className="w-3.5 h-3.5 shrink-0" /> : <FileText className="w-3.5 h-3.5 shrink-0" />}

          {editingPageId === page.id ? (
            <div className="flex-1 space-y-1" onClick={e => e.stopPropagation()}>
              <input
                defaultValue={page.title}
                onBlur={e => updatePage(page.id, { title: e.target.value })}
                className="w-full h-5 bg-zinc-900 border border-zinc-600 text-white text-[10px] rounded px-1"
                autoFocus
              />
              <input
                defaultValue={page.slug}
                onBlur={e => { updatePage(page.id, { slug: e.target.value }); setEditingPageId(null) }}
                onKeyDown={e => e.key === 'Enter' && setEditingPageId(null)}
                className="w-full h-5 bg-zinc-900 border border-zinc-600 text-white text-[10px] rounded px-1"
                placeholder="/slug"
              />
            </div>
          ) : (
            <span className="flex-1 truncate">
              {page.title}
              {page.collectionId && (
                <span className="ml-1.5 inline-flex items-center gap-0.5 px-1 py-0.5 bg-purple-500/20 text-purple-400 text-[8px] rounded" title="Collection Page">
                  <Database className="w-2 h-2" />CMS
                </span>
              )}
              {page.password && (
                <span className="ml-1.5 inline-flex items-center gap-0.5 px-1 py-0.5 bg-amber-500/20 text-amber-400 text-[8px] rounded" title="Password Protected">
                  <Lock className="w-2 h-2" />
                </span>
              )}
            </span>
          )}

          <button
            onClick={e => { e.stopPropagation(); setMenuPageId(menuPageId === page.id ? null : page.id) }}
            className="opacity-0 group-hover:opacity-100 p-0.5 text-zinc-600 hover:text-white transition-all shrink-0"
            title="Page settings"
          >
            <Settings className="w-3 h-3" />
          </button>
        </div>

        {/* Context menu */}
        {menuPageId === page.id && (
          <div ref={menuRef} className="absolute right-1 top-full z-50 mt-0.5 bg-zinc-800 border border-zinc-700 rounded shadow-xl py-1 min-w-[120px]">
            <button
              onClick={() => { setEditingPageId(page.id); setMenuPageId(null) }}
              className="w-full flex items-center gap-2 px-3 py-1.5 text-[10px] text-zinc-300 hover:bg-zinc-700 transition-colors"
            >
              <Settings className="w-3 h-3" /> Edit
            </button>
            <button
              onClick={() => { setCodePageId(codePageId === page.id ? null : page.id); setMenuPageId(null) }}
              className="w-full flex items-center gap-2 px-3 py-1.5 text-[10px] text-zinc-300 hover:bg-zinc-700 transition-colors"
            >
              <Code className="w-3 h-3" /> Custom Code
            </button>
            <button
              onClick={() => { setPasswordPageId(passwordPageId === page.id ? null : page.id); setMenuPageId(null) }}
              className="w-full flex items-center gap-2 px-3 py-1.5 text-[10px] text-zinc-300 hover:bg-zinc-700 transition-colors"
            >
              {page.password ? <Lock className="w-3 h-3" /> : <LockOpen className="w-3 h-3" />} Password
            </button>
            {/* Move to folder */}
            {folderGroups.length > 0 && (
              <div className="border-t border-zinc-700 mt-1 pt-1">
                <span className="block px-3 py-0.5 text-[9px] text-zinc-500">Move to folder</span>
                {page.folder && (
                  <button
                    onClick={() => { updatePage(page.id, { folder: undefined }); setMenuPageId(null) }}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-[10px] text-zinc-300 hover:bg-zinc-700 transition-colors"
                  >
                    <X className="w-3 h-3" /> No folder
                  </button>
                )}
                {folderGroups.map(fg => (
                  fg.name !== page.folder && (
                    <button
                      key={fg.name}
                      onClick={() => { updatePage(page.id, { folder: fg.name }); setMenuPageId(null) }}
                      className="w-full flex items-center gap-2 px-3 py-1.5 text-[10px] text-zinc-300 hover:bg-zinc-700 transition-colors"
                    >
                      <FolderOpen className="w-3 h-3" /> {fg.name}
                    </button>
                  )
                ))}
              </div>
            )}
            <div className="border-t border-zinc-700 mt-1 pt-1">
              <button
                onClick={() => { duplicatePage(page.id); setMenuPageId(null) }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-[10px] text-zinc-300 hover:bg-zinc-700 transition-colors"
              >
                <Copy className="w-3 h-3" /> Duplicate
              </button>
              {!isHome && (
                <button
                  onClick={() => { deletePage(page.id); setMenuPageId(null) }}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-[10px] text-red-400 hover:bg-zinc-700 transition-colors"
                >
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
              )}
            </div>
          </div>
        )}

        {/* Custom Code Panel */}
        {codePageId === page.id && (
          <div className="mt-1 mx-1 p-2 bg-zinc-900 border border-zinc-700 rounded space-y-2" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-zinc-400 font-medium">Page Custom Code</span>
              <button onClick={() => setCodePageId(null)} className="text-zinc-600 hover:text-white"><X className="w-3 h-3" /></button>
            </div>
            <div>
              <label className="text-[10px] text-zinc-500">Head Code</label>
              <textarea
                value={page.headCode ?? ''}
                onChange={e => updatePage(page.id, { headCode: e.target.value })}
                placeholder="<!-- Page head code -->"
                rows={3}
                className="w-full bg-zinc-800 border border-zinc-700 text-[10px] font-mono text-zinc-300 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-700 resize-none"
              />
            </div>
            <div>
              <label className="text-[10px] text-zinc-500">Body Code</label>
              <textarea
                value={page.bodyCode ?? ''}
                onChange={e => updatePage(page.id, { bodyCode: e.target.value })}
                placeholder="<!-- Page body code -->"
                rows={3}
                className="w-full bg-zinc-800 border border-zinc-700 text-[10px] font-mono text-zinc-300 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-700 resize-none"
              />
            </div>
          </div>
        )}

        {/* Password Protection Panel */}
        {passwordPageId === page.id && (
          <div className="mt-1 mx-1 p-2 bg-zinc-900 border border-zinc-700 rounded space-y-2" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-zinc-400 font-medium flex items-center gap-1">
                <Lock className="w-3 h-3" /> Password Protection
              </span>
              <button onClick={() => setPasswordPageId(null)} className="text-zinc-600 hover:text-white"><X className="w-3 h-3" /></button>
            </div>
            <div>
              <label className="text-[10px] text-zinc-500">Page password</label>
              <input
                type="text"
                value={page.password ?? ''}
                onChange={e => setPagePassword(page.id, e.target.value || undefined)}
                placeholder="Leave empty to disable"
                className="w-full h-7 bg-zinc-800 border border-zinc-700 text-[10px] font-mono text-zinc-300 rounded px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-700"
              />
            </div>
            <p className="text-[9px] text-zinc-500">
              Visitors will need to enter this password to view the page. Leave empty to remove protection.
            </p>
            {page.password && (
              <button
                onClick={() => setPagePassword(page.id, undefined)}
                className="w-full py-1 bg-red-500/10 text-red-400 text-[10px] rounded hover:bg-red-500/20 transition-colors"
              >
                Remove password
              </button>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Search */}
      <div className="px-2 py-1.5 border-b border-zinc-800 shrink-0">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-600" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search pages and folders"
            className="w-full h-7 bg-zinc-800 border border-zinc-700 text-white text-[11px] rounded pl-7 pr-6 focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-500"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {/* Pages section */}
          <div>
            <button
              onClick={() => toggleSection('pages')}
              className="w-full flex items-center justify-between px-1 py-1 hover:bg-zinc-800/50 rounded transition-colors"
            >
              <span className="text-[11px] font-semibold text-[#ccc]">Pages</span>
              <ChevronDown className={cn('w-3 h-3 text-zinc-600 transition-transform', !expandedSections.has('pages') && '-rotate-90')} />
            </button>
            {expandedSections.has('pages') && (
              <div className="space-y-0.5 mt-0.5">
                {/* Ungrouped pages */}
                {ungroupedPages.map(page => renderPageRow(page))}

                {/* Folder groups */}
                {folderGroups.map(fg => (
                  <div key={fg.name} className="mt-1">
                    <button
                      onClick={() => toggleFolder(fg.name)}
                      className="w-full flex items-center gap-1.5 px-2 py-1 hover:bg-zinc-800/50 rounded transition-colors"
                    >
                      <FolderOpen className="w-3 h-3 text-zinc-500" />
                      <span className="text-[10px] font-medium text-zinc-400 flex-1 text-left">{fg.name}</span>
                      <span className="text-[9px] text-zinc-500">{fg.pages.length}</span>
                      <ChevronDown className={cn('w-2.5 h-2.5 text-zinc-600 transition-transform', !expandedFolders.has(fg.name) && '-rotate-90')} />
                    </button>
                    {expandedFolders.has(fg.name) && (
                      <div className="pl-2 space-y-0.5 mt-0.5">
                        {fg.pages.map(page => renderPageRow(page))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Add page inline form */}
                {isAdding ? (
                  <div className="px-2 py-1.5 space-y-1">
                    <input
                      value={newTitle}
                      onChange={e => setNewTitle(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleAdd()}
                      placeholder="Page title"
                      autoFocus
                      className="w-full h-6 bg-zinc-900 border border-zinc-600 text-white text-[10px] rounded px-1.5 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                    />
                    <input
                      value={newSlug}
                      onChange={e => setNewSlug(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleAdd()}
                      placeholder="/slug (auto)"
                      className="w-full h-6 bg-zinc-900 border border-zinc-600 text-white text-[10px] rounded px-1.5 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                    />
                    <div className="flex gap-1.5">
                      <button onClick={handleAdd} className="flex-1 py-1 bg-wf-blue text-white text-[10px] rounded hover:bg-wf-blue/90">Add</button>
                      <button onClick={() => { setIsAdding(false); setNewTitle(''); setNewSlug('') }} className="flex-1 py-1 bg-zinc-800 text-zinc-400 text-[10px] rounded hover:bg-zinc-700">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsAdding(true)}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-left text-[11px] text-zinc-500 hover:text-zinc-400 hover:bg-zinc-800/50 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add page
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Utility pages */}
          <div>
            <button
              onClick={() => toggleSection('utility')}
              className="w-full flex items-center justify-between px-1 py-1 hover:bg-zinc-800/50 rounded transition-colors"
            >
              <span className="text-[11px] font-semibold text-[#ccc]">Utility pages</span>
              <ChevronDown className={cn('w-3 h-3 text-zinc-600 transition-transform', !expandedSections.has('utility') && '-rotate-90')} />
            </button>
            {expandedSections.has('utility') && (
              <div className="space-y-0.5 mt-0.5">
                {UTILITY_PAGES.map(up => {
                  const existingPage = pages.find(p => p.slug === up.slug && p.isUtilityPage)
                  const isSelected = existingPage && selectedPageId === existingPage.id
                  return (
                    <div
                      key={up.slug}
                      className={cn(
                        'flex items-center gap-2 px-2 py-1.5 rounded text-[11px] cursor-pointer transition-colors',
                        isSelected
                          ? 'bg-wf-blue/15 text-white'
                          : existingPage
                            ? 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                            : 'text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300'
                      )}
                      onClick={() => handleUtilityPageClick(up.slug, up.title)}
                    >
                      <up.icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="flex-1">{up.label}</span>
                      {!existingPage && (
                        <span className="text-[9px] text-zinc-500">Click to create</span>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Create folder */}
          <div>
            {isAddingFolder ? (
              <div className="px-2 py-1.5 space-y-1">
                <input
                  value={newFolderName}
                  onChange={e => setNewFolderName(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleAddFolder()
                    if (e.key === 'Escape') { setIsAddingFolder(false); setNewFolderName('') }
                  }}
                  placeholder="Folder name"
                  autoFocus
                  className="w-full h-6 bg-zinc-900 border border-zinc-600 text-white text-[10px] rounded px-1.5 focus:outline-none focus:ring-1 focus:ring-wf-blue"
                />
                <div className="flex gap-1.5">
                  <button onClick={handleAddFolder} className="flex-1 py-1 bg-wf-blue text-white text-[10px] rounded hover:bg-wf-blue/90">Create</button>
                  <button onClick={() => { setIsAddingFolder(false); setNewFolderName('') }} className="flex-1 py-1 bg-zinc-800 text-zinc-400 text-[10px] rounded hover:bg-zinc-700">Cancel</button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsAddingFolder(true)}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-left text-[11px] text-zinc-500 hover:text-zinc-400 hover:bg-zinc-800/50 transition-colors"
              >
                <FolderPlus className="w-3.5 h-3.5" /> Create folder
              </button>
            )}
          </div>
        </div>
      </ScrollArea>
    </>
  )
}
