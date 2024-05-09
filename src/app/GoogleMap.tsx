'use client'

import React, { useEffect, useRef, useState } from 'react'

import MapMarker from './MapMarker'
import { coordinates } from './coordinates'

const DEFAULT_CENTER = { lat: -41.293738, lng: 174.7783656665847 }
const DEFAULT_ZOOM = 13

export const GoogleMaps = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)

  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new window.google.maps.Map(ref.current, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
      })
      setMap(newMap)
    }
  }, [ref, map])

  map?.addListener('click', (e: google.maps.MapMouseEvent) => {
    const latLng = e.latLng.toJSON()
    console.log('You clicked on:', latLng.lat, latLng.lng)
    // window.location.href = './form'
    const infoWindow = new google.maps.InfoWindow({
      position: (ref.current && map?.getCenter()) || DEFAULT_CENTER,
    })
    infoWindow.setContent(JSON.stringify(map?.getCenter()?.toJSON(), null, 2))
    map && infoWindow.open(map)
  })

  return (
    <div ref={ref} style={{ width: '100vw', height: '100vh' }}>
      {map && <MapMarker map={map} locations={coordinates} />}
    </div>
  )
}

export default GoogleMaps

// map?.addListener('click', (e: { latLng: google.maps.LatLng }) => {
//   const latLng = e.latLng.toJSON()
//   console.log('You clicked on:', latLng.lat, latLng.lng)
//   window.location.href = './form'
// })
