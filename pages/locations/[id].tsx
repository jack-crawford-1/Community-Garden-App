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
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 p-5 bg-white rounded-lg w-2/3">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold">{location.address}</h1>
          <p className="text-lg my-2">{location.description}</p>
          <div className="text-md mt-2 mb-4">
            <span>
              Lat: {location.lat}, Lng: {location.lng}
            </span>
            <br />
            <span>Added by: {location.addedByUserId}</span>
          </div>
          <div className="text-lg hover:text-blue-500">
            <Link href={`/locations`}>See All Locations</Link>
          </div>
          <div>
            <Image
              src={location.imageUrl}
              alt={'imageurl'}
              width={300}
              height={300}
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 h-96">
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
    </div>
  )
}
