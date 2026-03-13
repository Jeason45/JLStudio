import { getSiteById } from '@/lib/repositories'
import { notFound } from 'next/navigation'
import { EditorClient } from '@/components/editor/EditorClient'
import { DEFAULT_SITE_CONFIG } from '@/types/site'

interface EditorPageProps {
  params: Promise<{ siteId: string }>
}

export default async function EditorPage({ params }: EditorPageProps) {
  const { siteId } = await params

  let dbSite: Awaited<ReturnType<typeof getSiteById>> | null = null
  try {
    dbSite = await getSiteById(siteId)
  } catch {
    // DB not connected — use mock site for development
  }

  if (!dbSite) {
    // Fallback mock site when DB is not available
    const mockConfig = DEFAULT_SITE_CONFIG(siteId, 'Site de demo')
    return <EditorClient site={{ id: siteId, name: 'Site de demo', config: mockConfig, status: 'DRAFT' }} />
  }

  return <EditorClient site={dbSite} />
}
