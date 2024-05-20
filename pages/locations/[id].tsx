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
    <div className="outer container flex md:flex-row flex-col ">
      <div className="topContainer flex flex-col justify-center items-center">
        <div className="h1 text-4xl md:m-3 pt-5 pb-4 text-center w-4/5 md:w-full">
          {location.address}
        </div>
        <div className="addedby text-center text-md">
          Added By: {location.addedByUserId}
        </div>
        <div className="maintext justify-center content-center md:text-left text-center md:w-2/3 flex-wrap md:m-10 m-6">
          {location.description}
        </div>

        <div className="imgMapContainer flex flex-col md:flex-row md:pl-0  m-0 justify-center w-4/5">
          <div className="image md:w-3/4 md:m-5 m-2 ">
            <Image
              src={location.imageUrl}
              alt={'imageurl'}
              width={700}
              height={700}
              style={{ borderRadius: '0.5rem' }}
            />
          </div>
          <div className="map md:w-5/6 w-full m-0 mt-5 flex-row md:m-5">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '0.5rem' }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${location.lat},${location.lng}&zoom=18&maptype=satellite`}
            ></iframe>
          </div>
        </div>
        <div className="flex flex-row md:m-5 ml-10 text-left md:justify-start">
          <div className="lat md:text-lg text-center m-2">
            Latitude: {location.lat}
          </div>
          <div className="Long md:text-lg text-center m-2">
            Longitude: {location.lng}
          </div>
        </div>

        <div className=" md:p-3 bg-green-600 rounded-lg text-white md:text-lg md:hover:text-gray-700 hover:bg-green-500 text-center md:mb-4 m-4 px-4 py-2 ">
          <Link href={`/locations`}>See other gardens</Link>
        </div>
      </div>
    </div>
  )
}
