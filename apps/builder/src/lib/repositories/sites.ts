import prisma from '@/lib/db'
import { SiteStatus } from '@/generated/prisma'
import { SiteConfig, SectionConfig, Brand, DEFAULT_SITE_CONFIG } from '@/types/site'
import { nanoid } from 'nanoid'

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export async function getAllSites() {
  return prisma.site.findMany({
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      status: true,
      deployUrl: true,
      thumbnail: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: { leads: true, contacts: true, pages: true },
      },
    },
  })
}

export async function getSiteById(id: string) {
  return prisma.site.findUnique({
    where: { id },
    include: {
      pages: { orderBy: { order: 'asc' } },
      forms: true,
      _count: {
        select: { leads: true, contacts: true },
      },
    },
  })
}

export async function createSite(
  name: string,
  description?: string,
  templateSections?: Omit<SectionConfig, 'id'>[],
  templatePages?: { slug: string; title: string; sections: Omit<SectionConfig, 'id'>[] }[],
  templateBrand?: Partial<Brand>,
) {
  const id = nanoid(10)
  const pageId = `page-${nanoid(8)}`
  const slug = toSlug(name)
  const config = DEFAULT_SITE_CONFIG(id, name)

  // Apply template brand overrides
  if (templateBrand) {
    config.brand = { ...config.brand, ...templateBrand, colors: { ...config.brand.colors, ...templateBrand.colors } }
  }

  // Override the default page id to be unique
  config.pages[0].id = pageId

  if (templateSections?.length) {
    config.pages[0].sections = templateSections.map((s, i) => ({
      ...s,
      id: `section-${Date.now()}-${i}-${nanoid(5)}`,
    })) as SectionConfig[]
  }

  // Build extra pages from template
  const extraPageCreates: { id: string; slug: string; title: string; config: object; order: number; isHome: boolean }[] = []
  if (templatePages?.length) {
    for (let p = 0; p < templatePages.length; p++) {
      const tp = templatePages[p]
      const epId = `page-${nanoid(8)}`
      const epConfig = {
        id: epId,
        slug: tp.slug,
        title: tp.title,
        seo: { title: `${tp.title} — ${name}`, description: '' },
        sections: tp.sections.map((s, i) => ({
          ...s,
          id: `section-${Date.now()}-${p}-${i}-${nanoid(5)}`,
        })),
      }
      config.pages.push(epConfig as SiteConfig['pages'][number])
      extraPageCreates.push({
        id: epId,
        slug: tp.slug,
        title: tp.title,
        config: epConfig as object,
        order: p + 1,
        isHome: false,
      })
    }
  }

  return prisma.site.create({
    data: {
      id,
      name,
      slug: `${slug}-${nanoid(4)}`,
      description,
      config: config as object,
      pages: {
        create: [
          {
            id: pageId,
            slug: '/',
            title: 'Accueil',
            config: config.pages[0] as object,
            order: 0,
            isHome: true,
          },
          ...extraPageCreates,
        ],
      },
    },
  })
}

export async function updateSiteConfig(siteId: string, config: SiteConfig) {
  return prisma.site.update({
    where: { id: siteId },
    data: {
      config: config as object,
      updatedAt: new Date(),
    },
  })
}

export async function updateSiteStatus(siteId: string, status: SiteStatus) {
  return prisma.site.update({
    where: { id: siteId },
    data: { status },
  })
}

export async function deleteSite(siteId: string) {
  return prisma.site.delete({
    where: { id: siteId },
  })
}

export type SiteListItem = Awaited<ReturnType<typeof getAllSites>>[number]
export type SiteDetail = Awaited<ReturnType<typeof getSiteById>>
