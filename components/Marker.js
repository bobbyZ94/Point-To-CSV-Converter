import { useEffect, useState } from 'react'

export default function Marker({ position, label, map }) {
  const latLng = position
    .toString()
    .replace(/[\])}[{(]/g, '')
    .split(/[, ]+ /)
  const [marker, setMarker] = useState()
  const [infoWindow, setInfoWindow] = useState()
  useEffect(() => {
    setMarker(new window.google.maps.Marker())
    setInfoWindow(new window.google.maps.InfoWindow())
  }, [])
  if (marker) {
    marker.setMap(map)
    marker.setPosition(position)
    marker.setLabel(label)
    marker.setDraggable(true)
  }
  if (marker && infoWindow) {
    infoWindow.setContent(`<div class="info-window-header"><strong>Punkt Nummer: ${label}</strong></div>
    <div class="info-window-text"><div>Latitude/Breite: ${latLng[0]}</div>
    <div>Longitude/Länge: ${latLng[1]}</div></div>
    <button class="info-window-button">Lösche Punkt</button>`)
  }
  useEffect(() => {
    marker?.addListener('click', () => {
      infoWindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
      })
    })
  })
  return null
}
