import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractSiteId, extractUserRole } from '@/lib/auth';

interface SectionConfig {
  id: string;
  type: string;
  variant: string;
  content: Record<string, unknown>;
  visible: boolean;
}

interface PageConfig {
  id: string;
  slug: string;
  title: string;
  sections: SectionConfig[];
}

// GET — Returns all pages with their sections (content only, not style)
export async function GET(req: NextRequest) {
  const siteId = extractSiteId(req.headers);
  if (!siteId) {
    return NextResponse.json({ error: 'Non autorise' }, { status: 401 });
  }

  const site = await prisma.site.findUnique({
    where: { id: siteId },
    select: { id: true, name: true, config: true },
  });

  if (!site) {
    return NextResponse.json({ error: 'Site non trouve' }, { status: 404 });
  }

  const config = site.config as { pages?: PageConfig[] } | null;
  const pages = config?.pages || [];

  // Return pages with sections (only editable content, not style)
  const result = pages.map((page: PageConfig) => ({
    id: page.id,
    slug: page.slug,
    title: page.title,
    sections: (page.sections || [])
      .filter((s: SectionConfig) => s.visible !== false)
      .map((s: SectionConfig) => ({
        id: s.id,
        type: s.type,
        variant: s.variant,
        content: s.content || {},
      })),
  }));

  return NextResponse.json({ siteName: site.name, pages: result });
}

// PUT — Update a section's content
export async function PUT(req: NextRequest) {
  const siteId = extractSiteId(req.headers);
  const role = extractUserRole(req.headers);

  if (!siteId) {
    return NextResponse.json({ error: 'Non autorise' }, { status: 401 });
  }
  if (role === 'CLIENT') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }

  const body = await req.json();
  const { pageId, sectionId, content } = body as {
    pageId: string;
    sectionId: string;
    content: Record<string, unknown>;
  };

  if (!pageId || !sectionId || !content) {
    return NextResponse.json({ error: 'pageId, sectionId et content requis' }, { status: 400 });
  }

  const site = await prisma.site.findUnique({
    where: { id: siteId },
    select: { id: true, config: true },
  });

  if (!site) {
    return NextResponse.json({ error: 'Site non trouve' }, { status: 404 });
  }

  const config = site.config as { pages?: PageConfig[]; [key: string]: unknown } | null;
  if (!config?.pages) {
    return NextResponse.json({ error: 'Configuration invalide' }, { status: 500 });
  }

  // Find the page and section, update content
  let found = false;
  for (const page of config.pages) {
    if (page.id !== pageId) continue;
    for (const section of page.sections || []) {
      if (section.id !== sectionId) continue;
      // Merge new content into existing (preserves fields not sent)
      section.content = { ...section.content, ...content };
      found = true;
      break;
    }
    if (found) break;
  }

  if (!found) {
    return NextResponse.json({ error: 'Section non trouvee' }, { status: 404 });
  }

  // Also update the Page record's config if it exists
  await prisma.site.update({
    where: { id: siteId },
    data: { config: config as object },
  });

  // Update the individual Page record too
  const pageRecord = await prisma.page.findFirst({
    where: { siteId, id: pageId },
  });
  if (pageRecord) {
    const pageConfig = pageRecord.config as PageConfig | null;
    if (pageConfig?.sections) {
      for (const section of pageConfig.sections) {
        if (section.id === sectionId) {
          section.content = { ...(section.content || {}), ...content };
          break;
        }
      }
      await prisma.page.update({
        where: { id: pageId },
        data: { config: pageConfig as object },
      });
    }
  }

  return NextResponse.json({ ok: true });
}
