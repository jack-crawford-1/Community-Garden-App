import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const coords = await prisma.coords.createMany({
    data: [
      // { lat: '-41.2924', lng: '174.7787' },
      // { lat: '-41.3044', lng: '174.7951' },
      // { lat: '-41.2895', lng: '174.7762' },
      // { lat: '-41.2895', lng: '174.8169' },
      // { lat: '-41.328561', lng: '174.810336' },
      // { lat: '-41.114282', lng: '174.381318' },
      { lat: '', lng: '' },
    ],
  })
  console.log(coords)
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
