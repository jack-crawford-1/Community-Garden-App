'use client'

import React, { useEffect, useRef, useState } from 'react'
import MapMarker from './MapMarker'
import coordinates from '../../pages/api/coordinates'

const DEFAULT_CENTER = { lat: -41.293738, lng: 174.7783656665847 }
const DEFAULT_ZOOM = 15

export const GoogleMaps = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(
    null
  )

  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new window.google.maps.Map(ref.current, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
      })
      const newInfoWindow = new google.maps.InfoWindow()
      setMap(newMap)
      setInfoWindow(newInfoWindow)
    }
  }, [ref, map])

  useEffect(() => {
    if (map && infoWindow) {
      map.addListener('click', (e: google.maps.MapMouseEvent) => {
        const latLng = e.latLng.toJSON()
        infoWindow.setContent(
          `<button class="text-white bg-blue-500 hover:bg-blue-700 rounded-lg text-xl m-5 px-5 py-2.5 text-center" onclick="window.location.href='./form?lat=${latLng.lat}&lng=${latLng.lng}'">Add community garden site</button>`
        )
        infoWindow.setPosition(latLng || DEFAULT_CENTER)
        infoWindow.open(map)
      })
    }
  }, [map, infoWindow])

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div
        ref={ref}
        className="w-11/12 h-5/6 rounded-3xl border-4 border-gray-200 shadow-md"
      >
        {map && (
          <MapMarker
            map={map}
            coordinates={coordinates}
            infoWindow={infoWindow}
          />
        )}
      </div>
    </div>
  )
}

export default GoogleMaps
