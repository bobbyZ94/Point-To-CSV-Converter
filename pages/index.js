/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv'
import proj4 from 'proj4'
import MapWrapper from '../components/MapWrapper'
import { trashbin } from '../components/SVGComponents'

export default function Home() {
  // selector state
  const [chosenCoordinateSystem, setChosenCoordinateSystem] = useState('wsg84')
  // default coordinates are wsg84 by google maps in lat/lng epsg:4326
  const [markersCoordinates, setMarkersCoordinates] = useState([])
  console.log(markersCoordinates)
  const [markersCoordinatesGauss, setMarkersCoordinatesGauss] = useState([])
  const [markersCoordinatesDefault, setMarkersCoordinatesDefault] = useState([])
  useEffect(() => {
    switch (chosenCoordinateSystem) {
      case 'wsg84':
        setMarkersCoordinatesDefault([...markersCoordinates])
        break
      case 'gauss':
        // convert wsg84 array to gauss array, then set as default
        setMarkersCoordinatesDefault([...markersCoordinatesGauss])
        break
      default:
        setMarkersCoordinatesDefault([...markersCoordinates])
    }
  }, [markersCoordinates, chosenCoordinateSystem])

  // TODO: move to util folder
  function generateCsv() {
    const csvMarkersCoordinates = [['Name', 'Latitude', 'Longitude', 'Elevation']]
    for (let i = 0; i < markersCoordinatesDefault.length; i += 1) {
      csvMarkersCoordinates.push([
        String(i + 1),
        markersCoordinatesDefault[i].latLng
          .toString()
          .replace(/[\])}[{(]/g, '')
          .split(/[, ]+ /)[0],
        markersCoordinatesDefault[i].latLng
          .toString()
          .replace(/[\])}[{(]/g, '')
          .split(/[, ]+ /)[1],
        '0',
      ])
    }
    return csvMarkersCoordinates
  }

  useEffect(() => {
    // get wsg84 array, map through every point while using transform function on .latLng

    async function transformCoordinates(markersCoordinates) {
      const response = await fetch('BETA2007.gsb')
      if (!response.ok) {
        throw new Error('Somethings wrong')
      }
      const buffer = await response.arrayBuffer()
      proj4.nadgrid('BETA2007.gsb', buffer)
      proj4.defs([
        [
          'EPSG:31467',
          '+proj=tmerc +lat_0=0 +lon_0=9 +k=1 +x_0=3500000 +y_0=0 +ellps=bessel +nadgrids=@BETA2007.gsb +units=m +no_defs +type=crs',
        ],
        ['EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs +type=crs'],
      ])
    }

    if (chosenCoordinateSystem === 'gauss') {
      transformCoordinates(markersCoordinates)
    }
  }, [markersCoordinates])

  return (
    <div className="grid grid-cols-3 items-center justify-center w-full h-screen bg-slate-100">
      <div className="col-span-2 w-full h-full">
        <MapWrapper markersCoordinates={markersCoordinates} setMarkersCoordinates={setMarkersCoordinates} />
      </div>
      <div className="mx-auto">
        <table className="text-center mb-5 border-separate border-2 border-slate-500">
          <thead>
            <tr className="bg-slate-300">
              <th className="p-1">Punkt</th>
              <th className="p-1">Latitude/Breite</th>
              <th className="p-1">Longitude/Höhe</th>
              <th className="p-1">Löschen</th>
            </tr>
          </thead>
          <tbody>
            {markersCoordinatesDefault.map((coordinates, index) => (
              <tr key={index}>
                <td className="bg-slate-200 p-1">{String(index + 1)}</td>
                <td className="bg-slate-200 p-1">
                  {coordinates.latLng &&
                    coordinates.latLng
                      .toString()
                      .replace(/[\])}[{(]/g, '')
                      .split(/[, ]+ /)[0]}
                </td>
                <td className="bg-slate-200 p-1">
                  {coordinates.latLng &&
                    coordinates.latLng
                      .toString()
                      .replace(/[\])}[{(]/g, '')
                      .split(/[, ]+ /)[1]}
                </td>
                <td className="bg-slate-200 p-1">
                  <div
                    className="hover:scale-110 hover:cursor-pointer flex justify-center"
                    onClick={() =>
                      setMarkersCoordinates([
                        ...markersCoordinates.slice(0, index),
                        ...markersCoordinates.slice(index + 1, markersCoordinates.length),
                      ])
                    }
                  >
                    {trashbin}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-col items-center justify-center bg-slate-300 gap-5 p-5">
          <div>Wähle das gewünschte Coordinatensystem:</div>
          <select
            className="p-1"
            name="coordinates"
            id="coordinates-select"
            value={chosenCoordinateSystem}
            onChange={(e) => setChosenCoordinateSystem(e.target.value)}
          >
            <option value="wsg84">WSG84 - Google Maps - EPSG: 4326</option>
            <option value="gauss">DHDN/3-degree Gauss-Kruger Zone 3 - EPSG:31467</option>
          </select>
          <button type="button" className="px-1 rounded border-2 border-slate-700 bg-slate-200 hover:scale-105">
            <CSVLink data={generateCsv()}>Download CSV Datei</CSVLink>
          </button>
        </div>
      </div>
    </div>
  )
}

setMarkersCoordinatesGauss(
  markersCoordinates.map((elem) => {
   ...elem, proj4('EPSG:4326', 'EPSG:31467', { x: coordinates.latLng.lat, y: coordinates.latLng.lng })
  })
)
