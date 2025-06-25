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

  const [science, pub, restaurant, park, museum, coffee, hotel, groceries, shoppingMall] = await prisma.$transaction(
    ['Science', 'Pub', 'Restaurant', 'Park', 'Museum', 'Coffee', 'Hotel', 'Groceries', 'Shopping Mall'].map((name) =>
      prisma.category.create({ data: { name } })
    )
  );

  const locations = [
    // Science
    { name: 'Gdańsk University of Technology', lat: 54.3714, lon: 18.6191, cat: science },
    { name: 'University of Gdańsk', lat: 54.37, lon: 18.6536, cat: science },
    { name: 'Marine Memorial Museum', lat: 54.3522, lon: 18.6682, cat: science },
    { name: 'Institute of Oceanology PAS', lat: 54.389, lon: 18.573, cat: science },
    { name: 'University of Gdańsk Library', lat: 54.373, lon: 18.651, cat: science },
    { name: 'Polish Baltic Philharmonic', lat: 54.348, lon: 18.6565, cat: science },

    // Pub
    { name: 'Clockwork Orange Pub', lat: 54.3697, lon: 18.6102, cat: pub },
    { name: 'Szeroka Street Pub', lat: 54.3501, lon: 18.6534, cat: pub },
    { name: 'Parliament Club', lat: 54.3684, lon: 18.6241, cat: pub },
    { name: 'Brovarnia Gdańsk', lat: 54.3502, lon: 18.6549, cat: pub },

    // Restaurant
    { name: 'Akita Ramen Gdańsk', lat: 54.3563, lon: 18.6488, cat: restaurant },
    { name: 'Manna Deli', lat: 54.3515, lon: 18.6469, cat: restaurant },
    { name: 'Bread & Wine', lat: 54.3449, lon: 18.6563, cat: restaurant },
    { name: 'Mandu Dumpling House', lat: 54.349, lon: 18.6574, cat: restaurant },
    { name: 'Fino Restaurant', lat: 54.3491, lon: 18.6328, cat: restaurant },
    { name: 'Thai Thai Gdańsk', lat: 54.3504, lon: 18.648, cat: restaurant },
    { name: 'Mercato - Hilton Gdańsk', lat: 54.3478, lon: 18.656, cat: restaurant },
    { name: 'Eliksir', lat: 54.3538, lon: 18.65, cat: restaurant },
    { name: 'Niesztuka', lat: 54.3512, lon: 18.6535, cat: restaurant },
    { name: 'Canis', lat: 54.3495, lon: 18.657, cat: restaurant },
    { name: 'Mercato Gdańsk', lat: 54.3539, lon: 18.6445, cat: restaurant },
    { name: 'Kubicki Restaurant', lat: 54.352, lon: 18.65, cat: restaurant },
    { name: 'Szafarnia 10', lat: 54.3486, lon: 18.6612, cat: restaurant },
    { name: 'Tygle Gdańskie', lat: 54.351, lon: 18.65, cat: restaurant },

    // Park
    { name: 'Oliwa Park', lat: 54.411, lon: 18.5629, cat: park },
    { name: 'Orunia Park', lat: 54.3225, lon: 18.6275, cat: park },
    { name: 'John Paul II Park', lat: 54.3708, lon: 18.6196, cat: park },
    { name: 'Ronald Reagan Park', lat: 54.3729, lon: 18.5525, cat: park },
    { name: 'Brzeźno Beach Park', lat: 54.4055, lon: 18.654, cat: park },
    { name: 'Jelitkowo Promenade Park', lat: 54.434, lon: 18.571, cat: park },
    { name: 'Stogi Park', lat: 54.379, lon: 18.693, cat: park },

    // Museum
    { name: 'National Maritime Museum', lat: 54.3484, lon: 18.6561, cat: museum },
    { name: 'Westerplatte Museum', lat: 54.405, lon: 18.6912, cat: museum },
    { name: 'Museum of the Second World War', lat: 54.3525, lon: 18.6453, cat: museum },
    { name: 'Amber Museum', lat: 54.351, lon: 18.6451, cat: museum },
    { name: "St. Catherine's Church", lat: 54.3575, lon: 18.6453, cat: museum },
    { name: 'European Solidarity Centre', lat: 54.36, lon: 18.653, cat: museum },

    // Coffee
    { name: 'Drukarnia Cafe', lat: 54.3531, lon: 18.6466, cat: coffee },
    { name: 'Weranda Cafe', lat: 54.3505, lon: 18.658, cat: coffee },
    { name: 'Kamienica Cafe', lat: 54.3518, lon: 18.6577, cat: coffee },
    { name: 'Moltaqa Cafe', lat: 54.3512, lon: 18.657, cat: coffee },
    { name: 'Poparzeni Cafe', lat: 54.348, lon: 18.653, cat: coffee },
    { name: 'Libertas Cafe', lat: 54.347, lon: 18.646, cat: coffee },
    { name: 'Leń Cafe', lat: 54.351, lon: 18.656, cat: coffee },
    { name: 'Rednek Cafe', lat: 54.3508, lon: 18.658, cat: coffee },

    // Hotel
    { name: 'Radisson Hotel Gdańsk', lat: 54.3482, lon: 18.6548, cat: hotel },
    { name: 'Hilton Gdańsk', lat: 54.345, lon: 18.6577, cat: hotel },
    { name: 'Gdańsk Boutique Hotel', lat: 54.3474, lon: 18.6542, cat: hotel },
    { name: 'PURO Hotel Gdańsk', lat: 54.3519, lon: 18.6551, cat: hotel },
    { name: 'Dwór Oliwski Hotel', lat: 54.408, lon: 18.5735, cat: hotel },

    // Groceries
    { name: 'Lidl Gdańsk', lat: 54.3465, lon: 18.6367, cat: groceries },
    { name: 'Biedronka Gdańsk', lat: 54.346, lon: 18.632, cat: groceries },
    { name: 'Tesco Gdańsk', lat: 54.3455, lon: 18.6302, cat: groceries },
    { name: 'Carrefour Gdańsk Wrzeszcz', lat: 54.3822, lon: 18.6253, cat: groceries },
    { name: 'Żabka Gdańsk', lat: 54.351, lon: 18.634, cat: groceries },
    { name: 'Żabka Oliwa', lat: 54.409, lon: 18.567, cat: groceries },

    // Shopping Mall
    { name: 'Forum Gdańsk', lat: 54.3539, lon: 18.6445, cat: shoppingMall },
    { name: 'Baltic Gallery', lat: 54.402, lon: 18.62, cat: shoppingMall },
    { name: 'Metropolia Gallery', lat: 54.4173, lon: 18.6073, cat: shoppingMall },
    { name: 'Manhattan Shopping Centre', lat: 54.3593, lon: 18.6247, cat: shoppingMall },
  ];

  const points = await prisma.$transaction(
    locations.map((loc) =>
      prisma.point.create({
        data: {
          name: loc.name,
          latitude: Number(loc.lat.toFixed(4)),
          longitude: Number(loc.lon.toFixed(4)),
          categoryId: loc.cat.id,
        },
      })
    )
  );

  await Promise.all(
    points.map((pt) =>
      prisma.userPoint.create({
        data: { userId: admin.id, pointId: pt.id },
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
