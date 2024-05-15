'use client'

import '../../src/app/styles/globals.css'
import prisma from '../../src/app/components/prismaClient/prisma'
import Link from 'next/link'
import Image from 'next/image'

interface Coords {
  id: number
  lat: string
  lng: string
  address: string
  description: string
  imageUrl: string
  addedByUserId: number
  mapId: string
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
  const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-gray-100">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl m-10 font-bold">{location.address}</h1>
          <div className="m-3">Added by User ID: {location.addedByUserId}</div>
          <div className="text-lg w-5/6 leading-7 m-2">
            {location.description}
          </div>
        </div>

        <div className="border-4 border-gray-400 rounded-xl m-5">
          <Image
            src={location.imageUrl}
            alt={'imageurl'}
            width={400}
            height={400}
          />
        </div>
        <div className="m-1">Latitude: {location.lat},</div>
        <div className="mb-10">Longitude: {location.lng}</div>

        <div className="w-4/5 m-1 border-2 border-gray-400 rounded-xl h-64">
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: '1rem' }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${location.lat},${location.lng}&zoom=18&maptype=roadmap`}
          ></iframe>
        </div>
      </div>

      <div className="text-lg hover:text-blue-500 m-10">
        <Link href={`/locations`}>See All Locations</Link>
      </div>
    </>
  )
}
