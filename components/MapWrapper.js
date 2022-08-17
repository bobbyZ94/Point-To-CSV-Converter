import { Wrapper } from '@googlemaps/react-wrapper'
import { useState } from 'react'
import Map from './Map'
import Marker from './Marker'

export default function MapWrapper() {
  const center = { lat: 49.88085964000008, lng: 8.649815043550795 }
  const zoom = 8
  const [markersCoordinates, setMarkersCoordinates] = useState()
  console.log(markersCoordinates)
  return (
    <Wrapper apiKey={process.env.NEXT_PUBLIC_GMAPS_API_KEY}>
      <Map center={center} zoom={zoom} setMarkersCoordinates={setMarkersCoordinates}>
        <Marker position={markersCoordinates} />
      </Map>
    </Wrapper>
  )
}
