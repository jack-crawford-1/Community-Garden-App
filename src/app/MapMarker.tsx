function MapMarker({ map }: { map: any }) {
  if (!map) return null

  new google.maps.Marker({
    position: new google.maps.LatLng(-41.2924, 174.7787),
    map: map,
  })

  new google.maps.Marker({
    position: new google.maps.LatLng(-41.3044, 174.7951),
    map: map,
  })

  return null
}

export default MapMarker
