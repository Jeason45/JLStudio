import { PrismaClient } from '../src/generated/prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const sites = await prisma.site.findMany({ orderBy: { createdAt: 'asc' } });

  if (sites.length === 0) {
    console.log('Aucun site trouve. Cree un site dans le configurateur d\'abord.');
    return;
  }

  const hashedPassword = await bcrypt.hash('admin123', 12);

  for (const site of sites) {
    // PortalConfig par defaut
    await prisma.portalConfig.upsert({
      where: { siteId: site.id },
      update: {},
      create: {
        siteId: site.id,
        primaryColor: '#638BFF',
        moduleCRM: true,
        moduleDevis: true,
        moduleFactures: true,
        moduleContrats: false,
        moduleProjets: false,
        moduleCMS: false,
        moduleCalendrier: false,
      },
    });

    // Admin par defaut
    await prisma.portalUser.upsert({
      where: { siteId_email: { siteId: site.id, email: 'admin@portal.dev' } },
      update: {},
      create: {
        siteId: site.id,
        email: 'admin@portal.dev',
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'Portal',
        role: 'ADMIN',
      },
    });

    console.log(`✓ ${site.name} (${site.slug}) — admin@portal.dev / admin123`);
  }

  console.log(`\nDone: ${sites.length} site(s) configures.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
