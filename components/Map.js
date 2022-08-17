import React, { useRef, useEffect, useState } from 'react'

export default function Mapt({ center, zoom, children, setMarkersCoordinates }) {
  const ref = useRef()
  const [map, setMap] = useState()

  useEffect(() => {
    setMap(new window.google.maps.Map(ref.current, {}))
  }, [])

  // Add mousclick listener for coordinates
  useEffect(() => {
    if (map) {
      window.google.maps.event.addListener(map, 'click', (event) => {
        setMarkersCoordinates(event.latLng)
      })
    }
  })

  if (map) {
    map.setCenter(center)
    map.setZoom(zoom)
  }

  return (
    <div ref={ref} id="map" className="w-full h-full">
      {React.Children.map(children, (child) => React.cloneElement(child, { map }))}
    </div>
  )
}
