'use client'

import '../../src/app/styles/globals.css'

interface Coords {
  id: number
  lat: string
  lng: string
  address: string
  description: string
  addedByUserId: number
}

export default function LocationPage(Coords: Coords) {
  return (
    <div className="bg-blue-100 text-blue-700 border-4 rounded-xl border-blue-700 w-screen md:w-1/2 p-5 m-4 text-xl">
      Address
      {/* <div className="font-bold text-2xl">{location.address}</div> */}
      <div className="italic text-lg">
        Lat / Lng
        {/* Lat: {location.lat} / Lng: {location.lng} */}
      </div>
      Added By User
      {/* <div className="text-lg">Added by: {location.addedByUserId}</div> */}
      Description
      {/* <div className="text-2xl">{location.description}</div> */}
    </div>
  )
}
