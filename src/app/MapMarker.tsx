import { useEffect, useState } from 'react'

interface Location {
  lat: number
  lng: number
}

interface MapMarkerProps {
  map: google.maps.Map
  locations: Location[]
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

// function onMapClick(e: { latlng: google.maps.LatLng }) {
//   const latlng = e.latlng as google.maps.LatLng
//   const content = `<button id="go-to-page">Add New Site</button>`
//   const infowindow = new google.maps.InfoWindow({ content })

//   setTimeout(() => {
//     const goToPageButton = document.getElementById('go-to-page')

//     if (goToPageButton) {
//       goToPageButton.addEventListener('click', () => {
//         navigate(`/addsite/?lat=${latlng.lat}&lng=${latlng.lng}`)
//       })
//     }
//   }, 0)
// }
