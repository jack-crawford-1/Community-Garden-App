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
    const infoWindow = new google.maps.InfoWindow({
      position: latLng || DEFAULT_CENTER,
    })

    infoWindow.open(map)
    infoWindow.setContent(
      `<button onclick="location.href='./form?lat=${latLng.lat}&lng=${latLng.lng}'">Add garden at this location</button>`
    )
  })

  return (
    <div ref={ref} style={{ width: '100vw', height: '100vh' }}>
      {map && <MapMarker map={map} locations={coordinates} />}
    </div>
  )
}

export default GoogleMaps
