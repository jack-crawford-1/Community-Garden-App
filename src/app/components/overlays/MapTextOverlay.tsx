import { useEffect } from 'react'

export function useMapTextOverlay(map: google.maps.Map | null) {
  useEffect(() => {
    if (map) {
      const myTitle = document.createElement('div')
      myTitle.style.color = '#081833'
      myTitle.style.fontSize = '1.3vw'
      myTitle.style.fontWeight = '400'
      myTitle.style.padding = '10px'
      myTitle.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'
      myTitle.style.borderRadius = '15px'
      myTitle.style.marginLeft = '10px'
      myTitle.innerHTML =
        '<h1 style="font-weight: 600; text-align: center; font-size: 1.6em;">Community Gardens App</h1><br/><p>Click the map to add a new community garden site or click on the leaf marker to view details for existing sites.</p><br/><p>This app was built with NextJS, Next Router, React, TypeScript, the Google Maps API, using Prisma and SQLite for ORM and database.</p>'

      const myTextDiv = document.createElement('div')
      myTextDiv.style.width = '20%'
      myTextDiv.appendChild(myTitle)

      map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(myTextDiv)

      return () => {
        map.controls[google.maps.ControlPosition.LEFT_BOTTOM].clear()
      }
    }
  }, [map])
}
