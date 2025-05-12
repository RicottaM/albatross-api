import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      login: 'admin',
      passwordHash: '$2b$12$P9lC.r8l.TUUSfgJjHhgne45gMUNyD1DFmSdEcjbO3VWB0q6Aiv7u', // "password"
    },
  });

  const categories = [
    await prisma.category.create({ data: { name: 'Building' } }),
    await prisma.category.create({ data: { name: 'Pub' } }),
    await prisma.category.create({ data: { name: 'Restaurant' } }),
  ];

  const points = [
    await prisma.point.create({ data: { name: 'ETI', latitude: 54.37088, longitude: 18.613522, categoryId: categories[0].id } }),
    await prisma.point.create({ data: { name: 'Mechaniczna Pomarańcza', latitude: 54.369454, longitude: 18.610405, categoryId: categories[1].id } }),
    await prisma.point.create({ data: { name: 'Gdańsk University of Technology', latitude: 54.3666, longitude: 18.5986, categoryId: categories[0].id } }),
    await prisma.point.create({ data: { name: 'Husak Pizza', latitude: 54.3794, longitude: 18.6004, categoryId: categories[2].id } }),
    await prisma.point.create({ data: { name: 'Restaurant Gyozilla', latitude: 54.3683, longitude: 18.6052, categoryId: categories[2].id } }),
  ];

  for (const point of points) {
    await prisma.userPoint.create({
      data: {
        userId: user.id,
        pointId: point.id,
      },
    });
  }

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error('Error while loading seed: ', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
