const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.userPoint.deleteMany();
  await prisma.point.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const admin = await prisma.user.create({
    data: {
      login: 'admin',
      passwordHash: '$2b$12$P9lC.r8l.TUUSfgJjHhgne45gMUNyD1DFmSdEcjbO3VWB0q6Aiv7u',
    },
  });

  const [science, pub, restaurant] = await prisma.$transaction([
    prisma.category.create({ data: { name: 'Science' } }),
    prisma.category.create({ data: { name: 'Pub' } }),
    prisma.category.create({ data: { name: 'Restaurant' } }),
  ]);

  const points = await prisma.$transaction([
    prisma.point.create({
      data: {
        name: 'Mechaniczna Pomarańcza',
        latitude: 54.3697,
        longitude: 18.6102,
        categoryId: pub.id,
      },
    }),
    prisma.point.create({
      data: {
        name: 'Gdańsk University of Technology',
        latitude: 54.3714,
        longitude: 18.6191,
        categoryId: science.id,
      },
    }),
    prisma.point.create({
      data: {
        name: 'Husak Pizza',
        latitude: 54.3756,
        longitude: 18.6155,
        categoryId: restaurant.id,
      },
    }),
    prisma.point.create({
      data: {
        name: 'Gyozilla',
        latitude: 54.374,
        longitude: 18.6121,
        categoryId: restaurant.id,
      },
    }),
  ]);

  await Promise.all(
    points.map((point) =>
      prisma.userPoint.create({
        data: {
          userId: admin.id,
          pointId: point.id,
        },
      })
    )
  );

  console.log('✅ Seed completed successfully');
}

main()
  .catch((e) => {
    console.error('❌ Error in seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
