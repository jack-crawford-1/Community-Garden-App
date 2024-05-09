import React, { useEffect, useState } from 'react'

interface Coordinate {
  id: number
  lat: string
  lng: string
}

function NewPage() {
  const [coordinates, setCoordinates] = useState<Coordinate[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/coordinates')
        const data = await response.json()
        setCoordinates(data)
      } catch (error) {
        console.error('Failed to fetch coordinates', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>New</h1>
      {coordinates.map((coord) => (
        <div key={coord.id}>
          Latitude: {coord.lat}, Longitude: {coord.lng}
        </div>
      ))}
    </div>
  )
}

export default NewPage
