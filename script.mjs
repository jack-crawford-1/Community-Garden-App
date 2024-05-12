import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const coordsData = [
  {
    lat: '-41.2947',
    lng: '174.7850',
    address: '55 Testa Wellington, NZ',
    description: 'dummy dummy.',
    addedByUserId: 'user1',
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
