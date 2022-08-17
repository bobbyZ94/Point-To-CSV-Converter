import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import Marker from './Marker'

const center = {
  lat: 49.88283564019705,
  lng: 8.652589702130772,
}

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GMAPS_API_KEY,
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback((map) => {
    // const bounds = new window.google.maps.LatLngBounds(center)
    // map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = React.useCallback((map) => {
    setMap(null)
  }, [])

  // Add mousclick listener for coordinates
  const [markersCoordinates, setMarkersCoordinates] = useState([])
  console.log(markersCoordinates[0]?.toString())
  useEffect(() => {
    if (map) {
      window.google.maps.event.addListener(map, 'click', (event) => {
        setMarkersCoordinates([...markersCoordinates, event.latLng])
      })
    }
  })

  return isLoaded ? (
    <GoogleMap mapContainerClassName="w-full h-full" center={center} zoom={10} onLoad={onLoad} onUnmount={onUnmount}>
      {markersCoordinates.map((coordinates, index) => (
        <Marker position={coordinates} map={map} label={String(index + 1)} />
      ))}
    </GoogleMap>
  ) : (
    <div>Loading ...</div>
  )
}

export default React.memo(MyComponent)
