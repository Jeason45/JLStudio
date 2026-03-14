import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { nanoid } from 'nanoid'
import { SiteConfig, SectionConfig, DEFAULT_SITE_CONFIG } from '@/types/site'

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// Upsert template record in DB (by slug)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function upsertTemplate(template: any, slug: string): Promise<{ id: string; slug: string }> {
  const data = {
    name: template.site?.name || 'Unnamed',
    description: template.site?.industry
      ? `${template.site.industry} - ${template.site.audience || ''}`
      : template.meta?.description || null,
    category: template.site?.industry || null,
    universe: template.style?.mood?.[0] || null,
    emoji: null as string | null,
    preview: null as string | null,
    sourceUrl: template.site?.sourceUrl || null,
    sections: template.sections || [],
    pages: template.pages || [],
    brand: template.brand || {},
    navigation: template.navigation || {},
    footer: template.footer || {},
    meta: template.meta || {},
  }

  const result = await prisma.template.upsert({
    where: { slug },
    create: { slug, ...data },
    update: data,
  })

  return { id: result.id, slug: result.slug }
}

// Normalize content fields to match expected component interfaces
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeContent(type: string, content: Record<string, any>): Record<string, any> {
  // product-grid: items[].title → items[].name (ProductItem expects 'name')
  if (type === 'product-grid' && Array.isArray(content.items)) {
    content.items = content.items.map((item: Record<string, unknown>) => ({
      ...item,
      name: item.name || item.title || 'Product',
    }))
  }
  // image-text: features[] → items[] (ImageTextContent expects 'items')
  if (type === 'image-text' && Array.isArray(content.features) && !content.items) {
    content.items = content.features
    delete content.features
  }
  // site-header: ensure links have ids (NavLink expects 'id')
  if (type === 'site-header' && Array.isArray(content.links)) {
    content.links = content.links.map((link: Record<string, unknown>, i: number) => ({
      ...link,
      id: link.id || `nav-${i}`,
    }))
  }
  return content
}

// Build SiteConfig from template JSON
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildSiteConfig(template: any, siteId: string, siteName: string): { config: SiteConfig; homePageId: string; homeSections: SectionConfig[] } {
  const homePageId = `page-${nanoid(8)}`

  const config: SiteConfig = {
    ...DEFAULT_SITE_CONFIG(siteId, siteName),
    id: siteId,
    meta: {
      title: template.meta?.title || siteName,
      description: template.meta?.description || '',
      lang: template.meta?.lang || 'en',
      favicon: template.meta?.favicon,
      ogImage: template.meta?.ogImage,
    },
    brand: template.brand
      ? {
          colors: {
            primary: template.brand.colors?.primary || '#6366f1',
            secondary: template.brand.colors?.secondary || '#8b5cf6',
            accent: template.brand.colors?.accent || '#f59e0b',
            background: template.brand.colors?.background || '#ffffff',
            foreground: template.brand.colors?.foreground || '#0f172a',
            muted: template.brand.colors?.muted || '#f1f5f9',
          },
          typography: {
            heading: template.brand.typography?.heading || 'Inter',
            body: template.brand.typography?.body || 'Inter',
            size: template.brand.typography?.size || 'default',
          },
          borderRadius: template.brand.borderRadius || 'md',
          spacing: template.brand.spacing || 'default',
        }
      : DEFAULT_SITE_CONFIG(siteId, siteName).brand,
    navigation: template.navigation
      ? {
          links: (template.navigation.links || []).map((l: { label: string; href: string }) => ({
            label: l.label,
            href: l.href,
          })),
          cta: template.navigation.cta,
          style: template.navigation.style || 'solid',
        }
      : { links: [], style: 'solid' as const },
    footer: template.footer
      ? {
          columns: template.footer.columns || [],
          copyright: template.footer.copyright || '',
          showSocials: template.footer.showSocials || false,
          socials: template.footer.socials,
        }
      : { columns: [], copyright: '', showSocials: false },
    integrations: {
      crm: { enabled: template.integrations?.crm?.enabled ?? true },
    },
    pages: [],
  }

  // Build home page sections from template.sections
  const homeSections: SectionConfig[] = template.sections.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (s: any, i: number) => ({
      id: s.id || `section-${Date.now()}-${i}-${nanoid(5)}`,
      type: s.type,
      variant: s.variant || `${template.style?.mood?.[0] || 'luxe'}-default`,
      content: normalizeContent(s.type, s.content || {}),
      style: {
        background: s.style?.background || 'white',
        paddingY: s.style?.paddingY || 'lg',
        ...(s.style?.textAlign && { textAlign: s.style.textAlign }),
        ...(s.style?.textColor && { textColor: s.style.textColor }),
        ...(s.style?.accentColor && { accentColor: s.style.accentColor }),
        ...(s.style?.fontFamily && { fontFamily: s.style.fontFamily }),
        ...(s.style?.fontWeight && { fontWeight: s.style.fontWeight }),
        ...(s.style?.letterSpacing && { letterSpacing: s.style.letterSpacing }),
        ...(s.style?.textTransform && { textTransform: s.style.textTransform }),
        ...(s.style?.fontStyle && { fontStyle: s.style.fontStyle }),
        ...(s.style?.customBgColor && { customBgColor: s.style.customBgColor }),
        ...(s.style?.customGradient && { customGradient: s.style.customGradient }),
        ...(s.style?.backgroundImage && { backgroundImage: s.style.backgroundImage }),
        ...(s.style?.videoBackground && { videoBackground: s.style.videoBackground }),
        ...(s.style?.borderRadius && { borderRadius: s.style.borderRadius }),
        ...(s.style?.boxShadow && { boxShadow: s.style.boxShadow }),
        ...(s.style?.opacity !== undefined && { opacity: s.style.opacity }),
        ...(s.style?.dividerTop && { dividerTop: s.style.dividerTop }),
        ...(s.style?.dividerBottom && { dividerBottom: s.style.dividerBottom }),
        ...(s.style?.titleSize && { titleSize: s.style.titleSize }),
        ...(s.style?.fullWidth !== undefined && { fullWidth: s.style.fullWidth }),
      },
      visible: s.visible !== false,
    }),
  )

  // Home page config
  const homePageConfig = {
    id: homePageId,
    slug: '/',
    title: siteName,
    seo: {
      title: template.meta?.title || siteName,
      description: template.meta?.description || '',
    },
    sections: homeSections,
  }

  config.pages.push(homePageConfig)

  // Build extra pages from template.pages
  if (template.pages?.length) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    template.pages.forEach((tp: any, pIdx: number) => {
      const epId = `page-${nanoid(8)}`
      const epSections = (tp.sections || []).map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (s: any, sIdx: number) => ({
          id: `section-${Date.now()}-${pIdx}-${sIdx}-${nanoid(5)}`,
          type: s.type,
          variant: s.variant || 'luxe-default',
          content: normalizeContent(s.type, s.content || {}),
          style: s.style || { background: 'white', paddingY: 'lg' },
          visible: s.visible !== false,
        }),
      )
      const epConfig = {
        id: epId,
        slug: tp.slug || `/${tp.title?.toLowerCase() || 'page'}`,
        title: tp.title || 'Page',
        seo: tp.seo || { title: tp.title || 'Page', description: '' },
        sections: epSections,
      }
      config.pages.push(epConfig)
    })
  }

  return { config, homePageId, homeSections }
}

