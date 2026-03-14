import { getAllSites } from '@/lib/repositories'
import { SiteCard } from '@/components/dashboard/SiteCard'
import { CreateSiteDialog } from '@/components/dashboard/CreateSiteDialog'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StartBuildingCard } from '@/components/dashboard/StartBuildingCard'
import { PopularTemplates } from '@/components/dashboard/PopularTemplates'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  let sites: Awaited<ReturnType<typeof getAllSites>> = []
  try {
    sites = await getAllSites()
  } catch {
    // DB not connected — show empty state
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header Dashboard */}
      <header className="border-b border-zinc-800 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center">
            <span className="text-xs font-bold">W</span>
          </div>
          <span className="font-semibold text-sm">Starter Workspace</span>
        </div>
        <CreateSiteDialog>
          <Button size="sm" className="bg-indigo-500 hover:bg-indigo-600 text-white gap-2">
            <Plus className="w-4 h-4" />
            New site
          </Button>
        </CreateSiteDialog>
      </header>

      {/* Contenu */}
      <main className="px-8 py-10 max-w-7xl mx-auto">
        {/* Start building — always visible */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">Start building</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StartBuildingCard
              icon="sparkles"
              title="AI site builder"
              description="Quickly generate a custom website"
              action="coming-soon"
            />
            <StartBuildingCard
              icon="template"
              title="Template"
              description="Start with a design that fits your needs"
              action="template"
            />
            <StartBuildingCard
              icon="plus"
              title="Blank site"
              description="Build a custom site from scratch"
              action="blank"
            />
          </div>
        </section>

        {/* Popular templates */}
        <PopularTemplates />

        {/* Sites list */}
        {sites.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">
              Vos sites
              <span className="text-zinc-500 text-sm font-normal ml-2">
                {sites.length} site{sites.length !== 1 ? 's' : ''}
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {sites.map((site) => (
                <SiteCard key={site.id} site={site} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
