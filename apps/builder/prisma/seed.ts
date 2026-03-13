import { PrismaClient } from '../src/generated/prisma'
import { DEFAULT_SITE_CONFIG } from '../src/types/site'
import { nanoid } from 'nanoid'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding...')

  const siteId = nanoid(10)
  const config = DEFAULT_SITE_CONFIG(siteId, 'Site de démonstration')

  const site = await prisma.site.upsert({
    where: { slug: 'demo-site' },
    update: {},
    create: {
      id: siteId,
      name: 'Site de démonstration',
      slug: 'demo-site',
      description: 'Un site de test pour le configurateur',
      config: config as object,
      pages: {
        create: {
          id: 'page-home',
          slug: '/',
          title: 'Accueil',
          config: config.pages[0] as object,
          order: 0,
          isHome: true,
        },
      },
      forms: {
        create: {
          id: 'form-contact',
          name: 'Formulaire de contact',
          fields: [
            { id: 'f1', type: 'text', name: 'firstName', label: 'Prénom', required: true },
            { id: 'f2', type: 'text', name: 'lastName', label: 'Nom', required: true },
            { id: 'f3', type: 'email', name: 'email', label: 'Email', required: true },
            { id: 'f4', type: 'textarea', name: 'message', label: 'Message', required: false },
          ],
          settings: {
            successMessage: 'Merci pour votre message !',
            createContact: true,
          },
        },
      },
    },
  })

  console.log('✅ Site créé:', site.id)
  console.log('🏁 Seed terminé')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
