import { PrismaClient } from '@prisma/client'
import '../../src/app/globals.css'

interface Coords {
  id: number
  lat: string
  lng: string
  address: string
  description: string
  addedByUserId: number
}

export async function getServerSideProps() {
  const prisma = new PrismaClient()
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
          className="bg-blue-500 text-gray-200 border-4 rounded-xl border-blue-700 max-h-96 max-w-96 p-5 m-4 text-xl"
        >
          <div> Latitude: {coord.lat}</div>
          <div>Longitude: {coord.lng}</div>
          <div>{coord.address}</div>
          <div>{coord.description}</div>
          <div>Added By: {coord.addedByUserId}</div>
        </div>
      ))}
    </div>
  )
}

// **** Previous version of the LocationsPage component using React hooks **** //

// import React, { useEffect, useState } from 'react'

// interface Coords {
//   id: number
//   lat: string
//   lng: string
//   address: string
//   description: string
//   addedByUserId: number
// }

// function LocationsPage() {
//   const [coordinates, setCoordinates] = useState<Coords[]>([])

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch('/api/coordinates')
//         const data = await response.json()
//         setCoordinates(data)
//       } catch (error) {
//         console.error('Failed to fetch coordinates', error)
//       }
//     }

//     fetchData()
//   }, [])

//   return (
//     <div>
//       <h1>New</h1>
//       {coordinates.map((coord) => (
//         <>
//           <div key={coord.id}>
//             Latitude: {coord.lat}, Longitude: {coord.lng}
//           </div>
//           <div>{coord.address}</div>
//           <div>{coord.description}</div>
//           <div>Added By: {coord.addedByUserId}</div>
//         </>
//       ))}
//     </div>
//   )
// }

// export default LocationsPage