export async function POST(req: NextRequest) {
  try {
    const template = await req.json()

    // Validate minimum required fields
    if (!template.site?.name || !template.sections?.length) {
      return NextResponse.json(
        { error: 'Template must have site.name and sections[]' },
        { status: 400 },
      )
    }

    const siteName = template.site.name
    const updateSiteId: string | undefined = template.siteId

    // ─── UPDATE MODE ───
    if (updateSiteId) {
      const existing = await prisma.site.findUnique({ where: { id: updateSiteId }, include: { pages: true } })
      if (!existing) {
        return NextResponse.json({ error: `Site ${updateSiteId} not found` }, { status: 404 })
      }

      const { config, homeSections } = buildSiteConfig(template, updateSiteId, siteName)

      // Update site config + home page config
      const homePage = existing.pages.find(p => p.isHome)
      const homePageConfig = config.pages.find(p => p.slug === '/')

      await prisma.site.update({
        where: { id: updateSiteId },
        data: {
          name: siteName,
          config: config as object,
        },
      })

      if (homePage && homePageConfig) {
        await prisma.page.update({
          where: { id: homePage.id },
          data: {
            title: siteName,
            config: homePageConfig as object,
          },
        })
      }

      // Upsert template record
      const templateSlug = toSlug(siteName)
      const tpl = await upsertTemplate(template, templateSlug)

      return NextResponse.json(
        {
          success: true,
          mode: 'update',
          site: {
            id: updateSiteId,
            slug: existing.slug,
            name: siteName,
            editorUrl: `/editor/${updateSiteId}`,
            sectionsCount: homeSections.length,
            pagesCount: config.pages.length,
          },
          template: tpl,
        },
        { status: 200 },
      )
    }

    // ─── CREATE MODE ───
    const siteId = nanoid(10)
    const slug = toSlug(siteName)
    const { config, homePageId, homeSections } = buildSiteConfig(template, siteId, siteName)
    const homePageConfig = config.pages.find(p => p.slug === '/')

    // Extra pages for DB creation
    const extraPageCreates = config.pages
      .filter(p => p.slug !== '/')
      .map((p, i) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        config: p as object,
        order: i + 1,
        isHome: false,
      }))

    const site = await prisma.site.create({
      data: {
        id: siteId,
        name: siteName,
        slug: `${slug}-${nanoid(4)}`,
        description: template.site.industry
          ? `${template.site.industry} - ${template.site.audience || ''}`
          : undefined,
        config: config as object,
        pages: {
          create: [
            {
              id: homePageId,
              slug: '/',
              title: siteName,
              config: homePageConfig as object,
              order: 0,
              isHome: true,
            },
            ...extraPageCreates,
          ],
        },
      },
    })

    // Upsert template record
    const tpl = await upsertTemplate(template, slug)

    return NextResponse.json(
      {
        success: true,
        mode: 'create',
        site: {
          id: site.id,
          slug: site.slug,
          name: site.name,
          editorUrl: `/editor/${site.id}`,
          sectionsCount: homeSections.length,
          pagesCount: config.pages.length,
        },
        template: tpl,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('[POST /api/import-template]', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: `Import failed: ${message}` }, { status: 500 })
  }
}
