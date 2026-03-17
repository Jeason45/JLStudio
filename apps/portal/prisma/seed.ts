import { PrismaClient } from '../src/generated/prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // ── Super Admin (BuilderUser) ──
  const adminEmail = 'contact@jlstudio.dev';
  const adminPassword = await bcrypt.hash('Daytona45!', 12);

  await prisma.builderUser.upsert({
    where: { email: adminEmail },
    update: { password: adminPassword },
    create: {
      email: adminEmail,
      password: adminPassword,
      name: 'JL Studio',
    },
  });
  console.log(`✓ Super Admin: ${adminEmail}`);

  // ── Portal configs per site ──
  const sites = await prisma.site.findMany({ orderBy: { createdAt: 'asc' } });

  if (sites.length === 0) {
    console.log('Aucun site trouve. Cree un site dans le configurateur d\'abord.');
    return;
  }

  for (const site of sites) {
    const allModules = {
      moduleCRM: true,
      moduleDevis: true,
      moduleFactures: true,
      moduleContrats: true,
      moduleProjets: true,
      moduleCMS: true,
      moduleCalendrier: true,
    };

    await prisma.portalConfig.upsert({
      where: { siteId: site.id },
      update: allModules,
      create: {
        siteId: site.id,
        primaryColor: '#638BFF',
        ...allModules,
      },
    });

    console.log(`✓ ${site.name} (${site.slug}) — config portail cree`);
  }

  console.log(`\nDone: super admin + ${sites.length} site(s) configures.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
