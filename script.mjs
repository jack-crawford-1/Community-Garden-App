import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const coordsData = [
  {
    lat: '-41.2942',
    lng: '174.7840',
    address: '101 Gandalf Grove Wellington, NZ',
    description: 'A scenic vista overlooking the city from a new angle.',
    addedByUserId: 'user1',
    updatedAt: new Date(),
  },
  {
    lat: '-41.2891',
    lng: '174.7732',
    address: '15 Dumbledor Drive Wellington, NZ',
    description:
      'Steps away from the vibrant Wellington central business district.',
    addedByUserId: 'user2',
    updatedAt: new Date(),
  },
  {
    lat: '-41.2760',
    lng: '174.7790',
    address: '320 Vulcan Lane Wellington, NZ',
    description:
      'A quiet retreat near the bustling city life, close to nature.',
    addedByUserId: 'user1',
    updatedAt: new Date(),
  },
  {
    lat: '-41.3420',
    lng: '174.7450',
    address: '87 Skywalker Rise Wellington, NZ',
    description:
      'Elevated views near the sea, perfect for sunrise and sunset watchers.',
    addedByUserId: 'user3',
    updatedAt: new Date(),
  },
  {
    lat: '-41.2930',
    lng: '174.7865',
    address: '9 Middle Earth Road Wellington, NZ',
    description: 'A stone’s throw from the cultural hub of Te Papa museum.',
    addedByUserId: 'user2',
    updatedAt: new Date(),
  },
]

async function main() {
  const coords = await prisma.coords.createMany({
    data: coordsData,
  })

  console.log(`${coords.count} records added.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
