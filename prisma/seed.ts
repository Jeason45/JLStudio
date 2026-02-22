import { PrismaClient } from '../src/generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const email = process.env.AUTH_USER_1_EMAIL || 'jeason.lemoine@gmail.com';
  const password = process.env.AUTH_USER_1_PASSWORD || 'JLStudio@2026';

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (!existingUser) {
    const hashedPassword = await bcrypt.hash(password, 12);
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: 'Jeason Lemoine',
        role: 'admin',
      },
    });
    console.log(`Admin user created: ${email}`);
  } else {
    console.log(`Admin user already exists: ${email}`);
  }

  // Create default company settings
  const existingSettings = await prisma.companySettings.findUnique({ where: { id: 'default' } });
  if (!existingSettings) {
    await prisma.companySettings.create({
      data: {
        id: 'default',
        name: 'JL Studio',
        email: 'contact@jlstudio.dev',
      },
    });
    console.log('Default company settings created');
  } else {
    console.log('Company settings already exist');
  }
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
