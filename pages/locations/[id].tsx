'use client'

import '../../src/app/styles/globals.css'
import prisma from '../../src/app/components/prismaClient/prisma'

interface Coords {
  id: number
  lat: string
  lng: string
  address: string
  description: string
  addedByUserId: number
}

export async function getServerSideProps(context: { params: any }) {
  const { params } = context
  const id = parseInt(params.id, 10)
  const location = await prisma.coords.findUnique({
    where: {
      id: id,
    },
  })

  await prisma.$disconnect()

  return {
    props: {
      location: location ? JSON.parse(JSON.stringify(location)) : null,
    },
  }
}

export default function LocationPage({ location }: { location: Coords }) {
  if (!location) {
    return (
      <div className="bg-red-100 text-red-700 border-4 rounded-xl border-red-700 w-screen md:w-1/2 p-5 m-4 text-xl">
        Location not found
      </div>
    )
  }
  return (
    <div className="bg-blue-100 text-blue-700 border-4 rounded-xl border-blue-700 w-screen md:w-1/2 p-5 m-4 text-xl">
      <div className="font-bold text-2xl">{location.address}</div>
      <div className="italic text-lg">
        Lat / Lng: {location.lat} / {location.lng}
      </div>
      <div className="text-lg">Added by: {location.addedByUserId}</div>
      <div className="text-2xl">{location.description}</div>
    </div>
  )
}
