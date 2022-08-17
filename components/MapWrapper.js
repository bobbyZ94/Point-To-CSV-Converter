import React, { useEffect, useState } from 'react'
import { GoogleMap, LoadScript, useGoogleMap } from '@react-google-maps/api'
import uniqid from 'uniqid'

const center = {
  lat: 49.88283564019705,
  lng: 8.652589702130772,
}

function MapWrapper() {
  const map = useGoogleMap()
  // Add mousclick listener for coordinates
  const [markersCoordinates, setMarkersCoordinates] = useState([])
  console.log(markersCoordinates)
  useEffect(() => {
    if (map) {
      window.google.maps.event.addListener(map, 'click', (event) => {
        setMarkersCoordinates([...markersCoordinates, { latLng: event.latLng, id: uniqid(), name: '' }])
      })
    }
  })
  function Marker({ position, map, id }) {
    const [marker, setMarker] = useState()
    const [infoWindow, setInfoWindow] = useState()
    useEffect(() => {
      setMarker(new window.google.maps.Marker())
      setInfoWindow(new window.google.maps.InfoWindow())
    }, [])
    if (marker) {
      marker.setMap(map)
      marker.setPosition(position)
      marker.setLabel('A')
      marker.setDraggable(true)
    }
    if (marker && infoWindow) {
      infoWindow.setContent(`<div class="info-window-header"><strong>Punkt Nummer: ${id} Id: ${id}</strong></div>
      <div class="info-window-text"><div>Latitude/Breite: ${
        position &&
        position
          .toString()
          .replace(/[\])}[{(]/g, '')
          .split(/[, ]+ /)[0]
      }</div>
      <div>Longitude/Länge: ${
        position &&
        position
          .toString()
          .replace(/[\])}[{(]/g, '')
          .split(/[, ]+ /)[1]
      }</div></div>
      <button class="info-window-button" id='${id}'>Lösche Punkt</button>`)
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
    useEffect(() => {
      if (marker && infoWindow) {
        window.google.maps.event.addListener(infoWindow, 'domready', () => {
          const deleteButton = document.getElementById(id)
          if (deleteButton) {
            window.google.maps.event.addDomListener(deleteButton, 'click', () => {
              setMarkersCoordinates([])
              // marker.setMap(null)
            })
          }
        })
      }
    })
    // useEffect(() => {
    //   if (marker) {
    //     marker.addListener('dragend', (e) => {
    //       setMarkersCoordinates([...markersCoordinates, (markersCoordinates[index] = marker.getPosition())]) // this === marker
    //     })
    //   }
    // })
    return null
  }
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GMAPS_API_KEY}>
      <GoogleMap mapContainerClassName="w-full h-full" center={center} zoom={10} onLoad={onLoad} onUnmount={onUnmount}>
        {markersCoordinates?.map((coordinates) => (
          <Marker position={coordinates.latLng} map={map} id={coordinates.id} />
        ))}
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MapWrapper)
