import { useEffect, useState } from 'react'

interface Location {
  id: number
  lat: number
  lng: number
  description: string
  link: string
}

interface MapMarkerProps {
  map: google.maps.Map
}

const MapMarker = ({ map }: MapMarkerProps) => {
  const [locations, setLocations] = useState<Location[]>([])

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const icon = {
      url: '/leaf1.png',
      scaledSize: new google.maps.Size(50, 50),
    }
    if (map && locations.length > 0) {
      locations.forEach((location) => {
        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(location.lat, location.lng),
          map: map,
          icon: icon,
        })

        marker.addListener('click', () => {
          const contentString = `<div class="p-3 m-0 max-w-sm text-2xl text-gray-700   shadow-md">
            <p class="mb-2">${location.description}</p>
            <button class="text-white bg-blue-500 hover:bg-blue-700 rounded-lg text-md m-0 px-5 py-2.5 text-center" onclick="window.location.href='/locations/${location.id}'">More Info</button>
          </div>`
          infoWindow.setContent(contentString)
          infoWindow.open(map, marker)
        })
      })
    }
  }, [map, locations, infoWindow])

  return null
}

export default MapMarker
