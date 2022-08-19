export default function generateCsv(transformedMarkersCoordinates) {
  const csvMarkersCoordinates = [['Name', 'Latitude', 'Longitude', 'Elevation']]
  for (let i = 0; i < transformedMarkersCoordinates.length; i += 1) {
    csvMarkersCoordinates.push([
      String(i + 1),
      transformedMarkersCoordinates[i].latLng.x,
      transformedMarkersCoordinates[i].latLng.y,
      0,
    ])
  }
  return csvMarkersCoordinates
}
