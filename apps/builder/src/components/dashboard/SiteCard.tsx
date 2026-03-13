'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import { ExternalLink, Pencil, BarChart2, MoreHorizontal, Trash2, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { SiteListItem } from '@/lib/repositories'

interface SiteCardProps {
  site: SiteListItem
}

const STATUS_LABELS = {
  DRAFT: { label: 'Brouillon', class: 'bg-zinc-700 text-zinc-300' },
  PUBLISHED: { label: 'Publié', class: 'bg-green-900/50 text-green-400' },
  ARCHIVED: { label: 'Archivé', class: 'bg-zinc-800 text-zinc-500' },
}

export function SiteCard({ site }: SiteCardProps) {
  const status = STATUS_LABELS[site.status]
  const router = useRouter()

  const handleDelete = async () => {
    if (!window.confirm(`Supprimer "${site.name}" ? Cette action est irréversible.`)) return
    const res = await fetch(`/api/sites/${site.id}`, { method: 'DELETE' })
    if (res.ok) {
      router.refresh()
    }
  }

  return (
    <div className="group relative bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-600 transition-colors">
      {/* Thumbnail */}
      <div className="aspect-video bg-zinc-800 flex items-center justify-center relative overflow-hidden">
        {site.thumbnail ? (
          <img src={site.thumbnail} alt={site.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
            <span className="text-zinc-600 text-xs">Aperçu indisponible</span>
          </div>
        )}
        {/* Overlay actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Link href={`/editor/${site.id}`}>
            <Button size="sm" className="bg-white text-black hover:bg-zinc-100 gap-1.5">
              <Pencil className="w-3.5 h-3.5" />
              Éditer
            </Button>
          </Link>
        </div>
      </div>

      {/* Infos */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-medium text-sm truncate">{site.name}</h3>
            <p className="text-zinc-500 text-xs mt-0.5 truncate">
              {formatDistanceToNow(new Date(site.updatedAt), { addSuffix: true, locale: fr })}
            </p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${status.class}`}>
              {status.label}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-6 h-6 text-zinc-500">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800 text-zinc-100">
                <DropdownMenuItem asChild>
                  <Link href={`/editor/${site.id}`} className="gap-2">
                    <Pencil className="w-4 h-4" /> Éditer
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/crm/${site.id}`} className="gap-2">
                    <BarChart2 className="w-4 h-4" /> CRM
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/portal/${site.id}`} className="gap-2">
                    <Monitor className="w-4 h-4" /> Portail Client
                  </Link>
                </DropdownMenuItem>
                {site.deployUrl && (
                  <DropdownMenuItem asChild>
                    <a href={site.deployUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                      <ExternalLink className="w-4 h-4" /> Voir le site
                    </a>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="gap-2 text-red-400 focus:text-red-400 focus:bg-red-950/50"
                >
                  <Trash2 className="w-4 h-4" /> Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-3 mt-3 pt-3 border-t border-zinc-800">
          <span className="text-zinc-500 text-xs">{site._count.pages} page{site._count.pages > 1 ? 's' : ''}</span>
          <span className="text-zinc-500 text-xs">{site._count.leads} lead{site._count.leads > 1 ? 's' : ''}</span>
          <span className="text-zinc-500 text-xs">{site._count.contacts} contact{site._count.contacts > 1 ? 's' : ''}</span>
        </div>
      </div>
    </div>
  )
}
