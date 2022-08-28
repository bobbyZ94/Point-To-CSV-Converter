import React from 'react'
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api'
import uniqid from 'uniqid'

const center = {
  lat: 49.88283564019705,
  lng: 8.652589702130772,
}

function MapWrapper({ markersCoordinates, setMarkersCoordinates }) {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GMAPS_API_KEY}>
      <GoogleMap
        onClick={(event) => {
          setMarkersCoordinates([
            ...markersCoordinates,
            { name: String(markersCoordinates.length + 1), latLng: event.latLng, id: uniqid() },
          ])
        }}
        mapContainerClassName="h-full w-full"
        center={center}
        zoom={10}
        options={{ streetViewControl: false }}
      >
        {markersCoordinates?.map((coordinates, index) => (
          <MarkerF
            onDragEnd={(event) =>
              setMarkersCoordinates(() =>
                markersCoordinates.map((elem) =>
                  elem.id === coordinates.id ? { ...elem, latLng: event.latLng } : elem
                )
              )
            }
            key={index}
            label={String(index + 1)}
            onDblClick={() =>
              setMarkersCoordinates([
                ...markersCoordinates.slice(0, index),
                ...markersCoordinates.slice(index + 1, markersCoordinates.length),
              ])
            }
            draggable
            position={coordinates.latLng}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MapWrapper)
