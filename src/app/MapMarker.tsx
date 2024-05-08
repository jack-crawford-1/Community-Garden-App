import React from 'react'

interface Location {
  lat: number
  lng: number
}

interface MapMarkerProps {
  map: google.maps.Map
  locations: Location[]
}

function MapMarker({ map, locations }: MapMarkerProps) {
  React.useEffect(() => {
    locations.forEach((location) => {
      new google.maps.Marker({
        position: new google.maps.LatLng(location.lat, location.lng),
        map: map,
      })
    })
  }, [map, locations])

  return null
}

export default MapMarker
