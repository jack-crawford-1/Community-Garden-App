import { useEffect, useState } from 'react'

interface Location {
  lat: number
  lng: number
}

interface MapMarkerProps {
  map: google.maps.Map
}

const MapMarker = ({ map }: MapMarkerProps) => {
  const [locations, setLocations] = useState<Location[]>([])

  useEffect(() => {
    async function fetchCoordinates() {
      try {
        const response = await fetch('/api/coordinates')
        const data = await response.json()
        setLocations(data)
      } catch (error) {
        console.error('Failed to fetch coordinates', error)
      }
    }

    fetchCoordinates()
  }, [])

  useEffect(() => {
    if (map && locations.length > 0) {
      locations.forEach((location) => {
        new google.maps.Marker({
          position: new google.maps.LatLng(location.lat, location.lng),
          map: map,
        })
      })
    }
  }, [map, locations])

  return null
}

export default MapMarker
