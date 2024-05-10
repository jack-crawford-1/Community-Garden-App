import { useEffect, useState } from 'react'

interface Location {
  lat: number
  lng: number
  description: string
  link: string
}

interface MapMarkerProps {
  map: google.maps.Map
  coordinates: Location
}

const MapMarker = ({ map }: MapMarkerProps) => {
  const [locations, setLocations] = useState<Location[]>([])

  const infoWindow = new google.maps.InfoWindow()

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
        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(location.lat, location.lng),
          map: map,
        })

        marker.addListener('click', () => {
          const contentString = `<div class="p-4 max-w-sm text-2xl text-gray-700 bg-white rounded-lg border border-gray-200 shadow-md">
            <p class="mb-2">${location.description}</p>
            <button class="text-white bg-blue-500 hover:bg-blue-700 rounded-lg text-md m-5 px-5 py-2.5 text-center" onclick="window.location.href='${location.link}'">More Info</button>
          </div>`
          infoWindow.setContent(contentString)
          infoWindow.open({
            anchor: marker,
            map,
          })
        })
      })
    }
  }, [map, locations, infoWindow])

  return null
}

export default MapMarker
