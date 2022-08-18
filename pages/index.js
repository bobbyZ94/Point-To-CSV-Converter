/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react'
import { CSVLink } from 'react-csv'
import MapWrapper from '../components/MapWrapper'
import { trashbin } from '../components/SVGComponents'

export default function Home() {
  const [markersCoordinates, setMarkersCoordinates] = useState([])
  function generateCsv() {
    const csvMarkersCoordinates = [['Name', 'Latitude', 'Longitude', 'Elevation']]
    for (let i = 0; i < markersCoordinates.length; i += 1) {
      csvMarkersCoordinates.push([
        String(i + 1),
        markersCoordinates[i].latLng
          .toString()
          .replace(/[\])}[{(]/g, '')
          .split(/[, ]+ /)[0],
        markersCoordinates[i].latLng
          .toString()
          .replace(/[\])}[{(]/g, '')
          .split(/[, ]+ /)[1],
        '0',
      ])
    }
    return csvMarkersCoordinates
  }
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
              <th className="p-1">Id</th>
              <th className="p-1">Löschen</th>
            </tr>
          </thead>
          <tbody>
            {markersCoordinates.map((coordinates, index) => (
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
                <td className="bg-slate-200 p-1">{coordinates.id}</td>
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
        <div className="flex justify-center">
          <button type="button" className="px-1 rounded border-2 border-slate-700 bg-slate-200 hover:scale-105">
            <CSVLink data={generateCsv()}>Download CSV Datei</CSVLink>
          </button>
        </div>
      </div>
    </div>
  )
}
