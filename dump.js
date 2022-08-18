function Marker2({ position, map, id }) {
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
