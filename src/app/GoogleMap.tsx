'use client'

import React, { useEffect, useRef } from 'react'
import MapMarker from './MapMarker'

const DEFAULT_CENTER = { lat: -41.2924, lng: 174.7787 }
const DEFAULT_ZOOM = 13

export const GoogleMaps = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [map, setMap] = React.useState<google.maps.Map | null>(null)

  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new window.google.maps.Map(ref.current, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
      })

      setMap((prevState) => newMap)
    }
  }, [ref, map])

  return (
    <div ref={ref} style={{ width: '100vw', height: '100vh' }}>
      {map && <MapMarker map={map} />}
    </div>
  )
}
