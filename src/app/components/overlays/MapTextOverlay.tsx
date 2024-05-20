import { useEffect } from 'react'

export function useMapTextOverlay(map: google.maps.Map | null) {
  useEffect(() => {
    if (map) {
      const myTitle = document.createElement('div')
      myTitle.style.color = '#081833'
      myTitle.style.fontWeight = '400'
      myTitle.style.padding = '15px'
      myTitle.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'
      myTitle.style.borderRadius = '15px'
      myTitle.style.margin = '10px'
      myTitle.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'
      myTitle.style.maxWidth = '300px'
      myTitle.style.position = 'relative'

      myTitle.innerHTML = `
        <h1 style="font-weight: 600; text-align: center; font-size: 1.5em; margin-bottom: 10px;">
          Community Gardens App
        </h1>
        <p>Click the map to add a new community garden site or click on the leaf marker to view details for existing sites.</p>
        <br/>
        <p>This app was built with NextJS, Next Router, React, TypeScript, NextAuth, Google Maps API, Multer, Prisma, SQLite.</p>
        <button id="closeOverlay" style="position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 1.2em; cursor: pointer;">&times;</button>
      `

      const myTextDiv = document.createElement('div')
      myTextDiv.style.width = 'fit-content'
      myTextDiv.appendChild(myTitle)

      const updateStylesForMobile = () => {
        if (window.innerWidth < 768) {
          myTitle.style.fontSize = '3vw'
          myTextDiv.style.width = '90%'
          myTextDiv.style.margin = '0 auto'
          myTextDiv.style.marginBottom = '10px'
        } else {
          myTitle.style.fontSize = '1vw'
          myTextDiv.style.width = 'fit-content'
          myTextDiv.style.margin = '10px'
        }
      }

      updateStylesForMobile()
      window.addEventListener('resize', updateStylesForMobile)

      map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(myTextDiv)

      const closeButton = myTitle.querySelector(
        '#closeOverlay'
      ) as HTMLButtonElement
      const handleCloseClick = () => {
        map.controls[google.maps.ControlPosition.LEFT_BOTTOM].removeAt(
          map.controls[google.maps.ControlPosition.LEFT_BOTTOM].getLength() - 1
        )
        window.removeEventListener('resize', updateStylesForMobile)
      }
      closeButton.addEventListener('click', handleCloseClick)

      return () => {
        map.controls[google.maps.ControlPosition.LEFT_BOTTOM].clear()
        window.removeEventListener('resize', updateStylesForMobile)
      }
    }
  }, [map])
}
