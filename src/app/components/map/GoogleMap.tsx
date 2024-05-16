'use client'

import React, { useEffect, useRef, useState } from 'react'
import MapMarker from '../overlays/MapMarker'
import { useMapTextOverlay } from '../overlays/MapTextOverlay'

interface MapOptions {
  center: google.maps.LatLngLiteral
  zoom: number
  minZoom: number
  maxZoom: number
  mapId: string
}

const DEFAULT_CENTER = { lat: -41.289830130702704, lng: 174.76954279578203 }

const DEFAULT_ZOOM = 13
const mapId = 'fb0b50db61587e93'

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
        minZoom: 5,
        maxZoom: 20,
        mapId: mapId,
      } as MapOptions)
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
          `<button class="text-white bg-green-500 hover:bg-green-700 rounded-lg text-xl m-0 px-5 py-2.5 text-center" onclick="window.location.href='./form?lat=${latLng.lat}&lng=${latLng.lng}'">Add community garden site</button>`
        )
        infoWindow.setPosition(latLng || DEFAULT_CENTER)
        infoWindow.open(map)
      })
    }
  }, [map, infoWindow])

  useMapTextOverlay(map)

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div
        ref={ref}
        className="w-screen h-screen rounded-3xl border-4 border-gray-200 shadow-md"
      >
        {map && <MapMarker map={map} />}
      </div>
    </div>
  )
}

export default GoogleMaps
