import { useEffect, useState } from 'react'

export default function Marker({ position, label, map }) {
  const [marker, setMarker] = useState()
  useEffect(() => {
    setMarker(new window.google.maps.Marker())
  }, [])
  if (marker) {
    marker.setMap(map)
    marker.setPosition(position)
    marker.setLabel(label)
  }
  return null
}
