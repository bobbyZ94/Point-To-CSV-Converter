export default function generateCsv(transformedMarkersCoordinates, chosenCoordinateSystem) {
  const csvMarkersCoordinates = [
    [
      'Name',
      `${chosenCoordinateSystem === 'gauss' ? 'Easting' : 'Latitude'}`,
      `${chosenCoordinateSystem === 'gauss' ? 'Northing' : 'Longitude'}`,
      'Elevation',
    ],
  ]
  for (let i = 0; i < transformedMarkersCoordinates.length; i += 1) {
    csvMarkersCoordinates.push([
      transformedMarkersCoordinates[i].name,
      transformedMarkersCoordinates[i].latLng.x.toString(),
      transformedMarkersCoordinates[i].latLng.y.toString(),
      String(0),
    ])
  }
  return csvMarkersCoordinates
}
