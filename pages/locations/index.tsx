import prisma from '../../src/app/components/prismaClient/prisma'
import '../../src/app/styles/globals.css'

interface Coords {
  id: number
  lat: string
  lng: string
  address: string
  description: string
  addedByUserId: number
}

export async function getServerSideProps() {
  const coordinates = await prisma.coords.findMany()
  await prisma.$disconnect()

  return {
    props: {
      coordinates: JSON.parse(JSON.stringify(coordinates)),
    },
  }
}

export default function LocationsPage({
  coordinates,
}: {
  coordinates: Coords[]
}) {
  return (
    <div className="flex flex-row flex-wrap w-90vw h-90vh m-10 justify-center">
      {coordinates.map((coord) => (
        <div
          key={coord.id}
          className="bg-blue-100 text-blue-700 border-4 rounded-xl border-blue-700 w-screen md:w-1/3 p-5 m-4 text-xl"
        >
          <div className="font-bold text-2xl">{coord.address}</div>
          <div className="italic text-lg">
            Lat: {coord.lat} / Lng: {coord.lng}
          </div>
          <div className="text-lg">Added by: {coord.addedByUserId}</div>
          <div className="text-2xl">{coord.description}</div>
        </div>
      ))}
    </div>
  )
}
